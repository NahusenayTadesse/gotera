/**
 * Delivery circuit planning for the Saturday run.
 *
 * A "circuit" here is the closed loop the driver actually drives: depot → every stop →
 * back to the depot. Ordering those stops well is the Travelling Salesman Problem, which
 * is NP-hard in general but trivially tractable at our size (a Saturday is tens of stops,
 * not thousands).
 *
 * ── Why we solve it ourselves ──
 * OpenRouteService has an `/optimization` endpoint that would do this in one call, but we
 * only use it for the *duration matrix* and run the search locally. That buys three
 * things: the solver is a pure function we can unit-test against a known optimum, the
 * page keeps working when ORS is unreachable (we fall back to straight-line distances),
 * and we are not billed per re-plan when an admin nudges the date.
 *
 * At ~25 stops nearest-neighbour + 2-opt lands within a couple of percent of optimal and
 * runs in well under a millisecond, which is far below the noise floor of London traffic.
 */

export type Point = { latitude: number; longitude: number };

/** Square matrix of costs between points; `matrix[i][j]` is i → j. Seconds or metres. */
export type Matrix = number[][];

const EARTH_RADIUS_M = 6_371_000;
const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in metres. */
export function haversine(a: Point, b: Point): number {
	const dLat = toRad(b.latitude - a.latitude);
	const dLon = toRad(b.longitude - a.longitude);
	const lat1 = toRad(a.latitude);
	const lat2 = toRad(b.latitude);
	const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
	return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/**
 * Straight-line cost matrix, in metres.
 *
 * The fallback when ORS is unavailable, and a perfectly reasonable one in a dense city:
 * across a London borough, crow-flies distance correlates well enough with drive time to
 * produce a sensible stop order. The absolute totals are optimistic, which is why the UI
 * labels them as estimates whenever this is what produced them.
 */
export function haversineMatrix(points: Point[]): Matrix {
	return points.map((from) => points.map((to) => haversine(from, to)));
}

/**
 * Real driving durations (seconds) and distances (metres) from OpenRouteService.
 *
 * Returns null on *any* problem — missing key, rate limit, network, unexpected shape — so
 * the caller falls back to `haversineMatrix` and the planner still renders. A route
 * planner that 500s because a third party is down is worse than one showing estimates.
 */
export async function fetchDurationMatrix(
	points: Point[],
	apiKey: string | undefined
): Promise<{ durations: Matrix; distances: Matrix } | null> {
	if (!apiKey || points.length < 2) return null;
	try {
		const res = await fetch('https://api.openrouteservice.org/v2/matrix/driving-car', {
			method: 'POST',
			headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// ORS takes [longitude, latitude] — the opposite order to how we store them.
				locations: points.map((p) => [p.longitude, p.latitude]),
				metrics: ['duration', 'distance']
			})
		});
		if (!res.ok) return null;
		const body = await res.json();
		const { durations, distances } = body ?? {};
		if (!Array.isArray(durations) || !Array.isArray(distances)) return null;
		// ORS emits null for pairs it cannot route (a point snapped to an island, say).
		// Left as-is those would poison every comparison in the solver, so they become
		// Infinity — expensive, still ordered, never chosen if any alternative exists.
		const clean = (m: unknown[][]): Matrix =>
			m.map((row) => row.map((v) => (typeof v === 'number' ? v : Infinity)));
		return { durations: clean(durations), distances: clean(distances) };
	} catch {
		return null;
	}
}

/** Total cost of a closed tour, including the leg home from the last stop. */
export function tourCost(matrix: Matrix, order: number[]): number {
	let total = 0;
	for (let i = 0; i < order.length - 1; i++) total += matrix[order[i]][order[i + 1]];
	if (order.length > 1) total += matrix[order[order.length - 1]][order[0]];
	return total;
}

/**
 * Order the stops into a circuit.
 *
 * Index 0 is the depot and is pinned as both start and end — that pinning is the whole
 * difference between a circuit and an open path, and it is why 2-opt below never touches
 * position 0.
 *
 * Returns the visiting order as indices into the original array, e.g. `[0, 3, 1, 2]`
 * meaning depot → point 3 → point 1 → point 2 → depot.
 */
export function solveCircuit(matrix: Matrix): number[] {
	const n = matrix.length;
	if (n <= 3) return matrix.map((_, i) => i);

	// ── Pass 1: nearest neighbour, for a decent starting tour ──
	// Greedy and short-sighted (it strands whatever it skipped, so the last leg is often
	// long), but 2-opt fixes exactly that kind of mistake.
	const unvisited = new Set<number>();
	for (let i = 1; i < n; i++) unvisited.add(i);

	const order = [0];
	let current = 0;
	while (unvisited.size > 0) {
		let best = -1;
		let bestCost = Infinity;
		for (const candidate of unvisited) {
			const cost = matrix[current][candidate];
			if (cost < bestCost) {
				bestCost = cost;
				best = candidate;
			}
		}
		// Every remaining candidate is unreachable (all Infinity). Append them in index
		// order rather than looping forever — the UI flags unroutable stops separately.
		if (best === -1) {
			for (const rest of unvisited) order.push(rest);
			break;
		}
		order.push(best);
		unvisited.delete(best);
		current = best;
	}

	// ── Pass 2: 2-opt, until no single reversal improves the tour ──
	// Reversing order[i..j] replaces edges (i-1 → i) and (j → j+1) with (i-1 → j) and
	// (i → j+1). On a symmetric matrix the segment's internal cost is unchanged, so the
	// delta is just those two edge swaps — but driving durations are *not* symmetric
	// (one-ways, turn restrictions), so we compare full tour costs instead of a delta.
	// At our stop counts that is still microseconds.
	let improved = true;
	// A guard against pathological non-convergence on asymmetric matrices, where an
	// improving move can in principle cycle. Never reached at realistic sizes.
	let guard = 0;
	const MAX_PASSES = 100;
	let bestCost = tourCost(matrix, order);

	while (improved && guard++ < MAX_PASSES) {
		improved = false;
		for (let i = 1; i < order.length - 1; i++) {
			for (let j = i + 1; j < order.length; j++) {
				const candidate = order
					.slice(0, i)
					.concat(order.slice(i, j + 1).reverse(), order.slice(j + 1));
				const cost = tourCost(matrix, candidate);
				if (cost < bestCost - 1e-9) {
					order.splice(0, order.length, ...candidate);
					bestCost = cost;
					improved = true;
				}
			}
		}
	}

	return order;
}
