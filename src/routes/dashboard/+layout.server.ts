import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user) {
		const roleName = locals.role;
		if (roleName !== 'Admin') {
			return error(403, 'Not Allowed');
		}
	} else {
		return redirect(302, '/login');
	}

	const name = locals?.user?.name;



	return {
		name
	};
};
