import { m as db, N as giftOrders, d as desc } from '../../../../../chunks/db.js-BXYNtFGm.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-CWf6uOE8.js';
import { s as superValidate } from '../../../../../chunks/client2.js-ZnyZ4fKl.js';
import { z as zod } from '../../../../../chunks/adapters.js-QNI96UbV.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-BEUarGst.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-BZDoWPwu.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-YSE72iIJ.js';
import { o as orderSchema } from '../../../../../chunks/schema9.js-BLtgud9x.js';

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
//# sourceMappingURL=_page.server.ts.js-COGwv-rT.js.map
