<script>
  // Core application state
  const currentPlanId = 'regular';
  let selectedPlanId = $state('regular');
  let formSubmitted = $state(false);

  // Configuration object containing plan meta and looping criteria
  const plans = {
    regular: {
      name: 'Regular',
      desc: 'Our core monthly plan.',
      price: '£24',
      freq: 'Per month · 4 packs',
      details: ['4 packs monthly', 'Best for regular households', 'Strongest monthly value'],
      label: 'Regular · £24/month',
      note: ''
    },
    starter: {
      name: 'Starter',
      desc: 'Lighter monthly plan.',
      price: '£12',
      freq: 'Per month · 2 packs',
      details: ['2 packs monthly', 'Pause or skip anytime', 'Save £12 per month'],
      label: 'Starter · £12/month',
      note: "You'll save £12 per month. Your packs reduce from 4 to 2 from May."
    }
  };

  // Derived state computes whether the UI should flag alterations
  let isDifferentPlan = $derived(selectedPlanId !== currentPlanId);
  let selectedPlanMeta = $derived(plans[selectedPlanId]);

  function handleConfirm() {
    if (isDifferentPlan) {
      formSubmitted = true;
    }
  }
</script>

<div class="card">
  <div class="card-head">
    <span class="eyebrow">Subscription</span>
    <h1>Change your plan.</h1>
    <p>Changes take effect from your next billing cycle. Your current delivery is not affected.</p>
  </div>

  {#if !formSubmitted}
    <div class="card-body">
      <div class="plans">
        {#each Object.entries(plans) as [id, plan]}
          <button 
            type="button"
            class="plan" 
            class:current={id === currentPlanId}
            class:selected={id === selectedPlanId && isDifferentPlan}
            onclick={() => selectedPlanId = id}
            disabled={id === currentPlanId}
          >
            <div class="plan-head">
              {#if id === currentPlanId}
                <span class="current-tag">Your current plan</span>
              {:else if id === selectedPlanId}
                <span class="selected-tag">Selected</span>
              {/if}
              
              <h3>{plan.name}</h3>
              <p class="plan-desc">{plan.desc}</p>
              <div class="price">{plan.price}</div>
              <span class="freq">{plan.freq}</span>
            </div>
            <div class="plan-details">
              {#each plan.details as detail}
                <div class="plan-detail">{detail}</div>
              {/each}
            </div>
          </button>
        {/each}
      </div>

      <!-- CHANGE SUMMARY — Reactively driven toggling -->
      {#if isDifferentPlan}
        <div class="change-summary">
          <span class="change-summary-label">Your change</span>
          <div class="change-row">
            <span class="change-row-label">From</span>
            <span class="change-row-val">{plans[currentPlanId].label}</span>
          </div>
          <div class="change-row">
            <span class="change-row-label">To</span>
            <span class="change-row-val">{selectedPlanMeta.label}</span>
          </div>
          <div class="change-row">
            <span class="change-row-label">Takes effect</span>
            <span class="change-row-val">12 May 2026 · next billing cycle</span>
          </div>
          <div class="change-row">
            <span class="change-row-label">This month</span>
            <span class="change-row-val">No change · April delivery continues as normal</span>
          </div>
          {#if selectedPlanMeta.note}
            <p class="change-note">{selectedPlanMeta.note}</p>
          {/if}
        </div>
      {/if}

      <div class="actions">
        <button 
          class="btn" 
          disabled={!isDifferentPlan} 
          onclick={handleConfirm}
        >
          Confirm plan change
        </button>
        <a href="/account" class="btn-soft">Cancel</a>
      </div>
    </div>
  {:else}
    <!-- SUCCESS OVERLAY CONTAINER -->
    <div class="success">
      <div class="success-icon">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2>Plan changed.</h2>
      <p>
        Your plan changes to {selectedPlanMeta.name} from 12 May 2026. Your April delivery continues as normal.
      </p>
      <a href="/account" class="btn" style="max-width:240px;margin:0 auto">Back to account</a>
    </div>
  {/if}
</div>

<style>
  .eyebrow { 
    display: block; 
    margin-bottom: 10px; 
    font-size: .7rem; 
    font-weight: 500; 
    letter-spacing: .18em; 
    text-transform: uppercase; 
    color: var(--copper); 
  }

  .card { background: #fff; border: 1px solid var(--border); overflow: hidden; }
  .card-head { padding: 28px 28px 22px; border-bottom: 1px solid var(--border); }
  .card-head h1 { font-size: 2rem; font-style: italic; margin-bottom: 6px; }
  .card-head p { font-size: .88rem; color: var(--taupe); }
  .card-body { padding: 28px; }

  /* Plan Layout Options */
  .plans { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  .plan { 
    border: 1px solid var(--border); 
    background: var(--cream); 
    padding: 0; 
    cursor: pointer; 
    transition: all .15s; 
    overflow: hidden; 
    position: relative; 
    text-align: left;
    font-family: inherit;
  }
  .plan:hover:not(:disabled) { border-color: rgba(181, 98, 42, .3); }
  .plan.current { border-color: var(--border); cursor: default; }
  .plan.selected { border-color: var(--copper); background: #fbf4ee; }
  
  .plan-head { padding: 20px 20px 0; }
  
  .current-tag { 
    display: inline-block; 
    font-size: .6rem; 
    letter-spacing: .12em; 
    text-transform: uppercase; 
    font-weight: 600; 
    background: rgba(46, 125, 50, .1); 
    border: 1px solid rgba(46, 125, 50, .2); 
    color: #2E7D32; 
    padding: 3px 8px; 
    margin-bottom: 10px; 
  }
  .selected-tag { 
    display: inline-block; 
    font-size: .6rem; 
    letter-spacing: .12em; 
    text-transform: uppercase; 
    font-weight: 600; 
    background: rgba(181, 98, 42, .12); 
    border: 1px solid rgba(181, 98, 42, .3); 
    color: var(--copper); 
    padding: 3px 8px; 
    margin-bottom: 10px; 
  }
  
  .plan h3 { font-size: 1.4rem; margin-bottom: 4px; }
  .plan-desc { font-size: .8rem; color: var(--taupe); margin-bottom: 12px; }
  .price { font-family: 'Cormorant Garamond', serif; font-size: 2.4rem; color: var(--copper); line-height: 1; }
  .freq { font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: var(--taupe); margin: 3px 0 14px; display: block; }
  
  .plan-details { padding: 0 20px 20px; display: grid; gap: 6px; }
  .plan-detail { font-size: .8rem; color: #463f39; padding-left: 12px; position: relative; }
  .plan-detail::before { content: '—'; position: absolute; left: 0; color: rgba(181, 98, 42, .4); font-size: .7rem; }

  /* Change Summary Display Component */
  .change-summary { background: var(--panel); border: 1px solid var(--border); padding: 18px 20px; margin-bottom: 24px; }
  .change-summary-label { font-size: .64rem; letter-spacing: .14em; text-transform: uppercase; color: var(--taupe); font-weight: 500; margin-bottom: 10px; display: block; }
  .change-row { display: flex; justify-content: space-between; align-items: baseline; font-size: .88rem; padding: 5px 0; }
  .change-row-label { color: var(--taupe); }
  .change-row-val { color: var(--ink); font-weight: 500; }
  .change-note { font-size: .78rem; color: var(--taupe); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }

  /* Button Actions Block */
  .actions { display: grid; gap: 8px; }
  .btn { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    min-height: 46px; 
    padding: 0 22px; 
    border-radius: 2px; 
    font-size: .72rem; 
    letter-spacing: .12em; 
    text-transform: uppercase; 
    font-weight: 500; 
    background: var(--copper); 
    color: #fff; 
    border: 1px solid var(--copper); 
    cursor: pointer; 
    transition: all .15s; 
    width: 100%; 
    text-decoration: none;
    font-family: inherit;
  }
  .btn:hover:not(:disabled) { background: #9a4f22; border-color: #9a4f22; }
  .btn:disabled { opacity: .4; cursor: not-allowed; }
  
  .btn-soft { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    min-height: 46px; 
    padding: 0 22px; 
    border-radius: 2px; 
    font-size: .72rem; 
    letter-spacing: .12em; 
    text-transform: uppercase; 
    font-weight: 500; 
    border: 1px solid var(--border); 
    color: var(--taupe); 
    background: var(--panel); 
    cursor: pointer; 
    width: 100%; 
    text-decoration: none;
    font-family: inherit;
  }
  .btn-soft:hover { background: var(--border); color: var(--ink); }

  /* Success Interface Elements */
  .success { text-align: center; padding: 40px 28px; }
  .success-icon { 
    width: 44px; 
    height: 44px; 
    border-radius: 999px; 
    background: rgba(46, 125, 50, .1); 
    border: 1px solid rgba(46, 125, 50, .2); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    margin: 0 auto 16px; 
  }
  .success-icon svg { width: 20px; height: 20px; stroke: #2E7D32; stroke-width: 2; fill: none; }
  .success h2 { font-size: 1.8rem; margin-bottom: 8px; }
  .success p { font-size: .88rem; color: var(--taupe); margin-bottom: 20px; line-height: 1.65; }

  @media(max-width: 560px) { .plans { grid-template-columns: 1fr; } }
</style>