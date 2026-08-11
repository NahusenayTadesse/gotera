import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { and, asc, eq, inArray, ne } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	plans,
	deliveries,
	subscriberAddons,
	addons as addonsTable
} from '$lib/server/db/schema';
import { dayMonth, instantDate, money, monthlyEquivalentPence } from '$lib/format';

const intervalWord = (i?: string) =>
	i === 'bi_monthly' ? 'bi-monthly' : i === 'one_time' ? 'one-time' : 'monthly';

const STATUS_LABEL: Record<string, string> = {
	pending: 'Pending',
	active: 'Active',
	paused: 'Paused',
	cancelled: 'Cancelled'
};

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');

	const firstName = locals.user.name?.split(' ')[0] ?? 'there';

	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, locals.user.id));
	if (!sub) return { firstName, summary: null };

	// Plan and status live on `subscriptions` (one row per plan held), not on the
	// subscriber — a person can hold several at once.
	const rows = await db
		.select({
			id: subscriptions.id,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			planName: plans.name,
			packs: plans.packs,
			interval: plans.interval,
			pricePence: plans.pricePence
		})
		.from(subscriptions)
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, 'cancelled')))
		.orderBy(asc(plans.sortOrder));

	if (rows.length === 0) return { firstName, summary: null };

	const subscriptionIds = rows.map((r) => r.id);

	// Soonest scheduled delivery across every plan they hold.
	const [delivery] = await db
		.select({ scheduledDate: deliveries.scheduledDate })
		.from(deliveries)
		.where(
			and(inArray(deliveries.subscriptionId, subscriptionIds), eq(deliveries.status, 'scheduled'))
		)
		.orderBy(asc(deliveries.scheduledDate))
		.limit(1);

	// Recurring add-ons are attached to a specific subscription.
	const recurring = await db
		.select({
			subscriptionId: subscriberAddons.subscriptionId,
			pricePence: addonsTable.pricePence,
			quantity: subscriberAddons.quantity
		})
		.from(subscriberAddons)
		.innerJoin(addonsTable, eq(subscriberAddons.addonId, addonsTable.id))
		.where(inArray(subscriberAddons.subscriptionId, subscriptionIds));

	const addonPenceBySub = new Map<string, number>();
	for (const a of recurring) {
		addonPenceBySub.set(
			a.subscriptionId,
			(addonPenceBySub.get(a.subscriptionId) ?? 0) + a.pricePence * a.quantity
		);
	}

	// Headline plan = the highest-priority one still running, falling back to the first.
	const headline = rows.find((r) => r.status === 'active') ?? rows[0];

	// Only what is actually billing contributes to the recurring total, and each plan
	// is normalised to a monthly figure so intervals can be summed together.
	const monthlyPence = rows
		.filter((r) => r.status === 'active')
		.reduce(
			(sum, r) =>
				sum +
				monthlyEquivalentPence(r.pricePence * (r.quantity ?? 1), r.interval) +
				monthlyEquivalentPence(addonPenceBySub.get(r.id) ?? 0, r.interval),
			0
		);

	// The soonest upcoming charge across their plans, if any period end is known.
	const nextPeriodEnd = rows
		.filter((r) => r.status === 'active' && r.currentPeriodEnd)
		.map((r) => r.currentPeriodEnd as Date)
		.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];

	return {
		firstName,
		summary: {
			planCount: rows.length,
			planLabel: rows.length > 1 ? `${rows.length} plans` : `${headline.planName} plan`, // "Regular plan"
			packsLabel:
				rows.length > 1
					? `${headline.planName} + ${rows.length - 1} more`
					: `${headline.packs} packs ${intervalWord(headline.interval)}`, // "4 packs monthly"
			status: headline.status,
			statusLabel: STATUS_LABEL[headline.status] ?? headline.status,
			nextDeliveryLabel: delivery ? dayMonth(delivery.scheduledDate) : null, // "18 April"
			nextPaymentAmount: money(monthlyPence),
			nextPaymentDate: nextPeriodEnd ? instantDate(nextPeriodEnd) : null
		}
	};
};
