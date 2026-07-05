import { z } from 'zod/v4';

export const magicLinkSchema = z.object({
	email: z.email( 'Enter a valid email address.')
});

export type MagicLinkSchema = typeof magicLinkSchema;
export type MagicLinkMessage = { type: 'success' | 'error'; text: string };