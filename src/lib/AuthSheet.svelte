<script lang="ts">
	import { UserRoundPlus } from '@lucide/svelte';
	import DialogComp from './formComponents/DialogComp.svelte';
	import Google from './forms/Google.svelte';
	import Signup from './forms/Signup.svelte';
	import { invalidate } from '$app/navigation';

	let {
		data,
		loginOpen = $bindable(false),
		title = 'Log In',
		variant = 'ghost',
		signupOpen = $bindable(false),
		onAuthenticated    
	} = $props();

	async function onSuccess() {
		loginOpen = false;
		await invalidate('app:session');
		onAuthenticated?.();  
	}
</script>

<DialogComp {variant} class={variant !== 'ghost'? 'w-full! p-6! rounded-none! bg-[#1a1a1a] text-white' : ''}  {title}>
	<div class="auth">
		<div>
			<div class="auth-title">Sign in to place your order</div>
			<div class="auth-sub">So we can send your confirmation and let you track delivery.</div>
		</div>

		<h3 id="auth-heading" class="sr-only">Sign in to Gotera</h3>

		<!-- Continue with Google -->
		<div class="google-slot">
			<Google {onSuccess} hint={data?.lastAccount} />
		</div>

		<p class="tagline">One tap — fastest way in</p>

		<!-- Divider -->
		<div class="rule" role="separator"><span>or use email</span></div>

		<!-- Continue with email -->
		<div class="email-slot">
			<DialogComp
				variant="outline"
				title="Continue with email"
				IconComp={UserRoundPlus}
				bind:open={signupOpen}
			>
				<Signup {data} callBack="/subscribe" onSuccess={() => (signupOpen = false)} />
			</DialogComp>
		</div>

		<div class="terms">
			By continuing you agree to our <a href="/terms">Terms</a> and
			<a href="/privacy">Privacy Policy</a>.
		</div>
	</div>
</DialogComp>

<style>
	:root {
		--cream: #f5f1ea;
		--cream-card: #faf8f3;
		--ink: #16130f;
		--ink-soft: #2a2620;
		--copper: #b0622f;
		--muted: #8b8578;
		--line: #e2ddd2;
		--serif: Georgia, 'Times New Roman', serif;
		--sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	}
	.auth {

		background: var(--cream-card);
		padding: 20px 18px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.auth-title {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 500;
		font-size: 1.9rem;
		margin: 0 0 0.3rem;
	}
	.auth-sub {
		font-size: 12.5px;
		color: var(--muted);
		margin-bottom: 16px;
		line-height: 1.45;
	}

	.terms {
		margin-top: 14px;
		font-size: 12.5px;
		color: var(--muted);
		line-height: 1.5;
		text-align: center;
	}
	.terms a {
		color: var(--copper);
		text-decoration: none;
	}
	:global(.gotera-sheet) {
		left: 12px;
		right: 12px;
		bottom: 12px;
		width: auto;
		max-width: 496px;
		margin: 0 auto;

		border: 0;
		border-radius: 18px;
		padding: 0;
		box-shadow: 0 24px 60px rgba(40, 33, 22, 0.18);
	}

	/* kills shadcn's default pill handle + anything else it injects */
	:global(.gotera-sheet > :not(.auth-sheet)) {
		display: none;
	}
	:global([data-vaul-overlay]) {
		background: rgba(43, 37, 27, 0.16);
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.gotera-sheet),
		:global([data-vaul-overlay]) {
			transition: none;
		}
	}

	/* ---- Google pill (styles the button rendered inside <Google/>) ---- */

	.tagline {
		margin: -6px 0 0;
		text-align: center;
		font-size: 1.05rem;
		font-weight: 400;
		color: #8a8175;
	}

	/* ---- OR USE EMAIL divider ---- */
	.rule {
		display: flex;
		align-items: center;
		gap: 16px;
		margin: 6px 2px;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #9a9184;
	}
	.rule::before,
	.rule::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #d9d2c6;
	}

	/* ---- Outlined "Continue with email" (styles the DialogComp trigger) ---- */
	.email-slot :global(button) {
		width: 100%;
		min-height: 64px;
		border: 1px solid #cec6b8;
		border-radius: 4px;
		background: transparent;
		color: #7d7568;
		font-size: 1.05rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: pointer;
		transition:
			background 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}
	.email-slot :global(button:hover) {
		background: rgba(28, 26, 23, 0.03);
		border-color: #b9b0a0;
		color: #5c554a;
	}

	/* ---- Footer ---- */
	.footer {
		margin: 8px 0 0;
		text-align: center;
		font-size: 1.05rem;
		color: #6f665a;
	}
	.login-link {
		border: 0;
		background: none;
		padding: 0;
		font: inherit;
		color: #2f2b24;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (max-width: 480px) {
		:global(.gotera-sheet) {
			left: 12px;
			right: 12px;
		}
	}

		.sub-cta__btn { width: 100%; background: #1a1a1a; color: #faf8f4; border: none; padding: 16px; font-family: 'Jost', sans-serif; font-size: .8rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: background .15s; }

</style>
