<script lang="ts">
	import RouteMap from '$lib/components/dashboard/RouteMap.svelte';
	import { goto } from '$app/navigation';
	import { fullDate } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	/**
	 * Google Maps caps a single directions URL at 10 points (origin, destination and 8
	 * waypoints between them), so a busy Saturday has to be handed to the driver as
	 * several consecutive links rather than one. Each leg starts where the last ended so
	 * the chain is continuous, and the final one closes the loop back at the depot.
	 */
	const WAYPOINTS_PER_LINK = 8;

	const mapsLinks = $derived.by(() => {
		const depot = data.depotPostcode;
		const stops = data.ordered.map((s) => `${s.line1}, ${s.postcode}`);
		if (stops.length === 0) return [];

		const links: { label: string; url: string }[] = [];
		for (let i = 0; i < stops.length; i += WAYPOINTS_PER_LINK) {
			const chunk = stops.slice(i, i + WAYPOINTS_PER_LINK);
			const origin = i === 0 ? depot : stops[i - 1];
			// The last chunk returns to the depot; the others hand off to the next stop.
			const destination = stops[i + WAYPOINTS_PER_LINK] ?? depot;
			const params = new URLSearchParams({
				api: '1',
				origin,
				destination,
				travelmode: 'driving',
				waypoints: chunk.join('|')
			});
			links.push({
				label:
					stops.length <= WAYPOINTS_PER_LINK
						? 'Open in Google Maps'
						: `Stops ${i + 1}–${Math.min(i + WAYPOINTS_PER_LINK, stops.length)}`,
				url: `https://www.google.com/maps/dir/?${params}`
			});
		}
		return links;
	});

	const markers = $derived([
		...(data.depot
			? [
					{
						latitude: data.depot.latitude,
						longitude: data.depot.longitude,
						label: '⌂',
						title: `Depot · ${data.depotPostcode}`
					}
				]
			: []),
		...data.ordered.map((s, i) => ({
			latitude: s.latitude!,
			longitude: s.longitude!,
			label: String(i + 1),
			title: `${i + 1}. ${s.name} — ${s.line1}, ${s.postcode}`
		}))
	]);

	const miles = $derived(data.totals ? (data.totals.metres / 1609.344).toFixed(1) : null);
	const drive = $derived.by(() => {
		if (!data.totals?.seconds) return null;
		const mins = Math.round(data.totals.seconds / 60);
		return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
	});

	function exportCsv() {
		const rows = [
			['#', 'Type', 'Name', 'Address', 'Postcode'],
			...data.ordered.map((s, i) => [
				String(i + 1),
				s.kind,
				s.name,
				[s.line1, s.line2, s.city].filter(Boolean).join(', '),
				s.postcode
			])
		];
		// Quote every cell and double any embedded quotes — addresses routinely contain
		// commas, which would otherwise shift each following column by one.
		const csv = rows
			.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(','))
			.join('\n');
		const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
		const a = document.createElement('a');
		a.href = url;
		a.download = `gotera-route-${data.date}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}

	async function exportPdf() {
		// Dynamically imported so ~350KB of PDF machinery isn't in the page's initial
		// bundle for the common case where nobody prints anything.
		const { default: jsPDF } = await import('jspdf');
		const { default: autoTable } = await import('jspdf-autotable');
		const doc = new jsPDF();
		doc.setFontSize(14);
		doc.text(`GOTERA delivery route — ${fullDate(data.date)}`, 14, 18);
		doc.setFontSize(10);
		doc.text(
			`Depot ${data.depotPostcode} · ${data.ordered.length} stops` +
				(miles ? ` · ${miles} mi${drive ? ` · ${drive}` : ''}` : ''),
			14,
			25
		);
		autoTable(doc, {
			startY: 31,
			head: [['#', 'Name', 'Address', 'Postcode']],
			body: data.ordered.map((s, i) => [
				i + 1,
				s.name,
				[s.line1, s.line2, s.city].filter(Boolean).join(', '),
				s.postcode
			])
		});
		doc.save(`gotera-route-${data.date}.pdf`);
	}
</script>

<svelte:head><title>Delivery route · {data.date}</title></svelte:head>

<div class="route-page">
	<header class="route-head">
		<div>
			<h1>Delivery route</h1>
			<p class="route-sub">{fullDate(data.date)}</p>
		</div>
		<label class="route-date">
			<span>Delivery date</span>
			<input
				type="date"
				value={data.date}
				onchange={(e) => goto(`?date=${e.currentTarget.value}`, { keepFocus: true })}
			/>
		</label>
	</header>

	{#if data.totals}
		<div class="route-stats">
			<div><strong>{data.totals.stops}</strong><span>stops</span></div>
			<div><strong>{miles}</strong><span>miles{data.estimated ? ' (est.)' : ''}</span></div>
			{#if drive}<div><strong>{drive}</strong><span>driving</span></div>{/if}
		</div>
	{/if}

	{#if data.unscheduledCount > 0}
		<p class="route-note">
			{data.scheduledCount} subscription {data.scheduledCount === 1
				? 'delivery is'
				: 'deliveries are'}
			scheduled for this date. The other {data.unscheduledCount} stop{data.unscheduledCount === 1
				? ''
				: 's'}
			{data.unscheduledCount === 1 ? 'is a' : 'are'} paid guest or gift order{data.unscheduledCount ===
			1
				? ''
				: 's'} awaiting fulfilment — those carry no delivery date, so they appear on every date until
			marked fulfilled.
		</p>
	{/if}

	{#if data.estimated && data.ordered.length > 0}
		<p class="route-note">
			Distances are straight-line estimates — real driving times were unavailable. The stop order is
			still optimised; only the totals are approximate.
		</p>
	{/if}

	{#if !data.depot}
		<p class="route-empty">
			The depot postcode <code>{data.depotPostcode}</code> couldn't be located, so no route could be
			built. Check <code>DEPOT_POSTCODE</code>.
		</p>
	{:else if data.ordered.length === 0}
		<p class="route-empty">No deliveries to route on this date.</p>
	{:else}
		<RouteMap depot={markers[0]} stops={markers.slice(1)} />

		<div class="route-actions">
			{#each mapsLinks as link (link.url)}
				<a class="route-btn" href={link.url} target="_blank" rel="noopener noreferrer"
					>{link.label}</a
				>
			{/each}
			<button class="route-btn" type="button" onclick={exportCsv}>CSV</button>
			<button class="route-btn" type="button" onclick={exportPdf}>PDF</button>
		</div>

		<ol class="route-stops">
			<li class="is-depot">
				<span class="n">⌂</span>
				<div><strong>Depot</strong><span>{data.depotPostcode}</span></div>
			</li>
			{#each data.ordered as stop, i (stop.id)}
				<li>
					<span class="n">{i + 1}</span>
					<div>
						<strong
							>{stop.name}{#if stop.kind !== 'subscription'}<em class="tag">{stop.kind}</em
								>{/if}</strong
						>
						<span
							>{[stop.line1, stop.line2, stop.city].filter(Boolean).join(', ')} · {stop.postcode}</span
						>
					</div>
				</li>
			{/each}
			<li class="is-depot">
				<span class="n">⌂</span>
				<div><strong>Back to depot</strong><span>{data.depotPostcode}</span></div>
			</li>
		</ol>
	{/if}

	{#if data.unplaceable.length > 0}
		<section class="route-unplaceable">
			<h2>
				{data.unplaceable.length} stop{data.unplaceable.length === 1 ? '' : 's'} not on the route
			</h2>
			<p>
				These postcodes couldn't be located, so they aren't in the order above. They still need
				delivering — fix the postcode on the customer's address and reload.
			</p>
			<ul>
				{#each data.unplaceable as stop (stop.id)}
					<li><strong>{stop.name}</strong> — {stop.line1}, {stop.postcode || '(no postcode)'}</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
	.route-page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.25rem;
		max-width: 1100px;
	}
	.route-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.route-head h1 {
		margin: 0;
		font-size: 1.5rem;
	}
	.route-sub {
		margin: 0.15rem 0 0;
		color: var(--muted-foreground, #6b6459);
		font-size: 0.9rem;
	}
	.route-date {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: var(--muted-foreground, #6b6459);
	}
	.route-date input {
		padding: 0.4rem 0.55rem;
		border: 1px solid var(--line, #e2ddd2);
		border-radius: 8px;
		background: transparent;
		color: inherit;
	}

	.route-stats {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}
	.route-stats div {
		display: flex;
		flex-direction: column;
	}
	.route-stats strong {
		font-size: 1.5rem;
		line-height: 1.1;
	}
	.route-stats span {
		font-size: 0.78rem;
		color: var(--muted-foreground, #6b6459);
	}

	.route-note,
	.route-empty {
		margin: 0;
		padding: 0.7rem 0.9rem;
		border-radius: 8px;
		background: rgba(164, 89, 38, 0.08);
		font-size: 0.875rem;
	}
	.route-empty {
		text-align: center;
		padding: 2rem;
	}
	code {
		font-family: ui-monospace, monospace;
		font-size: 0.85em;
	}

	.route-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.route-btn {
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--line, #e2ddd2);
		border-radius: 8px;
		background: transparent;
		color: inherit;
		font: inherit;
		font-size: 0.85rem;
		cursor: pointer;
		text-decoration: none;
	}
	.route-btn:hover {
		border-color: #a45926;
		color: #a45926;
	}

	.route-stops {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	.route-stops li {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--line, #e2ddd2);
	}
	.route-stops li:last-child {
		border-bottom: 0;
	}
	.route-stops .n {
		flex: none;
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: #a45926;
		color: #fff;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.route-stops .is-depot .n {
		background: #16130f;
	}
	.route-stops div {
		display: flex;
		flex-direction: column;
	}
	.route-stops span {
		font-size: 0.82rem;
		color: var(--muted-foreground, #6b6459);
	}
	.tag {
		margin-left: 0.4rem;
		font-size: 0.7rem;
		font-style: normal;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #a45926;
	}

	.route-unplaceable {
		border: 1px solid rgba(164, 89, 38, 0.35);
		border-radius: 10px;
		padding: 0.9rem 1rem;
	}
	.route-unplaceable h2 {
		margin: 0 0 0.3rem;
		font-size: 1rem;
	}
	.route-unplaceable p {
		margin: 0 0 0.6rem;
		font-size: 0.85rem;
		color: var(--muted-foreground, #6b6459);
	}
	.route-unplaceable ul {
		margin: 0;
		padding-left: 1.1rem;
		font-size: 0.85rem;
	}
</style>
