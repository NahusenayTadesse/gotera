const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["hero.jpeg","hero.mp4","injera/injera1.webp","injera/injera10.webp","injera/injera11.webp","injera/injera12.webp","injera/injera13.webp","injera/injera14.webp","injera/injera15.webp","injera/injera16.webp","injera/injera17.webp","injera/injera18.webp","injera/injera19.webp","injera/injera2.webp","injera/injera20.webp","injera/injera21.webp","injera/injera22.webp","injera/injera23.webp","injera/injera24.webp","injera/injera25.webp","injera/injera26.webp","injera/injera27.webp","injera/injera28.webp","injera/injera29.webp","injera/injera3.webp","injera/injera30.webp","injera/injera31.webp","injera/injera4.webp","injera/injera5.webp","injera/injera6.webp","injera/injera7.webp","injera/injera8.webp","injera/injera9.webp","injera.avif","logo192.jpg","output.webm","robots.txt","teff.webp"]),
	mimeTypes: {".jpeg":"image/jpeg",".mp4":"video/mp4",".webp":"image/webp",".avif":"image/avif",".jpg":"image/jpeg",".webm":"video/webm",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CQzwR265.js",app:"_app/immutable/entry/app.DYSqXW33.js",imports:["_app/immutable/entry/start.CQzwR265.js","_app/immutable/chunks/DxU4dZmx.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/entry/app.DYSqXW33.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/CJHoYK9W.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-BICz2gF6.js')),
			__memo(() => import('./nodes/1.js-ez7eVTTG.js')),
			__memo(() => import('./nodes/2.js-B-lOT-GU.js')),
			__memo(() => import('./nodes/3.js-jOxydsWf.js')),
			__memo(() => import('./nodes/4.js-hVGE3itl.js')),
			__memo(() => import('./nodes/5.js-DcZQl4Pu.js')),
			__memo(() => import('./nodes/6.js-g99VSi9D.js')),
			__memo(() => import('./nodes/7.js-Bf4VRCsR.js')),
			__memo(() => import('./nodes/8.js-D6oBqu3c.js')),
			__memo(() => import('./nodes/9.js-CH0oeC2E.js')),
			__memo(() => import('./nodes/10.js-BEW0vrYe.js')),
			__memo(() => import('./nodes/11.js-Bjj0CPc7.js')),
			__memo(() => import('./nodes/12.js-BecE35Pw.js')),
			__memo(() => import('./nodes/13.js-DuMYWiRu.js')),
			__memo(() => import('./nodes/14.js-CzHar9a4.js')),
			__memo(() => import('./nodes/15.js-Bw3_wiZ-.js')),
			__memo(() => import('./nodes/16.js-BIiLrN17.js')),
			__memo(() => import('./nodes/17.js-BcSSWAv5.js')),
			__memo(() => import('./nodes/18.js-Dv_z0VG7.js')),
			__memo(() => import('./nodes/19.js-CDYm7wom.js')),
			__memo(() => import('./nodes/20.js-Brd2WcBk.js')),
			__memo(() => import('./nodes/21.js-Dsiqd2Dk.js')),
			__memo(() => import('./nodes/22.js-9YNGVXdc.js')),
			__memo(() => import('./nodes/23.js-g0phrAKE.js')),
			__memo(() => import('./nodes/24.js-QyTBjASR.js')),
			__memo(() => import('./nodes/25.js-B-jqDQTs.js')),
			__memo(() => import('./nodes/26.js-DBsJEV_Y.js')),
			__memo(() => import('./nodes/27.js-DG5_T3XI.js')),
			__memo(() => import('./nodes/28.js-BX_EdSRx.js')),
			__memo(() => import('./nodes/29.js-CwhGZI-0.js')),
			__memo(() => import('./nodes/30.js-DnYUnI4k.js')),
			__memo(() => import('./nodes/31.js-BMlgSID9.js')),
			__memo(() => import('./nodes/32.js-C9ddUG4o.js')),
			__memo(() => import('./nodes/33.js-BHYcNaqm.js')),
			__memo(() => import('./nodes/34.js-Bx4uifPe.js')),
			__memo(() => import('./nodes/35.js-JAPCbUJg.js')),
			__memo(() => import('./nodes/36.js-B4XhUbfG.js')),
			__memo(() => import('./nodes/37.js-pBNrC8H-.js')),
			__memo(() => import('./nodes/38.js-DsiRAhbv.js')),
			__memo(() => import('./nodes/39.js-D_eiqfVB.js')),
			__memo(() => import('./nodes/40.js-C1MTHFvg.js')),
			__memo(() => import('./nodes/41.js-BXdcSONw.js')),
			__memo(() => import('./nodes/42.js-Oq5y9MhN.js')),
			__memo(() => import('./nodes/43.js-nTdtX8dy.js')),
			__memo(() => import('./nodes/44.js-Uc58qsle.js')),
			__memo(() => import('./nodes/45.js-DJpX4rT1.js')),
			__memo(() => import('./nodes/46.js-CCbKWmb9.js')),
			__memo(() => import('./nodes/47.js-DnLuZPja.js')),
			__memo(() => import('./nodes/48.js-CHqBiEVC.js')),
			__memo(() => import('./nodes/49.js-DGA0moz1.js'))
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
				id: "/allergens",
				pattern: /^\/allergens\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/api/stripe/webhook",
				pattern: /^\/api\/stripe\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/stripe/webhook/_server.ts.js-DVsRDmpY.js'))
			},
			{
				id: "/auth/popup-callback",
				pattern: /^\/auth\/popup-callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel",
				pattern: /^\/dashboard\/admin-panel\/?$/,
				params: [],
				page: { layouts: [0,3,5,], errors: [1,4,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/addons",
				pattern: /^\/dashboard\/admin-panel\/addons\/?$/,
				params: [],
				page: { layouts: [0,3,5,], errors: [1,4,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/add-roles",
				pattern: /^\/dashboard\/admin-panel\/roles\/add-roles\/?$/,
				params: [],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/roles/[id]",
				pattern: /^\/dashboard\/admin-panel\/roles\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,6,], errors: [1,4,,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users",
				pattern: /^\/dashboard\/admin-panel\/users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/add-users",
				pattern: /^\/dashboard\/admin-panel\/users\/add-users\/?$/,
				params: [],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/dashboard/admin-panel/users/[id]",
				pattern: /^\/dashboard\/admin-panel\/users\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,5,7,], errors: [1,4,,,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/dashboard/bulk-email",
				pattern: /^\/dashboard\/bulk-email\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/dashboard/customers",
				pattern: /^\/dashboard\/customers\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/dashboard/deliveries",
				pattern: /^\/dashboard\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/dashboard/orders",
				pattern: /^\/dashboard\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/guest",
				pattern: /^\/dashboard\/orders\/guest\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/one-time",
				pattern: /^\/dashboard\/orders\/one-time\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/subscriptions",
				pattern: /^\/dashboard\/orders\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/dashboard/plans",
				pattern: /^\/dashboard\/plans\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/dashboard/reports",
				pattern: /^\/dashboard\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/deliveries",
				pattern: /^\/dashboard\/reports\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/orders",
				pattern: /^\/dashboard\/reports\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/subscriptions",
				pattern: /^\/dashboard\/reports\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/delivery",
				pattern: /^\/delivery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/subscribe",
				pattern: /^\/subscribe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/subscription-terms",
				pattern: /^\/subscription-terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 48 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 49 },
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
//# sourceMappingURL=manifest.js-BaGquyK1.js.map
