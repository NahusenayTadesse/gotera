/**
 * GOTERA transactional email templates.
 * Server-only (imported by email.ts). Each template returns { subject, html }.
 *
 * Notes on email HTML: uses tables + inline styles (the only thing that renders
 * consistently across Gmail/Outlook/Apple Mail) and web-safe fonts — Georgia for
 * the Cormorant-style headings, Helvetica/Arial for the Jost-style body, since
 * custom web fonts get stripped by most mail clients.
 */

const C = {
	copper: '#B5622A',
	copperDark: '#9A4F22',
	cream: '#FAF8F4',
	ink: '#1A1A1A',
	taupe: '#7A746E',
	border: '#E8E4E0',
	panel: '#F5F2ED',
	body: '#433E39'
};

const SITE = 'https://gotera.co.uk';
const LOGO_URL = 'https://gotera.co.uk/logo192.jpg';
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/** Shared shell: copper header + logo, white body, panel footer. */
function layout({ heading, body, preheader = '' }: { heading: string; body: string; preheader?: string }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="color-scheme" content="light only" />
</head>
<body style="margin:0; padding:0; background:${C.cream}; -webkit-text-size-adjust:100%;">
	<span style="display:none; max-height:0; overflow:hidden; opacity:0;">${preheader}</span>
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};">
		<tr>
			<td align="center" style="padding:24px 12px;">
				<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background:#ffffff; border:1px solid ${C.border};">
					<tr>
						<td style="background:${C.copper}; padding:28px; text-align:center;">
							<img src="${LOGO_URL}" width="72" alt="GOTERA" style="display:block; margin:0 auto 12px; border:0;" />
							<h1 style="margin:0; color:#ffffff; font-family:${SERIF}; font-style:italic; font-weight:600; font-size:22px; letter-spacing:0.01em;">${heading}</h1>
						</td>
					</tr>
					<tr>
						<td style="padding:28px 32px; color:${C.body}; font-family:${SANS}; font-size:15px; line-height:1.65;">
							${body}
						</td>
					</tr>
					<tr>
						<td style="background:${C.panel}; padding:18px 24px; text-align:center; color:${C.taupe}; font-family:${SANS}; font-size:12px; line-height:1.6;">
							GOTERA &middot; Made &amp; packed in Ethiopia<br />
							<a href="${SITE}" style="color:${C.copper}; text-decoration:none;">gotera.co.uk</a>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}

/** Primary copper button. */
function button(label: string, url: string) {
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto;">
		<tr>
			<td style="background:${C.copper}; border-radius:2px;">
				<a href="${url}" style="display:inline-block; padding:13px 30px; color:#ffffff; font-family:${SANS}; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none;">${label}</a>
			</td>
		</tr>
	</table>`;
}

/** Fallback "copy this link" block. */
function fallbackLink(url: string) {
	return `<p style="margin:0 0 6px; color:${C.taupe}; font-size:13px;">If the button doesn't work, paste this link into your browser:</p>
	<p style="margin:0; word-break:break-all;"><a href="${url}" style="color:${C.copper}; font-size:13px;">${url}</a></p>`;
}

/** Detail rows for confirmation / admin emails. */
function detailRow(label: string, value: string) {
	return `<tr>
		<td style="padding:9px 0; color:${C.taupe}; font-size:13px; border-bottom:1px solid ${C.border};">${label}</td>
		<td style="padding:9px 0; color:${C.ink}; font-size:14px; font-weight:600; text-align:right; border-bottom:1px solid ${C.border};">${value}</td>
	</tr>`;
}
function detailTable(rows: string) {
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0;">${rows}</table>`;
}

/* ───────────────────────── CUSTOMER TEMPLATES ───────────────────────── */

export const customerResetPassword = (url: string) => ({
	subject: 'Reset your password · GOTERA',
	html: layout({
		heading: 'Reset your password',
		preheader: 'Create a new password for your GOTERA account.',
		body: `
			<p style="margin:0 0 14px;">Hello,</p>
			<p style="margin:0 0 14px;">We received a request to reset the password for your <strong>GOTERA</strong> account. Click below to create a new one.</p>
			${button('Reset password', url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
		`
	})
});

export const customerVerifyEmail = (url: string) => ({
	subject: 'Confirm your email · GOTERA',
	html: layout({
		heading: 'Confirm your email',
		preheader: 'One click to activate your GOTERA account.',
		body: `
			<p style="margin:0 0 14px;">Welcome to GOTERA.</p>
			<p style="margin:0 0 14px;">Confirm your email address to activate your account and start your injera subscription.</p>
			${button('Confirm email', url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">Didn't create an account? You can ignore this email.</p>
		`
	})
});

export const customerSubscriptionConfirmed = (data: {
	name: string;
	planName: string;
	amountLabel: string;
	nextDeliveryLabel: string;
}) => ({
	subject: 'Your GOTERA subscription is live',
	html: layout({
		heading: 'Subscription confirmed',
		preheader: `Your ${data.planName} plan is active. First delivery on ${data.nextDeliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Your subscription is live — real injera, made in Ethiopia, on its way to your door.</p>
			${detailTable(
				detailRow('Plan', data.planName) +
					detailRow('Payment', data.amountLabel) +
					detailRow('First delivery', data.nextDeliveryLabel)
			)}
			${button('View your account', `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Pause, skip, or change your plan any time from your account.</p>
		`
	})
});

export const customerUpcomingDelivery = (data: {
	name: string;
	deliveryLabel: string;
	cutoffLabel: string;
	address: string;
}) => ({
	subject: `Your injera arrives ${data.deliveryLabel}`,
	html: layout({
		heading: 'Delivery on the way',
		preheader: `Next delivery ${data.deliveryLabel}. Changes before ${data.cutoffLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Your next GOTERA delivery is scheduled.</p>
			${detailTable(
				detailRow('Delivery', data.deliveryLabel) +
					detailRow('Address', data.address) +
					detailRow('Changes by', data.cutoffLabel)
			)}
			<p style="margin:0 0 6px;">Need to add extras, skip, or update your address? Do it before the cut-off and it'll apply to this delivery.</p>
			${button('Manage delivery', `${SITE}/account`)}
		`
	})
});

export const customerPaymentFailed = (data: { name: string }) => ({
	subject: 'Payment issue with your GOTERA subscription',
	html: layout({
		heading: 'Payment didn\u2019t go through',
		preheader: 'Update your payment method to keep your injera coming.',
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 14px;">We couldn't process the payment for your subscription. To avoid a gap in your deliveries, please update your payment method.</p>
			${button('Update payment', `${SITE}/account/payment`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">We'll try again automatically over the next few days.</p>
		`
	})
});

/* ─────────────────────────── ADMIN TEMPLATES ─────────────────────────── */

export const adminNewSubscriber = (data: {
	name: string;
	email: string;
	planName: string;
	amountLabel: string;
}) => ({
	subject: `New subscriber: ${data.name}`,
	html: layout({
		heading: 'New subscriber',
		preheader: `${data.name} started the ${data.planName} plan.`,
		body: `
			<p style="margin:0 0 6px;">A new subscription just went live.</p>
			${detailTable(
				detailRow('Name', data.name) +
					detailRow('Email', data.email) +
					detailRow('Plan', data.planName) +
					detailRow('First payment', data.amountLabel)
			)}
			${button('Open admin', `${SITE}/admin`)}
		`
	})
});

export const adminGiftOrder = (data: {
	buyerName: string;
	buyerEmail: string;
	recipientName: string;
	amountLabel: string;
}) => ({
	subject: `New gift order for ${data.recipientName}`,
	html: layout({
		heading: 'New gift order',
		preheader: `${data.buyerName} sent a gift to ${data.recipientName}.`,
		body: `
			${detailTable(
				detailRow('From', `${data.buyerName} (${data.buyerEmail})`) +
					detailRow('To', data.recipientName) +
					detailRow('Amount', data.amountLabel)
			)}
			${button('Open admin', `${SITE}/admin`)}
		`
	})
});

export const adminPaymentFailed = (data: { name: string; email: string }) => ({
	subject: `Payment failed: ${data.email}`,
	html: layout({
		heading: 'Payment failed',
		preheader: `A subscription payment failed for ${data.email}.`,
		body: `
			<p style="margin:0 0 6px;">A recurring payment failed — Stripe will retry, but worth keeping an eye on.</p>
			${detailTable(detailRow('Name', data.name) + detailRow('Email', data.email))}
		`
	})
});


export const customerMagicLink = (url: string) => ({
	subject: 'Your GOTERA sign-in link',
	html: layout({
		heading: 'Sign in to GOTERA',
		preheader: 'Your one-time sign-in link.',
		body: `
			<p style="margin:0 0 14px;">Tap below to sign in — no password needed.</p>
			${button('Sign in', url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">This link expires shortly and works once. If you didn't request it, ignore this email.</p>
		`
	})
});

export const customerChangeEmail = (url: string) => ({
	subject: 'Confirm your new email · GOTERA',
	html: layout({
		heading: 'Confirm your new email',
		preheader: 'Approve the change to your account email.',
		body: `
			<p style="margin:0 0 14px;">We received a request to change the email on your GOTERA account. Confirm to complete it.</p>
			${button('Confirm change', url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">If you didn't request this, ignore this email — nothing changes.</p>
		`
	})
});



export const customerOrderConfirmed = (data: {
	name: string;
	amountLabel: string;
	deliveryLabel: string;
	addressLines: string[];
	addonNames?: string[];
}) => ({
	subject: 'Your GOTERA order is confirmed',
	html: layout({
		heading: 'Order confirmed',
		preheader: `Your injera is booked in for ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Thank you — your payment has gone through and your order is confirmed. This is a one-time order: there's no subscription, and nothing will renew.</p>
			${detailTable(
				detailRow('Delivery', data.deliveryLabel) +
					detailRow('Total paid', data.amountLabel) +
					(data.addonNames?.length ? detailRow('Extras', data.addonNames.join(', ')) : '') +
					detailRow('Status', 'Confirmed')
			)}
			<p style="margin:0 0 6px;">Delivering to:</p>
			<p style="margin:0 0 14px; color:${C.taupe}; font-size:14px; line-height:1.6;">
				${data.addressLines.filter(Boolean).join('<br />')}
			</p>
			<p style="margin:0 0 6px;">We deliver on Saturdays across London. There's nothing more you need to do.</p>
			${button('View your order', `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Address wrong? Reply to this email and we'll fix it before dispatch.</p>
		`
	})
});

export const adminNewOrder = (data: {
	buyerName: string;
	buyerEmail: string;
	amountLabel: string;
	deliveryLabel: string;
	addressLines: string[];
	addonNames?: string[];
}) => ({
	subject: `New one-off order — ${data.buyerName} (${data.amountLabel})`,
	html: layout({
		heading: 'New one-off order',
		preheader: `${data.buyerName} ordered ${data.amountLabel} for ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">A one-off order has been paid.</p>
			${detailTable(
				detailRow('Customer', data.buyerName) +
					detailRow('Email', data.buyerEmail) +
					detailRow('Amount', data.amountLabel) +
					detailRow('Delivery', data.deliveryLabel) +
					(data.addonNames?.length ? detailRow('Extras', data.addonNames.join(', ')) : '') +
					detailRow('Type', 'One-off (no subscription)')
			)}
			<p style="margin:0 0 6px;">Ship to:</p>
			<p style="margin:0 0 14px; color:${C.taupe}; font-size:14px; line-height:1.6;">
				${data.addressLines.filter(Boolean).join('<br />')}
			</p>
			${button('Open admin', `${SITE}/admin`)}
		`
	})
});