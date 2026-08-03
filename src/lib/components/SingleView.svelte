<script>
	let { title, children, class: className = '', photo = '' } = $props();
</script>

<div
	class="flex w-full flex-col items-center justify-center rounded-md border border-border
 bg-card shadow-none lg:w-md lg:min-w-3xl {className}"
>
	<div
		class="flex w-full flex-col items-center justify-start rounded-t-md border-b border-border bg-primary px-8 py-6 text-primary-foreground"
	>
		{#if photo !== ''}
			<img src="/files/{photo}" loading="lazy" class="h-48 w-48 rounded-full" alt="{title} photo" />
		{/if}
		<h1 class="text-center">{title}</h1>
	</div>

	{@render children()}
</div>
