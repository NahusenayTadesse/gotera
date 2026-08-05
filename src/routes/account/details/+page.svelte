<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { m } from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();

	let editing = $state({ email: false, phone: false, address: false });

	function onUpdated(field: 'email' | 'phone' | 'address') {
		return ({ form }: any) => {
			const m = form.message as { type: string; text: string } | undefined;
			if (!m) return;
			if (m.type === 'success') {
				toast.success(m.text);
				editing[field] = false;
			} else {
				toast.error(m.text);
			}
		};
	}

	const {
		form: emailForm,
		errors: emailErrors,
		enhance: emailEnhance,
		submitting: emailSubmitting
	} = superForm(data.emailForm, {
		id: 'email',
		invalidateAll: true,
		onUpdated: onUpdated('email')
	});

	const {
		form: phoneForm,
		errors: phoneErrors,
		enhance: phoneEnhance,
		submitting: phoneSubmitting
	} = superForm(data.phoneForm, {
		id: 'phone',
		invalidateAll: true,
		onUpdated: onUpdated('phone')
	});

	const {
		form: addressForm,
		errors: addressErrors,
		enhance: addressEnhance,
		submitting: addressSubmitting
	} = superForm(data.addressForm, {
		id: 'address',
		invalidateAll: true,
		onUpdated: onUpdated('address')
	});

	const addressLine = $derived(
		data.address
			? [data.address.line1, data.address.line2, data.address.city, data.address.postcode]
					.filter(Boolean)
					.join(', ')
			: null
	);
</script>

<div class="block">
	<div class="block-header">
		<h2>{m.acctdetails_heading()}</h2>
	</div>
	<div class="details-grid">
		<!-- EMAIL -->
		<div class="detail">
			<span class="detail-label">{m.acctdetails_email_label()}</span>
			{#if editing.email}
				<form method="POST" action="?/updateEmail" use:emailEnhance class="edit">
					<input
						class="edit-input"
						type="email"
						name="email"
						autocomplete="email"
						bind:value={$emailForm.email}
					/>
					{#if $emailErrors.email}<span class="form-error">{$emailErrors.email}</span>{/if}
					<div class="edit-note">{m.acctdetails_email_verify_note()}</div>
					<div class="edit-actions">
						<button type="submit" class="btn-save" disabled={$emailSubmitting}>
							{$emailSubmitting ? m.acctdetails_sending() : m.acctdetails_save()}
						</button>
						<button type="button" class="btn-soft" onclick={() => (editing.email = false)}
							>{m.acctdetails_cancel()}</button
						>
					</div>
				</form>
			{:else}
				<div class="detail-value">{data.email}</div>
				<div class="detail-note">{m.acctdetails_email_note()}</div>
				<button type="button" class="btn-soft" onclick={() => (editing.email = true)}
					>{m.acctdetails_update()}</button
				>
			{/if}
		</div>

		<!-- PHONE -->
		<div class="detail">
			<span class="detail-label">{m.acctdetails_phone_label()}</span>
			{#if editing.phone}
				<form method="POST" action="?/updatePhone" use:phoneEnhance class="edit">
					<input
						class="edit-input"
						type="tel"
						name="phone"
						autocomplete="tel"
						bind:value={$phoneForm.phone}
					/>
					{#if $phoneErrors.phone}<span class="form-error">{$phoneErrors.phone}</span>{/if}
					<div class="edit-actions">
						<button type="submit" class="btn-save" disabled={$phoneSubmitting}>
							{$phoneSubmitting ? m.acctdetails_saving() : m.acctdetails_save()}
						</button>
						<button type="button" class="btn-soft" onclick={() => (editing.phone = false)}
							>{m.acctdetails_cancel()}</button
						>
					</div>
				</form>
			{:else}
				<div class="detail-value">{data.phone ?? m.acctdetails_phone_not_added()}</div>
				<div class="detail-note">{m.acctdetails_phone_note()}</div>
				<button type="button" class="btn-soft" onclick={() => (editing.phone = true)}
					>{m.acctdetails_update()}</button
				>
			{/if}
		</div>

		<!-- ADDRESS -->
		<div class="detail full">
			<span class="detail-label">{m.acctdetails_address_label()}</span>
			{#if editing.address}
				<form method="POST" action="?/updateAddress" use:addressEnhance class="edit">
					<div class="addr-grid">
						<div class="af full">
							<label class="af-label" for="line1">{m.acctdetails_line1_label()}</label>
							<input id="line1" class="edit-input" name="line1" bind:value={$addressForm.line1} />
							{#if $addressErrors.line1}<span class="form-error">{$addressErrors.line1}</span>{/if}
						</div>
						<div class="af full">
							<label class="af-label" for="line2"
								>{m.acctdetails_line2_label()} <span class="opt">{m.acctdetails_optional()}</span
								></label
							>
							<input id="line2" class="edit-input" name="line2" bind:value={$addressForm.line2} />
						</div>
						<div class="af">
							<label class="af-label" for="city">{m.acctdetails_city_label()}</label>
							<input id="city" class="edit-input" name="city" bind:value={$addressForm.city} />
							{#if $addressErrors.city}<span class="form-error">{$addressErrors.city}</span>{/if}
						</div>
						<div class="af">
							<label class="af-label" for="postcode">{m.acctdetails_postcode_label()}</label>
							<input
								id="postcode"
								class="edit-input"
								name="postcode"
								bind:value={$addressForm.postcode}
							/>
							{#if $addressErrors.postcode}<span class="form-error">{$addressErrors.postcode}</span
								>{/if}
						</div>
					</div>
					<div class="edit-actions">
						<button type="submit" class="btn-save" disabled={$addressSubmitting}>
							{$addressSubmitting ? m.acctdetails_saving() : m.acctdetails_save_address()}
						</button>
						<button type="button" class="btn-soft" onclick={() => (editing.address = false)}
							>{m.acctdetails_cancel()}</button
						>
					</div>
				</form>
			{:else}
				<div class="detail-value">{addressLine ?? m.acctdetails_no_address()}</div>
				<div class="detail-note">{m.acctdetails_address_note()}</div>
				<button type="button" class="btn-soft" onclick={() => (editing.address = true)}
					>{m.acctdetails_update_address()}</button
				>
			{/if}
		</div>
	</div>
</div>

<style>
	.edit {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 6px;
	}

	.edit-input {
		width: 100%;
		min-height: 42px;
		border: 1px solid rgba(122, 116, 110, 0.22);
		background: #fff;
		padding: 0 12px;
		font-family: 'Jost', sans-serif;
		font-size: 0.9rem;
		color: var(--ink);
	}

	.edit-input:focus {
		outline: none;
		border-color: var(--copper);
	}

	.addr-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.af {
		display: flex;
		flex-direction: column;
	}

	.af.full {
		grid-column: 1 / -1;
	}

	.af-label {
		font-size: 0.64rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 6px;
	}

	.opt {
		text-transform: none;
		letter-spacing: 0;
		color: rgba(122, 116, 110, 0.7);
		font-weight: 400;
	}

	.edit-note {
		font-size: 0.76rem;
		color: var(--taupe);
	}

	.form-error {
		font-size: 0.76rem;
		color: #b23a2a;
	}

	.edit-actions {
		display: flex;
		gap: 8px;
		margin-top: 2px;
	}

	.btn-save {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 38px;
		padding: 0 18px;
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		border: 1px solid var(--copper);
		background: var(--copper);
		color: #fff;
		cursor: pointer;
		font-family: 'Jost', sans-serif;
		transition: background 0.15s;
	}

	.btn-save:hover {
		background: #9a4f22;
	}

	.btn-save[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 560px) {
		.addr-grid {
			grid-template-columns: 1fr;
		}
	}

	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
	}
	.block {
		margin-bottom: 44px;
	}
	.block-header {
		margin-bottom: 18px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}

	.details-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.detail {
		background: #fff;
		border: 1px solid var(--border);
		padding: 20px;
	}
	.detail.full {
		grid-column: span 2;
	}

	.detail-label {
		font-size: 0.63rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
		margin-bottom: 10px;
		display: block;
	}
	.detail-value {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.2rem;
		margin-bottom: 8px;
		color: var(--ink);
	}
	.detail-note {
		font-size: 0.78rem;
		color: var(--taupe);
		margin-bottom: 14px;
	}

	.btn-soft {
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
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--ink);
		text-decoration: none;
		transition: all 0.15s;
	}
	.btn-soft:hover {
		background: var(--border);
	}

	@media (max-width: 800px) {
		.details-grid {
			grid-template-columns: 1fr;
		}
		.detail.full {
			grid-column: auto;
		}
	}
</style>
