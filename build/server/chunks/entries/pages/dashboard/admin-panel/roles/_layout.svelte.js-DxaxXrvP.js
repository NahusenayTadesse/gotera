import { p as page } from '../../../../../chunks/state.js-B8LH1nIO.js';
import { P as Plus } from '../../../../../chunks/plus.js-l9nzajpf.js';
import { S as Sheet } from '../../../../../chunks/sheet.js-8NUjIyFf.js';
import { B as Button } from '../../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../../chunks/server.js-qDPizQqb.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/client.js-CWf6uOE8.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../chunks/utils2.js-BmcH287A.js';

//#region src/routes/dashboard/admin-panel/roles/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		$$renderer.push(`<div class="mb-6 flex w-full min-w-0 flex-row flex-wrap items-center justify-start gap-2 sm:mb-8">`);
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
//# sourceMappingURL=_layout.svelte.js-DxaxXrvP.js.map
