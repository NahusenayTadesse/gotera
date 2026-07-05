import type { Actions } from "./$types";
import { auth } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";

export const actions: Actions = {
	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};