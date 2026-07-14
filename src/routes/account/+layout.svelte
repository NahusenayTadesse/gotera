<script lang="ts">
	import { page } from '$app/state';
	import Logout from '$lib/forms/Logout.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Mobile nav open/closed state.
	let menuOpen = $state(false);
	const closeMenu = () => (menuOpen = false);

	// Sidebar nav (static, already DRY).
	const managementLinks = [
		{ href: '/account', label: 'Overview', iconPath: '<rect x="1" y="1" width="14" height="14" rx="1"/><path d="M1 6h14M6 6v9"/>' },
		{ href: '/account/delivery', label: 'Next Delivery', iconPath: '<path d="M8 2v5l3 2"/><circle cx="8" cy="8" r="6.5"/>' },
		{ href: '/account/history', label: 'Order History', iconPath: '<path d="M2 4h12M2 8h8M2 12h5"/>' },
		{ href: '/account/details', label: 'Your Details', iconPath: '<circle cx="8" cy="5" r="3"/><path d="M1.5 14c0-3 3-5.5 6.5-5.5s6.5 2.5 6.5 5.5"/>' }
	];
	const subscriptionLinks = [
		{ href: '/account/change-plan', label: 'Change Plan', iconPath: '<rect x="2" y="3" width="12" height="10" rx="1"/><path d="M5 3V1.5M11 3V1.5M2 7h12"/>' },
	];

	let currentPath = $derived(page.url.pathname);

	// Close the mobile menu whenever the route changes.
	$effect(() => {
		currentPath;
		menuOpen = false;
	});

	// Label for the active page, shown on the mobile toggle button.
	const activeLabel = $derived(
		[...managementLinks, ...subscriptionLinks].find((l) => l.href === currentPath)?.label ?? 'Menu'
	);

	// "£24.00 · 12 April" once the date exists, otherwise just the amount.
	const paymentLabel = $derived(
		data.summary
			? data.summary.nextPaymentDate
				? `${data.summary.nextPaymentAmount} · ${data.summary.nextPaymentDate}`
				: data.summary.nextPaymentAmount
			: ''
	);
</script>

<div class="page-header">
	<div class="container">
		<div class="page-header-inner">
			<div>
				<span class="greeting">My Account</span>
				<h1>Good to see you, {data.firstName}.</h1>
				{#if data.summary}
					<div class="header-meta">
						<span class="header-meta-item">
							<strong>{data.summary.planLabel}</strong>{data.summary.packsLabel}
						</span>
						{#if data.summary.nextDeliveryLabel}
							<span class="header-meta-item">
								<strong>Next delivery</strong>{data.summary.nextDeliveryLabel}
							</span>
						{/if}
						<span class="header-meta-item">
							<strong>Next payment</strong>{paymentLabel}
						</span>
					</div>
				{/if}
			</div>
			{#if data.summary}
				<div class="status-pill">
					<span class="status-dot"></span>{data.summary.statusLabel}
				</div>
			{/if}
		</div>
	</div>
</div>

<div class="container">
	<!-- Mobile-only toggle button: appears in place of the old top slider. -->
	<button
		type="button"
		class="menu-toggle"
		class:open={menuOpen}
		aria-expanded={menuOpen}
		aria-controls="account-nav"
		onclick={() => (menuOpen = !menuOpen)}
	>
		<svg class="menu-toggle-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
			{#if menuOpen}
				<path d="M4 4l8 8M12 4l-8 8" />
			{:else}
				<path d="M2 4.5h12M2 8h12M2 11.5h12" />
			{/if}
		</svg>
		<span class="menu-toggle-label">{menuOpen ? 'Close menu' : activeLabel}</span>
		<svg class="menu-toggle-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M4 6l4 4 4-4" />
		</svg>
	</button>

	<div class="layout">
		<aside id="account-nav" class="sidebar" class:open={menuOpen}>
			<div class="sidebar-section">
				<span class="sidebar-label">Manage</span>
				<nav class="sidebar-nav">
					{#each managementLinks as link (link.href)}
						<a
							href={link.href}
							class="sidebar-link"
							class:active={currentPath === link.href}
							onclick={closeMenu}
						>
							<svg class="sidebar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
								{@html link.iconPath}
							</svg>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="sidebar-divider"></div>
			<div class="sidebar-section">
				<span class="sidebar-label">Subscription</span>
				<nav class="sidebar-nav">
					{#each subscriptionLinks as link (link.href)}
						<a
							href={link.href}
							class="sidebar-link"
							class:active={currentPath === link.href}
							onclick={closeMenu}
						>
							<svg class="sidebar-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
								{@html link.iconPath}
							</svg>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="sidebar-divider"></div>
			<div class="sidebar-danger">
				<Logout />
			</div>
		</aside>
		<main class="content">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
  h1, h2, h3, h4 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    line-height: 1.05;
  }

  /* PAGE HEADER */
  .page-header {
    background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
    border-bottom: 1px solid var(--border);
    padding: 36px 0 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .container { width: min(var(--max), calc(100% - 28px)); margin: auto; }

  .page-header-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
  }

  .greeting {
    font-size: .72rem;
    letter-spacing: .18em;
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
    background: rgba(46, 125, 50, .07);
    border: 1px solid rgba(46, 125, 50, .2);
    color: var(--success);
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--success);
    flex-shrink: 0;
  }

  .header-meta {
    display: flex;
    gap: 28px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .header-meta-item {
    font-size: .8rem;
    color: var(--taupe);
  }

  .header-meta-item strong {
    color: var(--ink);
    font-weight: 500;
    margin-right: 4px;
  }

  /* MOBILE MENU TOGGLE (hidden on desktop) */
  .menu-toggle {
    display: none;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 16px;
    padding: 13px 16px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--ink);
    font-size: .78rem;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .15s, border-color .15s;
  }

  .menu-toggle:hover { background: var(--panel); }

  .menu-toggle.open { border-color: var(--copper); color: var(--copper); }

  .menu-toggle-icon { width: 16px; height: 16px; opacity: .55; flex-shrink: 0; }

  .menu-toggle.open .menu-toggle-icon { opacity: 1; }

  .menu-toggle-label { flex: 1; text-align: left; }

  .menu-toggle-chevron {
    width: 14px;
    height: 14px;
    opacity: .45;
    flex-shrink: 0;
    transition: transform .18s ease;
  }

  .menu-toggle.open .menu-toggle-chevron { transform: rotate(180deg); opacity: 1; }

  /* LAYOUT STRUCTURE */
  .layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    align-items: start;
  }

  .sidebar {
    background: #fff;
    border-right: 1px solid var(--border);
    padding: 28px 0;
    position: sticky;
    top: 68px;
    height: calc(100vh - 68px);
    overflow-y: auto;
  }

  .sidebar-section {
    padding: 0 16px;
    margin-bottom: 24px;
  }

  .sidebar-label {
    font-size: .62rem;
    letter-spacing: .18em;
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
    font-size: .83rem;
    color: var(--taupe);
    border-radius: 2px;
    transition: all .15s;
    text-decoration: none;
    letter-spacing: .01em;
  }

  .sidebar-link:hover {
    background: var(--panel);
    color: var(--ink);
  }

  .sidebar-link.active {
    background: rgba(181, 98, 42, .08);
    color: var(--copper);
    font-weight: 500;
  }

  .sidebar-icon {
    width: 15px;
    height: 15px;
    opacity: .45;
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

  .sidebar-danger-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    font-size: .82rem;
    color: #A33A2B;
    border-radius: 2px;
    transition: all .15s;
    text-decoration: none;
  }

  .sidebar-danger-link:hover {
    background: #FBF1EF;
  }

  .content {
    padding: 32px 36px 80px;
    min-width: 0;
  }

  @media(max-width: 1020px) {
    .layout { grid-template-columns: 200px 1fr; }
    .content { padding: 24px 24px 60px; }
  }

  @media(max-width: 800px) {
    /* Show the toggle button, stack the layout. */
    .menu-toggle { display: flex; }

    .layout { grid-template-columns: 1fr; }

    /* Dashboard menu: a collapsible panel instead of the horizontal slider. */
    .sidebar {
      position: static;
      height: auto;
      overflow: visible;
      border-right: none;
      border: 1px solid var(--border);
      border-radius: 2px;
      margin-top: 10px;
      padding: 20px 0 8px;
      display: none;
    }

    .sidebar.open {
      display: block;
      animation: sidebar-drop .18s ease;
    }

    .page-header-inner { grid-template-columns: 1fr; }
  }

  @keyframes sidebar-drop {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media(max-width: 560px) {
    .content { padding: 20px 16px 48px; }
  }
</style>