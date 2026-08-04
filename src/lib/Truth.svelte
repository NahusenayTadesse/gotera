<section class="truth">
	<div class="container">
		<div class="truth-grid">
			<div class="truth-copy">
				<span class="eyebrow">The Truth</span>
				<h2>Let's be honest about the injera you're buying right now.</h2>
				<ul class="truth-list">
					<li>It's hard to find.</li>
					<li>Finding it means driving across town.</li>
					<li>What's on the shelf is often wheat, not teff.</li>
					<li>It doesn't taste right. It doesn't feel right.</li>
					<li>By the time you find it, it's already gone stale and spoiled.</li>
				</ul>
			</div>
			<div class="truth-resolve">
				<p class="truth-resolve-lead">Real injera shouldn't be this hard to find.</p>
				<p class="truth-resolve-sub">So we brought it here, made properly.</p>
				<div class="truth-badges">
					<span>Made in Ethiopia</span><span class="meta-dot"></span>
					<span>Packed at source</span><span class="meta-dot"></span>
					<span>Delivered to London</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
    .truth {
    padding: 72px 0;
    background: var(--panel);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}
.truth-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 48px;
    align-items: center;
}
.truth-copy h2 {
    font-size: clamp(1.8rem, 3.4vw, 2.6rem);
    margin-bottom: 24px;
    line-height: 1.1;
}
.truth-list {
    list-style: none;
    display: grid;
    gap: 12px;
}
.truth-list li {
    font-size: 0.92rem;
    color: #56504a;
    line-height: 1.6;
    padding-left: 16px;
    position: relative;
}
.truth-list li::before {
    content: '*';
    position: absolute;
    left: 0;
    color: rgba(181, 98, 42, 0.5);
    font-size: 0.8rem;
}
.truth-resolve {
    background: #fff;
    border: 1px solid var(--border);
    padding: 40px 36px;
}
.truth-resolve-lead {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem;
    font-style: italic;
    color: var(--ink);
    line-height: 1.3;
    margin-bottom: 10px;
}
.truth-resolve-sub {
    font-size: 0.92rem;
    color: var(--taupe);
    margin-bottom: 26px;
}
.truth-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 14px;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--copper);
    font-weight: 500;
}

@media (max-width: 960px) {
    .truth-grid {
        grid-template-columns: 1fr;
    }
}
</style>