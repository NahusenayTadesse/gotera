//#region src/lib/components/dashboard/format.ts
/** Renders integer pence as a GBP string, e.g. 2400 -> "£24.00". */
function formatGBP(pence) {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP"
	}).format((pence ?? 0) / 100);
}
/** Parses a JSON column that mysql2 sometimes hands back as a raw string. */
function parseJsonColumn(value, fallback) {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
	return value ?? fallback;
}

export { formatGBP as f, parseJsonColumn as p };
//# sourceMappingURL=format.js-D8oyWA_y.js.map
