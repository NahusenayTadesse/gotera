<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting } = superForm(data.form, {
		dataType: 'json', // required: addonIds is an array
		resetForm: false,
		onUpdated({ form }) {
			const m = form.message as { type: 'success' | 'error' | 'warning'; text: string } | undefined;
			if (!m) return;
			if (m.type === 'success') toast.success(m.text);
			else if (m.type === 'error') toast.error(m.text);
			else toast.warning(m.text);
		}
	});

	// ── Display-only config (prices here are for show; the server recomputes
	//    the authoritative total from PLAN_CONFIG + the addons catalogue). ──
	const subscriptionPlans = [
		{ id: 'one-off', name: 'One-Off', sub: 'No subscription.', price: 6.5, freq: 'Per pack · 3 injera', bullet: 'Ideal first order', featured: false },
		{ id: 'starter', name: 'Starter', sub: 'Lighter monthly plan.', price: 12.0, freq: 'Monthly · 2 packs', bullet: 'Pause or skip anytime', featured: false },
		{ id: 'regular', name: 'Regular', sub: 'Our core plan.', price: 24.0, freq: 'Monthly · 4 packs', bullet: 'Best value', bullet2: 'Most popular', featured: true }
	];

	const giftPlans = [
		{ id: 'single-gift', name: 'Single Pack', sub: '3 injera. A proper introduction.', price: 8.5, freq: 'One-time' },
		{ id: 'double-gift', name: 'Double Pack', sub: '6 injera. Pairs well with add-ons.', price: 15.0, freq: 'One-time' }
	];

	function selectRecipient(who: 'me' | 'gift') {
		$form.recipient = who;
		$form.plan = who === 'me' ? 'regular' : 'single-gift';
	}

	function toggleAddon(id: string) {
		$form.addonIds = $form.addonIds.includes(id)
			? $form.addonIds.filter((x) => x !== id)
			: [...$form.addonIds, id];
	}

	// data.addons comes from the DB catalogue (pricePence). Convert to pounds for display.
	const activeAddons = $derived(data.addons.filter((a) => $form.addonIds.includes(a.id)));
	const addonsTotal = $derived(activeAddons.reduce((sum, a) => sum + a.pricePence / 100, 0));

	const currentPlanDetails = $derived(
		$form.recipient === 'me'
			? subscriptionPlans.find((p) => p.id === $form.plan) ?? subscriptionPlans[2]
			: giftPlans.find((p) => p.id === $form.plan) ?? giftPlans[0]
	);

	const finalTotalPrice = $derived((currentPlanDetails?.price ?? 0) + addonsTotal);
</script>

<div class="page-head">
	<div class="container">
		<span class="eyebrow">Subscribe</span>
		<h1>Choose your plan.</h1>
		<p>Select, add extras, go straight to checkout.</p>
	</div>
</div>

<main class="wrap">
	<form class="container layout" method="POST" use:enhance>
		<div class="steps">

			<!-- 01 · Recipient -->
			<div class="step">
				<div class="step-head">
					<span class="step-num">01</span>
					<h2>Who is this for?</h2>
				</div>
				<div class="step-body">
					<div class="choice-grid">
						<button type="button" class="choice" class:active={$form.recipient === 'me'} onclick={() => selectRecipient('me')}>
							<h3>For me</h3>
							<p>Monthly subscription. Manage from your account.</p>
							<span class="choice-tag">Monthly subscription</span>
						</button>
						<button type="button" class="choice" class:active={$form.recipient === 'gift'} onclick={() => selectRecipient('gift')}>
							<h3>As a gift</h3>
							<p>One-time order. Different address. No subscription.</p>
							<span class="choice-tag">One-time · From £8.50</span>
						</button>
					</div>
				</div>
			</div>

			<!-- 02 · Plan -->
			{#if $form.recipient === 'gift'}
				<div class="step gift-step">
					<div class="step-head">
						<span class="step-num">—</span>
						<h2>Sending as a gift?</h2>
					</div>
					<div class="step-body">
						<span class="gift-label">No subscription required</span>
						<div class="gift-grid">
							{#each giftPlans as plan (plan.id)}
								<button type="button" class="plan text-left" class:active={$form.plan === plan.id} onclick={() => ($form.plan = plan.id)}>
									<h3>{plan.name}</h3>
									<p class="plan-sub">{plan.sub}</p>
									<div class="price">£{plan.price.toFixed(2)}</div>
									<div class="freq">{plan.freq}</div>
									<div class="btn-outline btn-full margin-top-fallback">
										{$form.plan === plan.id ? 'Selected' : 'Select'}
									</div>
								</button>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<div class="step">
					<div class="step-head">
						<span class="step-num">02</span>
						<h2>Choose your plan.</h2>
					</div>
					<div class="step-body">
						<div class="plans-grid">
							{#each subscriptionPlans as plan (plan.id)}
								<button type="button" class="plan text-left" class:featured={plan.featured} class:active={$form.plan === plan.id} onclick={() => ($form.plan = plan.id)}>
									<h3>{plan.name}</h3>
									<p class="plan-sub">{plan.sub}</p>
									<div class="price">£{plan.price.toFixed(0)}</div>
									<div class="freq">{plan.freq}</div>
									<ul>
										<li>{plan.bullet}</li>
										{#if plan.bullet2}<li>{plan.bullet2}</li>{/if}
									</ul>
								</button>
							{/each}
						</div>
						{#if $errors.plan}<span class="form-error">{$errors.plan}</span>{/if}
					</div>
				</div>
			{/if}

			<!-- 03 · Delivery -->
			<div class="step">
				<div class="step-head">
					<span class="step-num">03</span>
					<h2>Delivery.</h2>
				</div>
				<div class="step-body">
					<div class="delivery-grid">
						<div class="field-box">
							<label class="field-label" for="delivery-day">Delivery Day</label>
							<select id="delivery-day" class="select" bind:value={$form.deliveryDay}>
								<option value="Saturday">Saturday</option>
							</select>
							<div class="field-help">London only · launch delivery day.</div>
						</div>
						<div class="field-box">
							<label class="field-label" for="frequency">Frequency</label>
							<select id="frequency" class="select" bind:value={$form.frequency}>
								<option value="Monthly">Monthly</option>
							</select>
							<div class="field-help">One delivery per month.</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 04 · Add-ons (from DB catalogue) -->
			<div class="step">
				<div class="step-head">
					<span class="step-num">04</span>
					<h2>Add to your order.</h2>
				</div>
				<div class="step-body">
					<div class="addons-grid">
						{#each data.addons as item (item.id)}
							<button type="button" class="{$form.addonIds.includes(item.id) ? 'addon active' : 'addon'} text-left" onclick={() => toggleAddon(item.id)}>
								<div class="addon-img">
									<span class="ph-label">{item.name} · product photo</span>
									<span class="ph-sub">Warm light · minimal styling</span>
								</div>
								<div class="addon-top">
									<div>
										<h3>{item.name}</h3>
										<div class="addon-price">+ £{(item.pricePence / 100).toFixed(2)}</div>
									</div>
									<div class="check">✓</div>
								</div>
								{#if item.description}<p>{item.description}</p>{/if}
							</button>
						{/each}
					</div>
					{#if $errors.addonIds?._errors}<span class="form-error">{$errors.addonIds._errors}</span>{/if}
				</div>
			</div>

			<!-- 05 · Your details (added — required to persist the order) -->
			<div class="step">
				<div class="step-head">
					<span class="step-num">05</span>
					<h2>{$form.recipient === 'gift' ? 'Where is it going?' : 'Your details.'}</h2>
				</div>
				<div class="step-body">
					{#if $form.recipient === 'gift'}
						<div class="detail-grid">
							<div class="field full">
								<label class="field-label" for="buyerEmail">Your email</label>
								<input id="buyerEmail" class="input" type="email" placeholder="you@example.com" bind:value={$form.buyerEmail} />
								<div class="field-help">For your confirmation and receipt.</div>
								{#if $errors.buyerEmail}<span class="form-error">{$errors.buyerEmail}</span>{/if}
							</div>
							<div class="field full">
								<label class="field-label" for="recipientName">Recipient's name</label>
								<input id="recipientName" class="input" type="text" bind:value={$form.recipientName} />
								{#if $errors.recipientName}<span class="form-error">{$errors.recipientName}</span>{/if}
							</div>
							<div class="field full">
								<label class="field-label" for="line1">Address line 1</label>
								<input id="line1" class="input" type="text" bind:value={$form.line1} />
								{#if $errors.line1}<span class="form-error">{$errors.line1}</span>{/if}
							</div>
							<div class="field full">
								<label class="field-label" for="line2">Address line 2 <span class="opt">optional</span></label>
								<input id="line2" class="input" type="text" bind:value={$form.line2} />
							</div>
							<div class="field">
								<label class="field-label" for="city">City</label>
								<input id="city" class="input" type="text" bind:value={$form.city} />
							</div>
							<div class="field">
								<label class="field-label" for="postcode">Postcode</label>
								<input id="postcode" class="input" type="text" bind:value={$form.postcode} />
								{#if $errors.postcode}<span class="form-error">{$errors.postcode}</span>{/if}
							</div>
							<div class="field full">
								<label class="field-label" for="giftMessage">Gift message <span class="opt">optional</span></label>
								<textarea id="giftMessage" class="input textarea" rows="3" bind:value={$form.giftMessage}></textarea>
							</div>
						</div>
					{:else}
						<div class="detail-grid">
							<div class="field full">
								<label class="field-label" for="addressLabel">Label <span class="opt">optional · e.g. Home</span></label>
								<input id="addressLabel" class="input" type="text" bind:value={$form.addressLabel} />
							</div>
							<div class="field full">
								<label class="field-label" for="line1">Address line 1</label>
								<input id="line1" class="input" type="text" bind:value={$form.line1} />
								{#if $errors.line1}<span class="form-error">{$errors.line1}</span>{/if}
							</div>
							<div class="field full">
								<label class="field-label" for="line2">Address line 2 <span class="opt">optional</span></label>
								<input id="line2" class="input" type="text" bind:value={$form.line2} />
							</div>
							<div class="field">
								<label class="field-label" for="city">City</label>
								<input id="city" class="input" type="text" bind:value={$form.city} />
							</div>
							<div class="field">
								<label class="field-label" for="postcode">Postcode</label>
								<input id="postcode" class="input" type="text" bind:value={$form.postcode} />
								{#if $errors.postcode}<span class="form-error">{$errors.postcode}</span>{/if}
							</div>
							<label class="opt-in full">
								<input type="checkbox" bind:checked={$form.marketingOptIn} />
								<span>Send me occasional updates and offers.</span>
							</label>
						</div>
					{/if}
				</div>
			</div>

		</div>

		<!-- Order summary + submit -->
		<aside class="summary">
			<div class="sum-head">
				<small>Order Summary</small>
				<h2>{currentPlanDetails?.name ?? 'Plan'}</h2>
			</div>
			<div class="sum-body">
				<div class="sum-row">
					<span class="sum-label">Plan</span>
					<div class="sum-val">
						{currentPlanDetails?.name} · {$form.recipient === 'gift' ? 'One-time Pack' : currentPlanDetails?.freq}
					</div>
				</div>
				<div class="sum-row">
					<span class="sum-label">Delivery</span>
					<div class="sum-val">{$form.deliveryDay} · {$form.frequency}</div>
					<div class="sum-sub">London only</div>
				</div>

				{#if activeAddons.length > 0}
					<div class="sum-row">
						<span class="sum-label">Add-ons</span>
						<div class="sum-val">{activeAddons.map((a) => a.name).join(', ')}</div>
					</div>
				{/if}

				<div class="sum-row">
					<span class="sum-label">Total</span>
					<div class="price-line">
						<span>{currentPlanDetails?.name} product</span>
						<span>£{currentPlanDetails?.price.toFixed(2)}</span>
					</div>
					{#each activeAddons as item (item.id)}
						<div class="price-line">
							<span>{item.name}</span>
							<span>£{(item.pricePence / 100).toFixed(2)}</span>
						</div>
					{/each}
					<div class="price-line total">
						<span>First payment</span>
						<strong>£{finalTotalPrice.toFixed(2)}</strong>
					</div>
				</div>

				<div class="sum-actions">
					{#if $form.recipient === 'me'}
						<button type="submit" formaction="?/subscribe" class="btn btn-full" disabled={$submitting}>
							{$submitting ? 'Starting…' : 'Start Subscription'}
						</button>
					{:else}
						<button type="submit" formaction="?/gift" class="btn btn-full" disabled={$submitting}>
							{$submitting ? 'Processing…' : 'Continue as Gift'}
						</button>
					{/if}
				</div>
				<p class="sum-note">Pause, skip, or cancel any time from your account.</p>

				<div class="trust-panel-strip">
					<div class="trust-quote">"Subscriber quote placeholder — one sentence, high trust."</div>
					<div class="trust-attr">Name · GOTERA subscriber</div>
				</div>
			</div>
		</aside>
	</form>
</main>

<style>
	h1, h2, h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.02;
	}

	p {
		line-height: 1.65;
		color: #433e39;
	}

	.eyebrow {
		display: block;
		margin-bottom: 10px;
		font-size: .7rem;
		font-weight: 500;
		letter-spacing: .18em;
		text-transform: uppercase;
		color: var(--copper);
	}

	.btn-full {
		width: 100%;
	}

	.text-left {
		text-align: left;
		font-family: inherit;
	}

	/* PAGE HEADER */
	.page-head {
		padding: 48px 0 32px;
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		border-bottom: 1px solid var(--border);
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-head h1 {
		font-size: clamp(2.2rem, 5vw, 3.6rem);
		font-style: italic;
		margin-bottom: 8px;
	}

	.page-head p {
		font-size: .9rem;
		color: var(--taupe);
		max-width: 480px;
	}

	/* LAYOUT GRID wrappers */
	.wrap {
		padding: 32px 0 80px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 24px;
		align-items: start;
	}

	/* COMPONENT STEPS BLOCK */
	.steps {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.step {
		background: #fff;
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.step-head {
		padding: 20px 22px;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: baseline;
		gap: 12px;
	}

	.step-num {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1rem;
		color: rgba(181, 98, 42, .4);
		font-weight: 600;
		min-width: 20px;
	}

	.step-head h2 {
		font-size: 1.4rem;
	}

	.step-body {
		padding: 20px 22px;
	}

	/* INTERACTIVE SELECTORS */
	.choice-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.choice {
		border: 1px solid var(--border);
		background: var(--cream);
		padding: 16px;
		cursor: pointer;
		transition: all .15s;
	}

	.choice:hover {
		border-color: rgba(181, 98, 42, .35);
	}

	.choice.active {
		border-color: var(--copper);
		background: #fbf4ee;
	}

	.choice h3 {
		font-size: 1.15rem;
		margin-bottom: 5px;
	}

	.choice p {
		font-size: .8rem;
		color: var(--taupe);
		line-height: 1.5;
		margin-bottom: 8px;
	}

	.choice-tag {
		font-size: .66rem;
		text-transform: uppercase;
		letter-spacing: .10em;
		color: var(--copper);
		font-weight: 500;
	}

	/* SPLIT GIFT MODULE UI variants */
	.gift-step {
		border-top: 2px solid rgba(181, 98, 42, .15);
	}

	.gift-label {
		display: inline-block;
		margin-bottom: 14px;
		font-size: .66rem;
		font-weight: 600;
		letter-spacing: .14em;
		text-transform: uppercase;
		background: rgba(181, 98, 42, .08);
		color: var(--copper);
		padding: 3px 9px;
		border: 1px solid rgba(181, 98, 42, .18);
	}

	.gift-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.margin-top-fallback {
		margin-top: 12px;
	}

	/* STRUCTURAL PLANS SELECTION STYLING */
	.plans-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	.plan {
		border: 1px solid var(--border);
		background: var(--cream);
		padding: 16px;
		cursor: pointer;
		transition: all .15s;
	}

	.plan:hover {
		border-color: rgba(181, 98, 42, .35);
	}

	.plan.active {
		border-color: var(--copper);
		background: #fbf4ee;
	}

	.plan.featured {
		background: var(--copper);
		border-color: var(--copper);
	}

	.plan.featured h3, .plan.featured .price {
		color: #fff;
	}

	.plan.featured .plan-sub, .plan.featured .freq, .plan.featured li {
		color: rgba(255, 255, 255, .8);
	}

	.plan h3 {
		font-size: 1.2rem;
		margin-bottom: 4px;
	}

	.plan-sub {
		font-size: .8rem;
		color: var(--taupe);
		margin-bottom: 10px;
	}

	.price {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.2rem;
		color: var(--copper);
		line-height: 1;
	}

	.freq {
		font-size: .68rem;
		text-transform: uppercase;
		letter-spacing: .1em;
		color: var(--taupe);
		margin: 3px 0 10px;
	}

	.plan ul {
		list-style: none;
		display: grid;
		gap: 5px;
	}

	.plan li {
		font-size: .8rem;
		color: #463f39;
		padding-left: 10px;
		position: relative;
	}

	.plan li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: rgba(181, 98, 42, .35);
		font-size: .65rem;
	}

	.plan.featured li::before {
		color: rgba(255, 255, 255, .4);
	}

	/* ENTRY SELECTIONS STYLES */
	.delivery-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.field-box {
		border: 1px solid var(--border);
		background: var(--cream);
		padding: 14px 16px;
	}

	.field-label {
		font-size: .66rem;
		text-transform: uppercase;
		letter-spacing: .12em;
		color: var(--copper);
		font-weight: 500;
		display: block;
		margin-bottom: 8px;
	}

	.select {
		width: 100%;
		min-height: 40px;
		border: 1px solid rgba(122, 116, 110, .22);
		background: #fff;
		padding: 0 12px;
		font-family: 'Jost', sans-serif;
		font-size: .88rem;
		color: var(--ink);
	}

	.field-help {
		font-size: .76rem;
		color: var(--taupe);
		margin-top: 7px;
	}

	/* PRODUCT ADDONS BLOCK ELEMENTS */
	.addons-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	.addon {
		border: 1px solid var(--border);
		background: var(--cream);
		cursor: pointer;
		transition: all .15s;
		overflow: hidden;
		padding: 0;
	}

	.addon:hover {
		border-color: rgba(181, 98, 42, .35);
	}

	.addon.active {
		border-color: var(--copper);
		background: #fbf4ee;
	}

	.addon-img {
		width: 100%;
		aspect-ratio: 4/3;
		background: var(--panel);
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.addon-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 12px 14px 5px;
	}

	.addon h3 {
		font-size: 1rem;
	}

	.addon-price {
		font-size: .78rem;
		font-weight: 500;
		color: var(--copper);
	}

	.addon p {
		font-size: .78rem;
		color: var(--taupe);
		line-height: 1.5;
		margin: 0 14px 14px;
	}

	.check {
		width: 20px;
		height: 20px;
		border: 1px solid rgba(181, 98, 42, .28);
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		color: transparent;
		flex-shrink: 0;
		font-size: .75rem;
	}

	.addon.active .check {
		background: var(--copper);
		color: #fff;
	}

	.ph-label {
		font-size: .62rem;
		letter-spacing: .16em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
	}

	.ph-sub {
		font-size: .58rem;
		letter-spacing: .1em;
		text-transform: uppercase;
		color: rgba(122, 116, 110, .5);
	}

	/* DETAIL FORM (Step 05) */
	.detail-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}

	.field {
		display: flex;
		flex-direction: column;
	}

	.field.full {
		grid-column: 1 / -1;
	}

	.input {
		width: 100%;
		min-height: 40px;
		border: 1px solid rgba(122, 116, 110, .22);
		background: #fff;
		padding: 0 12px;
		font-family: 'Jost', sans-serif;
		font-size: .88rem;
		color: var(--ink);
	}

	.input:focus {
		outline: none;
		border-color: var(--copper);
	}

	.textarea {
		min-height: 72px;
		padding: 10px 12px;
		resize: vertical;
		line-height: 1.5;
	}

	.opt {
		text-transform: none;
		letter-spacing: 0;
		color: rgba(122, 116, 110, .7);
		font-weight: 400;
	}

	.opt-in {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: .82rem;
		color: #433e39;
		cursor: pointer;
	}

	.opt-in input {
		width: 16px;
		height: 16px;
		accent-color: var(--copper);
	}

	.form-error {
		display: block;
		margin-top: 6px;
		font-size: .76rem;
		color: #b23a2a;
	}

	/* ORDER ASIDE SUMMARY STYLINGS */
	.summary {
		position: sticky;
		top: 88px;
	}

	.sum-head {
		padding: 20px 20px 16px;
		background: var(--panel);
		border-bottom: 1px solid var(--border);
	}

	.sum-head small {
		display: block;
		margin-bottom: 6px;
		font-size: .66rem;
		text-transform: uppercase;
		letter-spacing: .16em;
		color: var(--taupe);
		font-weight: 500;
	}

	.sum-head h2 {
		font-size: 1.8rem;
		font-style: italic;
	}

	.sum-body {
		padding: 20px;
		background: #fff;
		border: 1px solid var(--border);
		border-top: none;
	}

	.sum-row {
		padding-bottom: 14px;
		margin-bottom: 14px;
		border-bottom: 1px solid var(--border);
	}

	.sum-row:last-of-type {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.sum-label {
		display: block;
		margin-bottom: 6px;
		font-size: .66rem;
		font-weight: 500;
		letter-spacing: .14em;
		text-transform: uppercase;
		color: var(--copper);
	}

	.sum-val {
		font-size: .9rem;
		color: var(--ink);
		line-height: 1.5;
	}

	.sum-sub {
		font-size: .78rem;
		color: var(--taupe);
	}

	.price-line {
		display: flex;
		justify-content: space-between;
		padding: 6px 0;
		font-size: .88rem;
		color: #433e39;
	}

	.price-line.total {
		padding-top: 12px;
		margin-top: 4px;
		border-top: 1px solid var(--border);
		font-weight: 500;
	}

	.price-line.total strong {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.8rem;
		color: var(--copper);
		line-height: 1;
	}

	.sum-actions {
		display: grid;
		gap: 8px;
		margin-top: 18px;
	}

	.sum-actions .btn[disabled] {
		opacity: .6;
		cursor: not-allowed;
	}

	.sum-note {
		margin-top: 12px;
		font-size: .74rem;
		color: var(--taupe);
		line-height: 1.6;
	}

	.trust-panel-strip {
		margin-top: 16px;
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}

	.trust-quote {
		font-family: 'Cormorant Garamond', serif;
		font-size: .95rem;
		font-style: italic;
		color: var(--taupe);
		line-height: 1.5;
		margin-bottom: 6px;
	}

	.trust-attr {
		font-size: .64rem;
		text-transform: uppercase;
		letter-spacing: .12em;
		color: rgba(122, 116, 110, .5);
		font-weight: 500;
	}

	/* MEDIA QUERIES BREAKPOINTS */
	@media(max-width: 920px) {
		.layout, .delivery-grid, .choice-grid, .gift-grid, .detail-grid {
			grid-template-columns: 1fr;
		}
		.plans-grid, .addons-grid {
			grid-template-columns: 1fr;
		}
		.summary {
			position: static;
		}
	}
</style>