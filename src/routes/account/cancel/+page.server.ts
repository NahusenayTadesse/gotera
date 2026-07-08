import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and, inArray } from 'drizzle-orm';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import { subscribers, subscriptions, plans, addresses } from '$lib/server/db/schema';
import { cancelSubscriptionSchema, type CancelMessage } from './schema';

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = locals.user;
	console.log('user', user);
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
			price: r.pricePence / 100,
			status: r.status,
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			periodEndLabel: r.currentPeriodEnd ? dateFmt.format(new Date(r.currentPeriodEnd)) : null,
			addressLabel: addr?.label ?? addr?.line1 ?? null
		};
	});

	const form = await superValidate(zod4(cancelSubscriptionSchema));
	// Preselect if ?id= was passed (e.g. from a "cancel" link on the account page).
	const preselect = url.searchParams.get('id');
	if (preselect && plansList.some((p) => p.id === preselect)) {
		form.data.subscriptionId = preselect;
	} else if (plansList.length === 1) {
		form.data.subscriptionId = plansList[0].id;
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
				status: subscriptions.status
			})
			.from(subscriptions)
			.innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id))
			.where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));

		if (!owned) {
			return message(form, { type: 'error', text: 'Subscription not found.' } satisfies CancelMessage, {
				status: 404
			});
		}
		if (owned.status === 'cancelled') {
			return message(form, { type: 'error', text: 'That plan is already cancelled.' } satisfies CancelMessage, {
				status: 400
			});
		}

		try {
			if (owned.stripeSubscriptionId) {
				// Keep this plan's paid period; webhook flips status on subscription.deleted.
				await stripe.subscriptions.update(owned.stripeSubscriptionId, {
					cancel_at_period_end: true,
					metadata: {
						cancel_reason: form.data.reason ?? '',
						cancel_feedback: form.data.feedback ?? ''
					}
				});
				// Optimistically flag it so the UI can show "cancelling soon".
				await db
					.update(subscriptions)
					.set({ cancelAtPeriodEnd: true })
					.where(eq(subscriptions.id, owned.id));
			} else {
				// Pending / never paid — no Stripe sub, cancel locally.
				await db.update(subscriptions).set({ status: 'cancelled' }).where(eq(subscriptions.id, owned.id));
			}
		} catch (e) {
			console.error('cancel subscription failed', e);
			return message(form, { type: 'error', text: 'Could not cancel this plan. Please try again.' } satisfies CancelMessage, {
				status: 400
			});
		}

		redirect(303, '/account?cancelled=1');
	}
};