import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/paraglide/messages/acctdetails_phone_format.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_FormatInputs */
var en_acctdetails_phone_format = () => {
	return `Use digits and + ( ) - only.`;
};
var am_acctdetails_phone_format = () => {
	return `ቁጥሮችንና + ( ) - ብቻ ይጠቀሙ።`;
};
/**
* | output |
* | --- |
* | "Use digits and + ( ) - only." |
*
* @param {Acctdetails_Phone_FormatInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_format = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_format();
	return en_acctdetails_phone_format();
});

export { acctdetails_phone_format as a };
//# sourceMappingURL=acctdetails_phone_format.js-BkKieu51.js.map
