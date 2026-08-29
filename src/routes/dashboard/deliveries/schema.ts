import { z } from 'zod/v4';

/** Admin editor form for a delivery. Deliveries are generated from a subscription — admins only edit them. */
export const deliverySchema = z.object({
	id: z.string().min(1),
	status: z.enum(['scheduled', 'dispatched', 'delivered', 'skipped', 'failed']),
	scheduledDate: z.string().min(1, { error: 'Pick a date.' }),
	isActive: z.boolean().default(true)
});

export type DeliverySchema = typeof deliverySchema;
export type DeliveryFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
