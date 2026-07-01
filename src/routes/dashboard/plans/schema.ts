import { z } from 'zod/v4';

/** Admin editor form. `id` present = edit; absent = create. */
export const planFormSchema = z
	.object({
		id: z.string().optional(),
		slug: z
			.string()
			.min(1, { error: 'Slug is required.' })
			.max(64)
			.regex(/^[a-z0-9-]+$/, { error: 'Lowercase letters, numbers and hyphens only.' }),
		name: z.string().min(1, { error: 'Name is required.' }).max(120),
		subtitle: z.string().max(255).optional(),
		pricePence: z.number({ error: 'Price is required.' }).int().min(0),
		freqLabel: z.string().max(120).optional(),
		bullets: z.array(z.string().max(120)).default([]),
		featured: z.boolean().default(false),
		interval: z.enum(['one_time', 'monthly', 'bi_monthly']).default('monthly'),
		packs: z.number().int().min(1).default(1),
		kind: z.enum(['order', 'subscription', 'gift']).default('subscription'),
		active: z.boolean().default(true),
		sortOrder: z.number().int().default(0)
	})
	// Keeps the table honest against subscribers.plan (enum: starter | regular).
	.refine((v) => v.kind !== 'subscription' || v.slug === 'starter' || v.slug === 'regular', {
		error: "Subscription plans must use slug 'starter' or 'regular' to match subscribers.plan.",
		path: ['slug']
	});

export type PlanFormSchema = typeof planFormSchema;
export type PlanFormMessage = { type: 'success' | 'error' | 'warning'; text: string };