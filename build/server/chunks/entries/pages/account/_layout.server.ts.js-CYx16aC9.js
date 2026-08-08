import { m as db, p as subscribers, j as eq, q as plans, t as deliveries, k as and, a as asc, v as subscriberAddons, w as addons } from '../../../chunks/db.js-BkD50_-0.js';
import { B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/+layout.server.ts
var monthLong = (d) => new Intl.DateTimeFormat("en-GB", { month: "long" }).format(d);
var dayMonth = (d) => {
	const x = new Date(d);
	return `${x.getDate()} ${monthLong(x)}`;
};
var intervalWord = (i) => i === "bi_monthly" ? "bi-monthly" : i === "one_time" ? "one-time" : "monthly";
var STATUS_LABEL = {
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
	const [plan] = await db.select().from(plans).where(eq(plans.slug, sub.plan));
	const [delivery] = await db.select({ scheduledDate: deliveries.scheduledDate }).from(deliveries).where(and(eq(deliveries.subscriberId, sub.id), eq(deliveries.status, "scheduled"))).orderBy(asc(deliveries.scheduledDate)).limit(1);
	const recurring = await db.select({
		pricePence: addons.pricePence,
		quantity: subscriberAddons.quantity
	}).from(subscriberAddons).innerJoin(addons, eq(subscriberAddons.addonId, addons.id)).where(eq(subscriberAddons.subscriberId, sub.id));
	const amountPence = (plan?.pricePence ?? 0) + recurring.reduce((s, a) => s + a.pricePence * a.quantity, 0);
	return {
		firstName,
		summary: {
			planLabel: `${plan?.name ?? sub.plan} plan`,
			packsLabel: `${plan?.packs ?? "—"} packs ${intervalWord(plan?.interval)}`,
			status: sub.status,
			statusLabel: STATUS_LABEL[sub.status] ?? sub.status,
			nextDeliveryLabel: delivery ? dayMonth(delivery.scheduledDate) : null,
			nextPaymentAmount: `£${(amountPence / 100).toFixed(2)}`,
			nextPaymentDate: null
		}
	};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-CYx16aC9.js.map
