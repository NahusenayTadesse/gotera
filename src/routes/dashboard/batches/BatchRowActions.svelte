<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ShieldAlert, Undo2, Ban, Eye } from '@lucide/svelte';
	import type { BatchStatusChange } from './BatchStatusDialog.svelte';

	type Batch = { id: string; code: string; allocated: number; status: string };
	let {
		batch,
		onAction
	}: { batch: Batch; onAction: (status: BatchStatusChange['status'], batches: Batch[]) => void } =
		$props();
</script>

<div class="flex items-center gap-1">
	{#if batch.status === 'active' || batch.status === 'depleted'}
		<Button
			size="sm"
			variant="outline"
			class="h-8 px-2"
			title="Hold this batch while you investigate"
			onclick={() => onAction('quarantined', [batch])}
		>
			<ShieldAlert class="h-4 w-4" /> Hold
		</Button>
	{:else}
		<Button size="sm" variant="outline" class="h-8 px-2" onclick={() => onAction('active', [batch])}>
			<Undo2 class="h-4 w-4" /> Release
		</Button>
	{/if}
	{#if batch.status !== 'recalled'}
		<Button
			size="sm"
			variant="outline"
			class="h-8 px-2 text-red-600"
			onclick={() => onAction('recalled', [batch])}
		>
			<Ban class="h-4 w-4" /> Recall
		</Button>
	{/if}
	<Button
		size="icon"
		variant="ghost"
		class="size-8"
		href="/dashboard/batches/{batch.id}"
		aria-label="Open {batch.code}"
	>
		<Eye class="h-4 w-4" />
	</Button>
</div>
