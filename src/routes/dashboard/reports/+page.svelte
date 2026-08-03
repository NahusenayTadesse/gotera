<script lang="ts">
	import type { PageData } from './$types';
	import DateRangeFilter from '$lib/components/dashboard/DateRangeFilter.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import ChartCanvas from '$lib/components/dashboard/ChartCanvas.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { formatGBP } from '$lib/components/dashboard/format';
	import { colorAt, colorList } from '$lib/components/dashboard/chartPalette';
	import { Users, RefreshCw, Truck, Gift, UserX, ArrowRight, Wallet } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	const query = $derived(`?preset=${data.preset}&from=${data.from}&to=${data.to}`);

	const sections = $derived([
		{
			title: 'Subscriptions',
			description: 'New subscriptions, status breakdown and growth.',
			href: `/dashboard/reports/subscriptions${query}`,
			icon: RefreshCw
		},
		{
			title: 'Deliveries',
			description: 'Delivery volume and fulfilment status.',
			href: `/dashboard/reports/deliveries${query}`,
			icon: Truck
		},
		{
			title: 'Orders',
			description: 'One-time, gift and guest order activity.',
			href: `/dashboard/reports/orders${query}`,
			icon: Gift
		}
	]);

	// ── Growth: new subscriptions + the MRR they added, same timeline ──
	const growthData = $derived({
		labels: data.charts.growth.labels,
		datasets: [
			{
				type: 'bar' as const,
				label: 'New Subscriptions',
				data: data.charts.growth.newSubscriptions,
				backgroundColor: colorAt(0),
				borderRadius: 6,
				yAxisID: 'y'
			},
			{
				type: 'line' as const,
				label: 'MRR Added (£)',
				data: data.charts.growth.mrrAdded.map((p) => p / 100),
				borderColor: colorAt(1).slice(0, 7),
				backgroundColor: 'transparent',
				tension: 0.35,
				yAxisID: 'y1'
			}
		]
	});
	const growthOptions = {
		interaction: { mode: 'index' as const, intersect: false },
		scales: {
			x: { ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } }, grid: { display: false } },
			y: {
				position: 'left' as const,
				beginAtZero: true,
				ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } },
				grid: { color: 'hsl(var(--border))' },
				title: { display: true, text: 'New Subscriptions', color: 'hsl(var(--muted-foreground))' }
			},
			y1: {
				position: 'right' as const,
				beginAtZero: true,
				ticks: {
					color: 'hsl(var(--muted-foreground))',
					font: { size: 11 },
					callback: (v: number) => `£${v}`
				},
				grid: { display: false },
				title: { display: true, text: 'MRR Added', color: 'hsl(var(--muted-foreground))' }
			}
		}
	};

	// ── MRR by plan ──
	const mrrByPlanData = $derived({
		labels: data.charts.mrrByPlan.labels,
		datasets: [
			{
				data: data.charts.mrrByPlan.values.map((p) => p / 100),
				backgroundColor: colorList(data.charts.mrrByPlan.labels.length),
				borderWidth: 2,
				borderColor: colorList(data.charts.mrrByPlan.labels.length, '')
			}
		]
	});
	const mrrByPlanOptions = {
		plugins: {
			legend: { position: 'bottom' as const, labels: { color: 'hsl(var(--foreground))' } },
			tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.label}: £${ctx.parsed.toFixed(2)}` } }
		}
	};

	// ── Customer acquisition: marketing opt-in vs not ──
	const acquisitionData = $derived({
		labels: data.charts.acquisition.labels,
		datasets: [
			{ label: 'Opted in', data: data.charts.acquisition.optedIn, backgroundColor: colorAt(3), borderRadius: 4 },
			{ label: 'Opted out', data: data.charts.acquisition.optedOut, backgroundColor: colorAt(4), borderRadius: 4 }
		]
	});
	const acquisitionOptions = {
		scales: {
			x: {
				stacked: true,
				ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } },
				grid: { display: false }
			},
			y: {
				stacked: true,
				beginAtZero: true,
				ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } },
				grid: { color: 'hsl(var(--border))' }
			}
		}
	};

	// ── Referral funnel ──
	const referralData = $derived({
		labels: ['Pending', 'Subscribed', 'Credited'],
		datasets: [
			{
				label: 'Referrals',
				data: [data.charts.referrals.pending, data.charts.referrals.subscribed, data.charts.referrals.credited],
				backgroundColor: colorList(3),
				borderRadius: 6
			}
		]
	});
	const referralOptions = { indexAxis: 'y' as const, plugins: { legend: { display: false } } };

	// ── Order channel mix ──
	const channelData = $derived({
		labels: ['One-Time & Gift', 'Guest'],
		datasets: [{ data: [data.charts.orderChannels.gift, data.charts.orderChannels.guest], backgroundColor: colorList(2) }]
	});

	// ── Delivery health ──
	const deliveryHealthData = $derived({
		labels: ['Healthy', 'Needs attention'],
		datasets: [
			{ data: [data.charts.deliveryHealth.healthy, data.charts.deliveryHealth.issues], backgroundColor: [colorAt(3), colorAt(4)] }
		]
	});
</script>

<svelte:head>
	<title>Reports</title>
</svelte:head>

<h1 class="dash-heading mb-6 text-2xl font-semibold">Reports</h1>

<DateRangeFilter preset={data.preset} from={data.from} to={data.to} />

<div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
	<StatCard title="Current MRR" value={formatGBP(data.stats.currentMRR)} description="Active subscriptions, now">
		{#snippet icon()}<Wallet class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="New Customers" value={data.stats.newCustomers} description="In range">
		{#snippet icon()}<Users class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="New Subscriptions" value={data.stats.newSubscriptions} description="In range">
		{#snippet icon()}<RefreshCw class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Deliveries Completed" value={data.stats.deliveriesCompleted} description="In range">
		{#snippet icon()}<Truck class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="One-Time Orders Paid" value={data.stats.oneTimeOrdersPaid} description="In range">
		{#snippet icon()}<Gift class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Guest Orders Paid" value={data.stats.guestOrdersPaid} description="In range">
		{#snippet icon()}<UserX class="size-6" />{/snippet}
	</StatCard>
</div>

<h2 class="mb-4 text-lg font-medium">Business flow</h2>
<div class="mb-10 grid gap-6 lg:grid-cols-3">
	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>Growth — new subscriptions & MRR added</Card.Title>
			<Card.Description>Where new business is coming from, over time</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={growthData} options={growthOptions} height="320px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>MRR by plan</Card.Title>
			<Card.Description>Where recurring revenue comes from, right now</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="doughnut" data={mrrByPlanData} options={mrrByPlanOptions} height="320px" />
		</Card.Content>
	</Card.Root>

	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>Customer acquisition</Card.Title>
			<Card.Description>New customers, split by marketing opt-in — for the marketing team</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={acquisitionData} options={acquisitionOptions} height="280px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Referral funnel</Card.Title>
			<Card.Description>Pending → subscribed → credited</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={referralData} options={referralOptions} height="280px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Order channel mix</Card.Title>
			<Card.Description>One-time/gift vs guest checkout</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="pie" data={channelData} height="260px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Delivery health</Card.Title>
			<Card.Description>Skipped / failed vs everything else</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="doughnut" data={deliveryHealthData} height="260px" />
		</Card.Content>
	</Card.Root>
</div>

<h2 class="mb-4 text-lg font-medium">Drill down</h2>
<div class="grid gap-6 md:grid-cols-3">
	{#each sections as section (section.href)}
		<Card.Root class="flex flex-col justify-between">
			<Card.Header>
				<section.icon class="mb-2 size-6 text-primary" />
				<Card.Title>{section.title}</Card.Title>
				<Card.Description>{section.description}</Card.Description>
			</Card.Header>
			<Card.Content>
				<Button href={section.href} variant="outline" class="w-full"
					>View {section.title} Report <ArrowRight class="size-4" /></Button
				>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
