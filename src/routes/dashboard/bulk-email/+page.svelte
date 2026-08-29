<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import { columns } from './columns';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Send } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	let filteredRows = $state(data.rows);
	let selectedRows = $state<typeof data.rows>([]);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(data.bulkEmailForm, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: false,
		validators: zod4Client(bulkEmailSchema),
		onUpdated({ form: f }) {
			if (f.valid) {
				$form.subject = '';
				$form.message = '';
			}
		}
	});

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else if ($message.type === 'warning') toast.warning($message.text);
			else toast.success($message.text);
		}
	});

	// Keep the hidden recipient list in sync with the current table selection.
	$effect(() => {
		$form.recipients = selectedRows.map((r) => ({ email: r.email, name: r.fullName ?? undefined }));
	});
</script>

<svelte:head>
	<title>Bulk Email</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<h1 class="dash-heading text-2xl font-semibold">Bulk Email</h1>
</div>

<FilterMenu
	data={data.rows}
	filterKeys={['customerType', 'marketingOptIn', 'isActive']}
	bind:filteredList={filteredRows}
	class="mb-4"
/>

<DataTable data={filteredRows} {columns} fileName="Customers" bind:selected={selectedRows} />

<Card.Root class="mt-8 w-full">
	<Card.Header>
		<Card.Title>Compose email</Card.Title>
		<Card.Description>
			{#if selectedRows.length > 0}
				Sending to {selectedRows.length} selected customer{selectedRows.length === 1 ? '' : 's'}.
			{:else}
				Tick customers in the table above (use the filters to narrow by customer type), then write
				your email below.
			{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			method="POST"
			action="?/sendBulkEmail"
			use:enhance
			id="bulk-email-form"
			class="flex flex-col gap-4"
		>
			<Errors allErrors={$allErrors} />
			<InputComp
				label="Subject"
				{form}
				{errors}
				type="text"
				name="subject"
				placeholder="What's this email about?"
				required
			/>
			<InputComp
				label="Message"
				{form}
				{errors}
				type="richtext"
				name="message"
				placeholder="Write your message..."
			/>
			<Button
				type="submit"
				form="bulk-email-form"
				disabled={selectedRows.length === 0 || $delayed}
				class="w-fit"
			>
				{#if $delayed}
					<LoadingBtn name="Sending" />
				{:else}
					<Send class="h-4 w-4" />
					Send to {selectedRows.length} customer{selectedRows.length === 1 ? '' : 's'}
				{/if}
			</Button>
		</form>
	</Card.Content>
</Card.Root>
