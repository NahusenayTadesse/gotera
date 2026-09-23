import { a0 as head, a6 as escape_html, a4 as ensure_array_like, aa as attr_class, ae as store_get, $ as attr, af as unsubscribe_stores, T as derived } from '../../../../chunks/server.js-qDPizQqb.js';
import { h as getLocale } from '../../../../chunks/runtime.js-CbeSlHLA.js';
import { a as toast } from '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import { g as goto } from '../../../../chunks/client.js-CWf6uOE8.js';
import { c as changePlanSchema } from '../../../../chunks/schema.js-5OY-CNsw.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import { b as superForm } from '../../../../chunks/client2.js-ZnyZ4fKl.js';
import { a as zodClient } from '../../../../chunks/adapters.js-QNI96UbV.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/access.js-BTJQW2Ke.js';
import '../../../../chunks/forms.js-CSpodhVa.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-85RLlu2u.js';
import '../../../../index.js-C0U4KHbt.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';

//#region src/lib/paraglide/messages/acctplan_page_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Page_TitleInputs */
var en_acctplan_page_title = () => {
	return `Change your plan — GOTERA`;
};
var am_acctplan_page_title = () => {
	return `ዕቅድዎን ይቀይሩ — ጎቴራ`;
};
/**
* | output |
* | --- |
* | "Change your plan — GOTERA" |
*
* @param {Acctplan_Page_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_page_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_page_title();
	return en_acctplan_page_title();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_EyebrowInputs */
var en_acctplan_eyebrow = () => {
	return `Manage subscriptions`;
};
var am_acctplan_eyebrow = () => {
	return `ደንበኝነት ምዝገባዎችን ያስተዳድሩ`;
};
/**
* | output |
* | --- |
* | "Manage subscriptions" |
*
* @param {Acctplan_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_eyebrow();
	return en_acctplan_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_HeadingInputs */
var en_acctplan_heading = () => {
	return `Change your plan.`;
};
var am_acctplan_heading = () => {
	return `ዕቅድዎን ይቀይሩ።`;
};
/**
* | output |
* | --- |
* | "Change your plan." |
*
* @param {Acctplan_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_heading();
	return en_acctplan_heading();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_empty_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Empty_LeadInputs */
var en_acctplan_empty_lead = () => {
	return `You don't have a plan to change yet.`;
};
var am_acctplan_empty_lead = () => {
	return `እስካሁን የሚቀይሩት ዕቅድ የለዎትም።`;
};
/**
* | output |
* | --- |
* | "You don't have a plan to change yet." |
*
* @param {Acctplan_Empty_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_empty_lead = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_empty_lead();
	return en_acctplan_empty_lead();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_back_to_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Back_To_AccountInputs */
var en_acctplan_back_to_account = () => {
	return `Back to account`;
};
var am_acctplan_back_to_account = () => {
	return `ወደ መለያ ተመለስ`;
};
/**
* | output |
* | --- |
* | "Back to account" |
*
* @param {Acctplan_Back_To_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_back_to_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_back_to_account();
	return en_acctplan_back_to_account();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_lead.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ count: NonNullable<unknown>, planWord: NonNullable<unknown> }} Acctplan_LeadInputs */
var en_acctplan_lead = (i) => {
	return `You have ${i?.count} ${i?.planWord}. Pick the one to change, then choose what it becomes.`;
};
var am_acctplan_lead = (i) => {
	return `${i?.count} ${i?.planWord} አለዎት። የሚቀይሩትን ይምረጡ፣ ከዚያም ወደ የትኛው እንደሚቀየር ይወስኑ።`;
};
/**
* | output |
* | --- |
* | "You have {count} {planWord}. Pick the one to change, then choose what it becomes." |
*
* @param {Acctplan_LeadInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_lead = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_lead(inputs);
	return en_acctplan_lead(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_plan_word_singular.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Plan_Word_SingularInputs */
var en_acctplan_plan_word_singular = () => {
	return `plan`;
};
var am_acctplan_plan_word_singular = () => {
	return `እቅድ`;
};
/**
* | output |
* | --- |
* | "plan" |
*
* @param {Acctplan_Plan_Word_SingularInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_plan_word_singular = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_plan_word_singular();
	return en_acctplan_plan_word_singular();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_plan_word_plural.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Plan_Word_PluralInputs */
var en_acctplan_plan_word_plural = () => {
	return `plans`;
};
var am_acctplan_plan_word_plural = () => {
	return `እቅዶች`;
};
/**
* | output |
* | --- |
* | "plans" |
*
* @param {Acctplan_Plan_Word_PluralInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_plan_word_plural = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_plan_word_plural();
	return en_acctplan_plan_word_plural();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_which_plan.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Which_PlanInputs */
var en_acctplan_which_plan = () => {
	return `Which plan are you changing?`;
};
var am_acctplan_which_plan = () => {
	return `የትኛውን ዕቅድ ነው የሚቀይሩት?`;
};
/**
* | output |
* | --- |
* | "Which plan are you changing?" |
*
* @param {Acctplan_Which_PlanInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_which_plan = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_which_plan();
	return en_acctplan_which_plan();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_qty_pill.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ quantity: NonNullable<unknown> }} Acctplan_Qty_PillInputs */
var en_acctplan_qty_pill = (i) => {
	return `×${i?.quantity}`;
};
var am_acctplan_qty_pill = (i) => {
	return `×${i?.quantity}`;
};
/**
* | output |
* | --- |
* | "×{quantity}" |
*
* @param {Acctplan_Qty_PillInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_qty_pill = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_qty_pill(inputs);
	return en_acctplan_qty_pill(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_already_cancelling.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Already_CancellingInputs */
var en_acctplan_already_cancelling = () => {
	return `Cancelling — cannot be changed`;
};
var am_acctplan_already_cancelling = () => {
	return `እየተሰረዘ ነው — ሊቀየር አይችልም`;
};
/**
* | output |
* | --- |
* | "Cancelling — cannot be changed" |
*
* @param {Acctplan_Already_CancellingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_already_cancelling = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_already_cancelling();
	return en_acctplan_already_cancelling();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_ends_on.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ date: NonNullable<unknown> }} Acctplan_Ends_OnInputs */
var en_acctplan_ends_on = (i) => {
	return `ends ${i?.date}`;
};
var am_acctplan_ends_on = (i) => {
	return `በ${i?.date} ያበቃል`;
};
/**
* | output |
* | --- |
* | "ends {date}" |
*
* @param {Acctplan_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_ends_on = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_ends_on(inputs);
	return en_acctplan_ends_on(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_submitting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_SubmittingInputs */
var en_acctplan_submitting = () => {
	return `Saving…`;
};
var am_acctplan_submitting = () => {
	return `በማስቀመጥ ላይ…`;
};
/**
* | output |
* | --- |
* | "Saving…" |
*
* @param {Acctplan_SubmittingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_submitting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_submitting();
	return en_acctplan_submitting();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_submit_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Submit_ButtonInputs */
var en_acctplan_submit_button = () => {
	return `Confirm plan change`;
};
var am_acctplan_submit_button = () => {
	return `የዕቅድ ለውጡን አረጋግጥ`;
};
/**
* | output |
* | --- |
* | "Confirm plan change" |
*
* @param {Acctplan_Submit_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_submit_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_submit_button();
	return en_acctplan_submit_button();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_choose_new.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Choose_NewInputs */
var en_acctplan_choose_new = () => {
	return `Switch it to`;
};
var am_acctplan_choose_new = () => {
	return `ወደዚህ ይቀይሩት`;
};
/**
* | output |
* | --- |
* | "Switch it to" |
*
* @param {Acctplan_Choose_NewInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_choose_new = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_choose_new();
	return en_acctplan_choose_new();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_current_badge.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Current_BadgeInputs */
var en_acctplan_current_badge = () => {
	return `Current plan`;
};
var am_acctplan_current_badge = () => {
	return `የአሁኑ ዕቅድ`;
};
/**
* | output |
* | --- |
* | "Current plan" |
*
* @param {Acctplan_Current_BadgeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_current_badge = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_current_badge();
	return en_acctplan_current_badge();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_pending_switch.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ plan: NonNullable<unknown> }} Acctplan_Pending_SwitchInputs */
var en_acctplan_pending_switch = (i) => {
	return `Already switching to ${i?.plan}`;
};
var am_acctplan_pending_switch = (i) => {
	return `አስቀድሞ ወደ ${i?.plan} በመቀየር ላይ`;
};
/**
* | output |
* | --- |
* | "Already switching to {plan}" |
*
* @param {Acctplan_Pending_SwitchInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_pending_switch = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_pending_switch(inputs);
	return en_acctplan_pending_switch(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_switch_note_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Switch_Note_PrefixInputs */
var en_acctplan_switch_note_prefix = () => {
	return `The new plan starts on`;
};
var am_acctplan_switch_note_prefix = () => {
	return `አዲሱ ዕቅድ የሚጀምረው በ`;
};
/**
* | output |
* | --- |
* | "The new plan starts on" |
*
* @param {Acctplan_Switch_Note_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_switch_note_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_switch_note_prefix();
	return en_acctplan_switch_note_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_switch_note_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Switch_Note_SuffixInputs */
var en_acctplan_switch_note_suffix = () => {
	return `You keep your current plan, and its price, until then. Nothing is charged today.`;
};
var am_acctplan_switch_note_suffix = () => {
	return `እስከዚያ ድረስ የአሁኑ ዕቅድዎና ዋጋው እንደተጠበቀ ይቆያል። ዛሬ ምንም ክፍያ አይጠየቁም።`;
};
/**
* | output |
* | --- |
* | "You keep your current plan, and its price, until then. Nothing is charged today." |
*
* @param {Acctplan_Switch_Note_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_switch_note_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_switch_note_suffix();
	return en_acctplan_switch_note_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_switch_note_no_date.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Switch_Note_No_DateInputs */
var en_acctplan_switch_note_no_date = () => {
	return `The new plan starts at the end of your current billing period. Nothing is charged today.`;
};
var am_acctplan_switch_note_no_date = () => {
	return `አዲሱ ዕቅድ የሚጀምረው የአሁኑ የክፍያ ዘመንዎ ሲያልቅ ነው። ዛሬ ምንም ክፍያ አይጠየቁም።`;
};
/**
* | output |
* | --- |
* | "The new plan starts at the end of your current billing period. Nothing is charged today." |
*
* @param {Acctplan_Switch_Note_No_DateInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_switch_note_no_date = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_switch_note_no_date();
	return en_acctplan_switch_note_no_date();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_no_alternatives.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_No_AlternativesInputs */
var en_acctplan_no_alternatives = () => {
	return `There are no other plans available to switch to right now.`;
};
var am_acctplan_no_alternatives = () => {
	return `በአሁኑ ጊዜ ሊቀይሩባቸው የሚችሉ ሌሎች ዕቅዶች የሉም።`;
};
/**
* | output |
* | --- |
* | "There are no other plans available to switch to right now." |
*
* @param {Acctplan_No_AlternativesInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_no_alternatives = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_no_alternatives();
	return en_acctplan_no_alternatives();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_never_mind_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Never_Mind_ButtonInputs */
var en_acctplan_never_mind_button = () => {
	return `Never mind`;
};
var am_acctplan_never_mind_button = () => {
	return `ተወው`;
};
/**
* | output |
* | --- |
* | "Never mind" |
*
* @param {Acctplan_Never_Mind_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_never_mind_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_never_mind_button();
	return en_acctplan_never_mind_button();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_cancel_prompt.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Cancel_PromptInputs */
var en_acctplan_cancel_prompt = () => {
	return `Looking to cancel instead?`;
};
var am_acctplan_cancel_prompt = () => {
	return `በምትኩ መሰረዝ ይፈልጋሉ?`;
};
/**
* | output |
* | --- |
* | "Looking to cancel instead?" |
*
* @param {Acctplan_Cancel_PromptInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_cancel_prompt = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_cancel_prompt();
	return en_acctplan_cancel_prompt();
});
//#endregion
//#region src/lib/paraglide/messages/acctplan_cancel_link.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Acctplan_Cancel_LinkInputs */
var en_acctplan_cancel_link = () => {
	return `Cancel a plan`;
};
var am_acctplan_cancel_link = () => {
	return `ዕቅድ ሰርዝ`;
};
/**
* | output |
* | --- |
* | "Cancel a plan" |
*
* @param {Acctplan_Cancel_LinkInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var acctplan_cancel_link = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_acctplan_cancel_link();
	return en_acctplan_cancel_link();
});
//#endregion
//#region src/routes/account/change-plan/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, submitting} = superForm(data.form, {
			validators: zodClient(changePlanSchema),
			onUpdated({ form }) {
				if (form.message?.type === "error") toast.error(form.message.text);
				else if (form.message?.type === "success") {
					toast.success(form.message.text);
					goto();
				}
			}
		});
		const changeable = derived(() => data.subscriptionsList.filter((p) => !p.cancelAtPeriodEnd));
		const selected = derived(() => data.subscriptionsList.find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).subscriptionId) ?? null);
		const alternatives = derived(() => selected() ? data.planOptions.filter((p) => p.id !== selected().planId) : data.planOptions);
		const target = derived(() => data.planOptions.find((p) => p.id === store_get($$store_subs ??= {}, "$form", form).planId) ?? null);
		head("13g7a9r", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(acctplan_page_title())}</title>`);
			});
		});
		$$renderer.push(`<div class="wrap svelte-13g7a9r"><div class="card svelte-13g7a9r"><span class="eyebrow svelte-13g7a9r">${escape_html(acctplan_eyebrow())}</span> <h1 class="svelte-13g7a9r">${escape_html(acctplan_heading())}</h1> `);
		if (changeable().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="lead svelte-13g7a9r">${escape_html(acctplan_empty_lead())}</p> <div class="actions svelte-13g7a9r"><a href="/account" class="btn btn-ghost svelte-13g7a9r">${escape_html(acctplan_back_to_account())}</a></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="lead svelte-13g7a9r">${escape_html(acctplan_lead({
				count: changeable().length,
				planWord: changeable().length === 1 ? acctplan_plan_word_singular() : acctplan_plan_word_plural()
			}))}</p> <form method="POST" class="form svelte-13g7a9r"><fieldset class="plan-list svelte-13g7a9r"><legend class="svelte-13g7a9r">${escape_html(acctplan_which_plan())}</legend> <!--[-->`);
			const each_array = ensure_array_like(data.subscriptionsList);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<label${attr_class("plan-row svelte-13g7a9r", void 0, {
					"active": store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id,
					"disabled": p.cancelAtPeriodEnd
				})}><input type="radio" name="subscriptionId"${attr("value", p.id)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).subscriptionId === p.id, true)}${attr("disabled", p.cancelAtPeriodEnd, true)} class="svelte-13g7a9r"/> <div class="plan-info svelte-13g7a9r"><div class="plan-top svelte-13g7a9r"><span class="plan-name svelte-13g7a9r">${escape_html(p.planName)}`);
				if (p.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="qty-pill svelte-13g7a9r">${escape_html(acctplan_qty_pill({ quantity: p.quantity }))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></span> <span class="plan-price svelte-13g7a9r">${escape_html(p.price)}</span></div> <div class="plan-meta svelte-13g7a9r">`);
				if (p.addressLabel) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="plan-addr svelte-13g7a9r">${escape_html(p.addressLabel)}</span> ·`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->${escape_html(p.freq)}`);
				if (p.quantity > 1) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`· ${escape_html(p.unitPrice)} × ${escape_html(p.quantity)}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div> `);
				if (p.cancelAtPeriodEnd) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="plan-flag svelte-13g7a9r">${escape_html(acctplan_already_cancelling())}${escape_html(p.periodEndLabel ? ` — ${acctplan_ends_on({ date: p.periodEndLabel })}` : "")}</span>`);
				} else if (p.pendingPlanName) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="plan-note svelte-13g7a9r">${escape_html(acctplan_pending_switch({ plan: p.pendingPlanName }))}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></label>`);
			}
			$$renderer.push(`<!--]--></fieldset> `);
			if (store_get($$store_subs ??= {}, "$errors", errors).subscriptionId) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="form-error svelte-13g7a9r">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).subscriptionId)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (selected() && !selected().cancelAtPeriodEnd) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<fieldset class="plan-list svelte-13g7a9r"><legend class="svelte-13g7a9r">${escape_html(acctplan_choose_new())}</legend> `);
				if (alternatives().length === 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="empty-note svelte-13g7a9r">${escape_html(acctplan_no_alternatives())}</p>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--[-->`);
					const each_array_1 = ensure_array_like(data.planOptions);
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let option = each_array_1[$$index_1];
						const isCurrent = option.id === selected().planId;
						$$renderer.push(`<label${attr_class("plan-row svelte-13g7a9r", void 0, {
							"active": store_get($$store_subs ??= {}, "$form", form).planId === option.id,
							"disabled": isCurrent
						})}><input type="radio" name="planId"${attr("value", option.id)}${attr("checked", store_get($$store_subs ??= {}, "$form", form).planId === option.id, true)}${attr("disabled", isCurrent, true)} class="svelte-13g7a9r"/> <div class="plan-info svelte-13g7a9r"><div class="plan-top svelte-13g7a9r"><span class="plan-name svelte-13g7a9r">${escape_html(option.name)}</span> <span class="plan-price svelte-13g7a9r">${escape_html(option.price)}</span></div> <div class="plan-meta svelte-13g7a9r">${escape_html(option.freq)}`);
						if (option.subtitle) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`· ${escape_html(option.subtitle)}`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></div> `);
						if (isCurrent) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<span class="plan-note svelte-13g7a9r">${escape_html(acctplan_current_badge())}</span>`);
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]--></div></label>`);
					}
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]--></fieldset> `);
				if (store_get($$store_subs ??= {}, "$errors", errors).planId) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="form-error svelte-13g7a9r">${escape_html(store_get($$store_subs ??= {}, "$errors", errors).planId)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (target()) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="keep-note svelte-13g7a9r">`);
					if (selected().periodEndLabel) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`${escape_html(acctplan_switch_note_prefix())} <strong class="svelte-13g7a9r">${escape_html(selected().periodEndLabel)}</strong>. ${escape_html(acctplan_switch_note_suffix())}`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`${escape_html(acctplan_switch_note_no_date())}`);
					}
					$$renderer.push(`<!--]--></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="actions svelte-13g7a9r"><a href="/account" class="btn btn-ghost svelte-13g7a9r">${escape_html(acctplan_never_mind_button())}</a> <button type="submit" class="btn btn-primary svelte-13g7a9r"${attr("disabled", store_get($$store_subs ??= {}, "$submitting", submitting) || !selected() || selected().cancelAtPeriodEnd || !target(), true)}>${escape_html(store_get($$store_subs ??= {}, "$submitting", submitting) ? acctplan_submitting() : acctplan_submit_button())}</button></div></form> <p class="footnote svelte-13g7a9r">${escape_html(acctplan_cancel_prompt())} <a href="/account/cancel" class="svelte-13g7a9r">${escape_html(acctplan_cancel_link())}</a></p>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Cds8uRJT.js.map
