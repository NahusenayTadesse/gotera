import { z } from 'zod/v4';

export const cancelSchema = z.object({
	subscriptionId: z.string().min(1, 'Please choose which plan to cancel'),
	reason: z
		.enum(['too_expensive', 'too_much_food', 'taking_a_break', 'moving', 'quality', 'other'])
		.optional(),
	feedback: z.string().max(1000, 'Keep it under 1000 characters').optional(),
	confirm: z
		.boolean()
		.refine((v) => v === true, { message: 'Please confirm the plan will end' })
});

export type CancelSchema = typeof cancelSchema;