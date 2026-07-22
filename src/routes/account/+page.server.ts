import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { alias } from 'drizzle-orm/mysql-core';
import { and, asc, eq, inArray, ne } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	plans,
	deliveries,
	addresses,
	subscriberAddons,
	deliveryAddons,
	addons as addonsTable
} from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';

// Cut-off is derived (no field on deliveries). Change the rule/offset to match ops.
const CUTOFF_DAYS = 4;

const weekdayOf = (d: Date) => new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(d);
const monthOf = (d: Date) => new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(d);
const fullDateLabel = (d: Date) => `${weekdayOf(d)}, ${d.getDate()} ${monthOf(d)}`;

const intervalLabel = (i: string) =>
	i === 'monthly' ? 'monthly' : i === 'bi_monthly' ? 'bi-monthly' : 'one-time';

async function getSubscriber(userId: string) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}

// Every mutation below re-checks this — never trust a posted subscriptionId on its own.
async function getOwnedSubscription(subscriberId: string, subscriptionId: string) {
	const [row] = await db
		.select()
		.from(subscriptions)
		.where(
			and(eq(subscriptions.id, subscriptionId), eq(subscriptions.subscriberId, subscriberId))
		);
	return row ?? null;
}

export const load: PageServerLoad = async ({ locals }) => {
	// Private page — adjust to your Better Auth session.
	if (!locals.user) throw redirect(303, '/signin');

	const sub = await getSubscriber(locals.user.id);
	if (!sub) return { subscriptions: [], addons: [] };

	const pendingPlan = alias(plans, 'pending_plan');

	// One row per subscription this subscriber holds — this is the whole point:
	// someone can be on the Regular plan AND a honey add-on subscription at once.
	const rows = await db
		.select({
			id: subscriptions.id,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			pendingPlanAt: subscriptions.pendingPlanAt,
			planName: plans.name,
			pricePence: plans.pricePence,
			packs: plans.packs,
			interval: plans.interval,
			addressLine1: addresses.line1,
			addressCity: addresses.city,
			pendingPlanName: pendingPlan.name
		})
		.from(subscriptions)
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.leftJoin(addresses, eq(addresses.id, subscriptions.addressId))
		.leftJoin(pendingPlan, eq(pendingPlan.id, subscriptions.pendingPlanId))
		.where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, 'cancelled')))
		.orderBy(asc(plans.sortOrder));

	const subscriptionIds = rows.map((r) => r.id);

	// Soonest upcoming delivery per subscription, fetched in one batch.
	const upcoming = subscriptionIds.length
		? await db
				.select({
					id: deliveries.id,
					subscriptionId: deliveries.subscriptionId,
					scheduledDate: deliveries.scheduledDate,
					line1: addresses.line1,
					city: addresses.city
				})
				.from(deliveries)
				.innerJoin(addresses, eq(deliveries.addressId, addresses.id))
				.where(
					and(
						inArray(deliveries.subscriptionId, subscriptionIds),
						eq(deliveries.status, 'scheduled')
					)
				)
				.orderBy(asc(deliveries.scheduledDate))
		: [];

	const nextDeliveryBySub = new Map<string, (typeof upcoming)[number]>();
	for (const d of upcoming) {
		if (!nextDeliveryBySub.has(d.subscriptionId)) nextDeliveryBySub.set(d.subscriptionId, d);
	}

	// Recurring add-ons feed into each subscription's own next-payment amount.
	const recurring = subscriptionIds.length
		? await db
				.select({
					subscriptionId: subscriberAddons.subscriptionId,
					pricePence: addonsTable.pricePence,
					quantity: subscriberAddons.quantity
				})
				.from(subscriberAddons)
				.innerJoin(addonsTable, eq(subscriberAddons.addonId, addonsTable.id))
				.where(inArray(subscriberAddons.subscriptionId, subscriptionIds))
		: [];

	const recurringPenceBySub = new Map<string, number>();
	for (const a of recurring) {
		recurringPenceBySub.set(
			a.subscriptionId,
			(recurringPenceBySub.get(a.subscriptionId) ?? 0) + a.pricePence * a.quantity
		);
	}

	const subscriptionCards = rows.map((r) => {
		// Quantity multiplies the plan price only. Add-ons keep their own quantity
		// and are NOT scaled by the subscription quantity.
		const qty = r.quantity ?? 1;
		const addonsPence = recurringPenceBySub.get(r.id) ?? 0;

		const delivery = nextDeliveryBySub.get(r.id);
		let nextDelivery = null;
		if (delivery) {
			const d = new Date(delivery.scheduledDate);
			const cut = new Date(d);
			cut.setDate(cut.getDate() - CUTOFF_DAYS);
			nextDelivery = {
				id: delivery.id,
				dateLabel: fullDateLabel(d),
				cutoffLabel: fullDateLabel(cut),
				addressLine: `${delivery.line1}, ${delivery.city}`
			};
		}

		return {
			id: r.id,
			planName: r.planName,
			packsLabel: `${r.packs} packs · ${intervalLabel(r.interval)}`,
			quantity: qty,
			unitPricePence: r.pricePence,
			pricePence: r.pricePence * qty + addonsPence,
			status: r.status, // 'pending' | 'active' | 'paused' | 'cancelled'
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			nextPaymentDate: r.currentPeriodEnd ? fullDateLabel(new Date(r.currentPeriodEnd)) : null,
			pendingPlanName: r.pendingPlanName,
			pendingPlanAt: r.pendingPlanAt ? fullDateLabel(new Date(r.pendingPlanAt)) : null,
			addressLine: r.addressLine1 ? `${r.addressLine1}, ${r.addressCity}` : null,
			nextDelivery
		};
	});

	const catalogue = await db.select().from(addonsTable).orderBy(addonsTable.sortOrder);

	return {
		subscriptions: subscriptionCards,
		addons: catalogue.map((a) => ({
			id: a.id,
			name: a.name,
			pricePence: a.pricePence,
			desc: a.description ?? ''
		}))
	};
};

export const actions: Actions = {
	// Skip a given delivery.
	skip: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const id = String((await request.formData()).get('deliveryId') ?? '');
		if (!id) return fail(400, { message: 'Missing delivery.' });

		// Ownership enforced in the WHERE clause.
		await db
			.update(deliveries)
			.set({ status: 'skipped' })
			.where(and(eq(deliveries.id, id), eq(deliveries.subscriberId, sub.id)));

		return { message: 'Delivery skipped.' };
	},

	// Pause a single subscription (a subscriber may have others still running).
	pause: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const subscriptionId = String((await request.formData()).get('subscriptionId') ?? '');
		const owned = await getOwnedSubscription(sub.id, subscriptionId);
		if (!owned) return fail(400, { message: 'That plan could not be found.' });
		if (owned.status !== 'active') {
			return fail(400, { message: 'Only active plans can be paused.' });
		}

		// ── Stripe hook point: pause_collection on this subscription ──
		await db
			.update(subscriptions)
			.set({ status: 'paused' })
			.where(eq(subscriptions.id, subscriptionId));

		return { message: 'Plan paused.' };
	},

	resume: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const subscriptionId = String((await request.formData()).get('subscriptionId') ?? '');
		const owned = await getOwnedSubscription(sub.id, subscriptionId);
		if (!owned) return fail(400, { message: 'That plan could not be found.' });
		if (owned.status !== 'paused') {
			return fail(400, { message: 'Only paused plans can be resumed.' });
		}

		// ── Stripe hook point: remove pause_collection on this subscription ──
		await db
			.update(subscriptions)
			.set({ status: 'active' })
			.where(eq(subscriptions.id, subscriptionId));

		return { message: 'Plan resumed.' };
	},

	// Add a one-off add-on to a specific upcoming delivery.
	addAddon: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const data = await request.formData();
		const addonId = String(data.get('addonId') ?? '');
		const deliveryId = String(data.get('deliveryId') ?? '');
		const quantity = Math.max(0, Number(data.get('quantity') ?? 0));
		if (!addonId || !deliveryId || quantity < 1) return fail(400, { message: 'Nothing to add.' });

		// Ownership + availability enforced together.
		const [delivery] = await db
			.select({ id: deliveries.id })
			.from(deliveries)
			.where(
				and(
					eq(deliveries.id, deliveryId),
					eq(deliveries.subscriberId, sub.id),
					eq(deliveries.status, 'scheduled')
				)
			);
		if (!delivery) return fail(400, { message: 'That delivery is no longer available.' });

		const [addon] = await db.select().from(addonsTable).where(eq(addonsTable.id, addonId));
		if (!addon) return fail(400, { message: 'Unknown add-on.' });

		const [existing] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, delivery.id), eq(deliveryAddons.addonId, addonId)));

		if (existing) {
			await db
				.update(deliveryAddons)
				.set({ quantity: existing.quantity + quantity })
				.where(eq(deliveryAddons.id, existing.id));
		} else {
			await db.insert(deliveryAddons).values({
				id: crypto.randomUUID(),
				deliveryId: delivery.id,
				addonId,
				quantity
			});
		}

		return { message: `${addon.name} added to your next delivery.` };
	},

	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
	}
};