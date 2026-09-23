import { m as db, D as pushSubscriptions, j as eq } from '../../../../chunks/db.js-BXYNtFGm.js';
import { v as error, j as json } from '../../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, s as string, a5 as url } from '../../../../chunks/access.js-BTJQW2Ke.js';
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
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../index.js-C0U4KHbt.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/server.js-qDPizQqb.js';
import '../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';

//#region src/routes/api/push/+server.ts
var subscriptionSchema = object({
	endpoint: url().max(512),
	keys: object({
		p256dh: string().min(1).max(255),
		auth: string().min(1).max(255)
	})
});
/** Save (or re-point) this browser's push subscription for the signed-in user. */
var POST = async ({ request, locals }) => {
	if (!locals.user) error(401, "Sign in to enable notifications");
	const parsed = subscriptionSchema.safeParse(await request.json().catch(() => null));
	if (!parsed.success) error(400, "Invalid subscription");
	const { endpoint, keys } = parsed.data;
	await db.insert(pushSubscriptions).values({
		userId: locals.user.id,
		endpoint,
		p256dh: keys.p256dh,
		auth: keys.auth
	}).onDuplicateKeyUpdate({ set: {
		userId: locals.user.id,
		p256dh: keys.p256dh,
		auth: keys.auth
	} });
	return json({ ok: true });
};
/** Forget this browser's subscription (the user turned notifications off). */
var DELETE = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (typeof body?.endpoint !== "string") error(400, "Missing endpoint");
	await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, body.endpoint));
	return json({ ok: true });
};

export { DELETE, POST };
//# sourceMappingURL=_server.ts.js-Be3CAqzt.js.map
