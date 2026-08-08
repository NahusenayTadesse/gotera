import { m as db, q as plans, y as subscriptions, t as deliveries, j as eq, k as and, p as subscribers, u as user } from '../../../chunks/db.js-BkD50_-0.js';
import { a as auth } from '../../../chunks/auth.js-DZBRJAcg.js';
import { r as redirect$1 } from '../../../chunks/server2.js-BivggJkG.js';
import { r as resolveDateRange } from '../../../chunks/reports.js-YS7wm2Ph.js';
import { d as dateRangeCondition } from '../../../chunks/reports2.js-CaL_AJDE.js';

//#region src/routes/dashboard/+page.server.ts
var load = async () => {
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const todayRange = resolveDateRange("today");
	const [deliveredToday, newSubscribersToday, newUsersToday] = await Promise.all([
		db.select({
			quantity: subscriptions.quantity,
			pricePence: plans.pricePence
		}).from(deliveries).innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).where(and(eq(deliveries.status, "delivered"), eq(deliveries.scheduledDate, today))),
		db.select({ id: subscribers.id }).from(subscribers).where(dateRangeCondition(subscribers.createdAt, todayRange)),
		db.select({ id: user.id }).from(user).where(dateRangeCondition(user.createdAt, todayRange))
	]);
	return {
		dailyStats: {
			totalOrders: deliveredToday.length,
			totalItemsSold: deliveredToday.reduce((sum, r) => sum + (r.quantity ?? 0), 0),
			totalPaymentsCollected: deliveredToday.reduce((sum, r) => sum + (r.pricePence ?? 0) * r.quantity, 0),
			newSubscribers: newSubscribersToday.length,
			newUsers: newUsersToday.length
		},
		reorderProducts: []
	};
};
var actions = { logout: async (event) => {
	await auth.api.signOut({ headers: event.request.headers });
	redirect$1("/login", {
		type: "success",
		message: "Logout Successful"
	}, event.cookies);
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-3sfBzEfE.js.map
