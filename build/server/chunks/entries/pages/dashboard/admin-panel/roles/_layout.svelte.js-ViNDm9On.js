import { p as page } from '../../../../../chunks/state.js-BDNoTQbo.js';
import { P as Plus } from '../../../../../chunks/plus.js-Dl_Aa2en.js';
import { S as Sheet } from '../../../../../chunks/sheet.js-Nx3txAkw.js';
import { B as Button } from '../../../../../chunks/button.js-DMlVoc1I.js';
import '../../../../../chunks/server.js-CPNQ0GBv.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/client.js-7a-rpZlk.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../chunks/utils2.js-BChetszu.js';

//#region src/routes/dashboard/admin-panel/roles/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		$$renderer.push(`<div class="mb-8 flex flex-row items-center justify-start gap-2">`);
		Button($$renderer, {
			href: "/dashboard/admin-panel/roles",
			variant: page.url.pathname === "/dashboard/admin-panel/roles" ? "default" : "outline",
			children: ($$renderer) => {
				Sheet($$renderer, {});
				$$renderer.push(`<!----> All Roles`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		Button($$renderer, {
			href: "/dashboard/admin-panel/roles/add-roles",
			variant: page.url.pathname === "/dashboard/admin-panel/roles/add-roles" ? "default" : "outline",
			children: ($$renderer) => {
				Plus($$renderer, {});
				$$renderer.push(`<!----> Add Roles`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-ViNDm9On.js.map
