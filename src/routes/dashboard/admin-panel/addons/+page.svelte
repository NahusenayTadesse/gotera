<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { addonSchema } from './schema';
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

	const categories = [
		{ value: 'spice', name: 'Spice' },
		{ value: 'sauce', name: 'Sauce' },
		{ value: 'pantry', name: 'Pantry' },
		{ value: 'kit', name: 'Kit' }
	];

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const showForm = $derived(adding || !!editingId);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(addonSchema),
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
				$form.name = row.name;
				$form.description = row.description ?? '';
				$form.category = row.category ?? undefined;
				$form.pricePence = row.pricePence;
				$form.imageUrl = row.imageUrl ?? '';
				$form.sortOrder = row.sortOrder ?? 0;
				$form.stripePriceId = row.stripePriceId ?? '';
				$form.isActive = row.isActive;
			}
		} else if (adding) {
			$form.id = undefined;
			$form.name = '';
			$form.description = '';
			$form.category = undefined;
			$form.pricePence = 0;
			$form.imageUrl = '';
			$form.sortOrder = 0;
			$form.stripePriceId = '';
			$form.isActive = true;
		}
	});
</script>

<svelte:head>
	<title>Add-ons</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Add-ons</h1>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Add-on</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingId ? 'Edit Add-on' : 'Add Add-on'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingId ? '?/edit' : '?/add'}
				use:enhance
				id="addon-form"
				class="flex flex-col gap-4"
			>
				<Errors allErrors={$allErrors} />
				{#if editingId}<input type="hidden" name="id" bind:value={$form.id} />{/if}
				<InputComp label="Name" {form} {errors} type="text" name="name" placeholder="Berbere Spice" required />
				<InputComp label="Description" {form} {errors} type="textarea" name="description" placeholder="..." />
				<InputComp label="Category" {form} {errors} type="select" name="category" items={categories} />
				<InputComp
					label="Price (pence)"
					{form}
					{errors}
					type="number"
					name="pricePence"
					placeholder="500"
					required
				/>
				<InputComp label="Image URL" {form} {errors} type="text" name="imageUrl" placeholder="https://..." />
				<InputComp label="Sort order" {form} {errors} type="number" name="sortOrder" placeholder="0" />
				<InputComp
					label="Stripe price ID"
					{form}
					{errors}
					type="text"
					name="stripePriceId"
					placeholder="price_..."
				/>
				<InputComp
					label="Status"
					{form}
					{errors}
					type="checkboxSingle"
					name="isActive"
					placeholder="Active"
				/>
				<Button type="submit" form="addon-form">
					{#if $delayed}
						<LoadingBtn name={editingId ? 'Saving' : 'Adding'} />
					{:else}
						{editingId ? 'Save changes' : 'Add add-on'}
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['category', 'isActive']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Add-ons" />
