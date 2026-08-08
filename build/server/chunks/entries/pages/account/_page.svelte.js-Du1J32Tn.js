import { a9 as escape_html, a4 as ensure_array_like, aa as attr_class, ab as stringify$1, $ as attr, T as derived } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/lib/paraglide/messages/account_status_pending.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_PendingInputs */
var en_account_status_pending = () => {
	return `Pending`;
};
var am_account_status_pending = () => {
	return `በመጠባበቅ ላይ`;
};
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Account_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_pending = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_pending();
	return en_account_status_pending();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_active.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_ActiveInputs */
var en_account_status_active = () => {
	return `Active`;
};
var am_account_status_active = () => {
	return `ገቢር`;
};
/**
* | output |
* | --- |
* | "Active" |
*
* @param {Account_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_active = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_active();
	return en_account_status_active();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_paused.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_PausedInputs */
var en_account_status_paused = () => {
	return `Paused`;
};
var am_account_status_paused = () => {
	return `ባለ እረፍት`;
};
/**
* | output |
* | --- |
* | "Paused" |
*
* @param {Account_Status_PausedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_paused = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_paused();
	return en_account_status_paused();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_cancelled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_CancelledInputs */
var en_account_status_cancelled = () => {
	return `Cancelled`;
};
var am_account_status_cancelled = () => {
	return `ተሰርዟል`;
};
/**
* | output |
* | --- |
* | "Cancelled" |
*
* @param {Account_Status_CancelledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_cancelled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_cancelled();
	return en_account_status_cancelled();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_sub_pending.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_Sub_PendingInputs */
var en_account_status_sub_pending = () => {
	return `Awaiting first payment`;
};
var am_account_status_sub_pending = () => {
	return `የመጀመሪያ ክፍያ በመጠባበቅ ላይ`;
};
/**
* | output |
* | --- |
* | "Awaiting first payment" |
*
* @param {Account_Status_Sub_PendingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_sub_pending = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_sub_pending();
	return en_account_status_sub_pending();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_sub_active.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_Sub_ActiveInputs */
var en_account_status_sub_active = () => {
	return `Renewing automatically`;
};
var am_account_status_sub_active = () => {
	return `በራስ-ሰር እየታደሰ ነው`;
};
/**
* | output |
* | --- |
* | "Renewing automatically" |
*
* @param {Account_Status_Sub_ActiveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_sub_active = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_sub_active();
	return en_account_status_sub_active();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_sub_paused.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_Sub_PausedInputs */
var en_account_status_sub_paused = () => {
	return `Paused — resume anytime`;
};
var am_account_status_sub_paused = () => {
	return `ባለ እረፍት — በማንኛውም ጊዜ ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Paused — resume anytime" |
*
* @param {Account_Status_Sub_PausedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_sub_paused = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_sub_paused();
	return en_account_status_sub_paused();
});
//#endregion
//#region src/lib/paraglide/messages/account_status_sub_cancelled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Status_Sub_CancelledInputs */
var en_account_status_sub_cancelled = () => {
	return `Subscription ended`;
};
var am_account_status_sub_cancelled = () => {
	return `ምዝገባው አብቅቷል`;
};
/**
* | output |
* | --- |
* | "Subscription ended" |
*
* @param {Account_Status_Sub_CancelledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_status_sub_cancelled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_status_sub_cancelled();
	return en_account_status_sub_cancelled();
});
//#endregion
//#region src/lib/paraglide/messages/account_no_subs_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_No_Subs_EyebrowInputs */
var en_account_no_subs_eyebrow = () => {
	return `No subscriptions`;
};
var am_account_no_subs_eyebrow = () => {
	return `ምዝገባዎች የሉም`;
};
/**
* | output |
* | --- |
* | "No subscriptions" |
*
* @param {Account_No_Subs_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_no_subs_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_no_subs_eyebrow();
	return en_account_no_subs_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/account_no_subs_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_No_Subs_TitleInputs */
var en_account_no_subs_title = () => {
	return `You're not subscribed yet.`;
};
var am_account_no_subs_title = () => {
	return `እስካሁን አልተመዘገቡም።`;
};
/**
* | output |
* | --- |
* | "You're not subscribed yet." |
*
* @param {Account_No_Subs_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_no_subs_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_no_subs_title();
	return en_account_no_subs_title();
});
//#endregion
//#region src/lib/paraglide/messages/account_no_subs_detail.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_No_Subs_DetailInputs */
var en_account_no_subs_detail = () => {
	return `Start a plan to get injera delivered every month.`;
};
var am_account_no_subs_detail = () => {
	return `እንጀራ በየወሩ እንዲደርስዎት ዕቅድ ይጀምሩ።`;
};
/**
* | output |
* | --- |
* | "Start a plan to get injera delivered every month." |
*
* @param {Account_No_Subs_DetailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_no_subs_detail = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_no_subs_detail();
	return en_account_no_subs_detail();
});
//#endregion
//#region src/lib/paraglide/messages/account_choose_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Choose_PlanInputs */
var en_account_choose_plan = () => {
	return `Choose a plan`;
};
var am_account_choose_plan = () => {
	return `ዕቅድ ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose a plan" |
*
* @param {Account_Choose_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_choose_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_choose_plan();
	return en_account_choose_plan();
});
//#endregion
//#region src/lib/paraglide/messages/account_subscription_singular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Subscription_SingularInputs */
var en_account_subscription_singular = () => {
	return `subscription`;
};
var am_account_subscription_singular = () => {
	return `ምዝገባ`;
};
/**
* | output |
* | --- |
* | "subscription" |
*
* @param {Account_Subscription_SingularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_subscription_singular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_subscription_singular();
	return en_account_subscription_singular();
});
//#endregion
//#region src/lib/paraglide/messages/account_subscription_plural.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Subscription_PluralInputs */
var en_account_subscription_plural = () => {
	return `subscriptions`;
};
var am_account_subscription_plural = () => {
	return `ምዝገባዎች`;
};
/**
* | output |
* | --- |
* | "subscriptions" |
*
* @param {Account_Subscription_PluralInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_subscription_plural = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_subscription_plural();
	return en_account_subscription_plural();
});
//#endregion
//#region src/lib/paraglide/messages/account_chip_active.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Account_Chip_ActiveInputs */
var en_account_chip_active = (i) => {
	return `${i?.count} active`;
};
var am_account_chip_active = (i) => {
	return `${i?.count} ገቢር`;
};
/**
* | output |
* | --- |
* | "{count} active" |
*
* @param {Account_Chip_ActiveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_chip_active = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_chip_active(inputs);
	return en_account_chip_active(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_chip_paused.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Account_Chip_PausedInputs */
var en_account_chip_paused = (i) => {
	return `${i?.count} paused`;
};
var am_account_chip_paused = (i) => {
	return `${i?.count} ባለ እረፍት`;
};
/**
* | output |
* | --- |
* | "{count} paused" |
*
* @param {Account_Chip_PausedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_chip_paused = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_chip_paused(inputs);
	return en_account_chip_paused(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_chip_units.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Account_Chip_UnitsInputs */
var en_account_chip_units = (i) => {
	return `${i?.count} units`;
};
var am_account_chip_units = (i) => {
	return `${i?.count} ክፍሎች`;
};
/**
* | output |
* | --- |
* | "{count} units" |
*
* @param {Account_Chip_UnitsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_chip_units = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_chip_units(inputs);
	return en_account_chip_units(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_month_combined.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Month_CombinedInputs */
var en_account_month_combined = () => {
	return `/ month combined`;
};
var am_account_month_combined = () => {
	return `/ በወር በጠቅላላ`;
};
/**
* | output |
* | --- |
* | "/ month combined" |
*
* @param {Account_Month_CombinedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_month_combined = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_month_combined();
	return en_account_month_combined();
});
//#endregion
//#region src/lib/paraglide/messages/account_change_plan_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Change_Plan_LinkInputs */
var en_account_change_plan_link = () => {
	return `Change plan →`;
};
var am_account_change_plan_link = () => {
	return `ዕቅድ ይቀይሩ →`;
};
/**
* | output |
* | --- |
* | "Change plan →" |
*
* @param {Account_Change_Plan_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_change_plan_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_change_plan_link();
	return en_account_change_plan_link();
});
//#endregion
//#region src/lib/paraglide/messages/account_qty_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ quantity: NonNullable<unknown> }} Account_Qty_LabelInputs */
var en_account_qty_label = (i) => {
	return `Qty ${i?.quantity}`;
};
var am_account_qty_label = (i) => {
	return `ብዛት ${i?.quantity}`;
};
/**
* | output |
* | --- |
* | "Qty {quantity}" |
*
* @param {Account_Qty_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_qty_label = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_qty_label(inputs);
	return en_account_qty_label(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_notice_cancelling.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Notice_CancellingInputs */
var en_account_notice_cancelling = () => {
	return `This plan is cancelling.`;
};
var am_account_notice_cancelling = () => {
	return `ይህ ዕቅድ እየተሰረዘ ነው።`;
};
/**
* | output |
* | --- |
* | "This plan is cancelling." |
*
* @param {Account_Notice_CancellingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_notice_cancelling = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_notice_cancelling();
	return en_account_notice_cancelling();
});
//#endregion
//#region src/lib/paraglide/messages/account_notice_cancelling_with_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Account_Notice_Cancelling_With_DateInputs */
var en_account_notice_cancelling_with_date = (i) => {
	return `This plan is cancelling — ends ${i?.date}.`;
};
var am_account_notice_cancelling_with_date = (i) => {
	return `ይህ ዕቅድ እየተሰረዘ ነው — እስከ ${i?.date} ድረስ ይቆያል።`;
};
/**
* | output |
* | --- |
* | "This plan is cancelling — ends {date}." |
*
* @param {Account_Notice_Cancelling_With_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_notice_cancelling_with_date = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_notice_cancelling_with_date(inputs);
	return en_account_notice_cancelling_with_date(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_notice_switching.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ plan: NonNullable<unknown> }} Account_Notice_SwitchingInputs */
var en_account_notice_switching = (i) => {
	return `Switching to ${i?.plan}.`;
};
var am_account_notice_switching = (i) => {
	return `ወደ ${i?.plan} በመቀየር ላይ።`;
};
/**
* | output |
* | --- |
* | "Switching to {plan}." |
*
* @param {Account_Notice_SwitchingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_notice_switching = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_notice_switching(inputs);
	return en_account_notice_switching(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_notice_switching_with_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ plan: NonNullable<unknown>, date: NonNullable<unknown> }} Account_Notice_Switching_With_DateInputs */
var en_account_notice_switching_with_date = (i) => {
	return `Switching to ${i?.plan} on ${i?.date}.`;
};
var am_account_notice_switching_with_date = (i) => {
	return `ወደ ${i?.plan} በ${i?.date} ይቀየራል።`;
};
/**
* | output |
* | --- |
* | "Switching to {plan} on {date}." |
*
* @param {Account_Notice_Switching_With_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_notice_switching_with_date = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_notice_switching_with_date(inputs);
	return en_account_notice_switching_with_date(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_next_delivery_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Next_Delivery_EyebrowInputs */
var en_account_next_delivery_eyebrow = () => {
	return `Next Delivery`;
};
var am_account_next_delivery_eyebrow = () => {
	return `ቀጣይ ማድረሻ`;
};
/**
* | output |
* | --- |
* | "Next Delivery" |
*
* @param {Account_Next_Delivery_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_next_delivery_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_next_delivery_eyebrow();
	return en_account_next_delivery_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/account_cutoff_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ cutoff: NonNullable<unknown> }} Account_Cutoff_LabelInputs */
var en_account_cutoff_label = (i) => {
	return `Cut-off ${i?.cutoff}`;
};
var am_account_cutoff_label = (i) => {
	return `የመጨረሻ ጊዜ ${i?.cutoff}`;
};
/**
* | output |
* | --- |
* | "Cut-off {cutoff}" |
*
* @param {Account_Cutoff_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_cutoff_label = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_cutoff_label(inputs);
	return en_account_cutoff_label(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_no_delivery_scheduled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_No_Delivery_ScheduledInputs */
var en_account_no_delivery_scheduled = () => {
	return `No delivery scheduled`;
};
var am_account_no_delivery_scheduled = () => {
	return `ምንም ማድረሻ አልታቀደም`;
};
/**
* | output |
* | --- |
* | "No delivery scheduled" |
*
* @param {Account_No_Delivery_ScheduledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_no_delivery_scheduled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_no_delivery_scheduled();
	return en_account_no_delivery_scheduled();
});
//#endregion
//#region src/lib/paraglide/messages/account_delivery_note_paused.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Delivery_Note_PausedInputs */
var en_account_delivery_note_paused = () => {
	return `This plan is paused.`;
};
var am_account_delivery_note_paused = () => {
	return `ይህ ዕቅድ ባለ እረፍት ላይ ነው።`;
};
/**
* | output |
* | --- |
* | "This plan is paused." |
*
* @param {Account_Delivery_Note_PausedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_delivery_note_paused = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_delivery_note_paused();
	return en_account_delivery_note_paused();
});
//#endregion
//#region src/lib/paraglide/messages/account_delivery_note_cancelled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Delivery_Note_CancelledInputs */
var en_account_delivery_note_cancelled = () => {
	return `This plan has ended.`;
};
var am_account_delivery_note_cancelled = () => {
	return `ይህ ዕቅድ አብቅቷል።`;
};
/**
* | output |
* | --- |
* | "This plan has ended." |
*
* @param {Account_Delivery_Note_CancelledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_delivery_note_cancelled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_delivery_note_cancelled();
	return en_account_delivery_note_cancelled();
});
//#endregion
//#region src/lib/paraglide/messages/account_delivery_note_usually_sent.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ address: NonNullable<unknown> }} Account_Delivery_Note_Usually_SentInputs */
var en_account_delivery_note_usually_sent = (i) => {
	return `Usually sent to ${i?.address}.`;
};
var am_account_delivery_note_usually_sent = (i) => {
	return `አብዛኛውን ጊዜ ወደ ${i?.address} ይላካል።`;
};
/**
* | output |
* | --- |
* | "Usually sent to {address}." |
*
* @param {Account_Delivery_Note_Usually_SentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_delivery_note_usually_sent = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_delivery_note_usually_sent(inputs);
	return en_account_delivery_note_usually_sent(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_delivery_note_not_scheduled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Delivery_Note_Not_ScheduledInputs */
var en_account_delivery_note_not_scheduled = () => {
	return `Your next delivery hasn't been scheduled yet.`;
};
var am_account_delivery_note_not_scheduled = () => {
	return `ቀጣይ ማድረሻዎ እስካሁን አልታቀደም።`;
};
/**
* | output |
* | --- |
* | "Your next delivery hasn't been scheduled yet." |
*
* @param {Account_Delivery_Note_Not_ScheduledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_delivery_note_not_scheduled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_delivery_note_not_scheduled();
	return en_account_delivery_note_not_scheduled();
});
//#endregion
//#region src/lib/paraglide/messages/account_skip_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Skip_DeliveryInputs */
var en_account_skip_delivery = () => {
	return `Skip delivery`;
};
var am_account_skip_delivery = () => {
	return `ማድረሻ ይዝለሉ`;
};
/**
* | output |
* | --- |
* | "Skip delivery" |
*
* @param {Account_Skip_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_skip_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_skip_delivery();
	return en_account_skip_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/account_resume_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Resume_PlanInputs */
var en_account_resume_plan = () => {
	return `Resume plan`;
};
var am_account_resume_plan = () => {
	return `ዕቅድ ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Resume plan" |
*
* @param {Account_Resume_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_resume_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_resume_plan();
	return en_account_resume_plan();
});
//#endregion
//#region src/lib/paraglide/messages/account_pause_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Pause_PlanInputs */
var en_account_pause_plan = () => {
	return `Pause plan`;
};
var am_account_pause_plan = () => {
	return `ዕቅድ ያቁሙ`;
};
/**
* | output |
* | --- |
* | "Pause plan" |
*
* @param {Account_Pause_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_pause_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_pause_plan();
	return en_account_pause_plan();
});
//#endregion
//#region src/lib/paraglide/messages/account_cancel_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Cancel_PlanInputs */
var en_account_cancel_plan = () => {
	return `Cancel plan`;
};
var am_account_cancel_plan = () => {
	return `ዕቅድ ይሰርዙ`;
};
/**
* | output |
* | --- |
* | "Cancel plan" |
*
* @param {Account_Cancel_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_cancel_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_cancel_plan();
	return en_account_cancel_plan();
});
//#endregion
//#region src/lib/paraglide/messages/account_stat_plan_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Stat_Plan_LabelInputs */
var en_account_stat_plan_label = () => {
	return `Plan`;
};
var am_account_stat_plan_label = () => {
	return `ዕቅድ`;
};
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Account_Stat_Plan_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_stat_plan_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_stat_plan_label();
	return en_account_stat_plan_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_stat_next_payment_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Stat_Next_Payment_LabelInputs */
var en_account_stat_next_payment_label = () => {
	return `Next Payment`;
};
var am_account_stat_next_payment_label = () => {
	return `ቀጣይ ክፍያ`;
};
/**
* | output |
* | --- |
* | "Next Payment" |
*
* @param {Account_Stat_Next_Payment_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_stat_next_payment_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_stat_next_payment_label();
	return en_account_stat_next_payment_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_stat_status_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Stat_Status_LabelInputs */
var en_account_stat_status_label = () => {
	return `Status`;
};
var am_account_stat_status_label = () => {
	return `ሁኔታ`;
};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Account_Stat_Status_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_stat_status_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_stat_status_label();
	return en_account_stat_status_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_add_to_delivery_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Add_To_Delivery_TitleInputs */
var en_account_add_to_delivery_title = () => {
	return `Add to a delivery`;
};
var am_account_add_to_delivery_title = () => {
	return `ወደ ማድረሻ ይጨምሩ`;
};
/**
* | output |
* | --- |
* | "Add to a delivery" |
*
* @param {Account_Add_To_Delivery_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_add_to_delivery_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_add_to_delivery_title();
	return en_account_add_to_delivery_title();
});
//#endregion
//#region src/lib/paraglide/messages/account_before_cutoff.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ cutoff: NonNullable<unknown> }} Account_Before_CutoffInputs */
var en_account_before_cutoff = (i) => {
	return `Before ${i?.cutoff}`;
};
var am_account_before_cutoff = (i) => {
	return `ከ${i?.cutoff} በፊት`;
};
/**
* | output |
* | --- |
* | "Before {cutoff}" |
*
* @param {Account_Before_CutoffInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_before_cutoff = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_before_cutoff(inputs);
	return en_account_before_cutoff(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_no_upcoming_deliveries.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_No_Upcoming_DeliveriesInputs */
var en_account_no_upcoming_deliveries = () => {
	return `No upcoming deliveries to add to right now.`;
};
var am_account_no_upcoming_deliveries = () => {
	return `አሁን ላይ ምንም ቀጣይ ማድረሻዎች ወደ የሚጨመርበት የለም።`;
};
/**
* | output |
* | --- |
* | "No upcoming deliveries to add to right now." |
*
* @param {Account_No_Upcoming_DeliveriesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_no_upcoming_deliveries = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_no_upcoming_deliveries();
	return en_account_no_upcoming_deliveries();
});
//#endregion
//#region src/lib/paraglide/messages/account_adding_to_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Adding_To_LabelInputs */
var en_account_adding_to_label = () => {
	return `Adding to`;
};
var am_account_adding_to_label = () => {
	return `የሚጨመርበት`;
};
/**
* | output |
* | --- |
* | "Adding to" |
*
* @param {Account_Adding_To_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_adding_to_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_adding_to_label();
	return en_account_adding_to_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_add_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Add_ButtonInputs */
var en_account_add_button = () => {
	return `Add`;
};
var am_account_add_button = () => {
	return `ጨምር`;
};
/**
* | output |
* | --- |
* | "Add" |
*
* @param {Account_Add_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_add_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_add_button();
	return en_account_add_button();
});
//#endregion
//#region src/lib/paraglide/messages/account_see_all_addons.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_See_All_AddonsInputs */
var en_account_see_all_addons = () => {
	return `See all add-ons →`;
};
var am_account_see_all_addons = () => {
	return `ሁሉንም ተጨማሪዎች ይመልከቱ →`;
};
/**
* | output |
* | --- |
* | "See all add-ons →" |
*
* @param {Account_See_All_AddonsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_see_all_addons = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_see_all_addons();
	return en_account_see_all_addons();
});
//#endregion
//#region src/routes/account/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let quantities = Object.fromEntries(data.addons.map((a) => [a.id, 0]));
		const activeCount = derived(() => data.subscriptions.filter((s) => s.status === "active").length);
		const pausedCount = derived(() => data.subscriptions.filter((s) => s.status === "paused").length);
		const totalMonthlyPence = derived(() => data.subscriptions.reduce((sum, s) => sum + s.pricePence, 0));
		const totalUnits = derived(() => data.subscriptions.reduce((sum, s) => sum + (s.quantity ?? 1), 0));
		const deliverableSubs = derived(() => data.subscriptions.filter((s) => s.nextDelivery));
		let selectedSubId = derived(() => deliverableSubs()[0]?.id ?? "");
		const selectedDelivery = derived(() => deliverableSubs().find((s) => s.id === selectedSubId())?.nextDelivery ?? null);
		const gbp = (pence) => `£${(pence / 100).toFixed(2)}`;
		const statusLabel = derived(() => ({
			pending: account_status_pending(),
			active: account_status_active(),
			paused: account_status_paused(),
			cancelled: account_status_cancelled()
		}));
		const statusSub = derived(() => ({
			pending: account_status_sub_pending(),
			active: account_status_sub_active(),
			paused: account_status_sub_paused(),
			cancelled: account_status_sub_cancelled()
		}));
		if (data.subscriptions.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="block svelte-8i5vi8"><div class="delivery-card svelte-8i5vi8"><div><span class="delivery-card-eyebrow svelte-8i5vi8">${escape_html(account_no_subs_eyebrow())}</span> <div class="delivery-date svelte-8i5vi8">${escape_html(account_no_subs_title())}</div> <div class="delivery-detail svelte-8i5vi8">${escape_html(account_no_subs_detail())}</div></div> <div class="delivery-btns svelte-8i5vi8"><a href="/subscribe" class="btn btn-full svelte-8i5vi8">${escape_html(account_choose_plan())}</a></div></div></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="summary-bar svelte-8i5vi8"><div class="summary-count svelte-8i5vi8"><span class="summary-n svelte-8i5vi8">${escape_html(data.subscriptions.length)}</span> <span class="summary-label svelte-8i5vi8">${escape_html(data.subscriptions.length === 1 ? account_subscription_singular() : account_subscription_plural())}</span></div> <div class="summary-breakdown svelte-8i5vi8">`);
			if (activeCount()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="summary-chip chip-active svelte-8i5vi8">${escape_html(account_chip_active({ count: activeCount() }))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (pausedCount()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="summary-chip chip-paused svelte-8i5vi8">${escape_html(account_chip_paused({ count: pausedCount() }))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (totalUnits() > data.subscriptions.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="summary-chip svelte-8i5vi8">${escape_html(account_chip_units({ count: totalUnits() }))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="summary-total svelte-8i5vi8">${escape_html(gbp(totalMonthlyPence()))} <span class="summary-total-label svelte-8i5vi8">${escape_html(account_month_combined())}</span></span></div></div> <!--[-->`);
			const each_array = ensure_array_like(data.subscriptions);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let sub = each_array[$$index];
				$$renderer.push(`<div class="block svelte-8i5vi8"><div class="block-header svelte-8i5vi8"><h2 class="svelte-8i5vi8">${escape_html(sub.planName)} `);
				if (sub.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="qty-pill svelte-8i5vi8">×${escape_html(sub.quantity)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span${attr_class(`status-pill status-${stringify$1(sub.status)}`, "svelte-8i5vi8")}>${escape_html(statusLabel()[sub.status] ?? sub.status)}</span></h2> <a${attr("href", `/account/change-plan?subscriptionId=${stringify$1(sub.id)}`)} class="block-action svelte-8i5vi8">${escape_html(account_change_plan_link())}</a></div> <div class="plan-meta-row svelte-8i5vi8"><span>${escape_html(sub.packsLabel)}</span> `);
				if (sub.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span>· ${escape_html(account_qty_label({ quantity: sub.quantity }))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (sub.addressLine) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span>· ${escape_html(sub.addressLine)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> `);
				if (sub.cancelAtPeriodEnd) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="notice notice-warning svelte-8i5vi8">`);
					if (sub.nextPaymentDate) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`${escape_html(account_notice_cancelling_with_date({ date: sub.nextPaymentDate }))}`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`${escape_html(account_notice_cancelling())}`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else if (sub.pendingPlanName) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<div class="notice svelte-8i5vi8">`);
					if (sub.pendingPlanAt) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`${escape_html(account_notice_switching_with_date({
							plan: sub.pendingPlanName,
							date: sub.pendingPlanAt
						}))}`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`${escape_html(account_notice_switching({ plan: sub.pendingPlanName }))}`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="delivery-card svelte-8i5vi8"><div><span class="delivery-card-eyebrow svelte-8i5vi8">${escape_html(account_next_delivery_eyebrow())}</span> `);
				if (sub.nextDelivery) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="delivery-date svelte-8i5vi8">${escape_html(sub.nextDelivery.dateLabel)}</div> <div class="delivery-detail svelte-8i5vi8">${escape_html(sub.nextDelivery.addressLine)}</div> <span class="cutoff svelte-8i5vi8">${escape_html(account_cutoff_label({ cutoff: sub.nextDelivery.cutoffLabel }))}</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="delivery-date svelte-8i5vi8">${escape_html(account_no_delivery_scheduled())}</div> <div class="delivery-detail svelte-8i5vi8">`);
					if (sub.status === "paused") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`${escape_html(account_delivery_note_paused())}`);
					} else if (sub.status === "cancelled") {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`${escape_html(account_delivery_note_cancelled())}`);
					} else if (sub.addressLine) {
						$$renderer.push("<!--[2-->");
						$$renderer.push(`${escape_html(account_delivery_note_usually_sent({ address: sub.addressLine }))}`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`${escape_html(account_delivery_note_not_scheduled())}`);
					}
					$$renderer.push(`<!--]--></div>`);
				}
				$$renderer.push(`<!--]--></div> <div class="delivery-btns svelte-8i5vi8">`);
				if (sub.nextDelivery) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<form method="POST" action="?/skip"><input type="hidden" name="deliveryId"${attr("value", sub.nextDelivery.id)}/> <button type="submit" class="btn-ghost btn-full svelte-8i5vi8">${escape_html(account_skip_delivery())}</button></form>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (sub.status === "paused") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<form method="POST" action="?/resume"><input type="hidden" name="subscriptionId"${attr("value", sub.id)}/> <button type="submit" class="btn-ghost btn-full svelte-8i5vi8">${escape_html(account_resume_plan())}</button></form>`);
				} else if (sub.status === "active" && !sub.cancelAtPeriodEnd) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<form method="POST" action="?/pause"><input type="hidden" name="subscriptionId"${attr("value", sub.id)}/> <button type="submit" class="btn-ghost btn-full svelte-8i5vi8">${escape_html(account_pause_plan())}</button></form>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (sub.status !== "cancelled" && !sub.cancelAtPeriodEnd) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", `/account/cancel?subscriptionId=${stringify$1(sub.id)}`)} class="btn-ghost btn-full svelte-8i5vi8">${escape_html(account_cancel_plan())}</a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="stats-row svelte-8i5vi8"><div class="stat svelte-8i5vi8"><span class="stat-label svelte-8i5vi8">${escape_html(account_stat_plan_label())}</span> <div class="stat-value svelte-8i5vi8">${escape_html(sub.planName)}</div> <div class="stat-sub svelte-8i5vi8">${escape_html(sub.packsLabel)}`);
				if (sub.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`· ${escape_html(account_qty_label({ quantity: sub.quantity }))}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="stat svelte-8i5vi8"><span class="stat-label svelte-8i5vi8">${escape_html(account_stat_next_payment_label())}</span> <div class="stat-value svelte-8i5vi8">${escape_html(gbp(sub.pricePence))}</div> <div class="stat-sub svelte-8i5vi8">`);
				if (sub.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`${escape_html(gbp(sub.unitPricePence))} × ${escape_html(sub.quantity)} ·`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->${escape_html(sub.nextPaymentDate ?? "—")}</div></div> <div class="stat svelte-8i5vi8"><span class="stat-label svelte-8i5vi8">${escape_html(account_stat_status_label())}</span> <div${attr_class("stat-value svelte-8i5vi8", void 0, { "green": sub.status === "active" })}>${escape_html(statusLabel()[sub.status] ?? sub.status)}</div> <div class="stat-sub svelte-8i5vi8">${escape_html(statusSub()[sub.status] ?? "")}</div></div></div></div>`);
			}
			$$renderer.push(`<!--]--> <div class="block svelte-8i5vi8" id="addons"><div class="block-header svelte-8i5vi8"><h2 class="svelte-8i5vi8">${escape_html(account_add_to_delivery_title())}</h2> `);
			if (selectedDelivery()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="block-action text-normal svelte-8i5vi8">${escape_html(account_before_cutoff({ cutoff: selectedDelivery().cutoffLabel }))}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (deliverableSubs().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="empty-note svelte-8i5vi8">${escape_html(account_no_upcoming_deliveries())}</p>`);
			} else {
				$$renderer.push("<!--[-1-->");
				if (deliverableSubs().length > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<label class="target-label svelte-8i5vi8" for="target-sub">${escape_html(account_adding_to_label())}</label> `);
					$$renderer.select({
						id: "target-sub",
						class: "target-select",
						value: selectedSubId()
					}, ($$renderer) => {
						$$renderer.push(`<!--[-->`);
						const each_array_1 = ensure_array_like(deliverableSubs());
						for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
							let s = each_array_1[$$index_1];
							$$renderer.option({ value: s.id }, ($$renderer) => {
								$$renderer.push(`${escape_html(s.planName)} — ${escape_html(s.nextDelivery?.dateLabel)}`);
							});
						}
						$$renderer.push(`<!--]-->`);
					}, "svelte-8i5vi8");
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="addons-row svelte-8i5vi8"><!--[-->`);
				const each_array_2 = ensure_array_like(data.addons);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let item = each_array_2[$$index_2];
					$$renderer.push(`<div class="addon svelte-8i5vi8"><div class="addon-img-placeholder svelte-8i5vi8"><span class="svelte-8i5vi8">${escape_html(item.name)}</span></div> <div class="addon-body svelte-8i5vi8"><div class="addon-head svelte-8i5vi8"><div class="addon-name svelte-8i5vi8">${escape_html(item.name)}</div> <div class="addon-price svelte-8i5vi8">${escape_html(gbp(item.pricePence))}</div></div> <div class="addon-desc svelte-8i5vi8">${escape_html(item.desc)}</div> <div class="addon-foot svelte-8i5vi8"><div class="qty svelte-8i5vi8"><button type="button" class="qty-btn svelte-8i5vi8">−</button> <div class="qty-n svelte-8i5vi8">${escape_html(quantities[item.id])}</div> <button type="button" class="qty-btn svelte-8i5vi8">+</button></div> <form method="POST" action="?/addAddon"><input type="hidden" name="addonId"${attr("value", item.id)}/> <input type="hidden" name="deliveryId"${attr("value", selectedDelivery()?.id ?? "")}/> <input type="hidden" name="quantity"${attr("value", quantities[item.id])}/> <button type="submit" class="btn-outline svelte-8i5vi8"${attr("disabled", !selectedDelivery() || quantities[item.id] < 1, true)}>${escape_html(account_add_button())}</button></form></div></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--> <a href="/addons" class="see-all svelte-8i5vi8">${escape_html(account_see_all_addons())}</a></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Du1J32Tn.js.map
