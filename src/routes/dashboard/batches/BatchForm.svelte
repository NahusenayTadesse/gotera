<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { batchSchema, type BatchSchema } from './schema';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { shortDate } from '$lib/format';
	import { X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { batchFormOptions } from './batches.server';

	let {
		data,
		options,
		closeHref,
		editing = false
	}: {
		data: SuperValidated<Infer<BatchSchema>>;
		options: Awaited<ReturnType<typeof batchFormOptions>>;
		closeHref: string;
		editing?: boolean;
	} = $props();

	const { form, errors, enhance, delayed, allErrors } = superForm(data, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: true,
		validators: zod4Client(batchSchema),
		onUpdated({ form: f }) {
			const msg = f.message as { type: string; text: string; id?: string } | undefined;
			if (!msg) return;
			if (msg.type === 'error') return void toast.error(msg.text);
			toast.success(msg.text);
			// A new batch opens on its own page; an edit just closes the form.
			goto(!editing && msg.id ? `/dashboard/batches/${msg.id}` : closeHref, { invalidateAll: true });
		}
	});

	// Sensible shelf life if none given: injera a few days, add-ons months.
	const SHELF_DAYS = { injera: 5, addon: 180 };
	function suggestBestBefore() {
		if (!$form.producedOn) return;
		const d = new Date(`${$form.producedOn}T12:00:00Z`);
		d.setUTCDate(d.getUTCDate() + SHELF_DAYS[$form.productKey === 'injera' ? 'injera' : 'addon']);
		$form.bestBefore = d.toISOString().slice(0, 10);
	}
	$effect(() => {
		if (!editing && !$form.bestBefore && $form.producedOn) suggestBestBefore();
	});

	const sourceReceipts = $derived(
		options.receipts.filter((r) => r.partnerId === $form.sourcePartnerId)
	);
	const selectClass =
		'border-input h-9 w-full rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30';
	const err = (k: string) => ($errors as Record<string, string[] | undefined>)[k]?.[0];
</script>

<Card.Root class="mb-8 w-full lg:max-w-3xl">
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title>{editing ? 'Edit batch' : 'New batch'}</Card.Title>
		<Button href={closeHref} variant="ghost" size="icon"><X class="h-4 w-4" /></Button>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="?/saveBatch" use:enhance class="grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2"><Errors allErrors={$allErrors} /></div>

			<div class="flex flex-col gap-2">
				<Label for="productKey">Product</Label>
				<select id="productKey" class={selectClass} bind:value={$form.productKey}>
					{#each options.products as p (p.value)}<option value={p.value}>{p.name}</option>{/each}
				</select>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="code">Batch number</Label>
				<Input id="code" bind:value={$form.code} placeholder={editing ? '' : 'Auto, e.g. INJ-261018-01'} />
				{#if err('code')}<span class="text-xs text-red-600">{err('code')}</span>{/if}
			</div>

			<fieldset class="flex flex-col gap-2 sm:col-span-2">
				<legend class="mb-2 text-sm font-medium">Source</legend>
				<div class="flex flex-wrap gap-4 text-sm">
					<label class="flex items-center gap-2">
						<input type="radio" value="in_house" bind:group={$form.source} /> Made in house
					</label>
					<label class="flex items-center gap-2">
						<input type="radio" value="external" bind:group={$form.source} /> From a supplier / partner
					</label>
				</div>
			</fieldset>

			{#if $form.source === 'external'}
				<div class="flex flex-col gap-2">
					<Label for="sourcePartnerId">Supplier / partner</Label>
					<select id="sourcePartnerId" class={selectClass} bind:value={$form.sourcePartnerId}>
						<option value="">Choose…</option>
						{#each options.sources as s (s.id)}
							<option value={s.id}>{s.businessName} ({s.type})</option>
						{/each}
					</select>
					{#if err('sourcePartnerId')}<span class="text-xs text-red-600">{err('sourcePartnerId')}</span>{/if}
				</div>
				<div class="flex flex-col gap-2">
					<Label for="sourceDeliveryId">Arrived on receipt</Label>
					<select
						id="sourceDeliveryId"
						class={selectClass}
						bind:value={$form.sourceDeliveryId}
						disabled={!sourceReceipts.length}
					>
						<option value="">{sourceReceipts.length ? 'Not linked' : 'No receipts logged'}</option>
						{#each sourceReceipts as r (r.id)}
							<option value={r.id}>
								{shortDate(r.deliveredOn)} · {r.items} · {r.quantity} {r.unit}{r.reference ? ` · ${r.reference}` : ''}
							</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col gap-2 sm:col-span-2">
					<Label for="supplierLotRef">Supplier's lot / batch no.</Label>
					<Input id="supplierLotRef" bind:value={$form.supplierLotRef} placeholder="As printed on their packaging" />
				</div>
			{:else if options.receipts.length}
				<div class="flex flex-col gap-2 sm:col-span-2">
					<Label>Ingredients used <span class="font-normal text-muted-foreground">(supplier receipts)</span></Label>
					<div class="max-h-48 overflow-y-auto rounded-md border border-border p-2 text-sm">
						{#each options.receipts as r (r.id)}
							<label class="flex items-start gap-2 rounded px-1 py-1 hover:bg-muted/50">
								<input type="checkbox" value={r.id} bind:group={$form.inputIds} class="mt-1" />
								<span>
									<span class="font-medium">{r.items}</span>
									— {r.supplier}, {shortDate(r.deliveredOn)}, {r.quantity}
									{r.unit}{r.reference ? ` (${r.reference})` : ''}
								</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			<div class="flex flex-col gap-2">
				<Label for="producedOn">{$form.source === 'external' ? 'Received on' : 'Produced on'}</Label>
				<Input id="producedOn" type="date" bind:value={$form.producedOn} />
				{#if err('producedOn')}<span class="text-xs text-red-600">{err('producedOn')}</span>{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Label for="bestBefore">Best before</Label>
				<Input id="bestBefore" type="date" bind:value={$form.bestBefore} />
				{#if err('bestBefore')}<span class="text-xs text-red-600">{err('bestBefore')}</span>{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Label for="quantity">Quantity</Label>
				<Input id="quantity" type="number" min="1" bind:value={$form.quantity} />
				{#if err('quantity')}<span class="text-xs text-red-600">{err('quantity')}</span>{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Label for="unit">Unit</Label>
				<Input id="unit" bind:value={$form.unit} placeholder="packs, jars, units" />
			</div>
			<div class="flex flex-col gap-2 sm:col-span-2">
				<Label for="notes">Notes</Label>
				<Textarea id="notes" rows={2} bind:value={$form.notes} placeholder="QA checks, oven, staff…" />
			</div>

			<Button type="submit" class="sm:col-span-2">
				{#if $delayed}<LoadingBtn name="Saving" />{:else}{editing ? 'Save changes' : 'Create batch'}{/if}
			</Button>
		</form>
	</Card.Content>
</Card.Root>
