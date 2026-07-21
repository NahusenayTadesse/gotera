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
    subscriptions,
    plans,
    subscriberAddons,
    deliveries,
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
    sendOrderConfirmed, notifyAdminOrder
} from '$lib/server/email';
import { auth } from '$lib/server/auth';

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

function mapStatus(s: Stripe.Subscription.Status): 'pending' | 'active' | 'paused' | 'cancelled' {
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
    const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id));
    if (!subRow) return;

    const priceId = sub.items.data[0]?.price.id;
    const [plan] = priceId ? await db.select().from(plans).where(eq(plans.stripePriceId, priceId)) : [];

 const periodEnd = sub.items.data[0]?.current_period_end;
    await db
        .update(subscriptions)
        .set({
            status: mapStatus(sub.status),
            planId: plan?.id ?? subRow.planId,
            currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            pendingPlanId: null,
            pendingPlanAt: null
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
        scheduledDate: nextSaturday(),
        status: 'scheduled'
    });
}


 async function sendMagicLink(email: string, name: string, request: Request) {
const randomPassword = Math.random().toString(36).slice(2, 10);

console.log(randomPassword);    

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
    // console.log("SIG ", sig)
    // console.log("BODY ", body)

  
  // 2. Safely extract the email and name using optional chaining


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
                // if (session.mode === 'payment') {
                //     const giftOrderId = session.metadata?.giftOrderId;
                //     const kind = session.metadata?.kind;
                //     if (!giftOrderId) break;

                //     await db
                //         .update(giftOrders)
                //         .set({ status: 'paid', stripePaymentIntentId: session.payment_intent as string })
                //         .where(eq(giftOrders.id, giftOrderId));

                //     try {
                //         const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
                //         if (order) {
                //             const amountLabel = money(session.amount_total ?? 0);
                //             if (kind === 'gift') {
                //                 await sendGiftReceived(order.buyerEmail, {
                //                     buyerName: order.buyerName ?? 'there',
                //                     recipientName: order.recipientName,
                //                     amountLabel
                //                 });
                //                 await notifyAdminGiftOrder({
                //                     buyerName: order.buyerName ?? 'Guest',
                //                     buyerEmail: order.buyerEmail,
                //                     recipientName: order.recipientName,
                //                     amountLabel
                //                 });
                //             }
                //             // one-off (kind 'order'): add a self-order confirmation email here
                //         }
                //     } catch (e) {
                //         console.error('one-time order emails failed', e);
                //     }
                //     break;
                // }
            
if (session.mode === 'payment') {
	const giftOrderId = session.metadata?.giftOrderId;
    const guestOrderId = session.metadata?.guestOrderId;
	const kind = session.metadata?.kind;
    const email = session.customer_details?.email;
    const addressId = session.metadata?.addressId;
  const name  = session.customer_details?.name;
  console.log(name, email)
    

	if (!giftOrderId && !guestOrderId) break;
 
	if(giftOrderId) {
	const [before] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
	const alreadyPaid = before?.status === 'paid' || before?.status === 'fulfilled';
 
	await db
		.update(giftOrders)
		.set({ status: 'paid', stripePaymentIntentId: session.payment_intent as string })
		.where(eq(giftOrders.id, giftOrderId));
 
	if (alreadyPaid) break;
 
	try {
		const [order] = await db.select().from(giftOrders).where(eq(giftOrders.id, giftOrderId));
		if (order) {
			const amountLabel = money(session.amount_total ?? 0);
 
			// Resolve add-on names for the email (metadata carries the ids).
			const addonIds = (session.metadata?.addonIds ?? '').split(',').filter(Boolean);
			const addonNames = addonIds.length
				? (await db.select().from(addons))
						.filter((a) => addonIds.includes(a.id))
						.map((a) => a.name)
				: [];
 
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
			const deliveryLabel = deliveryFmt.format(nextSaturday());
 
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
 
	await db
		.update(guestOrders)
		.set({ status: 'paid', addressId, stripePaymentIntentId: session.payment_intent as string })
		.where(eq(guestOrders.id, guestOrderId));

    
 
	if (alreadyPaid) break;
 
	try {
		const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, guestOrderId));
		if (order) {
			const amountLabel = money(session.amount_total ?? 0);
 
			// Resolve add-on names for the email (metadata carries the ids).
			const addonIds = (session.metadata?.addonIds ?? '').split(',').filter(Boolean);
			const addonNames = addonIds.length
				? (await db.select().from(addons))
						.filter((a) => addonIds.includes(a.id))
						.map((a) => a.name)
				: [];
 
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
			const deliveryLabel = deliveryFmt.format(nextSaturday());

             
               


			
				// kind === 'order' — a one-off for the buyer themselves.
				await sendOrderConfirmed(email, {
					name: name ?? 'there',
					amountLabel,
					deliveryLabel,
					addressLines,
					addonNames
				});
				await notifyAdminOrder({
					buyerName: name ?? 'Guest',
					buyerEmail: email ?? 'Unknown',
					amountLabel,
					deliveryLabel,
					addressLines,
					addonNames
				});
                 

                await sendMagicLink(email, name, request)

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
                            const nextDeliveryLabel = deliveryFmt.format(nextSaturday());

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