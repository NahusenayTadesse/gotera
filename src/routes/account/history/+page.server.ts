import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { and, desc, eq, inArray, ne, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	plans,
	deliveries,
	deliveryAddons,
	addons as addonsTable
} from '$lib/server/db/schema';

import { money, shortDate } from '$lib/format';
import { subscriptionUnitPrice } from '$lib/server/plans';

// The plan a delivery was booked on — may differ from the subscription's plan today.
const bookedPlan = alias(plans, 'booked_plan');

// Cap the page — a long-standing subscriber shouldn't pull every delivery they've
// ever had on each visit.
const PAGE_SIZE = 50;

const statusText: Record<string, string> = {
	delivered: 'Delivered',
	dispatched: 'Dispatched',
	skipped: 'Skipped',
	failed: 'Failed'
};

async function getSubscriber(userId: string) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(303, '/login');

	const sub = await getSubscriber(locals.user.id);
	if (!sub) return { orders: [], hasMore: false, limit: PAGE_SIZE };

	const limit = Math.min(
		Math.max(Number(url.searchParams.get('limit')) || PAGE_SIZE, PAGE_SIZE),
		500
	);

	// Past deliveries only — 'scheduled' ones are upcoming, not history yet.
	//
	// Each delivery carries a snapshot (plan, packs, quantity, unit price) taken when it
	// was booked, so a later price change or plan switch doesn't rewrite the past. Rows
	// from before the snapshot existed fall back to the subscription as it is today.
	const rows = await db
		.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status,
			planName: sql<string>`coalesce(${bookedPlan.name}, ${plans.name})`,
			packs: sql<number>`coalesce(${deliveries.packs}, ${plans.packs})`.mapWith(Number),
			quantity: sql<number>`coalesce(${deliveries.quantity}, ${subscriptions.quantity})`.mapWith(Number),
			pricePence: sql<number>`coalesce(${deliveries.unitPricePence}, ${subscriptionUnitPrice})`.mapWith(Number)
		})
		.from(deliveries)
		.innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.leftJoin(bookedPlan, eq(bookedPlan.id, deliveries.planId))
		.where(and(eq(deliveries.subscriberId, sub.id), ne(deliveries.status, 'scheduled')))
		.orderBy(desc(deliveries.scheduledDate))
		.limit(limit + 1);

	const hasMore = rows.length > limit;
	if (hasMore) rows.pop();

	const deliveryIds = rows.map((r) => r.id);

	// One-off add-ons attached to each delivery, batched in a single query.
	const addonRows = deliveryIds.length
		? await db
				.select({
					deliveryId: deliveryAddons.deliveryId,
					name: addonsTable.name,
					pricePence: addonsTable.pricePence,
					quantity: deliveryAddons.quantity
				})
				.from(deliveryAddons)
				.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId))
				.where(inArray(deliveryAddons.deliveryId, deliveryIds))
		: [];

	const addonsByDelivery = new Map<string, typeof addonRows>();
	for (const a of addonRows) {
		const list = addonsByDelivery.get(a.deliveryId) ?? [];
		list.push(a);
		addonsByDelivery.set(a.deliveryId, list);
	}

	const orders = rows.map((r) => {
		const addonsForDelivery = addonsByDelivery.get(r.id) ?? [];
		const addonPence = addonsForDelivery.reduce((s, a) => s + a.pricePence * a.quantity, 0);
		const qty = r.quantity ?? 1;

		const addonSummary = addonsForDelivery.map((a) => `${a.quantity}× ${a.name}`).join(', ');
		const packsLabel = qty > 1 ? `${r.packs} packs ×${qty}` : `${r.packs} packs`;
		const items = addonSummary
			? `${r.planName} · ${packsLabel} + ${addonSummary}`
			: `${r.planName} · ${packsLabel}`;

		return {
			id: r.id,
			date: shortDate(r.scheduledDate),
			items,
			// Plan price scales with quantity; add-ons carry their own.
			amount: money(r.pricePence * qty + addonPence),
			status: statusText[r.status] ?? r.status,
			statusKey: r.status
		};
	});

	return { orders, hasMore, limit };
};
