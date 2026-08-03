<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { guestOrderSchema } from './schema';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import { columns } from './columns';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	let filteredRows = $state(data.rows);

	const statuses = [
		{ value: 'pending', name: 'Pending' },
		{ value: 'paid', name: 'Paid' },
		{ value: 'fulfilled', name: 'Fulfilled' }
	];

	const editingId = $derived(page.url.searchParams.get('edit'));

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(guestOrderSchema),
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
				$form.status = row.status;
				$form.buyerEmail = row.buyerEmail ?? '';
				$form.quantity = row.quantity;
				$form.isActive = row.isActive;
			}
		}
	});
</script>

<svelte:head>
	<title>Guest Orders</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Guest Orders</h1>
</div>

{#if editingId}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>Edit Guest Order</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/edit" use:enhance id="guest-order-form" class="flex flex-col gap-4">
				<Errors allErrors={$allErrors} />
				<input type="hidden" name="id" bind:value={$form.id} />
				<InputComp label="Status" {form} {errors} type="select" name="status" items={statuses} required />
				<InputComp label="Buyer email" {form} {errors} type="email" name="buyerEmail" placeholder="jane@example.com" />
				<InputComp label="Quantity" {form} {errors} type="number" name="quantity" min="1" placeholder="1" />
				<InputComp
					label="Status"
					{form}
					{errors}
					type="checkboxSingle"
					name="isActive"
					placeholder="Active"
				/>
				<Button type="submit" form="guest-order-form">
					{#if $delayed}<LoadingBtn name="Saving" />{:else}Save changes{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu data={data.rows} filterKeys={['status']} bind:filteredList={filteredRows} class="mb-4" />

<DataTable data={filteredRows} {columns} fileName="Guest Orders" />
