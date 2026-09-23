import { a6 as escape_html, a1 as html } from '../../../chunks/server.js-qDPizQqb.js';
import { p as page } from '../../../chunks/state.js-B8LH1nIO.js';
import { B as Button } from '../../../chunks/button.js-DWWbYMWk.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/client.js-CWf6uOE8.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CJYUshuD.js';
import '../../../chunks/index-server.js-CaywUnPA.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/utils2.js-BmcH287A.js';

//#region src/routes/dashboard/+error.svelte
function _error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="w-full h-full flex flex-col justify-center items-center"><h1 class="text-red-600 text-5xl">${escape_html(page.status)}</h1> <h3 class="text-red-600 font-head text-2xl">${html(page.error?.message)}</h3> `);
		Button($$renderer, {
			href: "/dashboard",
			children: ($$renderer) => {
				$$renderer.push(`<!---->Back to Dashboard`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}

export { _error as default };
//# sourceMappingURL=_error.svelte.js-B-L3RoJr.js.map
