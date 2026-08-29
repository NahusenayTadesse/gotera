import { a9 as escape_html } from './server.js-CPNQ0GBv.js';
import { L as Loader } from './scroll-area.js-DLUPG4gi.js';

//#region src/lib/components/Loading.svelte
function Loading($$renderer, $$props) {
	let { name } = $$props;
	$$renderer.push(`<div class="fixed z-1 flex flex-col justify-center top-0.5 bottom-0.5 left-0.5 right-0.5 w-auto items-center"><div class="flex flex-row gap-2 items-center">`);
	Loader($$renderer, { class: "animate-spin w-8 h-8" });
	$$renderer.push(`<!----><h1 class="animate-pulse capitalize">Loading ${escape_html(name)}...</h1></div></div>`);
}

export { Loading as L };
//# sourceMappingURL=Loading.js-BX8fCrei.js.map
