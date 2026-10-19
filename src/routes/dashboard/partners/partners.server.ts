import { fail, type RequestEvent } from '@sveltejs/kit';
import { and, desc, eq, gte, inArray, like, lte, or, sql, type SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { partnerApplications as pa, partnerDeliveries as pd } from '$lib/server/db/schema';
import { PARTNER_STATUSES } from './[id]/schema';

type PartnerStatus = (typeof PARTNER_STATUSES)[number];

const isoDate = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');

/**
 * Shared load for `/dashboard/partners` (all) and `/dashboard/partners/<status>`.
 * Filters come from the query string and are applied in SQL, so the page only ever
 * receives the rows it shows.
 */
export async function loadPartners(url: URL, statusParam?: string) {
	const status = PARTNER_STATUSES.find((s) => s === statusParam);
	const filters = {
		type: ((['partner', 'supplier'] as const).find((t) => t === url.searchParams.get('type')) ??
			'') as 'partner' | 'supplier' | '',
		category: (url.searchParams.get('category') ?? '').slice(0, 60),
		q: (url.searchParams.get('q') ?? '').trim().slice(0, 100),
		from: isoDate(url.searchParams.get('from')),
		to: isoDate(url.searchParams.get('to'))
	};

	const conditions: (SQL | undefined)[] = [
		status ? eq(pa.status, status) : undefined,
		filters.type ? eq(pa.type, filters.type) : undefined,
		filters.category ? eq(pa.category, filters.category) : undefined,
		filters.from ? gte(pa.createdAt, new Date(`${filters.from}T00:00:00`)) : undefined,
		filters.to ? lte(pa.createdAt, new Date(`${filters.to}T23:59:59`)) : undefined
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, '\\$&')}%`;
		conditions.push(
			or(
				like(pa.businessName, term),
				like(pa.contactName, term),
				like(pa.email, term),
				like(pa.city, term),
				like(pa.postcode, term)
			)
		);
	}

	// Cancelled/scheduled hand-overs don't count as activity.
	const delivered = sql`${pd.status} = 'delivered'`;

	const [rows, counts] = await Promise.all([
		db
			.select({
				id: pa.id,
				businessName: pa.businessName,
				type: pa.type,
				category: pa.category,
				contactName: pa.contactName,
				email: pa.email,
				phone: pa.phone,
				city: pa.city,
				postcode: pa.postcode,
				status: pa.status,
				createdAt: pa.createdAt,
				deliveryCount: sql<number>`cast(count(case when ${delivered} then 1 end) as unsigned)`,
				totalValuePence: sql<number>`cast(coalesce(sum(case when ${delivered} then ${pd.valuePence} end), 0) as signed)`,
				lastDelivery: sql<string | null>`max(case when ${delivered} then ${pd.deliveredOn} end)`,
				nextScheduled: sql<string | null>`min(case when ${pd.status} = 'scheduled' then ${pd.deliveredOn} end)`
			})
			.from(pa)
			.leftJoin(pd, eq(pd.partnerId, pa.id))
			.where(and(...conditions))
			.groupBy(pa.id)
			.orderBy(desc(pa.createdAt)),
		// Unfiltered per-status counts for the tabs.
		db
			.select({ status: pa.status, n: sql<number>`cast(count(*) as unsigned)` })
			.from(pa)
			.groupBy(pa.status)
	]);

	const statusCounts = Object.fromEntries(PARTNER_STATUSES.map((s) => [s, 0])) as Record<
		PartnerStatus,
		number
	>;
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
export async function setPartnerStatus({ request, locals }: RequestEvent) {
	const form = await request.formData();
	const status = PARTNER_STATUSES.find((s) => s === form.get('status'));
	const ids = [...new Set(form.getAll('ids').map(String).filter(Boolean))].slice(0, 500);
	if (!status || ids.length === 0) return fail(400, { error: 'Nothing to update' });

	const [result] = await db
		.update(pa)
		.set({ status, updatedBy: locals.user?.id })
		.where(inArray(pa.id, ids));
	return { updated: result.affectedRows, status };
}
