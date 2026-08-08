import { a9 as escape_html, a4 as ensure_array_like, aa as attr_class, ab as stringify$1 } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/accthistory_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_HeadingInputs */
var en_accthistory_heading = () => {
	return `Order history`;
};
var am_accthistory_heading = () => {
	return `የትዕዛዝ ታሪክ`;
};
/**
* | output |
* | --- |
* | "Order history" |
*
* @param {Accthistory_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_heading();
	return en_accthistory_heading();
});
//#endregion
//#region src/lib/paraglide/messages/accthistory_empty.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_EmptyInputs */
var en_accthistory_empty = () => {
	return `No deliveries yet. Your order history will appear here after your first delivery.`;
};
var am_accthistory_empty = () => {
	return `እስካሁን ማድረሻዎች የሉም። የመጀመሪያ ማድረሻዎ በኋላ የትዕዛዝ ታሪክዎ እዚህ ይታያል።`;
};
/**
* | output |
* | --- |
* | "No deliveries yet. Your order history will appear here after your first delivery." |
*
* @param {Accthistory_EmptyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_empty = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_empty();
	return en_accthistory_empty();
});
//#endregion
//#region src/lib/paraglide/messages/accthistory_col_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_Col_DateInputs */
var en_accthistory_col_date = () => {
	return `Date`;
};
var am_accthistory_col_date = () => {
	return `ቀን`;
};
/**
* | output |
* | --- |
* | "Date" |
*
* @param {Accthistory_Col_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_col_date = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_col_date();
	return en_accthistory_col_date();
});
//#endregion
//#region src/lib/paraglide/messages/accthistory_col_contents.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_Col_ContentsInputs */
var en_accthistory_col_contents = () => {
	return `Contents`;
};
var am_accthistory_col_contents = () => {
	return `ይዘቶች`;
};
/**
* | output |
* | --- |
* | "Contents" |
*
* @param {Accthistory_Col_ContentsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_col_contents = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_col_contents();
	return en_accthistory_col_contents();
});
//#endregion
//#region src/lib/paraglide/messages/accthistory_col_amount.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_Col_AmountInputs */
var en_accthistory_col_amount = () => {
	return `Amount`;
};
var am_accthistory_col_amount = () => {
	return `መጠን`;
};
/**
* | output |
* | --- |
* | "Amount" |
*
* @param {Accthistory_Col_AmountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_col_amount = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_col_amount();
	return en_accthistory_col_amount();
});
//#endregion
//#region src/lib/paraglide/messages/accthistory_col_status.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Accthistory_Col_StatusInputs */
var en_accthistory_col_status = () => {
	return `Status`;
};
var am_accthistory_col_status = () => {
	return `ሁኔታ`;
};
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Accthistory_Col_StatusInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var accthistory_col_status = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_accthistory_col_status();
	return en_accthistory_col_status();
});
//#endregion
//#region src/routes/account/history/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		$$renderer.push(`<div class="block svelte-four5f"><div class="block-header svelte-four5f"><h2 class="svelte-four5f">${escape_html(accthistory_heading())}</h2></div> `);
		if (data.orders.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-four5f">${escape_html(accthistory_empty())}</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="table-wrap svelte-four5f"><table class="svelte-four5f"><thead><tr><th class="svelte-four5f">${escape_html(accthistory_col_date())}</th><th class="svelte-four5f">${escape_html(accthistory_col_contents())}</th><th class="svelte-four5f">${escape_html(accthistory_col_amount())}</th><th class="svelte-four5f">${escape_html(accthistory_col_status())}</th></tr></thead><tbody><!--[-->`);
			const each_array = ensure_array_like(data.orders);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let order = each_array[$$index];
				$$renderer.push(`<tr class="svelte-four5f"><td class="svelte-four5f">${escape_html(order.date)}</td><td class="svelte-four5f">${escape_html(order.items)}</td><td class="svelte-four5f"><span class="td-amount svelte-four5f">${escape_html(order.amount)}</span></td><td class="svelte-four5f"><span${attr_class(`tag-${stringify$1(order.statusKey)}`, "svelte-four5f")}>${escape_html(order.status)}</span></td></tr>`);
			}
			$$renderer.push(`<!--]--></tbody></table></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-B5JBgmYW.js.map
