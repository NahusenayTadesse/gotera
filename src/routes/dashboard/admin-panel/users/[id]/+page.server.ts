import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { editUserSchema as schema } from './schema';

import { db } from '$lib/server/db';
import { roles, user, permissions, rolePermissions, session } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const singleUser = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			roleId: user.roleId,
			role: roles.name,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		})
		.from(user)
		.leftJoin(roles, eq(user.roleId, roles.id))
		.where(eq(user.id, id))
		.then((rows) => rows[0]);

	if (!singleUser) {
		error(404, { message: 'User not found' });
	}

	// Pre-fill the edit form server-side (the page used to assign these on the client,
	// which ran once and went stale on navigation between users).
	const form = await superValidate(
		{ name: singleUser.name, email: singleUser.email, role: singleUser.roleId ?? undefined },
		zod4(schema),
		{ errors: false }
	);

	const roleList = await db
		.select({
			value: roles.id,
			name: roles.name
		})
		.from(roles);

	const permissionList = await db
		.select({
			id: permissions.id,
			name: permissions.name,
			description: permissions.description
		})
		.from(permissions)
		.innerJoin(rolePermissions, eq(permissions.id, rolePermissions.permissionId))
		// A user with no role has no permissions; `eq(col, null)` would never match anyway.
		.where(singleUser.roleId === null ? sql`false` : eq(rolePermissions.roleId, singleUser.roleId));

	return {
		singleUser,
		id,
		form,
		roleList,
		permissionList
	};
};

// import { saveUploadedFile } from '$lib/server/upload';

export const actions: Actions = {
	editUser: async ({ request, cookies, params }) => {
		const form = await superValidate(request, zod4(schema));

		const { id } = params;

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { name, email, role } = form.data;

		try {
			const existingUser = await db
				.select()
				.from(user)
				.where(eq(user.email, email))
				.then((res) => res[0]);

			if (existingUser) {
				if (existingUser.id !== id) {
					setError(form, 'email', 'User with this email already exists, change your email.');
					return message(
						form,
						{
							type: 'error',
							text: 'User with this email already exists, change your email.'
						},
						{ status: 400 }
					);
				}
			}
			await db
				.update(user)
				.set({
					name,
					email,
					roleId: role
				})
				.where(eq(user.id, id));

			await db.delete(session).where(eq(session.userId, id));

			// Stay on the same page and set a flash message
			setFlash({ type: 'success', message: 'User Updated Successuflly Added' }, cookies);
			return message(form, { type: 'success', text: 'User Updated Successfully' });
		} catch (err) {
			// Driver/SQL errors are logged, never shown — they leak schema details.
			console.error('Error updating user:', err);
			setFlash({ type: 'error', message: 'User update failed. Please try again.' }, cookies);
			return message(
				form,
				{ type: 'error', text: 'User update failed. Please try again.' },
				{ status: 500 }
			);
		}
	},
	delete: async ({ cookies, params, locals }) => {
		const { id } = params;
		if (!id) {
			setFlash({ type: 'error', message: 'No user selected.' }, cookies);
			return fail(400, { message: 'No user selected.' });
		}

		// An admin deleting themselves (or the last admin) would lock everyone out of the
		// dashboard with no way back in short of editing the database.
		if (id === locals.user?.id) {
			setFlash({ type: 'error', message: "You can't delete your own account." }, cookies);
			return fail(400, { message: "You can't delete your own account." });
		}
		const [target] = await db
			.select({ role: roles.name })
			.from(user)
			.leftJoin(roles, eq(user.roleId, roles.id))
			.where(eq(user.id, id));
		if (target?.role === 'Admin') {
			const [{ admins }] = await db
				.select({ admins: sql<number>`count(*)` })
				.from(user)
				.innerJoin(roles, eq(user.roleId, roles.id))
				.where(eq(roles.name, 'Admin'));
			if (Number(admins) <= 1) {
				setFlash({ type: 'error', message: "You can't delete the last admin." }, cookies);
				return fail(400, { message: "You can't delete the last admin." });
			}
		}

		try {
			await db.delete(user).where(eq(user.id, id));
		} catch (err) {
			console.error('Error deleting user:', err);
			setFlash(
				{ type: 'error', message: 'Could not delete this user. Please try again.' },
				cookies
			);
			return fail(500, { message: 'Could not delete this user.' });
		}

		setFlash({ type: 'success', message: 'User Deleted Successfully!' }, cookies);
		redirect(303, '/dashboard/admin-panel/users');
	}
};
