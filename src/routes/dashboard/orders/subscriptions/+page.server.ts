import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscriptions, subscribers, plans } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { subscriptionSchema } from './schema';

const crud = contentCrud({
	table: subscriptions,
	label: 'Subscription',
	addSchema: subscriptionSchema,
	editSchema: subscriptionSchema
});

export const load: PageServerLoad = async () => {
	const [form, rows, subscriberOptions, planOptions] = await Promise.all([
		superValidate(zod4(subscriptionSchema)),
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
		db.select({ value: plans.id, name: plans.name }).from(plans)
	]);

	return { form, rows, subscriberOptions, planOptions };
};

export const actions: Actions = crud.actions;
