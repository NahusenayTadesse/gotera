<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	type Props = {
		/** Ethiopian highlands / teff field, or injera on the mitad. Wide, warm natural light. */
		src?: string;
		alt?: string;
	};

	let {
		src = '/teff.webp',
		alt = 'Teff growing in the Ethiopian highlands'
	}: Props = $props();
</script>

<section class="origin">
	<div class="origin-inner">
		<header class="origin-head">
			<span class="eyebrow">Origin</span>
			<h2>From Ethiopian soil to your table.</h2>
		</header>

		<figure class="origin-figure">
			<img {src} {alt} loading="lazy" decoding="async" width="1600" height="1000" />
		</figure>

		<div class="origin-body">
			<p>
				GOTERA works directly with producers in Ethiopia who have been making injera for
				generations. The teff is grown in the Ethiopian highlands. The fermentation uses a live
				culture passed down through families.
			</p>
			<p>
				We do not import teff and manufacture elsewhere. We source the finished product at origin —
				made exactly as it should be — and bring it to London by cold chain.
			</p>

			<p class="statement">
				Nothing is approximated.<br />
				Nothing is substituted.<br />
				<em>This is the real thing.</em>
			</p>

			<a class="link-cta" href="/about">
				Read about GOTERA
				<ArrowRight class="link-icon" />
			</a>
		</div>
	</div>
</section>

<style>
	.origin {
		background: var(--cream);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding: 64px 16px;
	}
	.origin-inner {
		width: min(1040px, 100%);
		margin: 0 auto;
	}

	.origin-head {
		margin-bottom: 28px;
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
		font-size: clamp(2rem, 6vw, 2.6rem);
		line-height: 1.02;
	}

	.origin-figure {
		margin: 0 0 28px;
		border: 1px solid var(--border);
		background: var(--panel);
	}
	.origin-figure img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.origin-body p {
		font-size: 0.88rem;
		line-height: 1.75;
		color: var(--taupe);
	}
	.origin-body p + p {
		margin-top: 16px;
	}

	/* The three-line closing claim — the one moment that raises its voice */
	.statement {
		margin-top: 28px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		line-height: 1.35;
		color: var(--ink);
	}
	.statement em {
		font-style: italic;
		color: var(--copper);
	}

	.link-cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 24px;
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--copper);
		text-decoration: none;
		border-bottom: 1px solid rgba(181, 98, 42, 0.35);
		padding-bottom: 4px;
	}
	.link-cta:hover {
		border-bottom-color: var(--copper);
	}
	:global(.link-icon) {
		width: 0.95rem;
		height: 0.95rem;
	}

	@media (min-width: 900px) {
		.origin {
			padding: 96px 24px;
		}
		.origin-inner {
			display: grid;
			grid-template-columns: 1.1fr 1fr;
			column-gap: 56px;
			align-items: start;
		}
		.origin-head {
			grid-column: 1 / -1;
			
			margin-bottom: 40px;
		}
		.origin-figure {
			margin: 0;
		}
		.origin-figure img {
			aspect-ratio: 3 / 4;
		}
		.origin-body {
			padding-top: 4px;
		}
	}
</style>