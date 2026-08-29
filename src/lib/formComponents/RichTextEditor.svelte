<!-- RichTextEditor.svelte -->
<script lang="ts">
	import { Tipex, defaultExtensions } from '@friendofsvelte/tipex';
	import '@friendofsvelte/tipex/styles/index.css';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import type { AnyExtension, Editor } from '@tiptap/core';

	let {
		value = $bindable(''),
		placeholder = 'Start writing...',
		class: className = ''
	} = $props();

	let editorInstance: Editor | undefined = $state();

	// Swap in our own Placeholder config so the `placeholder` prop actually
	// shows — the default export otherwise ships with empty placeholder text.
	const extensions = $derived([
		...defaultExtensions.filter((ext: AnyExtension) => ext.name !== 'placeholder'),
		Placeholder.configure({ placeholder, showOnlyWhenEditable: false })
	]);

	$effect(() => {
		if (editorInstance) {
			editorInstance.on('update', () => {
				value = editorInstance?.getHTML() || '';
			});
		}
	});
</script>

<Tipex body={value} bind:tipex={editorInstance} {extensions} class={className} focal floating />

<style>
	:global(.tipex-editor-section) {
		min-height: 220px;
	}
</style>
