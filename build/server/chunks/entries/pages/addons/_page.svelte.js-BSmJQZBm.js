import { a0 as head, $ as attr, a4 as ensure_array_like, a6 as escape_html, aa as attr_class, ag as store_mutate, ae as store_get, a7 as spread_props, T as derived, af as unsubscribe_stores } from '../../../chunks/server.js-qDPizQqb.js';
import { a as ADDON_CATEGORIES, d as ADDON_TAGS, c as canSellAlone, e as canSellWithInjera } from '../../../chunks/addons.js-B66jfCaP.js';
import { h as getLocale } from '../../../chunks/runtime.js-CbeSlHLA.js';
import { M as MediaQuery } from '../../../chunks/index-server2.js-C2dghAGm.js';
import { a as toast } from '../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../chunks/client.js-C3Iq_YCw.js';
import { p as page } from '../../../chunks/state.js-BA9nQlv7.js';
import { I as Icon } from '../../../chunks/Icon.js-Dm6aSBgb.js';
import { A as Arrow_right } from '../../../chunks/arrow-right.js-Dro87ZaY.js';
import { C as Check } from '../../../chunks/check.js-BvFzUyRW.js';
import { M as Minus } from '../../../chunks/minus.js-JH-UUVfm.js';
import { P as Plus } from '../../../chunks/plus.js-l9nzajpf.js';
import { S as Search } from '../../../chunks/search.js-B59c9lYY.js';
import { T as Trash_2 } from '../../../chunks/trash-2.js-CiUzWTiQ.js';
import { X } from '../../../chunks/x.js-TlRuKVU4.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import { b as superForm } from '../../../chunks/client2.js-P7rUUC6q.js';
import { P as PostcodeLookup } from '../../../chunks/postcode.svelte.js-C5Ik5PD0.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/routing.js-CJYUshuD.js';
import '../../../chunks/index-server.js-CaywUnPA.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-lGck33Tu.js';
import '../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/forms.js-qYr4b_YH.js';
import '../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../chunks/stores.js-B52XgJS0.js';

//#region node_modules/@lucide/svelte/dist/icons/flame.svelte
function Flame($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "flame" },
		props,
		{ iconNode: [["path", { "d": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/lock.svelte
function Lock($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "lock" },
		props,
		{ iconNode: [["rect", {
			"width": "18",
			"height": "11",
			"x": "3",
			"y": "11",
			"rx": "2",
			"ry": "2"
		}], ["path", { "d": "M7 11V7a5 5 0 0 1 10 0v4" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/shopping-bag.svelte
function Shopping_bag($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "shopping-bag" },
		props,
		{ iconNode: [
			["path", { "d": "M16 10a4 4 0 0 1-8 0" }],
			["path", { "d": "M3.103 6.034h17.794" }],
			["path", { "d": "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" }]
		] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/shop_meta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Meta_TitleInputs */
var en_shop_meta_title = () => {
	return `Add-ons — Ethiopian spices, sauces & pantry | GOTERA`;
};
var am_shop_meta_title = () => {
	return `ተጨማሪዎች — የኢትዮጵያ ቅመሞች፣ ወጦች እና የጓዳ እቃዎች | GOTERA`;
};
/**
* | output |
* | --- |
* | "Add-ons — Ethiopian spices, sauces & pantry \| GOTERA" |
*
* @param {Shop_Meta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_meta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_meta_title();
	return en_shop_meta_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_meta_description.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Meta_DescriptionInputs */
var en_shop_meta_description = () => {
	return `Berbere, mitmita, shiro and more, delivered across London. Order Ethiopian add-ons on their own or alongside your injera.`;
};
var am_shop_meta_description = () => {
	return `በርበሬ፣ ሚጥሚጣ፣ ሽሮ እና ሌሎችም በለንደን ውስጥ ይደርሳሉ። የኢትዮጵያ ተጨማሪዎችን ለብቻቸው ወይም ከእንጀራዎ ጋር ይዘዙ።`;
};
/**
* | output |
* | --- |
* | "Berbere, mitmita, shiro and more, delivered across London. Order Ethiopian add-ons on their own or alongside your injera." |
*
* @param {Shop_Meta_DescriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_meta_description = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_meta_description();
	return en_shop_meta_description();
});
//#endregion
//#region src/lib/paraglide/messages/shop_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_EyebrowInputs */
var en_shop_eyebrow = () => {
	return `The GOTERA pantry`;
};
var am_shop_eyebrow = () => {
	return `የGOTERA ጓዳ`;
};
/**
* | output |
* | --- |
* | "The GOTERA pantry" |
*
* @param {Shop_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_eyebrow();
	return en_shop_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/shop_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_TitleInputs */
var en_shop_title = () => {
	return `Add-ons`;
};
var am_shop_title = () => {
	return `ተጨማሪዎች`;
};
/**
* | output |
* | --- |
* | "Add-ons" |
*
* @param {Shop_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_title();
	return en_shop_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_IntroInputs */
var en_shop_intro = () => {
	return `Spices, sauces and pantry staples to go with your injera. Order them on their own, or add them to an injera delivery.`;
};
var am_shop_intro = () => {
	return `ከእንጀራዎ ጋር የሚሄዱ ቅመሞች፣ ወጦች እና የጓዳ እቃዎች። ለብቻቸው ይዘዙ ወይም ከእንጀራ ትዕዛዝዎ ጋር ያክሉ።`;
};
/**
* | output |
* | --- |
* | "Spices, sauces and pantry staples to go with your injera. Order them on their own, or add them to an injera delivery." |
*
* @param {Shop_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_intro();
	return en_shop_intro();
});
//#endregion
//#region src/lib/paraglide/messages/shop_promise_alone.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Promise_AloneInputs */
var en_shop_promise_alone = () => {
	return `Buy on their own`;
};
var am_shop_promise_alone = () => {
	return `ለብቻቸው ይግዙ`;
};
/**
* | output |
* | --- |
* | "Buy on their own" |
*
* @param {Shop_Promise_AloneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_promise_alone = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_promise_alone();
	return en_shop_promise_alone();
});
//#endregion
//#region src/lib/paraglide/messages/shop_promise_together.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Promise_TogetherInputs */
var en_shop_promise_together = () => {
	return `Or add to any injera order`;
};
var am_shop_promise_together = () => {
	return `ወይም ከማንኛውም የእንጀራ ትዕዛዝ ጋር ያክሉ`;
};
/**
* | output |
* | --- |
* | "Or add to any injera order" |
*
* @param {Shop_Promise_TogetherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_promise_together = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_promise_together();
	return en_shop_promise_together();
});
//#endregion
//#region src/lib/paraglide/messages/shop_search_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Search_LabelInputs */
var en_shop_search_label = () => {
	return `Search add-ons`;
};
var am_shop_search_label = () => {
	return `ተጨማሪዎችን ይፈልጉ`;
};
/**
* | output |
* | --- |
* | "Search add-ons" |
*
* @param {Shop_Search_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_search_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_search_label();
	return en_shop_search_label();
});
//#endregion
//#region src/lib/paraglide/messages/shop_search_placeholder.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Search_PlaceholderInputs */
var en_shop_search_placeholder = () => {
	return `Search berbere, shiro, kits…`;
};
var am_shop_search_placeholder = () => {
	return `በርበሬ፣ ሽሮ፣ ኪቶች ይፈልጉ…`;
};
/**
* | output |
* | --- |
* | "Search berbere, shiro, kits…" |
*
* @param {Shop_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_search_placeholder = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_search_placeholder();
	return en_shop_search_placeholder();
});
//#endregion
//#region src/lib/paraglide/messages/shop_clear_search.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Clear_SearchInputs */
var en_shop_clear_search = () => {
	return `Clear search`;
};
var am_shop_clear_search = () => {
	return `ፍለጋውን አጽዳ`;
};
/**
* | output |
* | --- |
* | "Clear search" |
*
* @param {Shop_Clear_SearchInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_clear_search = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_clear_search();
	return en_shop_clear_search();
});
//#endregion
//#region src/lib/paraglide/messages/shop_filter_sold.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Filter_SoldInputs */
var en_shop_filter_sold = () => {
	return `How it's sold`;
};
var am_shop_filter_sold = () => {
	return `እንዴት እንደሚሸጥ`;
};
/**
* | output |
* | --- |
* | "How it's sold" |
*
* @param {Shop_Filter_SoldInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_filter_sold = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_filter_sold();
	return en_shop_filter_sold();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sold_all.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sold_AllInputs */
var en_shop_sold_all = () => {
	return `Everything`;
};
var am_shop_sold_all = () => {
	return `ሁሉም`;
};
/**
* | output |
* | --- |
* | "Everything" |
*
* @param {Shop_Sold_AllInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sold_all = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sold_all();
	return en_shop_sold_all();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sold_alone.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sold_AloneInputs */
var en_shop_sold_alone = () => {
	return `On their own`;
};
var am_shop_sold_alone = () => {
	return `ለብቻቸው`;
};
/**
* | output |
* | --- |
* | "On their own" |
*
* @param {Shop_Sold_AloneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sold_alone = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sold_alone();
	return en_shop_sold_alone();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sold_injera.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sold_InjeraInputs */
var en_shop_sold_injera = () => {
	return `With injera`;
};
var am_shop_sold_injera = () => {
	return `ከእንጀራ ጋር`;
};
/**
* | output |
* | --- |
* | "With injera" |
*
* @param {Shop_Sold_InjeraInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sold_injera = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sold_injera();
	return en_shop_sold_injera();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sort_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sort_LabelInputs */
var en_shop_sort_label = () => {
	return `Sort`;
};
var am_shop_sort_label = () => {
	return `ደርድር`;
};
/**
* | output |
* | --- |
* | "Sort" |
*
* @param {Shop_Sort_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sort_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sort_label();
	return en_shop_sort_label();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sort_featured.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sort_FeaturedInputs */
var en_shop_sort_featured = () => {
	return `Featured`;
};
var am_shop_sort_featured = () => {
	return `ተመራጭ`;
};
/**
* | output |
* | --- |
* | "Featured" |
*
* @param {Shop_Sort_FeaturedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sort_featured = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sort_featured();
	return en_shop_sort_featured();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sort_price_asc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sort_Price_AscInputs */
var en_shop_sort_price_asc = () => {
	return `Price: low to high`;
};
var am_shop_sort_price_asc = () => {
	return `ዋጋ፦ ከዝቅተኛ ወደ ከፍተኛ`;
};
/**
* | output |
* | --- |
* | "Price: low to high" |
*
* @param {Shop_Sort_Price_AscInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sort_price_asc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sort_price_asc();
	return en_shop_sort_price_asc();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sort_price_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sort_Price_DescInputs */
var en_shop_sort_price_desc = () => {
	return `Price: high to low`;
};
var am_shop_sort_price_desc = () => {
	return `ዋጋ፦ ከከፍተኛ ወደ ዝቅተኛ`;
};
/**
* | output |
* | --- |
* | "Price: high to low" |
*
* @param {Shop_Sort_Price_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sort_price_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sort_price_desc();
	return en_shop_sort_price_desc();
});
//#endregion
//#region src/lib/paraglide/messages/shop_sort_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Sort_NameInputs */
var en_shop_sort_name = () => {
	return `Name`;
};
var am_shop_sort_name = () => {
	return `ስም`;
};
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Shop_Sort_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_sort_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_sort_name();
	return en_shop_sort_name();
});
//#endregion
//#region src/lib/paraglide/messages/shop_filter_type.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Filter_TypeInputs */
var en_shop_filter_type = () => {
	return `Type`;
};
var am_shop_filter_type = () => {
	return `ዓይነት`;
};
/**
* | output |
* | --- |
* | "Type" |
*
* @param {Shop_Filter_TypeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_filter_type = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_filter_type();
	return en_shop_filter_type();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_all.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_AllInputs */
var en_shop_type_all = () => {
	return `All types`;
};
var am_shop_type_all = () => {
	return `ሁሉም ዓይነቶች`;
};
/**
* | output |
* | --- |
* | "All types" |
*
* @param {Shop_Type_AllInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_all = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_all();
	return en_shop_type_all();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_spice.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_SpiceInputs */
var en_shop_type_spice = () => {
	return `Spices`;
};
var am_shop_type_spice = () => {
	return `ቅመሞች`;
};
/**
* | output |
* | --- |
* | "Spices" |
*
* @param {Shop_Type_SpiceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_spice = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_spice();
	return en_shop_type_spice();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_sauce.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_SauceInputs */
var en_shop_type_sauce = () => {
	return `Sauces`;
};
var am_shop_type_sauce = () => {
	return `ወጦች`;
};
/**
* | output |
* | --- |
* | "Sauces" |
*
* @param {Shop_Type_SauceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_sauce = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_sauce();
	return en_shop_type_sauce();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_pantry.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_PantryInputs */
var en_shop_type_pantry = () => {
	return `Pantry`;
};
var am_shop_type_pantry = () => {
	return `የጓዳ እቃዎች`;
};
/**
* | output |
* | --- |
* | "Pantry" |
*
* @param {Shop_Type_PantryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_pantry = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_pantry();
	return en_shop_type_pantry();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_kit.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_KitInputs */
var en_shop_type_kit = () => {
	return `Kits`;
};
var am_shop_type_kit = () => {
	return `ኪቶች`;
};
/**
* | output |
* | --- |
* | "Kits" |
*
* @param {Shop_Type_KitInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_kit = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_kit();
	return en_shop_type_kit();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_drink.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_DrinkInputs */
var en_shop_type_drink = () => {
	return `Drinks`;
};
var am_shop_type_drink = () => {
	return `መጠጦች`;
};
/**
* | output |
* | --- |
* | "Drinks" |
*
* @param {Shop_Type_DrinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_drink = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_drink();
	return en_shop_type_drink();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_snack.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_SnackInputs */
var en_shop_type_snack = () => {
	return `Snacks`;
};
var am_shop_type_snack = () => {
	return `መክሰስ`;
};
/**
* | output |
* | --- |
* | "Snacks" |
*
* @param {Shop_Type_SnackInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_snack = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_snack();
	return en_shop_type_snack();
});
//#endregion
//#region src/lib/paraglide/messages/shop_type_bundle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Type_BundleInputs */
var en_shop_type_bundle = () => {
	return `Bundles`;
};
var am_shop_type_bundle = () => {
	return `ጥቅሎች`;
};
/**
* | output |
* | --- |
* | "Bundles" |
*
* @param {Shop_Type_BundleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_type_bundle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_type_bundle();
	return en_shop_type_bundle();
});
//#endregion
//#region src/lib/paraglide/messages/shop_filter_dietary.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Filter_DietaryInputs */
var en_shop_filter_dietary = () => {
	return `Dietary`;
};
var am_shop_filter_dietary = () => {
	return `የአመጋገብ ምርጫ`;
};
/**
* | output |
* | --- |
* | "Dietary" |
*
* @param {Shop_Filter_DietaryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_filter_dietary = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_filter_dietary();
	return en_shop_filter_dietary();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_vegan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_VeganInputs */
var en_shop_tag_vegan = () => {
	return `Vegan`;
};
var am_shop_tag_vegan = () => {
	return `ቪጋን`;
};
/**
* | output |
* | --- |
* | "Vegan" |
*
* @param {Shop_Tag_VeganInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_vegan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_vegan();
	return en_shop_tag_vegan();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_gluten_free.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_Gluten_FreeInputs */
var en_shop_tag_gluten_free = () => {
	return `Gluten free`;
};
var am_shop_tag_gluten_free = () => {
	return `ከግሉተን ነፃ`;
};
/**
* | output |
* | --- |
* | "Gluten free" |
*
* @param {Shop_Tag_Gluten_FreeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_gluten_free = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_gluten_free();
	return en_shop_tag_gluten_free();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_spicy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_SpicyInputs */
var en_shop_tag_spicy = () => {
	return `Spicy`;
};
var am_shop_tag_spicy = () => {
	return `ቅመም ያለው`;
};
/**
* | output |
* | --- |
* | "Spicy" |
*
* @param {Shop_Tag_SpicyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_spicy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_spicy();
	return en_shop_tag_spicy();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_organic.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_OrganicInputs */
var en_shop_tag_organic = () => {
	return `Organic`;
};
var am_shop_tag_organic = () => {
	return `ኦርጋኒክ`;
};
/**
* | output |
* | --- |
* | "Organic" |
*
* @param {Shop_Tag_OrganicInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_organic = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_organic();
	return en_shop_tag_organic();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_nut_free.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_Nut_FreeInputs */
var en_shop_tag_nut_free = () => {
	return `Nut free`;
};
var am_shop_tag_nut_free = () => {
	return `ከለውዝ ነፃ`;
};
/**
* | output |
* | --- |
* | "Nut free" |
*
* @param {Shop_Tag_Nut_FreeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_nut_free = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_nut_free();
	return en_shop_tag_nut_free();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_dairy_free.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_Dairy_FreeInputs */
var en_shop_tag_dairy_free = () => {
	return `Dairy free`;
};
var am_shop_tag_dairy_free = () => {
	return `ከወተት ተዋጽኦ ነፃ`;
};
/**
* | output |
* | --- |
* | "Dairy free" |
*
* @param {Shop_Tag_Dairy_FreeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_dairy_free = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_dairy_free();
	return en_shop_tag_dairy_free();
});
//#endregion
//#region src/lib/paraglide/messages/shop_tag_handmade.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Tag_HandmadeInputs */
var en_shop_tag_handmade = () => {
	return `Handmade`;
};
var am_shop_tag_handmade = () => {
	return `በእጅ የተሰራ`;
};
/**
* | output |
* | --- |
* | "Handmade" |
*
* @param {Shop_Tag_HandmadeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_tag_handmade = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_tag_handmade();
	return en_shop_tag_handmade();
});
//#endregion
//#region src/lib/paraglide/messages/shop_results_one.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Shop_Results_OneInputs */
var en_shop_results_one = (i) => {
	return `${i?.count} add-on`;
};
var am_shop_results_one = (i) => {
	return `${i?.count} ተጨማሪ`;
};
/**
* | output |
* | --- |
* | "{count} add-on" |
*
* @param {Shop_Results_OneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_results_one = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_results_one(inputs);
	return en_shop_results_one(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_results_other.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Shop_Results_OtherInputs */
var en_shop_results_other = (i) => {
	return `${i?.count} add-ons`;
};
var am_shop_results_other = (i) => {
	return `${i?.count} ተጨማሪዎች`;
};
/**
* | output |
* | --- |
* | "{count} add-ons" |
*
* @param {Shop_Results_OtherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_results_other = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_results_other(inputs);
	return en_shop_results_other(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_clear_filters.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Clear_FiltersInputs */
var en_shop_clear_filters = () => {
	return `Clear filters`;
};
var am_shop_clear_filters = () => {
	return `ማጣሪያዎችን አጽዳ`;
};
/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {Shop_Clear_FiltersInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_clear_filters = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_clear_filters();
	return en_shop_clear_filters();
});
//#endregion
//#region src/lib/paraglide/messages/shop_empty_catalogue_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Empty_Catalogue_TitleInputs */
var en_shop_empty_catalogue_title = () => {
	return `The pantry is being restocked`;
};
var am_shop_empty_catalogue_title = () => {
	return `ጓዳው እየተሞላ ነው`;
};
/**
* | output |
* | --- |
* | "The pantry is being restocked" |
*
* @param {Shop_Empty_Catalogue_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_empty_catalogue_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_empty_catalogue_title();
	return en_shop_empty_catalogue_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_empty_catalogue_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Empty_Catalogue_BodyInputs */
var en_shop_empty_catalogue_body = () => {
	return `New add-ons are on the way. In the meantime, our injera is ready to order.`;
};
var am_shop_empty_catalogue_body = () => {
	return `አዳዲስ ተጨማሪዎች በቅርቡ ይመጣሉ። እስከዚያው እንጀራችን ለትዕዛዝ ዝግጁ ነው።`;
};
/**
* | output |
* | --- |
* | "New add-ons are on the way. In the meantime, our injera is ready to order." |
*
* @param {Shop_Empty_Catalogue_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_empty_catalogue_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_empty_catalogue_body();
	return en_shop_empty_catalogue_body();
});
//#endregion
//#region src/lib/paraglide/messages/shop_browse_injera.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Browse_InjeraInputs */
var en_shop_browse_injera = () => {
	return `Order injera`;
};
var am_shop_browse_injera = () => {
	return `እንጀራ ይዘዙ`;
};
/**
* | output |
* | --- |
* | "Order injera" |
*
* @param {Shop_Browse_InjeraInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_browse_injera = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_browse_injera();
	return en_shop_browse_injera();
});
//#endregion
//#region src/lib/paraglide/messages/shop_no_results_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_No_Results_TitleInputs */
var en_shop_no_results_title = () => {
	return `Nothing matches those filters`;
};
var am_shop_no_results_title = () => {
	return `ከማጣሪያዎቹ ጋር የሚዛመድ የለም`;
};
/**
* | output |
* | --- |
* | "Nothing matches those filters" |
*
* @param {Shop_No_Results_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_no_results_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_no_results_title();
	return en_shop_no_results_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_no_results_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_No_Results_BodyInputs */
var en_shop_no_results_body = () => {
	return `Try a different type or remove a dietary filter.`;
};
var am_shop_no_results_body = () => {
	return `ሌላ ዓይነት ይሞክሩ ወይም የአመጋገብ ማጣሪያ ያስወግዱ።`;
};
/**
* | output |
* | --- |
* | "Try a different type or remove a dietary filter." |
*
* @param {Shop_No_Results_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_no_results_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_no_results_body();
	return en_shop_no_results_body();
});
//#endregion
//#region src/lib/paraglide/messages/shop_featured.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_FeaturedInputs */
var en_shop_featured = () => {
	return `Featured`;
};
var am_shop_featured = () => {
	return `ተመራጭ`;
};
/**
* | output |
* | --- |
* | "Featured" |
*
* @param {Shop_FeaturedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_featured = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_featured();
	return en_shop_featured();
});
//#endregion
//#region src/lib/paraglide/messages/shop_with_injera_only.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_With_Injera_OnlyInputs */
var en_shop_with_injera_only = () => {
	return `With injera only`;
};
var am_shop_with_injera_only = () => {
	return `ከእንጀራ ጋር ብቻ`;
};
/**
* | output |
* | --- |
* | "With injera only" |
*
* @param {Shop_With_Injera_OnlyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_with_injera_only = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_with_injera_only();
	return en_shop_with_injera_only();
});
//#endregion
//#region src/lib/paraglide/messages/shop_alone_only.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Alone_OnlyInputs */
var en_shop_alone_only = () => {
	return `Ships on its own`;
};
var am_shop_alone_only = () => {
	return `ለብቻው ይላካል`;
};
/**
* | output |
* | --- |
* | "Ships on its own" |
*
* @param {Shop_Alone_OnlyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_alone_only = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_alone_only();
	return en_shop_alone_only();
});
//#endregion
//#region src/lib/paraglide/messages/shop_heat.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ level: NonNullable<unknown>, max: NonNullable<unknown> }} Shop_HeatInputs */
var en_shop_heat = (i) => {
	return `Heat ${i?.level} of ${i?.max}`;
};
var am_shop_heat = (i) => {
	return `ቅመም ${i?.level} ከ${i?.max}`;
};
/**
* | output |
* | --- |
* | "Heat {level} of {max}" |
*
* @param {Shop_HeatInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_heat = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_heat(inputs);
	return en_shop_heat(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_ingredients.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_IngredientsInputs */
var en_shop_ingredients = () => {
	return `Ingredients & allergens`;
};
var am_shop_ingredients = () => {
	return `ግብዓቶች እና አለርጂዎች`;
};
/**
* | output |
* | --- |
* | "Ingredients & allergens" |
*
* @param {Shop_IngredientsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_ingredients = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_ingredients();
	return en_shop_ingredients();
});
//#endregion
//#region src/lib/paraglide/messages/shop_add.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_AddInputs */
var en_shop_add = () => {
	return `Add`;
};
var am_shop_add = () => {
	return `አክል`;
};
/**
* | output |
* | --- |
* | "Add" |
*
* @param {Shop_AddInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_add = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_add();
	return en_shop_add();
});
//#endregion
//#region src/lib/paraglide/messages/shop_quantity_for.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Shop_Quantity_ForInputs */
var en_shop_quantity_for = (i) => {
	return `Quantity of ${i?.name}`;
};
var am_shop_quantity_for = (i) => {
	return `የ${i?.name} ብዛት`;
};
/**
* | output |
* | --- |
* | "Quantity of {name}" |
*
* @param {Shop_Quantity_ForInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_quantity_for = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_quantity_for(inputs);
	return en_shop_quantity_for(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_decrease.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_DecreaseInputs */
var en_shop_decrease = () => {
	return `Remove one`;
};
var am_shop_decrease = () => {
	return `አንድ ቀንስ`;
};
/**
* | output |
* | --- |
* | "Remove one" |
*
* @param {Shop_DecreaseInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_decrease = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_decrease();
	return en_shop_decrease();
});
//#endregion
//#region src/lib/paraglide/messages/shop_increase.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_IncreaseInputs */
var en_shop_increase = () => {
	return `Add one`;
};
var am_shop_increase = () => {
	return `አንድ ጨምር`;
};
/**
* | output |
* | --- |
* | "Add one" |
*
* @param {Shop_IncreaseInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_increase = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_increase();
	return en_shop_increase();
});
//#endregion
//#region src/lib/paraglide/messages/shop_together_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Together_EyebrowInputs */
var en_shop_together_eyebrow = () => {
	return `Better together`;
};
var am_shop_together_eyebrow = () => {
	return `አብረው ይሻላሉ`;
};
/**
* | output |
* | --- |
* | "Better together" |
*
* @param {Shop_Together_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_together_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_together_eyebrow();
	return en_shop_together_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/shop_together_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Together_TitleInputs */
var en_shop_together_title = () => {
	return `Pair them with fresh injera`;
};
var am_shop_together_title = () => {
	return `ከትኩስ እንጀራ ጋር ያጣምሯቸው`;
};
/**
* | output |
* | --- |
* | "Pair them with fresh injera" |
*
* @param {Shop_Together_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_together_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_together_title();
	return en_shop_together_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_together_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Together_BodyInputs */
var en_shop_together_body = () => {
	return `Add any of these to a one-off order or subscription and they arrive with your injera — same delivery, no extra trip.`;
};
var am_shop_together_body = () => {
	return `ከእነዚህ ማንኛውንም ወደ አንድ ጊዜ ትዕዛዝ ወይም ምዝገባ ያክሉ፣ ከእንጀራዎ ጋር ይደርሳሉ — በአንድ ማድረሻ።`;
};
/**
* | output |
* | --- |
* | "Add any of these to a one-off order or subscription and they arrive with your injera — same delivery, no extra trip." |
*
* @param {Shop_Together_BodyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_together_body = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_together_body();
	return en_shop_together_body();
});
//#endregion
//#region src/lib/paraglide/messages/shop_together_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Together_CtaInputs */
var en_shop_together_cta = () => {
	return `Choose your injera`;
};
var am_shop_together_cta = () => {
	return `እንጀራዎን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose your injera" |
*
* @param {Shop_Together_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_together_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_together_cta();
	return en_shop_together_cta();
});
//#endregion
//#region src/lib/paraglide/messages/shop_basket_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Basket_TitleInputs */
var en_shop_basket_title = () => {
	return `Your basket`;
};
var am_shop_basket_title = () => {
	return `ቅርጫትዎ`;
};
/**
* | output |
* | --- |
* | "Your basket" |
*
* @param {Shop_Basket_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_basket_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_basket_title();
	return en_shop_basket_title();
});
//#endregion
//#region src/lib/paraglide/messages/shop_basket_empty.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Basket_EmptyInputs */
var en_shop_basket_empty = () => {
	return `Your basket is empty. Add something tasty.`;
};
var am_shop_basket_empty = () => {
	return `ቅርጫትዎ ባዶ ነው። የሚጣፍጥ ነገር ያክሉ።`;
};
/**
* | output |
* | --- |
* | "Your basket is empty. Add something tasty." |
*
* @param {Shop_Basket_EmptyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_basket_empty = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_basket_empty();
	return en_shop_basket_empty();
});
//#endregion
//#region src/lib/paraglide/messages/shop_remove.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Shop_RemoveInputs */
var en_shop_remove = (i) => {
	return `Remove ${i?.name}`;
};
var am_shop_remove = (i) => {
	return `${i?.name} አስወግድ`;
};
/**
* | output |
* | --- |
* | "Remove {name}" |
*
* @param {Shop_RemoveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_remove = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_remove(inputs);
	return en_shop_remove(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_subtotal.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_SubtotalInputs */
var en_shop_subtotal = () => {
	return `Subtotal`;
};
var am_shop_subtotal = () => {
	return `ንዑስ ድምር`;
};
/**
* | output |
* | --- |
* | "Subtotal" |
*
* @param {Shop_SubtotalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_subtotal = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_subtotal();
	return en_shop_subtotal();
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_alone.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Checkout_AloneInputs */
var en_shop_checkout_alone = () => {
	return `Buy add-ons on their own`;
};
var am_shop_checkout_alone = () => {
	return `ተጨማሪዎችን ለብቻቸው ይግዙ`;
};
/**
* | output |
* | --- |
* | "Buy add-ons on their own" |
*
* @param {Shop_Checkout_AloneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_alone = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_alone();
	return en_shop_checkout_alone();
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_alone_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Shop_Checkout_Alone_NoteInputs */
var en_shop_checkout_alone_note = (i) => {
	return `Delivered in London on ${i?.date}.`;
};
var am_shop_checkout_alone_note = (i) => {
	return `በ${i?.date} በለንደን ይደርሳል።`;
};
/**
* | output |
* | --- |
* | "Delivered in London on {date}." |
*
* @param {Shop_Checkout_Alone_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_alone_note = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_alone_note(inputs);
	return en_shop_checkout_alone_note(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_alone_blocked.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ names: NonNullable<unknown> }} Shop_Checkout_Alone_BlockedInputs */
var en_shop_checkout_alone_blocked = (i) => {
	return `${i?.names} can only be added to an injera order. Remove it to buy the rest on their own.`;
};
var am_shop_checkout_alone_blocked = (i) => {
	return `${i?.names} ከእንጀራ ትዕዛዝ ጋር ብቻ ነው የሚጨመረው። የቀሩትን ለብቻ ለመግዛት ያስወግዱት።`;
};
/**
* | output |
* | --- |
* | "{names} can only be added to an injera order. Remove it to buy the rest on their own." |
*
* @param {Shop_Checkout_Alone_BlockedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_alone_blocked = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_alone_blocked(inputs);
	return en_shop_checkout_alone_blocked(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_or.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_OrInputs */
var en_shop_or = () => {
	return `or`;
};
var am_shop_or = () => {
	return `ወይም`;
};
/**
* | output |
* | --- |
* | "or" |
*
* @param {Shop_OrInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_or = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_or();
	return en_shop_or();
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_injera.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Checkout_InjeraInputs */
var en_shop_checkout_injera = () => {
	return `Add to an injera order`;
};
var am_shop_checkout_injera = () => {
	return `ወደ እንጀራ ትዕዛዝ ያክሉ`;
};
/**
* | output |
* | --- |
* | "Add to an injera order" |
*
* @param {Shop_Checkout_InjeraInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_injera = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_injera();
	return en_shop_checkout_injera();
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_injera_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Shop_Checkout_Injera_NoteInputs */
var en_shop_checkout_injera_note = () => {
	return `Pick a one-off order or subscription next — these come along with it.`;
};
var am_shop_checkout_injera_note = () => {
	return `ቀጥሎ የአንድ ጊዜ ትዕዛዝ ወይም ምዝገባ ይምረጡ — እነዚህ አብረው ይመጣሉ።`;
};
/**
* | output |
* | --- |
* | "Pick a one-off order or subscription next — these come along with it." |
*
* @param {Shop_Checkout_Injera_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_injera_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_injera_note();
	return en_shop_checkout_injera_note();
});
//#endregion
//#region src/lib/paraglide/messages/shop_checkout_injera_excluded.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ names: NonNullable<unknown> }} Shop_Checkout_Injera_ExcludedInputs */
var en_shop_checkout_injera_excluded = (i) => {
	return `${i?.names} ships on its own, so it won't be carried over.`;
};
var am_shop_checkout_injera_excluded = (i) => {
	return `${i?.names} ለብቻው ስለሚላክ አብሮ አይወሰድም።`;
};
/**
* | output |
* | --- |
* | "{names} ships on its own, so it won't be carried over." |
*
* @param {Shop_Checkout_Injera_ExcludedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_checkout_injera_excluded = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_checkout_injera_excluded(inputs);
	return en_shop_checkout_injera_excluded(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_items_one.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Shop_Items_OneInputs */
var en_shop_items_one = (i) => {
	return `${i?.count} item`;
};
var am_shop_items_one = (i) => {
	return `${i?.count} እቃ`;
};
/**
* | output |
* | --- |
* | "{count} item" |
*
* @param {Shop_Items_OneInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_items_one = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_items_one(inputs);
	return en_shop_items_one(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/shop_items_other.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Shop_Items_OtherInputs */
var en_shop_items_other = (i) => {
	return `${i?.count} items`;
};
var am_shop_items_other = (i) => {
	return `${i?.count} እቃዎች`;
};
/**
* | output |
* | --- |
* | "{count} items" |
*
* @param {Shop_Items_OtherInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var shop_items_other = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_shop_items_other(inputs);
	return en_shop_items_other(inputs);
});
//#endregion
//#region src/routes/addons/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const categoryLabel = (c) => ({
			spice: shop_type_spice(),
			sauce: shop_type_sauce(),
			pantry: shop_type_pantry(),
			kit: shop_type_kit(),
			drink: shop_type_drink(),
			snack: shop_type_snack(),
			bundle: shop_type_bundle()
		})[c];
		const tagLabel = (t) => ({
			vegan: shop_tag_vegan(),
			gluten_free: shop_tag_gluten_free(),
			spicy: shop_tag_spicy(),
			organic: shop_tag_organic(),
			nut_free: shop_tag_nut_free(),
			dairy_free: shop_tag_dairy_free(),
			handmade: shop_tag_handmade()
		})[t];
		const itemsLabel = (count) => count === 1 ? shop_items_one({ count }) : shop_items_other({ count });
		const resultsLabel = (count) => count === 1 ? shop_results_one({ count }) : shop_results_other({ count });
		const gbp = new Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP"
		});
		const money = (pence) => gbp.format(pence / 100);
		const deliveryLabel = derived(() => new Intl.DateTimeFormat("en-GB", {
			weekday: "long",
			day: "numeric",
			month: "long"
		}).format(/* @__PURE__ */ new Date(`${data.nextDelivery}T12:00:00`)));
		const soldOptions = [
			{
				value: "all",
				label: shop_sold_all
			},
			{
				value: "alone",
				label: shop_sold_alone
			},
			{
				value: "injera",
				label: shop_sold_injera
			}
		];
		const SORTS = [
			"featured",
			"price-asc",
			"price-desc",
			"name"
		];
		const params = page.url.searchParams;
		let query = params.get("q") ?? "";
		let category = ADDON_CATEGORIES.includes(params.get("type") ?? "") ? params.get("type") : "all";
		let sold = ["alone", "injera"].find((s) => s === params.get("sold")) ?? "all";
		let activeTags = (params.get("tags") ?? "").split(",").filter((t) => ADDON_TAGS.includes(t));
		let sort = SORTS.find((s) => s === params.get("sort")) ?? "featured";
		const presentCategories = derived(() => ADDON_CATEGORIES.filter((c) => data.items.some((i) => i.category === c)));
		const presentTags = derived(() => ADDON_TAGS.filter((t) => data.items.some((i) => i.tags.includes(t))));
		const filtersActive = derived(() => query.trim() !== "" || category !== "all" || sold !== "all" || activeTags.length > 0);
		const visible = derived(() => {
			const q = query.trim().toLowerCase();
			const list = data.items.filter((i) => {
				if (category !== "all" && i.category !== category) return false;
				if (sold === "alone" && !canSellAlone(i)) return false;
				if (sold === "injera" && !canSellWithInjera(i)) return false;
				if (activeTags.some((t) => !i.tags.includes(t))) return false;
				if (q) {
					if (![
						i.name,
						i.description,
						i.unitLabel,
						i.ingredients
					].filter(Boolean).join(" ").toLowerCase().includes(q)) return false;
				}
				return true;
			});
			if (sort === "price-asc") return list.toSorted((a, b) => a.pricePence - b.pricePence);
			if (sort === "price-desc") return list.toSorted((a, b) => b.pricePence - a.pricePence);
			if (sort === "name") return list.toSorted((a, b) => a.name.localeCompare(b.name));
			return list;
		});
		let basket = {};
		const qtyIn = (id) => basket[id] ?? 0;
		const lines = derived(() => Object.entries(basket).map(([id, quantity]) => ({
			item: data.items.find((i) => i.id === id),
			quantity
		})).filter((l) => l.item));
		const lineCount = derived(() => lines().reduce((n, l) => n + l.quantity, 0));
		const subtotal = derived(() => lines().reduce((sum, l) => sum + l.item.pricePence * l.quantity, 0));
		const injeraOnlyLines = derived(() => lines().filter((l) => !canSellAlone(l.item)));
		const aloneOnlyLines = derived(() => lines().filter((l) => !canSellWithInjera(l.item)));
		const canCheckoutAlone = derived(() => lines().length > 0 && injeraOnlyLines().length === 0);
		const injeraLines = derived(() => lines().filter((l) => canSellWithInjera(l.item)));
		const injeraHref = derived(() => `/subscribe?addons=${injeraLines().map((l) => `${l.item.id}:${l.quantity}`).join(",")}`);
		const wide = new MediaQuery("min-width: 961px", true);
		let basketOpen = false;
		const { form} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: false,
			onSubmit({ jsonData }) {
				jsonData({
					...store_get($$store_subs ??= {}, "$form", form),
					items: lines().map((l) => ({
						id: l.item.id,
						quantity: l.quantity
					}))
				});
			},
			onUpdated({ form: f }) {
				const msg = f.message;
				if (msg?.type === "error") toast.error(msg.text);
			}
		});
		const postcode = new PostcodeLookup((match) => {
			store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).latitude = match?.latitude);
			store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).longitude = match?.longitude);
		});
		function basketPanel($$renderer) {
			$$renderer.push(`<div class="basket__head svelte-13gvjzo"><h2 class="svelte-13gvjzo">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(shop_basket_title())}`);
			$$renderer.push(`<!--]--></h2> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (lines().length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="basket__empty svelte-13gvjzo">`);
				Shopping_bag($$renderer, {
					size: 28,
					strokeWidth: 1.2
				});
				$$renderer.push(`<!----> <p class="svelte-13gvjzo">${escape_html(shop_basket_empty())}</p></div>`);
			} else {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<ul class="lines svelte-13gvjzo"><!--[-->`);
				const each_array = ensure_array_like(lines());
				for (let $$index_7 = 0, $$length = each_array.length; $$index_7 < $$length; $$index_7++) {
					let { item, quantity } = each_array[$$index_7];
					$$renderer.push(`<li class="line svelte-13gvjzo"><div class="line__thumb svelte-13gvjzo">`);
					if (item.image) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<img${attr("src", item.image)} alt="" class="svelte-13gvjzo"/>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span class="svelte-13gvjzo">${escape_html(item.name.charAt(0))}</span>`);
					}
					$$renderer.push(`<!--]--></div> <div class="line__info svelte-13gvjzo"><span class="line__name svelte-13gvjzo">${escape_html(item.name)}</span> `);
					if (!canSellAlone(item)) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="line__note svelte-13gvjzo">`);
						Lock($$renderer, { size: 10 });
						$$renderer.push(`<!----> ${escape_html(shop_with_injera_only())}</span>`);
					} else if (item.unitLabel) {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`<span class="line__note svelte-13gvjzo">${escape_html(item.unitLabel)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <div class="stepper stepper--sm svelte-13gvjzo"><button type="button"${attr("aria-label", shop_decrease())} class="svelte-13gvjzo">`);
					Minus($$renderer, { size: 12 });
					$$renderer.push(`<!----></button> <span class="svelte-13gvjzo">${escape_html(quantity)}</span> <button type="button"${attr("aria-label", shop_increase())}${attr("disabled", quantity >= 20, true)} class="svelte-13gvjzo">`);
					Plus($$renderer, { size: 12 });
					$$renderer.push(`<!----></button></div></div> <div class="line__end svelte-13gvjzo"><span>${escape_html(money(item.pricePence * quantity))}</span> <button type="button" class="icon-btn svelte-13gvjzo"${attr("aria-label", shop_remove({ name: item.name }))}>`);
					Trash_2($$renderer, { size: 14 });
					$$renderer.push(`<!----></button></div></li>`);
				}
				$$renderer.push(`<!--]--></ul> <div class="totals svelte-13gvjzo"><span>${escape_html(shop_subtotal())}</span> <strong class="svelte-13gvjzo">${escape_html(money(subtotal()))}</strong></div> <div class="paths svelte-13gvjzo"><div class="path"><button type="button" class="btn btn--block svelte-13gvjzo"${attr("disabled", !canCheckoutAlone(), true)}>${escape_html(shop_checkout_alone())} `);
				Arrow_right($$renderer, { size: 14 });
				$$renderer.push(`<!----></button> `);
				if (injeraOnlyLines().length > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="path__note svelte-13gvjzo">${escape_html(shop_checkout_alone_blocked({ names: injeraOnlyLines().map((l) => l.item.name).join(", ") }))}</p>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<p class="path__note svelte-13gvjzo">${escape_html(shop_checkout_alone_note({ date: deliveryLabel() }))}</p>`);
				}
				$$renderer.push(`<!--]--></div> <div class="or svelte-13gvjzo"><span>${escape_html(shop_or())}</span></div> <div class="path">`);
				if (injeraLines().length > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a class="btn-outline btn--block svelte-13gvjzo"${attr("href", injeraHref())}>${escape_html(shop_checkout_injera())} `);
					Arrow_right($$renderer, { size: 14 });
					$$renderer.push(`<!----></a>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button type="button" class="btn-outline btn--block svelte-13gvjzo" disabled="">${escape_html(shop_checkout_injera())}</button>`);
				}
				$$renderer.push(`<!--]--> `);
				if (aloneOnlyLines().length > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="path__note svelte-13gvjzo">${escape_html(shop_checkout_injera_excluded({ names: aloneOnlyLines().map((l) => l.item.name).join(", ") }))}</p>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<p class="path__note svelte-13gvjzo">${escape_html(shop_checkout_injera_note())}</p>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		head("13gvjzo", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(shop_meta_title())}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", shop_meta_description())}/>`);
		});
		$$renderer.push(`<datalist${attr("id", postcode.listId)}><!--[-->`);
		const each_array_1 = ensure_array_like(postcode.suggestions);
		for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
			let s = each_array_1[$$index];
			$$renderer.option({ value: s }, ($$renderer) => {});
		}
		$$renderer.push(`<!--]--></datalist> <div class="shop svelte-13gvjzo"><header class="shop-hero svelte-13gvjzo"><div class="container svelte-13gvjzo"><span class="eyebrow svelte-13gvjzo">${escape_html(shop_eyebrow())}</span> <h1 class="svelte-13gvjzo">${escape_html(shop_title())}</h1> <p class="lede svelte-13gvjzo">${escape_html(shop_intro())}</p> <ul class="promises svelte-13gvjzo"><li class="svelte-13gvjzo">`);
		Shopping_bag($$renderer, {
			size: 16,
			strokeWidth: 1.6
		});
		$$renderer.push(`<!----> ${escape_html(shop_promise_alone())}</li> <li class="svelte-13gvjzo">`);
		Check($$renderer, {
			size: 16,
			strokeWidth: 1.6
		});
		$$renderer.push(`<!----> ${escape_html(shop_promise_together())}</li></ul></div></header> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="container layout svelte-13gvjzo"><section class="catalogue" aria-labelledby="shop-results"><div class="filters svelte-13gvjzo" role="search"><label class="search svelte-13gvjzo">`);
		Search($$renderer, {
			size: 16,
			strokeWidth: 1.6
		});
		$$renderer.push(`<!----> <span class="sr-only svelte-13gvjzo">${escape_html(shop_search_label())}</span> <input type="search"${attr("value", query)}${attr("placeholder", shop_search_placeholder())} class="svelte-13gvjzo"/> `);
		if (query) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="icon-btn svelte-13gvjzo"${attr("aria-label", shop_clear_search())}>`);
			X($$renderer, { size: 14 });
			$$renderer.push(`<!----></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></label> <div class="filter-row svelte-13gvjzo"><div class="segmented svelte-13gvjzo" role="radiogroup"${attr("aria-label", shop_filter_sold())}><!--[-->`);
		const each_array_2 = ensure_array_like(soldOptions);
		for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
			let opt = each_array_2[$$index_1];
			$$renderer.push(`<button type="button" role="radio"${attr("aria-checked", sold === opt.value)}${attr_class("svelte-13gvjzo", void 0, { "on": sold === opt.value })}>${escape_html(opt.label())}</button>`);
		}
		$$renderer.push(`<!--]--></div> <label class="sort svelte-13gvjzo"><span>${escape_html(shop_sort_label())}</span> `);
		$$renderer.select({
			value: sort,
			class: ""
		}, ($$renderer) => {
			$$renderer.option({ value: "featured" }, ($$renderer) => {
				$$renderer.push(`${escape_html(shop_sort_featured())}`);
			});
			$$renderer.option({ value: "price-asc" }, ($$renderer) => {
				$$renderer.push(`${escape_html(shop_sort_price_asc())}`);
			});
			$$renderer.option({ value: "price-desc" }, ($$renderer) => {
				$$renderer.push(`${escape_html(shop_sort_price_desc())}`);
			});
			$$renderer.option({ value: "name" }, ($$renderer) => {
				$$renderer.push(`${escape_html(shop_sort_name())}`);
			});
		}, "svelte-13gvjzo");
		$$renderer.push(`</label></div> `);
		if (presentCategories().length > 1) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="chips svelte-13gvjzo" role="group"${attr("aria-label", shop_filter_type())}><button type="button"${attr_class("chip svelte-13gvjzo", void 0, { "on": category === "all" })}>${escape_html(shop_type_all())}</button> <!--[-->`);
			const each_array_3 = ensure_array_like(presentCategories());
			for (let $$index_2 = 0, $$length = each_array_3.length; $$index_2 < $$length; $$index_2++) {
				let c = each_array_3[$$index_2];
				$$renderer.push(`<button type="button"${attr_class("chip svelte-13gvjzo", void 0, { "on": category === c })}${attr("aria-pressed", category === c)}>${escape_html(categoryLabel(c))}</button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (presentTags().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="chips chips--tags svelte-13gvjzo" role="group"${attr("aria-label", shop_filter_dietary())}><!--[-->`);
			const each_array_4 = ensure_array_like(presentTags());
			for (let $$index_3 = 0, $$length = each_array_4.length; $$index_3 < $$length; $$index_3++) {
				let t = each_array_4[$$index_3];
				$$renderer.push(`<button type="button"${attr_class("chip chip--tag svelte-13gvjzo", void 0, { "on": activeTags.includes(t) })}${attr("aria-pressed", activeTags.includes(t))}>`);
				if (activeTags.includes(t)) {
					$$renderer.push("<!--[0-->");
					Check($$renderer, { size: 12 });
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> ${escape_html(tagLabel(t))}</button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="result-line svelte-13gvjzo"><h2 id="shop-results" class="svelte-13gvjzo">${escape_html(resultsLabel(visible().length))}</h2> `);
		if (filtersActive()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="link-btn svelte-13gvjzo">${escape_html(shop_clear_filters())}</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (data.items.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-13gvjzo"><h3 class="svelte-13gvjzo">${escape_html(shop_empty_catalogue_title())}</h3> <p class="svelte-13gvjzo">${escape_html(shop_empty_catalogue_body())}</p> <a class="btn svelte-13gvjzo" href="/subscribe">${escape_html(shop_browse_injera())}</a></div>`);
		} else if (visible().length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="empty svelte-13gvjzo"><h3 class="svelte-13gvjzo">${escape_html(shop_no_results_title())}</h3> <p class="svelte-13gvjzo">${escape_html(shop_no_results_body())}</p> <button type="button" class="btn-outline svelte-13gvjzo">${escape_html(shop_clear_filters())}</button></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<ul class="grid svelte-13gvjzo"><!--[-->`);
			const each_array_5 = ensure_array_like(visible());
			for (let $$index_6 = 0, $$length = each_array_5.length; $$index_6 < $$length; $$index_6++) {
				let item = each_array_5[$$index_6];
				const qty = qtyIn(item.id);
				$$renderer.push(`<li${attr_class("card svelte-13gvjzo", void 0, { "in-basket": qty > 0 })}><div class="card__media svelte-13gvjzo">`);
				if (item.image) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", item.image)}${attr("alt", item.name)} loading="lazy" class="svelte-13gvjzo"/>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="card__placeholder svelte-13gvjzo" aria-hidden="true"><span class="svelte-13gvjzo">${escape_html(item.name.charAt(0))}</span></div>`);
				}
				$$renderer.push(`<!--]--> `);
				if (item.badge) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="ribbon svelte-13gvjzo">${escape_html(item.badge)}</span>`);
				} else if (item.isFeatured) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="ribbon svelte-13gvjzo">${escape_html(shop_featured())}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (!canSellAlone(item)) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="sold-flag svelte-13gvjzo">`);
					Lock($$renderer, { size: 11 });
					$$renderer.push(`<!----> ${escape_html(shop_with_injera_only())}</span>`);
				} else if (!canSellWithInjera(item)) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="sold-flag svelte-13gvjzo">${escape_html(shop_alone_only())}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="card__body svelte-13gvjzo"><div class="card__meta svelte-13gvjzo">`);
				if (item.category) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="svelte-13gvjzo">${escape_html(categoryLabel(item.category))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (item.unitLabel) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="svelte-13gvjzo">${escape_html(item.unitLabel)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <h3 class="svelte-13gvjzo">${escape_html(item.name)}</h3> `);
				if (item.description) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="desc svelte-13gvjzo">${escape_html(item.description)}</p>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (item.tags.length || item.spiceLevel > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="card__tags svelte-13gvjzo">`);
					if (item.spiceLevel > 0) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="heat svelte-13gvjzo"${attr("title", shop_heat({
							level: item.spiceLevel,
							max: 3
						}))}><!--[-->`);
						const each_array_6 = ensure_array_like(Array.from({ length: 3 }, (_, i) => i));
						for (let $$index_4 = 0, $$length = each_array_6.length; $$index_4 < $$length; $$index_4++) {
							let i = each_array_6[$$index_4];
							Flame($$renderer, {
								size: 13,
								class: i < item.spiceLevel ? "hot" : "cold"
							});
						}
						$$renderer.push(`<!--]--> <span class="sr-only svelte-13gvjzo">${escape_html(shop_heat({
							level: item.spiceLevel,
							max: 3
						}))}</span></span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <!--[-->`);
					const each_array_7 = ensure_array_like(item.tags);
					for (let $$index_5 = 0, $$length = each_array_7.length; $$index_5 < $$length; $$index_5++) {
						let t = each_array_7[$$index_5];
						$$renderer.push(`<span class="tag svelte-13gvjzo">${escape_html(tagLabel(t))}</span>`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (item.ingredients) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<details class="ingredients svelte-13gvjzo"><summary class="svelte-13gvjzo">${escape_html(shop_ingredients())}</summary> <p class="svelte-13gvjzo">${escape_html(item.ingredients)}</p></details>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="card__foot svelte-13gvjzo"><span class="price svelte-13gvjzo">${escape_html(money(item.pricePence))}</span> `);
				if (qty === 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button type="button" class="add-btn svelte-13gvjzo">`);
					Plus($$renderer, { size: 14 });
					$$renderer.push(`<!----> ${escape_html(shop_add())}</button>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="stepper svelte-13gvjzo" role="group"${attr("aria-label", shop_quantity_for({ name: item.name }))}><button type="button"${attr("aria-label", shop_decrease())} class="svelte-13gvjzo">`);
					Minus($$renderer, { size: 14 });
					$$renderer.push(`<!----></button> <span aria-live="polite" class="svelte-13gvjzo">${escape_html(qty)}</span> <button type="button"${attr("aria-label", shop_increase())}${attr("disabled", qty >= 20, true)} class="svelte-13gvjzo">`);
					Plus($$renderer, { size: 14 });
					$$renderer.push(`<!----></button></div>`);
				}
				$$renderer.push(`<!--]--></div></div></li>`);
			}
			$$renderer.push(`<!--]--></ul>`);
		}
		$$renderer.push(`<!--]--> <aside class="together svelte-13gvjzo"><div><span class="eyebrow svelte-13gvjzo">${escape_html(shop_together_eyebrow())}</span> <h3 class="svelte-13gvjzo">${escape_html(shop_together_title())}</h3> <p class="svelte-13gvjzo">${escape_html(shop_together_body())}</p></div> <a class="btn svelte-13gvjzo" href="/subscribe">${escape_html(shop_together_cta())} `);
		Arrow_right($$renderer, { size: 14 });
		$$renderer.push(`<!----></a></aside></section> `);
		if (wide.current) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<aside class="basket-col svelte-13gvjzo"${attr("aria-label", shop_basket_title())}><div class="basket svelte-13gvjzo">`);
			basketPanel($$renderer);
			$$renderer.push(`<!----></div></aside>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (!wide.current && lineCount() > 0 && true) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="basket-bar svelte-13gvjzo"><span class="basket-bar__count svelte-13gvjzo">`);
			Shopping_bag($$renderer, { size: 16 });
			$$renderer.push(`<!----> ${escape_html(itemsLabel(lineCount()))}</span> <span class="basket-bar__total svelte-13gvjzo">${escape_html(money(subtotal()))} `);
			Arrow_right($$renderer, { size: 14 });
			$$renderer.push(`<!----></span></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!wide.current && basketOpen);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BSmJQZBm.js.map
