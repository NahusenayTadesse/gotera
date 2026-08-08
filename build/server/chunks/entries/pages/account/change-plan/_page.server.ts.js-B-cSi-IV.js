import { m as db, j as eq, p as subscribers, k as and, y as subscriptions, z as addresses, q as plans, i as inArray } from '../../../../chunks/db.js-BkD50_-0.js';
import { c as cancelSchema } from '../../../../chunks/schema.js-Cw7Bh0q_.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-7a-rpZlk.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js--SBYKgBt.js';
import { z as zod } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { B as redirect, C as fail } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/account/change-plan/+page.server.ts
function poundsFromPence(pence) {
	return pence / 100;
}
function formatPeriodEnd(value) {
	if (!value) return null;
	return new Date(value).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
var load = async ({ locals }) => {
	if (!locals.user) throw redirect(302, "/login");
	const subscriber = await db.query.subscribers.findFirst({ where: eq(subscribers.userId, locals.user.id) });
	if (!subscriber) throw redirect(302, "/account");
	const plansList = (await db.select({
		id: subscriptions.id,
		quantity: subscriptions.quantity,
		cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
		currentPeriodEnd: subscriptions.currentPeriodEnd,
		planName: plans.name,
		pricePence: plans.pricePence,
		freqLabel: plans.freqLabel,
		addressLabel: addresses.label,
		addressLine1: addresses.line1
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, subscriptions.addressId)).where(and(eq(subscriptions.subscriberId, subscriber.id), inArray(subscriptions.status, [
		"pending",
		"active",
		"paused"
	])))).map((row) => {
		const quantity = row.quantity ?? 1;
		return {
			id: row.id,
			planName: row.planName,
			quantity,
			unitPrice: poundsFromPence(row.pricePence),
			price: poundsFromPence(row.pricePence * quantity),
			freq: row.freqLabel ?? "",
			addressLabel: row.addressLabel ?? row.addressLine1 ?? null,
			cancelAtPeriodEnd: row.cancelAtPeriodEnd,
			periodEndLabel: formatPeriodEnd(row.currentPeriodEnd)
		};
	});
	return {
		form: await superValidate(zod(cancelSchema)),
		plansList
	};
};
var actions = { default: async ({ request, locals }) => {
	if (!locals.user) throw redirect(302, "/login");
	const form = await superValidate(request, zod(cancelSchema));
	if (!form.valid) return fail(400, { form });
	const subscriber = await db.query.subscribers.findFirst({ where: eq(subscribers.userId, locals.user.id) });
	if (!subscriber) return message(form, {
		type: "error",
		text: "We could not find your account."
	}, { status: 404 });
	const subscription = await db.query.subscriptions.findFirst({ where: and(eq(subscriptions.id, form.data.subscriptionId), eq(subscriptions.subscriberId, subscriber.id)) });
	if (!subscription) return message(form, {
		type: "error",
		text: "That plan could not be found on your account."
	}, { status: 404 });
	if (subscription.cancelAtPeriodEnd || subscription.status === "cancelled") return message(form, {
		type: "error",
		text: "That plan is already scheduled to cancel."
	});
	await db.update(subscriptions).set({
		cancelAtPeriodEnd: true,
		cancellationReason: form.data.reason ?? null,
		cancellationFeedback: form.data.feedback ?? null,
		cancelledAt: /* @__PURE__ */ new Date()
	}).where(eq(subscriptions.id, subscription.id));
	return message(form, {
		type: "success",
		text: "Your plan is scheduled to cancel at the end of the current period."
	});
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-B-cSi-IV.js.map
