import { b as private_env } from '../../../../../chunks/shared-server.js-9-2j12mp.js';
import { s as stripe } from '../../../../../chunks/stripe.js-DclyrhzZ.js';
import { m as db, y as subscriptions, j as eq, p as subscribers, G as giftOrders, w as addons, F as guestOrders, v as subscriberAddons, q as plans, z as addresses, t as deliveries, u as user } from '../../../../../chunks/db.js-BkD50_-0.js';
import { b as sendPaymentFailed, n as notifyAdminPaymentFailed, c as sendGiftReceived, d as notifyAdminGiftOrder, e as sendOrderConfirmed, f as notifyAdminOrder, g as sendSubscriptionConfirmed, h as notifyAdminNewSubscriber, a as auth } from '../../../../../chunks/auth.js-DZBRJAcg.js';
import { v as error, j as json } from '../../../../../chunks/utils.js-BQt5v-8G.js';
import 'stripe';
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
import '../../../../../index.js-CNe0N484.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/server.js-CPNQ0GBv.js';
import '../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../../../chunks/access.js-HgBsL8za.js';
import '../../../../../chunks/dialect.js-DJNK594B.js';
import 'nodemailer';

//#region src/routes/api/stripe/webhook/+server.ts
var WEBHOOK_SECRET = private_env.STRIPE_WEBHOOK_SECRET;
function mapStatus(s) {
	if (s === "canceled" || s === "unpaid") return "cancelled";
	if (s === "paused") return "paused";
	return "active";
}
function nextSaturday(from = /* @__PURE__ */ new Date()) {
	const d = new Date(from);
	const diff = (6 - d.getDay() + 7) % 7 || 7;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}
var deliveryFmt = new Intl.DateTimeFormat("en-GB", {
	weekday: "long",
	day: "numeric",
	month: "long"
});
var money = (pence) => `£${(pence / 100).toFixed(2)}`;
/** The DB mirrors Stripe: read plan/status/period straight off the subscription. */
async function syncSubscription(sub) {
	const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
	if (!subRow) return;
	const priceId = sub.items.data[0]?.price.id;
	const [plan] = priceId ? await db.select().from(plans).where(eq(plans.stripePriceId, priceId)) : [];
	const quantity = sub.items.data[0]?.quantity ?? subRow.quantity ?? 1;
	const periodEnd = sub.items.data[0]?.current_period_end;
	await db.update(subscriptions).set({
		status: mapStatus(sub.status),
		planId: plan?.id ?? subRow.planId,
		quantity,
		currentPeriodEnd: periodEnd ? /* @__PURE__ */ new Date(periodEnd * 1e3) : null,
		cancelAtPeriodEnd: sub.cancel_at_period_end,
		pendingPlanId: null,
		pendingPlanAt: null
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
	await db.insert(deliveries).values({
		subscriberId,
		subscriptionId,
		addressId: targetAddressId,
		scheduledDate: nextSaturday(),
		status: "scheduled"
	});
}
async function sendMagicLink(email, name, request) {
	const randomPassword = Math.random().toString(36).slice(2, 10);
	console.log(randomPassword);
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
					const giftOrderId = session.metadata?.giftOrderId;
					const guestOrderId = session.metadata?.guestOrderId;
					const kind = session.metadata?.kind;
					const email = session.customer_details?.email;
					const addressId = session.metadata?.addressId;
					const name = session.customer_details?.name;
					console.log(name, email);
					if (!giftOrderId && !guestOrderId) break;
					if (giftOrderId) {
						const [before] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
						const alreadyPaid = before?.status === "paid" || before?.status === "fulfilled";
						await db.update(giftOrders).set({
							status: "paid",
							stripePaymentIntentId: session.payment_intent
						}).where(eq(giftOrders.id, giftOrderId));
						if (alreadyPaid) break;
						try {
							const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
							if (order) {
								const amountLabel = money(session.amount_total ?? 0);
								const addonIds = (session.metadata?.addonIds ?? "").split(",").filter(Boolean);
								const addonNames = addonIds.length ? (await db.select().from(addons)).filter((a) => addonIds.includes(a.id)).map((a) => a.name) : [];
								const addr = order.recipientAddress;
								const addressLines = [
									order.recipientName,
									addr.line1,
									addr.line2 ?? "",
									addr.city,
									addr.postcode
								];
								const deliveryLabel = deliveryFmt.format(nextSaturday());
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
						await db.update(guestOrders).set({
							status: "paid",
							addressId,
							stripePaymentIntentId: session.payment_intent
						}).where(eq(guestOrders.id, guestOrderId));
						if (alreadyPaid) break;
						try {
							const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
							if (order) {
								const amountLabel = money(session.amount_total ?? 0);
								const addonIds = (session.metadata?.addonIds ?? "").split(",").filter(Boolean);
								const addonNames = addonIds.length ? (await db.select().from(addons)).filter((a) => addonIds.includes(a.id)).map((a) => a.name) : [];
								const addr = order.recipientAddress;
								const addressLines = [
									order.recipientName ?? "",
									addr.line1,
									addr.line2 ?? "",
									addr.phone ?? "",
									addr.city,
									addr.postcode
								];
								const deliveryLabel = deliveryFmt.format(nextSaturday());
								await sendOrderConfirmed(email, {
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
								await sendMagicLink(email, name, request);
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
						const nextDeliveryLabel = deliveryFmt.format(nextSaturday());
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
//# sourceMappingURL=_server.ts.js-CQw43CC_.js.map
