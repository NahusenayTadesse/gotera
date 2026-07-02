<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Per-add-on quantity steppers (client state; posted on Add).
	let quantities = $state<Record<string, number>>(
		Object.fromEntries(data.addons.map((a) => [a.id, 0]))
	);

	function updateQty(id: string, change: number) {
		quantities[id] = Math.max(0, (quantities[id] ?? 0) + change);
	}

	const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;

	const statusLabel: Record<string, string> = {
		active: 'Active',
		paused: 'Paused',
		cancelled: 'Cancelled'
	};
	const statusSub: Record<string, string> = {
		active: 'Renewing monthly',
		paused: 'Paused — resume anytime',
		cancelled: 'Subscription ended'
	};

	// Shared enhance handler: toast the action's message and refresh data.
	function withToast(resetAddonId?: string) {
		return () =>
			async ({ result, update }: any) => {
				const msg = result?.data?.message;
				if (result.type === 'success') {
					if (msg) toast.success(msg);
					if (resetAddonId) quantities[resetAddonId] = 0;
				} else if (result.type === 'failure') {
					toast.error(msg ?? 'Something went wrong.');
				}
				await update();
			};
	}
</script>

{#if !data.subscription}
	<!-- No active subscription -->
	<div class="block">
		<div class="delivery-card">
			<div>
				<span class="delivery-card-eyebrow">No subscription</span>
				<div class="delivery-date">You're not subscribed yet.</div>
				<div class="delivery-detail">Start a plan to get injera delivered every month.</div>
			</div>
			<div class="delivery-btns">
				<a href="/subscribe" class="btn btn-full">Choose a plan</a>
			</div>
		</div>
	</div>
{:else}
	<!-- NEXT DELIVERY CARD -->
	<div class="block">
		<div class="delivery-card">
			<div>
				<span class="delivery-card-eyebrow">Next Delivery</span>
				{#if data.nextDelivery}
					<div class="delivery-date">{data.nextDelivery.dateLabel}</div>
					<div class="delivery-detail">
						<strong>{data.nextDelivery.planLabel}</strong> &nbsp;·&nbsp; {data.nextDelivery.addressLine}
					</div>
					<span class="cutoff">Cut-off {data.nextDelivery.cutoffLabel}</span>
				{:else}
					<div class="delivery-date">No delivery scheduled</div>
					<div class="delivery-detail">
						{data.subscription.status === 'paused'
							? 'Your subscription is paused.'
							: 'Your next delivery hasn’t been scheduled yet.'}
					</div>
				{/if}
			</div>
			<div class="delivery-btns">
				<a href="#addons" class="btn btn-full">Add to this order</a>

				{#if data.nextDelivery}
					<form method="POST" action="?/skip" use:enhance={withToast()}>
						<input type="hidden" name="deliveryId" value={data.nextDelivery.id} />
						<button type="submit" class="btn-ghost btn-full">Skip delivery</button>
					</form>
				{/if}

				{#if data.subscription.status === 'paused'}
					<form method="POST" action="?/resume" use:enhance={withToast()}>
						<button type="submit" class="btn-ghost btn-full">Resume subscription</button>
					</form>
				{:else}
					<form method="POST" action="?/pause" use:enhance={withToast()}>
						<button type="submit" class="btn-ghost btn-full">Pause subscription</button>
					</form>
				{/if}
			</div>
		</div>
	</div>

	<!-- SUBSCRIPTION -->
	<div class="block">
		<div class="block-header">
			<h2>Subscription</h2>
			<a href="/account/change-plan" class="block-action">Change plan →</a>
		</div>
		<div class="stats-row">
			<div class="stat">
				<span class="stat-label">Plan</span>
				<div class="stat-value">{data.subscription.planName}</div>
				<div class="stat-sub">{data.subscription.packsLabel}</div>
			</div>
			<div class="stat">
				<span class="stat-label">Next Payment</span>
				<div class="stat-value">{gbp(data.subscription.pricePence)}</div>
				<div class="stat-sub">{data.subscription.nextPaymentDate ?? '—'}</div>
			</div>
			<div class="stat">
				<span class="stat-label">Status</span>
				<div class="stat-value" class:green={data.subscription.status === 'active'}>
					{statusLabel[data.subscription.status] ?? data.subscription.status}
				</div>
				<div class="stat-sub">{statusSub[data.subscription.status] ?? ''}</div>
			</div>
		</div>
	</div>

	<!-- ADD TO THIS DELIVERY -->
	<div class="block" id="addons">
		<div class="block-header">
			<h2>Add to this delivery</h2>
			{#if data.nextDelivery}
				<span class="block-action text-normal">Before {data.nextDelivery.cutoffLabel}</span>
			{/if}
		</div>
		<div class="addons-row">
			{#each data.addons as item (item.id)}
				<div class="addon">
					<div class="addon-img-placeholder">
						<span>{item.name}</span>
					</div>
					<div class="addon-body">
						<div class="addon-head">
							<div class="addon-name">{item.name}</div>
							<div class="addon-price">{gbp(item.pricePence)}</div>
						</div>
						<div class="addon-desc">{item.desc}</div>
						<div class="addon-foot">
							<div class="qty">
								<button type="button" class="qty-btn" onclick={() => updateQty(item.id, -1)}>−</button>
								<div class="qty-n">{quantities[item.id]}</div>
								<button type="button" class="qty-btn" onclick={() => updateQty(item.id, 1)}>+</button>
							</div>
							<form method="POST" action="?/addAddon" use:enhance={withToast(item.id)}>
								<input type="hidden" name="addonId" value={item.id} />
								<input type="hidden" name="quantity" value={quantities[item.id]} />
								<button
									type="submit"
									class="btn-outline"
									disabled={!data.nextDelivery || quantities[item.id] < 1}
								>
									Add
								</button>
							</form>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<a href="/addons" class="see-all">See all add-ons →</a>
	</div>
{/if}

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