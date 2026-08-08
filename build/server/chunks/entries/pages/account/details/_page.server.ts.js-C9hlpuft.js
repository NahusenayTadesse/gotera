import { m as db, z as addresses, k as and, j as eq, p as subscribers } from '../../../../chunks/db.js-BkD50_-0.js';
import { a as auth, A as APIError } from '../../../../chunks/auth.js-DZBRJAcg.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, a as setError, m as message } from '../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { C as fail, B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, y as email, s as string } from '../../../../chunks/access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/acctdetails_email_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Email_InvalidInputs */
var en_acctdetails_email_invalid = () => {
	return `Enter a valid email address.`;
};
var am_acctdetails_email_invalid = () => {
	return `ትክክለኛ የኢሜይል አድራሻ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a valid email address." |
*
* @param {Acctdetails_Email_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_email_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_email_invalid();
	return en_acctdetails_email_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_phone_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_InvalidInputs */
var en_acctdetails_phone_invalid = () => {
	return `Enter a valid phone number.`;
};
var am_acctdetails_phone_invalid = () => {
	return `ትክክለኛ የስልክ ቁጥር ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a valid phone number." |
*
* @param {Acctdetails_Phone_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_invalid();
	return en_acctdetails_phone_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_phone_format.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Phone_FormatInputs */
var en_acctdetails_phone_format = () => {
	return `Use digits and + ( ) - only.`;
};
var am_acctdetails_phone_format = () => {
	return `ቁጥሮችንና + ( ) - ብቻ ይጠቀሙ።`;
};
/**
* | output |
* | --- |
* | "Use digits and + ( ) - only." |
*
* @param {Acctdetails_Phone_FormatInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_phone_format = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_phone_format();
	return en_acctdetails_phone_format();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_line1_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Line1_RequiredInputs */
var en_acctdetails_line1_required = () => {
	return `Address line 1 is required.`;
};
var am_acctdetails_line1_required = () => {
	return `የአድራሻ መስመር 1 ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Address line 1 is required." |
*
* @param {Acctdetails_Line1_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_line1_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_line1_required();
	return en_acctdetails_line1_required();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_city_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_City_RequiredInputs */
var en_acctdetails_city_required = () => {
	return `City is required.`;
};
var am_acctdetails_city_required = () => {
	return `ከተማ ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "City is required." |
*
* @param {Acctdetails_City_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_city_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_city_required();
	return en_acctdetails_city_required();
});
//#endregion
//#region src/lib/paraglide/messages/acctdetails_postcode_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctdetails_Postcode_RequiredInputs */
var en_acctdetails_postcode_required = () => {
	return `Postcode is required.`;
};
var am_acctdetails_postcode_required = () => {
	return `ፖስት ኮድ ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Postcode is required." |
*
* @param {Acctdetails_Postcode_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctdetails_postcode_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctdetails_postcode_required();
	return en_acctdetails_postcode_required();
});
//#endregion
//#region src/routes/account/details/schema.ts
var emailSchema = object({ email: email({ error: acctdetails_email_invalid() }) });
var phoneSchema = object({ phone: string().min(5, { error: acctdetails_phone_invalid() }).max(32).regex(/^[0-9+()\s-]+$/, { error: acctdetails_phone_format() }) });
var addressSchema = object({
	line1: string().min(1, { error: acctdetails_line1_required() }).max(255),
	line2: string().max(255).optional(),
	city: string().min(1, { error: acctdetails_city_required() }).max(255).default("London"),
	postcode: string().min(1, { error: acctdetails_postcode_required() }).max(32)
});
//#endregion
//#region src/routes/account/details/+page.server.ts
async function getSubscriber(userId) {
	const [s] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return s ?? null;
}
async function getPrimaryAddress(subscriberId) {
	const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
	return rows.find((a) => a.isPrimary) ?? rows[0] ?? null;
}
var load = async ({ locals }) => {
	if (!locals.user) redirect(303, "/login");
	const sub = await getSubscriber(locals.user.id);
	const addr = sub ? await getPrimaryAddress(sub.id) : null;
	return {
		email: locals.user.email,
		phone: sub?.phone ?? null,
		address: addr,
		emailForm: await superValidate({ email: locals.user.email }, zod(emailSchema), { id: "email" }),
		phoneForm: await superValidate({ phone: sub?.phone ?? "" }, zod(phoneSchema), { id: "phone" }),
		addressForm: await superValidate({
			line1: addr?.line1 ?? "",
			line2: addr?.line2 ?? "",
			city: addr?.city ?? "London",
			postcode: addr?.postcode ?? ""
		}, zod(addressSchema), { id: "address" })
	};
};
var actions = {
	updatePhone: async ({ request, locals }) => {
		const form = await superValidate(request, zod(phoneSchema), { id: "phone" });
		if (!form.valid) return fail(400, { form });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return message(form, {
			type: "error",
			text: "No subscriber profile found."
		}, { status: 400 });
		await db.update(subscribers).set({ phone: form.data.phone }).where(eq(subscribers.id, sub.id));
		return message(form, {
			type: "success",
			text: "Phone number updated."
		});
	},
	updateAddress: async ({ request, locals }) => {
		const form = await superValidate(request, zod(addressSchema), { id: "address" });
		if (!form.valid) return fail(400, { form });
		const sub = await getSubscriber(locals.user.id);
		if (!sub) return message(form, {
			type: "error",
			text: "No subscriber profile found."
		}, { status: 400 });
		const values = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			city: form.data.city || "London",
			postcode: form.data.postcode
		};
		const existing = await getPrimaryAddress(sub.id);
		if (existing) await db.update(addresses).set(values).where(and(eq(addresses.id, existing.id), eq(addresses.subscriberId, sub.id)));
		else await db.insert(addresses).values({
			id: crypto.randomUUID(),
			subscriberId: sub.id,
			isPrimary: true,
			...values
		});
		return message(form, {
			type: "success",
			text: "Delivery address updated."
		});
	},
	updateEmail: async ({ request, locals }) => {
		const form = await superValidate(request, zod(emailSchema), { id: "email" });
		if (!form.valid) return fail(400, { form });
		if (form.data.email === locals.user.email) return setError(form, "email", "That's already your email.");
		try {
			await auth.api.changeEmail({
				body: {
					newEmail: form.data.email,
					callbackURL: "/account/details"
				},
				headers: request.headers
			});
		} catch (e) {
			if (e instanceof APIError) return setError(form, "email", e.body?.message ?? "Could not change your email.");
			console.error("changeEmail failed", e);
			return message(form, {
				type: "error",
				text: "Could not change your email."
			}, { status: 500 });
		}
		return message(form, {
			type: "success",
			text: "Verification sent — confirm from your new inbox to finish."
		});
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C9hlpuft.js.map
