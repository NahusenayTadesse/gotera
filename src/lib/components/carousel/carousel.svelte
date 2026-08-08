<script lang="ts">
	import { Card } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { ChevronLeftIcon, ChevronRightIcon, MaximizeIcon } from "@lucide/svelte";
	import Lightbox from "./lightbox.svelte";

	let { images, autoPlay = false, interval = 3000, showThumbnails = true, aspectRatio = "16/9" }: Props = $props();

	let currentIndex = $state(0);
	let lightboxOpen = $state(false);
	let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

	const SWIPE_THRESHOLD = 50;
	let touchStartX = 0;
	let touchDeltaX = 0;

	const goToPrevious = () => {
		currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
	};

	const goToNext = () => {
		currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
	};

	const goToSlide = (index: number) => {
		currentIndex = index;
	};

	const openLightbox = () => {
		lightboxOpen = true;
	};

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX;
		touchDeltaX = 0;
	};

	const handleTouchMove = (e: TouchEvent) => {
		touchDeltaX = e.touches[0].clientX - touchStartX;
	};

	const handleTouchEnd = () => {
		if (images.length > 1 && Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
			if (touchDeltaX < 0) {
				goToNext();
			} else {
				goToPrevious();
			}
		}
		touchDeltaX = 0;
	};

	const startAutoPlay = () => {
		if (autoPlay && images.length > 1) {
			autoPlayInterval = setInterval(goToNext, interval);
		}
	};

	const stopAutoPlay = () => {
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
			autoPlayInterval = null;
		}
	};

	$effect(() => {
		if (autoPlay) {
			startAutoPlay();
		}
		return () => stopAutoPlay();
	});

	type Props = {
		images: string[];
		autoPlay?: boolean;
		interval?: number;
		showThumbnails?: boolean;
		aspectRatio?: string;
	};
</script>

<div class="w-full flex flex-col gap-4">
	<Card class="overflow-hidden group">
		<div class="relative" onmouseenter={stopAutoPlay} onclick={openLightbox} onmouseleave={() => autoPlay && startAutoPlay()}>
			<div
				role="presentation"
				class="relative overflow-hidden bg-muted touch-pan-y"
				style="aspect-ratio: {aspectRatio};"
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
			>
				<img src={images[currentIndex]} loading="lazy" alt="Slide {currentIndex + 1}" class="w-full h-full object-cover transition-opacity duration-500" />

				<Button size="icon" variant="secondary" class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" onclick={openLightbox}>
					<MaximizeIcon />
				</Button>
			</div>

			{#if images.length > 1}
				<Button size="icon" variant="secondary" class="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onclick={goToPrevious}>
					<ChevronLeftIcon />
				</Button>

				<Button size="icon" variant="secondary" class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" onclick={goToNext}>
					<ChevronRightIcon />
				</Button>

				<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
					{#each images as _, index}
						<button onclick={() => goToSlide(index)} class={["size-2 rounded-full transition-all", currentIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"]}></button>
					{/each}
				</div>
			{/if}
		</div>
	</Card>

	{#if showThumbnails && images.length > 1}
		<div class="flex gap-2 overflow-x-auto pb-2">
			{#each images as image, index}
				<button onclick={() => goToSlide(index)} class={["shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:scale-105", currentIndex === index ? "border-primary" : "border-transparent"]}>
					<img src={image} alt="Thumbnail {index + 1}" class="size-20 object-cover" />
				</button>
			{/each}
		</div>
	{/if}
</div>

<Lightbox bind:open={lightboxOpen} {images} bind:currentIndex />
