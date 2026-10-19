<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { toast } from 'svelte-sonner';

	export type StatusChange = {
		status: 'approved' | 'contacted' | 'declined';
		partners: { id: string; businessName: string; status: string }[];
	};

	let {
		change = $bindable(),
		onDone
	}: { change: StatusChange | null; onDone?: () => void } = $props();

	let submitting = $state(false);

	const COPY = {
		approved: {
			verb: 'Approve',
			body: 'They move to Approved and you can start logging their deliveries.',
			done: 'approved'
		},
		contacted: {
			verb: 'Mark as contacted',
			body: 'Use this once you have been in touch and the conversation is ongoing.',
			done: 'marked as contacted'
		},
		declined: {
			verb: 'Decline',
			body: 'Declined applications, and approved ones whose partnership has ended, move to Declined / Ended. Delivery history is kept.',
			done: 'declined'
		}
	} as const;

	const copy = $derived(change ? COPY[change.status] : null);
	const count = $derived(change?.partners.length ?? 0);
	const endsPartnership = $derived(
		change?.status === 'declined' && change.partners.some((p) => p.status === 'approved')
	);
	const shown = $derived(change?.partners.slice(0, 8) ?? []);
</script>

<AlertDialog.Root
	open={!!change}
	onOpenChange={(open) => {
		if (!open && !submitting) change = null;
	}}
>
	<AlertDialog.Content>
		{#if change && copy}
			<AlertDialog.Header>
				<AlertDialog.Title>
					{copy.verb}
					{count === 1 ? change.partners[0].businessName : `${count} applications`}?
				</AlertDialog.Title>
				<AlertDialog.Description>
					{copy.body}
					{#if endsPartnership}
						<strong class="mt-2 block text-foreground">
							This ends the partnership for {count === 1 ? 'an approved partner' : 'approved partners'} in
							the selection.
						</strong>
					{/if}
				</AlertDialog.Description>
			</AlertDialog.Header>

			{#if count > 1}
				<ul class="max-h-48 overflow-y-auto rounded-md border border-border p-3 text-sm">
					{#each shown as p (p.id)}
						<li class="flex justify-between gap-3 py-0.5">
							<span class="truncate">{p.businessName}</span>
							<span class="shrink-0 text-muted-foreground capitalize">{p.status}</span>
						</li>
					{/each}
					{#if count > shown.length}
						<li class="pt-1 text-muted-foreground">+{count - shown.length} more</li>
					{/if}
				</ul>
			{/if}

			<form
				method="POST"
				action="?/setStatus"
				use:enhance={() => {
					submitting = true;
					return async ({ result, update }) => {
						submitting = false;
						if (result.type === 'success') {
							const n = Number(result.data?.updated ?? count);
							toast.success(`${n} ${n === 1 ? 'application' : 'applications'} ${copy.done}`);
							change = null;
							onDone?.();
						} else {
							toast.error('Could not update status');
						}
						await update();
					};
				}}
			>
				<input type="hidden" name="status" value={change.status} />
				{#each change.partners as p (p.id)}
					<input type="hidden" name="ids" value={p.id} />
				{/each}
				<AlertDialog.Footer>
					<AlertDialog.Cancel type="button" disabled={submitting}>Cancel</AlertDialog.Cancel>
					<Button
						type="submit"
						disabled={submitting}
						variant={change.status === 'declined' ? 'destructive' : 'default'}
					>
						{#if submitting}
							<LoadingBtn name="Saving" />
						{:else}
							{endsPartnership && count === 1 ? 'End partnership' : copy.verb}
						{/if}
					</Button>
				</AlertDialog.Footer>
			</form>
		{/if}
	</AlertDialog.Content>
</AlertDialog.Root>
