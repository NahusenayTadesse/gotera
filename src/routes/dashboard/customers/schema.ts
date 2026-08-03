import { z } from 'zod/v4';

/** Admin editor form for a subscriber (customer). `id` present = edit; absent = create. */
export const subscriberSchema = z.object({
	id: z.string().optional(),
	email: z.email({ error: 'A valid email is required.' }),
	fullName: z.string().max(255).optional(),
	phone: z.string().max(40).optional(),
	marketingOptIn: z.boolean().default(true),
	isActive: z.boolean().default(true)
});

export type SubscriberSchema = typeof subscriberSchema;
export type SubscriberFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
