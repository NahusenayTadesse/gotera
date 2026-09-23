import { i as sendUpcomingDelivery, S as SITE, C as CRON_SECRET } from '../../../../../chunks/email.js-BnPglp6p.js';
import { m as db, F as addresses, v as deliveries, p as subscribers, j as eq, k as and, x as addons, C as isNull } from '../../../../../chunks/db.js-BXYNtFGm.js';
import { s as shiftDays, b as todayInTimeZone, f as fullDate } from '../../../../../chunks/format.js-DhQga0l2.js';
import { c as cutoffDateFor } from '../../../../../chunks/delivery.js-T9UKrAu5.js';
import { v as error, j as json } from '../../../../../chunks/utils.js-BQt5v-8G.js';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import 'nodemailer';
import 'node:buffer';
import 'url';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'process';
import 'crypto';
import 'zlib';
import 'util';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../index.js-C0U4KHbt.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/server.js-qDPizQqb.js';
import '../../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';

//#region src/routes/api/cron/upcoming-deliveries/+server.ts
/** How many days before the scheduled date the reminder goes out. */
var REMINDER_LEAD_DAYS = 2;
function authorised(request) {
	const header = request.headers.get("authorization");
	const bearer = header?.startsWith("Bearer ") ? header.slice(7) : null;
	if (!bearer) return false;
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
var GET = async ({ request }) => {
	if (!authorised(request)) error(401, "Unauthorized");
	const targetDateString = shiftDays(todayInTimeZone(), REMINDER_LEAD_DAYS);
	const [y, m, d] = targetDateString.split("-").map(Number);
	const targetDate = new Date(y, m - 1, d);
	const [upcoming, [activeAddon]] = await Promise.all([db.select({
		deliveryId: deliveries.id,
		addonAccessToken: deliveries.addonAccessToken,
		email: subscribers.email,
		name: subscribers.fullName,
		scheduledDate: deliveries.scheduledDate,
		line1: addresses.line1,
		line2: addresses.line2,
		city: addresses.city,
		postcode: addresses.postcode
	}).from(deliveries).innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).innerJoin(addresses, eq(addresses.id, deliveries.addressId)).where(and(eq(deliveries.status, "scheduled"), eq(deliveries.scheduledDate, targetDate))), db.select({ id: addons.id }).from(addons).where(eq(addons.isActive, true)).limit(1)]);
	if (upcoming.length === 0) return json({
		targetDate: targetDateString,
		checked: 0,
		sent: 0
	});
	const addonsAvailable = Boolean(activeAddon);
	if (addonsAvailable) await Promise.all(upcoming.filter((row) => !row.addonAccessToken).map((row) => {
		const token = randomBytes(24).toString("base64url");
		row.addonAccessToken = token;
		return db.update(deliveries).set({ addonAccessToken: token }).where(and(eq(deliveries.id, row.deliveryId), isNull(deliveries.addonAccessToken)));
	}));
	const results = await Promise.allSettled(upcoming.map((d) => sendUpcomingDelivery(d.email, {
		name: d.name ?? "there",
		deliveryLabel: fullDate(d.scheduledDate),
		cutoffLabel: fullDate(cutoffDateFor(d.scheduledDate)),
		address: [
			d.line1,
			d.line2,
			d.city,
			d.postcode
		].filter(Boolean).join(", "),
		addonsUrl: addonsAvailable && d.addonAccessToken ? `${SITE}/addons/${d.addonAccessToken}` : void 0
	})));
	const sent = results.filter((r) => r.status === "fulfilled").length;
	const failed = results.length - sent;
	return json({
		targetDate: targetDateString,
		checked: upcoming.length,
		sent,
		failed
	});
};

export { GET };
//# sourceMappingURL=_server.ts.js-cqpLch5M.js.map
