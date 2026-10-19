import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { and, asc, desc, eq, inArray } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	addons,
	batchAllocations,
	batchInputs,
	batches,
	partnerApplications,
	partnerDeliveries
} from '$lib/server/db/schema';
import { allocatedByBatch, nextBatchCode, reactivateBatches } from '$lib/server/traceability';
import { BATCH_STATUSES, batchSchema } from './schema';

/** Pickers for the batch form: products, approved sources, and supplier receipts. */
export async function batchFormOptions() {
	const [addonRows, sources, receipts] = await Promise.all([
		db.select({ id: addons.id, name: addons.name }).from(addons).orderBy(asc(addons.sortOrder)),
		db
			.select({
				id: partnerApplications.id,
				businessName: partnerApplications.businessName,
				type: partnerApplications.type,
				status: partnerApplications.status
			})
			.from(partnerApplications)
			.where(eq(partnerApplications.status, 'approved'))
			.orderBy(asc(partnerApplications.businessName)),
		// Inbound supplier receipts — the things a batch can be made from or arrive on.
		db
			.select({
				id: partnerDeliveries.id,
				partnerId: partnerDeliveries.partnerId,
				supplier: partnerApplications.businessName,
				items: partnerDeliveries.items,
				quantity: partnerDeliveries.quantity,
				unit: partnerDeliveries.unit,
				deliveredOn: partnerDeliveries.deliveredOn,
				reference: partnerDeliveries.reference
			})
			.from(partnerDeliveries)
			.innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId))
			.where(and(eq(partnerApplications.type, 'supplier'), eq(partnerDeliveries.status, 'delivered')))
			.orderBy(desc(partnerDeliveries.deliveredOn))
			.limit(200)
	]);
	return {
		products: [{ value: 'injera', name: 'Injera' }, ...addonRows.map((a) => ({ value: a.id, name: a.name }))],
		sources,
		receipts: receipts.map((r) => ({ ...r, quantity: Number(r.quantity) }))
	};
}

/** `?/saveBatch` — create or edit, with ingredient inputs replaced wholesale on edit. */
export async function saveBatch({ request, locals }: RequestEvent) {
	const form = await superValidate(request, zod4(batchSchema));
	if (!form.valid)
		return message(form, { type: 'error', text: 'Please check the form for errors' }, { status: 400 });

	const d = form.data;
	const product = d.productKey === 'injera' ? 'injera' : 'addon';
	const addonId = product === 'addon' ? d.productKey : null;
	let addonName: string | null = null;
	if (addonId) {
		const [a] = await db.select({ name: addons.name }).from(addons).where(eq(addons.id, addonId));
		if (!a) return message(form, { type: 'error', text: 'Unknown add-on' }, { status: 400 });
		addonName = a.name;
	}

	if (d.source === 'external') {
		const [p] = await db
			.select({ status: partnerApplications.status })
			.from(partnerApplications)
			.where(eq(partnerApplications.id, d.sourcePartnerId));
		if (!p) return message(form, { type: 'error', text: 'Unknown supplier/partner' }, { status: 400 });
	}

	const values = {
		product,
		addonId,
		source: d.source,
		sourcePartnerId: d.source === 'external' ? d.sourcePartnerId : null,
		sourceDeliveryId: d.source === 'external' && d.sourceDeliveryId ? d.sourceDeliveryId : null,
		supplierLotRef: d.supplierLotRef || null,
		producedOn: d.producedOn,
		bestBefore: d.bestBefore ?? null,
		quantity: d.quantity,
		unit: d.unit,
		notes: d.notes || null
	} as const;

	try {
		let id = d.id;
		let code = d.code.toUpperCase().replace(/\s+/g, '-');
		if (id) {
			const [existing] = await db.select().from(batches).where(eq(batches.id, id));
			if (!existing) return message(form, { type: 'error', text: 'Batch not found' }, { status: 404 });
			const used = (await allocatedByBatch([id])).get(id) ?? 0;
			if (d.quantity < used)
				return message(
					form,
					{ type: 'error', text: `${used} ${existing.unit} from this batch are already allocated — quantity can't go below that.` },
					{ status: 400 }
				);
			if (used > 0 && (existing.addonId ?? 'injera') !== (addonId ?? 'injera'))
				return message(
					form,
					{ type: 'error', text: "This batch is already allocated to deliveries — its product can't change." },
					{ status: 400 }
				);
			await db
				.update(batches)
				.set({ ...values, ...(code ? { code } : {}), updatedBy: locals.user?.id })
				.where(eq(batches.id, id));
		} else {
			code ||= await nextBatchCode(product, addonName, d.producedOn);
			id = crypto.randomUUID();
			await db.insert(batches).values({ id, code, ...values, createdBy: locals.user?.id });
		}

		await db.delete(batchInputs).where(eq(batchInputs.batchId, id));
		const inputs = [...new Set(d.inputIds)].filter(Boolean);
		if (inputs.length)
			await db
				.insert(batchInputs)
				.values(inputs.map((partnerDeliveryId) => ({ batchId: id!, partnerDeliveryId, createdBy: locals.user?.id })));

		await reactivateBatches(locals.user?.id);
		return message(form, { type: 'success', text: d.id ? 'Batch updated' : `Batch ${code} created`, id });
	} catch (err) {
		const dup = (err as { code?: string })?.code === 'ER_DUP_ENTRY';
		console.error('Failed to save batch:', err);
		return message(
			form,
			{ type: 'error', text: dup ? 'That batch number is already in use.' : 'Could not save batch' },
			{ status: dup ? 409 : 500 }
		);
	}
}

/** `?/setBatchStatus` — one or many batches (bulk bar / detail page), confirmed in a dialog. */
export async function setBatchStatus({ request, locals }: RequestEvent) {
	const form = await request.formData();
	const status = BATCH_STATUSES.find((s) => s === form.get('status'));
	const ids = [...new Set(form.getAll('ids').map(String).filter(Boolean))].slice(0, 500);
	if (!status || !ids.length) return fail(400, { error: 'Nothing to update' });
	const [r] = await db
		.update(batches)
		.set({ status, updatedBy: locals.user?.id })
		.where(inArray(batches.id, ids));
	// Setting a batch back to active that's actually full is corrected straight away.
	if (status === 'active') {
		const used = await allocatedByBatch(ids);
		const rows = await db.select({ id: batches.id, quantity: batches.quantity }).from(batches).where(inArray(batches.id, ids));
		const full = rows.filter((b) => (used.get(b.id) ?? 0) >= b.quantity).map((b) => b.id);
		if (full.length) await db.update(batches).set({ status: 'depleted' }).where(inArray(batches.id, full));
	}
	return { updated: r.affectedRows, status };
}

/** `?/deleteBatch` — only while nothing has been allocated from it. */
export async function deleteBatch({ request }: RequestEvent) {
	const id = String((await request.formData()).get('id') ?? '');
	const [used] = await db
		.select({ id: batchAllocations.id })
		.from(batchAllocations)
		.where(eq(batchAllocations.batchId, id))
		.limit(1);
	if (used)
		return fail(409, {
			error: 'This batch has been allocated to deliveries and is part of the trace record. Mark it depleted or recalled instead.'
		});
	await db.delete(batches).where(eq(batches.id, id));
	return { deleted: true };
}
