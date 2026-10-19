<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { toast } from 'svelte-sonner';

	export type BatchStatusChange = {
		status: 'active' | 'quarantined' | 'recalled' | 'depleted';
		batches: { id: string; code: string; allocated: number }[];
	};

	let { change = $bindable(), onDone }: { change: BatchStatusChange | null; onDone?: () => void } =
		$props();

	let submitting = $state(false);

	const COPY = {
		active: { verb: 'Release', body: 'The batch becomes available for allocation again.', done: 'released' },
		quarantined: {
			verb: 'Quarantine',
			body: 'Holds the batch while you investigate: it stops being allocated to new deliveries. Existing allocations are kept so you can see who already has it.',
			done: 'quarantined'
		},
		recalled: {
			verb: 'Recall',
			body: 'Marks the batch as recalled. It will never be allocated again, and its page lists every customer who received it so you can contact them.',
			done: 'recalled'
		},
		depleted: { verb: 'Mark depleted', body: 'Nothing left — it stops being offered for allocation.', done: 'marked depleted' }
	} as const;

	const copy = $derived(change ? COPY[change.status] : null);
	const count = $derived(change?.batches.length ?? 0);
	const affected = $derived(change?.batches.reduce((n, b) => n + b.allocated, 0) ?? 0);
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
					{copy.verb} {count === 1 ? change.batches[0].code : `${count} batches`}?
				</AlertDialog.Title>
				<AlertDialog.Description>
					{copy.body}
					{#if (change.status === 'recalled' || change.status === 'quarantined') && affected > 0}
						<strong class="mt-2 block text-foreground">
							{affected} units from {count === 1 ? 'this batch have' : 'these batches have'} already been
							allocated to deliveries.
						</strong>
					{/if}
				</AlertDialog.Description>
			</AlertDialog.Header>
			{#if count > 1}
				<p class="rounded-md border border-border p-3 font-mono text-xs">
					{change.batches.map((b) => b.code).join(', ')}
				</p>
			{/if}
			<form
				method="POST"
				action="?/setBatchStatus"
				use:enhance={() => {
					submitting = true;
					return async ({ result, update }) => {
						submitting = false;
						if (result.type === 'success') {
							toast.success(`${count === 1 ? change!.batches[0].code : `${count} batches`} ${copy.done}`);
							change = null;
							onDone?.();
						} else toast.error('Could not update batch status');
						await update();
					};
				}}
			>
				<input type="hidden" name="status" value={change.status} />
				{#each change.batches as b (b.id)}<input type="hidden" name="ids" value={b.id} />{/each}
				<AlertDialog.Footer>
					<AlertDialog.Cancel type="button" disabled={submitting}>Cancel</AlertDialog.Cancel>
					<Button
						type="submit"
						disabled={submitting}
						variant={change.status === 'recalled' ? 'destructive' : 'default'}
					>
						{#if submitting}<LoadingBtn name="Saving" />{:else}{copy.verb}{/if}
					</Button>
				</AlertDialog.Footer>
			</form>
		{/if}
	</AlertDialog.Content>
</AlertDialog.Root>
