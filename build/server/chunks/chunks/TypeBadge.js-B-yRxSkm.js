import { a6 as escape_html } from './server.js-qDPizQqb.js';
import { B as Badge } from './statuses.js-CqI0SEDd.js';

//#region src/lib/components/dashboard/TypeBadge.svelte
function TypeBadge($$renderer, $$props) {
	let { type } = $$props;
	const labels = {
		subscription: "Subscription",
		guest: "Guest",
		"one-time": "One-time",
		gift: "One-time / Gift",
		partner: "Trade partner"
	};
	Badge($$renderer, {
		variant: "outline",
		children: ($$renderer) => {
			$$renderer.push(`<!---->${escape_html(labels[type] ?? type)}`);
		},
		$$slots: { default: true }
	});
}

export { TypeBadge as T };
//# sourceMappingURL=TypeBadge.js-B-yRxSkm.js.map
