<script lang="ts">
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import type { LoginSchema } from '$lib/ZodSchema';
	import { Eye, EyeOff } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { data, action = '?/login' }: { data: SuperValidated<Infer<LoginSchema>>; action: string } =
		$props();

	const { form, errors, enhance, message } = superForm(data, {});

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else toast.success($message.text);
		}
	});

	let eye = $state(false);
	let EyeIcon = $derived(eye ? EyeOff : Eye);
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

		<form method="POST" {action} use:enhance class="form">
			<div class="field">
				<label class="field-label" for="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					class="input"
					autocomplete="email"
					placeholder="m@example.com"
					bind:value={$form.email}
					required
				/>
				{#if $errors.email}<span class="form-error">{$errors.email}</span>{/if}
			</div>

			<div class="field">
				<div class="label-row">
					<label class="field-label" for="password">Password</label>
					<a href="/forgot-password" class="forgot">Forgot your password?</a>
				</div>
				<div class="pw">
					<input
						id="password"
						name="password"
						type={eye ? 'text' : 'password'}
						class="input"
						autocomplete="current-password"
						bind:value={$form.password}
						required
					/>
					<button
						type="button"
						class="pw-toggle"
						onclick={() => (eye = !eye)}
						title="Toggle password visibility"
						aria-label="Toggle password visibility"
					>
						<EyeIcon class="pw-icon" />
					</button>
				</div>
				{#if $errors.password}<span class="form-error">{$errors.password}</span>{/if}
			</div>

			<button type="submit" class="btn btn-full">Sign in</button>

			<p class="alt">Don't have an account? <a href="/signup">Create one</a></p>
		</form>
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

	/* Preserve the light/dark logo swap without Tailwind's dark: utilities. */
	
	

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

	.label-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.field-label {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
	}

	.forgot {
		font-size: 0.74rem;
		color: var(--taupe);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.forgot:hover {
		color: var(--copper);
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

	.field-label + .input {
		margin-top: 8px;
	}

	.pw {
		position: relative;
	}

	.pw .input {
		padding-right: 44px;
	}

	.pw-toggle {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 4px;
		cursor: pointer;
		color: var(--taupe);
	}

	.pw-toggle:hover {
		color: var(--copper);
	}

	:global(.pw-icon) {
		height: 1.15rem;
		width: 1.15rem;
	}

	.form-error {
		display: block;
		margin-top: 6px;
		font-size: 0.76rem;
		color: #b23a2a;
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

	.btn-full {
		width: 100%;
		margin-top: 4px;
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
</style>