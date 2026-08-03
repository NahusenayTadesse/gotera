/** Renders integer pence as a GBP string, e.g. 2400 -> "£24.00". */
export function formatGBP(pence: number | null | undefined): string {
	return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
		(pence ?? 0) / 100
	);
}

/** Parses a JSON column that mysql2 sometimes hands back as a raw string. */
export function parseJsonColumn<T>(value: T | string | null | undefined, fallback: T): T {
	if (typeof value === 'string') {
		try {
			return JSON.parse(value) as T;
		} catch {
			return fallback;
		}
	}
	return (value ?? fallback) as T;
}
