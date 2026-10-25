import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';

type Conn = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Copy the phone a signed-in customer typed at checkout onto their customer record, so it
 * shows on /account/details and in the dashboard. The latest number wins — it is the one
 * the driver should ring. No-op for users with no subscriber row yet.
 */
export async function saveSubscriberPhone(userId: string, phone: string, conn: Conn = db) {
	const value = phone.trim();
	if (!value) return;
	await conn.update(subscribers).set({ phone: value }).where(eq(subscribers.userId, userId));
}
