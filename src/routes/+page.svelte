<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Bespoke homepage copy, keyed by slug. Facts (price/featured/existence)
	// come from the DB; this only overrides the marketing wording. A plan with
	// no entry here still renders using its DB name/subtitle/freq/bullets.
	const CARD_COPY: Record<
		string,
		{ title?: string; desc?: string; freq?: string; bullets?: string[]; cta: string }
	> = {
		'one-off': {
			desc: 'Try GOTERA without committing.',
			bullets: ['No subscription', 'Ideal first order'],
			cta: 'Order now'
		},
		starter: {
			desc: 'Lighter monthly plan.',
			bullets: ['2 packs monthly', 'Pause or skip anytime'],
			cta: 'Choose Starter'
		},
		regular: {
			desc: 'Our core plan.',
			bullets: ['Best for regular households', 'Strongest monthly value'],
			cta: 'Choose Regular'
		},
		'single-gift': {
			desc: 'Send injera to someone else.',
			bullets: ['No subscription needed', 'Add pantry items'],
			cta: 'Send a gift'
		}
	};

	// All subscription-type plans from the DB (already ordered by sortOrder),
	// merged with any bespoke copy. Falls back to DB fields when copy is absent.
	const cards = $derived(
		(data?.subscriptionPlans ?? []).map((p) => {
			const copy = CARD_COPY[p.slug] ?? { cta: 'Choose plan' };
			return {
				slug: p.slug,
				title: copy.title ?? p.name,
				desc: copy.desc ?? p.subtitle,
				freq: copy.freq ?? p.freq,
				bullets: copy.bullets ?? p.bullets ?? [],
				cta: copy.cta,
				price: p.price,
				featured: p.featured
			};
		})
	);

	// Real lowest prices from the DB (computed server-side).
	const subFrom = $derived(data?.subscriptionFromPrice ?? data?.fromPrice ?? null);
	const giftFrom = $derived(data?.giftFromPrice ?? null);

	// £12 not £12.00, but £6.50 keeps its pence.
	const fmtPrice = (p: number) => (Number.isInteger(p) ? `£${p}` : `£${p.toFixed(2)}`);
	// Real number once there's data; keeps the "—" launch look at zero.
	const stat = (n: number) => (n > 0 ? n.toLocaleString('en-GB') : '—');
</script>

<svelte:head>
	<title>GOTERA — Premium Ethiopian Food</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="hero hidden! lg:block!" aria-label="Hero">
	<div class="container hero-grid">
		<div>
			<span class="eyebrow">Made &amp; packed in Ethiopia</span>
			<h1 class="hero-title">Injera, Delivered To your door.</h1>
			<div class="hero-meta">
				<span>100% Teff</span><span class="meta-dot"></span>
				<span>Vegan</span><span class="meta-dot"></span>
				<span>Gluten Free</span><span class="meta-dot"></span>
				<span>High in Iron</span>
			</div>
			<p class="hero-copy">
				Real injera on a monthly subscription. Made in Ethiopia. Delivered to your door.
			</p>
			<div class="hero-actions">
				<a href="/subscribe" class="btn">Choose Your Plan{subFrom ? ` — from ${fmtPrice(subFrom)}` : ''}</a>
				<a href="/about" class="btn-outline">About GOTERA</a>
			</div>
		</div>
		<div class="hero-card">
			<div class="hero-card-img">
				<img src="/hero.jpeg" alt="GOTERA injera" style="width:100%;height:100%;object-fit:cover;object-position:center" />
			</div>
			<div class="hero-card-body">
				<h3>Injera</h3>
				<p>100% teff · naturally fermented · made in Ethiopia</p>
			</div>
		</div>
	</div>
</section>

<section class="hero-mobile flex! lg:hidden!" aria-label="Hero">
	<div class="hero__img">
		<div class="img-ph" style="width:100%;height:100%">
			<img src="/hero.jpeg" alt="GOTERA injera" style="width:100%;height:100%;object-fit:cover;object-position:center" />
		</div>
	</div>
	<div class="hero__gradient"></div>
	<div class="hero__content">
		<div class="hero__tag">
			<div class="hero__tag-line"></div>
			<span>Made &amp; packed in Ethiopia</span>
		</div>
		<h1 class="hero__h1">Injera,<br /><em>Delivered 
<br />To your door.</em></h1>
		{#if subFrom}
			<div class="hero__price-row">
				<span class="hero__price-from">From</span>
				<span class="hero__price-num">{fmtPrice(subFrom)}</span>
				<span class="hero__price-note">/ month · London delivery</span>
			</div>
		{/if}
		<a href="/subscribe" class="btn btn--primary" style="margin-bottom:12px">Choose your plan. Order Now</a>
		<div class="hero__claims">
			<span class="hero__claim">Gluten free</span>
			<span class="hero__claim">Vegan</span>
			<span class="hero__claim">100% teff</span>
		</div>
	</div>
</section>

<div class="proof-strip">
	<div class="container proof-inner">
		<div class="proof-stat">
			<span class="proof-stat-num">{stat(data?.stats?.subscribers)}</span>
			<span class="proof-stat-label">Subscribers</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-stat">
			<span class="proof-stat-num">{stat(data?.stats?.deliveries)}</span>
			<span class="proof-stat-label">Deliveries made</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-stat">
			<span class="proof-stat-num">{stat(data?.stats?.cities)}</span>
			<span class="proof-stat-label">Cities covered</span>
		</div>
		<div class="proof-divider"></div>
		<div class="proof-quote-ph">
			<span class="proof-quote-ph-text">"Subscriber quote placeholder — replace at launch."</span>
			<span class="proof-quote-ph-attr">Name · Location · GOTERA subscriber</span>
		</div>
	</div>
</div>

<section class="pillars">
	<div class="container">
		<div class="pillars-head">
			<span class="eyebrow">Why GOTERA</span>
			<h2>One product. Done properly.</h2>
			<p>Real injera, made in Ethiopia, on a subscription built for simplicity.</p>
		</div>
		<div class="pillars-grid">
			<div class="pillar">
				<div class="pillar-num">01</div>
				<h3>Made in Ethiopia</h3>
				<p>The origin is the product. Always clearly stated.</p>
			</div>
			<div class="pillar">
				<div class="pillar-num">02</div>
				<h3>100% Teff</h3>
				<p>One ingredient standard. No compromise.</p>
			</div>
			<div class="pillar">
				<div class="pillar-num">03</div>
				<h3>Monthly delivery</h3>
				<p>Order once. Arrive every month.</p>
			</div>
			<div class="pillar">
				<div class="pillar-num">04</div>
				<h3>Premium by design</h3>
				<p>Clear packaging, clean information, no clutter.</p>
			</div>
		</div>
	</div>
</section>

<section class="plans">
	<div class="container">
		<div class="plans-head">
			<span class="eyebrow">Subscription Plans</span>
			<h2>Choose your plan.</h2>
			<p>No minimum term. Cancel or pause any time.</p>
		</div>
		{#if cards.length}
			<div class="plans-grid">
				{#each cards as card (card.slug)}
					<div class="plan" class:plan-featured={card.featured}>
						<h3>{card.title}</h3>
						<p class="plan-desc">{card.desc}</p>
						<div class="price">{fmtPrice(card.price)}</div>
						<div class="freq">{card.freq}</div>
						<ul>
							{#each card.bullets as b}<li>{b}</li>{/each}
						</ul>
						<a href="/subscribe" class={card.featured ? 'btn plan-featured-btn' : 'btn-outline'}>{card.cta}</a>
					</div>
				{/each}
			</div>
		{:else}
			<p class="plans-empty">Plans are being updated — check back shortly.</p>
		{/if}
	</div>
</section>

<section class="origin">
	<div class="container">
		<div class="origin-grid">
			<div class="origin-panel">
				<span class="eyebrow">Origin</span>
				<h3>Made &amp; packed in Ethiopia</h3>
				<p>The product stays close to its source. That is what makes GOTERA worth trusting.</p>
			</div>
			<div class="origin-panel">
				<span class="eyebrow">Delivery</span>
				<h3>Delivered with clarity</h3>
				<p>One delivery date per month. Cold-chain packaging. Clear cut-off dates. Nothing complicated.</p>
			</div>
		</div>
	</div>
</section>

<section class="proof">
	<div class="container">
		<div class="proof-head">
			<span class="eyebrow">From our subscribers</span>
			<h2>What people say.</h2>
			<p>Replace placeholders with real quotes at launch.</p>
		</div>
		<div class="proof-grid">
			<div class="proof-card proof-card-placeholder">
				<div class="proof-card-ph">
					<span class="ph-label">Subscriber photo</span>
					<span class="ph-sub">Optional · square crop</span>
				</div>
				<div class="proof-card-quote">"Diaspora subscriber quote — authenticity, taste, delivery experience."</div>
				<div class="proof-card-attr">Name · City · Subscriber since —</div>
			</div>
			<div class="proof-card proof-card-placeholder">
				<div class="proof-card-ph">
					<span class="ph-label">Subscriber photo</span>
					<span class="ph-sub">Optional · square crop</span>
				</div>
				<div class="proof-card-quote">"Health or vegan audience quote — gluten-free, nutrition, convenience."</div>
				<div class="proof-card-attr">Name · City · Subscriber since —</div>
			</div>
			<div class="proof-card proof-card-placeholder">
				<div class="proof-card-ph">
					<span class="ph-label">Subscriber photo</span>
					<span class="ph-sub">Optional · square crop</span>
				</div>
				<div class="proof-card-quote">"Gifting experience quote — recipient reaction, presentation, quality."</div>
				<div class="proof-card-attr">Name · City · Gift sender</div>
			</div>
		</div>
	</div>
</section>
{#if data?.giftPlans?.length > 0}

<section class="gift">
	<div class="container gift-grid">
		<div class="gift-text">
			<span class="eyebrow">Gifting</span>
			<h2>Send GOTERA to someone's door.</h2>
			<p>Something they will actually use. One purchase, no subscription required.</p>
			<a href="/subscribe" class="btn">Send a Gift{giftFrom ? ` — from ${fmtPrice(giftFrom)}` : ''}</a>
		</div>
		<div class="gift-card">
			<div class="gift-card-img">
				<span class="ph-label">Gift photography</span>
				<span class="ph-sub">Packaging · warm tone · 4:3</span>
			</div>
			<div class="gift-card-body">
				<h3>{data?.giftPlans[0]?.name}</h3>
				<p>{data?.giftPlans[0]?.subtitle}</p>
			</div>
		</div>
	</div>
</section>
{/if}

<style>
	:global(:root) {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #b5622a;
		--taupe: #7a746e;
		--border: #e8e4e0;
		--panel: #f5f2ed;
		--white: #fff;
		--max: 1180px;
	}
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		font-family: 'Jost', sans-serif;
		background: var(--cream);
		color: var(--ink);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	.container {
		width: min(var(--max), calc(100% - 28px));
		margin: auto;
	}
	h1,
	h2,
	h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.02;
	}
	p {
		color: #433e39;
		line-height: 1.65;
	}
	.eyebrow {
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
		margin-bottom: 10px;
		display: block;
		font-weight: 500;
	}
	.btn,
	.btn-outline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 46px;
		padding: 0 22px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		transition: all 0.15s;
	}
	.btn {
		background: var(--copper);
		color: #fff;
		border: 1px solid var(--copper);
	}
	.btn:hover {
		background: #9a4f22;
	}
	.btn-outline {
		border: 1px solid rgba(181, 98, 42, 0.3);
		color: var(--copper);
		background: transparent;
	}
	.btn-outline:hover {
		background: rgba(181, 98, 42, 0.05);
	}
	.hero {
		padding: 64px 0 56px;
		background: linear-gradient(180deg, #fcfbf8 0%, var(--cream) 100%);
		border-bottom: 1px solid var(--border);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: center;
	}
	.hero-title {
		font-size: clamp(3.5rem, 9vw, 6.4rem);
		font-style: italic;
		line-height: 0.92;
		margin-bottom: 20px;
		letter-spacing: -0.01em;
	}
	.hero-meta {
		display: flex;
		gap: 10px 16px;
		flex-wrap: wrap;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--taupe);
		margin-bottom: 28px;
	}
	.meta-dot {
		width: 3px;
		height: 3px;
		border-radius: 999px;
		background: rgba(122, 116, 110, 0.4);
		display: inline-block;
		align-self: center;
	}
	.hero-copy {
		font-size: 0.96rem;
		color: #4a4440;
		line-height: 1.7;
		margin-bottom: 28px;
		max-width: 420px;
	}
	.hero-actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.hero-card {
		border: 1px solid var(--border);
		background: #fff;
		overflow: hidden;
	}
	.hero-card-img {
		width: 100%;
		aspect-ratio: 4/3;
		background: var(--panel);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		border-bottom: 1px solid var(--border);
	}
	.ph-label {
		font-size: 0.62rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
	}
	.ph-sub {
		font-size: 0.58rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(122, 116, 110, 0.5);
	}
	.hero-card-body {
		padding: 22px 24px;
	}
	.hero-card-body h3 {
		font-size: 1.6rem;
		font-style: italic;
		margin-bottom: 4px;
	}
	.hero-card-body p {
		font-size: 0.84rem;
		color: var(--taupe);
	}
	.proof-strip {
		background: var(--panel);
		border-bottom: 1px solid var(--border);
		padding: 20px 0;
	}
	.proof-inner {
		display: flex;
		align-items: center;
		gap: 32px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.proof-stat {
		text-align: center;
	}
	.proof-stat-num {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.8rem;
		color: var(--copper);
		line-height: 1;
		display: block;
	}
	.proof-stat-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--taupe);
		font-weight: 500;
	}
	.proof-divider {
		width: 1px;
		height: 32px;
		background: var(--border);
		flex-shrink: 0;
	}
	.proof-quote-ph {
		border: 1px dashed var(--border);
		background: #fff;
		padding: 16px 22px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 420px;
		flex: 1;
	}
	.proof-quote-ph-text {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.05rem;
		font-style: italic;
		color: var(--taupe);
	}
	.proof-quote-ph-attr {
		font-size: 0.64rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(122, 116, 110, 0.5);
		font-weight: 500;
	}
	.pillars {
		padding: 72px 0;
		border-bottom: 1px solid var(--border);
	}
	.pillars-head {
		margin-bottom: 36px;
	}
	.pillars-head h2 {
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		margin-bottom: 10px;
	}
	.pillars-head p {
		font-size: 0.9rem;
		color: var(--taupe);
		max-width: 480px;
	}
	.pillars-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.pillar {
		background: #fff;
		padding: 28px 22px;
	}
	.pillar-num {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2rem;
		color: rgba(181, 98, 42, 0.2);
		margin-bottom: 14px;
		line-height: 1;
	}
	.pillar h3 {
		font-size: 1.1rem;
		margin-bottom: 8px;
	}
	.pillar p {
		font-size: 0.84rem;
		color: var(--taupe);
		line-height: 1.6;
	}
	.plans {
		padding: 72px 0;
		background: var(--panel);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}
	.plans-head {
		margin-bottom: 36px;
	}
	.plans-head h2 {
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		margin-bottom: 8px;
	}
	.plans-head p {
		font-size: 0.9rem;
		color: var(--taupe);
	}
	.plans-empty {
		font-size: 0.9rem;
		color: var(--taupe);
	}
	.plans-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}
	.plan {
		background: #fff;
		border: 1px solid var(--border);
		padding: 24px;
	}
	.plan h3 {
		font-size: 1.4rem;
		margin-bottom: 6px;
	}
	.plan-desc {
		font-size: 0.82rem;
		color: var(--taupe);
		margin-bottom: 16px;
		line-height: 1.5;
	}
	.price {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2.6rem;
		color: var(--copper);
		line-height: 1;
	}
	.freq {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--taupe);
		margin: 4px 0 18px;
	}
	.plan ul {
		list-style: none;
		display: grid;
		gap: 7px;
		margin-bottom: 20px;
	}
	.plan li {
		font-size: 0.82rem;
		color: #463f39;
		padding-left: 12px;
		position: relative;
	}
	.plan li::before {
		content: '—';
		position: absolute;
		left: 0;
		color: rgba(181, 98, 42, 0.4);
		font-size: 0.7rem;
	}
	.plan-featured {
		background: var(--copper);
		border-color: var(--copper);
	}
	.plan-featured h3,
	.plan-featured .price {
		color: #fff;
	}
	.plan-featured .plan-desc,
	.plan-featured .freq,
	.plan-featured li {
		color: rgba(255, 255, 255, 0.8);
	}
	.plan-featured li::before {
		color: rgba(255, 255, 255, 0.4);
	}
	.plan-featured-btn {
		background: #fff;
		color: #b5622a;
		border-color: #fff;
	}
	.origin {
		padding: 72px 0;
		border-bottom: 1px solid var(--border);
	}
	.origin-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}
	.origin-panel {
		background: #fff;
		border: 1px solid var(--border);
		padding: 32px;
	}
	.origin-panel h3 {
		font-size: 1.6rem;
		margin-bottom: 12px;
	}
	.origin-panel p {
		font-size: 0.88rem;
		color: var(--taupe);
		line-height: 1.7;
	}
	.proof {
		padding: 72px 0;
		background: var(--panel);
		border-bottom: 1px solid var(--border);
	}
	.proof-head {
		margin-bottom: 36px;
	}
	.proof-head h2 {
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		margin-bottom: 8px;
	}
	.proof-head p {
		font-size: 0.88rem;
		color: var(--taupe);
	}
	.proof-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.proof-card {
		background: #fff;
		padding: 28px 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.proof-card-ph {
		width: 100%;
		aspect-ratio: 4/3;
		background: var(--panel);
		border: 1px dashed var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		margin-bottom: 4px;
	}
	.proof-card-quote {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.15rem;
		font-style: italic;
		color: var(--ink);
		line-height: 1.5;
	}
	.proof-card-attr {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--taupe);
		font-weight: 500;
	}
	.proof-card-placeholder .proof-card-quote {
		color: var(--taupe);
	}
	.gift {
		padding: 72px 0;
		border-bottom: 1px solid var(--border);
	}
	.gift-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.gift-text h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 12px;
	}
	.gift-text p {
		font-size: 0.9rem;
		color: var(--taupe);
		margin-bottom: 24px;
		max-width: 380px;
		line-height: 1.7;
	}
	.gift-card {
		border: 1px solid var(--border);
		background: #fff;
		overflow: hidden;
	}
	.gift-card-img {
		width: 100%;
		aspect-ratio: 4/3;
		background: var(--panel);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		border-bottom: 1px solid var(--border);
	}
	.gift-card-body {
		padding: 20px 22px;
	}
	.gift-card-body h3 {
		font-size: 1.3rem;
		font-style: italic;
		margin-bottom: 3px;
	}
	.gift-card-body p {
		font-size: 0.82rem;
		color: var(--taupe);
	}
	@media (max-width: 960px) {
		.hero-grid,
		.origin-grid,
		.gift-grid {
			grid-template-columns: 1fr;
		}
		.pillars-grid,
		.plans-grid,
		.proof-grid {
			grid-template-columns: 1fr 1fr;
		}
		.hero-card {
			order: -1;
		}
		.proof-inner {
			justify-content: flex-start;
		}
	}
	@media (max-width: 580px) {
		.pillars-grid,
		.plans-grid,
		.proof-grid {
			grid-template-columns: 1fr;
		}
		.hero-actions {
			flex-direction: column;
		}
		.btn,
		.btn-outline {
			width: 100%;
		}
		.proof-divider {
			display: none;
		}
	}
	.hero-mobile {
		position: relative;
		height: 100dvh;
		min-height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
	}
	.hero__img {
		position: absolute;
		inset: 0;
		background: var(--panel);
		overflow: hidden;
	}
	.hero__img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.hero__gradient {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70%;
		background: linear-gradient(0deg, rgba(26, 26, 26, 0.92) 0%, rgba(26, 26, 26, 0.55) 50%, transparent 100%);
	}
	.hero__content {
		position: relative;
		z-index: 1;
		padding: 0 20px 36px;
	}
	.hero__tag {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
	}
	.hero__tag-line {
		width: 18px;
		height: 1px;
		background: var(--copper);
	}
	.hero__tag span {
		font-size: 0.62rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250, 248, 244, 0.65);
		font-weight: 500;
	}
	.hero__h1 {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(2.8rem, 12vw, 4rem);
		font-style: italic;
		font-weight: 600;
		color: #fff;
		line-height: 0.92;
		margin-bottom: 14px;
	}
	.hero__h1 em {
		color: #b5622a;
		font-style: italic;
	}
	.hero__price-row {
		display: flex;
		align-items: baseline;
		gap: 6px;
		margin-bottom: 18px;
	}
	.hero__price-from {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(250, 248, 244, 0.5);
		font-weight: 500;
	}
	.hero__price-num {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2rem;
		color: #fff;
		line-height: 1;
	}
	.hero__price-note {
		font-size: 0.7rem;
		color: rgba(250, 248, 244, 0.5);
	}
	.hero__claims {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}
	.hero__claim {
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(250, 248, 244, 0.5);
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.hero__claim::before {
		content: '';
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--copper);
		flex-shrink: 0;
	}
</style>