import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { autocompletePostcode, lookupPostcode } from '$lib/server/geocode';

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
export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const q = (url.searchParams.get('q') ?? '').trim();
	if (!q) return json({ suggestions: [], match: null });

	// `resolve` is set once the input looks like a complete postcode, so the common
	// keystroke case stays a single cheap autocomplete call.
	const wantsMatch = url.searchParams.get('resolve') === '1';

	const [suggestions, match] = await Promise.all([
		autocompletePostcode(q),
		wantsMatch ? lookupPostcode(q) : Promise.resolve(null)
	]);

	// Centroids are immutable, so let the browser reuse them while the customer edits the
	// rest of the form. Short enough that a genuinely new postcode isn't stuck for long.
	setHeaders({ 'cache-control': 'private, max-age=300' });
	return json({ suggestions: suggestions.slice(0, 8), match });
};
