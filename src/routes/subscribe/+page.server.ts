import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, and, asc } from 'drizzle-orm';
import { stripe } from '$lib/server/stripe';

// Adjust these two imports to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	addresses,
	subscriberAddons,
	giftOrders,
	addons as addonsTable,
	plans
} from '$lib/server/db/schema';

import {
	checkoutSchema,
	updateSubscriptionSchema,
	cancelSubscriptionSchema,
	type FormMessage
} from './schema';

/* PLAN_CONFIG is only used by the gift flow now (subscriptions read the plan,
 * with its Stripe price id, straight from the DB). */
const PLAN_CONFIG = {
	'one-off': { pricePence: 650, packs: 1, kind: 'order' },
	starter: { pricePence: 1200, packs: 2, kind: 'subscription', dbPlan: 'starter' },
	regular: { pricePence: 2400, packs: 4, kind: 'subscription', dbPlan: 'regular' },
	'single-gift': { pricePence: 850, packs: 1, kind: 'gift' },
	'double-gift': { pricePence: 1500, packs: 2, kind: 'gift' }
} as const satisfies Record<string, { pricePence: number; packs: number; kind: string; dbPlan?: string }>;

/** Validate submitted addon ids against the live catalogue; return the rows + total. */
async function resolveAddons(ids: string[]) {
	if (ids.length === 0) return { rows: [], pence: 0, unknown: false };
	const catalogue = await db.select().from(addonsTable);
	const rows = catalogue.filter((a) => ids.includes(a.id));
	return {
		rows,
		pence: rows.reduce((sum, a) => sum + a.pricePence, 0),
		unknown: rows.length !== ids.length
	};
}

type PlanRow = typeof plans.$inferSelect;

// DB row -> the shape your page already uses
const toPlan = (p: PlanRow) => ({
	id: p.slug,
	name: p.name,
	sub: p.subtitle ?? '',
	price: p.pricePence / 100,
	freq: p.freqLabel ?? '',
	bullet: p.bullets?.[0],
	bullet2: p.bullets?.[1],
	featured: p.featured
});

export const load: PageServerLoad = async () => {
	const catalogue = await db.select().from(addonsTable).orderBy(addonsTable.sortOrder);
	const form = await superValidate(zod4(checkoutSchema));

	const rows = await db
		.select()
		.from(plans)
		.where(eq(plans.active, true))
		.orderBy(asc(plans.sortOrder));

	const subscriptionPlans = rows.filter((p) => p.kind !== 'gift').map(toPlan);
	const giftPlans = rows.filter((p) => p.kind === 'gift').map(toPlan);

	return { form, subscriptionPlans, giftPlans, addons: catalogue };
};

export const actions: Actions = {
	/* ──────────────────────────────────────────────────────────────
	 * SUBSCRIBE — "For me" flow.
	 * Creates the subscriber (pending) + delivery address, then hands off
	 * to Stripe Checkout. The webhook activates the subscriber, writes the
	 * recurring add-ons and schedules the first delivery once paid.
	 * ────────────────────────────────────────────────────────────── */
	subscribe: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod4(checkoutSchema));
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'me') {
			return message(form, { type: 'error', text: 'Wrong flow for a subscription.' } satisfies FormMessage, {
				status: 400
			});
		}

		const user = locals.user;
		if (!user) {
			return message(form, { type: 'error', text: 'Please sign in to start a subscription.' } satisfies FormMessage, {
				status: 401
			});
		}

		// Resolve the plan from the DB — it carries the Stripe price id.
		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));

		if (!plan || plan.kind !== 'subscription') {
			return message(form, { type: 'error', text: "That plan isn't available as a subscription." } satisfies FormMessage, {
				status: 400
			});
		}
		if (!plan.stripePriceId) {
			return message(
				form,
				{ type: 'error', text: 'This plan has no Stripe price set — add stripePriceId in the admin.' } satisfies FormMessage,
				{ status: 500 }
			);
		}

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		// Upsert the subscriber (pending) + create the delivery address.
		let subscriberId = '';
		let addressId = '';
		let stripeCustomerId: string | null = null;

		try {
			await db.transaction(async (tx) => {
				const [existing] = await tx.select().from(subscribers).where(eq(subscribers.userId, user.id));

				if (existing) {
					subscriberId = existing.id;
					stripeCustomerId = existing.stripeCustomerId ?? null;
					await tx
						.update(subscribers)
						.set({
							plan: plan.slug as 'starter' | 'regular',
							marketingOptIn: form.data.marketingOptIn
						})
						.where(eq(subscribers.id, existing.id));
				} else {
					subscriberId = crypto.randomUUID();
					await tx.insert(subscribers).values({
						id: subscriberId,
						userId: user.id,
						email: user.email,
						fullName: user.name ?? null,
						phone: null,
						plan: plan.slug as 'starter' | 'regular',
						status: 'pending', // requires 'pending' in the status enum
						marketingOptIn: form.data.marketingOptIn
					});
				}

				addressId = crypto.randomUUID();
				await tx.insert(addresses).values({
					id: addressId,
					subscriberId,
					label: form.data.addressLabel || null,
					line1: form.data.line1,
					line2: form.data.line2 || null,
					city: form.data.city || 'London',
					postcode: form.data.postcode,
					isPrimary: true
				});
			});
		} catch (e) {
			console.error('subscribe (db) failed', e);
			return message(form, { type: 'error', text: 'Something went wrong starting your subscription.' } satisfies FormMessage, {
				status: 500
			});
		}

		// Add-ons need their own recurring Stripe prices to be billed. Any without
		// a stripePriceId are still attached (via metadata) but won't be charged.
		const addonLineItems = chosenAddons
			.map((a) => (a as { stripePriceId?: string | null }).stripePriceId)
			.filter((price): price is string => !!price)
			.map((price) => ({ price, quantity: 1 }));

		const lineItems = [{ price: plan.stripePriceId, quantity: 1 }, ...addonLineItems];

		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: 'subscription',
				customer: stripeCustomerId ?? undefined,
				customer_email: stripeCustomerId ? undefined : user.email,
				line_items: lineItems,
				success_url: `${url.origin}/account?welcome=1`,
				cancel_url: `${url.origin}/subscribe`,
				metadata: {
					subscriberId,
					addressId,
					addonIds: chosenAddons.map((a) => a.id).join(',')
				},
				subscription_data: {
					metadata: { subscriberId }
				}
			});
		} catch (e) {
			console.error('stripe checkout create failed', e);
			return message(form, { type: 'error', text: 'Could not start checkout. Please try again.' } satisfies FormMessage, {
				status: 500
			});
		}

		// redirect() throws, so nothing runs after it.
		redirect(303, session.url!);
	},

	/* ──────────────────────────────────────────────────────────────
	 * GIFT — "As a gift" flow. Guests allowed. (No Stripe yet — placeholder.)
	 * ────────────────────────────────────────────────────────────── */
	gift: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(checkoutSchema));
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'gift') {
			return message(form, { type: 'error', text: 'Wrong flow for a gift.' } satisfies FormMessage, { status: 400 });
		}

		const cfg = PLAN_CONFIG[form.data.plan];
		if (cfg.kind !== 'gift') return setError(form, 'plan', 'Choose a gift pack.');

		const buyerEmail = form.data.buyerEmail ?? locals.user?.email;
		if (!buyerEmail) {
			return setError(form, 'buyerEmail', 'Enter your email so we can send the confirmation.');
		}

		const { pence: addonsPence, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		const amountPence = cfg.pricePence + addonsPence;

		try {
			await db.insert(giftOrders).values({
				id: crypto.randomUUID(),
				buyerEmail,
				buyerName: form.data.buyerName || locals.user?.name || null,
				recipientName: form.data.recipientName,
				recipientAddress: {
					line1: form.data.line1,
					line2: form.data.line2 || null,
					city: form.data.city || 'London',
					postcode: form.data.postcode
				},
				giftMessage: form.data.giftMessage || null,
				durationMonths: form.data.durationMonths,
				status: 'pending'
			});
		} catch (e) {
			console.error('gift failed', e);
			return message(form, { type: 'error', text: 'Something went wrong creating the gift order.' } satisfies FormMessage, {
				status: 500
			});
		}

		return message(form, {
			type: 'success',
			text: `Gift order created — £${(amountPence / 100).toFixed(2)}. Next: payment.`
		} satisfies FormMessage);
	},

	/* UPDATE (manage page — no UI on this page) */
	updateSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(updateSubscriptionSchema));
		if (!form.valid) return fail(400, { form });

		const user = locals.user;
		if (!user) return fail(401, { form });

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		try {
			await db.transaction(async (tx) => {
				const [owned] = await tx
					.select()
					.from(subscribers)
					.where(and(eq(subscribers.id, form.data.subscriberId), eq(subscribers.userId, user.id)));
				if (!owned) throw new Error('not found or not owned');

				await tx
					.update(subscribers)
					.set({
						plan: form.data.plan,
						status: 'active',
						marketingOptIn: form.data.marketingOptIn
					})
					.where(eq(subscribers.id, owned.id));

				await tx.delete(subscriberAddons).where(eq(subscriberAddons.subscriberId, owned.id));
				if (chosenAddons.length) {
					await tx.insert(subscriberAddons).values(
						chosenAddons.map((a) => ({ subscriberId: owned.id, addonId: a.id, quantity: 1 }))
					);
				}
			});
		} catch (e) {
			console.error('updateSubscription failed', e);
			return message(form, { type: 'error', text: 'Could not update your subscription.' } satisfies FormMessage, {
				status: 400
			});
		}

		return message(form, { type: 'success', text: 'Subscription updated.' } satisfies FormMessage);
	},

	/* CANCEL (soft cancel) */
	cancelSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(cancelSubscriptionSchema));
		if (!form.valid) return fail(400, { form });

		const user = locals.user;
		if (!user) return fail(401, { form });

		try {
			// Stripe: also stripe.subscriptions.update(id, { cancel_at_period_end: true })
			await db
				.update(subscribers)
				.set({ status: 'cancelled' })
				.where(and(eq(subscribers.id, form.data.subscriberId), eq(subscribers.userId, user.id)));
		} catch (e) {
			console.error('cancelSubscription failed', e);
			return message(form, { type: 'error', text: 'Could not cancel your subscription.' } satisfies FormMessage, {
				status: 400
			});
		}

		return message(form, { type: 'success', text: 'Subscription cancelled.' } satisfies FormMessage);
	}
};