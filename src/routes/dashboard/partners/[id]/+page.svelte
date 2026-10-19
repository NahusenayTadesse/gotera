<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { enhance as formEnhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { deliverySchema } from './schema';
	import { columns } from './columns';
	import { categoryLabel } from '../labels';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { formatGBP } from '$lib/components/dashboard/format';
	import { instantDate, shortDate, longDate, todayInTimeZone } from '$lib/format';
	import { ArrowLeft, Check, Mail, Phone, Plus, X, Ban, MessageCircle } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	const partner = $derived(data.partner);
	const isSupplier = $derived(partner.type === 'supplier');
	const isApproved = $derived(partner.status === 'approved');

	// Suppliers deliver to us; we deliver to partners. Same table, different wording.
	const verb = $derived(isSupplier ? 'Supplied' : 'Delivered');
	const logTitle = $derived(isSupplier ? 'Supply log' : 'Delivery log');

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const showForm = $derived(adding || !!editingId);

	const delivered = $derived(data.deliveries.filter((d) => d.status === 'delivered'));
	const totalValue = $derived(delivered.reduce((n, d) => n + (d.valuePence ?? 0), 0));
	const longDay = (d: string) =>
		new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short' }) + ' ' + longDate(d);
	const qty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

	const hasFilters = $derived(Object.values(data.filters).some(Boolean));
	const selectClass =
		'border-input h-9 w-full rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30';

	/** Current URL minus the add/edit flags — keeps the active filters when the form closes. */
	function listUrl(extra: Record<string, string> = {}) {
		const params = new URLSearchParams(page.url.searchParams);
		params.delete('add');
		params.delete('edit');
		for (const [k, v] of Object.entries(extra)) params.set(k, v);
		const qs = params.toString();
		return qs ? `${page.url.pathname}?${qs}` : page.url.pathname;
	}

	const statusItems = [
		{ value: 'delivered', name: 'Delivered' },
		{ value: 'scheduled', name: 'Scheduled' },
		{ value: 'cancelled', name: 'Cancelled' }
	];

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(deliverySchema),
		onUpdated({ form: f }) {
			if (f.valid) goto(listUrl(), { replaceState: true, invalidateAll: false });
		}
	});

	$effect(() => {
		if ($message) $message.type === 'error' ? toast.error($message.text) : toast.success($message.text);
	});

	$effect.pre(() => {
		if (editingId) {
			const row = data.deliveries.find((r) => r.id === editingId);
			if (row) {
				$form.id = row.id;
				$form.deliveredOn = row.deliveredOn;
				$form.location = row.location;
				$form.items = row.items;
				$form.quantity = row.quantity;
				$form.unit = row.unit;
				$form.value = row.valuePence == null ? undefined : row.valuePence / 100;
				$form.reference = row.reference ?? '';
				$form.status = row.status;
				$form.notes = row.notes ?? '';
			}
		} else if (adding) {
			$form.id = undefined;
			$form.deliveredOn = todayInTimeZone();
			$form.location = data.defaultLocation;
			$form.items = '';
			$form.quantity = 0;
			$form.unit = 'kg';
			$form.value = undefined;
			$form.reference = '';
			$form.status = 'delivered';
			$form.notes = '';
		}
	});

	const details = $derived([
		{ name: 'Type', value: isSupplier ? 'Supplier' : 'Partner' },
		{ name: 'Category', value: categoryLabel(partner.category) },
		{ name: 'Contact', value: partner.contactName },
		{ name: 'Email', value: partner.email },
		{ name: 'Phone', value: partner.phone || '—' },
		{ name: 'Website', value: partner.website || '—' },
		{ name: 'Location', value: [partner.city, partner.postcode].filter(Boolean).join(', ') || '—' },
		{ name: 'Applied', value: instantDate(partner.createdAt) }
	]);
</script>

<svelte:head>
	<title>{partner.businessName} · Partners</title>
</svelte:head>

<div class="mb-6 flex flex-col gap-3">
	<a
		href="/dashboard/partners"
		class="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" /> All partners & suppliers
	</a>
	<div class="flex flex-wrap items-center gap-3">
		<h1 class="dash-heading text-2xl font-semibold">{partner.businessName}</h1>
		<Statuses status={partner.status} />
	</div>
</div>

<div class="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
	<Card.Root>
		<Card.Header>
			<Card.Title>Application</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
				{#each details as row (row.name)}
					<dt class="text-muted-foreground">{row.name}</dt>
					<dd class="min-w-0 break-words">{row.value}</dd>
				{/each}
			</dl>
			<div>
				<p class="mb-1 text-sm text-muted-foreground">Message</p>
				<p class="rounded-md border border-border bg-muted/40 p-3 text-sm whitespace-pre-line">
					{partner.message}
				</p>
			</div>
			<div class="flex flex-wrap gap-2">
				<Button variant="outline" size="sm" href="mailto:{partner.email}">
					<Mail class="h-4 w-4" /> Email
				</Button>
				{#if partner.phone}
					<Button variant="outline" size="sm" href="tel:{partner.phone}">
						<Phone class="h-4 w-4" /> Call
					</Button>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>

	<div class="flex flex-col gap-6">
		<Card.Root>
			<Card.Header>
				<Card.Title>Status</Card.Title>
				<Card.Description>
					{#if isApproved}
						Approved — log every {isSupplier ? 'supply' : 'delivery'} below.
					{:else}
						Approve this {isSupplier ? 'supplier' : 'partner'} to start logging {isSupplier
							? 'supplies'
							: 'deliveries'}.
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form
					method="POST"
					action="?/setStatus"
					class="flex flex-wrap gap-2"
					use:formEnhance={() =>
						async ({ result, update }) => {
							await update();
							if (result.type === 'success') toast.success('Status updated');
							else toast.error('Could not update status');
						}}
				>
					{#if partner.status !== 'approved'}
						<Button type="submit" name="status" value="approved" size="sm">
							<Check class="h-4 w-4" /> Approve
						</Button>
					{/if}
					{#if partner.status === 'new'}
						<Button type="submit" name="status" value="contacted" size="sm" variant="outline">
							<MessageCircle class="h-4 w-4" /> Mark contacted
						</Button>
					{/if}
					{#if partner.status !== 'declined'}
						<Button
							type="submit"
							name="status"
							value="declined"
							size="sm"
							variant="outline"
							class="text-red-600"
						>
							<Ban class="h-4 w-4" />
							{isApproved ? 'End partnership' : 'Decline'}
						</Button>
					{/if}
				</form>
			</Card.Content>
		</Card.Root>

		{#if data.overall.total > 0}
			<div class="grid grid-cols-2 gap-3">
				<Card.Root class="gap-1 py-4">
					<Card.Header class="px-4">
						<Card.Description>Entries logged</Card.Description>
						<Card.Title class="text-2xl tabular-nums">{data.overall.total}</Card.Title>
					</Card.Header>
				</Card.Root>
				<Card.Root class="gap-1 py-4">
					<Card.Header class="px-4">
						<Card.Description>Last {verb.toLowerCase()}</Card.Description>
						<Card.Title class="text-base">
							{data.overall.lastDelivered ? shortDate(data.overall.lastDelivered.deliveredOn) : '—'}
						</Card.Title>
						{#if data.overall.lastDelivered}
							<p class="truncate text-xs text-muted-foreground">{data.overall.lastDelivered.location}</p>
						{/if}
					</Card.Header>
				</Card.Root>
				<Card.Root class="col-span-2 gap-1 py-4">
					<Card.Header class="px-4">
						<Card.Description>Next scheduled</Card.Description>
						<Card.Title class="text-base">
							{data.overall.nextScheduled
								? `${longDay(data.overall.nextScheduled.deliveredOn)} — ${data.overall.nextScheduled.items}`
								: 'Nothing scheduled'}
						</Card.Title>
						{#if data.overall.nextScheduled}
							<p class="truncate text-xs text-muted-foreground">{data.overall.nextScheduled.location}</p>
						{/if}
					</Card.Header>
				</Card.Root>
			</div>
		{/if}
	</div>
</div>

<div class="mb-4 flex flex-wrap items-center justify-between gap-4">
	<h2 class="text-xl font-semibold">{logTitle}</h2>
	{#if isApproved}
		<Button href={listUrl({ add: '1' })}><Plus class="h-4 w-4" /> Log {isSupplier ? 'supply' : 'delivery'}</Button>
	{/if}
</div>

{#if data.overall.total > 0}
	<!-- GET form: filters live in the URL and are applied in SQL on the server. -->
	<form
		method="GET"
		class="mb-6 grid gap-3 rounded-lg border border-border/60 bg-card/50 p-4 sm:grid-cols-2 lg:grid-cols-[repeat(6,minmax(0,1fr))_auto]"
	>
		<div class="flex flex-col gap-1.5">
			<Label for="f-from">From</Label>
			<Input id="f-from" type="date" name="from" value={data.filters.from} />
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="f-to">To</Label>
			<Input id="f-to" type="date" name="to" value={data.filters.to} />
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="f-status">Status</Label>
			<select id="f-status" name="status" class={selectClass}>
				<option value="" selected={!data.filters.status}>All</option>
				{#each statusItems as s (s.value)}
					<option value={s.value} selected={data.filters.status === s.value}>{s.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="f-item">Item</Label>
			<select id="f-item" name="item" class={selectClass}>
				<option value="" selected={!data.filters.item}>All items</option>
				{#each data.options.items as item (item)}
					<option value={item} selected={data.filters.item === item}>{item}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="f-location">Location</Label>
			<select id="f-location" name="location" class={selectClass}>
				<option value="" selected={!data.filters.location}>All locations</option>
				{#each data.options.locations as loc (loc)}
					<option value={loc} selected={data.filters.location === loc}>{loc}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col gap-1.5">
			<Label for="f-q">Search</Label>
			<Input id="f-q" name="q" value={data.filters.q} placeholder="Ref, notes…" />
		</div>
		<div class="flex items-end gap-2">
			<Button type="submit">Apply</Button>
			{#if hasFilters}<Button href={page.url.pathname} variant="ghost">Reset</Button>{/if}
		</div>
	</form>

	<div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>{hasFilters ? 'Matching entries' : 'All entries'}</Card.Description>
				<Card.Title class="text-2xl tabular-nums">{data.deliveries.length}</Card.Title>
			</Card.Header>
		</Card.Root>
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>{verb}</Card.Description>
				<Card.Title class="text-2xl tabular-nums">{delivered.length}×</Card.Title>
			</Card.Header>
		</Card.Root>
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>Value {verb.toLowerCase()}</Card.Description>
				<Card.Title class="text-2xl tabular-nums">{formatGBP(totalValue)}</Card.Title>
			</Card.Header>
		</Card.Root>
		<Card.Root class="gap-1 py-4">
			<Card.Header class="px-4">
				<Card.Description>Date span</Card.Description>
				<Card.Title class="text-base">
					{#if data.deliveries.length}
						{shortDate(data.deliveries[data.deliveries.length - 1].deliveredOn)} – {shortDate(
							data.deliveries[0].deliveredOn
						)}
					{:else}—{/if}
				</Card.Title>
			</Card.Header>
		</Card.Root>
	</div>
{/if}

{#if data.itemTotals.length > 0}
	<Card.Root class="mb-8">
		<Card.Header>
			<Card.Title>{isSupplier ? 'What they supplied' : 'What we delivered'}</Card.Title>
			<Card.Description>
				Delivered entries grouped by item{hasFilters ? ', within the current filters' : ''}.
			</Card.Description>
		</Card.Header>
		<Card.Content class="overflow-x-auto">
			<table class="w-full text-left text-sm">
				<thead class="text-muted-foreground">
					<tr class="border-b border-border">
						<th class="py-2 pr-4 font-medium">Item</th>
						<th class="py-2 pr-4 font-medium">Total</th>
						<th class="py-2 pr-4 font-medium">Times</th>
						<th class="py-2 pr-4 font-medium">Value</th>
						<th class="py-2 pr-4 font-medium">First</th>
						<th class="py-2 font-medium">Last</th>
					</tr>
				</thead>
				<tbody>
					{#each data.itemTotals as item (item.items + item.unit)}
						<tr class="border-b border-border last:border-0">
							<td class="py-2 pr-4">{item.items}</td>
							<td class="py-2 pr-4">{qty(item.quantity)} {item.unit}</td>
							<td class="py-2 pr-4">{item.count}</td>
							<td class="py-2 pr-4">{item.valuePence ? formatGBP(item.valuePence) : '—'}</td>
							<td class="py-2 pr-4">{shortDate(item.first)}</td>
							<td class="py-2">{shortDate(item.last)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Card.Content>
	</Card.Root>
{/if}

{#if showForm && (isApproved || editingId)}
	<Card.Root class="mb-8 w-full lg:w-2xl">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>
				{editingId ? 'Edit entry' : isSupplier ? 'Log a supply' : 'Log a delivery'}
			</Card.Title>
			<Button href={listUrl()} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action="?/saveDelivery"
				use:enhance
				id="delivery-form"
				class="grid gap-4 sm:grid-cols-2"
			>
				<div class="sm:col-span-2"><Errors allErrors={$allErrors} /></div>
				{#if editingId}<input type="hidden" name="id" bind:value={$form.id} />{/if}

				<div class="flex flex-col gap-2 p-1">
					<Label for="deliveredOn">Date</Label>
					<Input id="deliveredOn" name="deliveredOn" type="date" bind:value={$form.deliveredOn} required />
				</div>
				<InputComp label="Status" {form} {errors} type="select" name="status" items={statusItems} />

				<div class="sm:col-span-2">
					<InputComp
						label={isSupplier ? 'What was supplied' : 'What was delivered'}
						{form}
						{errors}
						type="text"
						name="items"
						placeholder={isSupplier ? 'Teff flour (ivory)' : 'Injera — large'}
						required
					/>
				</div>
				<InputComp label="Quantity" {form} {errors} type="number" name="quantity" min="0" required />
				<InputComp label="Unit" {form} {errors} type="text" name="unit" placeholder="kg, pcs, boxes" required />

				<div class="sm:col-span-2">
					<InputComp
						label={isSupplier ? 'Received at' : 'Delivered to'}
						{form}
						{errors}
						type="text"
						name="location"
						placeholder="Address or site"
						required
					/>
				</div>
				<InputComp label="Value (£)" {form} {errors} type="number" name="value" min="0" placeholder="Optional" />
				<InputComp
					label="Reference"
					{form}
					{errors}
					type="text"
					name="reference"
					placeholder="Invoice / PO no."
				/>
				<div class="sm:col-span-2">
					<InputComp label="Notes" {form} {errors} type="textarea" name="notes" rows={3} />
				</div>

				<Button type="submit" form="delivery-form" class="sm:col-span-2">
					{#if $delayed}
						<LoadingBtn name="Saving" />
					{:else}
						{editingId ? 'Save changes' : 'Save entry'}
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

{#if data.deliveries.length > 0}
	<DataTable data={data.deliveries} {columns} fileName="{partner.businessName} {logTitle}" />
{:else}
	<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
		{#if data.overall.total > 0}
			No entries match these filters. <a href={page.url.pathname} class="underline">Reset</a>
		{:else if isApproved}
			Nothing logged yet. Use “Log {isSupplier ? 'supply' : 'delivery'}” to record when, where and what
			was {isSupplier ? 'supplied' : 'delivered'}.
		{:else}
			Tracking starts once this {isSupplier ? 'supplier' : 'partner'} is approved.
		{/if}
	</p>
{/if}
