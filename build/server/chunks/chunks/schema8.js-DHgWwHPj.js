import { o as object, c as boolean, s as string, _ as _enum, x as array } from './access.js-Cygy5klO.js';

//#region src/routes/dashboard/deliveries/schema.ts
/** Admin editor form for a delivery. Deliveries are generated from a subscription — admins only edit them. */
var deliverySchema = object({
	id: string().min(1),
	status: _enum([
		"scheduled",
		"dispatched",
		"delivered",
		"skipped",
		"failed"
	]),
	scheduledDate: string().min(1, { error: "Pick a date." }),
	isActive: boolean().default(true)
});
/** Admin bulk-notifies selected deliveries' customers of a delay with a custom message. */
var delayEmailSchema = object({
	deliveryIds: array(string().min(1)).min(1, { error: "Select at least one delivery." }),
	message: string().min(1, { error: "Write a message for the delay." }).max(2e3)
});

export { deliverySchema as a, delayEmailSchema as d };
//# sourceMappingURL=schema8.js-DHgWwHPj.js.map
