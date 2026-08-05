import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

export const cancelSchema = z.object({
	subscriptionId: z.string().min(1, m.acctplan_subscription_required()),
	reason: z
		.enum(['too_expensive', 'too_much_food', 'taking_a_break', 'moving', 'quality', 'other'])
		.optional(),
	feedback: z.string().max(1000, m.acctplan_feedback_max()).optional(),
	confirm: z
		.boolean()
		.refine((v) => v === true, { message: m.acctplan_confirm_required() })
});

export type CancelSchema = typeof cancelSchema;