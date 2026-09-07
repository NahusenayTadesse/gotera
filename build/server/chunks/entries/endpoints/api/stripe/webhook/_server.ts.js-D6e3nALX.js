import { b as private_env } from '../../../../../chunks/shared-server.js-9-2j12mp.js';
import { j as sendPaymentFailed, k as notifyAdminPaymentFailed, l as sendGiftReceived, m as notifyAdminGiftOrder, o as sendOrderConfirmed, p as notifyAdminOrder, q as sendSubscriptionConfirmed, r as notifyAdminNewSubscriber, t as sendDeliveryRolled, u as sendAddonsAdded } from '../../../../../chunks/email.js-BnPglp6p.js';
import { m as db, t as subscriptions, j as eq, p as subscribers, L as giftOrders, K as guestOrders, w as subscriberAddons, q as plans, E as addresses, v as deliveries, N as deliveryAddonPurchases, x as addons, G as deliveryAddons, k as and, u as user } from '../../../../../chunks/db.js-4htFJ9eU.js';
import { t as toCalendarString } from '../../../../../chunks/format.js-DhQga0l2.js';
import { s as stripe } from '../../../../../chunks/stripe.js-DclyrhzZ.js';
import { a as auth } from '../../../../../chunks/auth.js-BY3fcWjO.js';
import { n as nextDeliveryDate, c as nextDeliveryDateIgnoringCapacity, d as consumeStock, e as notify } from '../../../../../chunks/deliverySchedule.js-Cc8Lh-nG.js';
import { v as error, j as json } from '../../../../../chunks/utils.js-BQt5v-8G.js';
import 'nodemailer';
import 'node:buffer';
import 'url';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'process';
import 'crypto';
import 'zlib';
import 'util';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../index.js-DTDoOnIs.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/server.js-CPNQ0GBv.js';
import '../../../../../chunks/internal2.js-Dvlk6_8w.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';
import 'stripe';
import '../../../../../chunks/access.js-HgBsL8za.js';
import '../../../../../chunks/dialect.js-DJNK594B.js';

//#region src/routes/api/stripe/webhook/+server.ts
var WEBHOOK_SECRET = private_env.STRIPE_WEBHOOK_SECRET;
function mapStatus(s) {
	if (s === "canceled" || s === "unpaid") return "cancelled";
	if (s === "paused") return "paused";
	return "active";
}
var deliveryFmt = new Intl.DateTimeFormat("en-GB", {
	weekday: "long",
	day: "numeric",
	month: "long"
});
var money = (pence) => `£${(pence / 100).toFixed(2)}`;
/**
* A one-off order's add-ons only ever exist in Stripe metadata (checkout.session
* metadata's `addonIds`) — there's no `deliveries` row for a gift/guest order to hang a
* `delivery_addons` join off. Snapshotting name + price here, once, at the moment the
* order is paid, is what lets the dashboard and packing slips show what was bought
* without re-deriving it from metadata (which could drift if the catalogue changes later).
*/
async function resolveAddonSnapshot(metadataAddonIds) {
	const addonIds = (metadataAddonIds ?? "").split(",").filter(Boolean);
	if (addonIds.length === 0) return [];
	return (await db.select().from(addons)).filter((a) => addonIds.includes(a.id)).map((a) => ({
		id: a.id,
		name: a.name,
		pricePence: a.pricePence,
		quantity: 1
	}));
}
/**
* A paid one-off add-on bought from the pre-delivery reminder email's "Add extras"
* link (see /addons/[token]). Deduped by `stripePaymentIntentId` in
* `delivery_addon_purchases` so a retried `checkout.session.completed` can't double-add
* quantity to `delivery_addons` — Stripe does not guarantee exactly-once delivery.
*/
async function handleDeliveryAddonPurchase(session) {
	const deliveryId = session.metadata?.deliveryId;
	const rawItems = session.metadata?.items;
	const paymentIntentId = session.payment_intent;
	if (!deliveryId || !rawItems || !paymentIntentId) {
		console.error("delivery-addon webhook: missing metadata", session.id);
		return;
	}
	let requested;
	try {
		requested = JSON.parse(rawItems);
	} catch {
		console.error("delivery-addon webhook: unparseable items metadata", rawItems);
		return;
	}
	const [alreadyProcessed] = await db.select({ id: deliveryAddonPurchases.id }).from(deliveryAddonPurchases).where(eq(deliveryAddonPurchases.stripePaymentIntentId, paymentIntentId));
	if (alreadyProcessed) return;
	const catalogue = await db.select().from(addons);
	const items = requested.map((r) => {
		const addon = catalogue.find((a) => a.id === r.id);
		return addon ? {
			id: addon.id,
			name: addon.name,
			pricePence: addon.pricePence,
			quantity: r.quantity
		} : null;
	}).filter((i) => i !== null);
	if (items.length === 0) return;
	try {
		await db.insert(deliveryAddonPurchases).values({
			deliveryId,
			stripePaymentIntentId: paymentIntentId,
			amountPence: session.amount_total ?? items.reduce((sum, i) => sum + i.pricePence * i.quantity, 0),
			items
		});
	} catch {
		return;
	}
	for (const item of items) {
		const [existing] = await db.select().from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, item.id)));
		if (existing) await db.update(deliveryAddons).set({ quantity: existing.quantity + item.quantity }).where(eq(deliveryAddons.id, existing.id));
		else await db.insert(deliveryAddons).values({
			deliveryId,
			addonId: item.id,
			quantity: item.quantity
		});
	}
	try {
		const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, deliveryId));
		const [subscriber] = delivery ? await db.select().from(subscribers).where(eq(subscribers.id, delivery.subscriberId)) : [];
		if (delivery && subscriber) await sendAddonsAdded(subscriber.email, {
			name: subscriber.fullName ?? "there",
			deliveryLabel: deliveryFmt.format(delivery.scheduledDate),
			amountLabel: money(session.amount_total ?? 0),
			addonLines: items.map((i) => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ""}`)
		});
	} catch (e) {
		console.error("delivery-addon confirmation email failed", e);
	}
}
/** The DB mirrors Stripe: read plan/status/period straight off the subscription. */
async function syncSubscription(sub) {
	const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
	if (!subRow) return;
	const priceId = sub.items.data[0]?.price.id;
	const [plan] = priceId ? await db.select().from(plans).where(eq(plans.stripePriceId, priceId)) : [];
	const quantity = sub.items.data[0]?.quantity ?? subRow.quantity ?? 1;
	const periodEnd = sub.items.data[0]?.current_period_end;
	const nextPeriodEnd = periodEnd ? /* @__PURE__ */ new Date(periodEnd * 1e3) : null;
	const periodRolledOver = !!nextPeriodEnd && !!subRow.pendingPlanAt && nextPeriodEnd.getTime() > subRow.pendingPlanAt.getTime() + 1440 * 60 * 1e3;
	const switchStillPending = !!subRow.pendingPlanId && plan?.id === subRow.pendingPlanId && !periodRolledOver;
	await db.update(subscriptions).set({
		status: mapStatus(sub.status),
		planId: switchStillPending ? subRow.planId : plan?.id ?? subRow.planId,
		quantity,
		currentPeriodEnd: nextPeriodEnd,
		cancelAtPeriodEnd: sub.cancel_at_period_end,
		pendingPlanId: switchStillPending ? subRow.pendingPlanId : null,
		pendingPlanAt: switchStillPending ? subRow.pendingPlanAt : null
	}).where(eq(subscriptions.id, subRow.id));
}
async function scheduleDelivery(subscriberId, subscriptionId, addressId) {
	let targetAddressId = addressId;
	if (!targetAddressId) {
		const [subConfig] = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId));
		if (subConfig?.addressId) targetAddressId = subConfig.addressId;
		else {
			const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
			targetAddressId = (rows.find((a) => a.isPrimary) ?? rows[0])?.id;
		}
	}
	if (!targetAddressId) return;
	const soonest = await nextDeliveryDateIgnoringCapacity();
	const scheduledDate = await nextDeliveryDate();
	await db.insert(deliveries).values({
		subscriberId,
		subscriptionId,
		addressId: targetAddressId,
		scheduledDate,
		status: "scheduled"
	});
	if (!(await consumeStock(scheduledDate, 1)).ok) console.error("stock: booked a delivery on a date that filled up concurrently", scheduledDate);
	if (toCalendarString(scheduledDate) !== toCalendarString(soonest)) {
		const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
		if (subscriber) {
			const originalLabel = deliveryFmt.format(soonest);
			const deliveryLabel = deliveryFmt.format(scheduledDate);
			await notify(subscriberId, "delivery-rolled", `Your first delivery is ${deliveryLabel}`, `Our ${originalLabel} run was fully booked, so we've scheduled you for the next one.`);
			try {
				await sendDeliveryRolled(subscriber.email, {
					name: subscriber.fullName ?? "there",
					originalLabel,
					deliveryLabel
				});
			} catch (e) {
				console.error("delivery-rolled email failed", e);
			}
		}
	}
}
async function sendMagicLink(email, name, request) {
	const randomPassword = Math.random().toString(36).slice(2, 10);
	const [existingUser] = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1);
	if (existingUser) return;
	await auth.api.createUser({ body: {
		email,
		name,
		password: randomPassword,
		role: "user"
	} });
	await auth.api.signInMagicLink({
		body: {
			email,
			callbackURL: "/account"
		},
		headers: request.headers
	});
}
var POST = async ({ request }) => {
	const sig = request.headers.get("stripe-signature");
	const body = await request.text();
	let event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
	} catch (e) {
		console.error("Webhook signature verification failed", e);
		throw error(400, "Invalid signature");
	}
	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;
				if (session.mode === "payment") {
					if (session.metadata?.kind === "delivery-addon") {
						await handleDeliveryAddonPurchase(session);
						break;
					}
					const giftOrderId = session.metadata?.giftOrderId;
					const guestOrderId = session.metadata?.guestOrderId;
					const kind = session.metadata?.kind;
					const email = session.customer_details?.email;
					const addressId = session.metadata?.addressId;
					const name = session.customer_details?.name;
					if (!giftOrderId && !guestOrderId) break;
					if (giftOrderId) {
						const [before] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
						const alreadyPaid = before?.status === "paid" || before?.status === "fulfilled";
						const addonSnapshot = await resolveAddonSnapshot(session.metadata?.addonIds);
						await db.update(giftOrders).set({
							status: "paid",
							stripePaymentIntentId: session.payment_intent,
							addons: addonSnapshot.length ? addonSnapshot : null
						}).where(eq(giftOrders.id, giftOrderId));
						if (alreadyPaid) break;
						try {
							const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
							if (order) {
								const amountLabel = money(session.amount_total ?? 0);
								const addonNames = addonSnapshot.map((a) => a.name);
								const addr = order.recipientAddress;
								const addressLines = [
									order.recipientName,
									addr.line1,
									addr.line2 ?? "",
									addr.city,
									addr.postcode
								];
								const deliveryLabel = deliveryFmt.format(await nextDeliveryDate());
								if (kind === "gift") {
									await sendGiftReceived(order.buyerEmail, {
										buyerName: order.buyerName ?? "there",
										recipientName: order.recipientName,
										amountLabel
									});
									await notifyAdminGiftOrder({
										buyerName: order.buyerName ?? "Guest",
										buyerEmail: order.buyerEmail,
										recipientName: order.recipientName,
										amountLabel
									});
								} else {
									await sendOrderConfirmed(order.buyerEmail, {
										name: order.buyerName ?? "there",
										amountLabel,
										deliveryLabel,
										addressLines,
										addonNames
									});
									await notifyAdminOrder({
										buyerName: order.buyerName ?? "Guest",
										buyerEmail: order.buyerEmail,
										amountLabel,
										deliveryLabel,
										addressLines,
										addonNames
									});
								}
							}
						} catch (e) {
							console.error("one-time order emails failed", e);
						}
						break;
					}
					if (guestOrderId) {
						const [before] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
						const alreadyPaid = before?.status === "paid" || before?.status === "fulfilled";
						const addonSnapshot = await resolveAddonSnapshot(session.metadata?.addonIds);
						await db.update(guestOrders).set({
							status: "paid",
							addressId,
							buyerEmail: email ?? before?.buyerEmail ?? null,
							buyerName: name ?? before?.buyerName ?? null,
							recipientName: before?.recipientName ?? name ?? null,
							stripePaymentIntentId: session.payment_intent,
							addons: addonSnapshot.length ? addonSnapshot : null
						}).where(eq(guestOrders.id, guestOrderId));
						if (alreadyPaid) break;
						try {
							const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
							if (order) {
								const amountLabel = money(session.amount_total ?? 0);
								const addonNames = addonSnapshot.map((a) => a.name);
								const addr = order.recipientAddress;
								const addressLines = [
									order.recipientName ?? "",
									addr.line1,
									addr.line2 ?? "",
									addr.phone ?? "",
									addr.city,
									addr.postcode
								];
								const deliveryLabel = deliveryFmt.format(await nextDeliveryDate());
								if (email) await sendOrderConfirmed(email, {
									name: name ?? "there",
									amountLabel,
									deliveryLabel,
									addressLines,
									addonNames
								});
								await notifyAdminOrder({
									buyerName: name ?? "Guest",
									buyerEmail: email ?? "Unknown",
									amountLabel,
									deliveryLabel,
									addressLines,
									addonNames
								});
								if (email) await sendMagicLink(email, name ?? "there", request);
							}
						} catch (e) {
							console.error("one-time order emails failed", e);
						}
						break;
					}
				}
				if (session.mode !== "subscription") break;
				const subscriptionId = session.subscription;
				const customerId = session.customer;
				const subscriberId = session.metadata?.subscriberId;
				const dbSubscriptionId = session.metadata?.subscriptionId;
				const addressId = session.metadata?.addressId || void 0;
				const addonIds = (session.metadata?.addonIds ?? "").split(",").filter(Boolean);
				if (subscriberId) {
					await db.update(subscribers).set({ stripeCustomerId: customerId }).where(eq(subscribers.id, subscriberId));
					if (dbSubscriptionId) {
						await db.update(subscriptions).set({
							stripeSubscriptionId: subscriptionId,
							status: "active",
							addressId
						}).where(eq(subscriptions.id, dbSubscriptionId));
						if (addonIds.length) {
							await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriptionId, dbSubscriptionId));
							await db.insert(subscriberAddons).values(addonIds.map((addonId) => ({
								id: crypto.randomUUID(),
								subscriberId,
								subscriptionId: dbSubscriptionId,
								addonId,
								quantity: 1
							})));
						}
					}
				}
				await syncSubscription(await stripe.subscriptions.retrieve(subscriptionId));
				if (subscriberId && dbSubscriptionId) await scheduleDelivery(subscriberId, dbSubscriptionId, addressId);
				if (subscriberId && dbSubscriptionId) try {
					const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.id, dbSubscriptionId));
					if (subUser && subRow) {
						const [planRow] = await db.select().from(plans).where(eq(plans.id, subRow.planId));
						const amountLabel = money(session.amount_total ?? planRow?.pricePence ?? 0);
						const planName = planRow?.name ?? "Subscription";
						const nextDeliveryLabel = deliveryFmt.format(await nextDeliveryDate());
						await sendSubscriptionConfirmed(subUser.email, {
							name: subUser.fullName ?? "there",
							planName,
							amountLabel,
							nextDeliveryLabel
						});
						await notifyAdminNewSubscriber({
							name: subUser.fullName ?? "—",
							email: subUser.email,
							planName,
							amountLabel
						});
					}
				} catch (e) {
					console.error("subscription emails failed", e);
				}
				break;
			}
			case "customer.subscription.created":
			case "customer.subscription.updated":
				await syncSubscription(event.data.object);
				break;
			case "customer.subscription.deleted": {
				const sub = event.data.object;
				await db.update(subscriptions).set({
					status: "cancelled",
					pendingPlanId: null,
					pendingPlanAt: null
				}).where(eq(subscriptions.stripeSubscriptionId, sub.id));
				break;
			}
			case "invoice.paid": {
				const invoice = event.data.object;
				if (invoice.subscription) {
					const sub = await stripe.subscriptions.retrieve(invoice.subscription);
					await syncSubscription(sub);
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
					if (subRow && invoice.billing_reason !== "subscription_create") await scheduleDelivery(subRow.subscriberId, subRow.id);
				}
				break;
			}
			case "invoice.payment_failed": {
				const invoice = event.data.object;
				if (invoice.subscription && (invoice.attempt_count ?? 1) <= 1) try {
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, invoice.subscription));
					if (subRow) {
						const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subRow.subscriberId));
						if (subUser) {
							await sendPaymentFailed(subUser.email, { name: subUser.fullName ?? "there" });
							await notifyAdminPaymentFailed({
								name: subUser.fullName ?? "—",
								email: subUser.email
							});
						}
					}
				} catch (e) {
					console.error("payment-failed emails failed", e);
				}
				break;
			}
		}
	} catch (e) {
		console.error("Webhook handler error", event.type, e);
		throw error(500, "Webhook handler failed");
	}
	return json({ received: true });
};

export { POST };
//# sourceMappingURL=_server.ts.js-D6e3nALX.js.map
