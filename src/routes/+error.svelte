<script>
	import { page } from "$app/state";

</script>

<svelte:head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta name="description" content="The page you were looking for could not be found."/>
  <title>GOTERA — Page not found</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
  
  </svelte:head>    
  <style>
  /* BASE CSS */
/* ============================================================
   GOTERA MOBILE — BASE CSS
   Version 1.0 — Single source of truth
   
   Import this file in Next.js as globals.css
   Every token, every shared component, every utility.
   Page-specific styles go in the page component only.
   
   TABLE OF CONTENTS
   1.  Design tokens
   2.  Reset
   3.  Typography base
   4.  Layout utilities
   5.  Navigation — standard
   6.  Navigation — transparent (homepage hero)
   7.  Drawer
   8.  Overlay
   9.  Buttons
   10. Form elements
   11. Cards — plan
   12. Cards — addon carousel
   13. Cards — info / stat / proof
   14. Section patterns
   15. Ticker
   16. Hero patterns
   17. Sticky bottom bar
   18. Step indicator + progress bar
   19. Tab bar (account)
   20. Footer
   21. Page-level layout helpers
   22. Confirmation / success bands
   23. Auth page layout
   24. Bottom drawer (account updates)
   25. Utility classes
============================================================ */


/* ============================================================
   1. DESIGN TOKENS
============================================================ */
:root {
  /* — Colour — */
  --cream:        #FAF8F4;
  --panel:        #F5F2ED;
  --border:       #E8E4E0;
  --taupe:        #7A746E;
  --copper:       #B5622A;   /* accent — buttons, prices, eyebrows, accents */
  --copper-logo:  #9A4F22;   /* logo and footer wordmark only */
  --copper-dark:  #7A3D18;   /* active/hover state */
  --ink:          #1A1A1A;
  --success:      #2E7D32;
  --success-bg:   rgba(46,125,50,.06);
  --success-bd:   rgba(46,125,50,.2);
  --error:        #A33A2B;
  --error-bg:     rgba(163,58,43,.05);
  --error-bd:     rgba(163,58,43,.2);
  --whatsapp:     #25D366;

  /* — Typography — */
  --serif:  'Cormorant Garamond', Georgia, serif;
  --sans:   'Jost', system-ui, -apple-system, sans-serif;

  /* — Type scale — */
  --t-hero:   3.2rem;   /* line-height: .95 */
  --t-h1:     2.2rem;   /* line-height: 1.0 */
  --t-h2:     1.8rem;   /* line-height: 1.05 */
  --t-h3:     1.3rem;   /* line-height: 1.1 */
  --t-h4:     1.1rem;   /* line-height: 1.15 */
  --t-body:   15px;     /* NEVER below 15px on mobile */
  --t-small:  13px;
  --t-label:  11px;     /* form labels, eyebrows */
  --t-micro:  10px;     /* tags, chips */
  --t-input:  16px;     /* NEVER below 16px — iOS zooms on focus */

  /* — Spacing — */
  --px:       20px;     /* horizontal page padding */
  --section:  36px;     /* vertical section spacing */
  --card-p:   16px;     /* card internal padding */
  --gap-xs:   6px;
  --gap-sm:   8px;
  --gap-md:   12px;
  --gap-lg:   20px;

  /* — Chrome — */
  --nav-h:    56px;
  --sticky-h: 88px;     /* includes iPhone safe area */
  --radius:   0px;      /* GOTERA uses sharp edges everywhere */

  /* — Transitions — */
  --ease:     .18s ease;
  --ease-mid: .25s ease;
  --ease-slow:.35s ease;

  /* — Touch targets — */
  --touch:    48px;     /* minimum interactive element height */
}


/* ============================================================
   2. RESET
============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}
html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}
body {
  font-family: var(--sans);
  background: var(--cream);
  color: var(--ink);
  overflow-x: hidden;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
a { text-decoration: none; color: inherit; }
button { font-family: var(--sans); cursor: pointer; border: none; background: none; }
img { display: block; width: 100%; height: auto; }
input, textarea, select { font-family: var(--sans); }
ul, ol { list-style: none; }


/* ============================================================
   3. TYPOGRAPHY BASE
============================================================ */
h1, h2, h3, h4 {
  font-family: var(--serif);
  font-weight: 600;
  font-style: italic;
  color: var(--ink);
}
h1 { font-size: var(--t-h1); line-height: 1.0; }
h2 { font-size: var(--t-h2); line-height: 1.05; }
h3 { font-size: var(--t-h3); line-height: 1.1; }
h4 { font-size: var(--t-h4); line-height: 1.15; }
p  { font-size: var(--t-body); color: var(--taupe); line-height: 1.7; }

.eyebrow {
  font-family: var(--sans);
  font-size: var(--t-micro);
  font-weight: 500;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--copper);
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.eyebrow-line {
  width: 16px;
  height: 1px;
  background: var(--copper);
  flex-shrink: 0;
}

/* Serif price/number display */
.price-display {
  font-family: var(--serif);
  font-size: 1.9rem;
  color: var(--copper);
  line-height: 1;
}
.price-note {
  font-size: var(--t-micro);
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
}


/* ============================================================
   4. LAYOUT UTILITIES
============================================================ */
.page-wrap {
  max-width: 480px;
  margin: 0 auto;
}
.px { padding-left: var(--px); padding-right: var(--px); }
.section-block {
  padding: var(--section) var(--px);
  border-bottom: 1px solid var(--border);
}
.section-block:last-of-type { border-bottom: none; }

/* Full bleed — breaks out of px constraint */
.full-bleed {
  margin-left: calc(-1 * var(--px));
  margin-right: calc(-1 * var(--px));
}

/* Divider */
.divider {
  height: 1px;
  background: var(--border);
  margin: var(--gap-lg) 0;
}

/* Section label — used above grouped content */
.section-label {
  display: block;
  font-size: var(--t-label);
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--copper);
  font-weight: 500;
  margin-bottom: 14px;
}


/* ============================================================
   5. NAVIGATION — STANDARD (sticky cream)
   Used on all pages except homepage hero state
============================================================ */
.nav {
  position: sticky;
  top: 0;
  z-index: 200;
  height: var(--nav-h);
  background: rgba(250,248,244,.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--px);
  transition: background var(--ease-mid), border-color var(--ease-mid);
}
.nav-logo {
  font-family: var(--serif);
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--copper-logo);
  line-height: 1;
}
.nav-spacer { width: 44px; } /* balances hamburger on the right */

/* Back button variant */
.nav-back {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: .78rem;
  color: var(--taupe);
  background: none;
  border: none;
  cursor: pointer;
  min-height: var(--touch);
  padding: 0;
  font-family: var(--sans);
}
.nav-back svg {
  width: 14px;
  height: 14px;
  stroke: var(--taupe);
  stroke-width: 1.8;
  fill: none;
}

/* Confirmation nav — centered logo only */
.nav-centered {
  position: static;
  height: var(--nav-h);
  background: rgba(250,248,244,.96);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--px);
}


/* ============================================================
   6. NAVIGATION — TRANSPARENT (homepage hero only)
   Becomes .nav--scrolled on scroll via JS
============================================================ */
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
.nav--hero .nav-logo { color: #fff; } /* turns to --copper-logo on scroll via .nav--scrolled */
.nav--hero .hamburger span { background: #fff; }

.nav--scrolled {
  background: rgba(250,248,244,.96) !important;
  border-bottom-color: var(--border) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.nav--scrolled .nav-logo { color: var(--copper-logo) !important; }
.nav--scrolled .hamburger span { background: var(--copper) !important; }


/* ============================================================
   7. HAMBURGER
============================================================ */
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


/* ============================================================
   8. DRAWER
============================================================ */
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
  font-family: var(--serif);
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

/* Subscribe always first — primary action */
.drawer-link {
  display: flex;
  align-items: center;
  padding: 17px var(--px);
  font-family: var(--serif);
  font-size: 1.6rem;
  font-style: italic;
  color: var(--cream);
  border-bottom: 1px solid rgba(255,255,255,.05);
  transition: color var(--ease);
  min-height: 60px;
}
.drawer-link:active { color: var(--copper); }

.drawer-bottom {
  padding: var(--gap-lg) var(--px) 32px;
  border-top: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.drawer-cta {
  display: block;
  text-align: center;
  padding: 15px;
  background: var(--copper);
  color: #fff;
  font-size: var(--t-label);
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 500;
}


/* ============================================================
   9. OVERLAY (behind drawer and bottom sheets)
============================================================ */
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


/* ============================================================
   10. BUTTONS
   All buttons minimum var(--touch) height
============================================================ */
.btn {
  display: block;
  width: 100%;
  text-align: center;
  font-family: var(--sans);
  font-size: var(--t-label);
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 500;
  min-height: var(--touch);
  padding: 14px var(--px);
  cursor: pointer;
  transition: background var(--ease), color var(--ease), border-color var(--ease);
  border: none;
  line-height: 1;
}

/* Primary — white on copper */
.btn--primary {
  background: var(--copper);
  color: #fff;
}
.btn--primary:active { background: var(--copper-dark); } /* #7A3D18 */

/* Outline — copper on white */
.btn--outline {
  background: transparent;
  color: var(--copper);
  border: 1px solid rgba(181,98,42,.3);
}
.btn--outline:active { background: rgba(181,98,42,.05); }

/* Ghost — taupe, no border */
.btn--ghost {
  background: transparent;
  color: var(--taupe);
}

/* Dark — white on ink */
.btn--dark {
  background: var(--ink);
  color: #fff;
}
.btn--dark:active { background: #333; }

/* Danger — error on light red */
.btn--danger {
  background: var(--error-bg);
  color: var(--error);
  border: 1px solid var(--error-bd);
}

/* WhatsApp */
.btn--wa {
  background: var(--whatsapp);
  color: #fff;
}

/* Success / green */
.btn--success {
  background: var(--success);
  color: #fff;
}

/* Small — for inline use */
.btn--sm {
  font-size: var(--t-micro);
  padding: 10px 14px;
  min-height: 38px;
  width: auto;
  display: inline-block;
}

/* Disabled state */
.btn:disabled, .btn[disabled] {
  opacity: .4;
  cursor: not-allowed;
}


/* ============================================================
   11. FORM ELEMENTS
============================================================ */
.field { margin-bottom: 14px; }

.field-label {
  display: block;
  font-size: var(--t-label);
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  margin-bottom: 6px;
}

/* CRITICAL: 16px minimum — iOS zooms below this */
.field-input,
.field-select,
.field-textarea {
  width: 100%;
  background: #fff;
  border: 1px solid var(--border);
  color: var(--ink);
  font-family: var(--sans);
  font-size: var(--t-input);  /* 16px — never change */
  border-radius: var(--radius);
  outline: none;
  -webkit-appearance: none;
  transition: border-color var(--ease);
}
.field-input,
.field-select {
  min-height: 50px;
  padding: 0 14px;
  display: flex;
  align-items: center;
}
.field-textarea {
  padding: 12px 14px;
  resize: none;
  line-height: 1.6;
}
.field-input:focus,
.field-select:focus,
.field-textarea:focus { border-color: var(--copper); }

.field-input.error,
.field-select.error,
.field-textarea.error { border-color: var(--error); }

/* Select arrow */
.field-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B5622A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  cursor: pointer;
}

.field-note {
  font-size: var(--t-small);
  color: var(--taupe);
  margin-top: 5px;
  line-height: 1.5;
}
.field-error {
  font-size: var(--t-small);
  color: var(--error);
  margin-top: 5px;
}
.field-char-count {
  font-size: var(--t-small);
  color: var(--taupe);
  text-align: right;
  margin-top: 4px;
}

/* Two column — city/postcode only */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-sm);
}

/* Stripe Elements placeholder */
.stripe-field {
  min-height: 50px;
  border: 1px solid var(--border);
  background: #fff;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: rgba(122,116,110,.4);
}

.secure-note {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: var(--t-small);
  color: var(--taupe);
  line-height: 1.5;
}
.secure-note svg {
  width: 12px;
  height: 12px;
  stroke: var(--taupe);
  stroke-width: 1.8;
  fill: none;
  flex-shrink: 0;
}

.terms-note {
  font-size: var(--t-small);
  color: var(--taupe);
  line-height: 1.65;
  text-align: center;
  margin-top: 16px;
}
.terms-note a { color: var(--copper); }


/* ============================================================
   12. CARDS — PLAN (subscribe page)
============================================================ */
.plan-card {
  position: relative;
  border: 1.5px solid var(--border);
  background: #fff;
  padding: 20px 16px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: border-color var(--ease), background var(--ease);
  min-height: 88px;
  margin-bottom: 10px;
}
.plan-card:active { background: var(--panel); }

.plan-card.selected {
  border-color: var(--copper);
  border-width: 2px;
  background: rgba(181,98,42,.03);
}
.plan-card.featured {
  background: var(--copper);
  border-color: var(--copper);
}
.plan-card.featured.selected {
  border-color: var(--copper-dark);
  border-width: 2px;
}

/* Badge — "Most popular" */
.plan-badge {
  position: absolute;
  top: -1px;
  left: 14px;
  font-size: .56rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 700;
  background: var(--ink);
  color: #fff;
  padding: 3px 10px;
}
.plan-card.featured .plan-badge { background: rgba(0,0,0,.25); }

/* Left — name and description */
.plan-card__left h3 {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--ink);
  margin-bottom: 3px;
}
.plan-card.featured .plan-card__left h3 { color: #fff; }
.plan-card__left p { font-size: .8rem; color: var(--taupe); line-height: 1.4; }
.plan-card.featured .plan-card__left p { color: rgba(255,255,255,.75); }

/* Right — price */
.plan-card__right { text-align: right; padding-right: 28px; }
.plan-card__price {
  font-family: var(--serif);
  font-size: 2rem;
  color: var(--copper);
  line-height: 1;
}
.plan-card.featured .plan-card__price { color: #fff; }
.plan-card__freq {
  display: block;
  font-size: .6rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--taupe);
  margin-top: 2px;
}
.plan-card.featured .plan-card__freq { color: rgba(255,255,255,.6); }
.plan-card__saving {
  display: block;
  font-size: .62rem;
  color: var(--copper);
  font-weight: 600;
  margin-top: 3px;
}
.plan-card.featured .plan-card__saving { color: rgba(255,255,255,.85); }

/* Radio indicator */
.plan-radio {
  position: absolute;
  top: 20px;
  right: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--ease);
}
.plan-card.selected .plan-radio {
  border-color: var(--copper);
  background: var(--copper);
}
.plan-card.selected .plan-radio::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
}
.plan-card.featured .plan-radio { border-color: rgba(255,255,255,.4); }
.plan-card.featured.selected .plan-radio { border-color: #fff; background: #fff; }
.plan-card.featured.selected .plan-radio::after { background: var(--copper); }


/* ============================================================
   13. CARDS — ADDON CAROUSEL
============================================================ */
.addon-shelf {
  /* Break out of page padding, add back inside */
  margin: 0 calc(-1 * var(--px));
  padding: 0 var(--px);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.addon-shelf::-webkit-scrollbar { display: none; }

.addon-row {
  display: flex;
  gap: 10px;
  width: max-content;
  padding-right: var(--px);
}

.addon-card {
  width: 148px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  background: #fff;
  cursor: pointer;
  transition: border-color var(--ease);
  overflow: hidden;
}
.addon-card.added { border-color: var(--copper); }

.addon-card__img {
  aspect-ratio: 4/3;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  overflow: hidden;
}
.addon-card__img img { width: 100%; height: 100%; object-fit: cover; }

.addon-card__body { padding: 10px; }

.addon-card__name {
  font-family: var(--serif);
  font-size: .95rem;
  font-style: italic;
  color: var(--ink);
  margin-bottom: 2px;
}
.addon-card__price {
  font-size: .74rem;
  color: var(--copper);
  font-weight: 500;
  margin-bottom: 8px;
}
.addon-card__btn {
  width: 100%;
  padding: 8px;
  font-size: .62rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid rgba(181,98,42,.25);
  color: var(--copper);
  background: transparent;
  cursor: pointer;
  font-family: var(--sans);
  transition: all var(--ease);
  min-height: 34px;
}
.addon-card.added .addon-card__btn {
  background: var(--copper);
  color: #fff;
  border-color: var(--copper);
}

/* Quantity controls (account page) */
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  width: 100%;
}
.qty-btn {
  flex: 1;
  height: 34px;
  background: none;
  border: none;
  color: var(--taupe);
  font-size: 1.1rem;
  cursor: pointer;
  font-family: var(--sans);
  display: flex;
  align-items: center;
  justify-content: center;
}
.qty-num {
  flex: 1;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .82rem;
  color: var(--ink);
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
}

.scroll-hint {
  font-size: var(--t-micro);
  color: var(--taupe);
  text-align: center;
  margin-top: 8px;
  letter-spacing: .06em;
}


/* ============================================================
   14. CARDS — INFO / STAT / PROOF
============================================================ */

/* Info card — left copper border */
.info-card {
  background: #fff;
  border: 1px solid var(--border);
  border-left: 3px solid var(--copper);
  padding: var(--card-p);
  margin-bottom: var(--gap-sm);
}
.info-card__label {
  display: block;
  font-size: var(--t-micro);
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--copper);
  font-weight: 500;
  margin-bottom: 5px;
}
.info-card__value { font-size: .9rem; color: var(--ink); line-height: 1.55; }

/* Stat grid — always 2 columns */
.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  margin-bottom: var(--gap-md);
}
.stat-cell {
  background: var(--panel);
  padding: var(--card-p);
}
.stat-cell__label {
  display: block;
  font-size: var(--t-micro);
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  margin-bottom: 5px;
}
.stat-cell__value {
  font-family: var(--serif);
  font-size: 1.7rem;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 3px;
}
.stat-cell__value--copper { color: var(--copper); }
.stat-cell__value--green  { color: var(--success); }
.stat-cell__sub { font-size: .72rem; color: var(--taupe); }

/* Proof / testimonial — always ink background */
.proof-card {
  background: var(--ink);
  padding: var(--gap-lg) var(--px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.proof-card__stars {
  color: var(--copper);
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.proof-card__quote {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--cream);
  line-height: 1.45;
  margin-bottom: 8px;
}
.proof-card__attr {
  font-size: var(--t-micro);
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(154,143,130,.55);
  font-weight: 500;
}

/* Order summary card */
.order-summary {
  background: var(--panel);
  border: 1px solid var(--border);
  padding: var(--card-p);
  margin-bottom: var(--gap-lg);
}
.order-summary__label {
  display: block;
  font-size: var(--t-micro);
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  margin-bottom: 10px;
}
.order-summary__row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: .84rem;
}
.order-summary__row-label { color: var(--taupe); }
.order-summary__row-value { color: var(--ink); font-weight: 500; }
.order-summary__total {
  display: flex;
  justify-content: space-between;
  padding: 8px 0 2px;
  border-top: 1px solid var(--border);
  margin-top: 6px;
}
.order-summary__total-label {
  font-size: var(--t-micro);
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  align-self: flex-end;
  padding-bottom: 3px;
}
.order-summary__total-value {
  font-family: var(--serif);
  font-size: 1.9rem;
  color: var(--copper);
}


/* ============================================================
   15. SECTION PATTERNS
============================================================ */

/* Pillar list */
.pillar-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.pillar {
  background: var(--cream);
  padding: 18px var(--card-p);
  display: flex;
  gap: var(--gap-md);
  align-items: flex-start;
}
.pillar__num {
  font-family: var(--serif);
  font-size: 2.2rem;
  color: rgba(181,98,42,.18);
  line-height: 1;
  min-width: 34px;
  flex-shrink: 0;
}
.pillar__text h3 {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--ink);
  margin-bottom: 3px;
}
.pillar__text p { font-size: .82rem; color: var(--taupe); line-height: 1.55; }

/* Fact / checklist */
.fact-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.fact-item {
  background: var(--cream);
  padding: 14px var(--card-p);
  display: flex;
  gap: var(--gap-md);
  align-items: flex-start;
}
.fact-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(181,98,42,.08);
  border: 1px solid rgba(181,98,42,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.fact-icon svg {
  width: 13px;
  height: 13px;
  stroke: var(--copper);
  stroke-width: 1.8;
  fill: none;
}
.fact-text h3 { font-size: .88rem; font-weight: 500; color: var(--ink); margin-bottom: 2px; font-style: normal; }
.fact-text p  { font-size: .8rem; color: var(--taupe); line-height: 1.55; }

/* How it works steps */
.how-steps { display: flex; flex-direction: column; }
.how-step {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  align-items: flex-start;
}
.how-step:last-child { border-bottom: none; padding-bottom: 0; }
.how-step__num {
  font-family: var(--serif);
  font-size: 2.2rem;
  color: rgba(181,98,42,.2);
  line-height: 1;
  min-width: 34px;
  flex-shrink: 0;
}
.how-step__text h3 { font-family: var(--serif); font-size: 1.1rem; font-style: italic; color: var(--ink); margin-bottom: 3px; }
.how-step__text p  { font-size: .82rem; color: var(--taupe); line-height: 1.6; }


/* ============================================================
   16. TICKER
============================================================ */
.ticker {
  overflow: hidden;
  padding: 13px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.ticker--dark {
  background: var(--ink);
  border-color: rgba(255,255,255,.06);
}
.ticker__inner {
  display: flex;
  gap: 32px;
  animation: ticker-scroll 20s linear infinite;
  white-space: nowrap;
}
.ticker__item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  font-size: .62rem;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
}
.ticker--dark .ticker__item { color: rgba(250,248,244,.4); }
.ticker__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--copper);
  flex-shrink: 0;
}
@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}


/* ============================================================
   17. HERO PATTERNS
============================================================ */

/* Full screen hero — homepage */
.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
.hero__img {
  position: absolute;
  inset: 0;
  background: var(--panel);
  overflow: hidden;
}
.hero__img img { width: 100%; height: 100%; object-fit: cover; }
.hero__gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(0deg, rgba(26,26,26,.92) 0%, rgba(26,26,26,.55) 50%, transparent 100%);
}
.hero__content {
  position: relative;
  z-index: 1;
  padding: 0 var(--px) 36px;
}
.hero__tag {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.hero__tag-line { width: 18px; height: 1px; background: var(--copper); }
.hero__tag span {
  font-size: .62rem;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(250,248,244,.65);
  font-weight: 500;
}
.hero__h1 {
  font-family: var(--serif);
  font-size: var(--t-hero);
  font-style: italic;
  font-weight: 600;
  color: #fff;
  line-height: .92;
  margin-bottom: 14px;
}
.hero__h1 em { color: #B5622A; font-style: italic; }
.hero__price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 18px;
}
.hero__price-from {
  font-size: .7rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(250,248,244,.5);
  font-weight: 500;
}
.hero__price-num {
  font-family: var(--serif);
  font-size: 2rem;
  color: #fff;
  line-height: 1;
}
.hero__price-note { font-size: .7rem; color: rgba(250,248,244,.5); }
.hero__claims {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.hero__claim {
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(250,248,244,.5);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}
.hero__claim::before {
  content: '';
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--copper);
  flex-shrink: 0;
}

/* Interior copper band hero */
.hero-band {
  padding: 32px var(--px) 28px;
  text-align: center;
}
.hero-band--copper { background: var(--copper); }
.hero-band--ink    { background: var(--ink); }
.hero-band--green  { background: var(--success); }

.hero-band__eyebrow {
  display: block;
  font-size: var(--t-micro);
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(255,255,255,.65);
  font-weight: 500;
  margin-bottom: 10px;
}
.hero-band__title {
  font-family: var(--serif);
  font-size: var(--t-h1);
  font-style: italic;
  color: #fff;
  margin-bottom: 6px;
  line-height: 1;
}
.hero-band__sub {
  font-size: .9rem;
  color: rgba(255,255,255,.72);
  line-height: 1.65;
}

/* Check icon for success bands */
.check-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,.15);
  border: 2px solid rgba(255,255,255,.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.check-circle svg {
  width: 22px;
  height: 22px;
  stroke: #fff;
  stroke-width: 2.5;
  fill: none;
}


/* ============================================================
   18. STICKY BOTTOM BAR
   Used on subscribe and gift pages only
============================================================ */
.sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  border-top: 1px solid var(--border);
  padding: 12px var(--px) 16px;
  box-shadow: 0 -4px 24px rgba(0,0,0,.07);
  /* Safe area for iPhone home indicator */
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
.sticky-bar__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.sticky-bar__label { font-size: .76rem; color: var(--taupe); }
.sticky-bar__price {
  font-family: var(--serif);
  font-size: 1.4rem;
  color: var(--copper);
  line-height: 1;
}


/* ============================================================
   19. STEP INDICATOR + PROGRESS BAR
============================================================ */
.progress-bar {
  height: 3px;
  background: var(--border);
}
.progress-bar__fill {
  height: 100%;
  background: var(--copper);
  transition: width var(--ease-slow);
}

.step-indicator {
  display: flex;
  align-items: flex-start;
  padding: 14px var(--px);
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  gap: 0;
}
.step-indicator__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex: 1;
}
.step-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .7rem;
  font-weight: 600;
  transition: all var(--ease-mid);
  flex-shrink: 0;
}
.step-dot--future  { background: var(--border); color: var(--taupe); }
.step-dot--active  { background: var(--ink); color: #fff; }
.step-dot--done    { background: var(--copper); color: #fff; }

.step-indicator__label {
  font-size: .58rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  text-align: center;
}
.step-indicator__label--active { color: var(--copper); }

.step-line {
  flex: 1;
  height: 1px;
  background: var(--border);
  margin-top: 13px;
  transition: background var(--ease-mid);
}
.step-line--done { background: var(--copper); }


/* ============================================================
   20. TAB BAR — ACCOUNT PAGE ONLY
============================================================ */
.tab-bar {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: var(--nav-h);
  z-index: 100;
}
.tab-bar::-webkit-scrollbar { display: none; }

.tab-bar__tab {
  flex-shrink: 0;
  padding: 13px 18px;
  font-size: var(--t-micro);
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--taupe);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--sans);
  transition: color var(--ease), border-color var(--ease);
  min-height: 46px;
}
.tab-bar__tab--active {
  color: var(--copper);
  border-bottom-color: var(--copper);
}

.tab-panel { display: none; }
.tab-panel--active { display: block; }


/* ============================================================
   21. FOOTER
   Public pages only — not account, auth, system
============================================================ */
.footer {
  padding: 32px var(--px) 24px;
  border-top: 1px solid var(--border);
}
.footer__logo {
  display: block;
  font-family: var(--serif);
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--copper-logo);
  margin-bottom: 8px;
}
.footer__tagline {
  font-size: .82rem;
  color: var(--taupe);
  line-height: 1.65;
  margin-bottom: 24px;
}
.footer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 22px;
}
.footer__col h4 {
  font-family: var(--sans);
  font-size: var(--t-micro);
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--copper);
  font-weight: 500;
  margin-bottom: 10px;
  font-style: normal;
}
.footer__col a {
  display: block;
  font-size: .84rem;
  color: var(--taupe);
  margin-bottom: 7px;
  line-height: 1.4;
}
.footer__bottom {
  padding-top: 18px;
  border-top: 1px solid var(--border);
  font-size: .72rem;
  color: var(--taupe);
  line-height: 1.65;
}
.footer__bottom a { color: var(--copper); }


/* ============================================================
   22. CONFIRMATION / SUCCESS BANDS
   Copper = orders. Green = account actions.
============================================================ */
.success-band {
  position: relative;
  padding: 36px var(--px) 32px;
  text-align: center;
  overflow: hidden;
}
.success-band::before {
  content: '';
  position: absolute;
  top: -50px; right: -50px;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: rgba(255,255,255,.06);
}
.success-band::after {
  content: '';
  position: absolute;
  bottom: -70px; left: -40px;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: rgba(0,0,0,.08);
}
.success-band--copper { background: var(--copper); }
.success-band--green  { background: var(--success); }

.success-band__title {
  font-family: var(--serif);
  font-size: 2.4rem;
  font-style: italic;
  color: #fff;
  margin-bottom: 6px;
  position: relative;
  z-index: 1;
  line-height: 1;
}
.success-band__sub {
  font-size: .9rem;
  color: rgba(255,255,255,.78);
  position: relative;
  z-index: 1;
  line-height: 1.6;
}


/* ============================================================
   23. AUTH PAGE LAYOUT
   Minimal — just logo and form. No nav, no footer.
============================================================ */
.auth-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 48px var(--px) 40px;
}
.auth-page__logo {
  display: block;
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--copper-logo);
  text-align: center;
  margin-bottom: 40px;
}
.auth-page__card {
  background: #fff;
  border: 1px solid var(--border);
  padding: var(--gap-lg) var(--px);
  flex: 1;
  display: flex;
  flex-direction: column;
}
.auth-page__title {
  font-family: var(--serif);
  font-size: var(--t-h1);
  font-style: italic;
  color: var(--ink);
  margin-bottom: 6px;
}
.auth-page__sub {
  font-size: .88rem;
  color: var(--taupe);
  margin-bottom: 24px;
  line-height: 1.65;
}
.auth-page__footer {
  text-align: center;
  padding-top: var(--gap-lg);
  font-size: .82rem;
  color: var(--taupe);
}
.auth-page__footer a { color: var(--copper); }


/* ============================================================
   24. BOTTOM DRAWER (account update pages)
   Slides up from bottom. Replaces separate pages.
============================================================ */
.bottom-drawer {
  position: fixed;
  bottom: -100%;
  left: 0;
  right: 0;
  z-index: 400;
  background: var(--cream);
  border-top: 2px solid var(--copper);
  border-radius: 0;
  max-height: 92dvh;
  overflow-y: auto;
  transition: bottom .3s cubic-bezier(.4,0,.2,1);
}
.bottom-drawer.open { bottom: 0; }

.bottom-drawer__handle {
  width: 36px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;
}
.bottom-drawer__head {
  padding: 14px var(--px);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: var(--cream);
  z-index: 1;
}
.bottom-drawer__title {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--ink);
}
.bottom-drawer__close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--taupe);
}
.bottom-drawer__close svg {
  width: 18px;
  height: 18px;
  stroke: var(--taupe);
  stroke-width: 1.5;
  fill: none;
}
.bottom-drawer__body {
  padding: var(--gap-lg) var(--px);
  padding-bottom: max(var(--gap-lg), env(safe-area-inset-bottom));
}


/* ============================================================
   25. UTILITY CLASSES
============================================================ */
.hidden   { display: none !important; }
.sr-only  { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

/* Chips / tags */
.chip {
  display: inline-block;
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 2px 8px;
}
.chip--copper { background: rgba(181,98,42,.08); border: 1px solid rgba(181,98,42,.2); color: var(--copper); }
.chip--green  { background: rgba(46,125,50,.08);  border: 1px solid rgba(46,125,50,.2);  color: var(--success); }
.chip--grey   { background: var(--panel);          border: 1px solid var(--border);        color: var(--taupe); }
.chip--error  { background: var(--error-bg);       border: 1px solid var(--error-bd);      color: var(--error); }
.chip--ink    { background: rgba(26,26,26,.06);    border: 1px solid rgba(26,26,26,.12);   color: var(--ink); }

/* Text colours */
.text-copper { color: var(--copper); }
.text-taupe  { color: var(--taupe); }
.text-ink    { color: var(--ink); }
.text-cream  { color: var(--cream); }
.text-success{ color: var(--success); }
.text-error  { color: var(--error); }

/* Spacing helpers */
.mt-sm { margin-top: var(--gap-sm); }
.mt-md { margin-top: var(--gap-md); }
.mt-lg { margin-top: var(--gap-lg); }
.mb-sm { margin-bottom: var(--gap-sm); }
.mb-md { margin-bottom: var(--gap-md); }
.mb-lg { margin-bottom: var(--gap-lg); }

/* Note / info box */
.note-box {
  background: rgba(181,98,42,.05);
  border: 1px solid rgba(181,98,42,.15);
  border-left: 2px solid var(--copper);
  padding: 12px var(--card-p);
  font-size: .82rem;
  color: var(--taupe);
  line-height: 1.65;
}
.note-box--green {
  background: var(--success-bg);
  border-color: var(--success-bd);
  border-left-color: var(--success);
}
.note-box--error {
  background: var(--error-bg);
  border-color: var(--error-bd);
  border-left-color: var(--error);
}

/* Placeholder image block */
.img-ph {
  background: var(--panel);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-bottom: 1px solid var(--border);
}
.img-ph__label {
  font-size: .58rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--taupe);
  font-weight: 500;
  text-align: center;
  padding: 0 8px;
}
.img-ph__sub {
  font-size: .52rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(122,116,110,.45);
  text-align: center;
}

/* WhatsApp block */
.wa-block { overflow: hidden; border: 1px solid var(--border); }
.wa-block__head {
  background: var(--whatsapp);
  padding: 13px var(--card-p);
  display: flex;
  align-items: center;
  gap: 10px;
}
.wa-block__head-text { font-size: .82rem; color: #fff; font-weight: 500; }
.wa-block__body { padding: var(--card-p); background: #fff; }
.wa-block__body p { font-size: .84rem; margin-bottom: 12px; }

/* Referral block */
.referral-block {
  background: var(--panel);
  border: 1px solid var(--border);
  padding: var(--card-p);
}
.referral-block h3 { font-family: var(--serif); font-size: 1.2rem; font-style: italic; margin-bottom: 5px; }
.referral-block p  { font-size: .84rem; margin-bottom: 12px; }
.referral-link-row {
  background: #fff;
  border: 1px solid var(--border);
  padding: 11px var(--card-p);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.referral-link-row span { font-size: .84rem; color: var(--copper); font-weight: 500; }


/* ============================================================
   FONT LOADING — include in every HTML <head>
   
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
   
   NOTE: In Next.js use next/font instead:
   import { Cormorant_Garamond, Jost } from 'next/font/google'
============================================================ */

  /* PAGE SPECIFIC */
section{padding-bottom:0;min-height:100dvh;display:flex;flex-direction:column; align-items:center;justify-content:center;text-align:center}
  </style>


<section>
<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px var(--px);text-align:center">
  <span style="font-family:var(--serif);font-size:6rem;color:rgb(181,98,42);line-height:1;display:block;margin-bottom:16px">{page.status}</span>
  <h1 style="font-family:var(--serif);font-size:var(--t-h1);font-style:italic;margin-bottom:8px">{page.status === 404 ? "Page not found." : "An expected error occurred."}</h1>
  <p style="font-size:.88rem;line-height:1.7;margin-bottom:28px">{page.status === 404    ? "The page you were looking for doesn't exist or has moved. Try one of these instead." : "An error occurred while loading the page."}</p>
  <div style="width:100%;display:flex;flex-direction:column;gap:var(--gap-sm)">
    <a href="/" class="btn btn--primary">Go to homepage</a>
    <a href="/subscribe" class="btn btn--outline">Subscribe to GOTERA</a>
    <a href="/faq" class="btn btn--ghost" style="font-size:.78rem">Read the FAQ</a>
  </div>
</div>
</section>