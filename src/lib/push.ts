import { env } from '$env/dynamic/public';

/** Push needs a VAPID key and browser support (on iOS, only once added to the home screen). */
export function pushSupported() {
	return (
		Boolean(env.PUBLIC_VAPID_KEY) &&
		'serviceWorker' in navigator &&
		'PushManager' in window &&
		'Notification' in window
	);
}

function urlBase64ToUint8Array(base64: string) {
	const padded = (base64 + '='.repeat((4 - (base64.length % 4)) % 4))
		.replace(/-/g, '+')
		.replace(/_/g, '/');
	return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

export async function currentPushSubscription() {
	const registration = await navigator.serviceWorker.ready;
	return registration.pushManager.getSubscription();
}

/** Subscribe this browser (reusing an existing subscription) and register it to the signed-in user. */
export async function subscribeToPush() {
	const registration = await navigator.serviceWorker.ready;
	const subscription =
		(await registration.pushManager.getSubscription()) ??
		(await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(env.PUBLIC_VAPID_KEY!)
		}));

	const res = await fetch('/api/push', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(subscription)
	});
	if (!res.ok) throw new Error(`Saving push subscription failed: ${res.status}`);
}

export async function unsubscribeFromPush() {
	const subscription = await currentPushSubscription();
	if (!subscription) return;

	await fetch('/api/push', {
		method: 'DELETE',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ endpoint: subscription.endpoint })
	});
	await subscription.unsubscribe();
}
