import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_PORT } from '$env/static/private';
import * as t from './emailTemplates';

const port = Number(SMTP_PORT);

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port,
	secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});

const FROM = `GOTERA <${SMTP_USER}>`;

/** Low-level send. */
export const sendEmail = async (to: string, subject: string, html: string) => {
	await transporter.sendMail({ from: FROM, to, subject, html });
};

/* ── Customer sends ── */

export const sendResetPassword = (to: string, url: string) => {
	const { subject, html } = t.customerResetPassword(url);
	return sendEmail(to, subject, html);
};

export const sendVerifyEmail = (to: string, url: string) => {
	const { subject, html } = t.customerVerifyEmail(url);
	return sendEmail(to, subject, html);
};

export const sendSubscriptionConfirmed = (
	to: string,
	data: { name: string; planName: string; amountLabel: string; nextDeliveryLabel: string }
) => {
	const { subject, html } = t.customerSubscriptionConfirmed(data);
	return sendEmail(to, subject, html);
};

export const sendUpcomingDelivery = (
	to: string,
	data: { name: string; deliveryLabel: string; cutoffLabel: string; address: string }
) => {
	const { subject, html } = t.customerUpcomingDelivery(data);
	return sendEmail(to, subject, html);
};

export const sendPaymentFailed = (to: string, data: { name: string }) => {
	const { subject, html } = t.customerPaymentFailed(data);
	return sendEmail(to, subject, html);
};

/* ── Admin sends (go to ADMIN_EMAIL) ── */

export const notifyAdminNewSubscriber = (data: {
	name: string;
	email: string;
	planName: string;
	amountLabel: string;
}) => {
	const { subject, html } = t.adminNewSubscriber(data);
	return sendEmail(ADMIN_EMAIL, subject, html);
};

export const notifyAdminGiftOrder = (data: {
	buyerName: string;
	buyerEmail: string;
	recipientName: string;
	amountLabel: string;
}) => {
	const { subject, html } = t.adminGiftOrder(data);
	return sendEmail(ADMIN_EMAIL, subject, html);
};

export const notifyAdminPaymentFailed = (data: { name: string; email: string }) => {
	const { subject, html } = t.adminPaymentFailed(data);
	return sendEmail(ADMIN_EMAIL, subject, html);
};


export const sendMagicLink = (to: string, url: string) => {
	const { subject, html } = t.customerMagicLink(url);
	return sendEmail(to, subject, html);
};

export const sendChangeEmail = (to: string, url: string) => {
	const { subject, html } = t.customerChangeEmail(url);
	return sendEmail(to, subject, html);
};

export const sendGiftReceived = (
	to: string,
	data: { buyerName: string; recipientName: string; amountLabel: string }
) => {
	const { subject, html } = t.customerGiftReceived(data);
	return sendEmail(to, subject, html);
};