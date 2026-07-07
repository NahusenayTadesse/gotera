<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, type ButtonVariant } from '$lib/components/ui/button/index.js';
	import { Trash } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { Component } from 'svelte';
	import type { IconProps } from '@lucide/svelte';

	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';

	let {
		title,
		children,
		variant,
		IconComp,
		open = $bindable(),

		class: className = ''
	}: {
		title: string;
		children: Snippet;
		variant: ButtonVariant;
		IconComp?: Component<IconProps>;
		class?: string;
		open?: boolean;
	} = $props();

</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="w-full border-0">
		{#snippet child({ props })}
			<Button class="border-0" {variant} {...props}>
				{#if variant === 'destructive'}
					<Trash />
				{/if}
				{#if IconComp}
					<IconComp />
				{/if}
				{title}
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="w-lg! {className}">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<ScrollArea class="h-auto w-full! min-w-0!  px-2 pr-4" orientation="both">
			<div class="h-auto max-h-96 w-full lg:max-h-[calc(100vh-10rem)]">
				{@render children()}
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
