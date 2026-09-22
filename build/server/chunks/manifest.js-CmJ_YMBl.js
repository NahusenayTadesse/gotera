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
		client: {start:"_app/immutable/entry/start.BKv23QAf.js",app:"_app/immutable/entry/app.MXhSH-Xc.js",imports:["_app/immutable/entry/start.BKv23QAf.js","_app/immutable/chunks/CzzH2CjQ.js","_app/immutable/chunks/B5ng10cP.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/entry/app.MXhSH-Xc.js","_app/immutable/chunks/B5ng10cP.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/Bi76Sbi7.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-lkzz4Aca.js')),
			__memo(() => import('./nodes/1.js-CVsFkDId.js')),
			__memo(() => import('./nodes/2.js-Bn1mpufq.js')),
			__memo(() => import('./nodes/3.js-B_SGcuB0.js')),
			__memo(() => import('./nodes/4.js-BebyNyTU.js')),
			__memo(() => import('./nodes/5.js-DAerf3k0.js')),
			__memo(() => import('./nodes/6.js-DS7Yl4la.js')),
			__memo(() => import('./nodes/7.js-Dvutdg7Y.js')),
			__memo(() => import('./nodes/8.js-ChnSGcY2.js')),
			__memo(() => import('./nodes/9.js-Dwua8Kib.js')),
			__memo(() => import('./nodes/10.js-BKnWMUAF.js')),
			__memo(() => import('./nodes/11.js-BrRr6NfG.js')),
			__memo(() => import('./nodes/12.js-BS3mi5cw.js')),
			__memo(() => import('./nodes/13.js-Drir5NSw.js')),
			__memo(() => import('./nodes/14.js-fM3ob6ce.js')),
			__memo(() => import('./nodes/15.js-BpWytz9k.js')),
			__memo(() => import('./nodes/16.js-Dh0GlhaR.js')),
			__memo(() => import('./nodes/17.js-fovQBWX9.js')),
			__memo(() => import('./nodes/18.js-DoxnnCH9.js')),
			__memo(() => import('./nodes/19.js-33APba34.js')),
			__memo(() => import('./nodes/20.js-Ifm5rirG.js')),
			__memo(() => import('./nodes/21.js-C4ihDCwM.js')),
			__memo(() => import('./nodes/22.js-B8FCPPor.js')),
			__memo(() => import('./nodes/23.js-vwIbw8_U.js')),
			__memo(() => import('./nodes/24.js-WrZlFuZQ.js')),
			__memo(() => import('./nodes/25.js-BSAws35r.js')),
			__memo(() => import('./nodes/26.js-vzyBc11p.js')),
			__memo(() => import('./nodes/27.js-A4T1VcdF.js')),
			__memo(() => import('./nodes/28.js-CQHxy1qY.js')),
			__memo(() => import('./nodes/29.js-CP2ZyY1R.js')),
			__memo(() => import('./nodes/30.js-CCR-Fc6c.js')),
			__memo(() => import('./nodes/31.js-CZT8Mo68.js')),
			__memo(() => import('./nodes/32.js-BgKi2Pbc.js')),
			__memo(() => import('./nodes/33.js-BFnz9SdT.js')),
			__memo(() => import('./nodes/34.js-Bg7R4D7U.js')),
			__memo(() => import('./nodes/35.js-BoDFnCg3.js')),
			__memo(() => import('./nodes/36.js-CCrlroAP.js')),
			__memo(() => import('./nodes/37.js-DDX6nusE.js')),
			__memo(() => import('./nodes/38.js-KtDu0qGL.js')),
			__memo(() => import('./nodes/39.js-CWiBejl0.js')),
			__memo(() => import('./nodes/40.js-DYpPDo7C.js')),
			__memo(() => import('./nodes/41.js-DzgfnVtc.js')),
			__memo(() => import('./nodes/42.js-DyxtW46W.js')),
			__memo(() => import('./nodes/43.js-D_MCEQWe.js')),
			__memo(() => import('./nodes/44.js-DX8QM_nd.js')),
			__memo(() => import('./nodes/45.js-DqArLAbv.js')),
			__memo(() => import('./nodes/46.js-BtBcrcrl.js')),
			__memo(() => import('./nodes/47.js-3LmbLyO5.js')),
			__memo(() => import('./nodes/48.js-DELNYurB.js')),
			__memo(() => import('./nodes/49.js-hRcml9hk.js')),
			__memo(() => import('./nodes/50.js-C77zp99u.js')),
			__memo(() => import('./nodes/51.js-DUUKvH09.js')),
			__memo(() => import('./nodes/52.js-BbcvZZAW.js')),
			__memo(() => import('./nodes/53.js-L7bZzjYA.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/api/cron/upcoming-deliveries/_server.ts.js-GNX7imca.js'))
			},
			{
				id: "/api/postcode",
				pattern: /^\/api\/postcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/postcode/_server.ts.js-CUB_wkPf.js'))
			},
			{
				id: "/api/stripe/webhook",
				pattern: /^\/api\/stripe\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/stripe/webhook/_server.ts.js-bdPEc3Lz.js'))
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
				id: "/dashboard/deliveries/route",
				pattern: /^\/dashboard\/deliveries\/route\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/dashboard/orders",
				pattern: /^\/dashboard\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/guest",
				pattern: /^\/dashboard\/orders\/guest\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/one-time",
				pattern: /^\/dashboard\/orders\/one-time\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/subscriptions",
				pattern: /^\/dashboard\/orders\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/dashboard/plans",
				pattern: /^\/dashboard\/plans\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/dashboard/reports",
				pattern: /^\/dashboard\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/deliveries",
				pattern: /^\/dashboard\/reports\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/orders",
				pattern: /^\/dashboard\/reports\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/subscriptions",
				pattern: /^\/dashboard\/reports\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/dashboard/stock",
				pattern: /^\/dashboard\/stock\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/delivery",
				pattern: /^\/delivery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/demo/playwright",
				pattern: /^\/demo\/playwright\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 49 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 50 },
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
				page: { layouts: [0,], errors: [1,], leaf: 51 },
				endpoint: null
			},
			{
				id: "/subscription-terms",
				pattern: /^\/subscription-terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 52 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 53 },
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
//# sourceMappingURL=manifest.js-CmJ_YMBl.js.map
