import { a6 as spread_props, a5 as element, a2 as attributes, a3 as clsx$1, a7 as bind_props, a9 as escape_html, ab as stringify$1 } from './server.js-CPNQ0GBv.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { B as Badge_check } from './badge-check.js-Dc-hXwTK.js';
import { L as Loader } from './scroll-area.js-DLUPG4gi.js';
import { T as Truck } from './truck.js-rfGMc_Yv.js';
import { c as cn } from './utils2.js-BChetszu.js';
import { t as tv } from './button.js-DMlVoc1I.js';

//#region node_modules/@lucide/svelte/dist/icons/circle-dollar-sign.svelte
function Circle_dollar_sign($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-dollar-sign" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["path", { "d": "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
			["path", { "d": "M12 18V6" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/circle-pause.svelte
function Circle_pause($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-pause" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["line", {
				"x1": "10",
				"x2": "10",
				"y1": "15",
				"y2": "9"
			}],
			["line", {
				"x1": "14",
				"x2": "14",
				"y1": "15",
				"y2": "9"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/circle-x.svelte
function Circle_x($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "circle-x" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["path", { "d": "m15 9-6 6" }],
			["path", { "d": "m9 9 6 6" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/clock.svelte
function Clock($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "clock" },
		props,
		{ iconNode: [["circle", {
			"cx": "12",
			"cy": "12",
			"r": "10"
		}], ["path", { "d": "M12 6v6l4 2" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/octagon-minus.svelte
function Octagon_minus($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "octagon-minus" },
		props,
		{ iconNode: [["path", { "d": "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" }], ["path", { "d": "M8 12h8" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/skip-forward.svelte
function Skip_forward($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "skip-forward" },
		props,
		{ iconNode: [["path", { "d": "M21 4v16" }], ["path", { "d": "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" }]] }
	]));
}
//#endregion
//#region src/lib/components/ui/badge/badge.svelte
var badgeVariants = tv({
	base: "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:ring-[3px] [&>svg]:pointer-events-none",
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Badge($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, href, class: className, variant = "default", children, $$slots, $$events, ...restProps } = $$props;
		element($$renderer, href ? "a" : "span", () => {
			$$renderer.push(`${attributes({
				"data-slot": "badge",
				href,
				class: clsx$1(cn(badgeVariants({ variant }), className)),
				...restProps
			})}`);
		}, () => {
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		});
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/Table/statuses.svelte
function Statuses($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { status } = $$props;
		const statusMeta = {
			confirmed: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			paid: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			fulfilled: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			complete: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			incomplete: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			cancelled: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			unpaid: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			dead: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			failed: {
				icon: Circle_x,
				colour: "bg-red-500"
			},
			pending: {
				icon: Loader,
				colour: "bg-yellow-500"
			},
			scheduled: {
				icon: Clock,
				colour: "bg-blue-500"
			},
			dispatched: {
				icon: Truck,
				colour: "bg-blue-500"
			},
			paused: {
				icon: Circle_pause,
				colour: "bg-orange-500"
			},
			skipped: {
				icon: Skip_forward,
				colour: "bg-gray-400"
			},
			delivered: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			read: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			active: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			contracted: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			inactive: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			subscribed: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			credited: {
				icon: Circle_dollar_sign,
				colour: "bg-teal-500"
			},
			yes: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			no: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			unremovable: {
				icon: Badge_check,
				colour: "bg-green-400"
			},
			removable: {
				icon: Octagon_minus,
				colour: "bg-red-500"
			},
			unknown: {
				icon: Loader,
				colour: "bg-gray-500"
			}
		};
		const { icon: Icon, colour } = statusMeta[String(status).trim().toLowerCase()] ?? statusMeta.unknown;
		Badge($$renderer, {
			variant: "secondary",
			class: `${stringify$1(colour)} text-white`,
			children: ($$renderer) => {
				Icon($$renderer, {});
				$$renderer.push(`<!----> ${escape_html(String(status))}`);
			},
			$$slots: { default: true }
		});
	});
}

export { Badge as B, Circle_pause as C, Octagon_minus as O, Statuses as S };
//# sourceMappingURL=statuses.js-e5MBhLkL.js.map
