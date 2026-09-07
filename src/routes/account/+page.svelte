<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { money, monthlyEquivalentPence } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Returning from Stripe after buying an extra. Fulfilment happens in the webhook, which
	// may not have landed by the time the customer gets back here, so the success copy
	// promises the extras "shortly" rather than claiming they're already on the delivery.
	$effect(() => {
		const outcome = page.url.searchParams.get('addons');
		if (!outcome) return;
		if (outcome === 'success') {
			toast.success("Payment received — your extras will be added to the delivery shortly.");
		} else if (outcome === 'canceled') {
			toast.info('Payment cancelled — nothing was charged.');
		}
		// Drop the flag so a refresh or a later navigation doesn't re-toast.
		const next = new URL(page.url);
		next.searchParams.delete('addons');
		history.replaceState(history.state, '', next);
	});

	// Per-add-on quantity steppers (client state; posted on Add). Reading through
	// `qtyOf` keeps this correct when the catalogue changes underneath us.
	/** Mirrors MAX_QTY in +page.server.ts — the server re-checks, this just avoids a bounce. */
	const MAX_QTY = 20;
	let quantities = $state<Record<string, number>>({});
	const qtyOf = (id: string) => quantities[id] ?? 0;

	// Counts for the summary header.
	const activeCount = $derived(data.subscriptions.filter((s) => s.status === 'active').length);
	const pausedCount = $derived(data.subscriptions.filter((s) => s.status === 'paused').length);
	// Only plans that are actually billing count toward the recurring total, and each
	// is normalised to a monthly figure so bi-monthly plans aren't double-counted.
	// pricePence already includes each subscription's quantity.
	const totalMonthlyPence = $derived(
		data.subscriptions
			.filter((s) => s.status === 'active' && !s.cancelAtPeriodEnd)
			.reduce((sum, s) => sum + monthlyEquivalentPence(s.pricePence, s.interval), 0)
	);
	// Total units across all subscriptions, for the summary chip.
	const totalUnits = $derived(data.subscriptions.reduce((sum, s) => sum + (s.quantity ?? 1), 0));

	// Which subscription's upcoming delivery add-ons should land on. Only deliveries
	// still inside their cut-off can be changed.
	const deliverableSubs = $derived(
		data.subscriptions.filter((s) => s.nextDelivery && !s.nextDelivery.pastCutoff)
	);
	// Plain state, not derived: `update()` after every action would otherwise reset the
	// picker to the first plan and silently send the next add-on to the wrong delivery.
	let selectedSubId = $state('');
	$effect(() => {
		if (!deliverableSubs.some((s) => s.id === selectedSubId)) {
			selectedSubId = deliverableSubs[0]?.id ?? '';
		}
	});
	const selectedDelivery = $derived(
		deliverableSubs.find((s) => s.id === selectedSubId)?.nextDelivery ?? null
	);

	// Tracks which form is mid-flight so its button can be disabled — double-clicking
	// "Add" would otherwise add the item twice.
	let pending = $state<string | null>(null);

	// Basket summary for the single checkout button.
	const basketCount = $derived(
		data.addons.reduce((sum, a) => sum + qtyOf(a.id), 0)
	);
	const basketPence = $derived(
		data.addons.reduce((sum, a) => sum + a.pricePence * qtyOf(a.id), 0)
	);

	function updateQty(id: string, change: number) {
		quantities[id] = Math.max(0, Math.min(MAX_QTY, qtyOf(id) + change));
	}

	const gbp = (pence: number) => money(pence);

	// A cancellation redirects back here with ?cancelled=1; without this the customer
	// gets no acknowledgement that it worked.
	let cancelNoticeShown = false;
	$effect(() => {
		if (page.url.searchParams.get('cancelled') === '1' && !cancelNoticeShown) {
			cancelNoticeShown = true;
			toast.success(m.account_cancel_confirmed());
		}
	});

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
	// `formKey` marks this form as in-flight so its submit button can be disabled.
	function withToast(formKey: string) {
		return () => {
			pending = formKey;
			return async ({ result, update }: any) => {
				const msg = result?.data?.message;
				if (result.type === 'success') {
					if (msg) toast.success(msg);
				} else if (result.type === 'failure') {
					toast.error(msg ?? m.account_toast_error_generic());
				}
				await update();
				pending = null;
			};
		};
	}
</script>

<svelte:head>
	<title>{m.account_page_title()}</title>
</svelte:head>

{#if data.notices?.length}
	<div class="notices">
		{#each data.notices as notice (notice.id)}
			<div class="notice" role="status">
				<div>
					<div class="notice-title">{notice.title}</div>
					{#if notice.body}<div class="notice-body">{notice.body}</div>{/if}
				</div>
				<form method="POST" action="?/dismissNotice" use:enhance={withToast(`notice:${notice.id}`)}>
					<input type="hidden" name="id" value={notice.id} />
					<button type="submit" class="notice-close" aria-label="Dismiss">×</button>
				</form>
			</div>
		{/each}
	</div>
{/if}

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
				>{data.subscriptions.length === 1
					? m.account_subscription_singular()
					: m.account_subscription_plural()}</span
			>
		</div>
		<div class="summary-breakdown">
			{#if activeCount}<span class="summary-chip chip-active"
					>{m.account_chip_active({ count: activeCount })}</span
				>{/if}
			{#if pausedCount}<span class="summary-chip chip-paused"
					>{m.account_chip_paused({ count: pausedCount })}</span
				>{/if}
			{#if totalUnits > data.subscriptions.length}<span class="summary-chip"
					>{m.account_chip_units({ count: totalUnits })}</span
				>{/if}
			<span class="summary-total"
				>{gbp(totalMonthlyPence)}
				<span class="summary-total-label">{m.account_month_combined()}</span></span
			>
		</div>
	</div>

	<!-- ONE CARD PER SUBSCRIPTION -->
	{#each data.subscriptions as sub (sub.id)}
		<div class="block">
			<div class="block-header">
				<h2>
					{sub.planName}
					{#if sub.quantity > 1}<span class="qty-pill">×{sub.quantity}</span>{/if}
					<span class="status-pill status-{sub.status}"
						>{statusLabel[sub.status] ?? sub.status}</span
					>
				</h2>
				<a href="/account/change-plan?subscriptionId={sub.id}" class="block-action"
					>{m.account_change_plan_link()}</a
				>
			</div>

			<div class="plan-meta-row">
				<span>{sub.packsLabel}</span>
				{#if sub.quantity > 1}<span>· {m.account_qty_label({ quantity: sub.quantity })}</span>{/if}
				{#if sub.addressLine}<span>· {sub.addressLine}</span>{/if}
			</div>

			{#if sub.cancelAtPeriodEnd}
				<div class="notice notice-warning">
					{#if sub.nextPaymentDate}{m.account_notice_cancelling_with_date({
							date: sub.nextPaymentDate
						})}{:else}{m.account_notice_cancelling()}{/if}
				</div>
			{:else if sub.pendingPlanName}
				<div class="notice">
					{#if sub.pendingPlanAt}
						{m.account_notice_switching_with_date({
							plan: sub.pendingPlanName,
							date: sub.pendingPlanAt
						})}
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
						{#if sub.nextDelivery.pastCutoff}
							<span class="cutoff cutoff-closed">{m.account_cutoff_passed()}</span>
						{:else}
							<span class="cutoff"
								>{m.account_cutoff_label({ cutoff: sub.nextDelivery.cutoffLabel })}</span
							>
						{/if}
					{:else}
						<div class="delivery-date">{m.account_no_delivery_scheduled()}</div>
						<div class="delivery-detail">
							{#if sub.status === 'paused'}
								{m.account_delivery_note_paused()}
							{:else if sub.addressLine}
								{m.account_delivery_note_usually_sent({ address: sub.addressLine })}
							{:else}
								{m.account_delivery_note_not_scheduled()}
							{/if}
						</div>
					{/if}
				</div>
				<div class="delivery-btns">
					{#if sub.nextDelivery && !sub.nextDelivery.pastCutoff}
						<form method="POST" action="?/skip" use:enhance={withToast(`skip:${sub.id}`)}>
							<input type="hidden" name="deliveryId" value={sub.nextDelivery.id} />
							<button
								type="submit"
								class="btn-ghost btn-full"
								disabled={pending === `skip:${sub.id}`}>{m.account_skip_delivery()}</button
							>
						</form>
					{/if}

					{#if sub.status === 'paused'}
						<form method="POST" action="?/resume" use:enhance={withToast(`resume:${sub.id}`)}>
							<input type="hidden" name="subscriptionId" value={sub.id} />
							<button
								type="submit"
								class="btn-ghost btn-full"
								disabled={pending === `resume:${sub.id}`}>{m.account_resume_plan()}</button
							>
						</form>
					{:else if sub.status === 'active' && !sub.cancelAtPeriodEnd}
						<form method="POST" action="?/pause" use:enhance={withToast(`pause:${sub.id}`)}>
							<input type="hidden" name="subscriptionId" value={sub.id} />
							<button
								type="submit"
								class="btn-ghost btn-full"
								disabled={pending === `pause:${sub.id}`}>{m.account_pause_plan()}</button
							>
						</form>
					{/if}

					{#if !sub.cancelAtPeriodEnd}
						<a href="/account/cancel?subscriptionId={sub.id}" class="btn-ghost btn-full">
							{m.account_cancel_plan()}
						</a>
					{/if}
				</div>
			</div>

			<!-- A description list: each label genuinely describes the value under it. -->
			<dl class="stats-row">
				<div class="stat">
					<dt class="stat-label">{m.account_stat_plan_label()}</dt>
					<dd class="stat-value">{sub.planName}</dd>
					<dd class="stat-sub">
						{sub.packsLabel}{#if sub.quantity > 1}
							· {m.account_qty_label({ quantity: sub.quantity })}{/if}
					</dd>
				</div>
				<div class="stat">
					<dt class="stat-label">{m.account_stat_next_payment_label()}</dt>
					<dd class="stat-value">{gbp(sub.pricePence)}</dd>
					<dd class="stat-sub">
						{#if sub.quantity > 1}{gbp(sub.unitPricePence)} × {sub.quantity} ·
						{/if}{sub.nextPaymentDate ?? '—'}
					</dd>
				</div>
				<div class="stat">
					<dt class="stat-label">{m.account_stat_status_label()}</dt>
					<dd class="stat-value" class:green={sub.status === 'active'}>
						{statusLabel[sub.status] ?? sub.status}
					</dd>
					<dd class="stat-sub">{statusSub[sub.status] ?? ''}</dd>
				</div>
			</dl>
		</div>
	{/each}

	<!-- ADD TO A DELIVERY -->
	<div class="block" id="addons">
		<div class="block-header">
			<h2>{m.account_add_to_delivery_title()}</h2>
			{#if selectedDelivery}
				<span class="block-action text-normal"
					>{m.account_before_cutoff({ cutoff: selectedDelivery.cutoffLabel })}</span
				>
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

			<!-- One basket, one payment: the steppers only set local quantities, and every
			     selected add-on is posted together as `qty_<id>` fields. -->
			<form method="POST" action="?/addAddon" use:enhance={withToast('addons')}>
				<input type="hidden" name="deliveryId" value={selectedDelivery?.id ?? ''} />

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
										<button
											type="button"
											class="qty-btn"
											aria-label={m.account_qty_decrease({ name: item.name })}
											onclick={() => updateQty(item.id, -1)}>−</button
										>
										<div class="qty-n" aria-live="polite">{qtyOf(item.id)}</div>
										<button
											type="button"
											class="qty-btn"
											aria-label={m.account_qty_increase({ name: item.name })}
											onclick={() => updateQty(item.id, 1)}>+</button
										>
									</div>
									<input type="hidden" name="qty_{item.id}" value={qtyOf(item.id)} />
								</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="basket-bar">
					<div class="basket-total" aria-live="polite">
						{#if basketCount > 0}
							{basketCount} × {gbp(basketPence)}
						{/if}
					</div>
					<button
						type="submit"
						class="btn-outline"
						disabled={!selectedDelivery || basketCount === 0 || pending === 'addons'}
					>
						{m.account_add_button()}{#if basketCount > 0} · {gbp(basketPence)}{/if}
					</button>
				</div>
			</form>
		{/if}
		<a href="/addons" class="see-all">{m.account_see_all_addons()}</a>
	</div>
{/if}

<style>
	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		gap: 12px;
	}
	p {
		line-height: 1.65;
		color: #4a4440;
	}

	/* SUMMARY HEADER */
	.summary-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 14px;
		background: #fff;
		border: 1px solid var(--border);
		padding: 20px 26px;
		margin-bottom: 32px;
	}
	.summary-count {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.summary-n {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.2rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1;
	}
	.summary-label {
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: var(--taupe);
		text-transform: uppercase;
	}
	.summary-breakdown {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.summary-chip {
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 20px;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--taupe);
	}
	.chip-active {
		color: var(--success, #2f7d4f);
		border-color: rgba(47, 125, 79, 0.3);
		background: rgba(47, 125, 79, 0.08);
	}
	.chip-paused {
		color: #9a7b1f;
		border-color: rgba(154, 123, 31, 0.3);
		background: rgba(154, 123, 31, 0.08);
	}
	.summary-total {
		font-size: 0.95rem;
		color: var(--ink);
		font-weight: 500;
	}
	.summary-total-label {
		font-size: 0.72rem;
		font-weight: 400;
		color: var(--taupe);
		text-transform: none;
		letter-spacing: 0;
	}

	/* PLAN META (packs/frequency/address, shown per card) */
	.plan-meta-row {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		font-size: 0.78rem;
		color: var(--taupe);
		margin-bottom: 14px;
	}

	/* QUANTITY PILL (next to plan name) */
	.qty-pill {
		font-family: 'Jost', sans-serif;
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		padding: 4px 9px;
		border-radius: 20px;
		border: 1px solid rgba(181, 98, 42, 0.3);
		color: var(--copper);
		background: rgba(181, 98, 42, 0.06);
	}

	.block {
		margin-bottom: 44px;
	}
	.block-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
		margin-bottom: 18px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}
	.block-action {
		font-size: 0.75rem;
		color: var(--copper);
		letter-spacing: 0.04em;
		text-decoration: none;
	}
	.block-action:hover {
		text-decoration: underline;
	}
	.text-normal {
		color: var(--taupe);
		cursor: default;
	}
	.text-normal:hover {
		text-decoration: none;
	}

	/* STATUS PILL */
	.status-pill {
		font-family: 'Jost', sans-serif;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
		padding: 4px 9px;
		border-radius: 20px;
		border: 1px solid var(--border);
		color: var(--taupe);
		background: var(--panel);
	}
	.status-pill.status-active {
		color: var(--success, #2f7d4f);
		border-color: rgba(47, 125, 79, 0.3);
		background: rgba(47, 125, 79, 0.08);
	}
	.status-pill.status-paused {
		color: #9a7b1f;
		border-color: rgba(154, 123, 31, 0.3);
		background: rgba(154, 123, 31, 0.08);
	}
	.status-pill.status-cancelled {
		color: #b23a2a;
		border-color: rgba(178, 58, 42, 0.3);
		background: rgba(178, 58, 42, 0.06);
	}
	.status-pill.status-pending {
		color: var(--taupe);
	}

	/* NOTICES */
	.notice {
		font-size: 0.82rem;
		color: #433e39;
		background: var(--panel);
		border: 1px solid var(--border);
		border-left: 3px solid var(--copper);
		padding: 10px 14px;
		margin-bottom: 14px;
	}
	.notice-warning {
		border-left-color: #b23a2a;
	}

	/* DELIVERY PANEL ELEMENT */
	.delivery-card {
		background: #fff;
		border: 1px solid var(--border);
		border-left: 3px solid var(--copper);
		padding: 26px 28px;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 32px;
		align-items: center;
		margin-bottom: 1px;
	}
	.delivery-card-eyebrow {
		font-size: 0.65rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
		margin-bottom: 8px;
		display: block;
		font-weight: 500;
	}
	.delivery-date {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.6rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1;
		margin-bottom: 6px;
	}
	.delivery-detail {
		font-size: 0.82rem;
		color: var(--taupe);
		margin-bottom: 12px;
	}
	.cutoff {
		display: inline-block;
		font-size: 0.72rem;
		color: var(--copper);
		background: rgba(181, 98, 42, 0.06);
		border: 1px solid rgba(181, 98, 42, 0.2);
		padding: 4px 10px;
		letter-spacing: 0.06em;
	}
	.cutoff-closed {
		color: var(--taupe);
		background: var(--panel);
		border-color: var(--border);
	}
	.delivery-btns {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 168px;
	}

	/* BUTTON SYSTEM */
	.btn,
	.btn-outline,
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 40px;
		padding: 0 16px;
		border-radius: 2px;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all 0.15s;
		white-space: nowrap;
		text-decoration: none;
		font-family: inherit;
	}
	.btn {
		background: var(--copper);
		color: #fff;
		border-color: var(--copper);
	}
	.btn:hover {
		background: #9a4f22;
		border-color: #9a4f22;
	}
	.btn-outline {
		border-color: rgba(181, 98, 42, 0.3);
		color: var(--copper);
		background: transparent;
	}
	.btn-outline:hover {
		background: rgba(181, 98, 42, 0.05);
	}
	.btn-ghost {
		background: var(--panel);
		border-color: var(--border);
		color: var(--ink);
	}
	.btn-ghost:hover {
		background: var(--border);
	}
	.btn-full {
		width: 100%;
	}

	/* STATS SEGMENT */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-top: none;
		margin: 0;
	}
	.stat {
		background: #fff;
		padding: 22px 24px;
	}
	.stat-label {
		font-size: 0.63rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--taupe);
		margin-bottom: 8px;
		display: block;
		font-weight: 500;
	}
	.stat-value {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.9rem;
		line-height: 1;
		color: var(--ink);
		margin: 0 0 4px;
	}
	.stat-sub {
		font-size: 0.78rem;
		color: var(--taupe);
		margin: 0;
	}
	.stat-value.green {
		color: var(--success);
	}

	/* ADD-TO-DELIVERY TARGET PICKER */
	.empty-note {
		font-size: 0.85rem;
		color: var(--taupe);
		margin-bottom: 16px;
	}
	.target-label {
		display: block;
		font-size: 0.63rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
		margin-bottom: 6px;
	}
	.target-select {
		width: 100%;
		max-width: 360px;
		border: 1px solid var(--border);
		background: #fff;
		padding: 10px 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.85rem;
		color: var(--ink);
		margin-bottom: 20px;
	}

	/* ADDONS TILES */
	.notices {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.notice {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		border: 1px solid var(--border, #e5e5e5);
		border-left: 3px solid var(--copper, #b87333);
		border-radius: 0.5rem;
		padding: 0.85rem 1rem;
		background: var(--card, #fff);
	}

	.notice-title {
		font-weight: 600;
		font-size: 0.92rem;
	}

	.notice-body {
		font-size: 0.85rem;
		opacity: 0.8;
		margin-top: 0.15rem;
	}

	.notice-close {
		border: 0;
		background: none;
		cursor: pointer;
		font-size: 1.25rem;
		line-height: 1;
		opacity: 0.6;
	}

	.notice-close:hover {
		opacity: 1;
	}

	.basket-bar {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.basket-total {
		font-size: 0.85rem;
		color: var(--muted-foreground, #666);
	}

	.addons-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}
	.addon {
		background: #fff;
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.addon-img-placeholder {
		width: 100%;
		height: 140px;
		background: var(--panel);
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid var(--border);
	}
	.addon-img-placeholder span {
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
	}
	.addon-body {
		padding: 16px;
	}
	.addon-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 5px;
	}
	.addon-name {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.2rem;
		font-weight: 600;
	}
	.addon-price {
		font-size: 0.8rem;
		color: var(--copper);
		font-weight: 500;
		margin-top: 3px;
	}
	.addon-desc {
		font-size: 0.81rem;
		color: var(--taupe);
		margin-bottom: 14px;
		line-height: 1.5;
	}
	.addon-foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* QUANTITY CONTROLLER */
	.qty {
		display: flex;
		align-items: center;
		border: 1px solid var(--border);
	}
	.qty-btn {
		width: 30px;
		height: 30px;
		background: #fff;
		border: none;
		color: var(--ink);
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.qty-btn:hover {
		background: var(--panel);
	}
	.qty-n {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.84rem;
		border-left: 1px solid var(--border);
		border-right: 1px solid var(--border);
	}

	.see-all {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 16px;
		font-size: 0.76rem;
		color: var(--copper);
		letter-spacing: 0.04em;
		text-decoration: none;
	}
	.see-all:hover {
		text-decoration: underline;
	}

	@media (max-width: 1020px) {
		.addons-row {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 800px) {
		.delivery-card {
			grid-template-columns: 1fr;
		}
		.delivery-btns {
			flex-direction: row;
			flex-wrap: wrap;
		}
		.stats-row {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 560px) {
		.addons-row,
		.stats-row {
			grid-template-columns: 1fr;
		}
	}
</style>
