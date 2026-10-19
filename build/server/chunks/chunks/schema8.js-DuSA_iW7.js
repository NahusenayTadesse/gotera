import { o as object, s as string, a1 as number, a2 as preprocess, a4 as date, x as array, _ as _enum } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/batches/schema.ts
var BATCH_STATUSES = [
	"active",
	"quarantined",
	"recalled",
	"depleted"
];
var optionalText = (max) => preprocess((v) => v === null ? "" : v, string().trim().max(max).optional().default(""));
/** Create/edit a batch. `id` present = edit. `productKey` is 'injera' or an add-on id. */
var batchSchema = object({
	id: string().optional(),
	productKey: string().min(1, { error: "Choose a product." }),
	code: optionalText(40),
	source: _enum(["in_house", "external"]).default("in_house"),
	sourcePartnerId: optionalText(36),
	sourceDeliveryId: optionalText(36),
	supplierLotRef: optionalText(100),
	inputIds: array(string()).default([]),
	producedOn: date({ error: "Pick the production / receiving date." }),
	bestBefore: preprocess((v) => v === "" || v === null ? void 0 : v, date().optional()),
	quantity: number({ error: "Quantity is required." }).int().min(1).max(1e6),
	unit: string().trim().min(1).max(20).default("packs"),
	notes: optionalText(2e3)
}).refine((d) => d.source === "in_house" || !!d.sourcePartnerId, {
	message: "Pick the supplier or partner it came from.",
	path: ["sourcePartnerId"]
}).refine((d) => !d.bestBefore || d.bestBefore >= d.producedOn, {
	message: "Best-before must be on or after the production date.",
	path: ["bestBefore"]
});

export { BATCH_STATUSES as B, batchSchema as b };
//# sourceMappingURL=schema8.js-DuSA_iW7.js.map
