import { m as db, M as giftOrders, d as desc } from '../../../../../chunks/db.js-QS2RGzZQ.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-CMe7fg5E.js';
import { s as superValidate } from '../../../../../chunks/client2.js-nubrWqZa.js';
import { z as zod } from '../../../../../chunks/adapters.js-D3ccRgef.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-Ch0tzD6j.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-GA9Kc6dA.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-DHsiK3-W.js';
import { o as orderSchema } from '../../../../../chunks/schema9.js-BZDK157h.js';

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
//# sourceMappingURL=_page.server.ts.js-BGwsB4uE.js.map
