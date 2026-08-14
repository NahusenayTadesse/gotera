import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, asc, desc, inArray } from 'drizzle-orm';
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
import { sendDeliveryDelayed } from '$lib/server/email';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { deliverySchema, delayEmailSchema } from './schema';

const crud = contentCrud({
	table: deliveries,
	label: 'Delivery',
	addSchema: deliverySchema,
	editSchema: deliverySchema
});

/** Matches the webhook's delivery-date formatting, so wording stays consistent across emails. */
const deliveryFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

type RecipientAddress = { line1: string; line2?: string | null; city: string; postcode: string };

export const load: PageServerLoad = async () => {
	const [form, delayEmailForm, subscriptionRows, guestRows, giftRows] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		superValidate(zod4(delayEmailSchema)),
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

	return { form, delayEmailForm, rows };
};

// Deliveries are generated from a subscription's billing cycle; admins only edit/delete existing ones.
export const actions: Actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete,

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
	},

	sendDelayEmail: async ({ request }) => {
		const form = await superValidate(request, zod4(delayEmailSchema));
		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for errors' },
				{ status: 400 }
			);
		}

		// Selected ids can belong to any of the three tables the merged table pulls from —
		// each table only matches its own ids, so querying all three and concatenating is safe.
		const [subscriptionRows, guestRows, giftRows] = await Promise.all([
			db
				.select({
					id: deliveries.id,
					scheduledDate: deliveries.scheduledDate,
					subscriberEmail: subscribers.email,
					subscriberName: subscribers.fullName
				})
				.from(deliveries)
				.leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
				.where(inArray(deliveries.id, form.data.deliveryIds)),
			db
				.select({
					id: guestOrders.id,
					scheduledDate: guestOrders.createdAt,
					subscriberEmail: guestOrders.buyerEmail,
					subscriberName: guestOrders.buyerName
				})
				.from(guestOrders)
				.where(inArray(guestOrders.id, form.data.deliveryIds)),
			db
				.select({
					id: giftOrders.id,
					scheduledDate: giftOrders.createdAt,
					subscriberEmail: giftOrders.buyerEmail,
					subscriberName: giftOrders.buyerName
				})
				.from(giftOrders)
				.where(inArray(giftOrders.id, form.data.deliveryIds))
		]);

		const rows = [...subscriptionRows, ...guestRows, ...giftRows];
		const recipients = rows.filter((r) => r.subscriberEmail);

		try {
			await Promise.all(
				recipients.map((r) =>
					sendDeliveryDelayed(r.subscriberEmail as string, {
						name: r.subscriberName || 'there',
						deliveryLabel: deliveryFmt.format(new Date(r.scheduledDate)),
						message: form.data.message
					})
				)
			);
		} catch (err) {
			console.error('Failed to send delay emails:', err);
			return message(
				form,
				{ type: 'error', text: 'Some emails could not be sent. Please try again.' },
				{ status: 500 }
			);
		}

		return message(form, {
			type: 'success',
			text: `Delay email sent to ${recipients.length} customer${recipients.length === 1 ? '' : 's'}`
		});
	}
};
