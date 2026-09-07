import { d as sendSubscriptionCancelled, n as notifyAdminSubscriptionCancelled } from '../../../../chunks/email.js-CH8piiG9.js';
import { m as db, p as subscribers, q as plans, t as subscriptions, j as eq, k as and, i as inArray, z as addresses } from '../../../../chunks/db.js-C_Hkpclr.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CbeSlHLA.js';
import { i as instantDate, a as money } from '../../../../chunks/format.js-JAqogrJR.js';
import { s as stripe } from '../../../../chunks/stripe.js-DclyrhzZ.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CEknL8Oc.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-Ba6oy4l9.js';
import { z as zod } from '../../../../chunks/adapters.js-k3iEm0ov.js';
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
var load = async ({ locals, url }) => {
	const user = locals.user;
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
			price: money(r.pricePence),
			status: r.status,
			cancelAtPeriodEnd: r.cancelAtPeriodEnd,
			periodEndLabel: r.currentPeriodEnd ? instantDate(r.currentPeriodEnd) : null,
			addressLabel: addr?.label ?? addr?.line1 ?? null
		};
	});
	const form = await superValidate(zod(cancelSubscriptionSchema));
	const preselect = url.searchParams.get("subscriptionId") ?? url.searchParams.get("id");
	const cancellable = plansList.filter((p) => !p.cancelAtPeriodEnd);
	if (preselect && cancellable.some((p) => p.id === preselect)) form.data.subscriptionId = preselect;
	else if (cancellable.length === 1) form.data.subscriptionId = cancellable[0].id;
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
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		status: subscriptions.status,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		pendingPlanId: subscriptions.pendingPlanId,
		planName: plans.name,
		planStripePriceId: plans.stripePriceId,
		customerName: subscribers.fullName,
		customerEmail: subscribers.email
	}).from(subscriptions).innerJoin(subscribers, eq(subscriptions.subscriberId, subscribers.id)).innerJoin(plans, eq(subscriptions.planId, plans.id)).where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscribers.userId, user.id)));
	if (!owned) return message(form, {
		type: "error",
		text: "Subscription not found."
	}, { status: 404 });
	if (owned.status === "cancelled") return message(form, {
		type: "error",
		text: "That plan is already cancelled."
	}, { status: 400 });
	if (owned.cancelAtPeriodEnd) return message(form, {
		type: "error",
		text: "That plan is already scheduled to cancel."
	}, { status: 400 });
	try {
		if (owned.stripeSubscriptionId) {
			let revert = {};
			if (owned.pendingPlanId && owned.planStripePriceId) {
				const item = (await stripe.subscriptions.retrieve(owned.stripeSubscriptionId)).items.data[0];
				if (item && item.price.id !== owned.planStripePriceId) revert = {
					items: [{
						id: item.id,
						price: owned.planStripePriceId,
						quantity: item.quantity
					}],
					proration_behavior: "none",
					billing_cycle_anchor: "unchanged"
				};
			}
			await stripe.subscriptions.update(owned.stripeSubscriptionId, {
				cancel_at_period_end: true,
				metadata: {
					cancel_reason: form.data.reason ?? "",
					cancel_feedback: form.data.feedback ?? ""
				},
				...revert
			});
			await db.update(subscriptions).set({
				cancelAtPeriodEnd: true,
				pendingPlanId: null,
				pendingPlanAt: null
			}).where(eq(subscriptions.id, owned.id));
		} else await db.update(subscriptions).set({
			status: "cancelled",
			pendingPlanId: null,
			pendingPlanAt: null
		}).where(eq(subscriptions.id, owned.id));
	} catch (e) {
		console.error("cancel subscription failed", e);
		return message(form, {
			type: "error",
			text: "Could not cancel this plan. Please try again."
		}, { status: 400 });
	}
	try {
		const endsLabel = owned.stripeSubscriptionId && owned.currentPeriodEnd ? instantDate(owned.currentPeriodEnd) : null;
		await sendSubscriptionCancelled(owned.customerEmail, {
			name: owned.customerName ?? "there",
			planName: owned.planName,
			endsLabel
		});
		await notifyAdminSubscriptionCancelled({
			name: owned.customerName ?? "—",
			email: owned.customerEmail,
			planName: owned.planName,
			endsLabel,
			reason: form.data.reason ?? null,
			feedback: form.data.feedback ?? null
		});
	} catch (e) {
		console.error("cancellation emails failed", e);
	}
	redirect(303, "/account?cancelled=1");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-F9oU2zZK.js.map
