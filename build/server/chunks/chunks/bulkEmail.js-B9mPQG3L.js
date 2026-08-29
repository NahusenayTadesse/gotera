import { o as object, s as string, x as array, y as email } from './access.js-Cygy5klO.js';

//#region src/lib/schemas/bulkEmail.ts
/**
* Shared by every "email selected rows" dialog across the dashboard (subscriptions, orders,
* gifts, guest orders, deliveries) and the standalone Bulk Email page. Recipients travel as
* email/name pairs rather than ids, since each page's rows come from a different table
* (subscribers, guest_orders, gift_orders, or a merge of several) — the server would otherwise
* need to know which table every id belongs to. Every page already renders these emails from
* server-loaded data, and only Admins reach these routes, so trusting the pairs back is fine.
*/
var bulkEmailSchema = object({
	recipients: array(object({
		email: email(),
		name: string().optional()
	})).min(1, { error: "Select at least one recipient." }),
	subject: string().min(1, { error: "Subject is required." }).max(255),
	message: string().min(1, { error: "Write a message." }).max(5e4)
});

export { bulkEmailSchema as b };
//# sourceMappingURL=bulkEmail.js-B9mPQG3L.js.map
