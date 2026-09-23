import { m as db, w as subscriberAddons, j as eq, I as deliveryAddons, x as addons, a as asc } from '../../../../chunks/db.js-BXYNtFGm.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CWf6uOE8.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-ZnyZ4fKl.js';
import { z as zod } from '../../../../chunks/adapters.js-QNI96UbV.js';
import { a as addonSchema } from '../../../../chunks/schema2.js-IxCbxeZM.js';
import { i as idSchema, c as contentCrud } from '../../../../chunks/crud.js-BEUarGst.js';

//#region src/routes/dashboard/addons/+page.server.ts
var crud = contentCrud({
	table: addons,
	label: "Add-on",
	addSchema: addonSchema,
	editSchema: addonSchema
});
var load = async () => {
	const [form, rows] = await Promise.all([superValidate(zod(addonSchema)), db.select().from(addons).orderBy(asc(addons.sortOrder))]);
	return {
		form,
		rows
	};
};
var actions = {
	...crud.actions,
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod(idSchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Invalid request"
		}, { status: 400 });
		const { id } = form.data;
		const [[onSubscription], [onDelivery]] = await Promise.all([db.select({ id: subscriberAddons.id }).from(subscriberAddons).where(eq(subscriberAddons.addonId, id)).limit(1), db.select({ id: deliveryAddons.id }).from(deliveryAddons).where(eq(deliveryAddons.addonId, id)).limit(1)]);
		if (onSubscription || onDelivery) return message(form, {
			type: "error",
			text: `This add-on is on an existing ${onSubscription ? "subscription" : "delivery"} and can't be deleted. Set it to inactive instead — it will stop being offered to new customers.`
		}, { status: 409 });
		return crud.actions.delete(event);
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DDEWLuIo.js.map
