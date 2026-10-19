import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

export const PARTNER_CATEGORIES = [
	'restaurant',
	'shop',
	'caterer',
	'community',
	'corporate',
	'other'
] as const;
export const SUPPLIER_CATEGORIES = [
	'teff',
	'spices',
	'produce',
	'packaging',
	'logistics',
	'other'
] as const;

export const partnerSchema = z
	.object({
		type: z.enum(['partner', 'supplier']).default('partner'),
		businessName: z.string().trim().min(2, m.partners_err_business()).max(255),
		contactName: z.string().trim().min(2, m.partners_err_contact()).max(255),
		email: z.email(m.partners_err_email()).max(255),
		phone: z.string().trim().max(40).optional().default(''),
		website: z.string().trim().max(255).optional().default(''),
		city: z.string().trim().max(120).optional().default(''),
		postcode: z.string().trim().max(16).optional().default(''),
		category: z.string().min(1, m.partners_err_category()),
		message: z.string().trim().min(20, m.partners_err_message()).max(2000),
		consent: z.boolean().refine((v) => v, m.partners_err_consent()).default(false),
		// Honeypot — real people never see or fill this.
		company_url: z.string().optional().default('')
	})
	.refine(
		(d) =>
			(d.type === 'partner' ? PARTNER_CATEGORIES : SUPPLIER_CATEGORIES).includes(
				d.category as never
			),
		{ message: m.partners_err_category(), path: ['category'] }
	);

export type PartnerSchema = typeof partnerSchema;
export type PartnerMessage = { type: 'success' | 'error'; text: string };
