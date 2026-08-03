<script>
	import { Frown } from '@lucide/svelte';

	let { title = '' } = $props();
</script>

<div
	class="my-8 flex h-64 w-full flex-col items-center justify-center gap-3 rounded-md border border-border bg-card p-6"
>
	<Frown class="size-10 text-muted-foreground" />
	<h1 aria-live="assertive" class="dash-heading text-center text-2xl font-semibold text-foreground">
		No {title} Found
	</h1>
</div>
