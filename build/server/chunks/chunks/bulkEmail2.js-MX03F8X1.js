import { g as sendBulkEmail } from './email.js-CH8piiG9.js';
import './exports.js-BT-QlP_6.js';
import './client.js-CEknL8Oc.js';
import { s as superValidate, m as message } from './client2.js-Ba6oy4l9.js';
import { z as zod } from './adapters.js-k3iEm0ov.js';
import { b as bulkEmailSchema } from './bulkEmail.js-GA9Kc6dA.js';

//#region src/lib/server/sanitizeHtml.ts
/**
* Minimal defense-in-depth scrub for rich-text HTML before it's emailed out.
* Tiptap's ProseMirror schema already can't produce script/iframe nodes, but this
* strips them anyway in case the stored HTML was ever tampered with client-side.
*/
function sanitizeRichTextHtml(html) {
	return html.replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<(script|style|iframe|object|embed)[^>]*\/?>(?!<\/\1>)/gi, "").replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "").replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, "$1=\"#\"");
}
//#endregion
//#region src/lib/server/bulkEmail.ts
/**
* Reusable `?/sendBulkEmail` form action — spread this into any route's `actions` to get the
* BulkEmailDialog/bulk-email page working there. One implementation for every page that emails
* a set of selected rows, instead of re-deriving recipients per table on each route.
*/
async function sendBulkEmailAction({ request }) {
	const form = await superValidate(request, zod(bulkEmailSchema));
	if (!form.valid) return message(form, {
		type: "error",
		text: "Please check the form for errors"
	}, { status: 400 });
	const bodyHtml = sanitizeRichTextHtml(form.data.message);
	const seen = /* @__PURE__ */ new Set();
	const recipients = form.data.recipients.filter((r) => {
		if (seen.has(r.email)) return false;
		seen.add(r.email);
		return true;
	});
	const results = await Promise.allSettled(recipients.map((r) => sendBulkEmail(r.email, {
		subject: form.data.subject,
		bodyHtml
	})));
	const failed = results.filter((r) => r.status === "rejected").length;
	const sent = results.length - failed;
	if (sent === 0) return message(form, {
		type: "error",
		text: "No emails could be sent. Please try again."
	}, { status: 500 });
	return message(form, {
		type: failed > 0 ? "warning" : "success",
		text: failed > 0 ? `Sent to ${sent} customer${sent === 1 ? "" : "s"}, ${failed} failed.` : `Sent to ${sent} customer${sent === 1 ? "" : "s"}.`
	});
}

export { sendBulkEmailAction as s };
//# sourceMappingURL=bulkEmail2.js-MX03F8X1.js.map
