import { a0 as head, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores, a6 as spread_props } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import { I as Icon } from '../../../chunks/Icon.js-C-2f-rrd.js';
import { C as Circle_alert } from '../../../chunks/circle-alert.js-BYQ_-QxX.js';
import { L as Loader_circle } from '../../../chunks/loader-circle.js-ItH9sbLy.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { b as superForm } from '../../../chunks/client2.js--SBYKgBt.js';
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

//#region node_modules/@lucide/svelte/dist/icons/circle-check.svelte
function Circle_check($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-check" },
		props,
		{ iconNode: [["circle", {
			"cx": "12",
			"cy": "12",
			"r": "10"
		}], ["path", { "d": "m9 12 2 2 4-4" }]] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/forgotpw_meta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Meta_TitleInputs */
var en_forgotpw_meta_title = () => {
	return `Sign-in link — GOTERA`;
};
var am_forgotpw_meta_title = () => {
	return `የመግቢያ አገናኝ — ጎተራ`;
};
/**
* | output |
* | --- |
* | "Sign-in link — GOTERA" |
*
* @param {Forgotpw_Meta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_meta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_meta_title();
	return en_forgotpw_meta_title();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_success_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Success_EyebrowInputs */
var en_forgotpw_success_eyebrow = () => {
	return `Check your inbox`;
};
var am_forgotpw_success_eyebrow = () => {
	return `የገቢ መልእክት ሳጥንዎን ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Check your inbox" |
*
* @param {Forgotpw_Success_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_success_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_success_eyebrow();
	return en_forgotpw_success_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_success_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Success_HeadingInputs */
var en_forgotpw_success_heading = () => {
	return `Link sent.`;
};
var am_forgotpw_success_heading = () => {
	return `አገናኝ ተልኳል።`;
};
/**
* | output |
* | --- |
* | "Link sent." |
*
* @param {Forgotpw_Success_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_success_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_success_heading();
	return en_forgotpw_success_heading();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_success_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ email: NonNullable<unknown> }} Forgotpw_Success_BodyInputs */
var en_forgotpw_success_body = (i) => {
	return `If ${i?.email} has an account, we've sent a secure sign-in link. Follow it to get back in — then you can set a new password from your account.`;
};
var am_forgotpw_success_body = (i) => {
	return `${i?.email} መለያ ካለው፣ ደህንነቱ የተጠበቀ የመግቢያ አገናኝ ልከንልናል። ወደ መለያዎ ለመመለስ ይህንን ይከተሉ — ከዚያም አዲስ የይለፍ ቃል ማዘጋጀት ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "If {email} has an account, we've sent a secure sign-in link. Follow it to get back in — then you can set a new password from your account." |
*
* @param {Forgotpw_Success_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_success_body = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_success_body(inputs);
	return en_forgotpw_success_body(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_success_fine.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Success_FineInputs */
var en_forgotpw_success_fine = () => {
	return `Didn't get it? Check spam, or give it a minute to arrive.`;
};
var am_forgotpw_success_fine = () => {
	return `አላገኙትም? የስፓም ፎልደርዎን ያረጋግጡ፣ ወይም ትንሽ ደቂቃ ይጠብቁ።`;
};
/**
* | output |
* | --- |
* | "Didn't get it? Check spam, or give it a minute to arrive." |
*
* @param {Forgotpw_Success_FineInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_success_fine = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_success_fine();
	return en_forgotpw_success_fine();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_back_to_signin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Back_To_SigninInputs */
var en_forgotpw_back_to_signin = () => {
	return `Back to sign in`;
};
var am_forgotpw_back_to_signin = () => {
	return `ወደ መግቢያ ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back to sign in" |
*
* @param {Forgotpw_Back_To_SigninInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_back_to_signin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_back_to_signin();
	return en_forgotpw_back_to_signin();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_EyebrowInputs */
var en_forgotpw_eyebrow = () => {
	return `Forgot password?`;
};
var am_forgotpw_eyebrow = () => {
	return `የይለፍ ቃል ረሱ?`;
};
/**
* | output |
* | --- |
* | "Forgot password?" |
*
* @param {Forgotpw_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_eyebrow();
	return en_forgotpw_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_HeadingInputs */
var en_forgotpw_heading = () => {
	return `Get back in.`;
};
var am_forgotpw_heading = () => {
	return `ተመልሰው ይግቡ።`;
};
/**
* | output |
* | --- |
* | "Get back in." |
*
* @param {Forgotpw_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_heading();
	return en_forgotpw_heading();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_SubInputs */
var en_forgotpw_sub = () => {
	return `Enter your email and we'll send a secure sign-in link — no password needed.`;
};
var am_forgotpw_sub = () => {
	return `ኢሜይልዎን ያስገቡ እና ደህንነቱ የተጠበቀ የመግቢያ አገናኝ እንልክልዎታለን — የይለፍ ቃል አያስፈልግም።`;
};
/**
* | output |
* | --- |
* | "Enter your email and we'll send a secure sign-in link — no password needed." |
*
* @param {Forgotpw_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_sub();
	return en_forgotpw_sub();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Email_LabelInputs */
var en_forgotpw_email_label = () => {
	return `Email address`;
};
var am_forgotpw_email_label = () => {
	return `የኢሜይል አድራሻ`;
};
/**
* | output |
* | --- |
* | "Email address" |
*
* @param {Forgotpw_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_email_label();
	return en_forgotpw_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_email_placeholder.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Email_PlaceholderInputs */
var en_forgotpw_email_placeholder = () => {
	return `name@example.com`;
};
var am_forgotpw_email_placeholder = () => {
	return `name@example.com`;
};
/**
* | output |
* | --- |
* | "name@example.com" |
*
* @param {Forgotpw_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_email_placeholder = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_email_placeholder();
	return en_forgotpw_email_placeholder();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_sending.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_SendingInputs */
var en_forgotpw_sending = () => {
	return `Sending link…`;
};
var am_forgotpw_sending = () => {
	return `አገናኝ በመላክ ላይ…`;
};
/**
* | output |
* | --- |
* | "Sending link…" |
*
* @param {Forgotpw_SendingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_sending = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_sending();
	return en_forgotpw_sending();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_submit.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_SubmitInputs */
var en_forgotpw_submit = () => {
	return `Send sign-in link`;
};
var am_forgotpw_submit = () => {
	return `የመግቢያ አገናኝ ላክ`;
};
/**
* | output |
* | --- |
* | "Send sign-in link" |
*
* @param {Forgotpw_SubmitInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_submit = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_submit();
	return en_forgotpw_submit();
});
//#endregion
//#region src/routes/forgot-password/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let submitted = false;
		let sentTo = "";
		let errorMessage = "";
		const { form, errors, submitting } = superForm(data.form, {
			resetForm: false,
			onUpdated({ form }) {
				const m = form.message;
				if (!m) return;
				if (m.type === "success") {
					sentTo = form.data.email;
					submitted = true;
					errorMessage = "";
				} else errorMessage = m.text;
			}
		});
		head("1wx4tso", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(forgotpw_meta_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="auth-wrap svelte-1wx4tso"><div class="auth-card svelte-1wx4tso"><div class="logo-row svelte-1wx4tso"><a href="/" class="logo svelte-1wx4tso">G O T E R A</a></div> `);
		if (submitted) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="sent svelte-1wx4tso">`);
			Circle_check($$renderer, { class: "sent-icon" });
			$$renderer.push(`<!----> <span class="eyebrow svelte-1wx4tso">${escape_html(forgotpw_success_eyebrow())}</span> <h1 class="svelte-1wx4tso">${escape_html(forgotpw_success_heading())}</h1> <p class="svelte-1wx4tso">${escape_html(forgotpw_success_body({ email: sentTo }))}</p> <a href="/login" class="btn btn-full svelte-1wx4tso">${escape_html(forgotpw_back_to_signin())}</a> <p class="fine svelte-1wx4tso">${escape_html(forgotpw_success_fine())}</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="brand svelte-1wx4tso"><span class="eyebrow svelte-1wx4tso">${escape_html(forgotpw_eyebrow())}</span> <h1 class="svelte-1wx4tso">${escape_html(forgotpw_heading())}</h1> <p class="sub svelte-1wx4tso">${escape_html(forgotpw_sub())}</p></div> <form method="POST" class="form svelte-1wx4tso">`);
			if (errorMessage) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="alert svelte-1wx4tso">`);
				Circle_alert($$renderer, { class: "alert-icon" });
				$$renderer.push(`<!----> <span>${escape_html(errorMessage)}</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="field svelte-1wx4tso"><label class="field-label svelte-1wx4tso" for="email">${escape_html(forgotpw_email_label())}</label> <input id="email" name="email" type="email" class="input svelte-1wx4tso" autocomplete="email"${attr("placeholder", forgotpw_email_placeholder())}${attr("value", store_get($$store_subs ??= {}, "$form", form).email)} required=""${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-1wx4tso">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <button type="submit" class="btn btn-full svelte-1wx4tso"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>`);
			if (store_get($$store_subs ??= {}, "$submitting", submitting)) {
				$$renderer.push("<!--[0-->");
				Loader_circle($$renderer, { class: "spin btn-icon" });
				$$renderer.push(`<!----> ${escape_html(forgotpw_sending())}`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(forgotpw_submit())}`);
			}
			$$renderer.push(`<!--]--></button> <p class="alt svelte-1wx4tso"><a href="/login" class="svelte-1wx4tso">${escape_html(forgotpw_back_to_signin())}</a></p></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BSYIIJ_G.js.map
