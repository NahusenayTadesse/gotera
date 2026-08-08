import { A as get_request_store, m as merge_tracing, w as with_request_store } from '../chunks/utils.js-BQt5v-8G.js';
import { d as building } from '../chunks/internal.js-B6-4oVm4.js';
import { m as db, r as roles, u as user, j as eq } from '../chunks/db.js-BkD50_-0.js';
import { a as auth, s as svelteKitHandler } from '../chunks/auth.js-DZBRJAcg.js';
import { c as cookieName, a as cookieMaxAge, g as getServerAsyncLocalStorage, i as isExcludedByRouteStrategy, s as serverAsyncLocalStorage, b as getStrategyForUrl, d as shouldRedirect, e as deLocalizeUrl, o as overwriteServerAsyncLocalStorage, f as getTextDirection } from '../chunks/runtime.js-CYqc9Mf9.js';
import '../chunks/shared.js-CgqsOrws.js';
import 'node:buffer';
import 'url';
import 'net';
import 'tls';
import 'timers';
import 'events';
import 'stream';
import 'buffer';
import 'string_decoder';
import 'process';
import 'crypto';
import 'zlib';
import 'util';
import '../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../chunks/shared-server.js-9-2j12mp.js';
import '../index.js-CNe0N484.js';
import '../chunks/exports.js-BT-QlP_6.js';
import '../chunks/routing.js-CU5UDpt8.js';
import '../chunks/server.js-CPNQ0GBv.js';
import '../chunks/internal2.js-CNjKCACj.js';
import '../chunks/legacy-client.js-CYlmvPew.js';
import '../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../chunks/access.js-HgBsL8za.js';
import '../chunks/dialect.js-DJNK594B.js';
import 'nodemailer';

/** @import { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit' */
/** @import { MaybePromise } from 'types' */

/**
 * A helper function for sequencing multiple `handle` calls in a middleware-like manner.
 * The behavior for the `handle` options is as follows:
 * - `transformPageChunk` is applied in reverse order and merged
 * - `preload` is applied in forward order, the first option "wins" and no `preload` options after it are called
 * - `filterSerializedResponseHeaders` behaves the same as `preload`
 *
 * ```js
 * /// file: src/hooks.server.js
 * import { sequence } from '@sveltejs/kit/hooks';
 *
 * /// type: import('@sveltejs/kit').Handle
 * async function first({ event, resolve }) {
 * 	console.log('first pre-processing');
 * 	const result = await resolve(event, {
 * 		transformPageChunk: ({ html }) => {
 * 			// transforms are applied in reverse order
 * 			console.log('first transform');
 * 			return html;
 * 		},
 * 		preload: () => {
 * 			// this one wins as it's the first defined in the chain
 * 			console.log('first preload');
 * 			return true;
 * 		}
 * 	});
 * 	console.log('first post-processing');
 * 	return result;
 * }
 *
 * /// type: import('@sveltejs/kit').Handle
 * async function second({ event, resolve }) {
 * 	console.log('second pre-processing');
 * 	const result = await resolve(event, {
 * 		transformPageChunk: ({ html }) => {
 * 			console.log('second transform');
 * 			return html;
 * 		},
 * 		preload: () => {
 * 			console.log('second preload');
 * 			return true;
 * 		},
 * 		filterSerializedResponseHeaders: () => {
 * 			// this one wins as it's the first defined in the chain
 * 			console.log('second filterSerializedResponseHeaders');
 * 			return true;
 * 		}
 * 	});
 * 	console.log('second post-processing');
 * 	return result;
 * }
 *
 * export const handle = sequence(first, second);
 * ```
 *
 * The example above would print:
 *
 * ```
 * first pre-processing
 * first preload
 * second pre-processing
 * second filterSerializedResponseHeaders
 * second transform
 * first transform
 * second post-processing
 * first post-processing
 * ```
 *
 * @param {...Handle} handlers The chain of `handle` functions
 * @returns {Handle}
 */
function sequence(...handlers) {
	const length = handlers.length;
	if (!length) return ({ event, resolve }) => resolve(event);

	return ({ event, resolve }) => {
		const { state } = get_request_store();
		return apply_handle(0, event, {});

		/**
		 * @param {number} i
		 * @param {RequestEvent} event
		 * @param {ResolveOptions | undefined} parent_options
		 * @returns {MaybePromise<Response>}
		 */
		function apply_handle(i, event, parent_options) {
			const handle = handlers[i];

			return state.tracing.record_span({
				name: `sveltekit.handle.sequenced.${handle.name ? handle.name : i}`,
				attributes: {},
				fn: async (current) => {
					const traced_event = merge_tracing(event, current);
					return await with_request_store({ event: traced_event, state }, () =>
						handle({
							event: traced_event,
							resolve: (event, options) => {
								/** @type {ResolveOptions['transformPageChunk']} */
								const transformPageChunk = async ({ html, done }) => {
									if (options?.transformPageChunk) {
										html = (await options.transformPageChunk({ html, done })) ?? '';
									}

									if (parent_options?.transformPageChunk) {
										html = (await parent_options.transformPageChunk({ html, done })) ?? '';
									}

									return html;
								};

								/** @type {ResolveOptions['filterSerializedResponseHeaders']} */
								const filterSerializedResponseHeaders =
									parent_options?.filterSerializedResponseHeaders ??
									options?.filterSerializedResponseHeaders;

								/** @type {ResolveOptions['preload']} */
								const preload = parent_options?.preload ?? options?.preload;

								return i < length - 1
									? apply_handle(i + 1, event, {
											transformPageChunk,
											filterSerializedResponseHeaders,
											preload
										})
									: resolve(event, {
											transformPageChunk,
											filterSerializedResponseHeaders,
											preload
										});
							}
						})
					);
				}
			});
		}
	};
}

//#region src/lib/paraglide/server.js
/**
* Server middleware that handles locale-based routing and request processing.
*
* Configure `disableAsyncLocalStorage` when generating Paraglide with
* `paraglideVitePlugin()` or `compile()`, not when calling
* `paraglideMiddleware()`. Keep AsyncLocalStorage enabled by default and
* only disable it for runtimes that lack `AsyncLocalStorage` support and
* guarantee request isolation.
*
* This middleware performs several key functions:
*
* 1. Determines the locale for the incoming request using configured strategies
* 2. Handles URL localization and redirects (only for document requests)
* 3. Maintains locale state using AsyncLocalStorage to prevent request interference
*
* When URL strategy is used:
*
* - The locale is extracted from the URL for all request types
* - If URL doesn't match the determined locale, redirects to localized URL (only for document requests)
* - De-localizes URLs before passing to server (e.g., `/fr/about` → `/about`)
*
* @see https://paraglidejs.com/middleware
*
* @template T - The return type of the resolve function
*
* @param {Request} request - The incoming request object
* @param {(args: { request: Request, locale: import("./runtime.js").Locale }) => T | Promise<T>} resolve - Function to handle the request. The callback receives:
*   - `request`: A modified request with a delocalized URL when the URL strategy is used (e.g., `/fr/about` → `/about`).
*      If your framework handles URL localization itself (e.g., TanStack Router's `rewrite` option), use the original
*      request instead to avoid redirect loops.
*   - `locale`: The determined locale for this request.
* @param {{
*   effectiveRequestUrl?: string | URL | ((request: Request) => string | URL),
*   onRedirect?: (response: Response) => void
* }} [options] - Options to control middleware behavior. `effectiveRequestUrl` sets the effective request URL used for route matching, URL-based locale detection, redirects, and `getUrlOrigin()`.
* @returns {Promise<Response>}
*
* @example
* ```typescript
* // Basic usage in metaframeworks like NextJS, SvelteKit, Astro, Nuxt, etc.
* export const handle = async ({ event, resolve }) => {
*   return paraglideMiddleware(event.request, ({ request, locale }) => {
*     // let the framework further resolve the request
*     return resolve(request);
*   });
* };
* ```
*
* @example
* ```typescript
* // Usage in a framework like Express JS or Hono
* app.use(async (req, res, next) => {
*   const result = await paraglideMiddleware(req, ({ request, locale }) => {
*     // If a redirect happens this won't be called
*     return next(request);
*   });
* });
* ```
*
* @example
* ```typescript
* // Usage with frameworks that handle URL localization/delocalization themselves
* //
* // Some frameworks like TanStack Router handle URL localization and delocalization
* // themselves via their own rewrite APIs (e.g., `rewrite.input`/`rewrite.output`).
* //
* // When the framework handles this, the middleware's URL delocalization is not needed.
* // Using the modified `request` from the callback would cause a redirect loop because
* // both the middleware and the framework would attempt to delocalize the URL.
* //
* // Solution: Pass the original request to the handler instead of the modified one.
* // The middleware still handles locale detection, cookies, and AsyncLocalStorage context.
* //
* // ❌ WRONG - causes redirect loop when framework handles URL rewriting:
* // paraglideMiddleware(req, ({ request }) => handler.fetch(request))
* //
* // ✅ CORRECT - use original request when framework handles URL localization:
* // paraglideMiddleware(req, () => handler.fetch(req))
*
* * *
* export default {
*   fetch(req: Request): Promise<Response> {
*     // TanStack Router handles URL rewriting via deLocalizeUrl/localizeUrl
*     // so we pass the original `req` instead of the modified `request`
*     return paraglideMiddleware(req, () => handler.fetch(req))
*   },
* }
* ```
*/
async function paraglideMiddleware(request, resolve, options) {
	let requestAsyncLocalStorage = serverAsyncLocalStorage;
	requestAsyncLocalStorage = getServerAsyncLocalStorage();
	if (!requestAsyncLocalStorage) {
		const { AsyncLocalStorage } = await import('async_hooks');
		requestAsyncLocalStorage = getServerAsyncLocalStorage();
		if (!requestAsyncLocalStorage) {
			requestAsyncLocalStorage = new AsyncLocalStorage();
			overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
		}
	}
	if (!requestAsyncLocalStorage) {
		requestAsyncLocalStorage = createMockAsyncLocalStorage();
		overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
	}
	const url = resolveMiddlewareUrl(request, options?.effectiveRequestUrl);
	const origin = url.origin;
	if (isExcludedByRouteStrategy(url.href)) {
		const locale = "en";
		const newRequest = cloneRequestWithFallback(request, url);
		/** @type {Set<string>} */
		const messageCalls = /* @__PURE__ */ new Set();
		return await requestAsyncLocalStorage?.run({
			locale,
			origin,
			messageCalls
		}, () => resolve({
			locale,
			request: newRequest
		}));
	}
	const strategy = getStrategyForUrl(url.href);
	const decision = await shouldRedirect({
		request,
		effectiveRequestUrl: url
	});
	const locale = decision.locale;
	if (request.headers.get("Sec-Fetch-Dest") === "document" && decision.shouldRedirect && decision.redirectUrl) {
		/** @type {Record<string, string>} */
		const headers = {};
		if (strategy.includes("preferredLanguage")) headers["Vary"] = "Accept-Language";
		const response = new Response(null, {
			status: 307,
			headers: {
				Location: decision.redirectUrl.href,
				...headers
			}
		});
		return response;
	}
	let newRequest;
	if (strategy.includes("url")) newRequest = cloneRequestWithFallback(request, deLocalizeUrl(url));
	else newRequest = cloneRequestWithFallback(request, url);
	/** @type {Set<string>} */
	const messageCalls = /* @__PURE__ */ new Set();
	return await requestAsyncLocalStorage?.run({
		locale,
		origin,
		messageCalls
	}, () => resolve({
		locale,
		request: newRequest
	}));
}
/**
* @param {Request} request
* @param {string | URL | ((request: Request) => string | URL) | undefined} effectiveRequestUrl
* @returns {URL}
*/
function resolveMiddlewareUrl(request, effectiveRequestUrl) {
	if (effectiveRequestUrl instanceof URL) return new URL(effectiveRequestUrl, request.url);
	return new URL(request.url);
}
/**
* Some metaframeworks (NextJS) require a new Request object.
* https://github.com/opral/inlang-paraglide-js/issues/411
*
* However, some frameworks (TanStack Start 1.143+) use custom Request
* implementations that cannot be cloned with `new Request(request)`.
* https://github.com/opral/paraglide-js/issues/573
*
* Effective request URL overrides behind proxies:
* https://github.com/opral/paraglide-js/issues/652
*
* @param {Request} request
* @param {string | URL} [url]
* @returns {Request}
*/
function cloneRequestWithFallback(request, url = request.url) {
	const targetUrl = typeof url === "string" ? url : url.href;
	if (targetUrl === request.url) try {
		return new Request(request.clone());
	} catch {
		try {
			return new Request(request);
		} catch {
			return request;
		}
	}
	try {
		return new Request(targetUrl, request.clone());
	} catch {
		try {
			return new Request(targetUrl, request);
		} catch {
			return request;
		}
	}
}
/**
* Creates a mock AsyncLocalStorage implementation for environments where
* native AsyncLocalStorage is not available or disabled.
*
* This mock implementation mimics the behavior of the native AsyncLocalStorage
* but doesn't require the async_hooks module. It's used as a fallback when
* the runtime does not expose AsyncLocalStorage or when it has been disabled.
*
* @returns {import("./runtime.js").ParaglideAsyncLocalStorage}
*/
function createMockAsyncLocalStorage() {
	/** @type {any} */
	let currentStore = void 0;
	return {
		getStore() {
			return currentStore;
		},
		async run(store, callback) {
			currentStore = store;
			try {
				return await callback();
			} finally {
				currentStore = void 0;
			}
		}
	};
}
//#endregion
//#region src/hooks.server.ts
var handleBetterAuth = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
		event.locals.role = await db.select({ name: roles.name }).from(user).leftJoin(roles, eq(user.roleId, roles.id)).where(eq(user.id, session.user.id)).limit(1).then((rows) => rows[0]?.name ?? "");
	}
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
};
var handleParaglide = ({ event, resolve }) => {
	const url = new URL(event.request.url);
	if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
		const strippedPath = url.pathname.slice(3) || "/";
		const redirectUrl = new URL(strippedPath + url.search, url.origin);
		event.cookies.set(cookieName, "en", {
			path: "/",
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
		if (event.cookies.get("PARAGLIDE_LOCALE") !== locale) event.cookies.set(cookieName, locale, {
			path: "/",
			maxAge: cookieMaxAge,
			httpOnly: false
		});
		return resolve(event, { transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale).replace("%paraglide.dir%", getTextDirection(locale)) });
	});
};
var handle = sequence(handleBetterAuth, handleParaglide);

export { handle };
//# sourceMappingURL=hooks.server.js-DJTuiD4x.js.map
