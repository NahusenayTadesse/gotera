import type { PageServerLoad } from './$types';
import { eq, asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { deliveries, subscribers, subscriptions, plans, addresses } from '$lib/server/db/schema';
import { parseDateRangeParams, dateRangeCondition, bucketCount } from '$lib/server/reports';

export const load: PageServerLoad = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, 'last30');
	const condition = dateRangeCondition(deliveries.scheduledDate, range);

	const rows = await db
		.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planName: plans.name,
			addressLine1: addresses.line1,
			addressCity: addresses.city,
			addressPostcode: addresses.postcode
		})
		.from(deliveries)
		.leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
		.leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
		.leftJoin(plans, eq(plans.id, subscriptions.planId))
		.leftJoin(addresses, eq(addresses.id, deliveries.addressId))
		.where(condition)
		.orderBy(asc(deliveries.scheduledDate));

	const byStatus = (status: string) => rows.filter((r) => r.status === status).length;
	const stats = {
		total: rows.length,
		scheduled: byStatus('scheduled'),
		dispatched: byStatus('dispatched'),
		delivered: byStatus('delivered'),
		skipped: byStatus('skipped'),
		failed: byStatus('failed')
	};

	const trend = bucketCount(rows, (r) => new Date(r.scheduledDate), range);
	const charts = {
		trend: { labels: trend.labels, counts: trend.counts },
		status: stats
	};

	return { preset, from, to, rows, stats, charts };
};
