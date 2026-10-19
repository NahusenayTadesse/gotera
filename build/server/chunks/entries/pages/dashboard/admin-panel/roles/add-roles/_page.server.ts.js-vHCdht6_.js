import { m as db, r as roles } from '../../../../../../chunks/db.js-1ke6Xzkd.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js--DCHVHjx.js';
import { s as superValidate, m as message, a as setError } from '../../../../../../chunks/client2.js-74WMIpvZ.js';
import { z as zod } from '../../../../../../chunks/adapters.js-B-iKxR35.js';
import { c as createRoleSchema } from '../../../../../../chunks/schema5.js-B8LxTRqo.js';

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
	const { name, description } = form.data;
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
		const e = err;
		if (e.code === "ER_DUP_ENTRY" || e.cause?.code === "ER_DUP_ENTRY") return setError(form, "name", "Role Name already exists.");
		console.error("Error adding role:", err);
		return message(form, {
			type: "error",
			text: "Could not add the role. Please try again."
		}, { status: 500 });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-vHCdht6_.js.map
