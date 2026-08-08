import { h as getLocale } from './runtime.js-CYqc9Mf9.js';
import { o as object, c as boolean, s as string, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/acctplan_subscription_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Subscription_RequiredInputs */
var en_acctplan_subscription_required = () => {
	return `Please choose which plan to cancel`;
};
var am_acctplan_subscription_required = () => {
	return `እባክዎ የትኛውን እቅድ መሰረዝ እንዳለብዎ ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Please choose which plan to cancel" |
*
* @param {Acctplan_Subscription_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_subscription_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_subscription_required();
	return en_acctplan_subscription_required();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_feedback_max.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Feedback_MaxInputs */
var en_acctplan_feedback_max = () => {
	return `Keep it under 1000 characters`;
};
var am_acctplan_feedback_max = () => {
	return `ከ1000 ቁምፊዎች በታች ያድርጉት`;
};
/**
* | output |
* | --- |
* | "Keep it under 1000 characters" |
*
* @param {Acctplan_Feedback_MaxInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_feedback_max = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_feedback_max();
	return en_acctplan_feedback_max();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_confirm_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Confirm_RequiredInputs */
var en_acctplan_confirm_required = () => {
	return `Please confirm the plan will end`;
};
var am_acctplan_confirm_required = () => {
	return `እባክዎ እቅዱ እንደሚያበቃ ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Please confirm the plan will end" |
*
* @param {Acctplan_Confirm_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_confirm_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_confirm_required();
	return en_acctplan_confirm_required();
});
//#endregion
//#region src/routes/account/change-plan/schema.ts
var cancelSchema = object({
	subscriptionId: string().min(1, acctplan_subscription_required()),
	reason: _enum([
		"too_expensive",
		"too_much_food",
		"taking_a_break",
		"moving",
		"quality",
		"other"
	]).optional(),
	feedback: string().max(1e3, acctplan_feedback_max()).optional(),
	confirm: boolean().refine((v) => v === true, { message: acctplan_confirm_required() })
});

export { cancelSchema as c };
//# sourceMappingURL=schema.js-Cw7Bh0q_.js.map
