import { s as stripe } from '../../../../chunks/stripe.js-DclyrhzZ.js';
import { m as db, y as subscriptions, p as subscribers, j as eq, k as and, q as plans, i as inArray, z as addresses } from '../../../../chunks/db.js-BkD50_-0.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { C as fail, B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, D as literal, s as string, _ as _enum } from '../../../../chunks/access.js-HgBsL8za.js';

//#region src/lib/paraglide/messages/acctcancel_confirm_required.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctcancel_Confirm_RequiredInputs */
var en_acctcancel_confirm_required = () => {
	return `Please confirm you want to cancel this plan.`;
};
var am_acctcancel_confirm_required = () => {
	return `እባክዎ ይህን እቅድ መሰረዝ እንደሚፈልጉ ያረጋግጡ።`;
};
/**
* | output |
* | --- |
* | "Please confirm you want to cancel this plan." |
*
* @param {Acctcancel_Confirm_RequiredInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctcancel_confirm_required = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctcancel_confirm_required();
	return en_acctcancel_confirm_required();
});
//#endregion
//#region src/routes/account/cancel/schema.ts
var cancelSubscriptionSchema = object({
	subscriptionId: string().min(1),
	reason: _enum([
		"too_expensive",
		"too_much_food",
		"moving",
		"taking_a_break",
		"quality",
		"other"
	]).optional(),
	feedback: string().max(1e3).optional(),
	confirm: literal(true, { error: acctcancel_confirm_required() })
});
//#endregion
//#region src/routes/account/cancel/+page.server.ts
var dateFmt = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric"
});
var load = async ({ locals, url }) => {
	const user = locals.user;
	console.log("user", user);
	if (!user) redirect(302, "/login?redirectTo=/account/cancel");
	const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.userId, user.id));
	if (!subscriber) redirect(302, "/account");
	const rows = await db.select({
		id: subscriptions.id,
		status: subscriptions.status,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		addressId: subscriptions.addressId,
		planName: plans.name,
		planFreq: plans.freqLabel,
		pricePence: plans.pricePence
	}).from(subscriptions).innerJoin(plans, eq(subscriptions.planId, plans.id)).where(and(eq(subscriptions.subscriberId, subscriber.id), inArray(subscriptions.status, [
		"active",
		"paused",
		"pending"
	])));
	if (rows.length === 0) redirect(302, "/account");
	const addrIds = rows.map((r) => r.addressId).filter((x) => !!x);
	const addrRows = addrIds.length ? await db.select().from(addresses).where(inArray(addresses.id, addrIds)) : [];
	const addrMap = new Map(addrRows.map((a) => [a.id, a]));
	const plansList = rows.map((r) => {
		const addr = r.addressId ? addrMap.get(r.addressId) : void 0;
		return {
			id: r.id,
			planName: r.planName,
			freq: r.planFreq,
			price: r.pricePence / 100,
			status: r.status,
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			periodEndLabel: r.currentPeriodEnd ? dateFmt.format(new Date(r.currentPeriodEnd)) : null,
			addressLabel: addr?.label ?? addr?.line1 ?? null
		};
	});
	const form = await superValidate(zod(cancelSubscriptionSchema));
	const preselect = url.searchParams.get("id");
	if (preselect && plansList.some((p) => p.id === preselect)) form.data.subscriptionId = preselect;
	else if (plansList.length === 1) form.data.subscriptionId = plansList[0].id;
	return {
		form,
		plansList
	};
};
var actions = { default: async ({ request, locals }) => {
	const form = await superValidate(request, zod(cancelSubscriptionSchema));
	if (!form.valid) return fail(400, { form });
	const user = locals.user;
	if (!user) return fail(401, { form });
	const [owned] = await db.select({
		id: subscriptions.id,
		stripeSubscriptionId: subscriptions.stripeSubscriptionId,
		status: subscriptions.status
	}).from(subscriptions).innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id)).where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
	if (!owned) return message(form, {
		type: "error",
		text: "Subscription not found."
	}, { status: 404 });
	if (owned.status === "cancelled") return message(form, {
		type: "error",
		text: "That plan is already cancelled."
	}, { status: 400 });
	try {
		if (owned.stripeSubscriptionId) {
			await stripe.subscriptions.update(owned.stripeSubscriptionId, {
				cancel_at_period_end: true,
				metadata: {
					cancel_reason: form.data.reason ?? "",
					cancel_feedback: form.data.feedback ?? ""
				}
			});
			await db.update(subscriptions).set({ cancelAtPeriodEnd: true }).where(eq(subscriptions.id, owned.id));
		} else await db.update(subscriptions).set({ status: "cancelled" }).where(eq(subscriptions.id, owned.id));
	} catch (e) {
		console.error("cancel subscription failed", e);
		return message(form, {
			type: "error",
			text: "Could not cancel this plan. Please try again."
		}, { status: 400 });
	}
	redirect(303, "/account?cancelled=1");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-_WlE8aeX.js.map
