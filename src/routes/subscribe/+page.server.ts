import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
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
	plans
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
	const catalogue = await db.select().from(addonsTable);
	const rows = catalogue.filter((a) => ids.includes(a.id));
	return { rows, pence: rows.reduce((sum, a) => sum + a.pricePence, 0), unknown: rows.length !== ids.length };
}

/** Add-on line items — only those with a Stripe price. For mode:'payment' these
 *  must be ONE-TIME prices in Stripe. */
function addonLineItems(rows: AddonRow[]) {
	return rows
		.map((a) => (a as { stripePriceId?: string | null }).stripePriceId)
		.filter((price): price is string => !!price)
		.map((price) => ({ price, quantity: 1 }));
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
	buyerEmail: string | null;
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
		status: 'pending'
	});
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		customer_email: opts.buyerEmail,
		line_items: [{ price: opts.plan.stripePriceId!, quantity: 1 }, ...addonLineItems(opts.addons)],
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
		payment_intent_data: { metadata: { giftOrderId, kind: opts.plan.kind } },
		metadata: { giftOrderId, kind: opts.plan.kind, addonIds: opts.addons.map((a) => a.id).join(',') }
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
	const catalogue = await db.select().from(addonsTable).orderBy(asc(addonsTable.sortOrder));
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
		console.log(form.data)
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'me') {
			return message(form, { type: 'error', text: 'Wrong flow for this order.' } satisfies FormMessage, { status: 400 });
		}
		const user = locals.user;
		if (!user) {
			return message(form, { type: 'error', text: 'Please sign in to order.' } satisfies FormMessage, { status: 401 });
		}

		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || (plan.kind !== 'subscription' && plan.kind !== 'order')) {
			return message(form, { type: 'error', text: "That plan isn't available here." } satisfies FormMessage, { status: 400 });
		}
		if (!plan.stripePriceId) {
			return message(form, { type: 'error', text: 'This plan has no Stripe price set.' } satisfies FormMessage, { status: 500 });
		}

		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');

		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			city: form.data.city || 'London',
			postcode: form.data.postcode
		};
		console.log(plan.kind)

		// One-off → one-time payment
		if (plan.kind === 'order') {
			let checkoutUrl: string;
			try {
				checkoutUrl = await oneTimeCheckout({
					plan,
					addons: chosenAddons4,
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
				return message(form, { type: 'error', text: 'Could not start checkout. Please try again.' } satisfies FormMessage, { status: 500 });
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
					cancelAtPeriodEnd: false
				});
			});
		} catch (e) {
			console.error('subscribe (db) failed', e);
			return message(form, { type: 'error', text: 'Something went wrong starting your subscription.' } satisfies FormMessage, { status: 500 });
		}


		

		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: 'subscription',
				customer: stripeCustomerId ?? undefined,
				customer_email: stripeCustomerId ? undefined : user.email,
				line_items: [{ price: plan.stripePriceId, quantity: 1 }, ...addonLineItems(chosenAddons)],
				success_url: `${url.origin}/account?welcome=1`,
				cancel_url: `${url.origin}/subscribe`,
				// The webhook keys everything off subscriptionId now.
				metadata: {     subscriberId,subscriptionId, addressId, addonIds: chosenAddons.map((a) => a.id).join(',') },
				subscription_data: { metadata: { subscriptionId } }
			});
			console.log("Metadata:", session.metadata);
		} catch (e) {
			console.error('stripe checkout create failed', e);
			return message(form, { type: 'error', text: 'Could not start checkout. Please try again.' } satisfies FormMessage, { status: 500 });
		}

		redirect(303, session.url!);
	},

	/* GIFT — one-time payment; redirects to Stripe. */
	gift: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod4(checkoutSchema));
		if (!form.valid) return fail(400, { form });

		if (form.data.recipient !== 'gift') {
			return message(form, { type: 'error', text: 'Wrong flow for a gift.' } satisfies FormMessage, { status: 400 });
		}
		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || plan.kind !== 'gift') return setError(form, 'plan', 'Choose a gift pack.');
		if (!plan.stripePriceId) {
			return message(form, { type: 'error', text: 'This gift has no Stripe price set.' } satisfies FormMessage, { status: 500 });
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
			return message(form, { type: 'error', text: 'Could not start checkout. Please try again.' } satisfies FormMessage, { status: 500 });
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
			return message(form, { type: 'error', text: 'Could not update your subscription.' } satisfies FormMessage, { status: 400 });
		}

		return message(form, { type: 'success', text: 'Subscription updated.' } satisfies FormMessage);
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
			return message(form, { type: 'error', text: 'Subscription not found.' } satisfies FormMessage, { status: 404 });
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
			return message(form, { type: 'error', text: 'Could not cancel your subscription.' } satisfies FormMessage, { status: 400 });
		}

		return message(form, { type: 'success', text: 'Subscription cancelled.' } satisfies FormMessage);
	},
	guestOrder: async ({ request, url }) => {
	const form = await superValidate(request, zod4(checkoutSchema));
	console.log(form.data)
	if (!form.valid) return fail(400, { form });
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, 'addonIds', 'One of the selected add-ons no longer exists.');



		const [plan] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if(plan.kind !== 'order') {
			   return message(form, { type:"error", text: "Guest Order is not allowed for non one type orders."})
		}
		

	const { recipientName } = form.data;

	let checkoutUrl: string;
		try {
			checkoutUrl = await oneTimeCheckout({
				plan,
				addons: chosenAddons,
				buyerEmail: null,          // null → Stripe asks
				buyerName: null,
				recipientName: recipientName ?? 'Me',
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
			console.error('one-off checkout failed', e);
			return message(form, { type: 'error', text: 'Could not start checkout. Please try again.' } satisfies FormMessage, { status: 500 });
		}
		redirect(303, checkoutUrl);
	}
	

};