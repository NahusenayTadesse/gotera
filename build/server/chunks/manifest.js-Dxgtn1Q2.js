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
		client: {start:"_app/immutable/entry/start.BDqje_Ns.js",app:"_app/immutable/entry/app.Caqyn5qc.js",imports:["_app/immutable/entry/start.BDqje_Ns.js","_app/immutable/chunks/4GjcWxoK.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/entry/app.Caqyn5qc.js","_app/immutable/chunks/Cxhu7noS.js","_app/immutable/chunks/DYl5dUZ5.js","_app/immutable/chunks/CJHoYK9W.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-CQBjNX9P.js')),
			__memo(() => import('./nodes/1.js-CrT-jKty.js')),
			__memo(() => import('./nodes/2.js-Dvwb7c-x.js')),
			__memo(() => import('./nodes/3.js-BLp08_TO.js')),
			__memo(() => import('./nodes/4.js-CfUXYNwJ.js')),
			__memo(() => import('./nodes/5.js-DcZQl4Pu.js')),
			__memo(() => import('./nodes/6.js-BuCXqGBr.js')),
			__memo(() => import('./nodes/7.js-DwIbfb2n.js')),
			__memo(() => import('./nodes/8.js-BzZzG6zF.js')),
			__memo(() => import('./nodes/9.js-C7kiH8st.js')),
			__memo(() => import('./nodes/10.js-D5-PQPR5.js')),
			__memo(() => import('./nodes/11.js-DDhqfiTD.js')),
			__memo(() => import('./nodes/12.js-oMvFfyxL.js')),
			__memo(() => import('./nodes/13.js-5dYUBXHd.js')),
			__memo(() => import('./nodes/14.js-CsOW14hD.js')),
			__memo(() => import('./nodes/15.js-DmXNDvLb.js')),
			__memo(() => import('./nodes/16.js-BGDGFV67.js')),
			__memo(() => import('./nodes/17.js-BcSSWAv5.js')),
			__memo(() => import('./nodes/18.js-BzrJlidU.js')),
			__memo(() => import('./nodes/19.js-CDYm7wom.js')),
			__memo(() => import('./nodes/20.js-Cvy4dZ8J.js')),
			__memo(() => import('./nodes/21.js-8O5s9LU0.js')),
			__memo(() => import('./nodes/22.js-DGWKthQj.js')),
			__memo(() => import('./nodes/23.js-RTgcYfCA.js')),
			__memo(() => import('./nodes/24.js-Djci-b4c.js')),
			__memo(() => import('./nodes/25.js-DhZBlGrk.js')),
			__memo(() => import('./nodes/26.js-DY8iDvns.js')),
			__memo(() => import('./nodes/27.js-CRt_nBip.js')),
			__memo(() => import('./nodes/28.js-3SVqm45R.js')),
			__memo(() => import('./nodes/29.js-CApHoJwJ.js')),
			__memo(() => import('./nodes/30.js-D2V0RL3J.js')),
			__memo(() => import('./nodes/31.js-Bu_LjIUW.js')),
			__memo(() => import('./nodes/32.js-Bd-mWeVX.js')),
			__memo(() => import('./nodes/33.js-4ng9A_qs.js')),
			__memo(() => import('./nodes/34.js-B2Ngmh7x.js')),
			__memo(() => import('./nodes/35.js-PwGrPQAp.js')),
			__memo(() => import('./nodes/36.js-ZhkBYpId.js')),
			__memo(() => import('./nodes/37.js-DU_rh6-d.js')),
			__memo(() => import('./nodes/38.js-CENHN6px.js')),
			__memo(() => import('./nodes/39.js-Cdy19J_6.js')),
			__memo(() => import('./nodes/40.js-yLo4gm4i.js')),
			__memo(() => import('./nodes/41.js-BJO077Qa.js')),
			__memo(() => import('./nodes/42.js-CK3w4-TA.js')),
			__memo(() => import('./nodes/43.js-oXwUg_eN.js')),
			__memo(() => import('./nodes/44.js-BrHmualY.js')),
			__memo(() => import('./nodes/45.js-0GilhI09.js')),
			__memo(() => import('./nodes/46.js-rFmXHX6_.js')),
			__memo(() => import('./nodes/47.js-DYDa-rgK.js')),
			__memo(() => import('./nodes/48.js-ftQEUqu_.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/api/stripe/webhook/_server.ts.js-CQw43CC_.js'))
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
				id: "/dashboard/customers",
				pattern: /^\/dashboard\/customers\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/dashboard/deliveries",
				pattern: /^\/dashboard\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/dashboard/orders",
				pattern: /^\/dashboard\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/guest",
				pattern: /^\/dashboard\/orders\/guest\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/one-time",
				pattern: /^\/dashboard\/orders\/one-time\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/dashboard/orders/subscriptions",
				pattern: /^\/dashboard\/orders\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/dashboard/plans",
				pattern: /^\/dashboard\/plans\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/dashboard/reports",
				pattern: /^\/dashboard\/reports\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 34 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/deliveries",
				pattern: /^\/dashboard\/reports\/deliveries\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 35 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/orders",
				pattern: /^\/dashboard\/reports\/orders\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 36 },
				endpoint: null
			},
			{
				id: "/dashboard/reports/subscriptions",
				pattern: /^\/dashboard\/reports\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,4,], leaf: 37 },
				endpoint: null
			},
			{
				id: "/delivery",
				pattern: /^\/delivery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 38 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 39 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 40 },
				endpoint: null
			},
			{
				id: "/faq",
				pattern: /^\/faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 41 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 42 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 43 },
				endpoint: null
			},
			{
				id: "/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 44 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 45 },
				endpoint: null
			},
			{
				id: "/subscribe",
				pattern: /^\/subscribe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 46 },
				endpoint: null
			},
			{
				id: "/subscription-terms",
				pattern: /^\/subscription-terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 47 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 48 },
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
//# sourceMappingURL=manifest.js-Dxgtn1Q2.js.map
