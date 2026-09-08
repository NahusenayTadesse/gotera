const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["hero.mp4","hero.webp","injera/injera1.webp","injera/injera10.webp","injera/injera11.webp","injera/injera12.webp","injera/injera13.webp","injera/injera14.webp","injera/injera15.webp","injera/injera16.webp","injera/injera17.webp","injera/injera18.webp","injera/injera19.webp","injera/injera2.webp","injera/injera20.webp","injera/injera21.webp","injera/injera22.webp","injera/injera23.webp","injera/injera24.webp","injera/injera25.webp","injera/injera26.webp","injera/injera27.webp","injera/injera28.webp","injera/injera3.webp","injera/injera30.webp","injera/injera31.webp","injera/injera4.webp","injera/injera5.webp","injera/injera6.webp","injera/injera7.webp","injera/injera8.webp","injera/injera9.webp","injera.avif","logo192.jpg","og-image.jpg","output.webm","robots.txt","teff.webp"]),
	mimeTypes: {".mp4":"video/mp4",".webp":"image/webp",".avif":"image/avif",".jpg":"image/jpeg",".webm":"video/webm",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D8kSN5Fl.js",app:"_app/immutable/entry/app.8PBJFnMR.js",imports:["_app/immutable/entry/start.D8kSN5Fl.js","_app/immutable/chunks/Bjjyb35-.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/entry/app.8PBJFnMR.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/Bi76Sbi7.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-BtOSX2KK.js')),
			__memo(() => import('./nodes/1.js-CB0Y0zIq.js')),
			__memo(() => import('./nodes/2.js-Cqr4SEd3.js')),
			__memo(() => import('./nodes/3.js-Cgppm-L0.js')),
			__memo(() => import('./nodes/4.js-txFgG_Rs.js')),
			__memo(() => import('./nodes/5.js-C5KG9mBr.js')),
			__memo(() => import('./nodes/6.js-CyfNkge-.js')),
			__memo(() => import('./nodes/7.js-CTJ4FDi2.js')),
			__memo(() => import('./nodes/8.js-3wvEMddd.js')),
			__memo(() => import('./nodes/9.js-CSRif3Uc.js')),
			__memo(() => import('./nodes/10.js-Dq5WiVNr.js')),
			__memo(() => import('./nodes/11.js-B6eYqYg2.js')),
			__memo(() => import('./nodes/12.js-CeDGFAxy.js')),
			__memo(() => import('./nodes/13.js-BQxFOYsu.js')),
			__memo(() => import('./nodes/14.js-D8_J6yra.js')),
			__memo(() => import('./nodes/15.js-BckoP-jh.js')),
			__memo(() => import('./nodes/16.js-BpqJWUQQ.js')),
			__memo(() => import('./nodes/17.js-XM0DsHzi.js')),
			__memo(() => import('./nodes/18.js-CRaMmS8e.js')),
			__memo(() => import('./nodes/19.js-CM_O-exN.js')),
			__memo(() => import('./nodes/20.js-CD5QWyQ-.js')),
			__memo(() => import('./nodes/21.js-DX-V95lI.js')),
			__memo(() => import('./nodes/22.js-CLYaB9Xk.js')),
			__memo(() => import('./nodes/23.js-CqNTg35M.js')),
			__memo(() => import('./nodes/24.js-2KAkA1l7.js')),
			__memo(() => import('./nodes/25.js-Dq2rqHA8.js')),
			__memo(() => import('./nodes/26.js-CZQbGYHN.js')),
			__memo(() => import('./nodes/27.js-B4HqY3rE.js')),
			__memo(() => import('./nodes/28.js-BVMaWgyR.js')),
			__memo(() => import('./nodes/29.js-Bj9EoKlF.js')),
			__memo(() => import('./nodes/30.js-COaeCI9w.js')),
			__memo(() => import('./nodes/31.js-BiHzb02s.js')),
			__memo(() => import('./nodes/32.js-B-ZRqLIg.js')),
			__memo(() => import('./nodes/33.js-C11oBj_t.js')),
			__memo(() => import('./nodes/34.js-CyoTxl4c.js')),
			__memo(() => import('./nodes/35.js-Dzfh8apX.js')),
			__memo(() => import('./nodes/36.js-_Rfka_8s.js')),
			__memo(() => import('./nodes/37.js-BPpxU6iF.js')),
			__memo(() => import('./nodes/38.js-D9SOs9ne.js')),
			__memo(() => import('./nodes/39.js-DD0PyjeB.js')),
			__memo(() => import('./nodes/40.js-MOrWmfF-.js')),
			__memo(() => import('./nodes/41.js-D_xV8FE6.js')),
			__memo(() => import('./nodes/42.js-_mR2niPD.js')),
			__memo(() => import('./nodes/43.js-CsRFARn0.js')),
			__memo(() => import('./nodes/44.js-CMdHqepG.js')),
			__memo(() => import('./nodes/45.js-DLoBW79u.js')),
			__memo(() => import('./nodes/46.js-BYgI7Ija.js')),
			__memo(() => import('./nodes/47.js-CQ9DDUkA.js')),
			__memo(() => import('./nodes/48.js-DQsUxu48.js')),
			__memo(() => import('./nodes/49.js-DLwty6B3.js')),
			__memo(() => import('./nodes/50.js-Dg3Swkmh.js')),
			__memo(() => import('./nodes/51.js-vWDSXlyr.js'))
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
				id: "/addons/[token]",
				pattern: /^\/addons\/([^/]+?)\/?$/,
				params: [{"name":"token","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/allergens",
				pattern: /^\/allergens\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/api/cron/upcoming-deliveries",
				pattern: /^\/api\/cron\/upcoming-deliveries\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cron/upcoming-deliveries/_server.ts.js--SjvK9sw.js'))
			},
			{
				id: "/api/stripe/webhook",
				pattern: /^\/api\/stripe\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/stripe/webhook/_server.ts.js-DWjksPqp.js'))
			},
			{
				id: "/auth/popup-callback",
				pattern: /^\/auth\/popup-callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/dashboard/addons",
				pattern: /^\/dashboard\/addons\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel",
				pattern: /^\/dashboard\/admin-panel\/?$/,
				params: [],
				page: { layouts: [0,3,5,], errors: [1,4,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/add-roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/add-roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/[id]",
				pattern: /^\/dashboard\/admin-panel\/roles\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users",
				pattern: /^\/dashboard\/admin-panel\/users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/add-users",
				pattern: /^\/dashboard\/admin-panel\/users\/add-users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/[id]",
				pattern: /^\/dashboard\/admin-panel\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/dashboard/bulk-email",
				pattern: /^\/dashboard\/bulk-email\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/dashboard/customers",
				pattern: /^\/dashboard\/customers\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/dashboard/deliveries",
				pattern: /^\/dashboard\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/dashboard/orders",
				pattern: /^\/dashboard\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/guest",
				pattern: /^\/dashboard\/orders\/guest\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/one-time",
				pattern: /^\/dashboard\/orders\/one-time\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/subscriptions",
				pattern: /^\/dashboard\/orders\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/dashboard/plans",
				pattern: /^\/dashboard\/plans\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/dashboard/reports",
				pattern: /^\/dashboard\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/deliveries",
				pattern: /^\/dashboard\/reports\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/orders",
				pattern: /^\/dashboard\/reports\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/subscriptions",
				pattern: /^\/dashboard\/reports\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/dashboard/stock",
				pattern: /^\/dashboard\/stock\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/delivery",
				pattern: /^\/delivery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js-BIoUg5hX.js'))
			},
			{
				id: "/subscribe",
				pattern: /^\/subscribe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 49 },
				endpoint: null
			},
			{
				id: "/subscription-terms",
				pattern: /^\/subscription-terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 50 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 51 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-BdhuppM_.js.map
