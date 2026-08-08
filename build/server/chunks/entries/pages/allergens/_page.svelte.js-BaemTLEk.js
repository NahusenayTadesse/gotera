import { a9 as escape_html, a4 as ensure_array_like, aa as attr_class, ab as stringify$1, a1 as html, T as derived } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/allergens_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_EyebrowInputs */
var en_allergens_eyebrow = () => {
	return `Legal · UK Food Law`;
};
var am_allergens_eyebrow = () => {
	return `ህጋዊ · የዩኬ የምግብ ህግ`;
};
/**
* | output |
* | --- |
* | "Legal · UK Food Law" |
*
* @param {Allergens_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_eyebrow();
	return en_allergens_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Page_TitleInputs */
var en_allergens_page_title = () => {
	return `Allergen information.`;
};
var am_allergens_page_title = () => {
	return `የአለርጂ መረጃ።`;
};
/**
* | output |
* | --- |
* | "Allergen information." |
*
* @param {Allergens_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_page_title();
	return en_allergens_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_page_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Page_IntroInputs */
var en_allergens_page_intro = () => {
	return `Full allergen and ingredient information for all GOTERA products, provided in accordance with the UK Food Information to Consumers Regulation (FIC) and Natasha's Law.`;
};
var am_allergens_page_intro = () => {
	return `ለሁሉም የGOTERA ምርቶች ሙሉ የአለርጂ እና የግብዓት መረጃ፣ በዩኬ የምግብ መረጃ ለሸማቾች ደንብ (FIC) እና በናታሻ ህግ መሰረት የቀረበ።`;
};
/**
* | output |
* | --- |
* | "Full allergen and ingredient information for all GOTERA products, provided in accordance with the UK Food Information to Consumers Regulation (FIC) and Natas..." |
*
* @param {Allergens_Page_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_page_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_page_intro();
	return en_allergens_page_intro();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_important_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Important_LabelInputs */
var en_allergens_important_label = () => {
	return `Important:`;
};
var am_allergens_important_label = () => {
	return `አስፈላጊ፦`;
};
/**
* | output |
* | --- |
* | "Important:" |
*
* @param {Allergens_Important_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_important_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_important_label();
	return en_allergens_important_label();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_legal_notice.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Legal_NoticeInputs */
var en_allergens_legal_notice = () => {
	return `If you have a food allergy or intolerance, please read all allergen information carefully before ordering. If you are unsure whether a product is safe for you, contact us before placing an order. Do not rely on product descriptions alone — always check the full ingredient and allergen information below.`;
};
var am_allergens_legal_notice = () => {
	return `የምግብ አለርጂ ወይም አለመቻቻል ካለብዎት፣ እባክዎ ትዕዛዝ ከመስጠትዎ በፊት ሁሉንም የአለርጂ መረጃ በጥንቃቄ ያንብቡ። ምርቱ ለእርስዎ ደህንነቱ የተጠበቀ መሆኑን እርግጠኛ ካልሆኑ፣ ትዕዛዝ ከመስጠትዎ በፊት ያግኙን። በምርት መግለጫዎች ብቻ አይታመኑ — ሁልጊዜ ከዚህ በታች ያለውን ሙሉ የግብዓት እና የአለርጂ መረጃ ያረጋግጡ።`;
};
/**
* | output |
* | --- |
* | "If you have a food allergy or intolerance, please read all allergen information carefully before ordering. If you are unsure whether a product is safe for yo..." |
*
* @param {Allergens_Legal_NoticeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_legal_notice = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_legal_notice();
	return en_allergens_legal_notice();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_injera_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Injera_TitleInputs */
var en_allergens_injera_title = () => {
	return `Injera — 100% Teff`;
};
var am_allergens_injera_title = () => {
	return `እንጀራ — 100% ጤፍ`;
};
/**
* | output |
* | --- |
* | "Injera — 100% Teff" |
*
* @param {Allergens_Injera_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_injera_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_injera_title();
	return en_allergens_injera_title();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_gluten_free_badge.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Gluten_Free_BadgeInputs */
var en_allergens_gluten_free_badge = () => {
	return `Gluten free recipe`;
};
var am_allergens_gluten_free_badge = () => {
	return `ግሉተን-ነጻ የምግብ አዘገጃጀት`;
};
/**
* | output |
* | --- |
* | "Gluten free recipe" |
*
* @param {Allergens_Gluten_Free_BadgeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_gluten_free_badge = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_gluten_free_badge();
	return en_allergens_gluten_free_badge();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_ingredients_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Ingredients_LabelInputs */
var en_allergens_ingredients_label = () => {
	return `Ingredients:`;
};
var am_allergens_ingredients_label = () => {
	return `ግብዓቶች፦`;
};
/**
* | output |
* | --- |
* | "Ingredients:" |
*
* @param {Allergens_Ingredients_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_ingredients_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_ingredients_label();
	return en_allergens_ingredients_label();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_injera_ingredients_list.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Injera_Ingredients_ListInputs */
var en_allergens_injera_ingredients_list = () => {
	return `Teff Flour (100%), Water, Live Fermentation Culture.`;
};
var am_allergens_injera_ingredients_list = () => {
	return `የጤፍ ዱቄት (100%)፣ ውሃ፣ ሕያው የመፍላት ባህል።`;
};
/**
* | output |
* | --- |
* | "Teff Flour (100%), Water, Live Fermentation Culture." |
*
* @param {Allergens_Injera_Ingredients_ListInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_injera_ingredients_list = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_injera_ingredients_list();
	return en_allergens_injera_ingredients_list();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_injera_gluten_free_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Injera_Gluten_Free_DescInputs */
var en_allergens_injera_gluten_free_desc = () => {
	return `This product is made using a recipe with no gluten-containing ingredients. Teff is a naturally gluten-free grain.`;
};
var am_allergens_injera_gluten_free_desc = () => {
	return `ይህ ምርት ግሉተን የያዙ ግብዓቶች በሌሉት የምግብ አዘገጃጀት የተሰራ ነው። ጤፍ በተፈጥሮው ግሉተን-ነጻ እህል ነው።`;
};
/**
* | output |
* | --- |
* | "This product is made using a recipe with no gluten-containing ingredients. Teff is a naturally gluten-free grain." |
*
* @param {Allergens_Injera_Gluten_Free_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_injera_gluten_free_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_injera_gluten_free_desc();
	return en_allergens_injera_gluten_free_desc();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_key_contains.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Key_ContainsInputs */
var en_allergens_key_contains = () => {
	return `Contains`;
};
var am_allergens_key_contains = () => {
	return `ይይዛል`;
};
/**
* | output |
* | --- |
* | "Contains" |
*
* @param {Allergens_Key_ContainsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_key_contains = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_key_contains();
	return en_allergens_key_contains();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_key_may_contain.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Key_May_ContainInputs */
var en_allergens_key_may_contain = () => {
	return `May contain (cross-contamination risk)`;
};
var am_allergens_key_may_contain = () => {
	return `ሊይዝ ይችላል (የመስቀል-ብክለት ስጋት)`;
};
/**
* | output |
* | --- |
* | "May contain (cross-contamination risk)" |
*
* @param {Allergens_Key_May_ContainInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_key_may_contain = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_key_may_contain();
	return en_allergens_key_may_contain();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_key_not_present.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Key_Not_PresentInputs */
var en_allergens_key_not_present = () => {
	return `Not present`;
};
var am_allergens_key_not_present = () => {
	return `አይገኝም`;
};
/**
* | output |
* | --- |
* | "Not present" |
*
* @param {Allergens_Key_Not_PresentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_key_not_present = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_key_not_present();
	return en_allergens_key_not_present();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_table_header_allergen.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Table_Header_AllergenInputs */
var en_allergens_table_header_allergen = () => {
	return `Allergen`;
};
var am_allergens_table_header_allergen = () => {
	return `አለርጂ`;
};
/**
* | output |
* | --- |
* | "Allergen" |
*
* @param {Allergens_Table_Header_AllergenInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_table_header_allergen = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_table_header_allergen();
	return en_allergens_table_header_allergen();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_table_header_status.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Table_Header_StatusInputs */
var en_allergens_table_header_status = () => {
	return `Status`;
};
var am_allergens_table_header_status = () => {
	return `ሁኔታ`;
};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Allergens_Table_Header_StatusInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_table_header_status = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_table_header_status();
	return en_allergens_table_header_status();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_table_header_notes.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Table_Header_NotesInputs */
var en_allergens_table_header_notes = () => {
	return `Notes`;
};
var am_allergens_table_header_notes = () => {
	return `ማስታወሻዎች`;
};
/**
* | output |
* | --- |
* | "Notes" |
*
* @param {Allergens_Table_Header_NotesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_table_header_notes = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_table_header_notes();
	return en_allergens_table_header_notes();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_status_not_present.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Status_Not_PresentInputs */
var en_allergens_status_not_present = () => {
	return `Not present`;
};
var am_allergens_status_not_present = () => {
	return `አይገኝም`;
};
/**
* | output |
* | --- |
* | "Not present" |
*
* @param {Allergens_Status_Not_PresentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_status_not_present = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_status_not_present();
	return en_allergens_status_not_present();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_status_may_contain.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Status_May_ContainInputs */
var en_allergens_status_may_contain = () => {
	return `May contain`;
};
var am_allergens_status_may_contain = () => {
	return `ሊይዝ ይችላል`;
};
/**
* | output |
* | --- |
* | "May contain" |
*
* @param {Allergens_Status_May_ContainInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_status_may_contain = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_status_may_contain();
	return en_allergens_status_may_contain();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_notes_none.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Notes_NoneInputs */
var en_allergens_notes_none = () => {
	return `—`;
};
var am_allergens_notes_none = () => {
	return `—`;
};
/**
* | output |
* | --- |
* | "—" |
*
* @param {Allergens_Notes_NoneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_notes_none = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_notes_none();
	return en_allergens_notes_none();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_gluten_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Gluten_NameInputs */
var en_allergens_item_gluten_name = () => {
	return `Cereals containing gluten`;
};
var am_allergens_item_gluten_name = () => {
	return `ግሉተን የያዙ እህሎች`;
};
/**
* | output |
* | --- |
* | "Cereals containing gluten" |
*
* @param {Allergens_Item_Gluten_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_gluten_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_gluten_name();
	return en_allergens_item_gluten_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_gluten_subtext.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Gluten_SubtextInputs */
var en_allergens_item_gluten_subtext = () => {
	return `wheat, rye, barley, oats, spelt, kamut`;
};
var am_allergens_item_gluten_subtext = () => {
	return `ስንዴ፣ አጃ፣ ገብስ፣ ኦትስ፣ ስፔልት፣ ካሙት`;
};
/**
* | output |
* | --- |
* | "wheat, rye, barley, oats, spelt, kamut" |
*
* @param {Allergens_Item_Gluten_SubtextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_gluten_subtext = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_gluten_subtext();
	return en_allergens_item_gluten_subtext();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_gluten_notes.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Gluten_NotesInputs */
var en_allergens_item_gluten_notes = () => {
	return `Recipe contains no gluten-containing grains. Made with 100% teff.`;
};
var am_allergens_item_gluten_notes = () => {
	return `የምግብ አዘገጃጀቱ ግሉተን የያዙ እህሎችን አልያዘም። በ100% ጤፍ የተሰራ።`;
};
/**
* | output |
* | --- |
* | "Recipe contains no gluten-containing grains. Made with 100% teff." |
*
* @param {Allergens_Item_Gluten_NotesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_gluten_notes = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_gluten_notes();
	return en_allergens_item_gluten_notes();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_crustaceans_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Crustaceans_NameInputs */
var en_allergens_item_crustaceans_name = () => {
	return `Crustaceans`;
};
var am_allergens_item_crustaceans_name = () => {
	return `ቅርፊታም የባህር ውስጥ ፍጥረታት`;
};
/**
* | output |
* | --- |
* | "Crustaceans" |
*
* @param {Allergens_Item_Crustaceans_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_crustaceans_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_crustaceans_name();
	return en_allergens_item_crustaceans_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_eggs_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Eggs_NameInputs */
var en_allergens_item_eggs_name = () => {
	return `Eggs`;
};
var am_allergens_item_eggs_name = () => {
	return `እንቁላል`;
};
/**
* | output |
* | --- |
* | "Eggs" |
*
* @param {Allergens_Item_Eggs_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_eggs_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_eggs_name();
	return en_allergens_item_eggs_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_fish_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Fish_NameInputs */
var en_allergens_item_fish_name = () => {
	return `Fish`;
};
var am_allergens_item_fish_name = () => {
	return `አሳ`;
};
/**
* | output |
* | --- |
* | "Fish" |
*
* @param {Allergens_Item_Fish_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_fish_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_fish_name();
	return en_allergens_item_fish_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_peanuts_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Peanuts_NameInputs */
var en_allergens_item_peanuts_name = () => {
	return `Peanuts`;
};
var am_allergens_item_peanuts_name = () => {
	return `የመሬት ለውዝ`;
};
/**
* | output |
* | --- |
* | "Peanuts" |
*
* @param {Allergens_Item_Peanuts_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_peanuts_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_peanuts_name();
	return en_allergens_item_peanuts_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_soybeans_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Soybeans_NameInputs */
var en_allergens_item_soybeans_name = () => {
	return `Soybeans`;
};
var am_allergens_item_soybeans_name = () => {
	return `አኩሪ አተር`;
};
/**
* | output |
* | --- |
* | "Soybeans" |
*
* @param {Allergens_Item_Soybeans_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_soybeans_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_soybeans_name();
	return en_allergens_item_soybeans_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_soybeans_notes.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Soybeans_NotesInputs */
var en_allergens_item_soybeans_notes = () => {
	return `Produced in a facility that also handles soy products.`;
};
var am_allergens_item_soybeans_notes = () => {
	return `አኩሪ አተር ምርቶችንም በሚይዝ ፋብሪካ ውስጥ የተመረተ።`;
};
/**
* | output |
* | --- |
* | "Produced in a facility that also handles soy products." |
*
* @param {Allergens_Item_Soybeans_NotesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_soybeans_notes = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_soybeans_notes();
	return en_allergens_item_soybeans_notes();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_milk_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Milk_NameInputs */
var en_allergens_item_milk_name = () => {
	return `Milk`;
};
var am_allergens_item_milk_name = () => {
	return `ወተት`;
};
/**
* | output |
* | --- |
* | "Milk" |
*
* @param {Allergens_Item_Milk_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_milk_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_milk_name();
	return en_allergens_item_milk_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_milk_notes.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Milk_NotesInputs */
var en_allergens_item_milk_notes = () => {
	return `Product is vegan. No dairy ingredients used.`;
};
var am_allergens_item_milk_notes = () => {
	return `ምርቱ ቪጋን ነው። የወተት ግብዓቶች አልተጠቀሙም።`;
};
/**
* | output |
* | --- |
* | "Product is vegan. No dairy ingredients used." |
*
* @param {Allergens_Item_Milk_NotesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_milk_notes = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_milk_notes();
	return en_allergens_item_milk_notes();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_nuts_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Nuts_NameInputs */
var en_allergens_item_nuts_name = () => {
	return `Nuts`;
};
var am_allergens_item_nuts_name = () => {
	return `ለውዝ`;
};
/**
* | output |
* | --- |
* | "Nuts" |
*
* @param {Allergens_Item_Nuts_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_nuts_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_nuts_name();
	return en_allergens_item_nuts_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_nuts_subtext.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Nuts_SubtextInputs */
var en_allergens_item_nuts_subtext = () => {
	return `almond, hazelnut, walnut, cashew, pecan, brazil, pistachio, macadamia`;
};
var am_allergens_item_nuts_subtext = () => {
	return `አልሞንድ፣ ሃዘልናት፣ ዎልናት፣ ካሹ፣ ፔካን፣ ብራዚል ለውዝ፣ ፒስታችዮ፣ ማካዳሚያ`;
};
/**
* | output |
* | --- |
* | "almond, hazelnut, walnut, cashew, pecan, brazil, pistachio, macadamia" |
*
* @param {Allergens_Item_Nuts_SubtextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_nuts_subtext = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_nuts_subtext();
	return en_allergens_item_nuts_subtext();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_nuts_notes.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Nuts_NotesInputs */
var en_allergens_item_nuts_notes = () => {
	return `Produced in a facility that also handles tree nuts.`;
};
var am_allergens_item_nuts_notes = () => {
	return `የዛፍ ለውዝንም በሚይዝ ፋብሪካ ውስጥ የተመረተ።`;
};
/**
* | output |
* | --- |
* | "Produced in a facility that also handles tree nuts." |
*
* @param {Allergens_Item_Nuts_NotesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_nuts_notes = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_nuts_notes();
	return en_allergens_item_nuts_notes();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_celery_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Celery_NameInputs */
var en_allergens_item_celery_name = () => {
	return `Celery`;
};
var am_allergens_item_celery_name = () => {
	return `ሰሊሪ`;
};
/**
* | output |
* | --- |
* | "Celery" |
*
* @param {Allergens_Item_Celery_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_celery_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_celery_name();
	return en_allergens_item_celery_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_mustard_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Mustard_NameInputs */
var en_allergens_item_mustard_name = () => {
	return `Mustard`;
};
var am_allergens_item_mustard_name = () => {
	return `ሰናፍጭ`;
};
/**
* | output |
* | --- |
* | "Mustard" |
*
* @param {Allergens_Item_Mustard_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_mustard_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_mustard_name();
	return en_allergens_item_mustard_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_sesame_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Sesame_NameInputs */
var en_allergens_item_sesame_name = () => {
	return `Sesame`;
};
var am_allergens_item_sesame_name = () => {
	return `ሰሊጥ`;
};
/**
* | output |
* | --- |
* | "Sesame" |
*
* @param {Allergens_Item_Sesame_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_sesame_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_sesame_name();
	return en_allergens_item_sesame_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_sulphites_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Sulphites_NameInputs */
var en_allergens_item_sulphites_name = () => {
	return `Sulphur dioxide & sulphites`;
};
var am_allergens_item_sulphites_name = () => {
	return `ሰልፈር ዳይኦክሳይድ እና ሰልፋይቶች`;
};
/**
* | output |
* | --- |
* | "Sulphur dioxide & sulphites" |
*
* @param {Allergens_Item_Sulphites_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_sulphites_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_sulphites_name();
	return en_allergens_item_sulphites_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_lupin_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Lupin_NameInputs */
var en_allergens_item_lupin_name = () => {
	return `Lupin`;
};
var am_allergens_item_lupin_name = () => {
	return `ሉፒን`;
};
/**
* | output |
* | --- |
* | "Lupin" |
*
* @param {Allergens_Item_Lupin_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_lupin_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_lupin_name();
	return en_allergens_item_lupin_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_item_molluscs_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Item_Molluscs_NameInputs */
var en_allergens_item_molluscs_name = () => {
	return `Molluscs`;
};
var am_allergens_item_molluscs_name = () => {
	return `ለስላሳ ሰውነት ያላቸው የባህር ውስጥ ፍጥረታት`;
};
/**
* | output |
* | --- |
* | "Molluscs" |
*
* @param {Allergens_Item_Molluscs_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_item_molluscs_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_item_molluscs_name();
	return en_allergens_item_molluscs_name();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_cross_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Cross_HeadingInputs */
var en_allergens_cross_heading = () => {
	return `Cross-contamination statement`;
};
var am_allergens_cross_heading = () => {
	return `የመስቀል-ብክለት መግለጫ`;
};
/**
* | output |
* | --- |
* | "Cross-contamination statement" |
*
* @param {Allergens_Cross_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_cross_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_cross_heading();
	return en_allergens_cross_heading();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_cross_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Cross_TextInputs */
var en_allergens_cross_text = () => {
	return `GOTERA injera is produced in a facility in Ethiopia that also handles <strong>soy</strong> and <strong>tree nuts</strong>. While production lines are cleaned between runs, we cannot guarantee the complete absence of these allergens in the final product. Customers with severe allergies to soy or tree nuts should consider this risk carefully before ordering.`;
};
var am_allergens_cross_text = () => {
	return `የGOTERA እንጀራ በኢትዮጵያ ውስጥ <strong>አኩሪ አተርን</strong> እና <strong>የዛፍ ለውዝን</strong> በሚይዝ ፋብሪካ ውስጥ ይመረታል። በምርት መስመሮች መካከል ጽዳት ቢደረግም፣ በመጨረሻው ምርት ውስጥ እነዚህ አለርጂዎች ሙሉ በሙሉ አለመኖራቸውን ማረጋገጥ አንችልም። ለአኩሪ አተር ወይም ለዛፍ ለውዝ ከባድ አለርጂ ያለባቸው ደንበኞች ትዕዛዝ ከመስጠታቸው በፊት ይህን ስጋት በጥንቃቄ ሊያስቡበት ይገባል።`;
};
/**
* | output |
* | --- |
* | "GOTERA injera is produced in a facility in Ethiopia that also handles <strong>soy</strong> and <strong>tree nuts</strong>. While production lines are cleaned..." |
*
* @param {Allergens_Cross_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_cross_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_cross_text();
	return en_allergens_cross_text();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_cert_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Cert_HeadingInputs */
var en_allergens_cert_heading = () => {
	return `Gluten-free recipe`;
};
var am_allergens_cert_heading = () => {
	return `ግሉተን-ነጻ የምግብ አዘገጃጀት`;
};
/**
* | output |
* | --- |
* | "Gluten-free recipe" |
*
* @param {Allergens_Cert_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_cert_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_cert_heading();
	return en_allergens_cert_heading();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_cert_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Cert_TextInputs */
var en_allergens_cert_text = () => {
	return `GOTERA injera is made from 100% teff flour — a naturally gluten-free grain native to Ethiopia. No wheat, rye, barley, oats, spelt, or kamut are used in the recipe. This claim refers to the recipe ingredients only. Customers with coeliac disease should note the cross-contamination statement above and consult their healthcare provider if unsure.`;
};
var am_allergens_cert_text = () => {
	return `የGOTERA እንጀራ ከ100% የጤፍ ዱቄት የተሰራ ነው — ከኢትዮጵያ የተገኘ በተፈጥሮው ግሉተን-ነጻ እህል። በዚህ የምግብ አዘገጃጀት ውስጥ ስንዴ፣ አጃ፣ ገብስ፣ ኦትስ፣ ስፔልት ወይም ካሙት አይካተትም። ይህ የይገባኛል ጥያቄ የሚያመለክተው የምግብ አዘገጃጀት ግብዓቶችን ብቻ ነው። በሴሊያክ በሽታ የሚሰቃዩ ደንበኞች ከላይ ያለውን የመስቀል-ብክለት መግለጫ ልብ ሊሉ እና እርግጠኛ ካልሆኑ የጤና እንክብካቤ አቅራቢያቸውን ሊያማክሩ ይገባል።`;
};
/**
* | output |
* | --- |
* | "GOTERA injera is made from 100% teff flour — a naturally gluten-free grain native to Ethiopia. No wheat, rye, barley, oats, spelt, or kamut are used in the r..." |
*
* @param {Allergens_Cert_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_cert_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_cert_text();
	return en_allergens_cert_text();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_addons_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Addons_HeadingInputs */
var en_allergens_addons_heading = () => {
	return `Add-ons`;
};
var am_allergens_addons_heading = () => {
	return `ተጨማሪዎች`;
};
/**
* | output |
* | --- |
* | "Add-ons" |
*
* @param {Allergens_Addons_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_addons_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_addons_heading();
	return en_allergens_addons_heading();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_addons_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Addons_IntroInputs */
var en_allergens_addons_intro = () => {
	return `Full allergen information for each add-on product is provided on the individual product label and will be listed here as each product launches. If you have a specific allergy query about an add-on product, contact us before ordering.`;
};
var am_allergens_addons_intro = () => {
	return `ለእያንዳንዱ ተጨማሪ ምርት ሙሉ የአለርጂ መረጃ በእያንዳንዱ ምርት መለያ ላይ ይቀርባል እና እያንዳንዱ ምርት ሲጀመር እዚህ ይዘረዘራል። ስለ ተጨማሪ ምርት የተለየ የአለርጂ ጥያቄ ካለዎት፣ ትዕዛዝ ከመስጠትዎ በፊት ያግኙን።`;
};
/**
* | output |
* | --- |
* | "Full allergen information for each add-on product is provided on the individual product label and will be listed here as each product launches. If you have a..." |
*
* @param {Allergens_Addons_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_addons_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_addons_intro();
	return en_allergens_addons_intro();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_addons_placeholder.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Addons_PlaceholderInputs */
var en_allergens_addons_placeholder = () => {
	return `Add-on allergen information will be published here before each product is made available to order.`;
};
var am_allergens_addons_placeholder = () => {
	return `የተጨማሪ ምርቶች የአለርጂ መረጃ እያንዳንዱ ምርት ለትዕዛዝ ከመቅረቡ በፊት እዚህ ይታተማል።`;
};
/**
* | output |
* | --- |
* | "Add-on allergen information will be published here before each product is made available to order." |
*
* @param {Allergens_Addons_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_addons_placeholder = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_addons_placeholder();
	return en_allergens_addons_placeholder();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_contact_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Contact_HeadingInputs */
var en_allergens_contact_heading = () => {
	return `Allergy query?`;
};
var am_allergens_contact_heading = () => {
	return `የአለርጂ ጥያቄ አለዎት?`;
};
/**
* | output |
* | --- |
* | "Allergy query?" |
*
* @param {Allergens_Contact_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_contact_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_contact_heading();
	return en_allergens_contact_heading();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_contact_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Contact_TextInputs */
var en_allergens_contact_text = () => {
	return `If you have a food allergy or intolerance and need more information before ordering, contact us directly. We will respond within one business day.`;
};
var am_allergens_contact_text = () => {
	return `የምግብ አለርጂ ወይም አለመቻቻል ካለብዎት እና ትዕዛዝ ከመስጠትዎ በፊት ተጨማሪ መረጃ ከፈለጉ፣ በቀጥታ ያግኙን። በአንድ የስራ ቀን ውስጥ ምላሽ እንሰጣለን።`;
};
/**
* | output |
* | --- |
* | "If you have a food allergy or intolerance and need more information before ordering, contact us directly. We will respond within one business day." |
*
* @param {Allergens_Contact_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_contact_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_contact_text();
	return en_allergens_contact_text();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_contact_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Contact_ButtonInputs */
var en_allergens_contact_button = () => {
	return `Email us`;
};
var am_allergens_contact_button = () => {
	return `ኢሜይል ይላኩልን`;
};
/**
* | output |
* | --- |
* | "Email us" |
*
* @param {Allergens_Contact_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_contact_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_contact_button();
	return en_allergens_contact_button();
});
//#endregion
//#region src/lib/paraglide/messages/allergens_regulatory_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Allergens_Regulatory_NoteInputs */
var en_allergens_regulatory_note = () => {
	return `Allergen information is provided in accordance with <strong>Regulation (EU) No 1169/2011</strong> as retained in UK law, and <strong>Natasha's Law</strong> (UK Food Information Amendment 2019), which came into force 1 October 2021. The 14 allergens listed above are those required to be declared under UK food law. This information was last reviewed March 2026. GOTERA Foods Ltd reserves the right to update ingredient and allergen information as formulations or suppliers change — please check this page before each order if you have a food allergy.`;
};
var am_allergens_regulatory_note = () => {
	return `የአለርጂ መረጃ የቀረበው በዩኬ ህግ መሰረት በተያዘው <strong>ደንብ (EU) ቁጥር 1169/2011</strong> እና በ<strong>ናታሻ ህግ</strong> (የዩኬ የምግብ መረጃ ማሻሻያ 2019) መሰረት ሲሆን፣ ይህም ጥቅምት 1 ቀን 2021 ስራ ላይ ውሏል። ከላይ የተዘረዘሩት 14 አለርጂዎች በዩኬ የምግብ ህግ መሰረት መገለጽ ያለባቸው ናቸው። ይህ መረጃ መጋቢት 2026 ለመጨረሻ ጊዜ ተገምግሟል። GOTERA Foods Ltd የግብዓት እና የአለርጂ መረጃን አዘገጃጀቶች ወይም አቅራቢዎች ሲቀየሩ የማዘመን መብቱ የተጠበቀ ነው — የምግብ አለርጂ ካለብዎት እባክዎ በእያንዳንዱ ትዕዛዝ በፊት ይህን ገጽ ያረጋግጡ።`;
};
/**
* | output |
* | --- |
* | "Allergen information is provided in accordance with <strong>Regulation (EU) No 1169/2011</strong> as retained in UK law, and <strong>Natasha's Law</strong> (..." |
*
* @param {Allergens_Regulatory_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var allergens_regulatory_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_allergens_regulatory_note();
	return en_allergens_regulatory_note();
});
//#endregion
//#region src/routes/allergens/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const allergens = derived(() => [
			{
				name: allergens_item_gluten_name(),
				subtext: allergens_item_gluten_subtext(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_item_gluten_notes()
			},
			{
				name: allergens_item_crustaceans_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_eggs_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_fish_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_peanuts_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_soybeans_name(),
				status: "may",
				label: allergens_status_may_contain(),
				notes: allergens_item_soybeans_notes()
			},
			{
				name: allergens_item_milk_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_item_milk_notes()
			},
			{
				name: allergens_item_nuts_name(),
				subtext: allergens_item_nuts_subtext(),
				status: "may",
				label: allergens_status_may_contain(),
				notes: allergens_item_nuts_notes()
			},
			{
				name: allergens_item_celery_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_mustard_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_sesame_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_sulphites_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_lupin_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			},
			{
				name: allergens_item_molluscs_name(),
				status: "absent",
				label: allergens_status_not_present(),
				notes: allergens_notes_none()
			}
		]);
		$$renderer.push(`<div class="page-head svelte-1p9e3e4"><div class="container svelte-1p9e3e4"><span class="eyebrow svelte-1p9e3e4">${escape_html(allergens_eyebrow())}</span> <h1 class="svelte-1p9e3e4">${escape_html(allergens_page_title())}</h1> <p class="svelte-1p9e3e4">${escape_html(allergens_page_intro())}</p></div></div> <div class="content-wrapper svelte-1p9e3e4"><div class="container svelte-1p9e3e4"><div class="legal-notice svelte-1p9e3e4"><strong class="svelte-1p9e3e4">${escape_html(allergens_important_label())}</strong> ${escape_html(allergens_legal_notice())}</div> <div class="ingredient-block svelte-1p9e3e4"><div class="ingredient-head svelte-1p9e3e4"><h2 class="svelte-1p9e3e4">${escape_html(allergens_injera_title())}</h2> <span class="gluten-free-badge svelte-1p9e3e4">${escape_html(allergens_gluten_free_badge())}</span></div> <div class="ingredient-body svelte-1p9e3e4"><p class="ingredient-text svelte-1p9e3e4"><strong class="svelte-1p9e3e4">${escape_html(allergens_ingredients_label())}</strong> ${escape_html(allergens_injera_ingredients_list())}</p> <p class="ingredient-text layout-spacing svelte-1p9e3e4">${escape_html(allergens_injera_gluten_free_desc())}</p> <div class="key svelte-1p9e3e4"><div class="key-item svelte-1p9e3e4"><span class="dot dot-present svelte-1p9e3e4"></span>${escape_html(allergens_key_contains())}</div> <div class="key-item svelte-1p9e3e4"><span class="dot dot-may svelte-1p9e3e4"></span>${escape_html(allergens_key_may_contain())}</div> <div class="key-item svelte-1p9e3e4"><span class="dot dot-absent svelte-1p9e3e4"></span>${escape_html(allergens_key_not_present())}</div></div> <table class="allergen-table svelte-1p9e3e4"><thead><tr><th style="width: 40%" class="svelte-1p9e3e4">${escape_html(allergens_table_header_allergen())}</th><th style="width: 30%" class="svelte-1p9e3e4">${escape_html(allergens_table_header_status())}</th><th class="svelte-1p9e3e4">${escape_html(allergens_table_header_notes())}</th></tr></thead><tbody><!--[-->`);
		const each_array = ensure_array_like(allergens());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<tr class="svelte-1p9e3e4"><td class="svelte-1p9e3e4">${escape_html(item.name)} `);
			if (item.subtext) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<br/><span class="subtext svelte-1p9e3e4">(${escape_html(item.subtext)})</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></td><td class="svelte-1p9e3e4"><span${attr_class(`status-${stringify$1(item.status)}`, "svelte-1p9e3e4")}><span${attr_class(`dot dot-${stringify$1(item.status)}`, "svelte-1p9e3e4")}></span> ${escape_html(item.label)}</span></td><td class="note-text svelte-1p9e3e4">${escape_html(item.notes)}</td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table> <div class="cross-block svelte-1p9e3e4"><h3 class="svelte-1p9e3e4">${escape_html(allergens_cross_heading())}</h3> <p class="svelte-1p9e3e4">${html(allergens_cross_text())}</p></div> <div class="cert-block svelte-1p9e3e4"><div class="cert-icon svelte-1p9e3e4"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div> <div><h3 class="svelte-1p9e3e4">${escape_html(allergens_cert_heading())}</h3> <p class="svelte-1p9e3e4">${escape_html(allergens_cert_text())}</p></div></div></div></div> <div class="ingredient-block svelte-1p9e3e4"><div class="ingredient-head svelte-1p9e3e4"><h2 class="svelte-1p9e3e4">${escape_html(allergens_addons_heading())}</h2></div> <div class="ingredient-body svelte-1p9e3e4"><p class="addon-intro svelte-1p9e3e4">${escape_html(allergens_addons_intro())}</p> <div class="addon-placeholder svelte-1p9e3e4">${escape_html(allergens_addons_placeholder())}</div></div></div> <div class="contact-block svelte-1p9e3e4"><div><h3 class="svelte-1p9e3e4">${escape_html(allergens_contact_heading())}</h3> <p class="svelte-1p9e3e4">${escape_html(allergens_contact_text())}</p></div> <a href="mailto:hello@gotera.co.uk" class="btn svelte-1p9e3e4">${escape_html(allergens_contact_button())}</a></div> <div class="regulatory-note svelte-1p9e3e4">${html(allergens_regulatory_note())}</div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BaemTLEk.js.map
