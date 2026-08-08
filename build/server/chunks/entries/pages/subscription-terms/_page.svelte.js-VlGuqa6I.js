import { a9 as escape_html, a1 as html, a4 as ensure_array_like, aa as attr_class } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/subterms_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_EyebrowInputs */
var en_subterms_eyebrow = () => {
	return `Legal`;
};
var am_subterms_eyebrow = () => {
	return `ሕጋዊ`;
};
/**
* | output |
* | --- |
* | "Legal" |
*
* @param {Subterms_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_eyebrow();
	return en_subterms_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_h1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_H1Inputs */
var en_subterms_h1 = () => {
	return `Subscription Terms`;
};
var am_subterms_h1 = () => {
	return `የደንበኝነት ውሎች`;
};
/**
* | output |
* | --- |
* | "Subscription Terms" |
*
* @param {Subterms_H1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_h1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_h1();
	return en_subterms_h1();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_updated.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_UpdatedInputs */
var en_subterms_updated = () => {
	return `Last updated: 1 January 2026`;
};
var am_subterms_updated = () => {
	return `መጨረሻ የተሻሻለው፦ ጥር 1፣ 2026`;
};
/**
* | output |
* | --- |
* | "Last updated: 1 January 2026" |
*
* @param {Subterms_UpdatedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_updated = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_updated();
	return en_subterms_updated();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_how_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_How_TitleInputs */
var en_subterms_how_title = () => {
	return `How subscriptions work`;
};
var am_subterms_how_title = () => {
	return `ደንበኝነት ምዝገባ እንዴት ይሰራል`;
};
/**
* | output |
* | --- |
* | "How subscriptions work" |
*
* @param {Subterms_How_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_how_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_how_title();
	return en_subterms_how_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_how_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_How_BodyInputs */
var en_subterms_how_body = () => {
	return `A GOTERA subscription is a recurring monthly order. Choose a plan, set your delivery, and GOTERA delivers injera every month. Manage everything from your account.`;
};
var am_subterms_how_body = () => {
	return `የGOTERA ደንበኝነት ምዝገባ በየወሩ የሚደገም ትዕዛዝ ነው። ዕቅድ ይምረጡ፣ ማድረሻዎን ያዘጋጁ፣ እና GOTERA በየወሩ እንጀራ ያደርስልዎታል። ሁሉንም ነገር ከመለያዎ ያስተዳድሩ።`;
};
/**
* | output |
* | --- |
* | "A GOTERA subscription is a recurring monthly order. Choose a plan, set your delivery, and GOTERA delivers injera every month. Manage everything from your acc..." |
*
* @param {Subterms_How_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_how_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_how_body();
	return en_subterms_how_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_how_highlight.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_How_HighlightInputs */
var en_subterms_how_highlight = () => {
	return `<strong>No minimum term.</strong> Cancel any time. No cancellation fees.`;
};
var am_subterms_how_highlight = () => {
	return `<strong>ምንም አነስተኛ የቆይታ ጊዜ የለም።</strong> በማንኛውም ጊዜ ይሰርዙ። ምንም የስረዛ ክፍያ የለም።`;
};
/**
* | output |
* | --- |
* | "<strong>No minimum term.</strong> Cancel any time. No cancellation fees." |
*
* @param {Subterms_How_HighlightInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_how_highlight = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_how_highlight();
	return en_subterms_how_highlight();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_plans_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Plans_TitleInputs */
var en_subterms_plans_title = () => {
	return `Plans`;
};
var am_subterms_plans_title = () => {
	return `ዕቅዶች`;
};
/**
* | output |
* | --- |
* | "Plans" |
*
* @param {Subterms_Plans_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_plans_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_plans_title();
	return en_subterms_plans_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_plans_th_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Plans_Th_PlanInputs */
var en_subterms_plans_th_plan = () => {
	return `Plan`;
};
var am_subterms_plans_th_plan = () => {
	return `ዕቅድ`;
};
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Subterms_Plans_Th_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_plans_th_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_plans_th_plan();
	return en_subterms_plans_th_plan();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_plans_th_packs.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Plans_Th_PacksInputs */
var en_subterms_plans_th_packs = () => {
	return `Packs`;
};
var am_subterms_plans_th_packs = () => {
	return `ጥቅሎች`;
};
/**
* | output |
* | --- |
* | "Packs" |
*
* @param {Subterms_Plans_Th_PacksInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_plans_th_packs = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_plans_th_packs();
	return en_subterms_plans_th_packs();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_plans_th_billing.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Plans_Th_BillingInputs */
var en_subterms_plans_th_billing = () => {
	return `Billing`;
};
var am_subterms_plans_th_billing = () => {
	return `ክፍያ`;
};
/**
* | output |
* | --- |
* | "Billing" |
*
* @param {Subterms_Plans_Th_BillingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_plans_th_billing = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_plans_th_billing();
	return en_subterms_plans_th_billing();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_plans_th_price.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Plans_Th_PriceInputs */
var en_subterms_plans_th_price = () => {
	return `Price`;
};
var am_subterms_plans_th_price = () => {
	return `ዋጋ`;
};
/**
* | output |
* | --- |
* | "Price" |
*
* @param {Subterms_Plans_Th_PriceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_plans_th_price = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_plans_th_price();
	return en_subterms_plans_th_price();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_billing_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Billing_TitleInputs */
var en_subterms_billing_title = () => {
	return `Billing`;
};
var am_subterms_billing_title = () => {
	return `ክፍያ`;
};
/**
* | output |
* | --- |
* | "Billing" |
*
* @param {Subterms_Billing_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_billing_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_billing_title();
	return en_subterms_billing_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_billing_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Billing_BodyInputs */
var en_subterms_billing_body = () => {
	return `Billed monthly on the same date as your first payment. Your charge is your plan price plus any add-ons. An email reminder is sent 3 days before each payment.`;
};
var am_subterms_billing_body = () => {
	return `በየወሩ በመጀመሪያው ክፍያ ቀን ተመሳሳይ ቀን ይከፈላል። ክፍያዎ የዕቅድዎን ዋጋ እና ማንኛውንም ተጨማሪ ምርቶች ያካትታል። ከእያንዳንዱ ክፍያ 3 ቀናት በፊት የማስታወሻ ኢሜይል ይላካል።`;
};
/**
* | output |
* | --- |
* | "Billed monthly on the same date as your first payment. Your charge is your plan price plus any add-ons. An email reminder is sent 3 days before each payment." |
*
* @param {Subterms_Billing_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_billing_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_billing_body();
	return en_subterms_billing_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_pauseskipcancel_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Pauseskipcancel_TitleInputs */
var en_subterms_pauseskipcancel_title = () => {
	return `Pause, skip, cancel`;
};
var am_subterms_pauseskipcancel_title = () => {
	return `ማቆም፣ መዝለል፣ መሰረዝ`;
};
/**
* | output |
* | --- |
* | "Pause, skip, cancel" |
*
* @param {Subterms_Pauseskipcancel_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_pauseskipcancel_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_pauseskipcancel_title();
	return en_subterms_pauseskipcancel_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_pause_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Pause_SubtitleInputs */
var en_subterms_pause_subtitle = () => {
	return `Pause`;
};
var am_subterms_pause_subtitle = () => {
	return `ማቆም`;
};
/**
* | output |
* | --- |
* | "Pause" |
*
* @param {Subterms_Pause_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_pause_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_pause_subtitle();
	return en_subterms_pause_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_pause_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Pause_BodyInputs */
var en_subterms_pause_body = () => {
	return `No payments or deliveries until you resume. No time limit. Account → Pause Subscription.`;
};
var am_subterms_pause_body = () => {
	return `እስኪቀጥሉ ድረስ ምንም ክፍያ ወይም ማድረሻ አይኖርም። የጊዜ ገደብ የለውም። መለያ → ደንበኝነትን አቁም።`;
};
/**
* | output |
* | --- |
* | "No payments or deliveries until you resume. No time limit. Account → Pause Subscription." |
*
* @param {Subterms_Pause_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_pause_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_pause_body();
	return en_subterms_pause_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_skip_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Skip_SubtitleInputs */
var en_subterms_skip_subtitle = () => {
	return `Skip`;
};
var am_subterms_skip_subtitle = () => {
	return `መዝለል`;
};
/**
* | output |
* | --- |
* | "Skip" |
*
* @param {Subterms_Skip_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_skip_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_skip_subtitle();
	return en_subterms_skip_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_skip_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Skip_BodyInputs */
var en_subterms_skip_body = () => {
	return `Skip one month's delivery with no charge. Must be done before the cut-off. Account → Skip Next Delivery.`;
};
var am_subterms_skip_body = () => {
	return `ያለ ምንም ክፍያ የአንድ ወር ማድረሻን ይዝለሉ። ከመቁረጫው ቀን በፊት መደረግ አለበት። መለያ → የሚቀጥለውን ማድረሻ ዝለል።`;
};
/**
* | output |
* | --- |
* | "Skip one month's delivery with no charge. Must be done before the cut-off. Account → Skip Next Delivery." |
*
* @param {Subterms_Skip_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_skip_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_skip_body();
	return en_subterms_skip_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_cancel_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Cancel_SubtitleInputs */
var en_subterms_cancel_subtitle = () => {
	return `Cancel`;
};
var am_subterms_cancel_subtitle = () => {
	return `መሰረዝ`;
};
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Subterms_Cancel_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_cancel_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_cancel_subtitle();
	return en_subterms_cancel_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_cancel_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Cancel_BodyInputs */
var en_subterms_cancel_body = () => {
	return `Ends at the close of the current billing period. No further charges. Account → Cancel Subscription, or email <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>.`;
};
var am_subterms_cancel_body = () => {
	return `በአሁኑ የክፍያ ወቅት መጨረሻ ላይ ያበቃል። ተጨማሪ ክፍያ አይኖርም። መለያ → ደንበኝነትን ሰርዝ፣ ወይም በ<a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> ኢሜይል ያድርጉልን።`;
};
/**
* | output |
* | --- |
* | "Ends at the close of the current billing period. No further charges. Account → Cancel Subscription, or email <a href=\"mailto:hello@gotera.co.uk\">hello@gotera..." |
*
* @param {Subterms_Cancel_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_cancel_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_cancel_body();
	return en_subterms_cancel_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_minterm_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Minterm_TitleInputs */
var en_subterms_minterm_title = () => {
	return `Minimum term`;
};
var am_subterms_minterm_title = () => {
	return `አነስተኛ የቆይታ ጊዜ`;
};
/**
* | output |
* | --- |
* | "Minimum term" |
*
* @param {Subterms_Minterm_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_minterm_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_minterm_title();
	return en_subterms_minterm_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_minterm_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Minterm_BodyInputs */
var en_subterms_minterm_body = () => {
	return `None. Cancel any time with no penalty.`;
};
var am_subterms_minterm_body = () => {
	return `የለም። ያለምንም ቅጣት በማንኛውም ጊዜ ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | "None. Cancel any time with no penalty." |
*
* @param {Subterms_Minterm_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_minterm_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_minterm_body();
	return en_subterms_minterm_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_failedpay_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Failedpay_TitleInputs */
var en_subterms_failedpay_title = () => {
	return `Failed payments`;
};
var am_subterms_failedpay_title = () => {
	return `ያልተሳኩ ክፍያዎች`;
};
/**
* | output |
* | --- |
* | "Failed payments" |
*
* @param {Subterms_Failedpay_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_failedpay_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_failedpay_title();
	return en_subterms_failedpay_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_failedpay_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Failedpay_BodyInputs */
var en_subterms_failedpay_body = () => {
	return `If payment fails we email you immediately and retry after 3 days. If the second attempt fails, we email again. After 7 days without resolution, your subscription is paused — no delivery is made for that cycle. Update payment at Account → Payment.`;
};
var am_subterms_failedpay_body = () => {
	return `ክፍያ ካልተሳካ ወዲያውኑ ኢሜይል እንልክልዎታለን እና ከ3 ቀናት በኋላ እንደገና እንሞክራለን። ሁለተኛው ሙከራ ካልተሳካ፣ እንደገና ኢሜይል እንልካለን። ለ7 ቀናት ችግሩ ሳይፈታ ከቀጠለ፣ ደንበኝነትዎ ይቆማል — ለዚያ ዑደት ምንም ማድረሻ አይደረግም። ክፍያዎን በመለያ → ክፍያ ያዘምኑ።`;
};
/**
* | output |
* | --- |
* | "If payment fails we email you immediately and retry after 3 days. If the second attempt fails, we email again. After 7 days without resolution, your subscrip..." |
*
* @param {Subterms_Failedpay_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_failedpay_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_failedpay_body();
	return en_subterms_failedpay_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_changeplan_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Changeplan_TitleInputs */
var en_subterms_changeplan_title = () => {
	return `Changing plan`;
};
var am_subterms_changeplan_title = () => {
	return `ዕቅድ መቀየር`;
};
/**
* | output |
* | --- |
* | "Changing plan" |
*
* @param {Subterms_Changeplan_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_changeplan_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_changeplan_title();
	return en_subterms_changeplan_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_changeplan_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Changeplan_BodyInputs */
var en_subterms_changeplan_body = () => {
	return `Switch between Starter and Regular any time from your account. Changes take effect from the next billing cycle.`;
};
var am_subterms_changeplan_body = () => {
	return `በማንኛውም ጊዜ ከመለያዎ በመጀመሪያ እና በመደበኛ ዕቅዶች መካከል ይቀያየሩ። ለውጦች ከሚቀጥለው የክፍያ ዑደት ጀምሮ ተግባራዊ ይሆናሉ።`;
};
/**
* | output |
* | --- |
* | "Switch between Starter and Regular any time from your account. Changes take effect from the next billing cycle." |
*
* @param {Subterms_Changeplan_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_changeplan_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_changeplan_body();
	return en_subterms_changeplan_body();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_addons_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Addons_TitleInputs */
var en_subterms_addons_title = () => {
	return `Add-ons`;
};
var am_subterms_addons_title = () => {
	return `ተጨማሪ ምርቶች`;
};
/**
* | output |
* | --- |
* | "Add-ons" |
*
* @param {Subterms_Addons_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_addons_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_addons_title();
	return en_subterms_addons_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_addons_body1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Addons_Body1Inputs */
var en_subterms_addons_body1 = () => {
	return `Add pantry products to any delivery before the cut-off date. Added to your next monthly payment. Remove before cut-off at no charge.`;
};
var am_subterms_addons_body1 = () => {
	return `ከመቁረጫው ቀን በፊት ወደ ማንኛውም ማድረሻ የቤት ውስጥ ምግብ ምርቶችን ይጨምሩ። ወደ ቀጣዩ ወርሃዊ ክፍያዎ ይታከላል። ከመቁረጫው በፊት ያለ ምንም ክፍያ ያስወግዱ።`;
};
/**
* | output |
* | --- |
* | "Add pantry products to any delivery before the cut-off date. Added to your next monthly payment. Remove before cut-off at no charge." |
*
* @param {Subterms_Addons_Body1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_addons_body1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_addons_body1();
	return en_subterms_addons_body1();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_addons_infobox.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Addons_InfoboxInputs */
var en_subterms_addons_infobox = () => {
	return `Berbere £3.50 · Mitmita £3.50 · Niter Kibbeh £5.00`;
};
var am_subterms_addons_infobox = () => {
	return `በርበሬ £3.50 · ሚጥሚጣ £3.50 · ንጥር ቅቤ £5.00`;
};
/**
* | output |
* | --- |
* | "Berbere £3.50 · Mitmita £3.50 · Niter Kibbeh £5.00" |
*
* @param {Subterms_Addons_InfoboxInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_addons_infobox = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_addons_infobox();
	return en_subterms_addons_infobox();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_addons_body2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Addons_Body2Inputs */
var en_subterms_addons_body2 = () => {
	return `Cut-off: the Sunday before your Saturday delivery at midnight. Shown in your account.`;
};
var am_subterms_addons_body2 = () => {
	return `መቁረጫ ጊዜ፦ ከቅዳሜው ማድረሻዎ በፊት ባለው እሁድ እኩለ ሌሊት። በመለያዎ ላይ ይታያል።`;
};
/**
* | output |
* | --- |
* | "Cut-off: the Sunday before your Saturday delivery at midnight. Shown in your account." |
*
* @param {Subterms_Addons_Body2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_addons_body2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_addons_body2();
	return en_subterms_addons_body2();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_whatsapp_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Whatsapp_TitleInputs */
var en_subterms_whatsapp_title = () => {
	return `WhatsApp notifications`;
};
var am_subterms_whatsapp_title = () => {
	return `የWhatsApp ማሳወቂያዎች`;
};
/**
* | output |
* | --- |
* | "WhatsApp notifications" |
*
* @param {Subterms_Whatsapp_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_whatsapp_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_whatsapp_title();
	return en_subterms_whatsapp_title();
});
//#endregion
//#region src/lib/paraglide/messages/subterms_whatsapp_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subterms_Whatsapp_BodyInputs */
var en_subterms_whatsapp_body = () => {
	return `Optional delivery updates via WhatsApp — dispatch, delivery window, and confirmation. Opt in by adding your WhatsApp number in account settings. Withdraw consent any time from account preferences. Sent via Twilio. Number not shared with third parties.`;
};
var am_subterms_whatsapp_body = () => {
	return `አማራጭ የማድረሻ ዝማኔዎች በWhatsApp በኩል — መላክ፣ የማድረሻ ጊዜ እና ማረጋገጫ። በመለያ ቅንብሮች ውስጥ የWhatsApp ቁጥርዎን በመጨመር ይመዝገቡ። ፈቃድዎን በማንኛውም ጊዜ ከመለያ ምርጫዎች ማንሳት ይችላሉ። በTwilio በኩል ይላካል። ቁጥሩ ለሶስተኛ ወገኖች አይጋራም።`;
};
/**
* | output |
* | --- |
* | "Optional delivery updates via WhatsApp — dispatch, delivery window, and confirmation. Opt in by adding your WhatsApp number in account settings. Withdraw con..." |
*
* @param {Subterms_Whatsapp_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subterms_whatsapp_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subterms_whatsapp_body();
	return en_subterms_whatsapp_body();
});
//#endregion
//#region src/routes/subscription-terms/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<section class="hero svelte-14qjqs"><div class="container svelte-14qjqs"><span class="eyebrow svelte-14qjqs">${escape_html(subterms_eyebrow())}</span> <h1 class="svelte-14qjqs">${escape_html(subterms_h1())}</h1> <p class="updated svelte-14qjqs">${escape_html(subterms_updated())}</p></div></section> <div class="content svelte-14qjqs"><div class="container svelte-14qjqs"><div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_how_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_how_body())}</p> <div class="highlight svelte-14qjqs"><p class="svelte-14qjqs">${html(subterms_how_highlight())}</p></div></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_plans_title())}</h2> <table class="ptable svelte-14qjqs"><thead><tr><th class="svelte-14qjqs">${escape_html(subterms_plans_th_plan())}</th><th class="svelte-14qjqs">${escape_html(subterms_plans_th_packs())}</th><th class="svelte-14qjqs">${escape_html(subterms_plans_th_billing())}</th><th class="price svelte-14qjqs">${escape_html(subterms_plans_th_price())}</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(data?.displayPlans);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let plan = each_array[$$index];
			$$renderer.push(`<tr${attr_class("svelte-14qjqs", void 0, { "featured": plan.featured })}><td class="svelte-14qjqs"><div class="plan-name"><strong>${escape_html(plan.name)}</strong> `);
			if (plan.subtitle) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<small>${escape_html(plan.subtitle)}</small>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></td><td class="svelte-14qjqs">${escape_html(plan.contents)}</td><td class="svelte-14qjqs">${escape_html(plan.intervalLabel)}</td><td class="price svelte-14qjqs"><strong>${escape_html(plan.price)}</strong></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_billing_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_billing_body())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_pauseskipcancel_title())}</h2> <h3 class="svelte-14qjqs">${escape_html(subterms_pause_subtitle())}</h3> <p class="svelte-14qjqs">${escape_html(subterms_pause_body())}</p> <h3 class="svelte-14qjqs">${escape_html(subterms_skip_subtitle())}</h3> <p class="svelte-14qjqs">${escape_html(subterms_skip_body())}</p> <h3 class="svelte-14qjqs">${escape_html(subterms_cancel_subtitle())}</h3> <p class="svelte-14qjqs">${html(subterms_cancel_body())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_minterm_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_minterm_body())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_failedpay_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_failedpay_body())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_changeplan_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_changeplan_body())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_addons_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_addons_body1())}</p> <div class="infobox svelte-14qjqs"><p class="svelte-14qjqs">${escape_html(subterms_addons_infobox())}</p></div> <p class="svelte-14qjqs">${escape_html(subterms_addons_body2())}</p></div> <div class="ls svelte-14qjqs"><h2 class="svelte-14qjqs">${escape_html(subterms_whatsapp_title())}</h2> <p class="svelte-14qjqs">${escape_html(subterms_whatsapp_body())}</p></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-VlGuqa6I.js.map
