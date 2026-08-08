import { m as db, t as deliveries, k as and, j as eq, w as addons, A as deliveryAddons, y as subscriptions, B as alias, z as addresses, q as plans, f as ne, a as asc, i as inArray, v as subscriberAddons, p as subscribers } from '../../../chunks/db.js-BkD50_-0.js';
import { a as auth } from '../../../chunks/auth.js-DZBRJAcg.js';
import { C as fail, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/+page.server.ts
var CUTOFF_DAYS = 4;
var weekdayOf = (d) => new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(d);
var monthOf = (d) => new Intl.DateTimeFormat("en-GB", { month: "long" }).format(d);
var fullDateLabel = (d) => `${weekdayOf(d)}, ${d.getDate()} ${monthOf(d)}`;
var intervalLabel = (i) => i === "monthly" ? "monthly" : i === "bi_monthly" ? "bi-monthly" : "one-time";
async function getSubscriber(userId) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}
async function getOwnedSubscription(subscriberId, subscriptionId) {
	const [row] = await db.select().from(subscriptions).where(and(eq(subscriptions.id, subscriptionId), eq(subscriptions.subscriberId, subscriberId)));
	return row ?? null;
}
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/signin");
	const sub = await getSubscriber(locals.user.id);
	if (!sub) return {
		subscriptions: [],
		addons: []
	};
	const pendingPlan = alias(plans, "pending_plan");
	const rows = await db.select({
		id: subscriptions.id,
		status: subscriptions.status,
		quantity: subscriptions.quantity,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		pendingPlanAt: subscriptions.pendingPlanAt,
		planName: plans.name,
		pricePence: plans.pricePence,
		packs: plans.packs,
		interval: plans.interval,
		addressLine1: addresses.line1,
		addressCity: addresses.city,
		pendingPlanName: pendingPlan.name
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, subscriptions.addressId)).leftJoin(pendingPlan, eq(pendingPlan.id, subscriptions.pendingPlanId)).where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, "cancelled"))).orderBy(asc(plans.sortOrder));
	const subscriptionIds = rows.map((r) => r.id);
	const upcoming = subscriptionIds.length ? await db.select({
		id: deliveries.id,
		subscriptionId: deliveries.subscriptionId,
		scheduledDate: deliveries.scheduledDate,
		line1: addresses.line1,
		city: addresses.city
	}).from(deliveries).innerJoin(addresses, eq(deliveries.addressId, addresses.id)).where(and(inArray(deliveries.subscriptionId, subscriptionIds), eq(deliveries.status, "scheduled"))).orderBy(asc(deliveries.scheduledDate)) : [];
	const nextDeliveryBySub = /* @__PURE__ */ new Map();
	for (const d of upcoming) if (!nextDeliveryBySub.has(d.subscriptionId)) nextDeliveryBySub.set(d.subscriptionId, d);
	const recurring = subscriptionIds.length ? await db.select({
		subscriptionId: subscriberAddons.subscriptionId,
		pricePence: addons.pricePence,
		quantity: subscriberAddons.quantity
	}).from(subscriberAddons).innerJoin(addons, eq(subscriberAddons.addonId, addons.id)).where(inArray(subscriberAddons.subscriptionId, subscriptionIds)) : [];
	const recurringPenceBySub = /* @__PURE__ */ new Map();
	for (const a of recurring) recurringPenceBySub.set(a.subscriptionId, (recurringPenceBySub.get(a.subscriptionId) ?? 0) + a.pricePence * a.quantity);
	return {
		subscriptions: rows.map((r) => {
			const qty = r.quantity ?? 1;
			const addonsPence = recurringPenceBySub.get(r.id) ?? 0;
			const delivery = nextDeliveryBySub.get(r.id);
			let nextDelivery = null;
			if (delivery) {
				const d = new Date(delivery.scheduledDate);
				const cut = new Date(d);
				cut.setDate(cut.getDate() - CUTOFF_DAYS);
				nextDelivery = {
					id: delivery.id,
					dateLabel: fullDateLabel(d),
					cutoffLabel: fullDateLabel(cut),
					addressLine: `${delivery.line1}, ${delivery.city}`
				};
			}
			return {
				id: r.id,
				planName: r.planName,
				packsLabel: `${r.packs} packs · ${intervalLabel(r.interval)}`,
				quantity: qty,
				unitPricePence: r.pricePence,
				pricePence: r.pricePence * qty + addonsPence,
				status: r.status,
				cancelAtPeriodEnd: r.cancelAtPeriodEnd,
				nextPaymentDate: r.currentPeriodEnd ? fullDateLabel(new Date(r.currentPeriodEnd)) : null,
				pendingPlanName: r.pendingPlanName,
				pendingPlanAt: r.pendingPlanAt ? fullDateLabel(new Date(r.pendingPlanAt)) : null,
				addressLine: r.addressLine1 ? `${r.addressLine1}, ${r.addressCity}` : null,
				nextDelivery
			};
		}),
		addons: (await db.select().from(addons).orderBy(addons.sortOrder)).map((a) => ({
			id: a.id,
			name: a.name,
			pricePence: a.pricePence,
			desc: a.description ?? ""
		}))
	};
};
var actions = {
	skip: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const id = String((await request.formData()).get("deliveryId") ?? "");
		if (!id) return fail(400, { message: "Missing delivery." });
		await db.update(deliveries).set({ status: "skipped" }).where(and(eq(deliveries.id, id), eq(deliveries.subscriberId, sub.id)));
		return { message: "Delivery skipped." };
	},
	pause: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const subscriptionId = String((await request.formData()).get("subscriptionId") ?? "");
		const owned = await getOwnedSubscription(sub.id, subscriptionId);
		if (!owned) return fail(400, { message: "That plan could not be found." });
		if (owned.status !== "active") return fail(400, { message: "Only active plans can be paused." });
		await db.update(subscriptions).set({ status: "paused" }).where(eq(subscriptions.id, subscriptionId));
		return { message: "Plan paused." };
	},
	resume: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const subscriptionId = String((await request.formData()).get("subscriptionId") ?? "");
		const owned = await getOwnedSubscription(sub.id, subscriptionId);
		if (!owned) return fail(400, { message: "That plan could not be found." });
		if (owned.status !== "paused") return fail(400, { message: "Only paused plans can be resumed." });
		await db.update(subscriptions).set({ status: "active" }).where(eq(subscriptions.id, subscriptionId));
		return { message: "Plan resumed." };
	},
	addAddon: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const data = await request.formData();
		const addonId = String(data.get("addonId") ?? "");
		const deliveryId = String(data.get("deliveryId") ?? "");
		const quantity = Math.max(0, Number(data.get("quantity") ?? 0));
		if (!addonId || !deliveryId || quantity < 1) return fail(400, { message: "Nothing to add." });
		const [delivery] = await db.select({ id: deliveries.id }).from(deliveries).where(and(eq(deliveries.id, deliveryId), eq(deliveries.subscriberId, sub.id), eq(deliveries.status, "scheduled")));
		if (!delivery) return fail(400, { message: "That delivery is no longer available." });
		const [addon] = await db.select().from(addons).where(eq(addons.id, addonId));
		if (!addon) return fail(400, { message: "Unknown add-on." });
		const [existing] = await db.select().from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, delivery.id), eq(deliveryAddons.addonId, addonId)));
		if (existing) await db.update(deliveryAddons).set({ quantity: existing.quantity + quantity }).where(eq(deliveryAddons.id, existing.id));
		else await db.insert(deliveryAddons).values({
			id: crypto.randomUUID(),
			deliveryId: delivery.id,
			addonId,
			quantity
		});
		return { message: `${addon.name} added to your next delivery.` };
	},
	logout: async (event) => {
		await auth.api.signOut({ headers: event.request.headers });
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Cq7Mpyy8.js.map
