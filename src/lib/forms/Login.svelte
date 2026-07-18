<script lang="ts">
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import type { LoginSchema } from '$lib/ZodSchema';
	import { loginSchema } from '$lib/ZodSchema';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { Eye, EyeOff } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	import { onMount } from 'svelte';

    onMount(() => {
        if (window.opener) {
            // Tell the parent window we are done
            window.opener.postMessage({ type: 'oauth-complete' }, window.location.origin);
            // Close this popup window
            window.close();
        }
    });

	// `onSuccess` lets the parent (the dialog) close itself after in-place login.
	let {
		data,
		action="?/login",
		callBack = '/account',
		onSuccess
	}: {
		data: SuperValidated<Infer<LoginSchema>>;
		callBack?: string;
		action?: string;
		onSuccess?: () => void;
	} = $props();

	// No server action now — we validate client-side and sign in via authClient,
	// so the page never navigates and the subscribe form keeps its state.
	const { form, errors,  enhance  } = superForm(data, {
	
	});
	 

	let loading = $state(false);

	let eye = $state(false);

	let EyeIcon = $derived(eye ? EyeOff : Eye);


let googleLoading = $state(false);

async function signInWithGoogle() {
	googleLoading = true;

	// Ask Better Auth for the Google authorization URL WITHOUT redirecting.
	const { data: social, error } = await authClient.signIn.social({
		provider: 'google',
		callbackURL: "/auth/popup-callback", // where Google returns to (inside popup)
		disableRedirect: true,
	
	});

	if (error || !social?.url) {
		toast.error(error?.message ?? 'Could not start Google sign-in.');
		googleLoading = false;
		return;
	}

	// Open that URL in a centered popup.
	const w = 500, h = 640;
	const left = window.screenX + (window.outerWidth - w) / 2;
	const top = window.screenY + (window.outerHeight - h) / 2;
	const popup = window.open(
		social.url,
		'gotera-google',
		`width=${w},height=${h},left=${left},top=${top}`
	);

	if (!popup) {
		toast.error('Popup blocked — allow popups and try again.');
		googleLoading = false;
		return;
	}

	// Wait for the popup to signal completion (or for the user to close it).
	const done = await new Promise<boolean>((resolve) => {
		function onMessage(e: MessageEvent) {
			if (e.origin !== window.location.origin) return;
			if (e.data?.type === 'oauth-complete') {
				cleanup();
				resolve(true);
			}
		}
		// If they close the popup manually, stop waiting.
		const poll = setInterval(() => {
			if (popup.closed) { cleanup(); resolve(false); }
		}, 500);
		function cleanup() {
			clearInterval(poll);
			window.removeEventListener('message', onMessage);
		}
		window.addEventListener('message', onMessage);
	});

	if (done) {
		await invalidateAll();   // refresh data.user — no navigation
		toast.success('Signed in.');
		onSuccess?.();           // close the dialog
	}
	googleLoading = false;
}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="auth-wrap">
	<div class="auth-card">
		<div class="logo-row">
			<a href="/" class="logo">G O T E R A</a>
		</div>

		<div class="brand">
			<span class="eyebrow">Welcome back</span>
			<h1>Sign in.</h1>
			<p class="sub">Enter your email to access your account.</p>
		</div>

		<button type="button" class="btn-google" onclick={signInWithGoogle} disabled={googleLoading}>
			<svg class="g-icon" viewBox="0 0 48 48" aria-hidden="true">
				<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
				<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
				<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
				<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
			</svg>
			{googleLoading ? 'Connecting…' : 'Continue with Google'}
		</button>

		<div class="divider">or</div>

		<form method="POST" {action} use:enhance class="form">
			<div class="field">
				<label class="field-label" for="email">Email</label>
				<input id="email" name="email" type="email" class="input" autocomplete="email" placeholder="m@example.com" bind:value={$form.email} required />
				{#if $errors.email}<span class="form-error">{$errors.email}</span>{/if}
			</div>

			<div class="field">
				<div class="label-row">
					<label class="field-label" for="password">Password</label>
					<a href="/forgot-password" class="forgot">Forgot your password?</a>
				</div>
				<div class="pw">
					<input id="password" name="password" type={eye ? 'text' : 'password'} class="input" autocomplete="current-password" bind:value={$form.password} required />
					<button type="button" class="pw-toggle" onclick={() => (eye = !eye)} title="Toggle password visibility" aria-label="Toggle password visibility">
						<EyeIcon class="pw-icon" />
					</button>
				</div>
				{#if $errors.password}<span class="form-error">{$errors.password}</span>{/if}
			</div>

			<button type="submit" class="btn btn-full" disabled={loading}>
				{loading ? 'Signing in…' : 'Sign in'}
			</button>

			<p class="alt">Don't have an account? <a href="/signup">Create one</a></p>
		</form>
	</div>
</div>

<style>
	:global(:root) { --cream: #faf8f4; --ink: #1a1a1a; --copper: #b5622a; --taupe: #7a746e; --border: #e8e4e0; --panel: #f5f2ed; }
	.auth-wrap { min-height: 100vh; display: grid; place-items: center; padding: 40px 16px; background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%); font-family: 'Jost', sans-serif; color: var(--ink); }
	.auth-card { width: min(440px, 100%); background: #fff; border: 1px solid var(--border); padding: 40px 36px; }
	.logo-row { display: flex; justify-content: center; margin-bottom: 20px; }
	.logo { font-family: 'Cormorant Garamond', serif; letter-spacing: 0.18em; text-transform: uppercase; color: #9a4f22; font-weight: 600; text-decoration: none; }
	.eyebrow { display: block; margin-bottom: 10px; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--copper); }
	h1 { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-style: italic; font-size: clamp(2rem, 6vw, 2.6rem); line-height: 1.02; margin-bottom: 8px; }
	.sub { font-size: 0.88rem; color: var(--taupe); line-height: 1.6; }
	.brand { margin-bottom: 24px; }
	.btn-google { display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: 48px; padding: 0 22px; border: 1px solid var(--border); border-radius: 2px; background: #fff; color: var(--ink); font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
	.btn-google:hover:not([disabled]) { background: var(--panel); border-color: rgba(122, 116, 110, 0.35); }
	.btn-google[disabled] { opacity: 0.6; cursor: not-allowed; }
	.g-icon { width: 18px; height: 18px; flex-shrink: 0; }
	.divider { display: flex; align-items: center; gap: 12px; margin: 18px 0; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--taupe); }
	.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
	.form { display: flex; flex-direction: column; gap: 16px; }
	.field { display: flex; flex-direction: column; }
	.label-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
	.field-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--copper); font-weight: 500; }
	.forgot { font-size: 0.74rem; color: var(--taupe); text-decoration: underline; text-underline-offset: 2px; }
	.forgot:hover { color: var(--copper); }
	.input { width: 100%; min-height: 44px; border: 1px solid rgba(122, 116, 110, 0.22); background: #fff; padding: 0 14px; font-family: 'Jost', sans-serif; font-size: 0.9rem; color: var(--ink); }
	.input:focus { outline: none; border-color: var(--copper); }
	.field-label + .input { margin-top: 8px; }
	.pw { position: relative; }
	.pw .input { padding-right: 44px; }
	.pw-toggle { position: absolute; top: 50%; right: 10px; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; background: none; border: none; padding: 4px; cursor: pointer; color: var(--taupe); }
	.pw-toggle:hover { color: var(--copper); }
	:global(.pw-icon) { height: 1.15rem; width: 1.15rem; }
	.form-error { display: block; margin-top: 6px; font-size: 0.76rem; color: #b23a2a; }
	.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500; border-radius: 2px; border: 1px solid var(--copper); background: var(--copper); color: #fff; cursor: pointer; transition: background 0.15s; font-family: 'Jost', sans-serif; text-decoration: none; }
	.btn:hover { background: #9a4f22; }
	.btn[disabled] { opacity: 0.6; cursor: not-allowed; }
	.btn-full { width: 100%; margin-top: 4px; }
	.alt { margin-top: 6px; text-align: center; font-size: 0.82rem; color: var(--taupe); }
	.alt a { color: var(--copper); text-decoration: underline; text-underline-offset: 2px; }
</style>