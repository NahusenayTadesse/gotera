<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages.js';

	type Step = { num: string; title: string; copy: string; meta: string };

	const steps = $derived<Step[]>([
		{
			num: '01',
			title: m.howitworks_step1_title(),
			copy: m.howitworks_step1_copy(),
			meta: m.howitworks_step1_meta()
		},
		{
			num: '02',
			title: m.howitworks_step2_title(),
			copy: m.howitworks_step2_copy(),
			meta: m.howitworks_step2_meta()
		},
		{
			num: '03',
			title: m.howitworks_step3_title(),
			copy: m.howitworks_step3_copy(),
			meta: m.howitworks_step3_meta()
		},
		{
			num: '04',
			title: m.howitworks_step4_title(),
			copy: m.howitworks_step4_copy(),
			meta: m.howitworks_step4_meta()
		}
	]);
</script>

<section class="how">
	<div class="how-inner">
		<header class="how-head">
			<div class="how-head-text">
				<span class="eyebrow">{m.howitworks_eyebrow()}</span>
				<h2>{m.howitworks_heading()}</h2>
			</div>
			<div class="how-head-img">
				<img src="/injera/injera7.webp" alt={m.howitworks_image_alt()} loading="lazy" />
			</div>
		</header>

		<ol class="steps">
			{#each steps as step, i}
				<li class="step">
					<span class="step-num">{step.num}</span>
					<h3 class="step-title">{step.title}</h3>
					<p class="step-copy">{step.copy}</p>
					<p class="step-meta">{step.meta}</p>
				</li>
			{/each}
		</ol>

		<div class="cta-row">
			<a class="btn btn-full" href="/subscribe">
				{m.howitworks_cta_button()}
				<ArrowRight class="btn-icon" />
			</a>
			<p class="alt">{m.howitworks_cta_note()}</p>
		</div>
	</div>
</section>

<style>
	.how {
		background: var(--cream);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding: 64px 16px;
	}
	.how-inner {
		width: min(1040px, 100%);
		margin: 0 auto;
	}

	/* Header */
	.how-head {
		max-width: 30ch;
		margin-bottom: 40px;
	}
	.how-head-img {
		display: none;
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

	/* Steps — vertical rail on mobile */
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.step {
		position: relative;
		padding: 0 0 32px 56px;
	}
	.step:last-child {
		padding-bottom: 0;
	}
	.step::before {
		content: '';
		position: absolute;
		left: 16.5px;
		top: 42px;
		bottom: 6px;
		width: 2px;
		background: var(--border);
	}
	.step:last-child::before {
		display: none;
	}
	.step-num {
		position: absolute;
		left: 0;
		top: 0;
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: #fff;
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		color: var(--copper);
	}
	.step-title {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		font-size: 1.4rem;
		line-height: 1.2;
		margin-bottom: 6px;
	}
	.step-copy {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--taupe);
	}
	.step-meta {
		margin-top: 10px;
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--copper);
	}

	/* CTA */
	.cta-row {
		margin-top: 40px;
		padding-top: 28px;
		border-top: 1px solid var(--border);
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		min-height: 48px;
		padding: 0 22px;
		font-family: 'Jost', sans-serif;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 500;
		border-radius: 2px;
		border: 1px solid var(--copper);
		background: var(--copper);
		color: #fff;
		cursor: pointer;
		text-decoration: none;
		transition: background 0.15s;
	}
	.btn:hover {
		background: #9a4f22;
	}
	.btn-full {
		width: 100%;
	}
	:global(.btn-icon) {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}
	.alt {
		margin-top: 10px;
		text-align: center;
		font-size: 0.78rem;
		color: var(--taupe);
	}

	/* Four columns once there's room — the rail turns horizontal */
	@media (min-width: 900px) {
		.how {
			padding: 96px 24px;
		}
		.how-head {
			max-width: none;
			margin-bottom: 56px;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			gap: 40px;
		}
		.how-head-text {
			max-width: 30ch;
		}
		.how-head-img {
			display: block;
			width: 220px;
			aspect-ratio: 4 / 3;
			flex-shrink: 0;
			overflow: hidden;
			border-radius: 4px;
		}
		.how-head-img img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.steps {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 32px;
		}
		.step {
			padding: 56px 0 0;
		}
		.step::before {
			left: 48px;
			right: -32px;
			top: 17px;
			bottom: auto;
			width: auto;
			height: 2px;
		}
		.cta-row {
			margin-top: 56px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 24px;
		}
		.btn-full {
			width: auto;
			order: 2;
		}
		.alt {
			margin-top: 0;
			text-align: left;
			order: 1;
		}
	}
</style>