import { o as object, c as boolean, s as string, _ as _enum } from './access.js-HgBsL8za.js';

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

export { deliverySchema as d };
//# sourceMappingURL=schema8.js-CkQpB3bW.js.map
