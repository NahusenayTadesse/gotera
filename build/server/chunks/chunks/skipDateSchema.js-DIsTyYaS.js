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
//#endregion
//#region src/routes/dashboard/deliveries/skipDateSchema.ts
/** Admin marks a Saturday as skipped (bank holiday, etc). Any deliveries already
* booked for it get bumped to the next non-skipped Saturday automatically. */
var skipDateSchema = object({
	date: string().min(1, { error: "Pick a date." }),
	reason: string().max(255).optional()
});

export { deliverySchema as d, skipDateSchema as s };
//# sourceMappingURL=skipDateSchema.js-DIsTyYaS.js.map
