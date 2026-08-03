<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { subscriptionSchema } from './schema';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import { columns } from './columns';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Plus, X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	let filteredRows = $state(data.rows);

	const statuses = [
		{ value: 'pending', name: 'Pending' },
		{ value: 'active', name: 'Active' },
		{ value: 'paused', name: 'Paused' },
		{ value: 'cancelled', name: 'Cancelled' }
	];

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const showForm = $derived(adding || !!editingId);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(subscriptionSchema),
		onUpdated({ form: f }) {
			if (f.valid) goto(page.url.pathname, { replaceState: true, invalidateAll: false });
		}
	});

	$effect(() => {
		if ($message) $message.type === 'error' ? toast.error($message.text) : toast.success($message.text);
	});

	$effect.pre(() => {
		if (editingId) {
			const row = data.rows.find((r) => r.id === editingId);
			if (row) {
				$form.id = row.id;
				$form.subscriberId = row.subscriberId;
				$form.planId = row.planId;
				$form.status = row.status;
				$form.quantity = row.quantity;
				$form.cancelAtPeriodEnd = row.cancelAtPeriodEnd;
				$form.isActive = row.isActive;
			}
		} else if (adding) {
			$form.id = undefined;
			$form.subscriberId = data.subscriberOptions[0]?.value ?? '';
			$form.planId = data.planOptions[0]?.value ?? '';
			$form.status = 'pending';
			$form.quantity = 1;
			$form.cancelAtPeriodEnd = false;
			$form.isActive = true;
		}
	});
</script>

<svelte:head>
	<title>Subscriptions</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Subscriptions</h1>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Subscription</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingId ? 'Edit Subscription' : 'Add Subscription'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingId ? '?/edit' : '?/add'}
				use:enhance
				id="subscription-form"
				class="flex flex-col gap-4"
			>
				<Errors allErrors={$allErrors} />
				{#if editingId}<input type="hidden" name="id" bind:value={$form.id} />{/if}
				<InputComp
					label="Customer"
					{form}
					{errors}
					type="select"
					name="subscriberId"
					items={data.subscriberOptions}
					required
				/>
				<InputComp label="Plan" {form} {errors} type="select" name="planId" items={data.planOptions} required />
				<InputComp label="Status" {form} {errors} type="select" name="status" items={statuses} required />
				<InputComp label="Quantity" {form} {errors} type="number" name="quantity" min="1" placeholder="1" />
				<InputComp
					label="Cancellation"
					{form}
					{errors}
					type="checkboxSingle"
					name="cancelAtPeriodEnd"
					placeholder="Cancel at period end"
				/>
				<InputComp
					label="Status"
					{form}
					{errors}
					type="checkboxSingle"
					name="isActive"
					placeholder="Active"
				/>
				<Button type="submit" form="subscription-form">
					{#if $delayed}
						<LoadingBtn name={editingId ? 'Saving' : 'Adding'} />
					{:else}
						{editingId ? 'Save changes' : 'Add subscription'}
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['status', 'planName', 'cancelAtPeriodEnd']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Subscriptions" />
