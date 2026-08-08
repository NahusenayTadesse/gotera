import { a0 as head, $ as attr, a9 as escape_html, aa as attr_class, a4 as ensure_array_like, ac as attr_style, ab as stringify$1, a3 as clsx$1, T as derived } from '../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../chunks/runtime.js-CYqc9Mf9.js';
import { A as Arrow_right } from '../../chunks/arrow-right.js-DitxXWBo.js';
import { T as Testimonial } from '../../chunks/gallery.js-BFxF_w--.js';
import '../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../chunks/shared.js-CgqsOrws.js';
import '../../chunks/Icon.js-C-2f-rrd.js';
import '../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../chunks/dialog.js-BhMsigOw.js';
import '../../chunks/create-id.js-DpR0oe6q.js';
import '../../chunks/utils2.js-BChetszu.js';
import '../../chunks/button.js-DMlVoc1I.js';
import '../../chunks/card.js-DgfKxiLl.js';
import '../../chunks/legacy-client.js-CYlmvPew.js';
import '../../chunks/index-server.js-C9rOfj9g.js';
import '../../chunks/rolldown-runtime.js-BBx_TEkp.js';

//#region src/lib/paraglide/messages/home_meta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Meta_TitleInputs */
var en_home_meta_title = () => {
	return `GOTERA — Premium Ethiopian Food`;
};
var am_home_meta_title = () => {
	return `GOTERA — ልዩ የኢትዮጵያ ምግብ`;
};
/**
* | output |
* | --- |
* | "GOTERA — Premium Ethiopian Food" |
*
* @param {Home_Meta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_meta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_meta_title();
	return en_home_meta_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_aria_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Aria_LabelInputs */
var en_home_hero_aria_label = () => {
	return `Hero`;
};
var am_home_hero_aria_label = () => {
	return `የመግቢያ ክፍል`;
};
/**
* | output |
* | --- |
* | "Hero" |
*
* @param {Home_Hero_Aria_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_aria_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_aria_label();
	return en_home_hero_aria_label();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_EyebrowInputs */
var en_home_hero_eyebrow = () => {
	return `Made & packed in Ethiopia`;
};
var am_home_hero_eyebrow = () => {
	return `ከኢትዮጵያ የተዘጋጀና የታሸገ`;
};
/**
* | output |
* | --- |
* | "Made & packed in Ethiopia" |
*
* @param {Home_Hero_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_eyebrow();
	return en_home_hero_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_TitleInputs */
var en_home_hero_title = () => {
	return `Injera, Delivered To your door.`;
};
var am_home_hero_title = () => {
	return `እንጀራ፣ እስከ በርዎ ድረስ ይደርሳል።`;
};
/**
* | output |
* | --- |
* | "Injera, Delivered To your door." |
*
* @param {Home_Hero_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_title();
	return en_home_hero_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_meta_teff.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Meta_TeffInputs */
var en_home_hero_meta_teff = () => {
	return `100% Teff`;
};
var am_home_hero_meta_teff = () => {
	return `100% ጤፍ`;
};
/**
* | output |
* | --- |
* | "100% Teff" |
*
* @param {Home_Hero_Meta_TeffInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_meta_teff = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_meta_teff();
	return en_home_hero_meta_teff();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_meta_vegan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Meta_VeganInputs */
var en_home_hero_meta_vegan = () => {
	return `Vegan`;
};
var am_home_hero_meta_vegan = () => {
	return `ቪጋን`;
};
/**
* | output |
* | --- |
* | "Vegan" |
*
* @param {Home_Hero_Meta_VeganInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_meta_vegan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_meta_vegan();
	return en_home_hero_meta_vegan();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_meta_gluten_free.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Meta_Gluten_FreeInputs */
var en_home_hero_meta_gluten_free = () => {
	return `Gluten Free`;
};
var am_home_hero_meta_gluten_free = () => {
	return `ግሉተን የሌለው`;
};
/**
* | output |
* | --- |
* | "Gluten Free" |
*
* @param {Home_Hero_Meta_Gluten_FreeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_meta_gluten_free = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_meta_gluten_free();
	return en_home_hero_meta_gluten_free();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_meta_iron.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Meta_IronInputs */
var en_home_hero_meta_iron = () => {
	return `High in Iron`;
};
var am_home_hero_meta_iron = () => {
	return `በብረት የበለጸገ`;
};
/**
* | output |
* | --- |
* | "High in Iron" |
*
* @param {Home_Hero_Meta_IronInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_meta_iron = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_meta_iron();
	return en_home_hero_meta_iron();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_copy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_CopyInputs */
var en_home_hero_copy = () => {
	return `Real injera on a monthly subscription. Made in Ethiopia. Delivered to your door.`;
};
var am_home_hero_copy = () => {
	return `ትክክለኛ እንጀራ በወርሃዊ ምዝገባ። በኢትዮጵያ ተዘጋጅቶ እስከ በርዎ ድረስ ይደርሳል።`;
};
/**
* | output |
* | --- |
* | "Real injera on a monthly subscription. Made in Ethiopia. Delivered to your door." |
*
* @param {Home_Hero_CopyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_copy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_copy();
	return en_home_hero_copy();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_cta_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Cta_PlanInputs */
var en_home_hero_cta_plan = () => {
	return `Choose Your Plan`;
};
var am_home_hero_cta_plan = () => {
	return `እቅድዎን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose Your Plan" |
*
* @param {Home_Hero_Cta_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_cta_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_cta_plan();
	return en_home_hero_cta_plan();
});
//#endregion
//#region src/lib/paraglide/messages/home_price_from_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ price: NonNullable<unknown> }} Home_Price_From_SuffixInputs */
var en_home_price_from_suffix = (i) => {
	return ` — from ${i?.price}`;
};
var am_home_price_from_suffix = (i) => {
	return ` — ከ${i?.price} ጀምሮ`;
};
/**
* | output |
* | --- |
* | "— from {price}" |
*
* @param {Home_Price_From_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_price_from_suffix = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_price_from_suffix(inputs);
	return en_home_price_from_suffix(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_cta_about.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Cta_AboutInputs */
var en_home_hero_cta_about = () => {
	return `About GOTERA`;
};
var am_home_hero_cta_about = () => {
	return `ስለ GOTERA`;
};
/**
* | output |
* | --- |
* | "About GOTERA" |
*
* @param {Home_Hero_Cta_AboutInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_cta_about = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_cta_about();
	return en_home_hero_cta_about();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_img_alt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Img_AltInputs */
var en_home_hero_img_alt = () => {
	return `GOTERA injera`;
};
var am_home_hero_img_alt = () => {
	return `የGOTERA እንጀራ`;
};
/**
* | output |
* | --- |
* | "GOTERA injera" |
*
* @param {Home_Hero_Img_AltInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_img_alt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_img_alt();
	return en_home_hero_img_alt();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_card_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Card_TitleInputs */
var en_home_hero_card_title = () => {
	return `Injera`;
};
var am_home_hero_card_title = () => {
	return `እንጀራ`;
};
/**
* | output |
* | --- |
* | "Injera" |
*
* @param {Home_Hero_Card_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_card_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_card_title();
	return en_home_hero_card_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_card_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Card_DescInputs */
var en_home_hero_card_desc = () => {
	return `100% teff · naturally fermented · made in Ethiopia`;
};
var am_home_hero_card_desc = () => {
	return `100% ጤፍ · በተፈጥሮ የቦካ · በኢትዮጵያ የተዘጋጀ`;
};
/**
* | output |
* | --- |
* | "100% teff · naturally fermented · made in Ethiopia" |
*
* @param {Home_Hero_Card_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_card_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_card_desc();
	return en_home_hero_card_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_mobile_line1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Mobile_Line1Inputs */
var en_home_hero_mobile_line1 = () => {
	return `Injera,`;
};
var am_home_hero_mobile_line1 = () => {
	return `እንጀራ፣`;
};
/**
* | output |
* | --- |
* | "Injera," |
*
* @param {Home_Hero_Mobile_Line1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_mobile_line1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_mobile_line1();
	return en_home_hero_mobile_line1();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_mobile_line2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Mobile_Line2Inputs */
var en_home_hero_mobile_line2 = () => {
	return `Delivered`;
};
var am_home_hero_mobile_line2 = () => {
	return `እስከ በርዎ`;
};
/**
* | output |
* | --- |
* | "Delivered" |
*
* @param {Home_Hero_Mobile_Line2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_mobile_line2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_mobile_line2();
	return en_home_hero_mobile_line2();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_mobile_line3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Mobile_Line3Inputs */
var en_home_hero_mobile_line3 = () => {
	return `To your door.`;
};
var am_home_hero_mobile_line3 = () => {
	return `ድረስ ይደርሳል።`;
};
/**
* | output |
* | --- |
* | "To your door." |
*
* @param {Home_Hero_Mobile_Line3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_mobile_line3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_mobile_line3();
	return en_home_hero_mobile_line3();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_price_from.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Price_FromInputs */
var en_home_hero_price_from = () => {
	return `From`;
};
var am_home_hero_price_from = () => {
	return `ከ`;
};
/**
* | output |
* | --- |
* | "From" |
*
* @param {Home_Hero_Price_FromInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_price_from = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_price_from();
	return en_home_hero_price_from();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_price_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Price_NoteInputs */
var en_home_hero_price_note = () => {
	return `/ month · London delivery`;
};
var am_home_hero_price_note = () => {
	return `/ በወር · ወደ ለንደን ማድረስ`;
};
/**
* | output |
* | --- |
* | "/ month · London delivery" |
*
* @param {Home_Hero_Price_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_price_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_price_note();
	return en_home_hero_price_note();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_cta_order_now.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Cta_Order_NowInputs */
var en_home_hero_cta_order_now = () => {
	return `Order Now`;
};
var am_home_hero_cta_order_now = () => {
	return `አሁን ይዘዙ`;
};
/**
* | output |
* | --- |
* | "Order Now" |
*
* @param {Home_Hero_Cta_Order_NowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_cta_order_now = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_cta_order_now();
	return en_home_hero_cta_order_now();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_claim_gluten_free.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Claim_Gluten_FreeInputs */
var en_home_hero_claim_gluten_free = () => {
	return `Gluten free`;
};
var am_home_hero_claim_gluten_free = () => {
	return `ግሉተን የሌለው`;
};
/**
* | output |
* | --- |
* | "Gluten free" |
*
* @param {Home_Hero_Claim_Gluten_FreeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_claim_gluten_free = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_claim_gluten_free();
	return en_home_hero_claim_gluten_free();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_claim_vegan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Claim_VeganInputs */
var en_home_hero_claim_vegan = () => {
	return `Vegan`;
};
var am_home_hero_claim_vegan = () => {
	return `ቪጋን`;
};
/**
* | output |
* | --- |
* | "Vegan" |
*
* @param {Home_Hero_Claim_VeganInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_claim_vegan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_claim_vegan();
	return en_home_hero_claim_vegan();
});
//#endregion
//#region src/lib/paraglide/messages/home_hero_claim_teff.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Hero_Claim_TeffInputs */
var en_home_hero_claim_teff = () => {
	return `100% teff`;
};
var am_home_hero_claim_teff = () => {
	return `100% ጤፍ`;
};
/**
* | output |
* | --- |
* | "100% teff" |
*
* @param {Home_Hero_Claim_TeffInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_hero_claim_teff = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_hero_claim_teff();
	return en_home_hero_claim_teff();
});
//#endregion
//#region src/lib/paraglide/messages/home_proof_label_subscribers.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Proof_Label_SubscribersInputs */
var en_home_proof_label_subscribers = () => {
	return `Subscribers`;
};
var am_home_proof_label_subscribers = () => {
	return `ተመዝጋቢዎች`;
};
/**
* | output |
* | --- |
* | "Subscribers" |
*
* @param {Home_Proof_Label_SubscribersInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_proof_label_subscribers = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_proof_label_subscribers();
	return en_home_proof_label_subscribers();
});
//#endregion
//#region src/lib/paraglide/messages/home_proof_label_deliveries.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Proof_Label_DeliveriesInputs */
var en_home_proof_label_deliveries = () => {
	return `Deliveries made`;
};
var am_home_proof_label_deliveries = () => {
	return `የተከናወኑ ማድረሻዎች`;
};
/**
* | output |
* | --- |
* | "Deliveries made" |
*
* @param {Home_Proof_Label_DeliveriesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_proof_label_deliveries = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_proof_label_deliveries();
	return en_home_proof_label_deliveries();
});
//#endregion
//#region src/lib/paraglide/messages/home_proof_city_london.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Proof_City_LondonInputs */
var en_home_proof_city_london = () => {
	return `London`;
};
var am_home_proof_city_london = () => {
	return `ለንደን`;
};
/**
* | output |
* | --- |
* | "London" |
*
* @param {Home_Proof_City_LondonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_proof_city_london = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_proof_city_london();
	return en_home_proof_city_london();
});
//#endregion
//#region src/lib/paraglide/messages/home_proof_label_delivering_in.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Proof_Label_Delivering_InInputs */
var en_home_proof_label_delivering_in = () => {
	return `Delivering in`;
};
var am_home_proof_label_delivering_in = () => {
	return `የምናደርስበት`;
};
/**
* | output |
* | --- |
* | "Delivering in" |
*
* @param {Home_Proof_Label_Delivering_InInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_proof_label_delivering_in = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_proof_label_delivering_in();
	return en_home_proof_label_delivering_in();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillars_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillars_EyebrowInputs */
var en_home_pillars_eyebrow = () => {
	return `Why GOTERA`;
};
var am_home_pillars_eyebrow = () => {
	return `ለምን GOTERA`;
};
/**
* | output |
* | --- |
* | "Why GOTERA" |
*
* @param {Home_Pillars_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillars_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillars_eyebrow();
	return en_home_pillars_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillars_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillars_TitleInputs */
var en_home_pillars_title = () => {
	return `Injera From Its Origin. Made Right.`;
};
var am_home_pillars_title = () => {
	return `እንጀራ ከምንጩ። በትክክል የተዘጋጀ።`;
};
/**
* | output |
* | --- |
* | "Injera From Its Origin. Made Right." |
*
* @param {Home_Pillars_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillars_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillars_title();
	return en_home_pillars_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillars_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillars_SubtitleInputs */
var en_home_pillars_subtitle = () => {
	return `Real injera, made in Ethiopia. The genuine taste you've been missing.`;
};
var am_home_pillars_subtitle = () => {
	return `ትክክለኛ እንጀራ፣ በኢትዮጵያ የተዘጋጀ። የናፈቁትን ትክክለኛ ጣዕም።`;
};
/**
* | output |
* | --- |
* | "Real injera, made in Ethiopia. The genuine taste you've been missing." |
*
* @param {Home_Pillars_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillars_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillars_subtitle();
	return en_home_pillars_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar1_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar1_TitleInputs */
var en_home_pillar1_title = () => {
	return `Made in Ethiopia`;
};
var am_home_pillar1_title = () => {
	return `በኢትዮጵያ የተዘጋጀ`;
};
/**
* | output |
* | --- |
* | "Made in Ethiopia" |
*
* @param {Home_Pillar1_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar1_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar1_title();
	return en_home_pillar1_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar1_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar1_DescInputs */
var en_home_pillar1_desc = () => {
	return `Straight from its origin`;
};
var am_home_pillar1_desc = () => {
	return `በቀጥታ ከምንጩ`;
};
/**
* | output |
* | --- |
* | "Straight from its origin" |
*
* @param {Home_Pillar1_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar1_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar1_desc();
	return en_home_pillar1_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar2_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar2_TitleInputs */
var en_home_pillar2_title = () => {
	return `100% Teff`;
};
var am_home_pillar2_title = () => {
	return `100% ጤፍ`;
};
/**
* | output |
* | --- |
* | "100% Teff" |
*
* @param {Home_Pillar2_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar2_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar2_title();
	return en_home_pillar2_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar2_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar2_DescInputs */
var en_home_pillar2_desc = () => {
	return `No compromise.`;
};
var am_home_pillar2_desc = () => {
	return `ያለ ምንም ስምምነት።`;
};
/**
* | output |
* | --- |
* | "No compromise." |
*
* @param {Home_Pillar2_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar2_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar2_desc();
	return en_home_pillar2_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar3_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar3_TitleInputs */
var en_home_pillar3_title = () => {
	return `Weekly delivery`;
};
var am_home_pillar3_title = () => {
	return `ሳምንታዊ ማድረስ`;
};
/**
* | output |
* | --- |
* | "Weekly delivery" |
*
* @param {Home_Pillar3_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar3_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar3_title();
	return en_home_pillar3_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar3_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar3_DescInputs */
var en_home_pillar3_desc = () => {
	return `Order once. It just keeps coming.`;
};
var am_home_pillar3_desc = () => {
	return `አንዴ ይዘዙ። ቀጣይነት ባለው መልኩ ይመጣል።`;
};
/**
* | output |
* | --- |
* | "Order once. It just keeps coming." |
*
* @param {Home_Pillar3_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar3_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar3_desc();
	return en_home_pillar3_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar4_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar4_TitleInputs */
var en_home_pillar4_title = () => {
	return `Premium, Every time`;
};
var am_home_pillar4_title = () => {
	return `ልዩ ጥራት፣ በየጊዜው`;
};
/**
* | output |
* | --- |
* | "Premium, Every time" |
*
* @param {Home_Pillar4_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar4_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar4_title();
	return en_home_pillar4_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_pillar4_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Pillar4_DescInputs */
var en_home_pillar4_desc = () => {
	return `What you order is what arrives. No surprises.`;
};
var am_home_pillar4_desc = () => {
	return `ያዘዙት ነው የሚደርስዎት። ምንም የሚያስደንቅ ነገር የለም።`;
};
/**
* | output |
* | --- |
* | "What you order is what arrives. No surprises." |
*
* @param {Home_Pillar4_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_pillar4_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_pillar4_desc();
	return en_home_pillar4_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_plans_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plans_EyebrowInputs */
var en_home_plans_eyebrow = () => {
	return `Subscription Plans`;
};
var am_home_plans_eyebrow = () => {
	return `የምዝገባ እቅዶች`;
};
/**
* | output |
* | --- |
* | "Subscription Plans" |
*
* @param {Home_Plans_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plans_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plans_eyebrow();
	return en_home_plans_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_plans_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plans_TitleInputs */
var en_home_plans_title = () => {
	return `Choose your plan.`;
};
var am_home_plans_title = () => {
	return `እቅድዎን ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Choose your plan." |
*
* @param {Home_Plans_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plans_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plans_title();
	return en_home_plans_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_plans_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plans_SubtitleInputs */
var en_home_plans_subtitle = () => {
	return `No minimum term. Pause or cancel any time.`;
};
var am_home_plans_subtitle = () => {
	return `ምንም ዝቅተኛ ጊዜ የለም። በማንኛውም ጊዜ ያቁሙ ወይም ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | "No minimum term. Pause or cancel any time." |
*
* @param {Home_Plans_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plans_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plans_subtitle();
	return en_home_plans_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/home_plans_empty.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plans_EmptyInputs */
var en_home_plans_empty = () => {
	return `Plans are being updated — check back shortly.`;
};
var am_home_plans_empty = () => {
	return `እቅዶች እየተዘመኑ ነው — በቅርቡ ይመልከቱ።`;
};
/**
* | output |
* | --- |
* | "Plans are being updated — check back shortly." |
*
* @param {Home_Plans_EmptyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plans_empty = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plans_empty();
	return en_home_plans_empty();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_oneoff_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Oneoff_DescInputs */
var en_home_plan_oneoff_desc = () => {
	return `Try GOTERA without committing.`;
};
var am_home_plan_oneoff_desc = () => {
	return `GOTERA ን ያለ ምዝገባ ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Try GOTERA without committing." |
*
* @param {Home_Plan_Oneoff_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_oneoff_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_oneoff_desc();
	return en_home_plan_oneoff_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_oneoff_bullet1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Oneoff_Bullet1Inputs */
var en_home_plan_oneoff_bullet1 = () => {
	return `No subscription`;
};
var am_home_plan_oneoff_bullet1 = () => {
	return `ያለ ምዝገባ`;
};
/**
* | output |
* | --- |
* | "No subscription" |
*
* @param {Home_Plan_Oneoff_Bullet1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_oneoff_bullet1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_oneoff_bullet1();
	return en_home_plan_oneoff_bullet1();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_oneoff_bullet2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Oneoff_Bullet2Inputs */
var en_home_plan_oneoff_bullet2 = () => {
	return `Ideal first order`;
};
var am_home_plan_oneoff_bullet2 = () => {
	return `ለመጀመሪያ ትዕዛዝ ተስማሚ`;
};
/**
* | output |
* | --- |
* | "Ideal first order" |
*
* @param {Home_Plan_Oneoff_Bullet2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_oneoff_bullet2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_oneoff_bullet2();
	return en_home_plan_oneoff_bullet2();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_oneoff_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Oneoff_CtaInputs */
var en_home_plan_oneoff_cta = () => {
	return `Order now`;
};
var am_home_plan_oneoff_cta = () => {
	return `አሁን ይዘዙ`;
};
/**
* | output |
* | --- |
* | "Order now" |
*
* @param {Home_Plan_Oneoff_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_oneoff_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_oneoff_cta();
	return en_home_plan_oneoff_cta();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_starter_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Starter_DescInputs */
var en_home_plan_starter_desc = () => {
	return `Lighter monthly plan.`;
};
var am_home_plan_starter_desc = () => {
	return `ቀላል ወርሃዊ እቅድ።`;
};
/**
* | output |
* | --- |
* | "Lighter monthly plan." |
*
* @param {Home_Plan_Starter_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_starter_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_starter_desc();
	return en_home_plan_starter_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_starter_bullet1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Starter_Bullet1Inputs */
var en_home_plan_starter_bullet1 = () => {
	return `2 packs monthly`;
};
var am_home_plan_starter_bullet1 = () => {
	return `2 ጥቅሎች በወር`;
};
/**
* | output |
* | --- |
* | "2 packs monthly" |
*
* @param {Home_Plan_Starter_Bullet1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_starter_bullet1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_starter_bullet1();
	return en_home_plan_starter_bullet1();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_starter_bullet2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Starter_Bullet2Inputs */
var en_home_plan_starter_bullet2 = () => {
	return `Pause or skip anytime`;
};
var am_home_plan_starter_bullet2 = () => {
	return `በማንኛውም ጊዜ ያቁሙ ወይም ይዝለሉ`;
};
/**
* | output |
* | --- |
* | "Pause or skip anytime" |
*
* @param {Home_Plan_Starter_Bullet2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_starter_bullet2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_starter_bullet2();
	return en_home_plan_starter_bullet2();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_starter_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Starter_CtaInputs */
var en_home_plan_starter_cta = () => {
	return `Choose Starter`;
};
var am_home_plan_starter_cta = () => {
	return `ጀማሪ እቅድን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose Starter" |
*
* @param {Home_Plan_Starter_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_starter_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_starter_cta();
	return en_home_plan_starter_cta();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_regular_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Regular_DescInputs */
var en_home_plan_regular_desc = () => {
	return `Our core plan.`;
};
var am_home_plan_regular_desc = () => {
	return `ዋነኛ እቅዳችን።`;
};
/**
* | output |
* | --- |
* | "Our core plan." |
*
* @param {Home_Plan_Regular_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_regular_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_regular_desc();
	return en_home_plan_regular_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_regular_bullet1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Regular_Bullet1Inputs */
var en_home_plan_regular_bullet1 = () => {
	return `Best for regular households`;
};
var am_home_plan_regular_bullet1 = () => {
	return `ለመደበኛ ቤተሰቦች ተስማሚ`;
};
/**
* | output |
* | --- |
* | "Best for regular households" |
*
* @param {Home_Plan_Regular_Bullet1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_regular_bullet1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_regular_bullet1();
	return en_home_plan_regular_bullet1();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_regular_bullet2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Regular_Bullet2Inputs */
var en_home_plan_regular_bullet2 = () => {
	return `Strongest monthly value`;
};
var am_home_plan_regular_bullet2 = () => {
	return `ከፍተኛ ወርሃዊ ጥቅም`;
};
/**
* | output |
* | --- |
* | "Strongest monthly value" |
*
* @param {Home_Plan_Regular_Bullet2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_regular_bullet2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_regular_bullet2();
	return en_home_plan_regular_bullet2();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_regular_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Regular_CtaInputs */
var en_home_plan_regular_cta = () => {
	return `Choose Regular`;
};
var am_home_plan_regular_cta = () => {
	return `መደበኛ እቅድን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose Regular" |
*
* @param {Home_Plan_Regular_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_regular_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_regular_cta();
	return en_home_plan_regular_cta();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_gift_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Gift_DescInputs */
var en_home_plan_gift_desc = () => {
	return `Send injera to someone else.`;
};
var am_home_plan_gift_desc = () => {
	return `እንጀራን ለሌላ ሰው ይላኩ።`;
};
/**
* | output |
* | --- |
* | "Send injera to someone else." |
*
* @param {Home_Plan_Gift_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_gift_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_gift_desc();
	return en_home_plan_gift_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_gift_bullet1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Gift_Bullet1Inputs */
var en_home_plan_gift_bullet1 = () => {
	return `No subscription needed`;
};
var am_home_plan_gift_bullet1 = () => {
	return `ምዝገባ አያስፈልግም`;
};
/**
* | output |
* | --- |
* | "No subscription needed" |
*
* @param {Home_Plan_Gift_Bullet1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_gift_bullet1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_gift_bullet1();
	return en_home_plan_gift_bullet1();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_gift_bullet2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Gift_Bullet2Inputs */
var en_home_plan_gift_bullet2 = () => {
	return `Add pantry items`;
};
var am_home_plan_gift_bullet2 = () => {
	return `የቤት ውስጥ ግብዓቶችን ይጨምሩ`;
};
/**
* | output |
* | --- |
* | "Add pantry items" |
*
* @param {Home_Plan_Gift_Bullet2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_gift_bullet2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_gift_bullet2();
	return en_home_plan_gift_bullet2();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_gift_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Gift_CtaInputs */
var en_home_plan_gift_cta = () => {
	return `Send a gift`;
};
var am_home_plan_gift_cta = () => {
	return `ስጦታ ይላኩ`;
};
/**
* | output |
* | --- |
* | "Send a gift" |
*
* @param {Home_Plan_Gift_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_gift_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_gift_cta();
	return en_home_plan_gift_cta();
});
//#endregion
//#region src/lib/paraglide/messages/home_plan_default_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Plan_Default_CtaInputs */
var en_home_plan_default_cta = () => {
	return `Choose plan`;
};
var am_home_plan_default_cta = () => {
	return `እቅድ ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose plan" |
*
* @param {Home_Plan_Default_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_plan_default_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_plan_default_cta();
	return en_home_plan_default_cta();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_EyebrowInputs */
var en_home_origin_eyebrow = () => {
	return `Origin`;
};
var am_home_origin_eyebrow = () => {
	return `መገኛ`;
};
/**
* | output |
* | --- |
* | "Origin" |
*
* @param {Home_Origin_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_eyebrow();
	return en_home_origin_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_TitleInputs */
var en_home_origin_title = () => {
	return `Made & packed in Ethiopia`;
};
var am_home_origin_title = () => {
	return `ከኢትዮጵያ የተዘጋጀና የታሸገ`;
};
/**
* | output |
* | --- |
* | "Made & packed in Ethiopia" |
*
* @param {Home_Origin_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_title();
	return en_home_origin_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_desc1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_Desc1Inputs */
var en_home_origin_desc1 = () => {
	return `Injera close to its source. That's what makes GOTERA worth trusting.`;
};
var am_home_origin_desc1 = () => {
	return `እንጀራ ከምንጩ ጋር ቅርበት ያለው። ይህ ነው GOTERA ን የሚያስተማምን የሚያደርገው።`;
};
/**
* | output |
* | --- |
* | "Injera close to its source. That's what makes GOTERA worth trusting." |
*
* @param {Home_Origin_Desc1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_desc1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_desc1();
	return en_home_origin_desc1();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_delivery_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_Delivery_EyebrowInputs */
var en_home_origin_delivery_eyebrow = () => {
	return `Delivery`;
};
var am_home_origin_delivery_eyebrow = () => {
	return `ማድረስ`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Home_Origin_Delivery_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_delivery_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_delivery_eyebrow();
	return en_home_origin_delivery_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_delivery_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_Delivery_TitleInputs */
var en_home_origin_delivery_title = () => {
	return `Delivered with clarity`;
};
var am_home_origin_delivery_title = () => {
	return `በግልጽነት የሚደርስ`;
};
/**
* | output |
* | --- |
* | "Delivered with clarity" |
*
* @param {Home_Origin_Delivery_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_delivery_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_delivery_title();
	return en_home_origin_delivery_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_origin_delivery_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Origin_Delivery_DescInputs */
var en_home_origin_delivery_desc = () => {
	return `Per-week Delivery. Cold-chain packaging. Clear cut-off dates. Nothing complicated.`;
};
var am_home_origin_delivery_desc = () => {
	return `በየሳምንቱ ማድረስ። የቀዝቃዛ-ሰንሰለት ማሸጊያ። ግልጽ የመጨረሻ ቀናት። ምንም የተወሳሰበ ነገር የለም።`;
};
/**
* | output |
* | --- |
* | "Per-week Delivery. Cold-chain packaging. Clear cut-off dates. Nothing complicated." |
*
* @param {Home_Origin_Delivery_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_origin_delivery_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_origin_delivery_desc();
	return en_home_origin_delivery_desc();
});
//#endregion
//#region src/lib/paraglide/messages/home_gift_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Gift_EyebrowInputs */
var en_home_gift_eyebrow = () => {
	return `Gifting`;
};
var am_home_gift_eyebrow = () => {
	return `ስጦታ`;
};
/**
* | output |
* | --- |
* | "Gifting" |
*
* @param {Home_Gift_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_gift_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_gift_eyebrow();
	return en_home_gift_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/home_gift_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Gift_TitleInputs */
var en_home_gift_title = () => {
	return `Send GOTERA to someone's door.`;
};
var am_home_gift_title = () => {
	return `GOTERA ን ወደ አንድ ሰው በር ይላኩ።`;
};
/**
* | output |
* | --- |
* | "Send GOTERA to someone's door." |
*
* @param {Home_Gift_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_gift_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_gift_title();
	return en_home_gift_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_gift_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Gift_SubtitleInputs */
var en_home_gift_subtitle = () => {
	return `Something they will actually use. One purchase, no subscription required.`;
};
var am_home_gift_subtitle = () => {
	return `በእርግጥ የሚጠቀሙበት ነገር። አንድ ግዢ ብቻ፣ ያለ ምዝገባ።`;
};
/**
* | output |
* | --- |
* | "Something they will actually use. One purchase, no subscription required." |
*
* @param {Home_Gift_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_gift_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_gift_subtitle();
	return en_home_gift_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/home_gift_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Gift_CtaInputs */
var en_home_gift_cta = () => {
	return `Send a Gift`;
};
var am_home_gift_cta = () => {
	return `ስጦታ ይላኩ`;
};
/**
* | output |
* | --- |
* | "Send a Gift" |
*
* @param {Home_Gift_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_gift_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_gift_cta();
	return en_home_gift_cta();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_EyebrowInputs */
var en_howitworks_eyebrow = () => {
	return `How it works`;
};
var am_howitworks_eyebrow = () => {
	return `እንዴት እንደሚሰራ`;
};
/**
* | output |
* | --- |
* | "How it works" |
*
* @param {Howitworks_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_eyebrow();
	return en_howitworks_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_HeadingInputs */
var en_howitworks_heading = () => {
	return `Simple from start to delivery.`;
};
var am_howitworks_heading = () => {
	return `ከመጀመሪያ እስከ ማድረሻ ቀላል።`;
};
/**
* | output |
* | --- |
* | "Simple from start to delivery." |
*
* @param {Howitworks_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_heading();
	return en_howitworks_heading();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step1_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step1_TitleInputs */
var en_howitworks_step1_title = () => {
	return `Subscribe`;
};
var am_howitworks_step1_title = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Howitworks_Step1_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step1_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step1_title();
	return en_howitworks_step1_title();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step1_copy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step1_CopyInputs */
var en_howitworks_step1_copy = () => {
	return `Choose your plan. No long contracts. Pause or cancel at any time.`;
};
var am_howitworks_step1_copy = () => {
	return `የሚስማማዎትን ዕቅድ ይምረጡ። ረጅም ውል የለም። በማንኛውም ጊዜ ማቆም ወይም መሰረዝ ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "Choose your plan. No long contracts. Pause or cancel at any time." |
*
* @param {Howitworks_Step1_CopyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step1_copy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step1_copy();
	return en_howitworks_step1_copy();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step1_meta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step1_MetaInputs */
var en_howitworks_step1_meta = () => {
	return `From £6.50 / week`;
};
var am_howitworks_step1_meta = () => {
	return `ከ£6.50 / በሳምንት ጀምሮ`;
};
/**
* | output |
* | --- |
* | "From £6.50 / week" |
*
* @param {Howitworks_Step1_MetaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step1_meta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step1_meta();
	return en_howitworks_step1_meta();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step2_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step2_TitleInputs */
var en_howitworks_step2_title = () => {
	return `Made fresh in Ethiopia`;
};
var am_howitworks_step2_title = () => {
	return `በኢትዮጵያ በአዲስ ትሰራለች`;
};
/**
* | output |
* | --- |
* | "Made fresh in Ethiopia" |
*
* @param {Howitworks_Step2_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step2_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step2_title();
	return en_howitworks_step2_title();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step2_copy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step2_CopyInputs */
var en_howitworks_step2_copy = () => {
	return `Every injera is made with 100% teff using traditional natural fermentation. Packed at source to lock in freshness.`;
};
var am_howitworks_step2_copy = () => {
	return `እያንዳንዷ እንጀራ ከ100% ጤፍ በባህላዊ የተፈጥሮ እርሾ ትሰራለች። ትኩስነቷን ለመጠበቅ ገና በምንጩ ትታሸጋለች።`;
};
/**
* | output |
* | --- |
* | "Every injera is made with 100% teff using traditional natural fermentation. Packed at source to lock in freshness." |
*
* @param {Howitworks_Step2_CopyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step2_copy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step2_copy();
	return en_howitworks_step2_copy();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step2_meta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step2_MetaInputs */
var en_howitworks_step2_meta = () => {
	return `100% teff · Naturally fermented`;
};
var am_howitworks_step2_meta = () => {
	return `100% ጤፍ · በተፈጥሮ የተፈላ`;
};
/**
* | output |
* | --- |
* | "100% teff · Naturally fermented" |
*
* @param {Howitworks_Step2_MetaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step2_meta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step2_meta();
	return en_howitworks_step2_meta();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step3_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step3_TitleInputs */
var en_howitworks_step3_title = () => {
	return `Delivered to your door`;
};
var am_howitworks_step3_title = () => {
	return `እስከ በርዎ ድረስ ትደርሳለች`;
};
/**
* | output |
* | --- |
* | "Delivered to your door" |
*
* @param {Howitworks_Step3_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step3_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step3_title();
	return en_howitworks_step3_title();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step3_copy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step3_CopyInputs */
var en_howitworks_step3_copy = () => {
	return `Cold-chain packaging keeps your injera fresh from Addis Ababa to your door. Delivered every Saturday in London.`;
};
var am_howitworks_step3_copy = () => {
	return `ከቅዝቃዜ ሰንሰለት ማሸጊያ ጋር እንጀራዎ ከአዲስ አበባ እስከ በርዎ ድረስ ትኩስ ሆኖ ይቆያል። በለንደን በየሳምንቱ ቅዳሜ ትደርሳለች።`;
};
/**
* | output |
* | --- |
* | "Cold-chain packaging keeps your injera fresh from Addis Ababa to your door. Delivered every Saturday in London." |
*
* @param {Howitworks_Step3_CopyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step3_copy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step3_copy();
	return en_howitworks_step3_copy();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step3_meta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step3_MetaInputs */
var en_howitworks_step3_meta = () => {
	return `Addis Ababa → London · Saturdays`;
};
var am_howitworks_step3_meta = () => {
	return `አዲስ አበባ → ለንደን · ቅዳሜ`;
};
/**
* | output |
* | --- |
* | "Addis Ababa → London · Saturdays" |
*
* @param {Howitworks_Step3_MetaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step3_meta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step3_meta();
	return en_howitworks_step3_meta();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step4_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step4_TitleInputs */
var en_howitworks_step4_title = () => {
	return `Eat real injera`;
};
var am_howitworks_step4_title = () => {
	return `እውነተኛውን እንጀራ ይመገቡ`;
};
/**
* | output |
* | --- |
* | "Eat real injera" |
*
* @param {Howitworks_Step4_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step4_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step4_title();
	return en_howitworks_step4_title();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step4_copy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step4_CopyInputs */
var en_howitworks_step4_copy = () => {
	return `Warm gently in a dry pan or serve fresh. 100% teff. Naturally gluten-free. High in iron. The real thing.`;
};
var am_howitworks_step4_copy = () => {
	return `በደረቅ ምጣድ በቀስታ ያሞቁ ወይም ትኩስ ሆኖ ያቅርቡ። 100% ጤፍ። በተፈጥሮ ግሉተን የሌለው። ብረት የበዛበት። እውነተኛው ነገር።`;
};
/**
* | output |
* | --- |
* | "Warm gently in a dry pan or serve fresh. 100% teff. Naturally gluten-free. High in iron. The real thing." |
*
* @param {Howitworks_Step4_CopyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step4_copy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step4_copy();
	return en_howitworks_step4_copy();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_step4_meta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Step4_MetaInputs */
var en_howitworks_step4_meta = () => {
	return `Gluten-free · High in iron`;
};
var am_howitworks_step4_meta = () => {
	return `ግሉተን የሌለው · ብረት የበዛበት`;
};
/**
* | output |
* | --- |
* | "Gluten-free · High in iron" |
*
* @param {Howitworks_Step4_MetaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_step4_meta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_step4_meta();
	return en_howitworks_step4_meta();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_cta_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Cta_ButtonInputs */
var en_howitworks_cta_button = () => {
	return `Start your subscription — from £6.50`;
};
var am_howitworks_cta_button = () => {
	return `ደንበኝነትዎን ይጀምሩ — ከ£6.50 ጀምሮ`;
};
/**
* | output |
* | --- |
* | "Start your subscription — from £6.50" |
*
* @param {Howitworks_Cta_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_cta_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_cta_button();
	return en_howitworks_cta_button();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_cta_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Cta_NoteInputs */
var en_howitworks_cta_note = () => {
	return `Pause or cancel any time. Delivered every Saturday in London.`;
};
var am_howitworks_cta_note = () => {
	return `በማንኛውም ጊዜ ማቆም ወይም መሰረዝ ይችላሉ። በለንደን በየሳምንቱ ቅዳሜ ይደርሳል።`;
};
/**
* | output |
* | --- |
* | "Pause or cancel any time. Delivered every Saturday in London." |
*
* @param {Howitworks_Cta_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_cta_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_cta_note();
	return en_howitworks_cta_note();
});
//#endregion
//#region src/lib/paraglide/messages/howitworks_image_alt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Howitworks_Image_AltInputs */
var en_howitworks_image_alt = () => {
	return `Injera cooking on a traditional mitad`;
};
var am_howitworks_image_alt = () => {
	return `እንጀራ በባህላዊ ምጣድ ላይ ሲጋገር`;
};
/**
* | output |
* | --- |
* | "Injera cooking on a traditional mitad" |
*
* @param {Howitworks_Image_AltInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var howitworks_image_alt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_howitworks_image_alt();
	return en_howitworks_image_alt();
});
//#endregion
//#region src/lib/paraglide/messages/origin_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_EyebrowInputs */
var en_origin_eyebrow = () => {
	return `Origin`;
};
var am_origin_eyebrow = () => {
	return `መገኛ`;
};
/**
* | output |
* | --- |
* | "Origin" |
*
* @param {Origin_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_eyebrow();
	return en_origin_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/origin_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_HeadingInputs */
var en_origin_heading = () => {
	return `Ethiopian perfection at your table`;
};
var am_origin_heading = () => {
	return `ኢትዮጵያዊ ፍፁምነት በጠረጴዛዎ ላይ`;
};
/**
* | output |
* | --- |
* | "Ethiopian perfection at your table" |
*
* @param {Origin_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_heading();
	return en_origin_heading();
});
//#endregion
//#region src/lib/paraglide/messages/origin_image_alt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Image_AltInputs */
var en_origin_image_alt = () => {
	return `Teff growing in the Ethiopian highlands`;
};
var am_origin_image_alt = () => {
	return `በኢትዮጵያ ደጋማ አካባቢዎች የሚበቅል ጤፍ`;
};
/**
* | output |
* | --- |
* | "Teff growing in the Ethiopian highlands" |
*
* @param {Origin_Image_AltInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_image_alt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_image_alt();
	return en_origin_image_alt();
});
//#endregion
//#region src/lib/paraglide/messages/origin_paragraph1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Paragraph1Inputs */
var en_origin_paragraph1 = () => {
	return `GOTERA works directly with producers in Ethiopia who have been making injera for generations. The teff is grown in the Ethiopian highlands. The fermentation uses a live culture passed down through families.`;
};
var am_origin_paragraph1 = () => {
	return `ጎተራ ለትውልዶች እንጀራ ሲሰሩ ከቆዩ የኢትዮጵያ አምራቾች ጋር በቀጥታ ይሰራል። ጤፉ የሚበቅለው በኢትዮጵያ ደጋማ አካባቢዎች ነው። እርሾው ከትውልድ ወደ ትውልድ ሲተላለፍ የቆየ ሕያው ባህል ይጠቀማል።`;
};
/**
* | output |
* | --- |
* | "GOTERA works directly with producers in Ethiopia who have been making injera for generations. The teff is grown in the Ethiopian highlands. The fermentation ..." |
*
* @param {Origin_Paragraph1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_paragraph1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_paragraph1();
	return en_origin_paragraph1();
});
//#endregion
//#region src/lib/paraglide/messages/origin_paragraph2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Paragraph2Inputs */
var en_origin_paragraph2 = () => {
	return `We do not import Teff and manufacture it elsewhere. We source the real thing at its origin, exactly as it should be, and bring it to London by cold chain.`;
};
var am_origin_paragraph2 = () => {
	return `ጤፍን ወደ ውጭ አስመጥተን በሌላ ቦታ አናመርትም። እውነተኛውን ነገር በተገኘበት ምንጭ፣ ልክ መሆን እንዳለበት እናቀርባለን፣ ከዚያም በቅዝቃዜ ሰንሰለት ወደ ለንደን እናደርሳለን።`;
};
/**
* | output |
* | --- |
* | "We do not import Teff and manufacture it elsewhere. We source the real thing at its origin, exactly as it should be, and bring it to London by cold chain." |
*
* @param {Origin_Paragraph2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_paragraph2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_paragraph2();
	return en_origin_paragraph2();
});
//#endregion
//#region src/lib/paraglide/messages/origin_statement_line1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Statement_Line1Inputs */
var en_origin_statement_line1 = () => {
	return `No cheap fillers`;
};
var am_origin_statement_line1 = () => {
	return `ርካሽ ተጨማሪ ንጥረ ነገር የለም`;
};
/**
* | output |
* | --- |
* | "No cheap fillers" |
*
* @param {Origin_Statement_Line1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_statement_line1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_statement_line1();
	return en_origin_statement_line1();
});
//#endregion
//#region src/lib/paraglide/messages/origin_statement_line2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Statement_Line2Inputs */
var en_origin_statement_line2 = () => {
	return `100% Ethiopian Teff, uncompromisingly fermented`;
};
var am_origin_statement_line2 = () => {
	return `100% ኢትዮጵያዊ ጤፍ፣ ያለምንም ማቃለል የተፈላ`;
};
/**
* | output |
* | --- |
* | "100% Ethiopian Teff, uncompromisingly fermented" |
*
* @param {Origin_Statement_Line2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_statement_line2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_statement_line2();
	return en_origin_statement_line2();
});
//#endregion
//#region src/lib/paraglide/messages/origin_statement_line3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Statement_Line3Inputs */
var en_origin_statement_line3 = () => {
	return `Taste the difference real Teff makes`;
};
var am_origin_statement_line3 = () => {
	return `እውነተኛ ጤፍ የሚያመጣውን ልዩነት ይቅመሱ`;
};
/**
* | output |
* | --- |
* | "Taste the difference real Teff makes" |
*
* @param {Origin_Statement_Line3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_statement_line3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_statement_line3();
	return en_origin_statement_line3();
});
//#endregion
//#region src/lib/paraglide/messages/origin_cta_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Origin_Cta_LinkInputs */
var en_origin_cta_link = () => {
	return `Read about GOTERA`;
};
var am_origin_cta_link = () => {
	return `ስለ ጎተራ ያንብቡ`;
};
/**
* | output |
* | --- |
* | "Read about GOTERA" |
*
* @param {Origin_Cta_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var origin_cta_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_origin_cta_link();
	return en_origin_cta_link();
});
//#endregion
//#region src/lib/paraglide/messages/final_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_EyebrowInputs */
var en_final_eyebrow = () => {
	return `Subscribe`;
};
var am_final_eyebrow = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Final_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_eyebrow();
	return en_final_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/final_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_HeadingInputs */
var en_final_heading = () => {
	return `Your injera. Every week.`;
};
var am_final_heading = () => {
	return `የእርስዎ እንጀራ። በየሳምንቱ።`;
};
/**
* | output |
* | --- |
* | "Your injera. Every week." |
*
* @param {Final_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_heading();
	return en_final_heading();
});
//#endregion
//#region src/lib/paraglide/messages/final_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_SubInputs */
var en_final_sub = () => {
	return `Stop searching. Start enjoying real Ethiopian injera delivered to your door every Saturday.`;
};
var am_final_sub = () => {
	return `መፈለግን ያቁሙ። እውነተኛ የኢትዮጵያ እንጀራ በየሳምንቱ ቅዳሜ እስከ በርዎ ድረስ ይድረስዎት።`;
};
/**
* | output |
* | --- |
* | "Stop searching. Start enjoying real Ethiopian injera delivered to your door every Saturday." |
*
* @param {Final_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_sub();
	return en_final_sub();
});
//#endregion
//#region src/lib/paraglide/messages/final_cta_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_Cta_ButtonInputs */
var en_final_cta_button = () => {
	return `Subscribe from £6.50 — secure your delivery`;
};
var am_final_cta_button = () => {
	return `ከ£6.50 ይመዝገቡ — ማድረሻዎን ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Subscribe from £6.50 — secure your delivery" |
*
* @param {Final_Cta_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_cta_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_cta_button();
	return en_final_cta_button();
});
//#endregion
//#region src/lib/paraglide/messages/final_faq_prompt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_Faq_PromptInputs */
var en_final_faq_prompt = () => {
	return `Have a question?`;
};
var am_final_faq_prompt = () => {
	return `ጥያቄ አለዎት?`;
};
/**
* | output |
* | --- |
* | "Have a question?" |
*
* @param {Final_Faq_PromptInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_faq_prompt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_faq_prompt();
	return en_final_faq_prompt();
});
//#endregion
//#region src/lib/paraglide/messages/final_faq_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Final_Faq_LinkInputs */
var en_final_faq_link = () => {
	return `Read the FAQ`;
};
var am_final_faq_link = () => {
	return `ተደጋጋሚ ጥያቄዎችን ያንብቡ`;
};
/**
* | output |
* | --- |
* | "Read the FAQ" |
*
* @param {Final_Faq_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var final_faq_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_final_faq_link();
	return en_final_faq_link();
});
//#endregion
//#region src/lib/paraglide/messages/truth_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_EyebrowInputs */
var en_truth_eyebrow = () => {
	return `The Truth`;
};
var am_truth_eyebrow = () => {
	return `እውነታው`;
};
/**
* | output |
* | --- |
* | "The Truth" |
*
* @param {Truth_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_eyebrow();
	return en_truth_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/truth_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_HeadingInputs */
var en_truth_heading = () => {
	return `Let's be honest about the injera you're buying right now.`;
};
var am_truth_heading = () => {
	return `አሁን እየገዙ ስላለው እንጀራ እውነቱን እንነጋገር።`;
};
/**
* | output |
* | --- |
* | "Let's be honest about the injera you're buying right now." |
*
* @param {Truth_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_heading();
	return en_truth_heading();
});
//#endregion
//#region src/lib/paraglide/messages/truth_point1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Point1Inputs */
var en_truth_point1 = () => {
	return `It's hard to find.`;
};
var am_truth_point1 = () => {
	return `ማግኘት ይከብዳል።`;
};
/**
* | output |
* | --- |
* | "It's hard to find." |
*
* @param {Truth_Point1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_point1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_point1();
	return en_truth_point1();
});
//#endregion
//#region src/lib/paraglide/messages/truth_point2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Point2Inputs */
var en_truth_point2 = () => {
	return `Finding it means driving across town.`;
};
var am_truth_point2 = () => {
	return `ለማግኘት ከተማውን ማቋረጥ ይጠይቃል።`;
};
/**
* | output |
* | --- |
* | "Finding it means driving across town." |
*
* @param {Truth_Point2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_point2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_point2();
	return en_truth_point2();
});
//#endregion
//#region src/lib/paraglide/messages/truth_point3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Point3Inputs */
var en_truth_point3 = () => {
	return `What's on the shelf is often wheat, not teff.`;
};
var am_truth_point3 = () => {
	return `በመደርደሪያ ላይ ያለው ብዙ ጊዜ ስንዴ እንጂ ጤፍ አይደለም።`;
};
/**
* | output |
* | --- |
* | "What's on the shelf is often wheat, not teff." |
*
* @param {Truth_Point3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_point3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_point3();
	return en_truth_point3();
});
//#endregion
//#region src/lib/paraglide/messages/truth_point4.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Point4Inputs */
var en_truth_point4 = () => {
	return `It doesn't taste right. It doesn't feel right.`;
};
var am_truth_point4 = () => {
	return `ጣዕሙ ትክክል አይደለም። ስሜቱም ትክክል አይደለም።`;
};
/**
* | output |
* | --- |
* | "It doesn't taste right. It doesn't feel right." |
*
* @param {Truth_Point4Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_point4 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_point4();
	return en_truth_point4();
});
//#endregion
//#region src/lib/paraglide/messages/truth_point5.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Point5Inputs */
var en_truth_point5 = () => {
	return `By the time you find it, it's already gone stale and spoiled.`;
};
var am_truth_point5 = () => {
	return `እስኪያገኙት ድረስ ብዙውን ጊዜ ወደ ላይ ተቀምጦ ጣዕሙን አጥቷል።`;
};
/**
* | output |
* | --- |
* | "By the time you find it, it's already gone stale and spoiled." |
*
* @param {Truth_Point5Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_point5 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_point5();
	return en_truth_point5();
});
//#endregion
//#region src/lib/paraglide/messages/truth_resolve_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Resolve_LeadInputs */
var en_truth_resolve_lead = () => {
	return `Real injera shouldn't be this hard to find.`;
};
var am_truth_resolve_lead = () => {
	return `እውነተኛ እንጀራ ማግኘት ይህን ያህል ከባድ መሆን የለበትም።`;
};
/**
* | output |
* | --- |
* | "Real injera shouldn't be this hard to find." |
*
* @param {Truth_Resolve_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_resolve_lead = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_resolve_lead();
	return en_truth_resolve_lead();
});
//#endregion
//#region src/lib/paraglide/messages/truth_resolve_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Resolve_SubInputs */
var en_truth_resolve_sub = () => {
	return `So we brought it here, made properly.`;
};
var am_truth_resolve_sub = () => {
	return `ስለዚህ በትክክል ተዘጋጅቶ ወደዚህ አመጣነው።`;
};
/**
* | output |
* | --- |
* | "So we brought it here, made properly." |
*
* @param {Truth_Resolve_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_resolve_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_resolve_sub();
	return en_truth_resolve_sub();
});
//#endregion
//#region src/lib/paraglide/messages/truth_badge1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Badge1Inputs */
var en_truth_badge1 = () => {
	return `Made in Ethiopia`;
};
var am_truth_badge1 = () => {
	return `በኢትዮጵያ የተሰራ`;
};
/**
* | output |
* | --- |
* | "Made in Ethiopia" |
*
* @param {Truth_Badge1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_badge1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_badge1();
	return en_truth_badge1();
});
//#endregion
//#region src/lib/paraglide/messages/truth_badge2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Badge2Inputs */
var en_truth_badge2 = () => {
	return `Packed at source`;
};
var am_truth_badge2 = () => {
	return `በምንጩ የታሸገ`;
};
/**
* | output |
* | --- |
* | "Packed at source" |
*
* @param {Truth_Badge2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_badge2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_badge2();
	return en_truth_badge2();
});
//#endregion
//#region src/lib/paraglide/messages/truth_badge3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Truth_Badge3Inputs */
var en_truth_badge3 = () => {
	return `Delivered to London`;
};
var am_truth_badge3 = () => {
	return `ወደ ለንደን የሚደርስ`;
};
/**
* | output |
* | --- |
* | "Delivered to London" |
*
* @param {Truth_Badge3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var truth_badge3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_truth_badge3();
	return en_truth_badge3();
});
//#endregion
//#region src/lib/HowItWorks.svelte
function HowItWorks($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const steps = derived(() => [
			{
				num: "01",
				title: howitworks_step1_title(),
				copy: howitworks_step1_copy(),
				meta: howitworks_step1_meta()
			},
			{
				num: "02",
				title: howitworks_step2_title(),
				copy: howitworks_step2_copy(),
				meta: howitworks_step2_meta()
			},
			{
				num: "03",
				title: howitworks_step3_title(),
				copy: howitworks_step3_copy(),
				meta: howitworks_step3_meta()
			},
			{
				num: "04",
				title: howitworks_step4_title(),
				copy: howitworks_step4_copy(),
				meta: howitworks_step4_meta()
			}
		]);
		$$renderer.push(`<section class="how svelte-167hazw"><div class="how-inner svelte-167hazw"><header class="how-head svelte-167hazw"><div class="how-head-text svelte-167hazw"><span class="eyebrow svelte-167hazw">${escape_html(howitworks_eyebrow())}</span> <h2 class="svelte-167hazw">${escape_html(howitworks_heading())}</h2></div> <div class="how-head-img svelte-167hazw"><img src="/injera/injera7.webp"${attr("alt", howitworks_image_alt())} loading="lazy" class="svelte-167hazw"/></div></header> <ol class="steps svelte-167hazw"><!--[-->`);
		const each_array = ensure_array_like(steps());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let step = each_array[i];
			$$renderer.push(`<li class="step svelte-167hazw"><span class="step-num svelte-167hazw">${escape_html(step.num)}</span> <h3 class="step-title svelte-167hazw">${escape_html(step.title)}</h3> <p class="step-copy svelte-167hazw">${escape_html(step.copy)}</p> <p class="step-meta svelte-167hazw">${escape_html(step.meta)}</p></li>`);
		}
		$$renderer.push(`<!--]--></ol> <div class="cta-row svelte-167hazw"><a class="btn btn-full svelte-167hazw" href="/subscribe">${escape_html(howitworks_cta_button())} `);
		Arrow_right($$renderer, { class: "btn-icon" });
		$$renderer.push(`<!----></a> <p class="alt svelte-167hazw">${escape_html(howitworks_cta_note())}</p></div></div></section>`);
	});
}
//#endregion
//#region src/lib/origin.svelte
function Origin($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Ethiopian highlands / teff field, or injera on the mitad. Wide, warm natural light. */
		let { src = "/teff.webp", alt = origin_image_alt() } = $$props;
		$$renderer.push(`<section class="origin svelte-14r6acx"><div class="origin-inner svelte-14r6acx"><header class="origin-head svelte-14r6acx"><span class="eyebrow svelte-14r6acx">${escape_html(origin_eyebrow())}</span> <h2 class="svelte-14r6acx">${escape_html(origin_heading())}</h2></header> <figure class="origin-figure svelte-14r6acx"><img${attr("src", src)}${attr("alt", alt)} loading="lazy" decoding="async" width="1600" height="1000" class="svelte-14r6acx"/></figure> <div class="origin-body svelte-14r6acx"><p class="svelte-14r6acx">${escape_html(origin_paragraph1())}</p> <p class="svelte-14r6acx">${escape_html(origin_paragraph2())}</p> <p class="statement svelte-14r6acx">${escape_html(origin_statement_line1())} <br/> ${escape_html(origin_statement_line2())} <br/> <em class="svelte-14r6acx">${escape_html(origin_statement_line3())}</em></p> <a class="link-cta svelte-14r6acx" href="/about">${escape_html(origin_cta_link())} `);
		Arrow_right($$renderer, { class: "link-icon" });
		$$renderer.push(`<!----></a></div></div></section>`);
	});
}
//#endregion
//#region src/lib/final.svelte
function Final($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="final svelte-96ie7r"><div class="final-inner svelte-96ie7r"><span class="eyebrow svelte-96ie7r">${escape_html(final_eyebrow())}</span> <h2 class="svelte-96ie7r">${escape_html(final_heading())}</h2> <p class="sub svelte-96ie7r">${escape_html(final_sub())}</p> <div class="actions svelte-96ie7r"><a class="btn btn-full svelte-96ie7r" href="/subscribe">${escape_html(final_cta_button())} `);
		Arrow_right($$renderer, { class: "btn-icon" });
		$$renderer.push(`<!----></a> <p class="alt svelte-96ie7r">${escape_html(final_faq_prompt())} <a href="/faq" class="svelte-96ie7r">${escape_html(final_faq_link())}</a></p></div></div></section>`);
	});
}
//#endregion
//#region src/lib/Truth.svelte
function Truth($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="truth svelte-u01qok"><div class="container"><div class="truth-grid svelte-u01qok"><div class="truth-copy svelte-u01qok"><span class="eyebrow">${escape_html(truth_eyebrow())}</span> <h2 class="svelte-u01qok">${escape_html(truth_heading())}</h2> <ul class="truth-list svelte-u01qok"><li class="svelte-u01qok">${escape_html(truth_point1())}</li> <li class="svelte-u01qok">${escape_html(truth_point2())}</li> <li class="svelte-u01qok">${escape_html(truth_point3())}</li> <li class="svelte-u01qok">${escape_html(truth_point4())}</li> <li class="svelte-u01qok">${escape_html(truth_point5())}</li></ul></div> <div class="truth-resolve svelte-u01qok"><p class="truth-resolve-lead svelte-u01qok">${escape_html(truth_resolve_lead())}</p> <p class="truth-resolve-sub svelte-u01qok">${escape_html(truth_resolve_sub())}</p> <div class="truth-badges svelte-u01qok"><span>${escape_html(truth_badge1())}</span><span class="meta-dot"></span> <span>${escape_html(truth_badge2())}</span><span class="meta-dot"></span> <span>${escape_html(truth_badge3())}</span></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const injera = (n) => `/injera/injera${n}.webp`;
		const originPanelBg = injera(19);
		const deliveryPanelBg = injera(21);
		const featuredPlanBg = injera(6);
		const giftCardBg = injera(24);
		let heroVideoReady = false;
		let heroCardVideoReady = false;
		const CARD_COPY = derived(() => ({
			"one-off": {
				desc: home_plan_oneoff_desc(),
				bullets: [home_plan_oneoff_bullet1(), home_plan_oneoff_bullet2()],
				cta: home_plan_oneoff_cta()
			},
			starter: {
				desc: home_plan_starter_desc(),
				bullets: [home_plan_starter_bullet1(), home_plan_starter_bullet2()],
				cta: home_plan_starter_cta()
			},
			regular: {
				desc: home_plan_regular_desc(),
				bullets: [home_plan_regular_bullet1(), home_plan_regular_bullet2()],
				cta: home_plan_regular_cta()
			},
			"single-gift": {
				desc: home_plan_gift_desc(),
				bullets: [home_plan_gift_bullet1(), home_plan_gift_bullet2()],
				cta: home_plan_gift_cta()
			}
		}));
		const cards = derived(() => (data?.subscriptionPlans ?? []).map((p) => {
			const copy = CARD_COPY()[p.slug] ?? { cta: home_plan_default_cta() };
			return {
				slug: p.slug,
				title: copy.title ?? p.name,
				desc: copy.desc ?? p.subtitle,
				freq: copy.freq ?? p.freq,
				bullets: copy.bullets ?? p.bullets ?? [],
				cta: copy.cta,
				price: p.price,
				featured: p.featured
			};
		}));
		const subFrom = derived(() => data?.subscriptionFromPrice ?? data?.fromPrice ?? null);
		const giftFrom = derived(() => data?.giftFromPrice ?? null);
		const fmtPrice = (p) => Number.isInteger(p) ? `£${p}` : `£${p.toFixed(2)}`;
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(home_meta_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<section class="hero hidden! lg:block! svelte-1uha8ag"${attr("aria-label", home_hero_aria_label())}><div class="container hero-grid svelte-1uha8ag"><div><span class="eyebrow svelte-1uha8ag">${escape_html(home_hero_eyebrow())}</span> <h1 class="hero-title svelte-1uha8ag">${escape_html(home_hero_title())}</h1> <div class="hero-meta svelte-1uha8ag"><span>${escape_html(home_hero_meta_teff())}</span><span class="meta-dot svelte-1uha8ag"></span> <span>${escape_html(home_hero_meta_vegan())}</span><span class="meta-dot svelte-1uha8ag"></span> <span>${escape_html(home_hero_meta_gluten_free())}</span><span class="meta-dot svelte-1uha8ag"></span> <span>${escape_html(home_hero_meta_iron())}</span></div> <p class="hero-copy svelte-1uha8ag">${escape_html(home_hero_copy())}</p> <div class="hero-actions svelte-1uha8ag"><a href="/subscribe/?slug" class="btn svelte-1uha8ag">${escape_html(home_hero_cta_plan())}${escape_html(subFrom() ? home_price_from_suffix({ price: fmtPrice(subFrom()) }) : "")}</a> <a href="/about" class="btn-outline svelte-1uha8ag">${escape_html(home_hero_cta_about())}</a></div></div> <div class="hero-card svelte-1uha8ag"><div class="hero-card-img svelte-1uha8ag"><img src="/injera/injera13.webp"${attr("alt", home_hero_img_alt())} style="width:100%;height:100%;object-fit:cover;object-position:center"/> <video${attr_class("hero-card-video svelte-1uha8ag", void 0, { "hero-card-video--ready": heroCardVideoReady })} poster="/injera/injera13.webp" autoplay="" muted="" loop="" playsinline="" preload="metadata"><source src="/output.webm" type="video/mp4"/></video></div> <div class="hero-card-body svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(home_hero_card_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_hero_card_desc())}</p></div></div></div></section> <section class="hero-mobile flex! lg:hidden! svelte-1uha8ag"${attr("aria-label", home_hero_aria_label())}><div class="hero__img svelte-1uha8ag"><div class="img-ph" style="width:100%;height:100%"><img src="/hero.jpeg"${attr("alt", home_hero_img_alt())} style="width:100%;height:100%;object-fit:cover;object-position:center" class="svelte-1uha8ag"/></div> <video${attr_class("hero__video svelte-1uha8ag", void 0, { "hero__video--ready": heroVideoReady })} poster="/injera/injera13.webp" autoplay="" muted="" loop="" playsinline="" preload="metadata"><source src="/output.webm" type="video/mp4"/></video></div> <div class="hero__gradient svelte-1uha8ag"></div> <div class="hero__content svelte-1uha8ag"><div class="hero__tag svelte-1uha8ag"><div class="hero__tag-line svelte-1uha8ag"></div> <span class="svelte-1uha8ag">${escape_html(home_hero_eyebrow())}</span></div> <h1 class="hero__h1 svelte-1uha8ag">${escape_html(home_hero_mobile_line1())}<br/> ${escape_html(home_hero_mobile_line2())} <br/>${escape_html(home_hero_mobile_line3())}</h1> `);
		if (subFrom()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="hero__price-row svelte-1uha8ag"><span class="hero__price-from svelte-1uha8ag">${escape_html(home_hero_price_from())}</span> <span class="hero__price-num svelte-1uha8ag">${escape_html(fmtPrice(subFrom()))}</span> <span class="hero__price-note svelte-1uha8ag">${escape_html(home_hero_price_note())}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <a href="/subscribe" class="btn btn--primary svelte-1uha8ag" style="margin-bottom:12px">${escape_html(home_hero_cta_order_now())}</a> <div class="hero__claims svelte-1uha8ag"><span class="hero__claim svelte-1uha8ag">${escape_html(home_hero_claim_gluten_free())}</span> <span class="hero__claim svelte-1uha8ag">${escape_html(home_hero_claim_vegan())}</span> <span class="hero__claim svelte-1uha8ag">${escape_html(home_hero_claim_teff())}</span></div></div></section> <div class="proof-strip svelte-1uha8ag"><div class="container proof-inner svelte-1uha8ag"><div class="proof-stat svelte-1uha8ag"><span class="proof-stat-num svelte-1uha8ag">12</span> <span class="proof-stat-label svelte-1uha8ag">${escape_html(home_proof_label_subscribers())}</span></div> <div class="proof-divider svelte-1uha8ag"></div> <div class="proof-stat svelte-1uha8ag"><span class="proof-stat-num svelte-1uha8ag">47</span> <span class="proof-stat-label svelte-1uha8ag">${escape_html(home_proof_label_deliveries())}</span></div> <div class="proof-divider svelte-1uha8ag"></div> <div class="proof-stat svelte-1uha8ag"><span class="proof-stat-num text-[24px]! svelte-1uha8ag">${escape_html(home_proof_city_london())}</span> <span class="proof-stat-label svelte-1uha8ag">${escape_html(home_proof_label_delivering_in())}</span></div> <div class="proof-divider svelte-1uha8ag"></div></div></div> <section class="pillars svelte-1uha8ag"><div class="container svelte-1uha8ag"><div class="pillars-head svelte-1uha8ag"><span class="eyebrow svelte-1uha8ag">${escape_html(home_pillars_eyebrow())}</span> <h2 class="svelte-1uha8ag">${escape_html(home_pillars_title())}</h2> <p class="svelte-1uha8ag">${escape_html(home_pillars_subtitle())}</p></div> <div class="pillars-grid svelte-1uha8ag"><div class="pillar svelte-1uha8ag"><div class="pillar-num svelte-1uha8ag">01</div> <h3 class="svelte-1uha8ag">${escape_html(home_pillar1_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_pillar1_desc())}</p></div> <div class="pillar svelte-1uha8ag"><div class="pillar-num svelte-1uha8ag">02</div> <h3 class="svelte-1uha8ag">${escape_html(home_pillar2_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_pillar2_desc())}</p></div> <div class="pillar svelte-1uha8ag"><div class="pillar-num svelte-1uha8ag">03</div> <h3 class="svelte-1uha8ag">${escape_html(home_pillar3_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_pillar3_desc())}</p></div> <div class="pillar svelte-1uha8ag"><div class="pillar-num svelte-1uha8ag">04</div> <h3 class="svelte-1uha8ag">${escape_html(home_pillar4_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_pillar4_desc())}</p></div></div></div></section> <div class="container svelte-1uha8ag">`);
		Truth($$renderer);
		$$renderer.push(`<!----></div> <section class="plans svelte-1uha8ag"><div class="container svelte-1uha8ag"><div class="plans-head svelte-1uha8ag"><span class="eyebrow svelte-1uha8ag">${escape_html(home_plans_eyebrow())}</span> <h2 class="svelte-1uha8ag">${escape_html(home_plans_title())}</h2> <p class="svelte-1uha8ag">${escape_html(home_plans_subtitle())}</p></div> `);
		if (cards().length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="plans-grid svelte-1uha8ag"><!--[-->`);
			const each_array = ensure_array_like(cards());
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let card = each_array[i];
				const bullets = Array.isArray(card.bullets) ? card.bullets : card.bullets ? [card.bullets] : [];
				$$renderer.push(`<div${attr_class("plan svelte-1uha8ag", void 0, { "plan-featured": card.featured })}${attr_style(card.featured ? `background-image: linear-gradient(180deg, rgba(26,26,26,.88), rgba(26,26,26,.94)), url('${featuredPlanBg}')` : "")}><h3 class="svelte-1uha8ag">${escape_html(card.title)}</h3> <p class="plan-desc svelte-1uha8ag">${escape_html(card.desc)}</p> <div class="price svelte-1uha8ag">${escape_html(fmtPrice(card.price))}</div> <div class="freq svelte-1uha8ag">${escape_html(card.freq)}</div> <ul class="svelte-1uha8ag"><!--[-->`);
				const each_array_1 = ensure_array_like(bullets);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let b = each_array_1[$$index];
					$$renderer.push(`<li class="svelte-1uha8ag">${escape_html(b)}</li>`);
				}
				$$renderer.push(`<!--]--></ul> <a${attr("href", `/subscribe?plan=${stringify$1(card.slug)}`)}${attr_class(clsx$1(card.featured ? "btn plan-featured-btn" : "btn-outline"), "svelte-1uha8ag")}>${escape_html(card.cta)}</a></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="plans-empty svelte-1uha8ag">${escape_html(home_plans_empty())}</p>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="origin svelte-1uha8ag"><div class="container svelte-1uha8ag"><div class="origin-grid svelte-1uha8ag"><div class="origin-panel origin-panel--photo svelte-1uha8ag"${attr_style(`background-image: linear-gradient(180deg, rgba(26,26,26,.55), rgba(26,26,26,.8)), url('${stringify$1(originPanelBg)}')`)}><span class="eyebrow svelte-1uha8ag">${escape_html(home_origin_eyebrow())}</span> <h3 class="svelte-1uha8ag">${escape_html(home_origin_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_origin_desc1())}</p></div> <div class="origin-panel origin-panel--photo svelte-1uha8ag"${attr_style(`background-image: linear-gradient(180deg, rgba(26,26,26,.55), rgba(26,26,26,.8)), url('${stringify$1(deliveryPanelBg)}')`)}><span class="eyebrow svelte-1uha8ag">${escape_html(home_origin_delivery_eyebrow())}</span> <h3 class="svelte-1uha8ag">${escape_html(home_origin_delivery_title())}</h3> <p class="svelte-1uha8ag">${escape_html(home_origin_delivery_desc())}</p></div></div></div></section> <div class="flex flex-col items-center justify-center">`);
		HowItWorks($$renderer);
		$$renderer.push(`<!----></div> `);
		Testimonial($$renderer);
		$$renderer.push(`<!----> `);
		if (data?.giftPlans?.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="gift svelte-1uha8ag"><div class="container gift-grid svelte-1uha8ag"><div class="gift-text svelte-1uha8ag"><span class="eyebrow svelte-1uha8ag">${escape_html(home_gift_eyebrow())}</span> <h2 class="svelte-1uha8ag">${escape_html(home_gift_title())}</h2> <p class="svelte-1uha8ag">${escape_html(home_gift_subtitle())}</p> <a href="/subscribe" class="btn svelte-1uha8ag">${escape_html(home_gift_cta())}${escape_html(giftFrom() ? home_price_from_suffix({ price: fmtPrice(giftFrom()) }) : "")}</a></div> <div class="gift-card svelte-1uha8ag"><div class="gift-card-img svelte-1uha8ag"${attr_style(`background-image: url('${stringify$1(giftCardBg)}')`)}></div> <div class="gift-card-body svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(data?.giftPlans[0]?.name)}</h3> <p class="svelte-1uha8ag">${escape_html(data?.giftPlans[0]?.subtitle)}</p></div></div></div></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Origin($$renderer, {});
		$$renderer.push(`<!----> `);
		Final($$renderer);
		$$renderer.push(`<!---->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BP7NHEy4.js.map
