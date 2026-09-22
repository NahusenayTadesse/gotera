import { m as db, B as notifications, k as and, j as eq, x as addons, t as subscriptions, v as deliveries, F as alias, E as addresses, q as plans, o as or, G as isNotNull, f as ne, a as asc, i as inArray, w as subscriberAddons, C as isNull, d as desc, p as subscribers } from '../../../chunks/db.js-BK-FhdZP.js';
import { f as fullDate, i as instantDate } from '../../../chunks/format.js-DhQga0l2.js';
import { i as isPastCutoff, c as cutoffDateFor } from '../../../chunks/delivery.js-T9UKrAu5.js';
import { s as stripe } from '../../../chunks/stripe.js-DclyrhzZ.js';
import { a as auth } from '../../../chunks/auth.js-2Fa0X3x1.js';
import { B as redirect, C as fail } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, s as string } from '../../../chunks/access.js-HgBsL8za.js';

//#region src/routes/account/+page.server.ts
var intervalLabel = (i) => i === "monthly" ? "monthly" : i === "bi_monthly" ? "bi-monthly" : "one-time";
var deliveryIdSchema = object({ deliveryId: string().min(1) });
var subscriptionIdSchema = object({ subscriptionId: string().min(1) });
/** Matches MAX_QTY on /addons/[token] and the dashboard's own add-on quantity cap. */
var MAX_QTY = 20;
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
		addons: [],
		notices: []
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
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, subscriptions.addressId)).leftJoin(pendingPlan, eq(pendingPlan.id, subscriptions.pendingPlanId)).where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, "cancelled"), or(ne(subscriptions.status, "pending"), isNotNull(subscriptions.stripeSubscriptionId)))).orderBy(asc(plans.sortOrder));
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
	const subscriptionCards = rows.map((r) => {
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
	});
	const catalogue = await db.select().from(addons).where(eq(addons.isActive, true)).orderBy(addons.sortOrder);
	return {
		notices: await db.select({
			id: notifications.id,
			kind: notifications.kind,
			title: notifications.title,
			body: notifications.body
		}).from(notifications).where(and(eq(notifications.subscriberId, sub.id), isNull(notifications.readAt))).orderBy(desc(notifications.createdAt)),
		subscriptions: subscriptionCards,
		addons: catalogue.map((a) => ({
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
		if (owned.stripeSubscriptionId) try {
			await stripe.subscriptions.update(owned.stripeSubscriptionId, { pause_collection: { behavior: "void" } });
		} catch (e) {
			console.error("stripe pause failed", e);
			return fail(502, { message: "Could not pause billing. Please try again." });
		}
		await db.update(subscriptions).set({ status: "paused" }).where(eq(subscriptions.id, owned.id));
		return { message: "Plan paused. You will not be charged until you resume." };
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
		if (owned.stripeSubscriptionId) try {
			await stripe.subscriptions.update(owned.stripeSubscriptionId, { pause_collection: null });
		} catch (e) {
			console.error("stripe resume failed", e);
			return fail(502, { message: "Could not resume billing. Please try again." });
		}
		await db.update(subscriptions).set({ status: "active" }).where(eq(subscriptions.id, owned.id));
		return { message: "Plan resumed." };
	},
	/**
	* Buy a one-off add-on for a specific upcoming delivery.
	*
	* This does NOT write `deliveryAddons` — it only starts a Stripe payment. Fulfilment
	* happens in the webhook's `handleDeliveryAddonPurchase`, the same handler the
	* /addons/[token] email page uses, so both routes share one dedupe key
	* (`delivery_addon_purchases.stripe_payment_intent_id`) and one confirmation email.
	* Writing the add-on here as well would hand it over before the customer had paid.
	*/
	addAddon: async ({ request, locals, url }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const formData = await request.formData();
		const input = parseForm(deliveryIdSchema, formData);
		if (!input) return fail(400, { message: "Nothing to add." });
		const { delivery, error } = await getChangeableDelivery(sub.id, input.deliveryId);
		if (!delivery) return fail(400, { message: error });
		const catalogue = await db.select().from(addons).where(eq(addons.isActive, true));
		const items = [];
		for (const addon of catalogue) {
			const raw = formData.get(`qty_${addon.id}`);
			if (raw === null) continue;
			const qty = Number(raw);
			if (!Number.isInteger(qty) || qty < 0 || qty > MAX_QTY) return fail(400, { message: "Invalid quantity." });
			if (qty > 0) items.push({
				id: addon.id,
				name: addon.name,
				pricePence: addon.pricePence,
				quantity: qty
			});
		}
		if (items.length === 0) return fail(400, { message: "Pick at least one extra." });
		const itemsJson = JSON.stringify(items.map((i) => ({
			id: i.id,
			quantity: i.quantity
		})));
		if (itemsJson.length > 500) return fail(400, { message: "Too many different extras in one go — please split it across two payments." });
		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: "payment",
				customer_email: sub.email,
				line_items: items.map((item) => ({
					price_data: {
						currency: "gbp",
						product_data: { name: item.name },
						unit_amount: item.pricePence
					},
					quantity: item.quantity
				})),
				success_url: `${url.origin}/account?addons=success`,
				cancel_url: `${url.origin}/account?addons=canceled`,
				payment_intent_data: { metadata: {
					kind: "delivery-addon",
					deliveryId: delivery.id
				} },
				metadata: {
					kind: "delivery-addon",
					deliveryId: delivery.id,
					items: itemsJson
				}
			});
		} catch (e) {
			console.error("account addAddon checkout failed", e);
			return fail(500, { message: "Could not start payment. Please try again." });
		}
		redirect(303, session.url);
	},
	dismissNotice: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { message: "Not signed in." });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return fail(400, { message: "No subscription found." });
		const id = (await request.formData()).get("id");
		if (typeof id !== "string" || !id) return fail(400, { message: "Invalid request." });
		await db.update(notifications).set({ readAt: /* @__PURE__ */ new Date() }).where(and(eq(notifications.id, id), eq(notifications.subscriberId, sub.id)));
		return { message: "Dismissed." };
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
//# sourceMappingURL=_page.server.ts.js-Dh6yaopL.js.map
