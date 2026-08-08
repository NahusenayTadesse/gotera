import { a9 as escape_html } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/delivery_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_EyebrowInputs */
var en_delivery_eyebrow = () => {
	return `Delivery`;
};
var am_delivery_eyebrow = () => {
	return `ማድረሻ`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Delivery_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_eyebrow();
	return en_delivery_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_hero_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Hero_TitleInputs */
var en_delivery_hero_title = () => {
	return `Delivery Information`;
};
var am_delivery_hero_title = () => {
	return `የማድረሻ መረጃ`;
};
/**
* | output |
* | --- |
* | "Delivery Information" |
*
* @param {Delivery_Hero_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_hero_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_hero_title();
	return en_delivery_hero_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_hero_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Hero_SubtitleInputs */
var en_delivery_hero_subtitle = () => {
	return `How and when GOTERA arrives at your door.`;
};
var am_delivery_hero_subtitle = () => {
	return `GOTERA እንዴትና መቼ በራፍዎ ላይ እንደሚደርስ።`;
};
/**
* | output |
* | --- |
* | "How and when GOTERA arrives at your door." |
*
* @param {Delivery_Hero_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_hero_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_hero_subtitle();
	return en_delivery_hero_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_where_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Where_TitleInputs */
var en_delivery_where_title = () => {
	return `Where we deliver`;
};
var am_delivery_where_title = () => {
	return `የት እናደርሳለን`;
};
/**
* | output |
* | --- |
* | "Where we deliver" |
*
* @param {Delivery_Where_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_where_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_where_title();
	return en_delivery_where_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_where_highlight_strong.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Where_Highlight_StrongInputs */
var en_delivery_where_highlight_strong = () => {
	return `London only.`;
};
var am_delivery_where_highlight_strong = () => {
	return `ለንደን ብቻ።`;
};
/**
* | output |
* | --- |
* | "London only." |
*
* @param {Delivery_Where_Highlight_StrongInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_where_highlight_strong = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_where_highlight_strong();
	return en_delivery_where_highlight_strong();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_where_highlight_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Where_Highlight_TextInputs */
var en_delivery_where_highlight_text = () => {
	return `We are expanding. Email`;
};
var am_delivery_where_highlight_text = () => {
	return `እየሰፋን ነው። ኢሜይል ያድርጉልን`;
};
/**
* | output |
* | --- |
* | "We are expanding. Email" |
*
* @param {Delivery_Where_Highlight_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_where_highlight_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_where_highlight_text();
	return en_delivery_where_highlight_text();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_where_highlight_text2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Where_Highlight_Text2Inputs */
var en_delivery_where_highlight_text2 = () => {
	return `to register interest for other cities.`;
};
var am_delivery_where_highlight_text2 = () => {
	return `ለሌሎች ከተሞች ፍላጎትዎን ለማስመዝገብ።`;
};
/**
* | output |
* | --- |
* | "to register interest for other cities." |
*
* @param {Delivery_Where_Highlight_Text2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_where_highlight_text2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_where_highlight_text2();
	return en_delivery_where_highlight_text2();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_where_postcode.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Where_PostcodeInputs */
var en_delivery_where_postcode = () => {
	return `Unsure if your postcode is covered? Email us and we will confirm.`;
};
var am_delivery_where_postcode = () => {
	return `የፖስት ኮድዎ የሚሸፈን መሆኑን እርግጠኛ ካልሆኑ፣ ኢሜይል ይላኩልን እኛም እናረጋግጣለን።`;
};
/**
* | output |
* | --- |
* | "Unsure if your postcode is covered? Email us and we will confirm." |
*
* @param {Delivery_Where_PostcodeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_where_postcode = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_where_postcode();
	return en_delivery_where_postcode();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_days_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Days_TitleInputs */
var en_delivery_days_title = () => {
	return `Days and windows`;
};
var am_delivery_days_title = () => {
	return `ቀናትና የጊዜ ክልል`;
};
/**
* | output |
* | --- |
* | "Days and windows" |
*
* @param {Delivery_Days_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_days_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_days_title();
	return en_delivery_days_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_day_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Day_SubtitleInputs */
var en_delivery_day_subtitle = () => {
	return `Delivery day`;
};
var am_delivery_day_subtitle = () => {
	return `የማድረሻ ቀን`;
};
/**
* | output |
* | --- |
* | "Delivery day" |
*
* @param {Delivery_Day_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_day_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_day_subtitle();
	return en_delivery_day_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_day_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Day_TextInputs */
var en_delivery_day_text = () => {
	return `All deliveries are on`;
};
var am_delivery_day_text = () => {
	return `ሁሉም ማድረሻዎች የሚከናወኑት በ`;
};
/**
* | output |
* | --- |
* | "All deliveries are on" |
*
* @param {Delivery_Day_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_day_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_day_text();
	return en_delivery_day_text();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_saturdays.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_SaturdaysInputs */
var en_delivery_saturdays = () => {
	return `Saturdays`;
};
var am_delivery_saturdays = () => {
	return `ቅዳሜ`;
};
/**
* | output |
* | --- |
* | "Saturdays" |
*
* @param {Delivery_SaturdaysInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_saturdays = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_saturdays();
	return en_delivery_saturdays();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_day_frequency.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Day_FrequencyInputs */
var en_delivery_day_frequency = () => {
	return `One delivery per month.`;
};
var am_delivery_day_frequency = () => {
	return `በወር አንድ ማድረሻ።`;
};
/**
* | output |
* | --- |
* | "One delivery per month." |
*
* @param {Delivery_Day_FrequencyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_day_frequency = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_day_frequency();
	return en_delivery_day_frequency();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_window_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Window_SubtitleInputs */
var en_delivery_window_subtitle = () => {
	return `Window`;
};
var am_delivery_window_subtitle = () => {
	return `የጊዜ ክልል`;
};
/**
* | output |
* | --- |
* | "Window" |
*
* @param {Delivery_Window_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_window_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_window_subtitle();
	return en_delivery_window_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_window_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Window_TextInputs */
var en_delivery_window_text = () => {
	return `8am to 6pm. A WhatsApp or email notification with a tighter window is sent on the morning of delivery where possible.`;
};
var am_delivery_window_text = () => {
	return `ከጠዋቱ 8 ሰዓት እስከ ምሽቱ 6 ሰዓት። በተቻለ መጠን በማድረሻው ቀን ጠዋት ጠበብ ያለ የጊዜ ክልል የያዘ የዋትስአፕ ወይም ኢሜይል ማሳወቂያ ይላካል።`;
};
/**
* | output |
* | --- |
* | "8am to 6pm. A WhatsApp or email notification with a tighter window is sent on the morning of delivery where possible." |
*
* @param {Delivery_Window_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_window_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_window_text();
	return en_delivery_window_text();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_fresh_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Fresh_TitleInputs */
var en_delivery_fresh_title = () => {
	return `How injera stays fresh`;
};
var am_delivery_fresh_title = () => {
	return `እንጀራ እንዴት ትኩስ ሆኖ ይቆያል`;
};
/**
* | output |
* | --- |
* | "How injera stays fresh" |
*
* @param {Delivery_Fresh_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_fresh_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_fresh_title();
	return en_delivery_fresh_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cold_chain_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cold_Chain_SubtitleInputs */
var en_delivery_cold_chain_subtitle = () => {
	return `Cold chain packaging`;
};
var am_delivery_cold_chain_subtitle = () => {
	return `የቅዝቃዜ ሰንሰለት ማሸጊያ`;
};
/**
* | output |
* | --- |
* | "Cold chain packaging" |
*
* @param {Delivery_Cold_Chain_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cold_chain_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cold_chain_subtitle();
	return en_delivery_cold_chain_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cold_chain_text1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cold_Chain_Text1Inputs */
var en_delivery_cold_chain_text1 = () => {
	return `Each order is packed on dispatch day in insulated packaging with food-safe cold packs. Maintains the correct temperature for up to 8 hours in typical UK conditions.`;
};
var am_delivery_cold_chain_text1 = () => {
	return `እያንዳንዱ ትዕዛዝ በመላኪያ ቀን በተከላካይ ማሸጊያ ውስጥ ከምግብ-ደህንነት ቀዝቃዛ ጥቅሎች ጋር ይታሸጋል። በተለመዱ የዩኬ ሁኔታዎች እስከ 8 ሰዓት ድረስ ትክክለኛውን የሙቀት መጠን ይጠብቃል።`;
};
/**
* | output |
* | --- |
* | "Each order is packed on dispatch day in insulated packaging with food-safe cold packs. Maintains the correct temperature for up to 8 hours in typical UK cond..." |
*
* @param {Delivery_Cold_Chain_Text1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cold_chain_text1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cold_chain_text1();
	return en_delivery_cold_chain_text1();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cold_chain_text2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cold_Chain_Text2Inputs */
var en_delivery_cold_chain_text2 = () => {
	return `Once received: store in a cool, dry place or refrigerate. Consume before the best-before date. Injera can be frozen — see the pack for guidance.`;
};
var am_delivery_cold_chain_text2 = () => {
	return `ከደረሰ በኋላ: በቀዝቃዛና ደረቅ ቦታ ያስቀምጡ ወይም በማቀዝቀዣ ውስጥ ያስቀምጡ። ከምርጥ-በፊት ቀን በፊት ይመገቡ። እንጀራ ሊቀዘቅዝ ይችላል — መመሪያውን በጥቅሉ ላይ ይመልከቱ።`;
};
/**
* | output |
* | --- |
* | "Once received: store in a cool, dry place or refrigerate. Consume before the best-before date. Injera can be frozen — see the pack for guidance." |
*
* @param {Delivery_Cold_Chain_Text2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cold_chain_text2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cold_chain_text2();
	return en_delivery_cold_chain_text2();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_home_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Home_TitleInputs */
var en_delivery_not_home_title = () => {
	return `If you are not home`;
};
var am_delivery_not_home_title = () => {
	return `ቤት ካልነበሩ`;
};
/**
* | output |
* | --- |
* | "If you are not home" |
*
* @param {Delivery_Not_Home_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_home_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_home_title();
	return en_delivery_not_home_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_driver_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Driver_IntroInputs */
var en_delivery_driver_intro = () => {
	return `Our driver will:`;
};
var am_delivery_driver_intro = () => {
	return `ሹፌራችን የሚከተለውን ያደርጋል:`;
};
/**
* | output |
* | --- |
* | "Our driver will:" |
*
* @param {Delivery_Driver_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_driver_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_driver_intro();
	return en_delivery_driver_intro();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_driver_item1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Driver_Item1Inputs */
var en_delivery_driver_item1 = () => {
	return `Leave in a safe place if you have set one in your account`;
};
var am_delivery_driver_item1 = () => {
	return `በመለያዎ ውስጥ ደህንነቱ የተጠበቀ ቦታ ካስቀመጡ በዚያ ይተዋል`;
};
/**
* | output |
* | --- |
* | "Leave in a safe place if you have set one in your account" |
*
* @param {Delivery_Driver_Item1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_driver_item1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_driver_item1();
	return en_delivery_driver_item1();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_driver_item2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Driver_Item2Inputs */
var en_delivery_driver_item2 = () => {
	return `Leave a delivery card if no safe place is available`;
};
var am_delivery_driver_item2 = () => {
	return `ደህንነቱ የተጠበቀ ቦታ ከሌለ የማድረሻ ካርድ ይተዋል`;
};
/**
* | output |
* | --- |
* | "Leave a delivery card if no safe place is available" |
*
* @param {Delivery_Driver_Item2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_driver_item2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_driver_item2();
	return en_delivery_driver_item2();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_driver_item3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Driver_Item3Inputs */
var en_delivery_driver_item3 = () => {
	return `Contact you via WhatsApp or phone if the order cannot be left safely`;
};
var am_delivery_driver_item3 = () => {
	return `ትዕዛዙ ደህንነቱ በተጠበቀ ሁኔታ ሊተው የማይችል ከሆነ በዋትስአፕ ወይም በስልክ ያገኝዎታል`;
};
/**
* | output |
* | --- |
* | "Contact you via WhatsApp or phone if the order cannot be left safely" |
*
* @param {Delivery_Driver_Item3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_driver_item3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_driver_item3();
	return en_delivery_driver_item3();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_home_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Home_NoteInputs */
var en_delivery_not_home_note = () => {
	return `Temperature-sensitive orders will not be left in locations exposed to heat. Set a safe place at Account → Your Details.`;
};
var am_delivery_not_home_note = () => {
	return `ለሙቀት ተጋላጭ የሆኑ ትዕዛዞች ለሙቀት በተጋለጡ ቦታዎች አይተዉም። ደህንነቱ የተጠበቀ ቦታ በመለያ → የእርስዎ ዝርዝሮች ውስጥ ያስቀምጡ።`;
};
/**
* | output |
* | --- |
* | "Temperature-sensitive orders will not be left in locations exposed to heat. Set a safe place at Account → Your Details." |
*
* @param {Delivery_Not_Home_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_home_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_home_note();
	return en_delivery_not_home_note();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_TitleInputs */
var en_delivery_cutoff_title = () => {
	return `Cut-off dates`;
};
var am_delivery_cutoff_title = () => {
	return `የመዝጊያ ቀናት`;
};
/**
* | output |
* | --- |
* | "Cut-off dates" |
*
* @param {Delivery_Cutoff_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_title();
	return en_delivery_cutoff_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_IntroInputs */
var en_delivery_cutoff_intro = () => {
	return `All changes — add-ons, address updates, plan changes — must be made before the cut-off.`;
};
var am_delivery_cutoff_intro = () => {
	return `ሁሉም ለውጦች — ተጨማሪዎች፣ የአድራሻ ማዘመኛዎች፣ የእቅድ ለውጦች — ከመዝጊያው በፊት መደረግ አለባቸው።`;
};
/**
* | output |
* | --- |
* | "All changes — add-ons, address updates, plan changes — must be made before the cut-off." |
*
* @param {Delivery_Cutoff_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_intro();
	return en_delivery_cutoff_intro();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_LabelInputs */
var en_delivery_cutoff_label = () => {
	return `Cut-off:`;
};
var am_delivery_cutoff_label = () => {
	return `መዝጊያ:`;
};
/**
* | output |
* | --- |
* | "Cut-off:" |
*
* @param {Delivery_Cutoff_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_label();
	return en_delivery_cutoff_label();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_TextInputs */
var en_delivery_cutoff_text = () => {
	return `The Sunday before your Saturday delivery at midnight.`;
};
var am_delivery_cutoff_text = () => {
	return `ከቅዳሜው ማድረሻዎ በፊት ባለው እሁድ እኩለ ሌሊት።`;
};
/**
* | output |
* | --- |
* | "The Sunday before your Saturday delivery at midnight." |
*
* @param {Delivery_Cutoff_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_text();
	return en_delivery_cutoff_text();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_example.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_ExampleInputs */
var en_delivery_cutoff_example = () => {
	return `Example: delivery Saturday 18 April → cut-off Sunday 13 April midnight.`;
};
var am_delivery_cutoff_example = () => {
	return `ምሳሌ: ማድረሻ ቅዳሜ ኤፕሪል 18 → መዝጊያ እሁድ ኤፕሪል 13 እኩለ ሌሊት።`;
};
/**
* | output |
* | --- |
* | "Example: delivery Saturday 18 April → cut-off Sunday 13 April midnight." |
*
* @param {Delivery_Cutoff_ExampleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_example = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_example();
	return en_delivery_cutoff_example();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_cutoff_account_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Cutoff_Account_NoteInputs */
var en_delivery_cutoff_account_note = () => {
	return `Your exact cut-off is shown in your account.`;
};
var am_delivery_cutoff_account_note = () => {
	return `ትክክለኛው መዝጊያዎ በመለያዎ ውስጥ ይታያል።`;
};
/**
* | output |
* | --- |
* | "Your exact cut-off is shown in your account." |
*
* @param {Delivery_Cutoff_Account_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_cutoff_account_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_cutoff_account_note();
	return en_delivery_cutoff_account_note();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_TitleInputs */
var en_delivery_address_title = () => {
	return `Changing your address`;
};
var am_delivery_address_title = () => {
	return `አድራሻዎን መቀየር`;
};
/**
* | output |
* | --- |
* | "Changing your address" |
*
* @param {Delivery_Address_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_title();
	return en_delivery_address_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_item1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_Item1Inputs */
var en_delivery_address_item1 = () => {
	return `Account → Your Details → Update Address`;
};
var am_delivery_address_item1 = () => {
	return `መለያ → የእርስዎ ዝርዝሮች → አድራሻ ያዘምኑ`;
};
/**
* | output |
* | --- |
* | "Account → Your Details → Update Address" |
*
* @param {Delivery_Address_Item1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_item1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_item1();
	return en_delivery_address_item1();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_item2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_Item2Inputs */
var en_delivery_address_item2 = () => {
	return `Changes before cut-off apply to the next delivery`;
};
var am_delivery_address_item2 = () => {
	return `ከመዝጊያው በፊት የተደረጉ ለውጦች ለሚቀጥለው ማድረሻ ተፈጻሚ ይሆናሉ`;
};
/**
* | output |
* | --- |
* | "Changes before cut-off apply to the next delivery" |
*
* @param {Delivery_Address_Item2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_item2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_item2();
	return en_delivery_address_item2();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_item3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_Item3Inputs */
var en_delivery_address_item3 = () => {
	return `Changes after cut-off apply the following month`;
};
var am_delivery_address_item3 = () => {
	return `ከመዝጊያው በኋላ የተደረጉ ለውጦች ለሚቀጥለው ወር ተፈጻሚ ይሆናሉ`;
};
/**
* | output |
* | --- |
* | "Changes after cut-off apply the following month" |
*
* @param {Delivery_Address_Item3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_item3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_item3();
	return en_delivery_address_item3();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_item4.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_Item4Inputs */
var en_delivery_address_item4 = () => {
	return `Address must be within our London delivery area`;
};
var am_delivery_address_item4 = () => {
	return `አድራሻው በለንደን ማድረሻ ክልላችን ውስጥ መሆን አለበት`;
};
/**
* | output |
* | --- |
* | "Address must be within our London delivery area" |
*
* @param {Delivery_Address_Item4Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_item4 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_item4();
	return en_delivery_address_item4();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_address_moving.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Address_MovingInputs */
var en_delivery_address_moving = () => {
	return `Moving outside London? Email`;
};
var am_delivery_address_moving = () => {
	return `ከለንደን ውጭ እየተዘዋወሩ ነው? ኢሜይል ያድርጉልን`;
};
/**
* | output |
* | --- |
* | "Moving outside London? Email" |
*
* @param {Delivery_Address_MovingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_address_moving = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_address_moving();
	return en_delivery_address_moving();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_TitleInputs */
var en_delivery_not_arrived_title = () => {
	return `Order not arrived?`;
};
var am_delivery_not_arrived_title = () => {
	return `ትዕዛዝ አልደረሰም?`;
};
/**
* | output |
* | --- |
* | "Order not arrived?" |
*
* @param {Delivery_Not_Arrived_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_title();
	return en_delivery_not_arrived_title();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_intro.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_IntroInputs */
var en_delivery_not_arrived_intro = () => {
	return `If your delivery has not arrived by 6pm on your Saturday, first check:`;
};
var am_delivery_not_arrived_intro = () => {
	return `ማድረሻዎ በቅዳሜዎ ምሽት 6 ሰዓት ካልደረሰ፣ በመጀመሪያ ይህንን ያረጋግጡ:`;
};
/**
* | output |
* | --- |
* | "If your delivery has not arrived by 6pm on your Saturday, first check:" |
*
* @param {Delivery_Not_Arrived_IntroInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_intro = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_intro();
	return en_delivery_not_arrived_intro();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_item1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_Item1Inputs */
var en_delivery_not_arrived_item1 = () => {
	return `Your WhatsApp or email for a delivery notification from us`;
};
var am_delivery_not_arrived_item1 = () => {
	return `ከእኛ የመጣ የማድረሻ ማሳወቂያ ለማየት ዋትስአፕዎን ወይም ኢሜይልዎን`;
};
/**
* | output |
* | --- |
* | "Your WhatsApp or email for a delivery notification from us" |
*
* @param {Delivery_Not_Arrived_Item1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_item1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_item1();
	return en_delivery_not_arrived_item1();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_item2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_Item2Inputs */
var en_delivery_not_arrived_item2 = () => {
	return `Any delivery card left at your address`;
};
var am_delivery_not_arrived_item2 = () => {
	return `በአድራሻዎ የተተወ ማንኛውም የማድረሻ ካርድ`;
};
/**
* | output |
* | --- |
* | "Any delivery card left at your address" |
*
* @param {Delivery_Not_Arrived_Item2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_item2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_item2();
	return en_delivery_not_arrived_item2();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_item3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_Item3Inputs */
var en_delivery_not_arrived_item3 = () => {
	return `Your saved address in account`;
};
var am_delivery_not_arrived_item3 = () => {
	return `በመለያ ውስጥ የተቀመጠ አድራሻዎን`;
};
/**
* | output |
* | --- |
* | "Your saved address in account" |
*
* @param {Delivery_Not_Arrived_Item3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_item3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_item3();
	return en_delivery_not_arrived_item3();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_not_arrived_contact.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Not_Arrived_ContactInputs */
var en_delivery_not_arrived_contact = () => {
	return `If still unresolved, contact us within 48 hours:`;
};
var am_delivery_not_arrived_contact = () => {
	return `አሁንም ካልተፈታ፣ በ48 ሰዓታት ውስጥ ያግኙን:`;
};
/**
* | output |
* | --- |
* | "If still unresolved, contact us within 48 hours:" |
*
* @param {Delivery_Not_Arrived_ContactInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_not_arrived_contact = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_not_arrived_contact();
	return en_delivery_not_arrived_contact();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Email_LabelInputs */
var en_delivery_email_label = () => {
	return `Email:`;
};
var am_delivery_email_label = () => {
	return `ኢሜይል:`;
};
/**
* | output |
* | --- |
* | "Email:" |
*
* @param {Delivery_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_email_label();
	return en_delivery_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_response_time_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Response_Time_LabelInputs */
var en_delivery_response_time_label = () => {
	return `Response time:`;
};
var am_delivery_response_time_label = () => {
	return `የምላሽ ጊዜ:`;
};
/**
* | output |
* | --- |
* | "Response time:" |
*
* @param {Delivery_Response_Time_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_response_time_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_response_time_label();
	return en_delivery_response_time_label();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_response_time_text.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Response_Time_TextInputs */
var en_delivery_response_time_text = () => {
	return `Within 4 hours on delivery days`;
};
var am_delivery_response_time_text = () => {
	return `በማድረሻ ቀናት በ4 ሰዓት ውስጥ`;
};
/**
* | output |
* | --- |
* | "Within 4 hours on delivery days" |
*
* @param {Delivery_Response_Time_TextInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_response_time_text = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_response_time_text();
	return en_delivery_response_time_text();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_lost_orders.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Lost_OrdersInputs */
var en_delivery_lost_orders = () => {
	return `Confirmed lost orders receive a replacement or account credit.`;
};
var am_delivery_lost_orders = () => {
	return `የተረጋገጡ የጠፉ ትዕዛዞች ምትክ ወይም የመለያ ክሬዲት ያገኛሉ።`;
};
/**
* | output |
* | --- |
* | "Confirmed lost orders receive a replacement or account credit." |
*
* @param {Delivery_Lost_OrdersInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_lost_orders = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_lost_orders();
	return en_delivery_lost_orders();
});
//#endregion
//#region src/lib/paraglide/messages/delivery_start_subscription.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Delivery_Start_SubscriptionInputs */
var en_delivery_start_subscription = () => {
	return `Start your subscription`;
};
var am_delivery_start_subscription = () => {
	return `ምዝገባዎን ይጀምሩ`;
};
/**
* | output |
* | --- |
* | "Start your subscription" |
*
* @param {Delivery_Start_SubscriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var delivery_start_subscription = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_delivery_start_subscription();
	return en_delivery_start_subscription();
});
//#endregion
//#region src/routes/delivery/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="hero svelte-1n45kwt"><div class="container"><span class="eyebrow svelte-1n45kwt">${escape_html(delivery_eyebrow())}</span> <h1 class="svelte-1n45kwt">${escape_html(delivery_hero_title())}</h1> <p class="svelte-1n45kwt">${escape_html(delivery_hero_subtitle())}</p></div></section> <div class="content svelte-1n45kwt"><div class="container"><div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_where_title())}</h2> <div class="highlight svelte-1n45kwt"><p class="svelte-1n45kwt"><strong>${escape_html(delivery_where_highlight_strong())}</strong> ${escape_html(delivery_where_highlight_text())} <a href="mailto:hello@gotera.co.uk" class="svelte-1n45kwt">hello@gotera.co.uk</a> ${escape_html(delivery_where_highlight_text2())}</p></div> <p class="svelte-1n45kwt">${escape_html(delivery_where_postcode())}</p></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_days_title())}</h2> <h3 class="svelte-1n45kwt">${escape_html(delivery_day_subtitle())}</h3> <p class="svelte-1n45kwt">${escape_html(delivery_day_text())} <strong>${escape_html(delivery_saturdays())}</strong>. ${escape_html(delivery_day_frequency())}</p> <h3 class="svelte-1n45kwt">${escape_html(delivery_window_subtitle())}</h3> <p class="svelte-1n45kwt">${escape_html(delivery_window_text())}</p></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_fresh_title())}</h2> <div class="cold-panel svelte-1n45kwt"><h3 class="svelte-1n45kwt">${escape_html(delivery_cold_chain_subtitle())}</h3> <p class="svelte-1n45kwt">${escape_html(delivery_cold_chain_text1())}</p> <p class="svelte-1n45kwt">${escape_html(delivery_cold_chain_text2())}</p></div></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_not_home_title())}</h2> <p class="svelte-1n45kwt">${escape_html(delivery_driver_intro())}</p> <ul class="svelte-1n45kwt"><li class="svelte-1n45kwt">${escape_html(delivery_driver_item1())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_driver_item2())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_driver_item3())}</li></ul> <p class="svelte-1n45kwt">${escape_html(delivery_not_home_note())}</p></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_cutoff_title())}</h2> <p class="svelte-1n45kwt">${escape_html(delivery_cutoff_intro())}</p> <div class="infobox svelte-1n45kwt"><p class="svelte-1n45kwt"><strong>${escape_html(delivery_cutoff_label())}</strong> ${escape_html(delivery_cutoff_text())}<br/> ${escape_html(delivery_cutoff_example())}<br/> ${escape_html(delivery_cutoff_account_note())}</p></div></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_address_title())}</h2> <ul class="svelte-1n45kwt"><li class="svelte-1n45kwt">${escape_html(delivery_address_item1())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_address_item2())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_address_item3())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_address_item4())}</li></ul> <p class="svelte-1n45kwt">${escape_html(delivery_address_moving())} <a href="mailto:hello@gotera.co.uk" class="svelte-1n45kwt">hello@gotera.co.uk</a>.</p></div> <div class="ls svelte-1n45kwt"><h2 class="svelte-1n45kwt">${escape_html(delivery_not_arrived_title())}</h2> <p class="svelte-1n45kwt">${escape_html(delivery_not_arrived_intro())}</p> <ul class="svelte-1n45kwt"><li class="svelte-1n45kwt">${escape_html(delivery_not_arrived_item1())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_not_arrived_item2())}</li> <li class="svelte-1n45kwt">${escape_html(delivery_not_arrived_item3())}</li></ul> <p class="svelte-1n45kwt">${escape_html(delivery_not_arrived_contact())}</p> <div class="infobox svelte-1n45kwt"><p class="svelte-1n45kwt"><strong>${escape_html(delivery_email_label())}</strong> <a href="mailto:hello@gotera.co.uk" class="svelte-1n45kwt">hello@gotera.co.uk</a><br/> <strong>${escape_html(delivery_response_time_label())}</strong> ${escape_html(delivery_response_time_text())}</p></div> <p class="svelte-1n45kwt">${escape_html(delivery_lost_orders())}</p> <a href="/subscribe" class="btn svelte-1n45kwt">${escape_html(delivery_start_subscription())}</a></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BpP2-o1s.js.map
