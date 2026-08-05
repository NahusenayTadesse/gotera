<script>
	import { m } from '$lib/paraglide/messages.js';

	// Data array keeps layout components easy to scan and update
	const sections = $derived([
		{
			id: 'about',
			title: m.terms_about_title(),
			content: m.terms_about_content(),
			infobox: m.terms_about_infobox()
		},
		{
			id: 'service',
			title: m.terms_service_title(),
			content: m.terms_service_content()
		},
		{
			id: 'subscription',
			title: m.terms_subscription_title(),
			subsections: [
				{
					title: m.terms_subscription_billing_title(),
					body: m.terms_subscription_billing_body()
				},
				{
					title: m.terms_subscription_cancellation_title(),
					body: m.terms_subscription_cancellation_body()
				},
				{
					title: m.terms_subscription_pause_title(),
					body: m.terms_subscription_pause_body()
				},
				{
					title: m.terms_subscription_minterm_title(),
					body: m.terms_subscription_minterm_body()
				}
			]
		},
		{
			id: 'pricing',
			title: m.terms_pricing_title(),
			content: m.terms_pricing_content(),
			list: [
				m.terms_pricing_list_oneoff(),
				m.terms_pricing_list_starter(),
				m.terms_pricing_list_regular(),
				m.terms_pricing_list_gift()
			]
		},
		{
			id: 'delivery',
			title: m.terms_delivery_title(),
			content: m.terms_delivery_content()
		},
		{
			id: 'refunds',
			title: m.terms_refunds_title(),
			content: m.terms_refunds_content()
		},
		{
			id: 'quality',
			title: m.terms_quality_title(),
			content: m.terms_quality_content()
		},
		{
			id: 'liability',
			title: m.terms_liability_title(),
			content: m.terms_liability_content()
		},
		{
			id: 'law',
			title: m.terms_law_title(),
			content: m.terms_law_content()
		}
	]);
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">{m.terms_eyebrow()}</span>
		<h1>{m.terms_h1()}</h1>
		<p class="updated">{m.terms_updated()}</p>
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
			<div class="cta-title">{m.terms_cta_title()}</div>
			<p class="cta-sub">{m.terms_cta_sub()}</p>
			<a href="/subscribe" class="cta-btn">{m.terms_cta_btn()}</a>
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