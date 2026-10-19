import { z } from 'zod';
import { MAX_ADDON_QTY } from '$lib/addons';

/** Most distinct lines one basket can hold — far above any real order, it just bounds the post. */
export const MAX_BASKET_LINES = 30;

/**
 * Checkout for add-ons bought on their own from /addons.
 *
 * Prices are never posted: the server re-reads every line from the catalogue, so all the
 * client sends is which add-ons, how many, and where to deliver them.
 */
export const addonShopSchema = z.object({
	items: z
		.array(
			z.object({
				id: z.string().min(1),
				quantity: z.coerce.number().int().min(1).max(MAX_ADDON_QTY)
			})
		)
		.min(1, { error: 'Your basket is empty.' })
		.max(MAX_BASKET_LINES)
		.default([]),

	recipientName: z.string().trim().min(1, { error: 'Enter the name for the delivery.' }).max(255),
	// Optional when signed in: the account's email is used instead.
	email: z.preprocess(
		(v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
		z.email({ error: 'Enter a valid email address.' }).optional()
	),
	phone: z.string().trim().max(32).default(''),
	line1: z.string().trim().min(1, { error: 'Enter the first line of the address.' }).max(255),
	line2: z.string().trim().max(255).optional(),
	city: z.string().trim().max(255).default('London'),
	postcode: z.string().trim().min(1, { error: 'Enter a London postcode.' }).max(32),

	// Best-effort centroid from the postcode field's background lookup. See /subscribe.
	latitude: z.coerce.number().optional(),
	longitude: z.coerce.number().optional()
});

export type AddonShopSchema = typeof addonShopSchema;
export type ShopMessage = { type: 'success' | 'error'; text: string };
