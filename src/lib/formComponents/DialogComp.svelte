<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { Component } from 'svelte';
	import type { IconProps } from '@lucide/svelte';

	let {
		title,
		eyebrow = 'Manage account', // Added to let you customize the small text above title
		children,
		variant = 'default',
		IconComp,
		open = $bindable(false)
	}: {
		title: string;
		eyebrow?: string;
		children: Snippet;
		variant?: 'default' | 'destructive';
		IconComp?: Component<IconProps>;
		open?: boolean;
	} = $props();

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button 
	type="button" 
	class="dialog-trigger {variant === 'destructive' ? 'trigger-destructive' : 'trigger-default'}" 
	onclick={() => (open = true)}
>
	{#if IconComp}
		<IconComp size={16} />
	{/if}
	{title}
</button>

{#if open}
	<div class="dialog-overlay" onclick={close} role="presentation">
		<div
			class="dialog-box"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<div class="dialog-header">
				<span class="eyebrow">{eyebrow}</span>
				<button type="button" class="dialog-close" onclick={close} aria-label="Close">
					<X size={16} />
				</button>
			</div>

			<h3 class="dialog-title">{title}</h3>
			
			<div class="dialog-scroll-wrapper">
				<div class="dialog-content">
					{@render children()}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ── Trigger Styles ── */
	.dialog-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: none;
		padding: 8px 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		border-radius: 2px;
		transition: background 0.12s;
	}
	.trigger-default {
		color: var(--ink, #1a1a1a);
	}
	.trigger-default:hover {
		background: rgba(0, 0, 0, 0.04);
	}
	.trigger-destructive {
		color: #b23a2a;
	}
	.trigger-destructive:hover {
		background: rgba(178, 58, 42, 0.06);
	}

	/* ── Overlay + Box Layout ── */
	.dialog-overlay {
		position: fixed;
		inset: 0;
		background: rgba(26, 26, 26, 0.45);
		display: grid;
		place-items: center;
		padding: 20px;
		z-index: 100;
		animation: fade-in 0.15s ease-out;
	}
	.dialog-box {
		width: min(440px, 100%); /* Slightly widened to gracefully host form layouts */
		background: #fff;
		border: 1px solid var(--border, #e5e5e5);
		padding: 28px 28px 24px;
		font-family: 'Jost', sans-serif;
		color: var(--ink, #1a1a1a);
		animation: rise-in 0.16s ease-out;
		display: flex;
		flex-direction: column;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes rise-in {
		from {
			opacity: 0;
			transform: translateY(6px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* ── Header details ── */
	.dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 14px;
	}
	.eyebrow {
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--copper, #b87333);
	}
	.dialog-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: transparent;
		border: none;
		color: var(--taupe, #8c857b);
		cursor: pointer;
		border-radius: 2px;
	}
	.dialog-close:hover {
		background: var(--panel, #f9f9f8);
		color: var(--ink, #1a1a1a);
	}

	.dialog-title {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: 1.6rem;
		line-height: 1.1;
		margin: 0 0 16px 0;
	}

	/* ── Scroll handling replacement for ScrollArea ── */
	.dialog-scroll-wrapper {
		width: 100%;
		overflow-y: auto;
		max-height: 60vh; /* Keeps dialog from overgrowing viewport height */
		padding-right: 4px;
	}
	
	/* Custom minimalist scrollbar to look polished without dependencies */
	.dialog-scroll-wrapper::-webkit-scrollbar {
		width: 5px;
	}
	.dialog-scroll-wrapper::-webkit-scrollbar-track {
		background: transparent;
	}
	.dialog-scroll-wrapper::-webkit-scrollbar-thumb {
		background: var(--border, #e5e5e5);
		border-radius: 10px;
	}

	.dialog-content {
		width: 100%;
		height: auto;
	}
</style>