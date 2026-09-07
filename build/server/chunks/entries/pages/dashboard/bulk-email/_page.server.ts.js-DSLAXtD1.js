import { m as db, p as subscribers, d as desc, t as subscriptions } from '../../../../chunks/db.js-4htFJ9eU.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CZArKCj5.js';
import { s as superValidate } from '../../../../chunks/client2.js-DLW9Sckp.js';
import { z as zod } from '../../../../chunks/adapters.js-B4rDhjf0.js';
import { b as bulkEmailSchema } from '../../../../chunks/bulkEmail.js-GA9Kc6dA.js';
import { s as sendBulkEmailAction } from '../../../../chunks/bulkEmail2.js-R8cXekdM.js';

//#region src/routes/dashboard/bulk-email/+page.server.ts
/** Best status wins when a subscriber holds more than one subscription (e.g. one cancelled, one active). */
var STATUS_PRIORITY = [
	"active",
	"paused",
	"pending",
	"cancelled"
];
var load = async () => {
	const [bulkEmailForm, subscriberRows, subscriptionRows] = await Promise.all([
		superValidate(zod(bulkEmailSchema)),
		db.select({
			id: subscribers.id,
			email: subscribers.email,
			fullName: subscribers.fullName,
			marketingOptIn: subscribers.marketingOptIn,
			isActive: subscribers.isActive,
			createdAt: subscribers.createdAt
		}).from(subscribers).orderBy(desc(subscribers.createdAt)),
		db.select({
			subscriberId: subscriptions.subscriberId,
			status: subscriptions.status
		}).from(subscriptions)
	]);
	const bestStatusBySubscriber = /* @__PURE__ */ new Map();
	for (const { subscriberId, status } of subscriptionRows) {
		if (!STATUS_PRIORITY.includes(status)) continue;
		const current = bestStatusBySubscriber.get(subscriberId);
		if (!current || STATUS_PRIORITY.indexOf(status) < STATUS_PRIORITY.indexOf(current)) bestStatusBySubscriber.set(subscriberId, status);
	}
	return {
		bulkEmailForm,
		rows: subscriberRows.map((s) => ({
			...s,
			customerType: bestStatusBySubscriber.get(s.id) ?? "lead"
		}))
	};
};
var actions = { sendBulkEmail: sendBulkEmailAction };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DSLAXtD1.js.map
