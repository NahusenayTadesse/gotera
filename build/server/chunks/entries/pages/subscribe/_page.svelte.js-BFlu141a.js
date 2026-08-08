import { a7 as bind_props, a0 as head, a9 as escape_html, ae as store_get, ac as attr_style, ab as stringify$1, aa as attr_class, $ as attr, a4 as ensure_array_like, T as derived, af as unsubscribe_stores, a6 as spread_props } from '../../../chunks/server.js-CPNQ0GBv.js';
import { o as onDestroy } from '../../../chunks/index-server.js-C9rOfj9g.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import { a as toast } from '../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { I as Icon } from '../../../chunks/Icon.js-C-2f-rrd.js';
import { D as DialogComp } from '../../../chunks/DialogComp.js-D2FaCpsR.js';
import { B as Button } from '../../../chunks/button.js-DMlVoc1I.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import { b as superForm } from '../../../chunks/client2.js--SBYKgBt.js';
import '../../../chunks/auth-client.js-CohMcjxP.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/dialog.js-BhMsigOw.js';
import '../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../chunks/utils2.js-BChetszu.js';
import '../../../chunks/forms.js-1iUoLEd8.js';
import '../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../chunks/stores.js-DMULTZRY.js';
import '../../../chunks/access.js-HgBsL8za.js';
import '../../../chunks/auth.js-DZBRJAcg.js';
import '../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../chunks/db.js-BkD50_-0.js';
import 'node:buffer';
import 'url';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'process';
import 'crypto';
import 'zlib';
import 'util';
import '../../../index.js-CNe0N484.js';
import '../../../chunks/internal.js-B6-4oVm4.js';
import 'node:events';
import '../../../chunks/dialect.js-DJNK594B.js';
import 'nodemailer';

//#region node_modules/@lucide/svelte/dist/icons/user-round-plus.svelte
function User_round_plus($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "user-round-plus" },
		props,
		{ iconNode: [
			["path", { "d": "M2 21a8 8 0 0 1 13.292-6" }],
			["circle", {
				"cx": "10",
				"cy": "8",
				"r": "5"
			}],
			["path", { "d": "M19 16v6" }],
			["path", { "d": "M22 19h-6" }]
		] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/subscribe_addon_add.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Addon_AddInputs */
var en_subscribe_addon_add = () => {
	return `Add`;
};
var am_subscribe_addon_add = () => {
	return `ጨምር`;
};
/**
* | output |
* | --- |
* | "Add" |
*
* @param {Subscribe_Addon_AddInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_addon_add = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_addon_add();
	return en_subscribe_addon_add();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_addon_added.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Addon_AddedInputs */
var en_subscribe_addon_added = () => {
	return `Added ✓`;
};
var am_subscribe_addon_added = () => {
	return `ተጨምሯል ✓`;
};
/**
* | output |
* | --- |
* | "Added ✓" |
*
* @param {Subscribe_Addon_AddedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_addon_added = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_addon_added();
	return en_subscribe_addon_added();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_addon_photo_style.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Addon_Photo_StyleInputs */
var en_subscribe_addon_photo_style = () => {
	return `Warm light · minimal styling`;
};
var am_subscribe_addon_photo_style = () => {
	return `ለስላሳ ብርሃን · ቀላል ንድፍ`;
};
/**
* | output |
* | --- |
* | "Warm light · minimal styling" |
*
* @param {Subscribe_Addon_Photo_StyleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_addon_photo_style = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_addon_photo_style();
	return en_subscribe_addon_photo_style();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_addon_photo_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Addon_Photo_SuffixInputs */
var en_subscribe_addon_photo_suffix = () => {
	return `product photo`;
};
var am_subscribe_addon_photo_suffix = () => {
	return `የምርት ፎቶ`;
};
/**
* | output |
* | --- |
* | "product photo" |
*
* @param {Subscribe_Addon_Photo_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_addon_photo_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_addon_photo_suffix();
	return en_subscribe_addon_photo_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_already_have_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Already_Have_AccountInputs */
var en_subscribe_already_have_account = () => {
	return `Already have an account?`;
};
var am_subscribe_already_have_account = () => {
	return `አካውንት አለዎት?`;
};
/**
* | output |
* | --- |
* | "Already have an account?" |
*
* @param {Subscribe_Already_Have_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_already_have_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_already_have_account();
	return en_subscribe_already_have_account();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_aria_decrease_qty.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Aria_Decrease_QtyInputs */
var en_subscribe_aria_decrease_qty = () => {
	return `Decrease quantity`;
};
var am_subscribe_aria_decrease_qty = () => {
	return `ብዛት ቀንስ`;
};
/**
* | output |
* | --- |
* | "Decrease quantity" |
*
* @param {Subscribe_Aria_Decrease_QtyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_aria_decrease_qty = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_aria_decrease_qty();
	return en_subscribe_aria_decrease_qty();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_aria_increase_qty.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Aria_Increase_QtyInputs */
var en_subscribe_aria_increase_qty = () => {
	return `Increase quantity`;
};
var am_subscribe_aria_increase_qty = () => {
	return `ብዛት ጨምር`;
};
/**
* | output |
* | --- |
* | "Increase quantity" |
*
* @param {Subscribe_Aria_Increase_QtyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_aria_increase_qty = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_aria_increase_qty();
	return en_subscribe_aria_increase_qty();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_back_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Back_AriaInputs */
var en_subscribe_back_aria = () => {
	return `Go back a step`;
};
var am_subscribe_back_aria = () => {
	return `ወደ ኋላ ይመለሱ`;
};
/**
* | output |
* | --- |
* | "Go back a step" |
*
* @param {Subscribe_Back_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_back_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_back_aria();
	return en_subscribe_back_aria();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_back_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Back_LabelInputs */
var en_subscribe_back_label = () => {
	return `Back`;
};
var am_subscribe_back_label = () => {
	return `ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Subscribe_Back_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_back_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_back_label();
	return en_subscribe_back_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_badge_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Badge_GiftInputs */
var en_subscribe_badge_gift = () => {
	return `Gift`;
};
var am_subscribe_badge_gift = () => {
	return `ስጦታ`;
};
/**
* | output |
* | --- |
* | "Gift" |
*
* @param {Subscribe_Badge_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_badge_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_badge_gift();
	return en_subscribe_badge_gift();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_badge_popular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Badge_PopularInputs */
var en_subscribe_badge_popular = () => {
	return `Most popular`;
};
var am_subscribe_badge_popular = () => {
	return `በጣም ተወዳጅ`;
};
/**
* | output |
* | --- |
* | "Most popular" |
*
* @param {Subscribe_Badge_PopularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_badge_popular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_badge_popular();
	return en_subscribe_badge_popular();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_btn_select.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Btn_SelectInputs */
var en_subscribe_btn_select = () => {
	return `Select`;
};
var am_subscribe_btn_select = () => {
	return `ምረጥ`;
};
/**
* | output |
* | --- |
* | "Select" |
*
* @param {Subscribe_Btn_SelectInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_btn_select = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_btn_select();
	return en_subscribe_btn_select();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_btn_selected.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Btn_SelectedInputs */
var en_subscribe_btn_selected = () => {
	return `Selected`;
};
var am_subscribe_btn_selected = () => {
	return `ተመርጧል`;
};
/**
* | output |
* | --- |
* | "Selected" |
*
* @param {Subscribe_Btn_SelectedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_btn_selected = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_btn_selected();
	return en_subscribe_btn_selected();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_choice_gift_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Choice_Gift_DescInputs */
var en_subscribe_choice_gift_desc = () => {
	return `One-time order. Different address. No subscription.`;
};
var am_subscribe_choice_gift_desc = () => {
	return `አንድ ጊዜ ብቻ የሚደረግ ትዕዛዝ። የተለየ አድራሻ። ምዝገባ አያስፈልግም።`;
};
/**
* | output |
* | --- |
* | "One-time order. Different address. No subscription." |
*
* @param {Subscribe_Choice_Gift_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_choice_gift_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_choice_gift_desc();
	return en_subscribe_choice_gift_desc();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_choice_me_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Choice_Me_DescInputs */
var en_subscribe_choice_me_desc = () => {
	return `Monthly subscription. Manage from your account.`;
};
var am_subscribe_choice_me_desc = () => {
	return `ወርሃዊ ምዝገባ። ከአካውንትዎ ያስተዳድሩ።`;
};
/**
* | output |
* | --- |
* | "Monthly subscription. Manage from your account." |
*
* @param {Subscribe_Choice_Me_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_choice_me_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_choice_me_desc();
	return en_subscribe_choice_me_desc();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_continue.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_ContinueInputs */
var en_subscribe_cta_continue = () => {
	return `Continue`;
};
var am_subscribe_cta_continue = () => {
	return `ቀጥል`;
};
/**
* | output |
* | --- |
* | "Continue" |
*
* @param {Subscribe_Cta_ContinueInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_continue = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_continue();
	return en_subscribe_cta_continue();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_continue_as_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_Continue_As_GiftInputs */
var en_subscribe_cta_continue_as_gift = () => {
	return `Continue as Gift`;
};
var am_subscribe_cta_continue_as_gift = () => {
	return `እንደ ስጦታ ቀጥል`;
};
/**
* | output |
* | --- |
* | "Continue as Gift" |
*
* @param {Subscribe_Cta_Continue_As_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_continue_as_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_continue_as_gift();
	return en_subscribe_cta_continue_as_gift();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_continue_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ price: NonNullable<unknown> }} Subscribe_Cta_Continue_GiftInputs */
var en_subscribe_cta_continue_gift = (i) => {
	return `Continue as gift — £${i?.price}`;
};
var am_subscribe_cta_continue_gift = (i) => {
	return `እንደ ስጦታ ቀጥል — £${i?.price}`;
};
/**
* | output |
* | --- |
* | "Continue as gift — £{price}" |
*
* @param {Subscribe_Cta_Continue_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_continue_gift = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_continue_gift(inputs);
	return en_subscribe_cta_continue_gift(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_continue_with_extra.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Subscribe_Cta_Continue_With_ExtraInputs */
var en_subscribe_cta_continue_with_extra = (i) => {
	return `Continue with ${i?.count} extra`;
};
var am_subscribe_cta_continue_with_extra = (i) => {
	return `ከ ${i?.count} ተጨማሪ ጋር ቀጥል`;
};
/**
* | output |
* | --- |
* | "Continue with {count} extra" |
*
* @param {Subscribe_Cta_Continue_With_ExtraInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_continue_with_extra = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_continue_with_extra(inputs);
	return en_subscribe_cta_continue_with_extra(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_continue_with_extras.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown> }} Subscribe_Cta_Continue_With_ExtrasInputs */
var en_subscribe_cta_continue_with_extras = (i) => {
	return `Continue with ${i?.count} extras`;
};
var am_subscribe_cta_continue_with_extras = (i) => {
	return `ከ ${i?.count} ተጨማሪዎች ጋር ቀጥል`;
};
/**
* | output |
* | --- |
* | "Continue with {count} extras" |
*
* @param {Subscribe_Cta_Continue_With_ExtrasInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_continue_with_extras = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_continue_with_extras(inputs);
	return en_subscribe_cta_continue_with_extras(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_order.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_OrderInputs */
var en_subscribe_cta_order = () => {
	return `Order`;
};
var am_subscribe_cta_order = () => {
	return `ይዘዙ`;
};
/**
* | output |
* | --- |
* | "Order" |
*
* @param {Subscribe_Cta_OrderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_order = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_order();
	return en_subscribe_cta_order();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_order_price.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ price: NonNullable<unknown> }} Subscribe_Cta_Order_PriceInputs */
var en_subscribe_cta_order_price = (i) => {
	return `Order — £${i?.price}`;
};
var am_subscribe_cta_order_price = (i) => {
	return `ይዘዙ — £${i?.price}`;
};
/**
* | output |
* | --- |
* | "Order — £{price}" |
*
* @param {Subscribe_Cta_Order_PriceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_order_price = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_order_price(inputs);
	return en_subscribe_cta_order_price(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_processing.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_ProcessingInputs */
var en_subscribe_cta_processing = () => {
	return `Processing…`;
};
var am_subscribe_cta_processing = () => {
	return `በሂደት ላይ…`;
};
/**
* | output |
* | --- |
* | "Processing…" |
*
* @param {Subscribe_Cta_ProcessingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_processing = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_processing();
	return en_subscribe_cta_processing();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_starting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_StartingInputs */
var en_subscribe_cta_starting = () => {
	return `Starting…`;
};
var am_subscribe_cta_starting = () => {
	return `በመጀመር ላይ…`;
};
/**
* | output |
* | --- |
* | "Starting…" |
*
* @param {Subscribe_Cta_StartingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_starting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_starting();
	return en_subscribe_cta_starting();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_subscribe.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Cta_SubscribeInputs */
var en_subscribe_cta_subscribe = () => {
	return `Subscribe`;
};
var am_subscribe_cta_subscribe = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Subscribe_Cta_SubscribeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_subscribe = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_subscribe();
	return en_subscribe_cta_subscribe();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_cta_subscribe_price.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ price: NonNullable<unknown> }} Subscribe_Cta_Subscribe_PriceInputs */
var en_subscribe_cta_subscribe_price = (i) => {
	return `Subscribe — £${i?.price} /month`;
};
var am_subscribe_cta_subscribe_price = (i) => {
	return `ይመዝገቡ — £${i?.price} /በወር`;
};
/**
* | output |
* | --- |
* | "Subscribe — £{price} /month" |
*
* @param {Subscribe_Cta_Subscribe_PriceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_cta_subscribe_price = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_cta_subscribe_price(inputs);
	return en_subscribe_cta_subscribe_price(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_extras_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Extras_LabelInputs */
var en_subscribe_extras_label = () => {
	return `extras`;
};
var am_subscribe_extras_label = () => {
	return `ተጨማሪዎች`;
};
/**
* | output |
* | --- |
* | "extras" |
*
* @param {Subscribe_Extras_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_extras_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_extras_label();
	return en_subscribe_extras_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_EyebrowInputs */
var en_subscribe_eyebrow = () => {
	return `Subscribe`;
};
var am_subscribe_eyebrow = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Subscribe_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_eyebrow();
	return en_subscribe_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_city_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_City_LabelInputs */
var en_subscribe_field_city_label = () => {
	return `City`;
};
var am_subscribe_field_city_label = () => {
	return `ከተማ`;
};
/**
* | output |
* | --- |
* | "City" |
*
* @param {Subscribe_Field_City_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_city_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_city_label();
	return en_subscribe_field_city_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_delivery_day_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Delivery_Day_LabelInputs */
var en_subscribe_field_delivery_day_label = () => {
	return `Delivery Day`;
};
var am_subscribe_field_delivery_day_label = () => {
	return `የመላኪያ ቀን`;
};
/**
* | output |
* | --- |
* | "Delivery Day" |
*
* @param {Subscribe_Field_Delivery_Day_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_delivery_day_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_delivery_day_label();
	return en_subscribe_field_delivery_day_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Email_LabelInputs */
var en_subscribe_field_email_label = () => {
	return `Your email`;
};
var am_subscribe_field_email_label = () => {
	return `የእርስዎ ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Your email" |
*
* @param {Subscribe_Field_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_email_label();
	return en_subscribe_field_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_frequency_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Frequency_LabelInputs */
var en_subscribe_field_frequency_label = () => {
	return `Frequency`;
};
var am_subscribe_field_frequency_label = () => {
	return `ድግግሞሽ`;
};
/**
* | output |
* | --- |
* | "Frequency" |
*
* @param {Subscribe_Field_Frequency_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_frequency_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_frequency_label();
	return en_subscribe_field_frequency_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_gift_message_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Gift_Message_LabelInputs */
var en_subscribe_field_gift_message_label = () => {
	return `Gift message`;
};
var am_subscribe_field_gift_message_label = () => {
	return `የስጦታ መልዕክት`;
};
/**
* | output |
* | --- |
* | "Gift message" |
*
* @param {Subscribe_Field_Gift_Message_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_gift_message_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_gift_message_label();
	return en_subscribe_field_gift_message_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_label_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Label_LabelInputs */
var en_subscribe_field_label_label = () => {
	return `Label`;
};
var am_subscribe_field_label_label = () => {
	return `ስያሜ`;
};
/**
* | output |
* | --- |
* | "Label" |
*
* @param {Subscribe_Field_Label_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_label_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_label_label();
	return en_subscribe_field_label_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_line1_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Line1_LabelInputs */
var en_subscribe_field_line1_label = () => {
	return `Address line 1`;
};
var am_subscribe_field_line1_label = () => {
	return `የአድራሻ መስመር 1`;
};
/**
* | output |
* | --- |
* | "Address line 1" |
*
* @param {Subscribe_Field_Line1_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_line1_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_line1_label();
	return en_subscribe_field_line1_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_line2_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Line2_LabelInputs */
var en_subscribe_field_line2_label = () => {
	return `Address line 2`;
};
var am_subscribe_field_line2_label = () => {
	return `የአድራሻ መስመር 2`;
};
/**
* | output |
* | --- |
* | "Address line 2" |
*
* @param {Subscribe_Field_Line2_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_line2_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_line2_label();
	return en_subscribe_field_line2_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_phone_gift_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Phone_Gift_LabelInputs */
var en_subscribe_field_phone_gift_label = () => {
	return `Phone Number for Delivery`;
};
var am_subscribe_field_phone_gift_label = () => {
	return `ለመላኪያ የስልክ ቁጥር`;
};
/**
* | output |
* | --- |
* | "Phone Number for Delivery" |
*
* @param {Subscribe_Field_Phone_Gift_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_phone_gift_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_phone_gift_label();
	return en_subscribe_field_phone_gift_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_phone_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Phone_LabelInputs */
var en_subscribe_field_phone_label = () => {
	return `Phone for Delivery`;
};
var am_subscribe_field_phone_label = () => {
	return `ለመላኪያ ስልክ`;
};
/**
* | output |
* | --- |
* | "Phone for Delivery" |
*
* @param {Subscribe_Field_Phone_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_phone_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_phone_label();
	return en_subscribe_field_phone_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_postcode_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Postcode_LabelInputs */
var en_subscribe_field_postcode_label = () => {
	return `Postcode`;
};
var am_subscribe_field_postcode_label = () => {
	return `ፖስታ ኮድ`;
};
/**
* | output |
* | --- |
* | "Postcode" |
*
* @param {Subscribe_Field_Postcode_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_postcode_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_postcode_label();
	return en_subscribe_field_postcode_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_field_recipient_name_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Field_Recipient_Name_LabelInputs */
var en_subscribe_field_recipient_name_label = () => {
	return `Recipient's name`;
};
var am_subscribe_field_recipient_name_label = () => {
	return `የተቀባዩ ስም`;
};
/**
* | output |
* | --- |
* | "Recipient's name" |
*
* @param {Subscribe_Field_Recipient_Name_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_field_recipient_name_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_field_recipient_name_label();
	return en_subscribe_field_recipient_name_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_freq_every_month.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Freq_Every_MonthInputs */
var en_subscribe_freq_every_month = () => {
	return `every month.`;
};
var am_subscribe_freq_every_month = () => {
	return `በየወሩ።`;
};
/**
* | output |
* | --- |
* | "every month." |
*
* @param {Subscribe_Freq_Every_MonthInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_freq_every_month = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_freq_every_month();
	return en_subscribe_freq_every_month();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_freq_one_time.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Freq_One_TimeInputs */
var en_subscribe_freq_one_time = () => {
	return `one-time.`;
};
var am_subscribe_freq_one_time = () => {
	return `አንድ ጊዜ ብቻ።`;
};
/**
* | output |
* | --- |
* | "one-time." |
*
* @param {Subscribe_Freq_One_TimeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_freq_one_time = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_freq_one_time();
	return en_subscribe_freq_one_time();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_freq_per_month.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Freq_Per_MonthInputs */
var en_subscribe_freq_per_month = () => {
	return `per month`;
};
var am_subscribe_freq_per_month = () => {
	return `በወር`;
};
/**
* | output |
* | --- |
* | "per month" |
*
* @param {Subscribe_Freq_Per_MonthInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_freq_per_month = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_freq_per_month();
	return en_subscribe_freq_per_month();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_from_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_From_LabelInputs */
var en_subscribe_from_label = () => {
	return `From`;
};
var am_subscribe_from_label = () => {
	return `ጀምሮ`;
};
/**
* | output |
* | --- |
* | "From" |
*
* @param {Subscribe_From_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_from_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_from_label();
	return en_subscribe_from_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_gift_label_no_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Gift_Label_No_SubInputs */
var en_subscribe_gift_label_no_sub = () => {
	return `No subscription required`;
};
var am_subscribe_gift_label_no_sub = () => {
	return `ምዝገባ አያስፈልግም`;
};
/**
* | output |
* | --- |
* | "No subscription required" |
*
* @param {Subscribe_Gift_Label_No_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_gift_label_no_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_gift_label_no_sub();
	return en_subscribe_gift_label_no_sub();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_help_delivery_day.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Help_Delivery_DayInputs */
var en_subscribe_help_delivery_day = () => {
	return `London only · launch delivery day.`;
};
var am_subscribe_help_delivery_day = () => {
	return `ለንደን ብቻ · የመጀመሪያ የመላኪያ ቀን።`;
};
/**
* | output |
* | --- |
* | "London only · launch delivery day." |
*
* @param {Subscribe_Help_Delivery_DayInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_help_delivery_day = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_help_delivery_day();
	return en_subscribe_help_delivery_day();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_help_frequency.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Help_FrequencyInputs */
var en_subscribe_help_frequency = () => {
	return `One delivery per month.`;
};
var am_subscribe_help_frequency = () => {
	return `በወር አንድ ጊዜ መላኪያ።`;
};
/**
* | output |
* | --- |
* | "One delivery per month." |
*
* @param {Subscribe_Help_FrequencyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_help_frequency = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_help_frequency();
	return en_subscribe_help_frequency();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_hero_heading_1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Hero_Heading_1Inputs */
var en_subscribe_hero_heading_1 = () => {
	return `Choose`;
};
var am_subscribe_hero_heading_1 = () => {
	return `ዕቅድዎን`;
};
/**
* | output |
* | --- |
* | "Choose" |
*
* @param {Subscribe_Hero_Heading_1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_hero_heading_1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_hero_heading_1();
	return en_subscribe_hero_heading_1();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_hero_heading_2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Hero_Heading_2Inputs */
var en_subscribe_hero_heading_2 = () => {
	return `your plan.`;
};
var am_subscribe_hero_heading_2 = () => {
	return `ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "your plan." |
*
* @param {Subscribe_Hero_Heading_2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_hero_heading_2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_hero_heading_2();
	return en_subscribe_hero_heading_2();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_hero_no_minimum.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Hero_No_MinimumInputs */
var en_subscribe_hero_no_minimum = () => {
	return `No minimum term · Cancel any time`;
};
var am_subscribe_hero_no_minimum = () => {
	return `ዝቅተኛ ጊዜ የለም · በማንኛውም ጊዜ ይሰርዙ`;
};
/**
* | output |
* | --- |
* | "No minimum term · Cancel any time" |
*
* @param {Subscribe_Hero_No_MinimumInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_hero_no_minimum = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_hero_no_minimum();
	return en_subscribe_hero_no_minimum();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_kind_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Kind_GiftInputs */
var en_subscribe_kind_gift = () => {
	return `gift`;
};
var am_subscribe_kind_gift = () => {
	return `ስጦታ`;
};
/**
* | output |
* | --- |
* | "gift" |
*
* @param {Subscribe_Kind_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_kind_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_kind_gift();
	return en_subscribe_kind_gift();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_kind_subscription.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Kind_SubscriptionInputs */
var en_subscribe_kind_subscription = () => {
	return `subscription`;
};
var am_subscribe_kind_subscription = () => {
	return `ምዝገባ`;
};
/**
* | output |
* | --- |
* | "subscription" |
*
* @param {Subscribe_Kind_SubscriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_kind_subscription = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_kind_subscription();
	return en_subscribe_kind_subscription();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_addons.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_AddonsInputs */
var en_subscribe_label_addons = () => {
	return `Add-ons`;
};
var am_subscribe_label_addons = () => {
	return `ተጨማሪዎች`;
};
/**
* | output |
* | --- |
* | "Add-ons" |
*
* @param {Subscribe_Label_AddonsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_addons = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_addons();
	return en_subscribe_label_addons();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_DeliveryInputs */
var en_subscribe_label_delivery = () => {
	return `Delivery`;
};
var am_subscribe_label_delivery = () => {
	return `መላኪያ`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Subscribe_Label_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_delivery();
	return en_subscribe_label_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_first_payment.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_First_PaymentInputs */
var en_subscribe_label_first_payment = () => {
	return `First payment`;
};
var am_subscribe_label_first_payment = () => {
	return `የመጀመሪያ ክፍያ`;
};
/**
* | output |
* | --- |
* | "First payment" |
*
* @param {Subscribe_Label_First_PaymentInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_first_payment = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_first_payment();
	return en_subscribe_label_first_payment();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_included.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_IncludedInputs */
var en_subscribe_label_included = () => {
	return `Included`;
};
var am_subscribe_label_included = () => {
	return `ተካትቷል`;
};
/**
* | output |
* | --- |
* | "Included" |
*
* @param {Subscribe_Label_IncludedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_included = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_included();
	return en_subscribe_label_included();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_one_time_pack.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_One_Time_PackInputs */
var en_subscribe_label_one_time_pack = () => {
	return `One-time Pack`;
};
var am_subscribe_label_one_time_pack = () => {
	return `የአንድ ጊዜ ጥቅል`;
};
/**
* | output |
* | --- |
* | "One-time Pack" |
*
* @param {Subscribe_Label_One_Time_PackInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_one_time_pack = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_one_time_pack();
	return en_subscribe_label_one_time_pack();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_PlanInputs */
var en_subscribe_label_plan = () => {
	return `Plan`;
};
var am_subscribe_label_plan = () => {
	return `ዕቅድ`;
};
/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Subscribe_Label_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_plan();
	return en_subscribe_label_plan();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_product_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_Product_SuffixInputs */
var en_subscribe_label_product_suffix = () => {
	return `product`;
};
var am_subscribe_label_product_suffix = () => {
	return `ምርት`;
};
/**
* | output |
* | --- |
* | "product" |
*
* @param {Subscribe_Label_Product_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_product_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_product_suffix();
	return en_subscribe_label_product_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_quantity.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_QuantityInputs */
var en_subscribe_label_quantity = () => {
	return `Quantity`;
};
var am_subscribe_label_quantity = () => {
	return `ብዛት`;
};
/**
* | output |
* | --- |
* | "Quantity" |
*
* @param {Subscribe_Label_QuantityInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_quantity = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_quantity();
	return en_subscribe_label_quantity();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_saturday_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_Saturday_DeliveryInputs */
var en_subscribe_label_saturday_delivery = () => {
	return `Saturday delivery`;
};
var am_subscribe_label_saturday_delivery = () => {
	return `የቅዳሜ መላኪያ`;
};
/**
* | output |
* | --- |
* | "Saturday delivery" |
*
* @param {Subscribe_Label_Saturday_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_saturday_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_saturday_delivery();
	return en_subscribe_label_saturday_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_label_total.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Label_TotalInputs */
var en_subscribe_label_total = () => {
	return `Total`;
};
var am_subscribe_label_total = () => {
	return `ጠቅላላ`;
};
/**
* | output |
* | --- |
* | "Total" |
*
* @param {Subscribe_Label_TotalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_label_total = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_label_total();
	return en_subscribe_label_total();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_note_confirmation_receipt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Note_Confirmation_ReceiptInputs */
var en_subscribe_note_confirmation_receipt = () => {
	return `For your confirmation and receipt.`;
};
var am_subscribe_note_confirmation_receipt = () => {
	return `ለማረጋገጫና ደረሰኝዎ።`;
};
/**
* | output |
* | --- |
* | "For your confirmation and receipt." |
*
* @param {Subscribe_Note_Confirmation_ReceiptInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_note_confirmation_receipt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_note_confirmation_receipt();
	return en_subscribe_note_confirmation_receipt();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_note_london_only.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Note_London_OnlyInputs */
var en_subscribe_note_london_only = () => {
	return `London only`;
};
var am_subscribe_note_london_only = () => {
	return `ለንደን ብቻ`;
};
/**
* | output |
* | --- |
* | "London only" |
*
* @param {Subscribe_Note_London_OnlyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_note_london_only = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_note_london_only();
	return en_subscribe_note_london_only();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_note_london_saturday.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Note_London_SaturdayInputs */
var en_subscribe_note_london_saturday = () => {
	return `London only · Delivered every Saturday`;
};
var am_subscribe_note_london_saturday = () => {
	return `ለንደን ብቻ · በየቅዳሜው ይደርሳል`;
};
/**
* | output |
* | --- |
* | "London only · Delivered every Saturday" |
*
* @param {Subscribe_Note_London_SaturdayInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_note_london_saturday = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_note_london_saturday();
	return en_subscribe_note_london_saturday();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_note_pause_skip_cancel.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Note_Pause_Skip_CancelInputs */
var en_subscribe_note_pause_skip_cancel = () => {
	return `Pause, skip, or cancel any time from your account.`;
};
var am_subscribe_note_pause_skip_cancel = () => {
	return `ከአካውንትዎ በማንኛውም ጊዜ ያቁሙ፣ ይዝለሉ ወይም ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | "Pause, skip, or cancel any time from your account." |
*
* @param {Subscribe_Note_Pause_Skip_CancelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_note_pause_skip_cancel = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_note_pause_skip_cancel();
	return en_subscribe_note_pause_skip_cancel();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_optin_updates.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Optin_UpdatesInputs */
var en_subscribe_optin_updates = () => {
	return `Send me occasional updates and offers.`;
};
var am_subscribe_optin_updates = () => {
	return `አልፎ አልፎ ዝማኔዎችንና ቅናሾችን ላኩልኝ።`;
};
/**
* | output |
* | --- |
* | "Send me occasional updates and offers." |
*
* @param {Subscribe_Optin_UpdatesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_optin_updates = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_optin_updates();
	return en_subscribe_optin_updates();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_option_monthly.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Option_MonthlyInputs */
var en_subscribe_option_monthly = () => {
	return `Monthly`;
};
var am_subscribe_option_monthly = () => {
	return `ወርሃዊ`;
};
/**
* | output |
* | --- |
* | "Monthly" |
*
* @param {Subscribe_Option_MonthlyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_option_monthly = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_option_monthly();
	return en_subscribe_option_monthly();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_option_saturday.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Option_SaturdayInputs */
var en_subscribe_option_saturday = () => {
	return `Saturday`;
};
var am_subscribe_option_saturday = () => {
	return `ቅዳሜ`;
};
/**
* | output |
* | --- |
* | "Saturday" |
*
* @param {Subscribe_Option_SaturdayInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_option_saturday = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_option_saturday();
	return en_subscribe_option_saturday();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_opt_optional.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Opt_OptionalInputs */
var en_subscribe_opt_optional = () => {
	return `optional`;
};
var am_subscribe_opt_optional = () => {
	return `አማራጭ`;
};
/**
* | output |
* | --- |
* | "optional" |
*
* @param {Subscribe_Opt_OptionalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_opt_optional = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_opt_optional();
	return en_subscribe_opt_optional();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_opt_optional_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Opt_Optional_LabelInputs */
var en_subscribe_opt_optional_label = () => {
	return `optional · e.g. Home`;
};
var am_subscribe_opt_optional_label = () => {
	return `አማራጭ · ለምሳሌ ቤት`;
};
/**
* | output |
* | --- |
* | "optional · e.g. Home" |
*
* @param {Subscribe_Opt_Optional_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_opt_optional_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_opt_optional_label();
	return en_subscribe_opt_optional_label();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_opt_optional_paren.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Opt_Optional_ParenInputs */
var en_subscribe_opt_optional_paren = () => {
	return `(optional)`;
};
var am_subscribe_opt_optional_paren = () => {
	return `(አማራጭ)`;
};
/**
* | output |
* | --- |
* | "(optional)" |
*
* @param {Subscribe_Opt_Optional_ParenInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_opt_optional_paren = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_opt_optional_paren();
	return en_subscribe_opt_optional_paren();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_page_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Page_HeadingInputs */
var en_subscribe_page_heading = () => {
	return `Choose your plan.`;
};
var am_subscribe_page_heading = () => {
	return `ዕቅድዎን ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Choose your plan." |
*
* @param {Subscribe_Page_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_page_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_page_heading();
	return en_subscribe_page_heading();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_page_subheading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Page_SubheadingInputs */
var en_subscribe_page_subheading = () => {
	return `Select, add extras, go straight to checkout.`;
};
var am_subscribe_page_subheading = () => {
	return `ይምረጡ፣ ተጨማሪ ይጨምሩ፣ በቀጥታ ወደ ክፍያ ይሂዱ።`;
};
/**
* | output |
* | --- |
* | "Select, add extras, go straight to checkout." |
*
* @param {Subscribe_Page_SubheadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_page_subheading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_page_subheading();
	return en_subscribe_page_subheading();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Page_TitleInputs */
var en_subscribe_page_title = () => {
	return `Subscribe`;
};
var am_subscribe_page_title = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Subscribe_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_page_title();
	return en_subscribe_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_EmailInputs */
var en_subscribe_placeholder_email = () => {
	return `you@example.com`;
};
var am_subscribe_placeholder_email = () => {
	return `you@example.com`;
};
/**
* | output |
* | --- |
* | "you@example.com" |
*
* @param {Subscribe_Placeholder_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_email();
	return en_subscribe_placeholder_email();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_flat.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_FlatInputs */
var en_subscribe_placeholder_flat = () => {
	return `Flat, building`;
};
var am_subscribe_placeholder_flat = () => {
	return `ፍላት፣ ህንፃ`;
};
/**
* | output |
* | --- |
* | "Flat, building" |
*
* @param {Subscribe_Placeholder_FlatInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_flat = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_flat();
	return en_subscribe_placeholder_flat();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_gift_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_Gift_NoteInputs */
var en_subscribe_placeholder_gift_note = () => {
	return `A short note`;
};
var am_subscribe_placeholder_gift_note = () => {
	return `አጭር ማስታወሻ`;
};
/**
* | output |
* | --- |
* | "A short note" |
*
* @param {Subscribe_Placeholder_Gift_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_gift_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_gift_note();
	return en_subscribe_placeholder_gift_note();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_london.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_LondonInputs */
var en_subscribe_placeholder_london = () => {
	return `London`;
};
var am_subscribe_placeholder_london = () => {
	return `ለንደን`;
};
/**
* | output |
* | --- |
* | "London" |
*
* @param {Subscribe_Placeholder_LondonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_london = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_london();
	return en_subscribe_placeholder_london();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_postcode.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_PostcodeInputs */
var en_subscribe_placeholder_postcode = () => {
	return `N7 0DD`;
};
var am_subscribe_placeholder_postcode = () => {
	return `N7 0DD`;
};
/**
* | output |
* | --- |
* | "N7 0DD" |
*
* @param {Subscribe_Placeholder_PostcodeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_postcode = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_postcode();
	return en_subscribe_placeholder_postcode();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_placeholder_street.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Placeholder_StreetInputs */
var en_subscribe_placeholder_street = () => {
	return `Street address`;
};
var am_subscribe_placeholder_street = () => {
	return `የመንገድ አድራሻ`;
};
/**
* | output |
* | --- |
* | "Street address" |
*
* @param {Subscribe_Placeholder_StreetInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_placeholder_street = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_placeholder_street();
	return en_subscribe_placeholder_street();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_plan_name_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Subscribe_Plan_Name_SuffixInputs */
var en_subscribe_plan_name_suffix = (i) => {
	return `${i?.name} plan`;
};
var am_subscribe_plan_name_suffix = (i) => {
	return `የ${i?.name} ዕቅድ`;
};
/**
* | output |
* | --- |
* | "{name} plan" |
*
* @param {Subscribe_Plan_Name_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_plan_name_suffix = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_plan_name_suffix(inputs);
	return en_subscribe_plan_name_suffix(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_qty_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ qty: NonNullable<unknown> }} Subscribe_Qty_SuffixInputs */
var en_subscribe_qty_suffix = (i) => {
	return `· Qty ${i?.qty}`;
};
var am_subscribe_qty_suffix = (i) => {
	return `· ብዛት ${i?.qty}`;
};
/**
* | output |
* | --- |
* | "· Qty {qty}" |
*
* @param {Subscribe_Qty_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_qty_suffix = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_qty_suffix(inputs);
	return en_subscribe_qty_suffix(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_section_delivery_address.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Section_Delivery_AddressInputs */
var en_subscribe_section_delivery_address = () => {
	return `Delivery address`;
};
var am_subscribe_section_delivery_address = () => {
	return `የመላኪያ አድራሻ`;
};
/**
* | output |
* | --- |
* | "Delivery address" |
*
* @param {Subscribe_Section_Delivery_AddressInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_section_delivery_address = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_section_delivery_address();
	return en_subscribe_section_delivery_address();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_secure_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Secure_NoteInputs */
var en_subscribe_secure_note = () => {
	return `Secured by Stripe. You'll complete payment on the next screen.`;
};
var am_subscribe_secure_note = () => {
	return `በStripe የተጠበቀ። ክፍያውን በሚቀጥለው ገጽ ያጠናቅቃሉ።`;
};
/**
* | output |
* | --- |
* | "Secured by Stripe. You'll complete payment on the next screen." |
*
* @param {Subscribe_Secure_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_secure_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_secure_note();
	return en_subscribe_secure_note();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_skip_extras.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Skip_ExtrasInputs */
var en_subscribe_skip_extras = () => {
	return `Skip — no extras this time`;
};
var am_subscribe_skip_extras = () => {
	return `ዝለል — በዚህ ጊዜ ተጨማሪ አልፈልግም`;
};
/**
* | output |
* | --- |
* | "Skip — no extras this time" |
*
* @param {Subscribe_Skip_ExtrasInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_skip_extras = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_skip_extras();
	return en_subscribe_skip_extras();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_addons_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Addons_HeadingInputs */
var en_subscribe_step_addons_heading = () => {
	return `Add to your order.`;
};
var am_subscribe_step_addons_heading = () => {
	return `ወደ ትዕዛዝዎ ይጨምሩ።`;
};
/**
* | output |
* | --- |
* | "Add to your order." |
*
* @param {Subscribe_Step_Addons_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_addons_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_addons_heading();
	return en_subscribe_step_addons_heading();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_delivery_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Delivery_HeadingInputs */
var en_subscribe_step_delivery_heading = () => {
	return `Delivery.`;
};
var am_subscribe_step_delivery_heading = () => {
	return `መላኪያ።`;
};
/**
* | output |
* | --- |
* | "Delivery." |
*
* @param {Subscribe_Step_Delivery_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_delivery_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_delivery_heading();
	return en_subscribe_step_delivery_heading();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_details_gift_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Details_Gift_TitleInputs */
var en_subscribe_step_details_gift_title = () => {
	return `Where is it going?`;
};
var am_subscribe_step_details_gift_title = () => {
	return `ወዴት ነው የሚላከው?`;
};
/**
* | output |
* | --- |
* | "Where is it going?" |
*
* @param {Subscribe_Step_Details_Gift_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_details_gift_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_details_gift_title();
	return en_subscribe_step_details_gift_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_details_me_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Details_Me_TitleInputs */
var en_subscribe_step_details_me_title = () => {
	return `Your details.`;
};
var am_subscribe_step_details_me_title = () => {
	return `የእርስዎ ዝርዝሮች።`;
};
/**
* | output |
* | --- |
* | "Your details." |
*
* @param {Subscribe_Step_Details_Me_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_details_me_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_details_me_title();
	return en_subscribe_step_details_me_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_details_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Details_SubInputs */
var en_subscribe_step_details_sub = () => {
	return `Where we deliver every Saturday.`;
};
var am_subscribe_step_details_sub = () => {
	return `በየቅዳሜው የምናደርስበት ቦታ።`;
};
/**
* | output |
* | --- |
* | "Where we deliver every Saturday." |
*
* @param {Subscribe_Step_Details_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_details_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_details_sub();
	return en_subscribe_step_details_sub();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_extras_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Extras_SubInputs */
var en_subscribe_step_extras_sub = () => {
	return `Optional. Added to your first payment only.`;
};
var am_subscribe_step_extras_sub = () => {
	return `አማራጭ ነው። ለመጀመሪያ ክፍያዎ ብቻ ይታከላል።`;
};
/**
* | output |
* | --- |
* | "Optional. Added to your first payment only." |
*
* @param {Subscribe_Step_Extras_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_extras_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_extras_sub();
	return en_subscribe_step_extras_sub();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_extras_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Extras_TitleInputs */
var en_subscribe_step_extras_title = () => {
	return `Add to your first delivery.`;
};
var am_subscribe_step_extras_title = () => {
	return `ወደ መጀመሪያ መላኪያዎ ይጨምሩ።`;
};
/**
* | output |
* | --- |
* | "Add to your first delivery." |
*
* @param {Subscribe_Step_Extras_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_extras_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_extras_title();
	return en_subscribe_step_extras_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_gift_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Gift_HeadingInputs */
var en_subscribe_step_gift_heading = () => {
	return `Sending as a gift?`;
};
var am_subscribe_step_gift_heading = () => {
	return `እንደ ስጦታ እየላኩ ነው?`;
};
/**
* | output |
* | --- |
* | "Sending as a gift?" |
*
* @param {Subscribe_Step_Gift_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_gift_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_gift_heading();
	return en_subscribe_step_gift_heading();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_plan_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Plan_SubInputs */
var en_subscribe_step_plan_sub = () => {
	return `No minimum term. Cancel any time.`;
};
var am_subscribe_step_plan_sub = () => {
	return `ዝቅተኛ የቆይታ ጊዜ የለም። በማንኛውም ጊዜ ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | "No minimum term. Cancel any time." |
*
* @param {Subscribe_Step_Plan_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_plan_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_plan_sub();
	return en_subscribe_step_plan_sub();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_plan_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Plan_TitleInputs */
var en_subscribe_step_plan_title = () => {
	return `Choose your plan.`;
};
var am_subscribe_step_plan_title = () => {
	return `ዕቅድዎን ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Choose your plan." |
*
* @param {Subscribe_Step_Plan_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_plan_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_plan_title();
	return en_subscribe_step_plan_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_review_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Review_TitleInputs */
var en_subscribe_step_review_title = () => {
	return `Review & pay.`;
};
var am_subscribe_step_review_title = () => {
	return `ይገምግሙ እና ይክፈሉ።`;
};
/**
* | output |
* | --- |
* | "Review & pay." |
*
* @param {Subscribe_Step_Review_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_review_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_review_title();
	return en_subscribe_step_review_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_who_sub.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Who_SubInputs */
var en_subscribe_step_who_sub = () => {
	return `For me or as a gift.`;
};
var am_subscribe_step_who_sub = () => {
	return `ለራሴ ወይም እንደ ስጦታ።`;
};
/**
* | output |
* | --- |
* | "For me or as a gift." |
*
* @param {Subscribe_Step_Who_SubInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_who_sub = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_who_sub();
	return en_subscribe_step_who_sub();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_step_who_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Step_Who_TitleInputs */
var en_subscribe_step_who_title = () => {
	return `Who is this for?`;
};
var am_subscribe_step_who_title = () => {
	return `ይህ ለማን ነው?`;
};
/**
* | output |
* | --- |
* | "Who is this for?" |
*
* @param {Subscribe_Step_Who_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_step_who_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_step_who_title();
	return en_subscribe_step_who_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_summary_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Summary_TitleInputs */
var en_subscribe_summary_title = () => {
	return `Order Summary`;
};
var am_subscribe_summary_title = () => {
	return `የትዕዛዝ ማጠቃለያ`;
};
/**
* | output |
* | --- |
* | "Order Summary" |
*
* @param {Subscribe_Summary_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_summary_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_summary_title();
	return en_subscribe_summary_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_tag_monthly_subscription.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Tag_Monthly_SubscriptionInputs */
var en_subscribe_tag_monthly_subscription = () => {
	return `Monthly subscription`;
};
var am_subscribe_tag_monthly_subscription = () => {
	return `ወርሃዊ ምዝገባ`;
};
/**
* | output |
* | --- |
* | "Monthly subscription" |
*
* @param {Subscribe_Tag_Monthly_SubscriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_tag_monthly_subscription = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_tag_monthly_subscription();
	return en_subscribe_tag_monthly_subscription();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_tag_one_time_from.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ price: NonNullable<unknown> }} Subscribe_Tag_One_Time_FromInputs */
var en_subscribe_tag_one_time_from = (i) => {
	return `One-time · From £${i?.price}`;
};
var am_subscribe_tag_one_time_from = (i) => {
	return `አንድ ጊዜ ብቻ · ከ£${i?.price} ጀምሮ`;
};
/**
* | output |
* | --- |
* | "One-time · From £{price}" |
*
* @param {Subscribe_Tag_One_Time_FromInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_tag_one_time_from = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_tag_one_time_from(inputs);
	return en_subscribe_tag_one_time_from(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_terms_and.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Terms_AndInputs */
var en_subscribe_terms_and = () => {
	return `and`;
};
var am_subscribe_terms_and = () => {
	return `እና`;
};
/**
* | output |
* | --- |
* | "and" |
*
* @param {Subscribe_Terms_AndInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_terms_and = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_terms_and();
	return en_subscribe_terms_and();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_terms_link1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Terms_Link1Inputs */
var en_subscribe_terms_link1 = () => {
	return `Subscription Terms`;
};
var am_subscribe_terms_link1 = () => {
	return `የምዝገባ ውሎች`;
};
/**
* | output |
* | --- |
* | "Subscription Terms" |
*
* @param {Subscribe_Terms_Link1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_terms_link1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_terms_link1();
	return en_subscribe_terms_link1();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_terms_link2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Terms_Link2Inputs */
var en_subscribe_terms_link2 = () => {
	return `Privacy Policy`;
};
var am_subscribe_terms_link2 = () => {
	return `የግላዊነት ፖሊሲ`;
};
/**
* | output |
* | --- |
* | "Privacy Policy" |
*
* @param {Subscribe_Terms_Link2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_terms_link2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_terms_link2();
	return en_subscribe_terms_link2();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_terms_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Terms_PrefixInputs */
var en_subscribe_terms_prefix = () => {
	return `By continuing you agree to our`;
};
var am_subscribe_terms_prefix = () => {
	return `በመቀጠል የእኛን`;
};
/**
* | output |
* | --- |
* | "By continuing you agree to our" |
*
* @param {Subscribe_Terms_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_terms_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_terms_prefix();
	return en_subscribe_terms_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_terms_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Terms_SuffixInputs */
var en_subscribe_terms_suffix = () => {
	return `. Cancel any time from your account.`;
};
var am_subscribe_terms_suffix = () => {
	return ` ተስማምተዋል። ከአካውንትዎ በማንኛውም ጊዜ ይሰርዙ።`;
};
/**
* | output |
* | --- |
* | ". Cancel any time from your account." |
*
* @param {Subscribe_Terms_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_terms_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_terms_suffix();
	return en_subscribe_terms_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_title_continue.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Title_ContinueInputs */
var en_subscribe_title_continue = () => {
	return `Continue`;
};
var am_subscribe_title_continue = () => {
	return `ቀጥል`;
};
/**
* | output |
* | --- |
* | "Continue" |
*
* @param {Subscribe_Title_ContinueInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_title_continue = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_title_continue();
	return en_subscribe_title_continue();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_title_login_to_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Title_Login_To_GiftInputs */
var en_subscribe_title_login_to_gift = () => {
	return `Please log in to gift a subscription`;
};
var am_subscribe_title_login_to_gift = () => {
	return `ስጦታ ለመላክ እባክዎ ይግቡ`;
};
/**
* | output |
* | --- |
* | "Please log in to gift a subscription" |
*
* @param {Subscribe_Title_Login_To_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_title_login_to_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_title_login_to_gift();
	return en_subscribe_title_login_to_gift();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_title_login_to_subscribe.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Title_Login_To_SubscribeInputs */
var en_subscribe_title_login_to_subscribe = () => {
	return `Please log in to subscribe`;
};
var am_subscribe_title_login_to_subscribe = () => {
	return `ለመመዝገብ እባክዎ ይግቡ`;
};
/**
* | output |
* | --- |
* | "Please log in to subscribe" |
*
* @param {Subscribe_Title_Login_To_SubscribeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_title_login_to_subscribe = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_title_login_to_subscribe();
	return en_subscribe_title_login_to_subscribe();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_title_please_sign_in.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Title_Please_Sign_InInputs */
var en_subscribe_title_please_sign_in = () => {
	return `Please sign in`;
};
var am_subscribe_title_please_sign_in = () => {
	return `እባክዎ ይግቡ`;
};
/**
* | output |
* | --- |
* | "Please sign in" |
*
* @param {Subscribe_Title_Please_Sign_InInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_title_please_sign_in = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_title_please_sign_in();
	return en_subscribe_title_please_sign_in();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_unit_one_time.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Unit_One_TimeInputs */
var en_subscribe_unit_one_time = () => {
	return `one-time`;
};
var am_subscribe_unit_one_time = () => {
	return `አንድ ጊዜ ብቻ`;
};
/**
* | output |
* | --- |
* | "one-time" |
*
* @param {Subscribe_Unit_One_TimeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_unit_one_time = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_unit_one_time();
	return en_subscribe_unit_one_time();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_unit_per_month.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Unit_Per_MonthInputs */
var en_subscribe_unit_per_month = () => {
	return `/ month`;
};
var am_subscribe_unit_per_month = () => {
	return `/ በወር`;
};
/**
* | output |
* | --- |
* | "/ month" |
*
* @param {Subscribe_Unit_Per_MonthInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_unit_per_month = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_unit_per_month();
	return en_subscribe_unit_per_month();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_who_gift_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Who_Gift_DescInputs */
var en_subscribe_who_gift_desc = () => {
	return `One-time order · Different address · No subscription`;
};
var am_subscribe_who_gift_desc = () => {
	return `አንድ ጊዜ ብቻ የሚደረግ ትዕዛዝ · የተለየ አድራሻ · ምዝገባ የለም`;
};
/**
* | output |
* | --- |
* | "One-time order · Different address · No subscription" |
*
* @param {Subscribe_Who_Gift_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_who_gift_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_who_gift_desc();
	return en_subscribe_who_gift_desc();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_who_gift_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Who_Gift_TitleInputs */
var en_subscribe_who_gift_title = () => {
	return `As a gift`;
};
var am_subscribe_who_gift_title = () => {
	return `እንደ ስጦታ`;
};
/**
* | output |
* | --- |
* | "As a gift" |
*
* @param {Subscribe_Who_Gift_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_who_gift_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_who_gift_title();
	return en_subscribe_who_gift_title();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_who_me_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Who_Me_DescInputs */
var en_subscribe_who_me_desc = () => {
	return `Monthly subscription · Manage from your account`;
};
var am_subscribe_who_me_desc = () => {
	return `ወርሃዊ ምዝገባ · ከአካውንትዎ ያስተዳድሩ`;
};
/**
* | output |
* | --- |
* | "Monthly subscription · Manage from your account" |
*
* @param {Subscribe_Who_Me_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_who_me_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_who_me_desc();
	return en_subscribe_who_me_desc();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_who_me_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Who_Me_TitleInputs */
var en_subscribe_who_me_title = () => {
	return `For me`;
};
var am_subscribe_who_me_title = () => {
	return `ለራሴ`;
};
/**
* | output |
* | --- |
* | "For me" |
*
* @param {Subscribe_Who_Me_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_who_me_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_who_me_title();
	return en_subscribe_who_me_title();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_default_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Default_TitleInputs */
var en_authsheet_default_title = () => {
	return `Log In`;
};
var am_authsheet_default_title = () => {
	return `ግባ`;
};
/**
* | output |
* | --- |
* | "Log In" |
*
* @param {Authsheet_Default_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_default_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_default_title();
	return en_authsheet_default_title();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_TitleInputs */
var en_authsheet_title = () => {
	return `Sign in to place your order`;
};
var am_authsheet_title = () => {
	return `ትዕዛዝዎን ለማስቀመጥ ይግቡ`;
};
/**
* | output |
* | --- |
* | "Sign in to place your order" |
*
* @param {Authsheet_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_title();
	return en_authsheet_title();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_SubtitleInputs */
var en_authsheet_subtitle = () => {
	return `So we can send your confirmation and let you track delivery.`;
};
var am_authsheet_subtitle = () => {
	return `ማረጋገጫ እንድንልክልዎ እና ማድረሻዎን እንዲከታተሉ ለማስቻል።`;
};
/**
* | output |
* | --- |
* | "So we can send your confirmation and let you track delivery." |
*
* @param {Authsheet_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_subtitle();
	return en_authsheet_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_sr_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Sr_HeadingInputs */
var en_authsheet_sr_heading = () => {
	return `Sign in to Gotera`;
};
var am_authsheet_sr_heading = () => {
	return `ወደ ጎተራ ይግቡ`;
};
/**
* | output |
* | --- |
* | "Sign in to Gotera" |
*
* @param {Authsheet_Sr_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_sr_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_sr_heading();
	return en_authsheet_sr_heading();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_tagline.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_TaglineInputs */
var en_authsheet_tagline = () => {
	return `One tap — fastest way in`;
};
var am_authsheet_tagline = () => {
	return `አንድ ንክኪ ብቻ — ፈጣኑ የመግቢያ መንገድ`;
};
/**
* | output |
* | --- |
* | "One tap — fastest way in" |
*
* @param {Authsheet_TaglineInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_tagline = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_tagline();
	return en_authsheet_tagline();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_or_use_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Or_Use_EmailInputs */
var en_authsheet_or_use_email = () => {
	return `or use email`;
};
var am_authsheet_or_use_email = () => {
	return `ወይም በኢሜይል ይግቡ`;
};
/**
* | output |
* | --- |
* | "or use email" |
*
* @param {Authsheet_Or_Use_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_or_use_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_or_use_email();
	return en_authsheet_or_use_email();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_continue_with_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Continue_With_EmailInputs */
var en_authsheet_continue_with_email = () => {
	return `Continue with email`;
};
var am_authsheet_continue_with_email = () => {
	return `በኢሜይል ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Continue with email" |
*
* @param {Authsheet_Continue_With_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_continue_with_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_continue_with_email();
	return en_authsheet_continue_with_email();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_terms_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Terms_PrefixInputs */
var en_authsheet_terms_prefix = () => {
	return `By continuing you agree to our`;
};
var am_authsheet_terms_prefix = () => {
	return `በመቀጠልዎ የእኛን`;
};
/**
* | output |
* | --- |
* | "By continuing you agree to our" |
*
* @param {Authsheet_Terms_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_terms_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_terms_prefix();
	return en_authsheet_terms_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_terms_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Terms_LinkInputs */
var en_authsheet_terms_link = () => {
	return `Terms`;
};
var am_authsheet_terms_link = () => {
	return `የአገልግሎት ውሎች`;
};
/**
* | output |
* | --- |
* | "Terms" |
*
* @param {Authsheet_Terms_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_terms_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_terms_link();
	return en_authsheet_terms_link();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_terms_and.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Terms_AndInputs */
var en_authsheet_terms_and = () => {
	return `and`;
};
var am_authsheet_terms_and = () => {
	return `እና`;
};
/**
* | output |
* | --- |
* | "and" |
*
* @param {Authsheet_Terms_AndInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_terms_and = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_terms_and();
	return en_authsheet_terms_and();
});
//#endregion
//#region src/lib/paraglide/messages/authsheet_privacy_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsheet_Privacy_LinkInputs */
var en_authsheet_privacy_link = () => {
	return `Privacy Policy`;
};
var am_authsheet_privacy_link = () => {
	return `የግላዊነት ፖሊሲ`;
};
/**
* | output |
* | --- |
* | "Privacy Policy" |
*
* @param {Authsheet_Privacy_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsheet_privacy_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsheet_privacy_link();
	return en_authsheet_privacy_link();
});
//#endregion
//#region src/lib/paraglide/messages/google_continue_with_google.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Google_Continue_With_GoogleInputs */
var en_google_continue_with_google = () => {
	return `Continue with Google`;
};
var am_google_continue_with_google = () => {
	return `በGoogle ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Google_Continue_With_GoogleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var google_continue_with_google = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_google_continue_with_google();
	return en_google_continue_with_google();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_eyebrow_create_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Eyebrow_Create_AccountInputs */
var en_authsignup_eyebrow_create_account = () => {
	return `Create account`;
};
var am_authsignup_eyebrow_create_account = () => {
	return `መለያ ይፍጠሩ`;
};
/**
* | output |
* | --- |
* | "Create account" |
*
* @param {Authsignup_Eyebrow_Create_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_eyebrow_create_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_eyebrow_create_account();
	return en_authsignup_eyebrow_create_account();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_join_gotera.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Join_GoteraInputs */
var en_authsignup_join_gotera = () => {
	return `Join GOTERA.`;
};
var am_authsignup_join_gotera = () => {
	return `ከጎተራ ጋር ይቀላቀሉ።`;
};
/**
* | output |
* | --- |
* | "Join GOTERA." |
*
* @param {Authsignup_Join_GoteraInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_join_gotera = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_join_gotera();
	return en_authsignup_join_gotera();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_tagline.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_TaglineInputs */
var en_authsignup_tagline = () => {
	return `Real injera, made in Ethiopia, delivered every month.`;
};
var am_authsignup_tagline = () => {
	return `ትክክለኛ እንጀራ፣ በኢትዮጵያ የተዘጋጀ፣ በየወሩ ይደርስዎታል።`;
};
/**
* | output |
* | --- |
* | "Real injera, made in Ethiopia, delivered every month." |
*
* @param {Authsignup_TaglineInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_tagline = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_tagline();
	return en_authsignup_tagline();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_google_continue.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Google_ContinueInputs */
var en_authsignup_google_continue = () => {
	return `Continue with Google`;
};
var am_authsignup_google_continue = () => {
	return `በGoogle ይቀጥሉ`;
};
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Authsignup_Google_ContinueInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_google_continue = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_google_continue();
	return en_authsignup_google_continue();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_divider_or.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Divider_OrInputs */
var en_authsignup_divider_or = () => {
	return `or`;
};
var am_authsignup_divider_or = () => {
	return `ወይም`;
};
/**
* | output |
* | --- |
* | "or" |
*
* @param {Authsignup_Divider_OrInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_divider_or = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_divider_or();
	return en_authsignup_divider_or();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_label_full_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Label_Full_NameInputs */
var en_authsignup_label_full_name = () => {
	return `Full name`;
};
var am_authsignup_label_full_name = () => {
	return `ሙሉ ስም`;
};
/**
* | output |
* | --- |
* | "Full name" |
*
* @param {Authsignup_Label_Full_NameInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_label_full_name = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_label_full_name();
	return en_authsignup_label_full_name();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_label_email.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Label_EmailInputs */
var en_authsignup_label_email = () => {
	return `Email`;
};
var am_authsignup_label_email = () => {
	return `ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Authsignup_Label_EmailInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_label_email = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_label_email();
	return en_authsignup_label_email();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_label_password.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Label_PasswordInputs */
var en_authsignup_label_password = () => {
	return `Password`;
};
var am_authsignup_label_password = () => {
	return `የይለፍ ቃል`;
};
/**
* | output |
* | --- |
* | "Password" |
*
* @param {Authsignup_Label_PasswordInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_label_password = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_label_password();
	return en_authsignup_label_password();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_label_confirm_password.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Label_Confirm_PasswordInputs */
var en_authsignup_label_confirm_password = () => {
	return `Confirm password`;
};
var am_authsignup_label_confirm_password = () => {
	return `የይለፍ ቃል ያረጋግጡ`;
};
/**
* | output |
* | --- |
* | "Confirm password" |
*
* @param {Authsignup_Label_Confirm_PasswordInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_label_confirm_password = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_label_confirm_password();
	return en_authsignup_label_confirm_password();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_optin_marketing.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Optin_MarketingInputs */
var en_authsignup_optin_marketing = () => {
	return `Send me occasional updates and offers.`;
};
var am_authsignup_optin_marketing = () => {
	return `አልፎ አልፎ ዝማኔዎችን እና ቅናሾችን ላኩልኝ።`;
};
/**
* | output |
* | --- |
* | "Send me occasional updates and offers." |
*
* @param {Authsignup_Optin_MarketingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_optin_marketing = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_optin_marketing();
	return en_authsignup_optin_marketing();
});
//#endregion
//#region src/lib/paraglide/messages/authsignup_create_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Authsignup_Create_AccountInputs */
var en_authsignup_create_account = () => {
	return `Create account`;
};
var am_authsignup_create_account = () => {
	return `መለያ ይፍጠሩ`;
};
/**
* | output |
* | --- |
* | "Create account" |
*
* @param {Authsignup_Create_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var authsignup_create_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_authsignup_create_account();
	return en_authsignup_create_account();
});
//#endregion
//#region src/lib/forms/Google.svelte
function Google($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { hint } = $$props;
		const initials = derived(() => (hint?.name ?? hint?.email ?? "").split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join(""));
		onDestroy(() => void 0);
		$$renderer.push(`<div class="google-shell svelte-2wdkus"><div class="btn-google svelte-2wdkus" aria-hidden="true"><span class="mark svelte-2wdkus">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg class="g-icon svelte-2wdkus" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg>`);
		$$renderer.push(`<!--]--></span> <span class="label svelte-2wdkus">${escape_html(google_continue_with_google())}</span> `);
		if (hint && true) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="chip svelte-2wdkus"${attr("title", hint.email)}>`);
			if (hint.image) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img${attr("src", hint.image)} alt="" class="svelte-2wdkus"/>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(initials())}`);
			}
			$$renderer.push(`<!--]--></span>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span></span>`);
		}
		$$renderer.push(`<!--]--></div> <div class="gsi-host svelte-2wdkus"></div></div>`);
	});
}
//#endregion
//#region src/lib/forms/Signup.svelte
function Signup($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data} = $$props;
		const { form, errors } = superForm(data, { SPA: true });
		let loading = false;
		let googleLoading = false;
		$$renderer.push(`<div class="auth-wrap svelte-1mismyz"><div class="auth-card svelte-1mismyz">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="brand svelte-1mismyz"><span class="eyebrow svelte-1mismyz">${escape_html(authsignup_eyebrow_create_account())}</span> <h1 class="svelte-1mismyz">${escape_html(authsignup_join_gotera())}</h1> <p class="sub svelte-1mismyz">${escape_html(authsignup_tagline())}</p></div> <button type="button" class="btn-google svelte-1mismyz"${attr("disabled", googleLoading, true)}><svg class="g-icon svelte-1mismyz" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></svg> ${escape_html(authsignup_google_continue())}</button> <div class="divider svelte-1mismyz">${escape_html(authsignup_divider_or())}</div> <form class="form svelte-1mismyz"><div class="field svelte-1mismyz"><label class="field-label svelte-1mismyz" for="name">${escape_html(authsignup_label_full_name())}</label> <input id="name" name="name" class="input svelte-1mismyz" autocomplete="name"${attr("value", store_get($$store_subs ??= {}, "$form", form).name)}/> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).name) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1mismyz">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).name)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="field svelte-1mismyz"><label class="field-label svelte-1mismyz" for="email">${escape_html(authsignup_label_email())}</label> <input id="email" name="email" type="email" class="input svelte-1mismyz" autocomplete="email"${attr("value", store_get($$store_subs ??= {}, "$form", form).email)}/> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).email) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1mismyz">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).email)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="field svelte-1mismyz"><label class="field-label svelte-1mismyz" for="password">${escape_html(authsignup_label_password())}</label> <input id="password" name="password" type="password" class="input svelte-1mismyz" autocomplete="new-password"${attr("value", store_get($$store_subs ??= {}, "$form", form).password)}/> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).password) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1mismyz">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).password)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="field svelte-1mismyz"><label class="field-label svelte-1mismyz" for="confirmPassword">${escape_html(authsignup_label_confirm_password())}</label> <input id="confirmPassword" name="confirmPassword" type="password" class="input svelte-1mismyz" autocomplete="new-password"${attr("value", store_get($$store_subs ??= {}, "$form", form).confirmPassword)}/> `);
		if (store_get($$store_subs ??= {}, "$errors", errors).confirmPassword) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="form-error svelte-1mismyz">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).confirmPassword)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <label class="opt-in svelte-1mismyz"><input type="checkbox"${attr("checked", store_get($$store_subs ??= {}, "$form", form).marketingOptIn, true)} class="svelte-1mismyz"/> <span>${escape_html(authsignup_optin_marketing())}</span></label> <button type="submit" class="btn btn-full svelte-1mismyz"${attr("disabled", loading, true)}>${escape_html(authsignup_create_account())}</button></form>`);
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/AuthSheet.svelte
function AuthSheet($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, loginOpen = false, title = authsheet_default_title(), variant = "ghost", signupOpen = false, onAuthenticated } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			DialogComp($$renderer, {
				variant,
				class: variant !== "ghost" ? "w-full! p-6! rounded-none! bg-[#1a1a1a] text-white" : "",
				title,
				children: ($$renderer) => {
					$$renderer.push(`<div class="auth svelte-1hxuhi0"><div><div class="auth-title svelte-1hxuhi0">${escape_html(authsheet_title())}</div> <div class="auth-sub svelte-1hxuhi0">${escape_html(authsheet_subtitle())}</div></div> <h3 id="auth-heading" class="sr-only svelte-1hxuhi0">${escape_html(authsheet_sr_heading())}</h3> <div class="google-slot">`);
					Google($$renderer, {
						hint: data?.lastAccount
					});
					$$renderer.push(`<!----></div> <p class="tagline svelte-1hxuhi0">${escape_html(authsheet_tagline())}</p> <div class="rule svelte-1hxuhi0" role="separator"><span>${escape_html(authsheet_or_use_email())}</span></div> <div class="email-slot svelte-1hxuhi0">`);
					DialogComp($$renderer, {
						variant: "outline",
						title: authsheet_continue_with_email(),
						IconComp: User_round_plus,
						get open() {
							return signupOpen;
						},
						set open($$value) {
							signupOpen = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							Signup($$renderer, {
								data});
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="terms svelte-1hxuhi0">${escape_html(authsheet_terms_prefix())} <a href="/terms" class="svelte-1hxuhi0">${escape_html(authsheet_terms_link())}</a> ${escape_html(authsheet_terms_and())} <a href="/privacy" class="svelte-1hxuhi0">${escape_html(authsheet_privacy_link())}</a>.</div></div>`);
				},
				$$slots: { default: true }
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			loginOpen,
			signupOpen
		});
	});
}
//#endregion
//#region src/routes/subscribe/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, submitting, capture, restore } = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: false,
			onUpdated({ form }) {
				const m = form.message;
				if (!m) return;
				if (m.type === "success") toast.success(m.text);
				else if (m.type === "error") toast.error(m.text);
				else toast.warning(m.text);
			}
		});
		const subscriptionPlans = derived(() => data?.subscriptionPlans ?? []);
		const giftPlans = derived(() => data?.giftPlans ?? []);
		const hasSubscriptions = derived(() => subscriptionPlans().length > 0);
		const hasGifts = derived(() => giftPlans().length > 0);
		const bothModes = derived(() => hasSubscriptions() && hasGifts());
		const onlyMode = derived(() => hasSubscriptions() && !hasGifts() ? "me" : hasGifts() && !hasSubscriptions() ? "gift" : null);
		const hasAddons = derived(() => (data?.addons?.length ?? 0) > 0);
		const activeAddons = derived(() => data?.addons.filter((a) => store_get($$store_subs ??= {}, "$form", form).addonIds.includes(a.id)) ?? []);
		const addonsTotal = derived(() => activeAddons().reduce((sum, a) => sum + a.pricePence / 100, 0));
		const currentPlanDetails = derived(() => store_get($$store_subs ??= {}, "$form", form).recipient === "me" ? subscriptionPlans().find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).plan) ?? subscriptionPlans()[subscriptionPlans().length - 1] : giftPlans().find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).plan) ?? giftPlans()[0]);
		let isOrder = derived(() => data?.subscriptionPlans.find((sub) => sub.id === store_get($$store_subs ??= {}, "$form", form).plan)?.kind === "order");
		const qty = derived(() => Math.max(1, Math.floor(Number(store_get($$store_subs ??= {}, "$form", form).quantity)) || 1));
		const planLineTotal = derived(() => (currentPlanDetails()?.price ?? 0) * qty());
		const finalTotalPrice = derived(() => planLineTotal() + addonsTotal());
		const mePrice = derived(() => subscriptionPlans().find((p) => p.id === "regular")?.price ?? subscriptionPlans()[subscriptionPlans().length - 1]?.price ?? 0);
		const giftFromPrice = derived(() => giftPlans().length ? Math.min(...giftPlans().map((p) => p.price)) : 8.5);
		const preselected = derived(() => data?.preselected ?? null);
		const skipIntro = derived(() => !!preselected() && (!onlyMode() || preselected().recipient === onlyMode()));
		const STEPS = derived(() => [
			...bothModes() ? ["who"] : [],
			"plan",
			...hasAddons() ? ["extras"] : [],
			"details",
			"review"
		]);
		const DESKTOP_STEPS = derived(() => [
			...bothModes() ? ["who"] : [],
			"plan",
			"delivery",
			...hasAddons() ? ["addons"] : [],
			"details"
		]);
		const stepNo = (key) => String(DESKTOP_STEPS().indexOf(key) + 1).padStart(2, "0");
		let animating = false;
		function initialStepIdx() {
			return skipIntro() ? Math.max(STEPS().indexOf(hasAddons() ? "extras" : "details"), 0) : 0;
		}
		let stepIdx = initialStepIdx();
		const snapshot = {
			capture: () => ({
				form: capture(),
				stepIdx
			}),
			restore: (value) => {
				restore(value?.form);
				if (typeof value?.stepIdx === "number") stepIdx = Math.min(Math.max(value.stepIdx, 0), STEPS().length - 1);
			}
		};
		const step = derived(() => STEPS()[Math.min(stepIdx, STEPS().length - 1)]);
		const progress = derived(() => (stepIdx + 1) / STEPS().length * 100);
		let loginOpen = false;
		let signupOpen = false;
		const cardTitle = derived(() => ({
			who: subscribe_step_who_title(),
			plan: subscribe_step_plan_title(),
			extras: subscribe_step_extras_title(),
			details: store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? subscribe_step_details_gift_title() : subscribe_step_details_me_title(),
			review: subscribe_step_review_title()
		})[step()]);
		const cardSub = derived(() => ({
			who: subscribe_step_who_sub(),
			plan: subscribe_step_plan_sub(),
			extras: subscribe_step_extras_sub(),
			details: subscribe_step_details_sub(),
			review: `${currentPlanDetails()?.name ?? ""}${qty() > 1 ? ` × ${qty()}` : ""} · £${planLineTotal().toFixed(2)}`
		})[step()]);
		const ctaLabel = derived(() => step() === "review" ? store_get($$store_subs ??= {}, "$submitting", submitting) ? subscribe_cta_processing() : store_get($$store_subs ??= {}, "$form", form).recipient === "me" ? isOrder() ? subscribe_cta_order_price({ price: finalTotalPrice().toFixed(2) }) : subscribe_cta_subscribe_price({ price: finalTotalPrice().toFixed(2) }) : subscribe_cta_continue_gift({ price: finalTotalPrice().toFixed(2) }) : step() === "extras" ? store_get($$store_subs ??= {}, "$form", form).addonIds.length > 0 ? store_get($$store_subs ??= {}, "$form", form).addonIds.length > 1 ? subscribe_cta_continue_with_extras({ count: store_get($$store_subs ??= {}, "$form", form).addonIds.length }) : subscribe_cta_continue_with_extra({ count: store_get($$store_subs ??= {}, "$form", form).addonIds.length }) : subscribe_cta_continue() : subscribe_cta_continue());
		function submitAfterAuth() {
			if (store_get($$store_subs ??= {}, "$submitting", submitting)) return;
			const formEl = document.getElementById("start");
			if (!formEl) return;
			const action = store_get($$store_subs ??= {}, "$form", form).recipient === "me" && data?.user ? "?/subscribe" : isOrder() && !data?.user ? "?/guestOrder" : "?/gift";
			const submitter = document.createElement("button");
			submitter.type = "submit";
			submitter.formAction = action;
			submitter.hidden = true;
			formEl.appendChild(submitter);
			formEl.requestSubmit(submitter);
			submitter.remove();
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("s93h2j", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(subscribe_page_title())}</title>`);
				});
				$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
			});
			$$renderer.push(`<div class="sub-page mobile-view svelte-s93h2j"><div class="sub-bg svelte-s93h2j"><div class="sub-plan-hero svelte-s93h2j">`);
			if (step() === "who") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="sub-plan-eyebrow svelte-s93h2j">${escape_html(subscribe_eyebrow())}</span> <span class="sub-plan-name svelte-s93h2j">${escape_html(subscribe_hero_heading_1())}<br/>${escape_html(subscribe_hero_heading_2())}</span> <span class="sub-plan-price svelte-s93h2j">${escape_html(subscribe_hero_no_minimum())}</span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="sub-plan-eyebrow svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? subscribe_badge_gift() : subscribe_plan_name_suffix({ name: currentPlanDetails()?.name ?? "" }))}</span> <span class="sub-plan-name svelte-s93h2j">${escape_html(currentPlanDetails()?.name)}<br/><em class="svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? subscribe_freq_one_time() : subscribe_freq_every_month())}</em></span> <span class="sub-plan-price svelte-s93h2j"><strong class="svelte-s93h2j">£${escape_html((currentPlanDetails()?.price ?? 0).toFixed(2))}</strong> ${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "me" ? subscribe_unit_per_month() : subscribe_unit_one_time())} `);
				if (addonsTotal() > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`· <strong class="svelte-s93h2j">+£${escape_html(addonsTotal().toFixed(2))}</strong> ${escape_html(subscribe_extras_label())}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span>`);
			}
			$$renderer.push(`<!--]--></div></div> <div class="sub-progress svelte-s93h2j"><div class="sub-progress__fill svelte-s93h2j"${attr_style(`width:${stringify$1(progress())}%`)}></div></div> <form class="sub-card-wrap svelte-s93h2j" method="POST" id="start"><div${attr_class("sub-card svelte-s93h2j", void 0, { "animating": animating })}><div class="sub-card__head svelte-s93h2j">`);
			if (stepIdx > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button type="button" class="sub-back svelte-s93h2j"${attr("aria-label", subscribe_back_aria())}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" class="svelte-s93h2j"><path d="M15 18l-6-6 6-6"></path></svg> ${escape_html(subscribe_back_label())}</button>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="sub-card__title svelte-s93h2j">${escape_html(cardTitle())}</span> <span class="sub-card__sub svelte-s93h2j">${escape_html(cardSub())}</span></div> <div class="sub-card__body svelte-s93h2j">`);
			if (step() === "who") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="who-cards svelte-s93h2j"><button type="button"${attr_class("who-card svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).recipient === "me" })}><div class="who-card__icon svelte-s93h2j"><svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div> <div class="who-card__text svelte-s93h2j"><h3 class="svelte-s93h2j">${escape_html(subscribe_who_me_title())}</h3> <p class="svelte-s93h2j">${escape_html(subscribe_who_me_desc())}</p></div> <div class="who-card__price svelte-s93h2j">£${escape_html(mePrice().toFixed(0))}<br/><span class="svelte-s93h2j">${escape_html(subscribe_unit_per_month())}</span></div></button> <button type="button"${attr_class("who-card svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).recipient === "gift" })}><div class="who-card__icon svelte-s93h2j"><svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="1.5"><path d="M20 12V22H4V12"></path><path d="M22 7H2v5h20V7z"></path><path d="M12 22V7"></path><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div> <div class="who-card__text svelte-s93h2j"><h3 class="svelte-s93h2j">${escape_html(subscribe_who_gift_title())}</h3> <p class="svelte-s93h2j">${escape_html(subscribe_who_gift_desc())}</p></div> <div class="who-card__price svelte-s93h2j">${escape_html(subscribe_from_label())}<br/>£${escape_html(giftFromPrice().toFixed(2))}</div></button></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (step() === "plan") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="plan-sel svelte-s93h2j"><!--[-->`);
				const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? giftPlans() : subscriptionPlans());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let p = each_array[$$index];
					$$renderer.push(`<button type="button"${attr_class("plan-sel-card svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).plan === p.id })}>`);
					if (p.featured) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="plan-sel-card__badge svelte-s93h2j">${escape_html(subscribe_badge_popular())}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <div${attr_class("plan-sel-card__name svelte-s93h2j", void 0, { "pad": p.featured })}><h3 class="svelte-s93h2j">${escape_html(p.name)}</h3> <p class="svelte-s93h2j">${escape_html(p.freq)}</p></div> <div${attr_class("plan-sel-card__price svelte-s93h2j", void 0, { "pad": p.featured })}><span class="plan-sel-card__price-num svelte-s93h2j">£${escape_html(p.price.toFixed(p.price % 1 === 0 ? 0 : 2))}</span> <span class="plan-sel-card__price-freq svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "me" ? subscribe_freq_per_month() : subscribe_unit_one_time())}</span></div> <div class="plan-sel-card__dot svelte-s93h2j"></div></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).plan) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).plan)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (step() === "extras") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="extras-row svelte-s93h2j"><!--[-->`);
				const each_array_1 = ensure_array_like(data?.addons);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let addon = each_array_1[$$index_1];
					$$renderer.push(`<button type="button"${attr_class("extra-card svelte-s93h2j", void 0, { "added": store_get($$store_subs ??= {}, "$form", form).addonIds.includes(addon.id) })}><div class="extra-card__img svelte-s93h2j">${escape_html(addon.name)}</div> <div class="extra-card__body svelte-s93h2j"><span class="extra-card__name svelte-s93h2j">${escape_html(addon.name)}</span> `);
					if (addon.description) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="extra-card__desc svelte-s93h2j">${escape_html(addon.description)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <span class="extra-card__price svelte-s93h2j">+£${escape_html((addon.pricePence / 100).toFixed(2))}</span> <span class="extra-card__btn svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).addonIds.includes(addon.id) ? subscribe_addon_added() : subscribe_addon_add())}</span></div></button>`);
				}
				$$renderer.push(`<!--]--></div> <button type="button" class="skip-link svelte-s93h2j">${escape_html(subscribe_skip_extras())}</button> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).addonIds?._errors) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).addonIds._errors)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (step() === "details") {
				$$renderer.push("<!--[0-->");
				if (store_get($$store_subs ??= {}, "$form", form).recipient === "gift") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="sub-field svelte-s93h2j"><label for="phone" class="svelte-s93h2j">${escape_html(subscribe_field_phone_gift_label())}</label> <input id="phone" type="tel"${attr("value", store_get($$store_subs ??= {}, "$form", form).phone)} class="svelte-s93h2j"/></div> <div class="sub-field svelte-s93h2j"><label for="m-buyerEmail" class="svelte-s93h2j">${escape_html(subscribe_field_email_label())}</label> <input id="m-buyerEmail" type="email"${attr("placeholder", subscribe_placeholder_email())}${attr("value", store_get($$store_subs ??= {}, "$form", form).buyerEmail)} class="svelte-s93h2j"/> <span class="sub-field-note svelte-s93h2j">${escape_html(subscribe_note_confirmation_receipt())}</span> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).buyerEmail) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).buyerEmail)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="sub-field svelte-s93h2j"><label for="m-recipientName" class="svelte-s93h2j">${escape_html(subscribe_field_recipient_name_label())}</label> <input id="m-recipientName" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).recipientName)} class="svelte-s93h2j"/> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).recipientName) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).recipientName)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="sub-divider svelte-s93h2j"></div> <span class="sub-section-label svelte-s93h2j">${escape_html(subscribe_section_delivery_address())}</span> <div class="sub-field svelte-s93h2j"><label for="m-line1" class="svelte-s93h2j">${escape_html(subscribe_field_line1_label())}</label> <input id="m-line1" type="text"${attr("placeholder", subscribe_placeholder_street())}${attr("value", store_get($$store_subs ??= {}, "$form", form).line1)} class="svelte-s93h2j"/> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).line1) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).line1)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="sub-field svelte-s93h2j"><label for="m-line2" class="svelte-s93h2j">${escape_html(subscribe_field_line2_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional_paren())}</span></label> <input id="m-line2" type="text"${attr("placeholder", subscribe_placeholder_flat())}${attr("value", store_get($$store_subs ??= {}, "$form", form).line2)} class="svelte-s93h2j"/></div> <div class="sub-field svelte-s93h2j"><div class="sub-field-row svelte-s93h2j"><div><label for="m-city" class="svelte-s93h2j">${escape_html(subscribe_field_city_label())}</label> <input id="m-city" type="text" disabled=""${attr("placeholder", subscribe_placeholder_london())}${attr("value", store_get($$store_subs ??= {}, "$form", form).city)} class="svelte-s93h2j"/></div> <div><label for="m-postcode" class="svelte-s93h2j">${escape_html(subscribe_field_postcode_label())}</label> <input id="m-postcode" type="text"${attr("placeholder", subscribe_placeholder_postcode())}${attr("value", store_get($$store_subs ??= {}, "$form", form).postcode)} class="svelte-s93h2j"/></div></div> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).postcode) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).postcode)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="sub-field svelte-s93h2j"><label for="m-giftMessage" class="svelte-s93h2j">${escape_html(subscribe_field_gift_message_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional_paren())}</span></label> <input id="m-giftMessage" type="text"${attr("placeholder", subscribe_placeholder_gift_note())}${attr("value", store_get($$store_subs ??= {}, "$form", form).giftMessage)} class="svelte-s93h2j"/></div>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="sub-field svelte-s93h2j"><label for="phone" class="svelte-s93h2j">${escape_html(subscribe_field_phone_label())}</label> <input id="phone" type="tel" name="address"${attr("value", store_get($$store_subs ??= {}, "$form", form).phone)} class="svelte-s93h2j"/></div> <div class="sub-field svelte-s93h2j"><label for="m-line1b" class="svelte-s93h2j">${escape_html(subscribe_field_line1_label())}</label> <input id="m-line1b" type="text"${attr("placeholder", subscribe_placeholder_street())}${attr("value", store_get($$store_subs ??= {}, "$form", form).line1)} class="svelte-s93h2j"/> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).line1) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).line1)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="sub-field svelte-s93h2j"><label for="m-line2b" class="svelte-s93h2j">${escape_html(subscribe_field_line2_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional_paren())}</span></label> <input id="m-line2b" type="text"${attr("placeholder", subscribe_placeholder_flat())}${attr("value", store_get($$store_subs ??= {}, "$form", form).line2)} class="svelte-s93h2j"/></div> <div class="sub-field svelte-s93h2j"><div class="sub-field-row svelte-s93h2j"><div><label for="m-cityb" class="svelte-s93h2j">${escape_html(subscribe_field_city_label())}</label> <input id="m-cityb" type="text" disabled=""${attr("placeholder", subscribe_placeholder_london())}${attr("value", store_get($$store_subs ??= {}, "$form", form).city)} class="svelte-s93h2j"/></div> <div><label for="m-postcodeb" class="svelte-s93h2j">${escape_html(subscribe_field_postcode_label())}</label> <input id="m-postcodeb" type="text"${attr("placeholder", subscribe_placeholder_postcode())}${attr("value", store_get($$store_subs ??= {}, "$form", form).postcode)} class="svelte-s93h2j"/></div></div> <span class="sub-field-note svelte-s93h2j">${escape_html(subscribe_note_london_saturday())}</span> `);
					if (store_get($$store_subs ??= {}, "$errors", errors).postcode) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="sub-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).postcode)}</span>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <label class="opt-in-m svelte-s93h2j"><input type="checkbox"${attr("checked", store_get($$store_subs ??= {}, "$form", form).marketingOptIn, true)} class="svelte-s93h2j"/> <span>${escape_html(subscribe_optin_updates())}</span></label>`);
				}
				$$renderer.push(`<!--]--> `);
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (step() === "review") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="pay-summary svelte-s93h2j"><div class="pay-row svelte-s93h2j"><span class="pay-row__label svelte-s93h2j">${escape_html(subscribe_label_quantity())}</span> <div class="qty-stepper svelte-s93h2j"><button type="button" class="qty-btn qty-btn--minus svelte-s93h2j"${attr("disabled", qty() <= 1, true)}${attr("aria-label", subscribe_aria_decrease_qty())}>−</button> <span class="qty-value svelte-s93h2j">${escape_html(qty())}</span> <button type="button" class="qty-btn qty-btn--plus svelte-s93h2j"${attr("aria-label", subscribe_aria_increase_qty())}>+</button></div></div> <div class="pay-row svelte-s93h2j"><span class="pay-row__label svelte-s93h2j">${escape_html(currentPlanDetails()?.name)} ${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "me" ? subscribe_kind_subscription() : subscribe_kind_gift())} `);
				if (qty() > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`· £${escape_html((currentPlanDetails()?.price ?? 0).toFixed(2))} × ${escape_html(qty())}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span> <span class="pay-row__val svelte-s93h2j">£${escape_html(planLineTotal().toFixed(2))}</span></div> <!--[-->`);
				const each_array_2 = ensure_array_like(activeAddons());
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let a = each_array_2[$$index_2];
					$$renderer.push(`<div class="pay-row svelte-s93h2j"><span class="pay-row__label svelte-s93h2j">${escape_html(a.name)}</span> <span class="pay-row__val svelte-s93h2j">+£${escape_html((a.pricePence / 100).toFixed(2))}</span></div>`);
				}
				$$renderer.push(`<!--]--> <div class="pay-row svelte-s93h2j"><span class="pay-row__label svelte-s93h2j">${escape_html(subscribe_label_saturday_delivery())}</span> <span class="pay-row__val svelte-s93h2j">${escape_html(subscribe_label_included())}</span></div> <div class="pay-total svelte-s93h2j"><span class="pay-total__label svelte-s93h2j">${escape_html(subscribe_label_first_payment())}</span> <span class="pay-total__val svelte-s93h2j">£${escape_html(finalTotalPrice().toFixed(2))}</span></div></div> <div class="secure-note svelte-s93h2j"><svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke-width="1.5" class="svelte-s93h2j"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> ${escape_html(subscribe_secure_note())}</div> <p class="terms-note svelte-s93h2j">${escape_html(subscribe_terms_prefix())} <a href="/subscription-terms" class="svelte-s93h2j">${escape_html(subscribe_terms_link1())}</a> ${escape_html(subscribe_terms_and())} <a href="/privacy" class="svelte-s93h2j">${escape_html(subscribe_terms_link2())}</a>${escape_html(subscribe_terms_suffix())}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <input hidden="" name="guestCheckout"${attr("value", store_get($$store_subs ??= {}, "$form", form).guestCheckout)}/> <div class="sub-cta svelte-s93h2j">`);
			if (step() === "review") {
				$$renderer.push("<!--[0-->");
				if (!data?.user && !isOrder()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="w-full! mt-4! flex flex-col items-center justify-center gap-2">`);
					AuthSheet($$renderer, {
						onAuthenticated: submitAfterAuth,
						title: ctaLabel(),
						variant: "default",
						data: data?.signupForm,
						get loginOpen() {
							return loginOpen;
						},
						set loginOpen($$value) {
							loginOpen = $$value;
							$$settled = false;
						},
						get signupOpen() {
							return signupOpen;
						},
						set signupOpen($$value) {
							signupOpen = $$value;
							$$settled = false;
						}
					});
					$$renderer.push(`<!----></div>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button type="submit" form="start"${attr("title", data?.user ? subscribe_title_continue() : subscribe_title_please_sign_in())}${attr("formaction", store_get($$store_subs ??= {}, "$form", form).recipient === "me" && data?.user ? "?/subscribe" : isOrder() && !data?.user ? "?/guestOrder" : "?/gift")} class="sub-cta__btn svelte-s93h2j"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting) || !data?.user && !isOrder(), true)}>${escape_html(ctaLabel())}</button>`);
				}
				$$renderer.push(`<!--]-->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button type="button" class="sub-cta__btn svelte-s93h2j">${escape_html(ctaLabel())}</button>`);
			}
			$$renderer.push(`<!--]--></div></form></div> <div class="desktop-view svelte-s93h2j"><div class="page-head svelte-s93h2j"><div class="container"><span class="eyebrow svelte-s93h2j">${escape_html(subscribe_eyebrow())}</span> <h1 class="svelte-s93h2j">${escape_html(subscribe_page_heading())}</h1> <p class="svelte-s93h2j">${escape_html(subscribe_page_subheading())}</p></div></div> <main class="wrap svelte-s93h2j"><form class="container layout svelte-s93h2j" method="POST"><div class="steps svelte-s93h2j">`);
			if (bothModes()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">01</span><h2 class="svelte-s93h2j">${escape_html(subscribe_step_who_title())}</h2></div> <div class="step-body svelte-s93h2j"><div class="choice-grid svelte-s93h2j"><button type="button"${attr_class("choice svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).recipient === "me" })}><h3 class="svelte-s93h2j">${escape_html(subscribe_who_me_title())}</h3> <p class="svelte-s93h2j">${escape_html(subscribe_choice_me_desc())}</p> <span class="choice-tag svelte-s93h2j">${escape_html(subscribe_tag_monthly_subscription())}</span></button> <button type="button"${attr_class("choice svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).recipient === "gift" })}><h3 class="svelte-s93h2j">${escape_html(subscribe_who_gift_title())}</h3> <p class="svelte-s93h2j">${escape_html(subscribe_choice_gift_desc())}</p> <span class="choice-tag svelte-s93h2j">${escape_html(subscribe_tag_one_time_from({ price: giftFromPrice().toFixed(2) }))}</span></button></div></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (store_get($$store_subs ??= {}, "$form", form).recipient === "gift") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="step gift-step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">${escape_html(stepNo("plan"))}</span><h2 class="svelte-s93h2j">${escape_html(subscribe_step_gift_heading())}</h2></div> <div class="step-body svelte-s93h2j"><span class="gift-label svelte-s93h2j">${escape_html(subscribe_gift_label_no_sub())}</span> <div class="gift-grid svelte-s93h2j"><!--[-->`);
				const each_array_3 = ensure_array_like(giftPlans());
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let plan = each_array_3[$$index_3];
					$$renderer.push(`<button type="button"${attr_class("plan text-left svelte-s93h2j", void 0, { "active": store_get($$store_subs ??= {}, "$form", form).plan === plan.id })}><h3 class="svelte-s93h2j">${escape_html(plan.name)}</h3> <p class="plan-sub svelte-s93h2j">${escape_html(plan.sub)}</p> <div class="price svelte-s93h2j">£${escape_html(plan.price.toFixed(2))}</div> <div class="freq svelte-s93h2j">${escape_html(plan.freq)}</div> <div class="btn-outline btn-full margin-top-fallback svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).plan === plan.id ? subscribe_btn_selected() : subscribe_btn_select())}</div></button>`);
				}
				$$renderer.push(`<!--]--></div></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">${escape_html(stepNo("plan"))}</span><h2 class="svelte-s93h2j">${escape_html(subscribe_step_plan_title())}</h2></div> <div class="step-body svelte-s93h2j"><div class="plans-grid svelte-s93h2j"><!--[-->`);
				const each_array_4 = ensure_array_like(subscriptionPlans());
				for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
					let plan = each_array_4[$$index_5];
					$$renderer.push(`<button type="button"${attr_class("plan text-left svelte-s93h2j", void 0, {
						"featured": plan.featured,
						"active": store_get($$store_subs ??= {}, "$form", form).plan === plan.id
					})}><h3 class="svelte-s93h2j">${escape_html(plan.name)}</h3> <p class="plan-sub svelte-s93h2j">${escape_html(plan.sub)}</p> <div class="price svelte-s93h2j">£${escape_html(plan.price.toFixed(0))}</div> <div class="freq svelte-s93h2j">${escape_html(plan.freq)}</div> <ul class="svelte-s93h2j">`);
					if (plan.bullet && plan.bullet.trim() !== "") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<!--[-->`);
						const each_array_5 = ensure_array_like(JSON.parse(plan.bullet));
						for (let $$index_4 = 0, $$length = each_array_5.length; $$index_4 < $$length; $$index_4++) {
							let item = each_array_5[$$index_4];
							$$renderer.push(`<li class="svelte-s93h2j">${escape_html(item)}</li>`);
						}
						$$renderer.push(`<!--]-->`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></ul></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).plan) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).plan)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]--> <div class="step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">${escape_html(stepNo("delivery"))}</span><h2 class="svelte-s93h2j">${escape_html(subscribe_step_delivery_heading())}</h2></div> <div class="step-body svelte-s93h2j"><div class="delivery-grid svelte-s93h2j"><div class="field-box svelte-s93h2j"><label class="field-label svelte-s93h2j" for="delivery-day">${escape_html(subscribe_field_delivery_day_label())}</label> `);
			$$renderer.select({
				id: "delivery-day",
				class: "select",
				value: store_get($$store_subs ??= {}, "$form", form).deliveryDay
			}, ($$renderer) => {
				$$renderer.option({ value: "Saturday" }, ($$renderer) => {
					$$renderer.push(`${escape_html(subscribe_option_saturday())}`);
				});
			}, "svelte-s93h2j");
			$$renderer.push(` <div class="field-help svelte-s93h2j">${escape_html(subscribe_help_delivery_day())}</div></div> <div class="field-box svelte-s93h2j"><label class="field-label svelte-s93h2j" for="frequency">${escape_html(subscribe_field_frequency_label())}</label> `);
			$$renderer.select({
				id: "frequency",
				class: "select",
				value: store_get($$store_subs ??= {}, "$form", form).frequency
			}, ($$renderer) => {
				$$renderer.option({ value: "Monthly" }, ($$renderer) => {
					$$renderer.push(`${escape_html(subscribe_option_monthly())}`);
				});
			}, "svelte-s93h2j");
			$$renderer.push(` <div class="field-help svelte-s93h2j">${escape_html(subscribe_help_frequency())}</div></div></div></div></div> `);
			if (hasAddons()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">${escape_html(stepNo("addons"))}</span><h2 class="svelte-s93h2j">${escape_html(subscribe_step_addons_heading())}</h2></div> <div class="step-body svelte-s93h2j"><div class="addons-grid svelte-s93h2j"><!--[-->`);
				const each_array_6 = ensure_array_like(data?.addons);
				for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
					let item = each_array_6[$$index_6];
					$$renderer.push(`<button type="button"${attr_class(`${store_get($$store_subs ??= {}, "$form", form).addonIds.includes(item.id) ? "addon active" : "addon"} text-left`, "svelte-s93h2j")}><div class="addon-img svelte-s93h2j"><span class="ph-label svelte-s93h2j">${escape_html(item.name)} · ${escape_html(subscribe_addon_photo_suffix())}</span> <span class="ph-sub svelte-s93h2j">${escape_html(subscribe_addon_photo_style())}</span></div> <div class="addon-top svelte-s93h2j"><div><h3 class="svelte-s93h2j">${escape_html(item.name)}</h3><div class="addon-price svelte-s93h2j">+ £${escape_html((item.pricePence / 100).toFixed(2))}</div></div> <div class="check svelte-s93h2j">✓</div></div> `);
					if (item.description) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<p class="svelte-s93h2j">${escape_html(item.description)}</p>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></button>`);
				}
				$$renderer.push(`<!--]--></div> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).addonIds?._errors) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).addonIds._errors)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="step svelte-s93h2j"><div class="step-head svelte-s93h2j"><span class="step-num svelte-s93h2j">${escape_html(stepNo("details"))}</span><h2 class="svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? subscribe_step_details_gift_title() : subscribe_step_details_me_title())}</h2></div> <div class="step-body svelte-s93h2j">`);
			if (store_get($$store_subs ??= {}, "$form", form).recipient === "gift") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="field full svelte-s93h2j"><div class="sub-field svelte-s93h2j"><label for="phone" class="svelte-s93h2j">${escape_html(subscribe_field_phone_label())}</label> <input id="phone" type="tel"${attr("value", store_get($$store_subs ??= {}, "$form", form).phone)} required="" class="svelte-s93h2j"/></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="buyerEmail">${escape_html(subscribe_field_email_label())}</label> <input id="buyerEmail" class="input svelte-s93h2j" type="email"${attr("placeholder", subscribe_placeholder_email())}${attr("value", store_get($$store_subs ??= {}, "$form", form).buyerEmail)}/> <div class="field-help svelte-s93h2j">${escape_html(subscribe_note_confirmation_receipt())}</div> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).buyerEmail) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).buyerEmail)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="recipientName">${escape_html(subscribe_field_recipient_name_label())}</label> <input id="recipientName" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).recipientName)}/> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).recipientName) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).recipientName)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="line1">${escape_html(subscribe_field_line1_label())}</label> <input id="line1" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).line1)}/> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).line1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).line1)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="line2">${escape_html(subscribe_field_line2_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional())}</span></label> <input id="line2" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).line2)}/></div> <div class="field svelte-s93h2j"><label class="field-label svelte-s93h2j" for="city">${escape_html(subscribe_field_city_label())}</label> <input id="city" class="input svelte-s93h2j" disabled="" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).city)}/></div> <div class="field svelte-s93h2j"><label class="field-label svelte-s93h2j" for="postcode">${escape_html(subscribe_field_postcode_label())}</label> <input id="postcode" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).postcode)}/> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).postcode) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).postcode)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="giftMessage">${escape_html(subscribe_field_gift_message_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional())}</span></label> <textarea id="giftMessage" class="input textarea svelte-s93h2j" rows="3">`);
				const $$body = escape_html(store_get($$store_subs ??= {}, "$form", form).giftMessage);
				if ($$body) $$renderer.push(`${$$body}`);
				$$renderer.push(`</textarea></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="detail-grid svelte-s93h2j"><div class="field full svelte-s93h2j"><div class="sub-field svelte-s93h2j"><label for="phone" class="svelte-s93h2j">${escape_html(subscribe_field_phone_label())}</label> <input id="phone" type="tel"${attr("value", store_get($$store_subs ??= {}, "$form", form).phone)} required="" class="svelte-s93h2j"/></div></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="addressLabel">${escape_html(subscribe_field_label_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional_label())}</span></label> <input id="addressLabel" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).addressLabel)}/></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="line1d">${escape_html(subscribe_field_line1_label())}</label> <input id="line1d" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).line1)}/> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).line1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).line1)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <div class="field full svelte-s93h2j"><label class="field-label svelte-s93h2j" for="line2d">${escape_html(subscribe_field_line2_label())} <span class="opt svelte-s93h2j">${escape_html(subscribe_opt_optional())}</span></label> <input id="line2d" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).line2)}/></div> <div class="field svelte-s93h2j"><label class="field-label svelte-s93h2j" for="cityd">${escape_html(subscribe_field_city_label())}</label> <input id="cityd" disabled="" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).city)}/></div> <div class="field svelte-s93h2j"><label class="field-label svelte-s93h2j" for="postcoded">${escape_html(subscribe_field_postcode_label())}</label> <input id="postcoded" class="input svelte-s93h2j" type="text"${attr("value", store_get($$store_subs ??= {}, "$form", form).postcode)}/> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).postcode) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).postcode)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> <label class="opt-in full svelte-s93h2j"><input type="checkbox"${attr("checked", store_get($$store_subs ??= {}, "$form", form).marketingOptIn, true)} class="svelte-s93h2j"/> <span>${escape_html(subscribe_optin_updates())}</span></label></div>`);
			}
			$$renderer.push(`<!--]--></div></div></div> <aside class="summary svelte-s93h2j"><div class="sum-head svelte-s93h2j"><small class="svelte-s93h2j">${escape_html(subscribe_summary_title())}</small> <h2 class="svelte-s93h2j">${escape_html(currentPlanDetails()?.name ?? subscribe_label_plan())}</h2></div> <div class="sum-body svelte-s93h2j"><div class="sum-row svelte-s93h2j"><span class="sum-label svelte-s93h2j">${escape_html(subscribe_label_plan())}</span> <div class="sum-val svelte-s93h2j">${escape_html(currentPlanDetails()?.name)} · ${escape_html(store_get($$store_subs ??= {}, "$form", form).recipient === "gift" ? subscribe_label_one_time_pack() : currentPlanDetails()?.freq)}`);
			if (qty() > 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${escape_html(subscribe_qty_suffix({ qty: qty() }))}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="sum-row sum-row--qty svelte-s93h2j"><span class="sum-label svelte-s93h2j">${escape_html(subscribe_label_quantity())}</span> <div class="qty-stepper svelte-s93h2j"><button type="button" class="qty-btn qty-btn--minus svelte-s93h2j"${attr("disabled", qty() <= 1, true)}${attr("aria-label", subscribe_aria_decrease_qty())}>−</button> <span class="qty-value svelte-s93h2j">${escape_html(qty())}</span> <button type="button" class="qty-btn qty-btn--plus svelte-s93h2j"${attr("aria-label", subscribe_aria_increase_qty())}>+</button></div></div> <div class="sum-row svelte-s93h2j"><span class="sum-label svelte-s93h2j">${escape_html(subscribe_label_delivery())}</span> <div class="sum-val svelte-s93h2j">${escape_html(store_get($$store_subs ??= {}, "$form", form).deliveryDay)} · ${escape_html(store_get($$store_subs ??= {}, "$form", form).frequency)}</div> <div class="sum-sub svelte-s93h2j">${escape_html(subscribe_note_london_only())}</div></div> `);
			if (activeAddons().length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="sum-row svelte-s93h2j"><span class="sum-label svelte-s93h2j">${escape_html(subscribe_label_addons())}</span> <div class="sum-val svelte-s93h2j">${escape_html(activeAddons().map((a) => a.name).join(", "))}</div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="sum-row svelte-s93h2j"><span class="sum-label svelte-s93h2j">${escape_html(subscribe_label_total())}</span> <div class="price-line svelte-s93h2j"><span>${escape_html(currentPlanDetails()?.name)} ${escape_html(subscribe_label_product_suffix())}`);
			if (qty() > 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`× ${escape_html(qty())}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></span> <span>£${escape_html(planLineTotal().toFixed(2))}</span></div> <!--[-->`);
			const each_array_7 = ensure_array_like(activeAddons());
			for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
				let item = each_array_7[$$index_7];
				$$renderer.push(`<div class="price-line svelte-s93h2j"><span>${escape_html(item.name)}</span><span>£${escape_html((item.pricePence / 100).toFixed(2))}</span></div>`);
			}
			$$renderer.push(`<!--]--> <div class="price-line total svelte-s93h2j"><span>${escape_html(subscribe_label_first_payment())}</span><strong class="svelte-s93h2j">£${escape_html(finalTotalPrice().toFixed(2))}</strong></div></div> <div class="sum-actions svelte-s93h2j">`);
			if (store_get($$store_subs ??= {}, "$form", form).recipient === "me" && !data.user) {
				$$renderer.push("<!--[0-->");
				AuthSheet($$renderer, {
					onAuthenticated: submitAfterAuth,
					title: subscribe_cta_subscribe(),
					variant: "default",
					data: data?.signupForm,
					get loginOpen() {
						return loginOpen;
					},
					set loginOpen($$value) {
						loginOpen = $$value;
						$$settled = false;
					},
					get signupOpen() {
						return signupOpen;
					},
					set signupOpen($$value) {
						signupOpen = $$value;
						$$settled = false;
					}
				});
			} else if (store_get($$store_subs ??= {}, "$form", form).recipient === "me") {
				$$renderer.push("<!--[1-->");
				Button($$renderer, {
					type: "submit",
					class: "w-full! rounded-none! p-6!",
					form: "start",
					disabled: !data?.user && store_get($$store_subs ??= {}, "$submitting", submitting) && !isOrder(),
					title: data?.user ? void 0 : subscribe_title_login_to_subscribe(),
					formaction: isOrder() && !data?.user ? "?/guestOrder" : "?/subscribe",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? subscribe_cta_starting() : data?.subscriptionPlans.find((sub) => sub.id === store_get($$store_subs ??= {}, "$form", form).plan)?.kind === "order" ? subscribe_cta_order() : subscribe_cta_subscribe())}`);
					},
					$$slots: { default: true }
				});
			} else {
				$$renderer.push("<!--[-1-->");
				Button($$renderer, {
					type: "submit",
					form: "start",
					disabled: !data?.user && store_get($$store_subs ??= {}, "$submitting", submitting),
					title: data?.user ? void 0 : subscribe_title_login_to_gift(),
					formaction: "?/gift",
					class: "btn btn-full",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? subscribe_cta_processing() : subscribe_cta_continue_as_gift())}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--> `);
			if (!data?.user && isOrder()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex flex-row gap-2"><p class="svelte-s93h2j">${escape_html(subscribe_already_have_account())}</p> `);
				AuthSheet($$renderer, {
					onAuthenticated: submitAfterAuth,
					data: data?.signupForm,
					get loginOpen() {
						return loginOpen;
					},
					set loginOpen($$value) {
						loginOpen = $$value;
						$$settled = false;
					},
					get signupOpen() {
						return signupOpen;
					},
					set signupOpen($$value) {
						signupOpen = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <p class="sum-note svelte-s93h2j">${escape_html(subscribe_note_pause_skip_cancel())}</p></div></aside></form></main></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BFlu141a.js.map
