<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { EmailSender } from '$lib/schemas/bulkEmail';

	/** Picks which mailbox a bulk email goes out from. Renders nothing when only one is configured. */
	let { value = $bindable() }: { value: EmailSender } = $props();

	const senders = $derived(
		(page.data.emailSenders ?? []) as { id: EmailSender; address: string }[]
	);
</script>

{#if senders.length > 1}
	<div class="flex flex-col gap-2">
		<span class="text-sm font-medium">Send from</span>
		<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Send from">
			{#each senders as s (s.id)}
				<Button
					type="button"
					size="sm"
					variant={value === s.id ? 'default' : 'outline'}
					role="radio"
					aria-checked={value === s.id}
					onclick={() => (value = s.id)}
				>
					{s.address}
				</Button>
			{/each}
		</div>
	</div>
{/if}
