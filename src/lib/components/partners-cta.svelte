<script lang="ts">
	import { ArrowRight, Store, Wheat } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section class="partners-cta" aria-labelledby="partners-cta-heading">
	<div class="inner">
		<div class="text">
			<span class="eyebrow">{m.home_partners_eyebrow()}</span>
			<h2 id="partners-cta-heading">{m.home_partners_heading()}</h2>
			<p class="sub">{m.home_partners_sub()}</p>
		</div>

		<div class="paths">
			<a class="path" href="/partners">
				<Store class="path-icon" />
				<span class="path-title">{m.partners_type_partner()}</span>
				<span class="path-desc">{m.partners_type_partner_desc()}</span>
			</a>
			<a class="path" href="/partners?type=supplier">
				<Wheat class="path-icon" />
				<span class="path-title">{m.partners_type_supplier()}</span>
				<span class="path-desc">{m.partners_type_supplier_desc()}</span>
			</a>
			<a class="btn" href="/partners">
				{m.home_partners_cta()}
				<ArrowRight class="btn-icon" />
			</a>
		</div>
	</div>
</section>

<style>
	.partners-cta {
		background: var(--cream);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding: 56px 16px;
	}
	.inner {
		width: min(1080px, 100%);
		margin: 0 auto;
		display: grid;
		gap: 28px;
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
	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-style: italic;
		font-size: clamp(1.9rem, 5vw, 2.4rem);
		line-height: 1.05;
		margin-bottom: 12px;
	}
	.sub {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--taupe);
		max-width: 44ch;
	}
	.paths {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	.path {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		background: #fff;
		border: 1px solid var(--border);
		text-decoration: none;
		color: var(--ink);
		transition: border-color 0.15s;
	}
	.path:hover {
		border-color: var(--copper);
	}
	:global(.path-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--copper);
		margin-bottom: 4px;
	}
	.path-title {
		font-size: 0.95rem;
		font-weight: 500;
	}
	.path-desc {
		font-size: 0.76rem;
		line-height: 1.45;
		color: var(--taupe);
	}
	.btn {
		grid-column: 1 / -1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		min-height: 48px;
		padding: 0 22px;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		border: 1px solid var(--copper);
		background: transparent;
		color: var(--copper);
		text-decoration: none;
		transition: background 0.15s;
	}
	.btn:hover {
		background: rgba(164, 89, 38, 0.06);
	}
	:global(.btn-icon) {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	@media (max-width: 420px) {
		.paths {
			grid-template-columns: 1fr;
		}
	}
	@media (min-width: 900px) {
		.partners-cta {
			padding: 80px 24px;
		}
		.inner {
			grid-template-columns: 5fr 7fr;
			gap: 56px;
			align-items: center;
		}
	}
</style>
