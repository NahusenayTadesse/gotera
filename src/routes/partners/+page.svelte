<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Loader2, AlertCircle, CheckCircle2, Store, Wheat, Check } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { PARTNER_CATEGORIES, SUPPLIER_CATEGORIES } from './schema';
	import { m } from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();

	let submitted = $state(false);
	let errorMessage = $state('');

	const { form, errors, enhance, submitting } = superForm(data.form, {
		resetForm: false,
		scrollToError: 'smooth',
		onUpdated({ form }) {
			const msg = form.message as { type: string; text: string } | undefined;
			if (!msg) return;
			if (msg.type === 'success') {
				submitted = true;
				errorMessage = '';
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				errorMessage = msg.text;
			}
		}
	});

	const CATEGORY_LABELS: Record<string, () => string> = {
		restaurant: m.partners_cat_restaurant,
		shop: m.partners_cat_shop,
		caterer: m.partners_cat_caterer,
		community: m.partners_cat_community,
		corporate: m.partners_cat_corporate,
		teff: m.partners_cat_teff,
		spices: m.partners_cat_spices,
		produce: m.partners_cat_produce,
		packaging: m.partners_cat_packaging,
		logistics: m.partners_cat_logistics,
		other: m.partners_cat_other
	};

	const categories = $derived($form.type === 'supplier' ? SUPPLIER_CATEGORIES : PARTNER_CATEGORIES);

	const benefits = $derived(
		$form.type === 'supplier'
			? [m.partners_supplier_benefit1(), m.partners_supplier_benefit2(), m.partners_supplier_benefit3()]
			: [m.partners_partner_benefit1(), m.partners_partner_benefit2(), m.partners_partner_benefit3()]
	);

	function selectType(type: 'partner' | 'supplier') {
		if ($form.type === type) return;
		$form.type = type;
		// Category lists differ per type; keep "other", clear anything else.
		if ($form.category !== 'other') $form.category = '';
	}
</script>

<svelte:head>
	<title>{m.partners_meta_title()}</title>
	<meta name="description" content={m.partners_meta_description()} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="partners-wrap">
	<div class="partners-grid">
		<aside class="intro">
			<span class="eyebrow">{m.partners_eyebrow()}</span>
			<h1>{m.partners_heading()}</h1>
			<p class="sub">{m.partners_sub()}</p>

			<h2 class="benefits-heading">
				{$form.type === 'supplier'
					? m.partners_supplier_benefits_heading()
					: m.partners_partner_benefits_heading()}
			</h2>
			<ul class="benefits">
				{#each benefits as benefit (benefit)}
					<li><Check class="benefit-icon" /><span>{benefit}</span></li>
				{/each}
			</ul>

			<p class="contact-note">{m.partners_contact_note()}</p>
		</aside>

		<div class="card">
			{#if submitted}
				<div class="sent">
					<CheckCircle2 class="sent-icon" />
					<span class="eyebrow">{m.partners_success_eyebrow()}</span>
					<h2 class="sent-heading">{m.partners_success_heading()}</h2>
					<p>{m.partners_success_body()}</p>
					<a href="/" class="btn btn-full">{m.partners_back_home()}</a>
				</div>
			{:else}
				<form method="POST" use:enhance class="form" novalidate>
					{#if errorMessage}
						<div class="alert" role="alert">
							<AlertCircle class="alert-icon" />
							<span>{errorMessage}</span>
						</div>
					{/if}

					<fieldset class="type-picker">
						<legend class="field-label">{m.partners_type_label()}</legend>
						<input type="hidden" name="type" value={$form.type} />
						<div class="type-options">
							<button
								type="button"
								class="type-option"
								class:active={$form.type === 'partner'}
								aria-pressed={$form.type === 'partner'}
								onclick={() => selectType('partner')}
							>
								<Store class="type-icon" />
								<span class="type-title">{m.partners_type_partner()}</span>
								<span class="type-desc">{m.partners_type_partner_desc()}</span>
							</button>
							<button
								type="button"
								class="type-option"
								class:active={$form.type === 'supplier'}
								aria-pressed={$form.type === 'supplier'}
								onclick={() => selectType('supplier')}
							>
								<Wheat class="type-icon" />
								<span class="type-title">{m.partners_type_supplier()}</span>
								<span class="type-desc">{m.partners_type_supplier_desc()}</span>
							</button>
						</div>
					</fieldset>

					<div class="row">
						<div class="field">
							<label class="field-label" for="businessName">{m.partners_business_label()}</label>
							<input
								id="businessName"
								name="businessName"
								class="input"
								autocomplete="organization"
								bind:value={$form.businessName}
								aria-invalid={$errors.businessName ? 'true' : undefined}
								disabled={$submitting}
							/>
							{#if $errors.businessName}<span class="form-error">{$errors.businessName}</span>{/if}
						</div>

						<div class="field">
							<label class="field-label" for="category">
								{$form.type === 'supplier'
									? m.partners_category_label_supplier()
									: m.partners_category_label_partner()}
							</label>
							<select
								id="category"
								name="category"
								class="input"
								bind:value={$form.category}
								aria-invalid={$errors.category ? 'true' : undefined}
								disabled={$submitting}
							>
								<option value="" disabled>{m.partners_category_placeholder()}</option>
								{#each categories as cat (cat)}
									<option value={cat}>{CATEGORY_LABELS[cat]()}</option>
								{/each}
							</select>
							{#if $errors.category}<span class="form-error">{$errors.category}</span>{/if}
						</div>
					</div>

					<div class="row">
						<div class="field">
							<label class="field-label" for="contactName">{m.partners_contact_label()}</label>
							<input
								id="contactName"
								name="contactName"
								class="input"
								autocomplete="name"
								bind:value={$form.contactName}
								aria-invalid={$errors.contactName ? 'true' : undefined}
								disabled={$submitting}
							/>
							{#if $errors.contactName}<span class="form-error">{$errors.contactName}</span>{/if}
						</div>

						<div class="field">
							<label class="field-label" for="email">{m.partners_email_label()}</label>
							<input
								id="email"
								name="email"
								type="email"
								class="input"
								autocomplete="email"
								bind:value={$form.email}
								aria-invalid={$errors.email ? 'true' : undefined}
								disabled={$submitting}
							/>
							{#if $errors.email}<span class="form-error">{$errors.email}</span>{/if}
						</div>
					</div>

					<div class="row">
						<div class="field">
							<label class="field-label" for="phone"
								>{m.partners_phone_label()} <span class="optional">{m.partners_optional()}</span></label
							>
							<input
								id="phone"
								name="phone"
								type="tel"
								class="input"
								autocomplete="tel"
								bind:value={$form.phone}
								disabled={$submitting}
							/>
						</div>

						<div class="field">
							<label class="field-label" for="website"
								>{m.partners_website_label()} <span class="optional">{m.partners_optional()}</span></label
							>
							<input
								id="website"
								name="website"
								class="input"
								autocomplete="url"
								placeholder="https://"
								bind:value={$form.website}
								disabled={$submitting}
							/>
						</div>
					</div>

					<div class="row">
						<div class="field">
							<label class="field-label" for="city"
								>{m.partners_city_label()} <span class="optional">{m.partners_optional()}</span></label
							>
							<input
								id="city"
								name="city"
								class="input"
								autocomplete="address-level2"
								bind:value={$form.city}
								disabled={$submitting}
							/>
						</div>

						<div class="field">
							<label class="field-label" for="postcode"
								>{m.partners_postcode_label()} <span class="optional">{m.partners_optional()}</span></label
							>
							<input
								id="postcode"
								name="postcode"
								class="input"
								autocomplete="postal-code"
								bind:value={$form.postcode}
								disabled={$submitting}
							/>
						</div>
					</div>

					<div class="field">
						<label class="field-label" for="message">
							{$form.type === 'supplier'
								? m.partners_message_label_supplier()
								: m.partners_message_label_partner()}
						</label>
						<textarea
							id="message"
							name="message"
							class="input textarea"
							rows="5"
							placeholder={$form.type === 'supplier'
								? m.partners_message_placeholder_supplier()
								: m.partners_message_placeholder_partner()}
							bind:value={$form.message}
							aria-invalid={$errors.message ? 'true' : undefined}
							disabled={$submitting}
						></textarea>
						{#if $errors.message}<span class="form-error">{$errors.message}</span>{/if}
					</div>

					<!-- Honeypot: hidden from people, irresistible to bots. -->
					<div class="hp" aria-hidden="true">
						<label for="company_url">Company URL</label>
						<input
							id="company_url"
							name="company_url"
							tabindex="-1"
							autocomplete="off"
							bind:value={$form.company_url}
						/>
					</div>

					<div class="field">
						<label class="consent">
							<input
								type="checkbox"
								name="consent"
								bind:checked={$form.consent}
								disabled={$submitting}
							/>
							<span>{m.partners_consent()} <a href="/privacy">{m.partners_privacy_link()}</a></span>
						</label>
						{#if $errors.consent}<span class="form-error">{$errors.consent}</span>{/if}
					</div>

					<button type="submit" class="btn btn-full" disabled={$submitting}>
						{#if $submitting}
							<Loader2 class="spin btn-icon" />
							{m.partners_submitting()}
						{:else}
							{m.partners_submit()}
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(:root) {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #a45926;
		--taupe: #6f6964;
		--border: #e8e4e0;
		--panel: #f5f2ed;
	}

	.partners-wrap {
		padding: 48px 16px 72px;
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		font-family: 'Jost', sans-serif;
		color: var(--ink);
	}

	.partners-grid {
		width: min(1080px, 100%);
		margin: 0 auto;
		display: grid;
		gap: 32px;
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

	h1,
	.sent-heading {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: clamp(2.2rem, 6vw, 3rem);
		line-height: 1.02;
		margin-bottom: 12px;
	}

	.sub {
		font-size: 0.92rem;
		color: var(--taupe);
		line-height: 1.65;
		max-width: 44ch;
	}

	.benefits-heading {
		margin: 28px 0 12px;
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--copper);
		font-weight: 500;
	}

	.benefits {
		display: grid;
		gap: 10px;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.benefits li {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		font-size: 0.88rem;
		line-height: 1.5;
	}

	:global(.benefit-icon) {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		margin-top: 3px;
		color: var(--copper);
	}

	.contact-note {
		margin-top: 28px;
		padding-top: 18px;
		border-top: 1px solid var(--border);
		font-size: 0.8rem;
		color: var(--taupe);
		line-height: 1.6;
	}

	.card {
		background: #fff;
		border: 1px solid var(--border);
		padding: 28px 20px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.row {
		display: grid;
		gap: 18px;
	}

	.field {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.field-label {
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 8px;
		padding: 0;
	}

	.optional {
		color: var(--taupe);
		text-transform: none;
		letter-spacing: 0;
		font-weight: 400;
	}

	.type-picker {
		border: 0;
		padding: 0;
		margin: 0;
	}

	.type-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.type-option {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		padding: 14px;
		text-align: left;
		border: 1px solid rgba(122, 116, 110, 0.22);
		background: #fff;
		cursor: pointer;
		font-family: 'Jost', sans-serif;
		color: var(--ink);
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.type-option:hover {
		border-color: rgba(164, 89, 38, 0.5);
	}

	.type-option.active {
		border-color: var(--copper);
		background: rgba(164, 89, 38, 0.05);
		box-shadow: inset 0 0 0 1px var(--copper);
	}

	.type-option:focus-visible {
		outline: 2px solid var(--copper);
		outline-offset: 2px;
	}

	:global(.type-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--copper);
		margin-bottom: 4px;
	}

	.type-title {
		font-size: 0.95rem;
		font-weight: 500;
	}

	.type-desc {
		font-size: 0.76rem;
		color: var(--taupe);
		line-height: 1.45;
	}

	.input {
		width: 100%;
		min-height: 44px;
		border: 1px solid rgba(122, 116, 110, 0.22);
		background: #fff;
		padding: 0 14px;
		font-family: 'Jost', sans-serif;
		font-size: 0.9rem;
		color: var(--ink);
		border-radius: 0;
	}

	.textarea {
		padding: 12px 14px;
		resize: vertical;
		line-height: 1.55;
	}

	.input:focus {
		outline: none;
		border-color: var(--copper);
	}

	.input[aria-invalid='true'] {
		border-color: #b23a2a;
	}

	.input:disabled {
		background: var(--panel);
		color: var(--taupe);
	}

	.form-error {
		display: block;
		margin-top: 6px;
		font-size: 0.76rem;
		color: #b23a2a;
	}

	.consent {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		font-size: 0.82rem;
		color: var(--taupe);
		line-height: 1.5;
		cursor: pointer;
	}

	.consent input {
		margin-top: 3px;
		accent-color: var(--copper);
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.consent a {
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.alert {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 11px 14px;
		border: 1px solid rgba(178, 58, 42, 0.25);
		background: rgba(178, 58, 42, 0.06);
		color: #b23a2a;
		font-size: 0.82rem;
	}

	:global(.alert-icon) {
		height: 1rem;
		width: 1rem;
		flex-shrink: 0;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0 22px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		border: 1px solid var(--copper);
		background: var(--copper);
		color: #fff;
		cursor: pointer;
		transition: background 0.15s;
		font-family: 'Jost', sans-serif;
		text-decoration: none;
	}

	.btn:hover {
		background: #9a4f22;
	}

	.btn[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-full {
		width: 100%;
		margin-top: 4px;
	}

	:global(.btn-icon) {
		height: 1rem;
		width: 1rem;
		margin-right: 8px;
	}

	.sent {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 24px 0;
	}

	:global(.sent-icon) {
		width: 52px;
		height: 52px;
		color: var(--copper);
		margin-bottom: 18px;
	}

	.sent p {
		font-size: 0.9rem;
		color: var(--taupe);
		line-height: 1.65;
		margin: 4px 0 22px;
		max-width: 360px;
	}

	:global(.spin) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (min-width: 640px) {
		.card {
			padding: 36px;
		}
		.row {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 960px) {
		.partners-wrap {
			padding: 80px 24px 96px;
		}
		.partners-grid {
			grid-template-columns: 5fr 7fr;
			gap: 56px;
			align-items: start;
		}
		.intro {
			position: sticky;
			top: 100px;
		}
	}

	@media (max-width: 420px) {
		.type-options {
			grid-template-columns: 1fr;
		}
	}
</style>
