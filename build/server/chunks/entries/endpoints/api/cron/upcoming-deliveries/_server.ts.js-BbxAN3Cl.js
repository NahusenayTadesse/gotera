import { j as sendUpcomingDelivery, S as SITE, C as CRON_SECRET } from '../../../../../chunks/email.js-dqhVc8wQ.js';
import { m as db, I as addresses, x as deliveries, p as subscribers, j as eq, k as and, z as addons, v as isNull, q as subscriptions, b as lt, B as guestOrders, i as inArray, A as giftOrders } from '../../../../../chunks/db.js-1ke6Xzkd.js';
import { s as sellableWithInjera } from '../../../../../chunks/addonCatalogue.js-D0KlpEnS.js';
import { s as shiftDays, b as todayInTimeZone, f as fullDate } from '../../../../../chunks/format.js-DDyQH27n.js';
import { c as cutoffDateFor } from '../../../../../chunks/delivery.js-CH2K0TPd.js';
import { v as error, j as json } from '../../../../../chunks/utils.js-BQt5v-8G.js';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import 'nodemailer';
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
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/addons.js-B66jfCaP.js';
import '../../../../../index.js-CBdg6S5O.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/server.js-qDPizQqb.js';
import '../../../../../chunks/internal2.js-aW-XQIo9.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import 'node:events';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';

/**
* Delete checkouts that were started but never paid, and the address rows created for
* them, so personal data from abandoned attempts doesn't accumulate forever.
*
* Only rows that are still `pending` *and* never received a Stripe id are touched.
* Addresses are removed only if nothing else (another subscription, guest order or
* delivery) still references them.
*/
async function cleanupAbandonedCheckouts(now = /* @__PURE__ */ new Date()) {
	const cutoff = /* @__PURE__ */ new Date(now.getTime() - 336 * 60 * 60 * 1e3);
	const staleSubs = await db.select({
		id: subscriptions.id,
		addressId: subscriptions.addressId
	}).from(subscriptions).where(and(eq(subscriptions.status, "pending"), isNull(subscriptions.stripeSubscriptionId), lt(subscriptions.createdAt, cutoff)));
	const staleGuests = await db.select({
		id: guestOrders.id,
		addressId: guestOrders.addressId
	}).from(guestOrders).where(and(eq(guestOrders.status, "pending"), isNull(guestOrders.stripePaymentIntentId), lt(guestOrders.createdAt, cutoff)));
	if (staleSubs.length) await db.delete(subscriptions).where(inArray(subscriptions.id, staleSubs.map((s) => s.id)));
	if (staleGuests.length) await db.delete(guestOrders).where(inArray(guestOrders.id, staleGuests.map((g) => g.id)));
	const [giftResult] = await db.delete(giftOrders).where(and(eq(giftOrders.status, "pending"), isNull(giftOrders.stripePaymentIntentId), lt(giftOrders.createdAt, cutoff)));
	const candidateIds = [...new Set([...staleSubs, ...staleGuests].map((r) => r.addressId).filter((id) => !!id))];
	let addressesDeleted = 0;
	if (candidateIds.length) {
		const [usedBySubs, usedByGuests, usedByDeliveries] = await Promise.all([
			db.select({ id: subscriptions.addressId }).from(subscriptions).where(inArray(subscriptions.addressId, candidateIds)),
			db.select({ id: guestOrders.addressId }).from(guestOrders).where(inArray(guestOrders.addressId, candidateIds)),
			db.select({ id: deliveries.addressId }).from(deliveries).where(inArray(deliveries.addressId, candidateIds))
		]);
		const stillUsed = new Set([
			...usedBySubs,
			...usedByGuests,
			...usedByDeliveries
		].map((r) => r.id));
		const orphans = candidateIds.filter((id) => !stillUsed.has(id));
		if (orphans.length) {
			const [res] = await db.delete(addresses).where(inArray(addresses.id, orphans));
			addressesDeleted = res.affectedRows;
		}
	}
	return {
		subscriptions: staleSubs.length,
		guestOrders: staleGuests.length,
		giftOrders: giftResult.affectedRows,
		addresses: addressesDeleted
	};
}
//#endregion
//#region src/routes/api/cron/upcoming-deliveries/+server.ts
/** How many days before the scheduled date the reminder goes out. */
var REMINDER_LEAD_DAYS = 2;
function authorised(request) {
	const header = request.headers.get("authorization");
	const bearer = header?.startsWith("Bearer ") ? header.slice(7) : null;
	if (!bearer) return false;
	const a = Buffer.from(bearer);
	const b = Buffer.from(CRON_SECRET);
	return a.length === b.length && timingSafeEqual(a, b);
}
/**
* Curl this once a day (e.g. from an external cron service) to email everyone whose
* delivery is scheduled REMINDER_LEAD_DAYS from now. Idempotent by construction: since
* a given delivery's scheduled_date only ever matches "today + lead days" on one
* calendar day, running this once daily can't double-send without a dedup column.
*/
var GET = async ({ request }) => {
	if (!authorised(request)) error(401, "Unauthorized");
	const targetDateString = shiftDays(todayInTimeZone(), REMINDER_LEAD_DAYS);
	const [y, m, d] = targetDateString.split("-").map(Number);
	const targetDate = new Date(y, m - 1, d);
	const [upcoming, [activeAddon]] = await Promise.all([db.select({
		deliveryId: deliveries.id,
		addonAccessToken: deliveries.addonAccessToken,
		email: subscribers.email,
		name: subscribers.fullName,
		scheduledDate: deliveries.scheduledDate,
		line1: addresses.line1,
		line2: addresses.line2,
		city: addresses.city,
		postcode: addresses.postcode
	}).from(deliveries).innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).innerJoin(addresses, eq(addresses.id, deliveries.addressId)).where(and(eq(deliveries.status, "scheduled"), eq(deliveries.scheduledDate, targetDate))), db.select({ id: addons.id }).from(addons).where(sellableWithInjera()).limit(1)]);
	let cleanedUp;
	try {
		cleanedUp = await cleanupAbandonedCheckouts();
	} catch (e) {
		console.error("abandoned checkout cleanup failed", e);
		cleanedUp = { error: "cleanup failed" };
	}
	if (upcoming.length === 0) return json({
		targetDate: targetDateString,
		checked: 0,
		sent: 0,
		cleanedUp
	});
	const addonsAvailable = Boolean(activeAddon);
	if (addonsAvailable) await Promise.all(upcoming.filter((row) => !row.addonAccessToken).map((row) => {
		const token = randomBytes(24).toString("base64url");
		row.addonAccessToken = token;
		return db.update(deliveries).set({ addonAccessToken: token }).where(and(eq(deliveries.id, row.deliveryId), isNull(deliveries.addonAccessToken)));
	}));
	const results = await Promise.allSettled(upcoming.map((d) => sendUpcomingDelivery(d.email, {
		name: d.name ?? "there",
		deliveryLabel: fullDate(d.scheduledDate),
		cutoffLabel: fullDate(cutoffDateFor(d.scheduledDate)),
		address: [
			d.line1,
			d.line2,
			d.city,
			d.postcode
		].filter(Boolean).join(", "),
		addonsUrl: addonsAvailable && d.addonAccessToken ? `${SITE}/addons/${d.addonAccessToken}` : void 0
	})));
	const sent = results.filter((r) => r.status === "fulfilled").length;
	const failed = results.length - sent;
	return json({
		targetDate: targetDateString,
		checked: upcoming.length,
		sent,
		failed,
		cleanedUp
	});
};

export { GET };
//# sourceMappingURL=_server.ts.js-BbxAN3Cl.js.map
