<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { money } from '$lib/format';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let quantities = $state<Record<string, number>>({});
	const qtyOf = (id: string) => quantities[id] ?? 0;
	const setQty = (id: string, value: number) => {
		quantities[id] = Math.max(0, Math.min(data.maxQty, Math.round(value)));
	};

	const totalPence = $derived(
		data.catalogue.reduce((sum, addon) => sum + addon.pricePence * qtyOf(addon.id), 0)
	);
	const hasSelection = $derived(totalPence > 0);

	const success = $derived(page.url.searchParams.has('success'));
	const canceled = $derived(page.url.searchParams.has('canceled'));

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Add extras — GOTERA</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="wrap">
	<div class="card">
		<h1>Add extras to your delivery</h1>
		<p class="sub">{data.deliveryLabel} · Hi {data.name}</p>

		{#if success}
			<p class="banner banner--ok">
				Thanks! We're processing your payment — you'll get an email once it's confirmed.
			</p>
		{:else if canceled}
			<p class="banner banner--warn">Checkout was canceled — nothing was charged.</p>
		{/if}

		{#if !data.open}
			<p class="banner banner--warn">
				This delivery can no longer be changed, so extras can't be added to it.
			</p>
		{:else if data.catalogue.length === 0}
			<p class="empty">No extras are available right now — check back another time.</p>
		{:else}
			{#if data.existingAddons.length > 0}
				<div class="existing">
					<p class="existing__label">Already on this delivery</p>
					<ul>
						{#each data.existingAddons as addon (addon.name)}
							<li>{addon.name}{addon.quantity > 1 ? ` x${addon.quantity}` : ''}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<form
				method="POST"
				action="?/checkout"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				<ul class="catalogue">
					{#each data.catalogue as addon (addon.id)}
						<li class="item">
							<div class="item__info">
								<span class="item__name">{addon.name}</span>
								{#if addon.description}<span class="item__desc">{addon.description}</span>{/if}
								<span class="item__price">{money(addon.pricePence)} each</span>
							</div>
							<div class="stepper">
								<button
									type="button"
									aria-label="Decrease quantity"
									onclick={() => setQty(addon.id, qtyOf(addon.id) - 1)}
									disabled={qtyOf(addon.id) <= 0}>−</button
								>
								<input
									type="number"
									name={`qty_${addon.id}`}
									min="0"
									max={data.maxQty}
									value={qtyOf(addon.id)}
									oninput={(e) => setQty(addon.id, Number(e.currentTarget.value) || 0)}
								/>
								<button
									type="button"
									aria-label="Increase quantity"
									onclick={() => setQty(addon.id, qtyOf(addon.id) + 1)}
									disabled={qtyOf(addon.id) >= data.maxQty}>+</button
								>
							</div>
						</li>
					{/each}
				</ul>

				{#if form?.error}<p class="banner banner--error">{form.error}</p>{/if}

				<div class="footer">
					<span class="total">Total: {money(totalPence)}</span>
					<button type="submit" class="cta" disabled={!hasSelection || submitting}>
						{submitting ? 'Redirecting…' : 'Continue to payment'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.wrap {
		max-width: 640px;
		margin: 0 auto;
		padding: 48px 20px 80px;
	}
	.card {
		background: var(--color-background, #fff);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 10px;
		padding: 28px;
	}
	h1 {
		margin: 0 0 4px;
		font-size: 1.4rem;
	}
	.sub {
		margin: 0 0 20px;
		color: #6b6258;
		font-size: 0.9rem;
	}
	.banner {
		margin: 0 0 18px;
		padding: 10px 14px;
		border-radius: 6px;
		font-size: 0.9rem;
	}
	.banner--ok {
		background: #e8f5e9;
		color: #256029;
	}
	.banner--warn {
		background: #fff4e5;
		color: #8a5a00;
	}
	.banner--error {
		background: #fdecea;
		color: #b3261e;
	}
	.empty {
		color: #6b6258;
	}
	.existing {
		margin-bottom: 20px;
		padding: 12px 14px;
		background: #faf7f2;
		border-radius: 6px;
	}
	.existing__label {
		margin: 0 0 6px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #6b6258;
	}
	.existing ul {
		margin: 0;
		padding-left: 18px;
		font-size: 0.9rem;
	}
	.catalogue {
		list-style: none;
		margin: 0 0 20px;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-bottom: 14px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}
	.item__info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.item__name {
		font-weight: 600;
	}
	.item__desc {
		font-size: 0.85rem;
		color: #6b6258;
	}
	.item__price {
		font-size: 0.8rem;
		color: #6b6258;
	}
	.stepper {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}
	.stepper button {
		width: 28px;
		height: 28px;
		border-radius: 6px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		background: #fff;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
	}
	.stepper button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.stepper input {
		width: 44px;
		text-align: center;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 6px;
		padding: 4px 2px;
	}
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.total {
		font-weight: 600;
	}
	.cta {
		padding: 10px 20px;
		border-radius: 6px;
		border: none;
		background: #b6693a;
		color: #fff;
		font-weight: 600;
		cursor: pointer;
	}
	.cta:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
