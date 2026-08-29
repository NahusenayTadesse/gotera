/**
 * Minimal defense-in-depth scrub for rich-text HTML before it's emailed out.
 * Tiptap's ProseMirror schema already can't produce script/iframe nodes, but this
 * strips them anyway in case the stored HTML was ever tampered with client-side.
 */
export function sanitizeRichTextHtml(html: string): string {
	return html
		.replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
		.replace(/<(script|style|iframe|object|embed)[^>]*\/?>(?!<\/\1>)/gi, '')
		.replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '')
		.replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}
