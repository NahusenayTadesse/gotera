import { a9 as escape_html } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/authcb_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authcb_MessageInputs */
var en_authcb_message = () => {
	return `Signing you in… you can close this window.`;
};
var am_authcb_message = () => {
	return `እየገቡ ነው… ይህን መስኮት መዝጋት ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "Signing you in… you can close this window." |
*
* @param {Authcb_MessageInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authcb_message = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authcb_message();
	return en_authcb_message();
});
//#endregion
//#region src/routes/auth/popup-callback/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<p style="font-family: sans-serif; padding: 24px;">${escape_html(authcb_message())}</p>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-B3BAMVko.js.map
