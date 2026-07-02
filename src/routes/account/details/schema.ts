import { z } from 'zod';

export const emailSchema = z.object({
	email: z.email({ error: 'Enter a valid email address.' })
});

export const phoneSchema = z.object({
	phone: z
		.string()
		.min(5, { error: 'Enter a valid phone number.' })
		.max(32)
		.regex(/^[0-9+()\s-]+$/, { error: 'Use digits and + ( ) - only.' })
});

export const addressSchema = z.object({
	line1: z.string().min(1, { error: 'Address line 1 is required.' }).max(255),
	line2: z.string().max(255).optional(),
	city: z.string().min(1, { error: 'City is required.' }).max(255).default('London'),
	postcode: z.string().min(1, { error: 'Postcode is required.' }).max(32)
});

export type EmailSchema = typeof emailSchema;
export type PhoneSchema = typeof phoneSchema;
export type AddressSchema = typeof addressSchema;
export type DetailsMessage = { type: 'success' | 'error'; text: string };