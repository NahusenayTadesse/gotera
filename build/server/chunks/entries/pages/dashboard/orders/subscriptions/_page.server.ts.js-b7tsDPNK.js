import { m as db, x as addons, w as subscriberAddons, j as eq, t as subscriptions, k as and, q as plans, p as subscribers, d as desc, a as asc } from '../../../../../chunks/db.js-BXYNtFGm.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/client.js-CWf6uOE8.js';
import { s as superValidate } from '../../../../../chunks/client2.js-ZnyZ4fKl.js';
import { z as zod } from '../../../../../chunks/adapters.js-QNI96UbV.js';
import { c as contentCrud } from '../../../../../chunks/crud.js-BEUarGst.js';
import { b as bulkEmailSchema } from '../../../../../chunks/bulkEmail.js-BZDoWPwu.js';
import { s as sendBulkEmailAction } from '../../../../../chunks/bulkEmail2.js-YSE72iIJ.js';
import { s as subscriptionSchema } from '../../../../../chunks/schema10.js-CEJzZj5c.js';
import { C as fail } from '../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/orders/subscriptions/+page.server.ts
var crud = contentCrud({
	table: subscriptions,
	label: "Subscription",
	addSchema: subscriptionSchema,
	editSchema: subscriptionSchema
});
var load = async () => {
	const [form, bulkEmailForm, subscriptionRows, subscriberOptions, planOptions, recurringAddonRows, addonCatalogue] = await Promise.all([
		superValidate(zod(subscriptionSchema)),
		superValidate(zod(bulkEmailSchema)),
		db.select({
			id: subscriptions.id,
			subscriberId: subscriptions.subscriberId,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planId: subscriptions.planId,
			planName: plans.name,
			status: subscriptions.status,
			quantity: subscriptions.quantity,
			cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
			currentPeriodEnd: subscriptions.currentPeriodEnd,
			isActive: subscriptions.isActive,
			createdAt: subscriptions.createdAt
		}).from(subscriptions).leftJoin(subscribers, eq(subscribers.id, subscriptions.subscriberId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).orderBy(desc(subscriptions.createdAt)),
		db.select({
			value: subscribers.id,
			name: subscribers.email
		}).from(subscribers),
		db.select({
			value: plans.id,
			name: plans.name
		}).from(plans),
		db.select({
			subscriptionId: subscriberAddons.subscriptionId,
			name: addons.name,
			quantity: subscriberAddons.quantity
		}).from(subscriberAddons).innerJoin(addons, eq(addons.id, subscriberAddons.addonId)),
		db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder))
	]);
	const addonsBySubscription = /* @__PURE__ */ new Map();
	for (const a of recurringAddonRows) {
		const list = addonsBySubscription.get(a.subscriptionId) ?? [];
		list.push({
			name: a.name,
			quantity: a.quantity
		});
		addonsBySubscription.set(a.subscriptionId, list);
	}
	return {
		form,
		bulkEmailForm,
		rows: subscriptionRows.map((r) => ({
			...r,
			addons: addonsBySubscription.get(r.id) ?? []
		})),
		subscriberOptions,
		planOptions,
		addonCatalogue
	};
};
var actions = {
	...crud.actions,
	sendBulkEmail: sendBulkEmailAction,
	addSubscriptionAddon: async ({ request }) => {
		const formData = await request.formData();
		const subscriptionId = formData.get("subscriptionId");
		const addonId = formData.get("addonId");
		const quantity = Number(formData.get("quantity") ?? 1);
		if (typeof subscriptionId !== "string" || !subscriptionId || typeof addonId !== "string" || !addonId || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return fail(400, { error: "Invalid request" });
		const [sub] = await db.select({ subscriberId: subscriptions.subscriberId }).from(subscriptions).where(eq(subscriptions.id, subscriptionId));
		if (!sub) return fail(400, { error: "Subscription not found" });
		const [existing] = await db.select().from(subscriberAddons).where(and(eq(subscriberAddons.subscriptionId, subscriptionId), eq(subscriberAddons.addonId, addonId)));
		if (existing) await db.update(subscriberAddons).set({ quantity: existing.quantity + quantity }).where(eq(subscriberAddons.id, existing.id));
		else await db.insert(subscriberAddons).values({
			subscriberId: sub.subscriberId,
			subscriptionId,
			addonId,
			quantity
		});
		return { success: true };
	},
	removeSubscriptionAddon: async ({ request }) => {
		const formData = await request.formData();
		const subscriptionId = formData.get("subscriptionId");
		const name = formData.get("name");
		if (typeof subscriptionId !== "string" || !subscriptionId || typeof name !== "string" || !name) return fail(400, { error: "Invalid request" });
		const match = (await db.select({
			id: subscriberAddons.id,
			name: addons.name
		}).from(subscriberAddons).innerJoin(addons, eq(addons.id, subscriberAddons.addonId)).where(eq(subscriberAddons.subscriptionId, subscriptionId))).find((r) => r.name === name);
		if (!match) return fail(400, { error: "Add-on not found on this subscription" });
		await db.delete(subscriberAddons).where(eq(subscriberAddons.id, match.id));
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-b7tsDPNK.js.map
