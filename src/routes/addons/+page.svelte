<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { fly, fade } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import {
		ArrowRight,
		Check,
		Flame,
		Lock,
		Minus,
		Plus,
		Search,
		ShoppingBag,
		Trash2,
		Truck,
		X
	} from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { PostcodeLookup } from '$lib/postcode.svelte';
	import {
		ADDON_CATEGORIES,
		ADDON_TAGS,
		MAX_ADDON_QTY,
		MAX_SPICE_LEVEL,
		canSellAlone,
		canSellWithInjera,
		type AddonCategory,
		type AddonTag
	} from '$lib/addons';
	import type { ShopMessage } from './schema';

	let { data }: { data: PageData } = $props();

	type Item = PageData['items'][number];

	// ── Labels (translated) ──
	const categoryLabel = (c: AddonCategory) =>
		({
			spice: m.shop_type_spice(),
			sauce: m.shop_type_sauce(),
			pantry: m.shop_type_pantry(),
			kit: m.shop_type_kit(),
			drink: m.shop_type_drink(),
			snack: m.shop_type_snack(),
			bundle: m.shop_type_bundle()
		})[c];

	const tagLabel = (t: AddonTag) =>
		({
			vegan: m.shop_tag_vegan(),
			gluten_free: m.shop_tag_gluten_free(),
			spicy: m.shop_tag_spicy(),
			organic: m.shop_tag_organic(),
			nut_free: m.shop_tag_nut_free(),
			dairy_free: m.shop_tag_dairy_free(),
			handmade: m.shop_tag_handmade()
		})[t];

	const itemsLabel = (count: number) =>
		count === 1 ? m.shop_items_one({ count }) : m.shop_items_other({ count });
	const resultsLabel = (count: number) =>
		count === 1 ? m.shop_results_one({ count }) : m.shop_results_other({ count });

	const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
	const money = (pence: number) => gbp.format(pence / 100);

	const deliveryLabel = $derived(
		new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(
			new Date(`${data.nextDelivery}T12:00:00`)
		)
	);

	// ── Filters (mirrored into the URL so a filtered view can be shared) ──
	type SoldFilter = 'all' | 'alone' | 'injera';
	const soldOptions: { value: SoldFilter; label: () => string }[] = [
		{ value: 'all', label: m.shop_sold_all },
		{ value: 'alone', label: m.shop_sold_alone },
		{ value: 'injera', label: m.shop_sold_injera }
	];
	type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';
	const SORTS: SortKey[] = ['featured', 'price-asc', 'price-desc', 'name'];

	const params = page.url.searchParams;
	let query = $state(params.get('q') ?? '');
	let category = $state<AddonCategory | 'all'>(
		(ADDON_CATEGORIES as readonly string[]).includes(params.get('type') ?? '')
			? (params.get('type') as AddonCategory)
			: 'all'
	);
	let sold = $state<SoldFilter>(
		(['alone', 'injera'] as const).find((s) => s === params.get('sold')) ?? 'all'
	);
	let activeTags = $state<AddonTag[]>(
		(params.get('tags') ?? '')
			.split(',')
			.filter((t): t is AddonTag => (ADDON_TAGS as readonly string[]).includes(t))
	);
	let sort = $state<SortKey>(SORTS.find((s) => s === params.get('sort')) ?? 'featured');

	// Only offer filters that would match something.
	const presentCategories = $derived(
		ADDON_CATEGORIES.filter((c) => data.items.some((i) => i.category === c))
	);
	const presentTags = $derived(ADDON_TAGS.filter((t) => data.items.some((i) => i.tags.includes(t))));

	const filtersActive = $derived(
		query.trim() !== '' || category !== 'all' || sold !== 'all' || activeTags.length > 0
	);

	function clearFilters() {
		query = '';
		category = 'all';
		sold = 'all';
		activeTags = [];
	}

	function toggleTag(t: AddonTag) {
		activeTags = activeTags.includes(t) ? activeTags.filter((x) => x !== t) : [...activeTags, t];
	}

	const visible = $derived.by(() => {
		const q = query.trim().toLowerCase();
		const list = data.items.filter((i) => {
			if (category !== 'all' && i.category !== category) return false;
			if (sold === 'alone' && !canSellAlone(i)) return false;
			if (sold === 'injera' && !canSellWithInjera(i)) return false;
			if (activeTags.some((t) => !i.tags.includes(t))) return false;
			if (q) {
				const haystack = [i.name, i.description, i.unitLabel, i.ingredients]
					.filter(Boolean)
					.join(' ')
					.toLowerCase();
				if (!haystack.includes(q)) return false;
			}
			return true;
		});
		// The server already returns featured-first catalogue order.
		if (sort === 'price-asc') return list.toSorted((a, b) => a.pricePence - b.pricePence);
		if (sort === 'price-desc') return list.toSorted((a, b) => b.pricePence - a.pricePence);
		if (sort === 'name') return list.toSorted((a, b) => a.name.localeCompare(b.name));
		return list;
	});

	let mounted = $state(false);
	$effect(() => {
		const url = new URL(page.url);
		const set = (key: string, value: string, fallback: string) =>
			value && value !== fallback ? url.searchParams.set(key, value) : url.searchParams.delete(key);
		set('q', query.trim(), '');
		set('type', category, 'all');
		set('sold', sold, 'all');
		set('tags', activeTags.join(','), '');
		set('sort', sort, 'featured');
		url.searchParams.delete('checkout');
		if (mounted && url.search !== page.url.search) replaceState(url, page.state);
	});

	// ── Basket (kept in this browser between visits) ──
	const BASKET_KEY = 'gotera.addonBasket';
	let basket = $state<Record<string, number>>({});

	onMount(() => {
		try {
			const saved = JSON.parse(localStorage.getItem(BASKET_KEY) ?? '{}');
			if (saved && typeof saved === 'object') {
				// Drop anything that has since left the catalogue.
				basket = Object.fromEntries(
					Object.entries(saved).filter(
						([id, qty]) => data.items.some((i) => i.id === id) && Number(qty) >= 1
					)
				) as Record<string, number>;
			}
		} catch {
			// Private mode / blocked storage: start with an empty basket.
		}

		const checkout = page.url.searchParams.get('checkout');
		if (checkout === 'success') {
			paid = true;
			basket = {};
		}
		mounted = true;
	});

	$effect(() => {
		const snapshot = JSON.stringify(basket);
		if (!mounted) return;
		try {
			localStorage.setItem(BASKET_KEY, snapshot);
		} catch {
			// Not fatal — the basket just won't survive a reload.
		}
	});

	const qtyIn = (id: string) => basket[id] ?? 0;

	function setQty(id: string, qty: number) {
		const n = Math.min(MAX_ADDON_QTY, Math.max(0, Math.trunc(qty) || 0));
		if (n === 0) {
			basket = Object.fromEntries(Object.entries(basket).filter(([key]) => key !== id));
		} else {
			basket = { ...basket, [id]: n };
		}
	}

	function add(item: Item) {
		const had = qtyIn(item.id);
		setQty(item.id, had + 1);
		if (had === 0) toast.success(m.shop_toast_added({ name: item.name }));
	}

	const lines = $derived(
		Object.entries(basket)
			.map(([id, quantity]) => ({ item: data.items.find((i) => i.id === id)!, quantity }))
			.filter((l) => l.item)
	);
	const lineCount = $derived(lines.reduce((n, l) => n + l.quantity, 0));
	const subtotal = $derived(lines.reduce((sum, l) => sum + l.item.pricePence * l.quantity, 0));

	const injeraOnlyLines = $derived(lines.filter((l) => !canSellAlone(l.item)));
	const aloneOnlyLines = $derived(lines.filter((l) => !canSellWithInjera(l.item)));
	const canCheckoutAlone = $derived(lines.length > 0 && injeraOnlyLines.length === 0);
	const injeraLines = $derived(lines.filter((l) => canSellWithInjera(l.item)));
	const injeraHref = $derived(
		`/subscribe?addons=${injeraLines.map((l) => `${l.item.id}:${l.quantity}`).join(',')}`
	);

	// ── Checkout ──
	// One basket panel at a time: a sidebar on wide screens, a bottom sheet otherwise.
	// Rendering both (and hiding one with CSS) would mount the checkout form twice.
	const wide = new MediaQuery('min-width: 961px', true);
	let stage = $state<'basket' | 'details'>('basket');
	let basketOpen = $state(false); // mobile sheet
	let paid = $state(false);

	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
		invalidateAll: false,
		onSubmit({ jsonData }) {
			jsonData({
				...$form,
				items: lines.map((l) => ({ id: l.item.id, quantity: l.quantity }))
			});
		},
		onUpdated({ form: f }) {
			const msg = f.message as ShopMessage | undefined;
			if (msg?.type === 'error') toast.error(msg.text);
		}
	});

	const postcode = new PostcodeLookup((match) => {
		$form.latitude = match?.latitude;
		$form.longitude = match?.longitude;
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && basketOpen) basketOpen = false;
	}
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>{m.shop_meta_title()}</title>
	<meta name="description" content={m.shop_meta_description()} />
</svelte:head>

<datalist id={postcode.listId}>
	{#each postcode.suggestions as s (s)}<option value={s}></option>{/each}
</datalist>

<div class="shop">
	<header class="shop-hero">
		<div class="container">
			<span class="eyebrow">{m.shop_eyebrow()}</span>
			<h1>{m.shop_title()}</h1>
			<p class="lede">{m.shop_intro()}</p>
			<ul class="promises">
				<li><Truck size={16} strokeWidth={1.6} /> {m.shop_next_delivery({ date: deliveryLabel })}</li>
				<li><ShoppingBag size={16} strokeWidth={1.6} /> {m.shop_promise_alone()}</li>
				<li><Check size={16} strokeWidth={1.6} /> {m.shop_promise_together()}</li>
			</ul>
		</div>
	</header>

	{#if paid}
		<div class="container">
			<div class="banner banner--ok" transition:fade>
				<Check size={18} />
				<div>
					<strong>{m.shop_success_title()}</strong>
					<p>{m.shop_success_body({ date: deliveryLabel })}</p>
				</div>
				<button type="button" class="icon-btn" aria-label={m.shop_close()} onclick={() => (paid = false)}>
					<X size={16} />
				</button>
			</div>
		</div>
	{/if}

	<div class="container layout">
		<section class="catalogue" aria-labelledby="shop-results">
			<!-- ── Filters ── -->
			<div class="filters" role="search">
				<label class="search">
					<Search size={16} strokeWidth={1.6} />
					<span class="sr-only">{m.shop_search_label()}</span>
					<input type="search" bind:value={query} placeholder={m.shop_search_placeholder()} />
					{#if query}
						<button type="button" class="icon-btn" aria-label={m.shop_clear_search()} onclick={() => (query = '')}>
							<X size={14} />
						</button>
					{/if}
				</label>

				<div class="filter-row">
					<div class="segmented" role="radiogroup" aria-label={m.shop_filter_sold()}>
						{#each soldOptions as opt (opt.value)}
							<button
								type="button"
								role="radio"
								aria-checked={sold === opt.value}
								class:on={sold === opt.value}
								onclick={() => (sold = opt.value)}>{opt.label()}</button
							>
						{/each}
					</div>

					<label class="sort">
						<span>{m.shop_sort_label()}</span>
						<select bind:value={sort}>
							<option value="featured">{m.shop_sort_featured()}</option>
							<option value="price-asc">{m.shop_sort_price_asc()}</option>
							<option value="price-desc">{m.shop_sort_price_desc()}</option>
							<option value="name">{m.shop_sort_name()}</option>
						</select>
					</label>
				</div>

				{#if presentCategories.length > 1}
					<div class="chips" role="group" aria-label={m.shop_filter_type()}>
						<button type="button" class="chip" class:on={category === 'all'} onclick={() => (category = 'all')}>
							{m.shop_type_all()}
						</button>
						{#each presentCategories as c (c)}
							<button
								type="button"
								class="chip"
								class:on={category === c}
								aria-pressed={category === c}
								onclick={() => (category = category === c ? 'all' : c)}>{categoryLabel(c)}</button
							>
						{/each}
					</div>
				{/if}

				{#if presentTags.length > 0}
					<div class="chips chips--tags" role="group" aria-label={m.shop_filter_dietary()}>
						{#each presentTags as t (t)}
							<button
								type="button"
								class="chip chip--tag"
								class:on={activeTags.includes(t)}
								aria-pressed={activeTags.includes(t)}
								onclick={() => toggleTag(t)}
							>
								{#if activeTags.includes(t)}<Check size={12} />{/if}
								{tagLabel(t)}
							</button>
						{/each}
					</div>
				{/if}

				<div class="result-line">
					<h2 id="shop-results">{resultsLabel(visible.length)}</h2>
					{#if filtersActive}
						<button type="button" class="link-btn" onclick={clearFilters}>{m.shop_clear_filters()}</button>
					{/if}
				</div>
			</div>

			<!-- ── Grid ── -->
			{#if data.items.length === 0}
				<div class="empty">
					<h3>{m.shop_empty_catalogue_title()}</h3>
					<p>{m.shop_empty_catalogue_body()}</p>
					<a class="btn" href="/subscribe">{m.shop_browse_injera()}</a>
				</div>
			{:else if visible.length === 0}
				<div class="empty">
					<h3>{m.shop_no_results_title()}</h3>
					<p>{m.shop_no_results_body()}</p>
					<button type="button" class="btn-outline" onclick={clearFilters}>{m.shop_clear_filters()}</button>
				</div>
			{:else}
				<ul class="grid">
					{#each visible as item (item.id)}
						{@const qty = qtyIn(item.id)}
						<li class="card" class:in-basket={qty > 0}>
							<div class="card__media">
								{#if item.image}
									<img src={item.image} alt={item.name} loading="lazy" />
								{:else}
									<div class="card__placeholder" aria-hidden="true">
										<span>{item.name.charAt(0)}</span>
									</div>
								{/if}
								{#if item.badge}<span class="ribbon">{item.badge}</span>{:else if item.isFeatured}<span
										class="ribbon">{m.shop_featured()}</span
									>{/if}
								{#if !canSellAlone(item)}
									<span class="sold-flag"><Lock size={11} /> {m.shop_with_injera_only()}</span>
								{:else if !canSellWithInjera(item)}
									<span class="sold-flag">{m.shop_alone_only()}</span>
								{/if}
							</div>

							<div class="card__body">
								<div class="card__meta">
									{#if item.category}<span>{categoryLabel(item.category)}</span>{/if}
									{#if item.unitLabel}<span>{item.unitLabel}</span>{/if}
								</div>
								<h3>{item.name}</h3>
								{#if item.description}<p class="desc">{item.description}</p>{/if}

								{#if item.tags.length || item.spiceLevel > 0}
									<div class="card__tags">
										{#if item.spiceLevel > 0}
											<span class="heat" title={m.shop_heat({ level: item.spiceLevel, max: MAX_SPICE_LEVEL })}>
												{#each Array.from({ length: MAX_SPICE_LEVEL }, (_, i) => i) as i (i)}
													<Flame size={13} class={i < item.spiceLevel ? 'hot' : 'cold'} />
												{/each}
												<span class="sr-only">{m.shop_heat({ level: item.spiceLevel, max: MAX_SPICE_LEVEL })}</span>
											</span>
										{/if}
										{#each item.tags as t (t)}<span class="tag">{tagLabel(t)}</span>{/each}
									</div>
								{/if}

								{#if item.ingredients}
									<details class="ingredients">
										<summary>{m.shop_ingredients()}</summary>
										<p>{item.ingredients}</p>
									</details>
								{/if}

								<div class="card__foot">
									<span class="price">{money(item.pricePence)}</span>
									{#if qty === 0}
										<button type="button" class="add-btn" onclick={() => add(item)}>
											<Plus size={14} /> {m.shop_add()}
										</button>
									{:else}
										<div class="stepper" role="group" aria-label={m.shop_quantity_for({ name: item.name })}>
											<button type="button" aria-label={m.shop_decrease()} onclick={() => setQty(item.id, qty - 1)}>
												<Minus size={14} />
											</button>
											<span aria-live="polite">{qty}</span>
											<button
												type="button"
												aria-label={m.shop_increase()}
												disabled={qty >= MAX_ADDON_QTY}
												onclick={() => setQty(item.id, qty + 1)}
											>
												<Plus size={14} />
											</button>
										</div>
									{/if}
								</div>
							</div>
						</li>
					{/each}
				</ul>
			{/if}

			<aside class="together">
				<div>
					<span class="eyebrow">{m.shop_together_eyebrow()}</span>
					<h3>{m.shop_together_title()}</h3>
					<p>{m.shop_together_body()}</p>
				</div>
				<a class="btn" href="/subscribe">{m.shop_together_cta()} <ArrowRight size={14} /></a>
			</aside>
		</section>

		<!-- ── Basket: sidebar on desktop, sheet on mobile ── -->
		{#if wide.current}
			<aside class="basket-col" aria-label={m.shop_basket_title()}>
				<div class="basket">{@render basketPanel()}</div>
			</aside>
		{/if}
	</div>
</div>

{#if !wide.current && lineCount > 0 && !basketOpen}
	<button type="button" class="basket-bar" onclick={() => (basketOpen = true)} transition:fly={{ y: 80 }}>
		<span class="basket-bar__count"><ShoppingBag size={16} /> {itemsLabel(lineCount)}</span>
		<span class="basket-bar__total">{money(subtotal)} <ArrowRight size={14} /></span>
	</button>
{/if}

{#if !wide.current && basketOpen}
	<div class="sheet-backdrop" role="presentation" onclick={() => (basketOpen = false)} transition:fade={{ duration: 150 }}></div>
	<div class="sheet" role="dialog" aria-modal="true" aria-label={m.shop_basket_title()} transition:fly={{ y: 400, duration: 220 }}>
		{@render basketPanel()}
	</div>
{/if}

{#snippet basketPanel()}
	<div class="basket__head">
		<h2>
			{#if stage === 'details'}
				<button type="button" class="link-btn" onclick={() => (stage = 'basket')}>← {m.shop_back()}</button>
			{:else}
				{m.shop_basket_title()}
			{/if}
		</h2>
		{#if basketOpen}
			<button type="button" class="icon-btn" aria-label={m.shop_close()} onclick={() => (basketOpen = false)}>
				<X size={18} />
			</button>
		{/if}
	</div>

	{#if lines.length === 0}
		<div class="basket__empty">
			<ShoppingBag size={28} strokeWidth={1.2} />
			<p>{m.shop_basket_empty()}</p>
		</div>
	{:else if stage === 'basket'}
		<ul class="lines">
			{#each lines as { item, quantity } (item.id)}
				<li class="line">
					<div class="line__thumb">
						{#if item.image}<img src={item.image} alt="" />{:else}<span>{item.name.charAt(0)}</span>{/if}
					</div>
					<div class="line__info">
						<span class="line__name">{item.name}</span>
						{#if !canSellAlone(item)}
							<span class="line__note"><Lock size={10} /> {m.shop_with_injera_only()}</span>
						{:else if item.unitLabel}
							<span class="line__note">{item.unitLabel}</span>
						{/if}
						<div class="stepper stepper--sm">
							<button type="button" aria-label={m.shop_decrease()} onclick={() => setQty(item.id, quantity - 1)}>
								<Minus size={12} />
							</button>
							<span>{quantity}</span>
							<button
								type="button"
								aria-label={m.shop_increase()}
								disabled={quantity >= MAX_ADDON_QTY}
								onclick={() => setQty(item.id, quantity + 1)}
							>
								<Plus size={12} />
							</button>
						</div>
					</div>
					<div class="line__end">
						<span>{money(item.pricePence * quantity)}</span>
						<button type="button" class="icon-btn" aria-label={m.shop_remove({ name: item.name })} onclick={() => setQty(item.id, 0)}>
							<Trash2 size={14} />
						</button>
					</div>
				</li>
			{/each}
		</ul>

		<div class="totals">
			<span>{m.shop_subtotal()}</span>
			<strong>{money(subtotal)}</strong>
		</div>

		<div class="paths">
			<div class="path">
				<button
					type="button"
					class="btn btn--block"
					disabled={!canCheckoutAlone}
					onclick={() => (stage = 'details')}
				>
					{m.shop_checkout_alone()} <ArrowRight size={14} />
				</button>
				{#if injeraOnlyLines.length > 0}
					<p class="path__note">
						{m.shop_checkout_alone_blocked({ names: injeraOnlyLines.map((l) => l.item.name).join(', ') })}
					</p>
				{:else}
					<p class="path__note">{m.shop_checkout_alone_note({ date: deliveryLabel })}</p>
				{/if}
			</div>

			<div class="or"><span>{m.shop_or()}</span></div>

			<div class="path">
				{#if injeraLines.length > 0}
					<a class="btn-outline btn--block" href={injeraHref}>{m.shop_checkout_injera()} <ArrowRight size={14} /></a>
				{:else}
					<button type="button" class="btn-outline btn--block" disabled>{m.shop_checkout_injera()}</button>
				{/if}
				{#if aloneOnlyLines.length > 0}
					<p class="path__note">
						{m.shop_checkout_injera_excluded({ names: aloneOnlyLines.map((l) => l.item.name).join(', ') })}
					</p>
				{:else}
					<p class="path__note">{m.shop_checkout_injera_note()}</p>
				{/if}
			</div>
		</div>
	{:else}
		<form method="POST" action="?/checkout" use:enhance class="details">
			<p class="details__intro">{m.shop_details_intro({ date: deliveryLabel })}</p>

			<label class="field">
				<span>{m.shop_field_name()}</span>
				<input name="recipientName" autocomplete="name" bind:value={$form.recipientName} required />
				{#if $errors.recipientName}<em>{$errors.recipientName}</em>{/if}
			</label>

			{#if !data.signedIn}
				<label class="field">
					<span>{m.shop_field_email()}</span>
					<input name="email" type="email" autocomplete="email" bind:value={$form.email} required />
					{#if $errors.email}<em>{$errors.email}</em>{/if}
				</label>
			{/if}

			<label class="field">
				<span>{m.shop_field_phone()}</span>
				<input name="phone" type="tel" autocomplete="tel" bind:value={$form.phone} />
			</label>

			<label class="field">
				<span>{m.shop_field_line1()}</span>
				<input name="line1" autocomplete="address-line1" bind:value={$form.line1} required />
				{#if $errors.line1}<em>{$errors.line1}</em>{/if}
			</label>

			<label class="field">
				<span>{m.shop_field_line2()}</span>
				<input name="line2" autocomplete="address-line2" bind:value={$form.line2} />
			</label>

			<div class="field-row">
				<label class="field">
					<span>{m.shop_field_postcode()}</span>
					<input
						name="postcode"
						autocomplete="postal-code"
						list={postcode.listId}
						bind:value={$form.postcode}
						oninput={(e) => postcode.search(e.currentTarget.value)}
						required
					/>
					{#if $errors.postcode}<em>{$errors.postcode}</em>
					{:else if postcode.outsideLondon}<em>{m.subscribe_error_outside_london()}</em>{/if}
				</label>
				<label class="field">
					<span>{m.shop_field_city()}</span>
					<input name="city" autocomplete="address-level2" bind:value={$form.city} />
				</label>
			</div>

			{#if $errors.items?._errors}<em class="form-error">{$errors.items._errors}</em>{/if}

			<div class="totals">
				<span>{itemsLabel(lineCount)}</span>
				<strong>{money(subtotal)}</strong>
			</div>

			<button type="submit" class="btn btn--block" disabled={$submitting}>
				<Lock size={14} />
				{$submitting ? m.shop_paying() : m.shop_pay({ total: money(subtotal) })}
			</button>
			<p class="path__note">{m.shop_stripe_note()}</p>
		</form>
	{/if}
{/snippet}

<style>
	.shop {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #a45926;
		--copper-deep: #8a4a1f;
		--taupe: #6f6964;
		--border: #e8e4e0;
		--panel: #f5f2ed;
		--white: #fff;
		--max: 1180px;
		background: var(--cream);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding-bottom: 96px;
	}
	.container {
		width: min(var(--max), calc(100% - 32px));
		margin: auto;
	}
	h1,
	h2,
	h3 {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 600;
		line-height: 1.05;
	}
	.eyebrow {
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--copper);
		margin-bottom: 10px;
		display: block;
		font-weight: 500;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	/* ── Hero ── */
	.shop-hero {
		padding: 120px 0 36px;
		background:
			radial-gradient(1200px 300px at 85% 0%, rgba(164, 89, 38, 0.09), transparent 70%),
			var(--cream);
		border-bottom: 1px solid var(--border);
	}
	.shop-hero h1 {
		font-size: clamp(2.6rem, 6vw, 4.2rem);
		margin-bottom: 14px;
	}
	.lede {
		max-width: 620px;
		color: #433e39;
		font-size: 1rem;
		line-height: 1.7;
	}
	.promises {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 22px;
		margin-top: 22px;
		padding: 0;
		list-style: none;
	}
	.promises li {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.82rem;
		color: var(--taupe);
	}
	.promises :global(svg) {
		color: var(--copper);
	}

	/* ── Banner ── */
	.banner {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		margin-top: 24px;
		padding: 16px 18px;
		border: 1px solid rgba(46, 125, 50, 0.25);
		background: rgba(46, 125, 50, 0.05);
		color: #2e7d32;
	}
	.banner div {
		flex: 1;
	}
	.banner strong {
		display: block;
		color: var(--ink);
		margin-bottom: 2px;
	}
	.banner p {
		font-size: 0.88rem;
		color: #433e39;
	}

	/* ── Layout ── */
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 340px;
		gap: 36px;
		padding-top: 28px;
		align-items: start;
	}
	@media (max-width: 960px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	/* ── Filters ── */
	.filters {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-bottom: 22px;
	}
	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--white);
		border: 1px solid var(--border);
		padding: 0 12px;
		min-height: 46px;
		color: var(--taupe);
		transition: border-color 0.15s;
	}
	.search:focus-within {
		border-color: var(--copper);
	}
	.search input {
		flex: 1;
		border: 0;
		outline: 0;
		background: transparent;
		font: inherit;
		font-size: 0.92rem;
		color: var(--ink);
		min-width: 0;
	}
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: space-between;
		align-items: center;
	}
	.segmented {
		display: inline-flex;
		border: 1px solid var(--border);
		background: var(--white);
		padding: 3px;
		gap: 2px;
		max-width: 100%;
		overflow-x: auto;
	}
	.segmented button {
		border: 0;
		background: transparent;
		padding: 7px 14px;
		font: inherit;
		font-size: 0.78rem;
		color: var(--taupe);
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.15s,
			color 0.15s;
	}
	.segmented button.on {
		background: var(--ink);
		color: var(--white);
	}
	.sort {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.78rem;
		color: var(--taupe);
	}
	.sort select {
		font: inherit;
		font-size: 0.82rem;
		border: 1px solid var(--border);
		background: var(--white);
		padding: 7px 10px;
		color: var(--ink);
	}
	.chips {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 2px;
		scrollbar-width: none;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		flex-shrink: 0;
		border: 1px solid var(--border);
		background: var(--white);
		border-radius: 999px;
		padding: 6px 14px;
		font: inherit;
		font-size: 0.78rem;
		color: #433e39;
		cursor: pointer;
		transition: all 0.15s;
	}
	.chip:hover {
		border-color: var(--copper);
	}
	.chip.on {
		background: var(--copper);
		border-color: var(--copper);
		color: var(--white);
	}
	.chip--tag {
		font-size: 0.72rem;
		padding: 5px 12px;
	}
	.chip--tag.on {
		background: rgba(164, 89, 38, 0.1);
		color: var(--copper-deep);
	}
	.result-line {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-top: 1px solid var(--border);
		padding-top: 14px;
	}
	.result-line h2 {
		font-family: 'Jost', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--taupe);
		font-weight: 500;
	}
	.link-btn {
		border: 0;
		background: none;
		padding: 0;
		font: inherit;
		font-size: 0.8rem;
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}
	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background: none;
		color: var(--taupe);
		padding: 6px;
		cursor: pointer;
	}
	.icon-btn:hover {
		color: var(--ink);
	}

	/* ── Grid & cards ── */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 20px;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	@media (max-width: 520px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 12px;
		}
	}
	.card {
		display: flex;
		flex-direction: column;
		background: var(--white);
		border: 1px solid var(--border);
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			transform 0.2s;
	}
	.card:hover {
		box-shadow: 0 10px 30px -18px rgba(26, 26, 26, 0.35);
		transform: translateY(-2px);
	}
	.card.in-basket {
		border-color: var(--copper);
	}
	.card__media {
		position: relative;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		background: var(--panel);
	}
	.card__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.card:hover .card__media img {
		transform: scale(1.04);
	}
	.card__placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			repeating-linear-gradient(45deg, transparent 0 14px, rgba(164, 89, 38, 0.05) 14px 15px),
			var(--panel);
	}
	.card__placeholder span {
		font-family: 'Cormorant Garamond', serif;
		font-size: 4rem;
		font-style: italic;
		color: rgba(164, 89, 38, 0.35);
	}
	.ribbon {
		position: absolute;
		top: 12px;
		left: 0;
		background: var(--ink);
		color: var(--white);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		padding: 5px 10px 5px 12px;
	}
	.sold-flag {
		position: absolute;
		bottom: 10px;
		left: 10px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: rgba(250, 248, 244, 0.94);
		color: var(--copper-deep);
		font-size: 0.64rem;
		letter-spacing: 0.06em;
		padding: 4px 8px;
		backdrop-filter: blur(4px);
	}
	.card__body {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 14px 16px 16px;
		flex: 1;
	}
	.card__meta {
		display: flex;
		gap: 8px;
		font-size: 0.64rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--copper);
	}
	.card__meta span + span::before {
		content: '·';
		margin-right: 8px;
		color: var(--taupe);
	}
	.card h3 {
		font-size: 1.35rem;
	}
	.desc {
		font-size: 0.84rem;
		line-height: 1.55;
		color: #4a4139;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}
	.tag {
		font-size: 0.66rem;
		color: var(--taupe);
		border: 1px solid var(--border);
		padding: 2px 8px;
		border-radius: 999px;
	}
	.heat {
		display: inline-flex;
		gap: 1px;
		margin-right: 4px;
	}
	.heat :global(.hot) {
		color: #c0392b;
		fill: rgba(192, 57, 43, 0.25);
	}
	.heat :global(.cold) {
		color: #d8cec3;
	}
	.ingredients summary {
		cursor: pointer;
		font-size: 0.74rem;
		color: var(--taupe);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.ingredients p {
		margin-top: 6px;
		font-size: 0.78rem;
		line-height: 1.55;
		color: #4a4139;
	}
	.card__foot {
		margin-top: auto;
		padding-top: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
	.price {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.4rem;
		font-weight: 600;
	}
	.add-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border: 1px solid var(--ink);
		background: var(--ink);
		color: var(--white);
		font: inherit;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 9px 14px;
		cursor: pointer;
		transition: background 0.15s;
	}
	.add-btn:hover {
		background: var(--copper);
		border-color: var(--copper);
	}
	.stepper {
		display: inline-flex;
		align-items: center;
		border: 1px solid var(--copper);
	}
	.stepper button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border: 0;
		background: transparent;
		color: var(--copper);
		cursor: pointer;
	}
	.stepper button:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
	.stepper span {
		min-width: 24px;
		text-align: center;
		font-size: 0.88rem;
		font-weight: 500;
	}
	.stepper--sm button {
		width: 26px;
		height: 26px;
	}
	@media (max-width: 520px) {
		.card__body {
			padding: 12px;
		}
		.card h3 {
			font-size: 1.12rem;
		}
		.desc {
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
		.card__foot {
			flex-direction: column;
			align-items: stretch;
		}
		.add-btn,
		.stepper {
			justify-content: center;
		}
		.stepper {
			justify-content: space-between;
		}
	}

	/* ── Empty states ── */
	.empty {
		text-align: center;
		padding: 56px 20px;
		border: 1px dashed #d8cec3;
		background: var(--white);
	}
	.empty h3 {
		font-size: 1.6rem;
		margin-bottom: 8px;
	}
	.empty p {
		color: var(--taupe);
		margin-bottom: 18px;
		font-size: 0.9rem;
	}

	/* ── Together CTA ── */
	.together {
		margin-top: 36px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
		padding: 26px 28px;
		background: var(--ink);
		color: var(--white);
	}
	.together h3 {
		font-size: 1.7rem;
		margin-bottom: 6px;
	}
	.together p {
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.9rem;
		max-width: 480px;
	}
	.together .eyebrow {
		color: #e0a679;
	}

	/* ── Buttons ── */
	.btn,
	.btn-outline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-height: 46px;
		padding: 0 20px;
		font: inherit;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 500;
		border-radius: 2px;
		cursor: pointer;
		text-decoration: none;
		transition:
			background 0.15s,
			color 0.15s;
	}
	.btn {
		background: var(--copper);
		color: var(--white);
		border: 1px solid var(--copper);
	}
	.btn:hover:not(:disabled) {
		background: var(--copper-deep);
	}
	.btn-outline {
		background: transparent;
		color: var(--ink);
		border: 1px solid var(--ink);
	}
	.btn-outline:hover:not(:disabled) {
		background: var(--ink);
		color: var(--white);
	}
	.btn:disabled,
	.btn-outline:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.btn--block {
		width: 100%;
	}

	/* ── Basket ── */
	.basket-col {
		position: sticky;
		top: 96px;
	}
	.basket {
		background: var(--white);
		border: 1px solid var(--border);
		padding: 20px;
	}
	.basket__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 14px;
	}
	.basket__head h2 {
		font-size: 1.5rem;
	}
	.basket__empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 28px 0;
		color: #b9b0a7;
		text-align: center;
	}
	.basket__empty p {
		color: var(--taupe);
		font-size: 0.86rem;
	}
	.lines {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		max-height: 46vh;
		overflow-y: auto;
	}
	.line {
		display: grid;
		grid-template-columns: 52px 1fr auto;
		gap: 12px;
		padding: 12px 0;
		border-bottom: 1px solid var(--border);
	}
	.line__thumb {
		width: 52px;
		height: 52px;
		background: var(--panel);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.line__thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.line__thumb span {
		font-family: 'Cormorant Garamond', serif;
		font-style: italic;
		font-size: 1.5rem;
		color: rgba(164, 89, 38, 0.45);
	}
	.line__info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.line__name {
		font-size: 0.88rem;
		font-weight: 500;
	}
	.line__note {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.7rem;
		color: var(--taupe);
	}
	.line__info .stepper {
		width: fit-content;
		margin-top: 2px;
	}
	.line__end {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 0.86rem;
	}
	.totals {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 14px 0;
		font-size: 0.86rem;
		color: var(--taupe);
	}
	.totals strong {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		color: var(--ink);
	}
	.paths {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.path__note {
		margin-top: 6px;
		font-size: 0.72rem;
		line-height: 1.5;
		color: var(--taupe);
	}
	.or {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.66rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #b9b0a7;
	}
	.or::before,
	.or::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--border);
	}

	/* ── Details form ── */
	.details {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.details__intro {
		font-size: 0.82rem;
		color: var(--taupe);
		line-height: 1.55;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 0;
	}
	.field span {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--taupe);
	}
	.field input {
		font: inherit;
		font-size: 0.92rem;
		border: 1px solid var(--border);
		background: var(--cream);
		padding: 10px 12px;
		color: var(--ink);
		outline: 0;
		width: 100%;
	}
	.field input:focus {
		border-color: var(--copper);
		background: var(--white);
	}
	.field em,
	.form-error {
		font-style: normal;
		font-size: 0.74rem;
		color: #a33a2b;
	}
	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	/* ── Mobile basket bar & sheet ── */
	.basket-bar {
		position: fixed;
		left: 16px;
		right: 16px;
		bottom: calc(16px + env(safe-area-inset-bottom));
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 18px;
		background: var(--ink, #1a1a1a);
		color: #fff;
		border: 0;
		font: inherit;
		font-size: 0.86rem;
		box-shadow: 0 14px 34px -12px rgba(0, 0, 0, 0.45);
		cursor: pointer;
	}
	.basket-bar__count,
	.basket-bar__total {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.basket-bar__total {
		font-weight: 600;
	}
	.sheet-backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		background: rgba(26, 26, 26, 0.45);
	}
	.sheet {
		--cream: #faf8f4;
		--ink: #1a1a1a;
		--copper: #a45926;
		--copper-deep: #8a4a1f;
		--taupe: #6f6964;
		--border: #e8e4e0;
		--panel: #f5f2ed;
		--white: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 51;
		max-height: 88vh;
		overflow-y: auto;
		background: var(--white);
		color: var(--ink);
		font-family: 'Jost', sans-serif;
		padding: 20px 18px calc(24px + env(safe-area-inset-bottom));
		border-top-left-radius: 14px;
		border-top-right-radius: 14px;
	}
</style>
