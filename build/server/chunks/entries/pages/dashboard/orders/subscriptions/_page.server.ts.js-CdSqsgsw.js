import { m as db, t as subscriptions, q as plans, p as subscribers, j as eq, d as desc } from '../../../../../chunks/db.js-aHIHUoQJ.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-BDsczQUc.js';
import { s as superValidate } from '../../../../../chunks/client2.js-CDGhsFzy.js';
import { z as zod } from '../../../../../chunks/adapters.js-me4_fML1.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-DFjqpbUR.js';
import { s as subscriptionSchema } from '../../../../../chunks/schema11.js-B-Ys8TZy.js';

//#region src/routes/dashboard/orders/subscriptions/+page.server.ts
var crud = contentCrud({
	table: subscriptions,
	label: "Subscription",
	addSchema: subscriptionSchema,
	editSchema: subscriptionSchema
});
var load = async () => {
	const [form, rows, subscriberOptions, planOptions] = await Promise.all([
		superValidate(zod(subscriptionSchema)),
		db.select({
			id: subscriptions.id,
			subscriberId: subscriptions.subscriberId,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planId: subscriptions.planId,
			planName: plans.name,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			isActive: subscriptions.isActive,
			createdAt: subscriptions.createdAt
		}).from(subscriptions).leftJoin(subscribers, eq(subscribers.id, subscriptions.subscriberId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).orderBy(desc(subscriptions.createdAt)),
		db.select({
			value: subscribers.id,
			name: subscribers.email
		}).from(subscribers),
		db.select({
			value: plans.id,
			name: plans.name
		}).from(plans)
	]);
	return {
		form,
		rows,
		subscriberOptions,
		planOptions
	};
};
var actions = crud.actions;

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CdSqsgsw.js.map
