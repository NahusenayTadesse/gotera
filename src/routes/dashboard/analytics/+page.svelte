<script lang="ts">
	import type { PageData } from './$types';
	import DateRangeFilter from '$lib/components/dashboard/DateRangeFilter.svelte';
	import StatCard from '$lib/components/dashboard/stat-card.svelte';
	import ChartCanvas from '$lib/components/dashboard/ChartCanvas.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { colorAt, colorList } from '$lib/components/dashboard/chartPalette';
	import { Eye, Users, UserPlus, RefreshCw, ShoppingBag, Handshake, Percent, Activity } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	const number = (n: number) => n.toLocaleString('en-GB');
	const percent = (n: number) => `${(n * 100).toFixed(1)}%`;
	const pageLabel = (path: string) => (path === '/' ? 'Home' : path);
	const dayLabel = (d: Date) =>
		new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

	const trafficData = $derived({
		labels: data.charts.traffic.labels,
		datasets: [
			{
				type: 'bar' as const,
				label: 'Visitors',
				data: data.charts.traffic.visitors,
				backgroundColor: colorAt(0),
				borderRadius: 6
			},
			{
				type: 'line' as const,
				label: 'Page views',
				data: data.charts.traffic.views,
				borderColor: colorAt(1).slice(0, 7),
				backgroundColor: 'transparent',
				tension: 0.35
			}
		]
	});
	// ChartCanvas merges options shallowly, so `scales` has to restate both axes in full.
	const countOptions = {
		interaction: { mode: 'index' as const, intersect: false },
		scales: {
			x: { ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 } }, grid: { display: false } },
			y: {
				beginAtZero: true,
				ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 11 }, precision: 0 },
				grid: { color: 'hsl(var(--border))' }
			}
		}
	};

	const conversionData = $derived({
		labels: data.charts.conversions.labels,
		datasets: [
			{ label: 'Sign-ups', data: data.charts.conversions.signups, backgroundColor: colorAt(2), borderRadius: 4 },
			{
				label: 'Subscriptions',
				data: data.charts.conversions.subscriptions,
				backgroundColor: colorAt(3),
				borderRadius: 4
			},
			{ label: 'One-off orders', data: data.charts.conversions.orders, backgroundColor: colorAt(5), borderRadius: 4 }
		]
	});

	const deviceData = $derived({
		labels: data.charts.devices.labels.map((d) => d[0].toUpperCase() + d.slice(1)),
		datasets: [
			{
				data: data.charts.devices.values,
				backgroundColor: colorList(data.charts.devices.labels.length),
				borderWidth: 2,
				borderColor: colorList(data.charts.devices.labels.length, '')
			}
		]
	});
	const deviceOptions = { plugins: { legend: { position: 'bottom' as const } } };

	const funnelSteps = $derived([
		{ label: 'Visitors', value: data.funnel.visitors },
		{ label: 'Viewed the subscribe page', value: data.funnel.subscribePage },
		{ label: 'Signed up', value: data.funnel.signups },
		{ label: 'Subscribed', value: data.funnel.subscriptions }
	]);
	const maxPageViews = $derived(Math.max(1, ...data.topPages.map((p) => p.views)));
</script>

<svelte:head>
	<title>Analytics</title>
</svelte:head>

<h1 class="dash-heading mb-2 text-2xl font-semibold">Analytics</h1>
<p class="mb-6 text-sm text-muted-foreground">
	Who's visiting the site and what they do. Admin visits and bots aren't counted; a visitor is one
	person on one day.
</p>

<div class="mb-6 grid gap-4 sm:grid-cols-2">
	<StatCard title="Visitors today" value={number(data.stats.visitorsToday)} description="Unique people so far today">
		{#snippet icon()}<Activity class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Page views today" value={number(data.stats.viewsToday)} description="Every page opened today">
		{#snippet icon()}<Eye class="size-6" />{/snippet}
	</StatCard>
</div>

<DateRangeFilter preset={data.preset} from={data.from} to={data.to} />

<div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
	<StatCard title="Visitors" value={number(data.stats.visitors)} description="In range">
		{#snippet icon()}<Users class="size-6" />{/snippet}
	</StatCard>
	<StatCard
		title="Page views"
		value={number(data.stats.views)}
		description={`${data.stats.viewsPerVisitor.toFixed(1)} per visitor`}
	>
		{#snippet icon()}<Eye class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Sign-ups" value={number(data.stats.signups)} description="New accounts">
		{#snippet icon()}<UserPlus class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="New subscriptions" value={number(data.stats.subscriptions)} description="Plans started">
		{#snippet icon()}<RefreshCw class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="One-off orders" value={number(data.stats.orders)} description="Guest & gift orders paid">
		{#snippet icon()}<ShoppingBag class="size-6" />{/snippet}
	</StatCard>
	<StatCard title="Partner applications" value={number(data.stats.applications)} description="Partners & suppliers">
		{#snippet icon()}<Handshake class="size-6" />{/snippet}
	</StatCard>
	<StatCard
		title="Conversion rate"
		value={data.stats.conversionRate > 1 ? '—' : percent(data.stats.conversionRate)}
		description={data.stats.conversionRate > 1
			? 'Not enough visit data yet — tracking is new'
			: 'Visitors who subscribed or ordered'}
		className="sm:col-span-2"
	>
		{#snippet icon()}<Percent class="size-6" />{/snippet}
	</StatCard>
</div>

<div class="mb-10 grid gap-6 lg:grid-cols-3">
	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>Visitors per day</Card.Title>
			<Card.Description>Unique visitors (bars) and total page views (line)</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={trafficData} options={countOptions} height="320px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Devices</Card.Title>
			<Card.Description>What visitors browse on</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.charts.devices.values.length}
				<ChartCanvas type="doughnut" data={deviceData} options={deviceOptions} height="320px" />
			{:else}
				<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>Sign-ups, subscriptions & orders</Card.Title>
			<Card.Description>What visitors went on to do, over time</Card.Description>
		</Card.Header>
		<Card.Content>
			<ChartCanvas type="bar" data={conversionData} options={countOptions} height="280px" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Funnel</Card.Title>
			<Card.Description>From first visit to a live plan</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4">
			{#each funnelSteps as step (step.label)}
				<div>
					<div class="mb-1 flex justify-between text-sm">
						<span>{step.label}</span>
						<span class="font-semibold tabular-nums">{number(step.value)}</span>
					</div>
					<div class="h-2 rounded-full bg-muted">
						<div
							class="h-2 rounded-full bg-primary"
							style:width={`${data.funnel.visitors ? Math.min(100, (step.value / data.funnel.visitors) * 100) : 0}%`}
						></div>
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
</div>

<div class="mb-10 grid gap-6 lg:grid-cols-3">
	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Title>Most visited pages</Card.Title>
			<Card.Description>Top 15 pages by views in this range</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.topPages.length}
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b text-left text-muted-foreground">
							<th class="py-2 font-medium">Page</th>
							<th class="py-2 text-right font-medium">Visitors</th>
							<th class="py-2 text-right font-medium">Views</th>
						</tr>
					</thead>
					<tbody>
						{#each data.topPages as p (p.path)}
							<tr class="border-b last:border-0">
								<td class="py-2">
									<div class="truncate font-medium">{pageLabel(p.path)}</div>
									<div class="mt-1 h-1 rounded-full bg-muted">
										<div class="h-1 rounded-full bg-primary/60" style:width={`${(p.views / maxPageViews) * 100}%`}></div>
									</div>
								</td>
								<td class="py-2 text-right tabular-nums">{number(p.visitors)}</td>
								<td class="py-2 text-right tabular-nums">{number(p.views)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>
			{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>Where visitors come from</Card.Title>
			<Card.Description>Other sites that linked here</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.referrers.length}
				<ul class="divide-y text-sm">
					{#each data.referrers as r (r.referrer)}
						<li class="flex justify-between py-2">
							<span class="truncate">{r.referrer}</span>
							<span class="tabular-nums">{number(r.visitors)}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="py-10 text-center text-sm text-muted-foreground">
					No referrals yet — everyone typed the address or came from a bookmark.
				</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<Card.Root>
	<Card.Header>
		<Card.Title>Day by day</Card.Title>
		<Card.Description>Visitors and page views for each day in the range</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if data.daily.length}
			<div class="max-h-96 overflow-y-auto">
				<table class="w-full text-sm">
					<thead class="sticky top-0 bg-card">
						<tr class="border-b text-left text-muted-foreground">
							<th class="py-2 font-medium">Day</th>
							<th class="py-2 text-right font-medium">Visitors</th>
							<th class="py-2 text-right font-medium">Page views</th>
						</tr>
					</thead>
					<tbody>
						{#each data.daily as d (d.date)}
							<tr class="border-b last:border-0">
								<td class="py-2">{dayLabel(d.date)}</td>
								<td class="py-2 text-right tabular-nums">{number(d.visitors)}</td>
								<td class="py-2 text-right tabular-nums">{number(d.views)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>
		{/if}
	</Card.Content>
</Card.Root>
