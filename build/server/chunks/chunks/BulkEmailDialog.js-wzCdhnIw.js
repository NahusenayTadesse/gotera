import { a7 as bind_props, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores, T as derived } from './server.js-CPNQ0GBv.js';
import { I as InputComp } from './InputComp.js-B_kC6IpM.js';
import { E as Errors } from './Errors.js-PqimIvij.js';
import { M as Mail } from './mail.js-MBTR6Dng.js';
import { b as Send } from './select-cell.js-CnfBE1Ae.js';
import { D as DialogComp } from './DialogComp.js-fkV0zqVi.js';
import { B as Button } from './button.js-DMlVoc1I.js';
import { L as LoadingBtn } from './LoadingBtn.js-CvQQ0uH0.js';
import { b as superForm } from './client2.js-nubrWqZa.js';
import { a as zodClient } from './adapters.js-D3ccRgef.js';
import { b as bulkEmailSchema } from './bulkEmail.js-GA9Kc6dA.js';

//#region src/lib/components/dashboard/BulkEmailDialog.svelte
function BulkEmailDialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { bulkEmailForm, rows, action = "?/sendBulkEmail", open = false, hideTrigger = false, prefill = null } = $$props;
		const { form, errors, delayed, allErrors} = superForm(bulkEmailForm, {
			id: "bulk-email",
			dataType: "json",
			resetForm: true,
			invalidateAll: false,
			validators: zodClient(bulkEmailSchema),
			onUpdated({ form: f }) {
				if (f.valid) open = false;
			}
		});
		const recipients = derived(() => {
			const seen = /* @__PURE__ */ new Set();
			const out = [];
			for (const r of rows) {
				if (!r.email || seen.has(r.email)) continue;
				seen.add(r.email);
				out.push({
					email: r.email,
					name: r.name ?? void 0
				});
			}
			return out;
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (rows.length > 0) {
				$$renderer.push("<!--[0-->");
				DialogComp($$renderer, {
					title: "Email customers",
					label: `Email ${rows.length} selected`,
					IconComp: Mail,
					class: "",
					contentClass: "max-w-2xl max-h-[90vh] overflow-y-auto",
					hideTrigger,
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						$$renderer.push(`<h3 class="mb-1 text-lg font-semibold">Email ${escape_html(recipients().length)}
			${escape_html(recipients().length === 1 ? "customer" : "customers")}</h3> <p class="mb-4 text-sm text-muted-foreground">${escape_html(recipients().map((r) => r.name || r.email).join(", "))}</p> <form method="POST"${attr("action", action)} id="bulk-email-dialog-form" class="flex flex-col gap-4">`);
						Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
						$$renderer.push(`<!----> `);
						InputComp($$renderer, {
							label: "Subject",
							form,
							errors,
							type: "text",
							name: "subject",
							placeholder: "What's this email about?",
							required: true
						});
						$$renderer.push(`<!----> `);
						InputComp($$renderer, {
							label: "Message",
							form,
							errors,
							type: "richtext",
							name: "message",
							placeholder: "Write your message..."
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							type: "submit",
							form: "bulk-email-dialog-form",
							disabled: recipients().length === 0 || store_get($$store_subs ??= {}, "$delayed", delayed),
							class: "w-fit",
							children: ($$renderer) => {
								if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
									$$renderer.push("<!--[0-->");
									LoadingBtn($$renderer, { name: "Sending" });
								} else {
									$$renderer.push("<!--[-1-->");
									Send($$renderer, { class: "h-4 w-4" });
									$$renderer.push(`<!----> Send to ${escape_html(recipients().length)} customer${escape_html(recipients().length === 1 ? "" : "s")}`);
								}
								$$renderer.push(`<!--]-->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form>`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { open });
	});
}

export { BulkEmailDialog as B };
//# sourceMappingURL=BulkEmailDialog.js-wzCdhnIw.js.map
