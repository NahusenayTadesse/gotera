import { a as auth } from '../../../chunks/auth.js-DZBRJAcg.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, m as message } from '../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../chunks/adapters.js-D4rGtFDl.js';
import { C as fail, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, y as email } from '../../../chunks/access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/forgotpw_email_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Email_InvalidInputs */
var en_forgotpw_email_invalid = () => {
	return `Enter a valid email address.`;
};
var am_forgotpw_email_invalid = () => {
	return `ትክክለኛ የኢሜይል አድራሻ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a valid email address." |
*
* @param {Forgotpw_Email_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_email_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_email_invalid();
	return en_forgotpw_email_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/forgotpw_success_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Forgotpw_Success_MessageInputs */
var en_forgotpw_success_message = () => {
	return `If that email has an account, a sign-in link is on its way.`;
};
var am_forgotpw_success_message = () => {
	return `ያ ኢሜይል መለያ ካለው፣ የመግቢያ አገናኝ በመንገድ ላይ ነው።`;
};
/**
* | output |
* | --- |
* | "If that email has an account, a sign-in link is on its way." |
*
* @param {Forgotpw_Success_MessageInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var forgotpw_success_message = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_forgotpw_success_message();
	return en_forgotpw_success_message();
});
//#endregion
//#region src/routes/forgot-password/schema.ts
var magicLinkSchema = object({ email: email(forgotpw_email_invalid()) });
//#endregion
//#region src/routes/forgot-password/+page.server.ts
var load = async (event) => {
	if (event.locals.user) redirect(302, "/account");
	return { form: await superValidate(zod(magicLinkSchema)) };
};
var actions = { default: async ({ request }) => {
	const form = await superValidate(request, zod(magicLinkSchema));
	if (!form.valid) return fail(400, { form });
	try {
		await auth.api.signInMagicLink({
			body: {
				email: form.data.email,
				callbackURL: "/account"
			},
			headers: request.headers
		});
	} catch (e) {
		console.error("magic link send failed", e);
	}
	return message(form, {
		type: "success",
		text: forgotpw_success_message()
	});
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C_oki1-u.js.map
