import { z } from 'zod';

/**
 * Zod 4 schema for the GOTERA subscribe / gift checkout page.
 *
 * One flat schema drives both flows (recipient = 'me' | 'gift') so superforms
 * has stable defaults for every field. Cross-field rules (which plan is valid
 * for which recipient, which address fields are required) are enforced with
 * chained `.refine()`s at the object level.
 *
 * Fields that the server fills in itself are NOT here:
 *   - subscribers.userId / email / fullName  -> from the Better Auth session
 *   - anything in secureFields (createdAt/updatedAt/user cols) -> server
 *   - Stripe ids, status, scheduledDate       -> server
 */

export const RECIPIENTS = ['me', 'gift'] as const;
export const SUB_PLANS = ['one-off', 'starter', 'regular'] as const;
export const GIFT_PLANS = ['single-gift', 'double-gift'] as const;
export const DELIVERY_DAYS = ['Saturday'] as const;
export const FREQUENCIES = ['Monthly'] as const;

export const ALL_PLANS = [...SUB_PLANS, ...GIFT_PLANS] as const;

/** Flash message shape returned via superforms `message()` and shown by sonner. */
export type FormMessage = { type: 'success' | 'error' | 'redirect'; text?: string; url?: string };
export const checkoutSchema = z
	.object({
		recipient: z.enum(RECIPIENTS).default('me'),
		plan: z.enum(ALL_PLANS).default('regular'),
		deliveryDay: z.enum(DELIVERY_DAYS).default('Saturday'),
		frequency: z.enum(FREQUENCIES).default('Monthly'),

		// Addon *catalogue* ids (real UUIDs from the addons table). Validated
		// against the live catalogue server-side; here we just check shape.
		addonIds: z.array(z.string().min(1)).default([]),

		marketingOptIn: z.boolean().default(true),

		// ── Delivery address ──
		// Reused by both flows (a given submission is either "me" or "gift",
		// never both, so one address block is enough).
		addressLabel: z.string().max(255).optional(),
		phone: z.coerce.string("Phone is required").default(''),
		line1: z.string().max(255).default(''),
		line2: z.string().max(255).optional(),
		city: z.string().max(255).default('London'),
		postcode: z.string().max(32).default(''),
		guestCheckout: z.boolean().default(false),
		quantity: z.number().default(1),

		// ── Gift-only ──
		buyerName: z.string().max(255).optional(),
		buyerEmail: z.email({ error: 'Enter a valid email address.' }).optional(),
		recipientName: z.string().max(255).default(''),
		giftMessage: z.string().max(500).optional(),
		durationMonths: z.number().int().min(1).max(12).default(1)
	})
	// Plan must match the chosen recipient.
	.refine((v) => (v.recipient === 'me' ? (SUB_PLANS as readonly string[]).includes(v.plan) : true), {
		error: 'Choose a subscription plan.',
		path: ['plan']
	})
	.refine(
		(v) => (v.recipient === 'gift' ? (GIFT_PLANS as readonly string[]).includes(v.plan) : true),
		{ error: 'Choose a gift pack.', path: ['plan'] }
	)
	// Address required for "me".
	.refine((v) => (v.recipient === 'me' ? v.line1.trim().length > 0 : true), {
		error: 'Address line 1 is required.',
		path: ['line1']
	})
	.refine((v) => (v.recipient === 'me' ? v.postcode.trim().length > 0 : true), {
		error: 'Postcode is required.',
		path: ['postcode']
	})
	// Recipient details required for "gift".
	.refine((v) => (v.recipient === 'gift' ? v.recipientName.trim().length > 0 : true), {
		error: "Recipient's name is required.",
		path: ['recipientName']
	})
	.refine((v) => (v.recipient === 'gift' ? v.line1.trim().length > 0 : true), {
		error: 'Recipient address line 1 is required.',
		path: ['line1']
	})
	.refine((v) => (v.recipient === 'gift' ? v.postcode.trim().length > 0 : true), {
		error: 'Recipient postcode is required.',
		path: ['postcode']
	});

export type CheckoutSchema = typeof checkoutSchema;

/* ────────────────────────────────────────────────────────────────────────
 * Manage-page schemas (update / cancel).
 * These have no UI on the subscribe page — they belong on an account page —
 * but the actions live in +page.server.ts for now, per your request.
 * ──────────────────────────────────────────────────────────────────────── */

export const updateSubscriptionSchema = z.object({
	subscriberId: z.uuid(),
	plan: z.enum(['starter', 'regular']),
	addonIds: z.array(z.string().min(1)).default([]),
	deliveryDay: z.enum(DELIVERY_DAYS).default('Saturday'),
	marketingOptIn: z.boolean().default(true)
});
export type UpdateSubscriptionSchema = typeof updateSubscriptionSchema;

export const cancelSubscriptionSchema = z.object({
	subscriberId: z.uuid()
});
export type CancelSubscriptionSchema = typeof cancelSubscriptionSchema;