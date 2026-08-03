<script lang="ts">

	import DailyStats from '$lib/components/dashboard/daily-stats.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="min-h-dvh w-full">
	<!-- Header Section -->
	<div class="border-b border-border">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<span class="dash-eyebrow">Overview</span>
					<h1 class="dash-heading text-3xl font-semibold text-foreground">Dashboard</h1>
					<p class="text-sm text-muted-foreground">Welcome back! Here's your daily overview.</p>
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
		<DailyStats stats={data?.dailyStats} />
	</div>

</div>
