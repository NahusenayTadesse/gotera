import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and, inArray } from 'drizzle-orm';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type Stripe from 'stripe';
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import { subscribers, subscriptions, plans, addresses } from '$lib/server/db/schema';
import { instantDate, money } from '$lib/format';
import { sendSubscriptionCancelled, notifyAdminSubscriptionCancelled } from '$lib/server/email';
import { cancelSubscriptionSchema, type CancelMessage } from './schema';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = locals.user;
	if (!user) redirect(302, '/login?redirectTo=/account/cancel');

	const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.userId, user.id));
	if (!subscriber) redirect(302, '/account');

	// All of this person's plans that can still be cancelled.
	const rows = await db
		.select({
			id: subscriptions.id,
			status: subscriptions.status,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			addressId: subscriptions.addressId,
			planName: plans.name,
			planFreq: plans.freqLabel,
			pricePence: plans.pricePence
		})
		.from(subscriptions)
		.innerJoin(plans, eq(subscriptions.planId, plans.id))
		.where(
			and(
				eq(subscriptions.subscriberId, subscriber.id),
				inArray(subscriptions.status, ['active', 'paused', 'pending'])
			)
		);

	if (rows.length === 0) redirect(302, '/account');

	// Attach the delivery address label to each (home vs office, etc.)
	const addrIds = rows.map((r) => r.addressId).filter((x): x is string => !!x);
	const addrRows = addrIds.length
		? await db.select().from(addresses).where(inArray(addresses.id, addrIds))
		: [];
	const addrMap = new Map(addrRows.map((a) => [a.id, a]));

	const plansList = rows.map((r) => {
		const addr = r.addressId ? addrMap.get(r.addressId) : undefined;
		return {
			id: r.id,
			planName: r.planName,
			freq: r.planFreq,
			price: money(r.pricePence),
			status: r.status,
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			periodEndLabel: r.currentPeriodEnd ? instantDate(r.currentPeriodEnd) : null,
			addressLabel: addr?.label ?? addr?.line1 ?? null
		};
	});

	const form = await superValidate(zod4(cancelSubscriptionSchema));
	// Preselect from the account page's "Cancel plan" link, which passes
	// ?subscriptionId=. `id` is accepted as a fallback for older links.
	const preselect = url.searchParams.get('subscriptionId') ?? url.searchParams.get('id');
	const cancellable = plansList.filter((p) => !p.cancelAtPeriodEnd);
	if (preselect && cancellable.some((p) => p.id === preselect)) {
		form.data.subscriptionId = preselect;
	} else if (cancellable.length === 1) {
		form.data.subscriptionId = cancellable[0].id;
	}

	return { form, plansList };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(cancelSubscriptionSchema));
		if (!form.valid) return fail(400, { form });

		const user = locals.user;
		if (!user) return fail(401, { form });

		// Verify the subscription belongs to THIS user (join through subscribers).
		const [owned] = await db
			.select({
				id: subscriptions.id,
				stripeSubscriptionId: subscriptions.stripeSubscriptionId,
				cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
				status: subscriptions.status,
				currentPeriodEnd: subscriptions.currentPeriodEnd,
				pendingPlanId: subscriptions.pendingPlanId,
				planName: plans.name,
				planStripePriceId: plans.stripePriceId,
				customerName: subscribers.fullName,
				customerEmail: subscribers.email
			})
			.from(subscriptions)
			.innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id))
			.innerJoin(plans, eq(subscriptions.planId, plans.id))
			.where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));

		if (!owned) {
			return message(
				form,
				{ type: 'error', text: 'Subscription not found.' } satisfies CancelMessage,
				{
					status: 404
				}
			);
		}
		if (owned.status === 'cancelled') {
			return message(
				form,
				{ type: 'error', text: 'That plan is already cancelled.' } satisfies CancelMessage,
				{
					status: 400
				}
			);
		}
		if (owned.cancelAtPeriodEnd) {
			return message(
				form,
				{
					type: 'error',
					text: 'That plan is already scheduled to cancel.'
				} satisfies CancelMessage,
				{ status: 400 }
			);
		}

		try {
			if (owned.stripeSubscriptionId) {
				// A scheduled plan switch already put the NEW price on the Stripe subscription
				// (it only bills at renewal). Cancelling means that renewal never comes, so the
				// switch must be undone in Stripe too — otherwise the subscription.updated
				// webhook syncs the never-to-happen plan back over the plan they actually paid
				// for, and the remaining paid deliveries would go out as the wrong plan.
				let revert: Stripe.SubscriptionUpdateParams = {};
				if (owned.pendingPlanId && owned.planStripePriceId) {
					const stripeSub = await stripe.subscriptions.retrieve(owned.stripeSubscriptionId);
					const item = stripeSub.items.data[0];
					if (item && item.price.id !== owned.planStripePriceId) {
						revert = {
							items: [{ id: item.id, price: owned.planStripePriceId, quantity: item.quantity }],
							proration_behavior: 'none',
							billing_cycle_anchor: 'unchanged'
						};
					}
				}

				// Keep this plan's paid period; webhook flips status on subscription.deleted.
				await stripe.subscriptions.update(owned.stripeSubscriptionId, {
					cancel_at_period_end: true,
					metadata: {
						cancel_reason: form.data.reason ?? '',
						cancel_feedback: form.data.feedback ?? ''
					},
					...revert
				});
				// Optimistically flag it so the UI can show "cancelling soon". Any pending
				// plan switch is dropped — a plan that's ending can't also be changing.
				await db
					.update(subscriptions)
					.set({ cancelAtPeriodEnd: true, pendingPlanId: null, pendingPlanAt: null })
					.where(eq(subscriptions.id, owned.id));
			} else {
				// Pending / never paid — no Stripe sub, cancel locally.
				await db
					.update(subscriptions)
					.set({ status: 'cancelled', pendingPlanId: null, pendingPlanAt: null })
					.where(eq(subscriptions.id, owned.id));
			}
		} catch (e) {
			console.error('cancel subscription failed', e);
			return message(
				form,
				{
					type: 'error',
					text: 'Could not cancel this plan. Please try again.'
				} satisfies CancelMessage,
				{
					status: 400
				}
			);
		}

		// Confirmations. A failed send must not undo a cancellation that already happened.
		try {
			// Only a Stripe-backed plan keeps running to the end of a paid period; a
			// pending one stops there and then.
			const endsLabel =
				owned.stripeSubscriptionId && owned.currentPeriodEnd
					? instantDate(owned.currentPeriodEnd)
					: null;

			await sendSubscriptionCancelled(owned.customerEmail, {
				name: owned.customerName ?? 'there',
				planName: owned.planName,
				endsLabel
			});
			await notifyAdminSubscriptionCancelled({
				name: owned.customerName ?? '—',
				email: owned.customerEmail,
				planName: owned.planName,
				endsLabel,
				reason: form.data.reason ?? null,
				feedback: form.data.feedback ?? null
			});
		} catch (e) {
			console.error('cancellation emails failed', e);
		}

		redirect(303, '/account?cancelled=1');
	}
};
