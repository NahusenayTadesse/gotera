import { a0 as head, a6 as escape_html, ae as store_get, a4 as ensure_array_like, $ as attr, aa as attr_class, af as unsubscribe_stores, T as derived } from '../../../chunks/server.js-qDPizQqb.js';
import { h as getLocale } from '../../../chunks/runtime.js-CbeSlHLA.js';
import { C as Check } from '../../../chunks/check.js-BvFzUyRW.js';
import { C as Circle_alert } from '../../../chunks/circle-alert.js-C4ujrG9B.js';
import { C as Circle_check } from '../../../chunks/circle-check.js-DmqAYTdV.js';
import { L as Loader_circle } from '../../../chunks/loader-circle.js-BHGq7rKE.js';
import { S as Store, p as partners_type_partner, a as partners_type_partner_desc, W as Wheat, b as partners_type_supplier, c as partners_type_supplier_desc } from '../../../chunks/partners_type_supplier_desc.js-Bc2Ru0ec.js';
import { S as SUPPLIER_CATEGORIES, P as PARTNER_CATEGORIES, a as partners_success_body } from '../../../chunks/schema2.js-DT2BHoDu.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-C3Iq_YCw.js';
import { b as superForm } from '../../../chunks/client2.js-P7rUUC6q.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../chunks/access.js-j1_SnSd1.js';
import '../../../chunks/routing.js-CJYUshuD.js';
import '../../../chunks/index-server.js-CaywUnPA.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-lGck33Tu.js';
import '../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/forms.js-qYr4b_YH.js';
import '../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../chunks/stores.js-B52XgJS0.js';

//#region src/lib/paraglide/messages/partners_meta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Meta_TitleInputs */
var en_partners_meta_title = () => {
	return `Partners & suppliers · GOTERA`;
};
var am_partners_meta_title = () => {
	return `አጋሮች እና አቅራቢዎች · GOTERA`;
};
/**
* | output |
* | --- |
* | "Partners & suppliers · GOTERA" |
*
* @param {Partners_Meta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_meta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_meta_title();
	return en_partners_meta_title();
});
//#endregion
//#region src/lib/paraglide/messages/partners_meta_description.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Meta_DescriptionInputs */
var en_partners_meta_description = () => {
	return `Become a GOTERA partner or supplier. Tell us about your business and we'll be in touch.`;
};
var am_partners_meta_description = () => {
	return `የጎተራ አጋር ወይም አቅራቢ ይሁኑ። ስለ ንግድዎ ይንገሩን፣ እኛም እናገኝዎታለን።`;
};
/**
* | output |
* | --- |
* | "Become a GOTERA partner or supplier. Tell us about your business and we'll be in touch." |
*
* @param {Partners_Meta_DescriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_meta_description = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_meta_description();
	return en_partners_meta_description();
});
//#endregion
//#region src/lib/paraglide/messages/partners_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_EyebrowInputs */
var en_partners_eyebrow = () => {
	return `Partner portal`;
};
var am_partners_eyebrow = () => {
	return `የአጋሮች መግቢያ`;
};
/**
* | output |
* | --- |
* | "Partner portal" |
*
* @param {Partners_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_eyebrow();
	return en_partners_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/partners_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_HeadingInputs */
var en_partners_heading = () => {
	return `Work with GOTERA`;
};
var am_partners_heading = () => {
	return `ከጎተራ ጋር ይስሩ`;
};
/**
* | output |
* | --- |
* | "Work with GOTERA" |
*
* @param {Partners_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_heading();
	return en_partners_heading();
});
//#endregion
//#region src/lib/paraglide/messages/partners_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_SubInputs */
var en_partners_sub = () => {
	return `Whether you want to serve our injera or supply what goes into it, tell us a little about your business and our team will get back to you.`;
};
var am_partners_sub = () => {
	return `እንጀራችንን ማቅረብ ቢፈልጉም ወይም ለእሱ የሚያስፈልጉ ግብዓቶችን ማቅረብ ቢፈልጉ፣ ስለ ንግድዎ ጥቂት ይንገሩን፤ ቡድናችን ያገኝዎታል።`;
};
/**
* | output |
* | --- |
* | "Whether you want to serve our injera or supply what goes into it, tell us a little about your business and our team will get back to you." |
*
* @param {Partners_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_sub();
	return en_partners_sub();
});
//#endregion
//#region src/lib/paraglide/messages/partners_partner_benefits_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Partner_Benefits_HeadingInputs */
var en_partners_partner_benefits_heading = () => {
	return `As a partner`;
};
var am_partners_partner_benefits_heading = () => {
	return `እንደ አጋር`;
};
/**
* | output |
* | --- |
* | "As a partner" |
*
* @param {Partners_Partner_Benefits_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_partner_benefits_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_partner_benefits_heading();
	return en_partners_partner_benefits_heading();
});
//#endregion
//#region src/lib/paraglide/messages/partners_partner_benefit1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Partner_Benefit1Inputs */
var en_partners_partner_benefit1 = () => {
	return `Wholesale pricing on fresh, authentic injera`;
};
var am_partners_partner_benefit1 = () => {
	return `ለአዲስ እና ትክክለኛ እንጀራ የጅምላ ዋጋ`;
};
/**
* | output |
* | --- |
* | "Wholesale pricing on fresh, authentic injera" |
*
* @param {Partners_Partner_Benefit1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_partner_benefit1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_partner_benefit1();
	return en_partners_partner_benefit1();
});
//#endregion
//#region src/lib/paraglide/messages/partners_partner_benefit2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Partner_Benefit2Inputs */
var en_partners_partner_benefit2 = () => {
	return `Reliable scheduled deliveries across our delivery area`;
};
var am_partners_partner_benefit2 = () => {
	return `በማድረሻ ክልላችን ውስጥ አስተማማኝ የታቀደ ማድረስ`;
};
/**
* | output |
* | --- |
* | "Reliable scheduled deliveries across our delivery area" |
*
* @param {Partners_Partner_Benefit2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_partner_benefit2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_partner_benefit2();
	return en_partners_partner_benefit2();
});
//#endregion
//#region src/lib/paraglide/messages/partners_partner_benefit3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Partner_Benefit3Inputs */
var en_partners_partner_benefit3 = () => {
	return `A dedicated contact for orders and changes`;
};
var am_partners_partner_benefit3 = () => {
	return `ለትዕዛዞች እና ለለውጦች የተመደበ ግንኙነት`;
};
/**
* | output |
* | --- |
* | "A dedicated contact for orders and changes" |
*
* @param {Partners_Partner_Benefit3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_partner_benefit3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_partner_benefit3();
	return en_partners_partner_benefit3();
});
//#endregion
//#region src/lib/paraglide/messages/partners_supplier_benefits_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Supplier_Benefits_HeadingInputs */
var en_partners_supplier_benefits_heading = () => {
	return `As a supplier`;
};
var am_partners_supplier_benefits_heading = () => {
	return `እንደ አቅራቢ`;
};
/**
* | output |
* | --- |
* | "As a supplier" |
*
* @param {Partners_Supplier_Benefits_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_supplier_benefits_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_supplier_benefits_heading();
	return en_partners_supplier_benefits_heading();
});
//#endregion
//#region src/lib/paraglide/messages/partners_supplier_benefit1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Supplier_Benefit1Inputs */
var en_partners_supplier_benefit1 = () => {
	return `Steady, recurring orders as our subscriber base grows`;
};
var am_partners_supplier_benefit1 = () => {
	return `ደንበኞቻችን ሲያድጉ ቋሚ እና ተደጋጋሚ ትዕዛዞች`;
};
/**
* | output |
* | --- |
* | "Steady, recurring orders as our subscriber base grows" |
*
* @param {Partners_Supplier_Benefit1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_supplier_benefit1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_supplier_benefit1();
	return en_partners_supplier_benefit1();
});
//#endregion
//#region src/lib/paraglide/messages/partners_supplier_benefit2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Supplier_Benefit2Inputs */
var en_partners_supplier_benefit2 = () => {
	return `Fair, transparent terms and on-time payment`;
};
var am_partners_supplier_benefit2 = () => {
	return `ፍትሃዊ፣ ግልጽ ውሎች እና በወቅቱ ክፍያ`;
};
/**
* | output |
* | --- |
* | "Fair, transparent terms and on-time payment" |
*
* @param {Partners_Supplier_Benefit2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_supplier_benefit2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_supplier_benefit2();
	return en_partners_supplier_benefit2();
});
//#endregion
//#region src/lib/paraglide/messages/partners_supplier_benefit3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Supplier_Benefit3Inputs */
var en_partners_supplier_benefit3 = () => {
	return `A long-term relationship built on quality`;
};
var am_partners_supplier_benefit3 = () => {
	return `በጥራት ላይ የተመሰረተ የረጅም ጊዜ ግንኙነት`;
};
/**
* | output |
* | --- |
* | "A long-term relationship built on quality" |
*
* @param {Partners_Supplier_Benefit3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_supplier_benefit3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_supplier_benefit3();
	return en_partners_supplier_benefit3();
});
//#endregion
//#region src/lib/paraglide/messages/partners_contact_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Contact_NoteInputs */
var en_partners_contact_note = () => {
	return `We read every application and usually reply within 3–5 working days.`;
};
var am_partners_contact_note = () => {
	return `እያንዳንዱን ማመልከቻ እናነባለን፤ ብዙውን ጊዜ በ3–5 የሥራ ቀናት ውስጥ እንመልሳለን።`;
};
/**
* | output |
* | --- |
* | "We read every application and usually reply within 3–5 working days." |
*
* @param {Partners_Contact_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_contact_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_contact_note();
	return en_partners_contact_note();
});
//#endregion
//#region src/lib/paraglide/messages/partners_type_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Type_LabelInputs */
var en_partners_type_label = () => {
	return `I'd like to join as a`;
};
var am_partners_type_label = () => {
	return `መቀላቀል የምፈልገው እንደ`;
};
/**
* | output |
* | --- |
* | "I'd like to join as a" |
*
* @param {Partners_Type_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_type_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_type_label();
	return en_partners_type_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_business_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Business_LabelInputs */
var en_partners_business_label = () => {
	return `Business name`;
};
var am_partners_business_label = () => {
	return `የንግድ ስም`;
};
/**
* | output |
* | --- |
* | "Business name" |
*
* @param {Partners_Business_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_business_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_business_label();
	return en_partners_business_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_category_label_partner.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Category_Label_PartnerInputs */
var en_partners_category_label_partner = () => {
	return `Business type`;
};
var am_partners_category_label_partner = () => {
	return `የንግድ ዓይነት`;
};
/**
* | output |
* | --- |
* | "Business type" |
*
* @param {Partners_Category_Label_PartnerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_category_label_partner = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_category_label_partner();
	return en_partners_category_label_partner();
});
//#endregion
//#region src/lib/paraglide/messages/partners_category_label_supplier.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Category_Label_SupplierInputs */
var en_partners_category_label_supplier = () => {
	return `What you supply`;
};
var am_partners_category_label_supplier = () => {
	return `የሚያቀርቡት`;
};
/**
* | output |
* | --- |
* | "What you supply" |
*
* @param {Partners_Category_Label_SupplierInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_category_label_supplier = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_category_label_supplier();
	return en_partners_category_label_supplier();
});
//#endregion
//#region src/lib/paraglide/messages/partners_category_placeholder.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Category_PlaceholderInputs */
var en_partners_category_placeholder = () => {
	return `Choose one`;
};
var am_partners_category_placeholder = () => {
	return `አንዱን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose one" |
*
* @param {Partners_Category_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_category_placeholder = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_category_placeholder();
	return en_partners_category_placeholder();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_restaurant.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_RestaurantInputs */
var en_partners_cat_restaurant = () => {
	return `Restaurant or café`;
};
var am_partners_cat_restaurant = () => {
	return `ምግብ ቤት ወይም ካፌ`;
};
/**
* | output |
* | --- |
* | "Restaurant or café" |
*
* @param {Partners_Cat_RestaurantInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_restaurant = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_restaurant();
	return en_partners_cat_restaurant();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_shop.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_ShopInputs */
var en_partners_cat_shop = () => {
	return `Shop or grocery`;
};
var am_partners_cat_shop = () => {
	return `ሱቅ ወይም ግሮሰሪ`;
};
/**
* | output |
* | --- |
* | "Shop or grocery" |
*
* @param {Partners_Cat_ShopInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_shop = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_shop();
	return en_partners_cat_shop();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_caterer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_CatererInputs */
var en_partners_cat_caterer = () => {
	return `Caterer or events`;
};
var am_partners_cat_caterer = () => {
	return `የምግብ አቅራቢ ወይም ዝግጅቶች`;
};
/**
* | output |
* | --- |
* | "Caterer or events" |
*
* @param {Partners_Cat_CatererInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_caterer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_caterer();
	return en_partners_cat_caterer();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_community.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_CommunityInputs */
var en_partners_cat_community = () => {
	return `Church or community group`;
};
var am_partners_cat_community = () => {
	return `ቤተ ክርስቲያን ወይም የማህበረሰብ ቡድን`;
};
/**
* | output |
* | --- |
* | "Church or community group" |
*
* @param {Partners_Cat_CommunityInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_community = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_community();
	return en_partners_cat_community();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_corporate.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_CorporateInputs */
var en_partners_cat_corporate = () => {
	return `Office or corporate`;
};
var am_partners_cat_corporate = () => {
	return `ቢሮ ወይም ድርጅት`;
};
/**
* | output |
* | --- |
* | "Office or corporate" |
*
* @param {Partners_Cat_CorporateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_corporate = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_corporate();
	return en_partners_cat_corporate();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_teff.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_TeffInputs */
var en_partners_cat_teff = () => {
	return `Teff and grains`;
};
var am_partners_cat_teff = () => {
	return `ጤፍ እና እህሎች`;
};
/**
* | output |
* | --- |
* | "Teff and grains" |
*
* @param {Partners_Cat_TeffInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_teff = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_teff();
	return en_partners_cat_teff();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_spices.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_SpicesInputs */
var en_partners_cat_spices = () => {
	return `Spices and seasonings`;
};
var am_partners_cat_spices = () => {
	return `ቅመማ ቅመሞች`;
};
/**
* | output |
* | --- |
* | "Spices and seasonings" |
*
* @param {Partners_Cat_SpicesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_spices = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_spices();
	return en_partners_cat_spices();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_produce.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_ProduceInputs */
var en_partners_cat_produce = () => {
	return `Fresh produce`;
};
var am_partners_cat_produce = () => {
	return `ትኩስ ምርቶች`;
};
/**
* | output |
* | --- |
* | "Fresh produce" |
*
* @param {Partners_Cat_ProduceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_produce = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_produce();
	return en_partners_cat_produce();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_packaging.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_PackagingInputs */
var en_partners_cat_packaging = () => {
	return `Packaging`;
};
var am_partners_cat_packaging = () => {
	return `ማሸጊያ`;
};
/**
* | output |
* | --- |
* | "Packaging" |
*
* @param {Partners_Cat_PackagingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_packaging = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_packaging();
	return en_partners_cat_packaging();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_logistics.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_LogisticsInputs */
var en_partners_cat_logistics = () => {
	return `Delivery and logistics`;
};
var am_partners_cat_logistics = () => {
	return `ማድረስ እና ሎጂስቲክስ`;
};
/**
* | output |
* | --- |
* | "Delivery and logistics" |
*
* @param {Partners_Cat_LogisticsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_logistics = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_logistics();
	return en_partners_cat_logistics();
});
//#endregion
//#region src/lib/paraglide/messages/partners_cat_other.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Cat_OtherInputs */
var en_partners_cat_other = () => {
	return `Other`;
};
var am_partners_cat_other = () => {
	return `ሌላ`;
};
/**
* | output |
* | --- |
* | "Other" |
*
* @param {Partners_Cat_OtherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_cat_other = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_cat_other();
	return en_partners_cat_other();
});
//#endregion
//#region src/lib/paraglide/messages/partners_contact_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Contact_LabelInputs */
var en_partners_contact_label = () => {
	return `Contact name`;
};
var am_partners_contact_label = () => {
	return `የተጠሪ ስም`;
};
/**
* | output |
* | --- |
* | "Contact name" |
*
* @param {Partners_Contact_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_contact_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_contact_label();
	return en_partners_contact_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Email_LabelInputs */
var en_partners_email_label = () => {
	return `Email`;
};
var am_partners_email_label = () => {
	return `ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Partners_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_email_label();
	return en_partners_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_phone_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Phone_LabelInputs */
var en_partners_phone_label = () => {
	return `Phone`;
};
var am_partners_phone_label = () => {
	return `ስልክ`;
};
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Partners_Phone_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_phone_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_phone_label();
	return en_partners_phone_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_website_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Website_LabelInputs */
var en_partners_website_label = () => {
	return `Website`;
};
var am_partners_website_label = () => {
	return `ድረ-ገጽ`;
};
/**
* | output |
* | --- |
* | "Website" |
*
* @param {Partners_Website_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_website_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_website_label();
	return en_partners_website_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_city_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_City_LabelInputs */
var en_partners_city_label = () => {
	return `City`;
};
var am_partners_city_label = () => {
	return `ከተማ`;
};
/**
* | output |
* | --- |
* | "City" |
*
* @param {Partners_City_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_city_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_city_label();
	return en_partners_city_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_postcode_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Postcode_LabelInputs */
var en_partners_postcode_label = () => {
	return `Postcode`;
};
var am_partners_postcode_label = () => {
	return `ፖስት ኮድ`;
};
/**
* | output |
* | --- |
* | "Postcode" |
*
* @param {Partners_Postcode_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_postcode_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_postcode_label();
	return en_partners_postcode_label();
});
//#endregion
//#region src/lib/paraglide/messages/partners_optional.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_OptionalInputs */
var en_partners_optional = () => {
	return `(optional)`;
};
var am_partners_optional = () => {
	return `(አማራጭ)`;
};
/**
* | output |
* | --- |
* | "(optional)" |
*
* @param {Partners_OptionalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_optional = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_optional();
	return en_partners_optional();
});
//#endregion
//#region src/lib/paraglide/messages/partners_message_label_partner.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Message_Label_PartnerInputs */
var en_partners_message_label_partner = () => {
	return `Tell us about your business`;
};
var am_partners_message_label_partner = () => {
	return `ስለ ንግድዎ ይንገሩን`;
};
/**
* | output |
* | --- |
* | "Tell us about your business" |
*
* @param {Partners_Message_Label_PartnerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_message_label_partner = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_message_label_partner();
	return en_partners_message_label_partner();
});
//#endregion
//#region src/lib/paraglide/messages/partners_message_label_supplier.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Message_Label_SupplierInputs */
var en_partners_message_label_supplier = () => {
	return `Tell us about your products`;
};
var am_partners_message_label_supplier = () => {
	return `ስለ ምርቶችዎ ይንገሩን`;
};
/**
* | output |
* | --- |
* | "Tell us about your products" |
*
* @param {Partners_Message_Label_SupplierInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_message_label_supplier = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_message_label_supplier();
	return en_partners_message_label_supplier();
});
//#endregion
//#region src/lib/paraglide/messages/partners_message_placeholder_partner.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Message_Placeholder_PartnerInputs */
var en_partners_message_placeholder_partner = () => {
	return `What you do, roughly how much injera you'd need and how often…`;
};
var am_partners_message_placeholder_partner = () => {
	return `ምን እንደሚሰሩ፣ በግምት ምን ያህል እንጀራ እና በምን ያህል ጊዜ እንደሚፈልጉ…`;
};
/**
* | output |
* | --- |
* | "What you do, roughly how much injera you'd need and how often…" |
*
* @param {Partners_Message_Placeholder_PartnerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_message_placeholder_partner = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_message_placeholder_partner();
	return en_partners_message_placeholder_partner();
});
//#endregion
//#region src/lib/paraglide/messages/partners_message_placeholder_supplier.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Message_Placeholder_SupplierInputs */
var en_partners_message_placeholder_supplier = () => {
	return `What you supply, capacity, certifications and where you're based…`;
};
var am_partners_message_placeholder_supplier = () => {
	return `የሚያቀርቡት፣ አቅምዎ፣ የምስክር ወረቀቶች እና የሚገኙበት ቦታ…`;
};
/**
* | output |
* | --- |
* | "What you supply, capacity, certifications and where you're based…" |
*
* @param {Partners_Message_Placeholder_SupplierInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_message_placeholder_supplier = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_message_placeholder_supplier();
	return en_partners_message_placeholder_supplier();
});
//#endregion
//#region src/lib/paraglide/messages/partners_consent.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_ConsentInputs */
var en_partners_consent = () => {
	return `I agree that GOTERA may store these details to respond to my application.`;
};
var am_partners_consent = () => {
	return `ጎተራ ለማመልከቻዬ ምላሽ ለመስጠት እነዚህን መረጃዎች እንዲያስቀምጥ እስማማለሁ።`;
};
/**
* | output |
* | --- |
* | "I agree that GOTERA may store these details to respond to my application." |
*
* @param {Partners_ConsentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_consent = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_consent();
	return en_partners_consent();
});
//#endregion
//#region src/lib/paraglide/messages/partners_privacy_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Privacy_LinkInputs */
var en_partners_privacy_link = () => {
	return `Privacy policy`;
};
var am_partners_privacy_link = () => {
	return `የግላዊነት ፖሊሲ`;
};
/**
* | output |
* | --- |
* | "Privacy policy" |
*
* @param {Partners_Privacy_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_privacy_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_privacy_link();
	return en_partners_privacy_link();
});
//#endregion
//#region src/lib/paraglide/messages/partners_submit.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_SubmitInputs */
var en_partners_submit = () => {
	return `Send application`;
};
var am_partners_submit = () => {
	return `ማመልከቻ ይላኩ`;
};
/**
* | output |
* | --- |
* | "Send application" |
*
* @param {Partners_SubmitInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_submit = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_submit();
	return en_partners_submit();
});
//#endregion
//#region src/lib/paraglide/messages/partners_submitting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_SubmittingInputs */
var en_partners_submitting = () => {
	return `Sending…`;
};
var am_partners_submitting = () => {
	return `በመላክ ላይ…`;
};
/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Partners_SubmittingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_submitting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_submitting();
	return en_partners_submitting();
});
//#endregion
//#region src/lib/paraglide/messages/partners_success_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Success_EyebrowInputs */
var en_partners_success_eyebrow = () => {
	return `Application received`;
};
var am_partners_success_eyebrow = () => {
	return `ማመልከቻው ደርሷል`;
};
/**
* | output |
* | --- |
* | "Application received" |
*
* @param {Partners_Success_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_success_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_success_eyebrow();
	return en_partners_success_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/partners_success_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Success_HeadingInputs */
var en_partners_success_heading = () => {
	return `Thank you`;
};
var am_partners_success_heading = () => {
	return `እናመሰግናለን`;
};
/**
* | output |
* | --- |
* | "Thank you" |
*
* @param {Partners_Success_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_success_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_success_heading();
	return en_partners_success_heading();
});
//#endregion
//#region src/lib/paraglide/messages/partners_back_home.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Back_HomeInputs */
var en_partners_back_home = () => {
	return `Back to home`;
};
var am_partners_back_home = () => {
	return `ወደ መነሻ ገጽ ይመለሱ`;
};
/**
* | output |
* | --- |
* | "Back to home" |
*
* @param {Partners_Back_HomeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_back_home = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_back_home();
	return en_partners_back_home();
});
//#endregion
//#region src/routes/partners/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let submitted = false;
		let errorMessage = "";
		const { form, errors, submitting } = superForm(data.form, {
			resetForm: false,
			scrollToError: "smooth",
			onUpdated({ form }) {
				const msg = form.message;
				if (!msg) return;
				if (msg.type === "success") {
					submitted = true;
					errorMessage = "";
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					});
				} else errorMessage = msg.text;
			}
		});
		const CATEGORY_LABELS = {
			restaurant: partners_cat_restaurant,
			shop: partners_cat_shop,
			caterer: partners_cat_caterer,
			community: partners_cat_community,
			corporate: partners_cat_corporate,
			teff: partners_cat_teff,
			spices: partners_cat_spices,
			produce: partners_cat_produce,
			packaging: partners_cat_packaging,
			logistics: partners_cat_logistics,
			other: partners_cat_other
		};
		const categories = derived(() => store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? SUPPLIER_CATEGORIES : PARTNER_CATEGORIES);
		const benefits = derived(() => store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? [
			partners_supplier_benefit1(),
			partners_supplier_benefit2(),
			partners_supplier_benefit3()
		] : [
			partners_partner_benefit1(),
			partners_partner_benefit2(),
			partners_partner_benefit3()
		]);
		head("105ajtk", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(partners_meta_title())}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", partners_meta_description())}/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		$$renderer.push(`<div class="partners-wrap svelte-105ajtk"><div class="partners-grid svelte-105ajtk"><aside class="intro svelte-105ajtk"><span class="eyebrow svelte-105ajtk">${escape_html(partners_eyebrow())}</span> <h1 class="svelte-105ajtk">${escape_html(partners_heading())}</h1> <p class="sub svelte-105ajtk">${escape_html(partners_sub())}</p> <h2 class="benefits-heading svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? partners_supplier_benefits_heading() : partners_partner_benefits_heading())}</h2> <ul class="benefits svelte-105ajtk"><!--[-->`);
		const each_array = ensure_array_like(benefits());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let benefit = each_array[$$index];
			$$renderer.push(`<li class="svelte-105ajtk">`);
			Check($$renderer, { class: "benefit-icon" });
			$$renderer.push(`<!----><span>${escape_html(benefit)}</span></li>`);
		}
		$$renderer.push(`<!--]--></ul> <p class="contact-note svelte-105ajtk">${escape_html(partners_contact_note())}</p></aside> <div class="card svelte-105ajtk">`);
		if (submitted) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="sent svelte-105ajtk">`);
			Circle_check($$renderer, { class: "sent-icon" });
			$$renderer.push(`<!----> <span class="eyebrow svelte-105ajtk">${escape_html(partners_success_eyebrow())}</span> <h2 class="sent-heading svelte-105ajtk">${escape_html(partners_success_heading())}</h2> <p class="svelte-105ajtk">${escape_html(partners_success_body())}</p> <a href="/" class="btn btn-full svelte-105ajtk">${escape_html(partners_back_home())}</a></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<form method="POST" class="form svelte-105ajtk" novalidate="">`);
			if (errorMessage) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="alert svelte-105ajtk" role="alert">`);
				Circle_alert($$renderer, { class: "alert-icon" });
				$$renderer.push(`<!----> <span>${escape_html(errorMessage)}</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <fieldset class="type-picker svelte-105ajtk"><legend class="field-label svelte-105ajtk">${escape_html(partners_type_label())}</legend> <input type="hidden" name="type"${attr("value", store_get($$store_subs ??= {}, "$form", form).type)}/> <div class="type-options svelte-105ajtk"><button type="button"${attr_class("type-option svelte-105ajtk", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).type === "partner" })}${attr("aria-pressed", store_get($$store_subs ??= {}, "$form", form).type === "partner")}>`);
			Store($$renderer, { class: "type-icon" });
			$$renderer.push(`<!----> <span class="type-title svelte-105ajtk">${escape_html(partners_type_partner())}</span> <span class="type-desc svelte-105ajtk">${escape_html(partners_type_partner_desc())}</span></button> <button type="button"${attr_class("type-option svelte-105ajtk", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).type === "supplier" })}${attr("aria-pressed", store_get($$store_subs ??= {}, "$form", form).type === "supplier")}>`);
			Wheat($$renderer, { class: "type-icon" });
			$$renderer.push(`<!----> <span class="type-title svelte-105ajtk">${escape_html(partners_type_supplier())}</span> <span class="type-desc svelte-105ajtk">${escape_html(partners_type_supplier_desc())}</span></button></div></fieldset> <div class="row svelte-105ajtk"><div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="businessName">${escape_html(partners_business_label())}</label> <input id="businessName" name="businessName" class="input svelte-105ajtk" autocomplete="organization"${attr("value", store_get($$store_subs ??= {}, "$form", form).businessName)}${attr("aria-invalid", store_get($$store_subs ??= {}, "$errors", errors).businessName ? "true" : void 0)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).businessName) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).businessName)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="category">${escape_html(store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? partners_category_label_supplier() : partners_category_label_partner())}</label> `);
			$$renderer.select({
				id: "category",
				name: "category",
				class: "input",
				value: store_get($$store_subs ??= {}, "$form", form).category,
				"aria-invalid": store_get($$store_subs ??= {}, "$errors", errors).category ? "true" : void 0,
				disabled: store_get($$store_subs ??= {}, "$submitting", submitting)
			}, ($$renderer) => {
				$$renderer.option({
					value: "",
					disabled: true
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(partners_category_placeholder())}`);
				});
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like(categories());
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let cat = each_array_1[$$index_1];
					$$renderer.option({ value: cat }, ($$renderer) => {
						$$renderer.push(`${escape_html(CATEGORY_LABELS[cat]())}`);
					});
				}
				$$renderer.push(`<!--]-->`);
			}, "svelte-105ajtk");
			$$renderer.push(` `);
			if (store_get($$store_subs ??= {}, "$errors", errors).category) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).category)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="row svelte-105ajtk"><div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="contactName">${escape_html(partners_contact_label())}</label> <input id="contactName" name="contactName" class="input svelte-105ajtk" autocomplete="name"${attr("value", store_get($$store_subs ??= {}, "$form", form).contactName)}${attr("aria-invalid", store_get($$store_subs ??= {}, "$errors", errors).contactName ? "true" : void 0)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).contactName) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).contactName)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="email">${escape_html(partners_email_label())}</label> <input id="email" name="email" type="email" class="input svelte-105ajtk" autocomplete="email"${attr("value", store_get($$store_subs ??= {}, "$form", form).email)}${attr("aria-invalid", store_get($$store_subs ??= {}, "$errors", errors).email ? "true" : void 0)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="row svelte-105ajtk"><div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="phone">${escape_html(partners_phone_label())} <span class="optional svelte-105ajtk">${escape_html(partners_optional())}</span></label> <input id="phone" name="phone" type="tel" class="input svelte-105ajtk" autocomplete="tel"${attr("value", store_get($$store_subs ??= {}, "$form", form).phone)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/></div> <div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="website">${escape_html(partners_website_label())} <span class="optional svelte-105ajtk">${escape_html(partners_optional())}</span></label> <input id="website" name="website" class="input svelte-105ajtk" autocomplete="url" placeholder="https://"${attr("value", store_get($$store_subs ??= {}, "$form", form).website)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/></div></div> <div class="row svelte-105ajtk"><div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="city">${escape_html(partners_city_label())} <span class="optional svelte-105ajtk">${escape_html(partners_optional())}</span></label> <input id="city" name="city" class="input svelte-105ajtk" autocomplete="address-level2"${attr("value", store_get($$store_subs ??= {}, "$form", form).city)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/></div> <div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="postcode">${escape_html(partners_postcode_label())} <span class="optional svelte-105ajtk">${escape_html(partners_optional())}</span></label> <input id="postcode" name="postcode" class="input svelte-105ajtk" autocomplete="postal-code"${attr("value", store_get($$store_subs ??= {}, "$form", form).postcode)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}/></div></div> <div class="field svelte-105ajtk"><label class="field-label svelte-105ajtk" for="message">${escape_html(store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? partners_message_label_supplier() : partners_message_label_partner())}</label> <textarea id="message" name="message" class="input textarea svelte-105ajtk" rows="5"${attr("placeholder", store_get($$store_subs ??= {}, "$form", form).type === "supplier" ? partners_message_placeholder_supplier() : partners_message_placeholder_partner())}${attr("aria-invalid", store_get($$store_subs ??= {}, "$errors", errors).message ? "true" : void 0)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>`);
			const $$body = escape_html(store_get($$store_subs ??= {}, "$form", form).message);
			if ($$body) $$renderer.push(`${$$body}`);
			$$renderer.push(`</textarea> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).message) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).message)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="hp svelte-105ajtk" aria-hidden="true"><label for="company_url">Company URL</label> <input id="company_url" name="company_url" tabindex="-1" autocomplete="off"${attr("value", store_get($$store_subs ??= {}, "$form", form).company_url)}/></div> <div class="field svelte-105ajtk"><label class="consent svelte-105ajtk"><input type="checkbox" name="consent"${attr("checked", store_get($$store_subs ??= {}, "$form", form).consent, true)}${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)} class="svelte-105ajtk"/> <span>${escape_html(partners_consent())} <a href="/privacy" class="svelte-105ajtk">${escape_html(partners_privacy_link())}</a></span></label> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).consent) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-105ajtk">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).consent)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <button type="submit" class="btn btn-full svelte-105ajtk"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting), true)}>`);
			if (store_get($$store_subs ??= {}, "$submitting", submitting)) {
				$$renderer.push("<!--[0-->");
				Loader_circle($$renderer, { class: "spin btn-icon" });
				$$renderer.push(`<!----> ${escape_html(partners_submitting())}`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(partners_submit())}`);
			}
			$$renderer.push(`<!--]--></button></form>`);
		}
		$$renderer.push(`<!--]--></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-t5RsKR8a.js.map
