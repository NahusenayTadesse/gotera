/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `gotera-cache-${version}`;

// Large media is served straight from the network and cached lazily on first
// use — precaching it would make installing the app pull down several MB of
// video before the first paint.
const PRECACHE_SKIP = /\.(mp4|webm|mov|avif)$/i;

// Immutable, content-hashed build output plus the small static assets. These
// can be served from the cache forever, because a new deploy produces a new
// `version` and therefore a whole new cache.
const PRECACHE = [...build, ...files.filter((file) => !PRECACHE_SKIP.test(file))];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
			)
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Only ever touch same-origin GETs. Anything else — form posts, the Stripe
	// and auth endpoints, cross-origin fonts — goes straight to the network so
	// the worker can never serve a stale or wrongly-scoped response.
	if (request.method !== 'GET' || url.origin !== location.origin) return;

	// Navigations and API calls stay network-only: pages here are per-user
	// (session, basket, subscription state) and must never come from a cache.
	if (request.mode === 'navigate' || url.pathname.startsWith('/api')) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			const cached = await cache.match(request);
			if (cached) return cached;

			const response = await fetch(request);

			// Opaque and error responses are left uncached so a transient failure
			// doesn't get pinned for the lifetime of this version's cache.
			if (response.ok && response.type === 'basic') {
				cache.put(request, response.clone());
			}

			return response;
		})()
	);
});

// ── Push notifications ──
// Payload shape comes from `PushPayload` in $lib/server/push.ts.
sw.addEventListener('push', (event) => {
	let data: { title?: string; body?: string; url?: string; tag?: string } = {};
	try {
		data = event.data?.json() ?? {};
	} catch {
		data = { body: event.data?.text() };
	}

	event.waitUntil(
		sw.registration.showNotification(data.title || 'GOTERA', {
			body: data.body,
			tag: data.tag,
			icon: '/icon-192.png',
			badge: '/icon-192.png',
			data: { url: data.url || '/account' }
		})
	);
});

sw.addEventListener('notificationclick', (event) => {
	event.notification.close();
	const target = new URL(event.notification.data?.url || '/', location.origin).href;

	event.waitUntil(
		(async () => {
			// Reuse an open GOTERA tab/window rather than opening a second one.
			const windows = await sw.clients.matchAll({ type: 'window', includeUncontrolled: true });
			for (const client of windows) {
				if (new URL(client.url).origin === location.origin) {
					await client.focus();
					return client.navigate(target);
				}
			}
			return sw.clients.openWindow(target);
		})()
	);
});
