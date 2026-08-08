import { m as db, p as subscribers } from '../../../chunks/db.js-BkD50_-0.js';
import { a as auth, A as APIError } from '../../../chunks/auth.js-DZBRJAcg.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, a as setError, m as message } from '../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../chunks/adapters.js-D4rGtFDl.js';
import { C as fail, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, c as boolean, s as string, y as email } from '../../../chunks/access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/signup_name_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Name_RequiredInputs */
var en_signup_name_required = () => {
	return `Your name is required.`;
};
var am_signup_name_required = () => {
	return `ስምዎን ማስገባት ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Your name is required." |
*
* @param {Signup_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_name_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_name_required();
	return en_signup_name_required();
});
//#endregion
//#region src/lib/paraglide/messages/signup_email_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Email_InvalidInputs */
var en_signup_email_invalid = () => {
	return `Enter a valid email address.`;
};
var am_signup_email_invalid = () => {
	return `ትክክለኛ የኢሜይል አድራሻ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a valid email address." |
*
* @param {Signup_Email_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_email_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_email_invalid();
	return en_signup_email_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/signup_password_min.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Password_MinInputs */
var en_signup_password_min = () => {
	return `Use at least 8 characters.`;
};
var am_signup_password_min = () => {
	return `ቢያንስ 8 ፊደላት ይጠቀሙ።`;
};
/**
* | output |
* | --- |
* | "Use at least 8 characters." |
*
* @param {Signup_Password_MinInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_password_min = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_password_min();
	return en_signup_password_min();
});
//#endregion
//#region src/lib/paraglide/messages/signup_password_mismatch.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Password_MismatchInputs */
var en_signup_password_mismatch = () => {
	return `Passwords don't match.`;
};
var am_signup_password_mismatch = () => {
	return `የይለፍ ቃላቱ አይመሳሰሉም።`;
};
/**
* | output |
* | --- |
* | "Passwords don't match." |
*
* @param {Signup_Password_MismatchInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_password_mismatch = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_password_mismatch();
	return en_signup_password_mismatch();
});
//#endregion
//#region src/lib/paraglide/messages/signup_create_account_error.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Create_Account_ErrorInputs */
var en_signup_create_account_error = () => {
	return `Could not create your account.`;
};
var am_signup_create_account_error = () => {
	return `አካውንትዎን መፍጠር አልተቻለም።`;
};
/**
* | output |
* | --- |
* | "Could not create your account." |
*
* @param {Signup_Create_Account_ErrorInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_create_account_error = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_create_account_error();
	return en_signup_create_account_error();
});
//#endregion
//#region src/lib/paraglide/messages/signup_generic_error.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Generic_ErrorInputs */
var en_signup_generic_error = () => {
	return `Something went wrong. Please try again.`;
};
var am_signup_generic_error = () => {
	return `የሆነ ችግር ተከስቷል። እባክዎ እንደገና ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Something went wrong. Please try again." |
*
* @param {Signup_Generic_ErrorInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_generic_error = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_generic_error();
	return en_signup_generic_error();
});
//#endregion
//#region src/lib/paraglide/messages/signup_success_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Signup_Success_MessageInputs */
var en_signup_success_message = () => {
	return `Account created. Check your email to verify.`;
};
var am_signup_success_message = () => {
	return `አካውንት ተፈጥሯል። ለማረጋገጥ ኢሜይልዎን ይመልከቱ።`;
};
/**
* | output |
* | --- |
* | "Account created. Check your email to verify." |
*
* @param {Signup_Success_MessageInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var signup_success_message = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_signup_success_message();
	return en_signup_success_message();
});
//#endregion
//#region src/routes/signup/schema.ts
var signupSchema = object({
	name: string().min(1, signup_name_required()).max(255),
	email: email(signup_email_invalid()),
	password: string().min(8, signup_password_min()).max(128),
	confirmPassword: string(),
	marketingOptIn: boolean().default(true)
}).refine((v) => v.password === v.confirmPassword, {
	error: signup_password_mismatch(),
	path: ["confirmPassword"]
});
//#endregion
//#region src/routes/signup/+page.server.ts
var load = async ({ locals, url }) => {
	if (locals.user) redirect(303, `/signup?redirectTo=${encodeURIComponent(url.pathname + url.search)}`);
	return { form: await superValidate(zod(signupSchema)) };
};
var actions = { default: async ({ request }) => {
	const form = await superValidate(request, zod(signupSchema));
	if (!form.valid) return fail(400, { form });
	const { name, email, password, marketingOptIn } = form.data;
	let userId;
	try {
		userId = (await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				callbackURL: "/auth/verification-success"
			},
			headers: request.headers
		})).user.id;
	} catch (e) {
		if (e instanceof APIError) return setError(form, "email", e.body?.message ?? signup_create_account_error());
		console.error("signUpEmail failed", e);
		return message(form, {
			type: "error",
			text: signup_generic_error()
		}, { status: 500 });
	}
	try {
		await db.insert(subscribers).values({
			userId,
			email,
			fullName: name,
			plan: null,
			status: "pending",
			marketingOptIn
		});
	} catch (e) {
		console.error("subscriber link failed", e);
	}
	return message(form, {
		type: "success",
		text: signup_success_message()
	});
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Fzff1Y9F.js.map
