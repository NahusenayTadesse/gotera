import { z } from 'zod/v4';

/** Admin editor form for a catalogue add-on. `id` present = edit; absent = create. */
export const addonSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, { error: 'Name is required.' }).max(255),
	description: z.string().max(2000).optional(),
	category: z.preprocess(
		(v) => (v === '' ? undefined : v),
		z.enum(['spice', 'sauce', 'pantry', 'kit']).optional()
	),
	pricePence: z.coerce.number({ error: 'Price is required.' }).int().min(0),
	imageUrl: z.string().max(2000).optional(),
	sortOrder: z.coerce.number().int().min(0).default(0),
	stripePriceId: z.string().max(255).optional(),
	isActive: z.boolean().default(true)
});

export type AddonSchema = typeof addonSchema;
export type AddonFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
