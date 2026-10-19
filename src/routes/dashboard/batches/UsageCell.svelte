<script lang="ts">
	let { allocated, quantity, unit }: { allocated: number; quantity: number; unit: string } = $props();
	const pct = $derived(quantity ? Math.min(100, Math.round((allocated / quantity) * 100)) : 0);
</script>

<div class="flex min-w-32 flex-col gap-1">
	<span class="text-xs tabular-nums">
		<strong>{quantity - allocated}</strong> left of {quantity} {unit}
	</span>
	<div class="h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
		<div class="h-full rounded-full bg-primary" style="width: {pct}%"></div>
	</div>
</div>
