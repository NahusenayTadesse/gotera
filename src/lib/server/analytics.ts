import { createHash } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { pageViews } from '$lib/server/db/schema';

const BOT_UA =
	/bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|axios|node-fetch/i;

export function isBot(userAgent: string) {
	return !userAgent || BOT_UA.test(userAgent);
}

export function deviceFor(userAgent: string): 'mobile' | 'tablet' | 'desktop' {
	if (/ipad|tablet|(android(?!.*mobile))/i.test(userAgent)) return 'tablet';
	if (/mobi|iphone|ipod|android/i.test(userAgent)) return 'mobile';
	return 'desktop';
}

/**
 * Same person + same device + same day → same hash. The day is part of the salt, so
 * hashes from different days can't be linked, and the raw IP never leaves this function.
 */
export function visitorHash(ip: string, userAgent: string, day = new Date()) {
	const salt = `${env.BETTER_AUTH_SECRET ?? ''}:${day.toISOString().slice(0, 10)}`;
	return createHash('sha256').update(`${salt}:${ip}:${userAgent}`).digest('hex').slice(0, 32);
}

/** Only the host of an external referrer — the full URL can carry search terms or tokens. */
export function referrerHost(referrer: unknown, ownHost: string): string | null {
	if (typeof referrer !== 'string' || !referrer) return null;
	try {
		const host = new URL(referrer).hostname.replace(/^www\./, '');
		return host && host !== ownHost.replace(/^www\./, '') ? host.slice(0, 255) : null;
	} catch {
		return null;
	}
}

export async function recordPageView(view: {
	ip: string;
	userAgent: string;
	path: string;
	referrer: string | null;
	signedIn: boolean;
}) {
	await db.insert(pageViews).values({
		visitorHash: visitorHash(view.ip, view.userAgent),
		path: view.path.slice(0, 255),
		referrer: view.referrer,
		device: deviceFor(view.userAgent),
		signedIn: view.signedIn
	});
}
