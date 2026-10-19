import { m as db, r as roles, u as user, j as eq, s as sql, O as session, N as permissions, M as rolePermissions } from '../../../../../../chunks/db.js-1ke6Xzkd.js';
import { s as setFlash } from '../../../../../../chunks/server2.js-BivggJkG.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js--DCHVHjx.js';
import { f as fail$1, s as superValidate, a as setError, m as message } from '../../../../../../chunks/client2.js-74WMIpvZ.js';
import { z as zod } from '../../../../../../chunks/adapters.js-B-iKxR35.js';
import { e as editUserSchema } from '../../../../../../chunks/schema6.js-C7AiSPRt.js';
import { B as redirect, v as error } from '../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/admin-panel/users/[id]/+page.server.ts
var load = async ({ params }) => {
	const { id } = params;
	const singleUser = await db.select({
		id: user.id,
		name: user.name,
		email: user.email,
		roleId: user.roleId,
		role: roles.name,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	}).from(user).leftJoin(roles, eq(user.roleId, roles.id)).where(eq(user.id, id)).then((rows) => rows[0]);
	if (!singleUser) error(404, { message: "User not found" });
	return {
		singleUser,
		id,
		form: await superValidate({
			name: singleUser.name,
			email: singleUser.email,
			role: singleUser.roleId ?? void 0
		}, zod(editUserSchema), { errors: false }),
		roleList: await db.select({
			value: roles.id,
			name: roles.name
		}).from(roles),
		permissionList: await db.select({
			id: permissions.id,
			name: permissions.name,
			description: permissions.description
		}).from(permissions).innerJoin(rolePermissions, eq(permissions.id, rolePermissions.permissionId)).where(singleUser.roleId === null ? sql`false` : eq(rolePermissions.roleId, singleUser.roleId))
	};
};
var actions = {
	editUser: async ({ request, cookies, params }) => {
		const form = await superValidate(request, zod(editUserSchema));
		const { id } = params;
		if (!form.valid) {
			setFlash({
				type: "error",
				message: "Please check your form data."
			}, cookies);
			return fail$1(400, { form });
		}
		const { name, email, role } = form.data;
		try {
			const existingUser = await db.select().from(user).where(eq(user.email, email)).then((res) => res[0]);
			if (existingUser) {
				if (existingUser.id !== id) {
					setError(form, "email", "User with this email already exists, change your email.");
					return message(form, {
						type: "error",
						text: "User with this email already exists, change your email."
					}, { status: 400 });
				}
			}
			await db.update(user).set({
				name,
				email,
				roleId: role
			}).where(eq(user.id, id));
			await db.delete(session).where(eq(session.userId, id));
			setFlash({
				type: "success",
				message: "User Updated Successuflly Added"
			}, cookies);
			return message(form, {
				type: "success",
				text: "User Updated Successfully"
			});
		} catch (err) {
			console.error("Error updating user:", err);
			setFlash({
				type: "error",
				message: "User update failed. Please try again."
			}, cookies);
			return message(form, {
				type: "error",
				text: "User update failed. Please try again."
			}, { status: 500 });
		}
	},
	delete: async ({ cookies, params, locals }) => {
		const { id } = params;
		if (!id) {
			setFlash({
				type: "error",
				message: "No user selected."
			}, cookies);
			return fail$1(400, { message: "No user selected." });
		}
		if (id === locals.user?.id) {
			setFlash({
				type: "error",
				message: "You can't delete your own account."
			}, cookies);
			return fail$1(400, { message: "You can't delete your own account." });
		}
		const [target] = await db.select({ role: roles.name }).from(user).leftJoin(roles, eq(user.roleId, roles.id)).where(eq(user.id, id));
		if (target?.role === "Admin") {
			const [{ admins }] = await db.select({ admins: sql`count(*)` }).from(user).innerJoin(roles, eq(user.roleId, roles.id)).where(eq(roles.name, "Admin"));
			if (Number(admins) <= 1) {
				setFlash({
					type: "error",
					message: "You can't delete the last admin."
				}, cookies);
				return fail$1(400, { message: "You can't delete the last admin." });
			}
		}
		try {
			await db.delete(user).where(eq(user.id, id));
		} catch (err) {
			console.error("Error deleting user:", err);
			setFlash({
				type: "error",
				message: "Could not delete this user. Please try again."
			}, cookies);
			return fail$1(500, { message: "Could not delete this user." });
		}
		setFlash({
			type: "success",
			message: "User Deleted Successfully!"
		}, cookies);
		redirect(303, "/dashboard/admin-panel/users");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CB3ymLj0.js.map
