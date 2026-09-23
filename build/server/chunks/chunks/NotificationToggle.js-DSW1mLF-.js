import { T as derived, $ as attr, a6 as escape_html } from './server.js-qDPizQqb.js';
import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#endregion
//#region src/lib/paraglide/messages/app_install_row.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} App_Install_RowInputs */
var en_app_install_row = () => {
	return `Install the app`;
};
var am_app_install_row = () => {
	return `መተግበሪያውን ይጫኑ`;
};
/**
* | output |
* | --- |
* | "Install the app" |
*
* @param {App_Install_RowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var app_install_row = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_app_install_row();
	return en_app_install_row();
});
//#endregion
//#region src/lib/components/InstallAppRow.svelte
function InstallAppRow($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let showHint = false;
		if (derived(() => true)()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div><button type="button" class="install-row svelte-13yhi"${attr("aria-expanded", showHint)}><svg class="install-icon svelte-13yhi" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 13.5h11"></path></svg> ${escape_html(app_install_row())}</button> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/NotificationToggle.svelte
function NotificationToggle($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}

export { InstallAppRow as I, NotificationToggle as N };
//# sourceMappingURL=NotificationToggle.js-DSW1mLF-.js.map
