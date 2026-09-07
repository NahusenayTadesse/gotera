import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { and, eq } from 'drizzle-orm';
import type Stripe from 'stripe';

// Adjust to your project's paths.
import { stripe } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import {
    subscribers,
    subscriptions,
    plans,
    subscriberAddons,
    deliveries,
    deliveryAddons,
    deliveryAddonPurchases,
    addresses,
    giftOrders,
    addons,
    guestOrders,
    user
} from '$lib/server/db/schema';
import {
    sendSubscriptionConfirmed,
    notifyAdminNewSubscriber,
    sendPaymentFailed,
    notifyAdminPaymentFailed,
    sendGiftReceived,
    notifyAdminGiftOrder,
    sendOrderConfirmed, notifyAdminOrder,
    sendAddonsAdded
} from '$lib/server/email';
import { auth } from '$lib/server/auth';
import { nextDeliveryDate } from '$lib/server/deliverySchedule';

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

function mapStatus(s: Stripe.Subscription.Status): 'pending' | 'active' | 'paused' | 'cancelled' {
    if (s === 'canceled' || s === 'unpaid') return 'cancelled';
    if (s === 'paused') return 'paused';
    return 'active';
}

const deliveryFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const money = (pence: number) => `£${(pence / 100).toFixed(2)}`;

/**
 * A one-off order's add-ons only ever exist in Stripe metadata (checkout.session
 * metadata's `addonIds`) — there's no `deliveries` row for a gift/guest order to hang a
 * `delivery_addons` join off. Snapshotting name + price here, once, at the moment the
 * order is paid, is what lets the dashboard and packing slips show what was bought
 * without re-deriving it from metadata (which could drift if the catalogue changes later).
 */
async function resolveAddonSnapshot(metadataAddonIds: string | undefined) {
    const addonIds = (metadataAddonIds ?? '').split(',').filter(Boolean);
    if (addonIds.length === 0) return [];

    // Deliberately NOT filtered by `isActive`: this runs after the customer has paid, and
    // an add-on deactivated between checkout and this webhook was still legitimately bought.
    // Filtering here would take the money and silently drop the item. The `isActive` gate
    // belongs on the sell side (/subscribe, /account, /addons/[token]), which it is on.
    const rows = (await db.select().from(addons)).filter((a) => addonIds.includes(a.id));
    return rows.map((a) => ({ id: a.id, name: a.name, pricePence: a.pricePence, quantity: 1 }));
}

/**
 * A paid one-off add-on bought from the pre-delivery reminder email's "Add extras"
 * link (see /addons/[token]). Deduped by `stripePaymentIntentId` in
 * `delivery_addon_purchases` so a retried `checkout.session.completed` can't double-add
 * quantity to `delivery_addons` — Stripe does not guarantee exactly-once delivery.
 */
async function handleDeliveryAddonPurchase(session: Stripe.Checkout.Session) {
    const deliveryId = session.metadata?.deliveryId;
    const rawItems = session.metadata?.items;
    const paymentIntentId = session.payment_intent as string | null;
    if (!deliveryId || !rawItems || !paymentIntentId) {
        console.error('delivery-addon webhook: missing metadata', session.id);
        return;
    }

    let requested: { id: string; quantity: number }[];
    try {
        requested = JSON.parse(rawItems);
    } catch {
        console.error('delivery-addon webhook: unparseable items metadata', rawItems);
        return;
    }

    const [alreadyProcessed] = await db
        .select({ id: deliveryAddonPurchases.id })
        .from(deliveryAddonPurchases)
        .where(eq(deliveryAddonPurchases.stripePaymentIntentId, paymentIntentId));
    if (alreadyProcessed) return;

    // Unfiltered on purpose — see `resolveAddonSnapshot`: the payment already succeeded,
    // so the customer gets what they paid for even if it was deactivated in the meantime.
    const catalogue = await db.select().from(addons);
    const items = requested
        .map((r) => {
            const addon = catalogue.find((a) => a.id === r.id);
            return addon
                ? { id: addon.id, name: addon.name, pricePence: addon.pricePence, quantity: r.quantity }
                : null;
        })
        .filter((i): i is { id: string; name: string; pricePence: number; quantity: number } => i !== null);
    if (items.length === 0) return;

    try {
        await db.insert(deliveryAddonPurchases).values({
            deliveryId,
            stripePaymentIntentId: paymentIntentId,
            amountPence: session.amount_total ?? items.reduce((sum, i) => sum + i.pricePence * i.quantity, 0),
            items
        });
    } catch {
        // Unique constraint on stripePaymentIntentId — a concurrent/retried delivery of
        // this same event beat us to it, so the add-ons are already applied.
        return;
    }

    for (const item of items) {
        const [existing] = await db
            .select()
            .from(deliveryAddons)
            .where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, item.id)));
        if (existing) {
            await db
                .update(deliveryAddons)
                .set({ quantity: existing.quantity + item.quantity })
                .where(eq(deliveryAddons.id, existing.id));
        } else {
            await db.insert(deliveryAddons).values({ deliveryId, addonId: item.id, quantity: item.quantity });
        }
    }

    try {
        const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, deliveryId));
        const [subscriber] = delivery
            ? await db.select().from(subscribers).where(eq(subscribers.id, delivery.subscriberId))
            : [];
        if (delivery && subscriber) {
            await sendAddonsAdded(subscriber.email, {
                name: subscriber.fullName ?? 'there',
                deliveryLabel: deliveryFmt.format(delivery.scheduledDate),
                amountLabel: money(session.amount_total ?? 0),
                addonLines: items.map((i) => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ''}`)
            });
        }
    } catch (e) {
        console.error('delivery-addon confirmation email failed', e);
    }
}

/** The DB mirrors Stripe: read plan/status/period straight off the subscription. */
async function syncSubscription(sub: Stripe.Subscription) {
    const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
    if (!subRow) return;

    const priceId = sub.items.data[0]?.price.id;
    const [plan] = priceId ? await db.select().from(plans).where(eq(plans.stripePriceId, priceId)) : [];

    const quantity = sub.items.data[0]?.quantity ?? subRow.quantity ?? 1;
    const periodEnd = sub.items.data[0]?.current_period_end;
    const nextPeriodEnd = periodEnd ? new Date(periodEnd * 1000) : null;

    // A scheduled plan switch (see /account/change-plan) puts the new price on the Stripe
    // subscription straight away, but it only bills — and only counts — from the next
    // renewal. Until the period actually rolls over, keep showing the plan they're still
    // being delivered, and hold on to the pending switch.
    // Measure the rollover against the date the switch was scheduled for, not against the
    // stored period end: a renewal pushes the period a whole month past it, while ordinary
    // drift between our copy and Stripe's is seconds. A day of grace keeps that drift from
    // being mistaken for a renewal and applying the new plan early.
    const ROLLOVER_GRACE_MS = 24 * 60 * 60 * 1000;
    const periodRolledOver =
        !!nextPeriodEnd &&
        !!subRow.pendingPlanAt &&
        nextPeriodEnd.getTime() > subRow.pendingPlanAt.getTime() + ROLLOVER_GRACE_MS;
    const switchStillPending =
        !!subRow.pendingPlanId && plan?.id === subRow.pendingPlanId && !periodRolledOver;

    await db
        .update(subscriptions)
        .set({
            status: mapStatus(sub.status),
            planId: switchStillPending ? subRow.planId : (plan?.id ?? subRow.planId),
            quantity,
            currentPeriodEnd: nextPeriodEnd,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            pendingPlanId: switchStillPending ? subRow.pendingPlanId : null,
            pendingPlanAt: switchStillPending ? subRow.pendingPlanAt : null
        })
        .where(eq(subscriptions.id, subRow.id));
}

async function scheduleDelivery(subscriberId: string, subscriptionId: string, addressId?: string) {
    let targetAddressId = addressId;
    
    // If no address was passed in metadata, check the subscription configuration or fallback to primary
    if (!targetAddressId) {
        const [subConfig] = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId));
        if (subConfig?.addressId) {
            targetAddressId = subConfig.addressId;
        } else {
            const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
            targetAddressId = (rows.find((a) => a.isPrimary) ?? rows[0])?.id;
        }
    }
    
    if (!targetAddressId) return;

    await db.insert(deliveries).values({
        subscriberId,
        subscriptionId,
        addressId: targetAddressId,
        scheduledDate: await nextDeliveryDate(),
        status: 'scheduled'
    });
}


 async function sendMagicLink(email: string, name: string, request: Request) {
const randomPassword = Math.random().toString(36).slice(2, 10);

    const [existingUser] = await db.select({ id: user.id}).from(user).where(eq(user.email, email)).limit(1);

    if(existingUser) return;

 await auth.api.createUser({
    body: {
        email: email, 
        name: name, // required,
        password: randomPassword,
        role: "user",
    },
});


	await auth.api.signInMagicLink({
				body: {
					email: email,
					callbackURL: '/account' 
				},
				headers: request.headers
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
	if (session.metadata?.kind === 'delivery-addon') {
		await handleDeliveryAddonPurchase(session);
		break;
	}

	const giftOrderId = session.metadata?.giftOrderId;
    const guestOrderId = session.metadata?.guestOrderId;
	const kind = session.metadata?.kind;
    const email = session.customer_details?.email;
    const addressId = session.metadata?.addressId;
  const name  = session.customer_details?.name;

	if (!giftOrderId && !guestOrderId) break;
 
	if(giftOrderId) {
	const [before] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
	const alreadyPaid = before?.status === 'paid' || before?.status === 'fulfilled';
	const addonSnapshot = await resolveAddonSnapshot(session.metadata?.addonIds);

	await db
		.update(giftOrders)
		.set({
			status: 'paid',
			stripePaymentIntentId: session.payment_intent as string,
			addons: addonSnapshot.length ? addonSnapshot : null
		})
		.where(eq(giftOrders.id, giftOrderId));

	if (alreadyPaid) break;

	try {
		const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
		if (order) {
			const amountLabel = money(session.amount_total ?? 0);
			const addonNames = addonSnapshot.map((a) => a.name);

			const addr = order.recipientAddress as {
				line1: string;
				line2: string | null;
				city: string;
				postcode: string;
			};
			const addressLines = [
				order.recipientName,
				addr.line1,
				addr.line2 ?? '',
				addr.city,
				addr.postcode
			];
			const deliveryLabel = deliveryFmt.format(await nextDeliveryDate());
 
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
			} else {
				// kind === 'order' — a one-off for the buyer themselves.
				await sendOrderConfirmed(order.buyerEmail, {
					name: order.buyerName ?? 'there',
					amountLabel,
					deliveryLabel,
					addressLines,
					addonNames
				});
				await notifyAdminOrder({
					buyerName: order.buyerName ?? 'Guest',
					buyerEmail: order.buyerEmail,
					amountLabel,
					deliveryLabel,
					addressLines,
					addonNames
				});
			}
		}
	} catch (e) {
		console.error('one-time order emails failed', e);
	}
	break;
} 

	if(guestOrderId) {
	const [before] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
	const alreadyPaid = before?.status === 'paid' || before?.status === 'fulfilled';
	const addonSnapshot = await resolveAddonSnapshot(session.metadata?.addonIds);

	// The guest never gave us an email or a name before Stripe — Checkout collected
	// both, so this is the only place they can be recorded. Keep the recipient name
	// the form captured; only fall back to the billing name when there wasn't one.
	await db
		.update(guestOrders)
		.set({
			status: 'paid',
			addressId,
			buyerEmail: email ?? before?.buyerEmail ?? null,
			buyerName: name ?? before?.buyerName ?? null,
			recipientName: before?.recipientName ?? name ?? null,
			stripePaymentIntentId: session.payment_intent as string,
			addons: addonSnapshot.length ? addonSnapshot : null
		})
		.where(eq(guestOrders.id, guestOrderId));

	if (alreadyPaid) break;

	try {
		const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
		if (order) {
			const amountLabel = money(session.amount_total ?? 0);
			const addonNames = addonSnapshot.map((a) => a.name);

			const addr = order.recipientAddress as {
				line1: string;
				line2: string | null;
				city: string;
				postcode: string;
                phone: string | null;
			};
			const addressLines = [
				order.recipientName ?? '',
				addr.line1,
				addr.line2 ?? '',
                addr.phone ?? '',
				addr.city,
				addr.postcode
			];
			const deliveryLabel = deliveryFmt.format(await nextDeliveryDate());

             
               


			
				// kind === 'order' — a one-off for the buyer themselves.
				if (email) {
					await sendOrderConfirmed(email, {
						name: name ?? 'there',
						amountLabel,
						deliveryLabel,
						addressLines,
						addonNames
					});
				}
				await notifyAdminOrder({
					buyerName: name ?? 'Guest',
					buyerEmail: email ?? 'Unknown',
					amountLabel,
					deliveryLabel,
					addressLines,
					addonNames
				});

				// Give the guest an account so the order shows up under /account.
				if (email) await sendMagicLink(email, name ?? 'there', request);

			}
		
	} catch (e) {
		console.error('one-time order emails failed', e);
	}
	break;
} 
            }
        
    

                /* ── New subscription: mode 'subscription' ── */
                if (session.mode !== 'subscription') break;

                const subscriptionId = session.subscription as string;
                const customerId = session.customer as string;
                const subscriberId = session.metadata?.subscriberId;
                const dbSubscriptionId = session.metadata?.subscriptionId; // Assuming passed from checkout initialization
                const addressId = session.metadata?.addressId || undefined;
                const addonIds = (session.metadata?.addonIds ?? '').split(',').filter(Boolean);

                if (subscriberId) {
                    // Update the customer record with the customer ID
                    await db
                        .update(subscribers)
                        .set({ stripeCustomerId: customerId })
                        .where(eq(subscribers.id, subscriberId));

                    // Update or target the specific subscription record
                    if (dbSubscriptionId) {
                        await db
                            .update(subscriptions)
                            .set({ 
                                stripeSubscriptionId: subscriptionId, 
                                status: 'active',
                                addressId: addressId 
                            })
                            .where(eq(subscriptions.id, dbSubscriptionId));

                        // Insert recurring add-ons linked to both subscriber AND subscription
                        if (addonIds.length) {
                            await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriptionId, dbSubscriptionId));
                            await db.insert(subscriberAddons).values(
                                addonIds.map((addonId) => ({ 
                                    id: crypto.randomUUID(),
                                    subscriberId, 
                                    subscriptionId: dbSubscriptionId,
                                    addonId, 
                                    quantity: 1 
                                }))
                            );
                        }
                    }
                }

                const sub = await stripe.subscriptions.retrieve(subscriptionId);
                await syncSubscription(sub);
                
                if (subscriberId && dbSubscriptionId) {
                    await scheduleDelivery(subscriberId, dbSubscriptionId, addressId);
                }

                if (subscriberId && dbSubscriptionId) {
                    try {
                        const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
                        const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.id, dbSubscriptionId));
                        
                        if (subUser && subRow) {
                            const [planRow] = await db.select().from(plans).where(eq(plans.id, subRow.planId));
                            const amountLabel = money(session.amount_total ?? planRow?.pricePence ?? 0);
                            const planName = planRow?.name ?? 'Subscription';
                            const nextDeliveryLabel = deliveryFmt.format(await nextDeliveryDate());

                            await sendSubscriptionConfirmed(subUser.email, {
                                name: subUser.fullName ?? 'there',
                                planName,
                                amountLabel,
                                nextDeliveryLabel
                            });
                            await notifyAdminNewSubscriber({
                                name: subUser.fullName ?? '—',
                                email: subUser.email,
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
                    .update(subscriptions)
                    .set({ status: 'cancelled', pendingPlanId: null, pendingPlanAt: null })
                    .where(eq(subscriptions.stripeSubscriptionId, sub.id));
                break;
            }

            // Recurring payment succeeded — new period; schedule next delivery.
            case 'invoice.paid': {
                const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
                if (invoice.subscription) {
                    const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
                    await syncSubscription(sub);
                    
                    const [subRow] = await db
                        .select()
                        .from(subscriptions)
                        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
                        
                    if (subRow && invoice.billing_reason !== 'subscription_create') {
                        await scheduleDelivery(subRow.subscriberId, subRow.id);
                    }
                }
                break;
            }

            // Payment failed — notify customer + admin (first attempt only).
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
                if (invoice.subscription && (invoice.attempt_count ?? 1) <= 1) {
                    try {
                        const [subRow] = await db
                            .select()
                            .from(subscriptions)
                            .where(eq(subscriptions.stripeSubscriptionId, invoice.subscription as string));
                            
                        if (subRow) {
                            const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subRow.subscriberId));
                            if (subUser) {
                                await sendPaymentFailed(subUser.email, { name: subUser.fullName ?? 'there' });
                                await notifyAdminPaymentFailed({ name: subUser.fullName ?? '—', email: subUser.email });
                            }
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