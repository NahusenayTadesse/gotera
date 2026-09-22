import { test as setup, expect } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'node:fs';
import { createConnection } from 'mysql2/promise';

/**
 * Creates an account through the real signup flow, then promotes it to the Admin role
 * directly in the database.
 *
 * `handleDashboardGuard` in `src/hooks.server.ts` gates every /dashboard route on the
 * joined role name being exactly 'Admin', and nothing in the UI can grant that to a
 * fresh signup — so the promotion has to happen out of band. Everything else (the
 * session cookie, the password hash) still comes from Better Auth itself.
 */
export const ADMIN_STORAGE = 'e2e/.auth/admin.json';

setup('create an authenticated admin session', async ({ page }) => {
	const email = `e2e-admin-${Date.now()}@example.test`;
	const password = 'TestPassw0rd!23';

	await page.goto('/signup');
	await page.fill('#name', 'E2E Admin');
	await page.fill('#email', email);
	await page.fill('#password', password);
	await page.fill('#confirmPassword', password);
	await page.click('button[type=submit]');

	await expect
		.poll(
			async () =>
				(await page.context().cookies()).some((c) => c.name === 'better-auth.session_token'),
			{ timeout: 15_000 }
		)
		.toBe(true);

	// Promote to Admin. `roles` is seeded with an 'Admin' row; create it if a fresh
	// database doesn't have one yet.
	process.loadEnvFile('.env');
	const conn = await createConnection(process.env.DATABASE_URL!);
	try {
		const [roleRows] = await conn.query<any[]>("select id from roles where name = 'Admin' limit 1");
		let roleId = roleRows[0]?.id;
		if (!roleId) {
			const [res] = await conn.query<any>(
				"insert into roles (name, description) values ('Admin', 'Full access')"
			);
			roleId = res.insertId;
		}
		await conn.query('update user set role_id = ?, email_verified = 1 where email = ?', [
			roleId,
			email
		]);
	} finally {
		await conn.end();
	}

	// The guard 403s non-admins, so reaching the dashboard proves the promotion took.
	await page.goto('/dashboard/admin-panel');
	await expect(page).toHaveURL(/\/dashboard\/admin-panel/);
	await expect(page.getByRole('heading', { name: /Welcome to Admin Dashboard/i })).toBeVisible();

	mkdirSync('e2e/.auth', { recursive: true });
	await page.context().storageState({ path: ADMIN_STORAGE });
	writeFileSync('e2e/.auth/admin-email.txt', email);
});
