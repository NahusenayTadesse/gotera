import { m as db, F as guestOrders, d as desc } from '../../../../../chunks/db.js-CYNot06E.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-Ckfb53mn.js';
import { s as superValidate } from '../../../../../chunks/client2.js-DmssoQeq.js';
import { z as zod } from '../../../../../chunks/adapters.js-CmiyuZ8g.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-tK1slPtR.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-B9mPQG3L.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-CcOR9mmt.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema9.js-C0x4Sr6K.js';

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
//# sourceMappingURL=_page.server.ts.js-BZ4mRjP-.js.map
