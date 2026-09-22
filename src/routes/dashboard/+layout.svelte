<script lang="ts">
	import './dashboard-theme.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import DarkMode from '$lib/components/DarkMode.svelte';
	import Search from '$lib/components/Search.svelte';
	import AvatarSettings from '$lib/components/AvatarSettings.svelte';
	import StockIndicator from '$lib/components/dashboard/StockIndicator.svelte';
	import BottomMenu from '$lib/components/bottomMenu.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="dashboard-theme bg-background text-foreground">
	<Sidebar.Provider>
		<AppSidebar messageNumber={data?.messageNumber} ordersNumber={data?.ordersNumber} />
		<main class="min-w-0 flex-1 px-4">
			<!--
				Sticky on every size. It used to be `absolute` below `lg`, which meant the
				sidebar toggle, search, theme and avatar scrolled out of reach — on an
				8,900px-tall table page that is a long way back to the top.
			-->
			<div
				class="sticky top-3 z-10 flex w-full flex-row justify-between rounded-lg border
				border-border bg-background p-3 pr-5 align-middle lg:bg-background/90
				lg:pr-4 lg:backdrop-blur-md"
			>
				<Sidebar.Trigger class="rounded-lg border border-border bg-card p-4" />
				<div class="flex flex-row items-center gap-4">
					<StockIndicator stock={data?.stock} />
					<Search />
					<DarkMode />
					<AvatarSettings data={data?.name} />
				</div>
			</div>
			<div class="p-4 pt-6 pb-24 lg:pt-8 lg:pb-8">
				{@render children?.()}
			</div>
		</main>
		<!-- Pass `ordersNumber` once the layout load returns a count, to badge Orders. -->
		<BottomMenu />
	</Sidebar.Provider>
</div>
