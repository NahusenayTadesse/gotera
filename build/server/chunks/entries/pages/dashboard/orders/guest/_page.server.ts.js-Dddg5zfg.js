import { m as db, K as guestOrders, d as desc } from '../../../../../chunks/db.js-4htFJ9eU.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-CZArKCj5.js';
import { s as superValidate } from '../../../../../chunks/client2.js-DLW9Sckp.js';
import { z as zod } from '../../../../../chunks/adapters.js-B4rDhjf0.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-cPEwS-rj.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-GA9Kc6dA.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-R8cXekdM.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema8.js-B8G_ex6n.js';

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
	edit: crud.actions.edit,
	delete: crud.actions.delete,
	sendBulkEmail: sendBulkEmailAction
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Dddg5zfg.js.map
