<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { install, promptInstall } from '$lib/install.svelte';

	let showHint = $state(false);

	// Offered everywhere until installed. Where the browser gave us a prompt it opens the
	// real install dialog; elsewhere (iOS, Firefox, a dismissed Chrome prompt) it explains
	// the manual step instead.
	const available = $derived(!install.installed);

	function onclick() {
		if (install.prompt) promptInstall();
		else showHint = !showHint;
	}
</script>

{#if available}
	<div>
		<button
			type="button"
			class="install-row"
			aria-expanded={install.prompt ? undefined : showHint}
			{onclick}
		>
			<svg
				class="install-icon"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 13.5h11" />
			</svg>
			{m.app_install_row()}
		</button>
		{#if showHint}
			<p class="install-hint">
				{install.ios ? m.app_install_ios_body() : m.app_install_menu_body()}
			</p>
		{/if}
	</div>
{/if}

<style>
	.install-row {
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

	.install-row:hover {
		background: var(--panel);
		color: var(--ink);
	}

	.install-row:focus-visible {
		outline: 2px solid var(--copper);
		outline-offset: 2px;
	}

	.install-icon {
		width: 15px;
		height: 15px;
		opacity: 0.45;
		flex-shrink: 0;
	}

	.install-hint {
		padding: 2px 12px 0 37px;
		font-size: 0.7rem;
		line-height: 1.4;
		color: var(--taupe);
	}
</style>
