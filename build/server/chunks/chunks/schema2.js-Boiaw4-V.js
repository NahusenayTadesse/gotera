import { o as object, c as boolean, s as string, a1 as number, a2 as preprocess, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/admin-panel/addons/schema.ts
/** Admin editor form for a catalogue add-on. `id` present = edit; absent = create. */
var addonSchema = object({
	id: string().optional(),
	name: string().min(1, { error: "Name is required." }).max(255),
	description: string().max(2e3).optional(),
	category: preprocess((v) => v === "" ? void 0 : v, _enum([
		"spice",
		"sauce",
		"pantry",
		"kit"
	]).optional()),
	pricePence: number({ error: "Price is required." }).int().min(0),
	imageUrl: string().max(2e3).optional(),
	sortOrder: number().int().min(0).default(0),
	stripePriceId: string().max(255).optional(),
	isActive: boolean().default(true)
});

export { addonSchema as a };
//# sourceMappingURL=schema2.js-Boiaw4-V.js.map
