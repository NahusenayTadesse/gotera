import { m as db, H as countDistinct, u as user, j as eq, M as rolePermissions, r as roles, N as permissions } from '../../../../../../chunks/db.js-C0XyR4ft.js';
import { s as setFlash } from '../../../../../../chunks/server2.js-BivggJkG.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-C3Iq_YCw.js';
import { f as fail$1, s as superValidate, m as message, a as setError } from '../../../../../../chunks/client2.js-P7rUUC6q.js';
import { z as zod } from '../../../../../../chunks/adapters.js-DtwKAq2A.js';
import { e as editRoleSchema } from '../../../../../../chunks/schema4.js-DsPYyR1F.js';
import { v as error } from '../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/admin-panel/roles/[id]/+page.server.ts
var load = async ({ params }) => {
	const { id } = params;
	const singleUser = await db.select({
		id: roles.id,
		name: roles.name,
		description: roles.description,
		userCount: countDistinct(user.id),
		permissionsCount: countDistinct(rolePermissions.id)
	}).from(roles).leftJoin(user, eq(user.roleId, roles.id)).leftJoin(rolePermissions, eq(rolePermissions.roleId, roles.id)).groupBy(roles.id).where(eq(roles.id, Number(id))).then((rows) => rows[0]);
	if (!singleUser) error(404, { message: "Role not found" });
	const [userList, allPermissions, permissionList] = await Promise.all([
		db.select({
			id: user.id,
			email: user.email,
			name: user.name
		}).from(user).where(eq(user.roleId, Number(id))),
		db.select({
			value: permissions.id,
			name: permissions.name
		}).from(permissions),
		db.select({
			id: permissions.id,
			name: permissions.name,
			description: permissions.description
		}).from(permissions).innerJoin(rolePermissions, eq(rolePermissions.permissionId, permissions.id)).where(eq(rolePermissions.roleId, Number(id)))
	]);
	return {
		singleUser,
		id,
		form: await superValidate({
			name: singleUser.name,
			description: singleUser.description ?? "",
			permissions: permissionList.map((p) => String(p.id))
		}, zod(editRoleSchema), { errors: false }),
		userList,
		allPermissions,
		permissionList
	};
};
var isDuplicateKey = (err) => {
	const e = err;
	return e?.code === "ER_DUP_ENTRY" || e?.cause?.code === "ER_DUP_ENTRY";
};
var actions = {
	edit: async ({ request, params }) => {
		const roleId = Number(params.id);
		const form = await superValidate(request, zod(editRoleSchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Please check the form for Errors"
		}, { status: 400 });
		const { name, description, permissions: permissionIds } = form.data;
		try {
			await db.transaction(async (tx) => {
				await tx.update(roles).set({
					name,
					description
				}).where(eq(roles.id, roleId));
				await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
				await tx.insert(rolePermissions).values(permissionIds.map((permId) => ({
					roleId,
					permissionId: Number(permId)
				})));
			});
			return message(form, {
				type: "success",
				text: "Role updated successfully."
			});
		} catch (err) {
			if (isDuplicateKey(err)) return setError(form, "name", "Role Name is already taken.");
			console.error("Error updating role:", err);
			return message(form, {
				type: "error",
				text: "Could not update the role. Please try again."
			}, { status: 500 });
		}
	},
	delete: async ({ params, cookies }) => {
		const roleId = Number(params.id);
		const [{ users }] = await db.select({ users: countDistinct(user.id) }).from(user).where(eq(user.roleId, roleId));
		if (Number(users) > 0) {
			setFlash({
				type: "error",
				message: "Cannot delete a role that still has users."
			}, cookies);
			return fail$1(400, { message: "Cannot delete a role that still has users." });
		}
		try {
			await db.transaction(async (tx) => {
				await tx.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
				await tx.delete(roles).where(eq(roles.id, roleId));
			});
		} catch (err) {
			console.error("Error deleting role:", err);
			setFlash({
				type: "error",
				message: "Could not delete the role. Please try again."
			}, cookies);
			return fail$1(500, { message: "Could not delete the role." });
		}
		setFlash({
			type: "success",
			message: "Role Deleted Successfully!"
		}, cookies);
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-D24sMrfp.js.map
