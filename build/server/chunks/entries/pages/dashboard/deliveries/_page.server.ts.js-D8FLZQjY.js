import { m as db, F as guestOrders, G as giftOrders, j as eq, v as deliveries, z as addresses, q as plans, p as subscribers, t as subscriptions, a as asc, d as desc } from '../../../../chunks/db.js-DE8Uq6gc.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CUxYxBeU.js';
import { s as superValidate } from '../../../../chunks/client2.js-BDO3j3-U.js';
import { z as zod } from '../../../../chunks/adapters.js-Ck7E6IvP.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../chunks/crud.js-D6eLu6qQ.js';
import { b as bulkEmailSchema } from '../../../../chunks/bulkEmail.js-B9mPQG3L.js';
import { s as sendBulkEmailAction } from '../../../../chunks/bulkEmail2.js-BAdSB7YN.js';
import { d as deliverySchema } from '../../../../chunks/schema8.js-BbcWhcHN.js';
import { C as fail } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/deliveries/+page.server.ts
var crud = contentCrud({
	table: deliveries,
	label: "Delivery",
	addSchema: deliverySchema,
	editSchema: deliverySchema
});
var load = async () => {
	const [form, bulkEmailForm, subscriptionRows, guestRows, giftRows] = await Promise.all([
		superValidate(zod(deliverySchema)),
		superValidate(zod(bulkEmailSchema)),
		db.select({
			id: deliveries.id,
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
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt))
	]);
	const subscriptionDeliveries = subscriptionRows.map((r) => ({
		...r,
		type: "subscription"
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
			isActive: r.isActive
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
			isActive: r.isActive
		};
	});
	return {
		form,
		bulkEmailForm,
		rows: [
			...subscriptionDeliveries,
			...guestDeliveries,
			...giftDeliveries
		].sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
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
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-D8FLZQjY.js.map
