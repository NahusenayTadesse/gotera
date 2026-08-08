import { s as stripe } from '../../../chunks/stripe.js-DclyrhzZ.js';
import { m as db, z as addresses, q as plans, k as and, j as eq, y as subscriptions, p as subscribers, v as subscriberAddons, w as addons, a as asc, F as guestOrders, G as giftOrders } from '../../../chunks/db.js-BkD50_-0.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, a as setError, m as message } from '../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../chunks/adapters.js-D4rGtFDl.js';
import { l as loginSchema, a as addUser } from '../../../chunks/ZodSchema.js-B2IFjPeP.js';
import { C as fail, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, n as number, s as string, y as email, c as boolean, b as string$1, x as array, _ as _enum, a4 as uuid } from '../../../chunks/access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/subscribe_error_cancel_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Cancel_FailedInputs */
var en_subscribe_error_cancel_failed = () => {
	return `Could not cancel your subscription.`;
};
var am_subscribe_error_cancel_failed = () => {
	return `ምዝገባዎን መሰረዝ አልተቻለም።`;
};
/**
* | output |
* | --- |
* | "Could not cancel your subscription." |
*
* @param {Subscribe_Error_Cancel_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_cancel_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_cancel_failed();
	return en_subscribe_error_cancel_failed();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_checkout_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Checkout_FailedInputs */
var en_subscribe_error_checkout_failed = () => {
	return `Could not start checkout. Please try again.`;
};
var am_subscribe_error_checkout_failed = () => {
	return `ክፍያውን መጀመር አልተቻለም። እባክዎ እንደገና ይሞክሩ።`;
};
/**
* | output |
* | --- |
* | "Could not start checkout. Please try again." |
*
* @param {Subscribe_Error_Checkout_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_checkout_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_checkout_failed();
	return en_subscribe_error_checkout_failed();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_choose_gift_pack.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Choose_Gift_PackInputs */
var en_subscribe_error_choose_gift_pack = () => {
	return `Choose a gift pack.`;
};
var am_subscribe_error_choose_gift_pack = () => {
	return `የስጦታ ጥቅል ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Choose a gift pack." |
*
* @param {Subscribe_Error_Choose_Gift_PackInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_choose_gift_pack = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_choose_gift_pack();
	return en_subscribe_error_choose_gift_pack();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_choose_subscription_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Choose_Subscription_PlanInputs */
var en_subscribe_error_choose_subscription_plan = () => {
	return `Choose a subscription plan.`;
};
var am_subscribe_error_choose_subscription_plan = () => {
	return `የምዝገባ ዕቅድ ይምረጡ።`;
};
/**
* | output |
* | --- |
* | "Choose a subscription plan." |
*
* @param {Subscribe_Error_Choose_Subscription_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_choose_subscription_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_choose_subscription_plan();
	return en_subscribe_error_choose_subscription_plan();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_email_invalid.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Email_InvalidInputs */
var en_subscribe_error_email_invalid = () => {
	return `Enter a valid email address.`;
};
var am_subscribe_error_email_invalid = () => {
	return `ትክክለኛ ኢሜይል አድራሻ ያስገቡ።`;
};
/**
* | output |
* | --- |
* | "Enter a valid email address." |
*
* @param {Subscribe_Error_Email_InvalidInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_email_invalid = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_email_invalid();
	return en_subscribe_error_email_invalid();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_gift_no_price.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Gift_No_PriceInputs */
var en_subscribe_error_gift_no_price = () => {
	return `This gift has no Stripe price set.`;
};
var am_subscribe_error_gift_no_price = () => {
	return `ለዚህ ስጦታ የተቀመጠ የStripe ዋጋ የለም።`;
};
/**
* | output |
* | --- |
* | "This gift has no Stripe price set." |
*
* @param {Subscribe_Error_Gift_No_PriceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_gift_no_price = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_gift_no_price();
	return en_subscribe_error_gift_no_price();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_guest_order_not_allowed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Guest_Order_Not_AllowedInputs */
var en_subscribe_error_guest_order_not_allowed = () => {
	return `Guest Order is not allowed for non one type orders.`;
};
var am_subscribe_error_guest_order_not_allowed = () => {
	return `የእንግዳ ትዕዛዝ ለሌላ አይነት ትዕዛዞች አይፈቀድም።`;
};
/**
* | output |
* | --- |
* | "Guest Order is not allowed for non one type orders." |
*
* @param {Subscribe_Error_Guest_Order_Not_AllowedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_guest_order_not_allowed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_guest_order_not_allowed();
	return en_subscribe_error_guest_order_not_allowed();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_line1_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Line1_RequiredInputs */
var en_subscribe_error_line1_required = () => {
	return `Address line 1 is required.`;
};
var am_subscribe_error_line1_required = () => {
	return `የአድራሻ መስመር 1 ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Address line 1 is required." |
*
* @param {Subscribe_Error_Line1_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_line1_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_line1_required();
	return en_subscribe_error_line1_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_not_found.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Not_FoundInputs */
var en_subscribe_error_not_found = () => {
	return `Subscription not found.`;
};
var am_subscribe_error_not_found = () => {
	return `ምዝገባው አልተገኘም።`;
};
/**
* | output |
* | --- |
* | "Subscription not found." |
*
* @param {Subscribe_Error_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_not_found = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_not_found();
	return en_subscribe_error_not_found();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_phone_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Phone_RequiredInputs */
var en_subscribe_error_phone_required = () => {
	return `Phone is required`;
};
var am_subscribe_error_phone_required = () => {
	return `ስልክ ቁጥር ያስፈልጋል`;
};
/**
* | output |
* | --- |
* | "Phone is required" |
*
* @param {Subscribe_Error_Phone_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_phone_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_phone_required();
	return en_subscribe_error_phone_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_plan_no_price.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Plan_No_PriceInputs */
var en_subscribe_error_plan_no_price = () => {
	return `This plan has no Stripe price set.`;
};
var am_subscribe_error_plan_no_price = () => {
	return `ለዚህ ዕቅድ የተቀመጠ የStripe ዋጋ የለም።`;
};
/**
* | output |
* | --- |
* | "This plan has no Stripe price set." |
*
* @param {Subscribe_Error_Plan_No_PriceInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_plan_no_price = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_plan_no_price();
	return en_subscribe_error_plan_no_price();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_plan_unavailable.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Plan_UnavailableInputs */
var en_subscribe_error_plan_unavailable = () => {
	return `That plan isn't available here.`;
};
var am_subscribe_error_plan_unavailable = () => {
	return `ይህ ዕቅድ እዚህ አይገኝም።`;
};
/**
* | output |
* | --- |
* | "That plan isn't available here." |
*
* @param {Subscribe_Error_Plan_UnavailableInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_plan_unavailable = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_plan_unavailable();
	return en_subscribe_error_plan_unavailable();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_postcode_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Postcode_RequiredInputs */
var en_subscribe_error_postcode_required = () => {
	return `Postcode is required.`;
};
var am_subscribe_error_postcode_required = () => {
	return `ፖስታ ኮድ ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Postcode is required." |
*
* @param {Subscribe_Error_Postcode_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_postcode_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_postcode_required();
	return en_subscribe_error_postcode_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_recipient_line1_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Recipient_Line1_RequiredInputs */
var en_subscribe_error_recipient_line1_required = () => {
	return `Recipient address line 1 is required.`;
};
var am_subscribe_error_recipient_line1_required = () => {
	return `የተቀባዩ አድራሻ መስመር 1 ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Recipient address line 1 is required." |
*
* @param {Subscribe_Error_Recipient_Line1_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_recipient_line1_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_recipient_line1_required();
	return en_subscribe_error_recipient_line1_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_recipient_name_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Recipient_Name_RequiredInputs */
var en_subscribe_error_recipient_name_required = () => {
	return `Recipient's name is required.`;
};
var am_subscribe_error_recipient_name_required = () => {
	return `የተቀባዩ ስም ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Recipient's name is required." |
*
* @param {Subscribe_Error_Recipient_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_recipient_name_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_recipient_name_required();
	return en_subscribe_error_recipient_name_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_recipient_postcode_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Recipient_Postcode_RequiredInputs */
var en_subscribe_error_recipient_postcode_required = () => {
	return `Recipient postcode is required.`;
};
var am_subscribe_error_recipient_postcode_required = () => {
	return `የተቀባዩ ፖስታ ኮድ ያስፈልጋል።`;
};
/**
* | output |
* | --- |
* | "Recipient postcode is required." |
*
* @param {Subscribe_Error_Recipient_Postcode_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_recipient_postcode_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_recipient_postcode_required();
	return en_subscribe_error_recipient_postcode_required();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_sign_in_to_order.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Sign_In_To_OrderInputs */
var en_subscribe_error_sign_in_to_order = () => {
	return `Please sign in to order.`;
};
var am_subscribe_error_sign_in_to_order = () => {
	return `ለማዘዝ እባክዎ ይግቡ።`;
};
/**
* | output |
* | --- |
* | "Please sign in to order." |
*
* @param {Subscribe_Error_Sign_In_To_OrderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_sign_in_to_order = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_sign_in_to_order();
	return en_subscribe_error_sign_in_to_order();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_subscription_start_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Subscription_Start_FailedInputs */
var en_subscribe_error_subscription_start_failed = () => {
	return `Something went wrong starting your subscription.`;
};
var am_subscribe_error_subscription_start_failed = () => {
	return `ምዝገባዎን በመጀመር ላይ ስህተት ተከስቷል።`;
};
/**
* | output |
* | --- |
* | "Something went wrong starting your subscription." |
*
* @param {Subscribe_Error_Subscription_Start_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_subscription_start_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_subscription_start_failed();
	return en_subscribe_error_subscription_start_failed();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_update_failed.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Update_FailedInputs */
var en_subscribe_error_update_failed = () => {
	return `Could not update your subscription.`;
};
var am_subscribe_error_update_failed = () => {
	return `ምዝገባዎን ማዘመን አልተቻለም።`;
};
/**
* | output |
* | --- |
* | "Could not update your subscription." |
*
* @param {Subscribe_Error_Update_FailedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_update_failed = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_update_failed();
	return en_subscribe_error_update_failed();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_wrong_flow_gift.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Wrong_Flow_GiftInputs */
var en_subscribe_error_wrong_flow_gift = () => {
	return `Wrong flow for a gift.`;
};
var am_subscribe_error_wrong_flow_gift = () => {
	return `ለስጦታ ትክክል ያልሆነ ሂደት።`;
};
/**
* | output |
* | --- |
* | "Wrong flow for a gift." |
*
* @param {Subscribe_Error_Wrong_Flow_GiftInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_wrong_flow_gift = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_wrong_flow_gift();
	return en_subscribe_error_wrong_flow_gift();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_error_wrong_flow_order.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Error_Wrong_Flow_OrderInputs */
var en_subscribe_error_wrong_flow_order = () => {
	return `Wrong flow for this order.`;
};
var am_subscribe_error_wrong_flow_order = () => {
	return `ለዚህ ትዕዛዝ ትክክል ያልሆነ ሂደት።`;
};
/**
* | output |
* | --- |
* | "Wrong flow for this order." |
*
* @param {Subscribe_Error_Wrong_Flow_OrderInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_error_wrong_flow_order = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_error_wrong_flow_order();
	return en_subscribe_error_wrong_flow_order();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_success_cancelled.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Success_CancelledInputs */
var en_subscribe_success_cancelled = () => {
	return `Subscription cancelled.`;
};
var am_subscribe_success_cancelled = () => {
	return `ምዝገባው ተሰርዟል።`;
};
/**
* | output |
* | --- |
* | "Subscription cancelled." |
*
* @param {Subscribe_Success_CancelledInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_success_cancelled = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_success_cancelled();
	return en_subscribe_success_cancelled();
});
//#endregion
//#region src/lib/paraglide/messages/subscribe_success_updated.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Subscribe_Success_UpdatedInputs */
var en_subscribe_success_updated = () => {
	return `Subscription updated.`;
};
var am_subscribe_success_updated = () => {
	return `ምዝገባው ታድሷል።`;
};
/**
* | output |
* | --- |
* | "Subscription updated." |
*
* @param {Subscribe_Success_UpdatedInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var subscribe_success_updated = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_subscribe_success_updated();
	return en_subscribe_success_updated();
});
//#endregion
//#region src/routes/subscribe/schema.ts
/**
* Zod 4 schema for the GOTERA subscribe / gift checkout page.
*
* One flat schema drives both flows (recipient = 'me' | 'gift') so superforms
* has stable defaults for every field. Cross-field rules (which plan is valid
* for which recipient, which address fields are required) are enforced with
* chained `.refine()`s at the object level.
*
* Fields that the server fills in itself are NOT here:
*   - subscribers.userId / email / fullName  -> from the Better Auth session
*   - anything in secureFields (createdAt/updatedAt/user cols) -> server
*   - Stripe ids, status, scheduledDate       -> server
*/
var RECIPIENTS = ["me", "gift"];
var SUB_PLANS = [
	"one-off",
	"starter",
	"regular"
];
var GIFT_PLANS = ["single-gift", "double-gift"];
var DELIVERY_DAYS = ["Saturday"];
var FREQUENCIES = ["Monthly"];
var ALL_PLANS = [...SUB_PLANS, ...GIFT_PLANS];
var checkoutSchema = object({
	recipient: _enum(RECIPIENTS).default("me"),
	plan: _enum(ALL_PLANS).default("regular"),
	deliveryDay: _enum(DELIVERY_DAYS).default("Saturday"),
	frequency: _enum(FREQUENCIES).default("Monthly"),
	addonIds: array(string().min(1)).default([]),
	marketingOptIn: boolean().default(true),
	addressLabel: string().max(255).optional(),
	phone: string$1(subscribe_error_phone_required()).default(""),
	line1: string().max(255).default(""),
	line2: string().max(255).optional(),
	city: string().max(255).default("London"),
	postcode: string().max(32).default(""),
	guestCheckout: boolean().default(false),
	quantity: number().default(1),
	buyerName: string().max(255).optional(),
	buyerEmail: email({ error: subscribe_error_email_invalid() }).optional(),
	recipientName: string().max(255).default(""),
	giftMessage: string().max(500).optional(),
	durationMonths: number().int().min(1).max(12).default(1)
}).refine((v) => v.recipient === "me" ? SUB_PLANS.includes(v.plan) : true, {
	error: subscribe_error_choose_subscription_plan(),
	path: ["plan"]
}).refine((v) => v.recipient === "gift" ? GIFT_PLANS.includes(v.plan) : true, {
	error: subscribe_error_choose_gift_pack(),
	path: ["plan"]
}).refine((v) => v.recipient === "me" ? v.line1.trim().length > 0 : true, {
	error: subscribe_error_line1_required(),
	path: ["line1"]
}).refine((v) => v.recipient === "me" ? v.postcode.trim().length > 0 : true, {
	error: subscribe_error_postcode_required(),
	path: ["postcode"]
}).refine((v) => v.recipient === "gift" ? v.recipientName.trim().length > 0 : true, {
	error: subscribe_error_recipient_name_required(),
	path: ["recipientName"]
}).refine((v) => v.recipient === "gift" ? v.line1.trim().length > 0 : true, {
	error: subscribe_error_recipient_line1_required(),
	path: ["line1"]
}).refine((v) => v.recipient === "gift" ? v.postcode.trim().length > 0 : true, {
	error: subscribe_error_recipient_postcode_required(),
	path: ["postcode"]
});
var updateSubscriptionSchema = object({
	subscriberId: uuid(),
	plan: _enum(["starter", "regular"]),
	addonIds: array(string().min(1)).default([]),
	deliveryDay: _enum(DELIVERY_DAYS).default("Saturday"),
	marketingOptIn: boolean().default(true)
});
var cancelSubscriptionSchema = object({ subscriberId: uuid() });
//#endregion
//#region src/routes/subscribe/+page.server.ts
async function resolveAddons(ids) {
	if (ids.length === 0) return {
		rows: [],
		pence: 0,
		unknown: false
	};
	const rows = (await db.select().from(addons)).filter((a) => ids.includes(a.id));
	return {
		rows,
		pence: rows.reduce((sum, a) => sum + a.pricePence, 0),
		unknown: rows.length !== ids.length
	};
}
/** Add-on line items — only those with a Stripe price. For mode:'payment' these
*  must be ONE-TIME prices in Stripe. */
function addonLineItems(rows) {
	return rows.map((a) => a.stripePriceId).filter((price) => !!price).map((price) => ({
		price,
		quantity: 1
	}));
}
/** Ensure a subscriber (the person) row exists; return its id + stripe customer. */
async function ensureSubscriber(tx, user, marketingOptIn) {
	const [existing] = await tx.select().from(subscribers).where(eq(subscribers.userId, user.id));
	if (existing) return {
		id: existing.id,
		stripeCustomerId: existing.stripeCustomerId ?? null
	};
	const id = crypto.randomUUID();
	await tx.insert(subscribers).values({
		id,
		userId: user.id,
		email: user.email,
		fullName: user.name ?? null,
		phone: null,
		marketingOptIn
	});
	return {
		id,
		stripeCustomerId: null
	};
}
/** One-time order (one-off for self, or a gift). */
async function oneTimeCheckout(opts) {
	const giftOrderId = crypto.randomUUID();
	await db.insert(giftOrders).values({
		id: giftOrderId,
		buyerEmail: opts.buyerEmail,
		buyerName: opts.buyerName,
		recipientName: opts.recipientName,
		recipientAddress: opts.recipientAddress,
		giftMessage: opts.giftMessage,
		durationMonths: opts.durationMonths,
		status: "pending"
	});
	return (await stripe.checkout.sessions.create({
		mode: "payment",
		customer_email: opts.buyerEmail,
		line_items: [{
			price: opts.plan.stripePriceId,
			quantity: opts.quantity
		}, ...addonLineItems(opts.addons)],
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
		payment_intent_data: { metadata: {
			giftOrderId,
			kind: opts.plan.kind
		} },
		metadata: {
			giftOrderId,
			kind: opts.plan.kind,
			addonIds: opts.addons.map((a) => a.id).join(","),
			quantity: String(opts.quantity)
		}
	})).url;
}
async function guestCheckout(opts) {
	const giftOrderId = crypto.randomUUID();
	await db.insert(guestOrders).values({
		id: giftOrderId,
		buyerEmail: opts.buyerEmail ?? null,
		quantity: opts.quantity,
		recipientAddress: opts.recipientAddress,
		status: "pending"
	});
	return (await stripe.checkout.sessions.create({
		mode: "payment",
		billing_address_collection: "required",
		line_items: [{
			price: opts.plan.stripePriceId,
			quantity: opts.quantity
		}, ...addonLineItems(opts.addons)],
		success_url: opts.successUrl,
		cancel_url: opts.cancelUrl,
		payment_intent_data: { metadata: {
			giftOrderId,
			kind: opts.plan.kind
		} },
		metadata: {
			guestOrderId: giftOrderId,
			kind: opts.plan.kind,
			addonIds: opts.addons.map((a) => a.id).join(","),
			quantity: String(opts.quantity)
		}
	})).url;
}
var toPlan = (p) => ({
	id: p.slug,
	name: p.name,
	sub: p.subtitle ?? "",
	price: p.pricePence / 100,
	freq: p.freqLabel ?? "",
	bullet: p.bullets,
	kind: p.kind,
	featured: p.featured
});
var load = async ({ url }) => {
	const catalogue = await db.select().from(addons).orderBy(asc(addons.sortOrder));
	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(addUser));
	const rows = await db.select().from(plans).where(eq(plans.active, true)).orderBy(asc(plans.sortOrder));
	const subscriptionPlans = rows.filter((p) => p.kind !== "gift").map(toPlan);
	const giftPlans = rows.filter((p) => p.kind === "gift").map(toPlan);
	const requested = url.searchParams.get("plan");
	const match = requested && ALL_PLANS.includes(requested) ? rows.find((p) => p.slug === requested) : void 0;
	const recipient = match ? match.kind === "gift" ? "gift" : "me" : void 0;
	return {
		form: await superValidate(match ? {
			plan: match.slug,
			recipient
		} : void 0, zod(checkoutSchema), { errors: false }),
		subscriptionPlans,
		giftPlans,
		addons: catalogue,
		loginForm,
		signupForm,
		preselected: match ? {
			slug: match.slug,
			recipient
		} : null
	};
};
var actions = {
	subscribe: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod(checkoutSchema));
		console.log("subscribe");
		if (!form.valid) return fail(400, { form });
		if (form.data.recipient !== "me") return message(form, {
			type: "error",
			text: subscribe_error_wrong_flow_order()
		}, { status: 400 });
		const user = locals.user;
		if (!user) return message(form, {
			type: "error",
			text: subscribe_error_sign_in_to_order()
		}, { status: 401 });
		const [plan] = await db.select().from(plans).where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || plan.kind !== "subscription" && plan.kind !== "order") return message(form, {
			type: "error",
			text: subscribe_error_plan_unavailable()
		}, { status: 400 });
		if (!plan.stripePriceId) return message(form, {
			type: "error",
			text: subscribe_error_plan_no_price()
		}, { status: 500 });
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, "addonIds", "One of the selected add-ons no longer exists.");
		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			phone: form.data.phone || "",
			city: form.data.city || "London",
			postcode: form.data.postcode
		};
		console.log(plan.kind);
		if (plan.kind === "order") {
			let checkoutUrl;
			try {
				checkoutUrl = await oneTimeCheckout({
					plan,
					addons: chosenAddons,
					quantity: form.data.quantity ?? 1,
					buyerEmail: user.email,
					buyerName: user.name ?? null,
					recipientName: user.name ?? "Me",
					recipientAddress,
					giftMessage: null,
					durationMonths: 1,
					successUrl: `${url.origin}/account?welcome=1`,
					cancelUrl: `${url.origin}/subscribe`
				});
			} catch (e) {
				console.error("one-off checkout failed", e);
				return message(form, {
					type: "error",
					text: subscribe_error_checkout_failed()
				}, { status: 500 });
			}
			redirect(303, checkoutUrl);
		}
		let subscriberId = "";
		let addressId = "";
		let subscriptionId = "";
		let stripeCustomerId = null;
		try {
			await db.transaction(async (tx) => {
				const sub = await ensureSubscriber(tx, user, form.data.marketingOptIn);
				subscriberId = sub.id;
				stripeCustomerId = sub.stripeCustomerId;
				addressId = crypto.randomUUID();
				await tx.insert(addresses).values({
					id: addressId,
					phone: form.data.phone,
					subscriberId,
					label: form.data.addressLabel || null,
					...recipientAddress,
					isPrimary: false
				});
				subscriptionId = crypto.randomUUID();
				await tx.insert(subscriptions).values({
					id: subscriptionId,
					subscriberId,
					planId: plan.id,
					addressId,
					status: "pending",
					quantity: form.data.quantity ?? 1,
					cancelAtPeriodEnd: false
				});
			});
		} catch (e) {
			console.error("subscribe (db) failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_subscription_start_failed()
			}, { status: 500 });
		}
		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: "subscription",
				customer: stripeCustomerId ?? void 0,
				customer_email: stripeCustomerId ? void 0 : user.email,
				line_items: [{
					price: plan.stripePriceId,
					quantity: form.data.quantity ?? 1
				}, ...addonLineItems(chosenAddons)],
				success_url: `${url.origin}/account?welcome=1`,
				cancel_url: `${url.origin}/subscribe`,
				metadata: {
					subscriberId,
					subscriptionId,
					addressId,
					addonIds: chosenAddons.map((a) => a.id).join(","),
					quantity: String(form.data.quantity ?? 1)
				},
				subscription_data: { metadata: { subscriptionId } }
			});
			console.log("Metadata:", session.metadata);
		} catch (e) {
			console.error("stripe checkout create failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_checkout_failed()
			}, { status: 500 });
		}
		redirect(303, session.url);
	},
	gift: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod(checkoutSchema));
		console.log("gift");
		if (!form.valid) return fail(400, { form });
		if (form.data.recipient !== "gift") return message(form, {
			type: "error",
			text: subscribe_error_wrong_flow_gift()
		}, { status: 400 });
		const [plan] = await db.select().from(plans).where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (!plan || plan.kind !== "gift") return setError(form, "plan", "Choose a gift pack.");
		if (!plan.stripePriceId) return message(form, {
			type: "error",
			text: subscribe_error_gift_no_price()
		}, { status: 500 });
		const buyerEmail = form.data.buyerEmail ?? locals.user?.email;
		if (!buyerEmail) return setError(form, "buyerEmail", "Enter your email so we can send the confirmation.");
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, "addonIds", "One of the selected add-ons no longer exists.");
		let checkoutUrl;
		try {
			checkoutUrl = await oneTimeCheckout({
				plan,
				addons: chosenAddons,
				buyerEmail,
				buyerName: form.data.buyerName || locals.user?.name || null,
				recipientName: form.data.recipientName,
				recipientAddress: {
					line1: form.data.line1,
					line2: form.data.line2 || null,
					city: form.data.city || "London",
					postcode: form.data.postcode
				},
				giftMessage: form.data.giftMessage || null,
				durationMonths: form.data.durationMonths,
				successUrl: `${url.origin}/?checkout=gift-success`,
				cancelUrl: `${url.origin}/subscribe`
			});
		} catch (e) {
			console.error("gift checkout failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_checkout_failed()
			}, { status: 500 });
		}
		redirect(303, checkoutUrl);
	},
	updateSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod(updateSubscriptionSchema));
		if (!form.valid) return fail(400, { form });
		const user = locals.user;
		if (!user) return fail(401, { form });
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, "addonIds", "One of the selected add-ons no longer exists.");
		try {
			await db.transaction(async (tx) => {
				const [owned] = await tx.select({ id: subscriptions.id }).from(subscriptions).innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id)).where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
				if (!owned) throw new Error("not found or not owned");
				await tx.delete(subscriberAddons).where(eq(subscriberAddons.subscriptionId, owned.id));
				if (chosenAddons.length) await tx.insert(subscriberAddons).values(chosenAddons.map((a) => ({
					subscriptionId: owned.id,
					addonId: a.id,
					quantity: 1
				})));
			});
		} catch (e) {
			console.error("updateSubscription failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_update_failed()
			}, { status: 400 });
		}
		return message(form, {
			type: "success",
			text: subscribe_success_updated()
		});
	},
	cancelSubscription: async ({ request, locals }) => {
		const form = await superValidate(request, zod(cancelSubscriptionSchema));
		if (!form.valid) return fail(400, { form });
		const user = locals.user;
		if (!user) return fail(401, { form });
		const [owned] = await db.select({
			id: subscriptions.id,
			stripeSubscriptionId: subscriptions.stripeSubscriptionId
		}).from(subscriptions).innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id)).where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
		if (!owned) return message(form, {
			type: "error",
			text: subscribe_error_not_found()
		}, { status: 404 });
		try {
			if (owned.stripeSubscriptionId) {
				await stripe.subscriptions.update(owned.stripeSubscriptionId, { cancel_at_period_end: true });
				await db.update(subscriptions).set({ cancelAtPeriodEnd: true }).where(eq(subscriptions.id, owned.id));
			} else await db.update(subscriptions).set({ status: "cancelled" }).where(eq(subscriptions.id, owned.id));
		} catch (e) {
			console.error("cancelSubscription failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_cancel_failed()
			}, { status: 400 });
		}
		return message(form, {
			type: "success",
			text: subscribe_success_cancelled()
		});
	},
	guestOrder: async ({ request, url }) => {
		console.log("guest");
		const form = await superValidate(request, zod(checkoutSchema));
		console.log(form.data);
		if (!form.valid) return fail(400, { form });
		const { rows: chosenAddons, unknown } = await resolveAddons(form.data.addonIds);
		if (unknown) return setError(form, "addonIds", "One of the selected add-ons no longer exists.");
		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			phone: form.data.phone || "",
			city: form.data.city || "London",
			postcode: form.data.postcode
		};
		let addressId = "";
		addressId = crypto.randomUUID();
		await db.insert(addresses).values({
			id: addressId,
			label: form.data.addressLabel || null,
			...recipientAddress,
			isPrimary: false
		});
		const [plan] = await db.select().from(plans).where(and(eq(plans.slug, form.data.plan), eq(plans.active, true)));
		if (plan.kind !== "order") return message(form, {
			type: "error",
			text: subscribe_error_guest_order_not_allowed()
		});
		const { recipientName } = form.data;
		let checkoutUrl;
		try {
			checkoutUrl = await guestCheckout({
				plan,
				quantity: form.data.quantity,
				addons: chosenAddons,
				recipientName,
				addressId,
				recipientAddress: {
					line1: form.data.line1,
					line2: form.data.line2 || null,
					phone: form.data.phone,
					city: form.data.city || "London",
					postcode: form.data.postcode
				},
				successUrl: `${url.origin}/?checkout=gift-success`,
				cancelUrl: `${url.origin}/subscribe`
			});
		} catch (e) {
			console.error("one-off checkout failed", e);
			return message(form, {
				type: "error",
				text: subscribe_error_checkout_failed()
			}, { status: 500 });
		}
		redirect(303, checkoutUrl);
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Vcmkbt0n.js.map
