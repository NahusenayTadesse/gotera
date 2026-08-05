// import { encodeBase32LowerCase } from '@oslojs/encoding';

import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/ZodSchema';
import { redirect } from 'sveltekit-flash-message/server';
import { auth } from '$lib/server/auth';
import { m } from '$lib/paraglide/messages.js';

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	if (locals.user) {
		const roleName = (await parent()).roleName;

		if (roleName === 'Admin') {
			return redirect(302, '/dashboard');
		}else {
			 if(url.pathname === '/login'){
				redirect(302, '/account');
			 }
			 else {
			redirect(
			303,
			`/login?redirectTo=${encodeURIComponent(url.pathname + url.search)}`
		);
	}
}
	}
	const form = await superValidate(zod4(loginSchema));

	return { form };
};
import { APIError } from 'better-auth';

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event.request, zod4(loginSchema));
		if (!form.valid) {
			return message(
				form,
				{
					type: 'error',
					text: m.login_form_check_error()
				},
				{
					status: 500
				}
			);
		}

		const { email, password } = form.data;

		try {
			const result = await auth.api.signInEmail({
				body: {
					email,
					password,
					callbackURL: '/auth/verification-success'
				}
			});

			if (!result.user) {
				setError(form, 'email', m.login_invalid_credentials());
				setError(form, 'password', m.login_invalid_credentials());
				return message(
					form,
					{
						type: 'error',
						text: m.login_error_generic()
					},
					{
						status: 500
					}
				);
			}

			return message(form, {
				type: 'success',
				text: m.login_success()
			});
		} catch (error) {
			if (error instanceof APIError) {
				return message(
					form,
					{
						type: 'error',
						text: error?.message
					},
					{
						status: 500
					}
				);
			}
			return message(
				form,
				{
					type: 'error',
					text: m.login_action_failed()
				},
				{
					status: 500
				}
			);
		}
	}
};
