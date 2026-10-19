<script lang="ts">
	let { type, id, label }: { type: string; id: string; label: string } = $props();
</script>

<a href="/dashboard/batches/shipment/{type}/{id}" class="font-medium underline-offset-2 hover:underline">
	{label}
</a>
