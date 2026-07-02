<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
import './layout.css';
	import { Toaster } from 'svelte-sonner';
  	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { page } from '$app/state';



	let { data, children } = $props();

</script>



<svelte:head>
  <title>GOTERA — Premium Ethiopian Food</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<ModeWatcher />
<Toaster position="bottom-right" richColors closeButton />
<ProgressBar color="#bc3d00" zIndex={1000} />

{#if !page.url.pathname.startsWith('/dashboard')}

<nav class="nav">
  <div class="container nav-inner">
    <a href="/" class="logo">G O T E R A</a>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/subscribe">Subscribe</a>
      <a href="/about">About</a>
      <!-- <a href="/account">Account</a> -->
    </div>
    <div class="nav-right">
    {#if !data.user}
      
      <a href="/login" class="nav-signin">Sign In</a>
      <a href="/signup" class="nav-signin">Sign Up</a>
      <a href="/subscribe" class="btn-outline">Plans</a>
      <a href="/subscribe" class="btn">Subscribe</a>
    {:else}
      <a href="/account" class="btn-outline">Dashboard</a>
    {/if}
    
    </div>
  </div>
</nav>

<main >
  {@render children()}
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">G O T E R A</div>
        <p class="footer-tagline">Premium Ethiopian food built on authenticity, clarity, and restraint.</p>
      </div>
      <div>
        <h4>Site</h4>
        <div class="footer-links">
          <a href="/">Home</a>
          <a href="/subscribe">Subscribe</a>
          <a href="/about">About</a>
          <a href="/account">Account</a>
        </div>
      </div>
      <div>
        <h4>Legal</h4>
        <div class="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/subscription-terms">Subscription Terms</a>
          <a href="/delivery">Delivery</a>
          <a href="/allergens">Allergens</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 GOTERA Foods Ltd.</span>
      <span>Made &amp; packed in Ethiopia · Distributed in the UK</span>
    </div>
  </div>
</footer>
{:else}

  {@render children()}

{/if}

<style>
  /* --- GLOBAL ROOT CONFIGS --- */
  :global(:root) {
    --cream: #FAF8F4;
    --ink: #1A1A1A;
    --copper: #B5622A;
    --taupe: #7A746E;
    --border: #E8E4E0;
    --panel: #F5F2ED;
    --white: #fff;
    --max: 1180px;
  }
  
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :global(body) {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--ink);
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
  }

  /* --- SHARED BASE CLASSES --- */
  .container {
    width: min(var(--max), calc(100% - 28px));
    margin: auto;
  }

  .btn, .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 22px;
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: .12em;
    font-weight: 500;
    border-radius: 2px;
    transition: all .15s;
  }

  .btn {
    background: var(--copper);
    color: #fff;
    border: 1px solid var(--copper);
  }

  .btn:hover {
    background: #9a4f22;
  }

  .btn-outline {
    border: 1px solid rgba(181, 98, 42, .3);
    color: var(--copper);
    background: transparent;
  }

  .btn-outline:hover {
    background: rgba(181, 98, 42, .05);
  }

  /* --- NAVIGATION STYLES --- */
  .nav {
    position: sticky;
    top: 0;
    background: rgba(250, 248, 244, .92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    z-index: 100;
  }

  .nav-inner {
    min-height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .logo {
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #9A4F22;
    font-weight: 600;
  }

  .nav-links {
    display: flex;
    gap: 24px;
    font-size: .82rem;
    color: var(--taupe);
  }

  .nav-links a:hover {
    color: var(--ink);
  }

  .nav-right {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .nav-signin {
    font-size: .78rem;
    color: var(--taupe);
  }

  /* --- FOOTER STYLES --- */
  .footer {
    padding: 52px 0 26px;
    border-top: 1px solid var(--border);
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }

  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #9A4F22;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .footer-tagline {
    font-size: .84rem;
    color: var(--taupe);
  }

  .footer h4 {
    font-size: .68rem;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--copper);
    margin-bottom: 12px;
  }

  .footer-links {
    display: grid;
    gap: 8px;
    font-size: .88rem;
    color: var(--taupe);
  }

  .footer-links a:hover {
    color: var(--ink);
  }

  .footer-bottom {
    padding-top: 18px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    font-size: .76rem;
    color: var(--taupe);
  }

  /* --- RESPONSIVE BREAKPOINTS --- */
  @media(max-width: 960px) {
    .nav-links {
      display: none;
    }
  }

  @media(max-width: 580px) {
    .btn, .btn-outline {
      width: 100%;
    }
    .footer-grid {
      grid-template-columns: 1fr;
    }
    .nav-right .btn-outline {
      display: none;
    }
  }
</style>