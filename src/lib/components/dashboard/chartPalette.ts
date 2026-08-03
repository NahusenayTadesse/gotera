/** Shared colour palette for report charts — matches FilterMenu's chart palette so charts
 *  across the dashboard feel like one system. */
export const CHART_COLORS = [
	'#6366f1', // indigo
	'#22d3ee', // cyan
	'#f59e0b', // amber
	'#10b981', // emerald
	'#f43f5e', // rose
	'#8b5cf6', // violet
	'#14b8a6', // teal
	'#fb923c', // orange
	'#3b82f6', // blue
	'#ec4899' // pink
];

export function colorAt(i: number, alpha = 'cc'): string {
	return CHART_COLORS[i % CHART_COLORS.length] + alpha;
}

export function colorList(n: number, alpha = 'cc'): string[] {
	return Array.from({ length: n }, (_, i) => colorAt(i, alpha));
}
