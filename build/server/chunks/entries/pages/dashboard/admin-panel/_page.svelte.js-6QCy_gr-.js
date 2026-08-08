import { a6 as spread_props, aa as attr_class, a4 as ensure_array_like, $ as attr, a9 as escape_html } from '../../../../chunks/server.js-CPNQ0GBv.js';
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
					$$renderer.push(`<div class="flex items-start justify-between"><div class="flex-1">`);
					Card_title($$renderer, {
						class: "mb-2 text-xl",
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
					$$renderer.push(`<!----></div> <div class="ml-4 rounded-lg bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">`);
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
						$$renderer.push(`<a${attr("href", item.href)} class="group/link flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 hover:bg-primary/10"><span class="font-medium text-foreground/80 group-hover/link:text-foreground">${escape_html(item.name)}</span> `);
						Arrow_right($$renderer, { class: "size-4 text-muted-foreground opacity-0 transition-all duration-200\n					 group-hover/link:translate-x-1 group-hover/link:opacity-100" });
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
	let catalogue = [{
		name: "Add-ons",
		href: "/dashboard/admin-panel/addons"
	}];
	$$renderer.push(`<svele:head><title>Admin Panel</title></svele:head> <div class="min-h-dvh w-full text-foreground transition-colors duration-300"><main class="mx-auto max-w-7xl px-6 py-12"><div class="mb-16 flex flex-col gap-4"><span class="dash-eyebrow">Administration</span> <h2 class="dash-heading text-4xl font-semibold tracking-tight">Welcome to Admin Dashboard</h2> <p class="max-w-2xl text-lg text-muted-foreground">Manage locations, organizational structure, and user access. Select a category below to get
				started.</p></div> <div class="grid gap-8 md:grid-cols-3">`);
	AdminCard($$renderer, {
		title: "User Management",
		description: "Control users and their assigned roles",
		icon: "Users",
		items: userManagement,
		accentColor: "from-primary/15 to-primary/5"
	});
	$$renderer.push(`<!----> `);
	AdminCard($$renderer, {
		title: "Catalogue",
		description: "Manage add-ons and their prices",
		icon: "Building2",
		items: catalogue,
		accentColor: "from-primary/15 to-primary/5"
	});
	$$renderer.push(`<!----></div></main> <footer class="mt-16 border-t border-border bg-card/50 py-8"><div class="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground"><p>© 2024 Admin Panel. All rights reserved.</p></div></footer></div>`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-6QCy_gr-.js.map
