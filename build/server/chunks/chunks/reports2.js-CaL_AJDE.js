import { k as and, e as lte, h as gte } from './db.js-BkD50_-0.js';

//#region src/lib/server/reports.ts
/** Drizzle `between` condition for a timestamp/date column, built from a resolved range. */
function dateRangeCondition(column, range) {
	return and(gte(column, range.from), lte(column, range.to));
}
/** Picks a sensible bucket size for the span of a range — daily for short ranges,
*  monthly for long ones, so a trend chart never ends up with 1 or 400 bars. */
function chooseGranularity(range) {
	const days = Math.ceil((range.to.getTime() - range.from.getTime()) / 864e5);
	if (days <= 45) return "day";
	if (days <= 180) return "week";
	return "month";
}
function bucketStart(d, granularity) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	if (granularity === "month") return new Date(x.getFullYear(), x.getMonth(), 1);
	if (granularity === "week") {
		const day = (x.getDay() + 6) % 7;
		x.setDate(x.getDate() - day);
	}
	return x;
}
function nextBucket(d, granularity) {
	const x = new Date(d);
	if (granularity === "day") x.setDate(x.getDate() + 1);
	else if (granularity === "week") x.setDate(x.getDate() + 7);
	else x.setMonth(x.getMonth() + 1);
	return x;
}
function bucketLabel(d, granularity) {
	if (granularity === "month") return d.toLocaleDateString("en-GB", {
		month: "short",
		year: "2-digit"
	});
	if (granularity === "week") return `w/c ${d.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short"
	})}`;
	return d.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short"
	});
}
/** Ordered list of bucket start dates spanning `range` at the given granularity. */
function buildBuckets(range, granularity) {
	const buckets = [];
	let cur = bucketStart(range.from, granularity);
	let guard = 0;
	while (cur <= range.to && guard++ < 500) {
		buckets.push(cur);
		cur = nextBucket(cur, granularity);
	}
	return buckets;
}
function findBucketIndex(buckets, date) {
	for (let i = buckets.length - 1; i >= 0; i--) if (date >= buckets[i]) return i;
	return 0;
}
/** Buckets `items` by a date field, counting how many fall in each bucket. */
function bucketCount(items, getDate, range, granularity = chooseGranularity(range)) {
	const buckets = buildBuckets(range, granularity);
	const counts = buckets.map(() => 0);
	for (const item of items) counts[findBucketIndex(buckets, getDate(item))]++;
	return {
		labels: buckets.map((b) => bucketLabel(b, granularity)),
		counts,
		granularity
	};
}
/** Buckets `items` by a date field, summing a numeric value in each bucket. */
function bucketSum(items, getDate, getValue, range, granularity = chooseGranularity(range)) {
	const buckets = buildBuckets(range, granularity);
	const sums = buckets.map(() => 0);
	for (const item of items) sums[findBucketIndex(buckets, getDate(item))] += getValue(item);
	return {
		labels: buckets.map((b) => bucketLabel(b, granularity)),
		sums,
		granularity
	};
}

export { bucketSum as a, bucketCount as b, chooseGranularity as c, dateRangeCondition as d };
//# sourceMappingURL=reports2.js-CaL_AJDE.js.map
