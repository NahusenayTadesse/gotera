import { l as locales, j as localizeHref } from '../../../chunks/runtime.js-CbeSlHLA.js';

//#region src/routes/sitemap.xml/+server.ts
var routes = [
	{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	},
	{
		path: "/subscribe",
		changefreq: "weekly",
		priority: "0.9"
	},
	{
		path: "/about",
		changefreq: "monthly",
		priority: "0.7"
	},
	{
		path: "/faq",
		changefreq: "monthly",
		priority: "0.6"
	},
	{
		path: "/delivery",
		changefreq: "monthly",
		priority: "0.6"
	},
	{
		path: "/allergens",
		changefreq: "monthly",
		priority: "0.5"
	},
	{
		path: "/terms",
		changefreq: "yearly",
		priority: "0.3"
	},
	{
		path: "/subscription-terms",
		changefreq: "yearly",
		priority: "0.3"
	}
];
var GET = async ({ url }) => {
	const origin = url.origin;
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes.map(({ path, changefreq, priority }) => {
		const alternates = locales.map((locale) => `\t\t<xhtml:link rel="alternate" hreflang="${locale}" href="${origin}${localizeHref(path, { locale })}" />`).join("\n");
		return `\t<url>\n\t\t<loc>${origin}${path}</loc>\n${alternates}\n\t\t<changefreq>${changefreq}</changefreq>\n\t\t<priority>${priority}</priority>\n\t</url>`;
	}).join("\n")}\n</urlset>`;
	return new Response(body, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "max-age=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts.js-BIoUg5hX.js.map
