<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { deliverySchema } from './schema';
	import type { MoveResult } from '$lib/delivery';
	import WeekendPlanner from '$lib/components/dashboard/WeekendPlanner.svelte';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import { columns } from './columns';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import SelectComp from '$lib/formComponents/SelectComp.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import BulkEmailDialog from '$lib/components/dashboard/BulkEmailDialog.svelte';
	import { X, Trash2, Boxes, ArrowRightLeft } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { enhance as formEnhance } from '$app/forms';

	let { data }: { data: PageData } = $props();

	// Populated when a skip reschedules deliveries — drives the notify dialog below.
	let notifyOpen = $state(false);
	let notifyRows = $state<{ id: string; email: string; name?: string }[]>([]);
	let notifyPrefill = $state<{ subject: string; message: string } | null>(null);

	let filteredRows = $state(data.rows);
	let selectedRows = $state<typeof data.rows>([]);
	// Keep the table current after a skip/move reloads the data — otherwise moved rows
	// would keep showing their old date until a full page refresh.
	$effect(() => {
		filteredRows = data.rows;
	});

	/** Set from a weekend day card's "Show" — narrows the table to that one day. */
	let dayFilter = $state<string | null>(null);
	const tableRows = $derived(dayFilter ? filteredRows.filter((r) => r.day === dayFilter) : filteredRows);
	const dayFilterLabel = $derived(
		dayFilter
			? (data.weekend.days.find((d) => d.date === dayFilter)?.label ??
					data.upcoming.find((u) => u.date === dayFilter)?.label ??
					dayFilter)
			: ''
	);

	/** Rows the "move selected" bar can actually move: still to go out. */
	const movableSelected = $derived(
		selectedRows.filter((r) => r.status === 'scheduled' || r.status === 'paid')
	);
	const moveTargets = $derived(data.upcoming.filter((u) => !u.skipped));
	let moveTo = $state('');
	let moving = $state(false);

	/** Open the notice email, prefilled, for whoever a skip/move just affected. */
	function offerNotice(r: MoveResult) {
		notifyRows = r.affected.map((a, i) => ({ id: String(i), email: a.email, name: a.name }));
		notifyPrefill = {
			subject: `Your delivery has moved to ${r.toLabel}`,
			message: r.fromLabel
				? `<p>Hi,</p><p>We've had to change our delivery plan for ${r.fromLabel}, so your delivery has moved to <strong>${r.toLabel}</strong>. Nothing else changes — same order, same address.</p><p>Sorry for any inconvenience, and thanks for your patience.</p>`
				: `<p>Hi,</p><p>Your next delivery has moved to <strong>${r.toLabel}</strong>. Nothing else changes — same order, same address.</p><p>Thanks for your patience.</p>`
		};
		notifyOpen = true;
	}

	const statuses = [
		{ value: 'scheduled', name: 'Scheduled' },
		{ value: 'dispatched', name: 'Dispatched' },
		{ value: 'delivered', name: 'Delivered' },
		{ value: 'skipped', name: 'Skipped' },
		{ value: 'failed', name: 'Failed' }
	];

	const editingId = $derived(page.url.searchParams.get('edit'));
	const managingAddonsId = $derived(page.url.searchParams.get('manageAddons'));
	const managingDelivery = $derived(data.rows.find((r) => r.id === managingAddonsId));

	let newAddonId = $state('');
	let newAddonQty = $state(1);
	$effect(() => {
		if (managingAddonsId) {
			newAddonId = data.addonCatalogue[0]?.id ?? '';
			newAddonQty = 1;
		}
	});

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(deliverySchema),
		onUpdated({ form: f }) {
			if (f.valid) goto(page.url.pathname, { replaceState: true, invalidateAll: false });
		}
	});

	$effect(() => {
		if ($message) $message.type === 'error' ? toast.error($message.text) : toast.success($message.text);
	});

	// Runs before the edit dialog mounts, not after — DatePicker2 only reads its
	// initial value once at mount, so a post-mount effect would leave it stuck
	// on the empty default.
	$effect.pre(() => {
		if (editingId) {
			const row = data.rows.find(
				(r): r is Extract<(typeof data.rows)[number], { type: 'subscription' }> =>
					r.id === editingId && r.type === 'subscription'
			);
			if (row) {
				$form.id = row.id;
				$form.status = row.status;
				$form.scheduledDate =
					typeof row.scheduledDate === 'string'
						? row.scheduledDate
						: new Date(row.scheduledDate).toISOString().slice(0, 10);
				$form.isActive = row.isActive;
			}
		}
	});
</script>

<svelte:head>
	<title>Deliveries</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Deliveries &amp; Orders</h1>
	<div class="flex items-center gap-3">
		<a
			href="/dashboard/deliveries/route"
			class="rounded-md border px-3 py-1.5 text-sm hover:border-[#a45926] hover:text-[#a45926]"
		>
			Plan delivery route
		</a>
		{#if movableSelected.length}
			<form
				method="POST"
				action="?/moveSelected"
				class="flex items-center gap-2"
				use:formEnhance={() => {
					moving = true;
					return async ({ result, update }) => {
						moving = false;
						if (result.type === 'success') {
							const r = result.data?.result as MoveResult | undefined;
							toast.success(r?.text ?? 'Moved');
							if (r?.affected.length) offerNotice(r);
							selectedRows = [];
						} else if (result.type === 'failure') {
							toast.error((result.data?.error as string) ?? 'Could not move');
						} else toast.error('Could not move');
						await update();
					};
				}}
			>
				{#each movableSelected as r (r.id)}<input type="hidden" name="refs" value="{r.traceType}:{r.id}" />{/each}
				<select
					name="to"
					required
					bind:value={moveTo}
					aria-label="Move selected to"
					class="rounded-md border border-border bg-background p-1.5 text-base md:text-sm"
				>
					<option value="" disabled>Move to…</option>
					{#each moveTargets as t (t.date)}
						<option value={t.date}>{t.label} · {t.remaining} left</option>
					{/each}
				</select>
				<Button type="submit" size="sm" variant="outline" disabled={!moveTo || moving}>
					<ArrowRightLeft class="h-4 w-4" />
					{moving ? 'Moving…' : `Move (${movableSelected.length})`}
				</Button>
			</form>
		{/if}
		{#if selectedRows.length}
			<form
				method="POST"
				action="?/assignBatches"
				use:formEnhance={() =>
					async ({ result, update }) => {
						if (result.type === 'success') {
							const s = result.data?.sync as { unitsAssigned: number; short: unknown[] } | undefined;
							if (s?.short.length)
								toast.warning(`${s.unitsAssigned} units assigned; ${s.short.length} lines still need a batch.`);
							else toast.success(`Batches assigned (${s?.unitsAssigned ?? 0} units)`);
						} else toast.error('Could not assign batches');
						await update();
					}}
			>
				{#each selectedRows as r (r.id)}<input type="hidden" name="refs" value="{r.traceType}:{r.id}" />{/each}
				<Button type="submit" size="sm" variant="outline">
					<Boxes class="h-4 w-4" /> Assign batches ({selectedRows.length})
				</Button>
			</form>
		{/if}
		<BulkEmailDialog
		bulkEmailForm={data.bulkEmailForm}
			rows={selectedRows.map((r) => ({ id: r.id, email: r.subscriberEmail, name: r.subscriberName }))}
		/>
	</div>
</div>

<!-- Opened programmatically after a skip or move, prefilled with a delivery-change notice. -->
<BulkEmailDialog
	bulkEmailForm={data.bulkEmailForm}
	rows={notifyRows}
	bind:open={notifyOpen}
	hideTrigger
	prefill={notifyPrefill}
/>

<WeekendPlanner
	weekend={data.weekend}
	upcoming={data.upcoming}
	skipDates={data.skipDates}
	bind:dayFilter
	onMoved={offerNotice}
/>

{#if managingAddonsId && managingDelivery}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>Add-ons — {managingDelivery.subscriberName || managingDelivery.subscriberEmail}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content class="flex flex-col gap-5">
			{#if managingDelivery.addons.length > 0}
				<ul class="flex flex-col gap-2">
					{#each managingDelivery.addons as addon (addon.name)}
						<li class="flex items-center justify-between gap-3 text-sm">
							<span>
								{addon.name}{addon.quantity > 1 ? ` x${addon.quantity}` : ''}
								{#if addon.recurring}<span class="text-muted-foreground">(recurring — edit on the subscription)</span>{/if}
							</span>
							{#if !addon.recurring}
								<form method="POST" action="?/removeDeliveryAddon" use:formEnhance>
									<input type="hidden" name="deliveryId" value={managingAddonsId} />
									<input type="hidden" name="name" value={addon.name} />
									<Button type="submit" variant="ghost" size="icon" aria-label="Remove add-on">
										<Trash2 class="h-4 w-4" />
									</Button>
								</form>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-sm text-muted-foreground">No add-ons on this delivery yet.</p>
			{/if}

			<form
				method="POST"
				action="?/addDeliveryAddon"
				use:formEnhance
				class="flex flex-wrap items-end gap-3 border-t pt-4"
			>
				<input type="hidden" name="deliveryId" value={managingAddonsId} />
				<div class="flex flex-col gap-2">
					<Label for="addDeliveryAddon-addonId">Add-on</Label>
					<SelectComp
						name="addonId"
						bind:value={newAddonId}
						items={data.addonCatalogue.map((a) => ({ value: a.id, name: a.name }))}
					/>
				</div>
				<div class="flex flex-col gap-2">
					<Label for="addDeliveryAddon-quantity">Qty</Label>
					<Input type="number" name="quantity" min="1" class="w-20" bind:value={newAddonQty} />
				</div>
				<Button type="submit" disabled={!newAddonId}>Add</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

{#if editingId}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>Edit Delivery</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/edit" use:enhance id="delivery-form" class="flex flex-col gap-4">
				<Errors allErrors={$allErrors} />
				<input type="hidden" name="id" bind:value={$form.id} />
				<InputComp label="Status" {form} {errors} type="select" name="status" items={statuses} required />
				<InputComp
					label="Scheduled date"
					{form}
					{errors}
					type="date"
					name="scheduledDate"
					oldDays={true}
					futureDays={false}
				/>
				<InputComp
					label="Status"
					{form}
					{errors}
					type="checkboxSingle"
					name="isActive"
					placeholder="Active"
				/>
				<Button type="submit" form="delivery-form">
					{#if $delayed}<LoadingBtn name="Saving" />{:else}Save changes{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

{#if dayFilter}
	<div class="mb-3 flex items-center gap-2 text-sm">
		<span>Showing <strong>{dayFilterLabel}</strong> only</span>
		<Button type="button" variant="ghost" size="sm" onclick={() => (dayFilter = null)}>
			<X class="h-4 w-4" /> Show all days
		</Button>
	</div>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['type', 'status', 'planName', 'trace']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={tableRows} {columns} fileName="Deliveries" bind:selected={selectedRows} />
