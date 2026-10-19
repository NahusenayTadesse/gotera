import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, desc, eq, gte, like, lte, or, type SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addons, batches, partnerApplications } from '$lib/server/db/schema';
import {
	allocatedByBatch,
	allocationsFor,
	shipmentLines,
	syncAllocations,
	INJERA
} from '$lib/server/traceability';
import { shiftDays, todayInTimeZone } from '$lib/format';
import { batchFormOptions, saveBatch, setBatchStatus } from './batches.server';
import { batchSchema, BATCH_STATUSES } from './schema';

const isoDate = (v: string | null) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '');

/** The window the "needs a batch" panel and the auto-assign button work over. */
const syncWindow = () => {
	const today = todayInTimeZone();
	return { from: shiftDays(today, -14), to: shiftDays(today, 21) };
};

export const load: PageServerLoad = async ({ url }) => {
	const filters = {
		product: (url.searchParams.get('product') ?? '').slice(0, 36),
		source: (url.searchParams.get('source') ?? '').slice(0, 36),
		status: (BATCH_STATUSES.find((s) => s === url.searchParams.get('status')) ?? '') as
			| (typeof BATCH_STATUSES)[number]
			| '',
		from: isoDate(url.searchParams.get('from')),
		to: isoDate(url.searchParams.get('to')),
		q: (url.searchParams.get('q') ?? '').trim().slice(0, 60)
	};

	const conditions: (SQL | undefined)[] = [
		filters.product === INJERA
			? eq(batches.product, 'injera')
			: filters.product
				? eq(batches.addonId, filters.product)
				: undefined,
		filters.source === 'in_house'
			? eq(batches.source, 'in_house')
			: filters.source
				? eq(batches.sourcePartnerId, filters.source)
				: undefined,
		filters.status ? eq(batches.status, filters.status) : undefined,
		filters.from ? gte(batches.producedOn, filters.from) : undefined,
		filters.to ? lte(batches.producedOn, filters.to) : undefined
	];
	if (filters.q) {
		const term = `%${filters.q.replace(/[%_\\]/g, '\\$&')}%`;
		conditions.push(or(like(batches.code, term), like(batches.supplierLotRef, term)));
	}

	const window = syncWindow();
	const [rows, form, options, lines] = await Promise.all([
		db
			.select({
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
			})
			.from(batches)
			.leftJoin(addons, eq(addons.id, batches.addonId))
			.leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId))
			.where(and(...conditions))
			.orderBy(desc(batches.producedOn), desc(batches.code)),
		superValidate(zod4(batchSchema)),
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
			productName: r.product === 'injera' ? 'Injera' : (r.addonName ?? 'Add-on'),
			sourceLabel: r.source === 'in_house' ? 'In house' : (r.sourceName ?? 'External'),
			allocated,
			remaining: r.quantity - allocated,
			expiry:
				!r.bestBefore ? 'none' : r.bestBefore < today ? 'expired' : r.bestBefore <= soon ? 'soon' : 'ok'
		};
	});

	// Lines in the window still waiting on (part of) a batch.
	const allocs = await allocationsFor(lines.map((l) => l.lineKey));
	const have = new Map<string, number>();
	for (const a of allocs) have.set(a.lineKey, (have.get(a.lineKey) ?? 0) + a.quantity);
	const unassigned = new Map<string, { name: string; lines: number; units: number; earliest: string }>();
	for (const l of lines) {
		const missing = l.quantity - (have.get(l.lineKey) ?? 0);
		if (missing <= 0) continue;
		const key = l.addonId ?? INJERA;
		const u = unassigned.get(key) ?? { name: l.addonId ? l.name : 'Injera', lines: 0, units: 0, earliest: l.date };
		u.lines++;
		u.units += missing;
		if (l.date < u.earliest) u.earliest = l.date;
		unassigned.set(key, u);
	}

	const active = list.filter((r) => r.status === 'active');
	const stats = {
		active: active.length,
		unitsAvailable: active.filter((r) => r.expiry !== 'expired').reduce((n, r) => n + Math.max(0, r.remaining), 0),
		expiringSoon: active.filter((r) => r.expiry === 'soon' && r.remaining > 0).length,
		onHold: list.filter((r) => r.status === 'recalled' || r.status === 'quarantined').length,
		linesInWindow: lines.length,
		unassignedLines: [...unassigned.values()].reduce((n, u) => n + u.lines, 0)
	};

	// Prefill a new batch from ?add=1&source=…&receipt=… (the "Create batch" link on a supply receipt).
	const receiptId = url.searchParams.get('receipt');
	const receipt = receiptId ? options.receipts.find((r) => r.id === receiptId) : undefined;
	form.data.producedOn = receipt?.deliveredOn ?? today;
	form.data.productKey = 'injera';
	form.data.unit = 'packs';
	if (receipt) {
		form.data.source = 'external';
		form.data.sourcePartnerId = receipt.partnerId;
		form.data.sourceDeliveryId = receipt.id;
		form.data.supplierLotRef = receipt.reference ?? '';
	}

	return {
		filters,
		rows: list,
		stats,
		unassigned: [...unassigned.entries()].map(([key, u]) => ({ key, ...u })),
		window,
		form,
		options
	};
};

export const actions: Actions = {
	saveBatch,
	setBatchStatus,
	// Auto-assign every line in the window that's missing a batch (FEFO).
	sync: async ({ locals }) => {
		const result = await syncAllocations(syncWindow(), locals.user?.id);
		return { sync: result };
	}
};
