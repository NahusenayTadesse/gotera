<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import './layout.css';
  import { Toaster } from 'svelte-sonner';
  import { ProgressBar } from '@prgm/sveltekit-progress-bar';
  import { page } from '$app/state';

  let { data, children } = $props();

  // State handles for responsive layout
  let isDrawerOpen = $state(false);
  let isScrolled = $state(false);

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
  }

  function closeDrawer() {
    isDrawerOpen = false;
  }

  function handleScroll() {
    isScrolled = window.scrollY > 20;
  }
</script>

<svelte:window onscroll={handleScroll} />

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
  <nav class="nav desktop-only">
    <div class="container nav-inner">
      <a href="/" class="logo">G O T E R A</a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/subscribe">Subscribe</a>
        <a href="/about">About</a>
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

  <nav class="nav--hero mobile-only" class:nav--scrolled={isScrolled} aria-label="Site navigation">
    <a href="/" class="nav-logo" aria-label="GOTERA home">GOTERA</a>
    <button 
      class="hamburger" 
      class:open={isDrawerOpen} 
      onclick={toggleDrawer} 
      aria-label="Open menu" 
      aria-expanded={isDrawerOpen}
    >
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div role="presentation" class="overlay" class:open={isDrawerOpen} onclick={closeDrawer}></div>
  <div class="drawer" class:open={isDrawerOpen}>
    <div class="drawer-head">
      <span class="drawer-logo">GOTERA</span>
      <button class="drawer-close" onclick={closeDrawer} aria-label="Close menu">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <nav class="drawer-nav" aria-label="Main menu">
      <a href="/subscribe" onclick={closeDrawer} class="drawer-link">Subscribe</a>
      <a href="/about"     onclick={closeDrawer} class="drawer-link">About</a>
      <a href="/faq"       onclick={closeDrawer} class="drawer-link">FAQ</a>
      <a href="/gift"      onclick={closeDrawer} class="drawer-link">Give a gift</a>
      <a href="/account"   onclick={closeDrawer} class="drawer-link">My account</a>
    </nav>
    <div class="drawer-bottom">
      <a href="/subscribe" onclick={closeDrawer} class="drawer-cta">Subscribe from £6.50 →</a>
    </div>
  </div>

  <main>
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
        <span>© {new Date().getFullYear()} GOTERA Foods Ltd.</span>
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
    --copper-logo: #9A4F22;
    --taupe: #7A746E;
    --border: #E8E4E0;
    --panel: #F5F2ED;
    --white: #fff;
    --max: 1180px;
    --nav-h: 68px;
    --px: 20px;
    --ease-mid: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

  /* --- DESKTOP NAV --- */
  .nav {
    position: sticky;
    top: 0;
    background: rgba(250, 248, 244, .92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    z-index: 100;
  }

  .nav-inner {
    min-height: var(--nav-h);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .logo {
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--copper-logo);
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

  /* --- MOBILE NAV & DRAWER --- */
  .nav--hero {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: var(--nav-h);
    background: transparent;
    border-bottom: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--px);
    transition: background var(--ease-mid), border-color var(--ease-mid);
  }
  
  .nav--hero .nav-logo { 
    color: #fff; 
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: .18em;
    font-weight: 600;
  } 
  .nav--hero .hamburger span { background: #fff; }

  .nav--scrolled {
    background: rgba(250,248,244,.96) !important;
    border-bottom-color: var(--border) !important;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .nav--scrolled .nav-logo { color: var(--copper-logo) !important; }
  .nav--scrolled .hamburger span { background: var(--copper) !important; }

  .hamburger {
    width: 44px;
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }
  .hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--copper);
    transition: transform var(--ease-mid), opacity var(--ease-mid);
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .drawer {
    position: fixed;
    top: 0;
    right: -100%;
    width: 82%;
    max-width: 340px;
    height: 100dvh;
    background: var(--ink);
    z-index: 400;
    display: flex;
    flex-direction: column;
    transition: right .3s cubic-bezier(.4,0,.2,1);
    overflow-y: auto;
  }
  .drawer.open { right: 0; }

  .drawer-head {
    padding: 20px var(--px) 18px;
    border-bottom: 1px solid rgba(255,255,255,.07);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  .drawer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: .9rem;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--copper-logo);
  }
  .drawer-close {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
  }
  .drawer-close svg {
    width: 18px;
    height: 18px;
    stroke: rgba(255,255,255,.5);
    stroke-width: 1.5;
    fill: none;
  }

  .drawer-nav { flex: 1; padding: 8px 0; }

  .drawer-link {
    display: flex;
    align-items: center;
    padding: 17px var(--px);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-style: italic;
    color: var(--cream);
    border-bottom: 1px solid rgba(255,255,255,.05);
    transition: color 0.2s;
    min-height: 60px;
  }
  .drawer-link:active { color: var(--copper); }

  .drawer-bottom {
    padding: 24px var(--px) 32px;
    border-top: 1px solid rgba(255,255,255,.07);
    flex-shrink: 0;
  }
  .drawer-cta {
    display: block;
    text-align: center;
    padding: 15px;
    background: var(--copper);
    color: #fff;
    font-size: .72rem;
    letter-spacing: .14em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(26,26,26,.6);
    z-index: 300;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--ease-mid);
  }
  .overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  /* --- BUTTONS --- */
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
  .btn:hover { background: #9a4f22; }
  .btn-outline {
    border: 1px solid rgba(181, 98, 42, .3);
    color: var(--copper);
    background: transparent;
  }
  .btn-outline:hover { background: rgba(181, 98, 42, .05); }

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
  .footer-links a:hover { color: var(--ink); }
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

  /* --- RESPONSIVE BREAKPOINTS & VISIBILITY --- */
  .desktop-only { display: block; }
  .mobile-only { display: none; }

  @media(max-width: 960px) {
    .desktop-only { display: none; }
    .mobile-only { display: flex; }
  }

  @media(max-width: 580px) {
    .btn, .btn-outline {
      width: 100%;
    }
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>