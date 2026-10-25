import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, eq, asc, desc, gte } from 'drizzle-orm';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	deliveries,
	subscribers,
	subscriptions,
	plans,
	addresses,
	guestOrders,
	giftOrders,
	deliverySkipDates,
	deliveryAddons,
	subscriberAddons,
	addons as addonsTable,
	stock
} from '$lib/server/db/schema';
import { contentCrud, idSchema } from '$lib/server/crud';
import { deleteReleasingStock, syncDeliveryStock } from '$lib/server/stock';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { deliverySchema } from './schema';
import { skipDaySchema, moveDaySchema, type MoveResult } from './skipDateSchema';
import { isDeliveryDay, nextDeliveryDateAfter } from '$lib/server/deliverySchedule';
import { DEFAULT_CAPACITY, MAIN_SCOPE, readMainStock } from '$lib/server/stock';
import {
	bookingsOn,
	moveBookings,
	targetProblem,
	toLocalMidnight,
	type BookingRef
} from '$lib/server/deliveryMoves';
import { fullDate, shiftDays, toCalendarString, todayInTimeZone, type CalendarDate } from '$lib/format';
import { syncAfter, syncAllocations, traceSummaries, type ShipmentRef } from '$lib/server/traceability';

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Id of the row a superforms CRUD action just saved, if the save was valid. */
function savedId(res: unknown): string | null {
	const form =
		(res as { form?: { valid?: boolean; data?: { id?: string } } })?.form ??
		(res as { data?: { form?: { valid?: boolean; data?: { id?: string } } } })?.data?.form;
	return form?.valid && form.data?.id ? form.data.id : null;
}

const crud = contentCrud({
	table: deliveries,
	label: 'Delivery',
	addSchema: deliverySchema,
	editSchema: deliverySchema
});

type RecipientAddress = { line1: string; line2?: string | null; city: string; postcode: string };

type AddonLine = { name: string; quantity: number; recurring: boolean };

/** The Saturday that opens the delivery weekend `date` belongs to (Tue–Fri: the coming one). */
function weekendOf(date: CalendarDate): CalendarDate {
	const [y, m, d] = date.split('-').map(Number);
	const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
	return shiftDays(date, dow === 6 ? 0 : dow === 0 ? -1 : dow === 1 ? -2 : 6 - dow);
}

/** How many weeks of delivery days the "move to" pickers offer. */
const MOVE_HORIZON_WEEKS = 6;

/** Statuses that still have to go out, across deliveries and one-off orders. */
const PENDING = new Set(['scheduled', 'paid']);
const DONE = new Set(['dispatched', 'delivered', 'fulfilled']);

export const load: PageServerLoad = async ({ url }) => {
	const [
		form,
		bulkEmailForm,
		skipDates,
		subscriptionRows,
		guestRows,
		giftRows,
		oneOffAddonRows,
		recurringAddonRows,
		addonCatalogue
	] = await Promise.all([
		superValidate(zod4(deliverySchema)),
		superValidate(zod4(bulkEmailSchema)),
		db.select().from(deliverySkipDates).orderBy(desc(deliverySkipDates.date)),
		db
			.select({
				id: deliveries.id,
				subscriptionId: deliveries.subscriptionId,
				scheduledDate: deliveries.scheduledDate,
				status: deliveries.status,
				subscriberEmail: subscribers.email,
				subscriberName: subscribers.fullName,
				planName: plans.name,
				addressLine1: addresses.line1,
				addressCity: addresses.city,
				addressPostcode: addresses.postcode,
				isActive: deliveries.isActive
			})
			.from(deliveries)
			.leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
			.leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.leftJoin(addresses, eq(addresses.id, deliveries.addressId))
			.orderBy(asc(deliveries.scheduledDate)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt)),
		// One-off add-ons (added for a single delivery — from the account page, or admin below).
		db
			.select({ deliveryId: deliveryAddons.deliveryId, name: addonsTable.name, quantity: deliveryAddons.quantity })
			.from(deliveryAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId)),
		// Recurring add-ons — riding along on every delivery for that subscription.
		db
			.select({
				subscriptionId: subscriberAddons.subscriptionId,
				name: addonsTable.name,
				quantity: subscriberAddons.quantity
			})
			.from(subscriberAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, subscriberAddons.addonId)),
		db.select().from(addonsTable).where(eq(addonsTable.isActive, true)).orderBy(asc(addonsTable.sortOrder))
	]);

	const oneOffByDelivery = new Map<string, AddonLine[]>();
	for (const a of oneOffAddonRows) {
		const list = oneOffByDelivery.get(a.deliveryId) ?? [];
		list.push({ name: a.name, quantity: a.quantity, recurring: false });
		oneOffByDelivery.set(a.deliveryId, list);
	}

	const recurringBySubscription = new Map<string, AddonLine[]>();
	for (const a of recurringAddonRows) {
		const list = recurringBySubscription.get(a.subscriptionId) ?? [];
		list.push({ name: a.name, quantity: a.quantity, recurring: true });
		recurringBySubscription.set(a.subscriptionId, list);
	}

	// Guest and one-time orders don't run through the subscription billing cycle that
	// generates `deliveries` rows, so they never showed up here — admins had to check
	// three separate pages to see everything that needed shipping. Fold them in as
	// read-only-shaped rows (same field names as a subscription delivery) so the table
	// and its columns don't need to branch on shape, only on `type`.
	const subscriptionDeliveries = subscriptionRows.map((r) => ({
		...r,
		type: 'subscription' as const,
		addons: [
			...(recurringBySubscription.get(r.subscriptionId) ?? []),
			...(oneOffByDelivery.get(r.id) ?? [])
		]
	}));

	const guestDeliveries = guestRows.map((r) => {
		const address = parseJsonColumn<RecipientAddress>(r.recipientAddress as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id: r.id,
			type: 'guest' as const,
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			// Quantity 0 = add-ons bought on their own from /addons, with no injera.
			planName: r.quantity === 0 ? 'Add-ons only' : 'Guest order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({ name: a.name, quantity: a.quantity, recurring: false }))
		};
	});

	const giftDeliveries = giftRows.map((r) => {
		const address = parseJsonColumn<RecipientAddress>(r.recipientAddress as RecipientAddress, {
			line1: '',
			city: '',
			postcode: ''
		});
		return {
			id: r.id,
			type: 'one-time' as const,
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: 'One-time order',
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({ name: a.name, quantity: a.quantity, recurring: false }))
		};
	});

	const merged = [...subscriptionDeliveries, ...guestDeliveries, ...giftDeliveries].sort(
		(a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
	);

	// Batch traceability per row. The table calls gift orders 'one-time'.
	const refOf = (r: (typeof merged)[number]): ShipmentRef => ({
		type: r.type === 'one-time' ? 'gift' : r.type,
		id: r.id
	});
	const traces = await traceSummaries(merged.map(refOf));
	const TRACE_LABEL = { traced: 'Traced', partial: 'Partly traced', missing: 'No batch', none: 'Not shipping' };
	const rows = merged.map((r) => {
		const ref = refOf(r);
		const t = traces.get(`${ref.type}:${ref.id}`) ?? { state: 'none' as const, batches: [] };
		return {
			...r,
			// Calendar day as a string, so the page can group/filter by day without the
			// browser's time zone shifting a midnight Date onto the day before.
			day: toCalendarString(r.scheduledDate),
			traceType: ref.type,
			trace: TRACE_LABEL[t.state],
			traceState: t.state,
			batches: t.batches
		};
	});

	// ── The weekend planner: Sat/Sun/Mon of one weekend, picked with ?weekend=YYYY-MM-DD.
	const today = todayInTimeZone();
	const param = url.searchParams.get('weekend');
	const weekend = weekendOf(param && /^\d{4}-\d{2}-\d{2}$/.test(param) ? param : today);
	const skipByDay = new Map(skipDates.map((s) => [toCalendarString(s.date), s]));

		const days = await Promise.all(
		[0, 1, 2].map(async (offset) => {
			const date = shiftDays(weekend, offset);
			const onDay = rows.filter((r) => r.day === date);
			const stockRow = await readMainStock(date);
			const skip = skipByDay.get(date);
			return {
				date,
				label: fullDate(date),
				isPast: date < today,
				isToday: date === today,
				skip: skip ? { id: skip.id, reason: skip.reason } : null,
				pending: onDay.filter((r) => PENDING.has(r.status)).length,
				done: onDay.filter((r) => DONE.has(r.status)).length,
				byType: {
					subscription: onDay.filter((r) => r.type === 'subscription' && PENDING.has(r.status)).length,
					guest: onDay.filter((r) => r.type === 'guest' && PENDING.has(r.status)).length,
					oneTime: onDay.filter((r) => r.type === 'one-time' && PENDING.has(r.status)).length
				},
				capacity: stockRow?.capacity ?? DEFAULT_CAPACITY,
				used: stockRow?.used ?? 0
			};
		})
	);

	// Every upcoming delivery day, for the "move to" pickers. Skipped days are listed but
	// flagged, so the admin sees why one is missing rather than wondering.
	const firstWeekend = weekendOf(today);
	const upcoming: { date: string; label: string; skipped: boolean; remaining: number }[] = [];
	const stockRows = await db
		.select({ date: stock.deliveryDate, capacity: stock.capacity, used: stock.used })
		.from(stock)
		.where(and(eq(stock.scopeKey, MAIN_SCOPE), gte(stock.deliveryDate, toLocalMidnight(today))));
	const stockByDay = new Map(stockRows.map((r) => [toCalendarString(r.date), r]));
	for (let w = 0; w < MOVE_HORIZON_WEEKS; w++) {
		for (const offset of [0, 1, 2]) {
			const date = shiftDays(firstWeekend, w * 7 + offset);
			if (date < today) continue;
			const st = stockByDay.get(date);
			upcoming.push({
				date,
				label: fullDate(date),
				skipped: skipByDay.has(date),
				remaining: Math.max(0, (st?.capacity ?? DEFAULT_CAPACITY) - (st?.used ?? 0))
			});
		}
	}

	return {
		form,
		bulkEmailForm,
		skipDates: skipDates
			.filter((s) => toCalendarString(s.date) >= today)
			.map((s) => ({ ...s, label: fullDate(s.date), weekend: weekendOf(toCalendarString(s.date)) })),
		rows,
		addonCatalogue,
		weekend: {
			start: weekend,
			prev: shiftDays(weekend, -7),
			next: shiftDays(weekend, 7),
			isCurrent: weekend === firstWeekend,
			days
		},
		upcoming
	};
};

// Deliveries are generated from a subscription's billing cycle; admins only edit/delete existing ones.
export const actions: Actions = {
	// Re-syncs batches after a save: dispatching assigns them, skipping releases them.
	// Stock follows the same way: skipping/failing gives the units back, a new date moves them.
	edit: syncAfter('subscription', async (event: RequestEvent) => {
		const check = await superValidate(event.request.clone(), zod4(deliverySchema));
		if (check.valid && !isDeliveryDay(check.data.scheduledDate)) {
			return message(
				check,
				{ type: 'error', text: 'We only deliver on Saturdays, Sundays and Mondays — pick one of those.' },
				{ status: 400 }
			);
		}
		const res = await crud.actions.edit(event);
		const id = savedId(res);
		if (id) {
			try {
				await syncDeliveryStock(id);
			} catch (err) {
				console.error('Stock sync after delivery edit failed:', err);
			}
		}
		return res;
	}),
	delete: async (event: RequestEvent) => {
		const form = await superValidate(event.request.clone(), zod4(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock('delivery', form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction,

	// Auto-assign (FEFO) batches for the selected rows.
	assignBatches: async ({ request, locals }) => {
		const f = await request.formData();
		const refs = f
			.getAll('refs')
			.map(String)
			.map((v) => {
				const [type, id] = v.split(':');
				return { type, id } as ShipmentRef;
			})
			.filter((r) => ['subscription', 'guest', 'gift', 'partner'].includes(r.type) && r.id)
			.slice(0, 1000);
		if (!refs.length) return fail(400, { error: 'Nothing selected' });
		return { sync: await syncAllocations({ refs }, locals.user?.id) };
	},

	// Guest and one-time orders live in their own tables (edited on their own dashboard
	// pages), but showing up in this merged list is what surfaced them for deletion here.
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const type = formData.get('type');
		if (typeof id !== 'string' || (type !== 'guest' && type !== 'one-time')) {
			return fail(400, { error: 'Invalid request' });
		}

		const table = type === 'guest' ? guestOrders : giftOrders;
		await deleteReleasingStock(type === 'guest' ? 'guest' : 'gift', id, () =>
			db.delete(table).where(eq(table.id, id))
		);
		return { success: true };
	},

	// Skip one delivery day. Anything still booked for it (subscription deliveries and
	// paid one-off orders alike) moves to the day the admin picked, or the next open
	// delivery day, and the page gets back who was affected so it can offer a notice email.
	skipDay: async ({ request, locals }) => {
		const parsed = skipDaySchema.safeParse(Object.fromEntries(await request.formData()));
		if (!parsed.success) return fail(400, { error: parsed.error.issues[0]?.message ?? 'Invalid request' });
		const { date, reason, moveTo } = parsed.data;

		if (!isDeliveryDay(date)) {
			return fail(400, { error: 'We only deliver on Saturdays, Sundays and Mondays — pick one of those.' });
		}
		if (date < todayInTimeZone()) return fail(400, { error: 'That day has already passed.' });

		const [existing] = await db
			.select({ id: deliverySkipDates.id })
			.from(deliverySkipDates)
			.where(eq(deliverySkipDates.date, toLocalMidnight(date)));
		if (existing) return fail(400, { error: 'That day is already skipped.' });

		if (moveTo) {
			if (moveTo === date) return fail(400, { error: 'Pick a different day to move deliveries to.' });
			const problem = await targetProblem(moveTo);
			if (problem) return fail(400, { error: problem });
		}

		await db.insert(deliverySkipDates).values({ date: toLocalMidnight(date), reason: reason || null });

		const bookings = await bookingsOn(date);
		if (bookings.length === 0) {
			return { result: { text: `${fullDate(date)} skipped. Nothing was booked for it.`, affected: [], toLabel: '' } satisfies MoveResult };
		}

		const to = moveTo || toCalendarString(await nextDeliveryDateAfter(date));
		const { moved, left, recipients } = await moveBookings(bookings, to, locals.user?.id);
		return {
			result: {
				text:
					`${fullDate(date)} skipped — ${plural(moved, 'booking')} moved to ${fullDate(to)}.` +
					(left ? ` ${left} couldn't be moved; check the table.` : ''),
				affected: recipients,
				fromLabel: fullDate(date),
				toLabel: fullDate(to)
			} satisfies MoveResult
		};
	},

	// Un-skip a day. Deliveries that were moved off it stay where they went — moving them
	// back is a separate, deliberate "move day" so nobody gets a second surprise date.
	unskipDay: async ({ request }) => {
		const id = (await request.formData()).get('id');
		if (typeof id !== 'string' || !id) return fail(400, { error: 'Invalid request' });
		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.id, id));
		return { success: true };
	},

	// Move everything still booked on one day to another, without skipping the first —
	// e.g. a light Monday folded into Sunday.
	moveDay: async ({ request, locals }) => {
		const parsed = moveDaySchema.safeParse(Object.fromEntries(await request.formData()));
		if (!parsed.success) return fail(400, { error: 'Pick both days.' });
		const { from, to } = parsed.data;
		if (from === to) return fail(400, { error: 'Pick a different day.' });
		const problem = await targetProblem(to);
		if (problem) return fail(400, { error: problem });

		const bookings = await bookingsOn(from);
		if (!bookings.length) return fail(400, { error: `Nothing is booked for ${fullDate(from)}.` });

		const { moved, left, recipients } = await moveBookings(bookings, to, locals.user?.id);
		return {
			result: {
				text:
					`${plural(moved, 'booking')} moved from ${fullDate(from)} to ${fullDate(to)}.` +
					(left ? ` ${left} couldn't be moved.` : ''),
				affected: recipients,
				fromLabel: fullDate(from),
				toLabel: fullDate(to)
			} satisfies MoveResult
		};
	},

	// Move the rows selected in the table to one day.
	moveSelected: async ({ request, locals }) => {
		const f = await request.formData();
		const to = String(f.get('to') ?? '');
		const problem = await targetProblem(to);
		if (problem) return fail(400, { error: problem });

		const refs = f
			.getAll('refs')
			.map(String)
			.map((v) => {
				const [type, id] = v.split(':');
				return { type, id } as BookingRef;
			})
			.filter((r) => ['subscription', 'guest', 'gift'].includes(r.type) && r.id)
			.slice(0, 1000);
		if (!refs.length) return fail(400, { error: 'Nothing selected' });

		const { moved, left, recipients } = await moveBookings(refs, to, locals.user?.id);
		return {
			result: {
				text:
					`${plural(moved, 'booking')} moved to ${fullDate(to)}.` +
					(left ? ` ${left} skipped — already dispatched, delivered or not yet paid.` : ''),
				affected: recipients,
				toLabel: fullDate(to)
			} satisfies MoveResult
		};
	},

	// Admin equivalent of the customer's own "add extras to this delivery" — a one-off,
	// no separate charge, same as deliveryAddons everywhere else in the app.
	addDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get('deliveryId');
		const addonId = formData.get('addonId');
		const quantity = Number(formData.get('quantity') ?? 1);
		if (
			typeof deliveryId !== 'string' ||
			!deliveryId ||
			typeof addonId !== 'string' ||
			!addonId ||
			!Number.isInteger(quantity) ||
			quantity < 1 ||
			quantity > 20
		) {
			return fail(400, { error: 'Invalid request' });
		}

		const [existing] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));

		if (existing) {
			await db
				.update(deliveryAddons)
				.set({ quantity: existing.quantity + quantity })
				.where(eq(deliveryAddons.id, existing.id));
		} else {
			await db.insert(deliveryAddons).values({ deliveryId, addonId, quantity });
		}

		return { success: true };
	},

	removeDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get('deliveryId');
		const name = formData.get('name');
		if (typeof deliveryId !== 'string' || !deliveryId || typeof name !== 'string' || !name) {
			return fail(400, { error: 'Invalid request' });
		}

		// Looked up by name rather than a row id — the table only shows the merged
		// name/quantity, not each `delivery_addons` row's own id.
		const rows = await db
			.select({ id: deliveryAddons.id, name: addonsTable.name })
			.from(deliveryAddons)
			.innerJoin(addonsTable, eq(addonsTable.id, deliveryAddons.addonId))
			.where(eq(deliveryAddons.deliveryId, deliveryId));
		const match = rows.find((r) => r.name === name);
		if (!match) return fail(400, { error: 'Add-on not found on this delivery' });

		await db.delete(deliveryAddons).where(eq(deliveryAddons.id, match.id));
		return { success: true };
	}
};
