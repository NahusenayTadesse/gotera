import { t as deliveries, m as db, z as addresses, q as plans, p as subscribers, j as eq, y as subscriptions, a as asc } from '../../../../../chunks/db.js-BkD50_-0.js';
import { p as parseDateRangeParams } from '../../../../../chunks/reports.js-YS7wm2Ph.js';
import { d as dateRangeCondition, b as bucketCount } from '../../../../../chunks/reports2.js-CaL_AJDE.js';

//#region src/routes/dashboard/reports/deliveries/+page.server.ts
var load = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, "last30");
	const condition = dateRangeCondition(deliveries.scheduledDate, range);
	const rows = await db.select({
		id: deliveries.id,
		scheduledDate: deliveries.scheduledDate,
		status: deliveries.status,
		subscriberEmail: subscribers.email,
		subscriberName: subscribers.fullName,
		planName: plans.name,
		addressLine1: addresses.line1,
		addressCity: addresses.city,
		addressPostcode: addresses.postcode
	}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).where(condition).orderBy(asc(deliveries.scheduledDate));
	const byStatus = (status) => rows.filter((r) => r.status === status).length;
	const stats = {
		total: rows.length,
		scheduled: byStatus("scheduled"),
		dispatched: byStatus("dispatched"),
		delivered: byStatus("delivered"),
		skipped: byStatus("skipped"),
		failed: byStatus("failed")
	};
	const trend = bucketCount(rows, (r) => new Date(r.scheduledDate), range);
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
			status: stats
		}
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BkAcvpXj.js.map
