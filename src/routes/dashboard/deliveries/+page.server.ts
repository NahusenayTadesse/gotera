import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, eq, asc, desc } from 'drizzle-orm';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	deliveries,
	subscribers,
	subscriptions,
	plans,
	addresses,
	guestOrders,
	giftOrders,
	deliverySkipDates,
	deliveryAddons,
	subscriberAddons,
	addons as addonsTable
} from '$lib/server/db/schema';
import { contentCrud, idSchema } from '$lib/server/crud';
import { deleteReleasingStock, syncDeliveryStock } from '$lib/server/stock';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { deliverySchema } from './schema';
import { skipDateSchema, type AffectedRecipient, type SkipDateFormMessage } from './skipDateSchema';
import { isDeliveryDay, nextDeliveryDateAfter } from '$lib/server/deliverySchedule';
import { fullDate } from '$lib/format';
import { syncAfter, syncAllocations, traceSummaries, type ShipmentRef } from '$lib/server/traceability';

/** Id of the row a superforms CRUD action just saved, if the save was valid. */
function savedId(res: unknown): string | null {
	const form =
		(res as { form?: { valid?: boolean; data?: { id?: string } } })?.form ??
		(res as { data?: { form?: { valid?: boolean; data?: { id?: string } } } })?.data?.form;
	return form?.valid && form.data?.id ? form.data.id : null;
}

const crud = contentCrud({
	table: deliveries,
	label: 'Delivery',
	addSchema: deliverySchema,
	editSchema: deliverySchema
});

type RecipientAddress = { line1: string; line2?: string | null; city: string; postcode: string };

type AddonLine = { name: string; quantity: number; recurring: boolean };

export const load: PageServerLoad = async () => {
	const [
		form,
		bulkEmailForm,
		skipDateForm,
		skipDates,
		subscriptionRows,
		guestRows,
		giftRows,
		oneOffAddonRows,
		recurringAddonRows,
		addonCatalogue
	] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		superValidate(zod4(bulkEmailSchema)),
		superValidate(zod4(skipDateSchema)),
		db.select().from(deliverySkipDates).orderBy(desc(deliverySkipDates.date)),
		db
			.select({
				id: deliveries.id,
				subscriptionId: deliveries.subscriptionId,
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
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt)),
		// One-off add-ons (added for a single delivery — from the account page, or admin below).
		db
			.select({ deliveryId: deliveryAddons.deliveryId, name: addonsTable.name, quantity: deliveryAddons.quantity })
			.from(deliveryAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId)),
		// Recurring add-ons — riding along on every delivery for that subscription.
		db
			.select({
				subscriptionId: subscriberAddons.subscriptionId,
				name: addonsTable.name,
				quantity: subscriberAddons.quantity
			})
			.from(subscriberAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, subscriberAddons.addonId)),
		db.select().from(addonsTable).where(eq(addonsTable.isActive, true)).orderBy(asc(addonsTable.sortOrder))
	]);

	const oneOffByDelivery = new Map<string, AddonLine[]>();
	for (const a of oneOffAddonRows) {
		const list = oneOffByDelivery.get(a.deliveryId) ?? [];
		list.push({ name: a.name, quantity: a.quantity, recurring: false });
		oneOffByDelivery.set(a.deliveryId, list);
	}

	const recurringBySubscription = new Map<string, AddonLine[]>();
	for (const a of recurringAddonRows) {
		const list = recurringBySubscription.get(a.subscriptionId) ?? [];
		list.push({ name: a.name, quantity: a.quantity, recurring: true });
		recurringBySubscription.set(a.subscriptionId, list);
	}

	// Guest and one-time orders don't run through the subscription billing cycle that
	// generates `deliveries` rows, so they never showed up here — admins had to check
	// three separate pages to see everything that needed shipping. Fold them in as
	// read-only-shaped rows (same field names as a subscription delivery) so the table
	// and its columns don't need to branch on shape, only on `type`.
	const subscriptionDeliveries = subscriptionRows.map((r) => ({
		...r,
		type: 'subscription' as const,
		addons: [
			...(recurringBySubscription.get(r.subscriptionId) ?? []),
			...(oneOffByDelivery.get(r.id) ?? [])
		]
	}));

	const guestDeliveries = guestRows.map((r) => {
		const address = parseJsonColumn<RecipientAddress>(r.recipientAddress as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id: r.id,
			type: 'guest' as const,
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			// Quantity 0 = add-ons bought on their own from /addons, with no injera.
			planName: r.quantity === 0 ? 'Add-ons only' : 'Guest order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({ name: a.name, quantity: a.quantity, recurring: false }))
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
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: 'One-time order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({ name: a.name, quantity: a.quantity, recurring: false }))
		};
	});

	const merged = [...subscriptionDeliveries, ...guestDeliveries, ...giftDeliveries].sort(
		(a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
	);

	// Batch traceability per row. The table calls gift orders 'one-time'.
	const refOf = (r: (typeof merged)[number]): ShipmentRef => ({
		type: r.type === 'one-time' ? 'gift' : r.type,
		id: r.id
	});
	const traces = await traceSummaries(merged.map(refOf));
	const TRACE_LABEL = { traced: 'Traced', partial: 'Partly traced', missing: 'No batch', none: 'Not shipping' };
	const rows = merged.map((r) => {
		const ref = refOf(r);
		const t = traces.get(`${ref.type}:${ref.id}`) ?? { state: 'none' as const, batches: [] };
		return {
			...r,
			traceType: ref.type,
			trace: TRACE_LABEL[t.state],
			traceState: t.state,
			batches: t.batches
		};
	});

	return { form, bulkEmailForm, skipDateForm, skipDates, rows, addonCatalogue };
};

// Deliveries are generated from a subscription's billing cycle; admins only edit/delete existing ones.
export const actions: Actions = {
	// Re-syncs batches after a save: dispatching assigns them, skipping releases them.
	// Stock follows the same way: skipping/failing gives the units back, a new date moves them.
	edit: syncAfter('subscription', async (event: RequestEvent) => {
		const res = await crud.actions.edit(event);
		const id = savedId(res);
		if (id) {
			try {
				await syncDeliveryStock(id);
			} catch (err) {
				console.error('Stock sync after delivery edit failed:', err);
			}
		}
		return res;
	}),
	delete: async (event: RequestEvent) => {
		const form = await superValidate(event.request.clone(), zod4(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock('delivery', form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction,

	// Auto-assign (FEFO) batches for the selected rows.
	assignBatches: async ({ request, locals }) => {
		const f = await request.formData();
		const refs = f
			.getAll('refs')
			.map(String)
			.map((v) => {
				const [type, id] = v.split(':');
				return { type, id } as ShipmentRef;
			})
			.filter((r) => ['subscription', 'guest', 'gift', 'partner'].includes(r.type) && r.id)
			.slice(0, 1000);
		if (!refs.length) return fail(400, { error: 'Nothing selected' });
		return { sync: await syncAllocations({ refs }, locals.user?.id) };
	},

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
		await deleteReleasingStock(type === 'guest' ? 'guest' : 'gift', id, () =>
			db.delete(table).where(eq(table.id, id))
		);
		return { success: true };
	},

	// Mark a delivery day as skipped. Anything already booked for it moves to the next
	// open delivery day, and the admin gets back who was affected so they can
	// review/send a notice via the BulkEmailDialog opened on the client.
	addSkipDate: async ({ request }) => {
		const form = await superValidate(request, zod4(skipDateSchema));
		if (!form.valid) return fail(400, { form });

		if (!isDeliveryDay(form.data.date)) {
			return message<SkipDateFormMessage>(
				form,
				{ type: 'error', text: 'We only deliver on Saturdays, Sundays and Mondays — pick one of those.' },
				{ status: 400 }
			);
		}

		// Local midnight — matches how mysql2 hands `date` columns back, so this compares
		// equal to a delivery row's scheduledDate for the same calendar day.
		const [y, m, d] = form.data.date.split('-').map(Number);
		const skipDate = new Date(y, m - 1, d);

		const [existing] = await db
			.select({ id: deliverySkipDates.id })
			.from(deliverySkipDates)
			.where(eq(deliverySkipDates.date, skipDate));
		if (existing) {
			return message<SkipDateFormMessage>(
				form,
				{ type: 'error', text: 'That date is already marked as skipped.' },
				{ status: 400 }
			);
		}

		await db.insert(deliverySkipDates).values({
			date: skipDate,
			reason: form.data.reason || null
		});

		const affectedRows = await db
			.select({
				id: deliveries.id,
				email: subscribers.email,
				name: subscribers.fullName
			})
			.from(deliveries)
			.innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
			.where(and(eq(deliveries.status, 'scheduled'), eq(deliveries.scheduledDate, skipDate)));

		if (affectedRows.length === 0) {
			return message<SkipDateFormMessage>(form, {
				type: 'success',
				text: `${fullDate(skipDate)} marked as skipped. No deliveries were booked for it.`
			});
		}

		const newDate = await nextDeliveryDateAfter(skipDate);
		await db
			.update(deliveries)
			.set({ scheduledDate: newDate })
			.where(and(eq(deliveries.status, 'scheduled'), eq(deliveries.scheduledDate, skipDate)));

		// Move each delivery's stock with it, off the skipped day onto the new one.
		for (const r of affectedRows) {
			try {
				await syncDeliveryStock(r.id);
			} catch (err) {
				console.error('Stock move after skip date failed:', err);
			}
		}

		const seen = new Set<string>();
		const affected: AffectedRecipient[] = [];
		for (const r of affectedRows) {
			if (seen.has(r.email)) continue;
			seen.add(r.email);
			affected.push({ email: r.email, name: r.name ?? undefined });
		}

		return message<SkipDateFormMessage>(form, {
			type: 'success',
			text: `${fullDate(skipDate)} skipped — ${affectedRows.length} ${affectedRows.length === 1 ? 'delivery' : 'deliveries'} moved to ${fullDate(newDate)}.`,
			affected,
			skippedDateLabel: fullDate(skipDate),
			newDateLabel: fullDate(newDate)
		});
	},

	deleteSkipDate: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (typeof id !== 'string' || !id) return fail(400, { error: 'Invalid request' });

		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.id, id));
		return { success: true };
	},

	// Admin equivalent of the customer's own "add extras to this delivery" — a one-off,
	// no separate charge, same as deliveryAddons everywhere else in the app.
	addDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get('deliveryId');
		const addonId = formData.get('addonId');
		const quantity = Number(formData.get('quantity') ?? 1);
		if (
			typeof deliveryId !== 'string' ||
			!deliveryId ||
			typeof addonId !== 'string' ||
			!addonId ||
			!Number.isInteger(quantity) ||
			quantity < 1 ||
			quantity > 20
		) {
			return fail(400, { error: 'Invalid request' });
		}

		const [existing] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));

		if (existing) {
			await db
				.update(deliveryAddons)
				.set({ quantity: existing.quantity + quantity })
				.where(eq(deliveryAddons.id, existing.id));
		} else {
			await db.insert(deliveryAddons).values({ deliveryId, addonId, quantity });
		}

		return { success: true };
	},

	removeDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get('deliveryId');
		const name = formData.get('name');
		if (typeof deliveryId !== 'string' || !deliveryId || typeof name !== 'string' || !name) {
			return fail(400, { error: 'Invalid request' });
		}

		// Looked up by name rather than a row id — the table only shows the merged
		// name/quantity, not each `delivery_addons` row's own id.
		const rows = await db
			.select({ id: deliveryAddons.id, name: addonsTable.name })
			.from(deliveryAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId))
			.where(eq(deliveryAddons.deliveryId, deliveryId));
		const match = rows.find((r) => r.name === name);
		if (!match) return fail(400, { error: 'Add-on not found on this delivery' });

		await db.delete(deliveryAddons).where(eq(deliveryAddons.id, match.id));
		return { success: true };
	}
};
