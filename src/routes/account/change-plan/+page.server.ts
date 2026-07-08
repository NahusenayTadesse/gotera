import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addresses, plans, subscribers, subscriptions } from '$lib/server/db/schema';
import { cancelSchema } from './schema';
// import { stripe } from '$lib/server/stripe';

function poundsFromPence(pence: number) {
	return pence / 100;
}

function formatPeriodEnd(value: Date | string | null) {
	if (!value) return null;
	return new Date(value).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const subscriber = await db.query.subscribers.findFirst({
		where: eq(subscribers.userId, locals.user.id)
	});

	// No subscriber record for this user — nothing to cancel
	if (!subscriber) {
		throw redirect(302, '/account');
	}

	const rows = await db
		.select({
			id: subscriptions.id,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			planName: plans.name,
			pricePence: plans.pricePence,
			freqLabel: plans.freqLabel,
			addressLabel: addresses.label,
			addressLine1: addresses.line1
		})
		.from(subscriptions)
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.leftJoin(addresses, eq(addresses.id, subscriptions.addressId))
		.where(
			and(
				eq(subscriptions.subscriberId, subscriber.id),
				inArray(subscriptions.status, ['pending', 'active', 'paused'])
			)
		);

	const plansList = rows.map((row) => ({
		id: row.id,
		planName: row.planName,
		price: poundsFromPence(row.pricePence),
		freq: row.freqLabel ?? '',
		addressLabel: row.addressLabel ?? row.addressLine1 ?? null,
		cancelAtPeriodEnd: row.cancelAtPeriodEnd,
		periodEndLabel: formatPeriodEnd(row.currentPeriodEnd)
	}));

	const form = await superValidate(zod4(cancelSchema));

	return { form, plansList };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const form = await superValidate(request, zod4(cancelSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const subscriber = await db.query.subscribers.findFirst({
			where: eq(subscribers.userId, locals.user.id)
		});

		if (!subscriber) {
			return message(form, { type: 'error', text: 'We could not find your account.' }, { status: 404 });
		}

		// Confirm the subscription belongs to this subscriber before touching it
		const subscription = await db.query.subscriptions.findFirst({
			where: and(
				eq(subscriptions.id, form.data.subscriptionId),
				eq(subscriptions.subscriberId, subscriber.id)
			)
		});

		if (!subscription) {
			return message(
				form,
				{ type: 'error', text: 'That plan could not be found on your account.' },
				{ status: 404 }
			);
		}

		if (subscription.cancelAtPeriodEnd || subscription.status === 'cancelled') {
			return message(form, {
				type: 'error',
				text: 'That plan is already scheduled to cancel.'
			});
		}

		// Tell Stripe first — if this fails, we don't want a DB record that's out of sync
		// if (subscription.stripeSubscriptionId) {
		// 	await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
		// 		cancel_at_period_end: true
		// 	});
		// }

		await db
			.update(subscriptions)
			.set({
				cancelAtPeriodEnd: true,
				cancellationReason: form.data.reason ?? null,
				cancellationFeedback: form.data.feedback ?? null,
				cancelledAt: new Date()
			})
			.where(eq(subscriptions.id, subscription.id));

		return message(form, {
			type: 'success',
			text: 'Your plan is scheduled to cancel at the end of the current period.'
		});
	}
};