import { m as db, Q as batches, T as batchInputs, j as eq, R as partnerDeliveries, k as and, S as partnerApplications, h as gte, e as lte, o as or, l as like, d as desc, i as inArray } from '../../../../../chunks/db.js-1ke6Xzkd.js';
import { b as todayInTimeZone } from '../../../../../chunks/format.js-DDyQH27n.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js--DCHVHjx.js';
import { s as superValidate, m as message } from '../../../../../chunks/client2.js-74WMIpvZ.js';
import { z as zod } from '../../../../../chunks/adapters.js-B-iKxR35.js';
import { i as idSchema } from '../../../../../chunks/crud.js-m3YIuqkQ.js';
import { g as traceSummaries, s as syncAllocations } from '../../../../../chunks/traceability.js-BV5Z4jsA.js';
import { d as deliverySchema, P as PARTNER_STATUSES, D as DELIVERY_STATUSES } from '../../../../../chunks/schema13.js-Dz2hlRO1.js';
import { C as fail, v as error } from '../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/partners/[id]/+page.server.ts
var isoDate = (v) => v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
var load = async ({ params, url }) => {
	const [partner] = await db.select().from(partnerApplications).where(eq(partnerApplications.id, params.id)).limit(1);
	if (!partner) error(404, "Partner not found");
	const status = url.searchParams.get("status") ?? "";
	const filters = {
		from: isoDate(url.searchParams.get("from")),
		to: isoDate(url.searchParams.get("to")),
		status: DELIVERY_STATUSES.includes(status) ? status : "",
		item: (url.searchParams.get("item") ?? "").slice(0, 500),
		location: (url.searchParams.get("location") ?? "").slice(0, 255),
		q: (url.searchParams.get("q") ?? "").trim().slice(0, 100)
	};
	const conditions = [
		eq(partnerDeliveries.partnerId, partner.id),
		filters.from ? gte(partnerDeliveries.deliveredOn, filters.from) : void 0,
		filters.to ? lte(partnerDeliveries.deliveredOn, filters.to) : void 0,
		filters.status ? eq(partnerDeliveries.status, filters.status) : void 0,
		filters.item ? eq(partnerDeliveries.items, filters.item) : void 0,
		filters.location ? eq(partnerDeliveries.location, filters.location) : void 0
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, "\\$&")}%`;
		conditions.push(or(like(partnerDeliveries.reference, term), like(partnerDeliveries.notes, term), like(partnerDeliveries.items, term), like(partnerDeliveries.location, term)));
	}
	const [form, rows, overview] = await Promise.all([
		superValidate(zod(deliverySchema)),
		db.select().from(partnerDeliveries).where(and(...conditions)).orderBy(desc(partnerDeliveries.deliveredOn), desc(partnerDeliveries.createdAt)),
		db.select({
			items: partnerDeliveries.items,
			location: partnerDeliveries.location,
			status: partnerDeliveries.status,
			deliveredOn: partnerDeliveries.deliveredOn
		}).from(partnerDeliveries).where(eq(partnerDeliveries.partnerId, partner.id)).orderBy(desc(partnerDeliveries.deliveredOn))
	]);
	const ids = rows.map((r) => r.id);
	const traces = partner.type === "partner" ? await traceSummaries(ids.map((id) => ({
		type: "partner",
		id
	}))) : null;
	const usedIn = /* @__PURE__ */ new Map();
	if (partner.type === "supplier" && ids.length) {
		const [asInput, asSource] = await Promise.all([db.select({
			receiptId: batchInputs.partnerDeliveryId,
			id: batches.id,
			code: batches.code,
			status: batches.status
		}).from(batchInputs).innerJoin(batches, eq(batches.id, batchInputs.batchId)).where(inArray(batchInputs.partnerDeliveryId, ids)), db.select({
			receiptId: batches.sourceDeliveryId,
			id: batches.id,
			code: batches.code,
			status: batches.status
		}).from(batches).where(inArray(batches.sourceDeliveryId, ids))]);
		for (const b of [...asInput, ...asSource]) {
			if (!b.receiptId) continue;
			const list = usedIn.get(b.receiptId) ?? [];
			if (!list.some((x) => x.id === b.id)) list.push({
				id: b.id,
				code: b.code,
				source: asSource.includes(b) ? "received as" : "ingredient",
				status: b.status
			});
			usedIn.set(b.receiptId, list);
		}
	}
	const deliveries = rows.map((r) => {
		const t = traces?.get(`partner:${r.id}`);
		return {
			...r,
			quantity: Number(r.quantity),
			unitPricePence: r.valuePence != null && Number(r.quantity) > 0 ? Math.round(r.valuePence / Number(r.quantity)) : null,
			kind: partner.type,
			traceState: t?.state ?? "none",
			batches: t?.batches ?? usedIn.get(r.id) ?? []
		};
	});
	const byItem = /* @__PURE__ */ new Map();
	for (const d of deliveries) {
		if (d.status !== "delivered") continue;
		const key = `${d.items.trim().toLowerCase()}|${d.unit.trim().toLowerCase()}`;
		const agg = byItem.get(key) ?? {
			items: d.items,
			unit: d.unit,
			quantity: 0,
			valuePence: 0,
			count: 0,
			first: d.deliveredOn,
			last: d.deliveredOn
		};
		agg.quantity += d.quantity;
		agg.valuePence += d.valuePence ?? 0;
		agg.count += 1;
		if (d.deliveredOn > agg.last) agg.last = d.deliveredOn;
		if (d.deliveredOn < agg.first) agg.first = d.deliveredOn;
		byItem.set(key, agg);
	}
	const today = todayInTimeZone();
	const overall = {
		total: overview.length,
		lastDelivered: overview.find((d) => d.status === "delivered") ?? null,
		nextScheduled: overview.filter((d) => d.status === "scheduled" && d.deliveredOn >= today).at(-1) ?? null
	};
	const defaultLocation = overview[0]?.location ?? [partner.city, partner.postcode].filter(Boolean).join(", ");
	form.data.deliveredOn = today;
	form.data.location = defaultLocation;
	return {
		partner,
		deliveries,
		itemTotals: [...byItem.values()].sort((a, b) => b.count - a.count),
		overall,
		filters,
		options: {
			items: [...new Set(overview.map((d) => d.items))].sort(),
			locations: [...new Set(overview.map((d) => d.location))].sort()
		},
		form,
		defaultLocation
	};
};
/** Outbound trade deliveries get batches assigned (or released) whenever they're saved. */
async function syncPartnerDelivery(type, id, userId) {
	if (type !== "partner") return;
	try {
		await syncAllocations({ refs: [{
			type: "partner",
			id
		}] }, userId);
	} catch (err) {
		console.error("Batch sync for partner delivery failed:", err);
	}
}
var toRow = (data) => ({
	deliveredOn: data.deliveredOn,
	location: data.location,
	items: data.items,
	quantity: data.quantity.toFixed(2),
	unit: data.unit,
	valuePence: data.value === void 0 ? null : Math.round(data.value * 100),
	reference: data.reference || null,
	status: data.status,
	notes: data.notes || null
});
var actions = {
	setStatus: async ({ request, params, locals }) => {
		const status = (await request.formData()).get("status");
		if (!PARTNER_STATUSES.includes(status)) return fail(400, { error: "Invalid status" });
		await db.update(partnerApplications).set({
			status,
			updatedBy: locals.user?.id
		}).where(eq(partnerApplications.id, params.id));
		return { ok: true };
	},
	saveDelivery: async ({ request, params, locals }) => {
		const form = await superValidate(request, zod(deliverySchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Please check the form for errors"
		}, { status: 400 });
		const [partner] = await db.select({
			status: partnerApplications.status,
			type: partnerApplications.type
		}).from(partnerApplications).where(eq(partnerApplications.id, params.id)).limit(1);
		if (!partner) error(404, "Partner not found");
		const { id, ...data } = form.data;
		try {
			if (id) {
				await db.update(partnerDeliveries).set({
					...toRow(data),
					updatedBy: locals.user?.id
				}).where(and(eq(partnerDeliveries.id, id), eq(partnerDeliveries.partnerId, params.id)));
				await syncPartnerDelivery(partner.type, id, locals.user?.id);
				return message(form, {
					type: "success",
					text: "Delivery updated"
				});
			}
			if (partner.status !== "approved") return message(form, {
				type: "error",
				text: "Approve this partner before logging deliveries."
			}, { status: 409 });
			const newId = crypto.randomUUID();
			await db.insert(partnerDeliveries).values({
				id: newId,
				...toRow(data),
				partnerId: params.id,
				createdBy: locals.user?.id
			});
			await syncPartnerDelivery(partner.type, newId, locals.user?.id);
			return message(form, {
				type: "success",
				text: "Delivery logged"
			});
		} catch (err) {
			console.error("Failed to save partner delivery:", err);
			return message(form, {
				type: "error",
				text: "Could not save delivery"
			}, { status: 500 });
		}
	},
	deleteDelivery: async ({ request, params }) => {
		const form = await superValidate(request, zod(idSchema));
		if (!form.valid) return fail(400, { form });
		const [usedAsInput] = await db.select({ code: batches.code }).from(batchInputs).innerJoin(batches, eq(batches.id, batchInputs.batchId)).where(eq(batchInputs.partnerDeliveryId, form.data.id)).limit(1);
		if (usedAsInput) return message(form, {
			type: "error",
			text: `This receipt is an ingredient of batch ${usedAsInput.code} and can't be deleted.`
		}, { status: 409 });
		await db.delete(partnerDeliveries).where(and(eq(partnerDeliveries.id, form.data.id), eq(partnerDeliveries.partnerId, params.id)));
		return { form };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C50672iE.js.map
