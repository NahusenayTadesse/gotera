import { m as db, x as addons, a as asc } from '../../../../../chunks/db.js-CYNot06E.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-Ckfb53mn.js';
import { s as superValidate } from '../../../../../chunks/client2.js-DmssoQeq.js';
import { z as zod } from '../../../../../chunks/adapters.js-CmiyuZ8g.js';
import { a as addonSchema } from '../../../../../chunks/schema2.js-CulUwSfn.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-tK1slPtR.js';

//#region src/routes/dashboard/admin-panel/addons/+page.server.ts
var crud = contentCrud({
	table: addons,
	label: "Add-on",
	addSchema: addonSchema,
	editSchema: addonSchema
});
var load = async () => {
	const [form, rows] = await Promise.all([superValidate(zod(addonSchema)), db.select().from(addons).orderBy(asc(addons.sortOrder))]);
	return {
		form,
		rows
	};
};
var actions = crud.actions;

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BPqqX81I.js.map
