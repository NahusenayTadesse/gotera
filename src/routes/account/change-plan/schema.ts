import { z } from 'zod';

// Only subscription plans are changeable (matches subscribers.plan enum).
export const changePlanSchema = z.object({
	plan: z.enum(['starter', 'regular'])
});

export type ChangePlanSchema = typeof changePlanSchema;
export type ChangePlanMessage = { type: 'success' | 'error'; text: string };