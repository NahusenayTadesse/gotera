import { a0 as head, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import { a as toast } from '../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { b as superForm } from '../../../chunks/client2.js--SBYKgBt.js';
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

//#region src/lib/paraglide/messages/signup_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Page_TitleInputs */
var en_signup_page_title = () => {
	return `Create your account — GOTERA`;
};
var am_signup_page_title = () => {
	return `አካውንትዎን ይክፈቱ — ጎቴራ`;
};
/**
* | output |
* | --- |
* | "Create your account — GOTERA" |
*
* @param {Signup_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_page_title();
	return en_signup_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/signup_almost_there.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Almost_ThereInputs */
var en_signup_almost_there = () => {
	return `Almost there`;
};
var am_signup_almost_there = () => {
	return `ጥቂት ይቀራል`;
};
/**
* | output |
* | --- |
* | "Almost there" |
*
* @param {Signup_Almost_ThereInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_almost_there = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_almost_there();
	return en_signup_almost_there();
});
//#endregion
//#region src/lib/paraglide/messages/signup_check_inbox.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Check_InboxInputs */
var en_signup_check_inbox = () => {
	return `Check your inbox.`;
};
var am_signup_check_inbox = () => {
	return `የመልእክት ሳጥንዎን ይመልከቱ።`;
};
/**
* | output |
* | --- |
* | "Check your inbox." |
*
* @param {Signup_Check_InboxInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_check_inbox = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_check_inbox();
	return en_signup_check_inbox();
});
//#endregion
//#region src/lib/paraglide/messages/signup_verification_sent_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Verification_Sent_PrefixInputs */
var en_signup_verification_sent_prefix = () => {
	return `We've sent a verification link to`;
};
var am_signup_verification_sent_prefix = () => {
	return `የማረጋገጫ ማስፈንጠሪያ ልከንልዎታል ወደ`;
};
/**
* | output |
* | --- |
* | "We've sent a verification link to" |
*
* @param {Signup_Verification_Sent_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_verification_sent_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_verification_sent_prefix();
	return en_signup_verification_sent_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/signup_verification_sent_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Verification_Sent_SuffixInputs */
var en_signup_verification_sent_suffix = () => {
	return `Click it to activate your account and start your subscription.`;
};
var am_signup_verification_sent_suffix = () => {
	return `አካውንትዎን ለማንቃት እና ደንበኝነትዎን ለመጀመር ይጫኑት።`;
};
/**
* | output |
* | --- |
* | "Click it to activate your account and start your subscription." |
*
* @param {Signup_Verification_Sent_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_verification_sent_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_verification_sent_suffix();
	return en_signup_verification_sent_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/signup_back_to_signin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Back_To_SigninInputs */
var en_signup_back_to_signin = () => {
	return `Back to sign in`;
};
var am_signup_back_to_signin = () => {
	return `ወደ መግቢያ ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back to sign in" |
*
* @param {Signup_Back_To_SigninInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_back_to_signin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_back_to_signin();
	return en_signup_back_to_signin();
});
//#endregion
//#region src/lib/paraglide/messages/signup_fine_print.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Fine_PrintInputs */
var en_signup_fine_print = () => {
	return `Didn't get it? Check spam, or give it a minute to arrive.`;
};
var am_signup_fine_print = () => {
	return `አላገኙትም? የስፓም ፎልደርዎን ይመልከቱ፣ ወይም ትንሽ ደቂቃ ይጠብቁ።`;
};
/**
* | output |
* | --- |
* | "Didn't get it? Check spam, or give it a minute to arrive." |
*
* @param {Signup_Fine_PrintInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_fine_print = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_fine_print();
	return en_signup_fine_print();
});
//#endregion
//#region src/lib/paraglide/messages/signup_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_EyebrowInputs */
var en_signup_eyebrow = () => {
	return `Create account`;
};
var am_signup_eyebrow = () => {
	return `አካውንት ይክፈቱ`;
};
/**
* | output |
* | --- |
* | "Create account" |
*
* @param {Signup_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_eyebrow();
	return en_signup_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/signup_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_HeadingInputs */
var en_signup_heading = () => {
	return `Join GOTERA.`;
};
var am_signup_heading = () => {
	return `ከጎቴራ ጋር ይቀላቀሉ።`;
};
/**
* | output |
* | --- |
* | "Join GOTERA." |
*
* @param {Signup_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_heading();
	return en_signup_heading();
});
//#endregion
//#region src/lib/paraglide/messages/signup_subheading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_SubheadingInputs */
var en_signup_subheading = () => {
	return `Real injera, made in Ethiopia, delivered every month.`;
};
var am_signup_subheading = () => {
	return `ንፁህ እንጀራ፣ በኢትዮጵያ ተዘጋጅቶ፣ በየወሩ ይደርስዎታል።`;
};
/**
* | output |
* | --- |
* | "Real injera, made in Ethiopia, delivered every month." |
*
* @param {Signup_SubheadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_subheading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_subheading();
	return en_signup_subheading();
});
//#endregion
//#region src/lib/paraglide/messages/signup_google_continue.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Google_ContinueInputs */
var en_signup_google_continue = () => {
	return `Continue with Google`;
};
var am_signup_google_continue = () => {
	return `በGoogle ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Signup_Google_ContinueInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_google_continue = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_google_continue();
	return en_signup_google_continue();
});
//#endregion
//#region src/lib/paraglide/messages/signup_divider_or.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Divider_OrInputs */
var en_signup_divider_or = () => {
	return `or`;
};
var am_signup_divider_or = () => {
	return `ወይም`;
};
/**
* | output |
* | --- |
* | "or" |
*
* @param {Signup_Divider_OrInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_divider_or = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_divider_or();
	return en_signup_divider_or();
});
//#endregion
//#region src/lib/paraglide/messages/signup_label_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Label_NameInputs */
var en_signup_label_name = () => {
	return `Full name`;
};
var am_signup_label_name = () => {
	return `ሙሉ ስም`;
};
/**
* | output |
* | --- |
* | "Full name" |
*
* @param {Signup_Label_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_label_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_label_name();
	return en_signup_label_name();
});
//#endregion
//#region src/lib/paraglide/messages/signup_label_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Label_EmailInputs */
var en_signup_label_email = () => {
	return `Email`;
};
var am_signup_label_email = () => {
	return `ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Signup_Label_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_label_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_label_email();
	return en_signup_label_email();
});
//#endregion
//#region src/lib/paraglide/messages/signup_label_password.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Label_PasswordInputs */
var en_signup_label_password = () => {
	return `Password`;
};
var am_signup_label_password = () => {
	return `የይለፍ ቃል`;
};
/**
* | output |
* | --- |
* | "Password" |
*
* @param {Signup_Label_PasswordInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_label_password = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_label_password();
	return en_signup_label_password();
});
//#endregion
//#region src/lib/paraglide/messages/signup_label_confirm_password.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Label_Confirm_PasswordInputs */
var en_signup_label_confirm_password = () => {
	return `Confirm password`;
};
var am_signup_label_confirm_password = () => {
	return `የይለፍ ቃል ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Confirm password" |
*
* @param {Signup_Label_Confirm_PasswordInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_label_confirm_password = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_label_confirm_password();
	return en_signup_label_confirm_password();
});
//#endregion
//#region src/lib/paraglide/messages/signup_marketing_optin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Marketing_OptinInputs */
var en_signup_marketing_optin = () => {
	return `Send me occasional updates and offers.`;
};
var am_signup_marketing_optin = () => {
	return `አልፎ አልፎ ዝማኔዎችን እና ቅናሾችን ላኩልኝ።`;
};
/**
* | output |
* | --- |
* | "Send me occasional updates and offers." |
*
* @param {Signup_Marketing_OptinInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_marketing_optin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_marketing_optin();
	return en_signup_marketing_optin();
});
//#endregion
//#region src/lib/paraglide/messages/signup_submitting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_SubmittingInputs */
var en_signup_submitting = () => {
	return `Creating account…`;
};
var am_signup_submitting = () => {
	return `አካውንት በመፍጠር ላይ…`;
};
/**
* | output |
* | --- |
* | "Creating account…" |
*
* @param {Signup_SubmittingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_submitting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_submitting();
	return en_signup_submitting();
});
//#endregion
//#region src/lib/paraglide/messages/signup_submit_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Submit_ButtonInputs */
var en_signup_submit_button = () => {
	return `Create account`;
};
var am_signup_submit_button = () => {
	return `አካውንት ይፍጠሩ`;
};
/**
* | output |
* | --- |
* | "Create account" |
*
* @param {Signup_Submit_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_submit_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_submit_button();
	return en_signup_submit_button();
});
//#endregion
//#region src/lib/paraglide/messages/signup_already_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Already_AccountInputs */
var en_signup_already_account = () => {
	return `Already have an account?`;
};
var am_signup_already_account = () => {
	return `አካውንት አለዎት?`;
};
/**
* | output |
* | --- |
* | "Already have an account?" |
*
* @param {Signup_Already_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_already_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_already_account();
	return en_signup_already_account();
});
//#endregion
//#region src/lib/paraglide/messages/signup_sign_in.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Sign_InInputs */
var en_signup_sign_in = () => {
	return `Sign in`;
};
var am_signup_sign_in = () => {
	return `ይግቡ`;
};
/**
* | output |
* | --- |
* | "Sign in" |
*
* @param {Signup_Sign_InInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_sign_in = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_sign_in();
	return en_signup_sign_in();
});
//#endregion
//#region src/routes/signup/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let submitted = false;
		let sentTo = "";
		const { form, errors, submitting } = superForm(data.form, {
			resetForm: false,
			onUpdated({ form }) {
				const msg = form.message;
				if (!msg) return;
				if (msg.type === "success") {
					sentTo = form.data.email;
					submitted = true;
				} else toast.error(msg.text);
			}
		});
		let googleLoading = false;
		head("kmqcod", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(signup_page_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="auth-wrap svelte-kmqcod"><div class="auth-card svelte-kmqcod">`);
		if (submitted) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="sent svelte-kmqcod"><svg class="sent-icon svelte-kmqcod" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="22"></circle><path d="M15 24.5l6 6 12-13"></path></svg> <span class="eyebrow svelte-kmqcod">${escape_html(signup_almost_there())}</span> <h1 class="svelte-kmqcod">${escape_html(signup_check_inbox())}</h1> <p class="svelte-kmqcod">${escape_html(signup_verification_sent_prefix())} <strong class="svelte-kmqcod">${escape_html(sentTo)}</strong>. ${escape_html(signup_verification_sent_suffix())}</p> <a href="/login" class="btn btn-full svelte-kmqcod">${escape_html(signup_back_to_signin())}</a> <p class="fine svelte-kmqcod">${escape_html(signup_fine_print())}</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="brand svelte-kmqcod"><span class="eyebrow svelte-kmqcod">${escape_html(signup_eyebrow())}</span> <h1 class="svelte-kmqcod">${escape_html(signup_heading())}</h1> <p class="sub svelte-kmqcod">${escape_html(signup_subheading())}</p></div> <button type="button" class="btn-google svelte-kmqcod"${attr("disabled", googleLoading, true)}><svg class="g-icon svelte-kmqcod" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg> ${escape_html(signup_google_continue())}</button> <div class="divider svelte-kmqcod">${escape_html(signup_divider_or())}</div> <form method="POST" class="form svelte-kmqcod"><div class="field svelte-kmqcod"><label class="field-label svelte-kmqcod" for="name">${escape_html(signup_label_name())}</label> <input id="name" name="name" class="input svelte-kmqcod" autocomplete="name"${attr("value", store_get($$store_subs ??= {}, "$form", form).name)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).name) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-kmqcod">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).name)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-kmqcod"><label class="field-label svelte-kmqcod" for="email">${escape_html(signup_label_email())}</label> <input id="email" name="email" type="email" class="input svelte-kmqcod" autocomplete="email"${attr("value", store_get($$store_subs ??= {}, "$form", form).email)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-kmqcod">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-kmqcod"><label class="field-label svelte-kmqcod" for="password">${escape_html(signup_label_password())}</label> <input id="password" name="password" type="password" class="input svelte-kmqcod" autocomplete="new-password"${attr("value", store_get($$store_subs ??= {}, "$form", form).password)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).password) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-kmqcod">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).password)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-kmqcod"><label class="field-label svelte-kmqcod" for="confirmPassword">${escape_html(signup_label_confirm_password())}</label> <input id="confirmPassword" name="confirmPassword" type="password" class="input svelte-kmqcod" autocomplete="new-password"${attr("value", store_get($$store_subs ??= {}, "$form", form).confirmPassword)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).confirmPassword) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-kmqcod">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).confirmPassword)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <label class="opt-in svelte-kmqcod"><input type="checkbox"${attr("checked", store_get($$store_subs ??= {}, "$form", form).marketingOptIn, true)} class="svelte-kmqcod"/> <span>${escape_html(signup_marketing_optin())}</span></label> <button type="submit" class="btn btn-full svelte-kmqcod"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? signup_submitting() : signup_submit_button())}</button> <p class="alt svelte-kmqcod">${escape_html(signup_already_account())} <a href="/login" class="svelte-kmqcod">${escape_html(signup_sign_in())}</a></p></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-7-F3PsoH.js.map
