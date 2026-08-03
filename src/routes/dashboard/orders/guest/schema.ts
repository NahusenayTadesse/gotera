import { z } from 'zod/v4';

/** Admin editor form for a guest (no-account) order. Orders are created at checkout — admins only edit them. */
export const guestOrderSchema = z.object({
	id: z.string().min(1),
	status: z.enum(['pending', 'paid', 'fulfilled']),
	buyerEmail: z.string().max(255).optional(),
	quantity: z.coerce.number().int().min(1).default(1),
	isActive: z.boolean().default(true)
});

export type GuestOrderSchema = typeof guestOrderSchema;
export type GuestOrderFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
