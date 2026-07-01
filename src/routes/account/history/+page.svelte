<script>
  const orderHistory = [
    { date: '15 Mar 2026', items: '4 packs · Berbere', amount: '£27.50', status: 'Delivered' },
    { date: '15 Feb 2026', items: '4 packs injera', amount: '£24.00', status: 'Delivered' },
    { date: '18 Jan 2026', items: '2 packs · Mitmita', amount: '£15.50', status: 'Delivered' }
  ];
</script>

<div class="block">
  <div class="block-header">
    <h2>Order history</h2>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Contents</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {#each orderHistory as order}
          <tr>
            <td>{order.date}</td>
            <td>{order.items}</td>
            <td><span class="td-amount">{order.amount}</span></td>
            <td><span class="tag-delivered">{order.status}</span></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; }
  .block { margin-bottom: 44px; }
  .block-header { margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  
  .table-wrap { border: 1px solid var(--border); overflow: auto; }
  table { width: 100%; border-collapse: collapse; min-width: 520px; }
  th, td { text-align: left; padding: 13px 16px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  th { background: var(--panel); font-size: .63rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--copper); }
  td { font-size: .88rem; color: #433e39; }
  tr:last-child td { border-bottom: none; }
  
  .tag-delivered { font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--success); font-weight: 500; }
  .td-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--ink); }
</style>