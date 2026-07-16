<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	type Step = { num: string; title: string; copy: string; meta: string };

	const steps: Step[] = [
		{
			num: '01',
			title: 'Subscribe',
			copy: 'Choose your plan. No long contracts — pause or cancel any time from your account.',
			meta: 'From £6.50 / week'
		},
		{
			num: '02',
			title: 'Made fresh in Ethiopia',
			copy: 'Every injera is made with 100% teff using traditional natural fermentation. Packed at source to lock in freshness.',
			meta: '100% teff · Naturally fermented'
		},
		{
			num: '03',
			title: 'Delivered to your door',
			copy: 'Cold-chain packaging keeps your injera fresh from Addis Ababa to your door. Delivered every Saturday in London.',
			meta: 'Addis Ababa → London · Saturdays'
		},
		{
			num: '04',
			title: 'Eat real injera',
			copy: 'Warm gently in a dry pan or serve fresh. 100% teff. Naturally gluten-free. High in iron. The real thing.',
			meta: 'Gluten-free · High in iron'
		}
	];
</script>

<section class="how">
	<div class="how-inner">
		<header class="how-head">
			<span class="eyebrow">How it works</span>
			<h2>Simple from start to delivery.</h2>
		</header>

		<ol class="steps">
			{#each steps as step}
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
				Start your subscription — from £6.50
				<ArrowRight class="btn-icon" />
			</a>
			<p class="alt">Pause or cancel any time. Delivered every Saturday in London.</p>
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
		left: 17px;
		top: 42px;
		bottom: 6px;
		width: 1px;
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
			margin-bottom: 56px;
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
			height: 1px;
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