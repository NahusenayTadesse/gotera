import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, sql, desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscribers, subscriptions } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { subscriberSchema } from './schema';

const crud = contentCrud({
	table: subscribers,
	label: 'Customer',
	addSchema: subscriberSchema,
	editSchema: subscriberSchema
});

export const load: PageServerLoad = async () => {
	const [form, rows] = await Promise.all([
		superValidate(zod4(subscriberSchema)),
		db
			.select({
				id: subscribers.id,
				email: subscribers.email,
				fullName: subscribers.fullName,
				phone: subscribers.phone,
				marketingOptIn: subscribers.marketingOptIn,
				isActive: subscribers.isActive,
				createdAt: subscribers.createdAt,
				subscriptionCount: sql<number>`COUNT(${subscriptions.id})`
			})
			.from(subscribers)
			.leftJoin(subscriptions, eq(subscriptions.subscriberId, subscribers.id))
			.groupBy(subscribers.id)
			.orderBy(desc(subscribers.createdAt))
	]);

	return { form, rows };
};

export const actions: Actions = crud.actions;
