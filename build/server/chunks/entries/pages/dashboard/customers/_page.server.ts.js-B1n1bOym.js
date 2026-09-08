import { m as db, p as subscribers, t as subscriptions, s as sql, j as eq, d as desc } from '../../../../chunks/db.js-QS2RGzZQ.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CMe7fg5E.js';
import { s as superValidate } from '../../../../chunks/client2.js-nubrWqZa.js';
import { z as zod } from '../../../../chunks/adapters.js-D3ccRgef.js';
import { c as contentCrud } from '../../../../chunks/crud.js-Ch0tzD6j.js';
import { s as subscriberSchema } from '../../../../chunks/schema7.js-Bk5x3RLZ.js';

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
//# sourceMappingURL=_page.server.ts.js-B1n1bOym.js.map
