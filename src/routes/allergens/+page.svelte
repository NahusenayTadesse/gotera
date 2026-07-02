<script>
	// Reactive or static dataset for the 14 UK major allergens
	const allergens = [
		{
			name: 'Cereals containing gluten',
			subtext: 'wheat, rye, barley, oats, spelt, kamut',
			status: 'absent',
			label: 'Not present',
			notes: 'Recipe contains no gluten-containing grains. Made with 100% teff.'
		},
		{ name: 'Crustaceans', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Eggs', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Fish', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Peanuts', status: 'absent', label: 'Not present', notes: '—' },
		{
			name: 'Soybeans',
			status: 'may',
			label: 'May contain',
			notes: 'Produced in a facility that also handles soy products.'
		},
		{ name: 'Milk', status: 'absent', label: 'Not present', notes: 'Product is vegan. No dairy ingredients used.' },
		{
			name: 'Nuts',
			subtext: 'almond, hazelnut, walnut, cashew, pecan, brazil, pistachio, macadamia',
			status: 'may',
			label: 'May contain',
			notes: 'Produced in a facility that also handles tree nuts.'
		},
		{ name: 'Celery', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Mustard', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Sesame', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Sulphur dioxide & sulphites', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Lupin', status: 'absent', label: 'Not present', notes: '—' },
		{ name: 'Molluscs', status: 'absent', label: 'Not present', notes: '—' }
	];
</script>

<div class="page-head">
	<div class="container">
		<span class="eyebrow">Legal · UK Food Law</span>
		<h1>Allergen information.</h1>
		<p>Full allergen and ingredient information for all GOTERA products, provided in accordance with the UK Food Information to Consumers Regulation (FIC) and Natasha's Law.</p>
	</div>
</div>

<div class="content-wrapper">
	<div class="container">

		<div class="legal-notice">
			<strong>Important:</strong> If you have a food allergy or intolerance, please read all allergen information carefully before ordering. If you are unsure whether a product is safe for you, contact us before placing an order. Do not rely on product descriptions alone — always check the full ingredient and allergen information below.
		</div>

		<!-- PRODUCT: INJERA -->
		<div class="ingredient-block">
			<div class="ingredient-head">
				<h2>Injera — 100% Teff</h2>
				<span class="gluten-free-badge">Gluten free recipe</span>
			</div>
			<div class="ingredient-body">

				<p class="ingredient-text"><strong>Ingredients:</strong> Teff Flour (100%), Water, Live Fermentation Culture.</p>
				<p class="ingredient-text layout-spacing">This product is made using a recipe with no gluten-containing ingredients. Teff is a naturally gluten-free grain.</p>

				<!-- KEY -->
				<div class="key">
					<div class="key-item"><span class="dot dot-present"></span>Contains</div>
					<div class="key-item"><span class="dot dot-may"></span>May contain (cross-contamination risk)</div>
					<div class="key-item"><span class="dot dot-absent"></span>Not present</div>
				</div>

				<!-- ALLERGEN TABLE -->
				<table class="allergen-table">
					<thead>
						<tr>
							<th style="width: 40%">Allergen</th>
							<th style="width: 30%">Status</th>
							<th>Notes</th>
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
					<h3>Cross-contamination statement</h3>
					<p>GOTERA injera is produced in a facility in Ethiopia that also handles <strong>soy</strong> and <strong>tree nuts</strong>. While production lines are cleaned between runs, we cannot guarantee the complete absence of these allergens in the final product. Customers with severe allergies to soy or tree nuts should consider this risk carefully before ordering.</p>
				</div>

				<!-- GLUTEN FREE NOTE -->
				<div class="cert-block">
					<div class="cert-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					</div>
					<div>
						<h3>Gluten-free recipe</h3>
						<p>GOTERA injera is made from 100% teff flour — a naturally gluten-free grain native to Ethiopia. No wheat, rye, barley, oats, spelt, or kamut are used in the recipe. This claim refers to the recipe ingredients only. Customers with coeliac disease should note the cross-contamination statement above and consult their healthcare provider if unsure.</p>
					</div>
				</div>

			</div>
		</div>

		<!-- ADD-ONS SECTION -->
		<div class="ingredient-block">
			<div class="ingredient-head">
				<h2>Add-ons</h2>
			</div>
			<div class="ingredient-body">
				<p class="addon-intro">Full allergen information for each add-on product is provided on the individual product label and will be listed here as each product launches. If you have a specific allergy query about an add-on product, contact us before ordering.</p>
				<div class="addon-placeholder">Add-on allergen information will be published here before each product is made available to order.</div>
			</div>
		</div>

		<!-- CONTACT -->
		<div class="contact-block">
			<div>
				<h3>Allergy query?</h3>
				<p>If you have a food allergy or intolerance and need more information before ordering, contact us directly. We will respond within one business day.</p>
			</div>
			<a href="mailto:hello@gotera.co.uk" class="btn">Email us</a>
		</div>

		<!-- REGULATORY NOTE -->
		<div class="regulatory-note">
			Allergen information is provided in accordance with <strong>Regulation (EU) No 1169/2011</strong> as retained in UK law, and <strong>Natasha's Law</strong> (UK Food Information Amendment 2019), which came into force 1 October 2021. The 14 allergens listed above are those required to be declared under UK food law. This information was last reviewed March 2026. GOTERA Foods Ltd reserves the right to update ingredient and allergen information as formulations or suppliers change — please check this page before each order if you have a food allergy.
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