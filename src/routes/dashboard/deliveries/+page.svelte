<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { deliverySchema } from './schema';
	import { skipDateSchema, type SkipDateFormMessage } from './skipDateSchema';
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
	import { X, Trash2 } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { enhance as formEnhance } from '$app/forms';

	let { data }: { data: PageData } = $props();

	// Populated when a skip reschedules deliveries — drives the notify dialog below.
	let notifyOpen = $state(false);
	let notifyRows = $state<{ id: string; email: string; name?: string }[]>([]);
	let notifyPrefill = $state<{ subject: string; message: string } | null>(null);

	let filteredRows = $state(data.rows);
	let selectedRows = $state<typeof data.rows>([]);

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

	const {
		form: skipForm,
		errors: skipErrors,
		enhance: skipEnhance,
		delayed: skipDelayed,
		allErrors: skipAllErrors
	} = superForm(data.skipDateForm, {
		id: 'skip-date',
		resetForm: true,
		invalidateAll: true,
		validators: zod4Client(skipDateSchema),
		onUpdated({ form: f }) {
			const msg = f.message as SkipDateFormMessage | undefined;
			if (!msg) return;

			toast[msg.type === 'error' ? 'error' : 'success'](msg.text);

			// A skip that bumped scheduled deliveries hands back who was affected —
			// open the bulk-email dialog prefilled so the admin can review before sending.
			if (msg.type === 'success' && msg.affected?.length) {
				notifyRows = msg.affected.map((r, i) => ({ id: String(i), email: r.email, name: r.name }));
				notifyPrefill = {
					subject: `Your delivery has moved to ${msg.newDateLabel}`,
					message: `<p>Hi,</p><p>We're not delivering on ${msg.skippedDateLabel}, so your next delivery has moved to <strong>${msg.newDateLabel}</strong>. Nothing else changes — same order, same address.</p><p>Sorry for the short notice, and thanks for your patience.</p>`
				};
				notifyOpen = true;
			}
		}
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
		<BulkEmailDialog
		bulkEmailForm={data.bulkEmailForm}
			rows={selectedRows.map((r) => ({ id: r.id, email: r.subscriberEmail, name: r.subscriberName }))}
		/>
	</div>
</div>

<!-- Opened programmatically from the skip-date action below, prefilled with a delivery-change notice. -->
<BulkEmailDialog
	bulkEmailForm={data.bulkEmailForm}
	rows={notifyRows}
	bind:open={notifyOpen}
	hideTrigger
	prefill={notifyPrefill}
/>

<Card.Root class="mb-8 w-full lg:w-lg">
	<Card.Header>
		<Card.Title>Saturday delivery calendar</Card.Title>
		<Card.Description>
			We deliver every Saturday by default. Skip a Saturday here and any deliveries already
			booked for it move automatically to the next one.
		</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-5">
		<form
			method="POST"
			action="?/addSkipDate"
			use:skipEnhance
			id="skip-date-form"
			class="flex flex-col gap-4"
		>
			<Errors allErrors={$skipAllErrors} />
			<InputComp
				label="Date to skip"
				form={skipForm}
				errors={skipErrors}
				type="date"
				name="date"
				oldDays={false}
				futureDays={false}
			/>
			<InputComp
				label="Reason (optional)"
				form={skipForm}
				errors={skipErrors}
				type="text"
				name="reason"
				placeholder="e.g. Bank holiday"
			/>
			<Button type="submit" form="skip-date-form" class="w-fit">
				{#if $skipDelayed}<LoadingBtn name="Saving" />{:else}Skip this date{/if}
			</Button>
		</form>

		{#if data.skipDates.length > 0}
			<ul class="flex flex-col gap-2 border-t pt-4">
				{#each data.skipDates as skip (skip.id)}
					<li class="flex items-center justify-between gap-3 text-sm">
						<span>
							{new Date(skip.date).toLocaleDateString('en-GB', {
								weekday: 'long',
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
							{#if skip.reason}<span class="text-muted-foreground">— {skip.reason}</span>{/if}
						</span>
						<form method="POST" action="?/deleteSkipDate" use:formEnhance>
							<input type="hidden" name="id" value={skip.id} />
							<Button type="submit" variant="ghost" size="icon" aria-label="Remove skip date">
								<Trash2 class="h-4 w-4" />
							</Button>
						</form>
					</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>

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

<FilterMenu
	data={data.rows}
	filterKeys={['type', 'status', 'planName']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Deliveries" bind:selected={selectedRows} />
