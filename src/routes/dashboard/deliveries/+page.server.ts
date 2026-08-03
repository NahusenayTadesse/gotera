import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { deliveries, subscribers, subscriptions, plans, addresses } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { deliverySchema } from './schema';

const crud = contentCrud({
	table: deliveries,
	label: 'Delivery',
	addSchema: deliverySchema,
	editSchema: deliverySchema
});

export const load: PageServerLoad = async () => {
	const [form, rows] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		db
			.select({
				id: deliveries.id,
				scheduledDate: deliveries.scheduledDate,
				status: deliveries.status,
				subscriberEmail: subscribers.email,
				subscriberName: subscribers.fullName,
				planName: plans.name,
				addressLine1: addresses.line1,
				addressCity: addresses.city,
				addressPostcode: addresses.postcode,
				isActive: deliveries.isActive
			})
			.from(deliveries)
			.leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
			.leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.leftJoin(addresses, eq(addresses.id, deliveries.addressId))
			.orderBy(asc(deliveries.scheduledDate))
	]);

	return { form, rows };
};

// Deliveries are generated from a subscription's billing cycle; admins only edit/delete existing ones.
export const actions: Actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete
};
