import { m as db, z as stock, j as eq, x as addons, h as gte, a as asc, u as user, A as stockChanges, d as desc } from '../../../../chunks/db.js-QS2RGzZQ.js';
import { t as toCalendarString } from '../../../../chunks/format.js-DhQga0l2.js';
import { g as getOrCreateStock, s as setCapacity, n as nextDeliveryDate } from '../../../../chunks/deliverySchedule.js-CTVedZcc.js';
import { C as fail } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/stock/+page.server.ts
/** How many upcoming Saturdays the page manages at once. */
var HORIZON_WEEKS = 8;
var load = async () => {
	await getOrCreateStock(await nextDeliveryDate());
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const [rows, catalogue, changes] = await Promise.all([
		db.select({
			id: stock.id,
			deliveryDate: stock.deliveryDate,
			addonId: stock.addonId,
			addonName: addons.name,
			capacity: stock.capacity,
			used: stock.used,
			lowThreshold: stock.lowThreshold,
			criticalThreshold: stock.criticalThreshold
		}).from(stock).leftJoin(addons, eq(addons.id, stock.addonId)).where(gte(stock.deliveryDate, today)).orderBy(asc(stock.deliveryDate), asc(stock.scopeKey)),
		db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder)),
		db.select({
			id: stockChanges.id,
			stockId: stockChanges.stockId,
			field: stockChanges.field,
			delta: stockChanges.delta,
			valueAfter: stockChanges.valueAfter,
			reason: stockChanges.reason,
			createdAt: stockChanges.createdAt,
			byName: user.name,
			deliveryDate: stock.deliveryDate,
			addonName: addons.name
		}).from(stockChanges).innerJoin(stock, eq(stock.id, stockChanges.stockId)).leftJoin(addons, eq(addons.id, stock.addonId)).leftJoin(user, eq(user.id, stockChanges.createdBy)).orderBy(desc(stockChanges.createdAt)).limit(50)
	]);
	return {
		rows: rows.map((r) => ({
			...r,
			dateLabel: toCalendarString(r.deliveryDate),
			itemLabel: r.addonName ?? "Main product",
			remaining: Math.max(0, r.capacity - r.used)
		})),
		catalogue: catalogue.map((a) => ({
			id: a.id,
			name: a.name
		})),
		changes: changes.map((c) => ({
			...c,
			dateLabel: toCalendarString(c.deliveryDate),
			itemLabel: c.addonName ?? "Main product"
		})),
		horizonWeeks: HORIZON_WEEKS
	};
};
var actions = {
	setCapacity: async ({ request, locals }) => {
		const data = await request.formData();
		const stockId = data.get("stockId");
		const capacity = Number(data.get("capacity"));
		const reason = data.get("reason");
		if (typeof stockId !== "string" || !stockId) return fail(400, { error: "Invalid request" });
		if (!Number.isInteger(capacity) || capacity < 0 || capacity > 1e5) return fail(400, { error: "Capacity must be a whole number between 0 and 100000." });
		if (!await setCapacity(stockId, capacity, locals.user?.id ?? null, typeof reason === "string" && reason ? reason : void 0)) return fail(400, { error: "Stock row not found." });
		return { success: true };
	},
	createRow: async ({ request }) => {
		const data = await request.formData();
		const date = data.get("date");
		const addonId = data.get("addonId");
		if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail(400, { error: "Pick a date." });
		await getOrCreateStock(date, typeof addonId === "string" && addonId && addonId !== "main" ? addonId : null);
		return { success: true };
	},
	setThresholds: async ({ request, locals }) => {
		const data = await request.formData();
		const stockId = data.get("stockId");
		const low = Number(data.get("lowThreshold"));
		const critical = Number(data.get("criticalThreshold"));
		if (typeof stockId !== "string" || !stockId) return fail(400, { error: "Invalid request" });
		if (!Number.isInteger(low) || low < 0 || !Number.isInteger(critical) || critical < 0) return fail(400, { error: "Thresholds must be whole numbers." });
		if (critical > low) return fail(400, { error: "The critical level must be at or below the low level." });
		await db.update(stock).set({
			lowThreshold: low,
			criticalThreshold: critical,
			updatedBy: locals.user?.id ?? null
		}).where(eq(stock.id, stockId));
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DY_hHkoK.js.map
