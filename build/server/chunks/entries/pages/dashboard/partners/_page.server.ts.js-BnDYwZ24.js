import { s as setPartnerStatus, l as loadPartners } from '../../../../chunks/partners.server.js-BgyjteYQ.js';

//#region src/routes/dashboard/partners/+page.server.ts
var load = async ({ url }) => loadPartners(url);
var actions = { setStatus: setPartnerStatus };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BnDYwZ24.js.map
