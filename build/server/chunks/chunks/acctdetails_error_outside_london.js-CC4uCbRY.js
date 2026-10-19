import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/paraglide/messages/acctdetails_error_outside_london.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Error_Outside_LondonInputs */
var en_acctdetails_error_outside_london = () => {
	return `Sorry, we only deliver within London. Please enter a London postcode.`;
};
var am_acctdetails_error_outside_london = () => {
	return `ይቅርታ፣ የምናደርሰው በለንደን ውስጥ ብቻ ነው። እባክዎ የለንደን ፖስትኮድ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Sorry, we only deliver within London. Please enter a London postcode." |
*
* @param {Acctdetails_Error_Outside_LondonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_error_outside_london = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_error_outside_london();
	return en_acctdetails_error_outside_london();
});

export { acctdetails_error_outside_london as a };
//# sourceMappingURL=acctdetails_error_outside_london.js-CC4uCbRY.js.map
