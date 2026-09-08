import { m as db, r as roles } from '../../../../../../chunks/db.js-QS2RGzZQ.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-CMe7fg5E.js';
import { s as superValidate, m as message, a as setError } from '../../../../../../chunks/client2.js-nubrWqZa.js';
import { z as zod } from '../../../../../../chunks/adapters.js-D3ccRgef.js';
import { c as createRoleSchema } from '../../../../../../chunks/schema4.js-CDByCHRW.js';

//#region src/routes/dashboard/admin-panel/roles/add-roles/+page.server.ts
var load = async () => {
	return { form: await superValidate(zod(createRoleSchema)) };
};
var actions = { add: async ({ request }) => {
	const form = await superValidate(request, zod(createRoleSchema));
	if (!form.valid) return message(form, {
		type: "error",
		text: "Please check the form for Errors"
	});
	const { name, description, permissions } = form.data;
	try {
		await db.insert(roles).values({
			name,
			description
		});
		return message(form, {
			type: "success",
			text: "Role added successfully."
		});
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY") return setError(form, "name", "Role Name already exists.");
		return message(form, {
			type: "error",
			text: err.code === "ER_DUP_ENTRY" ? "Role Name is already taken. Please choose another one." : err.message
		});
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BapOQcq1.js.map
