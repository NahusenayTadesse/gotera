import { a9 as escape_html, a1 as html } from '../../../chunks/server.js-CPNQ0GBv.js';
import { p as page } from '../../../chunks/state.js-BDNoTQbo.js';
import { B as Button } from '../../../chunks/button.js-DMlVoc1I.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/utils2.js-BChetszu.js';

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
//# sourceMappingURL=_error.svelte.js-EXjOQ1e2.js.map
