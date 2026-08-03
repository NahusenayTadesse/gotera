import { z } from 'zod/v4';

/**
 * Admin editor form for a plan. `id` present = edit; absent = create.
 * `bullets` is edited as one line per bullet and converted to a JSON array
 * server-side by `contentCrud`'s `listFields` handling.
 */
export const planSchema = z
	.object({
		id: z.string().optional(),
		slug: z
			.string()
			.min(1, { error: 'Slug is required.' })
			.max(64)
			.regex(/^[a-z0-9-]+$/, { error: 'Lowercase letters, numbers and hyphens only.' }),
		name: z.string().min(1, { error: 'Name is required.' }).max(120),
		subtitle: z.string().max(255).optional(),
		pricePence: z.coerce.number({ error: 'Price is required.' }).int().min(0),
		freqLabel: z.string().max(120).optional(),
		bullets: z.string().optional(),
		featured: z.boolean().default(false),
		interval: z.enum(['one_time', 'monthly', 'bi_monthly']).default('monthly'),
		packs: z.coerce.number().int().min(1).default(1),
		kind: z.enum(['order', 'subscription', 'gift']).default('subscription'),
		stripePriceId: z.string().max(255).optional(),
		active: z.boolean().default(true),
		sortOrder: z.coerce.number().int().min(0).default(0),
		quantity: z.coerce.number().int().min(1).default(1)
	})
	// Only 'starter' and 'regular' subscription plans are wired up elsewhere in the app.
	.refine((v) => v.kind !== 'subscription' || v.slug === 'starter' || v.slug === 'regular', {
		error: "Subscription plans must use slug 'starter' or 'regular'.",
		path: ['slug']
	});

export type PlanSchema = typeof planSchema;
export type PlanFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
