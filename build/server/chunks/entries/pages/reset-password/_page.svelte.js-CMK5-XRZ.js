import { a0 as head, a9 as escape_html, $ as attr, T as derived, ae as store_get, af as unsubscribe_stores } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { C as Circle_alert } from '../../../chunks/circle-alert.js-BYQ_-QxX.js';
import { p as page } from '../../../chunks/stores.js-DMULTZRY.js';
import '../../../chunks/auth-client.js-CohMcjxP.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../chunks/access.js-HgBsL8za.js';
import '../../../chunks/auth.js-DZBRJAcg.js';
import '../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../chunks/db.js-BkD50_-0.js';
import 'node:buffer';
import 'url';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'process';
import 'crypto';
import 'zlib';
import 'util';
import '../../../index.js-CNe0N484.js';
import '../../../chunks/internal.js-B6-4oVm4.js';
import '../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../chunks/dialect.js-DJNK594B.js';
import 'nodemailer';

//#region src/lib/paraglide/messages/resetpw_meta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Meta_TitleInputs */
var en_resetpw_meta_title = () => {
	return `Set a new password — GOTERA`;
};
var am_resetpw_meta_title = () => {
	return `አዲስ የይለፍ ቃል ያዘጋጁ — ጎተራ`;
};
/**
* | output |
* | --- |
* | "Set a new password — GOTERA" |
*
* @param {Resetpw_Meta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_meta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_meta_title();
	return en_resetpw_meta_title();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_eyebrow_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Eyebrow_InvalidInputs */
var en_resetpw_eyebrow_invalid = () => {
	return `Reset password`;
};
var am_resetpw_eyebrow_invalid = () => {
	return `የይለፍ ቃል ዳግም ማስጀመር`;
};
/**
* | output |
* | --- |
* | "Reset password" |
*
* @param {Resetpw_Eyebrow_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_eyebrow_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_eyebrow_invalid();
	return en_resetpw_eyebrow_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_invalid_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Invalid_HeadingInputs */
var en_resetpw_invalid_heading = () => {
	return `Invalid link.`;
};
var am_resetpw_invalid_heading = () => {
	return `ልክ ያልሆነ አገናኝ።`;
};
/**
* | output |
* | --- |
* | "Invalid link." |
*
* @param {Resetpw_Invalid_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_invalid_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_invalid_heading();
	return en_resetpw_invalid_heading();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_invalid_alert.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Invalid_AlertInputs */
var en_resetpw_invalid_alert = () => {
	return `This reset link is invalid or broken. Please request a new one.`;
};
var am_resetpw_invalid_alert = () => {
	return `ይህ ዳግም ማስጀመሪያ አገናኝ ልክ ያልሆነ ወይም የተበላሸ ነው። እባክዎ አዲስ ይጠይቁ።`;
};
/**
* | output |
* | --- |
* | "This reset link is invalid or broken. Please request a new one." |
*
* @param {Resetpw_Invalid_AlertInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_invalid_alert = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_invalid_alert();
	return en_resetpw_invalid_alert();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_request_new_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Request_New_LinkInputs */
var en_resetpw_request_new_link = () => {
	return `Request a new link`;
};
var am_resetpw_request_new_link = () => {
	return `አዲስ አገናኝ ይጠይቁ`;
};
/**
* | output |
* | --- |
* | "Request a new link" |
*
* @param {Resetpw_Request_New_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_request_new_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_request_new_link();
	return en_resetpw_request_new_link();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_EyebrowInputs */
var en_resetpw_eyebrow = () => {
	return `Create new password`;
};
var am_resetpw_eyebrow = () => {
	return `አዲስ የይለፍ ቃል ይፍጠሩ`;
};
/**
* | output |
* | --- |
* | "Create new password" |
*
* @param {Resetpw_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_eyebrow();
	return en_resetpw_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_HeadingInputs */
var en_resetpw_heading = () => {
	return `Reset password.`;
};
var am_resetpw_heading = () => {
	return `የይለፍ ቃል ዳግም ያስጀምሩ።`;
};
/**
* | output |
* | --- |
* | "Reset password." |
*
* @param {Resetpw_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_heading();
	return en_resetpw_heading();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_SubInputs */
var en_resetpw_sub = () => {
	return `Enter a secure new password for your account.`;
};
var am_resetpw_sub = () => {
	return `ለመለያዎ ደህንነቱ የተጠበቀ አዲስ የይለፍ ቃል ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a secure new password for your account." |
*
* @param {Resetpw_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_sub();
	return en_resetpw_sub();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_password_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Password_LabelInputs */
var en_resetpw_password_label = () => {
	return `New password`;
};
var am_resetpw_password_label = () => {
	return `አዲስ የይለፍ ቃል`;
};
/**
* | output |
* | --- |
* | "New password" |
*
* @param {Resetpw_Password_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_password_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_password_label();
	return en_resetpw_password_label();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_confirm_password_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Confirm_Password_LabelInputs */
var en_resetpw_confirm_password_label = () => {
	return `Confirm new password`;
};
var am_resetpw_confirm_password_label = () => {
	return `አዲስ የይለፍ ቃል ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Confirm new password" |
*
* @param {Resetpw_Confirm_Password_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_confirm_password_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_confirm_password_label();
	return en_resetpw_confirm_password_label();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_submit.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_SubmitInputs */
var en_resetpw_submit = () => {
	return `Reset password`;
};
var am_resetpw_submit = () => {
	return `የይለፍ ቃል ዳግም አስጀምር`;
};
/**
* | output |
* | --- |
* | "Reset password" |
*
* @param {Resetpw_SubmitInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_submit = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_submit();
	return en_resetpw_submit();
});
//#endregion
//#region src/lib/paraglide/messages/resetpw_back_to_signin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Resetpw_Back_To_SigninInputs */
var en_resetpw_back_to_signin = () => {
	return `Back to sign in`;
};
var am_resetpw_back_to_signin = () => {
	return `ወደ መግቢያ ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back to sign in" |
*
* @param {Resetpw_Back_To_SigninInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var resetpw_back_to_signin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_resetpw_back_to_signin();
	return en_resetpw_back_to_signin();
});
//#endregion
//#region src/routes/reset-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const token = derived(() => store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("token"));
		let password = "";
		let confirmPassword = "";
		let isLoading = false;
		const passwordsMatch = derived(() => true);
		const isPasswordValid = derived(() => false);
		const canSubmit = derived(() => passwordsMatch() && isPasswordValid() && !!token() && true);
		head("gimkg8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(resetpw_meta_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="auth-wrap svelte-gimkg8"><div class="auth-card svelte-gimkg8"><div class="logo-row svelte-gimkg8"><img src="/logo192.jpg" class="logo logo-light svelte-gimkg8" alt="GOTERA"/> <img src="/logoWhite.webp" class="logo logo-dark svelte-gimkg8" alt="GOTERA"/></div> `);
		if (!token()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="brand svelte-gimkg8"><span class="eyebrow svelte-gimkg8">${escape_html(resetpw_eyebrow_invalid())}</span> <h1 class="svelte-gimkg8">${escape_html(resetpw_invalid_heading())}</h1></div> <div class="alert svelte-gimkg8">`);
			Circle_alert($$renderer, { class: "alert-icon" });
			$$renderer.push(`<!----> <span>${escape_html(resetpw_invalid_alert())}</span></div> <a href="/forgot-password" class="btn btn-full svelte-gimkg8" style="margin-top:16px">${escape_html(resetpw_request_new_link())}</a>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="brand svelte-gimkg8"><span class="eyebrow svelte-gimkg8">${escape_html(resetpw_eyebrow())}</span> <h1 class="svelte-gimkg8">${escape_html(resetpw_heading())}</h1> <p class="sub svelte-gimkg8">${escape_html(resetpw_sub())}</p></div> <form class="form svelte-gimkg8">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="field svelte-gimkg8"><label class="field-label svelte-gimkg8" for="password">${escape_html(resetpw_password_label())}</label> <input id="password" type="password" class="input svelte-gimkg8" autocomplete="new-password"${attr("value", password)} required=""${attr("disabled", isLoading, true)}/> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-gimkg8"><label class="field-label svelte-gimkg8" for="confirmPassword">${escape_html(resetpw_confirm_password_label())}</label> <input id="confirmPassword" type="password" class="input svelte-gimkg8" autocomplete="new-password"${attr("value", confirmPassword)} required=""${attr("disabled", isLoading, true)}/> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <button type="submit" class="btn btn-full svelte-gimkg8"${attr("disabled", !canSubmit(), true)}>`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(resetpw_submit())}`);
			$$renderer.push(`<!--]--></button> <p class="alt svelte-gimkg8"><a href="/login" class="svelte-gimkg8">${escape_html(resetpw_back_to_signin())}</a></p></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CMK5-XRZ.js.map
