// DEV ONLY — sample batches for trying /dashboard/batches locally. Do NOT run on production.
// Needs seed_partners_dev.sql first (uses its supplier receipts as batch sources).
// Re-runnable: everything it creates has an id starting 5eed…, removed first.
//   node --env-file=.env drizzle/seed_traceability_dev.mjs
import mysql from 'mysql2/promise';

const c = await mysql.createConnection({ uri: process.env.DATABASE_URL, multipleStatements: true });

// Wipe previous seed (allocations first — batches are RESTRICTed).
await c.query(`
	DELETE FROM batch_allocations WHERE batch_id LIKE '5eed%' OR id LIKE '5eed%';
	DELETE FROM batch_inputs WHERE batch_id LIKE '5eed%';
	DELETE FROM batches WHERE id LIKE '5eed%';
	DELETE FROM delivery_addons WHERE id LIKE '5eed%';
	DELETE FROM addons WHERE id LIKE '5eed%';
`);

const BERBERE = '5eed3000-0000-4000-8000-000000000001';
const MITMITA = '5eed3000-0000-4000-8000-000000000002';
await c.query(
	`INSERT INTO addons (id, name, description, category, price_pence, sort_order, is_active) VALUES
	 (?, 'Berbere spice blend (250g)', 'Small-batch berbere from Mitmita Spice Co.', 'spice', 650, 90, true),
	 (?, 'Mitmita (100g)', 'Fiery bird''s-eye chilli blend.', 'spice', 450, 91, true)`,
	[BERBERE, MITMITA]
);

// Put add-ons on the first two live subscription deliveries so add-on lines exist.
const [subs] = await c.query(
	`SELECT id FROM deliveries WHERE status IN ('scheduled','dispatched','delivered') ORDER BY scheduled_date LIMIT 2`
);
for (const [i, d] of subs.entries()) {
	await c.query(`INSERT INTO delivery_addons (id, delivery_id, addon_id, quantity) VALUES (?, ?, ?, ?)`, [
		`5eed4000-0000-4000-8000-00000000000${i + 1}`,
		d.id,
		i === 0 ? BERBERE : MITMITA,
		i === 0 ? 2 : 1
	]);
}

// Supplier receipts from seed_partners_dev.sql.
const TEFF_IVORY = { '2026-07-01': '016', '2026-08-01': '017', '2026-09-01': '019', '2026-10-01': '020' };
const TEFF_BROWN = { '2026-08-01': '018', '2026-10-01': '021' };
const receipt = (n) => `5eed1000-0000-4000-8000-000000000${n}`;
const latestOnOrBefore = (map, day) =>
	Object.keys(map).filter((d) => d <= day).sort().at(-1);

const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (day, n) => {
	const d = new Date(`${day}T12:00:00Z`);
	d.setUTCDate(d.getUTCDate() + n);
	return iso(d);
};
const code = (prefix, day, n = 1) => `${prefix}-${day.slice(2).replaceAll('-', '')}-${String(n).padStart(2, '0')}`;

let seq = 0;
const batchId = () => `5eed5000-0000-4000-8000-${String(++seq).padStart(12, '0')}`;

// Weekly in-house injera bakes, July → end of October. 9-day best-before overlaps the next bake.
for (let day = '2026-07-04'; day <= '2026-10-31'; day = addDays(day, 7)) {
	const id = batchId();
	await c.query(
		`INSERT INTO batches (id, code, product, source, produced_on, best_before, quantity, unit, status, notes)
		 VALUES (?, ?, 'injera', 'in_house', ?, ?, 300, 'packs', 'active', ?)`,
		[id, code('INJ', day), day, addDays(day, 9), 'Weekly bake — teff blend, ovens 1–3.']
	);
	const inputs = [TEFF_IVORY, TEFF_BROWN]
		.map((m) => latestOnOrBefore(m, day))
		.map((d, i) => d && receipt([TEFF_IVORY, TEFF_BROWN][i][d]))
		.filter(Boolean);
	for (const r of inputs)
		await c.query(`INSERT INTO batch_inputs (id, batch_id, partner_delivery_id) VALUES (UUID(), ?, ?)`, [id, r]);
}

// Spices: bought in from Mitmita Spice Co (external), plus one in-house mitmita batch.
const MITMITA_CO = '5eed0000-0000-4000-8000-000000000007';
const spice = [
	[BERBERE, 'ADD-BER', '2026-08-14', '2027-02-14', 50, 'jars', 'external', receipt('023'), 'MSC-B-0814'],
	[BERBERE, 'ADD-BER', '2026-09-18', '2027-03-18', 60, 'jars', 'external', receipt('025'), 'MSC-B-0918'],
	[MITMITA, 'ADD-MIT', '2026-08-14', '2027-02-14', 40, 'jars', 'external', receipt('024'), 'MSC-M-0814'],
	[MITMITA, 'ADD-MIT', '2026-10-01', '2027-04-01', 30, 'jars', 'in_house', null, null]
];
for (const [addonId, prefix, day, bb, qty, unit, source, sourceDelivery, lot] of spice) {
	await c.query(
		`INSERT INTO batches (id, code, product, addon_id, source, source_partner_id, source_delivery_id, supplier_lot_ref,
		                      produced_on, best_before, quantity, unit, status)
		 VALUES (?, ?, 'addon', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
		[batchId(), code(prefix, day), addonId, source, source === 'external' ? MITMITA_CO : null, sourceDelivery, lot, day, bb, qty, unit]
	);
}

// The add-on lines above are on July deliveries — give them a batch that existed then.
await c.query(
	`INSERT INTO batches (id, code, product, addon_id, source, produced_on, best_before, quantity, unit, status, notes)
	 VALUES (?, ?, 'addon', ?, 'in_house', '2026-07-01', '2027-01-01', 20, 'jars', 'active', 'Blended in house before the Mitmita Spice Co contract.'),
	        (?, ?, 'addon', ?, 'in_house', '2026-07-01', '2027-01-01', 20, 'jars', 'active', 'Blended in house before the Mitmita Spice Co contract.')`,
	[batchId(), code('ADD-BER', '2026-07-01'), BERBERE, batchId(), code('ADD-MIT', '2026-07-01'), MITMITA]
);

const [[{ n }]] = await c.query(`SELECT COUNT(*) n FROM batches WHERE id LIKE '5eed%'`);
console.log(`Seeded ${n} batches, 2 add-ons, ${subs.length} delivery add-on lines.`);
await c.end();
