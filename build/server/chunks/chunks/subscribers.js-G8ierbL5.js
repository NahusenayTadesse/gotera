import { m as db, p as subscribers, j as eq } from './db.js-Can7tpXV.js';
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
//#endregion
//#region src/lib/server/subscribers.ts
/**
* Copy the phone a signed-in customer typed at checkout onto their customer record, so it
* shows on /account/details and in the dashboard. The latest number wins — it is the one
* the driver should ring. No-op for users with no subscriber row yet.
*/
async function saveSubscriberPhone(userId, phone, conn = db) {
	const value = phone.trim();
	if (!value) return;
	await conn.update(subscribers).set({ phone: value }).where(eq(subscribers.userId, userId));
}

export { subscribe_error_checkout_failed as a, saveSubscriberPhone as s };
//# sourceMappingURL=subscribers.js-G8ierbL5.js.map
