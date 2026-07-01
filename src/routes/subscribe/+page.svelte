<script>
  // Mock data states — ready for your reactive state logic or page load data later
  let selectedRecipient = $state('me'); // 'me' or 'gift'
  let selectedPlan = $state('regular');  // 'one-off', 'starter', 'regular', 'single-gift', 'double-gift'
  let selectedDay = $state('Saturday');
  let selectedFrequency = $state('Monthly');
  
  // Track selected add-ons by ID
  let selectedAddons = $state(new Set(['berbere']));

  const subscriptionPlans = [
    { id: 'one-off', name: 'One-Off', sub: 'No subscription.', price: 6.50, freq: 'Per pack · 3 injera', bullet: 'Ideal first order', featured: false },
    { id: 'starter', name: 'Starter', sub: 'Lighter monthly plan.', price: 12.00, freq: 'Monthly · 2 packs', bullet: 'Pause or skip anytime', featured: false },
    { id: 'regular', name: 'Regular', sub: 'Our core plan.', price: 24.00, freq: 'Monthly · 4 packs', bullet: 'Best value', bullet2: 'Most popular', featured: true }
  ];

  const giftPlans = [
    { id: 'single-gift', name: 'Single Pack', sub: '3 injera. A proper introduction.', price: 8.50, freq: 'One-time' },
    { id: 'double-gift', name: 'Double Pack', sub: '6 injera. Pairs well with add-ons.', price: 15.00, freq: 'One-time' }
  ];

  const addons = [
    { id: 'berbere', name: 'Berbere', price: 3.50, desc: 'Bold Ethiopian spice blend.', photoLabel: 'Berbere · product photo' },
    { id: 'mitmita', name: 'Mitmita', price: 3.50, desc: 'Sharper. Hotter.', photoLabel: 'Mitmita · product photo' },
    { id: 'kibbeh', name: 'Niter Kibbeh', price: 5.00, desc: 'Spiced Ethiopian butter.', photoLabel: 'Niter Kibbeh · product photo' }
  ];

  function toggleAddon(id) {
    if (selectedAddons.has(id)) {
      selectedAddons.delete(id);
    } else {
      selectedAddons.add(id);
    }
    selectedAddons = selectedAddons; // Trigger Svelte 5 state mutation check
  }

  // Reactive Derived Values for Order Summary Matrix
  let currentPlanDetails = $derived(
    selectedRecipient === 'me' 
      ? subscriptionPlans.find(p => p.id === selectedPlan) || subscriptionPlans[2]
      : giftPlans.find(p => p.id === selectedPlan) || giftPlans[0]
  );

  let activeAddonsList = $derived(addons.filter(a => selectedAddons.has(a.id)));
  let addonsTotal = $derived(activeAddonsList.reduce((sum, a) => sum + a.price, 0));
  let finalTotalPrice = $derived((currentPlanDetails?.price || 0) + addonsTotal);
</script>

<div class="page-head">
  <div class="container">
    <span class="eyebrow">Subscribe</span>
    <h1>Choose your plan.</h1>
    <p>Select, add extras, go straight to checkout.</p>
  </div>
</div>

<main class="wrap">
  <div class="container layout">
    <div class="steps">

      <div class="step">
        <div class="step-head">
          <span class="step-num">01</span>
          <h2>Who is this for?</h2>
        </div>
        <div class="step-body">
          <div class="choice-grid">
            <button 
              type="button" 
              class="choice" 
              class:active={selectedRecipient === 'me'} 
              onclick={() => { selectedRecipient = 'me'; selectedPlan = 'regular'; }}
            >
              <h3>For me</h3>
              <p>Monthly subscription. Manage from your account.</p>
              <span class="choice-tag">Monthly subscription</span>
            </button>
            <button 
              type="button" 
              class="choice" 
              class:active={selectedRecipient === 'gift'} 
              onclick={() => { selectedRecipient = 'gift'; selectedPlan = 'single-gift'; }}
            >
              <h3>As a gift</h3>
              <p>One-time order. Different address. No subscription.</p>
              <span class="choice-tag">One-time · From £8.50</span>
            </button>
          </div>
        </div>
      </div>

      {#if selectedRecipient === 'gift'}
        <div class="step gift-step">
          <div class="step-head">
            <span class="step-num">—</span>
            <h2>Sending as a gift?</h2>
          </div>
          <div class="step-body">
            <span class="gift-label">No subscription required</span>
            <div class="gift-grid">
              {#each giftPlans as plan}
                <button 
                  type="button" 
                  class="plan text-left" 
                  class:active={selectedPlan === plan.id}
                  onclick={() => selectedPlan = plan.id}
                >
                  <h3>{plan.name}</h3>
                  <p class="plan-sub">{plan.sub}</p>
                  <div class="price">£{plan.price.toFixed(2)}</div>
                  <div class="freq">{plan.freq}</div>
                  <div class="btn-outline btn-full margin-top-fallback">
                    {selectedPlan === plan.id ? 'Selected' : 'Select'}
                  </div>
                </button>
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <div class="step">
          <div class="step-head">
            <span class="step-num">02</span>
            <h2>Choose your plan.</h2>
          </div>
          <div class="step-body">
            <div class="plans-grid">
              {#each subscriptionPlans as plan}
                <button 
                  type="button" 
                  class="plan text-left" 
                  class:featured={plan.featured}
                  class:active={selectedPlan === plan.id}
                  onclick={() => selectedPlan = plan.id}
                >
                  <h3>{plan.name}</h3>
                  <p class="plan-sub">{plan.sub}</p>
                  <div class="price">£{plan.price.toFixed(0)}</div>
                  <div class="freq">{plan.freq}</div>
                  <ul>
                    <li>{plan.bullet}</li>
                    {#if plan.bullet2}<li>{plan.bullet2}</li>{/if}
                  </ul>
                </button>
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <div class="step">
        <div class="step-head">
          <span class="step-num">03</span>
          <h2>Delivery.</h2>
        </div>
        <div class="step-body">
          <div class="delivery-grid">
            <div class="field-box">
              <label class="field-label" for="delivery-day">Delivery Day</label>
              <select id="delivery-day" class="select" bind:value={selectedDay}>
                <option value="Saturday">Saturday</option>
              </select>
              <div class="field-help">London only · launch delivery day.</div>
            </div>
            <div class="field-box">
              <label class="field-label" for="frequency">Frequency</label>
              <select id="frequency" class="select" bind:value={selectedFrequency}>
                <option value="Monthly">Monthly</option>
              </select>
              <div class="field-help">One delivery per month.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-head">
          <span class="step-num">04</span>
          <h2>Add to your order.</h2>
        </div>
        <div class="step-body">
          <div class="addons-grid">
            {#each addons as item}
              <button 
                type="button" 
                class="addon text-left" 
                class:active={selectedAddons.has(item.id)}
                onclick={() => toggleAddon(item.id)}
              >
                <div class="addon-img">
                  <span class="ph-label">{item.photoLabel}</span>
                  <span class="ph-sub">Warm light · minimal styling</span>
                </div>
                <div class="addon-top">
                  <div>
                    <h3>{item.name}</h3>
                    <div class="addon-price">+ £{item.price.toFixed(2)}</div>
                  </div>
                  <div class="check">✓</div>
                </div>
                <p>{item.desc}</p>
              </button>
            {/each}
          </div>
        </div>
      </div>

    </div>

    <aside class="summary">
      <div class="sum-head">
        <small>Order Summary</small>
        <h2>{currentPlanDetails?.name || 'Plan'}</h2>
      </div>
      <div class="sum-body">
        <div class="sum-row">
          <span class="sum-label">Plan</span>
          <div class="sum-val">
            {currentPlanDetails?.name} · {selectedRecipient === 'gift' ? 'One-time Pack' : currentPlanDetails?.freq}
          </div>
        </div>
        <div class="sum-row">
          <span class="sum-label">Delivery</span>
          <div class="sum-val">{selectedDay} · {selectedFrequency}</div>
          <div class="sum-sub">London only</div>
        </div>
        
        {#if activeAddonsList.length > 0}
          <div class="sum-row">
            <span class="sum-label">Add-ons</span>
            <div class="sum-val">
              {activeAddonsList.map(a => a.name).join(', ')}
            </div>
          </div>
        {/if}
        
        <div class="sum-row">
          <span class="sum-label">Total</span>
          <div class="price-line">
            <span>{currentPlanDetails?.name} product</span>
            <span>£{currentPlanDetails?.price.toFixed(2)}</span>
          </div>
          {#each activeAddonsList as item}
            <div class="price-line">
              <span>{item.name}</span>
              <span>£{item.price.toFixed(2)}</span>
            </div>
          {/each}
          <div class="price-line total">
            <span>First payment</span>
            <strong>£{finalTotalPrice.toFixed(2)}</strong>
          </div>
        </div>
        
        <div class="sum-actions">
          {#if selectedRecipient === 'me'}
            <button type="button" class="btn btn-full">Start Subscription</button>
          {:else}
            <button type="button" class="btn btn-full">Continue as Gift</button>
          {/if}
        </div>
        <p class="sum-note">Pause, skip, or cancel any time from your account.</p>
        
        <div class="trust-panel-strip">
          <div class="trust-quote">"Subscriber quote placeholder — one sentence, high trust."</div>
          <div class="trust-attr">Name · GOTERA subscriber</div>
        </div>
      </div>
    </aside>
  </div>
</main>

<style>
  h1, h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    line-height: 1.02;
  }

  p {
    line-height: 1.65;
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

  .btn-full {
    width: 100%;
  }

  .text-left {
    text-align: left;
    font-family: inherit;
  }

  /* PAGE HEADER */
  .page-head {
    padding: 48px 0 32px;
    background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
    border-bottom: 1px solid var(--border);
        max-width: 1200px;
    margin: 0 auto;
  }

  .page-head h1 {
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    font-style: italic;
    margin-bottom: 8px;
  }

  .page-head p {
    font-size: .9rem;
    color: var(--taupe);
    max-width: 480px;
  }

  /* LAYOUT GRID wrappers */
  .wrap {
    padding: 32px 0 80px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 24px;
    align-items: start;
  }

  /* COMPONENT STEPS BLOCK */
  .steps {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .step {
    background: #fff;
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .step-head {
    padding: 20px 22px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .step-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    color: rgba(181, 98, 42, .4);
    font-weight: 600;
    min-width: 20px;
  }

  .step-head h2 {
    font-size: 1.4rem;
  }

  .step-body {
    padding: 20px 22px;
  }

  /* INTERACTIVE SELECTORS */
  .choice-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .choice {
    border: 1px solid var(--border);
    background: var(--cream);
    padding: 16px;
    cursor: pointer;
    transition: all .15s;
  }

  .choice:hover {
    border-color: rgba(181, 98, 42, .35);
  }

  .choice.active {
    border-color: var(--copper);
    background: #fbf4ee;
  }

  .choice h3 {
    font-size: 1.15rem;
    margin-bottom: 5px;
  }

  .choice p {
    font-size: .8rem;
    color: var(--taupe);
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .choice-tag {
    font-size: .66rem;
    text-transform: uppercase;
    letter-spacing: .10em;
    color: var(--copper);
    font-weight: 500;
  }

  /* SPLIT GIFT MODULE UI variants */
  .gift-step {
    border-top: 2px solid rgba(181, 98, 42, .15);
  }

  .gift-label {
    display: inline-block;
    margin-bottom: 14px;
    font-size: .66rem;
    font-weight: 600;
    letter-spacing: .14em;
    text-transform: uppercase;
    background: rgba(181, 98, 42, .08);
    color: var(--copper);
    padding: 3px 9px;
    border: 1px solid rgba(181, 98, 42, .18);
  }

  .gift-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .margin-top-fallback {
    margin-top: 12px;
  }

  /* STRUCTURAL PLANS SELECTION STYLING */
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .plan {
    border: 1px solid var(--border);
    background: var(--cream);
    padding: 16px;
    cursor: pointer;
    transition: all .15s;
  }

  .plan:hover {
    border-color: rgba(181, 98, 42, .35);
  }

  .plan.active {
    border-color: var(--copper);
    background: #fbf4ee;
  }

  .plan.featured {
    background: var(--copper);
    border-color: var(--copper);
  }

  .plan.featured h3, .plan.featured .price {
    color: #fff;
  }

  .plan.featured .plan-sub, .plan.featured .freq, .plan.featured li {
    color: rgba(255, 255, 255, .8);
  }

  .plan h3 {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  .plan-sub {
    font-size: .8rem;
    color: var(--taupe);
    margin-bottom: 10px;
  }

  .price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: var(--copper);
    line-height: 1;
  }

  .freq {
    font-size: .68rem;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: var(--taupe);
    margin: 3px 0 10px;
  }

  .plan ul {
    list-style: none;
    display: grid;
    gap: 5px;
  }

  .plan li {
    font-size: .8rem;
    color: #463f39;
    padding-left: 10px;
    position: relative;
  }

  .plan li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: rgba(181, 98, 42, .35);
    font-size: .65rem;
  }

  .plan.featured li::before {
    color: rgba(255, 255, 255, .4);
  }

  /* ENTRY SELECTIONS STYLES */
  .delivery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .field-box {
    border: 1px solid var(--border);
    background: var(--cream);
    padding: 14px 16px;
  }

  .field-label {
    font-size: .66rem;
    text-transform: uppercase;
    letter-spacing: .12em;
    color: var(--copper);
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
  }

  .select {
    width: 100%;
    min-height: 40px;
    border: 1px solid rgba(122, 116, 110, .22);
    background: #fff;
    padding: 0 12px;
    font-family: 'Jost', sans-serif;
    font-size: .88rem;
    color: var(--ink);
  }

  .field-help {
    font-size: .76rem;
    color: var(--taupe);
    margin-top: 7px;
  }

  /* PRODUCT ADDONS BLOCK ELEMENTS */
  .addons-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .addon {
    border: 1px solid var(--border);
    background: var(--cream);
    cursor: pointer;
    transition: all .15s;
    overflow: hidden;
    padding: 0;
  }

  .addon:hover {
    border-color: rgba(181, 98, 42, .35);
  }

  .addon.active {
    border-color: var(--copper);
    background: #fbf4ee;
  }

  .addon-img {
    width: 100%;
    aspect-ratio: 4/3;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .addon-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 12px 14px 5px;
  }

  .addon h3 {
    font-size: 1rem;
  }

  .addon-price {
    font-size: .78rem;
    font-weight: 500;
    color: var(--copper);
  }

  .addon p {
    font-size: .78rem;
    color: var(--taupe);
    line-height: 1.5;
    margin: 0 14px 14px;
  }

  .check {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(181, 98, 42, .28);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: transparent;
    flex-shrink: 0;
    font-size: .75rem;
  }

  .addon.active .check {
    background: var(--copper);
    color: #fff;
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

  /* ORDER ASIDE SUMMARY STYLINGS */
  .summary {
    position: sticky;
    top: 88px;
  }

  .sum-head {
    padding: 20px 20px 16px;
    background: var(--panel);
    border-bottom: 1px solid var(--border);
  }

  .sum-head small {
    display: block;
    margin-bottom: 6px;
    font-size: .66rem;
    text-transform: uppercase;
    letter-spacing: .16em;
    color: var(--taupe);
    font-weight: 500;
  }

  .sum-head h2 {
    font-size: 1.8rem;
    font-style: italic;
  }

  .sum-body {
    padding: 20px;
    background: #fff;
    border: 1px solid var(--border);
    border-top: none;
  }

  .sum-row {
    padding-bottom: 14px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--border);
  }

  .sum-row:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .sum-label {
    display: block;
    margin-bottom: 6px;
    font-size: .66rem;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--copper);
  }

  .sum-val {
    font-size: .9rem;
    color: var(--ink);
    line-height: 1.5;
  }

  .sum-sub {
    font-size: .78rem;
    color: var(--taupe);
  }

  .price-line {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: .88rem;
    color: #433e39;
  }

  .price-line.total {
    padding-top: 12px;
    margin-top: 4px;
    border-top: 1px solid var(--border);
    font-weight: 500;
  }

  .price-line.total strong {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: var(--copper);
    line-height: 1;
  }

  .sum-actions {
    display: grid;
    gap: 8px;
    margin-top: 18px;
  }

  .sum-note {
    margin-top: 12px;
    font-size: .74rem;
    color: var(--taupe);
    line-height: 1.6;
  }

  .trust-panel-strip {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .trust-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: .95rem;
    font-style: italic;
    color: var(--taupe);
    line-height: 1.5;
    margin-bottom: 6px;
  }

  .trust-attr {
    font-size: .64rem;
    text-transform: uppercase;
    letter-spacing: .12em;
    color: rgba(122, 116, 110, .5);
    font-weight: 500;
  }

  /* MEDIA QUERIES BREAKPOINTS */
  @media(max-width: 920px) {
    .layout, .delivery-grid, .choice-grid, .gift-grid {
      grid-template-columns: 1fr;
    }
    .plans-grid, .addons-grid {
      grid-template-columns: 1fr;
    }
    .summary {
      position: static;
    }
  }
</style>