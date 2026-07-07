import { z } from 'zod/v4';

export const signupSchema = z
    .object({
        name: z.string().min(1,     'Your name is required.' ).max(255),
        email: z.email(  'Enter a valid email address.' ),
        password: z.string().min(8, 'Use at least 8 characters.' ).max(128),
        confirmPassword: z.string(),
        marketingOptIn: z.boolean().default(true)
    })
    .refine((v) => v.password === v.confirmPassword, {
        error: "Passwords don't match.",
        path: ['confirmPassword']
    });

export type SignupSchema = typeof signupSchema;
export type SignupMessage = { type: 'success' | 'error'; text: string };