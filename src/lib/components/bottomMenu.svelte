<script lang="ts">
	import { page } from '$app/state';
	import { Container, LayoutDashboard, PackageSearch, Truck, Users } from '@lucide/svelte';

	/**
	 * Mobile-only bottom navigation for the dashboard.
	 *
	 * Carries the day-to-day fulfilment loop; everything else stays in the off-canvas
	 * sidebar. Icons deliberately match the sidebar's so the two read as one nav.
	 */
	let { ordersNumber = undefined }: { ordersNumber?: number } = $props();

	const mobNav = [
		{ title: 'Home', url: '/dashboard', icon: LayoutDashboard },
		{ title: 'Orders', url: '/dashboard/orders', icon: PackageSearch, counter: () => ordersNumber },
		{ title: 'Delivery', url: '/dashboard/deliveries', icon: Truck },
		{ title: 'Customers', url: '/dashboard/customers', icon: Users },
		{ title: 'Stock', url: '/dashboard/stock', icon: Container }
	];

	function isActive(url: string) {
		const path = page.url.pathname;
		// `/dashboard` prefixes every other entry, so it only matches exactly.
		if (url === '/dashboard') return path === '/dashboard';
		return path === url || path.startsWith(`${url}/`);
	}

	const formatCount = (count: number) => (count > 99 ? '99+' : String(count));
</script>

<nav
	aria-label="Dashboard sections"
	class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background lg:hidden"
	style="padding-bottom: env(safe-area-inset-bottom);"
>
	<ul class="grid grid-cols-5">
		{#each mobNav as item (item.url)}
			{@const active = isActive(item.url)}
			{@const count = item.counter?.()}
			<li class="min-w-0">
				<a
					href={item.url}
					aria-current={active ? 'page' : undefined}
					class="relative flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2
					transition-colors duration-200 active:bg-muted/60
					{active ? 'text-primary' : 'text-muted-foreground'}"
				>
					<span class="relative flex size-6 items-center justify-center">
						<item.icon class="size-5" />
						{#if count}
							<span
								class="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center
								rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
							>
								{formatCount(count)}
							</span>
						{/if}
					</span>

					<span class="w-full truncate text-center text-[11px] leading-none font-medium">
						{item.title}
					</span>

					<!-- Active marker sits on the top border so it reads as a tab, not a button. -->
					{#if active}
						<span class="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary"></span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>
