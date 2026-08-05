<script>
	import { m } from '$lib/paraglide/messages.js';
	// Subscription plans static data
  let { data } = $props();
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">{m.subterms_eyebrow()}</span>
		<h1>{m.subterms_h1()}</h1>
		<p class="updated">{m.subterms_updated()}</p>
	</div>
</section>

<div class="content">
	<div class="container">

		<div class="ls">
			<h2>{m.subterms_how_title()}</h2>
			<p>{m.subterms_how_body()}</p>
			<div class="highlight">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html m.subterms_how_highlight()}</p>
			</div>
		</div>

		<div class="ls">
			<h2>{m.subterms_plans_title()}</h2>
			<table class="ptable">
	<thead>
		<tr>
			<th>{m.subterms_plans_th_plan()}</th>
			<th>{m.subterms_plans_th_packs()}</th>
			<th>{m.subterms_plans_th_billing()}</th>
			<th class="price">{m.subterms_plans_th_price()}</th>
		</tr>
	</thead>

	<tbody>
		{#each data?.displayPlans as plan (plan.id)}
			<tr class:featured={plan.featured}>
				<td>
					<div class="plan-name">
						<strong>{plan.name}</strong>

						{#if plan.subtitle}
							<small>{plan.subtitle}</small>
						{/if}
					</div>
				</td>

				<td>{plan.contents}</td>

				<td>{plan.intervalLabel}</td>

				<td class="price">
					<strong>{plan.price}</strong>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
		</div>

		<div class="ls">
			<h2>{m.subterms_billing_title()}</h2>
			<p>{m.subterms_billing_body()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_pauseskipcancel_title()}</h2>
			<h3>{m.subterms_pause_subtitle()}</h3>
			<p>{m.subterms_pause_body()}</p>

			<h3>{m.subterms_skip_subtitle()}</h3>
			<p>{m.subterms_skip_body()}</p>

			<h3>{m.subterms_cancel_subtitle()}</h3>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p>{@html m.subterms_cancel_body()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_minterm_title()}</h2>
			<p>{m.subterms_minterm_body()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_failedpay_title()}</h2>
			<p>{m.subterms_failedpay_body()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_changeplan_title()}</h2>
			<p>{m.subterms_changeplan_body()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_addons_title()}</h2>
			<p>{m.subterms_addons_body1()}</p>
			<div class="infobox">
				<p>{m.subterms_addons_infobox()}</p>
			</div>
			<p>{m.subterms_addons_body2()}</p>
		</div>

		<div class="ls">
			<h2>{m.subterms_whatsapp_title()}</h2>
			<p>{m.subterms_whatsapp_body()}</p>
		</div>

	</div>
</div>

<style>
	:root {
		--cream: #FAF8F4;
		--ink: #1A1A1A;
		--copper: #B5622A;
		--taupe: #7A746E;
		--border: #E8E4E0;
		--panel: #F5F2ED;
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
		font-size: .7rem;
		font-weight: 500;
		letter-spacing: .18em;
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
		font-size: .76rem;
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
	.ls p {
		margin-bottom: 12px;
		font-size: .92rem;
	}
	.ls p:last-child {
		margin-bottom: 0;
	}

	.infobox, .highlight {
		padding: 18px 20px;
		margin: 16px 0;
	}
	.infobox {
		background: #fff;
		border: 1px solid var(--border);
	}
	.infobox p {
		margin: 0;
		font-size: .88rem;
		line-height: 1.7;
	}

	.highlight {
		background: rgba(181, 98, 42, .05);
		border: 1px solid rgba(181, 98, 42, .16);
	}
	.highlight p {
		margin: 0;
		font-size: .88rem;
		line-height: 1.7;
	}

	.ptable {
		width: 100%;
		border-collapse: collapse;
		margin: 14px 0;
	}
	.ptable th, .ptable td {
		text-align: left;
		padding: 11px 14px;
		border-bottom: 1px solid var(--border);
		font-size: .88rem;
	}
	.ptable th {
		background: var(--panel);
		font-size: .64rem;
		font-weight: 500;
		letter-spacing: .14em;
		text-transform: uppercase;
		color: var(--copper);
	}
	.ptable tr:last-child td {
		border-bottom: none;
	}
</style>