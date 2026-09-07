import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addons, subscriberAddons, deliveryAddons } from '$lib/server/db/schema';
import { contentCrud, idSchema } from '$lib/server/crud';
import { addonSchema } from './schema';

const crud = contentCrud({
	table: addons,
	label: 'Add-on',
	addSchema: addonSchema,
	editSchema: addonSchema
});

export const load: PageServerLoad = async () => {
	const [form, rows] = await Promise.all([
		superValidate(zod4(addonSchema)),
		db.select().from(addons).orderBy(asc(addons.sortOrder))
	]);

	return { form, rows };
};

export const actions: Actions = {
	...crud.actions,

	// `subscriber_addons.addon_id` and `delivery_addons.addon_id` both reference this row
	// with MySQL's default RESTRICT, so deleting an add-on that's in use throws an FK error
	// the generic CRUD delete can only report as "Could not delete Add-on". Check first so
	// the admin is told *why*, and is pointed at deactivating instead — which is what they
	// actually want, since hard-deleting would erase what past deliveries contained.
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod4(idSchema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Invalid request' }, { status: 400 });
		}

		const { id } = form.data;
		const [[onSubscription], [onDelivery]] = await Promise.all([
			db
				.select({ id: subscriberAddons.id })
				.from(subscriberAddons)
				.where(eq(subscriberAddons.addonId, id))
				.limit(1),
			db
				.select({ id: deliveryAddons.id })
				.from(deliveryAddons)
				.where(eq(deliveryAddons.addonId, id))
				.limit(1)
		]);

		if (onSubscription || onDelivery) {
			return message(
				form,
				{
					type: 'error',
					text: `This add-on is on an existing ${onSubscription ? 'subscription' : 'delivery'} and can't be deleted. Set it to inactive instead — it will stop being offered to new customers.`
				},
				{ status: 409 }
			);
		}

		return crud.actions.delete(event);
	}
};
