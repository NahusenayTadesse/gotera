import { m as db, P as batchAllocations, i as inArray, j as eq, Q as batches, k as and, s as sql, a as asc, l as like, z as addons, t as plans, q as subscriptions, x as deliveries, y as subscriberAddons, L as deliveryAddons, B as guestOrders, A as giftOrders, R as partnerDeliveries, S as partnerApplications, I as addresses, p as subscribers, f as ne } from './db.js-1ke6Xzkd.js';
import { t as toCalendarString } from './format.js-DDyQH27n.js';
import { p as parseJsonColumn } from './format2.js-D8oyWA_y.js';

//#region src/lib/server/traceability.ts
var SHIPMENT_TYPES = [
	"subscription",
	"guest",
	"gift",
	"partner"
];
var INJERA = "injera";
var lineKeyOf = (type, id, addonId) => `${type}:${id}:${addonId ?? "injera"}`;
/** Which FK column on `batch_allocations` holds a shipment of this type. */
var shipmentColumn = {
	subscription: batchAllocations.deliveryId,
	guest: batchAllocations.guestOrderId,
	gift: batchAllocations.giftOrderId,
	partner: batchAllocations.partnerDeliveryId
};
var shipmentField = {
	subscription: "deliveryId",
	guest: "guestOrderId",
	gift: "giftOrderId",
	partner: "partnerDeliveryId"
};
/** Statuses that mean the shipment is (or will be) sent — anything else frees its batches. */
var LIVE = {
	subscription: [
		"scheduled",
		"dispatched",
		"delivered"
	],
	guest: ["paid", "fulfilled"],
	gift: ["paid", "fulfilled"],
	partner: ["scheduled", "delivered"]
};
var byIds = (refs, type) => refs ? refs.filter((r) => r.type === type).map((r) => r.id) : void 0;
/**
* Every line that needs a batch, for the given shipments (or all live ones in a date
* range). Skipped/failed/unpaid/cancelled shipments produce no lines, so anything
* allocated to them is released on the next sync.
*/
async function shipmentLines(opts) {
	const { refs, from, to } = opts;
	const inRange = (d) => (!from || d >= from) && (!to || d <= to);
	const lines = [];
	const addonNames = new Map((await db.select({
		id: addons.id,
		name: addons.name
	}).from(addons)).map((a) => [a.id, a.name]));
	const subIds = byIds(refs, "subscription");
	if (!subIds || subIds.length) {
		const live = (await db.select({
			id: deliveries.id,
			subscriptionId: deliveries.subscriptionId,
			date: deliveries.scheduledDate,
			packs: plans.packs,
			subQty: subscriptions.quantity,
			planName: plans.name
		}).from(deliveries).innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(and(inArray(deliveries.status, [...LIVE.subscription]), subIds ? inArray(deliveries.id, subIds) : void 0))).map((r) => ({
			...r,
			date: toCalendarString(r.date)
		})).filter((r) => inRange(r.date));
		if (live.length) {
			const [recurring, oneOff] = await Promise.all([db.select({
				subscriptionId: subscriberAddons.subscriptionId,
				addonId: subscriberAddons.addonId,
				quantity: subscriberAddons.quantity
			}).from(subscriberAddons).where(and(inArray(subscriberAddons.subscriptionId, [...new Set(live.map((r) => r.subscriptionId))]), eq(subscriberAddons.isActive, true))), db.select({
				deliveryId: deliveryAddons.deliveryId,
				addonId: deliveryAddons.addonId,
				quantity: deliveryAddons.quantity
			}).from(deliveryAddons).where(inArray(deliveryAddons.deliveryId, live.map((r) => r.id)))]);
			for (const d of live) {
				lines.push({
					lineKey: lineKeyOf("subscription", d.id, null),
					shipmentType: "subscription",
					shipmentId: d.id,
					date: d.date,
					addonId: null,
					name: "Injera",
					quantity: Math.max(1, d.packs * d.subQty)
				});
				const qty = /* @__PURE__ */ new Map();
				for (const a of recurring.filter((x) => x.subscriptionId === d.subscriptionId)) qty.set(a.addonId, (qty.get(a.addonId) ?? 0) + a.quantity);
				for (const a of oneOff.filter((x) => x.deliveryId === d.id)) qty.set(a.addonId, (qty.get(a.addonId) ?? 0) + a.quantity);
				for (const [addonId, quantity] of qty) lines.push({
					lineKey: lineKeyOf("subscription", d.id, addonId),
					shipmentType: "subscription",
					shipmentId: d.id,
					date: d.date,
					addonId,
					name: addonNames.get(addonId) ?? "Add-on",
					quantity
				});
			}
		}
	}
	for (const type of ["guest", "gift"]) {
		const table = type === "guest" ? guestOrders : giftOrders;
		const ids = byIds(refs, type);
		if (ids && !ids.length) continue;
		const rows = await db.select({
			id: table.id,
			createdAt: table.createdAt,
			deliveryDate: table.deliveryDate,
			quantity: table.quantity,
			addons: table.addons
		}).from(table).where(and(inArray(table.status, [...LIVE[type]]), ids ? inArray(table.id, ids) : void 0));
		for (const o of rows) {
			const date = toCalendarString(o.deliveryDate ?? o.createdAt);
			if (!inRange(date)) continue;
			lines.push({
				lineKey: lineKeyOf(type, o.id, null),
				shipmentType: type,
				shipmentId: o.id,
				date,
				addonId: null,
				name: "Injera",
				quantity: Math.max(1, o.quantity)
			});
			for (const a of parseJsonColumn(o.addons, [])) {
				if (!a?.id || !a.quantity) continue;
				lines.push({
					lineKey: lineKeyOf(type, o.id, a.id),
					shipmentType: type,
					shipmentId: o.id,
					date,
					addonId: a.id,
					name: a.name || addonNames.get(a.id) || "Add-on",
					quantity: a.quantity
				});
			}
		}
	}
	const partnerIds = byIds(refs, "partner");
	if (!partnerIds || partnerIds.length) {
		const rows = await db.select({
			id: partnerDeliveries.id,
			date: partnerDeliveries.deliveredOn,
			quantity: partnerDeliveries.quantity,
			items: partnerDeliveries.items
		}).from(partnerDeliveries).innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId)).where(and(eq(partnerApplications.type, "partner"), inArray(partnerDeliveries.status, [...LIVE.partner]), partnerIds ? inArray(partnerDeliveries.id, partnerIds) : void 0));
		for (const p of rows) {
			if (!inRange(p.date)) continue;
			lines.push({
				lineKey: lineKeyOf("partner", p.id, null),
				shipmentType: "partner",
				shipmentId: p.id,
				date: p.date,
				addonId: null,
				name: p.items,
				quantity: Math.max(1, Math.ceil(Number(p.quantity)))
			});
		}
	}
	return lines;
}
/** Batch label used everywhere a source is shown: "In house" or the partner's name. */
var sourceLabel = (b) => b.source === "in_house" ? "In house" : b.sourceName ?? "External";
/** Current allocations for a set of lines, with batch + source details. */
async function allocationsFor(lineKeys) {
	if (!lineKeys.length) return [];
	const rows = [];
	for (let i = 0; i < lineKeys.length; i += 1e3) rows.push(...await db.select({
		lineKey: batchAllocations.lineKey,
		batchId: batches.id,
		code: batches.code,
		quantity: batchAllocations.quantity,
		method: batchAllocations.method,
		batchStatus: batches.status,
		bestBefore: batches.bestBefore,
		source: batches.source,
		sourceName: partnerApplications.businessName,
		sourceType: partnerApplications.type
	}).from(batchAllocations).innerJoin(batches, eq(batches.id, batchAllocations.batchId)).leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId)).where(inArray(batchAllocations.lineKey, lineKeys.slice(i, i + 1e3))));
	return rows;
}
/** Units already allocated per batch. */
async function allocatedByBatch(batchIds) {
	if (batchIds && !batchIds.length) return /* @__PURE__ */ new Map();
	const rows = await db.select({
		batchId: batchAllocations.batchId,
		used: sql`cast(sum(${batchAllocations.quantity}) as signed)`
	}).from(batchAllocations).where(batchIds ? inArray(batchAllocations.batchId, batchIds) : void 0).groupBy(batchAllocations.batchId);
	return new Map(rows.map((r) => [r.batchId, Number(r.used)]));
}
/**
* Brings allocations for these shipments in line with what they need:
*  1. releases allocations whose line no longer exists (skipped, cancelled, add-on removed),
*  2. trims over-allocation when a line shrank (auto picks first, newest first),
*  3. fills any shortfall FEFO from eligible batches.
* Manual picks are kept as long as the line exists. Runs in one transaction with the
* candidate batches locked, so two syncs can't hand out the same units twice.
*/
async function syncAllocations(opts, userId) {
	const lines = await shipmentLines(opts);
	const result = {
		linesChecked: lines.length,
		linesAssigned: 0,
		unitsAssigned: 0,
		released: 0,
		short: []
	};
	const scope = new Map(SHIPMENT_TYPES.map((t) => [t, /* @__PURE__ */ new Set()]));
	for (const r of opts.refs ?? []) scope.get(r.type).add(r.id);
	for (const l of lines) scope.get(l.shipmentType).add(l.shipmentId);
	await db.transaction(async (tx) => {
		const existing = [];
		for (const type of SHIPMENT_TYPES) {
			const ids = [...scope.get(type)];
			for (let i = 0; i < ids.length; i += 1e3) existing.push(...await tx.select().from(batchAllocations).where(inArray(shipmentColumn[type], ids.slice(i, i + 1e3))));
		}
		const need = new Map(lines.map((l) => [l.lineKey, l]));
		const byLine = /* @__PURE__ */ new Map();
		for (const a of existing) byLine.set(a.lineKey, [...byLine.get(a.lineKey) ?? [], a]);
		const allocated = /* @__PURE__ */ new Map();
		for (const [lineKey, allocs] of byLine) {
			const line = need.get(lineKey);
			let over = allocs.reduce((n, a) => n + a.quantity, 0) - (line?.quantity ?? 0);
			const order = [...allocs].sort((a, b) => Number(a.method === "manual") - Number(b.method === "manual") || b.createdAt.getTime() - a.createdAt.getTime());
			for (const a of order) {
				if (over <= 0) break;
				const cut = Math.min(over, a.quantity);
				if (cut === a.quantity) await tx.delete(batchAllocations).where(eq(batchAllocations.id, a.id));
				else await tx.update(batchAllocations).set({
					quantity: a.quantity - cut,
					updatedBy: userId
				}).where(eq(batchAllocations.id, a.id));
				over -= cut;
				result.released += cut;
			}
			if (line) allocated.set(lineKey, Math.min(line.quantity, allocs.reduce((n, a) => n + a.quantity, 0)));
		}
		const short = lines.filter((l) => (allocated.get(l.lineKey) ?? 0) < l.quantity).sort((a, b) => a.date.localeCompare(b.date));
		if (!short.length) return;
		const productKeys = [...new Set(short.map((l) => l.addonId ?? "injera"))];
		const candidates = await tx.select({
			id: batches.id,
			addonId: batches.addonId,
			product: batches.product,
			quantity: batches.quantity,
			producedOn: batches.producedOn,
			bestBefore: batches.bestBefore
		}).from(batches).where(and(eq(batches.status, "active"), sql`coalesce(${batches.addonId}, ${INJERA}) in (${sql.join(productKeys.map((k) => sql`${k}`), sql`, `)})`)).orderBy(sql`${batches.bestBefore} is null`, asc(batches.bestBefore), asc(batches.producedOn)).for("update");
		const usedRows = candidates.length ? await tx.select({
			batchId: batchAllocations.batchId,
			used: sql`cast(sum(${batchAllocations.quantity}) as signed)`
		}).from(batchAllocations).where(inArray(batchAllocations.batchId, candidates.map((c) => c.id))).groupBy(batchAllocations.batchId) : [];
		const remaining = new Map(candidates.map((c) => [c.id, c.quantity]));
		for (const u of usedRows) remaining.set(u.batchId, (remaining.get(u.batchId) ?? 0) - Number(u.used));
		const touched = /* @__PURE__ */ new Set();
		for (const line of short) {
			let missing = line.quantity - (allocated.get(line.lineKey) ?? 0);
			const eligible = candidates.filter((c) => (c.addonId ?? "injera") === (line.addonId ?? "injera") && c.producedOn <= line.date && (!c.bestBefore || c.bestBefore >= line.date) && (remaining.get(c.id) ?? 0) > 0);
			let assigned = false;
			for (const c of eligible) {
				if (missing <= 0) break;
				const take = Math.min(missing, remaining.get(c.id));
				await tx.insert(batchAllocations).values({
					batchId: c.id,
					shipmentType: line.shipmentType,
					[shipmentField[line.shipmentType]]: line.shipmentId,
					addonId: line.addonId,
					lineKey: line.lineKey,
					quantity: take,
					method: "auto",
					createdBy: userId
				}).onDuplicateKeyUpdate({ set: { quantity: sql`${batchAllocations.quantity} + ${take}` } });
				remaining.set(c.id, remaining.get(c.id) - take);
				missing -= take;
				result.unitsAssigned += take;
				touched.add(c.id);
				assigned = true;
			}
			if (assigned) result.linesAssigned++;
			if (missing > 0) result.short.push({
				name: line.name,
				date: line.date,
				missing,
				lineKey: line.lineKey
			});
		}
		const emptied = [...touched].filter((id) => (remaining.get(id) ?? 0) <= 0);
		if (emptied.length) await tx.update(batches).set({
			status: "depleted",
			updatedBy: userId
		}).where(and(inArray(batches.id, emptied), eq(batches.status, "active")));
	});
	if (result.released) await reactivateBatches(userId);
	return result;
}
/** Depleted batches that have units free again (after a release or a quantity edit) go back to active. */
async function reactivateBatches(userId) {
	const depleted = await db.select({
		id: batches.id,
		quantity: batches.quantity
	}).from(batches).where(eq(batches.status, "depleted"));
	if (!depleted.length) return;
	const used = await allocatedByBatch(depleted.map((b) => b.id));
	const free = depleted.filter((b) => (used.get(b.id) ?? 0) < b.quantity).map((b) => b.id);
	if (free.length) await db.update(batches).set({
		status: "active",
		updatedBy: userId
	}).where(inArray(batches.id, free));
}
/**
* Admin override: put a whole line on one batch. Replaces whatever was there (auto or
* manual). Refuses a batch of the wrong product, one that isn't usable, or one without
* enough units left.
*/
async function assignLineManually(lineKey, batchId, userId) {
	const [type, shipmentId] = lineKey.split(":");
	if (!SHIPMENT_TYPES.includes(type)) return { error: "Unknown shipment" };
	const line = (await shipmentLines({ refs: [{
		type,
		id: shipmentId
	}] })).find((l) => l.lineKey === lineKey);
	if (!line) return { error: "This line no longer needs a batch (skipped, cancelled or removed)." };
	return db.transaction(async (tx) => {
		const [batch] = await tx.select().from(batches).where(eq(batches.id, batchId)).for("update");
		if (!batch) return { error: "Batch not found" };
		if ((batch.addonId ?? "injera") !== (line.addonId ?? "injera")) return { error: `${batch.code} is a different product from ${line.name}.` };
		if (batch.status === "recalled" || batch.status === "quarantined") return { error: `${batch.code} is ${batch.status} and can't be shipped.` };
		if (batch.producedOn > line.date) return { error: `${batch.code} wasn't made until after this delivery (${line.date}).` };
		if (batch.bestBefore && batch.bestBefore < line.date) return { error: `${batch.code} is past its best-before on the delivery date.` };
		const [{ used }] = await tx.select({ used: sql`cast(coalesce(sum(${batchAllocations.quantity}), 0) as signed)` }).from(batchAllocations).where(and(eq(batchAllocations.batchId, batchId), ne(batchAllocations.lineKey, lineKey)));
		const free = batch.quantity - Number(used);
		if (free < line.quantity) return { error: `${batch.code} only has ${Math.max(0, free)} ${batch.unit} left; this line needs ${line.quantity}.` };
		await tx.delete(batchAllocations).where(eq(batchAllocations.lineKey, lineKey));
		await tx.insert(batchAllocations).values({
			batchId,
			shipmentType: line.shipmentType,
			[shipmentField[line.shipmentType]]: line.shipmentId,
			addonId: line.addonId,
			lineKey,
			quantity: line.quantity,
			method: "manual",
			createdBy: userId
		});
		if (free === line.quantity) await tx.update(batches).set({
			status: "depleted",
			updatedBy: userId
		}).where(eq(batches.id, batchId));
		return {
			ok: true,
			code: batch.code
		};
	});
}
/** Batches an admin could put a line on, FEFO-ordered, with units left. */
async function eligibleBatches(addonId, date) {
	const rows = await db.select({
		id: batches.id,
		code: batches.code,
		quantity: batches.quantity,
		unit: batches.unit,
		producedOn: batches.producedOn,
		bestBefore: batches.bestBefore,
		status: batches.status,
		source: batches.source,
		sourceName: partnerApplications.businessName
	}).from(batches).leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId)).where(and(inArray(batches.status, ["active", "depleted"]), addonId ? eq(batches.addonId, addonId) : eq(batches.product, "injera"))).orderBy(sql`${batches.bestBefore} is null`, asc(batches.bestBefore), asc(batches.producedOn));
	const used = await allocatedByBatch(rows.map((r) => r.id));
	return rows.map((r) => ({
		...r,
		remaining: r.quantity - (used.get(r.id) ?? 0),
		expired: !!r.bestBefore && r.bestBefore < date,
		notYetMade: r.producedOn > date
	}));
}
/**
* Next free batch number for a product + day: INJ-261018-01, ADD-BER-261018-01.
* The add-on code is the first three letters of its name.
*/
async function nextBatchCode(product, addonName, day) {
	const ymd = day.slice(2).replaceAll("-", "");
	const prefix = `${product === "injera" ? "INJ" : `ADD-${(addonName ?? "ADD").replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase().padEnd(3, "X")}`}-${ymd}-`;
	const max = (await db.select({ code: batches.code }).from(batches).where(like(batches.code, `${prefix}%`))).reduce((n, r) => Math.max(n, Number(r.code.slice(prefix.length)) || 0), 0);
	return `${prefix}${String(max + 1).padStart(2, "0")}`;
}
var addr = (a) => [
	a?.line1,
	a?.line2,
	a?.city,
	a?.postcode
].filter(Boolean).join(", ");
/** Forward trace: every shipment a batch went into, with who and where — the recall list. */
async function traceBatch(batchId) {
	const allocs = await db.select({
		id: batchAllocations.id,
		lineKey: batchAllocations.lineKey,
		type: batchAllocations.shipmentType,
		deliveryId: batchAllocations.deliveryId,
		guestOrderId: batchAllocations.guestOrderId,
		giftOrderId: batchAllocations.giftOrderId,
		partnerDeliveryId: batchAllocations.partnerDeliveryId,
		addonName: addons.name,
		quantity: batchAllocations.quantity,
		method: batchAllocations.method
	}).from(batchAllocations).leftJoin(addons, eq(addons.id, batchAllocations.addonId)).where(eq(batchAllocations.batchId, batchId));
	if (!allocs.length) return [];
	const ids = (k) => [...new Set(allocs.map((a) => a[k]).filter((v) => !!v))];
	const [subs, guests, gifts, partners] = await Promise.all([
		ids("deliveryId").length ? db.select({
			id: deliveries.id,
			date: deliveries.scheduledDate,
			status: deliveries.status,
			name: subscribers.fullName,
			email: subscribers.email,
			line1: addresses.line1,
			line2: addresses.line2,
			city: addresses.city,
			postcode: addresses.postcode
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).where(inArray(deliveries.id, ids("deliveryId"))) : [],
		ids("guestOrderId").length ? db.select().from(guestOrders).where(inArray(guestOrders.id, ids("guestOrderId"))) : [],
		ids("giftOrderId").length ? db.select().from(giftOrders).where(inArray(giftOrders.id, ids("giftOrderId"))) : [],
		ids("partnerDeliveryId").length ? db.select({
			id: partnerDeliveries.id,
			date: partnerDeliveries.deliveredOn,
			status: partnerDeliveries.status,
			location: partnerDeliveries.location,
			name: partnerApplications.businessName,
			email: partnerApplications.email
		}).from(partnerDeliveries).innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId)).where(inArray(partnerDeliveries.id, ids("partnerDeliveryId"))) : []
	]);
	const subMap = new Map(subs.map((s) => [s.id, s]));
	const guestMap = new Map(guests.map((g) => [g.id, g]));
	const giftMap = new Map(gifts.map((g) => [g.id, g]));
	const partnerMap = new Map(partners.map((p) => [p.id, p]));
	return allocs.map((a) => {
		const base = {
			allocationId: a.id,
			lineKey: a.lineKey,
			shipmentType: a.type,
			item: a.addonName ?? "Injera",
			quantity: a.quantity,
			method: a.method
		};
		if (a.type === "subscription" && a.deliveryId) {
			const s = subMap.get(a.deliveryId);
			if (!s) return null;
			return {
				...base,
				shipmentId: s.id,
				date: toCalendarString(s.date),
				customer: s.name ?? s.email ?? "—",
				email: s.email,
				address: addr(s),
				shipmentStatus: s.status
			};
		}
		if (a.type === "guest" && a.guestOrderId || a.type === "gift" && a.giftOrderId) {
			const o = a.type === "guest" ? guestMap.get(a.guestOrderId) : giftMap.get(a.giftOrderId);
			if (!o) return null;
			return {
				...base,
				shipmentId: o.id,
				date: toCalendarString(o.createdAt),
				customer: o.recipientName || o.buyerName || o.buyerEmail || "—",
				email: o.buyerEmail,
				address: addr(parseJsonColumn(o.recipientAddress, {})),
				shipmentStatus: o.status
			};
		}
		if (a.type === "partner" && a.partnerDeliveryId) {
			const p = partnerMap.get(a.partnerDeliveryId);
			if (!p) return null;
			return {
				...base,
				item: base.item === "Injera" ? "Injera (trade)" : base.item,
				shipmentId: p.id,
				date: p.date,
				customer: p.name,
				email: p.email,
				address: p.location,
				shipmentStatus: p.status
			};
		}
		return null;
	}).filter((r) => !!r).sort((a, b) => b.date.localeCompare(a.date));
}
/** Per-shipment trace state + batch codes, for tables that list shipments. Key: `${type}:${id}`. */
async function traceSummaries(refs) {
	const out = /* @__PURE__ */ new Map();
	for (const r of refs) out.set(`${r.type}:${r.id}`, {
		state: "none",
		batches: []
	});
	if (!refs.length) return out;
	const lines = await shipmentLines({ refs });
	const allocs = await allocationsFor(lines.map((l) => l.lineKey));
	const byLine = /* @__PURE__ */ new Map();
	for (const a of allocs) byLine.set(a.lineKey, [...byLine.get(a.lineKey) ?? [], a]);
	const totals = /* @__PURE__ */ new Map();
	for (const l of lines) {
		const key = `${l.shipmentType}:${l.shipmentId}`;
		const t = totals.get(key) ?? {
			need: 0,
			have: 0
		};
		const mine = byLine.get(l.lineKey) ?? [];
		t.need += l.quantity;
		t.have += Math.min(l.quantity, mine.reduce((n, a) => n + a.quantity, 0));
		totals.set(key, t);
		const s = out.get(key);
		for (const a of mine) if (!s.batches.some((b) => b.id === a.batchId)) s.batches.push({
			id: a.batchId,
			code: a.code,
			source: sourceLabel(a),
			status: a.batchStatus
		});
	}
	for (const [key, t] of totals) out.get(key).state = t.have >= t.need ? "traced" : t.have > 0 ? "partial" : "missing";
	return out;
}
/**
* Wraps a superforms edit action so the shipment it saved is re-synced afterwards —
* marking a delivery dispatched assigns its batches; skipping it releases them.
*/
function syncAfter(type, action) {
	return async (event) => {
		const res = await action(event);
		const form = res?.form ?? res?.data?.form;
		if (form?.valid && form.data?.id) try {
			await syncAllocations({ refs: [{
				type,
				id: form.data.id
			}] }, event.locals.user?.id);
		} catch (err) {
			console.error("Batch sync after edit failed:", err);
		}
		return res;
	};
}

export { SHIPMENT_TYPES as S, allocatedByBatch as a, shipmentLines as b, allocationsFor as c, assignLineManually as d, eligibleBatches as e, syncAfter as f, traceSummaries as g, nextBatchCode as n, reactivateBatches as r, syncAllocations as s, traceBatch as t };
//# sourceMappingURL=traceability.js-BV5Z4jsA.js.map
