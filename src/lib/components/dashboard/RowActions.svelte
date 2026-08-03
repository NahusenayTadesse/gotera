<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Pencil, Trash2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { dropdownClass } from '$lib/global.svelte';
	import { enhance } from '$app/forms';

	let { id, editable = true, label = 'record' }: { id: string; editable?: boolean; label?: string } =
		$props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		{#if editable}
			<DropdownMenu.Item>
				<a href="?edit={id}" class={dropdownClass}><Pencil class="h-4 w-4" /> Edit</a>
			</DropdownMenu.Item>
		{/if}
		<DropdownMenu.Item>
			<form
				method="POST"
				action="?/delete"
				use:enhance
				onsubmit={(e) => {
					if (!confirm(`Delete this ${label}? This cannot be undone.`)) e.preventDefault();
				}}
			>
				<input type="hidden" name="id" value={id} />
				<button type="submit" class="{dropdownClass} w-full text-red-600">
					<Trash2 class="h-4 w-4" /> Delete
				</button>
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
