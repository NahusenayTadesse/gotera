<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	/**
	 * Mobile-only bottom navigation for /account, replacing the sidebar under 800px.
	 * Same links and line icons as the sidebar so the two read as one nav.
	 */
	type Tab = { href: string; short: string; iconPath: string };
	let { links, isActive }: { links: Tab[]; isActive: (href: string) => boolean } = $props();
</script>

<nav class="account-tabbar" aria-label={m.account_tabs_aria()}>
	{#each links as link (link.href)}
		{@const active = isActive(link.href)}
		<a href={link.href} class="tab" class:active aria-current={active ? 'page' : undefined}>
			<!-- iconPath is a static literal from the account layout, never user input. -->
			<svg
				class="tab-icon"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				{@html link.iconPath}
			</svg>
			<span class="tab-label">{link.short}</span>
		</a>
	{/each}
</nav>

<style>
	.account-tabbar {
		display: none;
	}

	@media (max-width: 800px) {
		.account-tabbar {
			position: fixed;
			inset: auto 0 0 0;
			z-index: 90;
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
			padding-bottom: env(safe-area-inset-bottom);
			background: rgba(250, 248, 244, 0.96);
			backdrop-filter: blur(14px);
			-webkit-backdrop-filter: blur(14px);
			border-top: 1px solid var(--border);
		}

		/* Keep the site footer and toasts clear of the bar. */
		:global(body:has(.account-tabbar)) {
			padding-bottom: calc(60px + env(safe-area-inset-bottom));
		}
		/* !important: svelte-sonner sets this variable as an inline style. */
		:global(body:has(.account-tabbar) [data-sonner-toaster]) {
			--mobile-offset-bottom: calc(72px + env(safe-area-inset-bottom)) !important;
		}
	}

	.tab {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		min-height: 60px;
		padding: 8px 2px;
		color: var(--taupe);
		font-size: 0.64rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		-webkit-tap-highlight-color: transparent;
		transition: color 0.15s;
	}

	.tab.active {
		color: var(--copper);
		font-weight: 500;
	}

	/* Thin copper rule over the active tab, echoing the sidebar's active tint. */
	.tab.active::before {
		content: '';
		position: absolute;
		top: -1px;
		left: 28%;
		right: 28%;
		height: 2px;
		background: var(--copper);
	}

	.tab:focus-visible {
		outline: 2px solid var(--copper);
		outline-offset: -4px;
	}

	.tab-icon {
		width: 18px;
		height: 18px;
		opacity: 0.55;
	}

	.tab.active .tab-icon {
		opacity: 1;
	}

	.tab-label {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
