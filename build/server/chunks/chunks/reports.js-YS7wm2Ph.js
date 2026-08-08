//#region src/lib/reports.ts
/** Shared date-range "query builder" for report pages — resolves a named preset (or an
*  explicit custom range) into concrete from/to dates. Pure date logic, safe to import
*  from both server (`+page.server.ts`) and client (`DateRangeFilter.svelte`) code. */
var datePresets = [
	{
		value: "today",
		name: "Today"
	},
	{
		value: "yesterday",
		name: "Yesterday"
	},
	{
		value: "last7",
		name: "Last 7 days"
	},
	{
		value: "last30",
		name: "Last 30 days"
	},
	{
		value: "thisWeek",
		name: "This week"
	},
	{
		value: "lastWeek",
		name: "Last week"
	},
	{
		value: "thisMonth",
		name: "This month"
	},
	{
		value: "lastMonth",
		name: "Last month"
	},
	{
		value: "custom",
		name: "Custom range"
	}
];
var isDatePreset = (v) => datePresets.some((p) => p.value === v);
function startOfDay(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x;
}
function endOfDay(d) {
	const x = new Date(d);
	x.setHours(23, 59, 59, 999);
	return x;
}
/** Monday-start week. */
function startOfWeek(d) {
	const x = startOfDay(d);
	const day = (x.getDay() + 6) % 7;
	x.setDate(x.getDate() - day);
	return x;
}
/** Resolves a preset (or an explicit `from`/`to` pair for 'custom') into concrete dates. */
function resolveDateRange(preset, from, to) {
	const now = /* @__PURE__ */ new Date();
	switch (preset) {
		case "today": return {
			from: startOfDay(now),
			to: endOfDay(now)
		};
		case "yesterday": {
			const y = new Date(now);
			y.setDate(y.getDate() - 1);
			return {
				from: startOfDay(y),
				to: endOfDay(y)
			};
		}
		case "last7": {
			const f = new Date(now);
			f.setDate(f.getDate() - 6);
			return {
				from: startOfDay(f),
				to: endOfDay(now)
			};
		}
		case "last30": {
			const f = new Date(now);
			f.setDate(f.getDate() - 29);
			return {
				from: startOfDay(f),
				to: endOfDay(now)
			};
		}
		case "thisWeek": return {
			from: startOfWeek(now),
			to: endOfDay(now)
		};
		case "lastWeek": {
			const s = startOfWeek(now);
			s.setDate(s.getDate() - 7);
			const e = new Date(s);
			e.setDate(e.getDate() + 6);
			return {
				from: s,
				to: endOfDay(e)
			};
		}
		case "thisMonth": return {
			from: new Date(now.getFullYear(), now.getMonth(), 1),
			to: endOfDay(now)
		};
		case "lastMonth": return {
			from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
			to: endOfDay(new Date(now.getFullYear(), now.getMonth(), 0))
		};
		default: return {
			from: from ? startOfDay(new Date(from)) : startOfDay(now),
			to: to ? endOfDay(new Date(to)) : endOfDay(now)
		};
	}
}
var toInputValue = (d) => d.toISOString().slice(0, 10);
/** Reads `preset`/`from`/`to` off a URL's search params and resolves the concrete range. */
function parseDateRangeParams(url, defaultPreset = "last30") {
	const presetParam = url.searchParams.get("preset");
	const preset = isDatePreset(presetParam) ? presetParam : defaultPreset;
	const from = url.searchParams.get("from") ?? void 0;
	const to = url.searchParams.get("to") ?? void 0;
	const range = resolveDateRange(preset, from, to);
	return {
		preset,
		from: from ?? toInputValue(range.from),
		to: to ?? toInputValue(range.to),
		range
	};
}

export { datePresets as d, parseDateRangeParams as p, resolveDateRange as r };
//# sourceMappingURL=reports.js-YS7wm2Ph.js.map
