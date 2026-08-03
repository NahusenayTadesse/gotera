<script lang="ts">
	import type { PageData } from './$types';
	import DateRangeFilter from '$lib/components/dashboard/DateRangeFilter.svelte';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import ChartCanvas from '$lib/components/dashboard/ChartCanvas.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { colorAt, colorList } from '$lib/components/dashboard/chartPalette';
	import { giftColumns, guestColumns } from './columns';
	import { Gift, UserX, CircleCheckBig, PackageCheck, Loader } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let filteredGiftRows = $state(data.giftRows);
	let filteredGuestRows = $state(data.guestRows);

	const trendData = $derived({
		labels: data.charts.trend.labels,
		datasets: [
			{ label: 'One-Time & Gift', data: data.charts.trend.gift, backgroundColor: colorAt(0), borderRadius: 4 },
			{ label: 'Guest', data: data.charts.trend.guest, backgroundColor: colorAt(4), borderRadius: 4 }
		]
	});

	const giftStatusData = $derived({
		labels: ['Paid', 'Fulfilled', 'Pending'],
		datasets: [{ data: [data.stats.giftPaid, data.stats.giftFulfilled, data.stats.giftPending], backgroundColor: colorList(3) }]
	});
	const guestStatusData = $derived({
		labels: ['Paid', 'Fulfilled', 'Pending'],
		datasets: [{ data: [data.stats.guestPaid, data.stats.guestFulfilled, data.stats.guestPending], backgroundColor: colorList(3) }]
	});
</script>

<svelte:head>
	<title>Orders Report</title>
</svelte:head>

<h1 class="dash-heading mb-6 text-2xl font-semibold">Orders Report</h1>

<DateRangeFilter preset={data.preset} from={data.from} to={data.to} />

<Card.Root class="mb-10">
	<Card.Header>
		<Card.Title>Order volume by channel</Card.Title>
		<Card.Description>One-time/gift vs guest checkout, over time</Card.Description>
	</Card.Header>
	<Card.Content>
		<ChartCanvas type="bar" data={trendData} height="280px" />
	</Card.Content>
</Card.Root>

<h2 class="mb-4 flex items-center gap-2 text-lg font-medium"><Gift class="size-5" /> One-Time & Gift Orders</h2>
<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
	<StatCard title="Placed" value={data.stats.giftTotal} description="In range">
		{#snippet icon()}<Gift class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Paid" value={data.stats.giftPaid} description="Payment confirmed">
		{#snippet icon()}<CircleCheckBig class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Fulfilled" value={data.stats.giftFulfilled} description="Shipped">
		{#snippet icon()}<PackageCheck class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Pending" value={data.stats.giftPending} description="Awaiting payment">
		{#snippet icon()}<Loader class="size-6" />{/snippet}
	</StatCard>
	<Card.Root class="sm:col-span-2 lg:col-span-4">
		<Card.Content class="flex items-center justify-center py-4">
			<div class="h-48 w-48"><ChartCanvas type="doughnut" data={giftStatusData} height="192px" /></div>
		</Card.Content>
	</Card.Root>
</div>
<FilterMenu data={data.giftRows} filterKeys={['status']} bind:filteredList={filteredGiftRows} class="mb-4" />
<div class="mb-10">
	<DataTable data={filteredGiftRows} columns={giftColumns} fileName="One-Time and Gift Orders Report" />
</div>

<h2 class="mb-4 flex items-center gap-2 text-lg font-medium"><UserX class="size-5" /> Guest Orders</h2>
<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
	<StatCard title="Placed" value={data.stats.guestTotal} description="In range">
		{#snippet icon()}<UserX class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Paid" value={data.stats.guestPaid} description="Payment confirmed">
		{#snippet icon()}<CircleCheckBig class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Fulfilled" value={data.stats.guestFulfilled} description="Shipped">
		{#snippet icon()}<PackageCheck class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Pending" value={data.stats.guestPending} description="Awaiting payment">
		{#snippet icon()}<Loader class="size-6" />{/snippet}
	</StatCard>
	<Card.Root class="sm:col-span-2 lg:col-span-4">
		<Card.Content class="flex items-center justify-center py-4">
			<div class="h-48 w-48"><ChartCanvas type="doughnut" data={guestStatusData} height="192px" /></div>
		</Card.Content>
	</Card.Root>
</div>
<FilterMenu data={data.guestRows} filterKeys={['status']} bind:filteredList={filteredGuestRows} class="mb-4" />
<DataTable data={filteredGuestRows} columns={guestColumns} fileName="Guest Orders Report" />
