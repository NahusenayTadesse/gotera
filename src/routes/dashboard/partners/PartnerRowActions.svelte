<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Check, X, MessageCircle, Eye } from '@lucide/svelte';
	import type { StatusChange } from './StatusDialog.svelte';

	type Partner = StatusChange['partners'][number];

	let {
		partner,
		onAction
	}: { partner: Partner; onAction: (status: StatusChange['status'], partners: Partner[]) => void } =
		$props();
</script>

<div class="flex items-center gap-1">
	{#if partner.status !== 'approved'}
		<Button size="sm" class="h-8 px-2" onclick={() => onAction('approved', [partner])}>
			<Check class="h-4 w-4" /> Approve
		</Button>
	{/if}
	{#if partner.status === 'new'}
		<Button
			size="icon"
			variant="outline"
			class="size-8"
			title="Mark as contacted"
			aria-label="Mark {partner.businessName} as contacted"
			onclick={() => onAction('contacted', [partner])}
		>
			<MessageCircle class="h-4 w-4" />
		</Button>
	{/if}
	{#if partner.status !== 'declined'}
		<Button
			size="sm"
			variant="outline"
			class="h-8 px-2 text-red-600"
			onclick={() => onAction('declined', [partner])}
		>
			<X class="h-4 w-4" />
			{partner.status === 'approved' ? 'End' : 'Decline'}
		</Button>
	{/if}
	<Button
		size="icon"
		variant="ghost"
		class="size-8"
		href="/dashboard/partners/{partner.id}"
		title="Open"
		aria-label="Open {partner.businessName}"
	>
		<Eye class="h-4 w-4" />
	</Button>
</div>
