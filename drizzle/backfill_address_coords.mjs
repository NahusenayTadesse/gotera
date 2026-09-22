/**
 * One-off backfill: fill `addresses.latitude/longitude/geocoded_at` from postcodes.io.
 *
 * Every address predating the route planner has a postcode but no coordinates, and the
 * planner can only order stops it can place on a map. This walks the table in bulk
 * (100 postcodes per request, the postcodes.io cap) and writes back what resolves.
 *
 * Run:  node --env-file=.env drizzle/backfill_address_coords.mjs [--force]
 *
 * Safe to re-run: it skips rows that already have coordinates unless --force is passed,
 * so a partial run (bad network, interrupted) just continues where it left off.
 * Deliberately talks to mysql2 directly rather than through `src/lib/server/db` — that
 * module imports `$env/dynamic/private`, which only resolves inside Vite.
 */
import mysql from 'mysql2/promise';
import { bulkLookupPostcodes } from '../src/lib/server/geocode.ts';

const force = process.argv.includes('--force');
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	console.error('DATABASE_URL is not set. Run with: node --env-file=.env ' + process.argv[1]);
	process.exit(1);
}

const db = await mysql.createConnection(DATABASE_URL);

try {
	const [rows] = await db.execute(
		force
			? 'SELECT id, postcode FROM addresses'
			: 'SELECT id, postcode FROM addresses WHERE latitude IS NULL OR longitude IS NULL'
	);

	if (rows.length === 0) {
		console.log('Nothing to backfill — every address already has coordinates.');
		process.exit(0);
	}
	console.log(`Geocoding ${rows.length} address(es)…`);

	// One lookup per *distinct* postcode; several subscribers commonly share one.
	const found = await bulkLookupPostcodes(rows.map((r) => r.postcode));
	const key = (pc) => String(pc ?? '').replace(/\s+/g, '').toUpperCase();

	let updated = 0;
	const unresolved = [];
	for (const row of rows) {
		const hit = found.get(key(row.postcode));
		if (!hit) {
			unresolved.push(row.postcode);
			continue;
		}
		await db.execute(
			'UPDATE addresses SET latitude = ?, longitude = ?, geocoded_at = NOW() WHERE id = ?',
			[hit.latitude, hit.longitude, row.id]
		);
		updated++;
	}

	console.log(`✓ Updated ${updated} address(es).`);
	if (unresolved.length) {
		// Not an error: these are typos, non-UK postcodes, or postcodes.io being down.
		// The route planner lists them separately so ops can correct them by hand.
		console.log(`\n${unresolved.length} postcode(s) did not resolve:`);
		for (const pc of [...new Set(unresolved)]) console.log(`  ${pc}`);
	}
} finally {
	await db.end();
}
