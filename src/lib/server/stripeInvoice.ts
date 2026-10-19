import type Stripe from 'stripe';

/**
 * The subscription an invoice belongs to.
 *
 * Since Stripe API 2025-03-31 (basil) the id lives at
 * `invoice.parent.subscription_details.subscription`; the top-level `invoice.subscription`
 * only exists on payloads from older API versions. Read both so renewals keep working
 * whichever version the webhook endpoint is pinned to.
 */
export function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
	const fromParent = invoice.parent?.subscription_details?.subscription;
	const legacy = (invoice as unknown as { subscription?: string | { id: string } | null })
		.subscription;
	const ref = fromParent ?? legacy;
	if (!ref) return null;
	return typeof ref === 'string' ? ref : ref.id;
}
