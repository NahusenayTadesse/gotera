import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import StockIndicator from './StockIndicator.svelte';

const base = { remaining: 42, capacity: 100, low: false, dateLabel: 'Saturday, 19 September' };

describe('StockIndicator', () => {
	it('shows remaining against capacity', async () => {
		const { container } = render(StockIndicator, { stock: base });

		expect(container.querySelector('.stock-count')?.textContent).toBe('42');
		expect(container.querySelector('.stock-cap')?.textContent).toBe('/ 100');
	});

	it('links to the stock dashboard', async () => {
		render(StockIndicator, { stock: base });

		await expect.element(page.getByRole('link')).toHaveAttribute('href', '/dashboard/stock');
	});

	it('names the delivery date in its tooltip', async () => {
		render(StockIndicator, { stock: base });

		await expect
			.element(page.getByRole('link'))
			.toHaveAttribute('title', '42 of 100 left for Saturday, 19 September');
	});

	it('flags low stock so the header turns red', async () => {
		render(StockIndicator, { stock: { ...base, remaining: 4, low: true } });

		const link = page.getByRole('link');
		await expect.element(link).toBeInTheDocument();
		// The `low` class is what drives both the red border and the pulse animation.
		expect(link.element().classList.contains('low')).toBe(true);
	});

	it('does not mark healthy stock as low', async () => {
		render(StockIndicator, { stock: base });

		expect(page.getByRole('link').element().classList.contains('low')).toBe(false);
	});

	it('renders nothing when no stock row exists yet', async () => {
		// A fresh install has no capacity row; the header must stay empty rather than
		// showing a misleading zero.
		const { container } = render(StockIndicator, { stock: null });

		expect(container.querySelector('a')).toBeNull();
	});

	it('shows zero remaining when a date is fully booked', async () => {
		// Assert on the count element directly: a bare getByText('0') is ambiguous because
		// the capacity span ("/ 100") contains a zero too.
		const { container } = render(StockIndicator, { stock: { ...base, remaining: 0, low: true } });

		expect(container.querySelector('.stock-count')?.textContent).toBe('0');
		expect(container.querySelector('a')?.classList.contains('low')).toBe(true);
	});
});
