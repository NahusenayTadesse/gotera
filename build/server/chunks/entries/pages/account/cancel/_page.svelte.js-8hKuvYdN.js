import { a0 as head, a9 as escape_html, a4 as ensure_array_like, aa as attr_class, ae as store_get, $ as attr, af as unsubscribe_stores, T as derived } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import { a as toast } from '../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { b as superForm } from '../../../../chunks/client2.js--SBYKgBt.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-DMULTZRY.js';

//#region src/lib/paraglide/messages/acctcancel_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Page_TitleInputs */
var en_acctcancel_page_title = () => {
	return `Cancel a plan — GOTERA`;
};
var am_acctcancel_page_title = () => {
	return `እቅድ መሰረዝ — ጎቴራ`;
};
/**
* | output |
* | --- |
* | "Cancel a plan — GOTERA" |
*
* @param {Acctcancel_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_page_title();
	return en_acctcancel_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_EyebrowInputs */
var en_acctcancel_eyebrow = () => {
	return `Manage subscriptions`;
};
var am_acctcancel_eyebrow = () => {
	return `ደንበኝነት ምዝገባዎችን ያስተዳድሩ`;
};
/**
* | output |
* | --- |
* | "Manage subscriptions" |
*
* @param {Acctcancel_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_eyebrow();
	return en_acctcancel_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_HeadingInputs */
var en_acctcancel_heading = () => {
	return `Cancel a plan.`;
};
var am_acctcancel_heading = () => {
	return `እቅድ ሰርዝ።`;
};
/**
* | output |
* | --- |
* | "Cancel a plan." |
*
* @param {Acctcancel_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_heading();
	return en_acctcancel_heading();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown>, planWord: NonNullable<unknown> }} Acctcancel_LeadInputs */
var en_acctcancel_lead = (i) => {
	return `You have ${i?.count} active ${i?.planWord}. Cancelling one leaves the rest untouched.`;
};
var am_acctcancel_lead = (i) => {
	return `${i?.count} ንቁ ${i?.planWord} አለዎት። አንዱን መሰረዝ ሌሎቹን አይነካቸውም።`;
};
/**
* | output |
* | --- |
* | "You have {count} active {planWord}. Cancelling one leaves the rest untouched." |
*
* @param {Acctcancel_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_lead = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_lead(inputs);
	return en_acctcancel_lead(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_plan_word_singular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Plan_Word_SingularInputs */
var en_acctcancel_plan_word_singular = () => {
	return `plan`;
};
var am_acctcancel_plan_word_singular = () => {
	return `እቅድ`;
};
/**
* | output |
* | --- |
* | "plan" |
*
* @param {Acctcancel_Plan_Word_SingularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_plan_word_singular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_plan_word_singular();
	return en_acctcancel_plan_word_singular();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_plan_word_plural.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Plan_Word_PluralInputs */
var en_acctcancel_plan_word_plural = () => {
	return `plans`;
};
var am_acctcancel_plan_word_plural = () => {
	return `እቅዶች`;
};
/**
* | output |
* | --- |
* | "plans" |
*
* @param {Acctcancel_Plan_Word_PluralInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_plan_word_plural = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_plan_word_plural();
	return en_acctcancel_plan_word_plural();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_which_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Which_PlanInputs */
var en_acctcancel_which_plan = () => {
	return `Which plan?`;
};
var am_acctcancel_which_plan = () => {
	return `የትኛው እቅድ?`;
};
/**
* | output |
* | --- |
* | "Which plan?" |
*
* @param {Acctcancel_Which_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_which_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_which_plan();
	return en_acctcancel_which_plan();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_already_cancelling.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Already_CancellingInputs */
var en_acctcancel_already_cancelling = () => {
	return `Already cancelling`;
};
var am_acctcancel_already_cancelling = () => {
	return `አስቀድሞ በመሰረዝ ላይ`;
};
/**
* | output |
* | --- |
* | "Already cancelling" |
*
* @param {Acctcancel_Already_CancellingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_already_cancelling = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_already_cancelling();
	return en_acctcancel_already_cancelling();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_ends_on.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Acctcancel_Ends_OnInputs */
var en_acctcancel_ends_on = (i) => {
	return `ends ${i?.date}`;
};
var am_acctcancel_ends_on = (i) => {
	return `በ${i?.date} ያበቃል`;
};
/**
* | output |
* | --- |
* | "ends {date}" |
*
* @param {Acctcancel_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_ends_on = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_ends_on(inputs);
	return en_acctcancel_ends_on(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_keep_note_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Keep_Note_PrefixInputs */
var en_acctcancel_keep_note_prefix = () => {
	return `This plan stays active until`;
};
var am_acctcancel_keep_note_prefix = () => {
	return `ይህ እቅድ እስከ`;
};
/**
* | output |
* | --- |
* | "This plan stays active until" |
*
* @param {Acctcancel_Keep_Note_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_keep_note_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_keep_note_prefix();
	return en_acctcancel_keep_note_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_keep_note_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Keep_Note_SuffixInputs */
var en_acctcancel_keep_note_suffix = () => {
	return `You'll keep any delivery already paid for and won't be charged again after that.`;
};
var am_acctcancel_keep_note_suffix = () => {
	return `ድረስ ንቁ ሆኖ ይቆያል። አስቀድመው የተከፈለበትን ማንኛውንም ማድረሻ ያገኛሉ፣ ከዚያ በኋላም ተጨማሪ ክፍያ አይጠየቁም።`;
};
/**
* | output |
* | --- |
* | "You'll keep any delivery already paid for and won't be charged again after that." |
*
* @param {Acctcancel_Keep_Note_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_keep_note_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_keep_note_suffix();
	return en_acctcancel_keep_note_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_keep_note_no_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Keep_Note_No_DateInputs */
var en_acctcancel_keep_note_no_date = () => {
	return `Cancelling stops future charges. You'll keep anything already paid for.`;
};
var am_acctcancel_keep_note_no_date = () => {
	return `መሰረዝ ወደፊት የሚደረጉ ክፍያዎችን ያቆማል። አስቀድመው የከፈሉትን ማንኛውንም ነገር ያገኛሉ።`;
};
/**
* | output |
* | --- |
* | "Cancelling stops future charges. You'll keep anything already paid for." |
*
* @param {Acctcancel_Keep_Note_No_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_keep_note_no_date = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_keep_note_no_date();
	return en_acctcancel_keep_note_no_date();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_legend.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_LegendInputs */
var en_acctcancel_reason_legend = () => {
	return `Mind telling us why?`;
};
var am_acctcancel_reason_legend = () => {
	return `ለምን እንደሆነ ይንገሩን?`;
};
/**
* | output |
* | --- |
* | "Mind telling us why?" |
*
* @param {Acctcancel_Reason_LegendInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_legend = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_legend();
	return en_acctcancel_reason_legend();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_optional.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_OptionalInputs */
var en_acctcancel_optional = () => {
	return `optional`;
};
var am_acctcancel_optional = () => {
	return `አማራጭ`;
};
/**
* | output |
* | --- |
* | "optional" |
*
* @param {Acctcancel_OptionalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_optional = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_optional();
	return en_acctcancel_optional();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_too_expensive.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_Too_ExpensiveInputs */
var en_acctcancel_reason_too_expensive = () => {
	return `Too expensive`;
};
var am_acctcancel_reason_too_expensive = () => {
	return `በጣም ውድ ነው`;
};
/**
* | output |
* | --- |
* | "Too expensive" |
*
* @param {Acctcancel_Reason_Too_ExpensiveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_too_expensive = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_too_expensive();
	return en_acctcancel_reason_too_expensive();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_too_much_food.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_Too_Much_FoodInputs */
var en_acctcancel_reason_too_much_food = () => {
	return `Too much injera`;
};
var am_acctcancel_reason_too_much_food = () => {
	return `በጣም ብዙ እንጀራ ነው`;
};
/**
* | output |
* | --- |
* | "Too much injera" |
*
* @param {Acctcancel_Reason_Too_Much_FoodInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_too_much_food = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_too_much_food();
	return en_acctcancel_reason_too_much_food();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_taking_a_break.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_Taking_A_BreakInputs */
var en_acctcancel_reason_taking_a_break = () => {
	return `Just taking a break`;
};
var am_acctcancel_reason_taking_a_break = () => {
	return `እረፍት ብቻ እየወሰድኩ ነው`;
};
/**
* | output |
* | --- |
* | "Just taking a break" |
*
* @param {Acctcancel_Reason_Taking_A_BreakInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_taking_a_break = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_taking_a_break();
	return en_acctcancel_reason_taking_a_break();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_moving.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_MovingInputs */
var en_acctcancel_reason_moving = () => {
	return `Moving / delivery area`;
};
var am_acctcancel_reason_moving = () => {
	return `መዘዋወር / የማድረሻ አካባቢ`;
};
/**
* | output |
* | --- |
* | "Moving / delivery area" |
*
* @param {Acctcancel_Reason_MovingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_moving = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_moving();
	return en_acctcancel_reason_moving();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_quality.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_QualityInputs */
var en_acctcancel_reason_quality = () => {
	return `Not happy with quality`;
};
var am_acctcancel_reason_quality = () => {
	return `በጥራቱ ደስተኛ አይደለሁም`;
};
/**
* | output |
* | --- |
* | "Not happy with quality" |
*
* @param {Acctcancel_Reason_QualityInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_quality = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_quality();
	return en_acctcancel_reason_quality();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_reason_other.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Reason_OtherInputs */
var en_acctcancel_reason_other = () => {
	return `Something else`;
};
var am_acctcancel_reason_other = () => {
	return `ሌላ ነገር`;
};
/**
* | output |
* | --- |
* | "Something else" |
*
* @param {Acctcancel_Reason_OtherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_reason_other = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_reason_other();
	return en_acctcancel_reason_other();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_feedback_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Feedback_LabelInputs */
var en_acctcancel_feedback_label = () => {
	return `Anything we could do better?`;
};
var am_acctcancel_feedback_label = () => {
	return `ልናሻሽለው የምንችለው ነገር አለ?`;
};
/**
* | output |
* | --- |
* | "Anything we could do better?" |
*
* @param {Acctcancel_Feedback_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_feedback_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_feedback_label();
	return en_acctcancel_feedback_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_confirm_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Confirm_PrefixInputs */
var en_acctcancel_confirm_prefix = () => {
	return `I understand my`;
};
var am_acctcancel_confirm_prefix = () => {
	return `የእኔ`;
};
/**
* | output |
* | --- |
* | "I understand my" |
*
* @param {Acctcancel_Confirm_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_confirm_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_confirm_prefix();
	return en_acctcancel_confirm_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_confirm_will_end.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Confirm_Will_EndInputs */
var en_acctcancel_confirm_will_end = () => {
	return `plan will end.`;
};
var am_acctcancel_confirm_will_end = () => {
	return `እቅድ እንደሚያበቃ ተረድቻለሁ።`;
};
/**
* | output |
* | --- |
* | "plan will end." |
*
* @param {Acctcancel_Confirm_Will_EndInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_confirm_will_end = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_confirm_will_end();
	return en_acctcancel_confirm_will_end();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_confirm_will_end_on.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Acctcancel_Confirm_Will_End_OnInputs */
var en_acctcancel_confirm_will_end_on = (i) => {
	return `plan will end on ${i?.date}.`;
};
var am_acctcancel_confirm_will_end_on = (i) => {
	return `እቅድ በ${i?.date} እንደሚያበቃ ተረድቻለሁ።`;
};
/**
* | output |
* | --- |
* | "plan will end on {date}." |
*
* @param {Acctcancel_Confirm_Will_End_OnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_confirm_will_end_on = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_confirm_will_end_on(inputs);
	return en_acctcancel_confirm_will_end_on(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_keep_all_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Keep_All_ButtonInputs */
var en_acctcancel_keep_all_button = () => {
	return `Keep all my plans`;
};
var am_acctcancel_keep_all_button = () => {
	return `ሁሉንም እቅዶቼን አቆይ`;
};
/**
* | output |
* | --- |
* | "Keep all my plans" |
*
* @param {Acctcancel_Keep_All_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_keep_all_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_keep_all_button();
	return en_acctcancel_keep_all_button();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_submitting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_SubmittingInputs */
var en_acctcancel_submitting = () => {
	return `Cancelling…`;
};
var am_acctcancel_submitting = () => {
	return `በመሰረዝ ላይ…`;
};
/**
* | output |
* | --- |
* | "Cancelling…" |
*
* @param {Acctcancel_SubmittingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_submitting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_submitting();
	return en_acctcancel_submitting();
});
//#endregion
//#region src/lib/paraglide/messages/acctcancel_submit_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Submit_ButtonInputs */
var en_acctcancel_submit_button = () => {
	return `Cancel this plan`;
};
var am_acctcancel_submit_button = () => {
	return `ይህን እቅድ ሰርዝ`;
};
/**
* | output |
* | --- |
* | "Cancel this plan" |
*
* @param {Acctcancel_Submit_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_submit_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_submit_button();
	return en_acctcancel_submit_button();
});
//#endregion
//#region src/routes/account/cancel/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, submitting } = superForm(data.form, { onUpdated({ form }) {
			const msg = form.message;
			if (msg?.type === "error") toast.error(msg.text);
		} });
		const reasons = [
			{
				value: "too_expensive",
				label: acctcancel_reason_too_expensive()
			},
			{
				value: "too_much_food",
				label: acctcancel_reason_too_much_food()
			},
			{
				value: "taking_a_break",
				label: acctcancel_reason_taking_a_break()
			},
			{
				value: "moving",
				label: acctcancel_reason_moving()
			},
			{
				value: "quality",
				label: acctcancel_reason_quality()
			},
			{
				value: "other",
				label: acctcancel_reason_other()
			}
		];
		const selected = derived(() => data.plansList.find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).subscriptionId) ?? null);
		head("fkhsv7", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(acctcancel_page_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="wrap svelte-fkhsv7"><div class="card svelte-fkhsv7"><span class="eyebrow svelte-fkhsv7">${escape_html(acctcancel_eyebrow())}</span> <h1 class="svelte-fkhsv7">${escape_html(acctcancel_heading())}</h1> <p class="lead svelte-fkhsv7">${escape_html(acctcancel_lead({
			count: data.plansList.length,
			planWord: data.plansList.length === 1 ? acctcancel_plan_word_singular() : acctcancel_plan_word_plural()
		}))}</p> <form method="POST" class="form svelte-fkhsv7"><fieldset class="plan-list svelte-fkhsv7"><legend class="svelte-fkhsv7">${escape_html(acctcancel_which_plan())}</legend> <!--[-->`);
		const each_array = ensure_array_like(data.plansList);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let p = each_array[$$index];
			$$renderer.push(`<label${attr_class("plan-row svelte-fkhsv7", void 0, {
				"active": store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id,
				"disabled": p.cancelAtPeriodEnd
			})}><input type="radio" name="subscriptionId"${attr("value", p.id)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id, true)}${attr("disabled", p.cancelAtPeriodEnd, true)} class="svelte-fkhsv7"/> <div class="plan-info svelte-fkhsv7"><div class="plan-top svelte-fkhsv7"><span class="plan-name svelte-fkhsv7">${escape_html(p.planName)}</span> <span class="plan-price svelte-fkhsv7">£${escape_html(p.price.toFixed(2))}</span></div> <div class="plan-meta svelte-fkhsv7">`);
			if (p.addressLabel) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="plan-addr svelte-fkhsv7">${escape_html(p.addressLabel)}</span> ·`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->${escape_html(p.freq)}</div> `);
			if (p.cancelAtPeriodEnd) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="plan-flag svelte-fkhsv7">${escape_html(acctcancel_already_cancelling())}${escape_html(p.periodEndLabel ? ` — ${acctcancel_ends_on({ date: p.periodEndLabel })}` : "")}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></label>`);
		}
		$$renderer.push(`<!--]--></fieldset> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).subscriptionId) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-fkhsv7">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).subscriptionId)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (selected() && !selected().cancelAtPeriodEnd) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="keep-note svelte-fkhsv7">`);
			if (selected().periodEndLabel) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${escape_html(acctcancel_keep_note_prefix())} <strong class="svelte-fkhsv7">${escape_html(selected().periodEndLabel)}</strong>. ${escape_html(acctcancel_keep_note_suffix())}`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(acctcancel_keep_note_no_date())}`);
			}
			$$renderer.push(`<!--]--></div> <fieldset class="reasons svelte-fkhsv7"><legend class="svelte-fkhsv7">${escape_html(acctcancel_reason_legend())} <span class="opt svelte-fkhsv7">(${escape_html(acctcancel_optional())})</span></legend> <!--[-->`);
			const each_array_1 = ensure_array_like(reasons);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let r = each_array_1[$$index_1];
				$$renderer.push(`<label${attr_class("reason svelte-fkhsv7", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).reason === r.value })}><input type="radio" name="reason"${attr("value", r.value)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).reason === r.value, true)} class="svelte-fkhsv7"/> <span>${escape_html(r.label)}</span></label>`);
			}
			$$renderer.push(`<!--]--></fieldset> <div class="field svelte-fkhsv7"><label class="field-label svelte-fkhsv7" for="feedback">${escape_html(acctcancel_feedback_label())} <span class="opt svelte-fkhsv7">(${escape_html(acctcancel_optional())})</span></label> <textarea id="feedback" name="feedback" class="textarea svelte-fkhsv7" rows="3">`);
			const $$body = escape_html(store_get($$store_subs ??= {}, "$form", form).feedback);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea></div> <label class="confirm svelte-fkhsv7"><input type="checkbox" name="confirm"${attr("checked", store_get($$store_subs ??= {}, "$form", form).confirm, true)} class="svelte-fkhsv7"/> <span>${escape_html(acctcancel_confirm_prefix())} <strong class="svelte-fkhsv7">${escape_html(selected().planName)}</strong> ${escape_html(selected().periodEndLabel ? acctcancel_confirm_will_end_on({ date: selected().periodEndLabel }) : acctcancel_confirm_will_end())}</span></label> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).confirm) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-fkhsv7">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).confirm)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="actions svelte-fkhsv7"><a href="/account" class="btn btn-ghost svelte-fkhsv7">${escape_html(acctcancel_keep_all_button())}</a> <button type="submit" class="btn btn-danger svelte-fkhsv7"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting) || !selected() || selected().cancelAtPeriodEnd || !store_get($$store_subs ??= {}, "$form", form).confirm, true)}>${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? acctcancel_submitting() : acctcancel_submit_button())}</button></div></form></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-8hKuvYdN.js.map
