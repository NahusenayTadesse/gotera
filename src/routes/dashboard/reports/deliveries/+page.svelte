<script lang="ts">
	import type { PageData } from './$types';
	import DateRangeFilter from '$lib/components/dashboard/DateRangeFilter.svelte';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import ChartCanvas from '$lib/components/dashboard/ChartCanvas.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { colorAt } from '$lib/components/dashboard/chartPalette';
	import { columns } from './columns';
	import { Truck, CircleCheckBig, OctagonMinus, Loader, ListOrdered } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let filteredRows = $state(data.rows);

	const trendData = $derived({
		labels: data.charts.trend.labels,
		datasets: [
			{
				label: 'Deliveries scheduled',
				data: data.charts.trend.counts,
				borderColor: colorAt(2).slice(0, 7),
				backgroundColor: colorAt(2, '33'),
				fill: true,
				tension: 0.35
			}
		]
	});

	const funnelData = $derived({
		labels: ['Scheduled', 'Dispatched', 'Delivered', 'Skipped', 'Failed'],
		datasets: [
			{
				label: 'Deliveries',
				data: [
					data.charts.status.scheduled,
					data.charts.status.dispatched,
					data.charts.status.delivered,
					data.charts.status.skipped,
					data.charts.status.failed
				],
				backgroundColor: [colorAt(8), colorAt(0), colorAt(3), colorAt(2), colorAt(4)],
				borderRadius: 6
			}
		]
	});
	const funnelOptions = { indexAxis: 'y' as const, plugins: { legend: { display: false } } };
</script>

<svelte:head>
	<title>Deliveries Report</title>
</svelte:head>

<h1 class="dash-heading mb-6 text-2xl font-semibold">Deliveries Report</h1>

<DateRangeFilter preset={data.preset} from={data.from} to={data.to} />

<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
	<StatCard title="Total" value={data.stats.total} description="Scheduled in range">
		{#snippet icon()}<ListOrdered class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Delivered" value={data.stats.delivered} description="Completed">
		{#snippet icon()}<CircleCheckBig class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Dispatched" value={data.stats.dispatched} description="On the way">
		{#snippet icon()}<Truck class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Scheduled" value={data.stats.scheduled} description="Awaiting dispatch">
		{#snippet icon()}<Loader class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Skipped / Failed" value={data.stats.skipped + data.stats.failed} description="Needs attention">
		{#snippet icon()}<OctagonMinus class="size-6" />{/snippet}
	</StatCard>
</div>

<div class="mb-10 grid gap-6 lg:grid-cols-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Delivery volume over time</Card.Title>
			<Card.Description>Scheduled deliveries across the selected range</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="line" data={trendData} height="280px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Fulfilment funnel</Card.Title>
			<Card.Description>Where deliveries end up</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={funnelData} options={funnelOptions} height="280px" />
		</Card.Content>
	</Card.Root>
</div>

<FilterMenu
	data={data.rows}
	filterKeys={['status', 'planName']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Deliveries Report" />
