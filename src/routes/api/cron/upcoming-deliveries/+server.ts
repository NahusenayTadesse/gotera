import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import { timingSafeEqual, randomBytes } from 'node:crypto';
import { CRON_SECRET } from '$env/static/private';

import { db } from '$lib/server/db';
import { deliveries, subscribers, addresses, addons } from '$lib/server/db/schema';
import { sendUpcomingDelivery } from '$lib/server/email';
import { SITE } from '$lib/server/emailTemplates';
import { fullDate } from '$lib/format';
import { cutoffDateFor } from '$lib/delivery';
import { shiftDays, todayInTimeZone } from '$lib/format';

/** How many days before the scheduled date the reminder goes out. */
const REMINDER_LEAD_DAYS = 2;

function authorised(request: Request): boolean {
	const header = request.headers.get('authorization');
	const bearer = header?.startsWith('Bearer ') ? header.slice(7) : null;
	if (!bearer) return false;

	// A secret in a query string ends up in access logs and Referer headers, so the
	// header is the only accepted form. Lengths must match before timingSafeEqual runs
	// (it throws on mismatched buffer lengths rather than returning false).
	const a = Buffer.from(bearer);
	const b = Buffer.from(CRON_SECRET);
	return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Curl this once a day (e.g. from an external cron service) to email everyone whose
 * delivery is scheduled REMINDER_LEAD_DAYS from now. Idempotent by construction: since
 * a given delivery's scheduled_date only ever matches "today + lead days" on one
 * calendar day, running this once daily can't double-send without a dedup column.
 */
export const GET: RequestHandler = async ({ request }) => {
	if (!authorised(request)) error(401, 'Unauthorized');

	const targetDateString = shiftDays(todayInTimeZone(), REMINDER_LEAD_DAYS);
	// deliveries.scheduled_date round-trips through mysql2 as a LOCAL-midnight Date (the
	// server's Node process timezone), not UTC — see deliverySchedule.ts for the same
	// convention. Building it any other way here risks matching the wrong calendar day
	// if the server's timezone ever changes.
	const [y, m, d] = targetDateString.split('-').map(Number);
	const targetDate = new Date(y, m - 1, d);

	const [upcoming, [activeAddon]] = await Promise.all([
		db
			.select({
				deliveryId: deliveries.id,
				addonAccessToken: deliveries.addonAccessToken,
				email: subscribers.email,
				name: subscribers.fullName,
				scheduledDate: deliveries.scheduledDate,
				line1: addresses.line1,
				line2: addresses.line2,
				city: addresses.city,
				postcode: addresses.postcode
			})
			.from(deliveries)
			.innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
			.innerJoin(addresses, eq(addresses.id, deliveries.addressId))
			.where(and(eq(deliveries.status, 'scheduled'), eq(deliveries.scheduledDate, targetDate))),
		db.select({ id: addons.id }).from(addons).where(eq(addons.isActive, true)).limit(1)
	]);

	if (upcoming.length === 0) {
		return json({ targetDate: targetDateString, checked: 0, sent: 0 });
	}

	// Only offer the "add extras" link while there's actually something to add — and
	// only mint tokens for the deliveries that don't already have one, so re-running
	// this (or a delivery that gets a second reminder some other way) reuses the same
	// link instead of invalidating one already out in a customer's inbox.
	const addonsAvailable = Boolean(activeAddon);
	if (addonsAvailable) {
		await Promise.all(
			upcoming
				.filter((row) => !row.addonAccessToken)
				.map((row) => {
					const token = randomBytes(24).toString('base64url');
					row.addonAccessToken = token;
					return db
						.update(deliveries)
						.set({ addonAccessToken: token })
						.where(and(eq(deliveries.id, row.deliveryId), isNull(deliveries.addonAccessToken)));
				})
		);
	}

	const results = await Promise.allSettled(
		upcoming.map((d) =>
			sendUpcomingDelivery(d.email, {
				name: d.name ?? 'there',
				deliveryLabel: fullDate(d.scheduledDate),
				cutoffLabel: fullDate(cutoffDateFor(d.scheduledDate)),
				address: [d.line1, d.line2, d.city, d.postcode].filter(Boolean).join(', '),
				addonsUrl: addonsAvailable && d.addonAccessToken ? `${SITE}/addons/${d.addonAccessToken}` : undefined
			})
		)
	);

	const sent = results.filter((r) => r.status === 'fulfilled').length;
	const failed = results.length - sent;

	return json({ targetDate: targetDateString, checked: upcoming.length, sent, failed });
};
