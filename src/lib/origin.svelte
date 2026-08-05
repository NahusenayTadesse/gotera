<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		/** Ethiopian highlands / teff field, or injera on the mitad. Wide, warm natural light. */
		src?: string;
		alt?: string;
	};

	let {
		src = '/teff.webp',
		alt = m.origin_image_alt()
	}: Props = $props();
</script>

<section class="origin">
	<div class="origin-inner">
		<header class="origin-head">
			<span class="eyebrow">{m.origin_eyebrow()}</span>
			<h2>{m.origin_heading()}</h2>
		</header>

		<figure class="origin-figure">
			<img {src} {alt} loading="lazy" decoding="async" width="1600" height="1000" />
		</figure>

		<div class="origin-body">
			<p>
				{m.origin_paragraph1()}
			</p>
			<p>
				{m.origin_paragraph2()}
			</p>

			<p class="statement">
				{m.origin_statement_line1()}
<br />
				{m.origin_statement_line2()}
<br />
				<em>{m.origin_statement_line3()}
</em>
			</p>

			<a class="link-cta" href="/about">
				{m.origin_cta_link()}
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