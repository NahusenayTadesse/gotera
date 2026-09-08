import { m as db, x as addons, H as deliveryAddons, j as eq, k as and, y as deliverySkipDates, p as subscribers, v as deliveries, L as guestOrders, M as giftOrders, d as desc, E as addresses, q as plans, t as subscriptions, a as asc, w as subscriberAddons } from '../../../../chunks/db.js-QS2RGzZQ.js';
import { f as fullDate } from '../../../../chunks/format.js-DhQga0l2.js';
import { b as nextDeliveryDateAfter } from '../../../../chunks/deliverySchedule.js-CTVedZcc.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CMe7fg5E.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-nubrWqZa.js';
import { z as zod } from '../../../../chunks/adapters.js-D3ccRgef.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../chunks/crud.js-Ch0tzD6j.js';
import { b as bulkEmailSchema } from '../../../../chunks/bulkEmail.js-GA9Kc6dA.js';
import { s as sendBulkEmailAction } from '../../../../chunks/bulkEmail2.js-DHsiK3-W.js';
import { s as skipDateSchema, d as deliverySchema } from '../../../../chunks/skipDateSchema.js-DIsTyYaS.js';
import { C as fail } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/deliveries/+page.server.ts
var crud = contentCrud({
	table: deliveries,
	label: "Delivery",
	addSchema: deliverySchema,
	editSchema: deliverySchema
});
var load = async () => {
	const [form, bulkEmailForm, skipDateForm, skipDates, subscriptionRows, guestRows, giftRows, oneOffAddonRows, recurringAddonRows, addonCatalogue] = await Promise.all([
		superValidate(zod(deliverySchema)),
		superValidate(zod(bulkEmailSchema)),
		superValidate(zod(skipDateSchema)),
		db.select().from(deliverySkipDates).orderBy(desc(deliverySkipDates.date)),
		db.select({
			id: deliveries.id,
			subscriptionId: deliveries.subscriptionId,
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planName: plans.name,
			addressLine1: addresses.line1,
			addressCity: addresses.city,
			addressPostcode: addresses.postcode,
			isActive: deliveries.isActive
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).orderBy(asc(deliveries.scheduledDate)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt)),
		db.select({
			deliveryId: deliveryAddons.deliveryId,
			name: addons.name,
			quantity: deliveryAddons.quantity
		}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)),
		db.select({
			subscriptionId: subscriberAddons.subscriptionId,
			name: addons.name,
			quantity: subscriberAddons.quantity
		}).from(subscriberAddons).innerJoin(addons, eq(addons.id, subscriberAddons.addonId)),
		db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder))
	]);
	const oneOffByDelivery = /* @__PURE__ */ new Map();
	for (const a of oneOffAddonRows) {
		const list = oneOffByDelivery.get(a.deliveryId) ?? [];
		list.push({
			name: a.name,
			quantity: a.quantity,
			recurring: false
		});
		oneOffByDelivery.set(a.deliveryId, list);
	}
	const recurringBySubscription = /* @__PURE__ */ new Map();
	for (const a of recurringAddonRows) {
		const list = recurringBySubscription.get(a.subscriptionId) ?? [];
		list.push({
			name: a.name,
			quantity: a.quantity,
			recurring: true
		});
		recurringBySubscription.set(a.subscriptionId, list);
	}
	const subscriptionDeliveries = subscriptionRows.map((r) => ({
		...r,
		type: "subscription",
		addons: [...recurringBySubscription.get(r.subscriptionId) ?? [], ...oneOffByDelivery.get(r.id) ?? []]
	}));
	const guestDeliveries = guestRows.map((r) => {
		const address = parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		});
		return {
			id: r.id,
			type: "guest",
			scheduledDate: r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: "Guest order",
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({
				name: a.name,
				quantity: a.quantity,
				recurring: false
			}))
		};
	});
	const giftDeliveries = giftRows.map((r) => {
		const address = parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		});
		return {
			id: r.id,
			type: "one-time",
			scheduledDate: r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: "One-time order",
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({
				name: a.name,
				quantity: a.quantity,
				recurring: false
			}))
		};
	});
	return {
		form,
		bulkEmailForm,
		skipDateForm,
		skipDates,
		rows: [
			...subscriptionDeliveries,
			...guestDeliveries,
			...giftDeliveries
		].sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()),
		addonCatalogue
	};
};
var actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete,
	sendBulkEmail: sendBulkEmailAction,
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		const type = formData.get("type");
		if (typeof id !== "string" || type !== "guest" && type !== "one-time") return fail(400, { error: "Invalid request" });
		const table = type === "guest" ? guestOrders : giftOrders;
		await db.delete(table).where(eq(table.id, id));
		return { success: true };
	},
	addSkipDate: async ({ request }) => {
		const form = await superValidate(request, zod(skipDateSchema));
		if (!form.valid) return fail(400, { form });
		const [y, m, d] = form.data.date.split("-").map(Number);
		const skipDate = new Date(y, m - 1, d);
		const [existing] = await db.select({ id: deliverySkipDates.id }).from(deliverySkipDates).where(eq(deliverySkipDates.date, skipDate));
		if (existing) return message(form, {
			type: "error",
			text: "That date is already marked as skipped."
		}, { status: 400 });
		await db.insert(deliverySkipDates).values({
			date: skipDate,
			reason: form.data.reason || null
		});
		const affectedRows = await db.select({
			email: subscribers.email,
			name: subscribers.fullName
		}).from(deliveries).innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).where(and(eq(deliveries.status, "scheduled"), eq(deliveries.scheduledDate, skipDate)));
		if (affectedRows.length === 0) return message(form, {
			type: "success",
			text: `${fullDate(skipDate)} marked as skipped. No deliveries were booked for it.`
		});
		const newDate = await nextDeliveryDateAfter(skipDate);
		await db.update(deliveries).set({ scheduledDate: newDate }).where(and(eq(deliveries.status, "scheduled"), eq(deliveries.scheduledDate, skipDate)));
		const seen = /* @__PURE__ */ new Set();
		const affected = [];
		for (const r of affectedRows) {
			if (seen.has(r.email)) continue;
			seen.add(r.email);
			affected.push({
				email: r.email,
				name: r.name ?? void 0
			});
		}
		return message(form, {
			type: "success",
			text: `${fullDate(skipDate)} skipped — ${affectedRows.length} ${affectedRows.length === 1 ? "delivery" : "deliveries"} moved to ${fullDate(newDate)}.`,
			affected,
			skippedDateLabel: fullDate(skipDate),
			newDateLabel: fullDate(newDate)
		});
	},
	deleteSkipDate: async ({ request }) => {
		const id = (await request.formData()).get("id");
		if (typeof id !== "string" || !id) return fail(400, { error: "Invalid request" });
		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.id, id));
		return { success: true };
	},
	addDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get("deliveryId");
		const addonId = formData.get("addonId");
		const quantity = Number(formData.get("quantity") ?? 1);
		if (typeof deliveryId !== "string" || !deliveryId || typeof addonId !== "string" || !addonId || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return fail(400, { error: "Invalid request" });
		const [existing] = await db.select().from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));
		if (existing) await db.update(deliveryAddons).set({ quantity: existing.quantity + quantity }).where(eq(deliveryAddons.id, existing.id));
		else await db.insert(deliveryAddons).values({
			deliveryId,
			addonId,
			quantity
		});
		return { success: true };
	},
	removeDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get("deliveryId");
		const name = formData.get("name");
		if (typeof deliveryId !== "string" || !deliveryId || typeof name !== "string" || !name) return fail(400, { error: "Invalid request" });
		const match = (await db.select({
			id: deliveryAddons.id,
			name: addons.name
		}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)).where(eq(deliveryAddons.deliveryId, deliveryId))).find((r) => r.name === name);
		if (!match) return fail(400, { error: "Add-on not found on this delivery" });
		await db.delete(deliveryAddons).where(eq(deliveryAddons.id, match.id));
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-kNDTw0rV.js.map
