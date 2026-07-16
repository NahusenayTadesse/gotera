<script>
	import Testimonial from "$lib/testimonial.svelte";

  // Structured content matrices for sections to keep the markup completely DRY
  const originPanels = [
    {
      eyebrow: 'Origin',
      title: 'Made and packed in Ethiopia.',
      paragraphs: [
        'GOTERA starts at the source. Traditional fermentation. Real teff. Made where injera should be made.'
      ],
      protectedText: 'This is not an imitation product made to resemble the real thing. It is injera made where it should be made.'
    },
    {
      eyebrow: 'Ingredient',
      title: 'Why teff matters.',
      paragraphs: [
        'Teff is the foundation of injera. It gives the product its character, its nutritional value, and its place in Ethiopian food culture.',
        'One ingredient. One standard. No shortcuts.'
      ],
      protectedText: null
    }
  ];

  const brandValues = [
    { name: 'Authenticity', desc: 'Real origin, clearly stated.' },
    { name: 'Clarity', desc: 'Simple product, simple offer.' },
    { name: 'Consistency', desc: 'Same quality. Every month.' }
  ];

  const testimonialCards = [
    {
      quote: '"Diaspora subscriber quote — connection to home, authenticity, taste."',
      author: 'Name · City · Subscriber since —',
      photoLabel: 'Subscriber photo — optional'
    },
    {
      quote: '"Health or vegan subscriber quote — gluten-free, nutrition, weekly use."',
      author: 'Name · City · Subscriber since —',
      photoLabel: 'Subscriber photo — optional'
    }
  ];
</script>

<section class="hero">
  <div class="container">
    <span class="eyebrow">About GOTERA</span>
    <h1>Authentic Ethiopian food. Clear origin. No compromise.</h1>
    <p>One product. Made properly. Delivered monthly.</p>
  </div>
</section>

<!-- BRAND IMAGERY MODULE -->
<div class="img-band">
  <!-- <span class="ph-label">Brand photography — full width</span>
  <span class="ph-sub">Injera being made · teff grain · or product in situ · warm natural light · 21:6 crop</span> -->

  <img src="/injera.avif" alt="Injera with wot" />
</div>

<!-- COMPONENT PILLARS BLOCK (ORIGIN & INGREDIENT) -->
<section class="origin">
  <div class="container">
    <div class="origin-grid">
      {#each originPanels as panel}
        <div class="origin-panel">
          <span class="eyebrow">{panel.eyebrow}</span>
          <h2>{panel.title}</h2>
          {#each panel.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
          {#if panel.protectedText}
            <p class="protected">{panel.protectedText}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- VALUES TRACK -->
<section class="values">
  <div class="container values-inner">
    <div class="values-grid">
      {#each brandValues as value}
        <div class="value">
          <h3>{value.name}</h3>
          <p>{value.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- BUSINESS MODEL MODULE -->
<section class="model">
  <div class="container">
    <div class="model-inner">
      <span class="eyebrow">The Model</span>
      <h2>Built for subscription.</h2>
      <p>One product. One delivery per month. Managed from your account. That is the whole offer.</p>
    </div>
  </div>
</section>

<!-- SOCIAL PROOF MATRICES -->
<!-- <section class="proof">
  <div class="container">
    <div class="proof-inner">
      {#each testimonialCards as card}
        <div class="proof-panel">
          <div class="proof-panel-ph">
            <span class="ph-label">{card.photoLabel}</span>
            <span class="ph-sub">Square crop · warm tone</span>
          </div>
          <div class="proof-quote">{card.quote}</div>
          <div class="proof-attr">{card.author}</div>
        </div>
      {/each}
    </div>
  </div>
</section> -->
<Testimonial />

<!-- CALL TO ACTION (CTA) -->
<section class="cta">
  <div class="container">
    <div class="cta-inner">
      <span class="eyebrow">Start Today</span>
      <h2>Injera, every month.</h2>
      <p>No minimum term. Cancel or pause any time.</p>
      <div class="cta-actions">
        <a href="/subscribe" class="btn">Choose Your Plan</a>
        <a href="/delivery" class="btn-outline">Delivery Info</a>
      </div>
    </div>
  </div>
</section>


<style>
  section {
     max-width: 1200px;
    margin: 0 auto;
  }
  h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    line-height: 1.02;
  }

  p {
    line-height: 1.7;
    color: #433e39;
  }

  .eyebrow {
    display: block;
    margin-bottom: 10px;
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--copper);
  }

  .btn, .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 22px;
    border-radius: 2px;
    font-size: .72rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    font-weight: 500;
    transition: all .15s;
    text-decoration: none;
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
  }

  .btn-outline:hover {
    background: rgba(181, 98, 42, .05);
  }

  .ph-label {
    font-size: .62rem;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--taupe);
    font-weight: 500;
  }

  .ph-sub {
    font-size: .58rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(122, 116, 110, .5);
  }

  /* HERO */
  .hero {
    padding: 72px 0 56px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
    
  }

  .hero h1 {
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    font-style: italic;
    margin-bottom: 12px;
    max-width: 700px;
  }

  .hero p {
    font-size: .96rem;
    color: var(--taupe);
    max-width: 560px;
  }

  /* BRAND IMMERSION WIDE GRAPHIC */
  .img-band {
    width: 100%;
    aspect-ratio: 21/6;
    background: var(--panel);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  /* ORIGIN DETAILS MATRIX */
  .origin {
    padding: 72px 0;
    border-bottom: 1px solid var(--border);
  }

  .origin-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .origin-panel {
    background: #fff;
    padding: 36px 32px;
  }

  .origin-panel h2 {
    font-size: 1.8rem;
    margin-bottom: 14px;
  }

  .origin-panel p {
    font-size: .9rem;
    color: var(--taupe);
    line-height: 1.75;
    margin-bottom: 12px;
  }

  .origin-panel p:last-child {
    margin-bottom: 0;
  }

  .protected {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-style: italic;
    color: var(--ink);
    border-left: 2px solid var(--copper);
    padding-left: 16px;
    margin: 18px 0;
    line-height: 1.6;
  }

  /* CORE VALUES TILES */
  .values {
    border-bottom: 1px solid var(--border);
    background: var(--panel);
  }

  .values-inner {
    padding: 56px 0;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .value {
    background: #fff;
    padding: 28px 24px;
    text-align: center;
  }

  .value h3 {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .value p {
    font-size: .84rem;
    color: var(--taupe);
  }

  /* SUBSCRIPTION MODEL TEXT HUB */
  .model {
    padding: 72px 0;
    border-bottom: 1px solid var(--border);
  }

  .model-inner {
    max-width: 640px;
  }

  .model-inner h2 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    margin-bottom: 14px;
  }

  .model-inner p {
    font-size: .9rem;
    color: var(--taupe);
    line-height: 1.75;
  }

  /* REVIEWS & PROOF LAYOUT */
  .proof {
    padding: 56px 0;
    border-bottom: 1px solid var(--border);
  }

  .proof-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }

  .proof-panel {
    background: #fff;
    padding: 32px;
  }

  .proof-panel-ph {
    width: 100%;
    aspect-ratio: 4/3;
    background: var(--panel);
    border: 1px dashed var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 20px;
  }

  .proof-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--taupe);
    line-height: 1.55;
    margin-bottom: 12px;
  }

  .proof-attr {
    font-size: .68rem;
    text-transform: uppercase;
    letter-spacing: .12em;
    color: rgba(122, 116, 110, .6);
    font-weight: 500;
  }

  /* FOOT CALL TO ACTION CARD */
  .cta {
    padding: 80px 0;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
  }

  .cta-inner {
    text-align: center;
    max-width: 520px;
    margin: auto;
  }

  .cta-inner h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 12px;
  }

  .cta-inner p {
    font-size: .88rem;
    color: var(--taupe);
    margin-bottom: 28px;
  }

  .cta-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* MEDIA QUERIES RESPONSIVE ADAPTATIONS */
  @media(max-width: 860px) {
    .origin-grid, .values-grid, .proof-inner {
      grid-template-columns: 1fr;
    }
    .hero {
      padding: 56px 40px;
    }
  }
  
  @media(max-width: 580px) {
    .cta-actions {
      flex-direction: column;
      align-items: center;
    }
  }
</style>