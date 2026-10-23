import { s as setPartnerStatus, l as loadPartners } from '../../../../../chunks/partners.server.js-wv-XFCqP.js';

//#region src/routes/dashboard/partners/[status=partnerStatus]/+page.server.ts
var load = async ({ url, params }) => loadPartners(url, params.status);
var actions = { setStatus: setPartnerStatus };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-C8lBu4_G.js.map
