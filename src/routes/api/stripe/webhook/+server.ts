import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

// Adjust to your project's paths.
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import { subscribers, plans, subscriberAddons, deliveries, addresses } from '$lib/server/db/schema';

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

/** Map Stripe's subscription status onto your subscribers.status enum. */
function mapStatus(s: Stripe.Subscription.Status): 'active' | 'paused' | 'cancelled' {
	if (s === 'canceled' || s === 'unpaid') return 'cancelled';
	if (s === 'paused') return 'paused';
	// active | trialing | past_due | incomplete | incomplete_expired → treat as active
	// (consider adding 'past_due' to the enum if you want to surface it)
	return 'active';
}

function nextSaturday(from = new Date()): Date {
	const d = new Date(from);
	const diff = (6 - d.getDay() + 7) % 7 || 7;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}

/** The DB mirrors Stripe: read plan/status/period straight off the subscription. */
async function syncSubscription(sub: Stripe.Subscription) {
	const [row] = await db
		.select()
		.from(subscribers)
		.where(eq(subscribers.stripeSubscriptionId, sub.id));
	if (!row) return;

	const priceId = sub.items.data[0]?.price.id;
	const [plan] = priceId
		? await db.select().from(plans).where(eq(plans.stripePriceId, priceId))
		: [];

	await db
		.update(subscribers)
		.set({
			status: mapStatus(sub.status),
			plan: plan?.slug ?? row.plan,
			currentPeriodEnd: new Date(sub.current_period_end * 1000),
			stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
			// A confirmed change is now live in Stripe, so clear any scheduled intent.
			pendingPlan: null,
			pendingPlanAt: null
		})
		.where(eq(subscribers.id, row.id));
}

/** Schedule a delivery to the subscriber's primary address for a given cycle. */
async function scheduleDelivery(subscriberId: string, addressId?: string) {
	let targetAddressId = addressId;
	if (!targetAddressId) {
		const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
		targetAddressId = (rows.find((a) => a.isPrimary) ?? rows[0])?.id;
	}
	if (!targetAddressId) return; // no address on file yet
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
			// First payment for a new subscription succeeded.
			case 'checkout.session.completed': {
				const session = event.data.object as Stripe.Checkout.Session;
				if (session.mode !== 'subscription') break;

				const subscriptionId = session.subscription as string;
				const customerId = session.customer as string;
				const subscriberId = session.metadata?.subscriberId;
				const addressId = session.metadata?.addressId || undefined;
				const addonIds = (session.metadata?.addonIds ?? '').split(',').filter(Boolean);

				if (subscriberId) {
					await db
						.update(subscribers)
						.set({
							stripeCustomerId: customerId,
							stripeSubscriptionId: subscriptionId,
							status: 'active'
						})
						.where(eq(subscribers.id, subscriberId));

					if (addonIds.length) {
						await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriberId, subscriberId));
						await db.insert(subscriberAddons).values(
							addonIds.map((addonId) => ({ subscriberId, addonId, quantity: 1 }))
						);
					}
				}

				// Sync plan/status/period, then schedule the first delivery.
				const sub = await stripe.subscriptions.retrieve(subscriptionId);
				await syncSubscription(sub);
				if (subscriberId) await scheduleDelivery(subscriberId, addressId);
				break;
			}

			// Any change: plan swap, pause/resume, status change, renewal.
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

			// Recurring payment succeeded — new period; schedule the next delivery.
			case 'invoice.paid': {
				const invoice = event.data.object as Stripe.Invoice;
				if (invoice.subscription) {
					const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
					await syncSubscription(sub);
					const [row] = await db
						.select()
						.from(subscribers)
						.where(eq(subscribers.stripeSubscriptionId, sub.id));
					// Skip the very first invoice (delivery already scheduled at checkout).
					if (row && invoice.billing_reason !== 'subscription_create') {
						await scheduleDelivery(row.id);
					}
				}
				break;
			}

			// Payment failed — surface it / email the customer.
			case 'invoice.payment_failed': {
				const invoice = event.data.object as Stripe.Invoice;
				console.warn('Payment failed for subscription', invoice.subscription);
				// e.g. mark past_due, send a dunning email, etc.
				break;
			}
		}
	} catch (e) {
		// Return 500 so Stripe retries the event.
		console.error('Webhook handler error', event.type, e);
		throw error(500, 'Webhook handler failed');
	}

	return json({ received: true });
};