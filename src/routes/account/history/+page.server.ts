import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { and, desc, eq, inArray, ne } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	plans,
	deliveries,
	deliveryAddons,
	addons as addonsTable
} from '$lib/server/db/schema';

const dateLabel = (d: Date | string) =>
	new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
		new Date(d)
	);

const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;

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

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/signin');

	const sub = await getSubscriber(locals.user.id);
	if (!sub) return { orders: [] };

	// Past deliveries only — 'scheduled' ones are upcoming, not history yet.
	const rows = await db
		.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status,
			planName: plans.name,
			packs: plans.packs,
			pricePence: plans.pricePence
		})
		.from(deliveries)
		.innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.where(and(eq(deliveries.subscriberId, sub.id), ne(deliveries.status, 'scheduled')))
		.orderBy(desc(deliveries.scheduledDate));

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

		const addonSummary = addonsForDelivery.map((a) => `${a.quantity}× ${a.name}`).join(', ');
		const items = addonSummary
			? `${r.planName} · ${r.packs} packs + ${addonSummary}`
			: `${r.planName} · ${r.packs} packs`;

		return {
			id: r.id,
			date: dateLabel(r.scheduledDate),
			items,
			amount: gbp(r.pricePence + addonPence),
			status: statusText[r.status] ?? r.status,
			statusKey: r.status
		};
	});

	return { orders };
};