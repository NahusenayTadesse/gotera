import { h as getLocale } from './runtime.js-CbeSlHLA.js';
import { o as object, s as string } from './access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/acctplan_subscription_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Subscription_RequiredInputs */
var en_acctplan_subscription_required = () => {
	return `Please choose which plan to change`;
};
var am_acctplan_subscription_required = () => {
	return `እባክዎ የትኛውን ዕቅድ መቀየር እንደሚፈልጉ ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Please choose which plan to change" |
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
//#region src/lib/paraglide/messages/acctplan_plan_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Plan_RequiredInputs */
var en_acctplan_plan_required = () => {
	return `Please choose a new plan`;
};
var am_acctplan_plan_required = () => {
	return `እባክዎ አዲስ ዕቅድ ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Please choose a new plan" |
*
* @param {Acctplan_Plan_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_plan_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_plan_required();
	return en_acctplan_plan_required();
});
//#endregion
//#region src/routes/account/change-plan/schema.ts
var changePlanSchema = object({
	subscriptionId: string().min(1, acctplan_subscription_required()),
	planId: string().min(1, acctplan_plan_required())
});

export { changePlanSchema as c };
//# sourceMappingURL=schema.js-C9spCgug.js.map
