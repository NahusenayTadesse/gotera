<script>
  // Add-ons runtime state tracking via Svelte 5 fine-grained states
  let quantities = $state({ berbere: 0, mitmita: 0, kibbeh: 0 });

  const addonsList = [
    { id: 'berbere', name: 'Berbere', price: '£3.50', desc: 'Bold Ethiopian spice blend.' },
    { id: 'mitmita', name: 'Mitmita', price: '£3.50', desc: 'Sharper. Hotter.' },
    { id: 'kibbeh', name: 'Niter Kibbeh', price: '£5.00', desc: 'Spiced Ethiopian butter.' }
  ];

  function updateQty(id, change) {
    quantities[id] = Math.max(0, quantities[id] + change);
  }
</script>

<!-- NEXT DELIVERY CARD -->
<div class="block">
  <div class="delivery-card">
    <div>
      <span class="delivery-card-eyebrow">Next Delivery</span>
      <div class="delivery-date">Saturday, 18 April</div>
      <div class="delivery-detail">
        <strong>Regular · 4 packs</strong> &nbsp;·&nbsp; 14 Brecknock Road, London
      </div>
      <span class="cutoff">Cut-off Sunday 14 April</span>
    </div>
    <div class="delivery-btns">
      <button type="button" class="btn btn-full">Add to this order</button>
      <a href="/account/delivery/skip" class="btn-ghost btn-full">Skip delivery</a>
      <button type="button" class="btn-ghost btn-full">Pause subscription</button>
    </div>
  </div>
</div>

<!-- LIVE METRICS MATRIX -->
<div class="block">
  <div class="block-header">
    <h2>Subscription</h2>
    <a href="/account/change-plan" class="block-action">Change plan →</a>
  </div>
  <div class="stats-row">
    <div class="stat">
      <span class="stat-label">Plan</span>
      <div class="stat-value">Regular</div>
      <div class="stat-sub">4 packs · monthly</div>
    </div>
    <div class="stat">
      <span class="stat-label">Next Payment</span>
      <div class="stat-value">£24.00</div>
      <div class="stat-sub">12 April 2026</div>
    </div>
    <div class="stat">
      <span class="stat-label">Status</span>
      <div class="stat-value green">Active</div>
      <div class="stat-sub">Renewing monthly</div>
    </div>
  </div>
</div>

<!-- DYNAMIC LOOPED ADDONS SELECTION -->
<div class="block">
  <div class="block-header">
    <h2>Add to this delivery</h2>
    <span class="block-action text-normal">Before 14 April</span>
  </div>
  <div class="addons-row">
    {#each addonsList as item}
      <div class="addon">
        <div class="addon-img-placeholder">
          <span>{item.name}</span>
        </div>
        <div class="addon-body">
          <div class="addon-head">
            <div class="addon-name">{item.name}</div>
            <div class="addon-price">{item.price}</div>
          </div>
          <div class="addon-desc">{item.desc}</div>
          <div class="addon-foot">
            <div class="qty">
              <button type="button" class="qty-btn" onclick={() => updateQty(item.id, -1)}>−</button>
              <div class="qty-n">{quantities[item.id]}</div>
              <button type="button" class="qty-btn" onclick={() => updateQty(item.id, 1)}>+</button>
            </div>
            <button type="button" class="btn-outline">Add</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <a href="/addons" class="see-all">See all add-ons →</a>
</div>

<style>
  h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; }
  p { line-height: 1.65; color: #4a4440; }

  .block { margin-bottom: 44px; }
  .block-header { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .block-action { font-size: .75rem; color: var(--copper); letter-spacing: .04em; text-decoration: none; }
  .block-action:hover { text-decoration: underline; }
  .text-normal { color: var(--taupe); cursor: default; }
  .text-normal:hover { text-decoration: none; }

  /* DELIVERY PANEL ELEMENT */
  .delivery-card { background: #fff; border: 1px solid var(--border); border-left: 3px solid var(--copper); padding: 26px 28px; display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center; }
  .delivery-card-eyebrow { font-size: .65rem; letter-spacing: .18em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px; display: block; font-weight: 500; }
  .delivery-date { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-style: italic; color: var(--ink); line-height: 1; margin-bottom: 6px; }
  .delivery-detail { font-size: .82rem; color: var(--taupe); margin-bottom: 12px; }
  .delivery-detail strong { color: var(--ink); font-weight: 500; }
  .cutoff { display: inline-block; font-size: .72rem; color: var(--copper); background: rgba(181, 98, 42, .06); border: 1px solid rgba(181, 98, 42, .2); padding: 4px 10px; letter-spacing: .06em; }
  .delivery-btns { display: flex; flex-direction: column; gap: 8px; min-width: 168px; }

  /* BUTTON SYSTEM */
  .btn, .btn-outline, .btn-ghost { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border-radius: 2px; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all .15s; white-space: nowrap; text-decoration: none; font-family: inherit; }
  .btn { background: var(--copper); color: #fff; border-color: var(--copper); }
  .btn:hover { background: #9a4f22; border-color: #9a4f22; }
  .btn-outline { border-color: rgba(181, 98, 42, .3); color: var(--copper); background: transparent; }
  .btn-outline:hover { background: rgba(181, 98, 42, .05); }
  .btn-ghost { background: var(--panel); border-color: var(--border); color: var(--ink); }
  .btn-ghost:hover { background: var(--border); }
  .btn-full { width: 100%; }

  /* STATS SEGMENT */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .stat { background: #fff; padding: 22px 24px; }
  .stat-label { font-size: .63rem; letter-spacing: .16em; text-transform: uppercase; color: var(--taupe); margin-bottom: 8px; display: block; font-weight: 500; }
  .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; line-height: 1; color: var(--ink); margin-bottom: 4px; }
  .stat-sub { font-size: .78rem; color: var(--taupe); }
  .stat-value.green { color: var(--success); }

  /* ADDONS TILES */
  .addons-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .addon { background: #fff; border: 1px solid var(--border); overflow: hidden; }
  .addon-img-placeholder { width: 100%; height: 140px; background: var(--panel); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border); }
  .addon-img-placeholder span { font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--taupe); font-weight: 500; }
  .addon-body { padding: 16px; }
  .addon-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px; }
  .addon-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; }
  .addon-price { font-size: .8rem; color: var(--copper); font-weight: 500; margin-top: 3px; }
  .addon-desc { font-size: .81rem; color: var(--taupe); margin-bottom: 14px; line-height: 1.5; }
  .addon-foot { display: flex; justify-content: space-between; align-items: center; }
  
  /* QUANTITY CONTROLLER */
  .qty { display: flex; align-items: center; border: 1px solid var(--border); }
  .qty-btn { width: 30px; height: 30px; background: #fff; border: none; color: var(--ink); font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .qty-btn:hover { background: var(--panel); }
  .qty-n { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: .84rem; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
  
  .see-all { display: inline-flex; align-items: center; gap: 5px; margin-top: 16px; font-size: .76rem; color: var(--copper); letter-spacing: .04em; text-decoration: none; }
  .see-all:hover { text-decoration: underline; }

  @media(max-width: 1020px) { .addons-row { grid-template-columns: 1fr 1fr; } }
  @media(max-width: 800px) { .delivery-card { grid-template-columns: 1fr; } .delivery-btns { flex-direction: row; flex-wrap: wrap; } .stats-row { grid-template-columns: 1fr 1fr; } }
  @media(max-width: 560px) { .addons-row, .stats-row { grid-template-columns: 1fr; } }
</style>