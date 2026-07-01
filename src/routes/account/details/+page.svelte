<div class="block">
  <div class="block-header">
    <h2>Your details</h2>
  </div>
  <div class="details-grid">
    <div class="detail">
      <span class="detail-label">Email</span>
      <div class="detail-value">tensai@example.com</div>
      <div class="detail-note">Receipts and subscription notices.</div>
      <button type="button" class="btn-soft">Update</button>
    </div>
    <div class="detail">
      <span class="detail-label">Phone</span>
      <div class="detail-value">+44 7XXX XXX XXX</div>
      <div class="detail-note">Delivery updates only.</div>
      <a href="/account/details/update-phone" class="btn-soft">Update</a>
    </div>
    <div class="detail full">
      <span class="detail-label">Delivery Address</span>
      <div class="detail-value">14 Brecknock Road, London, N7 0DD</div>
      <div class="detail-note">Changes before cut-off apply to next delivery.</div>
      <a href="/account/details/update-address" class="btn-soft">Update address</a>
    </div>
  </div>
</div>

<style>
  h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; }
  .block { margin-bottom: 44px; }
  .block-header { margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }

  .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .detail { background: #fff; border: 1px solid var(--border); padding: 20px; }
  .detail.full { grid-column: span 2; }
  
  .detail-label { font-size: .63rem; letter-spacing: .16em; text-transform: uppercase; color: var(--taupe); font-weight: 500; margin-bottom: 10px; display: block; }
  .detail-value { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 8px; color: var(--ink); }
  .detail-note { font-size: .78rem; color: var(--taupe); margin-bottom: 14px; }
  
  .btn-soft { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border-radius: 2px; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; cursor: pointer; border: 1px solid var(--border); background: var(--panel); color: var(--ink); text-decoration: none; transition: all .15s; }
  .btn-soft:hover { background: var(--border); }

  @media(max-width: 800px) { .details-grid { grid-template-columns: 1fr; } .detail.full { grid-column: auto; } }
</style>