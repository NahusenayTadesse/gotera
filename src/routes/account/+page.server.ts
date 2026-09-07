import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { alias } from 'drizzle-orm/mysql-core';
import { and, asc, eq, inArray, ne } from 'drizzle-orm';
import { z } from 'zod/v4';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	plans,
	deliveries,
	addresses,
	subscriberAddons,
	addons as addonsTable
} from '$lib/server/db/schema';
import { auth } from '$lib/server/auth';
import { stripe } from '$lib/server/stripe';
import { fullDate, instantDate } from '$lib/format';
import { cutoffDateFor, isPastCutoff } from '$lib/delivery';

const intervalLabel = (i: string) =>
	i === 'monthly' ? 'monthly' : i === 'bi_monthly' ? 'bi-monthly' : 'one-time';

// Hand-parsed form fields are easy to get wrong (`Number('x')` is NaN, and
// `NaN < 1` is false), so every mutating action validates through a schema.
const deliveryIdSchema = z.object({ deliveryId: z.string().min(1) });
const subscriptionIdSchema = z.object({ subscriptionId: z.string().min(1) });
/** Matches MAX_QTY on /addons/[token] and the dashboard's own add-on quantity cap. */
const MAX_QTY = 20;

function parseForm<T extends z.ZodType>(schema: T, data: FormData): z.infer<T> | null {
	const result = schema.safeParse(Object.fromEntries(data));
	return result.success ? result.data : null;
}

async function getSubscriber(userId: string) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}

// Every mutation below re-checks this — never trust a posted subscriptionId on its own.
async function getOwnedSubscription(subscriberId: string, subscriptionId: string) {
	const [row] = await db
		.select()
		.from(subscriptions)
		.where(and(eq(subscriptions.id, subscriptionId), eq(subscriptions.subscriberId, subscriberId)));
	return row ?? null;
}

/** Ownership, availability and cut-off in one place — used by `skip` and `addAddon`. */
async function getChangeableDelivery(subscriberId: string, deliveryId: string) {
	const [delivery] = await db
		.select({ id: deliveries.id, scheduledDate: deliveries.scheduledDate })
		.from(deliveries)
		.where(
			and(
				eq(deliveries.id, deliveryId),
				eq(deliveries.subscriberId, subscriberId),
				eq(deliveries.status, 'scheduled')
			)
		);

	if (!delivery) return { delivery: null, error: 'That delivery is no longer available.' as const };
	if (isPastCutoff(delivery.scheduledDate)) {
		return { delivery: null, error: 'The cut-off for this delivery has passed.' as const };
	}
	return { delivery, error: null };
}

export const load: PageServerLoad = async ({ locals }) => {
	// Private page — adjust to your Better Auth session.
	if (!locals.user) throw redirect(303, '/login');

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
			nextDelivery = {
				id: delivery.id,
				dateLabel: fullDate(delivery.scheduledDate),
				cutoffLabel: fullDate(cutoffDateFor(delivery.scheduledDate)),
				// Drives whether the UI offers Skip / Add at all.
				pastCutoff: isPastCutoff(delivery.scheduledDate),
				addressLine: `${delivery.line1}, ${delivery.city}`
			};
		}

		return {
			id: r.id,
			planName: r.planName,
			packsLabel: `${r.packs} packs · ${intervalLabel(r.interval)}`,
			interval: r.interval,
			quantity: qty,
			unitPricePence: r.pricePence,
			pricePence: r.pricePence * qty + addonsPence,
			status: r.status, // 'pending' | 'active' | 'paused' | 'cancelled'
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			nextPaymentDate: r.currentPeriodEnd ? instantDate(r.currentPeriodEnd) : null,
			pendingPlanName: r.pendingPlanName,
			pendingPlanAt: r.pendingPlanAt ? instantDate(r.pendingPlanAt) : null,
			addressLine: r.addressLine1 ? `${r.addressLine1}, ${r.addressCity}` : null,
			nextDelivery
		};
	});

	const catalogue = await db
		.select()
		.from(addonsTable)
		.where(eq(addonsTable.isActive, true))
		.orderBy(addonsTable.sortOrder);

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

		const input = parseForm(deliveryIdSchema, await request.formData());
		if (!input) return fail(400, { message: 'Missing delivery.' });

		// Ownership, 'scheduled' status and the cut-off are all enforced before the write,
		// so a dispatched or delivered order can never be flipped to 'skipped'.
		const { delivery, error } = await getChangeableDelivery(sub.id, input.deliveryId);
		if (!delivery) return fail(400, { message: error });

		await db
			.update(deliveries)
			.set({ status: 'skipped' })
			.where(
				and(
					eq(deliveries.id, delivery.id),
					eq(deliveries.subscriberId, sub.id),
					eq(deliveries.status, 'scheduled')
				)
			);

		return { message: 'Delivery skipped.' };
	},

	// Pause a single subscription (a subscriber may have others still running).
	pause: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const input = parseForm(subscriptionIdSchema, await request.formData());
		if (!input) return fail(400, { message: 'That plan could not be found.' });

		const owned = await getOwnedSubscription(sub.id, input.subscriptionId);
		if (!owned) return fail(400, { message: 'That plan could not be found.' });
		if (owned.status !== 'active') {
			return fail(400, { message: 'Only active plans can be paused.' });
		}

		// ── Stripe hook point: pause_collection on this subscription ──
		await db.update(subscriptions).set({ status: 'paused' }).where(eq(subscriptions.id, owned.id));

		return { message: 'Plan paused.' };
	},

	resume: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const input = parseForm(subscriptionIdSchema, await request.formData());
		if (!input) return fail(400, { message: 'That plan could not be found.' });

		const owned = await getOwnedSubscription(sub.id, input.subscriptionId);
		if (!owned) return fail(400, { message: 'That plan could not be found.' });
		if (owned.status !== 'paused') {
			return fail(400, { message: 'Only paused plans can be resumed.' });
		}

		// ── Stripe hook point: remove pause_collection on this subscription ──
		await db.update(subscriptions).set({ status: 'active' }).where(eq(subscriptions.id, owned.id));

		return { message: 'Plan resumed.' };
	},

	/**
	 * Buy a one-off add-on for a specific upcoming delivery.
	 *
	 * This does NOT write `deliveryAddons` — it only starts a Stripe payment. Fulfilment
	 * happens in the webhook's `handleDeliveryAddonPurchase`, the same handler the
	 * /addons/[token] email page uses, so both routes share one dedupe key
	 * (`delivery_addon_purchases.stripe_payment_intent_id`) and one confirmation email.
	 * Writing the add-on here as well would hand it over before the customer had paid.
	 */
	addAddon: async ({ request, locals, url }) => {
		if (!locals.user) return fail(401, { message: 'Not signed in.' });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: 'No subscription found.' });

		const formData = await request.formData();
		const input = parseForm(deliveryIdSchema, formData);
		if (!input) return fail(400, { message: 'Nothing to add.' });

		const { delivery, error } = await getChangeableDelivery(sub.id, input.deliveryId);
		if (!delivery) return fail(400, { message: error });

		// The basket is read from the live catalogue rather than from posted ids, so a
		// deactivated add-on simply isn't in the loop — a tab opened before it was pulled
		// can't buy it, and prices always come from the DB, never the form.
		const catalogue = await db
			.select()
			.from(addonsTable)
			.where(eq(addonsTable.isActive, true));

		const items: { id: string; name: string; pricePence: number; quantity: number }[] = [];
		for (const addon of catalogue) {
			const raw = formData.get(`qty_${addon.id}`);
			if (raw === null) continue;
			const qty = Number(raw);
			if (!Number.isInteger(qty) || qty < 0 || qty > MAX_QTY) {
				return fail(400, { message: 'Invalid quantity.' });
			}
			if (qty > 0) {
				items.push({ id: addon.id, name: addon.name, pricePence: addon.pricePence, quantity: qty });
			}
		}

		if (items.length === 0) return fail(400, { message: 'Pick at least one extra.' });

		// Stripe caps a metadata value at 500 chars and the webhook keys fulfilment off this
		// one, so refuse a basket that wouldn't survive the round trip instead of letting
		// Stripe reject the session with an opaque error.
		const itemsJson = JSON.stringify(items.map((i) => ({ id: i.id, quantity: i.quantity })));
		if (itemsJson.length > 500) {
			return fail(400, { message: 'Too many different extras in one go — please split it across two payments.' });
		}

		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: 'payment',
				customer_email: sub.email,
				// Priced from `pricePence` server-side; a posted price is never trusted.
				line_items: items.map((item) => ({
					price_data: {
						currency: 'gbp',
						product_data: { name: item.name },
						unit_amount: item.pricePence
					},
					quantity: item.quantity
				})),
				success_url: `${url.origin}/account?addons=success`,
				cancel_url: `${url.origin}/account?addons=canceled`,
				payment_intent_data: { metadata: { kind: 'delivery-addon', deliveryId: delivery.id } },
				metadata: {
					kind: 'delivery-addon',
					deliveryId: delivery.id,
					items: itemsJson
				}
			});
		} catch (e) {
			console.error('account addAddon checkout failed', e);
			return fail(500, { message: 'Could not start payment. Please try again.' });
		}

		redirect(303, session.url!);
	},

	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		// Clear the page's data and land somewhere public — without this the customer
		// stays on /account looking at a signed-in view they no longer have a session for.
		redirect(303, '/login');
	}
};
