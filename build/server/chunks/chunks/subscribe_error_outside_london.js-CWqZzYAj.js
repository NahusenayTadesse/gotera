import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/paraglide/messages/subscribe_error_outside_london.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Outside_LondonInputs */
var en_subscribe_error_outside_london = () => {
	return `Sorry, we only deliver within London. Please enter a London postcode.`;
};
var am_subscribe_error_outside_london = () => {
	return `ይቅርታ፣ የምናደርሰው በለንደን ውስጥ ብቻ ነው። እባክዎ የለንደን ፖስትኮድ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Sorry, we only deliver within London. Please enter a London postcode." |
*
* @param {Subscribe_Error_Outside_LondonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_outside_london = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_outside_london();
	return en_subscribe_error_outside_london();
});

export { subscribe_error_outside_london as s };
//# sourceMappingURL=subscribe_error_outside_london.js-CWqZzYAj.js.map
