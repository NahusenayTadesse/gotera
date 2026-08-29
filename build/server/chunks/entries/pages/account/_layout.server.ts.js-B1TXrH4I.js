import { m as db, p as subscribers, j as eq, q as plans, t as subscriptions, k as and, f as ne, a as asc, v as deliveries, i as inArray, w as subscriberAddons, x as addons } from '../../../chunks/db.js-BjhfTcAV.js';
import { m as monthlyEquivalentPence, i as instantDate, a as money, d as dayMonth } from '../../../chunks/format.js-D2IJ8g7t.js';
import { B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/+layout.server.ts
var intervalWord = (i) => i === "bi_monthly" ? "bi-monthly" : i === "one_time" ? "one-time" : "monthly";
var STATUS_LABEL = {
	pending: "Pending",
	active: "Active",
	paused: "Paused",
	cancelled: "Cancelled"
};
var load = async ({ locals }) => {
	if (!locals.user) redirect(303, "/login");
	const firstName = locals.user.name?.split(" ")[0] ?? "there";
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, locals.user.id));
	if (!sub) return {
		firstName,
		summary: null
	};
	const rows = await db.select({
		id: subscriptions.id,
		status: subscriptions.status,
		quantity: subscriptions.quantity,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		planName: plans.name,
		packs: plans.packs,
		interval: plans.interval,
		pricePence: plans.pricePence
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, "cancelled"))).orderBy(asc(plans.sortOrder));
	if (rows.length === 0) return {
		firstName,
		summary: null
	};
	const subscriptionIds = rows.map((r) => r.id);
	const [delivery] = await db.select({ scheduledDate: deliveries.scheduledDate }).from(deliveries).where(and(inArray(deliveries.subscriptionId, subscriptionIds), eq(deliveries.status, "scheduled"))).orderBy(asc(deliveries.scheduledDate)).limit(1);
	const recurring = await db.select({
		subscriptionId: subscriberAddons.subscriptionId,
		pricePence: addons.pricePence,
		quantity: subscriberAddons.quantity
	}).from(subscriberAddons).innerJoin(addons, eq(subscriberAddons.addonId, addons.id)).where(inArray(subscriberAddons.subscriptionId, subscriptionIds));
	const addonPenceBySub = /* @__PURE__ */ new Map();
	for (const a of recurring) addonPenceBySub.set(a.subscriptionId, (addonPenceBySub.get(a.subscriptionId) ?? 0) + a.pricePence * a.quantity);
	const headline = rows.find((r) => r.status === "active") ?? rows[0];
	const monthlyPence = rows.filter((r) => r.status === "active").reduce((sum, r) => sum + monthlyEquivalentPence(r.pricePence * (r.quantity ?? 1), r.interval) + monthlyEquivalentPence(addonPenceBySub.get(r.id) ?? 0, r.interval), 0);
	const nextPeriodEnd = rows.filter((r) => r.status === "active" && r.currentPeriodEnd).map((r) => r.currentPeriodEnd).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];
	return {
		firstName,
		summary: {
			planCount: rows.length,
			planLabel: rows.length > 1 ? `${rows.length} plans` : `${headline.planName} plan`,
			packsLabel: rows.length > 1 ? `${headline.planName} + ${rows.length - 1} more` : `${headline.packs} packs ${intervalWord(headline.interval)}`,
			status: headline.status,
			statusLabel: STATUS_LABEL[headline.status] ?? headline.status,
			nextDeliveryLabel: delivery ? dayMonth(delivery.scheduledDate) : null,
			nextPaymentAmount: money(monthlyPence),
			nextPaymentDate: nextPeriodEnd ? instantDate(nextPeriodEnd) : null
		}
	};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-B1TXrH4I.js.map
