import type { RequestHandler } from './$types';
import { isBot, recordPageView, referrerHost } from '$lib/server/analytics';

// Page-view beacon from the root layout. Always answers 204 — analytics must never
// surface an error to a visitor, and a bot or a bad payload just isn't recorded.
export const POST: RequestHandler = async ({ request, locals, url, getClientAddress }) => {
	const userAgent = request.headers.get('user-agent') ?? '';
	if (isBot(userAgent) || locals.role === 'Admin') return new Response(null, { status: 204 });

	try {
		// sendBeacon posts the JSON as text/plain, so parse it by hand.
		const body = JSON.parse(await request.text()) as { path?: unknown; referrer?: unknown };
		const path = typeof body.path === 'string' ? body.path : '';
		if (!path.startsWith('/') || path.startsWith('/dashboard') || path.startsWith('/api')) {
			return new Response(null, { status: 204 });
		}

		// Behind the reverse proxy the socket address is the proxy's, so prefer the
		// forwarded client address when there is one.
		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
			request.headers.get('x-real-ip') ||
			getClientAddress();

		await recordPageView({
			ip,
			userAgent,
			path,
			referrer: referrerHost(body.referrer, url.hostname),
			signedIn: !!locals.user
		});
	} catch (e) {
		console.error('page view tracking failed', e);
	}
	return new Response(null, { status: 204 });
};
