<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { SignupSchema } from './schema';

	// `onSuccess` lets the dialog close after an in-place signup (when the user
	// is signed straight in). If your signup requires email verification first,
	// see the note below — in that case we DON'T call onSuccess.
	let {
		data,
		callBack = '/account',
		onSuccess
	}: {
		data: SuperValidated<Infer<SignupSchema>>;
		callBack?: string;
		onSuccess?: () => void;
	} = $props();

	let submitted = $state(false);
	let sentTo = $state('');

	// SPA mode: no server action, we sign up via authClient so the page stays put.
	const { form, errors } = superForm(data, { SPA: true });

	let loading = $state(false);

	async function handleSignUp(e: SubmitEvent) {
		e.preventDefault();
		if (!$form.name || !$form.email || !$form.password) {
			toast.error('Fill in your name, email and password.');
			return;
		}
		if ($form.password !== $form.confirmPassword) {
			toast.error('Passwords do not match.');
			return;
		}
		loading = true;
		const { error } = await authClient.signUp.email({
			name: $form.name,
			email: $form.email,
			password: $form.password
		});
		if (error) {
			toast.error(error.message ?? 'Could not create your account.');
			loading = false;
			return;
		}

		// ── If you require email verification before sign-in ──
		// Better Auth won't create a session yet; the user must click the email
		// link. So show the "check your inbox" state and DON'T close the dialog.
		// If instead you allow immediate sign-in on signup, delete this block
		// and use the invalidateAll()/onSuccess() path below.
		sentTo = $form.email;
		submitted = true;
		loading = false;

		// ── If signup signs them straight in (no verification gate) ──
		// await invalidateAll();
		// toast.success('Account created.');
		// loading = false;
		// onSuccess?.();
	}

	// let googleLoading = $state(false);
	// async function signInWithGoogle() {
	// 	googleLoading = true;
	// 	const { error } = await authClient.signIn.social({
	// 		provider: 'google',
	// 		callbackURL: callBack
	// 	});
	// 	if (error) {
	// 		toast.error(error.message ?? 'Could not continue with Google.');
	// 		googleLoading = false;
	// 	}
	// }



let googleLoading = $state(false);

async function signInWithGoogle() {
	googleLoading = true;

	// Ask Better Auth for the Google authorization URL WITHOUT redirecting.
	const { data: social, error } = await authClient.signIn.social({
		provider: 'google',
		callbackURL: '/auth/popup-callback', // where Google returns to (inside popup)
		disableRedirect: true                // <-- return the URL instead of navigating
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

<div class="auth-wrap">
	<div class="auth-card">
		{#if submitted}
			<div class="sent">
				<svg class="sent-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="24" cy="24" r="22" /><path d="M15 24.5l6 6 12-13" />
				</svg>
				<span class="eyebrow">Almost there</span>
				<h1>Check your inbox.</h1>
				<p>We've sent a verification link to <strong>{sentTo}</strong>. Click it to activate your account, then come back and subscribe.</p>
				<p class="fine">Didn't get it? Check spam, or give it a minute to arrive.</p>
			</div>
		{:else}
			<div class="brand">
				<span class="eyebrow">Create account</span>
				<h1>Join GOTERA.</h1>
				<p class="sub">Real injera, made in Ethiopia, delivered every month.</p>
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

			<form onsubmit={handleSignUp} class="form">
				<div class="field">
					<label class="field-label" for="name">Full name</label>
					<input id="name" name="name" class="input" autocomplete="name" bind:value={$form.name} />
					{#if $errors.name}<span class="form-error">{$errors.name}</span>{/if}
				</div>
				<div class="field">
					<label class="field-label" for="email">Email</label>
					<input id="email" name="email" type="email" class="input" autocomplete="email" bind:value={$form.email} />
					{#if $errors.email}<span class="form-error">{$errors.email}</span>{/if}
				</div>
				<div class="field">
					<label class="field-label" for="password">Password</label>
					<input id="password" name="password" type="password" class="input" autocomplete="new-password" bind:value={$form.password} />
					{#if $errors.password}<span class="form-error">{$errors.password}</span>{/if}
				</div>
				<div class="field">
					<label class="field-label" for="confirmPassword">Confirm password</label>
					<input id="confirmPassword" name="confirmPassword" type="password" class="input" autocomplete="new-password" bind:value={$form.confirmPassword} />
					{#if $errors.confirmPassword}<span class="form-error">{$errors.confirmPassword}</span>{/if}
				</div>

				<label class="opt-in">
					<input type="checkbox" bind:checked={$form.marketingOptIn} />
					<span>Send me occasional updates and offers.</span>
				</label>

				<button type="submit" class="btn btn-full" disabled={loading}>
					{loading ? 'Creating account…' : 'Create account'}
				</button>
			</form>
		{/if}
	</div>
</div>

<style>
	:global(:root) { --cream: #faf8f4; --ink: #1a1a1a; --copper: #b5622a; --taupe: #7a746e; --border: #e8e4e0; --panel: #f5f2ed; }
	.auth-wrap { min-height: 100vh; display: grid; place-items: center; padding: 40px 16px; background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%); font-family: 'Jost', sans-serif; color: var(--ink); }
	.auth-card { width: min(440px, 100%); background: #fff; border: 1px solid var(--border); padding: 40px 36px; }
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
	.field-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--copper); font-weight: 500; margin-bottom: 8px; }
	.input { width: 100%; min-height: 44px; border: 1px solid rgba(122, 116, 110, 0.22); background: #fff; padding: 0 14px; font-family: 'Jost', sans-serif; font-size: 0.9rem; color: var(--ink); }
	.input:focus { outline: none; border-color: var(--copper); }
	.form-error { display: block; margin-top: 6px; font-size: 0.76rem; color: #b23a2a; }
	.opt-in { display: flex; align-items: center; gap: 9px; font-size: 0.82rem; color: #433e39; cursor: pointer; }
	.opt-in input { width: 16px; height: 16px; accent-color: var(--copper); }
	.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500; border-radius: 2px; border: 1px solid var(--copper); background: var(--copper); color: #fff; cursor: pointer; transition: background 0.15s; font-family: 'Jost', sans-serif; text-decoration: none; }
	.btn:hover { background: #9a4f22; }
	.btn[disabled] { opacity: 0.6; cursor: not-allowed; }
	.btn-full { width: 100%; margin-top: 4px; }
	.sent { text-align: center; display: flex; flex-direction: column; align-items: center; }
	.sent .eyebrow, .sent h1 { text-align: center; }
	.sent-icon { width: 56px; height: 56px; color: var(--copper); margin-bottom: 20px; }
	.sent p { font-size: 0.9rem; color: var(--taupe); line-height: 1.65; margin: 4px 0 22px; max-width: 320px; }
	.sent strong { color: var(--ink); }
	.fine { margin-top: 16px; font-size: 0.76rem; color: rgba(122, 116, 110, 0.8); }
</style>