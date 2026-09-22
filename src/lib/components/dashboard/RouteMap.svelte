<script lang="ts">
	import { onMount } from 'svelte';

	type Marker = { latitude: number; longitude: number; label: string; title: string };

	let { depot, stops }: { depot: Marker | null; stops: Marker[] } = $props();

	let container: HTMLDivElement;
	/** Null until the tiles load; used to show a plain fallback if they never do. */
	let failed = $state(false);

	onMount(() => {
		let map: { remove: () => void } | undefined;
		let cancelled = false;

		(async () => {
			try {
				// Imported dynamically, not at the top of the module: MapLibre touches
				// `window` as soon as it is evaluated, and this project renders on the
				// server (adapter-node), so a static import would break SSR for the whole
				// dashboard page.
				const maplibre = await import('maplibre-gl');
				await import('maplibre-gl/dist/maplibre-gl.css');
				if (cancelled) return;

				const points = [...(depot ? [depot] : []), ...stops];
				if (points.length === 0) return;

				map = new maplibre.Map({
					container,
					// OpenFreeMap: free vector tiles, no API key, no request cap. The whole
					// reason this page costs nothing to run.
					style: 'https://tiles.openfreemap.org/styles/liberty',
					bounds: bounds(points),
					fitBoundsOptions: { padding: 48, maxZoom: 15 }
				});

				const m = map as InstanceType<typeof maplibre.Map>;
				m.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');

				m.on('load', () => {
					if (cancelled) return;
					// The driving line is drawn straight between consecutive stops rather
					// than along the roads: we only ever fetch a duration *matrix* from
					// ORS, never the geometry, so the shape of each leg is unknown. It
					// reads as "this is the order", which is what the page is for.
					m.addSource('circuit', {
						type: 'geojson',
						data: {
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: [...points, points[0]].map((p) => [p.longitude, p.latitude])
							}
						}
					});
					m.addLayer({
						id: 'circuit',
						type: 'line',
						source: 'circuit',
						layout: { 'line-cap': 'round', 'line-join': 'round' },
						paint: { 'line-color': '#a45926', 'line-width': 3, 'line-opacity': 0.75 }
					});
				});

				for (const point of points) {
					const el = document.createElement('div');
					el.className = 'route-pin';
					el.textContent = point.label;
					if (point === depot) el.classList.add('is-depot');
					new maplibre.Marker({ element: el })
						.setLngLat([point.longitude, point.latitude])
						.setPopup(new maplibre.Popup({ offset: 18 }).setText(point.title))
						.addTo(m);
				}
			} catch {
				// A blocked CDN, a WebGL-less browser, an offline admin — the stop list
				// below the map is the thing that actually gets used, so degrade to that
				// rather than taking the page down.
				failed = true;
			}
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});

	/** Bounding box of every marker, as MapLibre's [[w, s], [e, n]]. */
	function bounds(points: Marker[]): [[number, number], [number, number]] {
		const lons = points.map((p) => p.longitude);
		const lats = points.map((p) => p.latitude);
		return [
			[Math.min(...lons), Math.min(...lats)],
			[Math.max(...lons), Math.max(...lats)]
		];
	}
</script>

<div class="route-map" bind:this={container} class:is-failed={failed}>
	{#if failed}
		<p class="route-map__fallback">
			The map couldn't load. The ordered stop list below is unaffected.
		</p>
	{/if}
</div>

<style>
	.route-map {
		height: 460px;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
		background: #ece7dd;
	}
	.route-map.is-failed {
		display: grid;
		place-items: center;
		height: 120px;
	}
	.route-map__fallback {
		margin: 0;
		font-size: 0.875rem;
		color: #6b6459;
	}

	/* Marker elements are created imperatively and appended by MapLibre outside this
	   component's DOM, so scoped selectors would never match them. */
	:global(.route-pin) {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: #a45926;
		color: #fff;
		font:
			600 12px/1 -apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		border: 2px solid #fff;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
		cursor: pointer;
	}
	:global(.route-pin.is-depot) {
		background: #16130f;
	}
</style>
