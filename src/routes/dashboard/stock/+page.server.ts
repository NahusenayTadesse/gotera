import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { and, asc, desc, eq, gte } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { stock, stockChanges, addons, user } from '$lib/server/db/schema';
import { nextDeliveryDate } from '$lib/server/deliverySchedule';
import { getOrCreateStock, setCapacity, MAIN_SCOPE } from '$lib/server/stock';
import { toCalendarString } from '$lib/format';

/** How many upcoming Saturdays the page manages at once. */
const HORIZON_WEEKS = 8;

export const load: PageServerLoad = async () => {
	// Make sure the next delivery date always has a row, so a fresh install shows
	// something to edit rather than an empty page.
	await getOrCreateStock(await nextDeliveryDate());

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const [rows, catalogue, changes] = await Promise.all([
		db
			.select({
				id: stock.id,
				deliveryDate: stock.deliveryDate,
				addonId: stock.addonId,
				addonName: addons.name,
				capacity: stock.capacity,
				used: stock.used,
				lowThreshold: stock.lowThreshold,
				criticalThreshold: stock.criticalThreshold
			})
			.from(stock)
			.leftJoin(addons, eq(addons.id, stock.addonId))
			.where(gte(stock.deliveryDate, today))
			.orderBy(asc(stock.deliveryDate), asc(stock.scopeKey)),
		db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder)),
		db
			.select({
				id: stockChanges.id,
				stockId: stockChanges.stockId,
				field: stockChanges.field,
				delta: stockChanges.delta,
				valueAfter: stockChanges.valueAfter,
				reason: stockChanges.reason,
				createdAt: stockChanges.createdAt,
				byName: user.name,
				deliveryDate: stock.deliveryDate,
				addonName: addons.name
			})
			.from(stockChanges)
			.innerJoin(stock, eq(stock.id, stockChanges.stockId))
			.leftJoin(addons, eq(addons.id, stock.addonId))
			.leftJoin(user, eq(user.id, stockChanges.createdBy))
			.orderBy(desc(stockChanges.createdAt))
			.limit(50)
	]);

	return {
		rows: rows.map((r) => ({
			...r,
			dateLabel: toCalendarString(r.deliveryDate),
			itemLabel: r.addonName ?? 'Main product',
			remaining: Math.max(0, r.capacity - r.used)
		})),
		catalogue: catalogue.map((a) => ({ id: a.id, name: a.name })),
		changes: changes.map((c) => ({
			...c,
			dateLabel: toCalendarString(c.deliveryDate),
			itemLabel: c.addonName ?? 'Main product'
		})),
		horizonWeeks: HORIZON_WEEKS
	};
};

export const actions: Actions = {
	// Change a date's capacity. Consumption is never edited by hand — it's derived from
	// bookings — so this only ever writes `capacity`, and every edit lands in stock_changes.
	setCapacity: async ({ request, locals }) => {
		const data = await request.formData();
		const stockId = data.get('stockId');
		const capacity = Number(data.get('capacity'));
		const reason = data.get('reason');

		if (typeof stockId !== 'string' || !stockId) return fail(400, { error: 'Invalid request' });
		if (!Number.isInteger(capacity) || capacity < 0 || capacity > 100000) {
			return fail(400, { error: 'Capacity must be a whole number between 0 and 100000.' });
		}

		const updated = await setCapacity(
			stockId,
			capacity,
			locals.user?.id ?? null,
			typeof reason === 'string' && reason ? reason : undefined
		);
		if (!updated) return fail(400, { error: 'Stock row not found.' });

		return { success: true };
	},

	// Open a date for an item that has no row yet (a new add-on, or a future Saturday).
	createRow: async ({ request }) => {
		const data = await request.formData();
		const date = data.get('date');
		const addonId = data.get('addonId');

		if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return fail(400, { error: 'Pick a date.' });
		}

		const scope = typeof addonId === 'string' && addonId && addonId !== MAIN_SCOPE ? addonId : null;
		await getOrCreateStock(date, scope);
		return { success: true };
	},

	// Adjust the two alert levels for one row.
	setThresholds: async ({ request, locals }) => {
		const data = await request.formData();
		const stockId = data.get('stockId');
		const low = Number(data.get('lowThreshold'));
		const critical = Number(data.get('criticalThreshold'));

		if (typeof stockId !== 'string' || !stockId) return fail(400, { error: 'Invalid request' });
		if (!Number.isInteger(low) || low < 0 || !Number.isInteger(critical) || critical < 0) {
			return fail(400, { error: 'Thresholds must be whole numbers.' });
		}
		if (critical > low) {
			return fail(400, { error: 'The critical level must be at or below the low level.' });
		}

		await db
			.update(stock)
			.set({ lowThreshold: low, criticalThreshold: critical, updatedBy: locals.user?.id ?? null })
			.where(eq(stock.id, stockId));

		return { success: true };
	}
};
