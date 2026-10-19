import { a7 as spread_props } from './server.js-qDPizQqb.js';
import { h as getLocale } from './runtime.js-CbeSlHLA.js';
import { I as Icon } from './Icon.js-Dm6aSBgb.js';

//#region node_modules/@lucide/svelte/dist/icons/store.svelte
function Store($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "store" },
		props,
		{ iconNode: [
			["path", { "d": "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" }],
			["path", { "d": "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" }],
			["path", { "d": "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/wheat.svelte
function Wheat($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "wheat" },
		props,
		{ iconNode: [
			["path", { "d": "M2 22 16 8" }],
			["path", { "d": "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }],
			["path", { "d": "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }],
			["path", { "d": "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }],
			["path", { "d": "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
			["path", { "d": "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }],
			["path", { "d": "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }],
			["path", { "d": "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" }]
		] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/partners_type_partner.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Type_PartnerInputs */
var en_partners_type_partner = () => {
	return `Partner`;
};
var am_partners_type_partner = () => {
	return `አጋር`;
};
/**
* | output |
* | --- |
* | "Partner" |
*
* @param {Partners_Type_PartnerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_type_partner = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_type_partner();
	return en_partners_type_partner();
});
//#endregion
//#region src/lib/paraglide/messages/partners_type_partner_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Type_Partner_DescInputs */
var en_partners_type_partner_desc = () => {
	return `Stock, serve or resell our injera`;
};
var am_partners_type_partner_desc = () => {
	return `እንጀራችንን ይሽጡ፣ ያቅርቡ ወይም መልሰው ይሽጡ`;
};
/**
* | output |
* | --- |
* | "Stock, serve or resell our injera" |
*
* @param {Partners_Type_Partner_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_type_partner_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_type_partner_desc();
	return en_partners_type_partner_desc();
});
//#endregion
//#region src/lib/paraglide/messages/partners_type_supplier.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Type_SupplierInputs */
var en_partners_type_supplier = () => {
	return `Supplier`;
};
var am_partners_type_supplier = () => {
	return `አቅራቢ`;
};
/**
* | output |
* | --- |
* | "Supplier" |
*
* @param {Partners_Type_SupplierInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_type_supplier = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_type_supplier();
	return en_partners_type_supplier();
});
//#endregion
//#region src/lib/paraglide/messages/partners_type_supplier_desc.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Type_Supplier_DescInputs */
var en_partners_type_supplier_desc = () => {
	return `Supply ingredients, packaging or services`;
};
var am_partners_type_supplier_desc = () => {
	return `ግብዓቶችን፣ ማሸጊያ ወይም አገልግሎቶችን ያቅርቡ`;
};
/**
* | output |
* | --- |
* | "Supply ingredients, packaging or services" |
*
* @param {Partners_Type_Supplier_DescInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_type_supplier_desc = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_type_supplier_desc();
	return en_partners_type_supplier_desc();
});

export { Store as S, Wheat as W, partners_type_partner_desc as a, partners_type_supplier as b, partners_type_supplier_desc as c, partners_type_partner as p };
//# sourceMappingURL=partners_type_supplier_desc.js-BE0R4EJz.js.map
