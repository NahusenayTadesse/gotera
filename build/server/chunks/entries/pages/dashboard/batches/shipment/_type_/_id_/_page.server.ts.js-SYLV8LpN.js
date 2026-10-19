import { m as db, P as batchAllocations, j as eq, I as addresses, t as plans, p as subscribers, x as deliveries, q as subscriptions, B as guestOrders, A as giftOrders, R as partnerDeliveries, S as partnerApplications } from '../../../../../../../chunks/db.js-1ke6Xzkd.js';
import { t as toCalendarString } from '../../../../../../../chunks/format.js-DDyQH27n.js';
import { p as parseJsonColumn } from '../../../../../../../chunks/format2.js-D8oyWA_y.js';
import { r as reactivateBatches, s as syncAllocations, d as assignLineManually, b as shipmentLines, c as allocationsFor, e as eligibleBatches, S as SHIPMENT_TYPES } from '../../../../../../../chunks/traceability.js-BV5Z4jsA.js';
import { C as fail, v as error } from '../../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/batches/shipment/[type]/[id]/+page.server.ts
var addr = (a) => [
	a?.line1,
	a?.line2,
	a?.city,
	a?.postcode
].filter(Boolean).join(", ");
/** Who/where/when for the shipment header, whatever table it lives in. */
async function shipmentHeader(type, id) {
	if (type === "subscription") {
		const [r] = await db.select({
			date: deliveries.scheduledDate,
			status: deliveries.status,
			name: subscribers.fullName,
			email: subscribers.email,
			plan: plans.name,
			line1: addresses.line1,
			line2: addresses.line2,
			city: addresses.city,
			postcode: addresses.postcode
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).where(eq(deliveries.id, id));
		return r && {
			date: toCalendarString(r.date),
			status: r.status,
			customer: r.name ?? r.email ?? "—",
			email: r.email,
			address: addr(r),
			description: `${r.plan ?? "Subscription"} delivery`,
			backHref: "/dashboard/deliveries"
		};
	}
	if (type === "guest" || type === "gift") {
		const table = type === "guest" ? guestOrders : giftOrders;
		const [o] = await db.select().from(table).where(eq(table.id, id));
		return o && {
			date: toCalendarString(o.createdAt),
			status: o.status,
			customer: o.recipientName || o.buyerName || o.buyerEmail || "—",
			email: o.buyerEmail,
			address: addr(parseJsonColumn(o.recipientAddress, {})),
			description: type === "guest" ? "Guest order" : "One-time / gift order",
			backHref: type === "guest" ? "/dashboard/orders/guest" : "/dashboard/orders/one-time"
		};
	}
	const [p] = await db.select({
		date: partnerDeliveries.deliveredOn,
		status: partnerDeliveries.status,
		location: partnerDeliveries.location,
		partnerId: partnerDeliveries.partnerId,
		name: partnerApplications.businessName,
		email: partnerApplications.email,
		reference: partnerDeliveries.reference
	}).from(partnerDeliveries).innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId)).where(eq(partnerDeliveries.id, id));
	return p && {
		date: p.date,
		status: p.status,
		customer: p.name,
		email: p.email,
		address: p.location,
		description: `Trade delivery${p.reference ? ` ${p.reference}` : ""}`,
		backHref: `/dashboard/partners/${p.partnerId}`
	};
}
var parseType = (t) => {
	const type = SHIPMENT_TYPES.find((s) => s === t);
	if (!type) error(404, "Unknown shipment type");
	return type;
};
var load = async ({ params }) => {
	const type = parseType(params.type);
	const header = await shipmentHeader(type, params.id);
	if (!header) error(404, "Shipment not found");
	const lines = await shipmentLines({ refs: [{
		type,
		id: params.id
	}] });
	const [allocs, options] = await Promise.all([allocationsFor(lines.map((l) => l.lineKey)), Promise.all(lines.map((l) => eligibleBatches(l.addonId, l.date)))]);
	return {
		type,
		id: params.id,
		header,
		lines: lines.map((l, i) => {
			const mine = allocs.filter((a) => a.lineKey === l.lineKey);
			const allocated = mine.reduce((n, a) => n + a.quantity, 0);
			return {
				...l,
				allocations: mine,
				allocated,
				state: allocated >= l.quantity ? "assigned" : allocated > 0 ? "partial" : "unassigned",
				options: options[i]
			};
		})
	};
};
var actions = {
	assign: async ({ request, locals }) => {
		const f = await request.formData();
		const result = await assignLineManually(String(f.get("lineKey")), String(f.get("batchId")), locals.user?.id);
		if ("error" in result) return fail(400, { error: result.error });
		return { assigned: result.code };
	},
	auto: async ({ params, locals }) => {
		return { sync: await syncAllocations({ refs: [{
			type: parseType(params.type),
			id: params.id
		}] }, locals.user?.id) };
	},
	unassign: async ({ request }) => {
		const lineKey = String((await request.formData()).get("lineKey"));
		await db.delete(batchAllocations).where(eq(batchAllocations.lineKey, lineKey));
		await reactivateBatches();
		return { unassigned: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-SYLV8LpN.js.map
