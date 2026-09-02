import { m as db, t as subscriptions, q as plans, p as subscribers, j as eq, d as desc } from '../../../../../chunks/db.js-CYNot06E.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-Ckfb53mn.js';
import { s as superValidate } from '../../../../../chunks/client2.js-DmssoQeq.js';
import { z as zod } from '../../../../../chunks/adapters.js-CmiyuZ8g.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-tK1slPtR.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-B9mPQG3L.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-CcOR9mmt.js';
import { s as subscriptionSchema } from '../../../../../chunks/schema11.js-B-Ys8TZy.js';

//#region src/routes/dashboard/orders/subscriptions/+page.server.ts
var crud = contentCrud({
	table: subscriptions,
	label: "Subscription",
	addSchema: subscriptionSchema,
	editSchema: subscriptionSchema
});
var load = async () => {
	const [form, bulkEmailForm, rows, subscriberOptions, planOptions] = await Promise.all([
		superValidate(zod(subscriptionSchema)),
		superValidate(zod(bulkEmailSchema)),
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
		bulkEmailForm,
		rows,
		subscriberOptions,
		planOptions
	};
};
var actions = {
	...crud.actions,
	sendBulkEmail: sendBulkEmailAction
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C-lzoFfB.js.map
