import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

// Cancels ONE subscription (one plan the person holds), not the whole account.
export const cancelSubscriptionSchema = z.object({
	subscriptionId: z.string().min(1),
	reason: z
		.enum(['too_expensive', 'too_much_food', 'moving', 'taking_a_break', 'quality', 'other'])
		.optional(),
	feedback: z.string().max(1000).optional(),
	confirm: z.literal(true, { error: m.acctcancel_confirm_required() })
});

export type CancelSubscriptionSchema = typeof cancelSubscriptionSchema;
export type CancelMessage = { type: 'success' | 'error'; text: string };