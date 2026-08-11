<script>
	import { enhance } from '$app/forms';
	import { LogOut, X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages.js';

	let { action = '/dashboard/?/logout' } = $props();

	let open = $state(false);
	let deleting = $state(false);

	/** @type {HTMLButtonElement | undefined} */
	let trigger = $state();
	/** @type {HTMLDivElement | undefined} */
	let dialog = $state();

	function close() {
		if (deleting) return; // don't let a backdrop click cut off an in-flight request
		open = false;
		// Send focus back where it came from, rather than dropping it on <body>.
		trigger?.focus();
	}

	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}

	// Keep Tab inside the dialog while it is open — otherwise focus wanders into the
	// page behind it, which a screen reader still announces as reachable.
	/** @param {KeyboardEvent} e */
	function trapFocus(e) {
		if (e.key !== 'Tab' || !dialog) return;
		const focusable = /** @type {NodeListOf<HTMLElement>} */ (
			dialog.querySelectorAll(
				'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	// Move focus into the dialog as it opens.
	$effect(() => {
		if (open) {
			/** @type {HTMLButtonElement | null | undefined} */ (
				dialog?.querySelector('button')
			)?.focus();
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

<button type="button" class="logout-trigger" bind:this={trigger} onclick={() => (open = true)}>
	<LogOut size={16} />
	{m.logoutform_logout()}
</button>

{#if open}
	<div class="dialog-overlay" onclick={close} role="presentation">
		<div
			class="dialog-box"
			bind:this={dialog}
			onclick={(e) => e.stopPropagation()}
			onkeydown={trapFocus}
			role="dialog"
			aria-modal="true"
			aria-labelledby="logout-title"
			tabindex="-1"
		>
			<div class="dialog-header">
				<span class="eyebrow">{m.logoutform_eyebrow()}</span>
				<button
					type="button"
					class="dialog-close"
					onclick={close}
					aria-label={m.logoutform_close_label()}
				>
					<X size={16} />
				</button>
			</div>

			<h3 id="logout-title">{m.logoutform_title()}</h3>
			<p class="dialog-body-text">{m.logoutform_body_text()}</p>

			<div class="dialog-actions">
				<button type="button" class="btn btn-ghost" onclick={close} disabled={deleting}>
					{m.logoutform_cancel()}
				</button>
				<form
					method="post"
					{action}
					use:enhance={() => {
						deleting = true;

						return async ({ result, update }) => {
							deleting = false;
							if (result.type === 'success' || result.type === 'redirect') {
								toast.success(m.logoutform_success_toast());
							} else {
								toast.error(m.logoutform_error_toast());
							}
							await update();
						};
					}}
				>
					<button type="submit" class="btn btn-danger" disabled={deleting}>
						{#if deleting}
							<span class="spinner"></span> {m.logoutform_logging_out()}
						{:else}
							<LogOut size={16} /> {m.logoutform_logout()}
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ── Trigger ── */
	.logout-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: none;
		padding: 8px 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		color: #b23a2a;
		cursor: pointer;
		border-radius: 2px;
		transition: background 0.12s;
	}
	.logout-trigger:hover {
		background: rgba(178, 58, 42, 0.06);
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
		width: min(400px, 100%);
		background: #fff;
		border: 1px solid var(--border);
		padding: 28px 28px 24px;
		font-family: 'Jost', sans-serif;
		color: var(--ink);
		animation: rise-in 0.16s ease-out;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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
		color: var(--copper);
	}
	.dialog-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		background: transparent;
		border: none;
		color: var(--taupe);
		cursor: pointer;
		border-radius: 2px;
	}
	.dialog-close:hover {
		background: var(--panel);
		color: var(--ink);
	}

	h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: 1.6rem;
		line-height: 1.1;
		margin-bottom: 8px;
	}
	.dialog-body-text {
		font-size: 0.86rem;
		color: #433e39;
		line-height: 1.6;
		margin-bottom: 22px;
	}

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	/* ── Buttons (shared shape with the rest of the site) ── */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-height: 42px;
		padding: 0 18px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		cursor: pointer;
		font-family: 'Jost', sans-serif;
		border: 1px solid transparent;
	}
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.btn-ghost {
		background: #fff;
		border-color: var(--border);
		color: var(--ink);
	}
	.btn-ghost:hover:not(:disabled) {
		background: var(--panel);
	}
	.btn-danger {
		background: #fff;
		border-color: #b23a2a;
		color: #b23a2a;
	}
	.btn-danger:hover:not(:disabled) {
		background: #b23a2a;
		color: #fff;
	}

	/* ── Spinner ── */
	.spinner {
		width: 13px;
		height: 13px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		display: inline-block;
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
