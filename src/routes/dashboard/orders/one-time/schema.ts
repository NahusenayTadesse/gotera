import { z } from 'zod/v4';

/** Admin editor form for a one-time / gift order. Orders are created at checkout — admins only edit them. */
export const orderSchema = z.object({
	id: z.string().min(1),
	status: z.enum(['pending', 'paid', 'fulfilled']),
	buyerName: z.string().max(255).optional(),
	recipientName: z.string().min(1, { error: 'Recipient name is required.' }).max(255),
	giftMessage: z.string().max(2000).optional(),
	durationMonths: z.coerce.number().int().min(1).default(1),
	quantity: z.coerce.number().int().min(1).default(1),
	isActive: z.boolean().default(true)
});

export type OrderSchema = typeof orderSchema;
export type OrderFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
