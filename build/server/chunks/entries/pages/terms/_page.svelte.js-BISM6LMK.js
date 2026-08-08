import { a9 as escape_html, a4 as ensure_array_like, a1 as html, T as derived } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/terms_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_EyebrowInputs */
var en_terms_eyebrow = () => {
	return `Legal`;
};
var am_terms_eyebrow = () => {
	return `ሕጋዊ`;
};
/**
* | output |
* | --- |
* | "Legal" |
*
* @param {Terms_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_eyebrow();
	return en_terms_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/terms_h1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_H1Inputs */
var en_terms_h1 = () => {
	return `Terms of Service`;
};
var am_terms_h1 = () => {
	return `የአገልግሎት ውሎች`;
};
/**
* | output |
* | --- |
* | "Terms of Service" |
*
* @param {Terms_H1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_h1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_h1();
	return en_terms_h1();
});
//#endregion
//#region src/lib/paraglide/messages/terms_updated.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_UpdatedInputs */
var en_terms_updated = () => {
	return `Last updated: 1 January 2026`;
};
var am_terms_updated = () => {
	return `መጨረሻ የተሻሻለው፦ ጥር 1፣ 2026`;
};
/**
* | output |
* | --- |
* | "Last updated: 1 January 2026" |
*
* @param {Terms_UpdatedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_updated = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_updated();
	return en_terms_updated();
});
//#endregion
//#region src/lib/paraglide/messages/terms_about_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_About_TitleInputs */
var en_terms_about_title = () => {
	return `About these terms`;
};
var am_terms_about_title = () => {
	return `ስለ እነዚህ ውሎች`;
};
/**
* | output |
* | --- |
* | "About these terms" |
*
* @param {Terms_About_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_about_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_about_title();
	return en_terms_about_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_about_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_About_ContentInputs */
var en_terms_about_content = () => {
	return `<p>These terms govern your use of the GOTERA website and your purchase of GOTERA products. By placing an order or subscribing, you agree to them.</p>`;
};
var am_terms_about_content = () => {
	return `<p>እነዚህ ውሎች የGOTERA ድረ-ገጽ አጠቃቀምዎን እና የGOTERA ምርቶች ግዢዎን ይመራሉ። ትዕዛዝ በማድረግ ወይም ደንበኝነት በመመዝገብ፣ ከእነዚህ ውሎች ጋር ተስማምተዋል ማለት ነው።</p>`;
};
/**
* | output |
* | --- |
* | "<p>These terms govern your use of the GOTERA website and your purchase of GOTERA products. By placing an order or subscribing, you agree to them.</p>" |
*
* @param {Terms_About_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_about_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_about_content();
	return en_terms_about_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_about_infobox.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_About_InfoboxInputs */
var en_terms_about_infobox = () => {
	return `<strong>GOTERA Foods Ltd</strong> · Registered in England and Wales<br>Email: <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>`;
};
var am_terms_about_infobox = () => {
	return `<strong>GOTERA Foods Ltd</strong> · በእንግሊዝና ዌልስ የተመዘገበ<br>ኢሜይል፦ <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>`;
};
/**
* | output |
* | --- |
* | "<strong>GOTERA Foods Ltd</strong> · Registered in England and Wales<br>Email: <a href=\"mailto:hello@gotera.co.uk\">hello@gotera.co.uk</a>" |
*
* @param {Terms_About_InfoboxInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_about_infobox = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_about_infobox();
	return en_terms_about_infobox();
});
//#endregion
//#region src/lib/paraglide/messages/terms_service_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Service_TitleInputs */
var en_terms_service_title = () => {
	return `What the service is`;
};
var am_terms_service_title = () => {
	return `አገልግሎቱ ምንድን ነው`;
};
/**
* | output |
* | --- |
* | "What the service is" |
*
* @param {Terms_Service_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_service_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_service_title();
	return en_terms_service_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_service_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Service_ContentInputs */
var en_terms_service_content = () => {
	return `<p>GOTERA is a premium Ethiopian food subscription service. We supply injera and related pantry products monthly. Products are made and packed in Ethiopia, distributed in the UK. We currently deliver within London only.</p>`;
};
var am_terms_service_content = () => {
	return `<p>GOTERA ፕሪሚየም የኢትዮጵያ ምግብ ደንበኝነት አገልግሎት ነው። በየወሩ እንጀራና ተዛማጅ የቤት ውስጥ ምግብ ምርቶችን እናቀርባለን። ምርቶቹ በኢትዮጵያ ውስጥ ተዘጋጅተው ተጠቅልለው በዩኬ ውስጥ ይሰራጫሉ። በአሁኑ ወቅት አገልግሎታችን በለንደን ውስጥ ብቻ ነው የሚደርሰው።</p>`;
};
/**
* | output |
* | --- |
* | "<p>GOTERA is a premium Ethiopian food subscription service. We supply injera and related pantry products monthly. Products are made and packed in Ethiopia, d..." |
*
* @param {Terms_Service_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_service_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_service_content();
	return en_terms_service_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_TitleInputs */
var en_terms_subscription_title = () => {
	return `Subscription terms`;
};
var am_terms_subscription_title = () => {
	return `የደንበኝነት ውሎች`;
};
/**
* | output |
* | --- |
* | "Subscription terms" |
*
* @param {Terms_Subscription_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_title();
	return en_terms_subscription_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_billing_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Billing_TitleInputs */
var en_terms_subscription_billing_title = () => {
	return `Billing and renewal`;
};
var am_terms_subscription_billing_title = () => {
	return `ክፍያ እና እድሳት`;
};
/**
* | output |
* | --- |
* | "Billing and renewal" |
*
* @param {Terms_Subscription_Billing_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_billing_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_billing_title();
	return en_terms_subscription_billing_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_billing_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Billing_BodyInputs */
var en_terms_subscription_billing_body = () => {
	return `Subscriptions bill monthly on the same date as first payment. You will receive an email before each charge. The amount reflects your plan plus any add-ons.`;
};
var am_terms_subscription_billing_body = () => {
	return `ደንበኝነት ምዝገባዎች በየወሩ በመጀመሪያው ክፍያ ቀን ተመሳሳይ ቀን ይከፈላሉ። ከእያንዳንዱ ክፍያ በፊት ኢሜይል ይደርስዎታል። መጠኑ የእርስዎን ዕቅድ እና ማንኛውንም ተጨማሪ ምርቶች ያካትታል።`;
};
/**
* | output |
* | --- |
* | "Subscriptions bill monthly on the same date as first payment. You will receive an email before each charge. The amount reflects your plan plus any add-ons." |
*
* @param {Terms_Subscription_Billing_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_billing_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_billing_body();
	return en_terms_subscription_billing_body();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_cancellation_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Cancellation_TitleInputs */
var en_terms_subscription_cancellation_title = () => {
	return `Cancellation`;
};
var am_terms_subscription_cancellation_title = () => {
	return `ስረዛ`;
};
/**
* | output |
* | --- |
* | "Cancellation" |
*
* @param {Terms_Subscription_Cancellation_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_cancellation_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_cancellation_title();
	return en_terms_subscription_cancellation_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_cancellation_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Cancellation_BodyInputs */
var en_terms_subscription_cancellation_body = () => {
	return `Cancel any time from your account. Cancellation takes effect at the end of the current billing period. No refunds for payments already taken.`;
};
var am_terms_subscription_cancellation_body = () => {
	return `ከመለያዎ በማንኛውም ጊዜ መሰረዝ ይችላሉ። ስረዛው ተግባራዊ የሚሆነው በአሁኑ የክፍያ ወቅት መጨረሻ ላይ ነው። አስቀድሞ ለተከፈሉ ክፍያዎች ተመላሽ ገንዘብ አይኖርም።`;
};
/**
* | output |
* | --- |
* | "Cancel any time from your account. Cancellation takes effect at the end of the current billing period. No refunds for payments already taken." |
*
* @param {Terms_Subscription_Cancellation_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_cancellation_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_cancellation_body();
	return en_terms_subscription_cancellation_body();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_pause_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Pause_TitleInputs */
var en_terms_subscription_pause_title = () => {
	return `Pause and skip`;
};
var am_terms_subscription_pause_title = () => {
	return `ማቆም እና መዝለል`;
};
/**
* | output |
* | --- |
* | "Pause and skip" |
*
* @param {Terms_Subscription_Pause_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_pause_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_pause_title();
	return en_terms_subscription_pause_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_pause_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Pause_BodyInputs */
var en_terms_subscription_pause_body = () => {
	return `Pause or skip a delivery from your account before the cut-off date.`;
};
var am_terms_subscription_pause_body = () => {
	return `ከመቁረጫው ቀን በፊት ከመለያዎ ውስጥ አንድን ማድረሻ ማቆም ወይም መዝለል ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "Pause or skip a delivery from your account before the cut-off date." |
*
* @param {Terms_Subscription_Pause_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_pause_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_pause_body();
	return en_terms_subscription_pause_body();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_minterm_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Minterm_TitleInputs */
var en_terms_subscription_minterm_title = () => {
	return `Minimum term`;
};
var am_terms_subscription_minterm_title = () => {
	return `አነስተኛ የቆይታ ጊዜ`;
};
/**
* | output |
* | --- |
* | "Minimum term" |
*
* @param {Terms_Subscription_Minterm_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_minterm_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_minterm_title();
	return en_terms_subscription_minterm_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_subscription_minterm_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Subscription_Minterm_BodyInputs */
var en_terms_subscription_minterm_body = () => {
	return `None. Cancel any time.`;
};
var am_terms_subscription_minterm_body = () => {
	return `የለም። በማንኛውም ጊዜ መሰረዝ ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "None. Cancel any time." |
*
* @param {Terms_Subscription_Minterm_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_subscription_minterm_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_subscription_minterm_body();
	return en_terms_subscription_minterm_body();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_TitleInputs */
var en_terms_pricing_title = () => {
	return `Pricing and payment`;
};
var am_terms_pricing_title = () => {
	return `ዋጋ እና ክፍያ`;
};
/**
* | output |
* | --- |
* | "Pricing and payment" |
*
* @param {Terms_Pricing_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_title();
	return en_terms_pricing_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_ContentInputs */
var en_terms_pricing_content = () => {
	return `<p>All prices in GBP, inclusive of VAT where applicable. Price changes notified 30 days in advance. Payments processed by Stripe — we do not store card details. Failed payments are retried once after 3 days.</p>`;
};
var am_terms_pricing_content = () => {
	return `<p>ሁሉም ዋጋዎች በብሪታኒያ ፓውንድ (GBP) ሲሆኑ፣ ተፈጻሚ በሚሆንበት ጊዜ ቫት (VAT) ያካትታሉ። የዋጋ ለውጦች ከ30 ቀናት በፊት ይገለጻሉ። ክፍያዎች በStripe ይሰራሉ — የካርድ ዝርዝሮችን አናስቀምጥም። ያልተሳኩ ክፍያዎች ከ3 ቀናት በኋላ አንድ ጊዜ ተደግመው ይሞከራሉ።</p>`;
};
/**
* | output |
* | --- |
* | "<p>All prices in GBP, inclusive of VAT where applicable. Price changes notified 30 days in advance. Payments processed by Stripe — we do not store card detai..." |
*
* @param {Terms_Pricing_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_content();
	return en_terms_pricing_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_list_oneoff.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_List_OneoffInputs */
var en_terms_pricing_list_oneoff = () => {
	return `One-Off: £6.50 per pack (3 injera)`;
};
var am_terms_pricing_list_oneoff = () => {
	return `አንድ ጊዜ ግዢ፦ £6.50 በአንድ ጥቅል (3 እንጀራ)`;
};
/**
* | output |
* | --- |
* | "One-Off: £6.50 per pack (3 injera)" |
*
* @param {Terms_Pricing_List_OneoffInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_list_oneoff = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_list_oneoff();
	return en_terms_pricing_list_oneoff();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_list_starter.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_List_StarterInputs */
var en_terms_pricing_list_starter = () => {
	return `Starter: £12.00 per month (2 packs)`;
};
var am_terms_pricing_list_starter = () => {
	return `መጀመሪያ ዕቅድ፦ £12.00 በወር (2 ጥቅሎች)`;
};
/**
* | output |
* | --- |
* | "Starter: £12.00 per month (2 packs)" |
*
* @param {Terms_Pricing_List_StarterInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_list_starter = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_list_starter();
	return en_terms_pricing_list_starter();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_list_regular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_List_RegularInputs */
var en_terms_pricing_list_regular = () => {
	return `Regular: £24.00 per month (4 packs)`;
};
var am_terms_pricing_list_regular = () => {
	return `መደበኛ ዕቅድ፦ £24.00 በወር (4 ጥቅሎች)`;
};
/**
* | output |
* | --- |
* | "Regular: £24.00 per month (4 packs)" |
*
* @param {Terms_Pricing_List_RegularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_list_regular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_list_regular();
	return en_terms_pricing_list_regular();
});
//#endregion
//#region src/lib/paraglide/messages/terms_pricing_list_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Pricing_List_GiftInputs */
var en_terms_pricing_list_gift = () => {
	return `Gift: £8.50 one-time`;
};
var am_terms_pricing_list_gift = () => {
	return `ስጦታ፦ £8.50 አንድ ጊዜ`;
};
/**
* | output |
* | --- |
* | "Gift: £8.50 one-time" |
*
* @param {Terms_Pricing_List_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_pricing_list_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_pricing_list_gift();
	return en_terms_pricing_list_gift();
});
//#endregion
//#region src/lib/paraglide/messages/terms_delivery_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Delivery_TitleInputs */
var en_terms_delivery_title = () => {
	return `Delivery`;
};
var am_terms_delivery_title = () => {
	return `ማድረስ`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Terms_Delivery_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_delivery_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_delivery_title();
	return en_terms_delivery_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_delivery_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Delivery_ContentInputs */
var en_terms_delivery_content = () => {
	return `<p>London only. Saturdays. Cold-chain packaging. Full details at <a href="/delivery">Delivery</a>. If delivery is lost in transit, contact us within 48 hours.</p>`;
};
var am_terms_delivery_content = () => {
	return `<p>በለንደን ውስጥ ብቻ። ቅዳሜ ቀናት። ቀዝቃዛ-ሰንሰለት ማሸጊያ። ሙሉ ዝርዝር በ<a href="/delivery">ማድረስ</a> ገጽ ላይ ይመልከቱ። ማድረሻው በመንገድ ላይ ከጠፋ በ48 ሰዓት ውስጥ ያግኙን።</p>`;
};
/**
* | output |
* | --- |
* | "<p>London only. Saturdays. Cold-chain packaging. Full details at <a href=\"/delivery\">Delivery</a>. If delivery is lost in transit, contact us within 48 hours..." |
*
* @param {Terms_Delivery_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_delivery_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_delivery_content();
	return en_terms_delivery_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_refunds_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Refunds_TitleInputs */
var en_terms_refunds_title = () => {
	return `Refund policy`;
};
var am_terms_refunds_title = () => {
	return `የተመላሽ ገንዘብ ፖሊሲ`;
};
/**
* | output |
* | --- |
* | "Refund policy" |
*
* @param {Terms_Refunds_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_refunds_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_refunds_title();
	return en_terms_refunds_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_refunds_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Refunds_ContentInputs */
var en_terms_refunds_content = () => {
	return `<p>Food products cannot be returned. If a product arrives damaged or incorrect, contact us within 48 hours with a photo at <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>. We will offer a replacement, credit, or refund as appropriate. Statutory rights under the Consumer Rights Act 2015 are not affected.</p>`;
};
var am_terms_refunds_content = () => {
	return `<p>የምግብ ምርቶች ሊመለሱ አይችሉም። ምርት ተጎድቶ ወይም በስህተት ከደረሰዎት፣ በ48 ሰዓት ውስጥ ፎቶ አያይዘው በ<a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> ያግኙን። እንደ ሁኔታው ምትክ፣ ክሬዲት ወይም ተመላሽ ገንዘብ እናቀርባለን። በ2015 የሸማቾች መብት ሕግ (Consumer Rights Act 2015) የተጠበቁ ሕጋዊ መብቶችዎ አይነኩም።</p>`;
};
/**
* | output |
* | --- |
* | "<p>Food products cannot be returned. If a product arrives damaged or incorrect, contact us within 48 hours with a photo at <a href=\"mailto:hello@gotera.co.uk..." |
*
* @param {Terms_Refunds_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_refunds_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_refunds_content();
	return en_terms_refunds_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_quality_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Quality_TitleInputs */
var en_terms_quality_title = () => {
	return `Product quality`;
};
var am_terms_quality_title = () => {
	return `የምርት ጥራት`;
};
/**
* | output |
* | --- |
* | "Product quality" |
*
* @param {Terms_Quality_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_quality_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_quality_title();
	return en_terms_quality_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_quality_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Quality_ContentInputs */
var en_terms_quality_content = () => {
	return `<p>All injera is 100% teff, naturally fermented, vegan, and gluten-free. Consume before the best-before date. Quality complaints responded to within 3 working days.</p>`;
};
var am_terms_quality_content = () => {
	return `<p>ሁሉም እንጀራ 100% ጤፍ ሲሆን፣ በተፈጥሮ የተቦካ፣ ቬጋን እና ግሉተን-ነጻ ነው። ከምርጥ-በፊት ቀን በፊት ይመገቡ። የጥራት ቅሬታዎች በ3 የስራ ቀናት ውስጥ ምላሽ ያገኛሉ።</p>`;
};
/**
* | output |
* | --- |
* | "<p>All injera is 100% teff, naturally fermented, vegan, and gluten-free. Consume before the best-before date. Quality complaints responded to within 3 workin..." |
*
* @param {Terms_Quality_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_quality_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_quality_content();
	return en_terms_quality_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_liability_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Liability_TitleInputs */
var en_terms_liability_title = () => {
	return `Limitation of liability`;
};
var am_terms_liability_title = () => {
	return `የተጠያቂነት ገደብ`;
};
/**
* | output |
* | --- |
* | "Limitation of liability" |
*
* @param {Terms_Liability_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_liability_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_liability_title();
	return en_terms_liability_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_liability_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Liability_ContentInputs */
var en_terms_liability_content = () => {
	return `<p>Our liability is limited to the amount paid for the product in question. We are not liable for indirect or consequential losses. Your statutory consumer rights are not limited.</p>`;
};
var am_terms_liability_content = () => {
	return `<p>ተጠያቂነታችን ለተጠቀሰው ምርት ከተከፈለው መጠን ጋር የተገደበ ነው። ለተዘዋዋሪ ወይም ለውጤት ጉዳቶች ተጠያቂ አንሆንም። ሕጋዊ የሸማች መብቶችዎ አይገደቡም።</p>`;
};
/**
* | output |
* | --- |
* | "<p>Our liability is limited to the amount paid for the product in question. We are not liable for indirect or consequential losses. Your statutory consumer r..." |
*
* @param {Terms_Liability_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_liability_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_liability_content();
	return en_terms_liability_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_law_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Law_TitleInputs */
var en_terms_law_title = () => {
	return `Governing law`;
};
var am_terms_law_title = () => {
	return `የሚመራ ሕግ`;
};
/**
* | output |
* | --- |
* | "Governing law" |
*
* @param {Terms_Law_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_law_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_law_title();
	return en_terms_law_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_law_content.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Law_ContentInputs */
var en_terms_law_content = () => {
	return `<p>These terms are governed by the law of England and Wales.</p>`;
};
var am_terms_law_content = () => {
	return `<p>እነዚህ ውሎች በእንግሊዝና ዌልስ ሕግ ይመራሉ።</p>`;
};
/**
* | output |
* | --- |
* | "<p>These terms are governed by the law of England and Wales.</p>" |
*
* @param {Terms_Law_ContentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_law_content = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_law_content();
	return en_terms_law_content();
});
//#endregion
//#region src/lib/paraglide/messages/terms_cta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Cta_TitleInputs */
var en_terms_cta_title = () => {
	return `Ready to subscribe?`;
};
var am_terms_cta_title = () => {
	return `ደንበኝነት ለመመዝገብ ዝግጁ ነዎት?`;
};
/**
* | output |
* | --- |
* | "Ready to subscribe?" |
*
* @param {Terms_Cta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_cta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_cta_title();
	return en_terms_cta_title();
});
//#endregion
//#region src/lib/paraglide/messages/terms_cta_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Cta_SubInputs */
var en_terms_cta_sub = () => {
	return `No minimum term. Cancel any time.`;
};
var am_terms_cta_sub = () => {
	return `ምንም አነስተኛ የቆይታ ጊዜ የለም። በማንኛውም ጊዜ ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | "No minimum term. Cancel any time." |
*
* @param {Terms_Cta_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_cta_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_cta_sub();
	return en_terms_cta_sub();
});
//#endregion
//#region src/lib/paraglide/messages/terms_cta_btn.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Terms_Cta_BtnInputs */
var en_terms_cta_btn = () => {
	return `Choose Your Plan`;
};
var am_terms_cta_btn = () => {
	return `ዕቅድዎን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose Your Plan" |
*
* @param {Terms_Cta_BtnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var terms_cta_btn = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_terms_cta_btn();
	return en_terms_cta_btn();
});
//#endregion
//#region src/routes/terms/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const sections = derived(() => [
			{
				id: "about",
				title: terms_about_title(),
				content: terms_about_content(),
				infobox: terms_about_infobox()
			},
			{
				id: "service",
				title: terms_service_title(),
				content: terms_service_content()
			},
			{
				id: "subscription",
				title: terms_subscription_title(),
				subsections: [
					{
						title: terms_subscription_billing_title(),
						body: terms_subscription_billing_body()
					},
					{
						title: terms_subscription_cancellation_title(),
						body: terms_subscription_cancellation_body()
					},
					{
						title: terms_subscription_pause_title(),
						body: terms_subscription_pause_body()
					},
					{
						title: terms_subscription_minterm_title(),
						body: terms_subscription_minterm_body()
					}
				]
			},
			{
				id: "pricing",
				title: terms_pricing_title(),
				content: terms_pricing_content(),
				list: [
					terms_pricing_list_oneoff(),
					terms_pricing_list_starter(),
					terms_pricing_list_regular(),
					terms_pricing_list_gift()
				]
			},
			{
				id: "delivery",
				title: terms_delivery_title(),
				content: terms_delivery_content()
			},
			{
				id: "refunds",
				title: terms_refunds_title(),
				content: terms_refunds_content()
			},
			{
				id: "quality",
				title: terms_quality_title(),
				content: terms_quality_content()
			},
			{
				id: "liability",
				title: terms_liability_title(),
				content: terms_liability_content()
			},
			{
				id: "law",
				title: terms_law_title(),
				content: terms_law_content()
			}
		]);
		$$renderer.push(`<section class="hero svelte-1e0rsuc"><div class="container svelte-1e0rsuc"><span class="eyebrow svelte-1e0rsuc">${escape_html(terms_eyebrow())}</span> <h1 class="svelte-1e0rsuc">${escape_html(terms_h1())}</h1> <p class="updated svelte-1e0rsuc">${escape_html(terms_updated())}</p></div></section> <div class="content svelte-1e0rsuc"><div class="container svelte-1e0rsuc"><!--[-->`);
		const each_array = ensure_array_like(sections());
		for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
			let section = each_array[$$index_2];
			$$renderer.push(`<div class="ls svelte-1e0rsuc"><h2 class="svelte-1e0rsuc">${escape_html(section.title)}</h2> `);
			if (section.content) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${html(section.content)}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (section.infobox) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="infobox svelte-1e0rsuc"><p class="svelte-1e0rsuc">${html(section.infobox)}</p></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (section.subsections) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like(section.subsections);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let sub = each_array_1[$$index];
					$$renderer.push(`<h3 class="svelte-1e0rsuc">${escape_html(sub.title)}</h3> <p class="svelte-1e0rsuc">${escape_html(sub.body)}</p>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (section.list) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<ul class="svelte-1e0rsuc"><!--[-->`);
				const each_array_2 = ensure_array_like(section.list);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let item = each_array_2[$$index_1];
					$$renderer.push(`<li class="svelte-1e0rsuc">${escape_html(item)}</li>`);
				}
				$$renderer.push(`<!--]--></ul>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--> <div class="cta-box svelte-1e0rsuc"><div class="cta-title svelte-1e0rsuc">${escape_html(terms_cta_title())}</div> <p class="cta-sub svelte-1e0rsuc">${escape_html(terms_cta_sub())}</p> <a href="/subscribe" class="cta-btn svelte-1e0rsuc">${escape_html(terms_cta_btn())}</a></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BISM6LMK.js.map
