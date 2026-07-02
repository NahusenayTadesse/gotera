<script>
	// Data array keeps layout components easy to scan and update
	const sections = [
		{
			id: 'about',
			title: 'About these terms',
			content: '<p>These terms govern your use of the GOTERA website and your purchase of GOTERA products. By placing an order or subscribing, you agree to them.</p>',
			infobox: '<strong>GOTERA Foods Ltd</strong> · Registered in England and Wales<br>Email: <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>'
		},
		{
			id: 'service',
			title: 'What the service is',
			content: '<p>GOTERA is a premium Ethiopian food subscription service. We supply injera and related pantry products monthly. Products are made and packed in Ethiopia, distributed in the UK. We currently deliver within London only.</p>'
		},
		{
			id: 'subscription',
			title: 'Subscription terms',
			subsections: [
				{
					title: 'Billing and renewal',
					body: 'Subscriptions bill monthly on the same date as first payment. You will receive an email before each charge. The amount reflects your plan plus any add-ons.'
				},
				{
					title: 'Cancellation',
					body: 'Cancel any time from your account. Cancellation takes effect at the end of the current billing period. No refunds for payments already taken.'
				},
				{
					title: 'Pause and skip',
					body: 'Pause or skip a delivery from your account before the cut-off date.'
				},
				{
					title: 'Minimum term',
					body: 'None. Cancel any time.'
				}
			]
		},
		{
			id: 'pricing',
			title: 'Pricing and payment',
			content: '<p>All prices in GBP, inclusive of VAT where applicable. Price changes notified 30 days in advance. Payments processed by Stripe — we do not store card details. Failed payments are retried once after 3 days.</p>',
			list: [
				'One-Off: £6.50 per pack (3 injera)',
				'Starter: £12.00 per month (2 packs)',
				'Regular: £24.00 per month (4 packs)',
				'Gift: £8.50 one-time'
			]
		},
		{
			id: 'delivery',
			title: 'Delivery',
			content: '<p>London only. Saturdays. Cold-chain packaging. Full details at <a href="/delivery">Delivery</a>. If delivery is lost in transit, contact us within 48 hours.</p>'
		},
		{
			id: 'refunds',
			title: 'Refund policy',
			content: '<p>Food products cannot be returned. If a product arrives damaged or incorrect, contact us within 48 hours with a photo at <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>. We will offer a replacement, credit, or refund as appropriate. Statutory rights under the Consumer Rights Act 2015 are not affected.</p>'
		},
		{
			id: 'quality',
			title: 'Product quality',
			content: '<p>All injera is 100% teff, naturally fermented, vegan, and gluten-free. Consume before the best-before date. Quality complaints responded to within 3 working days.</p>'
		},
		{
			id: 'liability',
			title: 'Limitation of liability',
			content: '<p>Our liability is limited to the amount paid for the product in question. We are not liable for indirect or consequential losses. Your statutory consumer rights are not limited.</p>'
		},
		{
			id: 'law',
			title: 'Governing law',
			content: '<p>These terms are governed by the law of England and Wales.</p>'
		}
	];
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">Legal</span>
		<h1>Terms of Service</h1>
		<p class="updated">Last updated: 1 January 2026</p>
	</div>
</section>

<div class="content">
	<div class="container">
		{#each sections as section}
			<div class="ls">
				<h2>{section.title}</h2>
				
				{#if section.content}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html section.content}
				{/if}

				{#if section.infobox}
					<div class="infobox">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<p>{@html section.infobox}</p>
					</div>
				{/if}

				{#if section.subsections}
					{#each section.subsections as sub}
						<h3>{sub.title}</h3>
						<p>{sub.body}</p>
					{/each}
				{/if}

				{#if section.list}
					<ul>
						{#each section.list as item}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}

		<div class="cta-box">
			<div class="cta-title">Ready to subscribe?</div>
			<p class="cta-sub">No minimum term. Cancel any time.</p>
			<a href="/subscribe" class="cta-btn">Choose Your Plan</a>
		</div>
	</div>
</div>

<style>
	:root {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #b5622a;
		--taupe: #7a746e;
		--border: #e8e4e0;
		--panel: #f5f2ed;
		--max: 780px;
	}

	a {
		text-decoration: none;
		color: var(--copper);
	}
	a:hover {
		text-decoration: underline;
	}
	
	.container {
		width: min(var(--max), calc(100% - 28px));
		margin: auto;
	}
	
	h1, h2, h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.05;
		color: var(--ink);
	}
	
	p {
		line-height: 1.8;
		color: #433e39;
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
	
	.hero {
		padding: 60px 0 40px;
		border-bottom: 1px solid var(--border);
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
	}
	.hero h1 {
		font-size: clamp(2rem, 5vw, 3.2rem);
		font-style: italic;
		margin-bottom: 8px;
	}
	
	.updated {
		font-size: 0.76rem;
		color: var(--taupe);
	}
	
	.content {
		padding: 56px 0 88px;
	}
	
	.ls {
		margin-bottom: 44px;
	}
	.ls h2 {
		font-size: 1.45rem;
		margin-bottom: 14px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
	}
	.ls h3 {
		font-size: 1.1rem;
		margin-bottom: 8px;
		margin-top: 20px;
	}
	.ls :global(p) {
		margin-bottom: 12px;
		font-size: 0.92rem;
	}
	.ls :global(p:last-child) {
		margin-bottom: 0;
	}
	
	.ls ul {
		margin: 10px 0 12px 18px;
		display: grid;
		gap: 7px;
	}
	.ls li {
		font-size: 0.9rem;
		line-height: 1.7;
		color: #433e39;
	}
	
	.infobox {
		background: #fff;
		border: 1px solid var(--border);
		padding: 18px 20px;
		margin: 16px 0;
	}
	.infobox p {
		margin: 0;
		font-size: 0.88rem;
		line-height: 1.7;
	}
	
	.cta-box {
		margin-top: 48px;
		padding: 28px;
		background: #fff;
		border: 1px solid var(--border);
		text-align: center;
	}
	.cta-title {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.4rem;
		margin-bottom: 8px;
		font-weight: 600;
		color: var(--ink);
	}
	.cta-sub {
		font-size: 0.84rem;
		color: var(--taupe);
		margin-bottom: 18px;
	}
	.cta-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 22px;
		border-radius: 2px;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 500;
		background: #b5622a;
		color: #fff;
		border: 1px solid #b5622a;
		transition: background 0.15s;
	}
	.cta-btn:hover {
		background: #9a4f22;
		text-decoration: none;
	}
</style>