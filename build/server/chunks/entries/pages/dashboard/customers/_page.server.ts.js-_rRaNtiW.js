import { m as db, p as subscribers, q as subscriptions, s as sql, j as eq, d as desc } from '../../../../chunks/db.js-BrmBLP0N.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-lcRmDm_g.js';
import { s as superValidate } from '../../../../chunks/client2.js-CyJQ5fE8.js';
import { z as zod } from '../../../../chunks/adapters.js-CQlMjbyU.js';
import { c as contentCrud } from '../../../../chunks/crud.js-nSrnnigd.js';
import { s as subscriberSchema } from '../../../../chunks/schema9.js-Pvxomedb.js';

//#region src/routes/dashboard/customers/+page.server.ts
var crud = contentCrud({
	table: subscribers,
	label: "Customer",
	addSchema: subscriberSchema,
	editSchema: subscriberSchema
});
var load = async () => {
	const [form, rows] = await Promise.all([superValidate(zod(subscriberSchema)), db.select({
		id: subscribers.id,
		email: subscribers.email,
		fullName: subscribers.fullName,
		phone: subscribers.phone,
		marketingOptIn: subscribers.marketingOptIn,
		isActive: subscribers.isActive,
		createdAt: subscribers.createdAt,
		subscriptionCount: sql`COUNT(${subscriptions.id})`
	}).from(subscribers).leftJoin(subscriptions, eq(subscriptions.subscriberId, subscribers.id)).groupBy(subscribers.id).orderBy(desc(subscribers.createdAt))]);
	return {
		form,
		rows
	};
};
var actions = crud.actions;

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-_rRaNtiW.js.map
