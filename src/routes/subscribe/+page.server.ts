import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { m } from '$lib/paraglide/messages.js';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, and, asc } from 'drizzle-orm';
import { stripe } from '$lib/server/stripe';
import { loginSchema, addUser } from '$lib/ZodSchema';
// Adjust these to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	subscriberAddons as subscriptionAddons,
	addresses,
	giftOrders,
	addons as addonsTable,
	plans,
	guestOrders
} from '$lib/server/db/schema';
import {
	checkoutSchema,
	updateSubscriptionSchema,
	cancelSubscriptionSchema,
	type FormMessage,
	ALL_PLANS
} from './schema';

type PlanRow = typeof plans.$inferSelect;
type AddonRow = typeof addonsTable.$inferSelect;

async function resolveAddons(ids: string[]) {
	if (ids.length === 0) return { rows: [] as AddonRow[], pence: 0, unknown: false };
	// Only active add-ons are sellable, so a deactivated id is treated exactly like an
	// unknown one: it fails the `unknown` check below and the customer gets a validation
	// error, rather than paying for something that's been pulled from the catalogue.
	const catalogue = await db.select().from(addonsTable).where(eq(addonsTable.isActive, true));
	const rows = catalogue.filter((a) => ids.includes(a.id));
	return { rows, pence: rows.reduce((sum, a) => sum + a.pricePence, 0), unknown: rows.length !== ids.length };
}

/** Plan cadence -> the Stripe `recurring` shape an add-on line item has to match. */
const recurringFor = (interval: PlanRow['interval']) =>
	interval === 'bi_monthly'
		? ({ interval: 'month', interval_count: 2 } as const)
		: ({ interval: 'month', interval_count: 1 } as const);

/**
 * Add-on line items, priced inline from `pricePence`.
 *
 * Add-ons deliberately have no Stripe Price of their own. They're cheap, edited often in
 * the dashboard, and sold through BOTH `mode:'payment'` (gift/guest/one-off) and
 * `mode:'subscription'` checkouts — and a stored Price is either recurring or one-time,
 * never both, so it would break whichever flow it wasn't minted for. A stored Price also
 * drifts silently from the `pricePence` the customer is shown on this page. Generating the
 * price here keeps `addons.price_pence` the one source of truth for displayed and charged.
 *
 * Pass `recurring` for subscription checkouts — Stripe requires every line item in a
 * subscription to share one billing cadence — and omit it for one-off payments.
 */
function addonLineItems(
	rows: AddonRow[],
	recurring?: ReturnType<typeof recurringFor>,
	quantities: Record<string, number> = {}
) {
	return rows.map((a) => ({
		price_data: {
			currency: 'gbp',
			product_data: { name: a.name },
			unit_amount: a.pricePence,
			...(recurring ? { recurring } : {})
		},
		quantity: qtyOf(quantities, a.id)
	}));
}

/**
 * Quantity for one add-on, clamped server-side.
 *
 * The zod schema already bounds these, but this is what actually reaches Stripe and the
 * webhook, so it re-clamps rather than trusting the parsed form.
 */
const MAX_ADDON_QTY = 20;
function qtyOf(quantities: Record<string, number>, id: string) {
	const raw = Number(quantities?.[id] ?? 1);
	if (!Number.isFinite(raw)) return 1;
	return Math.min(MAX_ADDON_QTY, Math.max(1, Math.trunc(raw)));
}

/**
 * `addonIds` metadata format: `id:qty` pairs, comma separated.
 *
 * The webhook reads this to build both the gift/guest snapshot and the recurring
 * `subscriber_addons` rows. A bare id (no colon) is still accepted and means 1, so
 * checkout sessions created before quantities existed keep fulfilling correctly.
 */
function addonMetadata(rows: AddonRow[], quantities: Record<string, number> = {}) {
	return rows.map((a) => `${a.id}:${qtyOf(quantities, a.id)}`).join(',');
}

/** Ensure a subscriber (the person) row exists; return its id + stripe customer. */
async function ensureSubscriber(
	tx: typeof db,
	user: { id: string; email: string; name?: string | null },
	marketingOptIn: boolean
) {
	const [existing] = await tx.select().from(subscribers).where(eq(subscribers.userId, user.id));
	if (existing) {
		return { id: existing.id, stripeCustomerId: existing.stripeCustomerId ?? null };
	}
	const id = crypto.randomUUID();
	await tx.insert(subscribers).values({
		id,
		userId: user.id,
		email: user.email,
		fullName: user.name ?? null,
		phone: null,
		marketingOptIn
	});
	return { id, stripeCustomerId: null };
}

/** One-time order (one-off for self, or a gift). */
async function oneTimeCheckout(opts: {
	plan: PlanRow;
	addons: AddonRow[];
	addonQuantities?: Record<string, number>;
	quantity: number;
	buyerEmail: string;
	buyerName: string | null;
	recipientName: string;
	recipientAddress: { line1: string; line2: string | null; city: string; postcode: string };
	giftMessage: string | null;
	durationMonths: number;
	successUrl: string;
	cancelUrl: string;
}): Promise<string> {
	const giftOrderId = crypto.randomUUID();
	await db.insert(giftOrders).values({
		id: giftOrderId,
		buyerEmail: opts.buyerEmail,
		buyerName: opts.buyerName,
		recipientName: opts.recipientName,
		recipientAddress: opts.recipientAddress,
		giftMessage: opts.giftMessage,
		durationMonths: opts.durationMonths,
		quantity: opts.quantity,
		status: 'pending'
	});
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		customer_email: opts.buyerEmail,
		line_items: [
			{ price: opts.plan.stripePriceId!, quantity: opts.quantity },
			...addonLineItems(opts.addons, undefined, opts.addonQuantities)
		],
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
		payment_intent_data: { metadata: { giftOrderId, kind: opts.plan.kind } },
		metadata: { giftOrderId, kind: opts.plan.kind, addonIds: addonMetadata(opts.addons, opts.addonQuantities), quantity: String(opts.quantity),}
	});
	return session.url!;
}


async function guestCheckout(opts: {
	plan: PlanRow;
	addons: AddonRow[];
	addonQuantities?: Record<string, number>;
	quantity: number;
	addressId: string;
	buyerEmail?: string | null;
	buyerName?: string | null;
	recipientName: string;
	recipientAddress: { phone: string | null, line1: string; line2: string | null; city: string; postcode: string };
	successUrl: string;
	cancelUrl: string;
}): Promise<string> {
	const guestOrderId = crypto.randomUUID();
	await db.insert(guestOrders).values({
		id: guestOrderId,
		buyerEmail: opts.buyerEmail ?? null,
		buyerName: opts.buyerName ?? null,
		// The buyer only enters email/name on the Stripe page, so those are filled
		// in by the webhook from session.customer_details. Everything the form did
		// collect has to be written here or it is lost.
		recipientName: opts.recipientName,
		addressId: opts.addressId,
		quantity: opts.quantity,
		recipientAddress: opts.recipientAddress,
		status: 'pending'
	});
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		billing_address_collection: 'required',
		line_items: [
			{ price: opts.plan.stripePriceId!, quantity: opts.quantity },
			...addonLineItems(opts.addons, undefined, opts.addonQuantities)
		],
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
		payment_intent_data: { metadata: { guestOrderId, kind: opts.plan.kind } },
		metadata: { guestOrderId, kind: opts.plan.kind, addressId: opts.addressId, addonIds: addonMetadata(opts.addons, opts.addonQuantities), quantity: String(opts.quantity), }
	});
	return session.url!;
}

const toPlan = (p: PlanRow) => ({
	id: p.slug,
	name: p.name,
	sub: p.subtitle ?? '',
	price: p.pricePence / 100,
	freq: p.freqLabel ?? '',
	bullet: p.bullets,
	kind: p.kind,
	featured: p.featured
});

export const load: PageServerLoad = async ({ url }) => {
	const catalogue = await db
		.select()
		.from(addonsTable)
		.where(eq(addonsTable.isActive, true))
		.orderBy(asc(addonsTable.sortOrder));
	const loginForm = await superValidate(zod4(loginSchema));
	const signupForm = await superValidate(zod4(addUser));

	const rows = await db.select().from(plans).where(eq(plans.active, true)).orderBy(asc(plans.sortOrder));
	const subscriptionPlans = rows.filter((p) => p.kind !== 'gift').map(toPlan);
	const giftPlans = rows.filter((p) => p.kind === 'gift').map(toPlan);

	// ?plan=<slug> from the homepage cards. Must be (a) a real active plan and
	// (b) known to the zod enum, or superValidate would reject the default.
	const requested = url.searchParams.get('plan');
	const match =
		requested && (ALL_PLANS as readonly string[]).includes(requested)
			? rows.find((p) => p.slug === requested)
			: undefined;

	const recipient = match ? (match.kind === 'gift' ? 'gift' : 'me') : undefined;

	const form = await superValidate(
		match ? { plan: match.slug as PlanSlug, recipient } : undefined,
		zod4(checkoutSchema),
		// Don't surface "postcode is required" before they've typed anything.
		{ errors: false }
	);

	return {
		form,
		subscriptionPlans,
		giftPlans,
		addons: catalogue,
		loginForm,
		signupForm,
		preselected: match ? { slug: match.slug, recipient: recipient! } : null
	};
};

export const actions: Actions = {
	/* SUBSCRIBE — "For me": subscription plans OR one-off (kind 'order'). */
	subscribe: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod4(checkoutSchema));
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'me') {
			return message(form, { type: 'error', text: m.subscribe_error_wrong_flow_order() } satisfies FormMessage, { status: 400 });
		}
		const user = locals.user;
		if (!user) {
			return message(form, { type: 'error', text: m.subscribe_error_sign_in_to_order() } satisfies FormMessage, { status: 401 });
		}

		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || (plan.kind !== 'subscription' && plan.kind !== 'order')) {
			return message(form, { type: 'error', text: m.subscribe_error_plan_unavailable() } satisfies FormMessage, { status: 400 });
		}
		if (!plan.stripePriceId) {
			return message(form, { type: 'error', text: m.subscribe_error_plan_no_price() } satisfies FormMessage, { status: 500 });
		}

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			phone: form.data.phone || '',
			city: form.data.city || 'London',
			postcode: form.data.postcode
		};

		// One-off → one-time payment
		if (plan.kind === 'order') {
			let checkoutUrl: string;
			try {
				checkoutUrl = await oneTimeCheckout({
					plan,
					addons: chosenAddons,
					addonQuantities: form.data.addonQuantities,
					quantity: form.data.quantity ?? 1,
					buyerEmail: user.email,
					buyerName: user.name ?? null,
					recipientName: user.name ?? 'Me',
					recipientAddress,
					giftMessage: null,
					durationMonths: 1,
					successUrl: `${url.origin}/account?welcome=1`,
					cancelUrl: `${url.origin}/subscribe`
				});
			} catch (e) {
				console.error('one-off checkout failed', e);
				return message(form, { type: 'error', text: m.subscribe_error_checkout_failed() } satisfies FormMessage, { status: 500 });
			}
			redirect(303, checkoutUrl);
		}

		/* Subscription: person + address + a NEW subscriptions row (pending). */
		let subscriberId = '';
		let addressId = '';
		let subscriptionId = '';
		let stripeCustomerId: string | null = null;

		try {
			await db.transaction(async (tx) => {
				const sub = await ensureSubscriber(tx as typeof db, user, form.data.marketingOptIn);
				subscriberId = sub.id;
				stripeCustomerId = sub.stripeCustomerId;

				// One address per subscription (home vs office ship independently).
				addressId = crypto.randomUUID();
				await tx.insert(addresses).values({
					id: addressId,
					phone: form.data.phone,
					subscriberId,
					label: form.data.addressLabel || null,
					...recipientAddress,
					isPrimary: false
				});

				// A fresh subscription row for THIS plan.
				subscriptionId = crypto.randomUUID();
				await tx.insert(subscriptions).values({
					id: subscriptionId,
					subscriberId,
					planId: plan.id,
					addressId,
					status: 'pending',
					quantity: form.data.quantity ?? 1,
					cancelAtPeriodEnd: false
				});
			});
		} catch (e) {
			console.error('subscribe (db) failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_subscription_start_failed() } satisfies FormMessage, { status: 500 });
		}


		

		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: 'subscription',
				customer: stripeCustomerId ?? undefined,
				customer_email: stripeCustomerId ? undefined : user.email,
				line_items: [
					{ price: plan.stripePriceId, quantity: form.data.quantity ?? 1 },
					...addonLineItems(chosenAddons, recurringFor(plan.interval), form.data.addonQuantities)
				],
				success_url: `${url.origin}/account?welcome=1`,
				cancel_url: `${url.origin}/subscribe`,
				// The webhook keys everything off subscriptionId now.
				metadata: {     subscriberId,subscriptionId, addressId, addonIds: addonMetadata(chosenAddons, form.data.addonQuantities),  quantity: String(form.data.quantity ?? 1) },
				subscription_data: { metadata: { subscriptionId } }
			});
		} catch (e) {
			console.error('stripe checkout create failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_checkout_failed() } satisfies FormMessage, { status: 500 });
		}

		redirect(303, session.url!);
	},

	/* GIFT — one-time payment; redirects to Stripe. */
	gift: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod4(checkoutSchema));

		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'gift') {
			return message(form, { type: 'error', text: m.subscribe_error_wrong_flow_gift() } satisfies FormMessage, { status: 400 });
		}
		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || plan.kind !== 'gift') return setError(form, 'plan', 'Choose a gift pack.');
		if (!plan.stripePriceId) {
			return message(form, { type: 'error', text: m.subscribe_error_gift_no_price() } satisfies FormMessage, { status: 500 });
		}

		const buyerEmail = form.data.buyerEmail ?? locals.user?.email;
		if (!buyerEmail) return setError(form, 'buyerEmail', 'Enter your email so we can send the confirmation.');

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		let checkoutUrl: string;
		try {
			checkoutUrl = await oneTimeCheckout({
				plan,
				addons: chosenAddons,
				addonQuantities: form.data.addonQuantities,
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
				successUrl: `${url.origin}/?checkout=gift-success`,
				cancelUrl: `${url.origin}/subscribe`
			});
		} catch (e) {
			console.error('gift checkout failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_checkout_failed() } satisfies FormMessage, { status: 500 });
		}
		redirect(303, checkoutUrl);
	},

	/* UPDATE — change add-ons on one subscription (plan swap handled elsewhere). */
	updateSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(updateSubscriptionSchema));
		if (!form.valid) return fail(400, { form });
		const user = locals.user;
		if (!user) return fail(401, { form });

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		try {
			await db.transaction(async (tx) => {
				// Verify this subscription belongs to the user (join through subscribers).
				const [owned] = await tx
					.select({ id: subscriptions.id })
					.from(subscriptions)
					.innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id))
					.where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
				if (!owned) throw new Error('not found or not owned');

				await tx.delete(subscriptionAddons).where(eq(subscriptionAddons.subscriptionId, owned.id));
				if (chosenAddons.length) {
					await tx.insert(subscriptionAddons).values(
						chosenAddons.map((a) => ({ subscriptionId: owned.id, addonId: a.id, quantity: 1 }))
					);
				}
			});
		} catch (e) {
			console.error('updateSubscription failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_update_failed() } satisfies FormMessage, { status: 400 });
		}

		return message(form, { type: 'success', text: m.subscribe_success_updated() } satisfies FormMessage);
	},

	/* CANCEL — one subscription at period end. */
	cancelSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(cancelSubscriptionSchema));
		if (!form.valid) return fail(400, { form });
		const user = locals.user;
		if (!user) return fail(401, { form });

		const [owned] = await db
			.select({ id: subscriptions.id, stripeSubscriptionId: subscriptions.stripeSubscriptionId })
			.from(subscriptions)
			.innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id))
			.where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
		if (!owned) {
			return message(form, { type: 'error', text: m.subscribe_error_not_found() } satisfies FormMessage, { status: 404 });
		}

		try {
			if (owned.stripeSubscriptionId) {
				await stripe.subscriptions.update(owned.stripeSubscriptionId, { cancel_at_period_end: true });
				await db.update(subscriptions).set({ cancelAtPeriodEnd: true }).where(eq(subscriptions.id, owned.id));
			} else {
				await db.update(subscriptions).set({ status: 'cancelled' }).where(eq(subscriptions.id, owned.id));
			}
		} catch (e) {
			console.error('cancelSubscription failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_cancel_failed() } satisfies FormMessage, { status: 400 });
		}

		return message(form, { type: 'success', text: m.subscribe_success_cancelled() } satisfies FormMessage);
	},
	guestOrder: async ({ request, url }) => {
	const form = await superValidate(request, zod4(checkoutSchema));
	if (!form.valid) return fail(400, { form });
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');
		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			phone: form.data.phone || '',
			city: form.data.city || 'London',
			postcode: form.data.postcode
		};
      
     let addressId = '';
	addressId = crypto.randomUUID();
				await db.insert(addresses).values({
					id: addressId,
					label: form.data.addressLabel || null,
					...recipientAddress,
					isPrimary: false
				});

		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || plan.kind !== 'order') {
			   return message(form, { type:"error", text: m.subscribe_error_guest_order_not_allowed()}, { status: 400 })
		}
		

	const { recipientName } = form.data;

	let checkoutUrl: string;
		try {
			checkoutUrl = await guestCheckout({
				plan,
				quantity: form.data.quantity, 
				addons: chosenAddons,
				addonQuantities: form.data.addonQuantities,
				recipientName: recipientName,
				buyerEmail: form.data.buyerEmail ?? null,
				buyerName: form.data.buyerName ?? null,
				addressId,
				recipientAddress: {
					line1: form.data.line1,
					line2: form.data.line2 || null,
					phone: form.data.phone,
					city: form.data.city || 'London',
					postcode: form.data.postcode
				},
				successUrl: `${url.origin}/?checkout=gift-success`,
				cancelUrl: `${url.origin}/subscribe`
			});
		} catch (e) {
			console.error('one-off checkout failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_checkout_failed() } satisfies FormMessage, { status: 500 });
		}
		redirect(303, checkoutUrl);
	}
	

};