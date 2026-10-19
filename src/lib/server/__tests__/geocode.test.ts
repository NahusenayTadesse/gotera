import { describe, it, expect, vi, afterEach } from 'vitest';
import {
	lookupPostcode,
	bulkLookupPostcodes,
	autocompletePostcode,
	isLondonPostcode
} from '../geocode';

/**
 * These tests exist for one reason: the checkout flow is allowed to call this module
 * without a try/catch, because it promises never to throw. Everything below is a way for
 * postcodes.io to go wrong, and the assertion is always "returned a falsy value" rather
 * than "threw". If any of these start throwing, /subscribe starts 500ing.
 *
 * Each test uses a postcode unique to it — the module caches by postcode for the life of
 * the process, so reusing one across tests would hit the cache instead of the mock.
 */

const mockFetch = (impl: (url: string) => unknown) =>
	vi.stubGlobal(
		'fetch',
		vi.fn(async (url: string) => impl(String(url)))
	);

afterEach(() => vi.unstubAllGlobals());

describe('lookupPostcode', () => {
	it('returns null instead of throwing when the network is down', async () => {
		mockFetch(() => {
			throw new TypeError('fetch failed');
		});
		await expect(lookupPostcode('E1 6AN')).resolves.toBeNull();
	});

	it('returns null on a non-OK response', async () => {
		mockFetch(() => new Response('nope', { status: 500 }));
		await expect(lookupPostcode('E2 6AN')).resolves.toBeNull();
	});

	it('returns null on malformed JSON', async () => {
		mockFetch(() => new Response('<html>gateway timeout</html>', { status: 200 }));
		await expect(lookupPostcode('E3 6AN')).resolves.toBeNull();
	});

	it('returns null when the payload has no usable coordinates', async () => {
		// Terminated postcodes come back 200 with null lat/lng.
		mockFetch(
			() =>
				new Response(
					JSON.stringify({ result: { postcode: 'E4 6AN', latitude: null, longitude: null } })
				)
		);
		await expect(lookupPostcode('E4 6AN')).resolves.toBeNull();
	});

	it('parses a good response', async () => {
		mockFetch(
			() =>
				new Response(
					JSON.stringify({
						result: {
							postcode: 'E5 6AN',
							latitude: 51.5,
							longitude: -0.07,
							admin_district: 'Hackney',
							region: 'London'
						}
					})
				)
		);
		await expect(lookupPostcode('e56an')).resolves.toEqual({
			postcode: 'E5 6AN',
			latitude: 51.5,
			longitude: -0.07,
			district: 'Hackney',
			region: 'London'
		});
	});

	it('caches, so a repeat lookup costs no second request', async () => {
		const spy = vi.fn(
			async () =>
				new Response(
					JSON.stringify({ result: { postcode: 'E6 6AN', latitude: 51.5, longitude: -0.07 } })
				)
		);
		vi.stubGlobal('fetch', spy);
		await lookupPostcode('E6 6AN');
		await lookupPostcode('e6  6an'); // same postcode, different spacing and case
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('returns null for an empty postcode without calling out at all', async () => {
		const spy = vi.fn();
		vi.stubGlobal('fetch', spy);
		await expect(lookupPostcode('   ')).resolves.toBeNull();
		expect(spy).not.toHaveBeenCalled();
	});
});

describe('bulkLookupPostcodes', () => {
	it('returns an empty map rather than throwing when the request fails', async () => {
		mockFetch(() => {
			throw new Error('boom');
		});
		const out = await bulkLookupPostcodes(['W1 1AA', 'W1 2AA']);
		expect(out.size).toBe(0);
	});

	it('omits postcodes that did not resolve, keeping the ones that did', async () => {
		mockFetch(
			() =>
				new Response(
					JSON.stringify({
						result: [
							{ query: 'W2 1AA', result: { postcode: 'W2 1AA', latitude: 51.5, longitude: -0.1 } },
							{ query: 'W2 2AA', result: null }
						]
					})
				)
		);
		const out = await bulkLookupPostcodes(['W2 1AA', 'W2 2AA']);
		expect([...out.keys()]).toEqual(['W21AA']);
	});
});

describe('autocompletePostcode', () => {
	it('returns [] rather than throwing when the request fails', async () => {
		mockFetch(() => {
			throw new Error('offline');
		});
		await expect(autocompletePostcode('SE1')).resolves.toEqual([]);
	});

	it('returns [] when the API answers with a null result', async () => {
		// postcodes.io answers 200 + result:null for a prefix matching nothing.
		mockFetch(() => new Response(JSON.stringify({ result: null })));
		await expect(autocompletePostcode('SE2')).resolves.toEqual([]);
	});

	it('does not call out for a prefix too short to be useful', async () => {
		const spy = vi.fn();
		vi.stubGlobal('fetch', spy);
		await expect(autocompletePostcode('N')).resolves.toEqual([]);
		expect(spy).not.toHaveBeenCalled();
	});
});

describe('isLondonPostcode', () => {
	const respondWithRegion = (postcode: string, region: string) =>
		mockFetch(
			() =>
				new Response(
					JSON.stringify({ result: { postcode, latitude: 51.4, longitude: -0.1, region } })
				)
		);

	it('accepts a postcode postcodes.io places in London', async () => {
		respondWithRegion('CR0 1AA', 'London');
		await expect(isLondonPostcode('CR0 1AA')).resolves.toBe(true);
	});

	it('rejects a postcode postcodes.io places outside London, even with a London-ish prefix', async () => {
		// DA1 is Dartford (Kent): the prefix fallback would let it through, the region must not.
		respondWithRegion('DA1 1AA', 'South East');
		await expect(isLondonPostcode('DA1 1AA')).resolves.toBe(false);
	});

	it('falls back to the prefix check when the lookup fails', async () => {
		mockFetch(() => {
			throw new TypeError('fetch failed');
		});
		await expect(isLondonPostcode('SW1A 2AA')).resolves.toBe(true);
		await expect(isLondonPostcode('M1 1AE')).resolves.toBe(false);
		await expect(isLondonPostcode('EH1 1YZ')).resolves.toBe(false);
		await expect(isLondonPostcode('not a postcode')).resolves.toBe(false);
	});
});
