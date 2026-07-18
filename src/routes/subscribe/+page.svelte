<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import type { PageData, Snapshot } from './$types';
	import { Button } from '$lib/components/ui/button';

	import AuthSheet from '$lib/AuthSheet.svelte';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, capture, restore } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: false,
		onUpdated({ form }) {
			const m = form.message as { type: 'success' | 'error' | 'warning'; text: string } | undefined;
			if (!m) return;
			if (m.type === 'success') toast.success(m.text);
			else if (m.type === 'error') toast.error(m.text);
			else toast.warning(m.text);
		}
	});
	export const snapshot: Snapshot = { capture, restore };

	// ── Dynamic data ──
	const subscriptionPlans = $derived(data?.subscriptionPlans ?? []);
	const giftPlans = $derived(data?.giftPlans ?? []);

	// ── Mode availability ──
	const hasSubscriptions = $derived(subscriptionPlans.length > 0);
	const hasGifts = $derived(giftPlans.length > 0);
	const bothModes = $derived(hasSubscriptions && hasGifts);
	const onlyMode = $derived(
		hasSubscriptions && !hasGifts ? 'me' : hasGifts && !hasSubscriptions ? 'gift' : null
	);
	const hasAddons = $derived((data?.addons?.length ?? 0) > 0);

	function selectRecipient(who: 'me' | 'gift') {
		$form.recipient = who;
		$form.plan = who === 'me' ? 'regular' : 'single-gift';
	}

	// If only one mode exists, auto-select it so the flow has a valid recipient/plan
	// and we can hide the choice entirely.
	$effect(() => {
		if (onlyMode && $form.recipient !== onlyMode) {
			selectRecipient(onlyMode);
		}
	});

	function toggleAddon(id: string) {
		$form.addonIds = $form.addonIds.includes(id)
			? $form.addonIds.filter((x) => x !== id)
			: [...$form.addonIds, id];
	}

	const activeAddons = $derived(data?.addons.filter((a) => $form.addonIds.includes(a.id)) ?? []);
	const addonsTotal = $derived(activeAddons.reduce((sum, a) => sum + a.pricePence / 100, 0));
	const currentPlanDetails = $derived(
		$form.recipient === 'me'
			? subscriptionPlans.find((p) => p.id === $form.plan) ?? subscriptionPlans[subscriptionPlans.length - 1]
			: giftPlans.find((p) => p.id === $form.plan) ?? giftPlans[0]
	);
	const finalTotalPrice = $derived((currentPlanDetails?.price ?? 0) + addonsTotal);

	const mePrice = $derived(
		subscriptionPlans.find((p) => p.id === 'regular')?.price ??
			subscriptionPlans[subscriptionPlans.length - 1]?.price ??
			0
	);
	const giftFromPrice = $derived(giftPlans.length ? Math.min(...giftPlans.map((p) => p.price)) : 8.5);

	const preselected = $derived(data?.preselected ?? null);
	const skipIntro = $derived(!!preselected && (!onlyMode || preselected.recipient === onlyMode));

	// ── Wizard state ──
	type StepId = 'who' | 'plan' | 'extras' | 'details' | 'review';
	// Drop the 'who' step when only one mode is available.
	const STEPS = $derived<StepId[]>([
		...(bothModes ? (['who'] as StepId[]) : []),
		'plan',
		...(hasAddons ? (['extras'] as StepId[]) : []),
		'details',
		'review'
	]);
	// Desktop step numbering, computed so numbers stay sequential when steps drop.
	const DESKTOP_STEPS = $derived<string[]>([
		...(bothModes ? ['who'] : []),
		'plan',
		'delivery',
		...(hasAddons ? ['addons'] : []),
		'details'
	]);
	const stepNo = (key: string) => String(DESKTOP_STEPS.indexOf(key) + 1).padStart(2, '0');
	
	let animating = $state(false);
	let stepError = $state<string | null>(null);
		let stepIdx = $derived(
	skipIntro ? Math.max(STEPS.indexOf(hasAddons ? 'extras' : 'details'), 0) : 0
);

	const step = $derived(STEPS[Math.min(stepIdx, STEPS.length - 1)]);
	const progress = $derived(((stepIdx + 1) / STEPS.length) * 100);
	
	let loginOpen = $state(false);
	let signupOpen = $state(false);
	function next() {
		stepError = null;
		animating = true;
		setTimeout(() => {
			stepIdx = Math.min(stepIdx + 1, STEPS.length - 1);
			animating = false;
		}, 180);
	}
	function back() {
		stepError = null;
		if (stepIdx === 0) {
			history.back();
			return;
		}
		stepIdx -= 1;
	}
	function handleCta() {
		stepError = null;
		if (step === 'who') {
			if (!$form.recipient) {
				stepError = 'Choose an option to continue.';
				return;
			}
			next();
		} else if (step === 'plan' || step === 'extras') {
			next();
		} else if (step === 'details') {
			if ($form.recipient === 'gift') {
				if (!$form.buyerEmail || !$form.recipientName || !$form.line1 || !$form.postcode) {
					stepError = 'Please fill in all required fields.';
					return;
				}
			} else if (!$form.line1 || !$form.postcode) {
				stepError = 'Please fill in all required fields.';
				return;
			}
			next();
		}
	}

	const cardTitle = $derived(
		{
			who: 'Who is this for?',
			plan: 'Choose your plan.',
			extras: 'Add to your first delivery.',
			details: $form.recipient === 'gift' ? 'Where is it going?' : 'Your details.',
			review: 'Review & pay.'
		}[step]
	);
		let isOrder = $derived(data?.subscriptionPlans.find(sub => sub.id === $form.plan)?.kind === 'order')

	const cardSub = $derived(
		{
			who: 'For me or as a gift.',
			plan: 'No minimum term. Cancel any time.',
			extras: 'Optional. Added to your first payment only.',
			details: 'Where we deliver every Saturday.',
			review: `${currentPlanDetails?.name ?? ''} · £${(currentPlanDetails?.price ?? 0).toFixed(2)}`
		}[step]
	);
	const ctaLabel = $derived(
		step === 'review'
			? $submitting
				? 'Processing…'
				: $form.recipient === 'me'
					? `${data?.subscriptionPlans.find(sub => sub.id === $form.plan)?.kind === 'order' ? 'Order' : "Subscribe"} — £${finalTotalPrice.toFixed(2)}  ${isOrder ? '' : '/month'}`
					: `Continue as gift — £${finalTotalPrice.toFixed(2)}`
			: step === 'extras'
				? $form.addonIds.length > 0
					? `Continue with ${$form.addonIds.length} extra${$form.addonIds.length > 1 ? 's' : ''}`
					: 'Continue'
				: 'Continue'
	);





	import { untrack } from 'svelte';

// ── Address persistence (localStorage-backed autofill) ──
const ADDR_KEY = (who: 'me' | 'gift') => `gotera:address:${who}`;
const ADDR_FIELDS = {
	me: ['addressLabel', 'line1', 'line2', 'city', 'postcode'],
	gift: ['buyerEmail', 'recipientName', 'line1', 'line2', 'city', 'postcode']
} as const;

let loadedFor = $state<'me' | 'gift' | null>(null);

// Load: runs once per recipient mode, and again if the user switches modes.
$effect(() => {
	const who = $form.recipient as 'me' | 'gift' | undefined;
	if (!who || loadedFor === who) return;
	loadedFor = who;
	untrack(() => {
		try {
			const raw = localStorage.getItem(ADDR_KEY(who));
			if (!raw) return;
			const saved = JSON.parse(raw) as Record<string, string>;
			for (const k of ADDR_FIELDS[who]) {
				if (saved[k]) ($form as any)[k] = saved[k];
			}
		} catch {
			/* corrupt entry — ignore */
		}
	});
});

// Save: tracks every field, so any edit overwrites the bucket immediately.
$effect(() => {
	const who = $form.recipient as 'me' | 'gift' | undefined;
	if (!who || loadedFor !== who) return; // don't clobber storage before hydration
	const snapshot = Object.fromEntries(
		ADDR_FIELDS[who].map((k) => [k, ($form as any)[k] ?? ''])
	);
	if (!Object.values(snapshot).some(Boolean)) return; // never save an all-empty record
	try {
		localStorage.setItem(ADDR_KEY(who), JSON.stringify(snapshot));
	} catch {
		/* quota / private mode — non-fatal */
	}
});

$effect(()=>{
	 if(step ===  'review'){
		 loginOpen = true;
	 }


})

  

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- ═══════════════════════ MOBILE: wizard ═══════════════════════ -->
<div class="sub-page mobile-view">
	<div class="sub-bg">
		<div class="sub-plan-hero">
			{#if step === 'who'}
				<span class="sub-plan-eyebrow">Subscribe</span>
				<span class="sub-plan-name">Choose<br />your plan.</span>
				<span class="sub-plan-price">No minimum term · Cancel any time</span>
			{:else}
				<span class="sub-plan-eyebrow">{$form.recipient === 'gift' ? 'Gift' : `${currentPlanDetails?.name} plan`}</span>
				<span class="sub-plan-name">{currentPlanDetails?.name}<br /><em>{$form.recipient === 'gift' ? 'one-time.' : 'every month.'}</em></span>
				<span class="sub-plan-price">
					<strong>£{(currentPlanDetails?.price ?? 0).toFixed(2)}</strong>
					{$form.recipient === 'me' ? '/ month' : 'one-time'}
					{#if addonsTotal > 0}· <strong>+£{addonsTotal.toFixed(2)}</strong> extras{/if}
				</span>
			{/if}
		</div>
	</div>

	<div class="sub-progress">
		<div class="sub-progress__fill" style="width:{progress}%"></div>
	</div>

	<form class="sub-card-wrap" method="POST" id="start" use:enhance>
		<div class="sub-card" class:animating>
			<div class="sub-card__head">
				<span class="sub-card__title">{cardTitle}</span>
				<span class="sub-card__sub">{cardSub}</span>
			</div>

			<div class="sub-card__body">
				{#if step === 'who'}
					<div class="who-cards">
						<button type="button" class="who-card" class:active={$form.recipient === 'me'} onclick={() => selectRecipient('me')}>
							<div class="who-card__icon">
								<svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="1.5">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
								</svg>
							</div>
							<div class="who-card__text">
								<h3>For me</h3>
								<p>Monthly subscription · Manage from your account</p>
							</div>
							<div class="who-card__price">£{mePrice.toFixed(0)}<br /><span>/ month</span></div>
						</button>

						<button type="button" class="who-card" class:active={$form.recipient === 'gift'} onclick={() => selectRecipient('gift')}>
							<div class="who-card__icon">
								<svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="1.5">
									<path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
								</svg>
							</div>
							<div class="who-card__text">
								<h3>As a gift</h3>
								<p>One-time order · Different address · No subscription</p>
							</div>
							<div class="who-card__price">From<br />£{giftFromPrice.toFixed(2)}</div>
						</button>
					</div>
				{/if}

				{#if step === 'plan'}
					<div class="plan-sel">
						{#each ($form.recipient === 'gift' ? giftPlans : subscriptionPlans) as p (p.id)}
							<button type="button" class="plan-sel-card" class:active={$form.plan === p.id} onclick={() => ($form.plan = p.id)}>
								{#if p.featured}<span class="plan-sel-card__badge">Most popular</span>{/if}
								<div class="plan-sel-card__name" class:pad={p.featured}>
									<h3>{p.name}</h3>
									<p>{p.freq}</p>
								</div>
								<div class="plan-sel-card__price" class:pad={p.featured}>
									<span class="plan-sel-card__price-num">£{p.price.toFixed(p.price % 1 === 0 ? 0 : 2)}</span>
									<span class="plan-sel-card__price-freq">{$form.recipient === 'me' ? 'per month' : 'one-time'}</span>
								</div>
								<div class="plan-sel-card__dot"></div>
							</button>
						{/each}
					</div>
					{#if $errors.plan}<span class="sub-error">{$errors.plan}</span>{/if}
				{/if}

				{#if step === 'extras'}
					<div class="extras-row">
						{#each data?.addons as addon (addon.id)}
							<button type="button" class="extra-card" class:added={$form.addonIds.includes(addon.id)} onclick={() => toggleAddon(addon.id)}>
								<div class="extra-card__img">{addon.name}</div>
								<div class="extra-card__body">
									<span class="extra-card__name">{addon.name}</span>
									{#if addon.description}<span class="extra-card__desc">{addon.description}</span>{/if}
									<span class="extra-card__price">+£{(addon.pricePence / 100).toFixed(2)}</span>
									<span class="extra-card__btn">{$form.addonIds.includes(addon.id) ? 'Added ✓' : 'Add'}</span>
								</div>
							</button>
						{/each}
					</div>
					<button type="button" class="skip-link" onclick={next}>Skip — no extras this time</button>
					{#if $errors.addonIds?._errors}<span class="sub-error">{$errors.addonIds._errors}</span>{/if}
				{/if}

				{#if step === 'details'}
					{#if $form.recipient === 'gift'}
						<div class="sub-field">
							<label for="m-buyerEmail">Your email</label>
							<input id="m-buyerEmail" type="email" placeholder="you@example.com" bind:value={$form.buyerEmail} />
							<span class="sub-field-note">For your confirmation and receipt.</span>
							{#if $errors.buyerEmail}<span class="sub-error">{$errors.buyerEmail}</span>{/if}
						</div>
						<div class="sub-field">
							<label for="m-recipientName">Recipient's name</label>
							<input id="m-recipientName" type="text" bind:value={$form.recipientName} />
							{#if $errors.recipientName}<span class="sub-error">{$errors.recipientName}</span>{/if}
						</div>
						<div class="sub-divider"></div>
						<span class="sub-section-label">Delivery address</span>
						<div class="sub-field">
							<label for="m-line1">Address line 1</label>
							<input id="m-line1" type="text" placeholder="Street address" bind:value={$form.line1} />
							{#if $errors.line1}<span class="sub-error">{$errors.line1}</span>{/if}
						</div>
						<div class="sub-field">
							<label for="m-line2">Address line 2 <span class="opt">(optional)</span></label>
							<input id="m-line2" type="text" placeholder="Flat, building" bind:value={$form.line2} />
						</div>
						<div class="sub-field">
							<div class="sub-field-row">
								<div>
									<label for="m-city">City</label>
									<input id="m-city" type="text" placeholder="London" bind:value={$form.city} />
								</div>
								<div>
									<label for="m-postcode">Postcode</label>
									<input id="m-postcode" type="text" placeholder="N7 0DD" bind:value={$form.postcode} />
								</div>
							</div>
							{#if $errors.postcode}<span class="sub-error">{$errors.postcode}</span>{/if}
						</div>
						<div class="sub-field">
							<label for="m-giftMessage">Gift message <span class="opt">(optional)</span></label>
							<input id="m-giftMessage" type="text" placeholder="A short note" bind:value={$form.giftMessage} />
						</div>
					{:else}
						<!-- <div class="sub-field">
							<label for="m-addressLabel">Label <span class="opt">(optional · e.g. Home)</span></label>
							<input id="m-addressLabel" type="text" bind:value={$form.addressLabel} />
						</div> -->
						<div class="sub-field">
							<label for="m-line1b">Address line 1</label>
							<input id="m-line1b" type="text" placeholder="Street address" bind:value={$form.line1} />
							{#if $errors.line1}<span class="sub-error">{$errors.line1}</span>{/if}
						</div>
						<div class="sub-field">
							<label for="m-line2b">Address line 2 <span class="opt">(optional)</span></label>
							<input id="m-line2b" type="text" placeholder="Flat, building" bind:value={$form.line2} />
						</div>
						<div class="sub-field">
							<div class="sub-field-row">
								<div>
									<label for="m-cityb">City</label>
									<input id="m-cityb" type="text" placeholder="London" bind:value={$form.city} />
								</div>
								<div>
									<label for="m-postcodeb">Postcode</label>
									<input id="m-postcodeb" type="text" placeholder="N7 0DD" bind:value={$form.postcode} />
								</div>
							</div>
							<span class="sub-field-note">London only · Delivered every Saturday</span>
							{#if $errors.postcode}<span class="sub-error">{$errors.postcode}</span>{/if}
						</div>
						<label class="opt-in-m">
							<input type="checkbox" bind:checked={$form.marketingOptIn} />
							<span>Send me occasional updates and offers.</span>
						</label>
					{/if}
					{#if stepError}<span class="sub-error">{stepError}</span>{/if}
				{/if}

				{#if step === 'review'}
					<div class="pay-summary">
						<div class="pay-row">
							<span class="pay-row__label">{currentPlanDetails?.name} {$form.recipient === 'me' ? 'subscription' : 'gift'}</span>
							<span class="pay-row__val">£{(currentPlanDetails?.price ?? 0).toFixed(2)}</span>
						</div>
						{#each activeAddons as a (a.id)}
							<div class="pay-row">
								<span class="pay-row__label">{a.name}</span>
								<span class="pay-row__val">+£{(a.pricePence / 100).toFixed(2)}</span>
							</div>
						{/each}
						<div class="pay-row">
							<span class="pay-row__label">Saturday delivery</span>
							<span class="pay-row__val">Included</span>
						</div>
						<div class="pay-total">
							<span class="pay-total__label">First payment</span>
							<span class="pay-total__val">£{finalTotalPrice.toFixed(2)}</span>
						</div>
					</div>
					<div class="secure-note">
						<svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke-width="1.5">
							<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
						Secured by Stripe. You'll complete payment on the next screen.
					</div>
					<p class="terms-note">
						By continuing you agree to our <a href="/subscription-terms">Subscription Terms</a> and
						<a href="/privacy">Privacy Policy</a>. Cancel any time from your account.
					</p>
				{/if}
			</div>
		</div>
		<input hidden name="guestCheckout" bind:value={$form.guestCheckout} />

		<div class="sub-cta">
			{#if step === 'review'}
				<button type="submit" form="start" title={data?.user ? 'Continue' : 'Please sign in'} formaction={$form.recipient === 'me' && data?.user ? '?/subscribe' : isOrder && !data?.user ? '?/guestOrder' : '?/gift' } class="sub-cta__btn" disabled={$submitting || (!data?.user && !isOrder)}>
					{ctaLabel}
				</button>
				{#if !data?.user}
					<div class="w-full! mt-4! flex flex-col items-center justify-center gap-2">
					   <!-- {#if isOrder}
					     <button  form="start" title="Checkout Without an account" class="sub-cta__btn" type="submit" formaction="?/guestOrder" onclick={()=>$form.guestCheckout = true}>Order</button>
						 {/if} -->
						<AuthSheet data={data?.signupForm} bind:loginOpen bind:signupOpen />
						</div>

				{/if}
			{:else}
				<button type="button" class="sub-cta__btn" onclick={handleCta}>{ctaLabel}</button>
			{/if}
		</div>
	</form>
</div>

<!-- ═══════════════════════ DESKTOP: stacked page ═══════════════════════ -->
<div class="desktop-view">
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
				{#if bothModes}
					<div class="step">
						<div class="step-head"><span class="step-num">01</span><h2>Who is this for?</h2></div>
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
									<span class="choice-tag">One-time · From £6.50</span>
								</button>
							</div>
						</div>
					</div>
				{/if}

				{#if $form.recipient === 'gift'}
					<div class="step gift-step">
						<div class="step-head"><span class="step-num">{stepNo('plan')}</span><h2>Sending as a gift?</h2></div>
						<div class="step-body">
							<span class="gift-label">No subscription required</span>
							<div class="gift-grid">
								{#each giftPlans as plan (plan.id)}
									<button type="button" class="plan text-left" class:active={$form.plan === plan.id} onclick={() => ($form.plan = plan.id)}>
										<h3>{plan.name}</h3>
										<p class="plan-sub">{plan.sub}</p>
										<div class="price">£{plan.price.toFixed(2)}</div>
										<div class="freq">{plan.freq}</div>
										<div class="btn-outline btn-full margin-top-fallback">{$form.plan === plan.id ? 'Selected' : 'Select'}</div>
									</button>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="step">
						<div class="step-head"><span class="step-num">{stepNo('plan')}</span><h2>Choose your plan.</h2></div>
						<div class="step-body">
							<div class="plans-grid">
								{#each subscriptionPlans as plan (plan.id)}
									<button type="button" class="plan text-left" class:featured={plan.featured} class:active={$form.plan === plan.id} onclick={() => ($form.plan = plan.id)}>
										<h3>{plan.name}</h3>
										<p class="plan-sub">{plan.sub}</p>
										<div class="price">£{plan.price.toFixed(0)}</div>
										<div class="freq">{plan.freq}</div>
										<ul>
											{#if plan.bullet && plan.bullet.trim() !== ''}
												{#each JSON.parse(plan.bullet) as item}
													<li>{item}</li>
												{/each}
											{/if}
										</ul>
									</button>
								{/each}
							</div>
							{#if $errors.plan}<span class="form-error">{$errors.plan}</span>{/if}
						</div>
					</div>
				{/if}

				<div class="step">
					<div class="step-head"><span class="step-num">{stepNo('delivery')}</span><h2>Delivery.</h2></div>
					<div class="step-body">
						<div class="delivery-grid">
							<div class="field-box">
								<label class="field-label" for="delivery-day">Delivery Day</label>
								<select id="delivery-day" class="select" bind:value={$form.deliveryDay}><option value="Saturday">Saturday</option></select>
								<div class="field-help">London only · launch delivery day.</div>
							</div>
							<div class="field-box">
								<label class="field-label" for="frequency">Frequency</label>
								<select id="frequency" class="select" bind:value={$form.frequency}><option value="Monthly">Monthly</option></select>
								<div class="field-help">One delivery per month.</div>
							</div>
						</div>
					</div>
				</div>

				{#if hasAddons}
				<div class="step">
					<div class="step-head"><span class="step-num">{stepNo('addons')}</span><h2>Add to your order.</h2></div>
					<div class="step-body">
						<div class="addons-grid">
							{#each data?.addons as item (item.id)}
								<button type="button" class="{$form.addonIds.includes(item.id) ? 'addon active' : 'addon'} text-left" onclick={() => toggleAddon(item.id)}>
									<div class="addon-img">
										<span class="ph-label">{item.name} · product photo</span>
										<span class="ph-sub">Warm light · minimal styling</span>
									</div>
									<div class="addon-top">
										<div><h3>{item.name}</h3><div class="addon-price">+ £{(item.pricePence / 100).toFixed(2)}</div></div>
										<div class="check">✓</div>
									</div>
									{#if item.description}<p>{item.description}</p>{/if}
								</button>
							{/each}
						</div>
						{#if $errors.addonIds?._errors}<span class="form-error">{$errors.addonIds._errors}</span>{/if}
					</div>
				</div>

				{/if}
				<div class="step">
					<div class="step-head"><span class="step-num">{stepNo('details')}</span><h2>{$form.recipient === 'gift' ? 'Where is it going?' : 'Your details.'}</h2></div>
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
									<label class="field-label" for="line1d">Address line 1</label>
									<input id="line1d" class="input" type="text" bind:value={$form.line1} />
									{#if $errors.line1}<span class="form-error">{$errors.line1}</span>{/if}
								</div>
								<div class="field full">
									<label class="field-label" for="line2d">Address line 2 <span class="opt">optional</span></label>
									<input id="line2d" class="input" type="text" bind:value={$form.line2} />
								</div>
								<div class="field">
									<label class="field-label" for="cityd">City</label>
									<input id="cityd" class="input" type="text" bind:value={$form.city} />
								</div>
								<div class="field">
									<label class="field-label" for="postcoded">Postcode</label>
									<input id="postcoded" class="input" type="text" bind:value={$form.postcode} />
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

			<aside class="summary">
				<div class="sum-head">
					<small>Order Summary</small>
					<h2>{currentPlanDetails?.name ?? 'Plan'}</h2>
				</div>
				<div class="sum-body">
					<div class="sum-row">
						<span class="sum-label">Plan</span>
						<div class="sum-val">{currentPlanDetails?.name} · {$form.recipient === 'gift' ? 'One-time Pack' : currentPlanDetails?.freq}</div>
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
						<div class="price-line"><span>{currentPlanDetails?.name} product</span><span>£{currentPlanDetails?.price.toFixed(2)}</span></div>
						{#each activeAddons as item (item.id)}
							<div class="price-line"><span>{item.name}</span><span>£{(item.pricePence / 100).toFixed(2)}</span></div>
						{/each}
						<div class="price-line total"><span>First payment</span><strong>£{finalTotalPrice.toFixed(2)}</strong></div>
					</div>
					<div class="sum-actions">
						{#if $form.recipient === 'me'}
							<Button type="submit" form="start" disabled={!data?.user && $submitting && !isOrder} title={data?.user ? undefined : 'Please log in to subscribe'} formaction={isOrder && !data?.user ? "?/guestOrder": "?/subscribe"} class="btn btn-full">{$submitting ? 'Starting…' : data?.subscriptionPlans.find(sub => sub.id === $form.plan)?.kind === 'order' ? 'Order' : "Subscribe"}</Button>
						{:else}
							<Button type="submit" form="start" disabled={!data?.user && $submitting} title={data?.user ? undefined : 'Please log in to gift a subscription'} formaction="?/gift" class="btn btn-full">{$submitting ? 'Processing…' : 'Continue as Gift'}</Button>
						{/if}

						{#if !data?.user}
						<!-- {#if isOrder}
					      

					     <button form="start" title="Checkout Without an account"  class="sub-cta__btn" type="submit" formaction="?/guestOrder" onclick={()=>$form.guestCheckout = true}>Guest Checkout</button>
						 {/if} -->
					
													<AuthSheet data={data?.signupForm} bind:loginOpen bind:signupOpen />

						{/if}
					</div>
					<p class="sum-note">Pause, skip, or cancel any time from your account.</p>
					<!-- <div class="trust-panel-strip">
						<div class="trust-quote">"Subscriber quote placeholder — one sentence, high trust."</div>
						<div class="trust-attr">Name · GOTERA subscriber</div>
					</div> -->
				</div>
			</aside>
		</form>
	</main>
</div>

<style>
	/* ═══════════ MOBILE WIZARD ═══════════ */
	.sub-page { min-height: 20dvh; background: #1a1a1a; display: flex; flex-direction: column; font-family: 'Jost', sans-serif; }
	.sub-bg { flex: 1; display: flex; flex-direction: column; padding: 48px 24px 0; padding-bottom: 6px; position: relative; min-height: 0; }
	.sub-plan-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 12px; min-height: 150px; }
	.sub-plan-eyebrow { font-family: 'Jost', sans-serif; font-size: .6rem; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: #9a4f22;  display: block; }
	.sub-plan-name { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-style: italic; font-weight: 400; color: rgba(250,248,244,.9); line-height: .95; margin-bottom: 12px; display: block; }
	.sub-plan-name em { font-style: italic; }
	.sub-plan-price { font-family: 'Jost', sans-serif; font-size: .88rem; color: rgba(250,248,244,.45); letter-spacing: .04em; }
	.sub-plan-price strong { color: rgba(250,248,244,.75); font-weight: 500; }
	.sub-progress { height: 2px; background: rgba(255,255,255,.08); flex-shrink: 0; }
	.sub-progress__fill { height: 100%; background: #9a4f22; transition: width .4s cubic-bezier(.4,0,.2,1); }
	.sub-card-wrap { flex-shrink: 0; position: relative; display: block; }
	.sub-card { background: #faf8f4; border-top: 2px solid #9a4f22; -webkit-overflow-scrolling: touch; transition: opacity .18s ease, transform .18s ease; }
	.sub-card.animating { opacity: 0; transform: translateY(12px); }
	.sub-card__head { padding: 22px 20px 14px; position: sticky; top: 0; background: #faf8f4; z-index: 1; border-bottom: 1px solid #e8e4e0; }
	.sub-card__title { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 500; color: #1a1a1a; display: block; margin-bottom: 2px; line-height: 1.1; }
	.sub-card__sub { font-family: 'Jost', sans-serif; font-size: .75rem; color: #7a746e; display: block; }
	.sub-card__body { padding: 16px 20px; }
	.sub-cta { background: #faf8f4; border-top: 1px solid #e8e4e0; padding: 12px 20px; padding-bottom: max(12px, env(safe-area-inset-bottom)); flex-shrink: 0; }
	.sub-cta__btn { width: 100%; background: #1a1a1a; color: #faf8f4; border: none; padding: 16px; font-family: 'Jost', sans-serif; font-size: .8rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: background .15s; }
	.sub-cta__btn:active { background: #2d2d2d; }
	.sub-cta__btn:disabled { opacity: .5; cursor: not-allowed; }
	.plan-sel { display: flex; flex-direction: column; gap: 8px; }
	.plan-sel-card { border: 1px solid #e8e4e0; padding: 8px; display: flex; align-items: center; cursor: pointer; transition: border-color .12s; position: relative; background: #fff; width: 100%; text-align: left; font-family: inherit; }
	.plan-sel-card.active { border-color: #1a1a1a; }
	.plan-sel-card__badge { position: absolute; top: -1px; left: 12px; background: #1a1a1a; color: #faf8f4; font-size: .58rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; padding: 3px 8px; }
	.plan-sel-card__name { flex: 1; }
	.plan-sel-card__name.pad, .plan-sel-card__price.pad { padding-top: 10px; }
	.plan-sel-card__name h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 500; color: #1a1a1a; margin: 0 0 2px; }
	.plan-sel-card__name p { font-size: .75rem; color: #7a746e; margin: 0; }
	.plan-sel-card__price { text-align: right; }
	.plan-sel-card__price-num { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 500; color: #1a1a1a; display: block; line-height: 1; }
	.plan-sel-card__price-freq { font-size: .68rem; color: #7a746e; display: block; margin-top: 1px; }
	.plan-sel-card__dot { width: 16px; height: 16px; border: 1.5px solid #e8e4e0; border-radius: 50%; margin-left: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
	.plan-sel-card.active .plan-sel-card__dot { border-color: #1a1a1a; background: #1a1a1a; }
	.plan-sel-card.active .plan-sel-card__dot::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #faf8f4; }
	.who-cards { display: flex; flex-direction: column; gap: 8px; }
	.who-card { border: 1px solid #e8e4e0; padding: 18px 16px; display: flex; align-items: center; gap: 14px; cursor: pointer; background: #fff; transition: border-color .12s; width: 100%; text-align: left; font-family: inherit; }
	.who-card.active { border-color: #1a1a1a; }
	.who-card__icon { width: 40px; height: 40px; border: 1px solid #e8e4e0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #9a4f22; }
	.who-card.active .who-card__icon { border-color: #1a1a1a; color: #1a1a1a; }
	.who-card__text { flex: 1; }
	.who-card__text h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 500; color: #1a1a1a; margin: 0 0 2px; }
	.who-card__text p { font-size: .75rem; color: #7a746e; margin: 0; }
	.who-card__price { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 500; color: #9a4f22; text-align: right; flex-shrink: 0; white-space: nowrap; }
	.who-card__price span { font-size: .65rem; color: #7a746e; font-family: 'Jost', sans-serif; }
	.extras-row { display: flex; gap: 10px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; scroll-snap-type: x mandatory; }
	.extras-row::-webkit-scrollbar { display: none; }
	.extra-card { flex-shrink: 0; width: 130px; border: 1px solid #e8e4e0; background: #fff; scroll-snap-align: start; cursor: pointer; transition: border-color .12s; padding: 0; text-align: left; font-family: inherit; }
	.extra-card.added { border-color: #1a1a1a; }
	.extra-card__img { height: 100px; background: #f5f2ed; display: flex; align-items: center; justify-content: center; font-size: .65rem; color: #7a746e; text-align: center; padding: 8px; }
	.extra-card__body { padding: 10px 10px 12px; }
	.extra-card__name { font-family: 'Cormorant Garamond', serif; font-size: .95rem; font-weight: 500; color: #1a1a1a; display: block; margin-bottom: 2px; }
	.extra-card__desc { font-size: .65rem; color: #7a746e; display: block; margin-bottom: 8px; }
	.extra-card__price { font-size: .75rem; color: #9a4f22; font-weight: 500; display: block; margin-bottom: 8px; }
	.extra-card__btn { display: block; width: 100%; border: 1px solid #e8e4e0; background: #fff; padding: 7px 0; font-family: 'Jost', sans-serif; font-size: .65rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: #1a1a1a; text-align: center; }
	.extra-card.added .extra-card__btn { background: #1a1a1a; color: #faf8f4; border-color: #1a1a1a; }
	.sub-field { margin-bottom: 14px; }
	.sub-field label { display: block; font-size: .62rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #7a746e; margin-bottom: 6px; }
	.sub-field label .opt { text-transform: none; letter-spacing: 0; font-weight: 400; }
	.sub-field input { display: block; width: 100%; border: 1px solid #e8e4e0; background: #fff; padding: 6px 14px; font-family: 'Jost', sans-serif; font-size: 16px; color: #1a1a1a; outline: none; -webkit-appearance: none; }
	.sub-field input:focus { border-color: #1a1a1a; }
	.sub-field input::placeholder { color: rgba(122,116,110,.4); }
	.sub-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
	.sub-field-note { font-size: .68rem; color: #7a746e; margin-top: 5px; display: block; }
	.sub-divider { height: 1px; background: #e8e4e0; margin: 18px 0 14px; }
	.sub-section-label { font-size: .6rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: #b5622a; display: block; margin-bottom: 12px; }
	.opt-in-m { display: flex; align-items: center; gap: 9px; font-size: .8rem; color: #433e39; cursor: pointer; margin-top: 4px; }
	.opt-in-m input { width: 16px; height: 16px; accent-color: #9a4f22; }
	.pay-summary { border: 1px solid #e8e4e0; margin-bottom: 18px; }
	.pay-row { display: flex; justify-content: space-between; align-items: center; padding: 11px 14px; border-bottom: 1px solid #e8e4e0; font-size: .82rem; }
	.pay-row:last-child { border-bottom: none; }
	.pay-row__label { color: #7a746e; }
	.pay-row__val { color: #1a1a1a; font-weight: 500; }
	.pay-total { display: flex; justify-content: space-between; align-items: center; padding: 13px 14px; background: #1a1a1a; font-size: .82rem; }
	.pay-total__label { color: rgba(250,248,244,.6); }
	.pay-total__val { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #faf8f4; font-weight: 500; }
	.secure-note { display: flex; align-items: center; gap: 7px; font-size: .7rem; color: #7a746e; margin-bottom: 14px; }
	.secure-note svg { flex-shrink: 0; stroke: #7a746e; }
	.terms-note { font-size: .68rem; color: rgba(122,116,110,.7); line-height: 1.6; text-align: center; }
	.terms-note a { color: #9a4f22; }
	.sub-error { font-size: .78rem; color: #a33a2b; margin-top: 10px; display: block; }
	.skip-link { display: block; text-align: center; font-size: .75rem; color: #7a746e; padding: 10px 0 2px; cursor: pointer; background: none; border: none; width: 100%; text-decoration: underline; font-family: 'Jost', sans-serif; }

	/* ═══════════ DESKTOP STACKED ═══════════ */
	h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 600; line-height: 1.02; }
	p { line-height: 1.65; color: #433e39; }
	.eyebrow { display: block; margin-bottom: 10px; font-size: .7rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: var(--copper); }
	.btn-full { width: 100%; }
	.text-left { text-align: left; font-family: inherit; }
	.page-head { padding: 48px 0 32px; background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%); border-bottom: 1px solid var(--border); max-width: 1200px; margin: 0 auto; }
	.page-head h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-style: italic; margin-bottom: 8px; }
	.page-head p { font-size: .9rem; color: var(--taupe); max-width: 480px; }
	.wrap { padding: 32px 0 80px; max-width: 1200px; margin: 0 auto; }
	.layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }
	.steps { display: flex; flex-direction: column; gap: 2px; }
	.step { background: #fff; border: 1px solid var(--border); overflow: hidden; }
	.step-head { padding: 20px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: baseline; gap: 12px; }
	.step-num { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: rgba(181,98,42,.4); font-weight: 600; min-width: 20px; }
	.step-head h2 { font-size: 1.4rem; }
	.step-body { padding: 20px 22px; }
	.choice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
	.choice { border: 1px solid var(--border); background: var(--cream); padding: 16px; cursor: pointer; transition: all .15s; }
	.choice:hover { border-color: rgba(181,98,42,.35); }
	.choice.active { border-color: var(--copper); background: #fbf4ee; }
	.choice h3 { font-size: 1.15rem; margin-bottom: 5px; }
	.choice p { font-size: .8rem; color: var(--taupe); line-height: 1.5; margin-bottom: 8px; }
	.choice-tag { font-size: .66rem; text-transform: uppercase; letter-spacing: .10em; color: var(--copper); font-weight: 500; }
	.gift-step { border-top: 2px solid rgba(181,98,42,.15); }
	.gift-label { display: inline-block; margin-bottom: 14px; font-size: .66rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; background: rgba(181,98,42,.08); color: var(--copper); padding: 3px 9px; border: 1px solid rgba(181,98,42,.18); }
	.gift-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
	.margin-top-fallback { margin-top: 12px; }
	.plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
	.plan { border: 1px solid var(--border); background: var(--cream); padding: 16px; cursor: pointer; transition: all .15s; }
	.plan:hover { border-color: rgba(181,98,42,.35); }
	.plan.active { border-color: var(--copper); background: #fbf4ee; }
	.plan.featured { background: var(--copper); border-color: var(--copper); }
	.plan.featured h3, .plan.featured .price { color: #fff; }
	.plan.featured .plan-sub, .plan.featured .freq, .plan.featured li { color: rgba(255,255,255,.8); }
	.plan h3 { font-size: 1.2rem; margin-bottom: 4px; }
	.plan-sub { font-size: .8rem; color: var(--taupe); margin-bottom: 10px; }
	.price { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: var(--copper); line-height: 1; }
	.freq { font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: var(--taupe); margin: 3px 0 10px; }
	.plan ul { list-style: none; display: grid; gap: 5px; }
	.plan li { font-size: .8rem; color: #463f39; padding-left: 10px; position: relative; }
	.plan li::before { content: '—'; position: absolute; left: 0; color: rgba(181,98,42,.35); font-size: .65rem; }
	.plan.featured li::before { color: rgba(255,255,255,.4); }
	.delivery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
	.field-box { border: 1px solid var(--border); background: var(--cream); padding: 14px 16px; }
	.field-label { font-size: .66rem; text-transform: uppercase; letter-spacing: .12em; color: var(--copper); font-weight: 500; display: block; margin-bottom: 8px; }
	.select { width: 100%; min-height: 40px; border: 1px solid rgba(122,116,110,.22); background: #fff; padding: 0 12px; font-family: 'Jost', sans-serif; font-size: .88rem; color: var(--ink); }
	.field-help { font-size: .76rem; color: var(--taupe); margin-top: 7px; }
	.addons-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
	.addon { border: 1px solid var(--border); background: var(--cream); cursor: pointer; transition: all .15s; overflow: hidden; padding: 0; }
	.addon:hover { border-color: rgba(181,98,42,.35); }
	.addon.active { border-color: var(--copper); background: #fbf4ee; }
	.addon-img { width: 100%; aspect-ratio: 4/3; background: var(--panel); border-bottom: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }
	.addon-top { display: flex; justify-content: space-between; align-items: flex-start; margin: 12px 14px 5px; }
	.addon h3 { font-size: 1rem; }
	.addon-price { font-size: .78rem; font-weight: 500; color: var(--copper); }
	.addon p { font-size: .78rem; color: var(--taupe); line-height: 1.5; margin: 0 14px 14px; }
	.check { width: 20px; height: 20px; border: 1px solid rgba(181,98,42,.28); display: flex; align-items: center; justify-content: center; background: #fff; color: transparent; flex-shrink: 0; font-size: .75rem; }
	.addon.active .check { background: var(--copper); color: #fff; }
	.ph-label { font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: var(--taupe); font-weight: 500; }
	.ph-sub { font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: rgba(122,116,110,.5); }
	.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.field { display: flex; flex-direction: column; }
	.field.full { grid-column: 1 / -1; }
	.input { width: 100%; min-height: 40px; border: 1px solid rgba(122,116,110,.22); background: #fff; padding: 0 12px; font-family: 'Jost', sans-serif; font-size: .88rem; color: var(--ink); }
	.input:focus { outline: none; border-color: var(--copper); }
	.textarea { min-height: 72px; padding: 10px 12px; resize: vertical; line-height: 1.5; }
	.opt { text-transform: none; letter-spacing: 0; color: rgba(122,116,110,.7); font-weight: 400; }
	.opt-in { grid-column: 1 / -1; display: flex; align-items: center; gap: 9px; font-size: .82rem; color: #433e39; cursor: pointer; }
	.opt-in input { width: 16px; height: 16px; accent-color: var(--copper); }
	.form-error { display: block; margin-top: 6px; font-size: .76rem; color: #b23a2a; }
	.summary { position: sticky; top: 88px; }
	.sum-head { padding: 20px 20px 16px; background: var(--panel); border-bottom: 1px solid var(--border); }
	.sum-head small { display: block; margin-bottom: 6px; font-size: .66rem; text-transform: uppercase; letter-spacing: .16em; color: var(--taupe); font-weight: 500; }
	.sum-head h2 { font-size: 1.8rem; font-style: italic; }
	.sum-body { padding: 20px; background: #fff; border: 1px solid var(--border); border-top: none; }
	.sum-row { padding-bottom: 14px; margin-bottom: 14px; border-bottom: 1px solid var(--border); }
	.sum-row:last-of-type { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
	.sum-label { display: block; margin-bottom: 6px; font-size: .66rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--copper); }
	.sum-val { font-size: .9rem; color: var(--ink); line-height: 1.5; }
	.sum-sub { font-size: .78rem; color: var(--taupe); }
	.price-line { display: flex; justify-content: space-between; padding: 6px 0; font-size: .88rem; color: #433e39; }
	.price-line.total { padding-top: 12px; margin-top: 4px; border-top: 1px solid var(--border); font-weight: 500; }
	.price-line.total strong { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--copper); line-height: 1; }
	.sum-actions { display: grid; gap: 8px; margin-top: 18px; }
	.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 22px; border-radius: 2px; font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 500; background: var(--copper); color: #fff; border: 1px solid var(--copper); cursor: pointer; font-family: inherit; }
	.btn[disabled] { opacity: .6; cursor: not-allowed; }
	.sum-note { margin-top: 12px; font-size: .74rem; color: var(--taupe); line-height: 1.6; }
	.trust-panel-strip { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
	.trust-quote { font-family: 'Cormorant Garamond', serif; font-size: .95rem; font-style: italic; color: var(--taupe); line-height: 1.5; margin-bottom: 6px; }
	.trust-attr { font-size: .64rem; text-transform: uppercase; letter-spacing: .12em; color: rgba(122,116,110,.5); font-weight: 500; }

	/* ═══════════ RESPONSIVE VIEW TOGGLE (CSS-only, no JS) ═══════════ */
	.mobile-view { display: flex !important; }
	.desktop-view { display: none !important; }
	@media (min-width: 921px) {
		.mobile-view { display: none !important; }
		.desktop-view { display: block !important; }
	}

	.auth-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: min(380px, 100%);
		margin: 0 auto;
	}

	.auth-divider {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--taupe);
		font-family: 'Jost', sans-serif;
		font-size: 0.62rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.auth-divider::before,
	.auth-divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--border);
	}

	.auth-fine {
		margin: 2px 0 0;
		font-family: 'Jost', sans-serif;
		font-size: 0.68rem;
		font-weight: 300;
		line-height: 1.5;
		color: var(--taupe);
		text-align: center;
	}
	.auth-fine a { color: var(--taupe); text-decoration: underline; text-underline-offset: 2px; }
	.auth-fine a:hover { color: var(--copper); }
</style>