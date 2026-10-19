import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';
import { error, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { addons, subscriberAddons, deliveryAddons } from '$lib/server/db/schema';
import { contentCrud, idSchema } from '$lib/server/crud';
import { saveUploadedFile } from '$lib/server/upload';
import { tagsOf } from '$lib/addons';
import { addonSchema } from './schema';
import { z } from 'zod/v4';

// Only `delete` is used from the generic CRUD. Add and edit are written out below because
// the image needs more than `fileFields` offers: an upload replaces it, an explicit
// "remove" clears it, and neither touches it otherwise.
const crud = contentCrud({
	table: addons,
	label: 'Add-on',
	addSchema: addonSchema,
	editSchema: addonSchema
});

type AddonInput = z.infer<typeof addonSchema>;

/** Validated form -> row values. Optional text left blank is stored as NULL, not ''. */
async function toRow(data: AddonInput) {
	const text = (v: string | undefined) => (v?.trim() ? v.trim() : null);
	const row: Partial<typeof addons.$inferInsert> = {
		name: data.name.trim(),
		description: text(data.description),
		category: data.category ?? null,
		availability: data.availability,
		pricePence: data.pricePence,
		unitLabel: text(data.unitLabel),
		badge: text(data.badge),
		tags: [...new Set(data.tags)],
		spiceLevel: data.spiceLevel,
		ingredients: text(data.ingredients),
		sortOrder: data.sortOrder,
		isFeatured: data.isFeatured,
		isActive: data.isActive
	};

	if (data.image && data.image.size > 0) row.imageUrl = await saveUploadedFile(data.image);
	else if (data.removeImage) row.imageUrl = null;

	return row;
}

const requireAdmin = (locals: App.Locals) => {
	if (!locals.user || locals.role !== 'Admin') error(403, 'Not Allowed');
};

async function save(event: RequestEvent, mode: 'add' | 'edit') {
	requireAdmin(event.locals);
	const form = await superValidate(event.request, zod4(addonSchema), { allowFiles: true });
	if (!form.valid) {
		return message(form, { type: 'error', text: 'Please check the form for errors' }, { status: 400 });
	}
	if (mode === 'edit' && !form.data.id) {
		return message(form, { type: 'error', text: 'Missing add-on id' }, { status: 400 });
	}

	let values;
	try {
		values = await toRow(form.data);
	} catch (e) {
		// saveUploadedFile throws on a wrong type or oversize file — that's the admin's to fix.
		const text = e instanceof Error ? e.message : 'Could not save the image';
		return message(form, { type: 'error', text }, { status: 400 });
	}

	try {
		if (mode === 'add') {
			await db.insert(addons).values({
				...(values as typeof addons.$inferInsert),
				createdBy: event.locals.user?.id
			});
		} else {
			await db
				.update(addons)
				.set({ ...values, updatedBy: event.locals.user?.id })
				.where(eq(addons.id, form.data.id!));
		}
	} catch (e) {
		console.error(`Failed to ${mode} add-on:`, e);
		return message(
			form,
			{ type: 'error', text: `Could not ${mode === 'add' ? 'add' : 'update'} add-on` },
			{ status: 500 }
		);
	}

	return message(form, { type: 'success', text: mode === 'add' ? 'Add-on added' : 'Add-on updated' });
}

export const load: PageServerLoad = async () => {
	const [form, rows] = await Promise.all([
		superValidate(zod4(addonSchema)),
		db.select().from(addons).orderBy(asc(addons.sortOrder))
	]);

	return { form, rows: rows.map((r) => ({ ...r, tags: tagsOf(r.tags) })) };
};

export const actions: Actions = {
	add: (event) => save(event, 'add'),
	edit: (event) => save(event, 'edit'),

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
