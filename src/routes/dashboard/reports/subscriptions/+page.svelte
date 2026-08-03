<script lang="ts">
	import type { PageData } from './$types';
	import DateRangeFilter from '$lib/components/dashboard/DateRangeFilter.svelte';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import ChartCanvas from '$lib/components/dashboard/ChartCanvas.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { colorAt, colorList } from '$lib/components/dashboard/chartPalette';
	import { columns } from './columns';
	import { RefreshCw, CircleCheckBig, Loader, OctagonMinus, PauseCircle } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let filteredRows = $state(data.rows);

	const trendData = $derived({
		labels: data.charts.trend.labels,
		datasets: [
			{
				label: 'New subscriptions',
				data: data.charts.trend.counts,
				borderColor: colorAt(0).slice(0, 7),
				backgroundColor: colorAt(0, '33'),
				fill: true,
				tension: 0.35
			}
		]
	});

	const statusData = $derived({
		labels: ['Active', 'Pending', 'Paused', 'Cancelled'],
		datasets: [
			{
				data: [data.charts.status.active, data.charts.status.pending, data.charts.status.paused, data.charts.status.cancelled],
				backgroundColor: colorList(4)
			}
		]
	});

	const planMixData = $derived({
		labels: data.charts.planMix.labels,
		datasets: [{ label: 'Subscriptions', data: data.charts.planMix.counts, backgroundColor: colorList(data.charts.planMix.labels.length), borderRadius: 6 }]
	});
	const planMixOptions = { plugins: { legend: { display: false } } };

	const mrrByPlanData = $derived({
		labels: data.charts.mrrByPlan.labels,
		datasets: [
			{
				label: 'MRR (£)',
				data: data.charts.mrrByPlan.values.map((p) => p / 100),
				backgroundColor: colorList(data.charts.mrrByPlan.labels.length)
			}
		]
	});
	const mrrByPlanOptions = {
		indexAxis: 'y' as const,
		plugins: {
			legend: { display: false },
			tooltip: { callbacks: { label: (ctx: any) => ` £${ctx.parsed.x.toFixed(2)}` } }
		}
	};
</script>

<svelte:head>
	<title>Subscriptions Report</title>
</svelte:head>

<h1 class="dash-heading mb-6 text-2xl font-semibold">Subscriptions Report</h1>

<DateRangeFilter preset={data.preset} from={data.from} to={data.to} />

<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
	<StatCard title="New" value={data.stats.total} description="Started in range" measure={`(${data.stats.quantity} packs)`}>
		{#snippet icon()}<RefreshCw class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Active" value={data.stats.active} description="Currently billing">
		{#snippet icon()}<CircleCheckBig class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Pending" value={data.stats.pending} description="Awaiting first payment">
		{#snippet icon()}<Loader class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Paused" value={data.stats.paused} description="Temporarily paused">
		{#snippet icon()}<PauseCircle class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Cancelled" value={data.stats.cancelled} description="Ended in range">
		{#snippet icon()}<OctagonMinus class="size-6" />{/snippet}
	</StatCard>
</div>

<div class="mb-10 grid gap-6 lg:grid-cols-3">
	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>New subscriptions over time</Card.Title>
			<Card.Description>Rise and falls in signups across the selected range</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="line" data={trendData} height="280px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Status breakdown</Card.Title>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="doughnut" data={statusData} height="240px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Plan mix</Card.Title>
			<Card.Description>Subscriptions started, by plan</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={planMixData} options={planMixOptions} height="240px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>MRR by plan</Card.Title>
			<Card.Description>From active subscriptions started in range</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={mrrByPlanData} options={mrrByPlanOptions} height="240px" />
		</Card.Content>
	</Card.Root>
</div>

<FilterMenu
	data={data.rows}
	filterKeys={['status', 'planName']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Subscriptions Report" />
