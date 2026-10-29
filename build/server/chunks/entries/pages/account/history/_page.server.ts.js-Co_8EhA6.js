import { m as db, C as deliveries, s as sql, q as subscriptions, t as plans, j as eq, k as and, f as ne, d as desc, K as deliveryAddons, y as addons, i as inArray, p as subscribers, I as alias } from '../../../../chunks/db.js-Can7tpXV.js';
import { a as money, c as shortDate } from '../../../../chunks/format.js-CaMNmk6h.js';
import { s as subscriptionUnitPrice } from '../../../../chunks/plans.js-z_C5usfw.js';
import { B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/history/+page.server.ts
var bookedPlan = alias(plans, "booked_plan");
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
		planName: sql`coalesce(${bookedPlan.name}, ${plans.name})`,
		packs: sql`coalesce(${deliveries.packs}, ${plans.packs})`.mapWith(Number),
		quantity: sql`coalesce(${deliveries.quantity}, ${subscriptions.quantity})`.mapWith(Number),
		pricePence: sql`coalesce(${deliveries.unitPricePence}, ${subscriptionUnitPrice})`.mapWith(Number)
	}).from(deliveries).innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).innerJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(bookedPlan, eq(bookedPlan.id, deliveries.planId)).where(and(eq(deliveries.subscriberId, sub.id), ne(deliveries.status, "scheduled"))).orderBy(desc(deliveries.scheduledDate)).limit(limit + 1);
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
//# sourceMappingURL=_page.server.ts.js-Co_8EhA6.js.map
