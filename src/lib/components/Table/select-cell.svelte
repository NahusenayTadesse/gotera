<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import type { Row } from '@tanstack/table-core';

	let { row }: { row: Row<any> } = $props();
</script>

<Checkbox
	aria-label="Select row"
	onclick={(e: Event) => e.stopPropagation()}
	bind:checked={
		() => row.getIsSelected(),
		(v: boolean) => row.toggleSelected(!!v)
	}
/>
