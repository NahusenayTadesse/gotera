import { M as MediaQuery } from './scroll-lock.js-DUdP1Ngb.js';

//#region src/lib/hooks/is-mobile.svelte.ts
var DEFAULT_MOBILE_BREAKPOINT = 768;
var IsMobile = class extends MediaQuery {
	constructor(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
};

export { IsMobile as I };
//# sourceMappingURL=is-mobile.svelte.js-C7rjivRg.js.map
