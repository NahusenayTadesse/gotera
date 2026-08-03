import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { guestOrders } from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { guestOrderSchema } from './schema';

type Address = { line1: string; line2?: string | null; city: string; postcode: string };

const crud = contentCrud({
	table: guestOrders,
	label: 'Guest order',
	addSchema: guestOrderSchema,
	editSchema: guestOrderSchema
});

export const load: PageServerLoad = async () => {
	const [form, rawRows] = await Promise.all([
		superValidate(zod4(guestOrderSchema)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt))
	]);

	const rows = rawRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn<Address>(r.recipientAddress as Address, {
			line1: '',
			city: '',
			postcode: ''
		})
	}));

	return { form, rows };
};

// Orders are created by the guest checkout flow; admins only edit/delete existing ones.
export const actions: Actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete
};
