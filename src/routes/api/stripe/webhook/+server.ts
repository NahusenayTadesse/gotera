import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { and, desc, eq, isNull, sql } from 'drizzle-orm';
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
    guestOrders
} from '$lib/server/db/schema';
import {
    sendSubscriptionConfirmed,
    notifyAdminNewSubscriber,
    sendPaymentFailed,
    notifyAdminPaymentFailed,
    sendGiftReceived,
    notifyAdminGiftOrder,
    sendOrderConfirmed, notifyAdminOrder,
    sendAddonsAdded,
    sendDeliveryRolled
} from '$lib/server/email';
import { auth } from '$lib/server/auth';
import { nextDeliveryDate, nextDeliveryDateIgnoringCapacity } from '$lib/server/deliverySchedule';
import { consumeStock, deliveryUnits, notify, reserveOrderStock } from '$lib/server/stock';
import { invoiceSubscriptionId } from '$lib/server/stripeInvoice';
import { toCalendarString } from '$lib/format';
import { planForStripePrice, subscriptionUnitPrice } from '$lib/server/plans';

const WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;

/**
 * Stripe's view of a subscription -> our status enum.
 *
 * Takes the whole subscription, not just `status`, because a subscription paused with
 * `pause_collection` keeps reporting `status: 'active'` — Stripe only reports 'paused'
 * for trial-based pauses. Reading `status` alone therefore flipped every customer-paused
 * plan straight back to active on the next `customer.subscription.updated` event, and
 * billing resumed behind their back.
 */
function mapStatus(sub: Stripe.Subscription): 'pending' | 'active' | 'paused' | 'cancelled' {
    if (sub.status === 'canceled' || sub.status === 'unpaid') return 'cancelled';
    if (sub.status === 'paused' || sub.pause_collection) return 'paused';
    return 'active';
}

const deliveryFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const money = (pence: number) => `£${(pence / 100).toFixed(2)}`;

const idOf = (ref: string | { id: string } | null | undefined) =>
    ref ? (typeof ref === 'string' ? ref : ref.id) : null;

/** MySQL unique-key violation, whether or not drizzle wrapped the driver error. */
function isDuplicateKey(e: unknown): boolean {
    const err = e as { code?: string; cause?: { code?: string } } | null;
    return err?.code === 'ER_DUP_ENTRY' || err?.cause?.code === 'ER_DUP_ENTRY';
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
function parseAddonMetadata(raw: string | undefined): { id: string; quantity: number }[] {
    return (raw ?? '')
        .split(',')
        .filter(Boolean)
        .map((entry) => {
            const [id, qty] = entry.split(':');
            const n = Number(qty);
            return {
                id,
                quantity: Number.isFinite(n) ? Math.min(20, Math.max(1, Math.trunc(n))) : 1
            };
        })
        .filter((e) => e.id);
}

async function resolveAddonSnapshot(metadataAddonIds: string | undefined) {
    const requested = parseAddonMetadata(metadataAddonIds);
    if (requested.length === 0) return [];

    // Deliberately NOT filtered by `isActive`: this runs after the customer has paid, and
    // an add-on deactivated between checkout and this webhook was still legitimately bought.
    // Filtering here would take the money and silently drop the item. The `isActive` gate
    // belongs on the sell side (/subscribe, /account, /addons/[token]), which it is on.
    const catalogue = await db.select().from(addons);
    return requested
        .map((r) => {
            const a = catalogue.find((c) => c.id === r.id);
            return a
                ? { id: a.id, name: a.name, pricePence: a.pricePence, quantity: r.quantity }
                : null;
        })
        .filter((x): x is { id: string; name: string; pricePence: number; quantity: number } => x !== null);
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

    // The dedupe row and the quantity changes commit together: if anything fails midway
    // the whole purchase rolls back, so Stripe's retry applies it in full instead of
    // finding a "processed" marker for items that were never added.
    try {
        await db.transaction(async (tx) => {
            await tx.insert(deliveryAddonPurchases).values({
                deliveryId,
                stripePaymentIntentId: paymentIntentId,
                amountPence: session.amount_total ?? items.reduce((sum, i) => sum + i.pricePence * i.quantity, 0),
                items
            });

            for (const item of items) {
                // Locked, and incremented in SQL, so a concurrent edit from /account or the
                // dashboard can't be lost to a read-modify-write race.
                const [existing] = await tx
                    .select({ id: deliveryAddons.id })
                    .from(deliveryAddons)
                    .where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, item.id)))
                    .for('update');
                if (existing) {
                    await tx
                        .update(deliveryAddons)
                        .set({ quantity: sql`${deliveryAddons.quantity} + ${item.quantity}` })
                        .where(eq(deliveryAddons.id, existing.id));
                } else {
                    await tx.insert(deliveryAddons).values({ deliveryId, addonId: item.id, quantity: item.quantity });
                }
            }
        });
    } catch (e) {
        // Unique constraint on stripePaymentIntentId — a concurrent/retried delivery of
        // this same event beat us to it, so the add-ons are already applied.
        if (isDuplicateKey(e)) return;
        throw e;
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

    const price = sub.items.data[0]?.price;
    const priceId = price?.id;
    // Matches older Prices too, so a customer still billed at a pre-change price keeps
    // their plan instead of it silently resolving to nothing.
    const plan = priceId ? await planForStripePrice(priceId) : undefined;

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
            status: mapStatus(sub),
            planId: switchStillPending ? subRow.planId : (plan?.id ?? subRow.planId),
            quantity,
            currentPeriodEnd: nextPeriodEnd,
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            pendingPlanId: switchStillPending ? subRow.pendingPlanId : null,
            pendingPlanAt: switchStillPending ? subRow.pendingPlanAt : null,
            // What Stripe bills them. Held back with the plan during a pending switch: the
            // new Price is already on the Stripe subscription but doesn't bill until renewal.
            stripePriceId: switchStillPending ? subRow.stripePriceId : (priceId ?? subRow.stripePriceId),
            unitPricePence: switchStillPending
                ? subRow.unitPricePence
                : (price?.unit_amount ?? subRow.unitPricePence)
        })
        .where(eq(subscriptions.id, subRow.id));
}

/**
 * Book the delivery a paid invoice entitles the subscriber to.
 *
 * Keyed on the invoice: `deliveries.stripe_invoice_id` is unique, so a retried webhook
 * (Stripe delivers at least once) hits the constraint and books nothing. Returns whether
 * a delivery was actually created, so callers only send confirmations once.
 */
async function scheduleDelivery(
    subscriberId: string,
    subscriptionId: string,
    addressId: string | undefined,
    invoiceId: string | null
): Promise<boolean> {
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
    
    if (!targetAddressId) return false;

    // The date the customer would have got if nothing were full, so we can tell whether
    // capacity actually moved them and only notify when it did.
    const soonest = await nextDeliveryDateIgnoringCapacity();
    const scheduledDate = await nextDeliveryDate();

    const units = await deliveryUnits(subscriptionId);

    // Freeze what this delivery is — plan, packs, quantity and the price billed — so order
    // history doesn't change when the plan or its price does later.
    const [snapshot] = await db
        .select({
            planId: subscriptions.planId,
            packs: plans.packs,
            quantity: subscriptions.quantity,
            unitPricePence: subscriptionUnitPrice
        })
        .from(subscriptions)
        .innerJoin(plans, eq(plans.id, subscriptions.planId))
        .where(eq(subscriptions.id, subscriptionId));

    try {
        await db.insert(deliveries).values({
            subscriberId,
            subscriptionId,
            addressId: targetAddressId,
            scheduledDate,
            status: 'scheduled',
            stripeInvoiceId: invoiceId,
            stockUnits: units,
            stockDate: scheduledDate,
            planId: snapshot?.planId ?? null,
            packs: snapshot?.packs ?? null,
            quantity: snapshot?.quantity ?? null,
            unitPricePence: snapshot?.unitPricePence ?? null
        });
    } catch (e) {
        if (isDuplicateKey(e)) return false; // this invoice's delivery is already booked
        throw e;
    }

    // Reserve capacity for the date actually booked. `nextDeliveryDate` already skipped
    // full Saturdays, so this normally fits; if a concurrent order took the last units in
    // between, the paid delivery still stands and is recorded past capacity, so the stock
    // dashboard shows the date as over-booked rather than silently under-counting it.
    const reserved = await consumeStock(scheduledDate, units, null, { allowOver: true });
    if (reserved.row.used > reserved.row.capacity) {
        console.error('stock: booked a delivery past capacity (date filled up concurrently)', scheduledDate);
    }

    if (toCalendarString(scheduledDate) !== toCalendarString(soonest)) {
        const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
        if (subscriber) {
            const originalLabel = deliveryFmt.format(soonest);
            const deliveryLabel = deliveryFmt.format(scheduledDate);

            await notify(
                subscriberId,
                'delivery-rolled',
                `Your first delivery is ${deliveryLabel}`,
                `Our ${originalLabel} run was fully booked, so we've scheduled you for the next one.`
            );

            try {
                await sendDeliveryRolled(subscriber.email, {
                    name: subscriber.fullName ?? 'there',
                    originalLabel,
                    deliveryLabel
                });
            } catch (e) {
                console.error('delivery-rolled email failed', e);
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
async function sendMagicLink(email: string, name?: string) {
    await auth.api.signInMagicLink({
        body: { email, name, callbackURL: '/account' },
        headers: new Headers()
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
			addons: addonSnapshot.length ? addonSnapshot : null,
			amountPence: session.amount_total ?? before?.amountPence ?? null
		})
		.where(eq(giftOrders.id, giftOrderId));

	// Book it onto the next delivery date and reserve its stock. Idempotent (an order
	// already holding stock is skipped), so it also runs on retries.
	if (before) await reserveOrderStock('gift', giftOrderId, Math.max(1, before.quantity), await nextDeliveryDate());

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
			const deliveryLabel = deliveryFmt.format(order.deliveryDate ?? (await nextDeliveryDate()));
 
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
			addons: addonSnapshot.length ? addonSnapshot : null,
			amountPence: session.amount_total ?? before?.amountPence ?? null
		})
		.where(eq(guestOrders.id, guestOrderId));

	if (before) {
		if (kind === 'addons') {
			// Add-ons bought on their own from /addons: no injera, so nothing to take from the
			// main-product stock. It still rides the next delivery run, which capacity doesn't
			// gate — a full injera Saturday has room for a jar of berbere.
			await db
				.update(guestOrders)
				.set({ deliveryDate: await nextDeliveryDateIgnoringCapacity() })
				.where(and(eq(guestOrders.id, guestOrderId), isNull(guestOrders.deliveryDate)));
		} else {
			await reserveOrderStock('guest', guestOrderId, Math.max(1, before.quantity), await nextDeliveryDate());
		}
	}

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
			const deliveryLabel = deliveryFmt.format(order.deliveryDate ?? (await nextDeliveryDate()));

             
               


			
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
				// Signed-in shoppers on /addons already have one.
				if (email && session.metadata?.signedIn !== '1') await sendMagicLink(email, name ?? undefined);

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
                const addonItems = parseAddonMetadata(session.metadata?.addonIds);

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

                        // Insert recurring add-ons linked to both subscriber AND subscription,
                        // at the quantity the customer actually picked and paid for.
                        if (addonItems.length) {
                            await db.delete(subscriberAddons).where(eq(subscriberAddons.subscriptionId, dbSubscriptionId));
                            await db.insert(subscriberAddons).values(
                                addonItems.map((item) => ({
                                    id: crypto.randomUUID(),
                                    subscriberId,
                                    subscriptionId: dbSubscriptionId,
                                    addonId: item.id,
                                    quantity: item.quantity
                                }))
                            );
                        }
                    }
                }

                const sub = await stripe.subscriptions.retrieve(subscriptionId);
                await syncSubscription(sub);

                // Keyed on the first invoice, so a retried event books (and emails) nothing.
                const booked =
                    subscriberId && dbSubscriptionId
                        ? await scheduleDelivery(subscriberId, dbSubscriptionId, addressId, idOf(session.invoice))
                        : false;

                if (booked && subscriberId && dbSubscriptionId) {
                    try {
                        const [subUser] = await db.select().from(subscribers).where(eq(subscribers.id, subscriberId));
                        const [subRow] = await db.select().from(subscriptions).where(eq(subscriptions.id, dbSubscriptionId));
                        
                        if (subUser && subRow) {
                            const [planRow] = await db.select().from(plans).where(eq(plans.id, subRow.planId));
                            const amountLabel = money(session.amount_total ?? planRow?.pricePence ?? 0);
                            const planName = planRow?.name ?? 'Subscription';
                            const [firstDelivery] = await db
                                .select({ scheduledDate: deliveries.scheduledDate })
                                .from(deliveries)
                                .where(eq(deliveries.subscriptionId, dbSubscriptionId))
                                .orderBy(desc(deliveries.createdAt))
                                .limit(1);
                            const nextDeliveryLabel = deliveryFmt.format(
                                firstDelivery?.scheduledDate ?? (await nextDeliveryDate())
                            );

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
                const invoice = event.data.object as Stripe.Invoice;
                const stripeSubId = invoiceSubscriptionId(invoice);
                if (stripeSubId) {
                    const sub = await stripe.subscriptions.retrieve(stripeSubId);
                    await syncSubscription(sub);
                    
                    const [subRow] = await db
                        .select()
                        .from(subscriptions)
                        .where(eq(subscriptions.stripeSubscriptionId, sub.id));
                        
                    // The first invoice's delivery is booked by checkout.session.completed (with
                    // the address from checkout); the unique invoice key makes overlap harmless.
                    if (subRow && invoice.billing_reason !== 'subscription_create') {
                        await scheduleDelivery(subRow.subscriberId, subRow.id, undefined, invoice.id ?? null);
                    }
                }
                break;
            }

            // Payment failed — notify customer + admin (first attempt only).
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                const stripeSubId = invoiceSubscriptionId(invoice);
                if (stripeSubId && (invoice.attempt_count ?? 1) <= 1) {
                    try {
                        const [subRow] = await db
                            .select()
                            .from(subscriptions)
                            .where(eq(subscriptions.stripeSubscriptionId, stripeSubId));
                            
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