import { message, superValidate, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { editRoleSchema as schema } from './schema';

import { db } from '$lib/server/db';
import { roles, user, rolePermissions, permissions } from '$lib/server/db/schema';
import { eq, countDistinct } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const singleUser = await db
		.select({
			id: roles.id,
			name: roles.name,
			description: roles.description,
			userCount: countDistinct(user.id),
			permissionsCount: countDistinct(rolePermissions.id)
		})
		.from(roles)
		.leftJoin(user, eq(user.roleId, roles.id))
		.leftJoin(rolePermissions, eq(rolePermissions.roleId, roles.id))
		.groupBy(roles.id)
		.where(eq(roles.id, Number(id)))
		.then((rows) => rows[0]);

	if (!singleUser) {
		error(404, { message: 'Role not found' });
	}

	const [userList, allPermissions, permissionList] = await Promise.all([
		db
			.select({ id: user.id, email: user.email, name: user.name })
			.from(user)
			.where(eq(user.roleId, Number(id))),
		// Checkbox options for the edit form.
		db.select({ value: permissions.id, name: permissions.name }).from(permissions),
		db
			.select({ id: permissions.id, name: permissions.name, description: permissions.description })
			.from(permissions)
			.innerJoin(rolePermissions, eq(rolePermissions.permissionId, permissions.id))
			.where(eq(rolePermissions.roleId, Number(id)))
	]);

	// Pre-fill the edit form with the role as it is now.
	const form = await superValidate(
		{
			name: singleUser.name,
			description: singleUser.description ?? '',
			permissions: permissionList.map((p) => String(p.id))
		},
		zod4(schema),
		{ errors: false }
	);

	return {
		singleUser,
		id,
		form,
		userList,
		allPermissions,
		permissionList
	};
};

const isDuplicateKey = (err: unknown) => {
	const e = err as { code?: string; cause?: { code?: string } };
	return e?.code === 'ER_DUP_ENTRY' || e?.cause?.code === 'ER_DUP_ENTRY';
};

export const actions: Actions = {
	edit: async ({ request, params }) => {
		const roleId = Number(params.id);
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for Errors' },
				{ status: 400 }
			);
		}

		const { name, description, permissions: permissionIds } = form.data;

		try {
			// Name, description and the permission set change together or not at all.
			await db.transaction(async (tx) => {
				await tx.update(roles).set({ name, description }).where(eq(roles.id, roleId));
				await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
				await tx
					.insert(rolePermissions)
					.values(permissionIds.map((permId) => ({ roleId, permissionId: Number(permId) })));
			});
			return message(form, { type: 'success', text: 'Role updated successfully.' });
		} catch (err) {
			if (isDuplicateKey(err)) return setError(form, 'name', 'Role Name is already taken.');
			console.error('Error updating role:', err);
			return message(
				form,
				{ type: 'error', text: 'Could not update the role. Please try again.' },
				{ status: 500 }
			);
		}
	},

	delete: async ({ params, cookies }) => {
		const roleId = Number(params.id);

		// Users point at their role; deleting it would orphan them (the page hides the
		// button in that case, but the action mustn't rely on the UI).
		const [{ users }] = await db
			.select({ users: countDistinct(user.id) })
			.from(user)
			.where(eq(user.roleId, roleId));
		if (Number(users) > 0) {
			setFlash({ type: 'error', message: 'Cannot delete a role that still has users.' }, cookies);
			return fail(400, { message: 'Cannot delete a role that still has users.' });
		}

		try {
			await db.transaction(async (tx) => {
				await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
				await tx.delete(roles).where(eq(roles.id, roleId));
			});
		} catch (err) {
			console.error('Error deleting role:', err);
			setFlash({ type: 'error', message: 'Could not delete the role. Please try again.' }, cookies);
			return fail(500, { message: 'Could not delete the role.' });
		}

		setFlash({ type: 'success', message: 'Role Deleted Successfully!' }, cookies);
		return { success: true };
	}
} satisfies Actions;
