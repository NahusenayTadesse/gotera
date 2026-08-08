import { a9 as escape_html, T as derived, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import { a as toast } from '../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { b as superForm } from '../../../../chunks/client2.js--SBYKgBt.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-DMULTZRY.js';

//#region src/lib/paraglide/messages/acctdetails_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_HeadingInputs */
var en_acctdetails_heading = () => {
	return `Your details`;
};
var am_acctdetails_heading = () => {
	return `የእርስዎ ዝርዝሮች`;
};
/**
* | output |
* | --- |
* | "Your details" |
*
* @param {Acctdetails_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_heading();
	return en_acctdetails_heading();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_email_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Email_LabelInputs */
var en_acctdetails_email_label = () => {
	return `Email`;
};
var am_acctdetails_email_label = () => {
	return `ኢሜይል`;
};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Acctdetails_Email_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_email_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_email_label();
	return en_acctdetails_email_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_email_verify_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Email_Verify_NoteInputs */
var en_acctdetails_email_verify_note = () => {
	return `Changing your email requires verification.`;
};
var am_acctdetails_email_verify_note = () => {
	return `ኢሜይልዎን መቀየር ማረጋገጫ ይጠይቃል።`;
};
/**
* | output |
* | --- |
* | "Changing your email requires verification." |
*
* @param {Acctdetails_Email_Verify_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_email_verify_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_email_verify_note();
	return en_acctdetails_email_verify_note();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_sending.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_SendingInputs */
var en_acctdetails_sending = () => {
	return `Sending…`;
};
var am_acctdetails_sending = () => {
	return `በመላክ ላይ…`;
};
/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Acctdetails_SendingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_sending = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_sending();
	return en_acctdetails_sending();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_save.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_SaveInputs */
var en_acctdetails_save = () => {
	return `Save`;
};
var am_acctdetails_save = () => {
	return `አስቀምጥ`;
};
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Acctdetails_SaveInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_save = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_save();
	return en_acctdetails_save();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_cancel.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_CancelInputs */
var en_acctdetails_cancel = () => {
	return `Cancel`;
};
var am_acctdetails_cancel = () => {
	return `ይቅር`;
};
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Acctdetails_CancelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_cancel = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_cancel();
	return en_acctdetails_cancel();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_email_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Email_NoteInputs */
var en_acctdetails_email_note = () => {
	return `Receipts and subscription notices.`;
};
var am_acctdetails_email_note = () => {
	return `ደረሰኞችና የደንበኝነት ማስታወቂያዎች።`;
};
/**
* | output |
* | --- |
* | "Receipts and subscription notices." |
*
* @param {Acctdetails_Email_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_email_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_email_note();
	return en_acctdetails_email_note();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_update.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_UpdateInputs */
var en_acctdetails_update = () => {
	return `Update`;
};
var am_acctdetails_update = () => {
	return `አዘምን`;
};
/**
* | output |
* | --- |
* | "Update" |
*
* @param {Acctdetails_UpdateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_update = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_update();
	return en_acctdetails_update();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_phone_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_LabelInputs */
var en_acctdetails_phone_label = () => {
	return `Phone`;
};
var am_acctdetails_phone_label = () => {
	return `ስልክ`;
};
/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Acctdetails_Phone_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_label();
	return en_acctdetails_phone_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_saving.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_SavingInputs */
var en_acctdetails_saving = () => {
	return `Saving…`;
};
var am_acctdetails_saving = () => {
	return `በማስቀመጥ ላይ…`;
};
/**
* | output |
* | --- |
* | "Saving…" |
*
* @param {Acctdetails_SavingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_saving = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_saving();
	return en_acctdetails_saving();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_phone_not_added.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_Not_AddedInputs */
var en_acctdetails_phone_not_added = () => {
	return `Not added yet`;
};
var am_acctdetails_phone_not_added = () => {
	return `እስካሁን አልተጨመረም`;
};
/**
* | output |
* | --- |
* | "Not added yet" |
*
* @param {Acctdetails_Phone_Not_AddedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_not_added = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_not_added();
	return en_acctdetails_phone_not_added();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_phone_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_NoteInputs */
var en_acctdetails_phone_note = () => {
	return `Delivery updates only.`;
};
var am_acctdetails_phone_note = () => {
	return `ለማድረሻ ዝማኔዎች ብቻ።`;
};
/**
* | output |
* | --- |
* | "Delivery updates only." |
*
* @param {Acctdetails_Phone_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_note();
	return en_acctdetails_phone_note();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_address_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Address_LabelInputs */
var en_acctdetails_address_label = () => {
	return `Delivery Address`;
};
var am_acctdetails_address_label = () => {
	return `የማድረሻ አድራሻ`;
};
/**
* | output |
* | --- |
* | "Delivery Address" |
*
* @param {Acctdetails_Address_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_address_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_address_label();
	return en_acctdetails_address_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_line1_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Line1_LabelInputs */
var en_acctdetails_line1_label = () => {
	return `Address line 1`;
};
var am_acctdetails_line1_label = () => {
	return `የአድራሻ መስመር 1`;
};
/**
* | output |
* | --- |
* | "Address line 1" |
*
* @param {Acctdetails_Line1_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_line1_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_line1_label();
	return en_acctdetails_line1_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_line2_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Line2_LabelInputs */
var en_acctdetails_line2_label = () => {
	return `Address line 2`;
};
var am_acctdetails_line2_label = () => {
	return `የአድራሻ መስመር 2`;
};
/**
* | output |
* | --- |
* | "Address line 2" |
*
* @param {Acctdetails_Line2_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_line2_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_line2_label();
	return en_acctdetails_line2_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_optional.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_OptionalInputs */
var en_acctdetails_optional = () => {
	return `optional`;
};
var am_acctdetails_optional = () => {
	return `አማራጭ`;
};
/**
* | output |
* | --- |
* | "optional" |
*
* @param {Acctdetails_OptionalInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_optional = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_optional();
	return en_acctdetails_optional();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_city_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_City_LabelInputs */
var en_acctdetails_city_label = () => {
	return `City`;
};
var am_acctdetails_city_label = () => {
	return `ከተማ`;
};
/**
* | output |
* | --- |
* | "City" |
*
* @param {Acctdetails_City_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_city_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_city_label();
	return en_acctdetails_city_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_postcode_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Postcode_LabelInputs */
var en_acctdetails_postcode_label = () => {
	return `Postcode`;
};
var am_acctdetails_postcode_label = () => {
	return `ፖስት ኮድ`;
};
/**
* | output |
* | --- |
* | "Postcode" |
*
* @param {Acctdetails_Postcode_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_postcode_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_postcode_label();
	return en_acctdetails_postcode_label();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_save_address.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Save_AddressInputs */
var en_acctdetails_save_address = () => {
	return `Save address`;
};
var am_acctdetails_save_address = () => {
	return `አድራሻ አስቀምጥ`;
};
/**
* | output |
* | --- |
* | "Save address" |
*
* @param {Acctdetails_Save_AddressInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_save_address = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_save_address();
	return en_acctdetails_save_address();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_no_address.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_No_AddressInputs */
var en_acctdetails_no_address = () => {
	return `No delivery address on file`;
};
var am_acctdetails_no_address = () => {
	return `የተመዘገበ የማድረሻ አድራሻ የለም`;
};
/**
* | output |
* | --- |
* | "No delivery address on file" |
*
* @param {Acctdetails_No_AddressInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_no_address = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_no_address();
	return en_acctdetails_no_address();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_address_note.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Address_NoteInputs */
var en_acctdetails_address_note = () => {
	return `Changes before cut-off apply to next delivery.`;
};
var am_acctdetails_address_note = () => {
	return `ከመቁረጫው በፊት የሚደረጉ ለውጦች ለሚቀጥለው ማድረሻ ተፈጻሚ ይሆናሉ።`;
};
/**
* | output |
* | --- |
* | "Changes before cut-off apply to next delivery." |
*
* @param {Acctdetails_Address_NoteInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_address_note = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_address_note();
	return en_acctdetails_address_note();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_update_address.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Update_AddressInputs */
var en_acctdetails_update_address = () => {
	return `Update address`;
};
var am_acctdetails_update_address = () => {
	return `አድራሻ አዘምን`;
};
/**
* | output |
* | --- |
* | "Update address" |
*
* @param {Acctdetails_Update_AddressInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_update_address = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_update_address();
	return en_acctdetails_update_address();
});
//#endregion
//#region src/routes/account/details/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let editing = {
			email: false,
			phone: false,
			address: false
		};
		function onUpdated(field) {
			return ({ form }) => {
				const m = form.message;
				if (!m) return;
				if (m.type === "success") {
					toast.success(m.text);
					editing[field] = false;
				} else toast.error(m.text);
			};
		}
		const { form: emailForm, errors: emailErrors, submitting: emailSubmitting } = superForm(data.emailForm, {
			id: "email",
			invalidateAll: true,
			onUpdated: onUpdated("email")
		});
		const { form: phoneForm, errors: phoneErrors, submitting: phoneSubmitting } = superForm(data.phoneForm, {
			id: "phone",
			invalidateAll: true,
			onUpdated: onUpdated("phone")
		});
		const { form: addressForm, errors: addressErrors, submitting: addressSubmitting } = superForm(data.addressForm, {
			id: "address",
			invalidateAll: true,
			onUpdated: onUpdated("address")
		});
		const addressLine = derived(() => data.address ? [
			data.address.line1,
			data.address.line2,
			data.address.city,
			data.address.postcode
		].filter(Boolean).join(", ") : null);
		$$renderer.push(`<div class="block svelte-qfqyj5"><div class="block-header svelte-qfqyj5"><h2 class="svelte-qfqyj5">${escape_html(acctdetails_heading())}</h2></div> <div class="details-grid svelte-qfqyj5"><div class="detail svelte-qfqyj5"><span class="detail-label svelte-qfqyj5">${escape_html(acctdetails_email_label())}</span> `);
		if (editing.email) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST" action="?/updateEmail" class="edit svelte-qfqyj5"><input class="edit-input svelte-qfqyj5" type="email" name="email" autocomplete="email"${attr("value", store_get($$store_subs ??= {}, "$emailForm", emailForm).email)}/> `);
			if (store_get($$store_subs ??= {}, "$emailErrors", emailErrors).email) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-qfqyj5">${escape_html(store_get($$store_subs ??= {}, "$emailErrors", emailErrors).email)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="edit-note svelte-qfqyj5">${escape_html(acctdetails_email_verify_note())}</div> <div class="edit-actions svelte-qfqyj5"><button type="submit" class="btn-save svelte-qfqyj5"${attr("disabled", store_get($$store_subs ??= {}, "$emailSubmitting", emailSubmitting), true)}>${escape_html(store_get($$store_subs ??= {}, "$emailSubmitting", emailSubmitting) ? acctdetails_sending() : acctdetails_save())}</button> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_cancel())}</button></div></form>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="detail-value svelte-qfqyj5">${escape_html(data.email)}</div> <div class="detail-note svelte-qfqyj5">${escape_html(acctdetails_email_note())}</div> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_update())}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="detail svelte-qfqyj5"><span class="detail-label svelte-qfqyj5">${escape_html(acctdetails_phone_label())}</span> `);
		if (editing.phone) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST" action="?/updatePhone" class="edit svelte-qfqyj5"><input class="edit-input svelte-qfqyj5" type="tel" name="phone" autocomplete="tel"${attr("value", store_get($$store_subs ??= {}, "$phoneForm", phoneForm).phone)}/> `);
			if (store_get($$store_subs ??= {}, "$phoneErrors", phoneErrors).phone) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-qfqyj5">${escape_html(store_get($$store_subs ??= {}, "$phoneErrors", phoneErrors).phone)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="edit-actions svelte-qfqyj5"><button type="submit" class="btn-save svelte-qfqyj5"${attr("disabled", store_get($$store_subs ??= {}, "$phoneSubmitting", phoneSubmitting), true)}>${escape_html(store_get($$store_subs ??= {}, "$phoneSubmitting", phoneSubmitting) ? acctdetails_saving() : acctdetails_save())}</button> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_cancel())}</button></div></form>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="detail-value svelte-qfqyj5">${escape_html(data.phone ?? acctdetails_phone_not_added())}</div> <div class="detail-note svelte-qfqyj5">${escape_html(acctdetails_phone_note())}</div> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_update())}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="detail full svelte-qfqyj5"><span class="detail-label svelte-qfqyj5">${escape_html(acctdetails_address_label())}</span> `);
		if (editing.address) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST" action="?/updateAddress" class="edit svelte-qfqyj5"><div class="addr-grid svelte-qfqyj5"><div class="af full svelte-qfqyj5"><label class="af-label svelte-qfqyj5" for="line1">${escape_html(acctdetails_line1_label())}</label> <input id="line1" class="edit-input svelte-qfqyj5" name="line1"${attr("value", store_get($$store_subs ??= {}, "$addressForm", addressForm).line1)}/> `);
			if (store_get($$store_subs ??= {}, "$addressErrors", addressErrors).line1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-qfqyj5">${escape_html(store_get($$store_subs ??= {}, "$addressErrors", addressErrors).line1)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="af full svelte-qfqyj5"><label class="af-label svelte-qfqyj5" for="line2">${escape_html(acctdetails_line2_label())} <span class="opt svelte-qfqyj5">${escape_html(acctdetails_optional())}</span></label> <input id="line2" class="edit-input svelte-qfqyj5" name="line2"${attr("value", store_get($$store_subs ??= {}, "$addressForm", addressForm).line2)}/></div> <div class="af svelte-qfqyj5"><label class="af-label svelte-qfqyj5" for="city">${escape_html(acctdetails_city_label())}</label> <input id="city" class="edit-input svelte-qfqyj5" name="city"${attr("value", store_get($$store_subs ??= {}, "$addressForm", addressForm).city)}/> `);
			if (store_get($$store_subs ??= {}, "$addressErrors", addressErrors).city) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-qfqyj5">${escape_html(store_get($$store_subs ??= {}, "$addressErrors", addressErrors).city)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="af svelte-qfqyj5"><label class="af-label svelte-qfqyj5" for="postcode">${escape_html(acctdetails_postcode_label())}</label> <input id="postcode" class="edit-input svelte-qfqyj5" name="postcode"${attr("value", store_get($$store_subs ??= {}, "$addressForm", addressForm).postcode)}/> `);
			if (store_get($$store_subs ??= {}, "$addressErrors", addressErrors).postcode) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-qfqyj5">${escape_html(store_get($$store_subs ??= {}, "$addressErrors", addressErrors).postcode)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="edit-actions svelte-qfqyj5"><button type="submit" class="btn-save svelte-qfqyj5"${attr("disabled", store_get($$store_subs ??= {}, "$addressSubmitting", addressSubmitting), true)}>${escape_html(store_get($$store_subs ??= {}, "$addressSubmitting", addressSubmitting) ? acctdetails_saving() : acctdetails_save_address())}</button> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_cancel())}</button></div></form>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="detail-value svelte-qfqyj5">${escape_html(addressLine() ?? acctdetails_no_address())}</div> <div class="detail-note svelte-qfqyj5">${escape_html(acctdetails_address_note())}</div> <button type="button" class="btn-soft svelte-qfqyj5">${escape_html(acctdetails_update_address())}</button>`);
		}
		$$renderer.push(`<!--]--></div></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-49DeSCdk.js.map
