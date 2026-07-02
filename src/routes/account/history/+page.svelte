<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="block">
	<div class="block-header">
		<h2>Order history</h2>
	</div>

	{#if data.orders.length === 0}
		<div class="empty">
			No deliveries yet. Your order history will appear here after your first delivery.
		</div>
	{:else}
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
					{#each data.orders as order (order.id)}
						<tr>
							<td>{order.date}</td>
							<td>{order.items}</td>
							<td><span class="td-amount">{order.amount}</span></td>
							<td><span class="tag-{order.statusKey}">{order.status}</span></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
	}
	.block {
		margin-bottom: 44px;
	}
	.block-header {
		margin-bottom: 18px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}

	.table-wrap {
		border: 1px solid var(--border);
		overflow: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 520px;
	}
	th,
	td {
		text-align: left;
		padding: 13px 16px;
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
	}
	th {
		background: var(--panel);
		font-size: 0.63rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--copper);
	}
	td {
		font-size: 0.88rem;
		color: #433e39;
	}
	tr:last-child td {
		border-bottom: none;
	}

	.td-amount {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.1rem;
		color: var(--ink);
	}

	/* Status tags — one per delivery status */
	.tag-delivered,
	.tag-dispatched,
	.tag-skipped,
	.tag-failed {
		font-size: 0.66rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
	}
	.tag-delivered {
		color: var(--success);
	}
	.tag-dispatched {
		color: var(--copper);
	}
	.tag-skipped {
		color: var(--taupe);
	}
	.tag-failed {
		color: #b23a2a;
	}

	.empty {
		border: 1px dashed var(--border);
		padding: 28px 22px;
		text-align: center;
		font-size: 0.88rem;
		color: var(--taupe);
	}
</style>
