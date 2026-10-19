import { customType } from 'drizzle-orm/mysql-core';

/**
 * A `json` column that always reads back as a value, never as text.
 *
 * On MySQL, mysql2 parses JSON columns itself. On MariaDB — which production runs — `JSON`
 * is just an alias for `LONGTEXT`, so the driver returns the raw text and drizzle's own
 * `json()` passes it straight through: `plans.bullets` arrived as the string
 * '["Best value"]', and a `{#each}` over it rendered one character per bullet. Parsing
 * here fixes every JSON column for every reader at once.
 *
 * Same SQL type as drizzle's `json()`, so it needs no migration.
 */
export const json = customType<{ data: unknown; driverData: string }>({
	dataType: () => 'json',
	toDriver: (value) => JSON.stringify(value),
	fromDriver: (value) => {
		if (typeof value !== 'string') return value; // MySQL: already parsed by mysql2
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
});
