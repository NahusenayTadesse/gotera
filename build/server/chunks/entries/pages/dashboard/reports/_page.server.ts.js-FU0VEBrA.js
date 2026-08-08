import { m as db, p as subscribers, q as plans, y as subscriptions, j as eq, t as deliveries, G as giftOrders, F as guestOrders, H as referrals } from '../../../../chunks/db.js-BkD50_-0.js';
import { p as parseDateRangeParams } from '../../../../chunks/reports.js-YS7wm2Ph.js';
import { d as dateRangeCondition, b as bucketCount, a as bucketSum } from '../../../../chunks/reports2.js-CaL_AJDE.js';

//#region src/routes/dashboard/reports/+page.server.ts
var load = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, "last30");
	const [subscribersInRange, subscriptionsInRange, activeSubscriptions, deliveriesInRange, giftOrdersInRange, guestOrdersInRange, referralsInRange] = await Promise.all([
		db.select({
			createdAt: subscribers.createdAt,
			marketingOptIn: subscribers.marketingOptIn
		}).from(subscribers).where(dateRangeCondition(subscribers.createdAt, range)),
		db.select({
			createdAt: subscriptions.createdAt,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			planName: plans.name,
			pricePence: plans.pricePence
		}).from(subscriptions).leftJoin(plans, eq(plans.id, subscriptions.planId)).where(dateRangeCondition(subscriptions.createdAt, range)),
		db.select({
			quantity: subscriptions.quantity,
			planName: plans.name,
			pricePence: plans.pricePence
		}).from(subscriptions).leftJoin(plans, eq(plans.id, subscriptions.planId)).where(eq(subscriptions.status, "active")),
		db.select({
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status
		}).from(deliveries).where(dateRangeCondition(deliveries.scheduledDate, range)),
		db.select({
			createdAt: giftOrders.createdAt,
			status: giftOrders.status
		}).from(giftOrders).where(dateRangeCondition(giftOrders.createdAt, range)),
		db.select({
			createdAt: guestOrders.createdAt,
			status: guestOrders.status
		}).from(guestOrders).where(dateRangeCondition(guestOrders.createdAt, range)),
		db.select({
			createdAt: referrals.createdAt,
			status: referrals.status
		}).from(referrals).where(dateRangeCondition(referrals.createdAt, range))
	]);
	const revenue = (r) => (r.pricePence ?? 0) * r.quantity;
	const currentMRR = activeSubscriptions.reduce((sum, r) => sum + revenue(r), 0);
	const growth = bucketCount(subscriptionsInRange, (r) => new Date(r.createdAt), range);
	const growthRevenue = bucketSum(subscriptionsInRange, (r) => new Date(r.createdAt), revenue, range, growth.granularity);
	const optedIn = bucketCount(subscribersInRange.filter((s) => s.marketingOptIn), (r) => new Date(r.createdAt), range, growth.granularity);
	const optedOut = bucketCount(subscribersInRange.filter((s) => !s.marketingOptIn), (r) => new Date(r.createdAt), range, growth.granularity);
	const mrrByPlan = /* @__PURE__ */ new Map();
	for (const r of activeSubscriptions) {
		const name = r.planName ?? "Unknown";
		mrrByPlan.set(name, (mrrByPlan.get(name) ?? 0) + revenue(r));
	}
	const byStatus = (rows, status) => rows.filter((r) => r.status === status).length;
	return {
		preset,
		from,
		to,
		stats: {
			newCustomers: subscribersInRange.length,
			newSubscriptions: subscriptionsInRange.length,
			currentMRR,
			deliveriesCompleted: byStatus(deliveriesInRange, "delivered"),
			oneTimeOrdersPaid: byStatus(giftOrdersInRange, "paid"),
			guestOrdersPaid: byStatus(guestOrdersInRange, "paid")
		},
		charts: {
			growth: {
				labels: growth.labels,
				newSubscriptions: growth.counts,
				mrrAdded: growthRevenue.sums
			},
			acquisition: {
				labels: optedIn.labels,
				optedIn: optedIn.counts,
				optedOut: optedOut.counts
			},
			mrrByPlan: {
				labels: [...mrrByPlan.keys()],
				values: [...mrrByPlan.values()]
			},
			referrals: {
				pending: byStatus(referralsInRange, "pending"),
				subscribed: byStatus(referralsInRange, "subscribed"),
				credited: byStatus(referralsInRange, "credited")
			},
			orderChannels: {
				gift: giftOrdersInRange.length,
				guest: guestOrdersInRange.length
			},
			deliveryHealth: {
				healthy: deliveriesInRange.filter((d) => d.status !== "skipped" && d.status !== "failed").length,
				issues: deliveriesInRange.filter((d) => d.status === "skipped" || d.status === "failed").length
			}
		}
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-FU0VEBrA.js.map
