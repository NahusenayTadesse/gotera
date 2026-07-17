<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let {
		onSuccess,
		hint
	}: {
		onSuccess?: () => void;
		/** Optional last-used account, shown as a chip on the right of the button. */
		hint?: { name?: string; email?: string; image?: string };
	} = $props();

	let googleLoading = $state(false);
	let shell = $state<HTMLDivElement>();
	let gsiHost = $state<HTMLDivElement>();
	let ro: ResizeObserver | undefined;

	const initials = $derived(
		(hint?.name ?? hint?.email ?? '')
			.split(/[\s@._-]+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((p) => p[0].toUpperCase())
			.join('')
	);

	// Google caps renderButton width at 400px and fixes height at ~44px for "large".
	// We render at a known size, then scale the (invisible) node to cover our shell.
	const RENDER_W = 400;
	const RENDER_H = 44;

	function fit() {
		if (!shell || !gsiHost) return;
		const { width, height } = shell.getBoundingClientRect();
		if (!width || !height) return;
		gsiHost.style.setProperty('--sx', String(width / RENDER_W));
		gsiHost.style.setProperty('--sy', String(height / RENDER_H));
	}

	onMount(async () => {
		try {
			await authClient.oneTap({
				fetchOptions: {
					onSuccess: async () => {
						await invalidateAll();
						toast.success('Signed in.');
						onSuccess?.();
					},
					onError: (ctx) => {
						googleLoading = false;
						toast.error(ctx.error?.message ?? 'Google sign-in failed. Try again.');
					}
				},
				// Plain div container — NOT the styled <button>.
				button: {
					container: gsiHost!,
					config: {
						theme: 'outline',
						size: 'large',
						type: 'standard',
						text: 'signin_with',
						shape: 'pill',
						logo_alignment: 'left',
						width: RENDER_W
					}
				}
			});
		} catch (e) {
			toast.error('Google sign-in is unavailable right now.');
			return;
		}

		fit();
		ro = new ResizeObserver(fit);
		if (shell) ro.observe(shell);

		// Google injects asynchronously; re-fit once the node lands.
		const mo = new MutationObserver(() => fit());
		if (gsiHost) mo.observe(gsiHost, { childList: true, subtree: true });
		setTimeout(() => mo.disconnect(), 8000);
	});

	onDestroy(() => ro?.disconnect());
	
</script>

<div class="google-shell" bind:this={shell}>
	<!-- Visual only. Not focusable, not clickable — the real GSI button sits on top. -->
	<div class="btn-google" aria-hidden="true">
		<span class="mark">
			{#if googleLoading}
				<span class="spinner"></span>
			{:else}
				<svg class="g-icon" viewBox="0 0 48 48">
					<path
						fill="#EA4335"
						d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
					/>
					<path
						fill="#4285F4"
						d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
					/>
					<path
						fill="#FBBC05"
						d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
					/>
					<path
						fill="#34A853"
						d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
					/>
				</svg>
			{/if}
		</span>

		<span class="label">{googleLoading ? 'Opening Google…' : 'Continue with Google'}</span>

		{#if hint && !googleLoading}
			<span class="chip" title={hint.email}>
				{#if hint.image}
					<img src={hint.image} alt="" />
				{:else}
					{initials}
				{/if}
			</span>
		{:else}
			<span></span>
		{/if}
	</div>

	<!-- Real Google button: invisible, stretched over the shell, receives the click. -->
	<div class="gsi-host" bind:this={gsiHost} onclick={() => (googleLoading = true)}></div>
</div>

<style>
	.google-shell {
		position: relative;
		width: 100%;
		min-height: 56px;
		border-radius: 999px;
		background: var(--cream);
		transition: background 0.15s;
	}
	.google-shell:hover {
		background: #fff;
	}
	/* Focus ring driven by the real (invisible) Google button underneath. */
	.google-shell:has(.gsi-host :global(:focus-visible)) {
		box-shadow:
			0 0 0 2px #14130f,
			0 0 0 4px var(--copper);
	}

	.btn-google {
		display: grid;
		grid-template-columns: 20px 1fr 30px;
		align-items: center;
		gap: 12px;
		width: 100%;
		min-height: 56px;
		padding: 0 13px 0 18px;
		border-radius: 999px;
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		font-size: 0.94rem;
		font-weight: 500;
		letter-spacing: 0.01em;
		pointer-events: none;
	}

	.gsi-host {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		border-radius: 999px;
		/* Not display:none / visibility:hidden — GSI needs a laid-out, hit-testable box. */
		opacity: 0.0001;
		cursor: pointer;
	}
	/* Google's injected wrapper — must be :global(), Svelte can't scope foreign DOM. */
	.gsi-host :global(> div) {
		transform-origin: top left;
		transform: scale(var(--sx, 1), var(--sy, 1));
	}

	.mark {
		display: grid;
		place-items: center;
		width: 20px;
		height: 20px;
	}
	.g-icon {
		width: 19px;
		height: 19px;
	}
	.label {
		text-align: left;
	}

	.spinner {
		width: 15px;
		height: 15px;
		border: 1.5px solid rgba(26, 26, 26, 0.15);
		border-top-color: var(--copper);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.chip {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--copper);
		color: var(--cream);
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		overflow: hidden;
	}
	.chip img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation-duration: 2s;
		}
		.google-shell {
			transition: none;
		}
	}
</style>