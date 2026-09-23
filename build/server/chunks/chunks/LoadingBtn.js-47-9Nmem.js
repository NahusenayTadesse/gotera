import { a6 as escape_html } from './server.js-qDPizQqb.js';
import { L as Loader } from './scroll-area.js-DExXIpxT.js';

//#region src/lib/formComponents/LoadingBtn.svelte
function LoadingBtn($$renderer, $$props) {
	let { name } = $$props;
	$$renderer.push(`<div class="flex flex-row gap-2 align-self-center justify-self-center-safe items-center">`);
	Loader($$renderer, { class: "animate-spin w-6 h-6" });
	$$renderer.push(`<!----> <span class="animate-pulse">${escape_html(name)}...</span></div>`);
}

export { LoadingBtn as L };
//# sourceMappingURL=LoadingBtn.js-47-9Nmem.js.map
