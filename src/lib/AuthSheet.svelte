<script lang="ts">
  import { UserRoundPlus } from '@lucide/svelte';
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import DialogComp from './formComponents/DialogComp.svelte';
  import Google from './forms/Google.svelte';
  import Signup from './forms/Signup.svelte';
	import Button from './components/ui/button/button.svelte';

  let { data, loginOpen = $bindable(false), signupOpen = $bindable(false) } = $props();
</script>

<Drawer.Root bind:open={loginOpen}>

	 <!-- <Drawer.Trigger class="order">Order — £6.50</Drawer.Trigger> -->

  <p class="secondary text-sm">
    Already have an account?
    <Drawer.Trigger class="link text-primary" 		>
			{#snippet child({ props })}
			<Button type="button" {...props}  variant="ghost" > 
		
		 Log in </Button>
		 {/snippet}
		 </Drawer.Trigger>
  </p>
  <Drawer.Content class="gotera-sheet">
    <section class="auth-sheet" aria-labelledby="auth-heading">
      <span class="grabber" aria-hidden="true"></span>

      <Drawer.Title id="auth-heading" class="sr-only">Sign in to Gotera</Drawer.Title>

      <Google onSuccess={() => (loginOpen = false)} hint={data?.lastAccount} />

      <div class="rule" role="separator"><span>or</span></div>

      <DialogComp
        variant="pill"
        eyebrow="New here"
        title="Create an account"
        IconComp={UserRoundPlus}
        bind:open={signupOpen}
      >
        <Signup {data} callBack="/subscribe" onSuccess={() => (signupOpen = false)} />
      </DialogComp>
    </section>
  </Drawer.Content>
</Drawer.Root>

<style>
  /* --- shadcn/vaul chrome overrides: match the mockup exactly --- */
  :global(.gotera-sheet) {
    left: 12px;
    right: 12px;
    bottom: 12px;
    width: auto;
    max-width: 496px;
    margin: 0 auto;
    background: #111010;
    border: 0;
    border-radius: 0; /* mockup sheet is square */
    padding: 0;
  }
  /* kills shadcn's default pill handle + anything else it injects */
  :global(.gotera-sheet > :not(.auth-sheet)) {
    display: none;
  }
  :global([data-vaul-overlay]) {
    background: rgba(17, 16, 16, 0.3);
  }
  @media (prefers-reduced-motion: reduce) {
    :global(.gotera-sheet),
    :global([data-vaul-overlay]) {
      transition: none;
    }
  }

  .auth-sheet {
    width: 100%;
    padding: 26px 20px 20px;
    background: #111010;
    color: #fbf7f2;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .grabber {
    width: 34px;
    height: 3px;
    border-radius: 999px;
    background: rgba(250, 248, 244, 0.16);
    margin: -8px auto 2px;
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
    color: #b9b2aa;
  }
  .rule::before,
  .rule::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(250, 248, 244, 0.14);
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
</style>