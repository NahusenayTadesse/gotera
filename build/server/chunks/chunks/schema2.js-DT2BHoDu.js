import { h as getLocale } from './runtime.js-CbeSlHLA.js';
import { o as object, s as string, c as boolean, y as email, _ as _enum } from './access.js-j1_SnSd1.js';

//#region src/lib/paraglide/messages/partners_success_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Success_BodyInputs */
var en_partners_success_body = () => {
	return `We've received your application and will be in touch within 3–5 working days.`;
};
var am_partners_success_body = () => {
	return `ማመልከቻዎ ደርሶናል፤ በ3–5 የሥራ ቀናት ውስጥ እናገኝዎታለን።`;
};
/**
* | output |
* | --- |
* | "We've received your application and will be in touch within 3–5 working days." |
*
* @param {Partners_Success_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_success_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_success_body();
	return en_partners_success_body();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_business.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_BusinessInputs */
var en_partners_err_business = () => {
	return `Please enter your business name.`;
};
var am_partners_err_business = () => {
	return `እባክዎ የንግድ ስምዎን ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Please enter your business name." |
*
* @param {Partners_Err_BusinessInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_business = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_business();
	return en_partners_err_business();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_contact.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_ContactInputs */
var en_partners_err_contact = () => {
	return `Please enter a contact name.`;
};
var am_partners_err_contact = () => {
	return `እባክዎ የተጠሪ ስም ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Please enter a contact name." |
*
* @param {Partners_Err_ContactInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_contact = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_contact();
	return en_partners_err_contact();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_EmailInputs */
var en_partners_err_email = () => {
	return `Please enter a valid email address.`;
};
var am_partners_err_email = () => {
	return `እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Please enter a valid email address." |
*
* @param {Partners_Err_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_email();
	return en_partners_err_email();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_category.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_CategoryInputs */
var en_partners_err_category = () => {
	return `Please choose an option.`;
};
var am_partners_err_category = () => {
	return `እባክዎ አንዱን ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Please choose an option." |
*
* @param {Partners_Err_CategoryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_category = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_category();
	return en_partners_err_category();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_MessageInputs */
var en_partners_err_message = () => {
	return `Please tell us a little more (at least 20 characters).`;
};
var am_partners_err_message = () => {
	return `እባክዎ ትንሽ ተጨማሪ ይንገሩን (ቢያንስ 20 ፊደላት)።`;
};
/**
* | output |
* | --- |
* | "Please tell us a little more (at least 20 characters)." |
*
* @param {Partners_Err_MessageInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_message = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_message();
	return en_partners_err_message();
});
//#endregion
//#region src/lib/paraglide/messages/partners_err_consent.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Err_ConsentInputs */
var en_partners_err_consent = () => {
	return `Please confirm so we can contact you.`;
};
var am_partners_err_consent = () => {
	return `እንድናገኝዎ እባክዎ ያረጋግጡ።`;
};
/**
* | output |
* | --- |
* | "Please confirm so we can contact you." |
*
* @param {Partners_Err_ConsentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_err_consent = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_err_consent();
	return en_partners_err_consent();
});
//#endregion
//#region src/routes/partners/schema.ts
var PARTNER_CATEGORIES = [
	"restaurant",
	"shop",
	"caterer",
	"community",
	"corporate",
	"other"
];
var SUPPLIER_CATEGORIES = [
	"teff",
	"spices",
	"produce",
	"packaging",
	"logistics",
	"other"
];
var partnerSchema = object({
	type: _enum(["partner", "supplier"]).default("partner"),
	businessName: string().trim().min(2, partners_err_business()).max(255),
	contactName: string().trim().min(2, partners_err_contact()).max(255),
	email: email(partners_err_email()).max(255),
	phone: string().trim().max(40).optional().default(""),
	website: string().trim().max(255).optional().default(""),
	city: string().trim().max(120).optional().default(""),
	postcode: string().trim().max(16).optional().default(""),
	category: string().min(1, partners_err_category()),
	message: string().trim().min(20, partners_err_message()).max(2e3),
	consent: boolean().refine((v) => v, partners_err_consent()).default(false),
	company_url: string().optional().default("")
}).refine((d) => (d.type === "partner" ? PARTNER_CATEGORIES : SUPPLIER_CATEGORIES).includes(d.category), {
	message: partners_err_category(),
	path: ["category"]
});

export { PARTNER_CATEGORIES as P, SUPPLIER_CATEGORIES as S, partners_success_body as a, partnerSchema as p };
//# sourceMappingURL=schema2.js-DT2BHoDu.js.map
