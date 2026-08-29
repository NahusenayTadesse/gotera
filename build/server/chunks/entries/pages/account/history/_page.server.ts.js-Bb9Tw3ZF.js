import { m as db, q as plans, t as subscriptions, v as deliveries, j as eq, k as and, f as ne, d as desc, A as deliveryAddons, x as addons, i as inArray, p as subscribers } from '../../../../chunks/db.js-BjhfTcAV.js';
import { a as money, b as shortDate } from '../../../../chunks/format.js-D2IJ8g7t.js';
import { B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/history/+page.server.ts
var PAGE_SIZE = 50;
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
var load = async ({ locals, url }) => {
	if (!locals.user) throw redirect(303, "/login");
	const sub = await getSubscriber(locals.user.id);
	if (!sub) return {
		orders: [],
		hasMore: false,
		limit: PAGE_SIZE
	};
	const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || PAGE_SIZE, PAGE_SIZE), 500);
	const rows = await db.select({
		id: deliveries.id,
		scheduledDate: deliveries.scheduledDate,
		status: deliveries.status,
		planName: plans.name,
		packs: plans.packs,
		quantity: subscriptions.quantity,
		pricePence: plans.pricePence
	}).from(deliveries).innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(and(eq(deliveries.subscriberId, sub.id), ne(deliveries.status, "scheduled"))).orderBy(desc(deliveries.scheduledDate)).limit(limit + 1);
	const hasMore = rows.length > limit;
	if (hasMore) rows.pop();
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
	return {
		orders: rows.map((r) => {
			const addonsForDelivery = addonsByDelivery.get(r.id) ?? [];
			const addonPence = addonsForDelivery.reduce((s, a) => s + a.pricePence * a.quantity, 0);
			const qty = r.quantity ?? 1;
			const addonSummary = addonsForDelivery.map((a) => `${a.quantity}× ${a.name}`).join(", ");
			const packsLabel = qty > 1 ? `${r.packs} packs ×${qty}` : `${r.packs} packs`;
			const items = addonSummary ? `${r.planName} · ${packsLabel} + ${addonSummary}` : `${r.planName} · ${packsLabel}`;
			return {
				id: r.id,
				date: shortDate(r.scheduledDate),
				items,
				amount: money(r.pricePence * qty + addonPence),
				status: statusText[r.status] ?? r.status,
				statusKey: r.status
			};
		}),
		hasMore,
		limit
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Bb9Tw3ZF.js.map
