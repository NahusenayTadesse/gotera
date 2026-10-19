<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
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
	import { ExternalLink, Plus, Trash2, Undo2, X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import {
		ADDON_AVAILABILITY,
		ADDON_CATEGORIES,
		ADDON_TAGS,
		AVAILABILITY_LABELS,
		CATEGORY_LABELS,
		MAX_SPICE_LEVEL,
		TAG_LABELS,
		addonImageSrc
	} from '$lib/addons';

	let { data }: { data: PageData } = $props();

	// FilterMenu owns this after mount; seeding from the first load is intended.
	// svelte-ignore state_referenced_locally
	let filteredRows = $state(data.rows);

	const categories = ADDON_CATEGORIES.map((value) => ({ value, name: CATEGORY_LABELS[value] }));
	const availability = ADDON_AVAILABILITY.map((value) => ({ value, name: AVAILABILITY_LABELS[value] }));
	const tags = ADDON_TAGS.map((value) => ({ value, name: TAG_LABELS[value] }));
	const spiceLevels = Array.from({ length: MAX_SPICE_LEVEL + 1 }, (_, i) => ({
		value: String(i),
		name: i === 0 ? 'Not spicy' : '🌶'.repeat(i)
	}));

	const editingId = $derived(page.url.searchParams.get('edit'));
	const adding = $derived(page.url.searchParams.has('add'));
	const editingRow = $derived(editingId ? data.rows.find((r) => r.id === editingId) : undefined);
	const showForm = $derived(adding || !!editingRow);
	const currentImage = $derived(addonImageSrc(editingRow?.imageUrl));

	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, delayed, allErrors, message, reset } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		// The load function hands back a blank form on every reload, and by default
		// superforms re-applies it on each page update (including the URL change from
		// clicking "Edit"), racing the row being loaded below. 'never' still applies the
		// save result; it only stops the reloaded blank form overwriting the edit.
		applyAction: 'never',
		validators: zod4Client(addonSchema),
		onUpdated({ form: f }) {
			if (f.valid) goto(resolve('/dashboard/addons'), { replaceState: true, noScroll: true, invalidateAll: false });
		}
	});

	$effect(() => {
		if (!$message) return;
		if ($message.type === 'error') toast.error($message.text);
		else toast.success($message.text);
	});

	const blankAddon = {
		id: undefined,
		name: '',
		description: '',
		category: undefined,
		availability: 'both',
		pricePence: 0,
		unitLabel: '',
		badge: '',
		tags: [],
		spiceLevel: 0,
		ingredients: '',
		image: undefined,
		removeImage: false,
		sortOrder: 0,
		isFeatured: false,
		isActive: true
	} as const;

	function valuesFor(row: NonNullable<typeof editingRow>) {
		return {
			id: row.id,
			name: row.name,
			description: row.description ?? '',
			category: row.category ?? undefined,
			availability: row.availability,
			pricePence: row.pricePence,
			unitLabel: row.unitLabel ?? '',
			badge: row.badge ?? '',
			tags: row.tags,
			spiceLevel: row.spiceLevel,
			ingredients: row.ingredients ?? '',
			image: undefined,
			removeImage: false,
			sortOrder: row.sortOrder ?? 0,
			isFeatured: row.isFeatured,
			isActive: row.isActive
		};
	}

	// Load the form once per thing being edited — not on every reload of `data.rows`,
	// which would wipe unsaved typing. `reset` replaces every field and clears old errors
	// and the "unsaved changes" tracking, so nothing leaks from one add-on to the next.
	let loadedKey: string | null = null;
	$effect.pre(() => {
		const key = editingRow ? editingRow.id : adding ? 'new' : null;
		const row = editingRow;
		untrack(() => {
			if (key === loadedKey) return;
			loadedKey = key;
			if (row) reset({ data: valuesFor(row), newState: valuesFor(row) });
			else if (key === 'new') reset({ data: { ...blankAddon, tags: [] }, newState: { ...blankAddon, tags: [] } });
		});
	});

	const pricePreview = $derived(
		Number.isFinite(Number($form.pricePence)) ? `£${(Number($form.pricePence) / 100).toFixed(2)}` : ''
	);
</script>

<svelte:head>
	<title>Add-ons</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<div>
		<h1 class="dash-heading text-2xl font-semibold">Add-ons</h1>
		<p class="text-sm text-muted-foreground">
			Everything here with “On its own” selling appears in the public
			<a href="/addons" target="_blank" class="inline-flex items-center gap-1 underline">
				add-on shop <ExternalLink class="h-3 w-3" />
			</a>
		</p>
	</div>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Add-on</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:max-w-3xl">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingRow ? `Edit ${editingRow.name}` : 'Add Add-on'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingRow ? '?/edit' : '?/add'}
				enctype="multipart/form-data"
				use:enhance
				id="addon-form"
				class="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"
			>
				<div class="md:col-span-2"><Errors allErrors={$allErrors} /></div>
				{#if editingRow}<input type="hidden" name="id" bind:value={$form.id} />{/if}

				<div class="md:col-span-2">
					<p class="p-1 text-sm font-medium">Photo</p>
					{#if currentImage && !$form.removeImage && !$form.image}
						<div class="flex items-center gap-4 rounded-lg border p-3">
							<img src={currentImage} alt={editingRow?.name} class="h-24 w-24 rounded-md object-cover" />
							<div class="flex flex-col gap-2 text-sm">
								<span class="text-muted-foreground">Current photo. Upload a new one below to replace it.</span>
								<Button
									type="button"
									variant="outline"
									size="sm"
									class="w-fit"
									onclick={() => ($form.removeImage = true)}
								>
									<Trash2 class="h-4 w-4" /> Remove photo
								</Button>
							</div>
						</div>
					{:else if currentImage && $form.removeImage}
						<div class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm">
							<span class="text-muted-foreground">The photo will be removed when you save.</span>
							<Button type="button" variant="ghost" size="sm" onclick={() => ($form.removeImage = false)}>
								<Undo2 class="h-4 w-4" /> Undo
							</Button>
						</div>
					{/if}
					<div class="mt-2">
						<InputComp
							label=""
							{form}
							{errors}
							type="file"
							name="image"
							placeholder="JPG, PNG, WebP or AVIF · square works best"
						/>
					</div>
				</div>

				<InputComp label="Name" {form} {errors} type="text" name="name" placeholder="Berbere Spice" required />
				<InputComp label="Pack size" {form} {errors} type="text" name="unitLabel" placeholder="250 g jar" />

				<div class="md:col-span-2">
					<InputComp
						label="Description"
						{form}
						{errors}
						type="textarea"
						name="description"
						rows={3}
						placeholder="What it is and how to use it with injera"
					/>
				</div>

				<InputComp label="Type" {form} {errors} type="select" name="category" items={categories} />
				<InputComp label="Sold" {form} {errors} type="select" name="availability" items={availability} />

				<div class="flex flex-col">
					<InputComp label="Price (pence)" {form} {errors} type="number" name="pricePence" placeholder="500" required />
					<span class="px-1 text-xs text-muted-foreground">{pricePreview}</span>
				</div>
				<InputComp label="Badge" {form} {errors} type="text" name="badge" placeholder="New, Bestseller…" />

				<InputComp label="Spice level" {form} {errors} type="select" name="spiceLevel" items={spiceLevels} />
				<InputComp label="Sort order" {form} {errors} type="number" name="sortOrder" placeholder="0" />

				<div class="md:col-span-2">
					<InputComp label="Tags" {form} {errors} type="checkbox" name="tags" items={tags} />
				</div>

				<div class="md:col-span-2">
					<InputComp
						label="Ingredients & allergens"
						{form}
						{errors}
						type="textarea"
						name="ingredients"
						rows={2}
						placeholder="Chilli, garlic, ginger… Contains: sesame"
					/>
				</div>

				<InputComp label="Featured" {form} {errors} type="checkboxSingle" name="isFeatured" placeholder="Show first in the shop" />
				<InputComp label="Status" {form} {errors} type="checkboxSingle" name="isActive" placeholder="Active" />

				<div class="md:col-span-2">
					<Button type="submit" form="addon-form" class="w-full">
						{#if $delayed}
							<LoadingBtn name={editingRow ? 'Saving' : 'Adding'} />
						{:else}
							{editingRow ? 'Save changes' : 'Add add-on'}
						{/if}
					</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
{/if}

<FilterMenu
	data={data.rows}
	filterKeys={['category', 'availability', 'isActive', 'isFeatured']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Add-ons" />
