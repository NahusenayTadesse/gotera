import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { addons as addonsTable, addresses, guestOrders } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { isLondonPostcode, lookupPostcode } from '$lib/server/geocode';
import { nextDeliveryDateIgnoringCapacity } from '$lib/server/deliverySchedule';
import { addonImageSrc, canSellAlone, tagsOf } from '$lib/addons';
import { m } from '$lib/paraglide/messages.js';
import { addonShopSchema, type ShopMessage } from './schema';

/** Every active add-on, in the shape the shop renders. Includes "with injera only" items. */
async function catalogue() {
	const rows = await db
		.select()
		.from(addonsTable)
		.where(eq(addonsTable.isActive, true))
		.orderBy(desc(addonsTable.isFeatured), asc(addonsTable.sortOrder), asc(addonsTable.name));

	return rows.map((a) => ({
		id: a.id,
		name: a.name,
		description: a.description,
		category: a.category,
		availability: a.availability,
		pricePence: a.pricePence,
		image: addonImageSrc(a.imageUrl),
		unitLabel: a.unitLabel,
		badge: a.badge,
		tags: tagsOf(a.tags),
		spiceLevel: a.spiceLevel,
		ingredients: a.ingredients,
		isFeatured: a.isFeatured
	}));
}

export const load: PageServerLoad = async ({ locals }) => {
	const [items, form, nextDelivery] = await Promise.all([
		catalogue(),
		superValidate(zod4(addonShopSchema), { errors: false }),
		nextDeliveryDateIgnoringCapacity()
	]);

	if (locals.user?.name && !form.data.recipientName) form.data.recipientName = locals.user.name;

	return {
		items,
		form,
		// A calendar date, formatted in the browser so it reads in the customer's locale.
		nextDelivery: nextDelivery.toISOString().slice(0, 10),
		signedIn: !!locals.user
	};
};

export const actions: Actions = {
	/* Add-ons on their own: one-off Stripe payment, delivered on the next run. */
	checkout: async ({ request, locals, url }) => {
		const form = await superValidate(request, zod4(addonShopSchema));
		if (!form.valid) return fail(400, { form });

		const email = locals.user?.email ?? form.data.email;
		if (!email) return setError(form, 'email', 'Enter your email so we can send the confirmation.');

		if (!(await isLondonPostcode(form.data.postcode))) {
			return setError(form, 'postcode', m.subscribe_error_outside_london());
		}

		// Re-price every line from the live catalogue. A line for something inactive or
		// "with injera only" fails the whole basket rather than being dropped, so the
		// customer never pays a total that differs from the one they saw.
		const live = await catalogue();
		const lines = new Map<string, number>();
		for (const item of form.data.items) lines.set(item.id, (lines.get(item.id) ?? 0) + item.quantity);

		const chosen = [...lines].map(([id, quantity]) => ({ addon: live.find((a) => a.id === id), quantity }));
		if (chosen.some((c) => !c.addon)) {
			return message(
				form,
				{ type: 'error', text: 'Something in your basket is no longer available. Please refresh and try again.' } satisfies ShopMessage,
				{ status: 400 }
			);
		}
		const notAlone = chosen.find((c) => !canSellAlone(c.addon!));
		if (notAlone) {
			return message(
				form,
				{ type: 'error', text: `${notAlone.addon!.name} can only be added to an injera order.` } satisfies ShopMessage,
				{ status: 400 }
			);
		}

		const recipientAddress = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			phone: form.data.phone || null,
			city: form.data.city || 'London',
			postcode: form.data.postcode
		};

		// Coordinates for the route planner — best-effort, never blocks the order.
		const coords =
			Number.isFinite(form.data.latitude) && Number.isFinite(form.data.longitude)
				? { latitude: form.data.latitude, longitude: form.data.longitude, geocodedAt: new Date() }
				: await lookupPostcode(form.data.postcode).then((hit) =>
						hit ? { latitude: hit.latitude, longitude: hit.longitude, geocodedAt: new Date() } : {}
					);

		const addressId = crypto.randomUUID();
		const guestOrderId = crypto.randomUUID();
		const metadataAddons = chosen.map((c) => `${c.addon!.id}:${Math.min(20, c.quantity)}`).join(',');

		// Stripe fetches product images itself, so only absolute https URLs are any use.
		const imageFor = (src: string | null) => {
			if (!src || url.protocol !== 'https:') return undefined;
			return [new URL(src, url.origin).href];
		};

		let checkoutUrl: string;
		try {
			await db.insert(addresses).values({
				id: addressId,
				label: 'Add-on order',
				...recipientAddress,
				phone: recipientAddress.phone ?? '',
				...coords,
				isPrimary: false
			});
			// Quantity 0 = no injera. The webhook fills in the add-on snapshot once paid.
			await db.insert(guestOrders).values({
				id: guestOrderId,
				buyerEmail: email,
				buyerName: locals.user?.name ?? form.data.recipientName,
				recipientName: form.data.recipientName,
				addressId,
				recipientAddress,
				quantity: 0,
				status: 'pending'
			});

			const session = await stripe.checkout.sessions.create({
				mode: 'payment',
				customer_email: email,
				line_items: chosen.map(({ addon, quantity }) => ({
					price_data: {
						currency: 'gbp',
						product_data: {
							name: addon!.name,
							...(addon!.unitLabel ? { description: addon!.unitLabel } : {}),
							...(imageFor(addon!.image) ? { images: imageFor(addon!.image) } : {})
						},
						unit_amount: addon!.pricePence
					},
					quantity: Math.min(20, quantity)
				})),
				success_url: `${url.origin}/addons?checkout=success`,
				cancel_url: `${url.origin}/addons?checkout=cancelled`,
				payment_intent_data: { metadata: { guestOrderId, kind: 'addons' } },
				metadata: {
					guestOrderId,
					kind: 'addons',
					addressId,
					addonIds: metadataAddons,
					quantity: '0',
					signedIn: locals.user ? '1' : '0'
				}
			});
			checkoutUrl = session.url!;
		} catch (e) {
			console.error('add-on shop checkout failed', e);
			return message(form, { type: 'error', text: m.subscribe_error_checkout_failed() } satisfies ShopMessage, {
				status: 500
			});
		}

		redirect(303, checkoutUrl);
	}
};
