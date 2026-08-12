import { m as db, G as giftOrders, d as desc } from '../../../../../chunks/db.js-aHIHUoQJ.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-BDsczQUc.js';
import { s as superValidate } from '../../../../../chunks/client2.js-CDGhsFzy.js';
import { z as zod } from '../../../../../chunks/adapters.js-me4_fML1.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-DFjqpbUR.js';
import { o as orderSchema } from '../../../../../chunks/schema10.js-ZIi2h6Wk.js';

//#region src/routes/dashboard/orders/one-time/+page.server.ts
var crud = contentCrud({
	table: giftOrders,
	label: "Order",
	addSchema: orderSchema,
	editSchema: orderSchema
});
var load = async () => {
	const [form, rawRows] = await Promise.all([superValidate(zod(orderSchema)), db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt))]);
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
//# sourceMappingURL=_page.server.ts.js-DzPZ4kxh.js.map
