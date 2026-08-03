import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { planSchema } from './schema';

const crud = contentCrud({
	table: plans,
	label: 'Plan',
	addSchema: planSchema,
	editSchema: planSchema,
	listFields: ['bullets']
});

export const load: PageServerLoad = async () => {
	const [form, rawRows] = await Promise.all([
		superValidate(zod4(planSchema)),
		db.select().from(plans).orderBy(asc(plans.sortOrder))
	]);

	const rows = rawRows.map((p) => ({
		...p,
		bullets: parseJsonColumn<string[]>(p.bullets as string[], [])
	}));

	return { form, rows };
};

export const actions: Actions = crud.actions;
