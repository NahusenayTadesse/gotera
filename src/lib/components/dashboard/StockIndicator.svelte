<script lang="ts">
	import { Package } from '@lucide/svelte';

	let {
		stock
	}: {
		stock: { remaining: number; capacity: number; low: boolean; dateLabel: string } | null;
	} = $props();
</script>

{#if stock}
	<a
		href="/dashboard/stock"
		class="stock-pill"
		class:low={stock.low}
		title="{stock.remaining} of {stock.capacity} left for {stock.dateLabel}"
	>
		<Package class="h-4 w-4" />
		<span class="stock-count">{stock.remaining}</span>
		<span class="stock-cap">/ {stock.capacity}</span>
	</a>
{/if}

<style>
	.stock-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 0.5rem 0.7rem;
		font-size: 0.85rem;
		line-height: 1;
		white-space: nowrap;
	}

	.stock-count {
		font-weight: 600;
	}

	.stock-cap {
		opacity: 0.6;
	}

	/* Low stock pulses red rather than sitting statically coloured, so it reads as
	   "needs attention" at a glance without stealing focus permanently. */
	.stock-pill.low {
		border-color: #dc2626;
		color: #dc2626;
		animation: stock-flash 1.6s ease-in-out infinite;
	}

	@keyframes stock-flash {
		0%,
		100% {
			background: var(--card);
		}
		50% {
			background: color-mix(in srgb, #dc2626 18%, var(--card));
		}
	}

	/* Respect users who've asked the OS to reduce motion — keep the colour, drop the pulse. */
	@media (prefers-reduced-motion: reduce) {
		.stock-pill.low {
			animation: none;
			background: color-mix(in srgb, #dc2626 12%, var(--card));
		}
	}
</style>
