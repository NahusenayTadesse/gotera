import { m as db, x as addons, j as eq, A as deliveryAddons, k as and, t as subscriptions, v as deliveries, B as alias, z as addresses, q as plans, f as ne, a as asc, i as inArray, w as subscriberAddons, p as subscribers } from '../../../chunks/db.js-CYNot06E.js';
import { a as auth } from '../../../chunks/auth.js-BW48bvRU.js';
import { f as fullDate, i as instantDate, t as todayInTimeZone, s as shiftDays } from '../../../chunks/format.js-QHc94QbR.js';
import { B as redirect, C as fail } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, Y as number, s as string } from '../../../chunks/access.js-Cygy5klO.js';

//#region src/lib/delivery.ts
/** The last calendar day on which a delivery can still be changed. */
var cutoffDateFor = (scheduledDate) => shiftDays(scheduledDate, -4);
/**
* True once the cut-off day has fully passed in the business time zone.
* ISO calendar dates compare chronologically as plain strings.
*/
var isPastCutoff = (scheduledDate) => todayInTimeZone() > cutoffDateFor(scheduledDate);
//#endregion
//#region src/routes/account/+page.server.ts
var intervalLabel = (i) => i === "monthly" ? "monthly" : i === "bi_monthly" ? "bi-monthly" : "one-time";
var deliveryIdSchema = object({ deliveryId: string().min(1) });
var subscriptionIdSchema = object({ subscriptionId: string().min(1) });
var addAddonSchema = object({
	addonId: string().min(1),
	deliveryId: string().min(1),
	quantity: number().int().min(1).max(20)
});
function parseForm(schema, data) {
	const result = schema.safeParse(Object.fromEntries(data));
	return result.success ? result.data : null;
}
async function getSubscriber(userId) {
	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return sub ?? null;
}
async function getOwnedSubscription(subscriberId, subscriptionId) {
	const [row] = await db.select().from(subscriptions).where(and(eq(subscriptions.id, subscriptionId), eq(subscriptions.subscriberId, subscriberId)));
	return row ?? null;
}
/** Ownership, availability and cut-off in one place — used by `skip` and `addAddon`. */
async function getChangeableDelivery(subscriberId, deliveryId) {
	const [delivery] = await db.select({
		id: deliveries.id,
		scheduledDate: deliveries.scheduledDate
	}).from(deliveries).where(and(eq(deliveries.id, deliveryId), eq(deliveries.subscriberId, subscriberId), eq(deliveries.status, "scheduled")));
	if (!delivery) return {
		delivery: null,
		error: "That delivery is no longer available."
	};
	if (isPastCutoff(delivery.scheduledDate)) return {
		delivery: null,
		error: "The cut-off for this delivery has passed."
	};
	return {
		delivery,
		error: null
	};
}
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(303, "/login");
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
			if (delivery) nextDelivery = {
				id: delivery.id,
				dateLabel: fullDate(delivery.scheduledDate),
				cutoffLabel: fullDate(cutoffDateFor(delivery.scheduledDate)),
				pastCutoff: isPastCutoff(delivery.scheduledDate),
				addressLine: `${delivery.line1}, ${delivery.city}`
			};
			return {
				id: r.id,
				planName: r.planName,
				packsLabel: `${r.packs} packs · ${intervalLabel(r.interval)}`,
				interval: r.interval,
				quantity: qty,
				unitPricePence: r.pricePence,
				pricePence: r.pricePence * qty + addonsPence,
				status: r.status,
				cancelAtPeriodEnd: r.cancelAtPeriodEnd,
				nextPaymentDate: r.currentPeriodEnd ? instantDate(r.currentPeriodEnd) : null,
				pendingPlanName: r.pendingPlanName,
				pendingPlanAt: r.pendingPlanAt ? instantDate(r.pendingPlanAt) : null,
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
		const input = parseForm(deliveryIdSchema, await request.formData());
		if (!input) return fail(400, { message: "Missing delivery." });
		const { delivery, error } = await getChangeableDelivery(sub.id, input.deliveryId);
		if (!delivery) return fail(400, { message: error });
		await db.update(deliveries).set({ status: "skipped" }).where(and(eq(deliveries.id, delivery.id), eq(deliveries.subscriberId, sub.id), eq(deliveries.status, "scheduled")));
		return { message: "Delivery skipped." };
	},
	pause: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const input = parseForm(subscriptionIdSchema, await request.formData());
		if (!input) return fail(400, { message: "That plan could not be found." });
		const owned = await getOwnedSubscription(sub.id, input.subscriptionId);
		if (!owned) return fail(400, { message: "That plan could not be found." });
		if (owned.status !== "active") return fail(400, { message: "Only active plans can be paused." });
		await db.update(subscriptions).set({ status: "paused" }).where(eq(subscriptions.id, owned.id));
		return { message: "Plan paused." };
	},
	resume: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const input = parseForm(subscriptionIdSchema, await request.formData());
		if (!input) return fail(400, { message: "That plan could not be found." });
		const owned = await getOwnedSubscription(sub.id, input.subscriptionId);
		if (!owned) return fail(400, { message: "That plan could not be found." });
		if (owned.status !== "paused") return fail(400, { message: "Only paused plans can be resumed." });
		await db.update(subscriptions).set({ status: "active" }).where(eq(subscriptions.id, owned.id));
		return { message: "Plan resumed." };
	},
	addAddon: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const input = parseForm(addAddonSchema, await request.formData());
		if (!input) return fail(400, { message: "Nothing to add." });
		const { delivery, error } = await getChangeableDelivery(sub.id, input.deliveryId);
		if (!delivery) return fail(400, { message: error });
		const [addon] = await db.select().from(addons).where(eq(addons.id, input.addonId));
		if (!addon) return fail(400, { message: "Unknown add-on." });
		const [existing] = await db.select().from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, delivery.id), eq(deliveryAddons.addonId, input.addonId)));
		if (existing) await db.update(deliveryAddons).set({ quantity: existing.quantity + input.quantity }).where(eq(deliveryAddons.id, existing.id));
		else await db.insert(deliveryAddons).values({
			id: crypto.randomUUID(),
			deliveryId: delivery.id,
			addonId: input.addonId,
			quantity: input.quantity
		});
		return { message: `${addon.name} added to your next delivery.` };
	},
	logout: async (event) => {
		await auth.api.signOut({ headers: event.request.headers });
		redirect(303, "/login");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-B8RcnQ5N.js.map
