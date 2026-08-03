import { z } from 'zod/v4';

/** Admin editor form for a subscription. `id` present = edit; absent = create. */
export const subscriptionSchema = z.object({
	id: z.string().optional(),
	subscriberId: z.string().min(1, { error: 'Choose a customer.' }),
	planId: z.string().min(1, { error: 'Choose a plan.' }),
	status: z.enum(['pending', 'active', 'paused', 'cancelled']).default('pending'),
	quantity: z.coerce.number().int().min(1).default(1),
	cancelAtPeriodEnd: z.boolean().default(false),
	isActive: z.boolean().default(true)
});

export type SubscriptionSchema = typeof subscriptionSchema;
export type SubscriptionFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
