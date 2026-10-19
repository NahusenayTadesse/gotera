import { o as object, s as string, _ as _enum, a2 as preprocess, a1 as number, a4 as date } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/partners/[id]/schema.ts
var PARTNER_STATUSES = [
	"new",
	"contacted",
	"approved",
	"declined"
];
var DELIVERY_STATUSES = [
	"delivered",
	"scheduled",
	"cancelled"
];
var blankToUndefined = (v) => v === "" || v === null ? void 0 : v;
/** One hand-over with an approved partner/supplier. `id` present = edit; absent = create. */
var deliverySchema = object({
	id: string().optional(),
	deliveredOn: date({ error: "Pick a date." }),
	location: string().trim().min(1, { error: "Where did it happen?" }).max(255),
	items: string().trim().min(1, { error: "What was delivered?" }).max(500),
	quantity: number({ error: "Quantity is required." }).positive().max(99999999),
	unit: string().trim().min(1, { error: "Unit is required." }).max(20).default("kg"),
	/** Entered in pounds, stored as pence. */
	value: preprocess(blankToUndefined, number().min(0).max(1e7).optional()),
	reference: string().trim().max(100).optional(),
	status: _enum(DELIVERY_STATUSES).default("delivered"),
	notes: string().trim().max(2e3).optional()
});

export { DELIVERY_STATUSES as D, PARTNER_STATUSES as P, deliverySchema as d };
//# sourceMappingURL=schema13.js-Dz2hlRO1.js.map
