import nodemailer from 'nodemailer';

//#region \0virtual:env/static/private
/** @type {import('$env/static/private').CRON_SECRET} */
var CRON_SECRET = "1d0f8d683e799b6284ef4a31af5a7ce3d19c96165bc9b21c";
/** @type {import('$env/static/private').SMTP_HOST} */
var SMTP_HOST = "smtp.gmail.com";
/** @type {import('$env/static/private').SMTP_PASSWORD} */
var SMTP_PASSWORD = "sauh fiqc bqsh fgun";
/** @type {import('$env/static/private').SMTP_USER} */
var SMTP_USER = "goterainjera@gmail.com";
//#endregion
//#region src/lib/server/emailTemplates.ts
/**
* GOTERA transactional email templates.
* Server-only (imported by email.ts). Each template returns { subject, html }.
*
* Notes on email HTML: uses tables + inline styles (the only thing that renders
* consistently across Gmail/Outlook/Apple Mail) and web-safe fonts — Georgia for
* the Cormorant-style headings, Helvetica/Arial for the Jost-style body, since
* custom web fonts get stripped by most mail clients.
*/
var C = {
	copper: "#B5622A",
	cream: "#FAF8F4",
	ink: "#1A1A1A",
	taupe: "#7A746E",
	border: "#E8E4E0",
	panel: "#F5F2ED",
	body: "#433E39"
};
var SITE = "https://gotera.co.uk";
var LOGO_URL = "https://gotera.co.uk/logo192.jpg";
var SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
var SERIF = "Georgia, 'Times New Roman', serif";
/** Shared shell: copper header + logo, white body, panel footer. */
function layout({ heading, body, preheader = "" }) {
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
function button(label, url) {
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto;">
		<tr>
			<td style="background:${C.copper}; border-radius:2px;">
				<a href="${url}" style="display:inline-block; padding:13px 30px; color:#ffffff; font-family:${SANS}; font-size:13px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none;">${label}</a>
			</td>
		</tr>
	</table>`;
}
/** Fallback "copy this link" block. */
function fallbackLink(url) {
	return `<p style="margin:0 0 6px; color:${C.taupe}; font-size:13px;">If the button doesn't work, paste this link into your browser:</p>
	<p style="margin:0; word-break:break-all;"><a href="${url}" style="color:${C.copper}; font-size:13px;">${url}</a></p>`;
}
/** Escape free-text (cancellation feedback etc.) before it lands in the HTML. */
function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/** Detail rows for confirmation / admin emails. */
function detailRow(label, value) {
	return `<tr>
		<td style="padding:9px 0; color:${C.taupe}; font-size:13px; border-bottom:1px solid ${C.border};">${label}</td>
		<td style="padding:9px 0; color:${C.ink}; font-size:14px; font-weight:600; text-align:right; border-bottom:1px solid ${C.border};">${value}</td>
	</tr>`;
}
function detailTable(rows) {
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0;">${rows}</table>`;
}
var customerResetPassword = (url) => ({
	subject: "Reset your password · GOTERA",
	html: layout({
		heading: "Reset your password",
		preheader: "Create a new password for your GOTERA account.",
		body: `
			<p style="margin:0 0 14px;">Hello,</p>
			<p style="margin:0 0 14px;">We received a request to reset the password for your <strong>GOTERA</strong> account. Click below to create a new one.</p>
			${button("Reset password", url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
		`
	})
});
var customerVerifyEmail = (url) => ({
	subject: "Confirm your email · GOTERA",
	html: layout({
		heading: "Confirm your email",
		preheader: "One click to activate your GOTERA account.",
		body: `
			<p style="margin:0 0 14px;">Welcome to GOTERA.</p>
			<p style="margin:0 0 14px;">Confirm your email address to activate your account and start your injera subscription.</p>
			${button("Confirm email", url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">Didn't create an account? You can ignore this email.</p>
		`
	})
});
var customerSubscriptionConfirmed = (data) => ({
	subject: "Your GOTERA subscription is live",
	html: layout({
		heading: "Subscription Confirmed",
		preheader: `Your ${data.planName} plan is active. First delivery on ${data.nextDeliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Your subscription is live — real injera, made in Ethiopia, on its way to your door.</p>
			${detailTable(detailRow("Plan", data.planName) + detailRow("Payment", data.amountLabel) + detailRow("First delivery", data.nextDeliveryLabel))}
			${button("View your account", `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Pause, skip, or change your plan any time from your account.</p>
		`
	})
});
var customerUpcomingDelivery = (data) => ({
	subject: `Your injera arrives ${data.deliveryLabel}`,
	html: layout({
		heading: "Delivery on the way",
		preheader: `Next delivery ${data.deliveryLabel}. Changes before ${data.cutoffLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Your next GOTERA delivery is scheduled.</p>
			${detailTable(detailRow("Delivery", data.deliveryLabel) + detailRow("Address", data.address) + detailRow("Changes by", data.cutoffLabel))}
			<p style="margin:0 0 6px;">Need to skip or update your address? Do it before the cut-off and it'll apply to this delivery.</p>
			${button("Manage delivery", `${SITE}/account`)}
			${data.addonsUrl ? `<p style="margin:20px 0 6px;">Want to add something extra to this delivery?</p>
			${button("Add extras", data.addonsUrl)}` : ""}
		`
	})
});
/**
* Sent when the Saturday a customer would normally have got was already at capacity, so
* their first delivery is the one after. Names both dates explicitly — the useful fact is
* *when it will arrive*, not that something was full.
*/
var customerDeliveryRolled = (data) => ({
	subject: `Your first delivery is ${data.deliveryLabel}`,
	html: layout({
		heading: "Your delivery date",
		preheader: `We'll deliver on ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Thanks for your order! Our ${data.originalLabel} run is fully booked, so we've scheduled you for the next one:</p>
			${detailTable(detailRow("Delivery date", data.deliveryLabel))}
			<p style="margin:14px 0 6px;">Nothing for you to do — we'll email you again a couple of days before it arrives.</p>
		`
	})
});
/** Low-stock warning to the shop owner (SMTP_USER), not to a customer. */
var adminStockLow = (data) => ({
	subject: `Low stock: ${data.itemLabel} for ${data.deliveryLabel}`,
	html: layout({
		heading: "Stock running low",
		preheader: `${data.remaining} left of ${data.capacity} for ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 6px;">Stock is running low for an upcoming delivery date:</p>
			${detailTable(detailRow("Item", data.itemLabel) + detailRow("Delivery date", data.deliveryLabel) + detailRow("Remaining", `${data.remaining} of ${data.capacity}`))}
			<p style="margin:14px 0 6px;">Once it hits zero, new orders roll to the following Saturday automatically.</p>
			${button("Manage stock", `${SITE}/dashboard/stock`)}
		`
	})
});
var customerAddonsAdded = (data) => ({
	subject: `Added to your ${data.deliveryLabel} delivery`,
	html: layout({
		heading: "Extras added",
		preheader: `${data.addonLines.join(", ")} — added to your next delivery.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Thanks — we've added the following to your delivery on ${data.deliveryLabel}:</p>
			${detailTable(data.addonLines.map((line) => detailRow("", line)).join("") + detailRow("Charged", data.amountLabel))}
		`
	})
});
var customerPaymentFailed = (data) => ({
	subject: "Payment issue with your GOTERA subscription",
	html: layout({
		heading: "Payment didn’t go through",
		preheader: "Update your payment method to keep your injera coming.",
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 14px;">We couldn't process the payment for your subscription. To avoid a gap in your deliveries, please update your payment method.</p>
			${button("Update payment", `${SITE}/account/payment`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">We'll try again automatically over the next few days.</p>
		`
	})
});
var adminNewSubscriber = (data) => ({
	subject: `New subscriber: ${data.name}`,
	html: layout({
		heading: "New subscriber",
		preheader: `${data.name} started the ${data.planName} plan.`,
		body: `
			<p style="margin:0 0 6px;">A new subscription just went live.</p>
			${detailTable(detailRow("Name", data.name) + detailRow("Email", data.email) + detailRow("Plan", data.planName) + detailRow("First payment", data.amountLabel))}
			${button("Open admin", `${SITE}/admin`)}
		`
	})
});
var adminGiftOrder = (data) => ({
	subject: `New gift order for ${data.recipientName}`,
	html: layout({
		heading: "New gift order",
		preheader: `${data.buyerName} sent a gift to ${data.recipientName}.`,
		body: `
			${detailTable(detailRow("From", `${data.buyerName} (${data.buyerEmail})`) + detailRow("To", data.recipientName) + detailRow("Amount", data.amountLabel))}
			${button("Open admin", `${SITE}/admin`)}
		`
	})
});
var adminPaymentFailed = (data) => ({
	subject: `Payment failed: ${data.email}`,
	html: layout({
		heading: "Payment failed",
		preheader: `A subscription payment failed for ${data.email}.`,
		body: `
			<p style="margin:0 0 6px;">A recurring payment failed — Stripe will retry, but worth keeping an eye on.</p>
			${detailTable(detailRow("Name", data.name) + detailRow("Email", data.email))}
		`
	})
});
var customerMagicLink = (url) => ({
	subject: "Your GOTERA sign-in link",
	html: layout({
		heading: "Sign in to GOTERA",
		preheader: "Your one-time sign-in link.",
		body: `
			<p style="margin:0 0 14px;">Tap below to sign in — no password needed.</p>
			${button("Sign in", url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">This link expires shortly and works once. If you didn't request it, ignore this email.</p>
		`
	})
});
var customerChangeEmail = (url) => ({
	subject: "Confirm your new email · GOTERA",
	html: layout({
		heading: "Confirm your new email",
		preheader: "Approve the change to your account email.",
		body: `
			<p style="margin:0 0 14px;">We received a request to change the email on your GOTERA account. Confirm to complete it.</p>
			${button("Confirm change", url)}
			${fallbackLink(url)}
			<p style="margin:20px 0 0; color:${C.taupe}; font-size:13px;">If you didn't request this, ignore this email — nothing changes.</p>
		`
	})
});
var customerOrderConfirmed = (data) => ({
	subject: "Your GOTERA order is confirmed",
	html: layout({
		heading: "Order confirmed",
		preheader: `Your injera is booked in for ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Thank you — your payment has gone through and your order is confirmed. This is a one-time order: there's no subscription, and nothing will renew.</p>
			${detailTable(detailRow("Delivery", data.deliveryLabel) + detailRow("Total paid", data.amountLabel) + (data.addonNames?.length ? detailRow("Extras", data.addonNames.join(", ")) : "") + detailRow("Status", "Confirmed"))}
			<p style="margin:0 0 6px;">Delivering to:</p>
			<p style="margin:0 0 14px; color:${C.taupe}; font-size:14px; line-height:1.6;">
				${data.addressLines.filter(Boolean).join("<br />")}
			</p>
			<p style="margin:0 0 6px;">We deliver on Saturdays across London. There's nothing more you need to do.</p>
			${button("View your order", `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Address wrong? Reply to this email and we'll fix it before dispatch.</p>
		`
	})
});
/** Sent to the person who BOUGHT the gift, confirming it's booked in. */
var customerGiftReceived = (data) => ({
	subject: `Your gift for ${data.recipientName} is confirmed`,
	html: layout({
		heading: "Gift confirmed",
		preheader: `Your injera gift for ${data.recipientName} is booked in.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.buyerName},</p>
			<p style="margin:0 0 6px;">Thank you — your payment has gone through and the gift is booked in. We'll deliver it to ${data.recipientName} on our next Saturday run.</p>
			${detailTable(detailRow("Recipient", data.recipientName) + detailRow("Total paid", data.amountLabel) + detailRow("Status", "Confirmed"))}
			<p style="margin:0 0 6px;">There's nothing more you need to do. This is a one-time gift — nothing renews.</p>
			${button("View your order", `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Wrong address or spelling? Reply to this email and we'll fix it before dispatch.</p>
		`
	})
});
var customerPlanChanged = (data) => ({
	subject: `Your plan changes to ${data.toPlanName} on ${data.effectiveLabel}`,
	html: layout({
		heading: "Plan change scheduled",
		preheader: `${data.fromPlanName} → ${data.toPlanName}, from ${data.effectiveLabel}.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">Your plan change is booked in. Nothing changes on this billing period — the new plan starts at your next renewal, so you're not charged or refunded mid-cycle.</p>
			${detailTable(detailRow("Current plan", data.fromPlanName) + detailRow("New plan", data.toPlanName) + detailRow("New price", data.toPlanPriceLabel) + detailRow("Starts", data.effectiveLabel))}
			<p style="margin:0 0 6px;">Deliveries carry on as normal until then.</p>
			${button("View your account", `${SITE}/account`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Changed your mind? You can switch back from your account before ${data.effectiveLabel}.</p>
		`
	})
});
var adminPlanChanged = (data) => ({
	subject: `Plan change: ${data.name} → ${data.toPlanName}`,
	html: layout({
		heading: "Plan change",
		preheader: `${data.name} switched ${data.fromPlanName} → ${data.toPlanName}.`,
		body: `
			<p style="margin:0 0 6px;">A subscriber scheduled a plan change.</p>
			${detailTable(detailRow("Customer", data.name) + detailRow("Email", data.email) + detailRow("From", data.fromPlanName) + detailRow("To", data.toPlanName) + detailRow("New price", data.toPlanPriceLabel) + detailRow("Effective", data.effectiveLabel))}
			${button("Open admin", `${SITE}/admin`)}
		`
	})
});
var customerSubscriptionCancelled = (data) => ({
	subject: "Your GOTERA subscription has been cancelled",
	html: layout({
		heading: "Subscription cancelled",
		preheader: data.endsLabel ? `Your ${data.planName} plan runs until ${data.endsLabel}.` : `Your ${data.planName} plan has been cancelled.`,
		body: `
			<p style="margin:0 0 14px;">Hi ${data.name},</p>
			<p style="margin:0 0 6px;">${data.endsLabel ? "Your plan is cancelled and won't renew. You've already paid for this period, so deliveries continue until it ends." : "Your plan has been cancelled. There are no further deliveries and you will not be charged again."}</p>
			${detailTable(detailRow("Plan", data.planName) + detailRow(data.endsLabel ? "Deliveries until" : "Cancelled", data.endsLabel ?? "Immediately") + detailRow("Renewals", "Stopped"))}
			<p style="margin:0 0 6px;">Thank you for eating with us. Whenever you want injera again, your account is still here — start a new plan in a couple of taps.</p>
			${button("Start again", `${SITE}/subscribe`)}
			<p style="margin:14px 0 0; color:${C.taupe}; font-size:13px;">Cancelled by mistake? Reply to this email${data.endsLabel ? ` before ${data.endsLabel}` : ""} and we'll put it back.</p>
		`
	})
});
var adminSubscriptionCancelled = (data) => ({
	subject: `Cancellation: ${data.name} (${data.planName})`,
	html: layout({
		heading: "Subscription cancelled",
		preheader: `${data.name} cancelled the ${data.planName} plan.`,
		body: `
			<p style="margin:0 0 6px;">A subscriber cancelled.</p>
			${detailTable(detailRow("Customer", data.name) + detailRow("Email", data.email) + detailRow("Plan", data.planName) + detailRow("Ends", data.endsLabel ?? "Immediately (no paid period)") + (data.reason ? detailRow("Reason", esc(data.reason)) : ""))}
			${data.feedback ? `<p style="margin:0 0 6px; color:${C.taupe}; font-size:13px;">Feedback:</p>
			<p style="margin:0 0 14px; padding:12px 14px; background:${C.panel}; color:${C.body}; font-size:14px; line-height:1.6;">${esc(data.feedback)}</p>` : ""}
			${button("Open admin", `${SITE}/admin`)}
		`
	})
});
/** Admin composes this from the dashboard's bulk email sender — `bodyHtml` is the rich-text editor's output. */
var customerBulkEmail = (data) => ({
	subject: data.subject,
	html: layout({
		heading: data.subject,
		preheader: data.bodyHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 150),
		body: `<div style="font-family:${SANS};">${data.bodyHtml}</div>`
	})
});
var adminNewOrder = (data) => ({
	subject: `New one-off order — ${data.buyerName} (${data.amountLabel})`,
	html: layout({
		heading: "New one-off order",
		preheader: `${data.buyerName} ordered ${data.amountLabel} for ${data.deliveryLabel}.`,
		body: `
			<p style="margin:0 0 14px;">A one-off order has been paid.</p>
			${detailTable(detailRow("Customer", data.buyerName) + detailRow("Email", data.buyerEmail) + detailRow("Amount", data.amountLabel) + detailRow("Delivery", data.deliveryLabel) + (data.addonNames?.length ? detailRow("Extras", data.addonNames.join(", ")) : "") + detailRow("Type", "One-off (no subscription)"))}
			<p style="margin:0 0 6px;">Ship to:</p>
			<p style="margin:0 0 14px; color:${C.taupe}; font-size:14px; line-height:1.6;">
				${data.addressLines.filter(Boolean).join("<br />")}
			</p>
			${button("Open admin", `${SITE}/admin`)}
		`
	})
});
//#endregion
//#region src/lib/server/email.ts
var port = 465;
var transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port,
	secure: port === 465,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});
var FROM = `GOTERA <${SMTP_USER}>`;
/** Low-level send. */
var sendEmail = async (to, subject, html) => {
	await transporter.sendMail({
		from: FROM,
		to,
		subject,
		html
	});
};
var sendResetPassword = (to, url) => {
	const { subject, html } = customerResetPassword(url);
	return sendEmail(to, subject, html);
};
var sendVerifyEmail = (to, url) => {
	const { subject, html } = customerVerifyEmail(url);
	return sendEmail(to, subject, html);
};
var sendSubscriptionConfirmed = (to, data) => {
	const { subject, html } = customerSubscriptionConfirmed(data);
	return sendEmail(to, subject, html);
};
var sendUpcomingDelivery = (to, data) => {
	const { subject, html } = customerUpcomingDelivery(data);
	return sendEmail(to, subject, html);
};
var sendAddonsAdded = (to, data) => {
	const { subject, html } = customerAddonsAdded(data);
	return sendEmail(to, subject, html);
};
var sendDeliveryRolled = (to, data) => {
	const { subject, html } = customerDeliveryRolled(data);
	return sendEmail(to, subject, html);
};
/** Goes to SMTP_USER (the shop), not a customer. */
var notifyAdminStockLow = (data) => {
	const { subject, html } = adminStockLow(data);
	return sendEmail(SMTP_USER, subject, html);
};
var sendPaymentFailed = (to, data) => {
	const { subject, html } = customerPaymentFailed(data);
	return sendEmail(to, subject, html);
};
var notifyAdminNewSubscriber = (data) => {
	const { subject, html } = adminNewSubscriber(data);
	return sendEmail(SMTP_USER, subject, html);
};
var notifyAdminGiftOrder = (data) => {
	const { subject, html } = adminGiftOrder(data);
	return sendEmail(SMTP_USER, subject, html);
};
var notifyAdminPaymentFailed = (data) => {
	const { subject, html } = adminPaymentFailed(data);
	return sendEmail(SMTP_USER, subject, html);
};
var sendPlanChanged = (to, data) => {
	const { subject, html } = customerPlanChanged(data);
	return sendEmail(to, subject, html);
};
var notifyAdminPlanChanged = (data) => {
	const { subject, html } = adminPlanChanged(data);
	return sendEmail(SMTP_USER, subject, html);
};
var sendSubscriptionCancelled = (to, data) => {
	const { subject, html } = customerSubscriptionCancelled(data);
	return sendEmail(to, subject, html);
};
var notifyAdminSubscriptionCancelled = (data) => {
	const { subject, html } = adminSubscriptionCancelled(data);
	return sendEmail(SMTP_USER, subject, html);
};
var sendMagicLink = (to, url) => {
	const { subject, html } = customerMagicLink(url);
	return sendEmail(to, subject, html);
};
var sendChangeEmail = (to, url) => {
	const { subject, html } = customerChangeEmail(url);
	return sendEmail(to, subject, html);
};
var sendGiftReceived = (to, data) => {
	const { subject, html } = customerGiftReceived(data);
	return sendEmail(to, subject, html);
};
async function sendOrderConfirmed(to, data) {
	const { subject, html } = customerOrderConfirmed(data);
	return sendEmail(to, subject, html);
}
async function notifyAdminOrder(data) {
	const { subject, html } = adminNewOrder(data);
	return sendEmail(SMTP_USER, subject, html);
}
var sendBulkEmail = (to, data) => {
	const { subject, html } = customerBulkEmail(data);
	return sendEmail(to, subject, html);
};

export { CRON_SECRET as C, SITE as S, sendChangeEmail as a, sendVerifyEmail as b, sendResetPassword as c, sendSubscriptionCancelled as d, notifyAdminSubscriptionCancelled as e, sendPlanChanged as f, notifyAdminPlanChanged as g, sendBulkEmail as h, sendUpcomingDelivery as i, sendPaymentFailed as j, notifyAdminPaymentFailed as k, sendGiftReceived as l, notifyAdminGiftOrder as m, notifyAdminStockLow as n, sendOrderConfirmed as o, notifyAdminOrder as p, sendSubscriptionConfirmed as q, notifyAdminNewSubscriber as r, sendMagicLink as s, sendDeliveryRolled as t, sendAddonsAdded as u };
//# sourceMappingURL=email.js-BnPglp6p.js.map
