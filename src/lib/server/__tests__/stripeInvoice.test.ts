import { describe, it, expect } from 'vitest';
import type Stripe from 'stripe';
import { invoiceSubscriptionId } from '../stripeInvoice';

/**
 * Renewals schedule deliveries off the invoice's subscription id. Stripe moved that id in
 * API 2025-03-31 (basil); reading the old field silently stopped every renewal delivery.
 */
const invoice = (fields: Record<string, unknown>) => fields as unknown as Stripe.Invoice;

describe('invoiceSubscriptionId', () => {
	it('reads the basil+ location (parent.subscription_details)', () => {
		expect(
			invoiceSubscriptionId(
				invoice({
					parent: {
						type: 'subscription_details',
						subscription_details: { subscription: 'sub_new' }
					}
				})
			)
		).toBe('sub_new');
	});

	it('accepts an expanded subscription object', () => {
		expect(
			invoiceSubscriptionId(
				invoice({ parent: { subscription_details: { subscription: { id: 'sub_expanded' } } } })
			)
		).toBe('sub_expanded');
	});

	it('falls back to the legacy top-level field', () => {
		expect(invoiceSubscriptionId(invoice({ subscription: 'sub_legacy' }))).toBe('sub_legacy');
	});

	it('returns null for a one-off invoice', () => {
		expect(invoiceSubscriptionId(invoice({ parent: null }))).toBeNull();
	});
});
