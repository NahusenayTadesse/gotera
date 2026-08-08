import { a0 as head, a9 as escape_html, a4 as ensure_array_like, aa as attr_class, ae as store_get, $ as attr, af as unsubscribe_stores, T as derived } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import { a as toast } from '../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import { g as goto } from '../../../../chunks/client.js-7a-rpZlk.js';
import { c as cancelSchema } from '../../../../chunks/schema.js-Cw7Bh0q_.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import { b as superForm } from '../../../../chunks/client2.js--SBYKgBt.js';
import { a as zodClient } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/access.js-HgBsL8za.js';
import '../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-DMULTZRY.js';
import '../../../../index.js-CNe0N484.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';

//#region src/lib/paraglide/messages/acctplan_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Page_TitleInputs */
var en_acctplan_page_title = () => {
	return `Cancel a plan — GOTERA`;
};
var am_acctplan_page_title = () => {
	return `እቅድ መሰረዝ — ጎቴራ`;
};
/**
* | output |
* | --- |
* | "Cancel a plan — GOTERA" |
*
* @param {Acctplan_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_page_title();
	return en_acctplan_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_EyebrowInputs */
var en_acctplan_eyebrow = () => {
	return `Manage subscriptions`;
};
var am_acctplan_eyebrow = () => {
	return `ደንበኝነት ምዝገባዎችን ያስተዳድሩ`;
};
/**
* | output |
* | --- |
* | "Manage subscriptions" |
*
* @param {Acctplan_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_eyebrow();
	return en_acctplan_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_HeadingInputs */
var en_acctplan_heading = () => {
	return `Cancel a plan.`;
};
var am_acctplan_heading = () => {
	return `እቅድ ሰርዝ።`;
};
/**
* | output |
* | --- |
* | "Cancel a plan." |
*
* @param {Acctplan_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_heading();
	return en_acctplan_heading();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_empty_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Empty_LeadInputs */
var en_acctplan_empty_lead = () => {
	return `You don't have any active plans to cancel.`;
};
var am_acctplan_empty_lead = () => {
	return `የሚሰርዙት ንቁ እቅድ የለዎትም።`;
};
/**
* | output |
* | --- |
* | "You don't have any active plans to cancel." |
*
* @param {Acctplan_Empty_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_empty_lead = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_empty_lead();
	return en_acctplan_empty_lead();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_back_to_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Back_To_AccountInputs */
var en_acctplan_back_to_account = () => {
	return `Back to account`;
};
var am_acctplan_back_to_account = () => {
	return `ወደ መለያ ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back to account" |
*
* @param {Acctplan_Back_To_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_back_to_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_back_to_account();
	return en_acctplan_back_to_account();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown>, planWord: NonNullable<unknown> }} Acctplan_LeadInputs */
var en_acctplan_lead = (i) => {
	return `You have ${i?.count} active ${i?.planWord}. Cancelling one leaves the rest untouched.`;
};
var am_acctplan_lead = (i) => {
	return `${i?.count} ንቁ ${i?.planWord} አለዎት። አንዱን መሰረዝ ሌሎቹን አይነካቸውም።`;
};
/**
* | output |
* | --- |
* | "You have {count} active {planWord}. Cancelling one leaves the rest untouched." |
*
* @param {Acctplan_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_lead = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_lead(inputs);
	return en_acctplan_lead(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_plan_word_singular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Plan_Word_SingularInputs */
var en_acctplan_plan_word_singular = () => {
	return `plan`;
};
var am_acctplan_plan_word_singular = () => {
	return `እቅድ`;
};
/**
* | output |
* | --- |
* | "plan" |
*
* @param {Acctplan_Plan_Word_SingularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_plan_word_singular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_plan_word_singular();
	return en_acctplan_plan_word_singular();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_plan_word_plural.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Plan_Word_PluralInputs */
var en_acctplan_plan_word_plural = () => {
	return `plans`;
};
var am_acctplan_plan_word_plural = () => {
	return `እቅዶች`;
};
/**
* | output |
* | --- |
* | "plans" |
*
* @param {Acctplan_Plan_Word_PluralInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_plan_word_plural = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_plan_word_plural();
	return en_acctplan_plan_word_plural();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_which_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Which_PlanInputs */
var en_acctplan_which_plan = () => {
	return `Which plan?`;
};
var am_acctplan_which_plan = () => {
	return `የትኛው እቅድ?`;
};
/**
* | output |
* | --- |
* | "Which plan?" |
*
* @param {Acctplan_Which_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_which_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_which_plan();
	return en_acctplan_which_plan();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_qty_pill.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ quantity: NonNullable<unknown> }} Acctplan_Qty_PillInputs */
var en_acctplan_qty_pill = (i) => {
	return `×${i?.quantity}`;
};
var am_acctplan_qty_pill = (i) => {
	return `×${i?.quantity}`;
};
/**
* | output |
* | --- |
* | "×{quantity}" |
*
* @param {Acctplan_Qty_PillInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_qty_pill = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_qty_pill(inputs);
	return en_acctplan_qty_pill(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_qty_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ quantity: NonNullable<unknown> }} Acctplan_Qty_SuffixInputs */
var en_acctplan_qty_suffix = (i) => {
	return `(×${i?.quantity})`;
};
var am_acctplan_qty_suffix = (i) => {
	return `(×${i?.quantity})`;
};
/**
* | output |
* | --- |
* | "(×{quantity})" |
*
* @param {Acctplan_Qty_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_qty_suffix = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_qty_suffix(inputs);
	return en_acctplan_qty_suffix(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_already_cancelling.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Already_CancellingInputs */
var en_acctplan_already_cancelling = () => {
	return `Already cancelling`;
};
var am_acctplan_already_cancelling = () => {
	return `አስቀድሞ በመሰረዝ ላይ`;
};
/**
* | output |
* | --- |
* | "Already cancelling" |
*
* @param {Acctplan_Already_CancellingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_already_cancelling = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_already_cancelling();
	return en_acctplan_already_cancelling();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_ends_on.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Acctplan_Ends_OnInputs */
var en_acctplan_ends_on = (i) => {
	return `ends ${i?.date}`;
};
var am_acctplan_ends_on = (i) => {
	return `በ${i?.date} ያበቃል`;
};
/**
* | output |
* | --- |
* | "ends {date}" |
*
* @param {Acctplan_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_ends_on = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_ends_on(inputs);
	return en_acctplan_ends_on(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_keep_note_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Keep_Note_PrefixInputs */
var en_acctplan_keep_note_prefix = () => {
	return `This plan stays active until`;
};
var am_acctplan_keep_note_prefix = () => {
	return `ይህ እቅድ እስከ`;
};
/**
* | output |
* | --- |
* | "This plan stays active until" |
*
* @param {Acctplan_Keep_Note_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_keep_note_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_keep_note_prefix();
	return en_acctplan_keep_note_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_keep_note_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Keep_Note_SuffixInputs */
var en_acctplan_keep_note_suffix = () => {
	return `You'll keep any delivery already paid for and won't be charged again after that.`;
};
var am_acctplan_keep_note_suffix = () => {
	return `ድረስ ንቁ ሆኖ ይቆያል። አስቀድመው የተከፈለበትን ማንኛውንም ማድረሻ ያገኛሉ፣ ከዚያ በኋላም ተጨማሪ ክፍያ አይጠየቁም።`;
};
/**
* | output |
* | --- |
* | "You'll keep any delivery already paid for and won't be charged again after that." |
*
* @param {Acctplan_Keep_Note_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_keep_note_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_keep_note_suffix();
	return en_acctplan_keep_note_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_keep_note_no_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Keep_Note_No_DateInputs */
var en_acctplan_keep_note_no_date = () => {
	return `Cancelling stops future charges. You'll keep anything already paid for.`;
};
var am_acctplan_keep_note_no_date = () => {
	return `መሰረዝ ወደፊት የሚደረጉ ክፍያዎችን ያቆማል። አስቀድመው የከፈሉትን ማንኛውንም ነገር ያገኛሉ።`;
};
/**
* | output |
* | --- |
* | "Cancelling stops future charges. You'll keep anything already paid for." |
*
* @param {Acctplan_Keep_Note_No_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_keep_note_no_date = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_keep_note_no_date();
	return en_acctplan_keep_note_no_date();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_legend.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_LegendInputs */
var en_acctplan_reason_legend = () => {
	return `Mind telling us why?`;
};
var am_acctplan_reason_legend = () => {
	return `ለምን እንደሆነ ይንገሩን?`;
};
/**
* | output |
* | --- |
* | "Mind telling us why?" |
*
* @param {Acctplan_Reason_LegendInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_legend = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_legend();
	return en_acctplan_reason_legend();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_optional.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_OptionalInputs */
var en_acctplan_optional = () => {
	return `optional`;
};
var am_acctplan_optional = () => {
	return `አማራጭ`;
};
/**
* | output |
* | --- |
* | "optional" |
*
* @param {Acctplan_OptionalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_optional = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_optional();
	return en_acctplan_optional();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_too_expensive.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_Too_ExpensiveInputs */
var en_acctplan_reason_too_expensive = () => {
	return `Too expensive`;
};
var am_acctplan_reason_too_expensive = () => {
	return `በጣም ውድ ነው`;
};
/**
* | output |
* | --- |
* | "Too expensive" |
*
* @param {Acctplan_Reason_Too_ExpensiveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_too_expensive = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_too_expensive();
	return en_acctplan_reason_too_expensive();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_too_much_food.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_Too_Much_FoodInputs */
var en_acctplan_reason_too_much_food = () => {
	return `Too much injera`;
};
var am_acctplan_reason_too_much_food = () => {
	return `በጣም ብዙ እንጀራ ነው`;
};
/**
* | output |
* | --- |
* | "Too much injera" |
*
* @param {Acctplan_Reason_Too_Much_FoodInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_too_much_food = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_too_much_food();
	return en_acctplan_reason_too_much_food();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_taking_a_break.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_Taking_A_BreakInputs */
var en_acctplan_reason_taking_a_break = () => {
	return `Just taking a break`;
};
var am_acctplan_reason_taking_a_break = () => {
	return `እረፍት ብቻ እየወሰድኩ ነው`;
};
/**
* | output |
* | --- |
* | "Just taking a break" |
*
* @param {Acctplan_Reason_Taking_A_BreakInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_taking_a_break = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_taking_a_break();
	return en_acctplan_reason_taking_a_break();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_moving.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_MovingInputs */
var en_acctplan_reason_moving = () => {
	return `Moving / delivery area`;
};
var am_acctplan_reason_moving = () => {
	return `መዘዋወር / የማድረሻ አካባቢ`;
};
/**
* | output |
* | --- |
* | "Moving / delivery area" |
*
* @param {Acctplan_Reason_MovingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_moving = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_moving();
	return en_acctplan_reason_moving();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_quality.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_QualityInputs */
var en_acctplan_reason_quality = () => {
	return `Not happy with quality`;
};
var am_acctplan_reason_quality = () => {
	return `በጥራቱ ደስተኛ አይደለሁም`;
};
/**
* | output |
* | --- |
* | "Not happy with quality" |
*
* @param {Acctplan_Reason_QualityInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_quality = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_quality();
	return en_acctplan_reason_quality();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_reason_other.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Reason_OtherInputs */
var en_acctplan_reason_other = () => {
	return `Something else`;
};
var am_acctplan_reason_other = () => {
	return `ሌላ ነገር`;
};
/**
* | output |
* | --- |
* | "Something else" |
*
* @param {Acctplan_Reason_OtherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_reason_other = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_reason_other();
	return en_acctplan_reason_other();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_feedback_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Feedback_LabelInputs */
var en_acctplan_feedback_label = () => {
	return `Anything we could do better?`;
};
var am_acctplan_feedback_label = () => {
	return `ልናሻሽለው የምንችለው ነገር አለ?`;
};
/**
* | output |
* | --- |
* | "Anything we could do better?" |
*
* @param {Acctplan_Feedback_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_feedback_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_feedback_label();
	return en_acctplan_feedback_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_confirm_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Confirm_PrefixInputs */
var en_acctplan_confirm_prefix = () => {
	return `I understand my`;
};
var am_acctplan_confirm_prefix = () => {
	return `የእኔ`;
};
/**
* | output |
* | --- |
* | "I understand my" |
*
* @param {Acctplan_Confirm_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_confirm_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_confirm_prefix();
	return en_acctplan_confirm_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_confirm_will_end.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Confirm_Will_EndInputs */
var en_acctplan_confirm_will_end = () => {
	return `plan will end.`;
};
var am_acctplan_confirm_will_end = () => {
	return `እቅድ እንደሚያበቃ ተረድቻለሁ።`;
};
/**
* | output |
* | --- |
* | "plan will end." |
*
* @param {Acctplan_Confirm_Will_EndInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_confirm_will_end = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_confirm_will_end();
	return en_acctplan_confirm_will_end();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_confirm_will_end_on.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Acctplan_Confirm_Will_End_OnInputs */
var en_acctplan_confirm_will_end_on = (i) => {
	return `plan will end on ${i?.date}.`;
};
var am_acctplan_confirm_will_end_on = (i) => {
	return `እቅድ በ${i?.date} እንደሚያበቃ ተረድቻለሁ።`;
};
/**
* | output |
* | --- |
* | "plan will end on {date}." |
*
* @param {Acctplan_Confirm_Will_End_OnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_confirm_will_end_on = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_confirm_will_end_on(inputs);
	return en_acctplan_confirm_will_end_on(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_keep_all_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Keep_All_ButtonInputs */
var en_acctplan_keep_all_button = () => {
	return `Keep all my plans`;
};
var am_acctplan_keep_all_button = () => {
	return `ሁሉንም እቅዶቼን አቆይ`;
};
/**
* | output |
* | --- |
* | "Keep all my plans" |
*
* @param {Acctplan_Keep_All_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_keep_all_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_keep_all_button();
	return en_acctplan_keep_all_button();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_submitting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_SubmittingInputs */
var en_acctplan_submitting = () => {
	return `Cancelling…`;
};
var am_acctplan_submitting = () => {
	return `በመሰረዝ ላይ…`;
};
/**
* | output |
* | --- |
* | "Cancelling…" |
*
* @param {Acctplan_SubmittingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_submitting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_submitting();
	return en_acctplan_submitting();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_submit_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Submit_ButtonInputs */
var en_acctplan_submit_button = () => {
	return `Cancel this plan`;
};
var am_acctplan_submit_button = () => {
	return `ይህን እቅድ ሰርዝ`;
};
/**
* | output |
* | --- |
* | "Cancel this plan" |
*
* @param {Acctplan_Submit_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_submit_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_submit_button();
	return en_acctplan_submit_button();
});
//#endregion
//#region src/routes/account/change-plan/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, submitting} = superForm(data.form, {
			validators: zodClient(cancelSchema),
			onUpdated({ form }) {
				if (form.message?.type === "error") toast.error(form.message.text);
				else if (form.message?.type === "success") {
					toast.success(form.message.text);
					goto();
				}
			}
		});
		const reasons = [
			{
				value: "too_expensive",
				label: acctplan_reason_too_expensive()
			},
			{
				value: "too_much_food",
				label: acctplan_reason_too_much_food()
			},
			{
				value: "taking_a_break",
				label: acctplan_reason_taking_a_break()
			},
			{
				value: "moving",
				label: acctplan_reason_moving()
			},
			{
				value: "quality",
				label: acctplan_reason_quality()
			},
			{
				value: "other",
				label: acctplan_reason_other()
			}
		];
		const selected = derived(() => data.plansList.find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).subscriptionId) ?? null);
		head("13g7a9r", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(acctplan_page_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="wrap svelte-13g7a9r"><div class="card svelte-13g7a9r"><span class="eyebrow svelte-13g7a9r">${escape_html(acctplan_eyebrow())}</span> <h1 class="svelte-13g7a9r">${escape_html(acctplan_heading())}</h1> `);
		if (data.plansList.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="lead svelte-13g7a9r">${escape_html(acctplan_empty_lead())}</p> <div class="actions svelte-13g7a9r"><a href="/account" class="btn btn-ghost svelte-13g7a9r">${escape_html(acctplan_back_to_account())}</a></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="lead svelte-13g7a9r">${escape_html(acctplan_lead({
				count: data.plansList.length,
				planWord: data.plansList.length === 1 ? acctplan_plan_word_singular() : acctplan_plan_word_plural()
			}))}</p> <form method="POST" class="form svelte-13g7a9r"><fieldset class="plan-list svelte-13g7a9r"><legend class="svelte-13g7a9r">${escape_html(acctplan_which_plan())}</legend> <!--[-->`);
			const each_array = ensure_array_like(data.plansList);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<label${attr_class("plan-row svelte-13g7a9r", void 0, {
					"active": store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id,
					"disabled": p.cancelAtPeriodEnd
				})}><input type="radio" name="subscriptionId"${attr("value", p.id)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id, true)}${attr("disabled", p.cancelAtPeriodEnd, true)} class="svelte-13g7a9r"/> <div class="plan-info svelte-13g7a9r"><div class="plan-top svelte-13g7a9r"><span class="plan-name svelte-13g7a9r">${escape_html(p.planName)}`);
				if (p.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="qty-pill svelte-13g7a9r">${escape_html(acctplan_qty_pill({ quantity: p.quantity }))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span> <span class="plan-price svelte-13g7a9r">£${escape_html(p.price.toFixed(2))}</span></div> <div class="plan-meta svelte-13g7a9r">`);
				if (p.addressLabel) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="plan-addr svelte-13g7a9r">${escape_html(p.addressLabel)}</span> ·`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->${escape_html(p.freq)}`);
				if (p.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`· £${escape_html(p.unitPrice.toFixed(2))} × ${escape_html(p.quantity)}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> `);
				if (p.cancelAtPeriodEnd) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="plan-flag svelte-13g7a9r">${escape_html(acctplan_already_cancelling())}${escape_html(p.periodEndLabel ? ` — ${acctplan_ends_on({ date: p.periodEndLabel })}` : "")}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></label>`);
			}
			$$renderer.push(`<!--]--></fieldset> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).subscriptionId) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-13g7a9r">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).subscriptionId)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (selected() && !selected().cancelAtPeriodEnd) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="keep-note svelte-13g7a9r">`);
				if (selected().periodEndLabel) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`${escape_html(acctplan_keep_note_prefix())} <strong class="svelte-13g7a9r">${escape_html(selected().periodEndLabel)}</strong>. ${escape_html(acctplan_keep_note_suffix())}`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`${escape_html(acctplan_keep_note_no_date())}`);
				}
				$$renderer.push(`<!--]--></div> <fieldset class="reasons svelte-13g7a9r"><legend class="svelte-13g7a9r">${escape_html(acctplan_reason_legend())} <span class="opt svelte-13g7a9r">(${escape_html(acctplan_optional())})</span></legend> <!--[-->`);
				const each_array_1 = ensure_array_like(reasons);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let r = each_array_1[$$index_1];
					$$renderer.push(`<label${attr_class("reason svelte-13g7a9r", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).reason === r.value })}><input type="radio" name="reason"${attr("value", r.value)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).reason === r.value, true)} class="svelte-13g7a9r"/> <span>${escape_html(r.label)}</span></label>`);
				}
				$$renderer.push(`<!--]--></fieldset> <div class="field svelte-13g7a9r"><label class="field-label svelte-13g7a9r" for="feedback">${escape_html(acctplan_feedback_label())} <span class="opt svelte-13g7a9r">(${escape_html(acctplan_optional())})</span></label> <textarea id="feedback" name="feedback" class="textarea svelte-13g7a9r" rows="3">`);
				const $$body = escape_html(store_get($$store_subs ??= {}, "$form", form).feedback);
				if ($$body) $$renderer.push(`${$$body}`);
				$$renderer.push(`</textarea></div> <label class="confirm svelte-13g7a9r"><input type="checkbox" name="confirm"${attr("checked", store_get($$store_subs ??= {}, "$form", form).confirm, true)} class="svelte-13g7a9r"/> <span>${escape_html(acctplan_confirm_prefix())} <strong class="svelte-13g7a9r">${escape_html(selected().planName)}</strong>`);
				if (selected().quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`${escape_html(acctplan_qty_suffix({ quantity: selected().quantity }))}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> ${escape_html(selected().periodEndLabel ? acctplan_confirm_will_end_on({ date: selected().periodEndLabel }) : acctplan_confirm_will_end())}</span></label> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).confirm) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-13g7a9r">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).confirm)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="actions svelte-13g7a9r"><a href="/account" class="btn btn-ghost svelte-13g7a9r">${escape_html(acctplan_keep_all_button())}</a> <button type="submit" class="btn btn-danger svelte-13g7a9r"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting) || !selected() || selected().cancelAtPeriodEnd || !store_get($$store_subs ??= {}, "$form", form).confirm, true)}>${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? acctplan_submitting() : acctplan_submit_button())}</button></div></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BOugMDxM.js.map
