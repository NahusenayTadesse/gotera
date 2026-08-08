import { m as db, q as plans, a as asc } from '../../../../chunks/db.js-BkD50_-0.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate } from '../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { p as parseJsonColumn } from '../../../../chunks/format.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../chunks/crud.js-BtBdbhhX.js';
import { p as planSchema } from '../../../../chunks/schema12.js-DRMVgqk9.js';

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
//# sourceMappingURL=_page.server.ts.js-xSK7ZH74.js.map
