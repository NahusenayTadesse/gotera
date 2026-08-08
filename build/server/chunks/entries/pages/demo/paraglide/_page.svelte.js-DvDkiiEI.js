import { a9 as escape_html } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/hello_world.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Hello_WorldInputs */
var en_hello_world = (i) => {
	return `Hello, ${i?.name} from en!`;
};
var am_hello_world = (i) => {
	return `Hello, ${i?.name} from am!`;
};
/**
* | output |
* | --- |
* | "Hello, {name} from en!" |
*
* @param {Hello_WorldInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var hello_world = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_hello_world(inputs);
	return en_hello_world(inputs);
});
//#endregion
//#region src/routes/demo/paraglide/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<h1>${escape_html(hello_world({ name: "SvelteKit User" }))}</h1> <div><button>en</button> <button>am</button></div> <p>If you use VSCode, install the <a href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension" target="_blank">Sherlock i18n extension</a> for a better i18n experience.</p>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DvDkiiEI.js.map
