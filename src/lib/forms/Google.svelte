<script lang="ts">
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

	const initials = $derived(
		(hint?.name ?? hint?.email ?? '')
			.split(/[\s@._-]+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((p) => p[0].toUpperCase())
			.join('')
	);

	async function signInWithGoogle() {
		googleLoading = true;

		const { data: social, error } = await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/auth/popup-callback',
			disableRedirect: true
		});

		if (error || !social?.url) {
			toast.error(error?.message ?? 'Google sign-in is unavailable right now. Try again.');
			googleLoading = false;
			return;
		}

		const w = 500,
			h = 640;
		const left = window.screenX + (window.outerWidth - w) / 2;
		const top = window.screenY + (window.outerHeight - h) / 2;
		const popup = window.open(social.url, 'gotera-google', `width=${w},height=${h},left=${left},top=${top}`);

		if (!popup) {
			toast.error('Your browser blocked the sign-in window. Allow popups for this site, then try again.');
			googleLoading = false;
			return;
		}

		const done = await new Promise<boolean>((resolve) => {
			function onMessage(e: MessageEvent) {
				if (e.origin !== window.location.origin) return;
				if (e.data?.type === 'oauth-complete') {
					cleanup();
					resolve(true);
				}
			}
			const poll = setInterval(() => {
				if (popup.closed) {
					cleanup();
					resolve(false);
				}
			}, 500);
			function cleanup() {
				clearInterval(poll);
				window.removeEventListener('message', onMessage);
			}
			window.addEventListener('message', onMessage);
		});

		if (done) {
			await invalidateAll();
			toast.success('Signed in.');
			onSuccess?.();
		}
		googleLoading = false;
	}
</script>

<button
	type="button"
	class="btn-google"
	onclick={signInWithGoogle}
	disabled={googleLoading}
	aria-busy={googleLoading}
>
	<span class="mark" aria-hidden="true">
		{#if googleLoading}
			<span class="spinner"></span>
		{:else}
			<svg class="g-icon" viewBox="0 0 48 48">
				<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
				<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
				<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
				<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
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
	{/if}
</button>

<style>
.btn-google {
	display: grid;
	grid-template-columns: 20px 1fr 30px;
	align-items: center;
	gap: 12px;
	width: 100%;
	min-height: 56px;
	padding: 0 13px 0 18px;
	border: none;
	border-radius: 999px;
	background: var(--cream);
	color: var(--ink);
	font-family: 'Jost', sans-serif;
	font-size: 0.94rem;
	font-weight: 500;
	letter-spacing: 0.01em;
	cursor: pointer;
	transition: transform 0.12s ease, background 0.15s;
}
.btn-google:hover:not([disabled]) { background: #fff; }
.btn-google:active:not([disabled]) { transform: scale(0.985); }
.btn-google:focus-visible {
	outline: none;
	box-shadow: 0 0 0 2px #14130f, 0 0 0 4px var(--copper);
}
.btn-google[disabled] { opacity: 0.7; cursor: progress; }

.mark { display: grid; place-items: center; width: 20px; height: 20px; }
.g-icon { width: 19px; height: 19px; }
.label { text-align: left; }

.spinner {
	width: 15px; height: 15px;
	border: 1.5px solid rgba(26, 26, 26, 0.15);
	border-top-color: var(--copper);
	border-radius: 50%;
	animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.chip {
	display: grid;
	place-items: center;
	width: 30px; height: 30px;
	border-radius: 50%;
	background: var(--copper);
	color: var(--cream);
	font-size: 0.66rem;
	font-weight: 500;
	letter-spacing: 0.06em;
	overflow: hidden;
}
.chip img { width: 100%; height: 100%; object-fit: cover; }

@media (prefers-reduced-motion: reduce) {
	.spinner { animation-duration: 2s; }
	.btn-google { transition: none; }
	.btn-google:active { transform: none; }
}
</style>