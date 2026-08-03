import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	subscribers,
	subscriptions,
	deliveries,
	giftOrders,
	guestOrders,
	referrals,
	plans
} from '$lib/server/db/schema';
import { parseDateRangeParams, dateRangeCondition, bucketCount, bucketSum } from '$lib/server/reports';

export const load: PageServerLoad = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, 'last30');

	const [
		subscribersInRange,
		subscriptionsInRange,
		activeSubscriptions,
		deliveriesInRange,
		giftOrdersInRange,
		guestOrdersInRange,
		referralsInRange
	] = await Promise.all([
		db
			.select({ createdAt: subscribers.createdAt, marketingOptIn: subscribers.marketingOptIn })
			.from(subscribers)
			.where(dateRangeCondition(subscribers.createdAt, range)),
		db
			.select({
				createdAt: subscriptions.createdAt,
				status: subscriptions.status,
				quantity: subscriptions.quantity,
				planName: plans.name,
				pricePence: plans.pricePence
			})
			.from(subscriptions)
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.where(dateRangeCondition(subscriptions.createdAt, range)),
		// Current MRR is a point-in-time snapshot — not limited to the selected range.
		db
			.select({ quantity: subscriptions.quantity, planName: plans.name, pricePence: plans.pricePence })
			.from(subscriptions)
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.where(eq(subscriptions.status, 'active')),
		db
			.select({ scheduledDate: deliveries.scheduledDate, status: deliveries.status })
			.from(deliveries)
			.where(dateRangeCondition(deliveries.scheduledDate, range)),
		db
			.select({ createdAt: giftOrders.createdAt, status: giftOrders.status })
			.from(giftOrders)
			.where(dateRangeCondition(giftOrders.createdAt, range)),
		db
			.select({ createdAt: guestOrders.createdAt, status: guestOrders.status })
			.from(guestOrders)
			.where(dateRangeCondition(guestOrders.createdAt, range)),
		db
			.select({ createdAt: referrals.createdAt, status: referrals.status })
			.from(referrals)
			.where(dateRangeCondition(referrals.createdAt, range))
	]);

	const revenue = (r: { pricePence: number | null; quantity: number }) => (r.pricePence ?? 0) * r.quantity;
	const currentMRR = activeSubscriptions.reduce((sum, r) => sum + revenue(r), 0);

	// New subscriptions + the MRR they added, on the same bucket timeline (mixed bar+line chart).
	const growth = bucketCount(subscriptionsInRange, (r) => new Date(r.createdAt), range);
	const growthRevenue = bucketSum(subscriptionsInRange, (r) => new Date(r.createdAt), revenue, range, growth.granularity);

	// New customers, split by marketing opt-in (stacked bar).
	const optedIn = bucketCount(
		subscribersInRange.filter((s) => s.marketingOptIn),
		(r) => new Date(r.createdAt),
		range,
		growth.granularity
	);
	const optedOut = bucketCount(
		subscribersInRange.filter((s) => !s.marketingOptIn),
		(r) => new Date(r.createdAt),
		range,
		growth.granularity
	);

	// MRR by plan (current, active subscriptions only).
	const mrrByPlan = new Map<string, number>();
	for (const r of activeSubscriptions) {
		const name = r.planName ?? 'Unknown';
		mrrByPlan.set(name, (mrrByPlan.get(name) ?? 0) + revenue(r));
	}

	const byStatus = <T extends { status: string }>(rows: T[], status: string) =>
		rows.filter((r) => r.status === status).length;

	const stats = {
		newCustomers: subscribersInRange.length,
		newSubscriptions: subscriptionsInRange.length,
		currentMRR,
		deliveriesCompleted: byStatus(deliveriesInRange, 'delivered'),
		oneTimeOrdersPaid: byStatus(giftOrdersInRange, 'paid'),
		guestOrdersPaid: byStatus(guestOrdersInRange, 'paid')
	};

	const charts = {
		growth: { labels: growth.labels, newSubscriptions: growth.counts, mrrAdded: growthRevenue.sums },
		acquisition: { labels: optedIn.labels, optedIn: optedIn.counts, optedOut: optedOut.counts },
		mrrByPlan: { labels: [...mrrByPlan.keys()], values: [...mrrByPlan.values()] },
		referrals: {
			pending: byStatus(referralsInRange, 'pending'),
			subscribed: byStatus(referralsInRange, 'subscribed'),
			credited: byStatus(referralsInRange, 'credited')
		},
		orderChannels: { gift: giftOrdersInRange.length, guest: guestOrdersInRange.length },
		deliveryHealth: {
			healthy: deliveriesInRange.filter((d) => d.status !== 'skipped' && d.status !== 'failed').length,
			issues: deliveriesInRange.filter((d) => d.status === 'skipped' || d.status === 'failed').length
		}
	};

	return { preset, from, to, stats, charts };
};
