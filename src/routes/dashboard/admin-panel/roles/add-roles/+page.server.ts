import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { createRoleSchema as schema } from './schema';
import { db } from '$lib/server/db';
import { roles } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));

	return {
		form
	};
};

export const actions: Actions = {
	add: async ({ request }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const { name, description } = form.data;

		try {
			await db.insert(roles).values({ name, description });

			// await db.insert(rolePermissions).values(
			// 	permissions.map((permId) => ({
			// 		roleId: role.id,
			// 		permissionId: Number(permId)
			// 	}))
			// );

			return message(form, { type: 'success', text: 'Role added successfully.' });
		} catch (err) {
			// drizzle may wrap the driver error, so check its cause too.
			const e = err as { code?: string; cause?: { code?: string } };
			if (e.code === 'ER_DUP_ENTRY' || e.cause?.code === 'ER_DUP_ENTRY') {
				return setError(form, 'name', 'Role Name already exists.');
			}
			console.error('Error adding role:', err);
			return message(form, { type: 'error', text: 'Could not add the role. Please try again.' }, { status: 500 });
		}
	}
} satisfies Actions;
