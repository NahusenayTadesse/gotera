<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Pencil } from '@lucide/svelte';

	let {
		id,
		type,
		addons
	}: {
		id: string;
		type: 'subscription' | 'guest' | 'one-time';
		addons: { name: string; quantity: number; recurring: boolean }[];
	} = $props();

	const summary = $derived(
		addons.length
			? addons
					.map((a) => `${a.name}${a.quantity > 1 ? ` x${a.quantity}` : ''}${a.recurring ? ' (recurring)' : ''}`)
					.join(', ')
			: '—'
	);
</script>

<div class="flex items-center gap-2">
	<span class="text-sm">{summary}</span>
	{#if type === 'subscription'}
		<Button href="?manageAddons={id}" variant="ghost" size="icon" class="size-6 shrink-0" aria-label="Manage add-ons">
			<Pencil class="h-3.5 w-3.5" />
		</Button>
	{/if}
</div>
