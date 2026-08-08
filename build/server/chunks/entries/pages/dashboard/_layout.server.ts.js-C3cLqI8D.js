import { v as error, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/+layout.server.ts
var load = async ({ locals }) => {
	if (locals.user) {
		if (locals.role !== "Admin") return error(403, "Not Allowed");
	} else return redirect(302, "/login");
	return { name: locals?.user?.name };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-C3cLqI8D.js.map
