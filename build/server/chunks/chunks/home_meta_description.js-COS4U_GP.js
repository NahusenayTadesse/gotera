import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/paraglide/messages/home_meta_description.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Meta_DescriptionInputs */
var en_home_meta_description = () => {
	return `Authentic Ethiopian injera made with 100% teff, delivered monthly to your door in London. Vegan, gluten-free, and packed with iron.`;
};
var am_home_meta_description = () => {
	return `ከ100% ጤፍ የተሰራ እውነተኛ የኢትዮጵያ እንጀራ በየወሩ እስከ ለንደን ቤትዎ ድረስ ይደርሳል። ቬጋን፣ ግሉተን-ነጻ እና በብረት የበለጸገ።`;
};
/**
* | output |
* | --- |
* | "Authentic Ethiopian injera made with 100% teff, delivered monthly to your door in London. Vegan, gluten-free, and packed with iron." |
*
* @param {Home_Meta_DescriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var home_meta_description = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_home_meta_description();
	return en_home_meta_description();
});

export { home_meta_description as h };
//# sourceMappingURL=home_meta_description.js-COS4U_GP.js.map
