<script lang="ts">
	import { Dialog, DialogContent } from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { ChevronLeftIcon, ChevronRightIcon, XIcon, ZoomInIcon, ZoomOutIcon } from "@lucide/svelte";

	let { open = $bindable(false), images, currentIndex = $bindable(0) }: Props = $props();

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 4;

	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let dragging = $state(false);

	let dragStartX = 0;
	let dragStartY = 0;
	let panStartX = 0;
	let panStartY = 0;
	let pinchStartDist = 0;
	let pinchStartZoom = 1;
	let suppressBackdropClick = false;
	let historyPushed = false;
	let closingFromPopstate = false;

	const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

	const resetZoom = () => {
		zoom = 1;
		panX = 0;
		panY = 0;
		dragging = false;
	};

	$effect(() => {
		// Re-run whenever the open image changes, or the dialog is (re)opened.
		void currentIndex;
		void open;
		resetZoom();
	});

	// Make the device/browser back gesture close the lightbox instead of
	// navigating the underlying page: push a history entry while open, and
	// pop it again (without re-triggering navigation) whenever we close.
	$effect(() => {
		if (open && !historyPushed) {
			history.pushState({ lightbox: true }, "");
			historyPushed = true;
		} else if (!open && historyPushed) {
			historyPushed = false;
			if (!closingFromPopstate && history.state?.lightbox) {
				history.back();
			}
			closingFromPopstate = false;
		}
	});

	const handlePopState = () => {
		if (open) {
			closingFromPopstate = true;
			historyPushed = false;
			open = false;
		}
	};

	const goToPrevious = () => {
		currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
	};

	const goToNext = () => {
		currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
	};

	const zoomIn = () => {
		zoom = clampZoom(zoom + 0.5);
	};

	const zoomOut = () => {
		zoom = clampZoom(zoom - 0.5);
		if (zoom === 1) {
			panX = 0;
			panY = 0;
		}
	};

	const toggleZoom = () => {
		if (zoom > 1) {
			resetZoom();
		} else {
			zoom = 2.5;
		}
	};

	const handleWheel = (e: WheelEvent) => {
		e.preventDefault();
		zoom = clampZoom(zoom - e.deltaY * 0.0015);
		if (zoom === 1) {
			panX = 0;
			panY = 0;
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		suppressBackdropClick = false;
		if (zoom <= 1) return;
		dragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		panStartX = panX;
		panStartY = panY;
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!dragging) return;
		suppressBackdropClick = true;
		panX = panStartX + (e.clientX - dragStartX);
		panY = panStartY + (e.clientY - dragStartY);
	};

	const handleMouseUp = () => {
		dragging = false;
	};

	const handleTouchStart = (e: TouchEvent) => {
		suppressBackdropClick = false;
		if (e.touches.length === 2) {
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			pinchStartDist = Math.hypot(dx, dy);
			pinchStartZoom = zoom;
		} else if (e.touches.length === 1 && zoom > 1) {
			dragging = true;
			dragStartX = e.touches[0].clientX;
			dragStartY = e.touches[0].clientY;
			panStartX = panX;
			panStartY = panY;
		}
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (e.touches.length === 2) {
			e.preventDefault();
			suppressBackdropClick = true;
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			const dist = Math.hypot(dx, dy);
			zoom = clampZoom(pinchStartZoom * (dist / pinchStartDist));
			if (zoom === 1) {
				panX = 0;
				panY = 0;
			}
		} else if (e.touches.length === 1 && dragging) {
			e.preventDefault();
			suppressBackdropClick = true;
			panX = panStartX + (e.touches[0].clientX - dragStartX);
			panY = panStartY + (e.touches[0].clientY - dragStartY);
		}
	};

	const handleTouchEnd = (e: TouchEvent) => {
		if (e.touches.length === 0) dragging = false;
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (suppressBackdropClick) {
			suppressBackdropClick = false;
			return;
		}
		if (e.target === e.currentTarget) {
			open = false;
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (!open) return;
		if (e.key === "ArrowLeft") goToPrevious();
		if (e.key === "ArrowRight") goToNext();
		if (e.key === "Escape") open = false;
		if (e.key === "+" || e.key === "=") zoomIn();
		if (e.key === "-") zoomOut();
	};

	type Props = {
		open?: boolean;
		images: string[];
		currentIndex?: number;
	};
</script>

<svelte:window onkeydown={handleKeydown} onpopstate={handlePopState} />

<Dialog bind:open>
	<DialogContent
		showCloseButton={false}
		class="w-screen h-screen max-w-none max-h-none rounded-none top-0 left-0 translate-x-0 translate-y-0 p-0 border-0 bg-black sm:w-[96vw] sm:h-[96vh] sm:max-w-[1800px] sm:max-h-[96vh] sm:rounded-xl sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bg-black/95"
	>
		<div class="relative w-full h-full flex items-center justify-center overflow-hidden">
			<Button
				aria-label="Close"
				size="icon"
				variant="ghost"
				class="absolute top-20 right-4 z-50 size-11 rounded-full bg-black/50 text-white shadow-lg hover:bg-black/70 sm:top-4"
				onclick={() => (open = false)}
			>
				<XIcon class="size-5" />
			</Button>

			{#if images.length > 1}
				<Button size="icon" variant="ghost" class="absolute left-4 z-40 text-white hover:bg-white/20 size-12" onclick={goToPrevious}>
					<ChevronLeftIcon class="size-8" />
				</Button>

				<Button size="icon" variant="ghost" class="absolute right-4 z-40 text-white hover:bg-white/20 size-12" onclick={goToNext}>
					<ChevronRightIcon class="size-8" />
				</Button>
			{/if}

			<div
				role="presentation"
				class="w-full h-full flex items-center justify-center p-4 sm:p-16 touch-none select-none"
				class:cursor-grab={zoom > 1 && !dragging}
				class:cursor-grabbing={dragging}
				onwheel={handleWheel}
				onmousedown={handleMouseDown}
				onmousemove={handleMouseMove}
				onmouseup={handleMouseUp}
				onmouseleave={handleMouseUp}
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				ontouchend={handleTouchEnd}
				onclick={handleBackdropClick}
			>
				<img
					src={images[currentIndex]}
					loading="lazy"
					alt="Lightbox view {currentIndex + 1}"
					class="max-w-full max-h-full object-contain rounded-lg"
					class:cursor-zoom-in={zoom === 1}
					class:cursor-zoom-out={zoom > 1}
					style="transform: translate({panX}px, {panY}px) scale({zoom}); transition: {dragging ? 'none' : 'transform 0.2s ease-out'};"
					ondblclick={toggleZoom}
					draggable="false"
				/>
			</div>

			{#if images.length > 1}
				<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full">
					{#each images as _, index (index)}
						<button aria-label="Go to image {index + 1}" onclick={() => (currentIndex = index)} class={["size-2 rounded-full transition-all", currentIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"]}></button>
					{/each}
				</div>
			{/if}

			<div class="absolute top-20 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full sm:top-4">
				{currentIndex + 1} / {images.length}
			</div>

			<div class="absolute bottom-8 right-4 z-40 flex items-center gap-1 bg-black/50 rounded-full p-1">
				<Button aria-label="Zoom out" size="icon" variant="ghost" class="text-white hover:bg-white/20 size-9" onclick={zoomOut} disabled={zoom <= MIN_ZOOM}>
					<ZoomOutIcon class="size-4" />
				</Button>
				<span class="text-white text-xs w-10 text-center select-none">{Math.round(zoom * 100)}%</span>
				<Button aria-label="Zoom in" size="icon" variant="ghost" class="text-white hover:bg-white/20 size-9" onclick={zoomIn} disabled={zoom >= MAX_ZOOM}>
					<ZoomInIcon class="size-4" />
				</Button>
			</div>
		</div>
	</DialogContent>
</Dialog>
