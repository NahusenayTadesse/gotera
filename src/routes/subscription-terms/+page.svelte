<script>
	// Subscription plans static data
  let { data } = $props();
</script>

<section class="hero">
	<div class="container">
		<span class="eyebrow">Legal</span>
		<h1>Subscription Terms</h1>
		<p class="updated">Last updated: 1 January 2026</p>
	</div>
</section>

<div class="content">
	<div class="container">

		<div class="ls">
			<h2>How subscriptions work</h2>
			<p>A GOTERA subscription is a recurring monthly order. Choose a plan, set your delivery, and GOTERA delivers injera every month. Manage everything from your account.</p>
			<div class="highlight">
				<p><strong>No minimum term.</strong> Cancel any time. No cancellation fees.</p>
			</div>
		</div>

		<div class="ls">
			<h2>Plans</h2>
			<table class="ptable">
	<thead>
		<tr>
			<th>Plan</th>
			<th>Packs</th>
			<th>Billing</th>
			<th class="price">Price</th>
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
			<h2>Billing</h2>
			<p>Billed monthly on the same date as your first payment. Your charge is your plan price plus any add-ons. An email reminder is sent 3 days before each payment.</p>
		</div>

		<div class="ls">
			<h2>Pause, skip, cancel</h2>
			<h3>Pause</h3>
			<p>No payments or deliveries until you resume. No time limit. Account → Pause Subscription.</p>
			
			<h3>Skip</h3>
			<p>Skip one month's delivery with no charge. Must be done before the cut-off. Account → Skip Next Delivery.</p>
			
			<h3>Cancel</h3>
			<p>Ends at the close of the current billing period. No further charges. Account → Cancel Subscription, or email <a href="mailto:hello@gotera.co.uk">hello@gotera.co.uk</a>.</p>
		</div>

		<div class="ls">
			<h2>Minimum term</h2>
			<p>None. Cancel any time with no penalty.</p>
		</div>

		<div class="ls">
			<h2>Failed payments</h2>
			<p>If payment fails we email you immediately and retry after 3 days. If the second attempt fails, we email again. After 7 days without resolution, your subscription is paused — no delivery is made for that cycle. Update payment at Account → Payment.</p>
		</div>

		<div class="ls">
			<h2>Changing plan</h2>
			<p>Switch between Starter and Regular any time from your account. Changes take effect from the next billing cycle.</p>
		</div>

		<div class="ls">
			<h2>Add-ons</h2>
			<p>Add pantry products to any delivery before the cut-off date. Added to your next monthly payment. Remove before cut-off at no charge.</p>
			<div class="infobox">
				<p>Berbere £3.50 · Mitmita £3.50 · Niter Kibbeh £5.00</p>
			</div>
			<p>Cut-off: the Sunday before your Saturday delivery at midnight. Shown in your account.</p>
		</div>

		<div class="ls">
			<h2>WhatsApp notifications</h2>
			<p>Optional delivery updates via WhatsApp — dispatch, delivery window, and confirmation. Opt in by adding your WhatsApp number in account settings. Withdraw consent any time from account preferences. Sent via Twilio. Number not shared with third parties.</p>
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