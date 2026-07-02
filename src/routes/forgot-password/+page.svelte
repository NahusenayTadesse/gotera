<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Loader2, AlertCircle, CheckCircle2 } from '@lucide/svelte';

	let email = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let isSuccess = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isLoading = true;
		errorMessage = '';
		isSuccess = false;

		const { error } = await authClient.requestPasswordReset({
			email,
			// Make sure this points exactly to your reset page route
			redirectTo: '/reset-password'
		});

		isLoading = false;
		if (error) {
			errorMessage = error.message || 'Something went wrong. Please try again.';
		} else {
			isSuccess = true;
		}
	}
</script>

<svelte:head>
	<title>Reset your password — GOTERA</title>
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

		{#if isSuccess}
			<div class="sent">
				<CheckCircle2 class="sent-icon" />
				<span class="eyebrow">Check your inbox</span>
				<h1>Link sent.</h1>
				<p>
					We've sent a password reset link to <strong>{email}</strong>. Follow it to set a new
					password.
				</p>
				<a href="/login" class="btn btn-full">Back to sign in</a>
				<p class="fine">Didn't get it? Check spam, or give it a minute to arrive.</p>
			</div>
		{:else}
			<div class="brand">
				<span class="eyebrow">Reset password</span>
				<h1>Forgot password?</h1>
				<p class="sub">Enter your email and we'll send you a link to reset it.</p>
			</div>

			<form onsubmit={handleSubmit} class="form">
				{#if errorMessage}
					<div class="alert">
						<AlertCircle class="alert-icon" />
						<span>{errorMessage}</span>
					</div>
				{/if}

				<div class="field">
					<label class="field-label" for="email">Email address</label>
					<input
						id="email"
						type="email"
						class="input"
						autocomplete="email"
						placeholder="name@example.com"
						bind:value={email}
						required
						disabled={isLoading}
					/>
				</div>

				<button type="submit" class="btn btn-full" disabled={isLoading}>
					{#if isLoading}
						<Loader2 class="spin btn-icon" />
						Sending link…
					{:else}
						Send reset link
					{/if}
				</button>

				<p class="alt"><a href="/login">Back to sign in</a></p>
			</form>
		{/if}
	</div>
</div>

<style>
	:global(:root) {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #b5622a;
		--taupe: #7a746e;
		--border: #e8e4e0;
		--panel: #f5f2ed;
	}

	.auth-wrap {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 40px 16px;
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		font-family: 'Jost', sans-serif;
		color: var(--ink);
	}

	.auth-card {
		width: min(440px, 100%);
		background: #fff;
		border: 1px solid var(--border);
		padding: 40px 36px;
	}
.logo-row {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}

	.logo {

		   font-family: 'Cormorant Garamond', serif;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #9A4F22;
    font-weight: 600;
	}

	.logo-dark {
		display: none;
	}
	:global(.dark) .logo-light {
		display: none;
	}
	:global(.dark) .logo-dark {
		display: block;
	}

	.eyebrow {
		display: block;
		margin-bottom: 10px;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
	}

	h1 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: clamp(2rem, 6vw, 2.6rem);
		line-height: 1.02;
		margin-bottom: 8px;
	}

	.sub {
		font-size: 0.88rem;
		color: var(--taupe);
		line-height: 1.6;
	}

	.brand {
		margin-bottom: 28px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.field {
		display: flex;
		flex-direction: column;
	}

	.field-label {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 8px;
	}

	.input {
		width: 100%;
		min-height: 44px;
		border: 1px solid rgba(122, 116, 110, 0.22);
		background: #fff;
		padding: 0 14px;
		font-family: 'Jost', sans-serif;
		font-size: 0.9rem;
		color: var(--ink);
	}

	.input:focus {
		outline: none;
		border-color: var(--copper);
	}

	.input:disabled {
		background: var(--panel);
		color: var(--taupe);
	}

	.alert {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 11px 14px;
		border: 1px solid rgba(178, 58, 42, 0.25);
		background: rgba(178, 58, 42, 0.06);
		color: #b23a2a;
		font-size: 0.82rem;
	}

	:global(.alert-icon) {
		height: 1rem;
		width: 1rem;
		flex-shrink: 0;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0 22px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		border: 1px solid var(--copper);
		background: var(--copper);
		color: #fff;
		cursor: pointer;
		transition: background 0.15s;
		font-family: 'Jost', sans-serif;
		text-decoration: none;
	}

	.btn:hover {
		background: #9a4f22;
	}

	.btn[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-full {
		width: 100%;
		margin-top: 4px;
	}

	:global(.btn-icon) {
		height: 1rem;
		width: 1rem;
		margin-right: 8px;
	}

	.alt {
		margin-top: 6px;
		text-align: center;
		font-size: 0.82rem;
		color: var(--taupe);
	}

	.alt a {
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* Success */
	.sent {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	:global(.sent-icon) {
		width: 52px;
		height: 52px;
		color: var(--copper);
		margin-bottom: 18px;
	}

	.sent p {
		font-size: 0.9rem;
		color: var(--taupe);
		line-height: 1.65;
		margin: 4px 0 22px;
		max-width: 320px;
	}

	.sent strong {
		color: var(--ink);
	}

	.fine {
		margin-top: 16px;
		font-size: 0.76rem;
		color: rgba(122, 116, 110, 0.8);
	}

	:global(.spin) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>