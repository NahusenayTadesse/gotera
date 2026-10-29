import { m as db, P as partnerApplications, i as inArray, j as eq, h as gte, e as lte, o as or, l as like, S as partnerDeliveries, s as sql, k as and, d as desc } from './db.js-Can7tpXV.js';
import { P as PARTNER_STATUSES } from './schema14.js-Dz2hlRO1.js';
import { C as fail } from './utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/partners/partners.server.ts
var isoDate = (v) => v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
/**
* Shared load for `/dashboard/partners` (all) and `/dashboard/partners/<status>`.
* Filters come from the query string and are applied in SQL, so the page only ever
* receives the rows it shows.
*/
async function loadPartners(url, statusParam) {
	const status = PARTNER_STATUSES.find((s) => s === statusParam);
	const filters = {
		type: ["partner", "supplier"].find((t) => t === url.searchParams.get("type")) ?? "",
		category: (url.searchParams.get("category") ?? "").slice(0, 60),
		q: (url.searchParams.get("q") ?? "").trim().slice(0, 100),
		from: isoDate(url.searchParams.get("from")),
		to: isoDate(url.searchParams.get("to"))
	};
	const conditions = [
		status ? eq(partnerApplications.status, status) : void 0,
		filters.type ? eq(partnerApplications.type, filters.type) : void 0,
		filters.category ? eq(partnerApplications.category, filters.category) : void 0,
		filters.from ? gte(partnerApplications.createdAt, /* @__PURE__ */ new Date(`${filters.from}T00:00:00`)) : void 0,
		filters.to ? lte(partnerApplications.createdAt, /* @__PURE__ */ new Date(`${filters.to}T23:59:59`)) : void 0
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, "\\$&")}%`;
		conditions.push(or(like(partnerApplications.businessName, term), like(partnerApplications.contactName, term), like(partnerApplications.email, term), like(partnerApplications.city, term), like(partnerApplications.postcode, term)));
	}
	const delivered = sql`${partnerDeliveries.status} = 'delivered'`;
	const [rows, counts] = await Promise.all([db.select({
		id: partnerApplications.id,
		businessName: partnerApplications.businessName,
		type: partnerApplications.type,
		category: partnerApplications.category,
		contactName: partnerApplications.contactName,
		email: partnerApplications.email,
		phone: partnerApplications.phone,
		city: partnerApplications.city,
		postcode: partnerApplications.postcode,
		status: partnerApplications.status,
		createdAt: partnerApplications.createdAt,
		deliveryCount: sql`cast(count(case when ${delivered} then 1 end) as unsigned)`,
		totalValuePence: sql`cast(coalesce(sum(case when ${delivered} then ${partnerDeliveries.valuePence} end), 0) as signed)`,
		lastDelivery: sql`max(case when ${delivered} then ${partnerDeliveries.deliveredOn} end)`,
		nextScheduled: sql`min(case when ${partnerDeliveries.status} = 'scheduled' then ${partnerDeliveries.deliveredOn} end)`
	}).from(partnerApplications).leftJoin(partnerDeliveries, eq(partnerDeliveries.partnerId, partnerApplications.id)).where(and(...conditions)).groupBy(partnerApplications.id).orderBy(desc(partnerApplications.createdAt)), db.select({
		status: partnerApplications.status,
		n: sql`cast(count(*) as unsigned)`
	}).from(partnerApplications).groupBy(partnerApplications.status)]);
	const statusCounts = Object.fromEntries(PARTNER_STATUSES.map((s) => [s, 0]));
	for (const c of counts) statusCounts[c.status] = Number(c.n);
	return {
		status: status ?? null,
		filters,
		statusCounts,
		rows: rows.map((r) => ({
			...r,
			deliveryCount: Number(r.deliveryCount),
			totalValuePence: Number(r.totalValuePence)
		}))
	};
}
/**
* `?/setStatus` for the list pages — one row (from its row buttons) or many (from the
* bulk bar). Both post `ids` (repeated) + `status`, confirmed in a dialog first.
*/
async function setPartnerStatus({ request, locals }) {
	const form = await request.formData();
	const status = PARTNER_STATUSES.find((s) => s === form.get("status"));
	const ids = [...new Set(form.getAll("ids").map(String).filter(Boolean))].slice(0, 500);
	if (!status || ids.length === 0) return fail(400, { error: "Nothing to update" });
	const [result] = await db.update(partnerApplications).set({
		status,
		updatedBy: locals.user?.id
	}).where(inArray(partnerApplications.id, ids));
	return {
		updated: result.affectedRows,
		status
	};
}

export { loadPartners as l, setPartnerStatus as s };
//# sourceMappingURL=partners.server.js-lqPzJA4g.js.map
