<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Plus } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let pending = $state<string | null>(null);

	/** Shared enhance handler: surface the action's error and clear the busy flag. */
	function withToast(key: string, successText: string) {
		return () => {
			pending = key;
			return async ({ result, update }: any) => {
				if (result.type === 'failure') toast.error(result.data?.error ?? 'Something went wrong.');
				else if (result.type === 'success') toast.success(successText);
				await update();
				pending = null;
			};
		};
	}

	/** Rows grouped by date so each Saturday reads as one block. */
	const byDate = $derived.by(() => {
		const map = new Map<string, typeof data.rows>();
		for (const row of data.rows) {
			const list = map.get(row.dateLabel) ?? [];
			list.push(row);
			map.set(row.dateLabel, list);
		}
		return [...map.entries()];
	});

	const level = (row: { remaining: number; lowThreshold: number; criticalThreshold: number }) =>
		row.remaining <= row.criticalThreshold
			? 'critical'
			: row.remaining <= row.lowThreshold
				? 'low'
				: 'ok';
</script>

<svelte:head>
	<title>Stock</title>
</svelte:head>

<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
	<div>
		<h1 class="dash-heading text-2xl font-semibold">Stock</h1>
		<p class="text-sm text-muted-foreground">
			Capacity per delivery Saturday. When a date fills up, new orders roll to the next one
			automatically.
		</p>
	</div>
</div>

<!-- Open a new date / item -->
<Card.Root class="mb-8 w-full lg:w-lg">
	<Card.Header><Card.Title>Open a date</Card.Title></Card.Header>
	<Card.Content>
		<form
			method="POST"
			action="?/createRow"
			use:enhance={withToast('create', 'Date opened')}
			class="flex flex-wrap items-end gap-3"
		>
			<label class="flex flex-col gap-1 text-sm">
				Saturday
				<input
					type="date"
					name="date"
					required
					class="rounded-md border border-border bg-background p-2 text-base md:text-sm"
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm">
				Item
				<select
					name="addonId"
					class="rounded-md border border-border bg-background p-2 text-base md:text-sm"
				>
					<option value="main">Main product</option>
					{#each data.catalogue as a (a.id)}
						<option value={a.id}>{a.name}</option>
					{/each}
				</select>
			</label>
			<Button type="submit" disabled={pending === 'create'}>
				<Plus class="h-4 w-4" /> Open
			</Button>
		</form>
	</Card.Content>
</Card.Root>

<!-- Current capacity -->
{#if byDate.length === 0}
	<p class="text-sm text-muted-foreground">No upcoming dates yet.</p>
{:else}
	{#each byDate as [dateLabel, rows] (dateLabel)}
		<Card.Root class="mb-6">
			<Card.Header><Card.Title>{dateLabel}</Card.Title></Card.Header>
			<Card.Content class="flex flex-col gap-4">
				{#each rows as row (row.id)}
					<div
						class="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
					>
						<div class="min-w-40">
							<div class="font-medium">{row.itemLabel}</div>
							<div class="text-sm" class:text-red-600={level(row) !== 'ok'}>
								{row.remaining} left of {row.capacity}
								{#if level(row) === 'critical'}· critically low{:else if level(row) === 'low'}· low{/if}
							</div>
						</div>

						<form
							method="POST"
							action="?/setCapacity"
							use:enhance={withToast(`cap:${row.id}`, 'Capacity updated')}
							class="flex flex-wrap items-end gap-2"
						>
							<input type="hidden" name="stockId" value={row.id} />
							<label class="flex flex-col gap-1 text-xs">
								Capacity
								<input
									type="number"
									name="capacity"
									min="0"
									value={row.capacity}
									class="w-24 rounded-md border border-border bg-background p-2 text-base md:text-sm"
								/>
							</label>
							<label class="flex flex-col gap-1 text-xs">
								Reason
								<input
									type="text"
									name="reason"
									placeholder="Restocked"
									class="w-40 rounded-md border border-border bg-background p-2 text-base md:text-sm"
								/>
							</label>
							<Button type="submit" variant="outline" disabled={pending === `cap:${row.id}`}>
								Save
							</Button>
						</form>

						<form
							method="POST"
							action="?/setThresholds"
							use:enhance={withToast(`th:${row.id}`, 'Alert levels updated')}
							class="flex flex-wrap items-end gap-2"
						>
							<input type="hidden" name="stockId" value={row.id} />
							<label class="flex flex-col gap-1 text-xs">
								Low at
								<input
									type="number"
									name="lowThreshold"
									min="0"
									value={row.lowThreshold}
									class="w-20 rounded-md border border-border bg-background p-2 text-base md:text-sm"
								/>
							</label>
							<label class="flex flex-col gap-1 text-xs">
								Email at
								<input
									type="number"
									name="criticalThreshold"
									min="0"
									value={row.criticalThreshold}
									class="w-20 rounded-md border border-border bg-background p-2 text-base md:text-sm"
								/>
							</label>
							<Button type="submit" variant="ghost" disabled={pending === `th:${row.id}`}>
								Save
							</Button>
						</form>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>
	{/each}
{/if}

<!-- Audit trail -->
<Card.Root>
	<Card.Header><Card.Title>Recent changes</Card.Title></Card.Header>
	<Card.Content>
		{#if data.changes.length === 0}
			<p class="text-sm text-muted-foreground">Nothing recorded yet.</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="text-left text-muted-foreground">
						<tr>
							<th class="py-2 pr-4">When</th>
							<th class="py-2 pr-4">Date</th>
							<th class="py-2 pr-4">Item</th>
							<th class="py-2 pr-4">Field</th>
							<th class="py-2 pr-4">Change</th>
							<th class="py-2 pr-4">After</th>
							<th class="py-2 pr-4">By</th>
							<th class="py-2">Reason</th>
						</tr>
					</thead>
					<tbody>
						{#each data.changes as c (c.id)}
							<tr class="border-t border-border">
								<td class="py-2 pr-4 whitespace-nowrap">{c.createdAt.toLocaleString()}</td>
								<td class="py-2 pr-4 whitespace-nowrap">{c.dateLabel}</td>
								<td class="py-2 pr-4">{c.itemLabel}</td>
								<td class="py-2 pr-4">{c.field}</td>
								<td class="py-2 pr-4" class:text-red-600={c.delta < 0}>
									{c.delta > 0 ? '+' : ''}{c.delta}
								</td>
								<td class="py-2 pr-4">{c.valueAfter}</td>
								<td class="py-2 pr-4">{c.byName ?? 'System'}</td>
								<td class="py-2">{c.reason ?? '—'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
