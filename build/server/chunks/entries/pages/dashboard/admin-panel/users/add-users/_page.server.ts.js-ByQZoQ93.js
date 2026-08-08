import { m as db, u as user, j as eq, r as roles } from '../../../../../../chunks/db.js-BkD50_-0.js';
import { a as auth, A as APIError } from '../../../../../../chunks/auth.js-DZBRJAcg.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, m as message } from '../../../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../../../chunks/adapters.js-D4rGtFDl.js';
import { a as add } from '../../../../../../chunks/schema6.js-C9Wdqslf.js';
import '../../../../../../chunks/access.js-HgBsL8za.js';

//#region src/routes/dashboard/admin-panel/users/add-users/+page.server.ts
var load = async () => {
	return {
		form: await superValidate(zod(add)),
		allRoles: await db.select({
			value: roles.id,
			name: roles.name
		}).from(roles)
	};
};
var actions = { add: async (event) => {
	const form = await superValidate(event.request, zod(add));
	console.log(form);
	if (!form.valid) return message(form, {
		type: "error",
		text: "Please Check the form}"
	}, { status: 500 });
	const { name, email, password, role } = form.data;
	try {
		await db.transaction(async (tx) => {
			const newCustomer = await auth.api.createUser({ body: {
				email,
				password,
				name,
				role: role === 1 ? "admin" : "user"
			} });
			await tx.update(user).set({ roleId: 1 }).where(eq(user.id, newCustomer?.user.id));
		});
		return message(form, {
			type: "success",
			text: "User Added Successful!"
		});
	} catch (error) {
		console.error(error);
		if (error instanceof APIError) return message(form, {
			type: "error",
			text: error?.message
		}, { status: 500 });
		return message(form, {
			type: "error",
			text: "Registration Failed" + error?.message
		}, { status: 500 });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-ByQZoQ93.js.map
