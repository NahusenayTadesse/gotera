import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { APIError } from 'better-auth/api';

// Adjust to your project's paths.
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';

import { signupSchema, type SignupMessage } from './schema';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod4(signupSchema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(signupSchema));
		if (!form.valid) return fail(400, { form });

		const { name, email, password, marketingOptIn } = form.data;

		// 1) Create the Better Auth user (sends the verification email).
		let userId: string;
		try {
			const res = await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
					callbackURL: '/auth/verification-success'
				},
				headers: request.headers
			});
			userId = res.user.id;
		} catch (e) {
			// Better Auth throws APIError for things like "user already exists"
			// or a weak password — surface those on the relevant field.
			if (e instanceof APIError) {
				const msg = e.body?.message ?? 'Could not create your account.';
				return setError(form, 'email', msg);
			}
			console.error('signUpEmail failed', e);
			return message(
				form,
				{ type: 'error', text: 'Something went wrong. Please try again.' } satisfies SignupMessage,
				{ status: 500 }
			);
		}

		// 2) Link a subscriber row to the new user (as a pending lead).
		//    Requires: subscribers.plan nullable + 'pending' in the status enum.
		try {
			await db.insert(subscribers).values({
				userId,
				email,
				fullName: name,
				plan: null,
				status: 'pending',
				marketingOptIn
			});
		} catch (e) {
			// The account exists regardless; if this link fails, the /subscribe
			// upsert will create the subscriber later. Log and continue.
			console.error('subscriber link failed', e);
		}

		return message(
			form,
			{
				type: 'success',
				text: 'Account created. Check your email to verify.'
			} satisfies SignupMessage
		);
	}
};