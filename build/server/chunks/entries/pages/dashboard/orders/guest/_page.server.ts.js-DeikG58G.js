import { m as db, B as guestOrders, d as desc } from '../../../../../chunks/db.js-C0XyR4ft.js';
import { d as deleteReleasingStock } from '../../../../../chunks/stock.js-DeYtX4qU.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-C3Iq_YCw.js';
import { s as superValidate } from '../../../../../chunks/client2.js-P7rUUC6q.js';
import { z as zod } from '../../../../../chunks/adapters.js-DtwKAq2A.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { i as idSchema, c as contentCrud } from '../../../../../chunks/crud.js-CmXwO-Qx.js';
import { f as syncAfter } from '../../../../../chunks/traceability.js-vt8QiHea.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-DcIy_1Go.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-CvHAsoqT.js';
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
//# sourceMappingURL=_page.server.ts.js-DeikG58G.js.map
