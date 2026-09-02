import { m as db, q as plans, a as asc } from '../../../../chunks/db.js-DE8Uq6gc.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CUxYxBeU.js';
import { s as superValidate } from '../../../../chunks/client2.js-BDO3j3-U.js';
import { z as zod } from '../../../../chunks/adapters.js-Ck7E6IvP.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../chunks/crud.js-D6eLu6qQ.js';
import { p as planSchema } from '../../../../chunks/schema12.js-BIEUF72F.js';

//#region src/routes/dashboard/plans/+page.server.ts
var crud = contentCrud({
	table: plans,
	label: "Plan",
	addSchema: planSchema,
	editSchema: planSchema,
	listFields: ["bullets"]
});
var load = async () => {
	const [form, rawRows] = await Promise.all([superValidate(zod(planSchema)), db.select().from(plans).orderBy(asc(plans.sortOrder))]);
	return {
		form,
		rows: rawRows.map((p) => ({
			...p,
			bullets: parseJsonColumn(p.bullets, [])
		}))
	};
};
var actions = crud.actions;

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-0-LEuXkG.js.map
