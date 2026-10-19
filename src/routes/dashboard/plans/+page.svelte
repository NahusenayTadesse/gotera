<script lang="ts">
	import type { PageData } from './$types';
	import { untrack } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
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

	// FilterMenu owns this after mount and re-filters whenever `data.rows` reloads.
	// svelte-ignore state_referenced_locally
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
	const editingRow = $derived(editingId ? data.rows.find((r) => r.id === editingId) : undefined);
	const showForm = $derived(adding || !!editingRow);

	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, delayed, allErrors, message, reset } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		// The load function hands back a blank form on every reload. By default superforms
		// re-applies that on each page update — including the URL change from clicking
		// "Edit" — which raced the row being loaded below and left the fields blank or
		// stale. 'never' still applies the save result (errors, message); it only stops
		// the reloaded blank form from overwriting what's being edited.
		applyAction: 'never',
		validators: zod4Client(planSchema),
		onUpdated({ form: f }) {
			if (f.valid) goto(resolve('/dashboard/plans'), { replaceState: true, noScroll: true, invalidateAll: false });
		}
	});

	$effect(() => {
		if (!$message) return;
		if ($message.type === 'error') toast.error($message.text);
		else if ($message.type === 'warning') toast.warning($message.text);
		else toast.success($message.text);
	});

	const blankPlan = {
		id: undefined,
		slug: '',
		name: '',
		subtitle: '',
		pricePence: 0,
		freqLabel: '',
		bullets: '',
		featured: false,
		interval: 'monthly',
		packs: 1,
		kind: 'subscription',
		stripePriceId: '',
		active: true,
		sortOrder: 0,
		quantity: 1,
		injeraPerPack: 3,
		maxQuantity: 0,
		availableFrom: '',
		availableUntil: '',
		nameAm: '',
		subtitleAm: '',
		freqLabelAm: '',
		bulletsAm: ''
	} as const;

	function valuesFor(row: NonNullable<typeof editingRow>) {
		return {
			id: row.id,
			slug: row.slug,
			name: row.name,
			subtitle: row.subtitle ?? '',
			pricePence: row.pricePence,
			freqLabel: row.freqLabel ?? '',
			bullets: row.bullets.join('\n'),
			featured: row.featured,
			interval: row.interval,
			packs: row.packs,
			kind: row.kind,
			stripePriceId: row.stripePriceId ?? '',
			active: row.active,
			sortOrder: row.sortOrder,
			quantity: row.quantity,
			injeraPerPack: row.injeraPerPack,
			maxQuantity: row.maxQuantity ?? 0,
			availableFrom: row.availableFromInput,
			availableUntil: row.availableUntilInput,
			nameAm: row.nameAm,
			subtitleAm: row.subtitleAm,
			freqLabelAm: row.freqLabelAm,
			bulletsAm: row.bulletsAm
		};
	}

	// Load the form once per thing being edited — not on every reload of `data.rows`,
	// which would wipe unsaved typing. `reset` replaces every field and also clears old
	// errors and the "unsaved changes" tracking, so nothing leaks between plans.
	let loadedKey: string | null = null;
	$effect.pre(() => {
		const key = editingRow ? editingRow.id : adding ? 'new' : null;
		const row = editingRow;
		untrack(() => {
			if (key === loadedKey) return;
			loadedKey = key;
			if (row) reset({ data: valuesFor(row), newState: valuesFor(row) });
			else if (key === 'new') reset({ data: { ...blankPlan }, newState: { ...blankPlan } });
		});
	});

	// A subscription bills monthly or bi-monthly; one-offs and gifts are one-time. Keep
	// the interval consistent when the kind changes instead of failing on save.
	$effect(() => {
		const kind = $form.kind;
		untrack(() => {
			if (kind === 'subscription' && $form.interval === 'one_time') $form.interval = 'monthly';
			else if (kind !== 'subscription' && $form.interval !== 'one_time') $form.interval = 'one_time';
		});
	});

	const intervalChoices = $derived(
		$form.kind === 'subscription'
			? intervals.filter((i) => i.value !== 'one_time')
			: intervals.filter((i) => i.value === 'one_time')
	);

	const pricePreview = $derived(
		Number.isFinite(Number($form.pricePence)) ? `£${(Number($form.pricePence) / 100).toFixed(2)}` : ''
	);
</script>

<svelte:head>
	<title>Plans</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Plans</h1>
	<Button href="?add=1"><Plus class="h-4 w-4" /> Add Plan</Button>
</div>

{#if showForm}
	<Card.Root class="mb-8 w-full lg:max-w-3xl">
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title>{editingRow ? `Edit ${editingRow.name}` : 'Add Plan'}</Card.Title>
			<Button href={page.url.pathname} variant="ghost" size="icon" aria-label="Close">
				<X class="h-4 w-4" />
			</Button>
		</Card.Header>
		<Card.Content>
			<form
				method="POST"
				action={editingRow ? '?/edit' : '?/add'}
				use:enhance
				id="plan-form"
				class="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"
			>
				<div class="md:col-span-2"><Errors allErrors={$allErrors} /></div>

				<h3 class="text-muted-foreground mt-2 text-xs font-semibold tracking-wider uppercase md:col-span-2">
					Shown to customers
				</h3>
				<InputComp label="Name" {form} {errors} type="text" name="name" placeholder="Regular" required />
				<InputComp label="Slug" {form} {errors} type="text" name="slug" placeholder="regular" required />
				<InputComp label="Subtitle" {form} {errors} type="text" name="subtitle" placeholder="Our core plan." />
				<InputComp
					label="Frequency label"
					{form}
					{errors}
					type="text"
					name="freqLabel"
					placeholder="Monthly · 4 packs"
				/>
				<div class="md:col-span-2">
					<InputComp
						label="Bullets (one per line)"
						{form}
						{errors}
						type="textarea"
						name="bullets"
						rows={3}
						placeholder="One bullet per line"
					/>
				</div>

				<h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">
					Pricing &amp; billing
				</h3>
				<InputComp label="Kind" {form} {errors} type="select" name="kind" items={kinds} required />
				<InputComp
					label="Interval"
					{form}
					{errors}
					type="select"
					name="interval"
					items={intervalChoices}
					required
				/>
				<div>
					<InputComp
						label="Price (pence)"
						{form}
						{errors}
						type="number"
						name="pricePence"
						min="0"
						placeholder="2400"
						required
					/>
					<p class="text-muted-foreground px-1 text-xs">{pricePreview}</p>
				</div>
				<div>
					<InputComp
						label="Stripe price ID"
						{form}
						{errors}
						type="text"
						name="stripePriceId"
						placeholder="price_..."
					/>
					<p class="text-muted-foreground px-1 text-xs">
						Must charge the price on the left. New price? Create a new Price in Stripe and paste its ID
						— existing subscribers stay on their old one.
					</p>
				</div>

				<h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">
					What's in it
				</h3>
				<InputComp label="Packs" {form} {errors} type="number" name="packs" min="1" placeholder="1" />
				<InputComp
					label="Injera per pack"
					{form}
					{errors}
					type="number"
					name="injeraPerPack"
					min="1"
					placeholder="3"
				/>
				<InputComp label="Default quantity" {form} {errors} type="number" name="quantity" min="1" placeholder="1" />
				<InputComp
					label="Max per order (0 = no limit)"
					{form}
					{errors}
					type="number"
					name="maxQuantity"
					min="0"
					placeholder="0"
				/>

				<h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">
					Availability
				</h3>
				<InputComp
					label="Available from (optional)"
					{form}
					{errors}
					type="datetime-local"
					name="availableFrom"
				/>
				<InputComp
					label="Available until (optional)"
					{form}
					{errors}
					type="datetime-local"
					name="availableUntil"
				/>
				<InputComp label="Sort order" {form} {errors} type="number" name="sortOrder" min="0" placeholder="0" />
				<div class="flex items-end gap-6 pb-2">
					<InputComp label="Featured" {form} {errors} type="checkboxSingle" name="featured" placeholder="Featured" />
					<InputComp label="Status" {form} {errors} type="checkboxSingle" name="active" placeholder="Active" />
				</div>

				<details class="mt-4 rounded-md border p-3 md:col-span-2" open={!!(editingRow?.nameAm || editingRow?.subtitleAm)}>
					<summary class="cursor-pointer text-sm font-medium">
						Amharic text <span class="text-muted-foreground font-normal">(optional — blank shows English)</span>
					</summary>
					<div class="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
						<InputComp label="Name (አማርኛ)" {form} {errors} type="text" name="nameAm" />
						<InputComp label="Subtitle (አማርኛ)" {form} {errors} type="text" name="subtitleAm" />
						<InputComp label="Frequency label (አማርኛ)" {form} {errors} type="text" name="freqLabelAm" />
						<div class="md:col-span-2">
							<InputComp
								label="Bullets (አማርኛ, one per line)"
								{form}
								{errors}
								type="textarea"
								name="bulletsAm"
								rows={3}
							/>
						</div>
					</div>
				</details>

				<div class="mt-4 flex justify-end gap-2 md:col-span-2">
					<Button href={page.url.pathname} variant="outline">Cancel</Button>
					<Button type="submit" disabled={$delayed}>
						{#if $delayed}
							<LoadingBtn name={editingRow ? 'Saving' : 'Adding'} />
						{:else}
							{editingRow ? 'Save changes' : 'Add plan'}
						{/if}
					</Button>
				</div>
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
