<script lang="ts">
	import { datePresets, type DatePreset } from '$lib/reports';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { preset, from, to }: { preset: DatePreset; from: string; to: string } = $props();

	let presetEl: HTMLSelectElement | undefined = $state();
</script>

<form
	method="GET"
	class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"
>
	<div class="flex flex-col gap-1.5">
		<Label for="preset">Preset</Label>
		<select
			bind:this={presetEl}
			id="preset"
			name="preset"
			class="border-input h-9 rounded-md border bg-transparent px-3 text-sm capitalize"
			onchange={(e) => e.currentTarget.form?.requestSubmit()}
		>
			{#each datePresets as p (p.value)}
				<option value={p.value} selected={p.value === preset}>{p.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="from">From</Label>
		<Input
			id="from"
			type="date"
			name="from"
			value={from}
			class="w-40"
			oninput={() => presetEl && (presetEl.value = 'custom')}
		/>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="to">To</Label>
		<Input
			id="to"
			type="date"
			name="to"
			value={to}
			class="w-40"
			oninput={() => presetEl && (presetEl.value = 'custom')}
		/>
	</div>
	<Button type="submit">Apply</Button>
</form>
