import { y as subscriptions, m as db, q as plans, p as subscribers, j as eq, d as desc } from '../../../../../chunks/db.js-BkD50_-0.js';
import { p as parseDateRangeParams } from '../../../../../chunks/reports.js-YS7wm2Ph.js';
import { d as dateRangeCondition, b as bucketCount } from '../../../../../chunks/reports2.js-CaL_AJDE.js';

//#region src/routes/dashboard/reports/subscriptions/+page.server.ts
var load = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, "last30");
	const condition = dateRangeCondition(subscriptions.createdAt, range);
	const rows = await db.select({
		id: subscriptions.id,
		subscriberEmail: subscribers.email,
		subscriberName: subscribers.fullName,
		planName: plans.name,
		pricePence: plans.pricePence,
		status: subscriptions.status,
		quantity: subscriptions.quantity,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		createdAt: subscriptions.createdAt
	}).from(subscriptions).leftJoin(subscribers, eq(subscribers.id, subscriptions.subscriberId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).where(condition).orderBy(desc(subscriptions.createdAt));
	const byStatus = (status) => rows.filter((r) => r.status === status).length;
	const stats = {
		total: rows.length,
		active: byStatus("active"),
		pending: byStatus("pending"),
		paused: byStatus("paused"),
		cancelled: byStatus("cancelled"),
		quantity: rows.reduce((sum, r) => sum + (r.quantity ?? 0), 0)
	};
	const trend = bucketCount(rows, (r) => new Date(r.createdAt), range);
	const planMix = /* @__PURE__ */ new Map();
	const mrrByPlan = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const name = r.planName ?? "Unknown";
		planMix.set(name, (planMix.get(name) ?? 0) + 1);
		if (r.status === "active") mrrByPlan.set(name, (mrrByPlan.get(name) ?? 0) + (r.pricePence ?? 0) * r.quantity);
	}
	return {
		preset,
		from,
		to,
		rows,
		stats,
		charts: {
			trend: {
				labels: trend.labels,
				counts: trend.counts
			},
			status: {
				active: stats.active,
				pending: stats.pending,
				paused: stats.paused,
				cancelled: stats.cancelled
			},
			planMix: {
				labels: [...planMix.keys()],
				counts: [...planMix.values()]
			},
			mrrByPlan: {
				labels: [...mrrByPlan.keys()],
				values: [...mrrByPlan.values()]
			}
		}
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C_dAB0AV.js.map
