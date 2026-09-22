import { m as db, q as plans, a as asc } from '../../../../chunks/db.js-BK-FhdZP.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-BEm1lywY.js';
import { s as superValidate } from '../../../../chunks/client2.js-CQ-oR-xa.js';
import { z as zod } from '../../../../chunks/adapters.js-CMDHikT3.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { c as contentCrud } from '../../../../chunks/crud.js-3Q0p13nW.js';
import { p as planSchema } from '../../../../chunks/schema11.js-DRMVgqk9.js';

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
//# sourceMappingURL=_page.server.ts.js-kwlhh_Eb.js.map
