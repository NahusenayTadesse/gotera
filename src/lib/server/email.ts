import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_PORT } from '$env/static/private';
import { env } from '$env/dynamic/private';
import * as t from './emailTemplates';
import type { EmailSender } from '$lib/schemas/bulkEmail';

const port = Number(SMTP_PORT);

const createTransport = (user: string, pass: string) =>
	nodemailer.createTransport({
		host: SMTP_HOST,
		port,
		secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
		auth: { user, pass }
	});

/**
 * Two mailboxes on the same SMTP host:
 * - `orders` (SMTP_USER, orders@) — subscriptions, deliveries, payments, admin order alerts.
 * - `hello` (SMTP_HELLO_USER, hello@) — account/auth mail, marketing, general enquiries.
 * If the hello credentials aren't set, hello mail falls back to the orders mailbox.
 */
type Sender = EmailSender;

const ordersMailer = { user: SMTP_USER, transport: createTransport(SMTP_USER, SMTP_PASSWORD) };

const helloMailer = (() => {
	const { SMTP_HELLO_USER: user, SMTP_HELLO_PASSWORD: pass } = env;
	if (user && pass) return { user, transport: createTransport(user, pass) };
	console.warn('[email] SMTP_HELLO_USER/PASSWORD not set; hello mail will send from orders');
	return ordersMailer;
})();

const mailers: Record<Sender, typeof ordersMailer> = { orders: ordersMailer, hello: helloMailer };

/** Mailboxes actually configured — the dashboard only offers a choice when there's more than one. */
export const availableSenders: { id: Sender; address: string }[] = [
	{ id: 'orders', address: ordersMailer.user },
	...(helloMailer !== ordersMailer ? [{ id: 'hello' as const, address: helloMailer.user }] : [])
];

/** Inbox for general (non-order) admin notifications. */
const HELLO_INBOX = helloMailer.user;

/** Low-level send. Defaults to the orders mailbox. */
export const sendEmail = async (
	to: string,
	subject: string,
	html: string,
	sender: Sender = 'orders'
) => {
	const { user, transport } = mailers[sender];
	await transport.sendMail({ from: `GOTERA <${user}>`, to, subject, html });
};

/* ── Customer sends ── */

export const sendResetPassword = (to: string, url: string) => {
	const { subject, html } = t.customerResetPassword(url);
	return sendEmail(to, subject, html, 'hello');
};

export const sendVerifyEmail = (to: string, url: string) => {
	const { subject, html } = t.customerVerifyEmail(url);
	return sendEmail(to, subject, html, 'hello');
};

export const sendSubscriptionConfirmed = (
	to: string,
	data: { name: string; planName: string; amountLabel: string }
) => {
	const { subject, html } = t.customerSubscriptionConfirmed(data);
	return sendEmail(to, subject, html);
};

export const sendUpcomingDelivery = (
	to: string,
	data: { name: string; cutoffLabel: string; address: string; addonsUrl?: string }
) => {
	const { subject, html } = t.customerUpcomingDelivery(data);
	return sendEmail(to, subject, html);
};

export const sendAddonsAdded = (
	to: string,
	data: { name: string; amountLabel: string; addonLines: string[] }
) => {
	const { subject, html } = t.customerAddonsAdded(data);
	return sendEmail(to, subject, html);
};

/** Goes to SMTP_USER (the shop), not a customer. */
export const notifyAdminStockLow = (data: {
	itemLabel: string;
	deliveryLabel: string;
	remaining: number;
	capacity: number;
}) => {
	const { subject, html } = t.adminStockLow(data);
	return sendEmail(SMTP_USER, subject, html);
};

export const sendPaymentFailed = (to: string, data: { name: string }) => {
	const { subject, html } = t.customerPaymentFailed(data);
	return sendEmail(to, subject, html);
};

/* ── Admin sends (go to the orders inbox unless noted) ── */

export const notifyAdminNewSubscriber = (data: {
	name: string;
	email: string;
	planName: string;
	amountLabel: string;
}) => {
	const { subject, html } = t.adminNewSubscriber(data);
	return sendEmail(SMTP_USER, subject, html);
};

export const notifyAdminGiftOrder = (data: {
	buyerName: string;
	buyerEmail: string;
	recipientName: string;
	amountLabel: string;
}) => {
	const { subject, html } = t.adminGiftOrder(data);
	return sendEmail(SMTP_USER, subject, html);
};

export const notifyAdminPartnerApplication = (
	data: Parameters<typeof t.adminPartnerApplication>[0]
) => {
	const { subject, html } = t.adminPartnerApplication(data);
	return sendEmail(HELLO_INBOX, subject, html, 'hello');
};

export const notifyAdminPaymentFailed = (data: { name: string; email: string }) => {
	const { subject, html } = t.adminPaymentFailed(data);
	return sendEmail(SMTP_USER, subject, html);
};


/* ── Plan change / cancellation ── */

export const sendPlanChanged = (to: string, data: Parameters<typeof t.customerPlanChanged>[0]) => {
	const { subject, html } = t.customerPlanChanged(data);
	return sendEmail(to, subject, html);
};

export const notifyAdminPlanChanged = (data: Parameters<typeof t.adminPlanChanged>[0]) => {
	const { subject, html } = t.adminPlanChanged(data);
	return sendEmail(SMTP_USER, subject, html);
};

export const sendSubscriptionCancelled = (
	to: string,
	data: Parameters<typeof t.customerSubscriptionCancelled>[0]
) => {
	const { subject, html } = t.customerSubscriptionCancelled(data);
	return sendEmail(to, subject, html);
};

export const notifyAdminSubscriptionCancelled = (
	data: Parameters<typeof t.adminSubscriptionCancelled>[0]
) => {
	const { subject, html } = t.adminSubscriptionCancelled(data);
	return sendEmail(SMTP_USER, subject, html);
};

export const sendMagicLink = (to: string, url: string) => {
	const { subject, html } = t.customerMagicLink(url);

	return sendEmail(to, subject, html, 'hello');
};

export const sendChangeEmail = (to: string, url: string) => {
	const { subject, html } = t.customerChangeEmail(url);
	return sendEmail(to, subject, html, 'hello');
};

export const sendGiftReceived = (
	to: string,
	data: { buyerName: string; recipientName: string; amountLabel: string }
) => {
	const { subject, html } = t.customerGiftReceived(data);
	return sendEmail(to, subject, html);
};


export const sendAdminTest = () => {
	const { subject, html } = t.adminTest();
	return sendEmail(HELLO_INBOX, subject, html, 'hello');
};

import { customerOrderConfirmed, adminNewOrder } from './emailTemplates';
 
 
export async function sendOrderConfirmed(
	to: string,
	data: Parameters<typeof customerOrderConfirmed>[0]
) {
	const { subject, html } = customerOrderConfirmed(data);
	return sendEmail( to, subject, html );
}
 
export async function notifyAdminOrder(data: Parameters<typeof adminNewOrder>[0]) {
	const { subject, html } = adminNewOrder(data);
	return sendEmail(SMTP_USER, subject, html );
}

/* ── Bulk / marketing send (dashboard bulk email sender) ── */

export const sendBulkEmail = (
	to: string,
	data: Parameters<typeof t.customerBulkEmail>[0],
	sender: Sender = 'hello'
) => {
	const { subject, html } = t.customerBulkEmail(data);
	return sendEmail(to, subject, html, sender);
};

 
