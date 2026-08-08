<script lang="ts">
	import { Card } from "$lib/components/ui/card";
	import Lightbox from "$lib/components/carousel/lightbox.svelte";
	import { MaximizeIcon } from "@lucide/svelte";

	let { images, layout = "grid", columns = 3 }: Props = $props();

	let currentIndex = $state(0);
	let lightboxOpen = $state(false);

	const openLightbox = (index: number) => {
		currentIndex = index;
		lightboxOpen = true;
	};

	const getBentoClass = (index: number) => {
		const patterns = [
			"col-span-2 row-span-2", // Large
			"col-span-1 row-span-1", // Small
			"col-span-1 row-span-1", // Small
			"col-span-1 row-span-2", // Tall
			"col-span-2 row-span-1", // Wide
			"col-span-1 row-span-1", // Small
		];
		return patterns[index % patterns.length];
	};

	type Props = {
		images: string[];
		layout?: "grid" | "bento" | "masonry";
		columns?: number;
	};
</script>

<div class="w-full">
	{#if layout === "grid"}
		<div class="grid gap-4" style="grid-template-columns: repeat({columns}, minmax(0, 1fr));">
			{#each images as image, index}
				<button onclick={() => openLightbox(index)} class="group relative overflow-hidden rounded-lg bg-muted aspect-square hover:scale-[1.02] transition-transform duration-300">
					<img src={image} loading="lazy" alt="Gallery image {index + 1}" class="w-full h-full object-cover" />
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
						<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div class="bg-white/90 rounded-full p-3">
								<MaximizeIcon class="size-6 text-black" />
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{:else if layout === "bento"}
		<div class="grid grid-cols-4 auto-rows-[200px] gap-4">
			{#each images as image, index}
				<button onclick={() => openLightbox(index)} class={["group relative overflow-hidden rounded-lg bg-muted hover:scale-[1.02] transition-transform duration-300", getBentoClass(index)]}>
					<img src={image} alt="Gallery image {index + 1}" class="w-full h-full object-cover" />
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
						<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div class="bg-white/90 rounded-full p-3">
								<MaximizeIcon class="size-6 text-black" />
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{:else if layout === "masonry"}
		<div class="columns-{columns} gap-4 flex flex-col gap-4">
			{#each images as image, index}
				<button onclick={() => openLightbox(index)} class="group relative overflow-hidden rounded-lg bg-muted break-inside-avoid mb-4 w-full hover:scale-[1.02] transition-transform duration-300">
					<img src={image} alt="Gallery image {index + 1}" class="w-full h-auto object-cover" />
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
						<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div class="bg-white/90 rounded-full p-3">
								<MaximizeIcon class="size-6 text-black" />
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<Lightbox bind:open={lightboxOpen} {images} bind:currentIndex />
