import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { and, eq, inArray } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { deliveries, subscribers, addresses, guestOrders, giftOrders } from '$lib/server/db/schema';
import { bulkLookupPostcodes, lookupPostcode } from '$lib/server/geocode';
import {
	fetchDurationMatrix,
	haversineMatrix,
	solveCircuit,
	tourCost,
	type Point
} from '$lib/server/route';
import { nextDeliveryDate } from '$lib/server/deliverySchedule';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { toCalendarString, type CalendarDate } from '$lib/format';

/** Where the van starts and ends. Configurable so the depot can move without a deploy. */
const DEPOT_POSTCODE = env.DEPOT_POSTCODE ?? 'N17 8AA';

type RecipientAddress = { line1: string; line2?: string | null; city: string; postcode: string };

export type Stop = {
	id: string;
	/** Which table it came from — the UI labels guest/gift drops differently. */
	kind: 'subscription' | 'guest' | 'gift';
	name: string;
	line1: string;
	line2: string | null;
	city: string;
	postcode: string;
	latitude: number | null;
	longitude: number | null;
};

export const load: PageServerLoad = async ({ url }) => {
	// The page is under /dashboard, which `hooks.server.ts` already gates on an Admin
	// session (including form posts), so there is no auth check to repeat here.
	const requested = url.searchParams.get('date');
	const date: CalendarDate = /^\d{4}-\d{2}-\d{2}$/.test(requested ?? '')
		? requested!
		: toCalendarString(await nextDeliveryDate());

	const [subscriptionRows, guestRows, giftRows] = await Promise.all([
		db
			.select({
				id: deliveries.id,
				name: subscribers.fullName,
				email: subscribers.email,
				line1: addresses.line1,
				line2: addresses.line2,
				city: addresses.city,
				postcode: addresses.postcode,
				latitude: addresses.latitude,
				longitude: addresses.longitude
			})
			.from(deliveries)
			.leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
			.leftJoin(addresses, eq(addresses.id, deliveries.addressId))
			.where(
				and(
					// `new Date('2026-07-24')` parses as UTC midnight, which in a negative
					// offset lands on the previous day. The `T00:00:00` suffix makes it
					// parse as *local* midnight instead, matching how mysql2 hands back
					// `date` columns and how `deliverySchedule.ts` builds them.
					eq(deliveries.scheduledDate, new Date(`${date}T00:00:00`)),
					// A skipped or already-delivered drop is not part of today's driving.
					inArray(deliveries.status, ['scheduled', 'dispatched'])
				)
			),
		// Guest and gift orders never get a `deliveries` row (see the comment on
		// `giftOrders` in the schema), so a run built only from `deliveries` would send
		// the driver out missing drops. They also carry no scheduled date — they ship on
		// the next available Saturday — so "paid but not yet fulfilled" is the closest
		// available definition of "still owes a delivery", and the UI says so plainly.
		db.select().from(guestOrders).where(eq(guestOrders.status, 'paid')),
		db.select().from(giftOrders).where(eq(giftOrders.status, 'paid'))
	]);

	const fromJson = (
		raw: unknown,
		id: string,
		kind: 'guest' | 'gift',
		name: string | null
	): Stop => {
		const a = parseJsonColumn<RecipientAddress>(raw as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id,
			kind,
			name: name || (kind === 'guest' ? 'Guest order' : 'Gift order'),
			line1: a.line1,
			line2: a.line2 ?? null,
			city: a.city,
			postcode: a.postcode,
			// JSON addresses have no coordinate columns to read; filled in below.
			latitude: null,
			longitude: null
		};
	};

	const stops: Stop[] = [
		...subscriptionRows.map((r) => ({
			id: r.id,
			kind: 'subscription' as const,
			name: r.name || r.email || 'Subscriber',
			line1: r.line1 ?? '',
			line2: r.line2 ?? null,
			city: r.city ?? '',
			postcode: r.postcode ?? '',
			latitude: r.latitude,
			longitude: r.longitude
		})),
		...guestRows.map((r) =>
			fromJson(r.recipientAddress, r.id, 'guest', r.recipientName || r.buyerName)
		),
		...giftRows.map((r) =>
			fromJson(r.recipientAddress, r.id, 'gift', r.recipientName || r.buyerName)
		)
	];

	// Fill coordinates for anything still missing — every guest/gift stop, plus any
	// subscription address saved before the backfill ran. One bulk call, cached, and it
	// resolves nothing when postcodes.io is unreachable, which just means more stops land
	// in `unplaceable` below.
	const missing = stops.filter((s) => s.latitude == null || s.longitude == null);
	if (missing.length > 0) {
		const found = await bulkLookupPostcodes(missing.map((s) => s.postcode));
		const key = (pc: string) => pc.replace(/\s+/g, '').toUpperCase();
		for (const stop of missing) {
			const hit = found.get(key(stop.postcode));
			if (hit) {
				stop.latitude = hit.latitude;
				stop.longitude = hit.longitude;
			}
		}
	}

	// Subscription deliveries belong to the chosen date; guest and gift orders have no
	// scheduled date in the schema at all, so they surface on every date until fulfilled.
	// The UI has to say so, or an admin reads a December route as 22 December drops.
	const unscheduledCount = stops.filter((s) => s.kind !== 'subscription').length;
	const scheduledCount = stops.filter((s) => s.kind === 'subscription').length;

	const placeable = stops.filter(
		(s): s is Stop & Point => s.latitude != null && s.longitude != null
	);
	// Surfaced in the UI rather than silently dropped — a stop we can't map is still a
	// delivery somebody has paid for, and ops needs to see it to fix the postcode.
	const unplaceable = stops.filter((s) => s.latitude == null || s.longitude == null);

	const depot = await lookupPostcode(DEPOT_POSTCODE);
	// Without a depot there is no circuit to solve — just hand back the stop list.
	if (!depot || placeable.length === 0) {
		return {
			date,
			depot,
			ordered: [],
			unplaceable,
			totals: null,
			estimated: true,
			depotPostcode: depot?.postcode ?? DEPOT_POSTCODE,
			unscheduledCount,
			scheduledCount
		};
	}

	// Index 0 is the depot, which is what makes `solveCircuit` return a loop rather than
	// an open path.
	const points: Point[] = [
		{ latitude: depot.latitude, longitude: depot.longitude },
		...placeable.map((s) => ({ latitude: s.latitude, longitude: s.longitude }))
	];

	const real = await fetchDurationMatrix(points, env.ORS_API_KEY);
	// `estimated` drives the "these are straight-line estimates" note in the UI. Without
	// it an admin would read optimistic crow-flies totals as real drive times.
	const estimated = real === null;
	const costMatrix = real?.durations ?? haversineMatrix(points);
	const distanceMatrix = real?.distances ?? haversineMatrix(points);

	const order = solveCircuit(costMatrix);

	return {
		date,
		depot,
		// `order` indexes into `points`, where 0 is the depot — so subtract one to get
		// back to `placeable`, and drop the depot itself from the stop list.
		ordered: order.slice(1).map((i) => placeable[i - 1]),
		unplaceable,
		totals: {
			seconds: estimated ? null : tourCost(costMatrix, order),
			metres: tourCost(distanceMatrix, order),
			stops: placeable.length
		},
		estimated,
		depotPostcode: depot.postcode,
		unscheduledCount,
		scheduledCount
	};
};
