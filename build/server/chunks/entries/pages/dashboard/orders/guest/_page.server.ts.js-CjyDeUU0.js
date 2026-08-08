import { m as db, F as guestOrders, d as desc } from '../../../../../chunks/db.js-BkD50_-0.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate } from '../../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../../chunks/adapters.js-D4rGtFDl.js';
import { p as parseJsonColumn } from '../../../../../chunks/format.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-BtBdbhhX.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema9.js-B8G_ex6n.js';

//#region src/routes/dashboard/orders/guest/+page.server.ts
var crud = contentCrud({
	table: guestOrders,
	label: "Guest order",
	addSchema: guestOrderSchema,
	editSchema: guestOrderSchema
});
var load = async () => {
	const [form, rawRows] = await Promise.all([superValidate(zod(guestOrderSchema)), db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt))]);
	return {
		form,
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
	delete: crud.actions.delete
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CjyDeUU0.js.map
