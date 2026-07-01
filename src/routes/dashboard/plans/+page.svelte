<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { enhance as formEnhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance,  delayed } = superForm(data.form, {
		dataType: 'json', // bullets is an array
		resetForm: false,
		invalidateAll: true, // refresh the list after a save
		onUpdated({ form }) {
			const m = form.message as { type: string; text: string } | undefined;
			if (!m) return;
			if (m.type === 'success') {
				toast.success(m.text);
				resetForm();
			} else toast.error(m.text);
		}
	});

	let editingId = $state<string | null>(null);

	function resetForm() {
		editingId = null;
		$form.id = undefined;
		$form.slug = '';
		$form.name = '';
		$form.subtitle = '';
		$form.pricePence = 0;
		$form.freqLabel = '';
		$form.bullets = [];
		$form.featured = false;
		$form.interval = 'monthly';
		$form.packs = 1;
		$form.kind = 'subscription';
		$form.active = true;
		$form.sortOrder = 0;
	}

	function edit(p: PageData['plans'][number]) {
		editingId = p.id;
		$form.id = p.id;
		$form.slug = p.slug;
		$form.name = p.name;
		$form.subtitle = p.subtitle ?? '';
		$form.pricePence = p.pricePence;
		$form.freqLabel = p.freqLabel ?? '';
		$form.bullets = p.bullets ?? [];
		$form.featured = p.featured;
		$form.interval = p.interval;
		$form.packs = p.packs;
		$form.kind = p.kind;
		$form.active = p.active;
		$form.sortOrder = p.sortOrder;
	}

	// Bullets editor
	const addBullet = () => ($form.bullets = [...$form.bullets, '']);
	const setBullet = (i: number, val: string) =>
		($form.bullets = $form.bullets.map((b, j) => (j === i ? val : b)));
	const removeBullet = (i: number) => ($form.bullets = $form.bullets.filter((_, j) => j !== i));

	const gbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;
</script>

<div class="admin">
	<div class="block-header">
		<h2>Plans</h2>
		<button type="button" class="btn-outline" onclick={resetForm}>+ New plan</button>
	</div>

	<!-- List -->
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					<th>Order</th>
					<th>Name</th>
					<th>Slug</th>
					<th>Kind</th>
					<th>Price</th>
					<th>Active</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data.plans as p (p.id)}
					<tr class:editing={editingId === p.id}>
						<td>{p.sortOrder}</td>
						<td>{p.name}{#if p.featured}<span class="star">★</span>{/if}</td>
						<td><code>{p.slug}</code></td>
						<td>{p.kind}</td>
						<td>{gbp(p.pricePence)}</td>
						<td>{p.active ? 'Yes' : 'No'}</td>
						<td class="row-actions">
							<button type="button" class="link" onclick={() => edit(p)}>Edit</button>
							<form
								method="POST"
								action="?/delete"
								use:formEnhance={() =>
									async ({ result, update }) => {
										if (result.type === 'success') toast.success('Plan deleted.');
										else toast.error('Could not delete plan.');
										await update();
									}}
							>
								<input type="hidden" name="id" value={p.id} />
								<button type="submit" class="link danger">Delete</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Editor -->
	<div class="editor">
		<div class="block-header">
			<h2>{editingId ? 'Edit plan' : 'New plan'}</h2>
		</div>

		<form method="POST" action="?/save" use:enhance>
			<div class="grid">
				<div class="field">
					<label class="field-label" for="name">Name</label>
					<input id="name" class="input" bind:value={$form.name} />
					{#if $errors.name}<span class="form-error">{$errors.name}</span>{/if}
				</div>

				<div class="field">
					<label class="field-label" for="slug">Slug</label>
					<input id="slug" class="input" bind:value={$form.slug} placeholder="regular" />
					{#if $errors.slug}<span class="form-error">{$errors.slug}</span>{/if}
				</div>

				<div class="field full">
					<label class="field-label" for="subtitle">Subtitle</label>
					<input id="subtitle" class="input" bind:value={$form.subtitle} />
				</div>

				<div class="field">
					<label class="field-label" for="kind">Kind</label>
					<select id="kind" class="input" bind:value={$form.kind}>
						<option value="subscription">Subscription</option>
						<option value="order">One-off order</option>
						<option value="gift">Gift</option>
					</select>
				</div>

				<div class="field">
					<label class="field-label" for="interval">Interval</label>
					<select id="interval" class="input" bind:value={$form.interval}>
						<option value="monthly">Monthly</option>
						<option value="bi_monthly">Bi-monthly</option>
						<option value="one_time">One-time</option>
					</select>
				</div>

				<div class="field">
					<label class="field-label" for="price">Price (£)</label>
					<input
						id="price"
						class="input"
						type="number"
						step="0.01"
						min="0"
						value={($form.pricePence / 100).toFixed(2)}
						oninput={(e) =>
							($form.pricePence = Math.round(parseFloat(e.currentTarget.value || '0') * 100))}
					/>
					{#if $errors.pricePence}<span class="form-error">{$errors.pricePence}</span>{/if}
				</div>

				<div class="field">
					<label class="field-label" for="packs">Packs</label>
					<input id="packs" class="input" type="number" min="1" bind:value={$form.packs} />
				</div>

				<div class="field">
					<label class="field-label" for="freqLabel">Frequency label</label>
					<input id="freqLabel" class="input" bind:value={$form.freqLabel} placeholder="Monthly · 4 packs" />
				</div>

				<div class="field">
					<label class="field-label" for="sortOrder">Sort order</label>
					<input id="sortOrder" class="input" type="number" bind:value={$form.sortOrder} />
				</div>

				<div class="field full">
					<span class="field-label">Bullets</span>
					{#each $form.bullets as bullet, i (i)}
						<div class="bullet-row">
							<input
								class="input"
								value={bullet}
								oninput={(e) => setBullet(i, e.currentTarget.value)}
							/>
							<button type="button" class="link danger" onclick={() => removeBullet(i)}>×</button>
						</div>
					{/each}
					<button type="button" class="link" onclick={addBullet}>+ Add bullet</button>
				</div>

				<label class="check-row">
					<input type="checkbox" bind:checked={$form.featured} />
					<span>Featured</span>
				</label>
				<label class="check-row">
					<input type="checkbox" bind:checked={$form.active} />
					<span>Active</span>
				</label>
			</div>

			<div class="actions">
				<button type="submit" class="btn" disabled={$delayed}>
					{$delayed ? 'Saving…' : editingId ? 'Save changes' : 'Create plan'}
				</button>
				{#if editingId}
					<button type="button" class="btn-outline" onclick={resetForm}>Cancel</button>
				{/if}
			</div>
		</form>
	</div>
</div>

<style>
	.admin {
		max-width: 900px;
		margin: 0 auto;
		padding: 32px 20px 80px;
	}

	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
	}

	.block-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin: 0 0 18px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}

	.table-wrap {
		border: 1px solid var(--border);
		overflow: auto;
		margin-bottom: 44px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 620px;
	}

	th, td {
		text-align: left;
		padding: 11px 14px;
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
		font-size: .85rem;
		color: #433e39;
	}

	th {
		background: var(--panel);
		font-size: .63rem;
		font-weight: 500;
		letter-spacing: .14em;
		text-transform: uppercase;
		color: var(--copper);
	}

	tr:last-child td {
		border-bottom: none;
	}

	tr.editing {
		background: #fbf4ee;
	}

	code {
		font-size: .8rem;
		color: var(--taupe);
	}

	.star {
		margin-left: 6px;
		color: var(--copper);
		font-size: .8rem;
	}

	.row-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.row-actions form {
		display: inline;
	}

	.link {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-family: 'Jost', sans-serif;
		font-size: .82rem;
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.link.danger {
		color: #b23a2a;
	}

	/* Editor */
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.field {
		display: flex;
		flex-direction: column;
	}

	.field.full {
		grid-column: 1 / -1;
	}

	.field-label {
		font-size: .66rem;
		text-transform: uppercase;
		letter-spacing: .12em;
		color: var(--copper);
		font-weight: 500;
		margin-bottom: 8px;
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

	.bullet-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
	}

	.check-row {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: .85rem;
		color: #433e39;
		cursor: pointer;
	}

	.check-row input {
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

	.actions {
		display: flex;
		gap: 10px;
		margin-top: 22px;
	}

	.actions .btn[disabled] {
		opacity: .6;
		cursor: not-allowed;
	}

	@media (max-width: 720px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>