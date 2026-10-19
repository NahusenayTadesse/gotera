<script lang="ts">
	import { shortDate } from '$lib/format';

	let { date, expiry }: { date: string | null; expiry: 'none' | 'expired' | 'soon' | 'ok' } = $props();
</script>

{#if !date}
	<span class="text-muted-foreground">—</span>
{:else}
	<span
		class={expiry === 'expired'
			? 'font-medium text-red-600'
			: expiry === 'soon'
				? 'font-medium text-amber-600'
				: ''}
	>
		{shortDate(date)}
		{#if expiry === 'expired'}<span class="text-xs">(expired)</span>{:else if expiry === 'soon'}<span
				class="text-xs">(soon)</span
			>{/if}
	</span>
{/if}
