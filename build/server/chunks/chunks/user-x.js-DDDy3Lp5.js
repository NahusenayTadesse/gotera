import { a6 as spread_props } from './server.js-CPNQ0GBv.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';

//#region node_modules/@lucide/svelte/dist/icons/gift.svelte
function Gift($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "gift" },
		props,
		{ iconNode: [
			["path", { "d": "M12 7v14" }],
			["path", { "d": "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
			["path", { "d": "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" }],
			["rect", {
				"x": "3",
				"y": "7",
				"width": "18",
				"height": "4",
				"rx": "1"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/user-x.svelte
function User_x($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "user-x" },
		props,
		{ iconNode: [
			["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
			["circle", {
				"cx": "9",
				"cy": "7",
				"r": "4"
			}],
			["line", {
				"x1": "17",
				"x2": "22",
				"y1": "8",
				"y2": "13"
			}],
			["line", {
				"x1": "22",
				"x2": "17",
				"y1": "8",
				"y2": "13"
			}]
		] }
	]));
}

export { Gift as G, User_x as U };
//# sourceMappingURL=user-x.js-DDDy3Lp5.js.map
