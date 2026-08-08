import { a9 as escape_html } from './server.js-CPNQ0GBv.js';
import { L as Loader } from './scroll-area.js-DLUPG4gi.js';

//#region src/lib/formComponents/LoadingBtn.svelte
function LoadingBtn($$renderer, $$props) {
	let { name } = $$props;
	$$renderer.push(`<div class="flex flex-row gap-2 align-self-center justify-self-center-safe items-center">`);
	Loader($$renderer, { class: "animate-spin w-6 h-6" });
	$$renderer.push(`<!----> <span class="animate-pulse">${escape_html(name)}...</span></div>`);
}

export { LoadingBtn as L };
//# sourceMappingURL=LoadingBtn.js-CvQQ0uH0.js.map
