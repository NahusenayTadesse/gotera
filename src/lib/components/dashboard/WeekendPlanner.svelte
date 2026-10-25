<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ChevronLeft, ChevronRight, Ban, Undo2, ArrowRightLeft, ListFilter, Trash2 } from '@lucide/svelte';
	import type { MoveResult } from '$lib/delivery';

	type Day = {
		date: string;
		label: string;
		isPast: boolean;
		isToday: boolean;
		skip: { id: string; reason: string | null } | null;
		pending: number;
		done: number;
		byType: { subscription: number; guest: number; oneTime: number };
		capacity: number;
		used: number;
	};
	type Upcoming = { date: string; label: string; skipped: boolean; remaining: number };
	type SkipDate = { id: string; label: string; reason: string | null; weekend: string };

	let {
		weekend,
		upcoming,
		skipDates,
		dayFilter = $bindable(null),
		onMoved
	}: {
		weekend: { start: string; prev: string; next: string; isCurrent: boolean; days: Day[] };
		upcoming: Upcoming[];
		skipDates: SkipDate[];
		dayFilter?: string | null;
		/** Called after a skip/move that actually moved someone, to offer the notice email. */
		onMoved?: (result: MoveResult) => void;
	} = $props();

	/** Which day's skip / move form is open: `skip:<date>` or `move:<date>`. */
	let openForm = $state<string | null>(null);
	let busy = $state<string | null>(null);

	const weekendHref = (start: string) => {
		const url = new URL(page.url);
		if (start) url.searchParams.set('weekend', start);
		else url.searchParams.delete('weekend');
		url.searchParams.delete('edit');
		url.searchParams.delete('manageAddons');
		return `${url.pathname}${url.search}`;
	};

	const weekday = (label: string) => label.split(', ')[0];
	const dayMonth = (label: string) => label.split(', ')[1] ?? label;

	const targetsFor = (date: string) => upcoming.filter((u) => u.date !== date && !u.skipped);

	const range = $derived(
		`${dayMonth(weekend.days[0].label)} – ${dayMonth(weekend.days[2].label)}`
	);

	/** Shared submit handler: toast the outcome, hand moves to the page, close the form. */
	const submit =
		(key: string): SubmitFunction =>
		() => {
			busy = key;
			return async ({ result, update }) => {
				busy = null;
				if (result.type === 'success') {
					const r = result.data?.result as MoveResult | undefined;
					toast.success(r?.text ?? 'Saved');
					if (r?.affected.length) onMoved?.(r);
					openForm = null;
				} else if (result.type === 'failure') {
					toast.error((result.data?.error as string) ?? 'Something went wrong');
				} else if (result.type === 'error') {
					toast.error('Something went wrong');
				}
				await update({ reset: false });
			};
		};

	function statusOf(d: Day): { text: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } {
		if (d.skip) return { text: 'Skipped', variant: 'destructive' };
		if (d.isPast) return { text: 'Past', variant: 'secondary' };
		if (d.used >= d.capacity) return { text: 'Full', variant: 'destructive' };
		if (d.isToday) return { text: 'Today', variant: 'default' };
		return { text: 'Open', variant: 'outline' };
	}

	const selectClass =
		'w-full rounded-md border border-border bg-background p-2 text-base md:text-sm';
	const inputClass = selectClass;
</script>

<Card.Root class="mb-8 w-full">
	<Card.Header class="flex flex-row flex-wrap items-start justify-between gap-4">
		<div class="flex flex-col gap-1.5">
			<Card.Title>Delivery weekend</Card.Title>
			<Card.Description>
				We deliver Saturday, Sunday and Monday. Skip a single day, or move its deliveries to
				another day. Customers are booked onto the earliest open day.
			</Card.Description>
		</div>
		<nav class="flex items-center gap-1" aria-label="Choose weekend">
			<Button href={weekendHref(weekend.prev)} variant="ghost" size="icon" aria-label="Previous weekend">
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<span class="min-w-40 text-center text-sm font-medium">{range}</span>
			<Button href={weekendHref(weekend.next)} variant="ghost" size="icon" aria-label="Next weekend">
				<ChevronRight class="h-4 w-4" />
			</Button>
			{#if !weekend.isCurrent}
				<Button href={weekendHref('')} variant="outline" size="sm" class="ml-1">This weekend</Button>
			{/if}
		</nav>
	</Card.Header>

	<Card.Content class="flex flex-col gap-6">
		<div class="grid gap-4 md:grid-cols-3">
			{#each weekend.days as d (d.date)}
				{@const status = statusOf(d)}
				{@const pct = Math.min(100, Math.round((d.used / Math.max(1, d.capacity)) * 100))}
				{@const targets = targetsFor(d.date)}
				<section
					class={[
						'flex flex-col gap-3 rounded-lg border p-4',
						d.isPast && 'opacity-70',
						d.skip && 'border-dashed',
						dayFilter === d.date && 'ring-2 ring-[#a45926]'
					]}
					aria-label={d.label}
				>
					<header class="flex items-start justify-between gap-2">
						<div>
							<p class="text-xs tracking-wide text-muted-foreground uppercase">{weekday(d.label)}</p>
							<p class="text-lg font-semibold">{dayMonth(d.label)}</p>
						</div>
						<Badge variant={status.variant}>{status.text}</Badge>
					</header>

					{#if d.skip}
						<p class="text-sm text-muted-foreground">
							Not delivering{d.skip.reason ? ` — ${d.skip.reason}` : ''}.
						</p>
					{/if}

					<div class="text-sm">
						<p><strong>{d.pending}</strong> to go out{#if d.done}<span class="text-muted-foreground"> · {d.done} done</span>{/if}</p>
						{#if d.pending}
							<p class="text-xs text-muted-foreground">
								{d.byType.subscription} subscription · {d.byType.guest} guest · {d.byType.oneTime} one-time
							</p>
						{/if}
					</div>

					{#if !d.skip}
						<div class="flex flex-col gap-1" title="{d.used} of {d.capacity} units booked">
							<div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
								<div
									class="h-full rounded-full {pct >= 100 ? 'bg-destructive' : pct >= 85 ? 'bg-amber-500' : 'bg-[#a45926]'}"
									style="width: {pct}%"
								></div>
							</div>
							<p class="text-xs text-muted-foreground">{d.used} / {d.capacity} units</p>
						</div>
					{/if}

					<div class="mt-auto flex flex-wrap gap-2">
						<Button
							type="button"
							size="sm"
							variant={dayFilter === d.date ? 'default' : 'outline'}
							onclick={() => (dayFilter = dayFilter === d.date ? null : d.date)}
						>
							<ListFilter class="h-4 w-4" />
							{dayFilter === d.date ? 'Showing' : 'Show'}
						</Button>

						{#if !d.isPast}
							{#if d.skip}
								<form method="POST" action="?/unskipDay" use:enhance={submit(`unskip:${d.date}`)}>
									<input type="hidden" name="id" value={d.skip.id} />
									<Button type="submit" size="sm" variant="outline" disabled={busy !== null}>
										<Undo2 class="h-4 w-4" /> Un-skip
									</Button>
								</form>
							{:else}
								<Button
									type="button"
									size="sm"
									variant={openForm === `skip:${d.date}` ? 'secondary' : 'outline'}
									onclick={() => (openForm = openForm === `skip:${d.date}` ? null : `skip:${d.date}`)}
								>
									<Ban class="h-4 w-4" /> Skip
								</Button>
								{#if d.pending}
									<Button
										type="button"
										size="sm"
										variant={openForm === `move:${d.date}` ? 'secondary' : 'outline'}
										onclick={() => (openForm = openForm === `move:${d.date}` ? null : `move:${d.date}`)}
									>
										<ArrowRightLeft class="h-4 w-4" /> Move all
									</Button>
								{/if}
							{/if}
						{/if}
					</div>

					{#if openForm === `skip:${d.date}`}
						<form
							method="POST"
							action="?/skipDay"
							use:enhance={submit(`skip:${d.date}`)}
							class="flex flex-col gap-3 border-t pt-3"
						>
							<input type="hidden" name="date" value={d.date} />
							<label class="flex flex-col gap-1 text-sm">
								Reason (optional)
								<input name="reason" maxlength="255" placeholder="e.g. Bank holiday" class={inputClass} />
							</label>
							{#if d.pending}
								<label class="flex flex-col gap-1 text-sm">
									Move its {d.pending} {d.pending === 1 ? 'booking' : 'bookings'} to
									<select name="moveTo" class={selectClass}>
										<option value="">Next open day</option>
										{#each targets as t (t.date)}
											<option value={t.date}>{t.label} · {t.remaining} left</option>
										{/each}
									</select>
								</label>
							{/if}
							<Button type="submit" size="sm" variant="destructive" class="w-fit" disabled={busy !== null}>
								{busy === `skip:${d.date}` ? 'Skipping…' : `Skip ${weekday(d.label)}`}
							</Button>
						</form>
					{/if}

					{#if openForm === `move:${d.date}`}
						<form
							method="POST"
							action="?/moveDay"
							use:enhance={submit(`move:${d.date}`)}
							class="flex flex-col gap-3 border-t pt-3"
						>
							<input type="hidden" name="from" value={d.date} />
							<label class="flex flex-col gap-1 text-sm">
								Move all {d.pending} to
								<select name="to" required class={selectClass}>
									{#each targets as t (t.date)}
										<option value={t.date}>{t.label} · {t.remaining} left</option>
									{/each}
								</select>
							</label>
							<p class="text-xs text-muted-foreground">
								{weekday(d.label)} stays open for new orders. Skip it instead to close it.
							</p>
							<Button type="submit" size="sm" class="w-fit" disabled={busy !== null}>
								{busy === `move:${d.date}` ? 'Moving…' : 'Move bookings'}
							</Button>
						</form>
					{/if}
				</section>
			{/each}
		</div>

		{#if skipDates.length}
			<div class="flex flex-col gap-2 border-t pt-4">
				<h3 class="text-sm font-medium">Upcoming skipped days</h3>
				<ul class="flex flex-col gap-1">
					{#each skipDates as s (s.id)}
						<li class="flex items-center justify-between gap-3 text-sm">
							<a href={weekendHref(s.weekend)} class="hover:text-[#a45926] hover:underline">
								{s.label}
								{#if s.reason}<span class="text-muted-foreground">— {s.reason}</span>{/if}
							</a>
							<form method="POST" action="?/unskipDay" use:enhance={submit(`unskip:${s.id}`)}>
								<input type="hidden" name="id" value={s.id} />
								<Button type="submit" variant="ghost" size="icon" aria-label="Un-skip {s.label}" disabled={busy !== null}>
									<Trash2 class="h-4 w-4" />
								</Button>
							</form>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
