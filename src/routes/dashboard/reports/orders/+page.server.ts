import type { PageServerLoad } from './$types';
import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { giftOrders, guestOrders } from '$lib/server/db/schema';
import { parseDateRangeParams, dateRangeCondition, bucketCount, chooseGranularity } from '$lib/server/reports';
import { parseJsonColumn } from '$lib/components/dashboard/format';

type Address = { line1: string; line2?: string | null; city: string; postcode: string };

export const load: PageServerLoad = async ({ url }) => {
	const { preset, from, to, range } = parseDateRangeParams(url, 'last30');

	const [giftRows, guestRows] = await Promise.all([
		db
			.select()
			.from(giftOrders)
			.where(dateRangeCondition(giftOrders.createdAt, range))
			.orderBy(desc(giftOrders.createdAt)),
		db
			.select()
			.from(guestOrders)
			.where(dateRangeCondition(guestOrders.createdAt, range))
			.orderBy(desc(guestOrders.createdAt))
	]);

	const giftParsed = giftRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn<Address>(r.recipientAddress as Address, {
			line1: '',
			city: '',
			postcode: ''
		})
	}));
	const guestParsed = guestRows.map((r) => ({
		...r,
		recipientAddress: parseJsonColumn<Address>(r.recipientAddress as Address, {
			line1: '',
			city: '',
			postcode: ''
		})
	}));

	const byStatus = <T extends { status: string }>(rows: T[], status: string) =>
		rows.filter((r) => r.status === status).length;

	const stats = {
		giftTotal: giftParsed.length,
		giftPaid: byStatus(giftParsed, 'paid'),
		giftFulfilled: byStatus(giftParsed, 'fulfilled'),
		giftPending: byStatus(giftParsed, 'pending'),
		guestTotal: guestParsed.length,
		guestPaid: byStatus(guestParsed, 'paid'),
		guestFulfilled: byStatus(guestParsed, 'fulfilled'),
		guestPending: byStatus(guestParsed, 'pending'),
		totalQuantity:
			giftParsed.reduce((s, r) => s + (r.quantity ?? 0), 0) +
			guestParsed.reduce((s, r) => s + (r.quantity ?? 0), 0)
	};

	const granularity = chooseGranularity(range);
	const giftTrend = bucketCount(giftParsed, (r) => new Date(r.createdAt), range, granularity);
	const guestTrend = bucketCount(guestParsed, (r) => new Date(r.createdAt), range, granularity);
	const charts = {
		trend: { labels: giftTrend.labels, gift: giftTrend.counts, guest: guestTrend.counts }
	};

	return { preset, from, to, giftRows: giftParsed, guestRows: guestParsed, stats, charts };
};
