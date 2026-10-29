import { j as notifyAdminPartnerApplication } from '../../../chunks/email.js-2yyYXO80.js';
import { m as db, P as partnerApplications } from '../../../chunks/db.js-Can7tpXV.js';
import { h as getLocale } from '../../../chunks/runtime.js-CbeSlHLA.js';
import { p as partnerSchema, a as partners_success_body } from '../../../chunks/schema2.js-DT2BHoDu.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-D8k391-h.js';
import { s as superValidate, m as message } from '../../../chunks/client2.js-CuhGksyF.js';
import { z as zod } from '../../../chunks/adapters.js-CrMSDpnl.js';
import { C as fail } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/lib/paraglide/messages/partners_error_generic.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Partners_Error_GenericInputs */
var en_partners_error_generic = () => {
	return `Something went wrong sending your application. Please try again.`;
};
var am_partners_error_generic = () => {
	return `ማመልከቻዎን በመላክ ላይ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Something went wrong sending your application. Please try again." |
*
* @param {Partners_Error_GenericInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var partners_error_generic = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_partners_error_generic();
	return en_partners_error_generic();
});
//#endregion
//#region src/routes/partners/+page.server.ts
var load = async ({ url }) => {
	const form = await superValidate(zod(partnerSchema));
	if (url.searchParams.get("type") === "supplier") form.data.type = "supplier";
	return { form };
};
var actions = { default: async ({ request }) => {
	const form = await superValidate(request, zod(partnerSchema));
	if (!form.valid) return fail(400, { form });
	const { company_url, consent: _consent, ...data } = form.data;
	if (company_url) return message(form, {
		type: "success",
		text: partners_success_body()
	});
	const row = {
		id: crypto.randomUUID(),
		...data,
		email: data.email.toLowerCase(),
		phone: data.phone || null,
		website: data.website || null,
		city: data.city || null,
		postcode: data.postcode ? data.postcode.toUpperCase() : null
	};
	try {
		await db.insert(partnerApplications).values(row);
	} catch (e) {
		console.error("partner application insert failed", e);
		return message(form, {
			type: "error",
			text: partners_error_generic()
		}, { status: 500 });
	}
	notifyAdminPartnerApplication(row).catch((e) => console.error("partner application email failed", e));
	return message(form, {
		type: "success",
		text: partners_success_body()
	});
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-D-iP-oRt.js.map
