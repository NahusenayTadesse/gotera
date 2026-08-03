<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { planSchema } from './schema';
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

	const kinds = [
		{ value: 'subscription', name: 'Subscription' },
		{ value: 'order', name: 'One-off order' },
		{ value: 'gift', name: 'Gift' }
	];
	const intervals = [
		{ value: 'monthly', name: 'Monthly' },
		{ value: 'bi_monthly', name: 'Bi-monthly' },
		{ value: 'one_time', name: 'One-time' }
	];

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const showForm = $derived(adding || !!editingId);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(planSchema),
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
				$form.slug = row.slug;
				$form.name = row.name;
				$form.subtitle = row.subtitle ?? '';
				$form.pricePence = row.pricePence;
				$form.freqLabel = row.freqLabel ?? '';
				$form.bullets = row.bullets.join('\n');
				$form.featured = row.featured;
				$form.interval = row.interval;
				$form.packs = row.packs;
				$form.kind = row.kind;
				$form.stripePriceId = row.stripePriceId ?? '';
				$form.active = row.active;
				$form.sortOrder = row.sortOrder;
				$form.quantity = row.quantity;
			}
		} else if (adding) {
			$form.id = undefined;
			$form.slug = '';
			$form.name = '';
			$form.subtitle = '';
			$form.pricePence = 0;
			$form.freqLabel = '';
			$form.bullets = '';
			$form.featured = false;
			$form.interval = 'monthly';
			$form.packs = 1;
			$form.kind = 'subscription';
			$form.stripePriceId = '';
			$form.active = true;
			$form.sortOrder = 0;
			$form.quantity = 1;
		}
	});
</script>

<svelte:head>
	<title>Plans</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Plans</h1>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Plan</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:w-lg">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingId ? 'Edit Plan' : 'Add Plan'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingId ? '?/edit' : '?/add'}
				use:enhance
				id="plan-form"
				class="flex flex-col gap-4"
			>
				<Errors allErrors={$allErrors} />
				{#if editingId}<input type="hidden" name="id" bind:value={$form.id} />{/if}
				<InputComp label="Name" {form} {errors} type="text" name="name" placeholder="Regular" required />
				<InputComp label="Slug" {form} {errors} type="text" name="slug" placeholder="regular" required />
				<InputComp label="Subtitle" {form} {errors} type="text" name="subtitle" placeholder="Our core plan." />
				<InputComp label="Kind" {form} {errors} type="select" name="kind" items={kinds} required />
				<InputComp label="Interval" {form} {errors} type="select" name="interval" items={intervals} required />
				<InputComp
					label="Price (pence)"
					{form}
					{errors}
					type="number"
					name="pricePence"
					placeholder="2400"
					required
				/>
				<InputComp label="Packs" {form} {errors} type="number" name="packs" min="1" placeholder="1" />
				<InputComp
					label="Frequency label"
					{form}
					{errors}
					type="text"
					name="freqLabel"
					placeholder="Monthly · 4 packs"
				/>
				<InputComp
					label="Bullets (one per line)"
					{form}
					{errors}
					type="textarea"
					name="bullets"
					placeholder={'Best value\nMost popular'}
				/>
				<InputComp
					label="Stripe price ID"
					{form}
					{errors}
					type="text"
					name="stripePriceId"
					placeholder="price_..."
				/>
				<InputComp label="Sort order" {form} {errors} type="number" name="sortOrder" placeholder="0" />
				<InputComp label="Default quantity" {form} {errors} type="number" name="quantity" min="1" placeholder="1" />
				<InputComp label="Featured" {form} {errors} type="checkboxSingle" name="featured" placeholder="Featured" />
				<InputComp label="Status" {form} {errors} type="checkboxSingle" name="active" placeholder="Active" />
				<Button type="submit" form="plan-form">
					{#if $delayed}
						<LoadingBtn name={editingId ? 'Saving' : 'Adding'} />
					{:else}
						{editingId ? 'Save changes' : 'Add plan'}
					{/if}
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['kind', 'interval', 'active', 'featured']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Plans" />
