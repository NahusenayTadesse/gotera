<script>
	// 1. Static Content Data Array (keeps our template clean and readable)
	const faqData = [
		{
			category: 'The product',
			items: [
				{
					q: 'What is injera?',
					a: 'Injera is a naturally fermented Ethiopian flatbread made from teff — a small, nutrient-dense grain native to the Horn of Africa. It has a distinctive spongy texture and a mild, slightly sour flavour from the fermentation process. It is the foundation of Ethiopian and Eritrean cuisine, used both as a plate and as a utensil.',
					defaultOpen: true // Match your original design choice
				},
				{
					q: 'Where is GOTERA injera made?',
					a: 'Made and packed in Ethiopia. We keep the product at its source — that is what makes it real.'
				},
				{
					q: 'Is GOTERA injera gluten-free?',
					a: 'Yes. GOTERA injera is made from 100% teff, which is naturally gluten-free. It is also vegan and high in iron. If you have a severe gluten intolerance or coeliac disease, please check the packaging for full allergen information once you receive your order.'
				},
				{
					q: 'How fresh is the injera when it arrives?',
					a: 'Each order is packed on dispatch day and shipped in insulated cold-chain packaging. It arrives at the correct temperature and carries a best-before date on the pack. You should consume it before that date.'
				},
				{
					q: 'Can I freeze injera?',
					a: 'Yes. Injera freezes well. Separate individual pieces with baking paper before freezing, and defrost at room temperature. Full storage guidance is printed on the packaging.'
				},
				{
					q: "What if I don't like it?",
					a: 'If a product arrives damaged or is not what you ordered, contact us within 48 hours at hello@gotera.co.uk and we will sort it. Food products cannot be returned, but we will always make it right if something has gone wrong on our side.'
				}
			]
		},
		{
			category: 'Subscription',
			items: [
				{
					q: 'How does the subscription work?',
					a: 'You choose a plan, we deliver injera once a month. Payment is taken automatically on the same date each month. You manage everything — pausing, skipping, changing plan, adding products — from your account.'
				},
				{
					q: 'Is there a minimum term?',
					a: 'None. Cancel any time from your account. No cancellation fees.'
				},
				{
					q: 'How do I cancel?',
					a: 'Account → Cancel Subscription. Your subscription ends at the close of the current billing period. You won’t be charged again after that. You can also email hello@gotera.co.uk.'
				},
				{
					q: 'Can I pause or skip a delivery?',
					a: 'Yes. Pause your subscription entirely with no time limit, or skip a single month’s delivery — both from your account. Changes must be made before the cut-off date for the upcoming delivery, shown in your account.'
				},
				{
					q: 'Can I change my plan?',
					a: 'Yes. Switch between Starter (2 packs, £12/month) and Regular (4 packs, £24/month) any time from your account. Changes take effect from the next billing cycle.'
				},
				{
					q: 'What are add-ons?',
					a: 'Pantry products — currently Berbere (£3.50), Mitmita (£3.50), and Niter Kibbeh (£5.00) — that you can add to any monthly delivery. Select them from your account before the cut-off date. They are added to that month’s payment.'
				}
			]
		},
		{
			category: 'Delivery',
			items: [
				{
					q: 'Where do you deliver?',
					a: 'London only at launch. We are expanding to other UK cities in 2026. Email hello@gotera.co.uk to register interest for your area.'
				},
				{
					q: 'When do you deliver?',
					a: 'Saturdays, between 8am and 6pm. You’ll receive a notification with a tighter window on the morning of your delivery.'
				},
				{
					q: 'What is the cut-off date?',
					a: 'The Sunday before your Saturday delivery at midnight. Changes — add-ons, address updates, skips — made after the cut-off apply to the following month. Your exact cut-off is shown in your account.'
				},
				{
					q: "What if I'm not home?",
					a: 'Set a safe place in your account and we’ll leave your order there. If no safe place is set and you’re not home, we’ll leave a card with instructions. Temperature-sensitive orders won’t be left in locations exposed to heat.'
				},
				{
					q: "My order hasn't arrived. What do I do?",
					a: 'Contact us within 48 hours at hello@gotera.co.uk. We respond within 4 hours on delivery days. Confirmed lost orders get a replacement or account credit. Full details on the Delivery page.'
				}
			]
		},
		{
			category: 'Gifting',
			items: [
				{
					q: 'How does a gift order work?',
					a: 'Choose a gift size (single or double pack), add any pantry extras, enter the recipient’s address, and pay once. No subscription is created for the recipient. A confirmation goes to your email.'
				},
				{
					q: 'Can I include a message?',
					a: 'Yes. There is a message field in the gift checkout. Keep it short — it will be included with the order.'
				},
				{
					q: 'Does the recipient need a GOTERA account?',
					a: 'No. A gift is a one-time order. The recipient does not need an account and is not signed up to any subscription.'
				}
			]
		},
		{
			category: 'Account',
			items: [
				{
					q: 'How do I update my delivery address?',
					a: 'Account → Your Details → Update Address. Changes before the cut-off apply to the next delivery. Changes after the cut-off apply the following month.'
				},
				{
					q: 'How do I update my payment method?',
					a: 'Account → Payment → Update Payment. Your new card is saved and used for all future billing.'
				},
				{
					q: 'I forgot my password. What do I do?',
					a: 'Use the "Forgot your password?" link on the sign in page. A reset link will be sent to your registered email address.'
				}
			]
		}
	];

	// Extract unique categories for tabs automatically
	const categories = faqData.map((d) => d.category);

	// 2. Svelte 5 Runes for State Management
	let activeCategory = $state('The product');

	// Object state lookup to track open/closed questions dynamically
	// Initializes with items marked as `defaultOpen` set to true
	let openAnswers = $state(
		faqData.reduce((acc, currentGroup) => {
			currentGroup.items.forEach((item) => {
				if (item.defaultOpen) acc[item.q] = true;
			});
			return acc;
		}, {})
	);

	function toggle(question) {
		openAnswers[question] = !openAnswers[question];
	}
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">FAQ</span>
		<h1>Common questions.</h1>
		<p>Everything you need to know before subscribing — and after.</p>
	</div>
</section>

<div class="tabs">
	<div class="container">
		<div class="tab-list">
			{#each categories as category}
				<button
					type="button"
					class="tab"
					class:active={activeCategory === category}
					onclick={() => (activeCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>
</div>

<div class="faq-content">
	<div class="container">
		{#each faqData as group}
			{#if activeCategory === group.category}
				<div class="faq-group">
					<h2 class="faq-group-title">{group.category}</h2>
					<div class="faq-list">
						{#each group.items as item}
							<div class="faq-item">
								<button
									type="button"
									class="faq-q"
									class:open={openAnswers[item.q]}
									onclick={() => toggle(item.q)}
								>
									{item.q}
									<span class="faq-icon"></span>
								</button>
								<div class="faq-a" class:open={openAnswers[item.q]}>
									{item.a}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<section class="cta">
	<div class="container cta-inner">
		<span class="eyebrow">Still have questions?</span>
		<h2>Ready when you are.</h2>
		<p>No minimum term. Cancel any time. Start with one pack if you're not sure.</p>
		<a href="/subscribe" class="btn">Choose Your Plan</a>
		<p class="cta-contact">Or email us at <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> — we respond within one working day.</p>
	</div>
</section>


<style>
	:root {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #b5622a;
		--taupe: #7a746e;
		--border: #e8e4e0;
		--panel: #f5f2ed;
		--max: 860px;
	}

	/* Removed global element selectors (like * and body) to ensure this fits cleanly 
     inside your SvelteKit layouts without causing styling leaks. */

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
	h1,
	h2,
	h4 {
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
		margin-bottom: 10px;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 46px;
		padding: 0 22px;
		border-radius: 2px;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 500;
		background: var(--copper);
		color: #fff;
		border: 1px solid var(--copper);
		transition: all 0.15s;
	}
	.btn:hover {
		background: #9a4f22;
	}



	.hero {
		padding: 64px 0 48px;
		border-bottom: 1px solid var(--border);
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
	}
	.hero h1 {
		font-size: clamp(2.4rem, 5vw, 3.6rem);
		font-style: italic;
		margin-bottom: 10px;
	}
	.hero p {
		font-size: 0.96rem;
		color: var(--taupe);
		max-width: 520px;
	}

	/* CATEGORY TABS */
	.tabs {
		padding: 32px 0 0;
		border-bottom: 1px solid var(--border);
	}
	.tab-list {
		display: flex;
		gap: 0;
		overflow-x: auto;
	}
	.tab {
		padding: 12px 20px;
		font-size: 0.76rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
		color: var(--taupe);
		border-bottom: 2px solid transparent;
		cursor: pointer;
		white-space: nowrap;
		background: none;
		border-top: none;
		border-left: none;
		border-right: none;
		font-family: 'Jost', sans-serif;
		transition: all 0.15s;
	}
	.tab:hover {
		color: var(--ink);
	}
	.tab.active {
		color: var(--copper);
		border-bottom-color: var(--copper);
	}

	/* FAQ CONTENT */
	.faq-content {
		padding: 56px 0 88px;
	}
	.faq-group {
		margin-bottom: 56px;
	}
	.faq-group-title {
		font-size: 1.6rem;
		margin-bottom: 24px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--border);
	}
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	/* ACCORDION */
	.faq-item {
		background: #fff;
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.faq-q {
		width: 100%;
		text-align: left;
		padding: 18px 22px;
		background: none;
		border: none;
		font-family: 'Jost', sans-serif;
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--ink);
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		line-height: 1.5;
		transition: background 0.15s;
	}
	.faq-q:hover {
		background: var(--panel);
	}
	.faq-q.open {
		background: var(--panel);
		color: var(--copper);
	}
	.faq-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		position: relative;
	}
	.faq-icon::before,
	.faq-icon::after {
		content: '';
		position: absolute;
		background: currentColor;
		border-radius: 1px;
		transition: transform 0.2s;
	}
	.faq-icon::before {
		width: 10px;
		height: 1.5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.faq-icon::after {
		width: 1.5px;
		height: 10px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.faq-q.open .faq-icon::after {
		transform: translate(-50%, -50%) rotate(90deg);
		opacity: 0;
	}
	.faq-a {
		display: none;
		padding: 0 22px 18px;
		font-size: 0.9rem;
		color: var(--taupe);
		line-height: 1.75;
	}
	.faq-a.open {
		display: block;
	}

	/* CTA */
	.cta {
		background: var(--panel);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		padding: 64px 0;
	}
	.cta-inner {
		text-align: center;
		max-width: 480px;
		margin: auto;
	}
	.cta-inner h2 {
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		margin-bottom: 10px;
	}
	.cta-inner p {
		font-size: 0.88rem;
		color: var(--taupe);
		margin-bottom: 24px;
	}
	.cta-contact {
		margin-top: 24px;
		font-size: 0.84rem;
		color: var(--taupe);
	}



</style>