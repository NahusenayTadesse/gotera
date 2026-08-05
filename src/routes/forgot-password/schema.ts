import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

export const magicLinkSchema = z.object({
	email: z.email(m.forgotpw_email_invalid())
});

export type MagicLinkSchema = typeof magicLinkSchema;
export type MagicLinkMessage = { type: 'success' | 'error'; text: string };