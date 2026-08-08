import { a0 as head, a4 as ensure_array_like, T as derived, a9 as escape_html, a6 as spread_props } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { I as Icon } from '../../../../chunks/Icon.js-C-2f-rrd.js';
import { A as Arrow_right } from '../../../../chunks/arrow-right.js-DitxXWBo.js';
import { G as Gift, U as User_x } from '../../../../chunks/user-x.js-DDDy3Lp5.js';
import { R as Refresh_cw } from '../../../../chunks/refresh-cw.js-CGUVrsXQ.js';
import { T as Truck } from '../../../../chunks/truck.js-rfGMc_Yv.js';
import { U as Users } from '../../../../chunks/users.js-B8RRgRJn.js';
import { B as Button } from '../../../../chunks/button.js-DMlVoc1I.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../chunks/card.js-DgfKxiLl.js';
import { S as Stat_card } from '../../../../chunks/stat-card.js-C3vQss_o.js';
import { f as formatGBP } from '../../../../chunks/format.js-D8oyWA_y.js';
import { D as DateRangeFilter, C as ChartCanvas, c as colorAt, a as colorList } from '../../../../chunks/chartPalette.js-zIUoNTY2.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/utils2.js-BChetszu.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/label.js-FcotYhKU.js';
import '../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../chunks/input.js-BYtfwuM9.js';
import '../../../../chunks/reports.js-YS7wm2Ph.js';

//#region node_modules/@lucide/svelte/dist/icons/wallet.svelte
function Wallet($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "wallet" },
		props,
		{ iconNode: [["path", { "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }], ["path", { "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]] }
	]));
}
//#endregion
//#region src/routes/dashboard/reports/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const query = derived(() => `?preset=${data.preset}&from=${data.from}&to=${data.to}`);
		const sections = derived(() => [
			{
				title: "Subscriptions",
				description: "New subscriptions, status breakdown and growth.",
				href: `/dashboard/reports/subscriptions${query()}`,
				icon: Refresh_cw
			},
			{
				title: "Deliveries",
				description: "Delivery volume and fulfilment status.",
				href: `/dashboard/reports/deliveries${query()}`,
				icon: Truck
			},
			{
				title: "Orders",
				description: "One-time, gift and guest order activity.",
				href: `/dashboard/reports/orders${query()}`,
				icon: Gift
			}
		]);
		const growthData = derived(() => ({
			labels: data.charts.growth.labels,
			datasets: [{
				type: "bar",
				label: "New Subscriptions",
				data: data.charts.growth.newSubscriptions,
				backgroundColor: colorAt(0),
				borderRadius: 6,
				yAxisID: "y"
			}, {
				type: "line",
				label: "MRR Added (£)",
				data: data.charts.growth.mrrAdded.map((p) => p / 100),
				borderColor: colorAt(1).slice(0, 7),
				backgroundColor: "transparent",
				tension: .35,
				yAxisID: "y1"
			}]
		}));
		const growthOptions = {
			};
		const mrrByPlanData = derived(() => ({
			labels: data.charts.mrrByPlan.labels,
			datasets: [{
				data: data.charts.mrrByPlan.values.map((p) => p / 100),
				backgroundColor: colorList(data.charts.mrrByPlan.labels.length),
				borderWidth: 2,
				borderColor: colorList(data.charts.mrrByPlan.labels.length, "")
			}]
		}));
		const mrrByPlanOptions = { };
		const acquisitionData = derived(() => ({
			labels: data.charts.acquisition.labels,
			datasets: [{
				label: "Opted in",
				data: data.charts.acquisition.optedIn,
				backgroundColor: colorAt(3),
				borderRadius: 4
			}, {
				label: "Opted out",
				data: data.charts.acquisition.optedOut,
				backgroundColor: colorAt(4),
				borderRadius: 4
			}]
		}));
		const acquisitionOptions = { };
		const referralData = derived(() => ({
			labels: [
				"Pending",
				"Subscribed",
				"Credited"
			],
			datasets: [{
				label: "Referrals",
				data: [
					data.charts.referrals.pending,
					data.charts.referrals.subscribed,
					data.charts.referrals.credited
				],
				backgroundColor: colorList(3),
				borderRadius: 6
			}]
		}));
		const referralOptions = {
			};
		const channelData = derived(() => ({
			labels: ["One-Time & Gift", "Guest"],
			datasets: [{
				data: [data.charts.orderChannels.gift, data.charts.orderChannels.guest],
				backgroundColor: colorList(2)
			}]
		}));
		const deliveryHealthData = derived(() => ({
			labels: ["Healthy", "Needs attention"],
			datasets: [{
				data: [data.charts.deliveryHealth.healthy, data.charts.deliveryHealth.issues],
				backgroundColor: [colorAt(3), colorAt(4)]
			}]
		}));
		head("vge787", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Reports</title>`);
			});
		});
		$$renderer.push(`<h1 class="dash-heading mb-6 text-2xl font-semibold">Reports</h1> `);
		DateRangeFilter($$renderer, {
			preset: data.preset,
			from: data.from,
			to: data.to
		});
		$$renderer.push(`<!----> <div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">`);
		{
			function icon($$renderer) {
				Wallet($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Current MRR",
				value: formatGBP(data.stats.currentMRR),
				description: "Active subscriptions, now",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Users($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "New Customers",
				value: data.stats.newCustomers,
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Refresh_cw($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "New Subscriptions",
				value: data.stats.newSubscriptions,
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Truck($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Deliveries Completed",
				value: data.stats.deliveriesCompleted,
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Gift($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "One-Time Orders Paid",
				value: data.stats.oneTimeOrdersPaid,
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				User_x($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Guest Orders Paid",
				value: data.stats.guestOrdersPaid,
				description: "In range",
				icon});
		}
		$$renderer.push(`<!----></div> <h2 class="mb-4 text-lg font-medium">Business flow</h2> <div class="mb-10 grid gap-6 lg:grid-cols-3">`);
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
											$$renderer.push(`<!---->Growth — new subscriptions &amp; MRR added`);
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
											$$renderer.push(`<!---->Where new business is coming from, over time`);
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
									data: growthData(),
									options: growthOptions,
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
											$$renderer.push(`<!---->MRR by plan`);
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
											$$renderer.push(`<!---->Where recurring revenue comes from, right now`);
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
									type: "doughnut",
									data: mrrByPlanData(),
									options: mrrByPlanOptions,
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
											$$renderer.push(`<!---->Customer acquisition`);
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
											$$renderer.push(`<!---->New customers, split by marketing opt-in — for the marketing team`);
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
									data: acquisitionData(),
									options: acquisitionOptions,
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
											$$renderer.push(`<!---->Referral funnel`);
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
											$$renderer.push(`<!---->Pending → subscribed → credited`);
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
									data: referralData(),
									options: referralOptions,
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
											$$renderer.push(`<!---->Order channel mix`);
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
											$$renderer.push(`<!---->One-time/gift vs guest checkout`);
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
									type: "pie",
									data: channelData(),
									height: "260px"
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
											$$renderer.push(`<!---->Delivery health`);
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
											$$renderer.push(`<!---->Skipped / failed vs everything else`);
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
									type: "doughnut",
									data: deliveryHealthData(),
									height: "260px"
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
		$$renderer.push(`</div> <h2 class="mb-4 text-lg font-medium">Drill down</h2> <div class="grid gap-6 md:grid-cols-3"><!--[-->`);
		const each_array = ensure_array_like(sections());
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
											$$renderer.push(`<!---->View ${escape_html(section.title)} Report `);
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
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-BSU7GGCv.js.map
