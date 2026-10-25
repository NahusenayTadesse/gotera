import { z } from 'zod/v4';

/** Admin editor form for a subscriber (customer). `id` present = edit; absent = create. */
export const subscriberSchema = z.object({
	id: z.string().optional(),
	email: z.email({ error: 'A valid email is required.' }),
	fullName: z.string().max(255).optional(),
	phone: z
		.string()
		.trim()
		.min(5, { error: 'A phone number is required.' })
		.max(40)
		.regex(/^[0-9+()\s-]+$/, { error: 'Use digits and + ( ) - only.' }),
	marketingOptIn: z.boolean().default(true),
	isActive: z.boolean().default(true)
});

export type SubscriberSchema = typeof subscriberSchema;
export type SubscriberFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
