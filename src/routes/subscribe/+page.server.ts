import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, and, asc } from 'drizzle-orm';

// Adjust these two imports to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	addresses,
	subscriberAddons,
	deliveries,
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

/* ── Authoritative server-side pricing (never trust client numbers) ──
 * Plans aren't in the DB (there's no plans table), so they live here.
 * pricePence is the source of truth for the total. */
const PLAN_CONFIG = {
	'one-off': { pricePence: 650, packs: 1, kind: 'order' },
	starter: { pricePence: 1200, packs: 2, kind: 'subscription', dbPlan: 'starter' },
	regular: { pricePence: 2400, packs: 4, kind: 'subscription', dbPlan: 'regular' },
	'single-gift': { pricePence: 850, packs: 1, kind: 'gift' },
	'double-gift': { pricePence: 1500, packs: 2, kind: 'gift' }
} as const satisfies Record<string, { pricePence: number; packs: number; kind: string; dbPlan?: string }>;

/** Next Saturday (never today). Returned as a Date for the `date` column. */
function nextSaturday(from = new Date()): Date {
	const d = new Date(from);
	const diff = (6 - d.getDay() + 7) % 7 || 7;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}

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
	id: p.slug,                // page `id` is the slug ('one-off', 'regular', …)
	name: p.name,
	sub: p.subtitle ?? '',
	price: p.pricePence / 100, // number, so your .toFixed(2)/.toFixed(0) still work
	freq: p.freqLabel ?? '',
	bullet: p.bullets?.[0],
	bullet2: p.bullets?.[1],
	featured: p.featured
});

export const load: PageServerLoad = async () => {
	const catalogue = await db
		.select()
		.from(addonsTable)
		.orderBy(addonsTable.sortOrder);

	const form = await superValidate(zod4(checkoutSchema));

	const rows = await db
	.select()
	.from(plans)
	.where(eq(plans.active, true))
	.orderBy(asc(plans.sortOrder));

const subscriptionPlans = rows.filter((p) => p.kind !== 'gift').map(toPlan);
const giftPlans = rows.filter((p) => p.kind === 'gift').map(toPlan);

return { form,  subscriptionPlans, giftPlans, addons: catalogue,  };

	
};

export const actions: Actions = {
	/* ──────────────────────────────────────────────────────────────
	 * SUBSCRIBE (insert)  — "For me" flow.
	 * Creates/refreshes the subscriber, address, recurring add-ons and
	 * the first delivery in one transaction.
	 * ────────────────────────────────────────────────────────────── */
	subscribe: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(checkoutSchema));
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'me') {
			return message(form, { type: 'error', text: 'Wrong flow for a subscription.' } satisfies FormMessage, {
				status: 400
			});
		}

		// Better Auth session. Adjust to however you expose it in hooks.server.ts
		// (e.g. `const session = await locals.auth();` then session.user).
		const user = locals.user;
		if (!user) {
			return message(form, { type: 'error', text: 'Please sign in to start a subscription.' } satisfies FormMessage, {
				status: 401
			});
		}

		const cfg = PLAN_CONFIG[form.data.plan];
		if (cfg.kind !== 'subscription' || !('dbPlan' in cfg)) {
			// One-off has no home in the current schema (no orders table, and
			// subscribers.plan only allows starter|regular). See the note in chat.
			return message(
				form,
				{ type: 'error', text: 'One-off orders aren’t wired up yet — needs an `orders` table.' } satisfies FormMessage,
				{ status: 400 }
			);
		}

		const { rows: chosenAddons, pence: addonsPence, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		const amountPence = cfg.pricePence + addonsPence;

		try {
			await db.transaction(async (tx) => {
				// One subscriber per user (subscribers.userId is unique).
				const [existing] = await tx
					.select()
					.from(subscribers)
					.where(eq(subscribers.userId, user.id));

				let subscriberId = existing?.id;

				if (existing) {
					await tx
						.update(subscribers)
						.set({
							plan: cfg.dbPlan,
							status: 'active',
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
						plan: cfg.dbPlan,
						status: 'active',
						marketingOptIn: form.data.marketingOptIn
					});
				}

				// Address (marked primary).
				const addressId = crypto.randomUUID();
				await tx.insert(addresses).values({
					id: addressId,
					subscriberId: subscriberId!,
					label: form.data.addressLabel || null,
					line1: form.data.line1,
					line2: form.data.line2 || null,
					city: form.data.city || 'London',
					postcode: form.data.postcode,
					isPrimary: true
				});

				// Recurring add-ons: replace the set.
				await tx.delete(subscriberAddons).where(eq(subscriberAddons.subscriberId, subscriberId!));
				if (chosenAddons.length) {
					await tx.insert(subscriberAddons).values(
						chosenAddons.map((a) => ({
							subscriberId: subscriberId!,
							addonId: a.id,
							quantity: 1
						}))
					);
				}

				// First delivery.
				await tx.insert(deliveries).values({
					subscriberId: subscriberId!,
					addressId,
					scheduledDate: nextSaturday(),
					status: 'scheduled'
				});
			});
		} catch (e) {
			console.error('subscribe failed', e);
			return message(form, { type: 'error', text: 'Something went wrong starting your subscription.' } satisfies FormMessage, {
				status: 500
			});
		}

		// ─── Stripe hook point ───
		// Here is where you'd create a Stripe Checkout session for `amountPence`
		// and `throw redirect(303, session.url)` instead of returning a message.
		return message(form, {
			type: 'success',
			text: `Subscription started — first delivery next Saturday. First payment £${(amountPence / 100).toFixed(2)}.`
		} satisfies FormMessage);
	},

	/* ──────────────────────────────────────────────────────────────
	 * GIFT (insert)  — "As a gift" flow. Guests allowed.
	 * NOTE: giftOrders has no add-on relation, so selected add-ons are
	 * priced into the total but NOT persisted. Add a giftOrderAddons
	 * table (or a JSON column) if you need to save them.
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

		// ─── Stripe hook point (PaymentIntent) ───
		return message(form, {
			type: 'success',
			text: `Gift order created — £${(amountPence / 100).toFixed(2)}. Next: payment.`
		} satisfies FormMessage);
	},

	/* ──────────────────────────────────────────────────────────────
	 * UPDATE (manage page — no UI on this page)
	 * ────────────────────────────────────────────────────────────── */
	updateSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(updateSubscriptionSchema));
		if (!form.valid) return fail(400, { form });

		const user = locals.user;
		if (!user) return fail(401, { form });

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		try {
			await db.transaction(async (tx) => {
				// Ownership check baked into the WHERE clause.
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

	/* ──────────────────────────────────────────────────────────────
	 * CANCEL ("delete" = soft cancel; correct for Stripe-backed subs)
	 * ────────────────────────────────────────────────────────────── */
	cancelSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(cancelSubscriptionSchema));
		if (!form.valid) return fail(400, { form });

		const user = locals.user;
		if (!user) return fail(401, { form });

		try {
			// ─── Stripe hook point ───
			// Cancel the Stripe subscription (owned.stripeSubscriptionId) first.
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