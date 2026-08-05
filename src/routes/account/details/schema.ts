import { z } from 'zod';
import { m } from '$lib/paraglide/messages.js';

export const emailSchema = z.object({
	email: z.email({ error: m.acctdetails_email_invalid() })
});

export const phoneSchema = z.object({
	phone: z
		.string()
		.min(5, { error: m.acctdetails_phone_invalid() })
		.max(32)
		.regex(/^[0-9+()\s-]+$/, { error: m.acctdetails_phone_format() })
});

export const addressSchema = z.object({
	line1: z.string().min(1, { error: m.acctdetails_line1_required() }).max(255),
	line2: z.string().max(255).optional(),
	city: z.string().min(1, { error: m.acctdetails_city_required() }).max(255).default('London'),
	postcode: z.string().min(1, { error: m.acctdetails_postcode_required() }).max(32)
});

export type EmailSchema = typeof emailSchema;
export type PhoneSchema = typeof phoneSchema;
export type AddressSchema = typeof addressSchema;
export type DetailsMessage = { type: 'success' | 'error'; text: string };
