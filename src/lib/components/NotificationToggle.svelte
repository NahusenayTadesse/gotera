<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages.js';
	import {
		currentPushSubscription,
		pushSupported,
		subscribeToPush,
		unsubscribeFromPush
	} from '$lib/push';

	// Hidden until we know the browser can do push at all — an unusable switch is just noise.
	let supported = $state(false);
	let enabled = $state(false);
	let blocked = $state(false);
	let busy = $state(false);

	onMount(async () => {
		if (!pushSupported()) return;
		supported = true;
		blocked = Notification.permission === 'denied';
		enabled =
			Notification.permission === 'granted' && Boolean(await currentPushSubscription());
	});

	async function toggle() {
		busy = true;
		try {
			if (enabled) {
				await unsubscribeFromPush();
				enabled = false;
				return;
			}
			// The browser's permission prompt only ever appears here, in direct response to
			// the customer flipping this switch.
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				blocked = permission === 'denied';
				return;
			}
			await subscribeToPush();
			enabled = true;
		} catch (err) {
			console.error(err);
			toast.error(m.app_notify_failed());
		} finally {
			busy = false;
		}
	}
</script>

{#if supported}
	<div class="notify">
		<button
			type="button"
			role="switch"
			class="notify-row"
			aria-checked={enabled}
			disabled={busy || blocked}
			onclick={toggle}
		>
			<svg
				class="notify-icon"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<path d="M4 11V7a4 4 0 0 1 8 0v4l1.5 1.5h-11zM6.5 14h3" />
			</svg>
			<span class="notify-label">{m.app_notify_label()}</span>
			<span class="track" class:on={enabled}><span class="thumb"></span></span>
		</button>
		{#if blocked}
			<p class="notify-hint">{m.app_notify_blocked()}</p>
		{/if}
	</div>
{/if}

<style>
	.notify-row {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 12px;
		font: inherit;
		font-size: 0.83rem;
		color: var(--taupe);
		background: none;
		border: none;
		border-radius: 2px;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s;
	}

	.notify-row:hover:not(:disabled) {
		background: var(--panel);
		color: var(--ink);
	}

	.notify-row:disabled {
		cursor: default;
		opacity: 0.6;
	}

	.notify-row:focus-visible {
		outline: 2px solid var(--copper);
		outline-offset: 2px;
	}

	.notify-icon {
		width: 15px;
		height: 15px;
		opacity: 0.45;
		flex-shrink: 0;
	}

	.notify-label {
		flex: 1;
	}

	.track {
		position: relative;
		width: 26px;
		height: 15px;
		border-radius: 999px;
		background: var(--border);
		flex-shrink: 0;
		transition: background 0.2s;
	}

	.track.on {
		background: var(--copper);
	}

	.thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: #fff;
		transition: transform 0.2s;
	}

	.track.on .thumb {
		transform: translateX(11px);
	}

	.notify-hint {
		padding: 2px 12px 0 37px;
		font-size: 0.7rem;
		line-height: 1.4;
		color: var(--taupe);
	}
</style>
