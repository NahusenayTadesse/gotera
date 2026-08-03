<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { subscriberSchema } from './schema';
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

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const showForm = $derived(adding || !!editingId);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(subscriberSchema),
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
				$form.email = row.email;
				$form.fullName = row.fullName ?? '';
				$form.phone = row.phone ?? '';
				$form.marketingOptIn = row.marketingOptIn;
				$form.isActive = row.isActive;
			}
		} else if (adding) {
			$form.id = undefined;
			$form.email = '';
			$form.fullName = '';
			$form.phone = '';
			$form.marketingOptIn = true;
			$form.isActive = true;
		}
	});
</script>

<svelte:head>
	<title>Customers</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Customers</h1>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Customer</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingId ? 'Edit Customer' : 'Add Customer'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingId ? '?/edit' : '?/add'}
				use:enhance
				id="customer-form"
				class="flex flex-col gap-4"
			>
				<Errors allErrors={$allErrors} />
				{#if editingId}<input type="hidden" name="id" bind:value={$form.id} />{/if}
				<InputComp label="Full name" {form} {errors} type="text" name="fullName" placeholder="Jane Doe" />
				<InputComp
					label="Email"
					{form}
					{errors}
					type="email"
					name="email"
					placeholder="jane@example.com"
					required
				/>
				<InputComp label="Phone" {form} {errors} type="text" name="phone" placeholder="+44 7..." />
				<InputComp
					label="Marketing"
					{form}
					{errors}
					type="checkboxSingle"
					name="marketingOptIn"
					placeholder="Receives marketing emails"
				/>
				<InputComp
					label="Status"
					{form}
					{errors}
					type="checkboxSingle"
					name="isActive"
					placeholder="Active"
				/>
				<Button type="submit" form="customer-form">
					{#if $delayed}
						<LoadingBtn name={editingId ? 'Saving' : 'Adding'} />
					{:else}
						{editingId ? 'Save changes' : 'Add customer'}
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['isActive', 'marketingOptIn']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Customers" />
