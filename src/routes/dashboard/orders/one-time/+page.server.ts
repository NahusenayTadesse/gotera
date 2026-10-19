import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { desc } from 'drizzle-orm';
import { syncAfter } from '$lib/server/traceability';
import { db } from '$lib/server/db';
import { giftOrders } from '$lib/server/db/schema';
import { contentCrud, idSchema } from '$lib/server/crud';
import { deleteReleasingStock } from '$lib/server/stock';
import type { RequestEvent } from '@sveltejs/kit';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { orderSchema } from './schema';

type Address = { line1: string; line2?: string | null; city: string; postcode: string };

const crud = contentCrud({
	table: giftOrders,
	label: 'Order',
	addSchema: orderSchema,
	editSchema: orderSchema
});

export const load: PageServerLoad = async () => {
	const [form, bulkEmailForm, rawRows] = await Promise.all([
		superValidate(zod4(orderSchema)),
		superValidate(zod4(bulkEmailSchema)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt))
	]);

	const rows = rawRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn<Address>(r.recipientAddress as Address, {
			line1: '',
			city: '',
			postcode: ''
		})
	}));

	return { form, bulkEmailForm, rows };
};

// Orders are created by the checkout flow; admins only edit/delete existing ones.
export const actions: Actions = {
	edit: syncAfter('gift', crud.actions.edit),
	// Gives back the stock the order reserved for its delivery date.
	delete: async (event: RequestEvent) => {
		const form = await superValidate(event.request.clone(), zod4(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock('gift', form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction
};
