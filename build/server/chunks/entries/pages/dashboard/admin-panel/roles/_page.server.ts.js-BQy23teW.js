import { m as db, r as roles, c as count, u as user, j as eq } from '../../../../../chunks/db.js-BkD50_-0.js';

//#region src/routes/dashboard/admin-panel/roles/+page.server.ts
var load = async () => {
	return { roleList: await db.select({
		id: roles.id,
		name: roles.name,
		description: roles.description,
		userCount: count(user.id),
		status: roles.isActive
	}).from(roles).leftJoin(user, eq(user.roleId, roles.id)).groupBy(roles.id) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BQy23teW.js.map
