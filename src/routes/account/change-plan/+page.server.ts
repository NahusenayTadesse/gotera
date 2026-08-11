import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, asc, eq, inArray } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

import { db } from '$lib/server/db';
import { addresses, plans, subscribers, subscriptions } from '$lib/server/db/schema';
import { instantDate, money } from '$lib/format';
import { changePlanSchema, type ChangePlanMessage } from './schema';
// import { stripe } from '$lib/server/stripe';

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
				stripeSubscriptionId: subscriptions.stripeSubscriptionId
			})
			.from(subscriptions)
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
			.select({ id: plans.id, name: plans.name })
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

		// ── Stripe hook point ──
		// Swap the subscription item's price with `proration_behavior: 'none'` and
		// `billing_cycle_anchor: 'unchanged'` so Stripe applies it at the same moment.
		// Do this BEFORE the DB write, so a Stripe failure can't leave the account
		// promising a switch that never happens.
		// if (owned.stripeSubscriptionId && targetStripePriceId) {
		// 	await stripe.subscriptions.update(owned.stripeSubscriptionId, { ... });
		// }

		await db
			.update(subscriptions)
			.set({ pendingPlanId: target.id, pendingPlanAt: effectiveAt })
			.where(eq(subscriptions.id, owned.id));

		return message(form, {
			type: 'success',
			text: `Switching to ${target.name} on ${instantDate(effectiveAt)}.`
		} satisfies ChangePlanMessage);
	}
};
