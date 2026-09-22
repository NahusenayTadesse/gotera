<script lang="ts">
	import { page } from '$app/state';
	import AccountSettings from '$lib/components/AccountSettings.svelte';
	import AccountTabBar from '$lib/components/AccountTabBar.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Sidebar nav (static, already DRY). `short` is the label on the mobile tab bar.
	const managementLinks = $derived([
		{
			href: '/account',
			short: m.account_tab_overview(),
			label: m.account_sidebar_overview(),
			iconPath: '<rect x="1" y="1" width="14" height="14" rx="1"/><path d="M1 6h14M6 6v9"/>'
		},
		{
			href: '/account/delivery',
			short: m.account_tab_delivery(),
			label: m.account_sidebar_next_delivery(),
			iconPath: '<path d="M8 2v5l3 2"/><circle cx="8" cy="8" r="6.5"/>'
		},
		{
			href: '/account/history',
			short: m.account_tab_history(),
			label: m.account_sidebar_order_history(),
			iconPath: '<path d="M2 4h12M2 8h8M2 12h5"/>'
		},
		{
			href: '/account/details',
			short: m.account_tab_details(),
			label: m.account_sidebar_your_details(),
			iconPath: '<circle cx="8" cy="5" r="3"/><path d="M1.5 14c0-3 3-5.5 6.5-5.5s6.5 2.5 6.5 5.5"/>'
		}
	]);
	const subscriptionLinks = $derived([
		{
			href: '/account/change-plan',
			short: m.account_tab_plan(),
			label: m.account_sidebar_change_plan(),
			iconPath:
				'<rect x="2" y="3" width="12" height="10" rx="1"/><path d="M5 3V1.5M11 3V1.5M2 7h12"/>'
		}
	]);

	let currentPath = $derived(page.url.pathname);

	// Sub-pages (e.g. /account/change-plan/…) keep their section highlighted. /account
	// prefixes everything, so it only matches exactly.
	function isActive(href: string) {
		if (href === '/account') return currentPath === href;
		return currentPath === href || currentPath.startsWith(`${href}/`);
	}

	// "£24.00 · 12 April" once the date exists, otherwise just the amount.
	const paymentLabel = $derived(
		data.summary
			? data.summary.nextPaymentDate
				? `${data.summary.nextPaymentAmount} · ${data.summary.nextPaymentDate}`
				: data.summary.nextPaymentAmount
			: ''
	);
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="page-header">
	<div class="container">
		<div class="page-header-inner">
			<div>
				<span class="greeting">{m.account_greeting_eyebrow()}</span>
				<h1>{m.account_greeting_heading({ name: data.firstName })}</h1>
				{#if data.summary}
					<div class="header-meta">
						<span class="header-meta-item">
							<strong>{data.summary.planLabel}</strong>{data.summary.packsLabel}
						</span>
						{#if data.summary.nextDeliveryLabel}
							<span class="header-meta-item">
								<strong>{m.account_next_delivery_label()}</strong>{data.summary.nextDeliveryLabel}
							</span>
						{/if}
						<span class="header-meta-item">
							<strong>{m.account_next_payment_label()}</strong>{paymentLabel}
						</span>
					</div>
				{/if}
			</div>
			{#if data.summary}
				<!-- Colour follows the actual status — a cancelled plan must not read green. -->
				<div class="status-pill status-{data.summary.status}">
					<span class="status-dot"></span>{data.summary.statusLabel}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="container">
	<div class="layout">
		<aside class="sidebar">
			<div class="sidebar-section">
				<span class="sidebar-label">{m.account_sidebar_manage_label()}</span>
				<nav class="sidebar-nav">
					{#each managementLinks as link (link.href)}
						<a href={link.href} class="sidebar-link" class:active={isActive(link.href)}>
							<!-- Decorative: the link text carries the meaning. iconPath is a
							     static literal from the arrays above, never user input. -->
							<svg
								class="sidebar-icon"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								{@html link.iconPath}
							</svg>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="sidebar-divider"></div>
			<div class="sidebar-section">
				<span class="sidebar-label">{m.account_sidebar_subscription_label()}</span>
				<nav class="sidebar-nav">
					{#each subscriptionLinks as link (link.href)}
						<a href={link.href} class="sidebar-link" class:active={isActive(link.href)}>
							<!-- Decorative: the link text carries the meaning. iconPath is a
							     static literal from the arrays above, never user input. -->
							<svg
								class="sidebar-icon"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								aria-hidden="true"
							>
								{@html link.iconPath}
							</svg>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="sidebar-divider"></div>
			<div class="sidebar-danger">
				<AccountSettings />
			</div>
		</aside>
		<main class="content">
			{@render children?.()}

			<!-- On mobile the sidebar is replaced by the tab bar, so its settings and sign out
			     move to the bottom of Your Details. -->
			{#if isActive('/account/details')}
				<div class="mobile-settings">
					<AccountSettings />
				</div>
			{/if}
		</main>
	</div>
</div>

<AccountTabBar links={[...managementLinks, ...subscriptionLinks]} {isActive} />

<style>
	h1 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.05;
	}

	/* PAGE HEADER */
	/* The inner .container owns the measure — a separate max-width here would put the
     header on a different grid to the content below it. */
	.page-header {
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		border-bottom: 1px solid var(--border);
		padding: 36px 0 30px;
	}
	.container {
		width: min(var(--max), calc(100% - 28px));
		margin: auto;
	}

	.page-header-inner {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 24px;
		align-items: center;
	}

	.greeting {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
		margin-bottom: 10px;
		display: block;
		font-weight: 500;
	}

	.page-header h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-style: italic;
		color: var(--ink);
		line-height: 1;
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 14px;
		background: var(--panel);
		border: 1px solid var(--border);
		color: var(--taupe);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.status-pill.status-active {
		background: rgba(46, 125, 50, 0.07);
		border-color: rgba(46, 125, 50, 0.2);
		color: var(--success, #2f7d4f);
	}

	.status-pill.status-paused {
		background: rgba(154, 123, 31, 0.08);
		border-color: rgba(154, 123, 31, 0.3);
		color: #9a7b1f;
	}

	.status-pill.status-cancelled {
		background: rgba(178, 58, 42, 0.06);
		border-color: rgba(178, 58, 42, 0.3);
		color: #b23a2a;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: currentColor;
		flex-shrink: 0;
	}

	.header-meta {
		display: flex;
		gap: 28px;
		margin-top: 14px;
		flex-wrap: wrap;
	}

	.header-meta-item {
		font-size: 0.8rem;
		color: var(--taupe);
	}

	.header-meta-item strong {
		color: var(--ink);
		font-weight: 500;
		margin-right: 4px;
	}

	/* LAYOUT STRUCTURE */
	.layout {
		display: grid;
		grid-template-columns: 240px 1fr;
		align-items: start;
	}

	/* --nav-h is the site header height, defined once in the root layout. */
	.sidebar {
		background: #fff;
		border-right: 1px solid var(--border);
		padding: 28px 0;
		position: sticky;
		top: var(--nav-h);
		height: calc(100vh - var(--nav-h));
		overflow-y: auto;
	}

	.sidebar-section {
		padding: 0 16px;
		margin-bottom: 24px;
	}

	.sidebar-label {
		font-size: 0.62rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
		margin-bottom: 10px;
		display: block;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.sidebar-link {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 9px 12px;
		font-size: 0.83rem;
		color: var(--taupe);
		border-radius: 2px;
		transition: all 0.15s;
		text-decoration: none;
		letter-spacing: 0.01em;
	}

	.sidebar-link:hover {
		background: var(--panel);
		color: var(--ink);
	}

	.sidebar-link.active {
		background: rgba(181, 98, 42, 0.08);
		color: var(--copper);
		font-weight: 500;
	}

	.sidebar-icon {
		width: 15px;
		height: 15px;
		opacity: 0.45;
		flex-shrink: 0;
	}

	.sidebar-link.active .sidebar-icon {
		opacity: 1;
	}

	.sidebar-divider {
		height: 1px;
		background: var(--border);
		margin: 16px 16px;
	}

	.sidebar-danger {
		padding: 0 16px;
	}

	.content {
		padding: 32px 36px 80px;
		min-width: 0;
	}

	@media (max-width: 1020px) {
		.layout {
			grid-template-columns: 200px 1fr;
		}
		.content {
			padding: 24px 24px 60px;
		}
	}

	.mobile-settings {
		display: none;
	}

	@media (max-width: 800px) {
		/* The bottom tab bar takes over navigation; stack the layout. */
		.layout {
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: none;
		}

		.mobile-settings {
			display: block;
			margin-top: 32px;
			padding-top: 20px;
			border-top: 1px solid var(--border);
		}

		/* Compact header: plan and payment details are already on the Overview page, so
		   dropping them here gets the content on screen sooner. */
		.page-header {
			padding: 24px 0 20px;
		}

		.page-header-inner {
			grid-template-columns: 1fr auto;
			gap: 12px;
		}

		.header-meta {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.content {
			padding: 20px 16px 48px;
		}
	}
</style>
