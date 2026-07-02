import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { and, asc, eq } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	plans,
	deliveries,
	addresses,
	subscriberAddons,
	deliveryAddons,
	addons as addonsTable
} from '$lib/server/db/schema';

// Cut-off is derived (no field on deliveries). Change the rule/offset to match ops.
const CUTOFF_DAYS = 4;

const weekdayOf = (d: Date) => new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(d);
const monthOf = (d: Date) => new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(d);

const intervalLabel = (i: string) =>
	i === 'monthly' ? 'monthly' : i === 'bi_monthly' ? 'bi-monthly' : 'one-time';

async function getSubscriber(userId: string) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}

export const load: PageServerLoad = async ({ locals }) => {
	// Private page — adjust to your Better Auth session.
	if (!locals.user) throw redirect(303, '/signin');

	const sub = await getSubscriber(locals.user.id);
	if (!sub) return { subscription: null, nextDelivery: null, addons: [] };

	const [plan] = await db.select().from(plans).where(eq(plans.slug, sub.plan));

	// Soonest upcoming delivery + its address.
	const [delivery] = await db
		.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			line1: addresses.line1,
			city: addresses.city
		})
		.from(deliveries)
		.innerJoin(addresses, eq(deliveries.addressId, addresses.id))
		.where(and(eq(deliveries.subscriberId, sub.id), eq(deliveries.status, 'scheduled')))
		.orderBy(asc(deliveries.scheduledDate))
		.limit(1);

	// Recurring add-ons feed into the next-payment amount.
	const recurring = await db
		.select({ pricePence: addonsTable.pricePence, quantity: subscriberAddons.quantity })
		.from(subscriberAddons)
		.innerJoin(addonsTable, eq(subscriberAddons.addonId, addonsTable.id))
		.where(eq(subscriberAddons.subscriberId, sub.id));

	const recurringPence = recurring.reduce((s, a) => s + a.pricePence * a.quantity, 0);
	const nextPaymentPence = (plan?.pricePence ?? 0) + recurringPence;

	const catalogue = await db.select().from(addonsTable).orderBy(addonsTable.sortOrder);

	// Delivery + cut-off labels.
	let nextDelivery = null;
	if (delivery) {
		const d = new Date(delivery.scheduledDate);
		const cut = new Date(d);
		cut.setDate(cut.getDate() - CUTOFF_DAYS);

		nextDelivery = {
			id: delivery.id,
			dateLabel: `${weekdayOf(d)}, ${d.getDate()} ${monthOf(d)}`, // "Saturday, 18 April"
			cutoffLabel: `${weekdayOf(cut)} ${cut.getDate()} ${monthOf(cut)}`, // "Sunday 14 April"
			addressLine: `${delivery.line1}, ${delivery.city}`,
			planLabel: `${plan?.name ?? sub.plan} · ${plan?.packs ?? '—'} packs`
		};
	}

	return {
		subscription: {
			planName: plan?.name ?? sub.plan,
			packsLabel: `${plan?.packs ?? '—'} packs · ${intervalLabel(plan?.interval ?? 'monthly')}`,
			pricePence: nextPaymentPence,
			status: sub.status, // 'active' | 'paused' | 'cancelled'
			// Next-payment DATE lives in Stripe (current_period_end), not the DB.
			// Fill from the Stripe subscription once wired; null renders as "—".
			nextPaymentDate: null as string | null
		},
		nextDelivery,
		addons: catalogue.map((a) => ({
			id: a.id,
			name: a.name,
			pricePence: a.pricePence,
			desc: a.description ?? ''
		}))
	};
};

export const actions: Actions = {
	// Skip the given delivery.
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

	pause: async ({ locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		// ── Stripe hook point: pause_collection on the subscription ──
		await db.update(subscribers).set({ status: 'paused' }).where(eq(subscribers.id, sub.id));
		return { message: 'Subscription paused.' };
	},

	resume: async ({ locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		await db.update(subscribers).set({ status: 'active' }).where(eq(subscribers.id, sub.id));
		return { message: 'Subscription resumed.' };
	},

	// Add an add-on to the next delivery (increments if already present).
	addAddon: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const data = await request.formData();
		const addonId = String(data.get('addonId') ?? '');
		const quantity = Math.max(0, Number(data.get('quantity') ?? 0));
		if (!addonId || quantity < 1) return fail(400, { message: 'Nothing to add.' });

		// Target the soonest upcoming delivery, verifying ownership.
		const [delivery] = await db
			.select({ id: deliveries.id })
			.from(deliveries)
			.where(and(eq(deliveries.subscriberId, sub.id), eq(deliveries.status, 'scheduled')))
			.orderBy(asc(deliveries.scheduledDate))
			.limit(1);
		if (!delivery) return fail(400, { message: 'No upcoming delivery to add to.' });

		// Validate the add-on exists.
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
	}
};