import { m as db, u as user, j as eq, D as session, r as roles, E as permissions, C as rolePermissions } from '../../../../../../chunks/db.js-BkD50_-0.js';
import { s as setFlash } from '../../../../../../chunks/server2.js-BivggJkG.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-7a-rpZlk.js';
import { f as fail$1, m as message, s as superValidate } from '../../../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../../../chunks/adapters.js-D4rGtFDl.js';
import { e as editUserSchema } from '../../../../../../chunks/schema5.js-CmbfZ513.js';
import { v as error } from '../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/admin-panel/users/[id]/+page.server.ts
var load = async ({ params }) => {
	const { id } = params;
	const form = await superValidate(zod(editUserSchema));
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
		form,
		roleList: await db.select({
			value: roles.id,
			name: roles.name
		}).from(roles),
		permissionList: await db.select({
			id: permissions.id,
			name: permissions.name,
			description: permissions.description
		}).from(permissions).innerJoin(rolePermissions, eq(permissions.id, rolePermissions.permissionId)).where(eq(rolePermissions.roleId, singleUser.roleId))
	};
};
var actions = {
	editUser: async ({ request, cookies, locals, params }) => {
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
			setFlash({
				type: "error",
				message: "User Update Failed: " + err?.message
			}, cookies);
			return message(form, {
				type: "error",
				text: "User Update Failed " + err?.message
			});
		}
	},
	delete: async ({ cookies, params }) => {
		const { id } = params;
		try {
			if (!id) {
				setFlash({
					type: "error",
					message: `Unexpected Error: ${err?.message}`
				}, cookies);
				return fail$1(400);
			}
			await db.delete(user).where(eq(user.id, id));
			setFlash({
				type: "success",
				message: "User Deleted Successfully!"
			}, cookies);
		} catch (err) {
			console.error("Error deleting user:", err);
			setFlash({
				type: "error",
				message: `Unexpected Error: ${err?.message}`
			}, cookies);
			return message(form, {
				type: "error",
				text: "Unexpected Error: " + err?.message
			});
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-50Y3PnxR.js.map
