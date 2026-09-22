import { describe, it, expect } from 'vitest';
import { haversine, haversineMatrix, solveCircuit, tourCost, type Point } from '../route';

/** Cost of visiting points in the given index order, as a closed loop. */
const costOf = (pts: Point[], order: number[]) => tourCost(haversineMatrix(pts), order);

describe('haversine', () => {
	it('measures a known distance', () => {
		// Tottenham (the depot area) to Westminster is ~11.5km as the crow flies.
		const d = haversine(
			{ latitude: 51.599527, longitude: -0.068306 },
			{ latitude: 51.50101, longitude: -0.141563 }
		);
		expect(d).toBeGreaterThan(11_000);
		expect(d).toBeLessThan(12_500);
	});

	it('is zero for a point against itself', () => {
		const p = { latitude: 51.5, longitude: -0.1 };
		expect(haversine(p, p)).toBe(0);
	});
});

describe('solveCircuit', () => {
	it('pins the depot at the start', () => {
		const pts: Point[] = [
			{ latitude: 51.5, longitude: -0.1 },
			{ latitude: 51.6, longitude: -0.2 },
			{ latitude: 51.4, longitude: -0.05 },
			{ latitude: 51.55, longitude: -0.3 }
		];
		expect(solveCircuit(haversineMatrix(pts))[0]).toBe(0);
	});

	it('visits every stop exactly once', () => {
		const pts: Point[] = Array.from({ length: 12 }, (_, i) => ({
			latitude: 51.5 + (i % 4) * 0.02,
			longitude: -0.1 + Math.floor(i / 4) * 0.02
		}));
		const order = solveCircuit(haversineMatrix(pts));
		expect([...order].sort((a, b) => a - b)).toEqual(pts.map((_, i) => i));
	});

	it('finds the optimal loop around a square', () => {
		// Four corners of a square. The optimum traces the perimeter (0→1→2→3); any
		// order that crosses the diagonal is strictly worse, so this is a real test of
		// whether 2-opt untangles the nearest-neighbour seed.
		const pts: Point[] = [
			{ latitude: 51.5, longitude: -0.1 },
			{ latitude: 51.5, longitude: -0.05 },
			{ latitude: 51.55, longitude: -0.05 },
			{ latitude: 51.55, longitude: -0.1 }
		];
		const order = solveCircuit(haversineMatrix(pts));
		// Either direction around the perimeter is equally optimal.
		expect([order.join(','), [...order].join(',')]).toContainEqual(
			expect.stringMatching(/^0,1,2,3$|^0,3,2,1$/)
		);
	});

	it('beats the unoptimised input order on a deliberately tangled set', () => {
		// Points laid out so that visiting them in index order zig-zags badly.
		const pts: Point[] = [
			{ latitude: 51.5, longitude: -0.1 }, // depot
			{ latitude: 51.6, longitude: -0.1 },
			{ latitude: 51.52, longitude: -0.1 },
			{ latitude: 51.58, longitude: -0.1 },
			{ latitude: 51.54, longitude: -0.1 },
			{ latitude: 51.56, longitude: -0.1 }
		];
		const naive = pts.map((_, i) => i);
		const solved = solveCircuit(haversineMatrix(pts));
		expect(costOf(pts, solved)).toBeLessThan(costOf(pts, naive));
	});

	it('handles the trivial sizes without churning', () => {
		expect(solveCircuit([[0]])).toEqual([0]);
		expect(
			solveCircuit([
				[0, 1],
				[1, 0]
			])
		).toEqual([0, 1]);
	});

	it('still returns every stop when some legs are unroutable', () => {
		// Infinity is what fetchDurationMatrix substitutes for ORS's nulls.
		const m = [
			[0, 1, Infinity],
			[1, 0, Infinity],
			[Infinity, Infinity, 0]
		];
		expect([...solveCircuit(m)].sort()).toEqual([0, 1, 2]);
	});
});
