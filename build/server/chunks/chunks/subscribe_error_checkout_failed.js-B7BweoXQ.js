import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/paraglide/messages/subscribe_error_checkout_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Checkout_FailedInputs */
var en_subscribe_error_checkout_failed = () => {
	return `Could not start checkout. Please try again.`;
};
var am_subscribe_error_checkout_failed = () => {
	return `ክፍያውን መጀመር አልተቻለም። እባክዎ እንደገና ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Could not start checkout. Please try again." |
*
* @param {Subscribe_Error_Checkout_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_checkout_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_checkout_failed();
	return en_subscribe_error_checkout_failed();
});

export { subscribe_error_checkout_failed as s };
//# sourceMappingURL=subscribe_error_checkout_failed.js-B7BweoXQ.js.map
