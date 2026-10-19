import { o as object, s as string, a1 as number, c as boolean, _ as _enum } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/plans/schema.ts
/**
* Admin editor form for a plan. `id` present = edit; absent = create.
* `bullets` / `bulletsAm` are edited as one line per bullet and stored as JSON arrays.
* The `*Am` fields are folded into the `translations` JSON column server-side.
*/
var planSchema = object({
	id: string().optional(),
	slug: string().min(1, { error: "Slug is required." }).max(64).regex(/^[a-z0-9-]+$/, { error: "Lowercase letters, numbers and hyphens only." }),
	name: string().min(1, { error: "Name is required." }).max(120),
	subtitle: string().max(255).optional(),
	pricePence: number({ error: "Price is required." }).int().min(0),
	freqLabel: string().max(120).optional(),
	bullets: string().optional(),
	featured: boolean().default(false),
	interval: _enum([
		"one_time",
		"monthly",
		"bi_monthly"
	]).default("monthly"),
	packs: number().int().min(1).default(1),
	kind: _enum([
		"order",
		"subscription",
		"gift"
	]).default("subscription"),
	stripePriceId: string().max(255).optional(),
	active: boolean().default(true),
	sortOrder: number().int().min(0).default(0),
	quantity: number().int().min(1).default(1),
	injeraPerPack: number().int().min(1).max(100).default(3),
	maxQuantity: number().int().min(0).default(0),
	availableFrom: string().optional(),
	availableUntil: string().optional(),
	nameAm: string().max(120).optional(),
	subtitleAm: string().max(255).optional(),
	freqLabelAm: string().max(120).optional(),
	bulletsAm: string().optional()
}).refine((v) => v.kind === "subscription" === (v.interval !== "one_time"), {
	error: "Subscriptions need Monthly or Bi-monthly; one-off orders and gifts need One-time.",
	path: ["interval"]
}).refine((v) => !v.availableFrom || !Number.isNaN(Date.parse(v.availableFrom)), {
	error: "Not a valid date.",
	path: ["availableFrom"]
}).refine((v) => !v.availableUntil || !Number.isNaN(Date.parse(v.availableUntil)), {
	error: "Not a valid date.",
	path: ["availableUntil"]
}).refine((v) => !v.availableFrom || !v.availableUntil || Date.parse(v.availableUntil) > Date.parse(v.availableFrom), {
	error: "Must be after \"Available from\".",
	path: ["availableUntil"]
});

export { planSchema as p };
//# sourceMappingURL=schema14.js-BxX7KgVN.js.map
