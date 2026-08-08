import { m as db, t as deliveries, z as addresses, q as plans, p as subscribers, j as eq, y as subscriptions, a as asc } from '../../../../chunks/db.js-BkD50_-0.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate } from '../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { c as contentCrud } from '../../../../chunks/crud.js-BtBdbhhX.js';
import { d as deliverySchema } from '../../../../chunks/schema8.js-CkQpB3bW.js';

//#region src/routes/dashboard/deliveries/+page.server.ts
var crud = contentCrud({
	table: deliveries,
	label: "Delivery",
	addSchema: deliverySchema,
	editSchema: deliverySchema
});
var load = async () => {
	const [form, rows] = await Promise.all([superValidate(zod(deliverySchema)), db.select({
		id: deliveries.id,
		scheduledDate: deliveries.scheduledDate,
		status: deliveries.status,
		subscriberEmail: subscribers.email,
		subscriberName: subscribers.fullName,
		planName: plans.name,
		addressLine1: addresses.line1,
		addressCity: addresses.city,
		addressPostcode: addresses.postcode,
		isActive: deliveries.isActive
	}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).orderBy(asc(deliveries.scheduledDate))]);
	return {
		form,
		rows
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
//# sourceMappingURL=_page.server.ts.js-GpPpOHeG.js.map
