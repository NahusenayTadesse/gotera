import { e as sendPlanChanged, f as notifyAdminPlanChanged } from '../../../../chunks/email.js-CH8piiG9.js';
import { m as db, p as subscribers, j as eq, q as plans, t as subscriptions, k as and, A as alias, z as addresses, i as inArray, a as asc } from '../../../../chunks/db.js-C_Hkpclr.js';
import { i as instantDate, a as money } from '../../../../chunks/format.js-JAqogrJR.js';
import { s as stripe } from '../../../../chunks/stripe.js-DclyrhzZ.js';
import { c as changePlanSchema } from '../../../../chunks/schema.js-C9spCgug.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-CEknL8Oc.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-Ba6oy4l9.js';
import { z as zod } from '../../../../chunks/adapters.js-k3iEm0ov.js';
import { C as fail, B as redirect } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/change-plan/+page.server.ts
var load = async ({ locals, url }) => {
	if (!locals.user) redirect(302, "/login?redirectTo=/account/change-plan");
	const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.userId, locals.user.id));
	if (!subscriber) redirect(302, "/account");
	const pendingPlan = alias(plans, "pending_plan");
	const subscriptionsList = (await db.select({
		id: subscriptions.id,
		quantity: subscriptions.quantity,
		status: subscriptions.status,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		planId: subscriptions.planId,
		planName: plans.name,
		planKind: plans.kind,
		pricePence: plans.pricePence,
		freqLabel: plans.freqLabel,
		sortOrder: plans.sortOrder,
		addressLabel: addresses.label,
		addressLine1: addresses.line1,
		pendingPlanName: pendingPlan.name
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, subscriptions.addressId)).leftJoin(pendingPlan, eq(pendingPlan.id, subscriptions.pendingPlanId)).where(and(eq(subscriptions.subscriberId, subscriber.id), inArray(subscriptions.status, [
		"pending",
		"active",
		"paused"
	]))).orderBy(asc(plans.sortOrder))).map((row) => {
		const quantity = row.quantity ?? 1;
		return {
			id: row.id,
			planId: row.planId,
			planName: row.planName,
			quantity,
			unitPrice: money(row.pricePence),
			price: money(row.pricePence * quantity),
			freq: row.freqLabel ?? "",
			addressLabel: row.addressLabel ?? row.addressLine1 ?? null,
			cancelAtPeriodEnd: row.cancelAtPeriodEnd,
			pendingPlanName: row.pendingPlanName,
			periodEndLabel: row.currentPeriodEnd ? instantDate(row.currentPeriodEnd) : null
		};
	});
	const planOptions = (await db.select({
		id: plans.id,
		name: plans.name,
		subtitle: plans.subtitle,
		pricePence: plans.pricePence,
		packs: plans.packs,
		freqLabel: plans.freqLabel,
		featured: plans.featured
	}).from(plans).where(and(eq(plans.active, true), eq(plans.kind, "subscription"))).orderBy(asc(plans.sortOrder))).map((p) => ({
		id: p.id,
		name: p.name,
		subtitle: p.subtitle ?? "",
		packs: p.packs,
		price: money(p.pricePence),
		freq: p.freqLabel ?? "",
		featured: p.featured
	}));
	const form = await superValidate(zod(changePlanSchema));
	const requested = url.searchParams.get("subscriptionId") ?? url.searchParams.get("id");
	const changeable = subscriptionsList.filter((p) => !p.cancelAtPeriodEnd);
	if (requested && changeable.some((p) => p.id === requested)) form.data.subscriptionId = requested;
	else if (changeable.length === 1) form.data.subscriptionId = changeable[0].id;
	return {
		form,
		subscriptionsList,
		planOptions
	};
};
var actions = { default: async ({ request, locals }) => {
	const form = await superValidate(request, zod(changePlanSchema));
	if (!locals.user) return fail(401, { form });
	if (!form.valid) return fail(400, { form });
	const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.userId, locals.user.id));
	if (!subscriber) return message(form, {
		type: "error",
		text: "We could not find your account."
	}, { status: 404 });
	const [owned] = await db.select({
		id: subscriptions.id,
		planId: subscriptions.planId,
		status: subscriptions.status,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		stripeSubscriptionId: subscriptions.stripeSubscriptionId,
		pendingPlanId: subscriptions.pendingPlanId,
		pendingPlanAt: subscriptions.pendingPlanAt,
		planName: plans.name
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(and(eq(subscriptions.id, form.data.subscriptionId), eq(subscriptions.subscriberId, subscriber.id)));
	if (!owned) return message(form, {
		type: "error",
		text: "That plan could not be found on your account."
	}, { status: 404 });
	if (owned.status === "cancelled" || owned.cancelAtPeriodEnd) return message(form, {
		type: "error",
		text: "That plan is cancelling and can't be changed."
	});
	if (owned.planId === form.data.planId) return message(form, {
		type: "error",
		text: "That's already your current plan."
	});
	const [target] = await db.select({
		id: plans.id,
		name: plans.name,
		pricePence: plans.pricePence,
		stripePriceId: plans.stripePriceId
	}).from(plans).where(and(eq(plans.id, form.data.planId), eq(plans.active, true), eq(plans.kind, "subscription")));
	if (!target) return message(form, {
		type: "error",
		text: "That plan is not available."
	}, { status: 400 });
	const effectiveAt = owned.currentPeriodEnd ? new Date(owned.currentPeriodEnd) : /* @__PURE__ */ new Date();
	await db.update(subscriptions).set({
		pendingPlanId: target.id,
		pendingPlanAt: effectiveAt
	}).where(eq(subscriptions.id, owned.id));
	const rollbackPending = () => db.update(subscriptions).set({
		pendingPlanId: owned.pendingPlanId,
		pendingPlanAt: owned.pendingPlanAt
	}).where(eq(subscriptions.id, owned.id));
	if (owned.stripeSubscriptionId) {
		if (!target.stripePriceId) {
			console.error("plan change blocked: no stripePriceId on plan", target.id);
			await rollbackPending();
			return message(form, {
				type: "error",
				text: "That plan is not available right now. Please contact us."
			}, { status: 400 });
		}
		try {
			const item = (await stripe.subscriptions.retrieve(owned.stripeSubscriptionId)).items.data[0];
			if (!item) throw new Error(`no items on subscription ${owned.stripeSubscriptionId}`);
			await stripe.subscriptions.update(owned.stripeSubscriptionId, {
				items: [{
					id: item.id,
					price: target.stripePriceId,
					quantity: item.quantity
				}],
				proration_behavior: "none",
				billing_cycle_anchor: "unchanged"
			});
		} catch (e) {
			console.error("stripe plan change failed", e);
			await rollbackPending();
			return message(form, {
				type: "error",
				text: "We could not change your plan. Please try again."
			}, { status: 400 });
		}
	}
	try {
		const effectiveLabel = instantDate(effectiveAt);
		const toPlanPriceLabel = money(target.pricePence);
		await sendPlanChanged(subscriber.email, {
			name: subscriber.fullName ?? "there",
			fromPlanName: owned.planName,
			toPlanName: target.name,
			toPlanPriceLabel,
			effectiveLabel
		});
		await notifyAdminPlanChanged({
			name: subscriber.fullName ?? "—",
			email: subscriber.email,
			fromPlanName: owned.planName,
			toPlanName: target.name,
			toPlanPriceLabel,
			effectiveLabel
		});
	} catch (e) {
		console.error("plan change emails failed", e);
	}
	return message(form, {
		type: "success",
		text: `Switching to ${target.name} on ${instantDate(effectiveAt)}.`
	});
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-CXq_FYiI.js.map
