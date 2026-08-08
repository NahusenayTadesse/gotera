import { a0 as head, a4 as ensure_array_like, a9 as escape_html } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { A as Arrow_right } from '../../../../chunks/arrow-right.js-DitxXWBo.js';
import { G as Gift, U as User_x } from '../../../../chunks/user-x.js-DDDy3Lp5.js';
import { R as Refresh_cw } from '../../../../chunks/refresh-cw.js-CGUVrsXQ.js';
import { B as Button } from '../../../../chunks/button.js-DMlVoc1I.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../chunks/card.js-DgfKxiLl.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../chunks/utils2.js-BChetszu.js';

//#region src/routes/dashboard/orders/+page.svelte
function _page($$renderer) {
	const sections = [
		{
			title: "Subscriptions",
			description: "Recurring boxes — status, plan, quantity and cancellation.",
			href: "/dashboard/orders/subscriptions",
			icon: Refresh_cw
		},
		{
			title: "One-Time & Gift Orders",
			description: "Single purchases and gift boxes placed by signed-in customers.",
			href: "/dashboard/orders/one-time",
			icon: Gift
		},
		{
			title: "Guest Orders",
			description: "One-off purchases placed without an account.",
			href: "/dashboard/orders/guest",
			icon: User_x
		}
	];
	head("1qfucsh", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Orders</title>`);
		});
	});
	$$renderer.push(`<h1 class="dash-heading mb-6 text-2xl font-semibold">Orders</h1> <div class="grid gap-6 md:grid-cols-3"><!--[-->`);
	const each_array = ensure_array_like(sections);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let section = each_array[$$index];
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "flex flex-col justify-between",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (section.icon) {
									$$renderer.push("<!--[-->");
									section.icon($$renderer, { class: "mb-2 size-6 text-primary" });
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(` `);
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(section.title)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(` `);
								if (Card_description) {
									$$renderer.push("<!--[-->");
									Card_description($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(section.description)}`);
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
					$$renderer.push(` `);
					if (Card_content) {
						$$renderer.push("<!--[-->");
						Card_content($$renderer, {
							children: ($$renderer) => {
								Button($$renderer, {
									href: section.href,
									variant: "outline",
									class: "w-full",
									children: ($$renderer) => {
										$$renderer.push(`<!---->View ${escape_html(section.title)} `);
										Arrow_right($$renderer, { class: "size-4" });
										$$renderer.push(`<!---->`);
									},
									$$slots: { default: true }
								});
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
	}
	$$renderer.push(`<!--]--></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CmqqHpgH.js.map
