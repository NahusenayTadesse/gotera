var SvelteMap = globalThis.Map;
var MediaQuery = class {
	current;
	/**
	* @param {string} query
	* @param {boolean} [matches]
	*/
	constructor(query, matches = false) {
		this.current = matches;
	}
};
/**
* @param {any} _
*/
function createSubscriber(_) {
	return () => {};
}

export { MediaQuery as M, SvelteMap as S, createSubscriber as c };
//# sourceMappingURL=index-server2.js-C2dghAGm.js.map
