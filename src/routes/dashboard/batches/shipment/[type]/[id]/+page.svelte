<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import Statuses from '$lib/components/Table/statuses.svelte';
	import TypeBadge from '$lib/components/dashboard/TypeBadge.svelte';
	import { shortDate, longDate } from '$lib/format';
	import { ArrowLeft, Wand2, Factory, Truck, X } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { data }: { data: PageData } = $props();

	const h = $derived(data.header);
	const allAssigned = $derived(data.lines.every((l) => l.state === 'assigned'));

	// Picked batch per line in the override selects.
	let picks = $state<Record<string, string>>({});

	const handle =
		(ok: string): SubmitFunction =>
		() =>
		async ({ result, update }) => {
			if (result.type === 'failure') toast.error(String(result.data?.error ?? 'Something went wrong'));
			else if (result.type === 'success') {
				const s = result.data?.sync as { short: unknown[] } | undefined;
				if (s?.short.length) toast.warning('Some lines are still short — no eligible batch has enough left.');
				else toast.success(ok);
			}
			await update();
		};
</script>

<svelte:head>
	<title>Trace · {h.customer}</title>
</svelte:head>

<div class="mb-6 flex flex-col gap-3">
	<a href={h.backHref} class="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
		<ArrowLeft class="h-4 w-4" /> Back
	</a>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div>
			<div class="flex flex-wrap items-center gap-2">
				<h1 class="dash-heading text-2xl font-semibold">{h.customer}</h1>
				<TypeBadge type={data.type} />
				<Statuses status={h.status} />
			</div>
			<p class="text-sm text-muted-foreground">
				{h.description} · {longDate(h.date)}{h.address ? ` · ${h.address}` : ''}
			</p>
		</div>
		{#if data.lines.length}
			<form method="POST" action="?/auto" use:enhance={handle('Batches assigned')}>
				<Button type="submit" variant={allAssigned ? 'outline' : 'default'}>
					<Wand2 class="h-4 w-4" /> Auto-assign (FEFO)
				</Button>
			</form>
		{/if}
	</div>
</div>

{#if !data.lines.length}
	<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
		Nothing in this shipment needs a batch — it's {h.status}, so it isn't being sent.
	</p>
{/if}

<div class="grid gap-4">
	{#each data.lines as line (line.lineKey)}
		<Card.Root>
			<Card.Header class="flex flex-row flex-wrap items-start justify-between gap-3">
				<div>
					<Card.Title class="flex items-center gap-2">
						{line.name}
						<span class="text-sm font-normal text-muted-foreground">× {line.quantity}</span>
					</Card.Title>
					<Card.Description>
						{line.allocated} of {line.quantity} traced to a batch
					</Card.Description>
				</div>
				<Badge
					class={line.state === 'assigned'
						? 'bg-green-500 text-white'
						: line.state === 'partial'
							? 'bg-amber-500 text-white'
							: 'bg-red-500 text-white'}
				>
					{line.state === 'assigned' ? 'Traced' : line.state === 'partial' ? 'Partly traced' : 'No batch'}
				</Badge>
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				{#if line.allocations.length}
					<div class="overflow-x-auto">
						<table class="w-full text-left text-sm">
							<thead class="text-muted-foreground">
								<tr class="border-b border-border">
									<th class="py-1.5 pr-4 font-medium">Batch</th>
									<th class="py-1.5 pr-4 font-medium">Source</th>
									<th class="py-1.5 pr-4 font-medium">Best before</th>
									<th class="py-1.5 pr-4 font-medium">Qty</th>
									<th class="py-1.5 pr-4 font-medium">Batch status</th>
									<th class="py-1.5 font-medium">Assigned</th>
								</tr>
							</thead>
							<tbody>
								{#each line.allocations as a (a.batchId)}
									<tr class="border-b border-border last:border-0">
										<td class="py-1.5 pr-4">
											<a href="/dashboard/batches/{a.batchId}" class="font-mono font-medium hover:underline">{a.code}</a>
										</td>
										<td class="py-1.5 pr-4">
											<span class="inline-flex items-center gap-1.5">
												{#if a.source === 'in_house'}
													<Factory class="h-4 w-4 text-muted-foreground" /> In house
												{:else}
													<Truck class="h-4 w-4 text-muted-foreground" />
													{a.sourceName}
													<span class="text-muted-foreground">({a.sourceType})</span>
												{/if}
											</span>
										</td>
										<td class="py-1.5 pr-4">{a.bestBefore ? shortDate(a.bestBefore) : '—'}</td>
										<td class="py-1.5 pr-4">{a.quantity}</td>
										<td class="py-1.5 pr-4"><Statuses status={a.batchStatus} /></td>
										<td class="py-1.5">{a.method === 'manual' ? 'Manually' : 'Auto'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}

				<div class="flex flex-wrap items-end gap-2">
					<form method="POST" action="?/assign" use:enhance={handle('Batch assigned')} class="flex flex-wrap items-end gap-2">
						<input type="hidden" name="lineKey" value={line.lineKey} />
						<label class="flex flex-col gap-1 text-sm">
							<span class="text-muted-foreground">Put this line on batch</span>
							<select
								name="batchId"
								class="border-input h-9 min-w-72 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
								bind:value={picks[line.lineKey]}
							>
								<option value="">Choose a batch…</option>
								{#each line.options as o (o.id)}
									<option value={o.id} disabled={o.expired ||
											o.notYetMade ||
											(o.remaining < line.quantity && !line.allocations.some((a) => a.batchId === o.id))}>
										{o.code} · {o.source === 'in_house' ? 'In house' : o.sourceName} · {o.remaining} left
										{o.bestBefore ? ` · BB ${shortDate(o.bestBefore)}` : ''}{o.expired ? ' · EXPIRED' : ''}{o.notYetMade ? ' · not made yet' : ''}
									</option>
								{/each}
							</select>
						</label>
						<Button type="submit" variant="outline" disabled={!picks[line.lineKey]}>Assign</Button>
					</form>
					{#if line.allocations.length}
						<form method="POST" action="?/unassign" use:enhance={handle('Batch removed from this line')}>
							<input type="hidden" name="lineKey" value={line.lineKey} />
							<Button type="submit" variant="ghost" class="text-red-600"><X class="h-4 w-4" /> Clear</Button>
						</form>
					{/if}
				</div>
				{#if !line.options.length}
					<p class="text-sm text-amber-600">
						No batches exist for {line.name} yet. <a href="/dashboard/batches?add=1" class="underline">Create one</a>.
					</p>
				{/if}
			</Card.Content>
		</Card.Root>
	{/each}
</div>
