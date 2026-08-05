import { sequence } from '@sveltejs/kit/hooks';
import { getTextDirection, cookieName, cookieMaxAge } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { db } from '$lib/server/db';
import { user, roles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
		event.locals.role = await db
			.select({ name: roles.name })
			.from(user)
			.leftJoin(roles, eq(user.roleId, roles.id))
			.where(eq(user.id, session.user.id))
			.limit(1)
			.then((rows) => rows[0]?.name ?? '');
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const handleParaglide: Handle = ({ event, resolve }) => {
	// `en` is the base locale and has no URL prefix by design, so paraglide's
	// generated URL patterns have no dedicated "/en" pattern — a literal "/en"
	// path gets swallowed by the base locale's catch-all pattern as opaque
	// path data instead of being recognized as an explicit locale request.
	// Handle it ourselves: redirect to the equivalent bare path and force the
	// cookie to "en", mirroring how "/am/..." persists via cookie sync.
	const url = new URL(event.request.url);
	if (url.pathname === '/en' || url.pathname.startsWith('/en/')) {
		const strippedPath = url.pathname.slice('/en'.length) || '/';
		const redirectUrl = new URL(strippedPath + url.search, url.origin);
		event.cookies.set(cookieName, 'en', {
			path: '/',
			maxAge: cookieMaxAge,
			httpOnly: false
		});
		return new Response(null, {
			status: 307,
			headers: { location: redirectUrl.href }
		});
	}

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		// Keep the cookie in sync with whichever locale actually served this
		// request (URL-forced for /am/..., cookie-remembered otherwise), so a
		// subsequent navigation to an unprefixed route doesn't snap back to
		// the base locale.
		if (event.cookies.get(cookieName) !== locale) {
			event.cookies.set(cookieName, locale, {
				path: '/',
				maxAge: cookieMaxAge,
				httpOnly: false
			});
		}

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};

export const handle: Handle = sequence(handleBetterAuth, handleParaglide);
