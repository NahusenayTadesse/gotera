import { describe, it, expect } from 'vitest';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';

/**
 * Reproduces the insert the signup action performs after creating the auth user.
 * That action swallows failures (logging "subscriber link failed"), so a broken insert is
 * invisible in production — this pins it down and surfaces the driver error.
 */
describe('signup subscriber link', () => {
	it('inserts the subscriber row the signup action creates', async () => {
		const email = `vitest-signup-${crypto.randomUUID().slice(0, 8)}@test.co`;
		let err: any = null;
		try {
			await db.insert(subscribers).values({
				userId: crypto.randomUUID().replace(/-/g, '').slice(0, 32),
				email,
				fullName: 'Signup Tester',
				plan: null,
				status: 'pending',
				marketingOptIn: true
			} as any);
		} catch (e: any) {
			err = e;
		}

		if (err) {
			throw new Error(`${err.cause?.code ?? err.code}: ${err.cause?.sqlMessage ?? err.message}`);
		}

		const [row] = await db.select().from(subscribers).where(eq(subscribers.email, email));
		expect(row).toBeDefined();
		await db.delete(subscribers).where(eq(subscribers.email, email));
	});
});
