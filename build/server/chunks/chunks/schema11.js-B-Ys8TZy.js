import { o as object, c as boolean, Y as number, _ as _enum, s as string } from './access.js-Cygy5klO.js';

//#region src/routes/dashboard/orders/subscriptions/schema.ts
/** Admin editor form for a subscription. `id` present = edit; absent = create. */
var subscriptionSchema = object({
	id: string().optional(),
	subscriberId: string().min(1, { error: "Choose a customer." }),
	planId: string().min(1, { error: "Choose a plan." }),
	status: _enum([
		"pending",
		"active",
		"paused",
		"cancelled"
	]).default("pending"),
	quantity: number().int().min(1).default(1),
	cancelAtPeriodEnd: boolean().default(false),
	isActive: boolean().default(true)
});

export { subscriptionSchema as s };
//# sourceMappingURL=schema11.js-B-Ys8TZy.js.map
