<script lang="ts">
	import { UserRoundPlus } from '@lucide/svelte';
	import DialogComp from './formComponents/DialogComp.svelte';
	import Google from './forms/Google.svelte';
	import Signup from './forms/Signup.svelte';


	let { data, loginOpen = $bindable(false), signupOpen = $bindable(false) } = $props();
</script>

<section class="auth-sheet" aria-labelledby="auth-heading">
	<span class="grabber" aria-hidden="true"></span>
	<h2 id="auth-heading" class="sr-only">Sign in to Gotera</h2>

	<Google onSuccess={() => (loginOpen = false)} hint={data?.lastAccount} />

	<div class="rule" role="separator"><span>or</span></div>

	<DialogComp
		variant="pill"
		eyebrow="New here"
		title="Create an account"
		IconComp={UserRoundPlus}
		bind:open={signupOpen}
	>    
		<Signup data={data} callBack="/subscribe" onSuccess={() => (signupOpen = false)} />
	</DialogComp>

</section>

<style>
	.auth-sheet {
		--sheet-ink: #14130f;
		--sheet-cream: var(--cream);
		width: min(400px, 100%);
		margin: 0 auto;
		padding: 14px 18px 26px;
		background: var(--sheet-ink);
		border-radius: 26px 26px 0 0;
		font-family: 'Jost', sans-serif;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	/* Floating card instead of a docked sheet? swap the two lines below in. */
	/* border-radius: 26px; margin: 0 auto 24px; */

	.grabber {
		width: 34px;
		height: 3px;
		border-radius: 999px;
		background: rgba(250, 248, 244, 0.16);
		margin: 0 auto 6px;
	}

	.rule {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 0 4px;
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(250, 248, 244, 0.45);
	}
	.rule::before,
	.rule::after {
		content: '';
		flex: 1;
		height: 1px;
		background: rgba(250, 248, 244, 0.14);
	}

	.foot {
		margin: 0;
		text-align: center;
		font-size: 0.68rem;
		font-weight: 300;
		color: rgba(250, 248, 244, 0.42);
	}
	.foot button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		color: #d98d55;
		border-bottom: 1px solid rgba(217, 141, 85, 0.4);
	}
	.foot button:hover { border-bottom-color: #d98d55; }

	.sr-only {
		position: absolute;
		width: 1px; height: 1px;
		padding: 0; margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (max-width: 480px) {
		.auth-sheet { width: 100%; border-radius: 22px 22px 0 0; }
	}
</style>