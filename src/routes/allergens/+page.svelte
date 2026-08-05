<script>
	import { m } from '$lib/paraglide/messages.js';

	// Reactive or static dataset for the 14 UK major allergens
	const allergens = $derived([
		{
			name: m.allergens_item_gluten_name(),
			subtext: m.allergens_item_gluten_subtext(),
			status: 'absent',
			label: m.allergens_status_not_present(),
			notes: m.allergens_item_gluten_notes()
		},
		{ name: m.allergens_item_crustaceans_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_eggs_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_fish_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_peanuts_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{
			name: m.allergens_item_soybeans_name(),
			status: 'may',
			label: m.allergens_status_may_contain(),
			notes: m.allergens_item_soybeans_notes()
		},
		{ name: m.allergens_item_milk_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_item_milk_notes() },
		{
			name: m.allergens_item_nuts_name(),
			subtext: m.allergens_item_nuts_subtext(),
			status: 'may',
			label: m.allergens_status_may_contain(),
			notes: m.allergens_item_nuts_notes()
		},
		{ name: m.allergens_item_celery_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_mustard_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_sesame_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_sulphites_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_lupin_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() },
		{ name: m.allergens_item_molluscs_name(), status: 'absent', label: m.allergens_status_not_present(), notes: m.allergens_notes_none() }
	]);
</script>

<div class="page-head">
	<div class="container">
		<span class="eyebrow">{m.allergens_eyebrow()}</span>
		<h1>{m.allergens_page_title()}</h1>
		<p>{m.allergens_page_intro()}</p>
	</div>
</div>

<div class="content-wrapper">
	<div class="container">

		<div class="legal-notice">
			<strong>{m.allergens_important_label()}</strong> {m.allergens_legal_notice()}
		</div>

		<!-- PRODUCT: INJERA -->
		<div class="ingredient-block">
			<div class="ingredient-head">
				<h2>{m.allergens_injera_title()}</h2>
				<span class="gluten-free-badge">{m.allergens_gluten_free_badge()}</span>
			</div>
			<div class="ingredient-body">

				<p class="ingredient-text"><strong>{m.allergens_ingredients_label()}</strong> {m.allergens_injera_ingredients_list()}</p>
				<p class="ingredient-text layout-spacing">{m.allergens_injera_gluten_free_desc()}</p>

				<!-- KEY -->
				<div class="key">
					<div class="key-item"><span class="dot dot-present"></span>{m.allergens_key_contains()}</div>
					<div class="key-item"><span class="dot dot-may"></span>{m.allergens_key_may_contain()}</div>
					<div class="key-item"><span class="dot dot-absent"></span>{m.allergens_key_not_present()}</div>
				</div>

				<!-- ALLERGEN TABLE -->
				<table class="allergen-table">
					<thead>
						<tr>
							<th style="width: 40%">{m.allergens_table_header_allergen()}</th>
							<th style="width: 30%">{m.allergens_table_header_status()}</th>
							<th>{m.allergens_table_header_notes()}</th>
						</tr>
					</thead>
					<tbody>
						{#each allergens as item}
							<tr>
								<td>
									{item.name}
									{#if item.subtext}
										<br><span class="subtext">({item.subtext})</span>
									{/if}
								</td>
								<td>
									<span class="status-{item.status}">
										<span class="dot dot-{item.status}"></span>
										{item.label}
									</span>
								</td>
								<td class="note-text">{item.notes}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<!-- CROSS CONTAMINATION -->
				<div class="cross-block">
					<h3>{m.allergens_cross_heading()}</h3>
					<p>{@html m.allergens_cross_text()}</p>
				</div>

				<!-- GLUTEN FREE NOTE -->
				<div class="cert-block">
					<div class="cert-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					</div>
					<div>
						<h3>{m.allergens_cert_heading()}</h3>
						<p>{m.allergens_cert_text()}</p>
					</div>
				</div>

			</div>
		</div>

		<!-- ADD-ONS SECTION -->
		<div class="ingredient-block">
			<div class="ingredient-head">
				<h2>{m.allergens_addons_heading()}</h2>
			</div>
			<div class="ingredient-body">
				<p class="addon-intro">{m.allergens_addons_intro()}</p>
				<div class="addon-placeholder">{m.allergens_addons_placeholder()}</div>
			</div>
		</div>

		<!-- CONTACT -->
		<div class="contact-block">
			<div>
				<h3>{m.allergens_contact_heading()}</h3>
				<p>{m.allergens_contact_text()}</p>
			</div>
			<a href="mailto:hello@gotera.co.uk" class="btn">{m.allergens_contact_button()}</a>
		</div>

		<!-- REGULATORY NOTE -->
		<div class="regulatory-note">
			{@html m.allergens_regulatory_note()}
		</div>

	</div>
</div>

<style>
	:root {
		--cream: #FAF8F4;
		--ink: #1A1A1A;
		--copper: #B5622A;
		--taupe: #7A746E;
		--border: #E8E4E0;
		--panel: #F5F2ED;
		--max: 860px;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.container {
		width: min(var(--max), calc(100% - 28px));
		margin: auto;
	}

	h1, h2, h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.05;
	}

	p {
		line-height: 1.75;
		color: #433e39;
	}

	.eyebrow {
		display: block;
		font-size: .7rem;
		font-weight: 500;
		letter-spacing: .18em;
		text-transform: uppercase;
		color: var(--copper);
		margin-bottom: 10px;
	}

	/* PAGE HEAD */
	.page-head {
		padding: 52px 0 40px;
		border-bottom: 1px solid var(--border);
	}
	.page-head h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		font-style: italic;
		margin-bottom: 10px;
		color: var(--ink);
	}
	.page-head p {
		font-size: .95rem;
		color: var(--taupe);
		max-width: 560px;
		line-height: 1.75;
	}

	.content-wrapper {
		padding: 40px 0 80px;
	}

	/* LEGAL NOTICE */
	.legal-notice {
		background: rgba(181, 98, 42, .06);
		border: 1px solid rgba(181, 98, 42, .2);
		border-left: 3px solid var(--copper);
		padding: 16px 20px;
		margin: 32px 0;
		font-size: .88rem;
		color: #433e39;
		line-height: 1.7;
	}
	.legal-notice strong {
		color: var(--ink);
	}

	/* INGREDIENT BLOCK */
	.ingredient-block {
		background: #fff;
		border: 1px solid var(--border);
		margin-bottom: 28px;
	}
	.ingredient-head {
		padding: 18px 22px;
		border-bottom: 1px solid var(--border);
		background: var(--panel);
		display: flex;
		align-items: baseline;
		gap: 16px;
		justify-content: space-between;
	}
	.ingredient-head h2 {
		font-size: 1.4rem;
		font-style: italic;
		color: var(--ink);
	}
	.gluten-free-badge {
		font-size: .62rem;
		letter-spacing: .12em;
		text-transform: uppercase;
		font-weight: 600;
		padding: 4px 10px;
		background: rgba(21, 101, 192, .08);
		border: 1px solid rgba(21, 101, 192, .2);
		color: #1565C0;
		flex-shrink: 0;
	}
	.ingredient-body {
		padding: 22px;
	}
	.ingredient-text {
		font-size: .95rem;
		color: var(--ink);
		line-height: 1.7;
		margin-bottom: 16px;
	}
	.ingredient-text strong {
		font-weight: 600;
	}
	.layout-spacing {
		margin-bottom: 20px;
	}

	/* ALLERGEN TABLE */
	.allergen-table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 16px;
		font-size: .86rem;
	}
	.allergen-table th {
		text-align: left;
		padding: 10px 14px;
		background: var(--panel);
		border: 1px solid var(--border);
		font-size: .66rem;
		letter-spacing: .14em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
	}
	.allergen-table td {
		padding: 10px 14px;
		border: 1px solid var(--border);
		vertical-align: middle;
		color: #433e39;
	}
	.allergen-table tr:hover td {
		background: #fdfcfa;
	}
	.allergen-table .subtext {
		font-size: .78rem;
		color: var(--taupe);
	}
	.allergen-table .note-text {
		font-size: .82rem;
		color: var(--taupe);
	}

	.status-present, .status-absent, .status-may {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: .72rem;
		letter-spacing: .08em;
		text-transform: uppercase;
	}
	.status-present { font-weight: 600; color: #A33A2B; }
	.status-absent { font-weight: 500; color: #2E7D32; }
	.status-may { font-weight: 500; color: var(--copper); }

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.dot-present { background: #A33A2B; }
	.dot-absent { background: #2E7D32; }
	.dot-may { background: var(--copper); }

	/* CROSS-CONTAMINATION */
	.cross-block {
		background: #FBF8F3;
		border: 1px solid #D8CEC3;
		padding: 18px 22px;
		margin-bottom: 16px;
	}
	.cross-block h3 {
		font-family: 'Jost', sans-serif;
		font-size: .76rem;
		letter-spacing: .14em;
		text-transform: uppercase;
		color: #8A5A35;
		font-weight: 600;
		margin-bottom: 10px;
	}
	.cross-block p {
		font-size: .88rem;
		color: #4A4139;
		line-height: 1.7;
	}

	/* KEY */
	.key {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		margin-bottom: 24px;
	}
	.key-item {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: .76rem;
		color: var(--taupe);
	}

	/* CERTIFICATION NOTE */
	.cert-block {
		background: rgba(46, 125, 50, .04);
		border: 1px solid rgba(46, 125, 50, .18);
		padding: 18px 22px;
		margin-bottom: 28px;
		display: flex;
		gap: 14px;
		align-items: flex-start;
	}
	.cert-icon {
		flex-shrink: 0;
		margin-top: 2px;
	}
	.cert-block h3 {
		font-size: .78rem;
		letter-spacing: .1em;
		text-transform: uppercase;
		color: #2E7D32;
		font-weight: 600;
		font-family: 'Jost', sans-serif;
		margin-bottom: 6px;
	}
	.cert-block p {
		font-size: .86rem;
		color: #433e39;
		line-height: 1.65;
	}

	/* ADD-ONS STYLE */
	.addon-intro {
		font-size: .9rem;
		color: var(--taupe);
		line-height: 1.7;
		margin-bottom: 16px;
	}
	.addon-placeholder {
		background: var(--panel);
		border: 1px solid var(--border);
		padding: 14px 18px;
		font-size: .86rem;
		color: var(--taupe);
	}

	/* CONTACT */
	.contact-block {
		background: var(--panel);
		border: 1px solid var(--border);
		padding: 22px;
		margin-bottom: 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}
	.contact-block h3 {
		font-size: 1.1rem;
		font-style: italic;
		margin-bottom: 6px;
		color: var(--ink);
	}
	.contact-block p {
		font-size: .88rem;
		color: var(--taupe);
		line-height: 1.65;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 20px;
		background: var(--copper);
		color: #fff;
		font-size: .7rem;
		letter-spacing: .12em;
		text-transform: uppercase;
		font-weight: 500;
		border-radius: 2px;
		flex-shrink: 0;
	}
	.btn:hover {
		background: #9a4f22;
	}

	/* REGULATORY NOTE */
	.regulatory-note {
		font-size: .78rem;
		color: var(--taupe);
		line-height: 1.75;
		padding-top: 24px;
		border-top: 1px solid var(--border);
	}
	.regulatory-note strong {
		color: var(--ink);
	}

	@media(max-width:640px){
		.allergen-table { font-size: .8rem; }
		.ingredient-head { flex-direction: column; gap: 8px; }
	}
</style>
