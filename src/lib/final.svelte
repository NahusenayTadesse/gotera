<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="final">
	<div class="final-inner">
		<span class="eyebrow">Subscribe</span>
		<h2>Your injera. Every month.</h2>
		<p class="sub">
			Stop searching. Start enjoying real Ethiopian injera delivered to your door every Saturday.
		</p>

		<div class="actions">
			<a class="btn btn-full" href="/subscribe">
				Subscribe from £6.50 — secure your delivery
				<ArrowRight class="btn-icon" />
			</a>
			<p class="alt">Have a question? <a href="/faq">Read the FAQ</a></p>
		</div>
	</div>
</section>

<style>
	.final {
		background: var(--panel);
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding: 64px 16px;
		text-align: center;
	}
	.final-inner {
		width: min(560px, 100%);
		margin: 0 auto;
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
		margin-bottom: 12px;
	}
	.sub {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--taupe);
		max-width: 42ch;
		margin: 0 auto;
	}

	.actions {
		margin-top: 28px;
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
		margin-top: 14px;
		font-size: 0.82rem;
		color: var(--taupe);
	}
	.alt a {
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (min-width: 900px) {
		.final {
			padding: 96px 24px;
		}
		.btn-full {
			width: auto;
		}
	}
</style>