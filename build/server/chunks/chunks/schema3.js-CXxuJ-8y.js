import { d as ADDON_TAGS, A as ADDON_AVAILABILITY, a as ADDON_CATEGORIES } from './addons.js-B66jfCaP.js';
import { o as object, c as boolean, a1 as number, a3 as _instanceof, s as string, x as array, _ as _enum, a2 as preprocess } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/addons/schema.ts
/** Blank select / text inputs arrive as '' — treat that as "not set". */
var blankToUndefined = (v) => v === "" || v === null ? void 0 : v;
/** Admin editor form for a catalogue add-on. `id` present = edit; absent = create. */
var addonSchema = object({
	id: string().optional(),
	name: string().min(1, { error: "Name is required." }).max(255),
	description: string().max(2e3).optional(),
	category: preprocess(blankToUndefined, _enum(ADDON_CATEGORIES).optional()),
	availability: _enum(ADDON_AVAILABILITY).default("both"),
	pricePence: number({ error: "Price is required." }).int().min(0),
	unitLabel: string().max(64).optional(),
	badge: string().max(32).optional(),
	tags: array(_enum(ADDON_TAGS)).default([]),
	spiceLevel: number().int().min(0).max(3).default(0),
	ingredients: string().max(2e3).optional(),
	image: _instanceof(File, { error: "Please upload an image." }).refine((f) => f.size <= 10 * 1024 * 1024, "Image must be 10 MB or smaller.").optional(),
	removeImage: boolean().default(false),
	sortOrder: number().int().min(0).default(0),
	isFeatured: boolean().default(false),
	isActive: boolean().default(true)
});

export { addonSchema as a };
//# sourceMappingURL=schema3.js-CXxuJ-8y.js.map
