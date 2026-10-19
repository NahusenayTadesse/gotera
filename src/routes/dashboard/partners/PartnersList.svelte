<script lang="ts">
	import DataTable from '$lib/components/Table/data-table.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { formatGBP } from '$lib/components/dashboard/format';
	import { createColumns } from './columns';
	import StatusDialog, { type StatusChange } from './StatusDialog.svelte';
	import { Check, X, MessageCircle } from '@lucide/svelte';
	import {
		CATEGORY_LABELS,
		PARTNER_CATEGORY_KEYS,
		SUPPLIER_CATEGORY_KEYS,
		STATUS_PAGES
	} from './labels';
	import type { loadPartners } from './partners.server';

	let { data }: { data: Awaited<ReturnType<typeof loadPartners>> } = $props();

	const current = $derived(STATUS_PAGES.find((p) => p.status === data.status) ?? STATUS_PAGES[0]);
	const total = $derived(Object.values(data.statusCounts).reduce((a, b) => a + b, 0));
	const countFor = (status: string | null) =>
		status ? data.statusCounts[status as keyof typeof data.statusCounts] : total;

	const categoryKeys = $derived(
		data.filters.type === 'partner'
			? PARTNER_CATEGORY_KEYS
			: data.filters.type === 'supplier'
				? SUPPLIER_CATEGORY_KEYS
				: [...new Set([...PARTNER_CATEGORY_KEYS, ...SUPPLIER_CATEGORY_KEYS])]
	);

	const hasFilters = $derived(Object.values(data.filters).some(Boolean));

	const stats = $derived([
		{ label: 'Showing', value: String(data.rows.length) },
		{ label: 'Partners', value: String(data.rows.filter((r) => r.type === 'partner').length) },
		{ label: 'Suppliers', value: String(data.rows.filter((r) => r.type === 'supplier').length) },
		{ label: 'Deliveries', value: String(data.rows.reduce((n, r) => n + r.deliveryCount, 0)) },
		{ label: 'Delivered value', value: formatGBP(data.rows.reduce((n, r) => n + r.totalValuePence, 0)) }
	]);

	let change = $state<StatusChange | null>(null);
	let selected = $state<typeof data.rows>([]);

	const openDialog = (status: StatusChange['status'], partners: StatusChange['partners']) =>
		(change = { status, partners: partners.map(({ id, businessName, status }) => ({ id, businessName, status })) });
	const columns = createColumns(openDialog);

	// Only offer bulk actions that would change at least one selected row.
	const canApprove = $derived(selected.some((r) => r.status !== 'approved'));
	const canContact = $derived(selected.some((r) => r.status === 'new'));
	const canDecline = $derived(selected.some((r) => r.status !== 'declined'));
	const bulk = (status: StatusChange['status']) =>
		openDialog(
			status,
			selected.filter((r) => r.status !== status)
		);

	const selectClass =
		'border-input h-9 rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30';
</script>

<svelte:head>
	<title>{current.heading}</title>
</svelte:head>

<h1 class="dash-heading mb-4 text-2xl font-semibold">{current.heading}</h1>

<nav class="mb-6 flex flex-wrap gap-2" aria-label="Partner status">
	{#each STATUS_PAGES as tab (tab.href)}
		<Button
			href={tab.href}
			size="sm"
			variant={tab.status === data.status ? 'default' : 'outline'}
			aria-current={tab.status === data.status ? 'page' : undefined}
		>
			{tab.title}
			<span class="rounded-full bg-background/20 px-1.5 text-xs tabular-nums">{countFor(tab.status)}</span>
		</Button>
	{/each}
</nav>

<!-- GET form: filters live in the URL and are applied in SQL on the server. -->
<form
	method="GET"
	class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"
>
	<div class="flex min-w-48 flex-1 flex-col gap-1.5">
		<Label for="q">Search</Label>
		<Input id="q" name="q" value={data.filters.q} placeholder="Business, contact, email, city…" />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="type">Type</Label>
		<select
			id="type"
			name="type"
			class={selectClass}
			onchange={(e) => e.currentTarget.form?.requestSubmit()}
		>
			<option value="" selected={!data.filters.type}>All</option>
			<option value="partner" selected={data.filters.type === 'partner'}>Partners</option>
			<option value="supplier" selected={data.filters.type === 'supplier'}>Suppliers</option>
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="category">Category</Label>
		<select id="category" name="category" class={selectClass}>
			<option value="" selected={!data.filters.category}>All</option>
			{#each categoryKeys as key (key)}
				<option value={key} selected={data.filters.category === key}>{CATEGORY_LABELS[key]}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="from">Applied from</Label>
		<Input id="from" type="date" name="from" value={data.filters.from} class="w-40" />
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="to">Applied to</Label>
		<Input id="to" type="date" name="to" value={data.filters.to} class="w-40" />
	</div>
	<Button type="submit">Apply</Button>
	{#if hasFilters}
		<Button href={current.href} variant="ghost">Reset</Button>
	{/if}
</form>

<div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
	{#each stats as stat (stat.label)}
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>{stat.label}</Card.Description>
				<Card.Title class="text-2xl tabular-nums">{stat.value}</Card.Title>
			</Card.Header>
		</Card.Root>
	{/each}
</div>

{#if selected.length > 0}
	<div
		class="sticky top-24 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur"
		role="toolbar"
		aria-label="Bulk actions"
	>
		<span class="mr-2 text-sm font-medium">{selected.length} selected</span>
		{#if canApprove}
			<Button size="sm" onclick={() => bulk('approved')}><Check class="h-4 w-4" /> Approve</Button>
		{/if}
		{#if canContact}
			<Button size="sm" variant="outline" onclick={() => bulk('contacted')}>
				<MessageCircle class="h-4 w-4" /> Mark contacted
			</Button>
		{/if}
		{#if canDecline}
			<Button size="sm" variant="outline" class="text-red-600" onclick={() => bulk('declined')}>
				<X class="h-4 w-4" /> Decline
			</Button>
		{/if}
	</div>
{/if}

{#if data.rows.length > 0}
	<!-- Re-keyed on new data: DataTable tracks selection by row index, which would point
	     at the wrong rows once approved ones drop off a status page. -->
	{#key data.rows}
		<DataTable data={data.rows} {columns} fileName={current.heading} bind:selected />
	{/key}
{:else}
	<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
		{hasFilters ? 'Nothing matches these filters.' : 'Nothing here yet.'}
	</p>
{/if}

<StatusDialog bind:change onDone={() => (selected = [])} />
