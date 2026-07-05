import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

// Adjust to your project's paths.
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import {
	subscribers,
	plans,
	subscriberAddons,
	deliveries,
	addresses,
	giftOrders
} from '$lib/server/db/schema';
import {
	sendSubscriptionConfirmed,
	notifyAdminNewSubscriber,
	sendPaymentFailed,
	notifyAdminPaymentFailed,
	sendGiftReceived,
	notifyAdminGiftOrder
} from '$lib/server/email';

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

function mapStatus(s: Stripe.Subscription.Status): 'active' | 'paused' | 'cancelled' {
	if (s === 'canceled' || s === 'unpaid') return 'cancelled';
	if (s === 'paused') return 'paused';
	return 'active';
}

function nextSaturday(from = new Date()): Date {
	const d = new Date(from);
	const diff = (6 - d.getDay() + 7) % 7 || 7;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}

const deliveryFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const money = (pence: number) => `£${(pence / 100).toFixed(2)}`;

/** The DB mirrors Stripe: read plan/status/period straight off the subscription. */
async function syncSubscription(sub: Stripe.Subscription) {
	const [row] = await db.select().from(subscribers).where(eq(subscribers.stripeSubscriptionId, sub.id));
	if (!row) return;

	const priceId = sub.items.data[0]?.price.id;
	const [plan] = priceId ? await db.select().from(plans).where(eq(plans.stripePriceId, priceId)) : [];

	await db
		.update(subscribers)
		.set({
			status: mapStatus(sub.status),
			plan: plan?.slug ?? row.plan,
			currentPeriodEnd: new Date(sub.current_period_end * 1000),
			stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
			pendingPlan: null,
			pendingPlanAt: null
		})
		.where(eq(subscribers.id, row.id));
}

async function scheduleDelivery(subscriberId: string, addressId?: string) {
	let targetAddressId = addressId;
	if (!targetAddressId) {
		const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
		targetAddressId = (rows.find((a) => a.isPrimary) ?? rows[0])?.id;
	}
	if (!targetAddressId) return;
	await db.insert(deliveries).values({
		subscriberId,
		addressId: targetAddressId,
		scheduledDate: nextSaturday(),
		status: 'scheduled'
	});
}

export const POST: RequestHandler = async ({ request }) => {
	const sig = request.headers.get('stripe-signature');
	const body = await request.text(); // RAW body — required for signature verification

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig!, WEBHOOK_SECRET);
	} catch (e) {
		console.error('Webhook signature verification failed', e);
		throw error(400, 'Invalid signature');
	}

	try {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object as Stripe.Checkout.Session;

				/* ── One-time orders (one-off + gift): mode 'payment' ── */
				if (session.mode === 'payment') {
					const giftOrderId = session.metadata?.giftOrderId;
					const kind = session.metadata?.kind;
					if (!giftOrderId) break;

					await db
						.update(giftOrders)
						.set({ status: 'paid', stripePaymentIntentId: session.payment_intent as string })
						.where(eq(giftOrders.id, giftOrderId));

					try {
						const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
						if (order) {
							const amountLabel = money(session.amount_total ?? 0);
							if (kind === 'gift') {
								await sendGiftReceived(order.buyerEmail, {
									buyerName: order.buyerName ?? 'there',
									recipientName: order.recipientName,
									amountLabel
								});
								await notifyAdminGiftOrder({
									buyerName: order.buyerName ?? 'Guest',
									buyerEmail: order.buyerEmail,
									recipientName: order.recipientName,
									amountLabel
								});
							}
							// one-off (kind 'order'): add a self-order confirmation email here
						}
					} catch (e) {
						console.error('one-time order emails failed', e);
					}
					break;
				}

				/* ── New subscription: mode 'subscription' ── */
				if (session.mode !== 'subscription') break;

				const subscriptionId = session.subscription as string;
				const customerId = session.customer as string;
				const subscriberId = session.metadata?.subscriberId;
				const addressId = session.metadata?.addressId || undefined;
				const addonIds = (session.metadata?.addonIds ?? '').split(',').filter(Boolean);

				if (subscriberId) {
					await db
						.update(subscribers)
						.set({ stripeCustomerId: customerId, stripeSubscriptionId: subscriptionId, status: 'active' })
						.where(eq(subscribers.id, subscriberId));

					if (addonIds.length) {
						await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriberId, subscriberId));
						await db.insert(subscriberAddons).values(
							addonIds.map((addonId) => ({ subscriberId, addonId, quantity: 1 }))
						);
					}
				}

				const sub = await stripe.subscriptions.retrieve(subscriptionId);
				await syncSubscription(sub);
				if (subscriberId) await scheduleDelivery(subscriberId, addressId);

				if (subscriberId) {
					try {
						const [subRow] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
						if (subRow) {
							const [planRow] = subRow.plan
								? await db.select().from(plans).where(eq(plans.slug, subRow.plan))
								: [];
							const amountLabel = money(session.amount_total ?? planRow?.pricePence ?? 0);
							const planName = planRow?.name ?? subRow.plan ?? 'Subscription';
							const nextDeliveryLabel = deliveryFmt.format(nextSaturday());

							await sendSubscriptionConfirmed(subRow.email, {
								name: subRow.fullName ?? 'there',
								planName,
								amountLabel,
								nextDeliveryLabel
							});
							await notifyAdminNewSubscriber({
								name: subRow.fullName ?? '—',
								email: subRow.email,
								planName,
								amountLabel
							});
						}
					} catch (e) {
						console.error('subscription emails failed', e);
					}
				}
				break;
			}

			// Plan swap, pause/resume, cancel_at_period_end, renewal → sync.
			case 'customer.subscription.created':
			case 'customer.subscription.updated': {
				await syncSubscription(event.data.object as Stripe.Subscription);
				break;
			}

			case 'customer.subscription.deleted': {
				const sub = event.data.object as Stripe.Subscription;
				await db
					.update(subscribers)
					.set({ status: 'cancelled', pendingPlan: null, pendingPlanAt: null })
					.where(eq(subscribers.stripeSubscriptionId, sub.id));
				break;
			}

			// Recurring payment succeeded — new period; schedule next delivery.
			case 'invoice.paid': {
				const invoice = event.data.object as Stripe.Invoice;
				if (invoice.subscription) {
					const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
					await syncSubscription(sub);
					const [row] = await db
						.select()
						.from(subscribers)
						.where(eq(subscribers.stripeSubscriptionId, sub.id));
					if (row && invoice.billing_reason !== 'subscription_create') {
						await scheduleDelivery(row.id);
					}
				}
				break;
			}

			// Payment failed — notify customer + admin (first attempt only).
			case 'invoice.payment_failed': {
				const invoice = event.data.object as Stripe.Invoice;
				if (invoice.subscription && (invoice.attempt_count ?? 1) <= 1) {
					try {
						const [subRow] = await db
							.select()
							.from(subscribers)
							.where(eq(subscribers.stripeSubscriptionId, invoice.subscription as string));
						if (subRow) {
							await sendPaymentFailed(subRow.email, { name: subRow.fullName ?? 'there' });
							await notifyAdminPaymentFailed({ name: subRow.fullName ?? '—', email: subRow.email });
						}
					} catch (e) {
						console.error('payment-failed emails failed', e);
					}
				}
				break;
			}
		}
	} catch (e) {
		console.error('Webhook handler error', event.type, e);
		throw error(500, 'Webhook handler failed');
	}

	return json({ received: true });
};