import { a9 as escape_html, $ as attr, T as derived, ac as attr_style, ab as stringify$1, a4 as ensure_array_like, aa as attr_class, a3 as clsx$1, a6 as spread_props, a7 as bind_props } from './server.js-CPNQ0GBv.js';
import { h as getLocale } from './runtime.js-CYqc9Mf9.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { C as Chevron_left } from './chevron-left.js-Dl5KW7W_.js';
import { C as Chevron_right } from './chevron-right.js-ChVD6BGK.js';
import { D as Dialog, b as Dialog_content, X } from './dialog.js-BhMsigOw.js';
import { B as Button } from './button.js-DMlVoc1I.js';
import { C as Card } from './card.js-DgfKxiLl.js';

//#region node_modules/@lucide/svelte/dist/icons/maximize.svelte
function Maximize($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "maximize" },
		props,
		{ iconNode: [
			["path", { "d": "M8 3H5a2 2 0 0 0-2 2v3" }],
			["path", { "d": "M21 8V5a2 2 0 0 0-2-2h-3" }],
			["path", { "d": "M3 16v3a2 2 0 0 0 2 2h3" }],
			["path", { "d": "M16 21h3a2 2 0 0 0 2-2v-3" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/zoom-in.svelte
function Zoom_in($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "zoom-in" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "11",
				"cy": "11",
				"r": "8"
			}],
			["line", {
				"x1": "21",
				"x2": "16.65",
				"y1": "21",
				"y2": "16.65"
			}],
			["line", {
				"x1": "11",
				"x2": "11",
				"y1": "8",
				"y2": "14"
			}],
			["line", {
				"x1": "8",
				"x2": "14",
				"y1": "11",
				"y2": "11"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/zoom-out.svelte
function Zoom_out($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "zoom-out" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "11",
				"cy": "11",
				"r": "8"
			}],
			["line", {
				"x1": "21",
				"x2": "16.65",
				"y1": "21",
				"y2": "16.65"
			}],
			["line", {
				"x1": "8",
				"x2": "14",
				"y1": "11",
				"y2": "11"
			}]
		] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/testimonial_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_EyebrowInputs */
var en_testimonial_eyebrow = () => {
	return `From our subscribers`;
};
var am_testimonial_eyebrow = () => {
	return `ከደንበኞቻችን`;
};
/**
* | output |
* | --- |
* | "From our subscribers" |
*
* @param {Testimonial_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_eyebrow();
	return en_testimonial_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_section_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Section_TitleInputs */
var en_testimonial_section_title = () => {
	return `What people say.`;
};
var am_testimonial_section_title = () => {
	return `ደንበኞቻችን ምን ይላሉ።`;
};
/**
* | output |
* | --- |
* | "What people say." |
*
* @param {Testimonial_Section_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_section_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_section_title();
	return en_testimonial_section_title();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_section_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Section_SubtitleInputs */
var en_testimonial_section_subtitle = () => {
	return `Sample copy — replace with real, consented quotes at launch.`;
};
var am_testimonial_section_subtitle = () => {
	return `ናሙና ጽሑፍ — ከምርቃት በፊት በእውነተኛ እና በፈቃድ የተሰጡ አስተያየቶች ይተካል።`;
};
/**
* | output |
* | --- |
* | "Sample copy — replace with real, consented quotes at launch." |
*
* @param {Testimonial_Section_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_section_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_section_subtitle();
	return en_testimonial_section_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_quote_1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Quote_1Inputs */
var en_testimonial_quote_1 = () => {
	return `Finally, authentic injera that tastes like home. The texture is perfect, and it arrives perfectly fresh every month`;
};
var am_testimonial_quote_1 = () => {
	return `በመጨረሻ እንደ ቤት ጣዕም ያለው እውነተኛ እንጀራ አገኘሁ። ሸካራነቱ ፍጹም ነው፣ በየወሩም ትኩስ ሆኖ ይደርሰኛል።`;
};
/**
* | output |
* | --- |
* | "Finally, authentic injera that tastes like home. The texture is perfect, and it arrives perfectly fresh every month" |
*
* @param {Testimonial_Quote_1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_quote_1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_quote_1();
	return en_testimonial_quote_1();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_attr_1.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Attr_1Inputs */
var en_testimonial_attr_1 = () => {
	return `Alemayehu T. · London · Subscriber since March 2026`;
};
var am_testimonial_attr_1 = () => {
	return `አለማየሁ ት. · ለንደን · ከመጋቢት 2026 ጀምሮ ደንበኛ`;
};
/**
* | output |
* | --- |
* | "Alemayehu T. · London · Subscriber since March 2026" |
*
* @param {Testimonial_Attr_1Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_attr_1 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_attr_1();
	return en_testimonial_attr_1();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_quote_2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Quote_2Inputs */
var en_testimonial_quote_2 = () => {
	return `I went gluten-free two years ago and dinner got boring fast. This is the first thing I've found that's naturally teff, actually filling, and doesn't taste like a substitute for something else.`;
};
var am_testimonial_quote_2 = () => {
	return `ከሁለት ዓመት በፊት ግሉተን-ነጻ መብላት ጀመርኩ፣ እራት በፍጥነት አሰልቺ ሆነብኝ። ይህ ግን ተፈጥሮአዊ ጤፍ የተሰራ፣ በእውነት የሚያጠግብ እና እንደ ምትክ ምግብ የማይቀምስ የመጀመሪያ ምርት ሆኖ አግኝቼዋለሁ።`;
};
/**
* | output |
* | --- |
* | "I went gluten-free two years ago and dinner got boring fast. This is the first thing I've found that's naturally teff, actually filling, and doesn't taste li..." |
*
* @param {Testimonial_Quote_2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_quote_2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_quote_2();
	return en_testimonial_quote_2();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_attr_2.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Attr_2Inputs */
var en_testimonial_attr_2 = () => {
	return `Meaza Tesfaye · London · Subscriber since February 2026`;
};
var am_testimonial_attr_2 = () => {
	return `መዓዛ ተስፋዬ · ለንደን · ከየካቲት 2026 ጀምሮ ደንበኛ`;
};
/**
* | output |
* | --- |
* | "Meaza Tesfaye · London · Subscriber since February 2026" |
*
* @param {Testimonial_Attr_2Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_attr_2 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_attr_2();
	return en_testimonial_attr_2();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_quote_3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Quote_3Inputs */
var en_testimonial_quote_3 = () => {
	return `Sent one to my sister for her birthday. She opened the box on video call and went quiet, then said it smelled like our grandmother's kitchen. Best twenty seconds of my year.`;
};
var am_testimonial_quote_3 = () => {
	return `ለእህቴ የልደት ስጦታ ላክሁላት። ሳጥኑን በቪዲዮ ጥሪ ላይ ስትከፍት ጸጥ አለች፣ ከዚያም የአያታችንን ወጥ ቤት ሽታ እንደሚያስታውሳት ነገረችኝ። የዓመቴ ምርጥ ሃያ ሰከንዶች ነበሩ።`;
};
/**
* | output |
* | --- |
* | "Sent one to my sister for her birthday. She opened the box on video call and went quiet, then said it smelled like our grandmother's kitchen. Best twenty sec..." |
*
* @param {Testimonial_Quote_3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_quote_3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_quote_3();
	return en_testimonial_quote_3();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_attr_3.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Attr_3Inputs */
var en_testimonial_attr_3 = () => {
	return `Dawit Bekele · London · Gift sender`;
};
var am_testimonial_attr_3 = () => {
	return `ዳዊት በቀለ · ለንደን · ስጦታ ላኪ`;
};
/**
* | output |
* | --- |
* | "Dawit Bekele · London · Gift sender" |
*
* @param {Testimonial_Attr_3Inputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_attr_3 = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_attr_3();
	return en_testimonial_attr_3();
});
//#endregion
//#region src/lib/paraglide/messages/testimonial_photo_alt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Testimonial_Photo_AltInputs */
var en_testimonial_photo_alt = () => {
	return `Injera served fresh`;
};
var am_testimonial_photo_alt = () => {
	return `ትኩስ የቀረበ እንጀራ`;
};
/**
* | output |
* | --- |
* | "Injera served fresh" |
*
* @param {Testimonial_Photo_AltInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var testimonial_photo_alt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_testimonial_photo_alt();
	return en_testimonial_photo_alt();
});
//#endregion
//#region src/lib/testimonial.svelte
function Testimonial($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let testimonials = derived(() => [
			{
				quote: testimonial_quote_1(),
				attr: testimonial_attr_1(),
				image: "/injera/injera26.webp"
			},
			{
				quote: testimonial_quote_2(),
				attr: testimonial_attr_2(),
				image: "/injera/injera28.webp"
			},
			{
				quote: testimonial_quote_3(),
				attr: testimonial_attr_3(),
				image: "/injera/injera30.webp"
			}
		]);
		$$renderer.push(`<section class="proof flex justify-center j svelte-qvmjr2" data-status="placeholder-copy"><div class="container svelte-qvmjr2"><div class="proof-head svelte-qvmjr2"><span class="eyebrow svelte-qvmjr2">${escape_html(testimonial_eyebrow())}</span> <h2 class="svelte-qvmjr2">${escape_html(testimonial_section_title())}</h2> <p class="svelte-qvmjr2">${escape_html(testimonial_section_subtitle())}</p></div> <div class="proof-grid svelte-qvmjr2"><div class="proof-card svelte-qvmjr2"><img class="proof-card-avatar svelte-qvmjr2"${attr("src", testimonials()[0].image)}${attr("alt", testimonial_photo_alt())} width="72" height="72" loading="lazy"/> <div class="proof-card-quote svelte-qvmjr2">"${escape_html(testimonials()[0].quote)}"</div> <div class="proof-card-attr svelte-qvmjr2">${escape_html(testimonials()[0].attr)}</div></div> <div class="proof-card svelte-qvmjr2"><img class="proof-card-avatar svelte-qvmjr2"${attr("src", testimonials()[1].image)}${attr("alt", testimonial_photo_alt())} width="72" height="72" loading="lazy"/> <div class="proof-card-quote svelte-qvmjr2">"${escape_html(testimonials()[1].quote)}"</div> <div class="proof-card-attr svelte-qvmjr2">${escape_html(testimonials()[1].attr)}</div></div> <div class="proof-card svelte-qvmjr2"><img class="proof-card-avatar svelte-qvmjr2"${attr("src", testimonials()[2].image)}${attr("alt", testimonial_photo_alt())} width="72" height="72" loading="lazy"/> <div class="proof-card-quote svelte-qvmjr2">"${escape_html(testimonials()[2].quote)}"</div> <div class="proof-card-attr svelte-qvmjr2">${escape_html(testimonials()[2].attr)}</div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/carousel/lightbox.svelte
function Lightbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, images, currentIndex = 0 } = $$props;
		const MIN_ZOOM = 1;
		const MAX_ZOOM = 4;
		let zoom = 1;
		let panX = 0;
		let panY = 0;
		let dragging = false;
		const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
		const goToPrevious = () => {
			currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		};
		const goToNext = () => {
			currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		};
		const zoomIn = () => {
			zoom = clampZoom(zoom + .5);
		};
		const zoomOut = () => {
			zoom = clampZoom(zoom - .5);
			if (zoom === 1) {
				panX = 0;
				panY = 0;
			}
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Dialog($$renderer, {
				get open() {
					return open;
				},
				set open($$value) {
					open = $$value;
					$$settled = false;
				},
				children: ($$renderer) => {
					Dialog_content($$renderer, {
						showCloseButton: false,
						class: "w-screen h-screen max-w-none max-h-none rounded-none top-0 left-0 translate-x-0 translate-y-0 p-0 border-0 bg-black sm:w-[96vw] sm:h-[96vh] sm:max-w-[1800px] sm:max-h-[96vh] sm:rounded-xl sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bg-black/95",
						children: ($$renderer) => {
							$$renderer.push(`<div class="relative w-full h-full flex items-center justify-center overflow-hidden">`);
							Button($$renderer, {
								"aria-label": "Close",
								size: "icon",
								variant: "ghost",
								class: "absolute top-20 right-4 z-50 size-11 rounded-full bg-black/50 text-white shadow-lg hover:bg-black/70 sm:top-4",
								onclick: () => open = false,
								children: ($$renderer) => {
									X($$renderer, { class: "size-5" });
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> `);
							if (images.length > 1) {
								$$renderer.push("<!--[0-->");
								Button($$renderer, {
									size: "icon",
									variant: "ghost",
									class: "absolute left-4 z-40 text-white hover:bg-white/20 size-12",
									onclick: goToPrevious,
									children: ($$renderer) => {
										Chevron_left($$renderer, { class: "size-8" });
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----> `);
								Button($$renderer, {
									size: "icon",
									variant: "ghost",
									class: "absolute right-4 z-40 text-white hover:bg-white/20 size-12",
									onclick: goToNext,
									children: ($$renderer) => {
										Chevron_right($$renderer, { class: "size-8" });
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!---->`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> <div role="presentation"${attr_class("w-full h-full flex items-center justify-center p-4 sm:p-16 touch-none select-none", void 0, {
								"cursor-grab": zoom > 1 && true,
								"cursor-grabbing": dragging
							})}><img${attr("src", images[currentIndex])} loading="lazy"${attr("alt", `Lightbox view ${stringify$1(currentIndex + 1)}`)}${attr_class("max-w-full max-h-full object-contain rounded-lg", void 0, {
								"cursor-zoom-in": zoom === 1,
								"cursor-zoom-out": zoom > 1
							})}${attr_style(`transform: translate(${stringify$1(panX)}px, ${stringify$1(panY)}px) scale(${stringify$1(zoom)}); transition: transform 0.2s ease-out;`)} draggable="false"/></div> `);
							if (images.length > 1) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full"><!--[-->`);
								const each_array = ensure_array_like(images);
								for (let index = 0, $$length = each_array.length; index < $$length; index++) {
									each_array[index];
									$$renderer.push(`<button${attr("aria-label", `Go to image ${stringify$1(index + 1)}`)}${attr_class(clsx$1(["size-2 rounded-full transition-all", currentIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"]))}></button>`);
								}
								$$renderer.push(`<!--]--></div>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> <div class="absolute top-20 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full sm:top-4">${escape_html(currentIndex + 1)} / ${escape_html(images.length)}</div> <div class="absolute bottom-8 right-4 z-40 flex items-center gap-1 bg-black/50 rounded-full p-1">`);
							Button($$renderer, {
								"aria-label": "Zoom out",
								size: "icon",
								variant: "ghost",
								class: "text-white hover:bg-white/20 size-9",
								onclick: zoomOut,
								disabled: zoom <= MIN_ZOOM,
								children: ($$renderer) => {
									Zoom_out($$renderer, { class: "size-4" });
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> <span class="text-white text-xs w-10 text-center select-none">${escape_html(Math.round(zoom * 100))}%</span> `);
							Button($$renderer, {
								"aria-label": "Zoom in",
								size: "icon",
								variant: "ghost",
								class: "text-white hover:bg-white/20 size-9",
								onclick: zoomIn,
								disabled: zoom >= MAX_ZOOM,
								children: ($$renderer) => {
									Zoom_in($$renderer, { class: "size-4" });
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----></div></div>`);
						},
						$$slots: { default: true }
					});
				},
				$$slots: { default: true }
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			open,
			currentIndex
		});
	});
}
//#endregion
//#region src/lib/components/carousel/carousel.svelte
function Carousel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { images, showThumbnails = true, aspectRatio = "16/9" } = $$props;
		let currentIndex = 0;
		let lightboxOpen = false;
		const goToPrevious = () => {
			currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		};
		const goToNext = () => {
			currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		};
		const openLightbox = () => {
			lightboxOpen = true;
		};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="w-full flex flex-col gap-4">`);
			Card($$renderer, {
				class: "overflow-hidden group",
				children: ($$renderer) => {
					$$renderer.push(`<div class="relative"><div role="presentation" class="relative overflow-hidden bg-muted touch-pan-y"${attr_style(`aspect-ratio: ${stringify$1(aspectRatio)};`)}><img${attr("src", images[currentIndex])} loading="lazy"${attr("alt", `Slide ${stringify$1(currentIndex + 1)}`)} class="w-full h-full object-cover transition-opacity duration-500"/> `);
					Button($$renderer, {
						size: "icon",
						variant: "secondary",
						class: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity",
						onclick: openLightbox,
						children: ($$renderer) => {
							Maximize($$renderer, {});
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> `);
					if (images.length > 1) {
						$$renderer.push("<!--[0-->");
						Button($$renderer, {
							size: "icon",
							variant: "secondary",
							class: "absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
							onclick: goToPrevious,
							children: ($$renderer) => {
								Chevron_left($$renderer, {});
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							size: "icon",
							variant: "secondary",
							class: "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity",
							onclick: goToNext,
							children: ($$renderer) => {
								Chevron_right($$renderer, {});
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"><!--[-->`);
						const each_array = ensure_array_like(images);
						for (let index = 0, $$length = each_array.length; index < $$length; index++) {
							each_array[index];
							$$renderer.push(`<button${attr_class(clsx$1(["size-2 rounded-full transition-all", currentIndex === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"]))}></button>`);
						}
						$$renderer.push(`<!--]--></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			if (showThumbnails && images.length > 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex gap-2 overflow-x-auto pb-2"><!--[-->`);
				const each_array_1 = ensure_array_like(images);
				for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
					let image = each_array_1[index];
					$$renderer.push(`<button${attr_class(clsx$1(["shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:scale-105", currentIndex === index ? "border-primary" : "border-transparent"]))}><img${attr("src", image)}${attr("alt", `Thumbnail ${stringify$1(index + 1)}`)} class="size-20 object-cover"/></button>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			Lightbox($$renderer, {
				images,
				get open() {
					return lightboxOpen;
				},
				set open($$value) {
					lightboxOpen = $$value;
					$$settled = false;
				},
				get currentIndex() {
					return currentIndex;
				},
				set currentIndex($$value) {
					currentIndex = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/lib/components/gallery/gallery.svelte
function Gallery($$renderer, $$props) {
	let { images, layout = "grid", columns = 3 } = $$props;
	let currentIndex = 0;
	let lightboxOpen = false;
	const getBentoClass = (index) => {
		const patterns = [
			"col-span-2 row-span-2",
			"col-span-1 row-span-1",
			"col-span-1 row-span-1",
			"col-span-1 row-span-2",
			"col-span-2 row-span-1",
			"col-span-1 row-span-1"
		];
		return patterns[index % patterns.length];
	};
	let $$settled = true;
	let $$inner_renderer;
	function $$render_inner($$renderer) {
		$$renderer.push(`<div class="w-full">`);
		if (layout === "grid") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="grid gap-4"${attr_style(`grid-template-columns: repeat(${stringify$1(columns)}, minmax(0, 1fr));`)}><!--[-->`);
			const each_array = ensure_array_like(images);
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let image = each_array[index];
				$$renderer.push(`<button class="group relative overflow-hidden rounded-lg bg-muted aspect-square hover:scale-[1.02] transition-transform duration-300"><img${attr("src", image)} loading="lazy"${attr("alt", `Gallery image ${stringify$1(index + 1)}`)} class="w-full h-full object-cover"/> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="bg-white/90 rounded-full p-3">`);
				Maximize($$renderer, { class: "size-6 text-black" });
				$$renderer.push(`<!----></div></div></div></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (layout === "bento") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="grid grid-cols-4 auto-rows-[200px] gap-4"><!--[-->`);
			const each_array_1 = ensure_array_like(images);
			for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
				let image = each_array_1[index];
				$$renderer.push(`<button${attr_class(clsx$1(["group relative overflow-hidden rounded-lg bg-muted hover:scale-[1.02] transition-transform duration-300", getBentoClass(index)]))}><img${attr("src", image)}${attr("alt", `Gallery image ${stringify$1(index + 1)}`)} class="w-full h-full object-cover"/> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="bg-white/90 rounded-full p-3">`);
				Maximize($$renderer, { class: "size-6 text-black" });
				$$renderer.push(`<!----></div></div></div></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (layout === "masonry") {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<div${attr_class(`columns-${stringify$1(columns)} gap-4 flex flex-col gap-4`)}><!--[-->`);
			const each_array_2 = ensure_array_like(images);
			for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
				let image = each_array_2[index];
				$$renderer.push(`<button class="group relative overflow-hidden rounded-lg bg-muted break-inside-avoid mb-4 w-full hover:scale-[1.02] transition-transform duration-300"><img${attr("src", image)}${attr("alt", `Gallery image ${stringify$1(index + 1)}`)} class="w-full h-auto object-cover"/> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div class="bg-white/90 rounded-full p-3">`);
				Maximize($$renderer, { class: "size-6 text-black" });
				$$renderer.push(`<!----></div></div></div></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		Lightbox($$renderer, {
			images,
			get open() {
				return lightboxOpen;
			},
			set open($$value) {
				lightboxOpen = $$value;
				$$settled = false;
			},
			get currentIndex() {
				return currentIndex;
			},
			set currentIndex($$value) {
				currentIndex = $$value;
				$$settled = false;
			}
		});
		$$renderer.push(`<!---->`);
	}
	do {
		$$settled = true;
		$$inner_renderer = $$renderer.copy();
		$$render_inner($$inner_renderer);
	} while (!$$settled);
	$$renderer.subsume($$inner_renderer);
}

export { Carousel as C, Gallery as G, Testimonial as T };
//# sourceMappingURL=gallery.js-BFxF_w--.js.map
