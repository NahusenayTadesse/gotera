<section class="proof flex justify-center j" data-status="placeholder-copy">
  <div class="container">
    <div class="proof-head">
      <span class="eyebrow">From our subscribers</span>
      <h2>What people say.</h2>
      <p>Sample copy — replace with real, consented quotes at launch.</p>
    </div>
 
    <div class="proof-grid">
      <!-- Diaspora / authenticity -->
      <div class="proof-card">
        <!-- <img
          class="proof-card-avatar"
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Hirut&backgroundColor=f1e5d0"
          alt=""
          width="72" height="72" loading="lazy" aria-hidden="true"
        > -->
        <div class="proof-card-quote">
          "Finally, authentic injera that tastes like home. The texture is perfect, and it arrives perfectly fresh every month"
        </div>
        <div class="proof-card-attr">Alemayehu T. · London · Subscriber since March 2026
</div>
      </div>
 
      <!-- Health / vegan -->
      <div class="proof-card">
        <!-- <img
          class="proof-card-avatar"
          src="https://api.dicebear.com/8.x/notionists/svg?beardVariant=variant01:seed=Meaza&backgroundColor=e3ece4"
          alt=""
          width="72" height="72" loading="lazy" aria-hidden="true"
        > -->
        <div class="proof-card-quote">
          "I went gluten-free two years ago and dinner got boring fast. This is the first thing
          I've found that's naturally teff, actually filling, and doesn't taste like a substitute
          for something else."
        </div>
        <div class="proof-card-attr">Meaza Tesfaye · London · Subscriber since February 2026</div>
      </div>
 
      <!-- Gifting -->
      <div class="proof-card">
        <!-- <img
          class="proof-card-avatar"
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Dawit&backgroundColor=ede1e6"
          alt=""
          width="72" height="72" loading="lazy" aria-hidden="true"
        > -->
        <div class="proof-card-quote">
          "Sent one to my sister for her birthday. She opened the box on video call and went quiet,
          then said it smelled like our grandmother's kitchen. Best twenty seconds of my year."
        </div>
        <div class="proof-card-attr">Dawit Bekele · London · Gift sender</div>
      </div>
    </div>
  </div>
</section>

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
		background: linear-gradient(
			0deg,
			rgba(26, 26, 26, 0.92) 0%,
			rgba(26, 26, 26, 0.55) 50%,
			transparent 100%
		);
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
