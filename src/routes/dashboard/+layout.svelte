<script lang="ts">
	import './dashboard-theme.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import DarkMode from '$lib/components/DarkMode.svelte';
	import Search from '$lib/components/Search.svelte';
	import AvatarSettings from '$lib/components/AvatarSettings.svelte';
	import BottomMenu from '$lib/components/bottomMenu.svelte';

	let { children, data } = $props();
</script>

<div class="dashboard-theme bg-background text-foreground">
	<Sidebar.Provider>
		<AppSidebar messageNumber={data?.messageNumber} ordersNumber={data?.ordersNumber} />
		<main class="min-w-0 flex-1 px-4">
			<div
				class="absolute top-3 left-3 z-10 flex w-[95%] flex-row
				justify-between rounded-lg border border-border bg-background/90 p-3 pr-5 align-middle
			 backdrop-blur-md lg:sticky lg:w-full lg:pr-4"
			>
				<Sidebar.Trigger class="rounded-lg border border-border bg-card p-4" />
				<div class="flex flex-row items-center gap-4">
					<Search />
					<AvatarSettings data={data?.name} />
				</div>
			</div>
			<div class="p-4 pt-28 pb-24 lg:pt-8 lg:pb-8">
				{@render children?.()}
				<!-- <BottomMenu /> -->
			</div>
		</main>
	</Sidebar.Provider>
</div>
