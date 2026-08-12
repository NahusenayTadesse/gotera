import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, asc, eq, inArray } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

import { db } from '$lib/server/db';
import { addresses, plans, subscribers, subscriptions } from '$lib/server/db/schema';
import { instantDate, money } from '$lib/format';
import { sendPlanChanged, notifyAdminPlanChanged } from '$lib/server/email';
import { changePlanSchema, type ChangePlanMessage } from './schema';
import { stripe } from '$lib/server/stripe';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) redirect(302, '/login?redirectTo=/account/change-plan');

	const [subscriber] = await db
		.select()
		.from(subscribers)
		.where(eq(subscribers.userId, locals.user.id));
	if (!subscriber) redirect(302, '/account');

	const pendingPlan = alias(plans, 'pending_plan');

	const rows = await db
		.select({
			id: subscriptions.id,
			quantity: subscriptions.quantity,
			status: subscriptions.status,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			planId: subscriptions.planId,
			planName: plans.name,
			planKind: plans.kind,
			pricePence: plans.pricePence,
			freqLabel: plans.freqLabel,
			sortOrder: plans.sortOrder,
			addressLabel: addresses.label,
			addressLine1: addresses.line1,
			pendingPlanName: pendingPlan.name
		})
		.from(subscriptions)
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.leftJoin(addresses, eq(addresses.id, subscriptions.addressId))
		.leftJoin(pendingPlan, eq(pendingPlan.id, subscriptions.pendingPlanId))
		.where(
			and(
				eq(subscriptions.subscriberId, subscriber.id),
				inArray(subscriptions.status, ['pending', 'active', 'paused'])
			)
		)
		.orderBy(asc(plans.sortOrder));

	const subscriptionsList = rows.map((row) => {
		const quantity = row.quantity ?? 1;
		return {
			id: row.id,
			planId: row.planId,
			planName: row.planName,
			quantity,
			unitPrice: money(row.pricePence),
			price: money(row.pricePence * quantity),
			freq: row.freqLabel ?? '',
			addressLabel: row.addressLabel ?? row.addressLine1 ?? null,
			// A plan on its way out can't also be switched — cancel wins.
			cancelAtPeriodEnd: row.cancelAtPeriodEnd,
			pendingPlanName: row.pendingPlanName,
			periodEndLabel: row.currentPeriodEnd ? instantDate(row.currentPeriodEnd) : null
		};
	});

	// Everything they could switch to: live, recurring plans only. One-offs and gifts
	// aren't subscriptions and can't be swapped into.
	const catalogue = await db
		.select({
			id: plans.id,
			name: plans.name,
			subtitle: plans.subtitle,
			pricePence: plans.pricePence,
			packs: plans.packs,
			freqLabel: plans.freqLabel,
			featured: plans.featured
		})
		.from(plans)
		.where(and(eq(plans.active, true), eq(plans.kind, 'subscription')))
		.orderBy(asc(plans.sortOrder));

	const planOptions = catalogue.map((p) => ({
		id: p.id,
		name: p.name,
		subtitle: p.subtitle ?? '',
		packs: p.packs,
		price: money(p.pricePence),
		freq: p.freqLabel ?? '',
		featured: p.featured
	}));

	const form = await superValidate(zod4(changePlanSchema));

	// Preselect from the account page link. Accept the legacy `id` name too.
	const requested = url.searchParams.get('subscriptionId') ?? url.searchParams.get('id');
	const changeable = subscriptionsList.filter((p) => !p.cancelAtPeriodEnd);
	if (requested && changeable.some((p) => p.id === requested)) {
		form.data.subscriptionId = requested;
	} else if (changeable.length === 1) {
		form.data.subscriptionId = changeable[0].id;
	}

	return { form, subscriptionsList, planOptions };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(changePlanSchema));

		if (!locals.user) return fail(401, { form });
		if (!form.valid) return fail(400, { form });

		const [subscriber] = await db
			.select()
			.from(subscribers)
			.where(eq(subscribers.userId, locals.user.id));

		if (!subscriber) {
			return message(
				form,
				{ type: 'error', text: 'We could not find your account.' } satisfies ChangePlanMessage,
				{ status: 404 }
			);
		}

		// Confirm the subscription belongs to this subscriber before touching it.
		const [owned] = await db
			.select({
				id: subscriptions.id,
				planId: subscriptions.planId,
				status: subscriptions.status,
				cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
				currentPeriodEnd: subscriptions.currentPeriodEnd,
				stripeSubscriptionId: subscriptions.stripeSubscriptionId,
				pendingPlanId: subscriptions.pendingPlanId,
				pendingPlanAt: subscriptions.pendingPlanAt,
				planName: plans.name
			})
			.from(subscriptions)
			.innerJoin(plans, eq(plans.id, subscriptions.planId))
			.where(
				and(
					eq(subscriptions.id, form.data.subscriptionId),
					eq(subscriptions.subscriberId, subscriber.id)
				)
			);

		if (!owned) {
			return message(
				form,
				{
					type: 'error',
					text: 'That plan could not be found on your account.'
				} satisfies ChangePlanMessage,
				{ status: 404 }
			);
		}

		if (owned.status === 'cancelled' || owned.cancelAtPeriodEnd) {
			return message(form, {
				type: 'error',
				text: "That plan is cancelling and can't be changed."
			} satisfies ChangePlanMessage);
		}

		if (owned.planId === form.data.planId) {
			return message(form, {
				type: 'error',
				text: "That's already your current plan."
			} satisfies ChangePlanMessage);
		}

		// The target must be a real, live, recurring plan — not a one-off or a gift.
		const [target] = await db
			.select({
				id: plans.id,
				name: plans.name,
				pricePence: plans.pricePence,
				stripePriceId: plans.stripePriceId
			})
			.from(plans)
			.where(
				and(eq(plans.id, form.data.planId), eq(plans.active, true), eq(plans.kind, 'subscription'))
			);

		if (!target) {
			return message(
				form,
				{ type: 'error', text: 'That plan is not available.' } satisfies ChangePlanMessage,
				{ status: 400 }
			);
		}

		// Switch at the end of the paid period so nobody is charged or refunded mid-cycle.
		const effectiveAt = owned.currentPeriodEnd ? new Date(owned.currentPeriodEnd) : new Date();

		// Record the pending switch BEFORE touching Stripe. The `customer.subscription.updated`
		// webhook fires the moment we swap the price, and it needs to already see the pending
		// switch to know the new price shouldn't become the live plan until renewal. If Stripe
		// then fails we roll this back below, so a failure can't leave the account promising a
		// switch that never happens.
		await db
			.update(subscriptions)
			.set({ pendingPlanId: target.id, pendingPlanAt: effectiveAt })
			.where(eq(subscriptions.id, owned.id));

		const rollbackPending = () =>
			db
				.update(subscriptions)
				.set({ pendingPlanId: owned.pendingPlanId, pendingPlanAt: owned.pendingPlanAt })
				.where(eq(subscriptions.id, owned.id));

		// `proration_behavior: 'none'` and `billing_cycle_anchor: 'unchanged'` mean nobody is
		// charged or refunded now — the new price simply lands on the next invoice, at the
		// same renewal date.
		if (owned.stripeSubscriptionId) {
			if (!target.stripePriceId) {
				console.error('plan change blocked: no stripePriceId on plan', target.id);
				await rollbackPending();
				return message(
					form,
					{
						type: 'error',
						text: 'That plan is not available right now. Please contact us.'
					} satisfies ChangePlanMessage,
					{ status: 400 }
				);
			}

			try {
				const stripeSub = await stripe.subscriptions.retrieve(owned.stripeSubscriptionId);
				const item = stripeSub.items.data[0];
				if (!item) throw new Error(`no items on subscription ${owned.stripeSubscriptionId}`);

				await stripe.subscriptions.update(owned.stripeSubscriptionId, {
					items: [{ id: item.id, price: target.stripePriceId, quantity: item.quantity }],
					proration_behavior: 'none',
					billing_cycle_anchor: 'unchanged'
				});
			} catch (e) {
				console.error('stripe plan change failed', e);
				await rollbackPending();
				return message(
					form,
					{
						type: 'error',
						text: 'We could not change your plan. Please try again.'
					} satisfies ChangePlanMessage,
					{ status: 400 }
				);
			}
		}

		// Confirmations. The switch is already saved — a mail failure shouldn't fail the form.
		try {
			const effectiveLabel = instantDate(effectiveAt);
			const toPlanPriceLabel = money(target.pricePence);

			await sendPlanChanged(subscriber.email, {
				name: subscriber.fullName ?? 'there',
				fromPlanName: owned.planName,
				toPlanName: target.name,
				toPlanPriceLabel,
				effectiveLabel
			});
			await notifyAdminPlanChanged({
				name: subscriber.fullName ?? '—',
				email: subscriber.email,
				fromPlanName: owned.planName,
				toPlanName: target.name,
				toPlanPriceLabel,
				effectiveLabel
			});
		} catch (e) {
			console.error('plan change emails failed', e);
		}

		return message(form, {
			type: 'success',
			text: `Switching to ${target.name} on ${instantDate(effectiveAt)}.`
		} satisfies ChangePlanMessage);
	}
};
