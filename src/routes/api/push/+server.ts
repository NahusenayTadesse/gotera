import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '$lib/server/db';
import { pushSubscriptions } from '$lib/server/db/schema';

const subscriptionSchema = z.object({
	endpoint: z.url().max(512),
	keys: z.object({
		p256dh: z.string().min(1).max(255),
		auth: z.string().min(1).max(255)
	})
});

/** Save (or re-point) this browser's push subscription for the signed-in user. */
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) error(401, 'Sign in to enable notifications');

	const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null));
	if (!parsed.success) error(400, 'Invalid subscription');

	const { endpoint, keys } = parsed.data;

	// Same device signing in as a different user takes the subscription over, so the
	// previous account stops receiving pushes on a browser it no longer uses.
	await db
		.insert(pushSubscriptions)
		.values({ userId: locals.user.id, endpoint, p256dh: keys.p256dh, auth: keys.auth })
		.onDuplicateKeyUpdate({
			set: { userId: locals.user.id, p256dh: keys.p256dh, auth: keys.auth }
		});

	return json({ ok: true });
};

/** Forget this browser's subscription (the user turned notifications off). */
export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json().catch(() => null)) as { endpoint?: unknown } | null;
	if (typeof body?.endpoint !== 'string') error(400, 'Missing endpoint');

	// Keyed on the endpoint alone: it is an unguessable capability URL held only by the
	// browser that owns it, and unsubscribing must still work after the session ends.
	await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, body.endpoint));

	return json({ ok: true });
};
