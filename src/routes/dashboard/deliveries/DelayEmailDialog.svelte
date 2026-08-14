<script lang="ts">
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { delayEmailSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { Mail } from '@lucide/svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { DelayEmailSchema } from './schema';

	let {
		delayEmailForm,
		rows
	}: {
		delayEmailForm: SuperValidated<any>;
		rows: { id: string; subscriberEmail: string | null; subscriberName: string | null }[];
	} = $props();

	let open = $state(false);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(delayEmailForm, {
		id: 'delay-email',
		dataType: 'json',
		resetForm: true,
		invalidateAll: true,
		validators: zod4Client(delayEmailSchema),
		onUpdated({ form: f }) {
			if (f.valid) open = false;
		}
	});

	$effect(() => {
		if ($message) $message.type === 'error' ? toast.error($message.text) : toast.success($message.text);
	});

	// Keep the hidden id list in sync with the current table selection whenever the dialog is open.
	$effect(() => {
		if (open) $form.deliveryIds = rows.map((r) => r.id);
	});
</script>

{#if rows.length > 0}
	<DialogComp
		title="Notify customers of delay"
		label={`Notify ${rows.length} selected`}
		IconComp={Mail}
		class=""
		bind:open
	>
		<h3 class="mb-1 text-lg font-semibold">
			Notify {rows.length}
			{rows.length === 1 ? 'customer' : 'customers'} of a delay
		</h3>
		<p class="mb-4 text-sm text-muted-foreground">
			{rows
				.map((r) => r.subscriberName || r.subscriberEmail || 'Unknown')
				.join(', ')}
		</p>

		<form
			method="POST"
			action="?/sendDelayEmail"
			use:enhance
			id="delay-email-form"
			class="flex flex-col gap-4"
		>
			<Errors allErrors={$allErrors} />
			<InputComp
				label="Message to customers"
				{form}
				{errors}
				type="textarea"
				name="message"
				rows={5}
				placeholder="e.g. Due to high demand this week's delivery will arrive a day later than planned."
				required
			/>
			<Button type="submit" form="delay-email-form" disabled={rows.length === 0}>
				{#if $delayed}<LoadingBtn name="Sending" />{:else}Send delay email{/if}
			</Button>
		</form>
	</DialogComp>
{/if}
