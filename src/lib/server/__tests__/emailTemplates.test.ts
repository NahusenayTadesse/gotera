import { describe, it, expect } from 'vitest';
import { adminGiftOrder, adminNewOrder, customerOrderConfirmed } from '../emailTemplates';

/**
 * Names and addresses come from public checkout forms and Stripe. They must reach the
 * HTML escaped, or a buyer can plant markup (a fake link) in the admin's inbox.
 */
const evil = '<a href="https://evil.test">Approve refund</a>';

describe('email templates escape untrusted data', () => {
	it('escapes names in the admin gift email, but keeps the subject plain text', () => {
		const { subject, html } = adminGiftOrder({
			buyerName: evil,
			buyerEmail: 'a@b.co',
			recipientName: 'Tom & Jerry',
			amountLabel: '£30.00'
		});
		expect(html).not.toContain('<a href="https://evil.test">');
		expect(html).toContain('&lt;a href=&quot;https://evil.test&quot;&gt;');
		expect(subject).toBe('New gift order for Tom & Jerry');
	});

	it('escapes every address line', () => {
		const { html } = adminNewOrder({
			buyerName: 'Guest',
			buyerEmail: 'g@x.co',
			amountLabel: '£10.00',
			deliveryLabel: 'Saturday',
			addressLines: ['Name', evil, 'London'],
			addonNames: [evil]
		});
		expect(html).not.toContain('<a href="https://evil.test">');
	});

	it('still renders the line breaks between address lines', () => {
		const { html } = customerOrderConfirmed({
			name: 'Sam',
			amountLabel: '£10.00',
			addressLines: ['1 High St', 'London']
		});
		expect(html).toContain('1 High St<br />London');
	});
});
