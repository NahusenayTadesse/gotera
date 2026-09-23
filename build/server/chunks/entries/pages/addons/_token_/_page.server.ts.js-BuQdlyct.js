import { m as db, x as addons, j as eq, a as asc, I as deliveryAddons, p as subscribers, v as deliveries } from '../../../../chunks/db.js-BXYNtFGm.js';
import { f as fullDate } from '../../../../chunks/format.js-DhQga0l2.js';
import { s as stripe } from '../../../../chunks/stripe.js-DclyrhzZ.js';
import { v as error, C as fail, B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/addons/[token]/+page.server.ts
var MAX_QTY = 20;
async function findDelivery(token) {
	const [row] = await db.select({
		id: deliveries.id,
		status: deliveries.status,
		scheduledDate: deliveries.scheduledDate,
		subscriberEmail: subscribers.email,
		subscriberName: subscribers.fullName
	}).from(deliveries).innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).where(eq(deliveries.addonAccessToken, token));
	return row;
}
var load = async ({ params }) => {
	const delivery = await findDelivery(params.token);
	if (!delivery) error(404, "This link is no longer valid.");
	const [catalogue, existingAddons] = await Promise.all([db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder)), db.select({
		name: addons.name,
		quantity: deliveryAddons.quantity
	}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)).where(eq(deliveryAddons.deliveryId, delivery.id))]);
	return {
		name: delivery.subscriberName ?? "there",
		deliveryLabel: fullDate(delivery.scheduledDate),
		open: delivery.status === "scheduled",
		catalogue,
		existingAddons,
		maxQty: MAX_QTY
	};
};
var actions = { checkout: async ({ request, params, url }) => {
	const delivery = await findDelivery(params.token);
	if (!delivery) error(404, "This link is no longer valid.");
	if (delivery.status !== "scheduled") return fail(400, { error: "This delivery can no longer be changed." });
	const formData = await request.formData();
	const catalogue = await db.select().from(addons).where(eq(addons.isActive, true));
	const items = [];
	for (const addon of catalogue) {
		const raw = formData.get(`qty_${addon.id}`);
		if (raw === null) continue;
		const qty = Number(raw);
		if (!Number.isInteger(qty) || qty < 0 || qty > MAX_QTY) return fail(400, { error: "Invalid quantity." });
		if (qty > 0) items.push({
			id: addon.id,
			name: addon.name,
			pricePence: addon.pricePence,
			quantity: qty
		});
	}
	if (items.length === 0) return fail(400, { error: "Pick at least one extra." });
	redirect(303, (await stripe.checkout.sessions.create({
		mode: "payment",
		customer_email: delivery.subscriberEmail,
		line_items: items.map((item) => ({
			price_data: {
				currency: "gbp",
				product_data: { name: item.name },
				unit_amount: item.pricePence
			},
			quantity: item.quantity
		})),
		success_url: `${url.origin}/addons/${params.token}?success=1`,
		cancel_url: `${url.origin}/addons/${params.token}?canceled=1`,
		payment_intent_data: { metadata: {
			kind: "delivery-addon",
			deliveryId: delivery.id
		} },
		metadata: {
			kind: "delivery-addon",
			deliveryId: delivery.id,
			items: JSON.stringify(items.map((item) => ({
				id: item.id,
				quantity: item.quantity
			})))
		}
	})).url);
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BuQdlyct.js.map
