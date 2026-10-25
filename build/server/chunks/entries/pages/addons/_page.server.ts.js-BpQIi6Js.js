import { m as db, I as addresses, B as guestOrders, z as addons, j as eq, d as desc, a as asc } from '../../../chunks/db.js-C0XyR4ft.js';
import { c as canSellAlone, t as tagsOf, b as addonImageSrc } from '../../../chunks/addons.js-B66jfCaP.js';
import { i as isLondonPostcode, l as lookupPostcode } from '../../../chunks/geocode.js-DYvD_CkO.js';
import { s as stripe } from '../../../chunks/stripe.js-DclyrhzZ.js';
import { a as nextDeliveryDateIgnoringCapacity } from '../../../chunks/deliverySchedule.js-BgiOZ7kS.js';
import { s as saveSubscriberPhone, a as subscribe_error_checkout_failed } from '../../../chunks/subscribers.js-cONFlCnS.js';
import { s as subscribe_error_outside_london } from '../../../chunks/subscribe_error_outside_london.js-CWqZzYAj.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/client.js-C3Iq_YCw.js';
import { s as superValidate, a as setError, m as message } from '../../../chunks/client2.js-P7rUUC6q.js';
import { z as zod } from '../../../chunks/adapters.js-DtwKAq2A.js';
import { C as fail, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, a1 as number, s as string, a2 as preprocess, y as email, x as array } from '../../../chunks/access.js-j1_SnSd1.js';

/**
* Checkout for add-ons bought on their own from /addons.
*
* Prices are never posted: the server re-reads every line from the catalogue, so all the
* client sends is which add-ons, how many, and where to deliver them.
*/
var addonShopSchema = object({
	items: array(object({
		id: string().min(1),
		quantity: number().int().min(1).max(20)
	})).min(1, { error: "Your basket is empty." }).max(30).default([]),
	recipientName: string().trim().min(1, { error: "Enter the name for the delivery." }).max(255),
	email: preprocess((v) => typeof v === "string" && v.trim() === "" ? void 0 : v, email({ error: "Enter a valid email address." }).optional()),
	phone: string().trim().min(5, { error: "Enter a phone number for the driver." }).max(32).regex(/^[0-9+()\s-]+$/, { error: "Use digits and + ( ) - only." }),
	line1: string().trim().min(1, { error: "Enter the first line of the address." }).max(255),
	line2: string().trim().max(255).optional(),
	city: string().trim().max(255).default("London"),
	postcode: string().trim().min(1, { error: "Enter a London postcode." }).max(32),
	latitude: number().optional(),
	longitude: number().optional()
});
//#endregion
//#region src/routes/addons/+page.server.ts
/** Every active add-on, in the shape the shop renders. Includes "with injera only" items. */
async function catalogue() {
	return (await db.select().from(addons).where(eq(addons.isActive, true)).orderBy(desc(addons.isFeatured), asc(addons.sortOrder), asc(addons.name))).map((a) => ({
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
var load = async ({ locals }) => {
	const [items, form, nextDelivery] = await Promise.all([
		catalogue(),
		superValidate(zod(addonShopSchema), { errors: false }),
		nextDeliveryDateIgnoringCapacity()
	]);
	if (locals.user?.name && !form.data.recipientName) form.data.recipientName = locals.user.name;
	return {
		items,
		form,
		nextDelivery: nextDelivery.toISOString().slice(0, 10),
		signedIn: !!locals.user
	};
};
var actions = { checkout: async ({ request, locals, url }) => {
	const form = await superValidate(request, zod(addonShopSchema));
	if (!form.valid) return fail(400, { form });
	const email = locals.user?.email ?? form.data.email;
	if (!email) return setError(form, "email", "Enter your email so we can send the confirmation.");
	if (!await isLondonPostcode(form.data.postcode)) return setError(form, "postcode", subscribe_error_outside_london());
	const live = await catalogue();
	const lines = /* @__PURE__ */ new Map();
	for (const item of form.data.items) lines.set(item.id, (lines.get(item.id) ?? 0) + item.quantity);
	const chosen = [...lines].map(([id, quantity]) => ({
		addon: live.find((a) => a.id === id),
		quantity
	}));
	if (chosen.some((c) => !c.addon)) return message(form, {
		type: "error",
		text: "Something in your basket is no longer available. Please refresh and try again."
	}, { status: 400 });
	const notAlone = chosen.find((c) => !canSellAlone(c.addon));
	if (notAlone) return message(form, {
		type: "error",
		text: `${notAlone.addon.name} can only be added to an injera order.`
	}, { status: 400 });
	const recipientAddress = {
		line1: form.data.line1,
		line2: form.data.line2 || null,
		phone: form.data.phone || null,
		city: form.data.city || "London",
		postcode: form.data.postcode
	};
	const coords = Number.isFinite(form.data.latitude) && Number.isFinite(form.data.longitude) ? {
		latitude: form.data.latitude,
		longitude: form.data.longitude,
		geocodedAt: /* @__PURE__ */ new Date()
	} : await lookupPostcode(form.data.postcode).then((hit) => hit ? {
		latitude: hit.latitude,
		longitude: hit.longitude,
		geocodedAt: /* @__PURE__ */ new Date()
	} : {});
	const addressId = crypto.randomUUID();
	const guestOrderId = crypto.randomUUID();
	const metadataAddons = chosen.map((c) => `${c.addon.id}:${Math.min(20, c.quantity)}`).join(",");
	const imageFor = (src) => {
		if (!src || url.protocol !== "https:") return void 0;
		return [new URL(src, url.origin).href];
	};
	let checkoutUrl;
	try {
		if (locals.user) await saveSubscriberPhone(locals.user.id, form.data.phone);
		await db.insert(addresses).values({
			id: addressId,
			label: "Add-on order",
			...recipientAddress,
			phone: recipientAddress.phone ?? "",
			...coords,
			isPrimary: false
		});
		await db.insert(guestOrders).values({
			id: guestOrderId,
			buyerEmail: email,
			buyerName: locals.user?.name ?? form.data.recipientName,
			recipientName: form.data.recipientName,
			addressId,
			recipientAddress,
			quantity: 0,
			status: "pending"
		});
		checkoutUrl = (await stripe.checkout.sessions.create({
			mode: "payment",
			customer_email: email,
			line_items: chosen.map(({ addon, quantity }) => ({
				price_data: {
					currency: "gbp",
					product_data: {
						name: addon.name,
						...addon.unitLabel ? { description: addon.unitLabel } : {},
						...imageFor(addon.image) ? { images: imageFor(addon.image) } : {}
					},
					unit_amount: addon.pricePence
				},
				quantity: Math.min(20, quantity)
			})),
			success_url: `${url.origin}/addons?checkout=success`,
			cancel_url: `${url.origin}/addons?checkout=cancelled`,
			payment_intent_data: { metadata: {
				guestOrderId,
				kind: "addons"
			} },
			metadata: {
				guestOrderId,
				kind: "addons",
				addressId,
				addonIds: metadataAddons,
				quantity: "0",
				signedIn: locals.user ? "1" : "0"
			}
		})).url;
	} catch (e) {
		console.error("add-on shop checkout failed", e);
		return message(form, {
			type: "error",
			text: subscribe_error_checkout_failed()
		}, { status: 500 });
	}
	redirect(303, checkoutUrl);
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BpQIi6Js.js.map
