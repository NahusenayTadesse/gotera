import { m as db, z as giftOrders, d as desc } from '../../../../../chunks/db.js-Can7tpXV.js';
import { d as deleteReleasingStock } from '../../../../../chunks/stock.js-C78m350w.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-D8k391-h.js';
import { s as superValidate } from '../../../../../chunks/client2.js-CuhGksyF.js';
import { z as zod } from '../../../../../chunks/adapters.js-CrMSDpnl.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { i as idSchema, c as contentCrud } from '../../../../../chunks/crud.js-B8_XhxOz.js';
import { f as syncAfter } from '../../../../../chunks/traceability.js-J3LwWxNy.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-CU4bRlQ5.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-BmUOYj_1.js';
import { o as orderSchema } from '../../../../../chunks/schema12.js-CiuJcUAG.js';

//#region src/routes/dashboard/orders/one-time/+page.server.ts
var crud = contentCrud({
	table: giftOrders,
	label: "Order",
	addSchema: orderSchema,
	editSchema: orderSchema
});
var load = async () => {
	const [form, bulkEmailForm, rawRows] = await Promise.all([
		superValidate(zod(orderSchema)),
		superValidate(zod(bulkEmailSchema)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt))
	]);
	return {
		form,
		bulkEmailForm,
		rows: rawRows.map((r) => ({
			...r,
			recipientAddress: parseJsonColumn(r.recipientAddress, {
				line1: "",
				city: "",
				postcode: ""
			})
		}))
	};
};
var actions = {
	edit: syncAfter("gift", crud.actions.edit),
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock("gift", form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CtyTCp99.js.map
