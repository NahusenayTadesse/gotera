import { z } from 'zod/v4';

/**
 * Admin editor form for a plan. `id` present = edit; absent = create.
 * `bullets` / `bulletsAm` are edited as one line per bullet and stored as JSON arrays.
 * The `*Am` fields are folded into the `translations` JSON column server-side.
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
		quantity: z.coerce.number().int().min(1).default(1),

		// ── Product definition / sale window ──
		injeraPerPack: z.coerce.number().int().min(1).max(100).default(3),
		// 0 = no per-plan cap (the checkout's own cap of MAX_PLAN_QTY still applies).
		maxQuantity: z.coerce.number().int().min(0).default(0),
		// `datetime-local` strings ('2026-12-01T00:00'); blank = open-ended.
		availableFrom: z.string().optional(),
		availableUntil: z.string().optional(),

		// ── Amharic copy (blank = show the English) ──
		nameAm: z.string().max(120).optional(),
		subtitleAm: z.string().max(255).optional(),
		freqLabelAm: z.string().max(120).optional(),
		bulletsAm: z.string().optional()
	})
	// A subscription bills on a cadence; one-offs and gifts are charged once. A mismatch
	// would sell a one-time Stripe Price through a subscription checkout (or vice versa).
	.refine((v) => (v.kind === 'subscription') === (v.interval !== 'one_time'), {
		error: 'Subscriptions need Monthly or Bi-monthly; one-off orders and gifts need One-time.',
		path: ['interval']
	})
	.refine((v) => !v.availableFrom || !Number.isNaN(Date.parse(v.availableFrom)), {
		error: 'Not a valid date.',
		path: ['availableFrom']
	})
	.refine((v) => !v.availableUntil || !Number.isNaN(Date.parse(v.availableUntil)), {
		error: 'Not a valid date.',
		path: ['availableUntil']
	})
	.refine(
		(v) =>
			!v.availableFrom || !v.availableUntil || Date.parse(v.availableUntil) > Date.parse(v.availableFrom),
		{ error: 'Must be after "Available from".', path: ['availableUntil'] }
	);

export type PlanSchema = typeof planSchema;
export type PlanFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
