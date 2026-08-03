import { and, gte, lte } from 'drizzle-orm';
import type { MySqlColumn } from 'drizzle-orm/mysql-core';
import type { DateRange } from '$lib/reports';

export { datePresets, resolveDateRange, parseDateRangeParams } from '$lib/reports';
export type { DatePreset, DateRange } from '$lib/reports';

/** Drizzle `between` condition for a timestamp/date column, built from a resolved range. */
export function dateRangeCondition(column: MySqlColumn, range: DateRange) {
	return and(gte(column, range.from), lte(column, range.to));
}

/**
 * Chart time-bucketing — groups rows into day/week/month buckets across a date range so
 * trend charts stay readable whether the selected range is a week or a year.
 */

export type Granularity = 'day' | 'week' | 'month';

/** Picks a sensible bucket size for the span of a range — daily for short ranges,
 *  monthly for long ones, so a trend chart never ends up with 1 or 400 bars. */
export function chooseGranularity(range: DateRange): Granularity {
	const days = Math.ceil((range.to.getTime() - range.from.getTime()) / 86_400_000);
	if (days <= 45) return 'day';
	if (days <= 180) return 'week';
	return 'month';
}

function bucketStart(d: Date, granularity: Granularity): Date {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	if (granularity === 'month') return new Date(x.getFullYear(), x.getMonth(), 1);
	if (granularity === 'week') {
		const day = (x.getDay() + 6) % 7; // Monday-start
		x.setDate(x.getDate() - day);
	}
	return x;
}

function nextBucket(d: Date, granularity: Granularity): Date {
	const x = new Date(d);
	if (granularity === 'day') x.setDate(x.getDate() + 1);
	else if (granularity === 'week') x.setDate(x.getDate() + 7);
	else x.setMonth(x.getMonth() + 1);
	return x;
}

function bucketLabel(d: Date, granularity: Granularity): string {
	if (granularity === 'month') return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
	if (granularity === 'week') return `w/c ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;
	return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

/** Ordered list of bucket start dates spanning `range` at the given granularity. */
function buildBuckets(range: DateRange, granularity: Granularity): Date[] {
	const buckets: Date[] = [];
	let cur = bucketStart(range.from, granularity);
	let guard = 0;
	while (cur <= range.to && guard++ < 500) {
		buckets.push(cur);
		cur = nextBucket(cur, granularity);
	}
	return buckets;
}

function findBucketIndex(buckets: Date[], date: Date): number {
	for (let i = buckets.length - 1; i >= 0; i--) {
		if (date >= buckets[i]) return i;
	}
	return 0;
}

export interface BucketSeries {
	labels: string[];
	granularity: Granularity;
}

/** Buckets `items` by a date field, counting how many fall in each bucket. */
export function bucketCount<T>(
	items: T[],
	getDate: (item: T) => Date,
	range: DateRange,
	granularity: Granularity = chooseGranularity(range)
): BucketSeries & { counts: number[] } {
	const buckets = buildBuckets(range, granularity);
	const counts = buckets.map(() => 0);
	for (const item of items) {
		counts[findBucketIndex(buckets, getDate(item))]++;
	}
	return { labels: buckets.map((b) => bucketLabel(b, granularity)), counts, granularity };
}

/** Buckets `items` by a date field, summing a numeric value in each bucket. */
export function bucketSum<T>(
	items: T[],
	getDate: (item: T) => Date,
	getValue: (item: T) => number,
	range: DateRange,
	granularity: Granularity = chooseGranularity(range)
): BucketSeries & { sums: number[] } {
	const buckets = buildBuckets(range, granularity);
	const sums = buckets.map(() => 0);
	for (const item of items) {
		sums[findBucketIndex(buckets, getDate(item))] += getValue(item);
	}
	return { labels: buckets.map((b) => bucketLabel(b, granularity)), sums, granularity };
}
