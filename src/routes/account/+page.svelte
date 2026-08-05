<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Per-add-on quantity steppers (client state; posted on Add).
	let quantities = $state<Record<string, number>>(
		Object.fromEntries(data.addons.map((a) => [a.id, 0]))
	);

	// Counts for the summary header.
	const activeCount = $derived(data.subscriptions.filter((s) => s.status === 'active').length);
	const pausedCount = $derived(data.subscriptions.filter((s) => s.status === 'paused').length);
	// pricePence already includes each subscription's quantity, so this stays correct.
	const totalMonthlyPence = $derived(
		data.subscriptions
		
			.reduce((sum, s) => sum + s.pricePence, 0)
	);
	// Total units across all subscriptions, for the summary chip.
	const totalUnits = $derived(
		data.subscriptions.reduce((sum, s) => sum + (s.quantity ?? 1), 0)
	);

	// Which subscription's upcoming delivery add-ons should land on.
	const deliverableSubs = $derived(data.subscriptions.filter((s) => s.nextDelivery));
	let selectedSubId = $derived(deliverableSubs[0]?.id ?? '');
	const selectedDelivery = $derived(
		deliverableSubs.find((s) => s.id === selectedSubId)?.nextDelivery ?? null
	);

	function updateQty(id: string, change: number) {
		quantities[id] = Math.max(0, (quantities[id] ?? 0) + change);
	}

	const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;

	const statusLabel: Record<string, string> = $derived({
		pending: m.account_status_pending(),
		active: m.account_status_active(),
		paused: m.account_status_paused(),
		cancelled: m.account_status_cancelled()
	});
	const statusSub: Record<string, string> = $derived({
		pending: m.account_status_sub_pending(),
		active: m.account_status_sub_active(),
		paused: m.account_status_sub_paused(),
		cancelled: m.account_status_sub_cancelled()
	});

	// Shared enhance handler: toast the action's message and refresh data.
	function withToast(resetAddonId?: string) {
		return () =>
			async ({ result, update }: any) => {
				const msg = result?.data?.message;
				if (result.type === 'success') {
					if (msg) toast.success(msg);
					if (resetAddonId) quantities[resetAddonId] = 0;
				} else if (result.type === 'failure') {
					toast.error(msg ?? m.account_toast_error_generic());
				}
				await update();
			};
	}
</script>


{#if data.subscriptions.length === 0}
	<!-- No active subscriptions -->
	<div class="block">
		<div class="delivery-card">
			<div>
				<span class="delivery-card-eyebrow">{m.account_no_subs_eyebrow()}</span>
				<div class="delivery-date">{m.account_no_subs_title()}</div>
				<div class="delivery-detail">{m.account_no_subs_detail()}</div>
			</div>
			<div class="delivery-btns">
				<a href="/subscribe" class="btn btn-full">{m.account_choose_plan()}</a>
			</div>
		</div>
	</div>
{:else}
	<!-- SUMMARY HEADER -->
	<div class="summary-bar">
		<div class="summary-count">
			<span class="summary-n">{data.subscriptions.length}</span>
			<span class="summary-label"
				>{data.subscriptions.length === 1 ? m.account_subscription_singular() : m.account_subscription_plural()}</span
			>
		</div>
		<div class="summary-breakdown">
			{#if activeCount}<span class="summary-chip chip-active">{m.account_chip_active({ count: activeCount })}</span>{/if}
			{#if pausedCount}<span class="summary-chip chip-paused">{m.account_chip_paused({ count: pausedCount })}</span>{/if}
			{#if totalUnits > data.subscriptions.length}<span class="summary-chip">{m.account_chip_units({ count: totalUnits })}</span>{/if}
			<span class="summary-total">{gbp(totalMonthlyPence)} <span class="summary-total-label">{m.account_month_combined()}</span></span>
		</div>
	</div>

	<!-- ONE CARD PER SUBSCRIPTION -->
	{#each data.subscriptions as sub (sub.id)}
		<div class="block">
			<div class="block-header">
				<h2>
					{sub.planName}
					{#if sub.quantity > 1}<span class="qty-pill">×{sub.quantity}</span>{/if}
					<span class="status-pill status-{sub.status}">{statusLabel[sub.status] ?? sub.status}</span>
				</h2>
				<a href="/account/change-plan?subscriptionId={sub.id}" class="block-action">{m.account_change_plan_link()}</a>
			</div>

			<div class="plan-meta-row">
				<span>{sub.packsLabel}</span>
				{#if sub.quantity > 1}<span>· {m.account_qty_label({ quantity: sub.quantity })}</span>{/if}
				{#if sub.addressLine}<span>· {sub.addressLine}</span>{/if}
			</div>

			{#if sub.cancelAtPeriodEnd}
				<div class="notice notice-warning">
					{#if sub.nextPaymentDate}{m.account_notice_cancelling_with_date({ date: sub.nextPaymentDate })}{:else}{m.account_notice_cancelling()}{/if}
				</div>
			{:else if sub.pendingPlanName}
				<div class="notice">
					{#if sub.pendingPlanAt}
						{m.account_notice_switching_with_date({ plan: sub.pendingPlanName, date: sub.pendingPlanAt })}
					{:else}
						{m.account_notice_switching({ plan: sub.pendingPlanName })}
					{/if}
				</div>
			{/if}

			<div class="delivery-card">
				<div>
					<span class="delivery-card-eyebrow">{m.account_next_delivery_eyebrow()}</span>
					{#if sub.nextDelivery}
						<div class="delivery-date">{sub.nextDelivery.dateLabel}</div>
						<div class="delivery-detail">{sub.nextDelivery.addressLine}</div>
						<span class="cutoff">{m.account_cutoff_label({ cutoff: sub.nextDelivery.cutoffLabel })}</span>
					{:else}
						<div class="delivery-date">{m.account_no_delivery_scheduled()}</div>
						<div class="delivery-detail">
							{#if sub.status === 'paused'}
								{m.account_delivery_note_paused()}
							{:else if sub.status === 'cancelled'}
								{m.account_delivery_note_cancelled()}
							{:else if sub.addressLine}
								{m.account_delivery_note_usually_sent({ address: sub.addressLine })}
							{:else}
								{m.account_delivery_note_not_scheduled()}
							{/if}
						</div>
					{/if}
				</div>
				<div class="delivery-btns">
					{#if sub.nextDelivery}
						<form method="POST" action="?/skip" use:enhance={withToast()}>
							<input type="hidden" name="deliveryId" value={sub.nextDelivery.id} />
							<button type="submit" class="btn-ghost btn-full">{m.account_skip_delivery()}</button>
						</form>
					{/if}

					{#if sub.status === 'paused'}
						<form method="POST" action="?/resume" use:enhance={withToast()}>
							<input type="hidden" name="subscriptionId" value={sub.id} />
							<button type="submit" class="btn-ghost btn-full">{m.account_resume_plan()}</button>
						</form>
					{:else if sub.status === 'active' && !sub.cancelAtPeriodEnd}
						<form method="POST" action="?/pause" use:enhance={withToast()}>
							<input type="hidden" name="subscriptionId" value={sub.id} />
							<button type="submit" class="btn-ghost btn-full">{m.account_pause_plan()}</button>
						</form>
					{/if}

					{#if sub.status !== 'cancelled' && !sub.cancelAtPeriodEnd}
						<a href="/account/cancel?subscriptionId={sub.id}" class="btn-ghost btn-full">
							{m.account_cancel_plan()}
						</a>
					{/if}
				</div>
			</div>

			<div class="stats-row">
				<div class="stat">
					<span class="stat-label">{m.account_stat_plan_label()}</span>
					<div class="stat-value">{sub.planName}</div>
					<div class="stat-sub">
						{sub.packsLabel}{#if sub.quantity > 1} · {m.account_qty_label({ quantity: sub.quantity })}{/if}
					</div>
				</div>
				<div class="stat">
					<span class="stat-label">{m.account_stat_next_payment_label()}</span>
					<div class="stat-value">{gbp(sub.pricePence)}</div>
					<div class="stat-sub">
						{#if sub.quantity > 1}{gbp(sub.unitPricePence)} × {sub.quantity} · {/if}{sub.nextPaymentDate ?? '—'}
					</div>
				</div>
				<div class="stat">
					<span class="stat-label">{m.account_stat_status_label()}</span>
					<div class="stat-value" class:green={sub.status === 'active'}>
						{statusLabel[sub.status] ?? sub.status}
					</div>
					<div class="stat-sub">{statusSub[sub.status] ?? ''}</div>
				</div>
			</div>
		</div>
	{/each}

	<!-- ADD TO A DELIVERY -->
	<div class="block" id="addons">
		<div class="block-header">
			<h2>{m.account_add_to_delivery_title()}</h2>
			{#if selectedDelivery}
				<span class="block-action text-normal">{m.account_before_cutoff({ cutoff: selectedDelivery.cutoffLabel })}</span>
			{/if}
		</div>

		{#if deliverableSubs.length === 0}
			<p class="empty-note">{m.account_no_upcoming_deliveries()}</p>
		{:else}
			{#if deliverableSubs.length > 1}
				<label class="target-label" for="target-sub">{m.account_adding_to_label()}</label>
				<select id="target-sub" class="target-select" bind:value={selectedSubId}>
					{#each deliverableSubs as s (s.id)}
						<option value={s.id}>{s.planName} — {s.nextDelivery?.dateLabel}</option>
					{/each}
				</select>
			{/if}

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
									<button type="button" class="qty-btn" onclick={() => updateQty(item.id, -1)}
										>−</button
									>
									<div class="qty-n">{quantities[item.id]}</div>
									<button type="button" class="qty-btn" onclick={() => updateQty(item.id, 1)}
										>+</button
									>
								</div>
								<form method="POST" action="?/addAddon" use:enhance={withToast(item.id)}>
									<input type="hidden" name="addonId" value={item.id} />
									<input type="hidden" name="deliveryId" value={selectedDelivery?.id ?? ''} />
									<input type="hidden" name="quantity" value={quantities[item.id]} />
									<button
										type="submit"
										class="btn-outline"
										disabled={!selectedDelivery || quantities[item.id] < 1}
									>
										{m.account_add_button()}
									</button>
								</form>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<a href="/addons" class="see-all">{m.account_see_all_addons()}</a>
	</div>
{/if}

<style>
  h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; display: flex; align-items: center; gap: 12px; }
  p { line-height: 1.65; color: #4a4440; }

  /* SUMMARY HEADER */
  .summary-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; background: #fff; border: 1px solid var(--border); padding: 20px 26px; margin-bottom: 32px; }
  .summary-count { display: flex; align-items: baseline; gap: 8px; }
  .summary-n { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-style: italic; color: var(--ink); line-height: 1; }
  .summary-label { font-size: .78rem; letter-spacing: .04em; color: var(--taupe); text-transform: uppercase; }
  .summary-breakdown { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .summary-chip { font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 500; padding: 4px 10px; border-radius: 20px; border: 1px solid var(--border); background: var(--panel); color: var(--taupe); }
  .chip-active { color: var(--success, #2f7d4f); border-color: rgba(47,125,79,.3); background: rgba(47,125,79,.08); }
  .chip-paused { color: #9a7b1f; border-color: rgba(154,123,31,.3); background: rgba(154,123,31,.08); }
  .summary-total { font-size: .95rem; color: var(--ink); font-weight: 500; }
  .summary-total-label { font-size: .72rem; font-weight: 400; color: var(--taupe); text-transform: none; letter-spacing: 0; }

  /* PLAN META (packs/frequency/address, shown per card) */
  .plan-meta-row { display: flex; gap: 6px; flex-wrap: wrap; font-size: .78rem; color: var(--taupe); margin-bottom: 14px; }

  /* QUANTITY PILL (next to plan name) */
  .qty-pill { font-family: 'Jost', sans-serif; font-size: .62rem; font-weight: 600; letter-spacing: .06em; padding: 4px 9px; border-radius: 20px; border: 1px solid rgba(181,98,42,.3); color: var(--copper); background: rgba(181,98,42,.06); }

  .block { margin-bottom: 44px; }
  .block-header { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .block-action { font-size: .75rem; color: var(--copper); letter-spacing: .04em; text-decoration: none; }
  .block-action:hover { text-decoration: underline; }
  .text-normal { color: var(--taupe); cursor: default; }
  .text-normal:hover { text-decoration: none; }

  /* STATUS PILL */
  .status-pill { font-family: 'Jost', sans-serif; font-size: .6rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 500; padding: 4px 9px; border-radius: 20px; border: 1px solid var(--border); color: var(--taupe); background: var(--panel); }
  .status-pill.status-active { color: var(--success, #2f7d4f); border-color: rgba(47,125,79,.3); background: rgba(47,125,79,.08); }
  .status-pill.status-paused { color: #9a7b1f; border-color: rgba(154,123,31,.3); background: rgba(154,123,31,.08); }
  .status-pill.status-cancelled { color: #b23a2a; border-color: rgba(178,58,42,.3); background: rgba(178,58,42,.06); }
  .status-pill.status-pending { color: var(--taupe); }

  /* NOTICES */
  .notice { font-size: .82rem; color: #433e39; background: var(--panel); border: 1px solid var(--border); border-left: 3px solid var(--copper); padding: 10px 14px; margin-bottom: 14px; }
  .notice-warning { border-left-color: #b23a2a; }
  .notice strong { color: var(--ink); }

  /* DELIVERY PANEL ELEMENT */
  .delivery-card { background: #fff; border: 1px solid var(--border); border-left: 3px solid var(--copper); padding: 26px 28px; display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center; margin-bottom: 1px; }
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
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-top: none; }
  .stat { background: #fff; padding: 22px 24px; }
  .stat-label { font-size: .63rem; letter-spacing: .16em; text-transform: uppercase; color: var(--taupe); margin-bottom: 8px; display: block; font-weight: 500; }
  .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; line-height: 1; color: var(--ink); margin-bottom: 4px; }
  .stat-sub { font-size: .78rem; color: var(--taupe); }
  .stat-value.green { color: var(--success); }

  /* ADD-TO-DELIVERY TARGET PICKER */
  .empty-note { font-size: .85rem; color: var(--taupe); margin-bottom: 16px; }
  .target-label { display: block; font-size: .63rem; letter-spacing: .16em; text-transform: uppercase; color: var(--taupe); font-weight: 500; margin-bottom: 6px; }
  .target-select { width: 100%; max-width: 360px; border: 1px solid var(--border); background: #fff; padding: 10px 12px; font-family: 'Jost', sans-serif; font-size: .85rem; color: var(--ink); margin-bottom: 20px; }

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