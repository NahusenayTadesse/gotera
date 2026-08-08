import { o as object, a1 as number, c as boolean, s as string, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/plans/schema.ts
/**
* Admin editor form for a plan. `id` present = edit; absent = create.
* `bullets` is edited as one line per bullet and converted to a JSON array
* server-side by `contentCrud`'s `listFields` handling.
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
	quantity: number().int().min(1).default(1)
}).refine((v) => v.kind !== "subscription" || v.slug === "starter" || v.slug === "regular", {
	error: "Subscription plans must use slug 'starter' or 'regular'.",
	path: ["slug"]
});

export { planSchema as p };
//# sourceMappingURL=schema12.js-DRMVgqk9.js.map
