import { o as object, s as string, x as array, y as email, _ as _enum } from './access.js-j1_SnSd1.js';

var bulkEmailSchema = object({
	/** Which mailbox it goes out from. Order pages keep the default; the Bulk Email page seeds 'hello'. */
	sender: _enum(["orders", "hello"]).default("orders"),
	recipients: array(object({
		email: email(),
		name: string().optional()
	})).min(1, { error: "Select at least one recipient." }),
	subject: string().min(1, { error: "Subject is required." }).max(255),
	message: string().min(1, { error: "Write a message." }).max(5e4)
});

export { bulkEmailSchema as b };
//# sourceMappingURL=bulkEmail.js-CU4bRlQ5.js.map
