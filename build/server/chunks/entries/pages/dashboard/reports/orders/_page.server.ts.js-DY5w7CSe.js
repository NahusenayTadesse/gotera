import { m as db, G as giftOrders, d as desc, F as guestOrders } from '../../../../../chunks/db.js-BkD50_-0.js';
import { p as parseJsonColumn } from '../../../../../chunks/format.js-D8oyWA_y.js';
import { p as parseDateRangeParams } from '../../../../../chunks/reports.js-YS7wm2Ph.js';
import { d as dateRangeCondition, c as chooseGranularity, b as bucketCount } from '../../../../../chunks/reports2.js-CaL_AJDE.js';

//#region src/routes/dashboard/reports/orders/+page.server.ts
var load = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, "last30");
	const [giftRows, guestRows] = await Promise.all([db.select().from(giftOrders).where(dateRangeCondition(giftOrders.createdAt, range)).orderBy(desc(giftOrders.createdAt)), db.select().from(guestOrders).where(dateRangeCondition(guestOrders.createdAt, range)).orderBy(desc(guestOrders.createdAt))]);
	const giftParsed = giftRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		})
	}));
	const guestParsed = guestRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		})
	}));
	const byStatus = (rows, status) => rows.filter((r) => r.status === status).length;
	const stats = {
		giftTotal: giftParsed.length,
		giftPaid: byStatus(giftParsed, "paid"),
		giftFulfilled: byStatus(giftParsed, "fulfilled"),
		giftPending: byStatus(giftParsed, "pending"),
		guestTotal: guestParsed.length,
		guestPaid: byStatus(guestParsed, "paid"),
		guestFulfilled: byStatus(guestParsed, "fulfilled"),
		guestPending: byStatus(guestParsed, "pending"),
		totalQuantity: giftParsed.reduce((s, r) => s + (r.quantity ?? 0), 0) + guestParsed.reduce((s, r) => s + (r.quantity ?? 0), 0)
	};
	const granularity = chooseGranularity(range);
	const giftTrend = bucketCount(giftParsed, (r) => new Date(r.createdAt), range, granularity);
	const guestTrend = bucketCount(guestParsed, (r) => new Date(r.createdAt), range, granularity);
	return {
		preset,
		from,
		to,
		giftRows: giftParsed,
		guestRows: guestParsed,
		stats,
		charts: { trend: {
			labels: giftTrend.labels,
			gift: giftTrend.counts,
			guest: guestTrend.counts
		} }
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DY5w7CSe.js.map
