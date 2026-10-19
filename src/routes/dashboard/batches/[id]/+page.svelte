<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';
	import BulkEmailDialog from '$lib/components/dashboard/BulkEmailDialog.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { shortDate, longDate } from '$lib/format';
	import {
		ArrowLeft,
		Pencil,
		ShieldAlert,
		Ban,
		Undo2,
		Trash2,
		Mail,
		Factory,
		Truck,
		AlertTriangle
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import BatchForm from '../BatchForm.svelte';
	import UsageCell from '../UsageCell.svelte';
	import BatchStatusDialog, { type BatchStatusChange } from '../BatchStatusDialog.svelte';
	import { columns } from './columns';

	let { data }: { data: PageData } = $props();

	const b = $derived(data.batch);
	const editing = $derived(page.url.searchParams.has('edit'));
	const onHold = $derived(b.status === 'recalled' || b.status === 'quarantined');

	let change = $state<BatchStatusChange | null>(null);
	const act = (status: BatchStatusChange['status']) =>
		(change = { status, batches: [{ id: b.id, code: b.code, allocated: b.allocated }] });

	// Recall notice: one email per customer who received this batch.
	let emailOpen = $state(false);
	const recipients = $derived(
		data.trace
			.filter((t) => t.email)
			.map((t) => ({ id: t.allocationId, email: t.email, name: t.customer }))
	);
	const uniqueCustomers = $derived(new Set(recipients.map((r) => r.email)).size);
	const recallPrefill = $derived({
		subject: `Important: product recall — batch ${b.code}`,
		message: `<p>Hi,</p><p>We're contacting you because your recent GOTERA delivery included <strong>${b.productName}</strong> from batch <strong>${b.code}</strong>${b.bestBefore ? ` (best before ${longDate(b.bestBefore)})` : ''}.</p><p>As a precaution we are recalling this batch. Please do not eat it — you'll find the batch number on the pack label. Reply to this email and we'll replace it or refund you in full.</p><p>We're sorry for the trouble.</p>`
	});
</script>

<svelte:head>
	<title>{b.code} · Batches</title>
</svelte:head>

<div class="mb-6 flex flex-col gap-3">
	<a
		href="/dashboard/batches"
		class="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
	>
		<ArrowLeft class="h-4 w-4" /> All batches
	</a>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap items-center gap-3">
			<h1 class="dash-heading font-mono text-2xl font-semibold">{b.code}</h1>
			<Statuses status={b.status} />
		</div>
		<div class="flex flex-wrap gap-2">
			<Button size="sm" variant="outline" href="?edit=1"><Pencil class="h-4 w-4" /> Edit</Button>
			{#if onHold}
				<Button size="sm" variant="outline" onclick={() => act('active')}>
					<Undo2 class="h-4 w-4" /> Release
				</Button>
			{:else}
				<Button size="sm" variant="outline" onclick={() => act('quarantined')}>
					<ShieldAlert class="h-4 w-4" /> Hold
				</Button>
			{/if}
			{#if b.status !== 'recalled'}
				<Button size="sm" variant="destructive" onclick={() => act('recalled')}>
					<Ban class="h-4 w-4" /> Recall
				</Button>
			{/if}
			{#if b.allocated === 0}
				<form
					method="POST"
					action="?/deleteBatch"
					use:enhance={({ cancel }) => {
						if (!confirm(`Delete ${b.code}? It hasn't been allocated to anything.`)) return cancel();
						return async ({ result, update }) => {
							if (result.type === 'failure') toast.error(String(result.data?.error ?? 'Could not delete'));
							await update();
						};
					}}
				>
					<input type="hidden" name="id" value={b.id} />
					<Button size="sm" variant="ghost" class="text-red-600" type="submit">
						<Trash2 class="h-4 w-4" /> Delete
					</Button>
				</form>
			{/if}
		</div>
	</div>
</div>

{#if editing}
	<BatchForm data={data.form} options={data.options} closeHref={page.url.pathname} editing />
{/if}

{#if onHold && data.trace.length}
	<div
		class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
		role="alert"
	>
		<p class="flex items-center gap-2 text-sm">
			<AlertTriangle class="h-5 w-5 shrink-0" />
			This batch is {b.status}. It went to {uniqueCustomers}
			{uniqueCustomers === 1 ? 'customer' : 'customers'} across {data.trace.length} delivery lines.
		</p>
		<Button size="sm" variant="destructive" onclick={() => (emailOpen = true)}>
			<Mail class="h-4 w-4" /> Email affected customers
		</Button>
	</div>
{/if}

<div class="mb-8 grid gap-6 lg:grid-cols-3">
	<Card.Root>
		<Card.Header>
			<Card.Description>Product</Card.Description>
			<Card.Title>{b.productName}</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3 text-sm">
			<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
				<dt class="text-muted-foreground">{b.source === 'in_house' ? 'Produced' : 'Received'}</dt>
				<dd>{longDate(b.producedOn)}</dd>
				<dt class="text-muted-foreground">Best before</dt>
				<dd class={b.expired ? 'font-medium text-red-600' : ''}>
					{b.bestBefore ? longDate(b.bestBefore) : '—'}{b.expired ? ' (expired)' : ''}
				</dd>
			</dl>
			<UsageCell allocated={b.allocated} quantity={b.quantity} unit={b.unit} />
			{#if b.notes}<p class="rounded-md bg-muted/50 p-2 whitespace-pre-line">{b.notes}</p>{/if}
		</Card.Content>
	</Card.Root>

	<Card.Root class="lg:col-span-2">
		<Card.Header>
			<Card.Description>Source</Card.Description>
			<Card.Title class="flex items-center gap-2">
				{#if b.source === 'in_house'}
					<Factory class="h-5 w-5 text-primary" /> In house
				{:else}
					<Truck class="h-5 w-5 text-primary" />
					<a href="/dashboard/partners/{b.sourcePartnerId}" class="underline-offset-2 hover:underline">
						{b.sourceName}
					</a>
					<span class="text-sm font-normal text-muted-foreground capitalize">({b.sourceType})</span>
				{/if}
			</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3 text-sm">
			{#if b.source === 'external'}
				<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
					<dt class="text-muted-foreground">Supplier lot</dt>
					<dd class="font-mono">{b.supplierLotRef || '—'}</dd>
					<dt class="text-muted-foreground">Arrived on</dt>
					<dd>
						{#if data.sourceReceipt}
							{shortDate(data.sourceReceipt.deliveredOn)} · {data.sourceReceipt.items} ·
							{data.sourceReceipt.quantity}
							{data.sourceReceipt.unit}{data.sourceReceipt.reference ? ` · ${data.sourceReceipt.reference}` : ''}
						{:else}—{/if}
					</dd>
				</dl>
			{:else if data.inputs.length}
				<p class="text-muted-foreground">Made from these supplier receipts:</p>
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead class="text-muted-foreground">
							<tr class="border-b border-border">
								<th class="py-1.5 pr-4 font-medium">Ingredient</th>
								<th class="py-1.5 pr-4 font-medium">Supplier</th>
								<th class="py-1.5 pr-4 font-medium">Received</th>
								<th class="py-1.5 pr-4 font-medium">Qty</th>
								<th class="py-1.5 font-medium">Ref</th>
							</tr>
						</thead>
						<tbody>
							{#each data.inputs as i (i.id)}
								<tr class="border-b border-border last:border-0">
									<td class="py-1.5 pr-4">{i.items}</td>
									<td class="py-1.5 pr-4">
										<a href="/dashboard/partners/{i.partnerId}" class="underline-offset-2 hover:underline">
											{i.supplier}
										</a>
									</td>
									<td class="py-1.5 pr-4">{shortDate(i.deliveredOn)}</td>
									<td class="py-1.5 pr-4">{i.quantity} {i.unit}</td>
									<td class="py-1.5 font-mono">{i.reference || '—'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p class="text-muted-foreground">
					Made in house. No ingredient receipts linked — <a href="?edit=1" class="underline">add them</a> to trace
					back to suppliers.
				</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
	<h2 class="text-xl font-semibold">Where it went</h2>
	{#if data.trace.length && !onHold}
		<Button size="sm" variant="outline" onclick={() => (emailOpen = true)}>
			<Mail class="h-4 w-4" /> Email these customers
		</Button>
	{/if}
</div>

{#if data.trace.length}
	<DataTable data={data.trace} {columns} fileName="{b.code} trace" />
{:else}
	<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
		Nothing from this batch has been allocated to a delivery yet.
	</p>
{/if}

<BatchStatusDialog bind:change />
<BulkEmailDialog
	bulkEmailForm={data.bulkEmailForm}
	rows={recipients}
	bind:open={emailOpen}
	hideTrigger
	prefill={onHold ? recallPrefill : null}
/>
