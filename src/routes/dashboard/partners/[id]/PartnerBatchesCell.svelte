<script lang="ts">
	import BatchesCell from '$lib/components/dashboard/BatchesCell.svelte';

	let {
		row
	}: {
		row: {
			id: string;
			kind: 'partner' | 'supplier';
			status: string;
			traceState: 'traced' | 'partial' | 'missing' | 'none';
			batches: { id: string; code: string; source: string; status: string }[];
		};
	} = $props();
</script>

{#if row.kind === 'partner'}
	<BatchesCell type="partner" id={row.id} state={row.traceState} batches={row.batches} />
{:else}
	<!-- Supplier receipt: the batches it became / went into. -->
	<div class="flex min-w-36 flex-col gap-0.5 text-xs">
		{#each row.batches as b (b.id)}
			<a href="/dashboard/batches/{b.id}" class="hover:underline">
				<span class="font-mono font-medium">{b.code}</span>
				<span class="text-muted-foreground">· {b.source}</span>
			</a>
		{/each}
		{#if row.status === 'delivered'}
			<a href="/dashboard/batches?add=1&receipt={row.id}" class="text-primary hover:underline">+ Create batch</a>
		{/if}
	</div>
{/if}
