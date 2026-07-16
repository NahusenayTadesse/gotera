<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { Snippet, Component } from 'svelte';
	import type { IconProps } from '@lucide/svelte';

	let {
		title,
		label,
		eyebrow = 'Manage account',
		children,
		variant = 'default',
		IconComp,
		open = $bindable(false)
	}: {
		/** Heading inside the dialog. */
		title: string;
		/** Trigger text, when it should differ from the heading. Defaults to title. */
		label?: string;
		eyebrow?: string;
		children: Snippet;
		variant?: 'default' | 'destructive' | 'pill';
		IconComp?: Component<IconProps>;
		open?: boolean;
	} = $props();

	const triggerClass = $derived(
		{
			default: 'trigger-default',
			destructive: 'trigger-destructive',
			pill: 'trigger-pill'
		}[variant]
	);

	function close() {
		open = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button type="button" class="dialog-trigger {triggerClass}" onclick={() => (open = true)}>
	{#if IconComp}
		<IconComp size={variant === 'pill' ? 17 : 16} />
	{/if}
	{label ?? title}
</button>

{#if open}
	<div class="dialog-overlay" onclick={close} role="presentation">
		<div class="dialog-box" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
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

	/* ── Overlay + box ── */
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
		width: min(440px, 100%);
		background: #fff;
		border: 1px solid var(--border, #e8e4e0);
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
		from { opacity: 0; transform: translateY(6px) scale(0.98); }
		to { opacity: 1; transform: translateY(0) scale(1); }
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