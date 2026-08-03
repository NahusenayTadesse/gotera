import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addons } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
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

export const actions: Actions = crud.actions;
