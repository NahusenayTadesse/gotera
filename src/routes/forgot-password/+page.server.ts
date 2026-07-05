import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { auth } from '$lib/server/auth';
import { magicLinkSchema, type MagicLinkMessage } from './schema';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/account');
	const form = await superValidate(zod4(magicLinkSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(magicLinkSchema));
		if (!form.valid) return fail(400, { form });

		try {
			// Triggers the magicLink plugin's sendMagicLink -> your GOTERA email.
			// (Endpoint: POST /sign-in/magic-link)
			await auth.api.signInMagicLink({
				body: {
					email: form.data.email,
					callbackURL: '/account' // where the link lands them after sign-in
				},
				headers: request.headers
			});
		} catch (e) {
			// Swallow the error on purpose: revealing "no such account" lets people
			// probe which emails are registered. Always report the same success.
			console.error('magic link send failed', e);
		}

		return message(form, {
			type: 'success',
			text: 'If that email has an account, a sign-in link is on its way.'
		} satisfies MagicLinkMessage);
	}
};