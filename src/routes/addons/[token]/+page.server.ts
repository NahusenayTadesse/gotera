import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq, asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { sellableWithInjera } from '$lib/server/addonCatalogue';
import {
	deliveries,
	subscribers,
	addons as addonsTable,
	deliveryAddons
} from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { fullDate } from '$lib/format';
import { cutoffDateFor, isPastCutoff } from '$lib/delivery';

const MAX_QTY = 20;

async function findDelivery(token: string) {
	const [row] = await db
		.select({
			id: deliveries.id,
			status: deliveries.status,
			scheduledDate: deliveries.scheduledDate,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName
		})
		.from(deliveries)
		.innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
		.where(eq(deliveries.addonAccessToken, token));
	return row;
}

export const load: PageServerLoad = async ({ params }) => {
	const delivery = await findDelivery(params.token);
	if (!delivery) error(404, 'This link is no longer valid.');

	const [catalogue, existingAddons] = await Promise.all([
		db
			.select()
			.from(addonsTable)
			.where(sellableWithInjera())
			.orderBy(asc(addonsTable.sortOrder)),
		db
			.select({ name: addonsTable.name, quantity: deliveryAddons.quantity })
			.from(deliveryAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId))
			.where(eq(deliveryAddons.deliveryId, delivery.id))
	]);

	return {
		name: delivery.subscriberName ?? 'there',
		deliveryLabel: fullDate(delivery.scheduledDate),
		// Same rule as /account: extras can only be added before the packing cut-off.
		open: delivery.status === 'scheduled' && !isPastCutoff(delivery.scheduledDate),
		cutoffLabel: fullDate(cutoffDateFor(delivery.scheduledDate)),
		catalogue,
		existingAddons,
		maxQty: MAX_QTY
	};
};

export const actions: Actions = {
	checkout: async ({ request, params, url }) => {
		const delivery = await findDelivery(params.token);
		if (!delivery) error(404, 'This link is no longer valid.');
		if (delivery.status !== 'scheduled' || isPastCutoff(delivery.scheduledDate)) {
			return fail(400, { error: 'This delivery can no longer be changed.' });
		}

		const formData = await request.formData();
		const catalogue = await db.select().from(addonsTable).where(sellableWithInjera());

		const items: { id: string; name: string; pricePence: number; quantity: number }[] = [];
		for (const addon of catalogue) {
			const raw = formData.get(`qty_${addon.id}`);
			if (raw === null) continue;
			const qty = Number(raw);
			if (!Number.isInteger(qty) || qty < 0 || qty > MAX_QTY) {
				return fail(400, { error: 'Invalid quantity.' });
			}
			if (qty > 0)
				items.push({ id: addon.id, name: addon.name, pricePence: addon.pricePence, quantity: qty });
		}

		if (items.length === 0) {
			return fail(400, { error: 'Pick at least one extra.' });
		}

		let session;
		try {
			session = await stripe.checkout.sessions.create({
				mode: 'payment',
				customer_email: delivery.subscriberEmail,
				line_items: items.map((item) => ({
					price_data: {
						currency: 'gbp',
						product_data: { name: item.name },
						unit_amount: item.pricePence
					},
					quantity: item.quantity
				})),
				success_url: `${url.origin}/addons/${params.token}?success=1`,
				cancel_url: `${url.origin}/addons/${params.token}?canceled=1`,
				payment_intent_data: { metadata: { kind: 'delivery-addon', deliveryId: delivery.id } },
				metadata: {
					kind: 'delivery-addon',
					deliveryId: delivery.id,
					items: JSON.stringify(items.map((item) => ({ id: item.id, quantity: item.quantity })))
				}
			});
		} catch (e) {
			console.error('addons/[token] checkout failed', e);
			return fail(500, { error: 'Could not start payment. Please try again.' });
		}

		redirect(303, session.url!);
	}
};
