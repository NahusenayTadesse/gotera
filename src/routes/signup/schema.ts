import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

export const signupSchema = z
	.object({
		name: z.string().min(1,     m.signup_name_required() ).max(255),
		email: z.email(  m.signup_email_invalid() ),
		password: z.string().min(8, m.signup_password_min() ).max(128),
		confirmPassword: z.string(),
		marketingOptIn: z.boolean().default(true)
	})
	.refine((v) => v.password === v.confirmPassword, {
		error: m.signup_password_mismatch(),
		path: ['confirmPassword']
	});

export type SignupSchema = typeof signupSchema;
export type SignupMessage = { type: 'success' | 'error'; text: string };