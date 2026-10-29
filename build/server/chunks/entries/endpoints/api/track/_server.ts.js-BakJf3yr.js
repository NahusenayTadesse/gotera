import { b as private_env } from '../../../../chunks/shared-server.js-9-2j12mp.js';
import { m as db, O as pageViews } from '../../../../chunks/db.js-Can7tpXV.js';
import { createHash } from 'node:crypto';
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
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/addons.js-B66jfCaP.js';
import '../../../../index.js-CZsLKCjb.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/server.js-qDPizQqb.js';
import '../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';

//#region src/lib/server/analytics.ts
var BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|axios|node-fetch/i;
function isBot(userAgent) {
	return !userAgent || BOT_UA.test(userAgent);
}
function deviceFor(userAgent) {
	if (/ipad|tablet|(android(?!.*mobile))/i.test(userAgent)) return "tablet";
	if (/mobi|iphone|ipod|android/i.test(userAgent)) return "mobile";
	return "desktop";
}
/**
* Same person + same device + same day → same hash. The day is part of the salt, so
* hashes from different days can't be linked, and the raw IP never leaves this function.
*/
function visitorHash(ip, userAgent, day = /* @__PURE__ */ new Date()) {
	const salt = `${private_env.BETTER_AUTH_SECRET ?? ""}:${day.toISOString().slice(0, 10)}`;
	return createHash("sha256").update(`${salt}:${ip}:${userAgent}`).digest("hex").slice(0, 32);
}
/** Only the host of an external referrer — the full URL can carry search terms or tokens. */
function referrerHost(referrer, ownHost) {
	if (typeof referrer !== "string" || !referrer) return null;
	try {
		const host = new URL(referrer).hostname.replace(/^www\./, "");
		return host && host !== ownHost.replace(/^www\./, "") ? host.slice(0, 255) : null;
	} catch {
		return null;
	}
}
async function recordPageView(view) {
	await db.insert(pageViews).values({
		visitorHash: visitorHash(view.ip, view.userAgent),
		path: view.path.slice(0, 255),
		referrer: view.referrer,
		device: deviceFor(view.userAgent),
		signedIn: view.signedIn
	});
}
//#endregion
//#region src/routes/api/track/+server.ts
var POST = async ({ request, locals, url, getClientAddress }) => {
	const userAgent = request.headers.get("user-agent") ?? "";
	if (isBot(userAgent) || locals.role === "Admin") return new Response(null, { status: 204 });
	try {
		const body = JSON.parse(await request.text());
		const path = typeof body.path === "string" ? body.path : "";
		if (!path.startsWith("/") || path.startsWith("/dashboard") || path.startsWith("/api")) return new Response(null, { status: 204 });
		await recordPageView({
			ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || getClientAddress(),
			userAgent,
			path,
			referrer: referrerHost(body.referrer, url.hostname),
			signedIn: !!locals.user
		});
	} catch (e) {
		console.error("page view tracking failed", e);
	}
	return new Response(null, { status: 204 });
};

export { POST };
//# sourceMappingURL=_server.ts.js-BakJf3yr.js.map
