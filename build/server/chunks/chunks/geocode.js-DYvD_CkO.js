//#region src/lib/server/geocode.ts
/**
* UK postcode geocoding, backed by postcodes.io.
*
* Chosen because it is free, unlimited, needs no API key and is UK-only — which is
* exactly our footprint (every address defaults to London). The alternatives all cost
* something: Nominatim caps at 1 req/s and forbids bulk use, Google and Mapbox bill.
*
* ── The one rule in this file ──
* Nothing here ever throws. Every function returns null / [] when the network is down,
* the postcode is nonsense, or the response is shaped unexpectedly. Geocoding runs
* alongside checkout, and a customer must never be blocked from ordering because a
* third-party lookup failed. Callers are free to ignore a null and carry on.
*
* What comes back is a postcode *centroid*, not a house-level point — roughly 50-100m in
* London, i.e. the right street. That is enough to order stops on a delivery route; the
* driver reads the house number off `addresses.line1`.
*/
var BASE = "https://api.postcodes.io";
/** postcodes.io caps bulk lookups at 100 postcodes per request. */
var BULK_CHUNK = 100;
/**
* Postcode centroids do not move, so a plain unbounded Map is the right cache: entries
* never go stale, and the ceiling is the number of distinct postcodes we deliver to.
* Keyed by the normalised form so "n178aa" and "N17 8AA" share one entry.
*/
var cache = /* @__PURE__ */ new Map();
/** Strip spaces and upper-case, so user typing variations hit the same cache entry. */
var normalise = (postcode) => postcode.replace(/\s+/g, "").toUpperCase();
/** Shared fetch wrapper: swallows every failure mode into `null`. */
async function get(path) {
	try {
		const res = await fetch(`${BASE}${path}`);
		if (!res.ok) return null;
		return (await res.json())?.result ?? null;
	} catch {
		return null;
	}
}
/** Narrow a raw postcodes.io result, rejecting anything without usable coordinates. */
function toGeocoded(raw) {
	if (!raw || typeof raw !== "object") return null;
	const r = raw;
	if (typeof r.latitude !== "number" || typeof r.longitude !== "number") return null;
	const { latitude, longitude } = r;
	if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
	return {
		postcode: String(r.postcode ?? ""),
		latitude,
		longitude,
		district: typeof r.admin_district === "string" ? r.admin_district : null,
		region: typeof r.region === "string" ? r.region : null
	};
}
/**
* Look up one postcode. Returns null for unknown postcodes and for any failure —
* the caller cannot distinguish the two, and deliberately should not care.
*/
async function lookupPostcode(postcode) {
	const key = normalise(postcode);
	if (!key) return null;
	if (cache.has(key)) return cache.get(key);
	const found = toGeocoded(await get(`/postcodes/${encodeURIComponent(key)}`));
	cache.set(key, found);
	return found;
}
/**
* Look up many postcodes in as few requests as possible, for the backfill script and for
* the route planner's guest/gift orders (whose addresses live as JSON with no lat/lng
* column to read).
*
* Returns a Map keyed by the *normalised* input postcode. Postcodes that fail to resolve
* are simply absent from the Map rather than present-as-null, so callers can iterate what
* they got without null checks.
*/
async function bulkLookupPostcodes(postcodes) {
	const out = /* @__PURE__ */ new Map();
	const pending = [];
	for (const raw of postcodes) {
		const key = normalise(raw);
		if (!key || out.has(key) || pending.includes(key)) continue;
		const cached = cache.get(key);
		if (cached !== void 0) {
			if (cached) out.set(key, cached);
			continue;
		}
		pending.push(key);
	}
	for (let i = 0; i < pending.length; i += BULK_CHUNK) {
		const chunk = pending.slice(i, i + BULK_CHUNK);
		let results = null;
		try {
			const res = await fetch(`${BASE}/postcodes`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ postcodes: chunk })
			});
			if (res.ok) results = (await res.json())?.result ?? null;
		} catch {
			results = null;
		}
		if (!Array.isArray(results)) continue;
		for (const entry of results) {
			const key = normalise(String(entry?.query ?? ""));
			if (!key) continue;
			const found = toGeocoded(entry?.result);
			cache.set(key, found);
			if (found) out.set(key, found);
		}
	}
	return out;
}
/**
* Partial-postcode suggestions for the checkout address field.
*
* Returns [] on failure, which renders as "no suggestions" — the customer types the rest
* of their postcode by hand exactly as they do today, and the order is unaffected.
*/
async function autocompletePostcode(partial) {
	const key = normalise(partial);
	if (key.length < 3) return [];
	const result = await get(`/postcodes/${encodeURIComponent(key)}/autocomplete`);
	return Array.isArray(result) ? result : [];
}
/**
* Fallback for `isLondonPostcode` when postcodes.io can't answer. Accepts a full,
* well-formed UK postcode in an area that is wholly London (E, EC, N, NW, SE, SW, W, WC)
* or that covers part of outer London (BR, CR, DA, EN, HA, IG, KT, RM, SM, TW, UB, WD).
*
* Deliberately lenient: it only runs during an outage or for a postcode postcodes.io
* doesn't know, and turning away a real Croydon or Harrow customer costs more than the
* odd Dartford order slipping through for a manual check.
*/
var LONDON_POSTCODE = /^(EC|WC|NW|SE|SW|BR|CR|DA|EN|HA|IG|KT|RM|SM|TW|UB|WD|E|N|W)\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
/**
* Is this postcode inside our London delivery area?
*
* postcodes.io's `region` is the source of truth ("London" covers all 32 boroughs and
* the City). When the lookup fails or doesn't know the postcode, fall back to the area
* prefix check above so an outage never stops London customers ordering.
*
* Unlike the rest of this file, this function *does* gate checkout — on purpose. Like
* the rest, it never throws.
*/
async function isLondonPostcode(postcode) {
	const hit = await lookupPostcode(postcode);
	if (hit?.region) return hit.region === "London";
	return LONDON_POSTCODE.test(postcode.trim());
}

export { autocompletePostcode as a, bulkLookupPostcodes as b, isLondonPostcode as i, lookupPostcode as l };
//# sourceMappingURL=geocode.js-DYvD_CkO.js.map
