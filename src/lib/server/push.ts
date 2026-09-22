import webpush from 'web-push';
import { eq, inArray } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { db } from './db';
import { pushSubscriptions } from './db/schema';

export type PushPayload = {
	title: string;
	body?: string;
	/** Where tapping the notification takes the user. Defaults to /account. */
	url?: string;
	/** Notifications sharing a tag replace each other instead of stacking. */
	tag?: string;
};

let configured: boolean | undefined;

// Push is optional: without VAPID keys every send is a silent no-op, so local dev and
// deploys that haven't set it up keep working exactly as before.
function ensureConfigured() {
	if (configured !== undefined) return configured;
	const publicKey = publicEnv.PUBLIC_VAPID_KEY;
	const privateKey = env.VAPID_PRIVATE_KEY;
	configured = Boolean(publicKey && privateKey);
	if (configured) {
		webpush.setVapidDetails(
			env.VAPID_SUBJECT || 'mailto:hello@gotera.co.uk',
			publicKey!,
			privateKey!
		);
	}
	return configured;
}

/**
 * Send a push notification to every device the user has opted in on. Never throws —
 * a failed push must not break the request (webhook, form action) that triggered it.
 */
export async function sendPushToUser(userId: string, payload: PushPayload) {
	if (!ensureConfigured()) return;

	try {
		const subs = await db
			.select()
			.from(pushSubscriptions)
			.where(eq(pushSubscriptions.userId, userId));

		const body = JSON.stringify(payload);
		const expired: string[] = [];

		await Promise.all(
			subs.map(async (sub) => {
				try {
					await webpush.sendNotification(
						{ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
						body
					);
				} catch (err) {
					// 404/410: the browser unsubscribed or the subscription expired. Drop it so
					// we stop sending to a dead endpoint.
					const status = (err as { statusCode?: number }).statusCode;
					if (status === 404 || status === 410) expired.push(sub.id);
					else console.error('Push send failed', status, err);
				}
			})
		);

		if (expired.length) {
			await db.delete(pushSubscriptions).where(inArray(pushSubscriptions.id, expired));
		}
	} catch (err) {
		console.error('Push delivery error', err);
	}
}
