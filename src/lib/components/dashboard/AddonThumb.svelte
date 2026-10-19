<script lang="ts">
	import { addonImageSrc } from '$lib/addons';

	let { image, name }: { image: string | null; name: string } = $props();

	const src = $derived(addonImageSrc(image));
</script>

{#if src}
	<img {src} alt={name} loading="lazy" class="h-10 w-10 rounded-md border object-cover" />
{:else}
	<div
		class="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-xs font-semibold text-muted-foreground"
		aria-hidden="true"
	>
		{name.slice(0, 2).toUpperCase()}
	</div>
{/if}
