import { a0 as head, a9 as escape_html } from '../../chunks/server.js-CPNQ0GBv.js';
import { p as page } from '../../chunks/state.js-BDNoTQbo.js';
import '../../chunks/shared.js-CgqsOrws.js';
import '../../chunks/client.js-7a-rpZlk.js';
import '../../chunks/exports.js-BT-QlP_6.js';
import '../../chunks/routing.js-CU5UDpt8.js';
import '../../chunks/index-server.js-C9rOfj9g.js';
import '../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../chunks/internal2.js-CNjKCACj.js';
import '../../chunks/legacy-client.js-CYlmvPew.js';
import '../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/+error.svelte
function _error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("1j96wlh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>GOTERA — Page not found</title>`);
			});
			$$renderer.push(`<meta charset="UTF-8" class="svelte-1j96wlh"/> <meta name="viewport" content="width=device-width,initial-scale=1.0" class="svelte-1j96wlh"/> <meta name="description" content="The page you were looking for could not be found." class="svelte-1j96wlh"/> <link rel="preconnect" href="https://fonts.googleapis.com" class="svelte-1j96wlh"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" class="svelte-1j96wlh"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&amp;family=Jost:wght@400;500;600&amp;display=swap" rel="stylesheet" class="svelte-1j96wlh"/>`);
		});
		$$renderer.push(`<section class="svelte-1j96wlh"><div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px var(--px);text-align:center" class="svelte-1j96wlh"><span style="font-family:var(--serif);font-size:6rem;color:rgb(181,98,42);line-height:1;display:block;margin-bottom:16px" class="svelte-1j96wlh">${escape_html(page.status)}</span> <h1 style="font-family:var(--serif);font-size:var(--t-h1);font-style:italic;margin-bottom:8px" class="svelte-1j96wlh">${escape_html(page.status === 404 ? "Page not found." : "An expected error occurred.")}</h1> <p style="font-size:.88rem;line-height:1.7;margin-bottom:28px" class="svelte-1j96wlh">${escape_html(page.status === 404 ? "The page you were looking for doesn't exist or has moved. Try one of these instead." : "An error occurred while loading the page.")}</p> <div style="width:100%;display:flex;flex-direction:column;gap:var(--gap-sm)" class="svelte-1j96wlh"><a href="/" class="btn btn--primary svelte-1j96wlh">Go to homepage</a> <a href="/subscribe" class="btn btn--outline svelte-1j96wlh">Subscribe to GOTERA</a> <a href="/faq" class="btn btn--ghost svelte-1j96wlh" style="font-size:.78rem">Read the FAQ</a></div></div></section>`);
	});
}

export { _error as default };
//# sourceMappingURL=_error.svelte.js-Br-sAOal.js.map
