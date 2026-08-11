<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { changePlanSchema } from './schema';
	import type { PageData } from './$types';
	import { m } from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(changePlanSchema),
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.text);
			} else if (form.message?.type === 'success') {
				toast.success(form.message.text);
				goto('/account');
			}
		}
	});

	// A plan on its way out can't also be switched — cancelling wins.
	const changeable = $derived(data.subscriptionsList.filter((p) => !p.cancelAtPeriodEnd));

	const selected = $derived(
		data.subscriptionsList.find((p) => p.id === $form.subscriptionId) ?? null
	);

	// Never offer the plan they are already on as a destination.
	const alternatives = $derived(
		selected ? data.planOptions.filter((p) => p.id !== selected.planId) : data.planOptions
	);

	const target = $derived(data.planOptions.find((p) => p.id === $form.planId) ?? null);

	// Changing which subscription is selected invalidates a destination that is no
	// longer on offer (you can't switch a plan to itself).
	$effect(() => {
		if ($form.planId && !alternatives.some((p) => p.id === $form.planId)) {
			$form.planId = '';
		}
	});
</script>

<svelte:head>
	<title>{m.acctplan_page_title()}</title>
</svelte:head>

<div class="wrap">
	<div class="card">
		<span class="eyebrow">{m.acctplan_eyebrow()}</span>
		<h1>{m.acctplan_heading()}</h1>

		{#if changeable.length === 0}
			<p class="lead">{m.acctplan_empty_lead()}</p>
			<div class="actions">
				<a href="/account" class="btn btn-ghost">{m.acctplan_back_to_account()}</a>
			</div>
		{:else}
			<p class="lead">
				{m.acctplan_lead({
					count: changeable.length,
					planWord:
						changeable.length === 1
							? m.acctplan_plan_word_singular()
							: m.acctplan_plan_word_plural()
				})}
			</p>

			<form method="POST" use:enhance class="form">
				<!-- Which subscription is being changed -->
				<fieldset class="plan-list">
					<legend>{m.acctplan_which_plan()}</legend>
					{#each data.subscriptionsList as p (p.id)}
						<label
							class="plan-row"
							class:active={$form.subscriptionId === p.id}
							class:disabled={p.cancelAtPeriodEnd}
						>
							<input
								type="radio"
								name="subscriptionId"
								value={p.id}
								bind:group={$form.subscriptionId}
								disabled={p.cancelAtPeriodEnd}
							/>
							<div class="plan-info">
								<div class="plan-top">
									<span class="plan-name"
										>{p.planName}{#if p.quantity > 1}<span class="qty-pill"
												>{m.acctplan_qty_pill({ quantity: p.quantity })}</span
											>{/if}</span
									>
									<span class="plan-price">{p.price}</span>
								</div>
								<div class="plan-meta">
									{#if p.addressLabel}<span class="plan-addr">{p.addressLabel}</span> ·
									{/if}{p.freq}{#if p.quantity > 1}
										· {p.unitPrice} × {p.quantity}{/if}
								</div>
								{#if p.cancelAtPeriodEnd}
									<span class="plan-flag"
										>{m.acctplan_already_cancelling()}{p.periodEndLabel
											? ` — ${m.acctplan_ends_on({ date: p.periodEndLabel })}`
											: ''}</span
									>
								{:else if p.pendingPlanName}
									<span class="plan-note"
										>{m.acctplan_pending_switch({ plan: p.pendingPlanName })}</span
									>
								{/if}
							</div>
						</label>
					{/each}
				</fieldset>
				{#if $errors.subscriptionId}<span class="form-error">{$errors.subscriptionId}</span>{/if}

				{#if selected && !selected.cancelAtPeriodEnd}
					<!-- What it becomes -->
					<fieldset class="plan-list">
						<legend>{m.acctplan_choose_new()}</legend>

						{#if alternatives.length === 0}
							<p class="empty-note">{m.acctplan_no_alternatives()}</p>
						{:else}
							{#each data.planOptions as option (option.id)}
								{@const isCurrent = option.id === selected.planId}
								<label
									class="plan-row"
									class:active={$form.planId === option.id}
									class:disabled={isCurrent}
								>
									<input
										type="radio"
										name="planId"
										value={option.id}
										bind:group={$form.planId}
										disabled={isCurrent}
									/>
									<div class="plan-info">
										<div class="plan-top">
											<span class="plan-name">{option.name}</span>
											<span class="plan-price">{option.price}</span>
										</div>
										<div class="plan-meta">
											{option.freq}{#if option.subtitle}
												· {option.subtitle}{/if}
										</div>
										{#if isCurrent}
											<span class="plan-note">{m.acctplan_current_badge()}</span>
										{/if}
									</div>
								</label>
							{/each}
						{/if}
					</fieldset>
					{#if $errors.planId}<span class="form-error">{$errors.planId}</span>{/if}

					{#if target}
						<div class="keep-note">
							{#if selected.periodEndLabel}
								{m.acctplan_switch_note_prefix()}
								<strong>{selected.periodEndLabel}</strong>. {m.acctplan_switch_note_suffix()}
							{:else}
								{m.acctplan_switch_note_no_date()}
							{/if}
						</div>
					{/if}
				{/if}

				<div class="actions">
					<a href="/account" class="btn btn-ghost">{m.acctplan_never_mind_button()}</a>
					<button
						type="submit"
						class="btn btn-primary"
						disabled={$submitting || !selected || selected.cancelAtPeriodEnd || !target}
					>
						{$submitting ? m.acctplan_submitting() : m.acctplan_submit_button()}
					</button>
				</div>
			</form>

			<p class="footnote">
				{m.acctplan_cancel_prompt()}
				<a href="/account/cancel">{m.acctplan_cancel_link()}</a>
			</p>
		{/if}
	</div>
</div>

<style>
	.wrap {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 40px 16px;
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		font-family: 'Jost', sans-serif;
		color: var(--ink);
	}
	.card {
		width: min(540px, 100%);
		background: #fff;
		border: 1px solid var(--border);
		padding: 40px 36px;
	}
	.eyebrow {
		display: block;
		margin-bottom: 10px;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
	}
	h1 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: clamp(1.9rem, 5vw, 2.5rem);
		line-height: 1.02;
		margin-bottom: 14px;
	}
	.lead {
		font-size: 0.9rem;
		color: #433e39;
		line-height: 1.65;
		margin-bottom: 24px;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
	}
	legend {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 10px;
		padding: 0;
	}
	/* Plan chooser */
	.plan-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.plan-row {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px;
		border: 1px solid var(--border);
		cursor: pointer;
		transition:
			border-color 0.12s,
			background 0.12s;
	}
	.plan-row:hover:not(.disabled) {
		border-color: rgba(181, 98, 42, 0.35);
	}
	.plan-row.active {
		border-color: var(--copper);
		background: #fbf4ee;
	}
	.plan-row.disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
	.plan-row input {
		margin-top: 3px;
		accent-color: var(--copper);
		flex-shrink: 0;
	}
	.plan-info {
		flex: 1;
	}
	.plan-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.plan-name {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--ink);
		display: inline-flex;
		align-items: baseline;
		gap: 8px;
	}
	/* Quantity pill next to plan name */
	.qty-pill {
		font-family: 'Jost', sans-serif;
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		padding: 3px 8px;
		border-radius: 20px;
		border: 1px solid rgba(181, 98, 42, 0.3);
		color: var(--copper);
		background: rgba(181, 98, 42, 0.06);
		transform: translateY(-1px);
	}
	.plan-price {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.1rem;
		color: var(--copper);
	}
	.plan-meta {
		font-size: 0.76rem;
		color: var(--taupe);
		margin-top: 2px;
	}
	.plan-addr {
		color: var(--ink);
		font-weight: 500;
	}
	.plan-flag {
		display: inline-block;
		margin-top: 6px;
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #b23a2a;
	}
	.plan-note {
		display: inline-block;
		margin-top: 6px;
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--taupe);
	}
	.empty-note {
		font-size: 0.85rem;
		color: var(--taupe);
	}
	/* What happens next */
	.keep-note {
		font-size: 0.85rem;
		color: #433e39;
		line-height: 1.6;
		padding: 14px;
		background: var(--panel);
		border: 1px solid var(--border);
	}
	.keep-note strong {
		color: var(--ink);
	}
	.form-error {
		display: block;
		font-size: 0.76rem;
		color: #b23a2a;
	}
	.actions {
		display: flex;
		gap: 10px;
		margin-top: 6px;
		flex-wrap: wrap;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 46px;
		padding: 0 20px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		cursor: pointer;
		font-family: 'Jost', sans-serif;
		text-decoration: none;
		border: 1px solid transparent;
		flex: 1;
	}
	.btn-ghost {
		border-color: var(--border);
		background: #fff;
		color: var(--ink);
	}
	.btn-ghost:hover {
		background: var(--panel);
	}
	.btn-primary {
		background: var(--copper);
		border-color: var(--copper);
		color: #fff;
	}
	.btn-primary:hover:not([disabled]) {
		background: #9a4f22;
		border-color: #9a4f22;
	}
	.btn-primary[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.footnote {
		margin-top: 22px;
		padding-top: 16px;
		border-top: 1px solid var(--border);
		font-size: 0.8rem;
		color: var(--taupe);
	}
	.footnote a {
		color: var(--copper);
	}
	.footnote a:hover {
		text-decoration: underline;
	}
</style>
