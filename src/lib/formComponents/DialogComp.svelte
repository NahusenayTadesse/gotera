<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { X } from '@lucide/svelte';
	import type { Snippet, Component } from 'svelte';
	import type { IconProps } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let {
		title,
		label,
		eyebrow = 'Manage account',
		children,
		variant = 'default',
		class: className,
		IconComp,
		open = $bindable(false)
	}: {
		/** Heading inside the dialog. */
		title: string;
		/** Trigger text, when it should differ from the heading. Defaults to title. */
		label?: string;
		eyebrow?: string;
		class: string;
		children: Snippet;
		variant?: 'default' | 'destructive' | 'outline' | 'ghost';
		IconComp?: Component<IconProps>;
		open?: boolean;
	} = $props();

	// const triggerClass = $derived(
	// 	{
	// 		default: 'trigger-default',
	// 		destructive: 'trigger-destructive',
	// 		pill: 'trigger-pill',
	// 		outline: 'trigger-outline'
	// 	}[variant] ?? 'trigger-default'
	// );
</script>

<Dialog.Root bind:open>
	<!-- We render every element via the `child` snippet, so Svelte's scoped
	     styles still apply and the design is unchanged — bits-ui just wires
	     up layering, focus, escape, scroll-lock and outside-click. -->
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} type="button" {variant} class={className}>
				{#if IconComp}
					<IconComp  />
				{/if}
				{label ?? title}
			</Button>
		{/snippet}
	</Dialog.Trigger>



		<Dialog.Content class="bg-[#faf8f3]">
	
							{@render children()}
			
		</Dialog.Content>

</Dialog.Root>

<style>
	/* ── Trigger: shared ── */
	.dialog-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: 1px solid transparent;
		padding: 8px 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		border-radius: 2px;
		transition: background 0.12s, border-color 0.15s, transform 0.12s ease;
	}

	.trigger-default { color: var(--ink, #1a1a1a); }
	.trigger-default:hover { background: rgba(0, 0, 0, 0.04); }
	.trigger-default:focus-visible { outline: 2px solid var(--copper, #b5622a); outline-offset: 2px; }

	.trigger-destructive { color: #b23a2a; }
	.trigger-destructive:hover { background: rgba(178, 58, 42, 0.06); }
	.trigger-destructive:focus-visible { outline: 2px solid #b23a2a; outline-offset: 2px; }

	/* ── Trigger: pill — for the ink AuthSheet only ── */
	.trigger-pill {
		width: 100%;
		min-height: 56px;
		padding: 0 22px;
		justify-content: center;
		gap: 9px;
		border-radius: 999px;
		background: rgba(250, 248, 244, 0.09);
		border-color: rgba(250, 248, 244, 0.16);
		color: var(--cream, #faf8f4);
		font-size: 0.94rem;
		letter-spacing: 0.01em;
	}
	.trigger-pill :global(svg) {
		color: #d98d55;
		flex-shrink: 0;
	}
	.trigger-pill:hover {
		background: rgba(250, 248, 244, 0.14);
		border-color: rgba(250, 248, 244, 0.28);
	}
	.trigger-pill:active { transform: scale(0.985); }
	.trigger-pill:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px #14130f, 0 0 0 4px var(--copper, #b5622a);
	}

	/* ── Trigger: outline — the cream AuthSheet "Continue with email" ── */
	.trigger-outline {
		width: 100%;
		min-height: 64px;
		padding: 0 22px;
		justify-content: center;
		gap: 10px;
		border-radius: 4px;
		background: transparent;
		border-color: #cec6b8;
		color: #7d7568;
		font-size: 1.05rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.trigger-outline :global(svg) { flex-shrink: 0; }
	.trigger-outline:hover {
		background: rgba(28, 26, 23, 0.03);
		border-color: #b9b0a0;
		color: #5c554a;
	}
	.trigger-outline:focus-visible {
		outline: 2px solid var(--copper, #b5622a);
		outline-offset: 2px;
	}

	/* ── Overlay + box ── */
	.dialog-overlay {
		position: fixed;
		inset: 0;
		background: rgba(26, 26, 26, 0.45);
		z-index: 1000;
		animation: fade-in 0.15s ease-out;
	}
	.dialog-box {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: min(440px, calc(100% - 40px));
		max-height: calc(100dvh - 40px);
		background: #fff;
		border: 1px solid var(--border, #e8e4e0);
		padding: 28px 28px 24px;
		font-family: 'Jost', sans-serif;
		color: var(--ink, #1a1a1a);
		z-index: 1001;
		animation: rise-in 0.16s ease-out;
		display: flex;
		flex-direction: column;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes rise-in {
		from { opacity: 0; transform: translate(-50%, calc(-50% + 6px)) scale(0.98); }
		to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
	}

	/* ── Header ── */
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
		color: var(--copper, #b5622a);
	}
	.dialog-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: transparent;
		border: none;
		color: var(--taupe, #7a746e);
		cursor: pointer;
		border-radius: 2px;
	}
	.dialog-close:hover { background: var(--panel, #f5f2ed); color: var(--ink, #1a1a1a); }
	.dialog-close:focus-visible { outline: 2px solid var(--copper, #b5622a); outline-offset: 1px; }

	.dialog-title {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: 1.6rem;
		line-height: 1.1;
		margin: 0 0 16px;
	}

	/* ── Scroll ── */
	.dialog-scroll-wrapper {
		width: 100%;
		overflow-y: auto;
		max-height: 60vh;
		padding-right: 4px;
	}
	.dialog-scroll-wrapper::-webkit-scrollbar { width: 5px; }
	.dialog-scroll-wrapper::-webkit-scrollbar-track { background: transparent; }
	.dialog-scroll-wrapper::-webkit-scrollbar-thumb {
		background: var(--border, #e8e4e0);
		border-radius: 10px;
	}

	.dialog-content { width: 100%; }

	@media (prefers-reduced-motion: reduce) {
		.dialog-overlay, .dialog-box { animation: none; }
		.dialog-trigger { transition: none; }
		.trigger-pill:active { transform: none; }
	}
</style>