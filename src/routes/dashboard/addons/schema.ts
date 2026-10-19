import { z } from 'zod/v4';
import {
	ADDON_AVAILABILITY,
	ADDON_CATEGORIES,
	ADDON_TAGS,
	MAX_SPICE_LEVEL
} from '$lib/addons';

/** Blank select / text inputs arrive as '' — treat that as "not set". */
const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

/** Admin editor form for a catalogue add-on. `id` present = edit; absent = create. */
export const addonSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, { error: 'Name is required.' }).max(255),
	description: z.string().max(2000).optional(),
	category: z.preprocess(blankToUndefined, z.enum(ADDON_CATEGORIES).optional()),
	availability: z.enum(ADDON_AVAILABILITY).default('both'),
	pricePence: z.coerce.number({ error: 'Price is required.' }).int().min(0),
	unitLabel: z.string().max(64).optional(),
	badge: z.string().max(32).optional(),
	tags: z.array(z.enum(ADDON_TAGS)).default([]),
	spiceLevel: z.coerce.number().int().min(0).max(MAX_SPICE_LEVEL).default(0),
	ingredients: z.string().max(2000).optional(),
	// A new upload. Absent on edit means "keep the current image".
	image: z
		.instanceof(File, { error: 'Please upload an image.' })
		.refine((f) => f.size <= 10 * 1024 * 1024, 'Image must be 10 MB or smaller.')
		.optional(),
	// Ticked when the admin clears the current image without uploading a replacement.
	removeImage: z.boolean().default(false),
	sortOrder: z.coerce.number().int().min(0).default(0),
	isFeatured: z.boolean().default(false),
	isActive: z.boolean().default(true)
});

export type AddonSchema = typeof addonSchema;
export type AddonFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
