<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import type { Table } from '@tanstack/table-core';

	let { table }: { table: Table<any> } = $props();
</script>

<Checkbox
	aria-label="Select all"
	indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
	bind:checked={
		() => table.getIsAllPageRowsSelected(),
		(v: boolean) => table.toggleAllPageRowsSelected(!!v)
	}
/>
