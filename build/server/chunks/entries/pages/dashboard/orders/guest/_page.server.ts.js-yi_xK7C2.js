import { m as db, M as guestOrders, d as desc } from '../../../../../chunks/db.js-BXYNtFGm.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-CWf6uOE8.js';
import { s as superValidate } from '../../../../../chunks/client2.js-ZnyZ4fKl.js';
import { z as zod } from '../../../../../chunks/adapters.js-QNI96UbV.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-BEUarGst.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-BZDoWPwu.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-YSE72iIJ.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema8.js-DIy2yLSR.js';

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
//# sourceMappingURL=_page.server.ts.js-yi_xK7C2.js.map
