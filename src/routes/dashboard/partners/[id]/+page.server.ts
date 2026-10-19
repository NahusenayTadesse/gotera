import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, desc, eq, gte, inArray, like, lte, or, type SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { batches, batchInputs, partnerApplications, partnerDeliveries } from '$lib/server/db/schema';
import { syncAllocations, traceSummaries } from '$lib/server/traceability';
import { idSchema } from '$lib/server/crud';
import { todayInTimeZone } from '$lib/format';
import { deliverySchema, DELIVERY_STATUSES, PARTNER_STATUSES } from './schema';

const isoDate = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');

export const load: PageServerLoad = async ({ params, url }) => {
	const [partner] = await db
		.select()
		.from(partnerApplications)
		.where(eq(partnerApplications.id, params.id))
		.limit(1);
	if (!partner) error(404, 'Partner not found');

	const status = url.searchParams.get('status') ?? '';
	const filters = {
		from: isoDate(url.searchParams.get('from')),
		to: isoDate(url.searchParams.get('to')),
		status: (DELIVERY_STATUSES as readonly string[]).includes(status) ? status : '',
		item: (url.searchParams.get('item') ?? '').slice(0, 500),
		location: (url.searchParams.get('location') ?? '').slice(0, 255),
		q: (url.searchParams.get('q') ?? '').trim().slice(0, 100)
	};

	const conditions: (SQL | undefined)[] = [
		eq(partnerDeliveries.partnerId, partner.id),
		filters.from ? gte(partnerDeliveries.deliveredOn, filters.from) : undefined,
		filters.to ? lte(partnerDeliveries.deliveredOn, filters.to) : undefined,
		filters.status
			? eq(partnerDeliveries.status, filters.status as (typeof DELIVERY_STATUSES)[number])
			: undefined,
		filters.item ? eq(partnerDeliveries.items, filters.item) : undefined,
		filters.location ? eq(partnerDeliveries.location, filters.location) : undefined
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, '\\$&')}%`;
		conditions.push(
			or(
				like(partnerDeliveries.reference, term),
				like(partnerDeliveries.notes, term),
				like(partnerDeliveries.items, term),
				like(partnerDeliveries.location, term)
			)
		);
	}

	const [form, rows, overview] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		db
			.select()
			.from(partnerDeliveries)
			.where(and(...conditions))
			.orderBy(desc(partnerDeliveries.deliveredOn), desc(partnerDeliveries.createdAt)),
		// Unfiltered, light: drives the filter dropdowns and the "overall" header facts.
		db
			.select({
				items: partnerDeliveries.items,
				location: partnerDeliveries.location,
				status: partnerDeliveries.status,
				deliveredOn: partnerDeliveries.deliveredOn
			})
			.from(partnerDeliveries)
			.where(eq(partnerDeliveries.partnerId, partner.id))
			.orderBy(desc(partnerDeliveries.deliveredOn))
	]);

	// Traceability. Trade partners: which of our batches each delivery came from.
	// Suppliers: which batches each receipt went into (as an ingredient, or arriving as one).
	const ids = rows.map((r) => r.id);
	const traces =
		partner.type === 'partner'
			? await traceSummaries(ids.map((id) => ({ type: 'partner' as const, id })))
			: null;
	const usedIn = new Map<string, { id: string; code: string; source: string; status: string }[]>();
	if (partner.type === 'supplier' && ids.length) {
		const [asInput, asSource] = await Promise.all([
			db
				.select({ receiptId: batchInputs.partnerDeliveryId, id: batches.id, code: batches.code, status: batches.status })
				.from(batchInputs)
				.innerJoin(batches, eq(batches.id, batchInputs.batchId))
				.where(inArray(batchInputs.partnerDeliveryId, ids)),
			db
				.select({ receiptId: batches.sourceDeliveryId, id: batches.id, code: batches.code, status: batches.status })
				.from(batches)
				.where(inArray(batches.sourceDeliveryId, ids))
		]);
		for (const b of [...asInput, ...asSource]) {
			if (!b.receiptId) continue;
			const list = usedIn.get(b.receiptId) ?? [];
			if (!list.some((x) => x.id === b.id))
				list.push({ id: b.id, code: b.code, source: asSource.includes(b) ? 'received as' : 'ingredient', status: b.status });
			usedIn.set(b.receiptId, list);
		}
	}

	const deliveries = rows.map((r) => {
		const t = traces?.get(`partner:${r.id}`);
		return {
			...r,
			quantity: Number(r.quantity),
			unitPricePence:
				r.valuePence != null && Number(r.quantity) > 0
					? Math.round(r.valuePence / Number(r.quantity))
					: null,
			kind: partner.type,
			traceState: t?.state ?? 'none',
			batches: t?.batches ?? usedIn.get(r.id) ?? []
		};
	});

	// "What they supplied": delivered rows (within the filter) grouped by item + unit, so
	// 3 × "Teff flour, kg" read as one line with a running total. Case-insensitive —
	// admins won't type it the same way every time.
	const byItem = new Map<
		string,
		{ items: string; unit: string; quantity: number; valuePence: number; count: number; first: string; last: string }
	>();
	for (const d of deliveries) {
		if (d.status !== 'delivered') continue;
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
		lastDelivered: overview.find((d) => d.status === 'delivered') ?? null,
		// Ordered newest-first, so the soonest upcoming one is the last match.
		nextScheduled:
			overview.filter((d) => d.status === 'scheduled' && d.deliveredOn >= today).at(-1) ?? null
	};

	// Prefill the next entry with where the last one happened; first time round,
	// fall back to the partner's own location.
	const defaultLocation =
		overview[0]?.location ?? [partner.city, partner.postcode].filter(Boolean).join(', ');
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
async function syncPartnerDelivery(type: 'partner' | 'supplier', id: string, userId?: string) {
	if (type !== 'partner') return;
	try {
		await syncAllocations({ refs: [{ type: 'partner', id }] }, userId);
	} catch (err) {
		console.error('Batch sync for partner delivery failed:', err);
	}
}

const toRow = (data: Omit<import('zod/v4').infer<typeof deliverySchema>, 'id'>) => ({
	deliveredOn: data.deliveredOn,
	location: data.location,
	items: data.items,
	quantity: data.quantity.toFixed(2),
	unit: data.unit,
	valuePence: data.value === undefined ? null : Math.round(data.value * 100),
	reference: data.reference || null,
	status: data.status,
	notes: data.notes || null
});

export const actions: Actions = {
	setStatus: async ({ request, params, locals }) => {
		const status = (await request.formData()).get('status');
		if (!PARTNER_STATUSES.includes(status as never)) return fail(400, { error: 'Invalid status' });

		await db
			.update(partnerApplications)
			.set({ status: status as (typeof PARTNER_STATUSES)[number], updatedBy: locals.user?.id })
			.where(eq(partnerApplications.id, params.id));
		return { ok: true };
	},

	saveDelivery: async ({ request, params, locals }) => {
		const form = await superValidate(request, zod4(deliverySchema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for errors' }, { status: 400 });
		}

		const [partner] = await db
			.select({ status: partnerApplications.status, type: partnerApplications.type })
			.from(partnerApplications)
			.where(eq(partnerApplications.id, params.id))
			.limit(1);
		if (!partner) error(404, 'Partner not found');

		const { id, ...data } = form.data;

		try {
			if (id) {
				await db
					.update(partnerDeliveries)
					.set({ ...toRow(data), updatedBy: locals.user?.id })
					.where(and(eq(partnerDeliveries.id, id), eq(partnerDeliveries.partnerId, params.id)));
				await syncPartnerDelivery(partner.type, id, locals.user?.id);
				return message(form, { type: 'success', text: 'Delivery updated' });
			}

			// New entries only once approved; existing ones stay editable so history can be
			// corrected even if the relationship later ends.
			if (partner.status !== 'approved') {
				return message(
					form,
					{ type: 'error', text: 'Approve this partner before logging deliveries.' },
					{ status: 409 }
				);
			}
			const newId = crypto.randomUUID();
			await db
				.insert(partnerDeliveries)
				.values({ id: newId, ...toRow(data), partnerId: params.id, createdBy: locals.user?.id });
			await syncPartnerDelivery(partner.type, newId, locals.user?.id);
			return message(form, { type: 'success', text: 'Delivery logged' });
		} catch (err) {
			console.error('Failed to save partner delivery:', err);
			return message(form, { type: 'error', text: 'Could not save delivery' }, { status: 500 });
		}
	},

	deleteDelivery: async ({ request, params }) => {
		const form = await superValidate(request, zod4(idSchema));
		if (!form.valid) return fail(400, { form });

		// A supplier receipt that went into a batch is part of the trace record.
		const [usedAsInput] = await db
			.select({ code: batches.code })
			.from(batchInputs)
			.innerJoin(batches, eq(batches.id, batchInputs.batchId))
			.where(eq(batchInputs.partnerDeliveryId, form.data.id))
			.limit(1);
		if (usedAsInput) {
			return message(
				form,
				{ type: 'error', text: `This receipt is an ingredient of batch ${usedAsInput.code} and can't be deleted.` },
				{ status: 409 }
			);
		}

		await db
			.delete(partnerDeliveries)
			.where(and(eq(partnerDeliveries.id, form.data.id), eq(partnerDeliveries.partnerId, params.id)));
		return { form };
	}
};
