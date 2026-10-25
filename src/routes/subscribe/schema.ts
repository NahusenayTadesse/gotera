import { z } from 'zod';
import { m } from '$lib/paraglide/messages.js';
import { MAX_PLAN_QTY } from './limits';

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
// Plans are NOT listed here. `plan` is any well-formed slug, and the server checks it
// against the `plans` table (active, on sale, right kind for the flow) — so a plan added
// in the dashboard is buyable without a code change. Lowercased, so `?plan=Family` from
// an old link still matches the stored `family`.
export const PLAN_SLUG = z
	.string()
	.trim()
	.toLowerCase()
	.max(64)
	.regex(/^[a-z0-9-]+$/);
export const DELIVERY_DAYS = ['Sat-Mon'] as const;
export const FREQUENCIES = ['Monthly'] as const;

export type PlanSlug = string;

/** Flash message shape returned via superforms `message()` and shown by sonner. */
export type FormMessage = { type: 'success' | 'error' | 'redirect'; text?: string; url?: string };
export const checkoutSchema = z
	.object({
		recipient: z.enum(RECIPIENTS).default('me'),
		plan: PLAN_SLUG.default('regular'),
		deliveryDay: z.enum(DELIVERY_DAYS).default('Sat-Mon'),
		frequency: z.enum(FREQUENCIES).default('Monthly'),

		// Addon *catalogue* ids (real UUIDs from the addons table). Validated
		// against the live catalogue server-side; here we just check shape.
		addonIds: z.array(z.string().min(1)).default([]),

		// Per-add-on quantity, keyed by catalogue id. Capped at 20 each, matching the cap
		// on /account, /addons/[token] and the dashboard. Absent entries mean 1, so an
		// older client that only sends `addonIds` still works.
		addonQuantities: z
			.record(z.string(), z.coerce.number().int().min(1).max(20))
			.default({}),

		marketingOptIn: z.boolean().default(true),

		// ── Delivery address ──
		// Reused by both flows (a given submission is either "me" or "gift",
		// never both, so one address block is enough).
		addressLabel: z.string().max(255).optional(),
		// Required on every flow (signed-in, guest and gift) so the driver can reach someone.
		phone: z
			.string()
			.trim()
			.min(5, { error: m.subscribe_error_phone_required() })
			.max(32)
			.regex(/^[0-9+()\s-]+$/, { error: m.acctdetails_phone_format() })
			.default(''),
		line1: z.string().max(255).default(''),
		line2: z.string().max(255).optional(),
		city: z.string().max(255).default('London'),
		postcode: z.string().max(32).default(''),

		// Postcode centroid, filled in by the address field's background lookup.
		// Optional with no `.refine()` on purpose: geocoding is best-effort and must never
		// stand between a customer and a completed order. When these are absent the server
		// retries the lookup itself, and failing that stores the address without them.
		latitude: z.coerce.number().optional(),
		longitude: z.coerce.number().optional(),
		guestCheckout: z.boolean().default(false),
		// Packs of the chosen plan. Bounded so a hand-crafted post can't send 0, a negative,
		// a fraction or an order the kitchen can't fill — Stripe would reject the first three
		// with an opaque error.
		quantity: z.coerce.number().int().min(1).max(MAX_PLAN_QTY).default(1),

		// ── Gift-only ──
		buyerName: z.string().max(255).optional(),
		buyerEmail: z.email({ error: m.subscribe_error_email_invalid() }).optional(),
		recipientName: z.string().max(255).default(''),
		giftMessage: z.string().max(500).optional(),
		durationMonths: z.number().int().min(1).max(12).default(1)
	})
	// Whether the plan suits the recipient ('me' = subscription/one-off, 'gift' = gift)
	// depends on the plan's `kind`, which lives in the DB — the server actions check it.
	// Address required for "me".
	.refine((v) => (v.recipient === 'me' ? v.line1.trim().length > 0 : true), {
		error: m.subscribe_error_line1_required(),
		path: ['line1']
	})
	.refine((v) => (v.recipient === 'me' ? v.postcode.trim().length > 0 : true), {
		error: m.subscribe_error_postcode_required(),
		path: ['postcode']
	})
	// Recipient details required for "gift".
	.refine((v) => (v.recipient === 'gift' ? v.recipientName.trim().length > 0 : true), {
		error: m.subscribe_error_recipient_name_required(),
		path: ['recipientName']
	})
	.refine((v) => (v.recipient === 'gift' ? v.line1.trim().length > 0 : true), {
		error: m.subscribe_error_recipient_line1_required(),
		path: ['line1']
	})
	.refine((v) => (v.recipient === 'gift' ? v.postcode.trim().length > 0 : true), {
		error: m.subscribe_error_recipient_postcode_required(),
		path: ['postcode']
	});

export type CheckoutSchema = typeof checkoutSchema;
