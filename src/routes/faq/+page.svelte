<script>
	import { m } from '$lib/paraglide/messages.js';

	// 1. Static Content Data Array (keeps our template clean and readable)
	// Built as a derived value so it re-localizes when the active locale changes.
	let faqData = $derived([
		{
			category: m.faq_cat_product(),
			items: [
				{
					q: m.faq_product_q1_question(),
					a: m.faq_product_q1_answer(),
					defaultOpen: true // Match your original design choice
				},
				{
					q: m.faq_product_q2_question(),
					a: m.faq_product_q2_answer()
				},
				{
					q: m.faq_product_q3_question(),
					a: m.faq_product_q3_answer()
				},
				{
					q: m.faq_product_q4_question(),
					a: m.faq_product_q4_answer()
				},
				{
					q: m.faq_product_q5_question(),
					a: m.faq_product_q5_answer()
				},
				{
					q: m.faq_product_q6_question(),
					a: m.faq_product_q6_answer()
				}
			]
		},
		{
			category: m.faq_cat_subscription(),
			items: [
				{
					q: m.faq_subscription_q1_question(),
					a: m.faq_subscription_q1_answer()
				},
				{
					q: m.faq_subscription_q2_question(),
					a: m.faq_subscription_q2_answer()
				},
				{
					q: m.faq_subscription_q3_question(),
					a: m.faq_subscription_q3_answer()
				},
				{
					q: m.faq_subscription_q4_question(),
					a: m.faq_subscription_q4_answer()
				},
				{
					q: m.faq_subscription_q5_question(),
					a: m.faq_subscription_q5_answer()
				},
				{
					q: m.faq_subscription_q6_question(),
					a: m.faq_subscription_q6_answer()
				}
			]
		},
		{
			category: m.faq_cat_delivery(),
			items: [
				{
					q: m.faq_delivery_q1_question(),
					a: m.faq_delivery_q1_answer()
				},
				{
					q: m.faq_delivery_q2_question(),
					a: m.faq_delivery_q2_answer()
				},
				{
					q: m.faq_delivery_q3_question(),
					a: m.faq_delivery_q3_answer()
				},
				{
					q: m.faq_delivery_q4_question(),
					a: m.faq_delivery_q4_answer()
				},
				{
					q: m.faq_delivery_q5_question(),
					a: m.faq_delivery_q5_answer()
				}
			]
		},
		{
			category: m.faq_cat_gifting(),
			items: [
				{
					q: m.faq_gifting_q1_question(),
					a: m.faq_gifting_q1_answer()
				},
				{
					q: m.faq_gifting_q2_question(),
					a: m.faq_gifting_q2_answer()
				},
				{
					q: m.faq_gifting_q3_question(),
					a: m.faq_gifting_q3_answer()
				}
			]
		},
		{
			category: m.faq_cat_account(),
			items: [
				{
					q: m.faq_account_q1_question(),
					a: m.faq_account_q1_answer()
				},
				{
					q: m.faq_account_q2_question(),
					a: m.faq_account_q2_answer()
				},
				{
					q: m.faq_account_q3_question(),
					a: m.faq_account_q3_answer()
				}
			]
		}
	]);

	// Extract unique categories for tabs automatically
	let categories = $derived(faqData.map((d) => d.category));

	// 2. Svelte 5 Runes for State Management
	// Tracked by index (not the localized label) so switching locales doesn't
	// break the active-tab match.
	let activeCategoryIndex = $state(0);

	// Object state lookup to track open/closed questions dynamically
	// Initializes with items marked as `defaultOpen` set to true
	/** @type {Record<string, boolean>} */
	let openAnswers = $state({});

	$effect(() => {
		/** @type {Record<string, boolean>} */
		const initial = {};
		faqData.forEach((group) => {
			group.items.forEach((item) => {
				if (item.defaultOpen) initial[item.q] = true;
			});
		});
		openAnswers = { ...initial, ...openAnswers };
	});

	/** @param {string} question */
	function toggle(question) {
		openAnswers[question] = !openAnswers[question];
	}
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">{m.faq_hero_eyebrow()}</span>
		<h1>{m.faq_hero_title()}</h1>
		<p>{m.faq_hero_subtitle()}</p>
	</div>
</section>

<div class="tabs">
	<div class="container">
		<div class="tab-list">
			{#each categories as category, index}
				<button
					type="button"
					class="tab"
					class:active={activeCategoryIndex === index}
					onclick={() => (activeCategoryIndex = index)}
				>
					{category}
				</button>
			{/each}
		</div>
	</div>
</div>

<div class="faq-content">
	<div class="container">
		{#each faqData as group, index}
			{#if activeCategoryIndex === index}
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
		<span class="eyebrow">{m.faq_cta_eyebrow()}</span>
		<h2>{m.faq_cta_title()}</h2>
		<p>{m.faq_cta_subtitle()}</p>
		<a href="/subscribe" class="btn">{m.faq_cta_button()}</a>
		<p class="cta-contact">{m.faq_cta_contact_prefix()} <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a> {m.faq_cta_contact_suffix()}</p>
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