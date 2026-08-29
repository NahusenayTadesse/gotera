import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, asc, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	deliveries,
	subscribers,
	subscriptions,
	plans,
	addresses,
	guestOrders,
	giftOrders
} from '$lib/server/db/schema';
import { contentCrud } from '$lib/server/crud';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { deliverySchema } from './schema';

const crud = contentCrud({
	table: deliveries,
	label: 'Delivery',
	addSchema: deliverySchema,
	editSchema: deliverySchema
});

type RecipientAddress = { line1: string; line2?: string | null; city: string; postcode: string };

export const load: PageServerLoad = async () => {
	const [form, bulkEmailForm, subscriptionRows, guestRows, giftRows] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		superValidate(zod4(bulkEmailSchema)),
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
			.orderBy(asc(deliveries.scheduledDate)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt))
	]);

	// Guest and one-time orders don't run through the subscription billing cycle that
	// generates `deliveries` rows, so they never showed up here — admins had to check
	// three separate pages to see everything that needed shipping. Fold them in as
	// read-only-shaped rows (same field names as a subscription delivery) so the table
	// and its columns don't need to branch on shape, only on `type`.
	const subscriptionDeliveries = subscriptionRows.map((r) => ({ ...r, type: 'subscription' as const }));

	const guestDeliveries = guestRows.map((r) => {
		const address = parseJsonColumn<RecipientAddress>(r.recipientAddress as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id: r.id,
			type: 'guest' as const,
			scheduledDate: r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: 'Guest order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive
		};
	});

	const giftDeliveries = giftRows.map((r) => {
		const address = parseJsonColumn<RecipientAddress>(r.recipientAddress as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id: r.id,
			type: 'one-time' as const,
			scheduledDate: r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: 'One-time order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive
		};
	});

	const rows = [...subscriptionDeliveries, ...guestDeliveries, ...giftDeliveries].sort(
		(a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
	);

	return { form, bulkEmailForm, rows };
};

// Deliveries are generated from a subscription's billing cycle; admins only edit/delete existing ones.
export const actions: Actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete,
	sendBulkEmail: sendBulkEmailAction,

	// Guest and one-time orders live in their own tables (edited on their own dashboard
	// pages), but showing up in this merged list is what surfaced them for deletion here.
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const type = formData.get('type');
		if (typeof id !== 'string' || (type !== 'guest' && type !== 'one-time')) {
			return fail(400, { error: 'Invalid request' });
		}

		const table = type === 'guest' ? guestOrders : giftOrders;
		await db.delete(table).where(eq(table.id, id));
		return { success: true };
	}
};
