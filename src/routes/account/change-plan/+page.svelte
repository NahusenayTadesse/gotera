<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedPlanId = $state(data.currentPlanId);
	let submitted = $state(false);

	const { form, enhance, submitting } = superForm(data.form, {
		onUpdated({ form }) {
			const m = form.message as { type: string; text: string } | undefined;
			if (!m) return;
			if (m.type === 'success') {
				submitted = true;
				toast.success(m.text);
			} else {
				toast.error(m.text);
			}
		}
	});

	function select(id: string) {
		if (id === data.currentPlanId) return;
		selectedPlanId = id;
		$form.plan = id;
	}

	const isDifferent = $derived(selectedPlanId !== data.currentPlanId);
	const current = $derived(data.plans.find((p) => p.id === data.currentPlanId));
	const selected = $derived(data.plans.find((p) => p.id === selectedPlanId));

	const thisMonth = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(new Date());

	// Savings / uplift note, computed from the price + pack difference.
	const changeNote = $derived.by(() => {
		if (!isDifferent || !current || !selected) return '';
		const diff = (selected.pricePence - current.pricePence) / 100;
		const money = (n: number) => `£${Number.isInteger(n) ? n : n.toFixed(2)}`;
		const packs = `Your packs change from ${current.packs} to ${selected.packs} from ${data.effectiveDate}.`;
		if (diff < 0) return `You'll save ${money(Math.abs(diff))} per month. ${packs}`;
		if (diff > 0) return `You'll pay ${money(diff)} more per month. ${packs}`;
		return packs;
	});
</script>

<div class="card">
	<div class="card-head">
		<span class="eyebrow">Subscription</span>
		<h1>Change your plan.</h1>
		<p>Changes take effect from your next billing cycle. Your current delivery is not affected.</p>
	</div>

	{#if !data.subscription}
		<div class="card-body">
			<p class="empty-copy">You don't have an active plan to change.</p>
			<div class="actions">
				<a href="/subscribe" class="btn">Choose a plan</a>
				<a href="/account" class="btn-soft">Back to account</a>
			</div>
		</div>
	{:else if submitted}
		<div class="success">
			<div class="success-icon">
				<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
			</div>
			<h2>Plan changed.</h2>
			<p>
				Your plan changes to {selected?.name} from {data.effectiveDate}. Your {thisMonth} delivery continues
				as normal.
			</p>
			<a href="/account" class="btn" style="max-width:240px;margin:0 auto">Back to account</a>
		</div>
	{:else}
		<div class="card-body">
			{#if data.pending}
				<div class="pending-banner">
					A change to <strong>{data.pending.plan}</strong> is already scheduled for {data.pending.at}.
					Confirming below will replace it.
				</div>
			{/if}

			<div class="plans">
				{#each data.plans as plan (plan.id)}
					<button
						type="button"
						class="plan"
						class:current={plan.id === data.currentPlanId}
						class:selected={plan.id === selectedPlanId && isDifferent}
						onclick={() => select(plan.id)}
						disabled={plan.id === data.currentPlanId}
					>
						<div class="plan-head">
							{#if plan.id === data.currentPlanId}
								<span class="current-tag">Your current plan</span>
							{:else if plan.id === selectedPlanId}
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

			{#if isDifferent && current && selected}
				<div class="change-summary">
					<span class="change-summary-label">Your change</span>
					<div class="change-row">
						<span class="change-row-label">From</span>
						<span class="change-row-val">{current.label}</span>
					</div>
					<div class="change-row">
						<span class="change-row-label">To</span>
						<span class="change-row-val">{selected.label}</span>
					</div>
					<div class="change-row">
						<span class="change-row-label">Takes effect</span>
						<span class="change-row-val">{data.effectiveDate} · next billing cycle</span>
					</div>
					<div class="change-row">
						<span class="change-row-label">This month</span>
						<span class="change-row-val">No change · {thisMonth} delivery continues as normal</span>
					</div>
					{#if changeNote}
						<p class="change-note">{changeNote}</p>
					{/if}
				</div>
			{/if}

			<form method="POST" action="?/changePlan" use:enhance class="actions">
				<input type="hidden" name="plan" bind:value={$form.plan} />
				<button class="btn" disabled={!isDifferent || $submitting}>
					{$submitting ? 'Confirming…' : 'Confirm plan change'}
				</button>
				<a href="/account" class="btn-soft">Cancel</a>
			</form>
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

	.empty-copy { font-size: .9rem; color: var(--taupe); margin-bottom: 20px; }

	.pending-banner {
		background: rgba(181, 98, 42, .08);
		border: 1px solid rgba(181, 98, 42, .2);
		color: #6f4420;
		font-size: .82rem;
		line-height: 1.5;
		padding: 12px 16px;
		margin-bottom: 20px;
	}

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

	/* Change Summary */
	.change-summary { background: var(--panel); border: 1px solid var(--border); padding: 18px 20px; margin-bottom: 24px; }
	.change-summary-label { font-size: .64rem; letter-spacing: .14em; text-transform: uppercase; color: var(--taupe); font-weight: 500; margin-bottom: 10px; display: block; }
	.change-row { display: flex; justify-content: space-between; align-items: baseline; font-size: .88rem; padding: 5px 0; }
	.change-row-label { color: var(--taupe); }
	.change-row-val { color: var(--ink); font-weight: 500; }
	.change-note { font-size: .78rem; color: var(--taupe); margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }

	/* Actions */
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

	/* Success */
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