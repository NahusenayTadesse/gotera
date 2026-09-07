import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, desc, and, asc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { subscriptions, subscribers, plans, subscriberAddons, addons as addonsTable } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { subscriptionSchema } from './schema';

const crud = contentCrud({
	table: subscriptions,
	label: 'Subscription',
	addSchema: subscriptionSchema,
	editSchema: subscriptionSchema
});

export const load: PageServerLoad = async () => {
	const [form, bulkEmailForm, subscriptionRows, subscriberOptions, planOptions, recurringAddonRows, addonCatalogue] =
		await Promise.all([
		superValidate(zod4(subscriptionSchema)),
		superValidate(zod4(bulkEmailSchema)),
		db
			.select({
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
			})
			.from(subscriptions)
			.leftJoin(subscribers, eq(subscribers.id, subscriptions.subscriberId))
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.orderBy(desc(subscriptions.createdAt)),
		db.select({ value: subscribers.id, name: subscribers.email }).from(subscribers),
		db.select({ value: plans.id, name: plans.name }).from(plans),
		db
			.select({
				subscriptionId: subscriberAddons.subscriptionId,
				name: addonsTable.name,
				quantity: subscriberAddons.quantity
			})
			.from(subscriberAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, subscriberAddons.addonId)),
		db.select().from(addonsTable).where(eq(addonsTable.isActive, true)).orderBy(asc(addonsTable.sortOrder))
	]);

	const addonsBySubscription = new Map<string, { name: string; quantity: number }[]>();
	for (const a of recurringAddonRows) {
		const list = addonsBySubscription.get(a.subscriptionId) ?? [];
		list.push({ name: a.name, quantity: a.quantity });
		addonsBySubscription.set(a.subscriptionId, list);
	}

	const rows = subscriptionRows.map((r) => ({ ...r, addons: addonsBySubscription.get(r.id) ?? [] }));

	return { form, bulkEmailForm, rows, subscriberOptions, planOptions, addonCatalogue };
};

export const actions: Actions = {
	...crud.actions,
	sendBulkEmail: sendBulkEmailAction,

	// Admin equivalent of the customer's own "change add-ons" on /subscribe — adds one
	// recurring add-on (or bumps its quantity) so it rides along on every future delivery.
	addSubscriptionAddon: async ({ request }) => {
		const formData = await request.formData();
		const subscriptionId = formData.get('subscriptionId');
		const addonId = formData.get('addonId');
		const quantity = Number(formData.get('quantity') ?? 1);
		if (
			typeof subscriptionId !== 'string' ||
			!subscriptionId ||
			typeof addonId !== 'string' ||
			!addonId ||
			!Number.isInteger(quantity) ||
			quantity < 1 ||
			quantity > 20
		) {
			return fail(400, { error: 'Invalid request' });
		}

		const [sub] = await db
			.select({ subscriberId: subscriptions.subscriberId })
			.from(subscriptions)
			.where(eq(subscriptions.id, subscriptionId));
		if (!sub) return fail(400, { error: 'Subscription not found' });

		const [existing] = await db
			.select()
			.from(subscriberAddons)
			.where(and(eq(subscriberAddons.subscriptionId, subscriptionId), eq(subscriberAddons.addonId, addonId)));

		if (existing) {
			await db
				.update(subscriberAddons)
				.set({ quantity: existing.quantity + quantity })
				.where(eq(subscriberAddons.id, existing.id));
		} else {
			await db.insert(subscriberAddons).values({
				subscriberId: sub.subscriberId,
				subscriptionId,
				addonId,
				quantity
			});
		}

		return { success: true };
	},

	removeSubscriptionAddon: async ({ request }) => {
		const formData = await request.formData();
		const subscriptionId = formData.get('subscriptionId');
		const name = formData.get('name');
		if (typeof subscriptionId !== 'string' || !subscriptionId || typeof name !== 'string' || !name) {
			return fail(400, { error: 'Invalid request' });
		}

		const rows = await db
			.select({ id: subscriberAddons.id, name: addonsTable.name })
			.from(subscriberAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, subscriberAddons.addonId))
			.where(eq(subscriberAddons.subscriptionId, subscriptionId));
		const match = rows.find((r) => r.name === name);
		if (!match) return fail(400, { error: 'Add-on not found on this subscription' });

		await db.delete(subscriberAddons).where(eq(subscriberAddons.id, match.id));
		return { success: true };
	}
};
