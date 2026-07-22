<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { cancelSchema } from './schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(cancelSchema),
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.text);
			} else if (form.message?.type === 'success') {
				toast.success(form.message.text);
				goto('/account');
			}
		}
	});

	const reasons = [
		{ value: 'too_expensive', label: 'Too expensive' },
		{ value: 'too_much_food', label: 'Too much injera' },
		{ value: 'taking_a_break', label: 'Just taking a break' },
		{ value: 'moving', label: 'Moving / delivery area' },
		{ value: 'quality', label: 'Not happy with quality' },
		{ value: 'other', label: 'Something else' }
	];

	// Cancellable plans only — an already-cancelling plan can't be re-selected
	const cancellable = $derived(data.plansList.filter((p) => !p.cancelAtPeriodEnd));

	const selected = $derived(data.plansList.find((p) => p.id === $form.subscriptionId) ?? null);
</script>

<svelte:head>
	<title>Cancel a plan — GOTERA</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="wrap">
	<div class="card">
		<span class="eyebrow">Manage subscriptions</span>
		<h1>Cancel a plan.</h1>

		{#if data.plansList.length === 0}
			<p class="lead">You don't have any active plans to cancel.</p>
			<div class="actions">
				<a href="/account" class="btn btn-ghost">Back to account</a>
			</div>
		{:else}
			<p class="lead">
				You have {data.plansList.length} active
				{data.plansList.length === 1 ? 'plan' : 'plans'}. Cancelling one leaves the rest untouched.
			</p>

			<form method="POST" use:enhance class="form">
				<!-- Choose which subscription to cancel -->
				<fieldset class="plan-list">
					<legend>Which plan?</legend>
					{#each data.plansList as p (p.id)}
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
										>{p.planName}{#if p.quantity > 1}<span class="qty-pill">×{p.quantity}</span
											>{/if}</span
									>
									<span class="plan-price">£{p.price.toFixed(2)}</span>
								</div>
								<div class="plan-meta">
									{#if p.addressLabel}<span class="plan-addr">{p.addressLabel}</span> · {/if}{p.freq}{#if p.quantity > 1}
										· £{p.unitPrice.toFixed(2)} × {p.quantity}{/if}
								</div>
								{#if p.cancelAtPeriodEnd}
									<span class="plan-flag"
										>Already cancelling{p.periodEndLabel ? ` — ends ${p.periodEndLabel}` : ''}</span
									>
								{/if}
							</div>
						</label>
					{/each}
				</fieldset>
				{#if $errors.subscriptionId}<span class="form-error">{$errors.subscriptionId}</span>{/if}

				{#if selected && !selected.cancelAtPeriodEnd}
					<div class="keep-note">
						{#if selected.periodEndLabel}
							This plan stays active until <strong>{selected.periodEndLabel}</strong>. You'll keep
							any delivery already paid for and won't be charged again after that.
						{:else}
							Cancelling stops future charges. You'll keep anything already paid for.
						{/if}
					</div>

					<fieldset class="reasons">
						<legend>Mind telling us why? <span class="opt">(optional)</span></legend>
						{#each reasons as r (r.value)}
							<label class="reason" class:active={$form.reason === r.value}>
								<input type="radio" name="reason" value={r.value} bind:group={$form.reason} />
								<span>{r.label}</span>
							</label>
						{/each}
					</fieldset>

					<div class="field">
						<label class="field-label" for="feedback"
							>Anything we could do better? <span class="opt">(optional)</span></label
						>
						<textarea
							id="feedback"
							name="feedback"
							class="textarea"
							rows="3"
							bind:value={$form.feedback}
						></textarea>
					</div>

					<label class="confirm">
						<input type="checkbox" name="confirm" bind:checked={$form.confirm} />
						<span
							>I understand my <strong>{selected.planName}</strong>{#if selected.quantity > 1} (×{selected.quantity}){/if}
							plan will end{selected.periodEndLabel ? ` on ${selected.periodEndLabel}` : ''}.</span
						>
					</label>
					{#if $errors.confirm}<span class="form-error">{$errors.confirm}</span>{/if}
				{/if}

				<div class="actions">
					<a href="/account" class="btn btn-ghost">Keep all my plans</a>
					<button
						type="submit"
						class="btn btn-danger"
						disabled={$submitting || !selected || selected.cancelAtPeriodEnd || !$form.confirm}
					>
						{$submitting ? 'Cancelling…' : 'Cancel this plan'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	:global(:root) {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #b5622a;
		--taupe: #7a746e;
		--border: #e8e4e0;
		--panel: #f5f2ed;
	}
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
	.opt {
		text-transform: none;
		letter-spacing: 0;
		color: rgba(122, 116, 110, 0.7);
		font-weight: 400;
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
	/* Keep note */
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
	/* Reasons */
	.reasons {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.reason {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 14px;
		border: 1px solid var(--border);
		cursor: pointer;
		font-size: 0.88rem;
		color: #433e39;
		transition:
			border-color 0.12s,
			background 0.12s;
	}
	.reason:hover {
		border-color: rgba(181, 98, 42, 0.35);
	}
	.reason.active {
		border-color: var(--copper);
		background: #fbf4ee;
	}
	.reason input {
		accent-color: var(--copper);
	}
	.field {
		display: flex;
		flex-direction: column;
	}
	.field-label {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 8px;
	}
	.textarea {
		width: 100%;
		border: 1px solid rgba(122, 116, 110, 0.22);
		background: #fff;
		padding: 10px 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.9rem;
		color: var(--ink);
		resize: vertical;
		line-height: 1.5;
	}
	.textarea:focus {
		outline: none;
		border-color: var(--copper);
	}
	.confirm {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 0.85rem;
		color: #433e39;
		cursor: pointer;
		line-height: 1.5;
	}
	.confirm input {
		margin-top: 2px;
		width: 16px;
		height: 16px;
		accent-color: var(--copper);
		flex-shrink: 0;
	}
	.confirm strong {
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
	.btn-danger {
		background: #fff;
		border-color: #b23a2a;
		color: #b23a2a;
	}
	.btn-danger:hover:not([disabled]) {
		background: #b23a2a;
		color: #fff;
	}
	.btn-danger[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>