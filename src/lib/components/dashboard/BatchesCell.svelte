<script lang="ts">
	/** Batch numbers on a shipment, with source, and a link to its trace page. */
	let {
		type,
		id,
		state,
		batches
	}: {
		type: string;
		id: string;
		state: 'traced' | 'partial' | 'missing' | 'none';
		batches: { id: string; code: string; source: string; status: string }[];
	} = $props();
</script>

<div class="flex min-w-40 flex-col gap-0.5 text-xs">
	{#each batches as b (b.id)}
		<a href="/dashboard/batches/{b.id}" class="hover:underline" title="Open batch {b.code}">
			<span
				class="font-mono font-medium {b.status === 'recalled' || b.status === 'quarantined'
					? 'text-red-600'
					: ''}">{b.code}</span
			>
			<span class="text-muted-foreground">· {b.source}</span>
			{#if b.status === 'recalled' || b.status === 'quarantined'}
				<span class="font-medium text-red-600 uppercase">{b.status}</span>
			{/if}
		</a>
	{/each}
	{#if state === 'missing' || state === 'partial'}
		<a href="/dashboard/batches/shipment/{type}/{id}" class="font-medium text-amber-600 hover:underline">
			{state === 'missing' ? 'No batch — assign' : 'Partly traced — finish'}
		</a>
	{:else if state === 'traced'}
		<a href="/dashboard/batches/shipment/{type}/{id}" class="text-muted-foreground hover:underline">Trace</a>
	{:else}
		<span class="text-muted-foreground">—</span>
	{/if}
</div>
