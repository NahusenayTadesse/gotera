import { test, expect, type Page } from '@playwright/test';

/**
 * Mobile-viewport checks for the admin panel.
 *
 * The failure these guard against is horizontal overflow: fixed pixel widths on table
 * wrappers, `w-screen` inside an already-padded main, and nav rows that can't wrap all
 * pushed `document.scrollWidth` past the viewport on a phone. Asserting on scrollWidth
 * catches regressions that a screenshot diff would only hint at.
 */

const ROUTES = [
	['/dashboard/admin-panel', 'landing'],
	['/dashboard/admin-panel/users', 'users'],
	['/dashboard/admin-panel/users/add-users', 'add-users'],
	['/dashboard/admin-panel/roles', 'roles'],
	['/dashboard/admin-panel/roles/add-roles', 'add-roles']
] as const;

async function overflow(page: Page) {
	return page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth,
		// Name the widest offenders so a failure says which element to fix.
		culprits: [...document.querySelectorAll<HTMLElement>('body *')]
			.filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
			.slice(0, 5)
			.map((el) => `${el.tagName.toLowerCase()}.${el.className?.toString().slice(0, 80)}`)
	}));
}

for (const [path, name] of ROUTES) {
	test(`${name} has no horizontal overflow on mobile`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState('networkidle');

		const { scrollWidth, clientWidth, culprits } = await overflow(page);
		expect(
			scrollWidth,
			`page scrolls horizontally; widest elements: ${culprits.join(' | ')}`
		).toBeLessThanOrEqual(clientWidth + 1);
	});
}

test('sidebar closes on route change', async ({ page }) => {
	await page.goto('/dashboard/admin-panel');

	// The off-canvas sidebar renders as a dialog on mobile.
	await page.getByRole('button', { name: /toggle sidebar/i }).click();
	const sidebar = page.getByRole('dialog');
	await expect(sidebar).toBeVisible();

	await sidebar.getByRole('link', { name: 'Customers', exact: true }).click();

	await expect(page).toHaveURL(/\/dashboard\/customers/);
	await expect(sidebar).toBeHidden();
});

test('data tables fill the available width', async ({ page }) => {
	// The list pages used to pin their table wrapper to a fixed 350px, which both
	// overflowed narrower phones and left dead space on wider ones. The scroll
	// container should track its parent's content box instead.
	for (const path of ['/dashboard/admin-panel/users', '/dashboard/admin-panel/roles']) {
		await page.goto(path);
		await page.waitForLoadState('networkidle');

		const { wrapper, available } = await page.evaluate(() => {
			const table = document.querySelector('table')!;
			const group = table.closest<HTMLElement>('[class*="resizable-panel-group"]')!;
			const host = group.parentElement!.parentElement!;
			const cs = getComputedStyle(host);
			return {
				wrapper: group.getBoundingClientRect().width,
				available:
					host.getBoundingClientRect().width -
					parseFloat(cs.paddingLeft) -
					parseFloat(cs.paddingRight)
			};
		});

		expect(wrapper, `${path}: table wrapper is wider than its container`).toBeLessThanOrEqual(
			available + 1
		);
		expect(wrapper, `${path}: table wrapper leaves dead space`).toBeGreaterThanOrEqual(
			available - 1
		);
	}
});

test('detail pages fit on mobile', async ({ page }) => {
	// The user/role detail pages render a second DataTable below the card; it used to
	// sit outside any width-constrained wrapper.
	for (const [list, heading] of [
		['/dashboard/admin-panel/users', /User Details/i],
		['/dashboard/admin-panel/roles', /Role Details/i]
	] as const) {
		await page.goto(list);
		await page.waitForLoadState('networkidle');
		await page.locator('tbody a[href*="/dashboard/admin-panel/"]').first().click();

		await expect(page.getByRole('heading', { name: heading })).toBeVisible();
		await page.waitForLoadState('networkidle');

		const { scrollWidth, clientWidth, culprits } = await overflow(page);
		expect(
			scrollWidth,
			`${heading} scrolls horizontally; widest elements: ${culprits.join(' | ')}`
		).toBeLessThanOrEqual(clientWidth + 1);
	}
});

test('admin nav rows wrap instead of overflowing', async ({ page }) => {
	await page.goto('/dashboard/admin-panel/users');

	for (const label of ['Users', 'Add Users']) {
		const btn = page.getByRole('link', { name: label, exact: true }).first();
		const box = await btn.boundingBox();
		expect(box, `${label} button not rendered`).not.toBeNull();
		expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
	}
});

test('user management card links are tappable', async ({ page }) => {
	await page.goto('/dashboard/admin-panel');

	for (const label of ['Users', 'Roles']) {
		const link = page.getByRole('link', { name: label, exact: true }).first();
		const box = await link.boundingBox();
		// 44px is the usual minimum touch target.
		expect(box!.height, `${label} link is too short to tap`).toBeGreaterThanOrEqual(44);
	}
});

test.describe('mobile bottom menu', () => {
	const ITEMS = [
		['Home', '/dashboard'],
		['Orders', '/dashboard/orders'],
		['Delivery', '/dashboard/deliveries'],
		['Customers', '/dashboard/customers'],
		['Stock', '/dashboard/stock']
	] as const;

	test('shows every item, in the viewport, with tappable targets', async ({ page }) => {
		await page.goto('/dashboard');
		const nav = page.getByRole('navigation', { name: 'Dashboard sections' });
		await expect(nav).toBeVisible();

		const vw = page.viewportSize()!.width;
		for (const [label] of ITEMS) {
			const link = nav.getByRole('link', { name: label, exact: true });
			await expect(link).toBeVisible();
			const box = (await link.boundingBox())!;
			expect(box.x, `${label} starts off-screen`).toBeGreaterThanOrEqual(0);
			expect(box.x + box.width, `${label} runs past the viewport`).toBeLessThanOrEqual(vw + 1);
			expect(box.height, `${label} is too short to tap`).toBeGreaterThanOrEqual(44);
		}
	});

	test('navigates and marks the current section', async ({ page }) => {
		await page.goto('/dashboard');
		const nav = page.getByRole('navigation', { name: 'Dashboard sections' });

		for (const [label, url] of ITEMS) {
			await nav.getByRole('link', { name: label, exact: true }).click();
			await expect(page).toHaveURL(new RegExp(`${url}$`));
			// Exactly one item is current, and it's this one.
			await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
			await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute(
				'aria-current',
				'page'
			);
		}
	});

	test('does not cover page content or add horizontal scroll', async ({ page }) => {
		await page.goto('/dashboard/admin-panel');
		await page.waitForLoadState('networkidle');

		const { scrollWidth, clientWidth, culprits } = await overflow(page);
		expect(scrollWidth, `bottom menu overflows: ${culprits.join(' | ')}`).toBeLessThanOrEqual(
			clientWidth + 1
		);

		// The bar is fixed, so content clears it only because the layout reserves bottom
		// padding. Assert that reservation directly — measuring where a scrolled element
		// lands tests the browser's scroll behaviour, not the layout.
		const navHeight = (await page
			.getByRole('navigation', { name: 'Dashboard sections' })
			.boundingBox())!.height;
		const reserved = await page.evaluate(() => {
			const content = document.querySelector('main > div:last-of-type')!;
			return parseFloat(getComputedStyle(content).paddingBottom);
		});

		expect(
			reserved,
			'layout reserves less bottom padding than the bar is tall'
		).toBeGreaterThanOrEqual(navHeight);
	});

	test('is hidden on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/dashboard');
		await expect(page.getByRole('navigation', { name: 'Dashboard sections' })).toBeHidden();
	});
});

test.describe('dashboard mobile ergonomics', () => {
	test('tables start at one page instead of rendering every row', async ({ page }) => {
		// Rendering all rows made these pages thousands of pixels tall on a phone.
		for (const path of ['/dashboard/customers', '/dashboard/deliveries']) {
			await page.goto(path);
			await page.waitForLoadState('networkidle');

			const rows = await page.locator('tbody tr').count();
			expect(rows, `${path} renders every row at once`).toBeLessThanOrEqual(10);

			const height = await page.evaluate(() => document.documentElement.scrollHeight);
			expect(height, `${path} is ${height}px tall on a phone`).toBeLessThan(4000);
		}
	});

	test('the header stays reachable while scrolling', async ({ page }) => {
		await page.goto('/dashboard/deliveries');
		await page.waitForLoadState('networkidle');

		const toggle = page.getByRole('button', { name: /toggle sidebar/i });
		await expect(toggle).toBeInViewport();

		await page.evaluate(() => window.scrollBy(0, 1500));
		await page.waitForTimeout(150);

		// Sticky: still on screen after scrolling far down the page.
		await expect(toggle).toBeInViewport();
	});

	test('no input is small enough to trigger iOS zoom on focus', async ({ page }) => {
		// Safari zooms in when a focused field is under 16px, and does not zoom back out.
		for (const path of ['/dashboard/stock', '/dashboard/reports/orders']) {
			await page.goto(path);
			await page.waitForLoadState('networkidle');

			const small = await page.evaluate(() =>
				[...document.querySelectorAll<HTMLElement>('input,select,textarea')]
					.filter((el) => el.type !== 'hidden')
					.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
					.map((el) => `${el.tagName.toLowerCase()}#${el.id || el.name || '?'}`)
			);
			expect(small, `${path} has sub-16px fields`).toEqual([]);
		}
	});
});

test('CSV export covers every row, not just the visible page', async ({ page }) => {
	// Pagination now defaults to 10 rows on mobile; the export must still cover the
	// whole filtered set. It read the post-pagination row model before this was fixed.
	await page.goto('/dashboard/admin-panel/users');
	await page.waitForLoadState('networkidle');

	const total = await page.evaluate(() => {
		const label = [...document.querySelectorAll('button')].find((b) =>
			/\d+\s+Results/.test(b.textContent || '')
		);
		return Number((label?.textContent || '').match(/(\d+)\s+Results/)?.[1] ?? 0);
	});
	expect(total, 'no Results count found').toBeGreaterThan(10);
	expect(await page.locator('tbody tr').count(), 'expected a paginated table').toBe(10);

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Export table' }).click();
	await page.getByRole('button', { name: /Export to CSV/i }).click();

	const file = await (await download).createReadStream();
	const csv = await new Promise<string>((resolve, reject) => {
		let out = '';
		file.on('data', (c) => (out += c));
		file.on('end', () => resolve(out));
		file.on('error', reject);
	});

	const dataRows = csv.trim().split('\n').length - 1; // minus the header row
	expect(dataRows, `CSV had ${dataRows} rows but the table holds ${total}`).toBe(total);
});
