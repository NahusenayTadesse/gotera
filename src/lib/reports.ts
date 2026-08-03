/** Shared date-range "query builder" for report pages — resolves a named preset (or an
 *  explicit custom range) into concrete from/to dates. Pure date logic, safe to import
 *  from both server (`+page.server.ts`) and client (`DateRangeFilter.svelte`) code. */

export const datePresets = [
	{ value: 'today', name: 'Today' },
	{ value: 'yesterday', name: 'Yesterday' },
	{ value: 'last7', name: 'Last 7 days' },
	{ value: 'last30', name: 'Last 30 days' },
	{ value: 'thisWeek', name: 'This week' },
	{ value: 'lastWeek', name: 'Last week' },
	{ value: 'thisMonth', name: 'This month' },
	{ value: 'lastMonth', name: 'Last month' },
	{ value: 'custom', name: 'Custom range' }
] as const;

export type DatePreset = (typeof datePresets)[number]['value'];

const isDatePreset = (v: string | null): v is DatePreset =>
	datePresets.some((p) => p.value === v);

function startOfDay(d: Date) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x;
}
function endOfDay(d: Date) {
	const x = new Date(d);
	x.setHours(23, 59, 59, 999);
	return x;
}
/** Monday-start week. */
function startOfWeek(d: Date) {
	const x = startOfDay(d);
	const day = (x.getDay() + 6) % 7;
	x.setDate(x.getDate() - day);
	return x;
}

export interface DateRange {
	from: Date;
	to: Date;
}

/** Resolves a preset (or an explicit `from`/`to` pair for 'custom') into concrete dates. */
export function resolveDateRange(preset: DatePreset, from?: string, to?: string): DateRange {
	const now = new Date();
	switch (preset) {
		case 'today':
			return { from: startOfDay(now), to: endOfDay(now) };
		case 'yesterday': {
			const y = new Date(now);
			y.setDate(y.getDate() - 1);
			return { from: startOfDay(y), to: endOfDay(y) };
		}
		case 'last7': {
			const f = new Date(now);
			f.setDate(f.getDate() - 6);
			return { from: startOfDay(f), to: endOfDay(now) };
		}
		case 'last30': {
			const f = new Date(now);
			f.setDate(f.getDate() - 29);
			return { from: startOfDay(f), to: endOfDay(now) };
		}
		case 'thisWeek':
			return { from: startOfWeek(now), to: endOfDay(now) };
		case 'lastWeek': {
			const s = startOfWeek(now);
			s.setDate(s.getDate() - 7);
			const e = new Date(s);
			e.setDate(e.getDate() + 6);
			return { from: s, to: endOfDay(e) };
		}
		case 'thisMonth':
			return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: endOfDay(now) };
		case 'lastMonth': {
			const f = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const e = new Date(now.getFullYear(), now.getMonth(), 0);
			return { from: f, to: endOfDay(e) };
		}
		case 'custom':
		default: {
			const f = from ? startOfDay(new Date(from)) : startOfDay(now);
			const t = to ? endOfDay(new Date(to)) : endOfDay(now);
			return { from: f, to: t };
		}
	}
}

const toInputValue = (d: Date) => d.toISOString().slice(0, 10);

/** Reads `preset`/`from`/`to` off a URL's search params and resolves the concrete range. */
export function parseDateRangeParams(url: URL, defaultPreset: DatePreset = 'last30') {
	const presetParam = url.searchParams.get('preset');
	const preset = isDatePreset(presetParam) ? presetParam : defaultPreset;
	const from = url.searchParams.get('from') ?? undefined;
	const to = url.searchParams.get('to') ?? undefined;
	const range = resolveDateRange(preset, from, to);

	return {
		preset,
		from: from ?? toInputValue(range.from),
		to: to ?? toInputValue(range.to),
		range
	};
}
