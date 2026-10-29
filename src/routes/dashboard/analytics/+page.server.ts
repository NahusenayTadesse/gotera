import type { PageServerLoad } from './$types';
import { and, desc, eq, isNotNull, like, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	pageViews,
	user,
	subscriptions,
	giftOrders,
	guestOrders,
	partnerApplications
} from '$lib/server/db/schema';
import {
	parseDateRangeParams,
	resolveDateRange,
	dateRangeCondition,
	bucketCount,
	bucketSum
} from '$lib/server/reports';

// Visitor hashes rotate daily (see $lib/server/analytics), so a "visitor" here is one
// person on one day: the visitor total for a range is the sum of each day's uniques.
const views = sql<number>`COUNT(*)`;
const visitors = sql<number>`COUNT(DISTINCT ${pageViews.visitorHash})`;
const day = sql<string>`DATE_FORMAT(${pageViews.createdAt}, '%Y-%m-%d')`;

const toDay = (s: string) => {
	const [y, m, d] = s.split('-').map(Number);
	return new Date(y, m - 1, d);
};

export const load: PageServerLoad = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, 'last30');
	const inRange = dateRangeCondition(pageViews.createdAt, range);

	const [
		daily,
		[today],
		topPages,
		referrers,
		devices,
		[subscribeVisitors],
		signups,
		newSubscriptions,
		guestPaid,
		giftPaid,
		applications
	] = await Promise.all([
		db.select({ day, views, visitors }).from(pageViews).where(inRange).groupBy(day),
		db
			.select({ views, visitors })
			.from(pageViews)
			.where(dateRangeCondition(pageViews.createdAt, resolveDateRange('today'))),
		db
			.select({ path: pageViews.path, views, visitors })
			.from(pageViews)
			.where(inRange)
			.groupBy(pageViews.path)
			.orderBy(desc(views))
			.limit(15),
		db
			.select({ referrer: pageViews.referrer, visitors })
			.from(pageViews)
			.where(and(inRange, isNotNull(pageViews.referrer)))
			.groupBy(pageViews.referrer)
			.orderBy(desc(visitors))
			.limit(10),
		db
			.select({ device: pageViews.device, visitors })
			.from(pageViews)
			.where(inRange)
			.groupBy(pageViews.device),
		db
			.select({ visitors })
			.from(pageViews)
			.where(and(inRange, like(pageViews.path, '/subscribe%'))),
		db.select({ createdAt: user.createdAt }).from(user).where(dateRangeCondition(user.createdAt, range)),
		db
			.select({ createdAt: subscriptions.createdAt })
			.from(subscriptions)
			.where(dateRangeCondition(subscriptions.createdAt, range)),
		db
			.select({ createdAt: guestOrders.createdAt })
			.from(guestOrders)
			.where(and(eq(guestOrders.status, 'paid'), dateRangeCondition(guestOrders.createdAt, range))),
		db
			.select({ createdAt: giftOrders.createdAt })
			.from(giftOrders)
			.where(and(eq(giftOrders.status, 'paid'), dateRangeCondition(giftOrders.createdAt, range))),
		db
			.select({ id: partnerApplications.id })
			.from(partnerApplications)
			.where(dateRangeCondition(partnerApplications.createdAt, range))
	]);

	const dailyRows = daily.map((r) => ({
		date: toDay(r.day),
		views: Number(r.views),
		visitors: Number(r.visitors)
	}));
	const visitorSeries = bucketSum(dailyRows, (r) => r.date, (r) => r.visitors, range);
	const viewSeries = bucketSum(dailyRows, (r) => r.date, (r) => r.views, range, visitorSeries.granularity);
	const signupSeries = bucketCount(signups, (r) => new Date(r.createdAt), range, visitorSeries.granularity);
	const subscriptionSeries = bucketCount(
		newSubscriptions,
		(r) => new Date(r.createdAt),
		range,
		visitorSeries.granularity
	);
	const orderSeries = bucketCount(
		[...guestPaid, ...giftPaid],
		(r) => new Date(r.createdAt),
		range,
		visitorSeries.granularity
	);

	const totalVisitors = dailyRows.reduce((sum, r) => sum + r.visitors, 0);
	const totalViews = dailyRows.reduce((sum, r) => sum + r.views, 0);
	const orders = guestPaid.length + giftPaid.length;

	return {
		preset,
		from,
		to,
		stats: {
			visitorsToday: Number(today?.visitors ?? 0),
			viewsToday: Number(today?.views ?? 0),
			visitors: totalVisitors,
			views: totalViews,
			viewsPerVisitor: totalVisitors ? totalViews / totalVisitors : 0,
			signups: signups.length,
			subscriptions: newSubscriptions.length,
			orders,
			applications: applications.length,
			// Share of visitors who went on to buy something (a plan or a one-off order).
			conversionRate: totalVisitors ? (newSubscriptions.length + orders) / totalVisitors : 0
		},
		funnel: {
			visitors: totalVisitors,
			subscribePage: Number(subscribeVisitors?.visitors ?? 0),
			signups: signups.length,
			subscriptions: newSubscriptions.length
		},
		charts: {
			traffic: { labels: visitorSeries.labels, visitors: visitorSeries.sums, views: viewSeries.sums },
			conversions: {
				labels: signupSeries.labels,
				signups: signupSeries.counts,
				subscriptions: subscriptionSeries.counts,
				orders: orderSeries.counts
			},
			devices: {
				labels: devices.map((d) => d.device),
				values: devices.map((d) => Number(d.visitors))
			}
		},
		// Newest day first for the table under the chart.
		daily: dailyRows.sort((a, b) => b.date.getTime() - a.date.getTime()),
		topPages: topPages.map((p) => ({ path: p.path, views: Number(p.views), visitors: Number(p.visitors) })),
		referrers: referrers.map((r) => ({ referrer: r.referrer as string, visitors: Number(r.visitors) }))
	};
};
