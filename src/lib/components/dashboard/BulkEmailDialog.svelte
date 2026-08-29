<script lang="ts">
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { bulkEmailSchema } from '$lib/schemas/bulkEmail';
	import { toast } from 'svelte-sonner';
	import { Mail, Send } from '@lucide/svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	type Row = { id: string; email: string | null | undefined; name?: string | null };

	let {
		bulkEmailForm,
		rows,
		action = '?/sendBulkEmail'
	}: {
		bulkEmailForm: SuperValidated<any>;
		/** The current table selection — rows without an email are silently dropped. */
		rows: Row[];
		/** Form action to post to; every page wires this to `sendBulkEmailAction`. */
		action?: string;
	} = $props();

	let open = $state(false);

	const { form, errors, enhance, delayed, allErrors, message } = superForm(bulkEmailForm, {
		id: 'bulk-email',
		dataType: 'json',
		resetForm: true,
		invalidateAll: false,
		validators: zod4Client(bulkEmailSchema),
		onUpdated({ form: f }) {
			if (f.valid) open = false;
		}
	});

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else if ($message.type === 'warning') toast.warning($message.text);
			else toast.success($message.text);
		}
	});

	// Rows can repeat the same email (e.g. one customer with two orders selected) — de-dupe
	// so the count shown on the trigger matches how many people actually receive the email.
	const recipients = $derived.by(() => {
		const seen = new Set<string>();
		const out: { email: string; name?: string }[] = [];
		for (const r of rows) {
			if (!r.email || seen.has(r.email)) continue;
			seen.add(r.email);
			out.push({ email: r.email, name: r.name ?? undefined });
		}
		return out;
	});

	// Keep the hidden recipient list in sync with the current table selection whenever the dialog is open.
	$effect(() => {
		if (open) $form.recipients = recipients;
	});
</script>

{#if rows.length > 0}
	<DialogComp
		title="Email customers"
		label={`Email ${rows.length} selected`}
		IconComp={Mail}
		class=""
		contentClass="max-w-2xl max-h-[90vh] overflow-y-auto"
		bind:open
	>
		<h3 class="mb-1 text-lg font-semibold">
			Email {recipients.length}
			{recipients.length === 1 ? 'customer' : 'customers'}
		</h3>
		<p class="mb-4 text-sm text-muted-foreground">
			{recipients.map((r) => r.name || r.email).join(', ')}
		</p>

		<form
			method="POST"
			{action}
			use:enhance
			id="bulk-email-dialog-form"
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
				form="bulk-email-dialog-form"
				disabled={recipients.length === 0 || $delayed}
				class="w-fit"
			>
				{#if $delayed}
					<LoadingBtn name="Sending" />
				{:else}
					<Send class="h-4 w-4" />
					Send to {recipients.length} customer{recipients.length === 1 ? '' : 's'}
				{/if}
			</Button>
		</form>
	</DialogComp>
{/if}
