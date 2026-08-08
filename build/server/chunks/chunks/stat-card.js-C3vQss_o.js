import { a9 as escape_html } from './server.js-CPNQ0GBv.js';
import { C as Card, a as Card_content } from './card.js-DgfKxiLl.js';

//#region src/lib/components/dashboard/stat-card.svelte
function Stat_card($$renderer, $$props) {
	const { title, value, icon, description, className = "", measure = "" } = $$props;
	Card($$renderer, {
		class: ["group border border-border bg-card shadow-none transition-colors duration-200 hover:border-primary/40", className],
		children: ($$renderer) => {
			Card_content($$renderer, {
				class: "p-6",
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex items-start justify-between"><div class="flex-1"><p class="mb-2 text-sm font-medium text-muted-foreground">${escape_html(title)}</p> <p class="mb-2 text-3xl font-bold text-card-foreground">${escape_html(value)} <span class="text-2xl!">${escape_html(measure)}</span></p> `);
					if (description) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<p class="text-xs text-muted-foreground">${escape_html(description)}</p>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div> <div class="shrink-0 rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">`);
					icon($$renderer);
					$$renderer.push(`<!----></div></div>`);
				},
				$$slots: { default: true }
			});
		},
		$$slots: { default: true }
	});
}

export { Stat_card as S };
//# sourceMappingURL=stat-card.js-C3vQss_o.js.map
