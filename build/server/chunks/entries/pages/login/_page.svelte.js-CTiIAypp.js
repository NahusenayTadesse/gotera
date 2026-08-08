import { a0 as head, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores, T as derived, a6 as spread_props } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { I as Icon } from '../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import { b as superForm } from '../../../chunks/client2.js--SBYKgBt.js';
import '../../../chunks/ZodSchema.js-B2IFjPeP.js';
import '../../../chunks/auth-client.js-CohMcjxP.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/forms.js-1iUoLEd8.js';
import '../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../chunks/stores.js-DMULTZRY.js';
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
import 'node:events';
import '../../../chunks/dialect.js-DJNK594B.js';
import 'nodemailer';

//#region node_modules/@lucide/svelte/dist/icons/eye.svelte
function Eye($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "eye" },
		props,
		{ iconNode: [["path", { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", {
			"cx": "12",
			"cy": "12",
			"r": "3"
		}]] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/login_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_Page_TitleInputs */
var en_login_page_title = () => {
	return `Login`;
};
var am_login_page_title = () => {
	return `ግባ`;
};
/**
* | output |
* | --- |
* | "Login" |
*
* @param {Login_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_page_title();
	return en_login_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_EyebrowInputs */
var en_loginform_eyebrow = () => {
	return `Welcome back`;
};
var am_loginform_eyebrow = () => {
	return `እንኳን ደህና መጡ`;
};
/**
* | output |
* | --- |
* | "Welcome back" |
*
* @param {Loginform_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_eyebrow();
	return en_loginform_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_TitleInputs */
var en_loginform_title = () => {
	return `Sign in.`;
};
var am_loginform_title = () => {
	return `ግባ።`;
};
/**
* | output |
* | --- |
* | "Sign in." |
*
* @param {Loginform_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_title();
	return en_loginform_title();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_SubtitleInputs */
var en_loginform_subtitle = () => {
	return `Enter your email to access your account.`;
};
var am_loginform_subtitle = () => {
	return `ወደ መለያዎ ለመግባት ኢሜይልዎን ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter your email to access your account." |
*
* @param {Loginform_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_subtitle();
	return en_loginform_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_google_continue.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Google_ContinueInputs */
var en_loginform_google_continue = () => {
	return `Continue with Google`;
};
var am_loginform_google_continue = () => {
	return `በGoogle ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Loginform_Google_ContinueInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_google_continue = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_google_continue();
	return en_loginform_google_continue();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_divider_or.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Divider_OrInputs */
var en_loginform_divider_or = () => {
	return `or`;
};
var am_loginform_divider_or = () => {
	return `ወይም`;
};
/**
* | output |
* | --- |
* | "or" |
*
* @param {Loginform_Divider_OrInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_divider_or = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_divider_or();
	return en_loginform_divider_or();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Email_LabelInputs */
var en_loginform_email_label = () => {
	return `Email`;
};
var am_loginform_email_label = () => {
	return `ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Loginform_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_email_label();
	return en_loginform_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_email_placeholder.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Email_PlaceholderInputs */
var en_loginform_email_placeholder = () => {
	return `m@example.com`;
};
var am_loginform_email_placeholder = () => {
	return `m@example.com`;
};
/**
* | output |
* | --- |
* | "m@example.com" |
*
* @param {Loginform_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_email_placeholder = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_email_placeholder();
	return en_loginform_email_placeholder();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_password_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Password_LabelInputs */
var en_loginform_password_label = () => {
	return `Password`;
};
var am_loginform_password_label = () => {
	return `የይለፍ ቃል`;
};
/**
* | output |
* | --- |
* | "Password" |
*
* @param {Loginform_Password_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_password_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_password_label();
	return en_loginform_password_label();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_forgot_password.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Forgot_PasswordInputs */
var en_loginform_forgot_password = () => {
	return `Forgot your password?`;
};
var am_loginform_forgot_password = () => {
	return `የይለፍ ቃልዎን ረሱ?`;
};
/**
* | output |
* | --- |
* | "Forgot your password?" |
*
* @param {Loginform_Forgot_PasswordInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_forgot_password = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_forgot_password();
	return en_loginform_forgot_password();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_toggle_password_visibility.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Toggle_Password_VisibilityInputs */
var en_loginform_toggle_password_visibility = () => {
	return `Toggle password visibility`;
};
var am_loginform_toggle_password_visibility = () => {
	return `የይለፍ ቃል ማሳያ ቀይር`;
};
/**
* | output |
* | --- |
* | "Toggle password visibility" |
*
* @param {Loginform_Toggle_Password_VisibilityInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_toggle_password_visibility = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_toggle_password_visibility();
	return en_loginform_toggle_password_visibility();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_submit.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_SubmitInputs */
var en_loginform_submit = () => {
	return `Sign in`;
};
var am_loginform_submit = () => {
	return `ግባ`;
};
/**
* | output |
* | --- |
* | "Sign in" |
*
* @param {Loginform_SubmitInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_submit = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_submit();
	return en_loginform_submit();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_no_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_No_AccountInputs */
var en_loginform_no_account = () => {
	return `Don't have an account?`;
};
var am_loginform_no_account = () => {
	return `መለያ የለዎትም?`;
};
/**
* | output |
* | --- |
* | "Don't have an account?" |
*
* @param {Loginform_No_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_no_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_no_account();
	return en_loginform_no_account();
});
//#endregion
//#region src/lib/paraglide/messages/loginform_create_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Loginform_Create_AccountInputs */
var en_loginform_create_account = () => {
	return `Create one`;
};
var am_loginform_create_account = () => {
	return `አንድ ይፍጠሩ`;
};
/**
* | output |
* | --- |
* | "Create one" |
*
* @param {Loginform_Create_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var loginform_create_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_loginform_create_account();
	return en_loginform_create_account();
});
//#endregion
//#region src/lib/forms/Login.svelte
function Login($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data, action = "?/login"} = $$props;
		const { form, errors} = superForm(data, {});
		let loading = false;
		let EyeIcon = derived(() => Eye);
		let googleLoading = false;
		head("1pbfzt0", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="auth-wrap svelte-1pbfzt0"><div class="auth-card svelte-1pbfzt0"><div class="logo-row svelte-1pbfzt0"><a href="/" class="logo svelte-1pbfzt0">G O T E R A</a></div> <div class="brand svelte-1pbfzt0"><span class="eyebrow svelte-1pbfzt0">${escape_html(loginform_eyebrow())}</span> <h1 class="svelte-1pbfzt0">${escape_html(loginform_title())}</h1> <p class="sub svelte-1pbfzt0">${escape_html(loginform_subtitle())}</p></div> <button type="button" class="btn-google svelte-1pbfzt0"${attr("disabled", googleLoading, true)}><svg class="g-icon svelte-1pbfzt0" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg> ${escape_html(loginform_google_continue())}</button> <div class="divider svelte-1pbfzt0">${escape_html(loginform_divider_or())}</div> <form method="POST"${attr("action", action)} class="form svelte-1pbfzt0"><div class="field svelte-1pbfzt0"><label class="field-label svelte-1pbfzt0" for="email">${escape_html(loginform_email_label())}</label> <input id="email" name="email" type="email" class="input svelte-1pbfzt0" autocomplete="email"${attr("placeholder", loginform_email_placeholder())}${attr("value", store_get($$store_subs ??= {}, "$form", form).email)} required=""/> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).email) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1pbfzt0">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="field svelte-1pbfzt0"><div class="label-row svelte-1pbfzt0"><label class="field-label svelte-1pbfzt0" for="password">${escape_html(loginform_password_label())}</label> <a href="/forgot-password" class="forgot svelte-1pbfzt0">${escape_html(loginform_forgot_password())}</a></div> <div class="pw svelte-1pbfzt0"><input id="password" name="password"${attr("type", "password")} class="input svelte-1pbfzt0" autocomplete="current-password"${attr("value", store_get($$store_subs ??= {}, "$form", form).password)} required=""/> <button type="button" class="pw-toggle svelte-1pbfzt0"${attr("title", loginform_toggle_password_visibility())}${attr("aria-label", loginform_toggle_password_visibility())}>`);
		if (EyeIcon()) {
			$$renderer.push("<!--[-->");
			EyeIcon()($$renderer, { class: "pw-icon" });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</button></div> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).password) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1pbfzt0">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).password)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <button type="submit" class="btn btn-full svelte-1pbfzt0"${attr("disabled", loading, true)}>${escape_html(loginform_submit())}</button> <p class="alt svelte-1pbfzt0">${escape_html(loginform_no_account())} <a href="/signup" class="svelte-1pbfzt0">${escape_html(loginform_create_account())}</a></p></form></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1x05zx6", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(login_page_title())}</title>`);
			});
		});
		$$renderer.push(`<div class="flex h-screen w-full items-center justify-center px-4">`);
		Login($$renderer, {
			data: data?.form,
			action: "?/login"});
		$$renderer.push(`<!----></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CTiIAypp.js.map
