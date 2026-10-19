import { m as db, S as partnerApplications, z as addons, Q as batches, j as eq, R as partnerDeliveries, T as batchInputs } from '../../../../../chunks/db.js-1ke6Xzkd.js';
import { b as todayInTimeZone } from '../../../../../chunks/format.js-DDyQH27n.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js--DCHVHjx.js';
import { s as superValidate } from '../../../../../chunks/client2.js-74WMIpvZ.js';
import { z as zod } from '../../../../../chunks/adapters.js-B-iKxR35.js';
import { b as batchSchema } from '../../../../../chunks/schema8.js-DuSA_iW7.js';
import { t as traceBatch, a as allocatedByBatch } from '../../../../../chunks/traceability.js-BV5Z4jsA.js';
import { s as setBatchStatus, a as saveBatch, d as deleteBatch, b as batchFormOptions } from '../../../../../chunks/batches.server.js-CP-0k0bF.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-DcIy_1Go.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-CO214FRp.js';
import { B as redirect, v as error } from '../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/batches/[id]/+page.server.ts
var load = async ({ params }) => {
	const [batch] = await db.select({
		batch: batches,
		addonName: addons.name,
		sourceName: partnerApplications.businessName,
		sourceType: partnerApplications.type
	}).from(batches).leftJoin(addons, eq(addons.id, batches.addonId)).leftJoin(partnerApplications, eq(partnerApplications.id, batches.sourcePartnerId)).where(eq(batches.id, params.id));
	if (!batch) error(404, "Batch not found");
	const b = batch.batch;
	const [inputs, sourceReceipt, trace, used, form, options, bulkEmailForm] = await Promise.all([
		db.select({
			id: partnerDeliveries.id,
			partnerId: partnerDeliveries.partnerId,
			supplier: partnerApplications.businessName,
			items: partnerDeliveries.items,
			quantity: partnerDeliveries.quantity,
			unit: partnerDeliveries.unit,
			deliveredOn: partnerDeliveries.deliveredOn,
			reference: partnerDeliveries.reference
		}).from(batchInputs).innerJoin(partnerDeliveries, eq(partnerDeliveries.id, batchInputs.partnerDeliveryId)).innerJoin(partnerApplications, eq(partnerApplications.id, partnerDeliveries.partnerId)).where(eq(batchInputs.batchId, b.id)),
		b.sourceDeliveryId ? db.select().from(partnerDeliveries).where(eq(partnerDeliveries.id, b.sourceDeliveryId)).then((r) => r[0] ?? null) : null,
		traceBatch(b.id),
		allocatedByBatch([b.id]),
		superValidate(zod(batchSchema)),
		batchFormOptions(),
		superValidate(zod(bulkEmailSchema))
	]);
	Object.assign(form.data, {
		id: b.id,
		productKey: b.addonId ?? "injera",
		code: b.code,
		source: b.source,
		sourcePartnerId: b.sourcePartnerId ?? "",
		sourceDeliveryId: b.sourceDeliveryId ?? "",
		supplierLotRef: b.supplierLotRef ?? "",
		inputIds: inputs.map((i) => i.id),
		producedOn: b.producedOn,
		bestBefore: b.bestBefore ?? void 0,
		quantity: b.quantity,
		unit: b.unit,
		notes: b.notes ?? ""
	});
	const allocated = used.get(b.id) ?? 0;
	const today = todayInTimeZone();
	return {
		batch: {
			...b,
			productName: b.product === "injera" ? "Injera" : batch.addonName ?? "Add-on",
			sourceName: batch.sourceName,
			sourceType: batch.sourceType,
			allocated,
			remaining: b.quantity - allocated,
			expired: !!b.bestBefore && b.bestBefore < today
		},
		inputs: inputs.map((i) => ({
			...i,
			quantity: Number(i.quantity)
		})),
		sourceReceipt: sourceReceipt ? {
			...sourceReceipt,
			quantity: Number(sourceReceipt.quantity)
		} : null,
		trace,
		form,
		options,
		bulkEmailForm
	};
};
var actions = {
	saveBatch,
	setBatchStatus,
	sendBulkEmail: sendBulkEmailAction,
	deleteBatch: async (event) => {
		const result = await deleteBatch(event);
		if ("deleted" in result) redirect(303, "/dashboard/batches");
		return result;
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BNlyCikn.js.map
