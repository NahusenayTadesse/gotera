import { a0 as head, aa as attr_class, a9 as escape_html, a4 as ensure_array_like, $ as attr, a6 as spread_props } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { I as Icon } from '../../../../chunks/Icon.js-C-2f-rrd.js';
import { A as Arrow_right } from '../../../../chunks/arrow-right.js-DitxXWBo.js';
import { U as Users } from '../../../../chunks/users.js-B8RRgRJn.js';
import '../../../../chunks/button.js-DMlVoc1I.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../chunks/card.js-DgfKxiLl.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/utils2.js-BChetszu.js';

//#region node_modules/@lucide/svelte/dist/icons/building-2.svelte
function Building_2($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "building-2" },
		props,
		{ iconNode: [
			["path", { "d": "M10 12h4" }],
			["path", { "d": "M10 8h4" }],
			["path", { "d": "M14 21v-3a2 2 0 0 0-4 0v3" }],
			["path", { "d": "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" }],
			["path", { "d": "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/map-pin.svelte
function Map_pin($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "map-pin" },
		props,
		{ iconNode: [["path", { "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", {
			"cx": "12",
			"cy": "10",
			"r": "3"
		}]] }
	]));
}
//#endregion
//#region src/lib/components/AdminCard.svelte
function AdminCard($$renderer, $$props) {
	const { title, description, icon, items, accentColor } = $$props;
	const IconComponent = {
		MapPin: Map_pin,
		Building2: Building_2,
		Users
	}[icon];
	Card($$renderer, {
		class: "group relative overflow-hidden border-border shadow-none transition-colors duration-300 hover:border-primary/40",
		children: ($$renderer) => {
			$$renderer.push(`<div${attr_class(`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`)}></div> <div class="relative">`);
			Card_header($$renderer, {
				class: "pb-4",
				children: ($$renderer) => {
					$$renderer.push(`<div class="flex items-start justify-between gap-3"><div class="min-w-0 flex-1">`);
					Card_title($$renderer, {
						class: "mb-2 text-lg sm:text-xl",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(title)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Card_description($$renderer, {
						class: "text-sm",
						children: ($$renderer) => {
							$$renderer.push(`<!---->${escape_html(description)}`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div> <div class="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:p-3">`);
					IconComponent($$renderer, { class: "size-6" });
					$$renderer.push(`<!----></div></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Card_content($$renderer, {
				class: "flex flex-col gap-2",
				children: ($$renderer) => {
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(items);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let item = each_array[$$index];
						$$renderer.push(`<a${attr("href", item.href)} class="group/link flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-primary/10 active:bg-primary/15 sm:px-4"><span class="font-medium text-foreground/80 group-hover/link:text-foreground">${escape_html(item.name)}</span> `);
						Arrow_right($$renderer, { class: "size-4 shrink-0 text-muted-foreground opacity-60 transition-all duration-200\n					 group-hover/link:translate-x-1 group-hover/link:opacity-100 sm:opacity-0" });
						$$renderer.push(`<!----></a>`);
					}
					$$renderer.push(`<!--]-->`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> <div class="pointer-events-none absolute inset-0 rounded-lg border border-primary/0 transition-colors duration-300 group-hover:border-primary/20"></div>`);
		},
		$$slots: { default: true }
	});
}
//#endregion
//#region src/routes/dashboard/admin-panel/+page.svelte
function _page($$renderer) {
	let userManagement = [{
		name: "Users",
		href: "/dashboard/admin-panel/users"
	}, {
		name: "Roles",
		href: "/dashboard/admin-panel/roles"
	}];
	head("au7ei8", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Admin Panel</title>`);
		});
	});
	$$renderer.push(`<div class="mx-auto w-full max-w-7xl min-w-0 px-0 py-6 text-foreground sm:px-6 sm:py-12"><div class="mb-8 flex flex-col gap-3 sm:mb-16 sm:gap-4"><span class="dash-eyebrow">Administration</span> <h2 class="dash-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl">Welcome to Admin Dashboard</h2> <p class="max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">Manage who can sign in to the dashboard and what each role is allowed to do.</p></div> <div class="grid gap-4 sm:gap-8 md:grid-cols-2">`);
	AdminCard($$renderer, {
		title: "User Management",
		description: "Control users and their assigned roles",
		icon: "Users",
		items: userManagement,
		accentColor: "from-primary/15 to-primary/5"
	});
	$$renderer.push(`<!----></div></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BNi3gQoe.js.map
