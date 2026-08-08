import { a9 as escape_html, a2 as attributes, ab as stringify$1 } from './server.js-CPNQ0GBv.js';
import { T as Tooltip_provider, a as Tooltip, b as Tooltip_trigger, c as Tooltip_content } from './tooltip.js-e17nlGw5.js';
import { b as buttonVariants } from './button.js-DMlVoc1I.js';

//#region src/lib/components/Table/data-table-links.svelte
function Data_table_links($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id, name, link, target = "" } = $$props;
		if (Tooltip_provider) {
			$$renderer.push("<!--[-->");
			Tooltip_provider($$renderer, {
				children: ($$renderer) => {
					if (Tooltip) {
						$$renderer.push("<!--[-->");
						Tooltip($$renderer, {
							children: ($$renderer) => {
								{
									function child($$renderer, { props }) {
										$$renderer.push(`<a${attributes({
											href: `${stringify$1(link)}/${stringify$1(id)}`,
											target,
											...props,
											class: "wrap-break-words flex flex-row items-start! justify-start! capitalize transition-all duration-600 ease-in-out hover:scale-110"
										})}>${escape_html(name)}</a>`);
									}
									if (Tooltip_trigger) {
										$$renderer.push("<!--[-->");
										Tooltip_trigger($$renderer, {
											class: buttonVariants({ variant: "ghost" }),
											child,
											$$slots: { child: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								}
								$$renderer.push(` `);
								if (Tooltip_content) {
									$$renderer.push("<!--[-->");
									Tooltip_content($$renderer, {
										class: "left-0 justify-self-start",
										children: ($$renderer) => {
											$$renderer.push(`<p class="text-[13px]!">See ${escape_html(name)}'s page</p>`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							},
							$$slots: { default: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				},
				$$slots: { default: true }
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
	});
}

export { Data_table_links as D };
//# sourceMappingURL=data-table-links.js-CUJ5Vozb.js.map
