import { b as private_env } from '../../../../../chunks/shared-server.js-9-2j12mp.js';
import { m as db, F as addresses, p as subscribers, v as deliveries, j as eq, k as and, i as inArray, M as guestOrders, N as giftOrders } from '../../../../../chunks/db.js-BXYNtFGm.js';
import { t as toCalendarString } from '../../../../../chunks/format.js-DhQga0l2.js';
import { b as bulkLookupPostcodes, l as lookupPostcode } from '../../../../../chunks/geocode.js-hCa1RR8a.js';
import { n as nextDeliveryDate } from '../../../../../chunks/deliverySchedule.js-TeFrWFLN.js';
import { p as parseJsonColumn } from '../../../../../chunks/format2.js-D8oyWA_y.js';

//#region src/lib/server/route.ts
var EARTH_RADIUS_M = 6371e3;
var toRad = (deg) => deg * Math.PI / 180;
/** Great-circle distance in metres. */
function haversine(a, b) {
	const dLat = toRad(b.latitude - a.latitude);
	const dLon = toRad(b.longitude - a.longitude);
	const lat1 = toRad(a.latitude);
	const lat2 = toRad(b.latitude);
	const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
	return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}
/**
* Straight-line cost matrix, in metres.
*
* The fallback when ORS is unavailable, and a perfectly reasonable one in a dense city:
* across a London borough, crow-flies distance correlates well enough with drive time to
* produce a sensible stop order. The absolute totals are optimistic, which is why the UI
* labels them as estimates whenever this is what produced them.
*/
function haversineMatrix(points) {
	return points.map((from) => points.map((to) => haversine(from, to)));
}
/**
* Real driving durations (seconds) and distances (metres) from OpenRouteService.
*
* Returns null on *any* problem — missing key, rate limit, network, unexpected shape — so
* the caller falls back to `haversineMatrix` and the planner still renders. A route
* planner that 500s because a third party is down is worse than one showing estimates.
*/
async function fetchDurationMatrix(points, apiKey) {
	if (!apiKey || points.length < 2) return null;
	try {
		const res = await fetch("https://api.openrouteservice.org/v2/matrix/driving-car", {
			method: "POST",
			headers: {
				Authorization: apiKey,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				locations: points.map((p) => [p.longitude, p.latitude]),
				metrics: ["duration", "distance"]
			})
		});
		if (!res.ok) return null;
		const { durations, distances } = await res.json() ?? {};
		if (!Array.isArray(durations) || !Array.isArray(distances)) return null;
		const clean = (m) => m.map((row) => row.map((v) => typeof v === "number" ? v : Infinity));
		return {
			durations: clean(durations),
			distances: clean(distances)
		};
	} catch {
		return null;
	}
}
/** Total cost of a closed tour, including the leg home from the last stop. */
function tourCost(matrix, order) {
	let total = 0;
	for (let i = 0; i < order.length - 1; i++) total += matrix[order[i]][order[i + 1]];
	if (order.length > 1) total += matrix[order[order.length - 1]][order[0]];
	return total;
}
/**
* Order the stops into a circuit.
*
* Index 0 is the depot and is pinned as both start and end — that pinning is the whole
* difference between a circuit and an open path, and it is why 2-opt below never touches
* position 0.
*
* Returns the visiting order as indices into the original array, e.g. `[0, 3, 1, 2]`
* meaning depot → point 3 → point 1 → point 2 → depot.
*/
function solveCircuit(matrix) {
	const n = matrix.length;
	if (n <= 3) return matrix.map((_, i) => i);
	const unvisited = /* @__PURE__ */ new Set();
	for (let i = 1; i < n; i++) unvisited.add(i);
	const order = [0];
	let current = 0;
	while (unvisited.size > 0) {
		let best = -1;
		let bestCost = Infinity;
		for (const candidate of unvisited) {
			const cost = matrix[current][candidate];
			if (cost < bestCost) {
				bestCost = cost;
				best = candidate;
			}
		}
		if (best === -1) {
			for (const rest of unvisited) order.push(rest);
			break;
		}
		order.push(best);
		unvisited.delete(best);
		current = best;
	}
	let improved = true;
	let guard = 0;
	const MAX_PASSES = 100;
	let bestCost = tourCost(matrix, order);
	while (improved && guard++ < MAX_PASSES) {
		improved = false;
		for (let i = 1; i < order.length - 1; i++) for (let j = i + 1; j < order.length; j++) {
			const candidate = order.slice(0, i).concat(order.slice(i, j + 1).reverse(), order.slice(j + 1));
			const cost = tourCost(matrix, candidate);
			if (cost < bestCost - 1e-9) {
				order.splice(0, order.length, ...candidate);
				bestCost = cost;
				improved = true;
			}
		}
	}
	return order;
}
//#endregion
//#region src/routes/dashboard/deliveries/route/+page.server.ts
/** Where the van starts and ends. Configurable so the depot can move without a deploy. */
var DEPOT_POSTCODE = private_env.DEPOT_POSTCODE ?? "N17 8AA";
var load = async ({ url }) => {
	const requested = url.searchParams.get("date");
	const date = /^\d{4}-\d{2}-\d{2}$/.test(requested ?? "") ? requested : toCalendarString(await nextDeliveryDate());
	const [subscriptionRows, guestRows, giftRows] = await Promise.all([
		db.select({
			id: deliveries.id,
			name: subscribers.fullName,
			email: subscribers.email,
			line1: addresses.line1,
			line2: addresses.line2,
			city: addresses.city,
			postcode: addresses.postcode,
			latitude: addresses.latitude,
			longitude: addresses.longitude
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).where(and(eq(deliveries.scheduledDate, /* @__PURE__ */ new Date(`${date}T00:00:00`)), inArray(deliveries.status, ["scheduled", "dispatched"]))),
		db.select().from(guestOrders).where(eq(guestOrders.status, "paid")),
		db.select().from(giftOrders).where(eq(giftOrders.status, "paid"))
	]);
	const fromJson = (raw, id, kind, name) => {
		const a = parseJsonColumn(raw, {
			line1: "",
			city: "",
			postcode: ""
		});
		return {
			id,
			kind,
			name: name || (kind === "guest" ? "Guest order" : "Gift order"),
			line1: a.line1,
			line2: a.line2 ?? null,
			city: a.city,
			postcode: a.postcode,
			latitude: null,
			longitude: null
		};
	};
	const stops = [
		...subscriptionRows.map((r) => ({
			id: r.id,
			kind: "subscription",
			name: r.name || r.email || "Subscriber",
			line1: r.line1 ?? "",
			line2: r.line2 ?? null,
			city: r.city ?? "",
			postcode: r.postcode ?? "",
			latitude: r.latitude,
			longitude: r.longitude
		})),
		...guestRows.map((r) => fromJson(r.recipientAddress, r.id, "guest", r.recipientName || r.buyerName)),
		...giftRows.map((r) => fromJson(r.recipientAddress, r.id, "gift", r.recipientName || r.buyerName))
	];
	const missing = stops.filter((s) => s.latitude == null || s.longitude == null);
	if (missing.length > 0) {
		const found = await bulkLookupPostcodes(missing.map((s) => s.postcode));
		const key = (pc) => pc.replace(/\s+/g, "").toUpperCase();
		for (const stop of missing) {
			const hit = found.get(key(stop.postcode));
			if (hit) {
				stop.latitude = hit.latitude;
				stop.longitude = hit.longitude;
			}
		}
	}
	const unscheduledCount = stops.filter((s) => s.kind !== "subscription").length;
	const scheduledCount = stops.filter((s) => s.kind === "subscription").length;
	const placeable = stops.filter((s) => s.latitude != null && s.longitude != null);
	const unplaceable = stops.filter((s) => s.latitude == null || s.longitude == null);
	const depot = await lookupPostcode(DEPOT_POSTCODE);
	if (!depot || placeable.length === 0) return {
		date,
		depot,
		ordered: [],
		unplaceable,
		totals: null,
		estimated: true,
		depotPostcode: depot?.postcode ?? DEPOT_POSTCODE,
		unscheduledCount,
		scheduledCount
	};
	const points = [{
		latitude: depot.latitude,
		longitude: depot.longitude
	}, ...placeable.map((s) => ({
		latitude: s.latitude,
		longitude: s.longitude
	}))];
	const real = await fetchDurationMatrix(points, private_env.ORS_API_KEY);
	const estimated = real === null;
	const costMatrix = real?.durations ?? haversineMatrix(points);
	const distanceMatrix = real?.distances ?? haversineMatrix(points);
	const order = solveCircuit(costMatrix);
	return {
		date,
		depot,
		ordered: order.slice(1).map((i) => placeable[i - 1]),
		unplaceable,
		totals: {
			seconds: estimated ? null : tourCost(costMatrix, order),
			metres: tourCost(distanceMatrix, order),
			stops: placeable.length
		},
		estimated,
		depotPostcode: depot.postcode,
		unscheduledCount,
		scheduledCount
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BrtffTe8.js.map
