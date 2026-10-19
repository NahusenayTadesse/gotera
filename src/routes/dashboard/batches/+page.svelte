<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { shortDate } from '$lib/format';
	import { Plus, Wand2, ShieldAlert, Ban, Undo2, AlertTriangle, CheckCircle2 } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { createColumns } from './columns';
	import BatchForm from './BatchForm.svelte';
	import BatchStatusDialog, { type BatchStatusChange } from './BatchStatusDialog.svelte';

	let { data }: { data: PageData } = $props();

	const adding = $derived(page.url.searchParams.has('add'));
	const hasFilters = $derived(Object.values(data.filters).some(Boolean));

	let change = $state<BatchStatusChange | null>(null);
	let selected = $state<typeof data.rows>([]);
	const openDialog = (status: BatchStatusChange['status'], list: BatchStatusChange['batches']) =>
		(change = { status, batches: list.map(({ id, code, allocated }) => ({ id, code, allocated })) });
	const columns = createColumns(openDialog);
	const bulk = (status: BatchStatusChange['status']) =>
		openDialog(status, selected.filter((b) => b.status !== status));

	let syncing = $state(false);

	const stats = $derived([
		{ label: 'Active batches', value: data.stats.active },
		{ label: 'Units available', value: data.stats.unitsAvailable },
		{ label: 'Expiring ≤ 3 days', value: data.stats.expiringSoon, warn: data.stats.expiringSoon > 0 },
		{ label: 'On hold / recalled', value: data.stats.onHold, warn: data.stats.onHold > 0 }
	]);

	const selectClass =
		'border-input h-9 rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30';
	const closeHref = $derived.by(() => {
		const p = new URLSearchParams(page.url.searchParams);
		p.delete('add');
		p.delete('source');
		p.delete('receipt');
		const qs = p.toString();
		return qs ? `?${qs}` : page.url.pathname;
	});
</script>

<svelte:head>
	<title>Batches & Traceability</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<div>
		<h1 class="dash-heading text-2xl font-semibold">Batches & Traceability</h1>
		<p class="text-sm text-muted-foreground">
			Every injera and add-on delivery is allocated to a batch, and every batch to its source.
		</p>
	</div>
	<Button href="?add=1"><Plus class="h-4 w-4" /> New batch</Button>
</div>

{#if adding}
	<BatchForm data={data.form} options={data.options} {closeHref} />
{/if}

<div class="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
	{#each stats as stat (stat.label)}
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>{stat.label}</Card.Description>
				<Card.Title class="text-2xl tabular-nums {stat.warn ? 'text-amber-600' : ''}">{stat.value}</Card.Title>
			</Card.Header>
		</Card.Root>
	{/each}
</div>

<Card.Root class="mb-6">
	<Card.Header class="flex flex-row flex-wrap items-start justify-between gap-3">
		<div>
			<Card.Title class="flex items-center gap-2">
				{#if data.unassigned.length}
					<AlertTriangle class="h-5 w-5 text-amber-600" /> Deliveries waiting for a batch
				{:else}
					<CheckCircle2 class="h-5 w-5 text-green-600" /> Every delivery has a batch
				{/if}
			</Card.Title>
			<Card.Description>
				{data.stats.linesInWindow} delivery lines between {shortDate(data.window.from)} and
				{shortDate(data.window.to)}. Auto-assign uses first-expiring-first-out from active batches.
			</Card.Description>
		</div>
		<form
			method="POST"
			action="?/sync"
			use:enhance={() => {
				syncing = true;
				return async ({ result, update }) => {
					syncing = false;
					if (result.type === 'success') {
						const s = result.data?.sync as
							| { linesAssigned: number; unitsAssigned: number; released: number; short: unknown[] }
							| undefined;
						if (s) {
							const parts = [`${s.unitsAssigned} units assigned across ${s.linesAssigned} lines`];
							if (s.released) parts.push(`${s.released} released`);
							if (s.short.length) toast.warning(`${parts.join(', ')}. ${s.short.length} lines still short — add a batch.`);
							else toast.success(parts.join(', '));
						}
					} else toast.error('Auto-assign failed');
					await update();
				};
			}}
		>
			<Button type="submit" disabled={syncing}>
				{#if syncing}<LoadingBtn name="Assigning" />{:else}<Wand2 class="h-4 w-4" /> Auto-assign batches{/if}
			</Button>
		</form>
	</Card.Header>
	{#if data.unassigned.length}
		<Card.Content class="overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="text-muted-foreground">
					<tr class="border-b border-border">
						<th class="py-2 pr-4 font-medium">Product</th>
						<th class="py-2 pr-4 font-medium">Lines</th>
						<th class="py-2 pr-4 font-medium">Units needed</th>
						<th class="py-2 pr-4 font-medium">Earliest</th>
						<th class="py-2 font-medium"></th>
					</tr>
				</thead>
				<tbody>
					{#each data.unassigned as u (u.key)}
						<tr class="border-b border-border last:border-0">
							<td class="py-2 pr-4 font-medium">{u.name}</td>
							<td class="py-2 pr-4 tabular-nums">{u.lines}</td>
							<td class="py-2 pr-4 tabular-nums">{u.units}</td>
							<td class="py-2 pr-4">{shortDate(u.earliest)}</td>
							<td class="py-2 text-right">
								<Button size="sm" variant="outline" href="/dashboard/deliveries">
									See deliveries
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Card.Content>
	{/if}
</Card.Root>

<form
	method="GET"
	class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"
>
	<div class="flex min-w-48 flex-1 flex-col gap-1.5">
		<Label for="q">Batch / lot number</Label>
		<Input id="q" name="q" value={data.filters.q} placeholder="INJ-2610…, supplier lot" />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="product">Product</Label>
		<select id="product" name="product" class={selectClass}>
			<option value="" selected={!data.filters.product}>All</option>
			{#each data.options.products as p (p.value)}
				<option value={p.value} selected={data.filters.product === p.value}>{p.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="source">Source</Label>
		<select id="source" name="source" class={selectClass}>
			<option value="" selected={!data.filters.source}>All</option>
			<option value="in_house" selected={data.filters.source === 'in_house'}>In house</option>
			{#each data.options.sources as s (s.id)}
				<option value={s.id} selected={data.filters.source === s.id}>{s.businessName}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="status">Status</Label>
		<select id="status" name="status" class={selectClass}>
			<option value="" selected={!data.filters.status}>All</option>
			{#each ['active', 'quarantined', 'recalled', 'depleted'] as s (s)}
				<option value={s} selected={data.filters.status === s} class="capitalize">{s}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="from">Produced from</Label>
		<Input id="from" type="date" name="from" value={data.filters.from} class="w-40" />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="to">Produced to</Label>
		<Input id="to" type="date" name="to" value={data.filters.to} class="w-40" />
	</div>
	<Button type="submit">Apply</Button>
	{#if hasFilters}<Button href={page.url.pathname} variant="ghost">Reset</Button>{/if}
</form>

{#if selected.length > 0}
	<div
		class="sticky top-24 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur"
		role="toolbar"
		aria-label="Bulk actions"
	>
		<span class="mr-2 text-sm font-medium">{selected.length} selected</span>
		{#if selected.some((b) => b.status === 'active' || b.status === 'depleted')}
			<Button size="sm" variant="outline" onclick={() => bulk('quarantined')}>
				<ShieldAlert class="h-4 w-4" /> Hold
			</Button>
		{/if}
		{#if selected.some((b) => b.status === 'quarantined' || b.status === 'recalled')}
			<Button size="sm" variant="outline" onclick={() => bulk('active')}><Undo2 class="h-4 w-4" /> Release</Button>
		{/if}
		{#if selected.some((b) => b.status !== 'recalled')}
			<Button size="sm" variant="outline" class="text-red-600" onclick={() => bulk('recalled')}>
				<Ban class="h-4 w-4" /> Recall
			</Button>
		{/if}
	</div>
{/if}

{#if data.rows.length > 0}
	{#key data.rows}
		<DataTable data={data.rows} {columns} fileName="Batches" bind:selected />
	{/key}
{:else}
	<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
		{hasFilters ? 'No batches match these filters.' : 'No batches yet — create the first one.'}
	</p>
{/if}

<BatchStatusDialog bind:change onDone={() => (selected = [])} />
