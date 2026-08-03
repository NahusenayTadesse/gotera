import type { PageServerLoad } from './$types';
import { eq, desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscriptions, subscribers, plans } from '$lib/server/db/schema';
import { parseDateRangeParams, dateRangeCondition, bucketCount } from '$lib/server/reports';

export const load: PageServerLoad = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, 'last30');
	const condition = dateRangeCondition(subscriptions.createdAt, range);

	const rows = await db
		.select({
			id: subscriptions.id,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planName: plans.name,
			pricePence: plans.pricePence,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			createdAt: subscriptions.createdAt
		})
		.from(subscriptions)
		.leftJoin(subscribers, eq(subscribers.id, subscriptions.subscriberId))
		.leftJoin(plans, eq(plans.id, subscriptions.planId))
		.where(condition)
		.orderBy(desc(subscriptions.createdAt));

	const byStatus = (status: string) => rows.filter((r) => r.status === status).length;
	const stats = {
		total: rows.length,
		active: byStatus('active'),
		pending: byStatus('pending'),
		paused: byStatus('paused'),
		cancelled: byStatus('cancelled'),
		quantity: rows.reduce((sum, r) => sum + (r.quantity ?? 0), 0)
	};

	const trend = bucketCount(rows, (r) => new Date(r.createdAt), range);

	const planMix = new Map<string, number>();
	const mrrByPlan = new Map<string, number>();
	for (const r of rows) {
		const name = r.planName ?? 'Unknown';
		planMix.set(name, (planMix.get(name) ?? 0) + 1);
		if (r.status === 'active') {
			mrrByPlan.set(name, (mrrByPlan.get(name) ?? 0) + (r.pricePence ?? 0) * r.quantity);
		}
	}

	const charts = {
		trend: { labels: trend.labels, counts: trend.counts },
		status: { active: stats.active, pending: stats.pending, paused: stats.paused, cancelled: stats.cancelled },
		planMix: { labels: [...planMix.keys()], counts: [...planMix.values()] },
		mrrByPlan: { labels: [...mrrByPlan.keys()], values: [...mrrByPlan.values()] }
	};

	return { preset, from, to, rows, stats, charts };
};
