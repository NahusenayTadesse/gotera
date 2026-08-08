import { m as db, q as plans, t as deliveries, y as subscriptions, j as eq, k as and, f as ne, d as desc, A as deliveryAddons, w as addons, i as inArray, p as subscribers } from '../../../../chunks/db.js-BkD50_-0.js';
import { B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/history/+page.server.ts
var dateLabel = (d) => new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric"
}).format(new Date(d));
var gbp = (pence) => `£${(pence / 100).toFixed(2)}`;
var statusText = {
	delivered: "Delivered",
	dispatched: "Dispatched",
	skipped: "Skipped",
	failed: "Failed"
};
async function getSubscriber(userId) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/signin");
	const sub = await getSubscriber(locals.user.id);
	if (!sub) return { orders: [] };
	const rows = await db.select({
		id: deliveries.id,
		scheduledDate: deliveries.scheduledDate,
		status: deliveries.status,
		planName: plans.name,
		packs: plans.packs,
		pricePence: plans.pricePence
	}).from(deliveries).innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(and(eq(deliveries.subscriberId, sub.id), ne(deliveries.status, "scheduled"))).orderBy(desc(deliveries.scheduledDate));
	const deliveryIds = rows.map((r) => r.id);
	const addonRows = deliveryIds.length ? await db.select({
		deliveryId: deliveryAddons.deliveryId,
		name: addons.name,
		pricePence: addons.pricePence,
		quantity: deliveryAddons.quantity
	}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)).where(inArray(deliveryAddons.deliveryId, deliveryIds)) : [];
	const addonsByDelivery = /* @__PURE__ */ new Map();
	for (const a of addonRows) {
		const list = addonsByDelivery.get(a.deliveryId) ?? [];
		list.push(a);
		addonsByDelivery.set(a.deliveryId, list);
	}
	return { orders: rows.map((r) => {
		const addonsForDelivery = addonsByDelivery.get(r.id) ?? [];
		const addonPence = addonsForDelivery.reduce((s, a) => s + a.pricePence * a.quantity, 0);
		const addonSummary = addonsForDelivery.map((a) => `${a.quantity}× ${a.name}`).join(", ");
		const items = addonSummary ? `${r.planName} · ${r.packs} packs + ${addonSummary}` : `${r.planName} · ${r.packs} packs`;
		return {
			id: r.id,
			date: dateLabel(r.scheduledDate),
			items,
			amount: gbp(r.pricePence + addonPence),
			status: statusText[r.status] ?? r.status,
			statusKey: r.status
		};
	}) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-hvpi2SZL.js.map
