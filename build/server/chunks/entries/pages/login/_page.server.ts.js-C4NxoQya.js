import { a as auth, A as APIError } from '../../../chunks/auth.js-DZBRJAcg.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import { r as redirect$1 } from '../../../chunks/server2.js-BivggJkG.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, m as message, a as setError } from '../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../chunks/adapters.js-D4rGtFDl.js';
import '../../../chunks/access.js-HgBsL8za.js';
import { l as loginSchema } from '../../../chunks/ZodSchema.js-B2IFjPeP.js';

//#region src/lib/paraglide/messages/login_form_check_error.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_Form_Check_ErrorInputs */
var en_login_form_check_error = () => {
	return `Please check the form.`;
};
var am_login_form_check_error = () => {
	return `እባክዎ ቅጹን ያረጋግጡ።`;
};
/**
* | output |
* | --- |
* | "Please check the form." |
*
* @param {Login_Form_Check_ErrorInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_form_check_error = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_form_check_error();
	return en_login_form_check_error();
});
//#endregion
//#region src/lib/paraglide/messages/login_invalid_credentials.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_Invalid_CredentialsInputs */
var en_login_invalid_credentials = () => {
	return `Invalid email or password`;
};
var am_login_invalid_credentials = () => {
	return `ልክ ያልሆነ ኢሜይል ወይም የይለፍ ቃል`;
};
/**
* | output |
* | --- |
* | "Invalid email or password" |
*
* @param {Login_Invalid_CredentialsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_invalid_credentials = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_invalid_credentials();
	return en_login_invalid_credentials();
});
//#endregion
//#region src/lib/paraglide/messages/login_error_generic.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_Error_GenericInputs */
var en_login_error_generic = () => {
	return `An error occurred while logging in`;
};
var am_login_error_generic = () => {
	return `በመግባት ላይ ሳለ ስህተት ተከስቷል`;
};
/**
* | output |
* | --- |
* | "An error occurred while logging in" |
*
* @param {Login_Error_GenericInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_error_generic = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_error_generic();
	return en_login_error_generic();
});
//#endregion
//#region src/lib/paraglide/messages/login_success.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_SuccessInputs */
var en_login_success = () => {
	return `Signed in successfully!`;
};
var am_login_success = () => {
	return `በተሳካ ሁኔታ ገብተዋል!`;
};
/**
* | output |
* | --- |
* | "Signed in successfully!" |
*
* @param {Login_SuccessInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_success = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_success();
	return en_login_success();
});
//#endregion
//#region src/lib/paraglide/messages/login_action_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Login_Action_FailedInputs */
var en_login_action_failed = () => {
	return `Login failed. Please try again.`;
};
var am_login_action_failed = () => {
	return `መግባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Login failed. Please try again." |
*
* @param {Login_Action_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var login_action_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_login_action_failed();
	return en_login_action_failed();
});
//#endregion
//#region src/routes/login/+page.server.ts
var load = async ({ locals, parent, url }) => {
	if (locals.user) if (locals.role === "Admin") return redirect$1(302, "/dashboard");
	else if (url.pathname === "/login") redirect$1(302, "/account");
	else redirect$1(303, `/login?redirectTo=${encodeURIComponent(url.pathname + url.search)}`);
	return { form: await superValidate(zod(loginSchema)) };
};
var actions = { login: async (event) => {
	const form = await superValidate(event.request, zod(loginSchema));
	if (!form.valid) return message(form, {
		type: "error",
		text: login_form_check_error()
	}, { status: 500 });
	const { email, password } = form.data;
	try {
		if (!(await auth.api.signInEmail({ body: {
			email,
			password,
			callbackURL: "/auth/verification-success"
		} })).user) {
			setError(form, "email", login_invalid_credentials());
			setError(form, "password", login_invalid_credentials());
			return message(form, {
				type: "error",
				text: login_error_generic()
			}, { status: 500 });
		}
		return message(form, {
			type: "success",
			text: login_success()
		});
	} catch (error) {
		if (error instanceof APIError) return message(form, {
			type: "error",
			text: error?.message
		}, { status: 500 });
		return message(form, {
			type: "error",
			text: login_action_failed()
		}, { status: 500 });
	}
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C4NxoQya.js.map
