//#region src/routes/+layout.server.ts
var load = async ({ locals, depends }) => {
	depends("app:session");
	return { user: locals.user };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-CMrL17-i.js.map
