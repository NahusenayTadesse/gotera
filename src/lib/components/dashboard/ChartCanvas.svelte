<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		type: 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
		data: any;
		options?: any;
		height?: string;
	}

	let { type, data, options = {}, height = '280px' }: Props = $props();

	let canvasEl: HTMLCanvasElement | undefined = $state();
	let chart: any;

	function getVar(name: string) {
		if (!canvasEl) return undefined;
		return getComputedStyle(canvasEl).getPropertyValue(name).trim() || undefined;
	}

	function baseOptions() {
		return {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: { color: getVar('--foreground'), font: { size: 12 }, padding: 14 }
				},
				tooltip: { padding: 10 }
			},
			scales:
				type === 'bar' || type === 'line'
					? {
							x: {
								ticks: { color: getVar('--muted-foreground'), font: { size: 11 } },
								grid: { display: false }
							},
							y: {
								ticks: { color: getVar('--muted-foreground'), font: { size: 11 } },
								grid: { color: getVar('--border') },
								beginAtZero: true
							}
						}
					: {}
		};
	}

	onMount(async () => {
		const { Chart } = await import('chart.js/auto');
		if (!canvasEl) return;
		chart = new Chart(canvasEl, { type, data, options: { ...baseOptions(), ...options } });
	});

	onDestroy(() => chart?.destroy());

	$effect(() => {
		void data;
		void options;
		if (!chart) return;
		chart.data = data;
		chart.options = { ...baseOptions(), ...options };
		chart.update();
	});
</script>

<div style="position: relative; height: {height}; width: 100%;">
	<canvas bind:this={canvasEl}></canvas>
</div>
