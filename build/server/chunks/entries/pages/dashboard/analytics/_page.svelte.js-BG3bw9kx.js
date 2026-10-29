import { a0 as head, a4 as ensure_array_like, a6 as escape_html, ac as attr_style, T as derived, a7 as spread_props } from '../../../../chunks/server.js-qDPizQqb.js';
import { I as Icon } from '../../../../chunks/Icon.js-Dm6aSBgb.js';
import { A as Activity } from '../../../../chunks/activity.js-DMIkPBp9.js';
import { E as Eye } from '../../../../chunks/eye.js-BLnu78mV.js';
import { H as Handshake } from '../../../../chunks/handshake.js-DJ3monHN.js';
import { R as Refresh_cw } from '../../../../chunks/refresh-cw.js-BQ0xAi4S.js';
import { S as Shopping_bag } from '../../../../chunks/shopping-bag.js-CxqJVcdt.js';
import { U as User_plus } from '../../../../chunks/user-plus.js-B0r8VIFk.js';
import { U as Users } from '../../../../chunks/users.js-CmaohYfx.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../chunks/card.js-CLGpEPTV.js';
import { S as Stat_card } from '../../../../chunks/stat-card.js-C0q0Pjis.js';
import { D as DateRangeFilter, C as ChartCanvas, c as colorAt, a as colorList } from '../../../../chunks/chartPalette.js-Dur3IEhH.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../chunks/input.js-DivymZKU.js';
import '../../../../chunks/reports.js-YS7wm2Ph.js';

//#region node_modules/@lucide/svelte/dist/icons/percent.svelte
function Percent($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "percent" },
		props,
		{ iconNode: [
			["line", {
				"x1": "19",
				"x2": "5",
				"y1": "5",
				"y2": "19"
			}],
			["circle", {
				"cx": "6.5",
				"cy": "6.5",
				"r": "2.5"
			}],
			["circle", {
				"cx": "17.5",
				"cy": "17.5",
				"r": "2.5"
			}]
		] }
	]));
}
//#endregion
//#region src/routes/dashboard/analytics/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const number = (n) => n.toLocaleString("en-GB");
		const percent = (n) => `${(n * 100).toFixed(1)}%`;
		const pageLabel = (path) => path === "/" ? "Home" : path;
		const dayLabel = (d) => new Date(d).toLocaleDateString("en-GB", {
			weekday: "short",
			day: "numeric",
			month: "short"
		});
		const trafficData = derived(() => ({
			labels: data.charts.traffic.labels,
			datasets: [{
				type: "bar",
				label: "Visitors",
				data: data.charts.traffic.visitors,
				backgroundColor: colorAt(0),
				borderRadius: 6
			}, {
				type: "line",
				label: "Page views",
				data: data.charts.traffic.views,
				borderColor: colorAt(1).slice(0, 7),
				backgroundColor: "transparent",
				tension: .35
			}]
		}));
		const countOptions = {
			};
		const conversionData = derived(() => ({
			labels: data.charts.conversions.labels,
			datasets: [
				{
					label: "Sign-ups",
					data: data.charts.conversions.signups,
					backgroundColor: colorAt(2),
					borderRadius: 4
				},
				{
					label: "Subscriptions",
					data: data.charts.conversions.subscriptions,
					backgroundColor: colorAt(3),
					borderRadius: 4
				},
				{
					label: "One-off orders",
					data: data.charts.conversions.orders,
					backgroundColor: colorAt(5),
					borderRadius: 4
				}
			]
		}));
		const deviceData = derived(() => ({
			labels: data.charts.devices.labels.map((d) => d[0].toUpperCase() + d.slice(1)),
			datasets: [{
				data: data.charts.devices.values,
				backgroundColor: colorList(data.charts.devices.labels.length),
				borderWidth: 2,
				borderColor: colorList(data.charts.devices.labels.length, "")
			}]
		}));
		const deviceOptions = { };
		const funnelSteps = derived(() => [
			{
				label: "Visitors",
				value: data.funnel.visitors
			},
			{
				label: "Viewed the subscribe page",
				value: data.funnel.subscribePage
			},
			{
				label: "Signed up",
				value: data.funnel.signups
			},
			{
				label: "Subscribed",
				value: data.funnel.subscriptions
			}
		]);
		const maxPageViews = derived(() => Math.max(1, ...data.topPages.map((p) => p.views)));
		head("1d0h3tk", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Analytics</title>`);
			});
		});
		$$renderer.push(`<h1 class="dash-heading mb-2 text-2xl font-semibold">Analytics</h1> <p class="mb-6 text-sm text-muted-foreground">Who's visiting the site and what they do. Admin visits and bots aren't counted; a visitor is one
	person on one day.</p> <div class="mb-6 grid gap-4 sm:grid-cols-2">`);
		{
			function icon($$renderer) {
				Activity($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Visitors today",
				value: number(data.stats.visitorsToday),
				description: "Unique people so far today",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Eye($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Page views today",
				value: number(data.stats.viewsToday),
				description: "Every page opened today",
				icon});
		}
		$$renderer.push(`<!----></div> `);
		DateRangeFilter($$renderer, {
			preset: data.preset,
			from: data.from,
			to: data.to
		});
		$$renderer.push(`<!----> <div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
		{
			function icon($$renderer) {
				Users($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Visitors",
				value: number(data.stats.visitors),
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Eye($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Page views",
				value: number(data.stats.views),
				description: `${data.stats.viewsPerVisitor.toFixed(1)} per visitor`,
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				User_plus($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Sign-ups",
				value: number(data.stats.signups),
				description: "New accounts",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Refresh_cw($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "New subscriptions",
				value: number(data.stats.subscriptions),
				description: "Plans started",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Shopping_bag($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "One-off orders",
				value: number(data.stats.orders),
				description: "Guest & gift orders paid",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Handshake($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Partner applications",
				value: number(data.stats.applications),
				description: "Partners & suppliers",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Percent($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Conversion rate",
				value: data.stats.conversionRate > 1 ? "—" : percent(data.stats.conversionRate),
				description: data.stats.conversionRate > 1 ? "Not enough visit data yet — tracking is new" : "Visitors who subscribed or ordered",
				className: "sm:col-span-2",
				icon});
		}
		$$renderer.push(`<!----></div> <div class="mb-10 grid gap-6 lg:grid-cols-3">`);
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "lg:col-span-2",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Visitors per day`);
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
											$$renderer.push(`<!---->Unique visitors (bars) and total page views (line)`);
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
								ChartCanvas($$renderer, {
									type: "bar",
									data: trafficData(),
									options: countOptions,
									height: "320px"
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
		$$renderer.push(` `);
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Devices`);
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
											$$renderer.push(`<!---->What visitors browse on`);
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
								if (data.charts.devices.values.length) {
									$$renderer.push("<!--[0-->");
									ChartCanvas($$renderer, {
										type: "doughnut",
										data: deviceData(),
										options: deviceOptions,
										height: "320px"
									});
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>`);
								}
								$$renderer.push(`<!--]-->`);
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
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "lg:col-span-2",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Sign-ups, subscriptions &amp; orders`);
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
											$$renderer.push(`<!---->What visitors went on to do, over time`);
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
								ChartCanvas($$renderer, {
									type: "bar",
									data: conversionData(),
									options: countOptions,
									height: "280px"
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
		$$renderer.push(` `);
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Funnel`);
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
											$$renderer.push(`<!---->From first visit to a live plan`);
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
							class: "space-y-4",
							children: ($$renderer) => {
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(funnelSteps());
								for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
									let step = each_array[$$index];
									$$renderer.push(`<div><div class="mb-1 flex justify-between text-sm"><span>${escape_html(step.label)}</span> <span class="font-semibold tabular-nums">${escape_html(number(step.value))}</span></div> <div class="h-2 rounded-full bg-muted"><div class="h-2 rounded-full bg-primary"${attr_style("", { width: `${data.funnel.visitors ? Math.min(100, step.value / data.funnel.visitors * 100) : 0}%` })}></div></div></div>`);
								}
								$$renderer.push(`<!--]-->`);
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
		$$renderer.push(`</div> <div class="mb-10 grid gap-6 lg:grid-cols-3">`);
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "lg:col-span-2",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Most visited pages`);
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
											$$renderer.push(`<!---->Top 15 pages by views in this range`);
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
								if (data.topPages.length) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<table class="w-full text-sm"><thead><tr class="border-b text-left text-muted-foreground"><th class="py-2 font-medium">Page</th><th class="py-2 text-right font-medium">Visitors</th><th class="py-2 text-right font-medium">Views</th></tr></thead><tbody><!--[-->`);
									const each_array_1 = ensure_array_like(data.topPages);
									for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
										let p = each_array_1[$$index_1];
										$$renderer.push(`<tr class="border-b last:border-0"><td class="py-2"><div class="truncate font-medium">${escape_html(pageLabel(p.path))}</div> <div class="mt-1 h-1 rounded-full bg-muted"><div class="h-1 rounded-full bg-primary/60"${attr_style("", { width: `${p.views / maxPageViews() * 100}%` })}></div></div></td><td class="py-2 text-right tabular-nums">${escape_html(number(p.visitors))}</td><td class="py-2 text-right tabular-nums">${escape_html(number(p.views))}</td></tr>`);
									}
									$$renderer.push(`<!--]--></tbody></table>`);
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>`);
								}
								$$renderer.push(`<!--]-->`);
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
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Where visitors come from`);
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
											$$renderer.push(`<!---->Other sites that linked here`);
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
								if (data.referrers.length) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<ul class="divide-y text-sm"><!--[-->`);
									const each_array_2 = ensure_array_like(data.referrers);
									for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
										let r = each_array_2[$$index_2];
										$$renderer.push(`<li class="flex justify-between py-2"><span class="truncate">${escape_html(r.referrer)}</span> <span class="tabular-nums">${escape_html(number(r.visitors))}</span></li>`);
									}
									$$renderer.push(`<!--]--></ul>`);
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`<p class="py-10 text-center text-sm text-muted-foreground">No referrals yet — everyone typed the address or came from a bookmark.</p>`);
								}
								$$renderer.push(`<!--]-->`);
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
		$$renderer.push(`</div> `);
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Day by day`);
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
											$$renderer.push(`<!---->Visitors and page views for each day in the range`);
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
								if (data.daily.length) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<div class="max-h-96 overflow-y-auto"><table class="w-full text-sm"><thead class="sticky top-0 bg-card"><tr class="border-b text-left text-muted-foreground"><th class="py-2 font-medium">Day</th><th class="py-2 text-right font-medium">Visitors</th><th class="py-2 text-right font-medium">Page views</th></tr></thead><tbody><!--[-->`);
									const each_array_3 = ensure_array_like(data.daily);
									for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
										let d = each_array_3[$$index_3];
										$$renderer.push(`<tr class="border-b last:border-0"><td class="py-2">${escape_html(dayLabel(d.date))}</td><td class="py-2 text-right tabular-nums">${escape_html(number(d.visitors))}</td><td class="py-2 text-right tabular-nums">${escape_html(number(d.views))}</td></tr>`);
									}
									$$renderer.push(`<!--]--></tbody></table></div>`);
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`<p class="py-10 text-center text-sm text-muted-foreground">No visits in this range yet.</p>`);
								}
								$$renderer.push(`<!--]-->`);
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

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BG3bw9kx.js.map
