const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.ico","favicon.svg","hero.mp4","hero.webp","icon-192.png","icon-512.png","icon-maskable-512.png","injera/injera1.webp","injera/injera10.webp","injera/injera11.webp","injera/injera12.webp","injera/injera13.webp","injera/injera14.webp","injera/injera15.webp","injera/injera16.webp","injera/injera17.webp","injera/injera18.webp","injera/injera19.webp","injera/injera2.webp","injera/injera20.webp","injera/injera21.webp","injera/injera22.webp","injera/injera23.webp","injera/injera24.webp","injera/injera25.webp","injera/injera26.webp","injera/injera27.webp","injera/injera28.webp","injera/injera3.webp","injera/injera30.webp","injera/injera31.webp","injera/injera4.webp","injera/injera5.webp","injera/injera6.webp","injera/injera7.webp","injera/injera8.webp","injera/injera9.webp","injera.avif","logo.png","logo.svg","logo192.jpg","manifest.webmanifest","og-image.jpg","output.webm","robots.txt","teff.webp","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".mp4":"video/mp4",".webp":"image/webp",".avif":"image/avif",".jpg":"image/jpeg",".webmanifest":"application/manifest+json",".webm":"video/webm",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.GNd8PyF5.js",app:"_app/immutable/entry/app.CdKRWvX2.js",imports:["_app/immutable/entry/start.GNd8PyF5.js","_app/immutable/chunks/D8l3Cq3H.js","_app/immutable/chunks/B5ng10cP.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/entry/app.CdKRWvX2.js","_app/immutable/chunks/B5ng10cP.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/Bi76Sbi7.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./nodes/0.js-D5qu-ahU.js')),
			__memo(() => import('./nodes/1.js-CbaHiFCC.js')),
			__memo(() => import('./nodes/2.js-B7a-rH_s.js')),
			__memo(() => import('./nodes/3.js-Cynvboqy.js')),
			__memo(() => import('./nodes/4.js-_nxzF4uD.js')),
			__memo(() => import('./nodes/5.js-Dn1Vi2_J.js')),
			__memo(() => import('./nodes/6.js-dtKIy4cD.js')),
			__memo(() => import('./nodes/7.js-CF9-pusY.js')),
			__memo(() => import('./nodes/8.js-g7aHshg6.js')),
			__memo(() => import('./nodes/9.js-BNrEL3rY.js')),
			__memo(() => import('./nodes/10.js-CuTmlkHP.js')),
			__memo(() => import('./nodes/11.js-DZg6QQYd.js')),
			__memo(() => import('./nodes/12.js-DEPodOSK.js')),
			__memo(() => import('./nodes/13.js-Sir9VtZA.js')),
			__memo(() => import('./nodes/14.js-BVGfRj96.js')),
			__memo(() => import('./nodes/15.js-Bgf5aTqK.js')),
			__memo(() => import('./nodes/16.js-CmUVeJD-.js')),
			__memo(() => import('./nodes/17.js-BlRYKHnl.js')),
			__memo(() => import('./nodes/18.js-nuNv8PI1.js')),
			__memo(() => import('./nodes/19.js-Dd5g6dLD.js')),
			__memo(() => import('./nodes/20.js-7sH0WuuW.js')),
			__memo(() => import('./nodes/21.js-Dm3V5oVg.js')),
			__memo(() => import('./nodes/22.js-B4YKTX7-.js')),
			__memo(() => import('./nodes/23.js-DtT_6OdG.js')),
			__memo(() => import('./nodes/24.js-CJqaWb5S.js')),
			__memo(() => import('./nodes/25.js-D1fDiOi5.js')),
			__memo(() => import('./nodes/26.js-Do4-8gXO.js')),
			__memo(() => import('./nodes/27.js-Bnl-8GUj.js')),
			__memo(() => import('./nodes/28.js-Cqp-TwE-.js')),
			__memo(() => import('./nodes/29.js-mUCYeY3f.js')),
			__memo(() => import('./nodes/30.js-B0KKrun5.js')),
			__memo(() => import('./nodes/31.js-aClUGHRw.js')),
			__memo(() => import('./nodes/32.js-C0FewyqO.js')),
			__memo(() => import('./nodes/33.js-BVzSh72f.js')),
			__memo(() => import('./nodes/34.js-UffsCCYZ.js')),
			__memo(() => import('./nodes/35.js-f-VS-kLO.js')),
			__memo(() => import('./nodes/36.js-BJk80k1C.js')),
			__memo(() => import('./nodes/37.js-mmK3Ovv3.js')),
			__memo(() => import('./nodes/38.js-sipuqoot.js')),
			__memo(() => import('./nodes/39.js-DRZlImpQ.js')),
			__memo(() => import('./nodes/40.js-DGo-jHon.js')),
			__memo(() => import('./nodes/41.js-CIzsB18q.js')),
			__memo(() => import('./nodes/42.js-DCmJpagG.js')),
			__memo(() => import('./nodes/43.js-C_t4xQNg.js')),
			__memo(() => import('./nodes/44.js-zhh5OqQJ.js')),
			__memo(() => import('./nodes/45.js-wP-KuqdM.js')),
			__memo(() => import('./nodes/46.js-52_TGGmh.js')),
			__memo(() => import('./nodes/47.js-C1-XeWfh.js')),
			__memo(() => import('./nodes/48.js-CF6LPSJo.js')),
			__memo(() => import('./nodes/49.js-DlsWIFjk.js')),
			__memo(() => import('./nodes/50.js-DArD5JWS.js')),
			__memo(() => import('./nodes/51.js-BSOi-FG8.js')),
			__memo(() => import('./nodes/52.js-CMH32J-G.js')),
			__memo(() => import('./nodes/53.js-T57pWFTs.js')),
			__memo(() => import('./nodes/54.js-02uJske4.js')),
			__memo(() => import('./nodes/55.js-DtBF4oS4.js')),
			__memo(() => import('./nodes/56.js-vZ1EOTM6.js')),
			__memo(() => import('./nodes/57.js-C6frKDkH.js')),
			__memo(() => import('./nodes/58.js-BAZtZksX.js')),
			__memo(() => import('./nodes/59.js-BEFzNkSi.js')),
			__memo(() => import('./nodes/60.js-C9oXygi2.js')),
			__memo(() => import('./nodes/61.js-Ch3Ai4tx.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/account/cancel",
				pattern: /^\/account\/cancel\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/account/change-plan",
				pattern: /^\/account\/change-plan\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/account/delivery",
				pattern: /^\/account\/delivery\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/account/details",
				pattern: /^\/account\/details\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/account/history",
				pattern: /^\/account\/history\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/addons",
				pattern: /^\/addons\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/addons/[token]",
				pattern: /^\/addons\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/allergens",
				pattern: /^\/allergens\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/api/cron/upcoming-deliveries",
				pattern: /^\/api\/cron\/upcoming-deliveries\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cron/upcoming-deliveries/_server.ts.js-CfTXmgqd.js'))
			},
			{
				id: "/api/postcode",
				pattern: /^\/api\/postcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/postcode/_server.ts.js-D__RX217.js'))
			},
			{
				id: "/api/push",
				pattern: /^\/api\/push\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/push/_server.ts.js-D7EA3u2v.js'))
			},
			{
				id: "/api/stripe/webhook",
				pattern: /^\/api\/stripe\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/stripe/webhook/_server.ts.js-DKt9LmWD.js'))
			},
			{
				id: "/auth/popup-callback",
				pattern: /^\/auth\/popup-callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/dashboard/addons",
				pattern: /^\/dashboard\/addons\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel",
				pattern: /^\/dashboard\/admin-panel\/?$/,
				params: [],
				page: { layouts: [0,3,5,], errors: [1,4,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/add-roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/add-roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/[id]",
				pattern: /^\/dashboard\/admin-panel\/roles\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users",
				pattern: /^\/dashboard\/admin-panel\/users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/add-users",
				pattern: /^\/dashboard\/admin-panel\/users\/add-users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/[id]",
				pattern: /^\/dashboard\/admin-panel\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/dashboard/batches",
				pattern: /^\/dashboard\/batches\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/dashboard/batches/shipment/[type]/[id]",
				pattern: /^\/dashboard\/batches\/shipment\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"type","optional":false,"rest":false,"chained":false},{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/dashboard/batches/[id]",
				pattern: /^\/dashboard\/batches\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/dashboard/bulk-email",
				pattern: /^\/dashboard\/bulk-email\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/dashboard/customers",
				pattern: /^\/dashboard\/customers\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/dashboard/deliveries",
				pattern: /^\/dashboard\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/dashboard/deliveries/route",
				pattern: /^\/dashboard\/deliveries\/route\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/dashboard/orders",
				pattern: /^\/dashboard\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/guest",
				pattern: /^\/dashboard\/orders\/guest\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/one-time",
				pattern: /^\/dashboard\/orders\/one-time\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/subscriptions",
				pattern: /^\/dashboard\/orders\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/dashboard/partners",
				pattern: /^\/dashboard\/partners\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/dashboard/partners/[status=partnerStatus]",
				pattern: /^\/dashboard\/partners\/([^/]+?)\/?$/,
				params: [{"name":"status","matcher":"partnerStatus","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/dashboard/partners/[id]",
				pattern: /^\/dashboard\/partners\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/dashboard/plans",
				pattern: /^\/dashboard\/plans\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/dashboard/reports",
				pattern: /^\/dashboard\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/deliveries",
				pattern: /^\/dashboard\/reports\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/orders",
				pattern: /^\/dashboard\/reports\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/subscriptions",
				pattern: /^\/dashboard\/reports\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/dashboard/stock",
				pattern: /^\/dashboard\/stock\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/delivery",
				pattern: /^\/delivery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 49 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 50 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 51 },
				endpoint: null
			},
			{
				id: "/demo/playwright",
				pattern: /^\/demo\/playwright\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 52 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 53 },
				endpoint: null
			},
			{
				id: "/files/[name]",
				pattern: /^\/files\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/files/_name_/_server.ts.js-BqRn0I4K.js'))
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 54 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 55 },
				endpoint: null
			},
			{
				id: "/partners",
				pattern: /^\/partners\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 56 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 57 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 58 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js-BfJ6qjk0.js'))
			},
			{
				id: "/subscribe",
				pattern: /^\/subscribe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 59 },
				endpoint: null
			},
			{
				id: "/subscription-terms",
				pattern: /^\/subscription-terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 60 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 61 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			const { match: partnerStatus } = await import ('./entries/matchers/partnerStatus.js-nDr4fxG5.js');
			return { partnerStatus };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-DsEWn1bI.js.map
