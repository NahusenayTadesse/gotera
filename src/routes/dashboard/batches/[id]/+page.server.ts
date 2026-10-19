import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addons, batchInputs, batches, partnerApplications, partnerDeliveries } from '$lib/server/db/schema';
import { allocatedByBatch, traceBatch } from '$lib/server/traceability';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { todayInTimeZone } from '$lib/format';
import { batchFormOptions, deleteBatch, saveBatch, setBatchStatus } from '../batches.server';
import { batchSchema } from '../schema';

export const load: PageServerLoad = async ({ params }) => {
	const [batch] = await db
		.select({
			batch: batches,
			addonName: addons.name,
			sourceName: partnerApplications.businessName,
			sourceType: partnerApplications.type
		})
		.from(batches)
		.leftJoin(addons, eq(addons.id, batches.addonId))
		.leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId))
		.where(eq(batches.id, params.id));
	if (!batch) error(404, 'Batch not found');
	const b = batch.batch;

	const [inputs, sourceReceipt, trace, used, form, options, bulkEmailForm] = await Promise.all([
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
			.from(batchInputs)
			.innerJoin(partnerDeliveries, eq(partnerDeliveries.id, batchInputs.partnerDeliveryId))
			.innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId))
			.where(eq(batchInputs.batchId, b.id)),
		b.sourceDeliveryId
			? db
					.select()
					.from(partnerDeliveries)
					.where(eq(partnerDeliveries.id, b.sourceDeliveryId))
					.then((r) => r[0] ?? null)
			: null,
		traceBatch(b.id),
		allocatedByBatch([b.id]),
		superValidate(zod4(batchSchema)),
		batchFormOptions(),
		superValidate(zod4(bulkEmailSchema))
	]);

	Object.assign(form.data, {
		id: b.id,
		productKey: b.addonId ?? 'injera',
		code: b.code,
		source: b.source,
		sourcePartnerId: b.sourcePartnerId ?? '',
		sourceDeliveryId: b.sourceDeliveryId ?? '',
		supplierLotRef: b.supplierLotRef ?? '',
		inputIds: inputs.map((i) => i.id),
		producedOn: b.producedOn,
		bestBefore: b.bestBefore ?? undefined,
		quantity: b.quantity,
		unit: b.unit,
		notes: b.notes ?? ''
	});

	const allocated = used.get(b.id) ?? 0;
	const today = todayInTimeZone();
	return {
		batch: {
			...b,
			productName: b.product === 'injera' ? 'Injera' : (batch.addonName ?? 'Add-on'),
			sourceName: batch.sourceName,
			sourceType: batch.sourceType,
			allocated,
			remaining: b.quantity - allocated,
			expired: !!b.bestBefore && b.bestBefore < today
		},
		inputs: inputs.map((i) => ({ ...i, quantity: Number(i.quantity) })),
		sourceReceipt: sourceReceipt ? { ...sourceReceipt, quantity: Number(sourceReceipt.quantity) } : null,
		trace,
		form,
		options,
		bulkEmailForm
	};
};

export const actions: Actions = {
	saveBatch,
	setBatchStatus,
	sendBulkEmail: sendBulkEmailAction,
	deleteBatch: async (event) => {
		const result = await deleteBatch(event);
		if ('deleted' in result) redirect(303, '/dashboard/batches');
		return result;
	}
};
