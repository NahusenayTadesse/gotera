import { a as autocompletePostcode, l as lookupPostcode } from '../../../../chunks/geocode.js-hCa1RR8a.js';
import { j as json } from '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/shared.js-CgqsOrws.js';

//#region src/routes/api/postcode/+server.ts
/**
* Postcode suggestions + centroid lookup for the checkout address field.
*
* Proxied rather than called from the browser (postcodes.io does send CORS headers, so
* direct calls would work) for two reasons: it shares one server-side cache across every
* visitor instead of one per tab, and it keeps the third-party hostname out of the page
* so a future CSP doesn't need to allowlist it.
*
*   GET /api/postcode?q=N17          → { suggestions: ["N17 0AB", …] }
*   GET /api/postcode?q=N17 8AA&resolve=1 → { suggestions: […], match: { latitude, … } }
*
* Always 200, never an error status. The caller is an address field on a checkout page:
* a failed lookup has to look exactly like "no suggestions" so the customer types their
* address by hand and orders anyway.
*/
var GET = async ({ url, setHeaders }) => {
	const q = (url.searchParams.get("q") ?? "").trim();
	if (!q) return json({
		suggestions: [],
		match: null
	});
	const wantsMatch = url.searchParams.get("resolve") === "1";
	const [suggestions, match] = await Promise.all([autocompletePostcode(q), wantsMatch ? lookupPostcode(q) : Promise.resolve(null)]);
	setHeaders({ "cache-control": "private, max-age=300" });
	return json({
		suggestions: suggestions.slice(0, 8),
		match
	});
};

export { GET };
//# sourceMappingURL=_server.ts.js-CUB_wkPf.js.map
