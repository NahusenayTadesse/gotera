import { m as db, B as guestOrders, d as desc } from '../../../../../chunks/db.js-BrmBLP0N.js';
import { d as deleteReleasingStock } from '../../../../../chunks/stock.js-GP03gyPH.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-lcRmDm_g.js';
import { s as superValidate } from '../../../../../chunks/client2.js-CyJQ5fE8.js';
import { z as zod } from '../../../../../chunks/adapters.js-CQlMjbyU.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { i as idSchema, c as contentCrud } from '../../../../../chunks/crud.js-nSrnnigd.js';
import { f as syncAfter } from '../../../../../chunks/traceability.js-Dx8kLnDV.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-DcIy_1Go.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-DOqV_Fqt.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema10.js-BgaZRfTF.js';

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
//# sourceMappingURL=_page.server.ts.js-DEtKW3iv.js.map
