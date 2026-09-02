import { m as db, r as roles, y as countDistinct, C as rolePermissions, u as user, k as and, j as eq } from '../../../../../../chunks/db.js-DE8Uq6gc.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-CUxYxBeU.js';
import { s as superValidate } from '../../../../../../chunks/client2.js-BDO3j3-U.js';
import { z as zod } from '../../../../../../chunks/adapters.js-Ck7E6IvP.js';
import { e as editRoleSchema } from '../../../../../../chunks/schema3.js-CzmmwLln.js';
import { v as error } from '../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/admin-panel/roles/[id]/+page.server.ts
var load = async ({ params }) => {
	const { id } = params;
	const form = await superValidate(zod(editRoleSchema));
	const singleUser = await db.select({
		id: roles.id,
		name: roles.name,
		description: roles.description,
		userCount: countDistinct(user.id),
		permissionsCount: countDistinct(rolePermissions.id)
	}).from(roles).leftJoin(user, and(eq(user.roleId, roles.id))).leftJoin(rolePermissions, eq(rolePermissions.roleId, roles.id)).groupBy(roles.id).where(eq(roles.id, Number(id))).then((rows) => rows[0]);
	if (!singleUser) return error(404, { message: "Role not found" });
	return {
		singleUser,
		id,
		form,
		userList: await db.select({
			id: user.id,
			email: user.email,
			name: user.name
		}).from(user).where(eq(user.roleId, Number(id)))
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CtLBlwn8.js.map
