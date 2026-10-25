import { j as eq, Q as batches, h as gte, e as lte, o as or, l as like, m as db, S as partnerApplications, z as addons, k as and, d as desc } from '../../../../chunks/db.js-C0XyR4ft.js';
import { b as todayInTimeZone, s as shiftDays } from '../../../../chunks/format.js-DDyQH27n.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-C3Iq_YCw.js';
import { s as superValidate } from '../../../../chunks/client2.js-P7rUUC6q.js';
import { z as zod } from '../../../../chunks/adapters.js-DtwKAq2A.js';
import { B as BATCH_STATUSES, b as batchSchema } from '../../../../chunks/schema8.js-DuSA_iW7.js';
import { s as syncAllocations, b as shipmentLines, a as allocatedByBatch, c as allocationsFor } from '../../../../chunks/traceability.js-vt8QiHea.js';
import { s as setBatchStatus, a as saveBatch, b as batchFormOptions } from '../../../../chunks/batches.server.js-BiKOvD3P.js';

//#region src/routes/dashboard/batches/+page.server.ts
var isoDate = (v) => v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
/** The window the "needs a batch" panel and the auto-assign button work over. */
var syncWindow = () => {
	const today = todayInTimeZone();
	return {
		from: shiftDays(today, -14),
		to: shiftDays(today, 21)
	};
};
var load = async ({ url }) => {
	const filters = {
		product: (url.searchParams.get("product") ?? "").slice(0, 36),
		source: (url.searchParams.get("source") ?? "").slice(0, 36),
		status: BATCH_STATUSES.find((s) => s === url.searchParams.get("status")) ?? "",
		from: isoDate(url.searchParams.get("from")),
		to: isoDate(url.searchParams.get("to")),
		q: (url.searchParams.get("q") ?? "").trim().slice(0, 60)
	};
	const conditions = [
		filters.product === "injera" ? eq(batches.product, "injera") : filters.product ? eq(batches.addonId, filters.product) : void 0,
		filters.source === "in_house" ? eq(batches.source, "in_house") : filters.source ? eq(batches.sourcePartnerId, filters.source) : void 0,
		filters.status ? eq(batches.status, filters.status) : void 0,
		filters.from ? gte(batches.producedOn, filters.from) : void 0,
		filters.to ? lte(batches.producedOn, filters.to) : void 0
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, "\\$&")}%`;
		conditions.push(or(like(batches.code, term), like(batches.supplierLotRef, term)));
	}
	const window = syncWindow();
	const [rows, form, options, lines] = await Promise.all([
		db.select({
			id: batches.id,
			code: batches.code,
			product: batches.product,
			addonId: batches.addonId,
			addonName: addons.name,
			source: batches.source,
			sourcePartnerId: batches.sourcePartnerId,
			sourceName: partnerApplications.businessName,
			sourceType: partnerApplications.type,
			supplierLotRef: batches.supplierLotRef,
			producedOn: batches.producedOn,
			bestBefore: batches.bestBefore,
			quantity: batches.quantity,
			unit: batches.unit,
			status: batches.status
		}).from(batches).leftJoin(addons, eq(addons.id, batches.addonId)).leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId)).where(and(...conditions)).orderBy(desc(batches.producedOn), desc(batches.code)),
		superValidate(zod(batchSchema)),
		batchFormOptions(),
		shipmentLines(window)
	]);
	const used = await allocatedByBatch(rows.map((r) => r.id));
	const today = todayInTimeZone();
	const soon = shiftDays(today, 3);
	const list = rows.map((r) => {
		const allocated = used.get(r.id) ?? 0;
		return {
			...r,
			productName: r.product === "injera" ? "Injera" : r.addonName ?? "Add-on",
			sourceLabel: r.source === "in_house" ? "In house" : r.sourceName ?? "External",
			allocated,
			remaining: r.quantity - allocated,
			expiry: !r.bestBefore ? "none" : r.bestBefore < today ? "expired" : r.bestBefore <= soon ? "soon" : "ok"
		};
	});
	const allocs = await allocationsFor(lines.map((l) => l.lineKey));
	const have = /* @__PURE__ */ new Map();
	for (const a of allocs) have.set(a.lineKey, (have.get(a.lineKey) ?? 0) + a.quantity);
	const unassigned = /* @__PURE__ */ new Map();
	for (const l of lines) {
		const missing = l.quantity - (have.get(l.lineKey) ?? 0);
		if (missing <= 0) continue;
		const key = l.addonId ?? "injera";
		const u = unassigned.get(key) ?? {
			name: l.addonId ? l.name : "Injera",
			lines: 0,
			units: 0,
			earliest: l.date
		};
		u.lines++;
		u.units += missing;
		if (l.date < u.earliest) u.earliest = l.date;
		unassigned.set(key, u);
	}
	const active = list.filter((r) => r.status === "active");
	const stats = {
		active: active.length,
		unitsAvailable: active.filter((r) => r.expiry !== "expired").reduce((n, r) => n + Math.max(0, r.remaining), 0),
		expiringSoon: active.filter((r) => r.expiry === "soon" && r.remaining > 0).length,
		onHold: list.filter((r) => r.status === "recalled" || r.status === "quarantined").length,
		linesInWindow: lines.length,
		unassignedLines: [...unassigned.values()].reduce((n, u) => n + u.lines, 0)
	};
	const receiptId = url.searchParams.get("receipt");
	const receipt = receiptId ? options.receipts.find((r) => r.id === receiptId) : void 0;
	form.data.producedOn = receipt?.deliveredOn ?? today;
	form.data.productKey = "injera";
	form.data.unit = "packs";
	if (receipt) {
		form.data.source = "external";
		form.data.sourcePartnerId = receipt.partnerId;
		form.data.sourceDeliveryId = receipt.id;
		form.data.supplierLotRef = receipt.reference ?? "";
	}
	return {
		filters,
		rows: list,
		stats,
		unassigned: [...unassigned.entries()].map(([key, u]) => ({
			key,
			...u
		})),
		window,
		form,
		options
	};
};
var actions = {
	saveBatch,
	setBatchStatus,
	sync: async ({ locals }) => {
		return { sync: await syncAllocations(syncWindow(), locals.user?.id) };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DW46qDnA.js.map
