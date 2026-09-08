import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { APIError } from 'better-auth/api';

// Adjust to your project's paths.
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

import { signupSchema, type SignupMessage } from './schema';
import { m } from '$lib/paraglide/messages.js';

export const load: PageServerLoad = async ({ locals }) => {
	// Send an already-signed-in visitor somewhere useful. This previously redirected to
	// `/signup?redirectTo=<current url>` — whose target is /signup itself, so `load` ran
	// again, redirected again, and nested the query string until the browser gave up with
	// "too many redirects".
	if (locals.user) {
		redirect(303, '/account');
	}
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
				const msg = e.body?.message ?? m.signup_create_account_error();
				return setError(form, 'email', msg);
			}
			console.error('signUpEmail failed', e);
			return message(
				form,
				{ type: 'error', text: m.signup_generic_error() } satisfies SignupMessage,
				{ status: 500 }
			);
		}

		// 2) Record the marketing choice on the subscriber row.
		//
		//    The row itself is created by the `databaseHooks.user.create.after` hook in
		//    auth.ts, which runs for every signup route (email, Google, magic link). This
		//    action used to insert it a second time, which always failed on
		//    `subscribers_user_id_unique` and logged a misleading "subscriber link failed".
		//    The hook can't see the form, so it defaults marketingOptIn to true — this is
		//    the only place the user's actual choice is known, so apply it here.
		try {
			await db
				.update(subscribers)
				.set({ marketingOptIn })
				.where(eq(subscribers.userId, userId));
		} catch (e) {
			// The account exists regardless; a failure here only means the preference
			// stayed at its default. Log and continue.
			console.error('subscriber marketing preference update failed', e);
		}

		return message(
			form,
			{
				type: 'success',
				text: m.signup_success_message()
			} satisfies SignupMessage
		);
	}
};