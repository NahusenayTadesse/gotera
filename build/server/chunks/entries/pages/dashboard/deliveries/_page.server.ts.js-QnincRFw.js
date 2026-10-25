import { m as db, z as addons, L as deliveryAddons, j as eq, k as and, G as deliverySkipDates, d as desc, x as deliveries, I as addresses, t as plans, p as subscribers, q as subscriptions, a as asc, B as guestOrders, A as giftOrders, y as subscriberAddons, C as stock, h as gte, s as sql, i as inArray } from '../../../../chunks/db.js-C0XyR4ft.js';
import { f as fullDate, b as todayInTimeZone, t as toCalendarString, s as shiftDays } from '../../../../chunks/format.js-DDyQH27n.js';
import { d as deleteReleasingStock, r as readMainStock, s as syncDeliveryStock, m as moveOrderStock, M as MAIN_SCOPE } from '../../../../chunks/stock.js-DeYtX4qU.js';
import { i as isDeliveryDay, b as nextDeliveryDateAfter } from '../../../../chunks/deliverySchedule.js-BgiOZ7kS.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-C3Iq_YCw.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-P7rUUC6q.js';
import { z as zod } from '../../../../chunks/adapters.js-DtwKAq2A.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { i as idSchema, c as contentCrud } from '../../../../chunks/crud.js-CmXwO-Qx.js';
import { s as syncAllocations, f as syncAfter, g as traceSummaries } from '../../../../chunks/traceability.js-vt8QiHea.js';
import { b as bulkEmailSchema } from '../../../../chunks/bulkEmail.js-DcIy_1Go.js';
import { s as sendBulkEmailAction } from '../../../../chunks/bulkEmail2.js-CvHAsoqT.js';
import { d as deliverySchema } from '../../../../chunks/schema10.js-CjrvrOQX.js';
import { C as fail } from '../../../../chunks/utils.js-BQt5v-8G.js';
import { o as object, D as literal, s as string } from '../../../../chunks/access.js-j1_SnSd1.js';

//#region src/routes/dashboard/deliveries/skipDateSchema.ts
var day = string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Pick a date." });
/** Admin skips one delivery day (Sat, Sun or Mon) — bank holiday, van off the road, etc.
* Anything still booked for it moves to `moveTo`, or the next open delivery day if empty. */
var skipDaySchema = object({
	date: day,
	reason: string().trim().max(255).optional(),
	moveTo: day.or(literal("")).optional()
});
/** Move everything still booked on `from` to `to`, without skipping `from`. */
var moveDaySchema = object({
	from: day,
	to: day
});
//#endregion
//#region src/lib/server/deliveryMoves.ts
/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
function toLocalMidnight(value) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(y, m - 1, d);
}
/** Everything still to go out on `date`. */
async function bookingsOn(date) {
	const [subs, guests, gifts] = await Promise.all([
		db.select({ id: deliveries.id }).from(deliveries).where(and(eq(deliveries.status, "scheduled"), eq(deliveries.scheduledDate, toLocalMidnight(date)))),
		db.select({ id: guestOrders.id }).from(guestOrders).where(and(eq(guestOrders.status, "paid"), sql`${guestOrders.deliveryDate} = ${date}`)),
		db.select({ id: giftOrders.id }).from(giftOrders).where(and(eq(giftOrders.status, "paid"), sql`${giftOrders.deliveryDate} = ${date}`))
	]);
	return [
		...subs.map((r) => ({
			type: "subscription",
			id: r.id
		})),
		...guests.map((r) => ({
			type: "guest",
			id: r.id
		})),
		...gifts.map((r) => ({
			type: "gift",
			id: r.id
		}))
	];
}
/**
* Why `date` can't take bookings, or null if it can: it has to be a Saturday, Sunday or
* Monday, not in the past, and not skipped.
*/
async function targetProblem(date) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Pick a date.";
	if (!isDeliveryDay(date)) return "We only deliver on Saturdays, Sundays and Mondays.";
	if (date < todayInTimeZone()) return "That date has already passed.";
	const [skipped] = await db.select({ id: deliverySkipDates.id }).from(deliverySkipDates).where(eq(deliverySkipDates.date, toLocalMidnight(date)));
	if (skipped) return "That day is skipped — un-skip it first, or pick another day.";
	return null;
}
/**
* Move bookings onto `to`, taking their stock with them and re-running batch allocation
* (batches are picked by the ship date). Anything no longer movable is counted as left.
* Returns the distinct recipients of what moved, for the "your delivery moved" email.
*/
async function moveBookings(refs, to, userId) {
	const target = toLocalMidnight(to);
	const moved = [];
	const recipients = /* @__PURE__ */ new Map();
	let left = 0;
	for (const ref of refs) try {
		if (ref.type === "subscription") {
			const [res] = await db.update(deliveries).set({ scheduledDate: target }).where(and(eq(deliveries.id, ref.id), eq(deliveries.status, "scheduled")));
			if (res.affectedRows === 0) {
				left++;
				continue;
			}
			await syncDeliveryStock(ref.id);
		} else {
			const table = ref.type === "gift" ? giftOrders : guestOrders;
			const [o] = await db.select({ status: table.status }).from(table).where(eq(table.id, ref.id));
			if (o?.status !== "paid" || !await moveOrderStock(ref.type, ref.id, target)) {
				left++;
				continue;
			}
		}
		moved.push(ref);
	} catch (err) {
		console.error("Moving booking failed:", ref, err);
		left++;
	}
	if (moved.length) {
		try {
			await syncAllocations({ refs: moved }, userId);
		} catch (err) {
			console.error("Batch re-sync after move failed:", err);
		}
		for (const r of await recipientsOf(moved)) recipients.set(r.email, r);
	}
	return {
		moved: moved.length,
		left,
		recipients: [...recipients.values()]
	};
}
async function recipientsOf(refs) {
	const ids = (type) => refs.filter((r) => r.type === type).map((r) => r.id);
	const [subs, guests, gifts] = await Promise.all([
		ids("subscription").length ? db.select({
			email: subscribers.email,
			name: subscribers.fullName
		}).from(deliveries).innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).where(inArray(deliveries.id, ids("subscription"))) : [],
		ids("guest").length ? db.select({
			email: guestOrders.buyerEmail,
			name: guestOrders.buyerName
		}).from(guestOrders).where(inArray(guestOrders.id, ids("guest"))) : [],
		ids("gift").length ? db.select({
			email: giftOrders.buyerEmail,
			name: giftOrders.buyerName
		}).from(giftOrders).where(inArray(giftOrders.id, ids("gift"))) : []
	]);
	return [
		...subs,
		...guests,
		...gifts
	].filter((r) => !!r.email).map((r) => ({
		email: r.email,
		name: r.name ?? void 0
	}));
}
//#endregion
//#region src/routes/dashboard/deliveries/+page.server.ts
var plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
/** Id of the row a superforms CRUD action just saved, if the save was valid. */
function savedId(res) {
	const form = res?.form ?? res?.data?.form;
	return form?.valid && form.data?.id ? form.data.id : null;
}
var crud = contentCrud({
	table: deliveries,
	label: "Delivery",
	addSchema: deliverySchema,
	editSchema: deliverySchema
});
/** The Saturday that opens the delivery weekend `date` belongs to (Tue–Fri: the coming one). */
function weekendOf(date) {
	const [y, m, d] = date.split("-").map(Number);
	const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
	return shiftDays(date, dow === 6 ? 0 : dow === 0 ? -1 : dow === 1 ? -2 : 6 - dow);
}
/** How many weeks of delivery days the "move to" pickers offer. */
var MOVE_HORIZON_WEEKS = 6;
/** Statuses that still have to go out, across deliveries and one-off orders. */
var PENDING = /* @__PURE__ */ new Set(["scheduled", "paid"]);
var DONE = /* @__PURE__ */ new Set([
	"dispatched",
	"delivered",
	"fulfilled"
]);
var load = async ({ url }) => {
	const [form, bulkEmailForm, skipDates, subscriptionRows, guestRows, giftRows, oneOffAddonRows, recurringAddonRows, addonCatalogue] = await Promise.all([
		superValidate(zod(deliverySchema)),
		superValidate(zod(bulkEmailSchema)),
		db.select().from(deliverySkipDates).orderBy(desc(deliverySkipDates.date)),
		db.select({
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
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).orderBy(asc(deliveries.scheduledDate)),
		db.select().from(guestOrders).orderBy(desc(guestOrders.createdAt)),
		db.select().from(giftOrders).orderBy(desc(giftOrders.createdAt)),
		db.select({
			deliveryId: deliveryAddons.deliveryId,
			name: addons.name,
			quantity: deliveryAddons.quantity
		}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)),
		db.select({
			subscriptionId: subscriberAddons.subscriptionId,
			name: addons.name,
			quantity: subscriberAddons.quantity
		}).from(subscriberAddons).innerJoin(addons, eq(addons.id, subscriberAddons.addonId)),
		db.select().from(addons).where(eq(addons.isActive, true)).orderBy(asc(addons.sortOrder))
	]);
	const oneOffByDelivery = /* @__PURE__ */ new Map();
	for (const a of oneOffAddonRows) {
		const list = oneOffByDelivery.get(a.deliveryId) ?? [];
		list.push({
			name: a.name,
			quantity: a.quantity,
			recurring: false
		});
		oneOffByDelivery.set(a.deliveryId, list);
	}
	const recurringBySubscription = /* @__PURE__ */ new Map();
	for (const a of recurringAddonRows) {
		const list = recurringBySubscription.get(a.subscriptionId) ?? [];
		list.push({
			name: a.name,
			quantity: a.quantity,
			recurring: true
		});
		recurringBySubscription.set(a.subscriptionId, list);
	}
	const subscriptionDeliveries = subscriptionRows.map((r) => ({
		...r,
		type: "subscription",
		addons: [...recurringBySubscription.get(r.subscriptionId) ?? [], ...oneOffByDelivery.get(r.id) ?? []]
	}));
	const guestDeliveries = guestRows.map((r) => {
		const address = parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		});
		return {
			id: r.id,
			type: "guest",
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: r.quantity === 0 ? "Add-ons only" : "Guest order",
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({
				name: a.name,
				quantity: a.quantity,
				recurring: false
			}))
		};
	});
	const giftDeliveries = giftRows.map((r) => {
		const address = parseJsonColumn(r.recipientAddress, {
			line1: "",
			city: "",
			postcode: ""
		});
		return {
			id: r.id,
			type: "one-time",
			scheduledDate: r.deliveryDate ?? r.createdAt,
			status: r.status,
			subscriberEmail: r.buyerEmail,
			subscriberName: r.buyerName || r.recipientName,
			planName: "One-time order",
			addressLine1: address.line1,
			addressCity: address.city,
			addressPostcode: address.postcode,
			isActive: r.isActive,
			addons: (r.addons ?? []).map((a) => ({
				name: a.name,
				quantity: a.quantity,
				recurring: false
			}))
		};
	});
	const merged = [
		...subscriptionDeliveries,
		...guestDeliveries,
		...giftDeliveries
	].sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
	const refOf = (r) => ({
		type: r.type === "one-time" ? "gift" : r.type,
		id: r.id
	});
	const traces = await traceSummaries(merged.map(refOf));
	const TRACE_LABEL = {
		traced: "Traced",
		partial: "Partly traced",
		missing: "No batch",
		none: "Not shipping"
	};
	const rows = merged.map((r) => {
		const ref = refOf(r);
		const t = traces.get(`${ref.type}:${ref.id}`) ?? {
			state: "none",
			batches: []
		};
		return {
			...r,
			day: toCalendarString(r.scheduledDate),
			traceType: ref.type,
			trace: TRACE_LABEL[t.state],
			traceState: t.state,
			batches: t.batches
		};
	});
	const today = todayInTimeZone();
	const param = url.searchParams.get("weekend");
	const weekend = weekendOf(param && /^\d{4}-\d{2}-\d{2}$/.test(param) ? param : today);
	const skipByDay = new Map(skipDates.map((s) => [toCalendarString(s.date), s]));
	const days = await Promise.all([
		0,
		1,
		2
	].map(async (offset) => {
		const date = shiftDays(weekend, offset);
		const onDay = rows.filter((r) => r.day === date);
		const stockRow = await readMainStock(date);
		const skip = skipByDay.get(date);
		return {
			date,
			label: fullDate(date),
			isPast: date < today,
			isToday: date === today,
			skip: skip ? {
				id: skip.id,
				reason: skip.reason
			} : null,
			pending: onDay.filter((r) => PENDING.has(r.status)).length,
			done: onDay.filter((r) => DONE.has(r.status)).length,
			byType: {
				subscription: onDay.filter((r) => r.type === "subscription" && PENDING.has(r.status)).length,
				guest: onDay.filter((r) => r.type === "guest" && PENDING.has(r.status)).length,
				oneTime: onDay.filter((r) => r.type === "one-time" && PENDING.has(r.status)).length
			},
			capacity: stockRow?.capacity ?? 100,
			used: stockRow?.used ?? 0
		};
	}));
	const firstWeekend = weekendOf(today);
	const upcoming = [];
	const stockRows = await db.select({
		date: stock.deliveryDate,
		capacity: stock.capacity,
		used: stock.used
	}).from(stock).where(and(eq(stock.scopeKey, MAIN_SCOPE), gte(stock.deliveryDate, toLocalMidnight(today))));
	const stockByDay = new Map(stockRows.map((r) => [toCalendarString(r.date), r]));
	for (let w = 0; w < MOVE_HORIZON_WEEKS; w++) for (const offset of [
		0,
		1,
		2
	]) {
		const date = shiftDays(firstWeekend, w * 7 + offset);
		if (date < today) continue;
		const st = stockByDay.get(date);
		upcoming.push({
			date,
			label: fullDate(date),
			skipped: skipByDay.has(date),
			remaining: Math.max(0, (st?.capacity ?? 100) - (st?.used ?? 0))
		});
	}
	return {
		form,
		bulkEmailForm,
		skipDates: skipDates.filter((s) => toCalendarString(s.date) >= today).map((s) => ({
			...s,
			label: fullDate(s.date),
			weekend: weekendOf(toCalendarString(s.date))
		})),
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
var actions = {
	edit: syncAfter("subscription", async (event) => {
		const check = await superValidate(event.request.clone(), zod(deliverySchema));
		if (check.valid && !isDeliveryDay(check.data.scheduledDate)) return message(check, {
			type: "error",
			text: "We only deliver on Saturdays, Sundays and Mondays — pick one of those."
		}, { status: 400 });
		const res = await crud.actions.edit(event);
		const id = savedId(res);
		if (id) try {
			await syncDeliveryStock(id);
		} catch (err) {
			console.error("Stock sync after delivery edit failed:", err);
		}
		return res;
	}),
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod(idSchema));
		if (!form.valid) return crud.actions.delete(event);
		return deleteReleasingStock("delivery", form.data.id, () => crud.actions.delete(event));
	},
	sendBulkEmail: sendBulkEmailAction,
	assignBatches: async ({ request, locals }) => {
		const refs = (await request.formData()).getAll("refs").map(String).map((v) => {
			const [type, id] = v.split(":");
			return {
				type,
				id
			};
		}).filter((r) => [
			"subscription",
			"guest",
			"gift",
			"partner"
		].includes(r.type) && r.id).slice(0, 1e3);
		if (!refs.length) return fail(400, { error: "Nothing selected" });
		return { sync: await syncAllocations({ refs }, locals.user?.id) };
	},
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		const type = formData.get("type");
		if (typeof id !== "string" || type !== "guest" && type !== "one-time") return fail(400, { error: "Invalid request" });
		const table = type === "guest" ? guestOrders : giftOrders;
		await deleteReleasingStock(type === "guest" ? "guest" : "gift", id, () => db.delete(table).where(eq(table.id, id)));
		return { success: true };
	},
	skipDay: async ({ request, locals }) => {
		const parsed = skipDaySchema.safeParse(Object.fromEntries(await request.formData()));
		if (!parsed.success) return fail(400, { error: parsed.error.issues[0]?.message ?? "Invalid request" });
		const { date, reason, moveTo } = parsed.data;
		if (!isDeliveryDay(date)) return fail(400, { error: "We only deliver on Saturdays, Sundays and Mondays — pick one of those." });
		if (date < todayInTimeZone()) return fail(400, { error: "That day has already passed." });
		const [existing] = await db.select({ id: deliverySkipDates.id }).from(deliverySkipDates).where(eq(deliverySkipDates.date, toLocalMidnight(date)));
		if (existing) return fail(400, { error: "That day is already skipped." });
		if (moveTo) {
			if (moveTo === date) return fail(400, { error: "Pick a different day to move deliveries to." });
			const problem = await targetProblem(moveTo);
			if (problem) return fail(400, { error: problem });
		}
		await db.insert(deliverySkipDates).values({
			date: toLocalMidnight(date),
			reason: reason || null
		});
		const bookings = await bookingsOn(date);
		if (bookings.length === 0) return { result: {
			text: `${fullDate(date)} skipped. Nothing was booked for it.`,
			affected: [],
			toLabel: ""
		} };
		const to = moveTo || toCalendarString(await nextDeliveryDateAfter(date));
		const { moved, left, recipients } = await moveBookings(bookings, to, locals.user?.id);
		return { result: {
			text: `${fullDate(date)} skipped — ${plural(moved, "booking")} moved to ${fullDate(to)}.` + (left ? ` ${left} couldn't be moved; check the table.` : ""),
			affected: recipients,
			fromLabel: fullDate(date),
			toLabel: fullDate(to)
		} };
	},
	unskipDay: async ({ request }) => {
		const id = (await request.formData()).get("id");
		if (typeof id !== "string" || !id) return fail(400, { error: "Invalid request" });
		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.id, id));
		return { success: true };
	},
	moveDay: async ({ request, locals }) => {
		const parsed = moveDaySchema.safeParse(Object.fromEntries(await request.formData()));
		if (!parsed.success) return fail(400, { error: "Pick both days." });
		const { from, to } = parsed.data;
		if (from === to) return fail(400, { error: "Pick a different day." });
		const problem = await targetProblem(to);
		if (problem) return fail(400, { error: problem });
		const bookings = await bookingsOn(from);
		if (!bookings.length) return fail(400, { error: `Nothing is booked for ${fullDate(from)}.` });
		const { moved, left, recipients } = await moveBookings(bookings, to, locals.user?.id);
		return { result: {
			text: `${plural(moved, "booking")} moved from ${fullDate(from)} to ${fullDate(to)}.` + (left ? ` ${left} couldn't be moved.` : ""),
			affected: recipients,
			fromLabel: fullDate(from),
			toLabel: fullDate(to)
		} };
	},
	moveSelected: async ({ request, locals }) => {
		const f = await request.formData();
		const to = String(f.get("to") ?? "");
		const problem = await targetProblem(to);
		if (problem) return fail(400, { error: problem });
		const refs = f.getAll("refs").map(String).map((v) => {
			const [type, id] = v.split(":");
			return {
				type,
				id
			};
		}).filter((r) => [
			"subscription",
			"guest",
			"gift"
		].includes(r.type) && r.id).slice(0, 1e3);
		if (!refs.length) return fail(400, { error: "Nothing selected" });
		const { moved, left, recipients } = await moveBookings(refs, to, locals.user?.id);
		return { result: {
			text: `${plural(moved, "booking")} moved to ${fullDate(to)}.` + (left ? ` ${left} skipped — already dispatched, delivered or not yet paid.` : ""),
			affected: recipients,
			toLabel: fullDate(to)
		} };
	},
	addDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get("deliveryId");
		const addonId = formData.get("addonId");
		const quantity = Number(formData.get("quantity") ?? 1);
		if (typeof deliveryId !== "string" || !deliveryId || typeof addonId !== "string" || !addonId || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return fail(400, { error: "Invalid request" });
		const [existing] = await db.select().from(deliveryAddons).where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));
		if (existing) await db.update(deliveryAddons).set({ quantity: existing.quantity + quantity }).where(eq(deliveryAddons.id, existing.id));
		else await db.insert(deliveryAddons).values({
			deliveryId,
			addonId,
			quantity
		});
		return { success: true };
	},
	removeDeliveryAddon: async ({ request }) => {
		const formData = await request.formData();
		const deliveryId = formData.get("deliveryId");
		const name = formData.get("name");
		if (typeof deliveryId !== "string" || !deliveryId || typeof name !== "string" || !name) return fail(400, { error: "Invalid request" });
		const match = (await db.select({
			id: deliveryAddons.id,
			name: addons.name
		}).from(deliveryAddons).innerJoin(addons, eq(addons.id, deliveryAddons.addonId)).where(eq(deliveryAddons.deliveryId, deliveryId))).find((r) => r.name === name);
		if (!match) return fail(400, { error: "Add-on not found on this delivery" });
		await db.delete(deliveryAddons).where(eq(deliveryAddons.id, match.id));
		return { success: true };
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-QnincRFw.js.map
