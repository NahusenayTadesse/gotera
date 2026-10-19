import { b as private_env } from '../../../../../chunks/shared-server.js-9-2j12mp.js';
import { k as sendPaymentFailed, l as notifyAdminPaymentFailed, m as sendGiftReceived, o as notifyAdminGiftOrder, p as sendOrderConfirmed, q as notifyAdminOrder, r as sendSubscriptionConfirmed, t as notifyAdminNewSubscriber, u as sendDeliveryRolled, v as sendAddonsAdded } from '../../../../../chunks/email.js-dqhVc8wQ.js';
import { m as db, q as subscriptions, j as eq, p as subscribers, A as giftOrders, B as guestOrders, k as and, v as isNull, y as subscriberAddons, t as plans, x as deliveries, d as desc, I as addresses, V as deliveryAddonPurchases, z as addons, L as deliveryAddons, s as sql } from '../../../../../chunks/db.js-1ke6Xzkd.js';
import { t as toCalendarString } from '../../../../../chunks/format.js-DDyQH27n.js';
import { s as stripe } from '../../../../../chunks/stripe.js-DclyrhzZ.js';
import { a as auth } from '../../../../../chunks/auth.js-DhmMxWmU.js';
import { c as reserveOrderStock, e as deliveryUnits, f as consumeStock, n as notify } from '../../../../../chunks/stock.js-CqhGxQcM.js';
import { n as nextDeliveryDate, a as nextDeliveryDateIgnoringCapacity } from '../../../../../chunks/deliverySchedule.js-BT3zrLFF.js';
import { p as planForStripePrice, s as subscriptionUnitPrice } from '../../../../../chunks/plans.js-GJWWSiLi.js';
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
import '../../../../../chunks/addons.js-B66jfCaP.js';
import '../../../../../index.js-CBdg6S5O.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/server.js-qDPizQqb.js';
import '../../../../../chunks/internal2.js-aW-XQIo9.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';
import 'stripe';
import '../../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../../chunks/dialect.js-DJNK594B.js';
import 'web-push';

//#region src/lib/server/stripeInvoice.ts
/**
* The subscription an invoice belongs to.
*
* Since Stripe API 2025-03-31 (basil) the id lives at
* `invoice.parent.subscription_details.subscription`; the top-level `invoice.subscription`
* only exists on payloads from older API versions. Read both so renewals keep working
* whichever version the webhook endpoint is pinned to.
*/
function invoiceSubscriptionId(invoice) {
	const fromParent = invoice.parent?.subscription_details?.subscription;
	const legacy = invoice.subscription;
	const ref = fromParent ?? legacy;
	if (!ref) return null;
	return typeof ref === "string" ? ref : ref.id;
}
//#endregion
//#region src/routes/api/stripe/webhook/+server.ts
var WEBHOOK_SECRET = private_env.STRIPE_WEBHOOK_SECRET;
/**
* Stripe's view of a subscription -> our status enum.
*
* Takes the whole subscription, not just `status`, because a subscription paused with
* `pause_collection` keeps reporting `status: 'active'` — Stripe only reports 'paused'
* for trial-based pauses. Reading `status` alone therefore flipped every customer-paused
* plan straight back to active on the next `customer.subscription.updated` event, and
* billing resumed behind their back.
*/
function mapStatus(sub) {
	if (sub.status === "canceled" || sub.status === "unpaid") return "cancelled";
	if (sub.status === "paused" || sub.pause_collection) return "paused";
	return "active";
}
var deliveryFmt = new Intl.DateTimeFormat("en-GB", {
	weekday: "long",
	day: "numeric",
	month: "long"
});
var money = (pence) => `£${(pence / 100).toFixed(2)}`;
var idOf = (ref) => ref ? typeof ref === "string" ? ref : ref.id : null;
/** MySQL unique-key violation, whether or not drizzle wrapped the driver error. */
function isDuplicateKey(e) {
	const err = e;
	return err?.code === "ER_DUP_ENTRY" || err?.cause?.code === "ER_DUP_ENTRY";
}
/**
* A one-off order's add-ons only ever exist in Stripe metadata (checkout.session
* metadata's `addonIds`) — there's no `deliveries` row for a gift/guest order to hang a
* `delivery_addons` join off. Snapshotting name + price here, once, at the moment the
* order is paid, is what lets the dashboard and packing slips show what was bought
* without re-deriving it from metadata (which could drift if the catalogue changes later).
*/
/**
* Parses the `addonIds` metadata: `id:qty` pairs, comma separated.
*
* A bare id with no colon means quantity 1, so sessions created before quantities
* existed (and any still in flight during a deploy) keep fulfilling correctly.
*/
function parseAddonMetadata(raw) {
	return (raw ?? "").split(",").filter(Boolean).map((entry) => {
		const [id, qty] = entry.split(":");
		const n = Number(qty);
		return {
			id,
			quantity: Number.isFinite(n) ? Math.min(20, Math.max(1, Math.trunc(n))) : 1
		};
	}).filter((e) => e.id);
}
async function resolveAddonSnapshot(metadataAddonIds) {
	const requested = parseAddonMetadata(metadataAddonIds);
	if (requested.length === 0) return [];
	const catalogue = await db.select().from(addons);
	return requested.map((r) => {
		const a = catalogue.find((c) => c.id === r.id);
		return a ? {
			id: a.id,
			name: a.name,
			pricePence: a.pricePence,
			quantity: r.quantity
		} : null;
	}).filter((x) => x !== null);
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
		await db.transaction(async (tx) => {
			await tx.insert(deliveryAddonPurchases).values({
				deliveryId,
				stripePaymentIntentId: paymentIntentId,
				amountPence: session.amount_total ?? items.reduce((sum, i) => sum + i.pricePence * i.quantity, 0),
				items
			});
			for (const item of items) {
				const [existing] = await tx.select({ id: deliveryAddons.id }).from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, item.id))).for("update");
				if (existing) await tx.update(deliveryAddons).set({ quantity: sql`${deliveryAddons.quantity} + ${item.quantity}` }).where(eq(deliveryAddons.id, existing.id));
				else await tx.insert(deliveryAddons).values({
					deliveryId,
					addonId: item.id,
					quantity: item.quantity
				});
			}
		});
	} catch (e) {
		if (isDuplicateKey(e)) return;
		throw e;
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
	const price = sub.items.data[0]?.price;
	const priceId = price?.id;
	const plan = priceId ? await planForStripePrice(priceId) : void 0;
	const quantity = sub.items.data[0]?.quantity ?? subRow.quantity ?? 1;
	const periodEnd = sub.items.data[0]?.current_period_end;
	const nextPeriodEnd = periodEnd ? /* @__PURE__ */ new Date(periodEnd * 1e3) : null;
	const periodRolledOver = !!nextPeriodEnd && !!subRow.pendingPlanAt && nextPeriodEnd.getTime() > subRow.pendingPlanAt.getTime() + 1440 * 60 * 1e3;
	const switchStillPending = !!subRow.pendingPlanId && plan?.id === subRow.pendingPlanId && !periodRolledOver;
	await db.update(subscriptions).set({
		status: mapStatus(sub),
		planId: switchStillPending ? subRow.planId : plan?.id ?? subRow.planId,
		quantity,
		currentPeriodEnd: nextPeriodEnd,
		cancelAtPeriodEnd: sub.cancel_at_period_end,
		pendingPlanId: switchStillPending ? subRow.pendingPlanId : null,
		pendingPlanAt: switchStillPending ? subRow.pendingPlanAt : null,
		stripePriceId: switchStillPending ? subRow.stripePriceId : priceId ?? subRow.stripePriceId,
		unitPricePence: switchStillPending ? subRow.unitPricePence : price?.unit_amount ?? subRow.unitPricePence
	}).where(eq(subscriptions.id, subRow.id));
}
/**
* Book the delivery a paid invoice entitles the subscriber to.
*
* Keyed on the invoice: `deliveries.stripe_invoice_id` is unique, so a retried webhook
* (Stripe delivers at least once) hits the constraint and books nothing. Returns whether
* a delivery was actually created, so callers only send confirmations once.
*/
async function scheduleDelivery(subscriberId, subscriptionId, addressId, invoiceId) {
	let targetAddressId = addressId;
	if (!targetAddressId) {
		const [subConfig] = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId));
		if (subConfig?.addressId) targetAddressId = subConfig.addressId;
		else {
			const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
			targetAddressId = (rows.find((a) => a.isPrimary) ?? rows[0])?.id;
		}
	}
	if (!targetAddressId) return false;
	const soonest = await nextDeliveryDateIgnoringCapacity();
	const scheduledDate = await nextDeliveryDate();
	const units = await deliveryUnits(subscriptionId);
	const [snapshot] = await db.select({
		planId: subscriptions.planId,
		packs: plans.packs,
		quantity: subscriptions.quantity,
		unitPricePence: subscriptionUnitPrice
	}).from(subscriptions).innerJoin(plans, eq(plans.id, subscriptions.planId)).where(eq(subscriptions.id, subscriptionId));
	try {
		await db.insert(deliveries).values({
			subscriberId,
			subscriptionId,
			addressId: targetAddressId,
			scheduledDate,
			status: "scheduled",
			stripeInvoiceId: invoiceId,
			stockUnits: units,
			stockDate: scheduledDate,
			planId: snapshot?.planId ?? null,
			packs: snapshot?.packs ?? null,
			quantity: snapshot?.quantity ?? null,
			unitPricePence: snapshot?.unitPricePence ?? null
		});
	} catch (e) {
		if (isDuplicateKey(e)) return false;
		throw e;
	}
	const reserved = await consumeStock(scheduledDate, units, null, { allowOver: true });
	if (reserved.row.used > reserved.row.capacity) console.error("stock: booked a delivery past capacity (date filled up concurrently)", scheduledDate);
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
	return true;
}
/**
* Email a guest buyer a sign-in link so their order shows up under /account.
*
* No account is created here: the address was typed into Stripe Checkout and is
* unverified, so creating a user for it would let anyone mint accounts in a third
* party's name. Better Auth's magic-link plugin creates the user only when the link is
* clicked — i.e. once the recipient has proved they own the inbox. Existing users just
* get a normal sign-in link.
*/
async function sendMagicLink(email, name) {
	await auth.api.signInMagicLink({
		body: {
			email,
			name,
			callbackURL: "/account"
		},
		headers: new Headers()
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
							addons: addonSnapshot.length ? addonSnapshot : null,
							amountPence: session.amount_total ?? before?.amountPence ?? null
						}).where(eq(giftOrders.id, giftOrderId));
						if (before) await reserveOrderStock("gift", giftOrderId, Math.max(1, before.quantity), await nextDeliveryDate());
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
								const deliveryLabel = deliveryFmt.format(order.deliveryDate ?? await nextDeliveryDate());
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
							addons: addonSnapshot.length ? addonSnapshot : null,
							amountPence: session.amount_total ?? before?.amountPence ?? null
						}).where(eq(guestOrders.id, guestOrderId));
						if (before) if (kind === "addons") await db.update(guestOrders).set({ deliveryDate: await nextDeliveryDateIgnoringCapacity() }).where(and(eq(guestOrders.id, guestOrderId), isNull(guestOrders.deliveryDate)));
						else await reserveOrderStock("guest", guestOrderId, Math.max(1, before.quantity), await nextDeliveryDate());
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
								const deliveryLabel = deliveryFmt.format(order.deliveryDate ?? await nextDeliveryDate());
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
								if (email && session.metadata?.signedIn !== "1") await sendMagicLink(email, name ?? void 0);
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
				const addonItems = parseAddonMetadata(session.metadata?.addonIds);
				if (subscriberId) {
					await db.update(subscribers).set({ stripeCustomerId: customerId }).where(eq(subscribers.id, subscriberId));
					if (dbSubscriptionId) {
						await db.update(subscriptions).set({
							stripeSubscriptionId: subscriptionId,
							status: "active",
							addressId
						}).where(eq(subscriptions.id, dbSubscriptionId));
						if (addonItems.length) {
							await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriptionId, dbSubscriptionId));
							await db.insert(subscriberAddons).values(addonItems.map((item) => ({
								id: crypto.randomUUID(),
								subscriberId,
								subscriptionId: dbSubscriptionId,
								addonId: item.id,
								quantity: item.quantity
							})));
						}
					}
				}
				await syncSubscription(await stripe.subscriptions.retrieve(subscriptionId));
				if ((subscriberId && dbSubscriptionId ? await scheduleDelivery(subscriberId, dbSubscriptionId, addressId, idOf(session.invoice)) : false) && subscriberId && dbSubscriptionId) try {
					const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.id, dbSubscriptionId));
					if (subUser && subRow) {
						const [planRow] = await db.select().from(plans).where(eq(plans.id, subRow.planId));
						const amountLabel = money(session.amount_total ?? planRow?.pricePence ?? 0);
						const planName = planRow?.name ?? "Subscription";
						const [firstDelivery] = await db.select({ scheduledDate: deliveries.scheduledDate }).from(deliveries).where(eq(deliveries.subscriptionId, dbSubscriptionId)).orderBy(desc(deliveries.createdAt)).limit(1);
						const nextDeliveryLabel = deliveryFmt.format(firstDelivery?.scheduledDate ?? await nextDeliveryDate());
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
				const stripeSubId = invoiceSubscriptionId(invoice);
				if (stripeSubId) {
					const sub = await stripe.subscriptions.retrieve(stripeSubId);
					await syncSubscription(sub);
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
					if (subRow && invoice.billing_reason !== "subscription_create") await scheduleDelivery(subRow.subscriberId, subRow.id, void 0, invoice.id ?? null);
				}
				break;
			}
			case "invoice.payment_failed": {
				const invoice = event.data.object;
				const stripeSubId = invoiceSubscriptionId(invoice);
				if (stripeSubId && (invoice.attempt_count ?? 1) <= 1) try {
					const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, stripeSubId));
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
//# sourceMappingURL=_server.ts.js-xodltZpk.js.map
