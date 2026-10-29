import { m as db, A as guestOrders, d as desc } from '../../../../../chunks/db.js-Can7tpXV.js';
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
import { g as guestOrderSchema } from '../../../../../chunks/schema11.js-BgaZRfTF.js';

//#region src/routes/dashboard/orders/guest/+page.server.ts
var crud = contentCrud({
	table: guestOrders,
	label: "Guest order",
	addSchema: guestOrderSchema,
	editSchema: guestOrderSchema
});
var load = async () => {
	const [form, bulkEmailForm, rawRows] = await Promise.all([
		superValidate(zod(guestOrderSchema)),
		superValidate(zod(bulkEmailSchema)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt))
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
	edit: syncAfter("guest", crud.actions.edit),
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock("guest", form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DE6X6Ppq.js.map
