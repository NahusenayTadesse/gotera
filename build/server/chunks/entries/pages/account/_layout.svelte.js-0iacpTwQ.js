import { a9 as escape_html, aa as attr_class, $ as attr, a4 as ensure_array_like, a1 as html, T as derived } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import { p as page } from '../../../chunks/state.js-BDNoTQbo.js';
import { L as Log_out } from '../../../chunks/log-out.js-D_UjN7zq.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/client.js-7a-rpZlk.js';
import '../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/lib/paraglide/messages/account_sidebar_overview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_OverviewInputs */
var en_account_sidebar_overview = () => {
	return `Overview`;
};
var am_account_sidebar_overview = () => {
	return `አጠቃላይ እይታ`;
};
/**
* | output |
* | --- |
* | "Overview" |
*
* @param {Account_Sidebar_OverviewInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_overview = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_overview();
	return en_account_sidebar_overview();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_next_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Next_DeliveryInputs */
var en_account_sidebar_next_delivery = () => {
	return `Next Delivery`;
};
var am_account_sidebar_next_delivery = () => {
	return `ቀጣይ ማድረሻ`;
};
/**
* | output |
* | --- |
* | "Next Delivery" |
*
* @param {Account_Sidebar_Next_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_next_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_next_delivery();
	return en_account_sidebar_next_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_order_history.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Order_HistoryInputs */
var en_account_sidebar_order_history = () => {
	return `Order History`;
};
var am_account_sidebar_order_history = () => {
	return `የትዕዛዝ ታሪክ`;
};
/**
* | output |
* | --- |
* | "Order History" |
*
* @param {Account_Sidebar_Order_HistoryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_order_history = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_order_history();
	return en_account_sidebar_order_history();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_your_details.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Your_DetailsInputs */
var en_account_sidebar_your_details = () => {
	return `Your Details`;
};
var am_account_sidebar_your_details = () => {
	return `የእርስዎ መረጃ`;
};
/**
* | output |
* | --- |
* | "Your Details" |
*
* @param {Account_Sidebar_Your_DetailsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_your_details = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_your_details();
	return en_account_sidebar_your_details();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_change_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Change_PlanInputs */
var en_account_sidebar_change_plan = () => {
	return `Change Plan`;
};
var am_account_sidebar_change_plan = () => {
	return `ዕቅድ ይቀይሩ`;
};
/**
* | output |
* | --- |
* | "Change Plan" |
*
* @param {Account_Sidebar_Change_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_change_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_change_plan();
	return en_account_sidebar_change_plan();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_menu.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_MenuInputs */
var en_account_sidebar_menu = () => {
	return `Menu`;
};
var am_account_sidebar_menu = () => {
	return `ምናሌ`;
};
/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Account_Sidebar_MenuInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_menu = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_menu();
	return en_account_sidebar_menu();
});
//#endregion
//#region src/lib/paraglide/messages/account_greeting_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Greeting_EyebrowInputs */
var en_account_greeting_eyebrow = () => {
	return `My Account`;
};
var am_account_greeting_eyebrow = () => {
	return `የእኔ መለያ`;
};
/**
* | output |
* | --- |
* | "My Account" |
*
* @param {Account_Greeting_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_greeting_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_greeting_eyebrow();
	return en_account_greeting_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/account_greeting_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Account_Greeting_HeadingInputs */
var en_account_greeting_heading = (i) => {
	return `Good to see you, ${i?.name}.`;
};
var am_account_greeting_heading = (i) => {
	return `እንኳን ደህና መጡ፣ ${i?.name}።`;
};
/**
* | output |
* | --- |
* | "Good to see you, {name}." |
*
* @param {Account_Greeting_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_greeting_heading = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_greeting_heading(inputs);
	return en_account_greeting_heading(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/account_next_delivery_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Next_Delivery_LabelInputs */
var en_account_next_delivery_label = () => {
	return `Next delivery`;
};
var am_account_next_delivery_label = () => {
	return `ቀጣይ ማድረሻ`;
};
/**
* | output |
* | --- |
* | "Next delivery" |
*
* @param {Account_Next_Delivery_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_next_delivery_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_next_delivery_label();
	return en_account_next_delivery_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_next_payment_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Next_Payment_LabelInputs */
var en_account_next_payment_label = () => {
	return `Next payment`;
};
var am_account_next_payment_label = () => {
	return `ቀጣይ ክፍያ`;
};
/**
* | output |
* | --- |
* | "Next payment" |
*
* @param {Account_Next_Payment_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_next_payment_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_next_payment_label();
	return en_account_next_payment_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_manage_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Manage_LabelInputs */
var en_account_sidebar_manage_label = () => {
	return `Manage`;
};
var am_account_sidebar_manage_label = () => {
	return `ማስተዳደር`;
};
/**
* | output |
* | --- |
* | "Manage" |
*
* @param {Account_Sidebar_Manage_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_manage_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_manage_label();
	return en_account_sidebar_manage_label();
});
//#endregion
//#region src/lib/paraglide/messages/account_sidebar_subscription_label.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Account_Sidebar_Subscription_LabelInputs */
var en_account_sidebar_subscription_label = () => {
	return `Subscription`;
};
var am_account_sidebar_subscription_label = () => {
	return `ምዝገባ`;
};
/**
* | output |
* | --- |
* | "Subscription" |
*
* @param {Account_Sidebar_Subscription_LabelInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var account_sidebar_subscription_label = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_account_sidebar_subscription_label();
	return en_account_sidebar_subscription_label();
});
//#endregion
//#region src/lib/paraglide/messages/logoutform_logout.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Logoutform_LogoutInputs */
var en_logoutform_logout = () => {
	return `Logout`;
};
var am_logoutform_logout = () => {
	return `ውጣ`;
};
/**
* | output |
* | --- |
* | "Logout" |
*
* @param {Logoutform_LogoutInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var logoutform_logout = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_logoutform_logout();
	return en_logoutform_logout();
});
//#endregion
//#region src/lib/forms/Logout.svelte
function Logout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<button type="button" class="logout-trigger svelte-17sfro5">`);
		Log_out($$renderer, { size: 16 });
		$$renderer.push(`<!----> ${escape_html(logoutform_logout())}</button> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/account/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		let menuOpen = false;
		const managementLinks = derived(() => [
			{
				href: "/account",
				label: account_sidebar_overview(),
				iconPath: "<rect x=\"1\" y=\"1\" width=\"14\" height=\"14\" rx=\"1\"/><path d=\"M1 6h14M6 6v9\"/>"
			},
			{
				href: "/account/delivery",
				label: account_sidebar_next_delivery(),
				iconPath: "<path d=\"M8 2v5l3 2\"/><circle cx=\"8\" cy=\"8\" r=\"6.5\"/>"
			},
			{
				href: "/account/history",
				label: account_sidebar_order_history(),
				iconPath: "<path d=\"M2 4h12M2 8h8M2 12h5\"/>"
			},
			{
				href: "/account/details",
				label: account_sidebar_your_details(),
				iconPath: "<circle cx=\"8\" cy=\"5\" r=\"3\"/><path d=\"M1.5 14c0-3 3-5.5 6.5-5.5s6.5 2.5 6.5 5.5\"/>"
			}
		]);
		const subscriptionLinks = derived(() => [{
			href: "/account/change-plan",
			label: account_sidebar_change_plan(),
			iconPath: "<rect x=\"2\" y=\"3\" width=\"12\" height=\"10\" rx=\"1\"/><path d=\"M5 3V1.5M11 3V1.5M2 7h12\"/>"
		}]);
		let currentPath = derived(() => page.url.pathname);
		const activeLabel = derived(() => [...managementLinks(), ...subscriptionLinks()].find((l) => l.href === currentPath())?.label ?? account_sidebar_menu());
		const paymentLabel = derived(() => data.summary ? data.summary.nextPaymentDate ? `${data.summary.nextPaymentAmount} · ${data.summary.nextPaymentDate}` : data.summary.nextPaymentAmount : "");
		$$renderer.push(`<div class="page-header svelte-1bm518h"><div class="container svelte-1bm518h"><div class="page-header-inner svelte-1bm518h"><div><span class="greeting svelte-1bm518h">${escape_html(account_greeting_eyebrow())}</span> <h1 class="svelte-1bm518h">${escape_html(account_greeting_heading({ name: data.firstName }))}</h1> `);
		if (data.summary) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="header-meta svelte-1bm518h"><span class="header-meta-item svelte-1bm518h"><strong class="svelte-1bm518h">${escape_html(data.summary.planLabel)}</strong>${escape_html(data.summary.packsLabel)}</span> `);
			if (data.summary.nextDeliveryLabel) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="header-meta-item svelte-1bm518h"><strong class="svelte-1bm518h">${escape_html(account_next_delivery_label())}</strong>${escape_html(data.summary.nextDeliveryLabel)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <span class="header-meta-item svelte-1bm518h"><strong class="svelte-1bm518h">${escape_html(account_next_payment_label())}</strong>${escape_html(paymentLabel())}</span></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (data.summary) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="status-pill svelte-1bm518h"><span class="status-dot svelte-1bm518h"></span>${escape_html(data.summary.statusLabel)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></div> <div class="container svelte-1bm518h"><button type="button"${attr_class("menu-toggle svelte-1bm518h", void 0, { "open": menuOpen })}${attr("aria-expanded", menuOpen)} aria-controls="account-nav"><svg class="menu-toggle-icon svelte-1bm518h" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<path d="M2 4.5h12M2 8h12M2 11.5h12"></path>`);
		$$renderer.push(`<!--]--></svg> <span class="menu-toggle-label svelte-1bm518h">${escape_html(activeLabel())}</span> <svg class="menu-toggle-chevron svelte-1bm518h" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"></path></svg></button> <div class="layout svelte-1bm518h"><aside id="account-nav"${attr_class("sidebar svelte-1bm518h", void 0, { "open": menuOpen })}><div class="sidebar-section svelte-1bm518h"><span class="sidebar-label svelte-1bm518h">${escape_html(account_sidebar_manage_label())}</span> <nav class="sidebar-nav svelte-1bm518h"><!--[-->`);
		const each_array = ensure_array_like(managementLinks());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let link = each_array[$$index];
			$$renderer.push(`<a${attr("href", link.href)}${attr_class("sidebar-link svelte-1bm518h", void 0, { "active": currentPath() === link.href })}><svg class="sidebar-icon svelte-1bm518h" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">${html(link.iconPath)}</svg> ${escape_html(link.label)}</a>`);
		}
		$$renderer.push(`<!--]--></nav></div> <div class="sidebar-divider svelte-1bm518h"></div> <div class="sidebar-section svelte-1bm518h"><span class="sidebar-label svelte-1bm518h">${escape_html(account_sidebar_subscription_label())}</span> <nav class="sidebar-nav svelte-1bm518h"><!--[-->`);
		const each_array_1 = ensure_array_like(subscriptionLinks());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let link = each_array_1[$$index_1];
			$$renderer.push(`<a${attr("href", link.href)}${attr_class("sidebar-link svelte-1bm518h", void 0, { "active": currentPath() === link.href })}><svg class="sidebar-icon svelte-1bm518h" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">${html(link.iconPath)}</svg> ${escape_html(link.label)}</a>`);
		}
		$$renderer.push(`<!--]--></nav></div> <div class="sidebar-divider svelte-1bm518h"></div> <div class="sidebar-danger svelte-1bm518h">`);
		Logout($$renderer);
		$$renderer.push(`<!----></div></aside> <main class="content svelte-1bm518h">`);
		children?.($$renderer);
		$$renderer.push(`<!----></main></div></div>`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-0iacpTwQ.js.map
