//#region src/lib/postcode.svelte.ts
var DEBOUNCE_MS = 250;
var LOOKS_COMPLETE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
var nextId = 0;
var PostcodeLookup = class {
	/** Suggestions for the `<datalist>`. Empty whenever anything went wrong. */
	suggestions = [];
	/** The resolved centroid, or null. Exposed so a page can show a quiet confirmation. */
	match = null;
	/** Unique per instance so several address blocks on one page don't share a datalist. */
	listId = `pc-list-${nextId++}`;
	#timer;
	/** Monotonic request id: a slow response that lost the race is dropped, not applied. */
	#seq = 0;
	#onMatch;
	/**
	* @param onMatch Called whenever the resolved centroid changes — including with null
	*   when the postcode stops resolving, so a corrected postcode can't leave the
	*   previous address's coordinates attached to the order.
	*/
	constructor(onMatch = () => {}) {
		this.#onMatch = onMatch;
	}
	/** Call from the postcode input's `oninput`. */
	search(value) {
		clearTimeout(this.#timer);
		const q = value.trim();
		if (q.length < 3) {
			this.suggestions = [];
			this.#setMatch(null);
			return;
		}
		this.#timer = setTimeout(() => void this.#fetch(q), DEBOUNCE_MS);
	}
	async #fetch(q) {
		const seq = ++this.#seq;
		const resolve = LOOKS_COMPLETE.test(q) ? "&resolve=1" : "";
		try {
			const res = await fetch(`/api/postcode?q=${encodeURIComponent(q)}${resolve}`);
			if (!res.ok) return this.#clear(seq);
			const body = await res.json();
			if (seq !== this.#seq) return;
			this.suggestions = Array.isArray(body?.suggestions) ? body.suggestions : [];
			this.#setMatch(body?.match ?? null);
		} catch {
			this.#clear(seq);
		}
	}
	#clear(seq) {
		if (seq !== this.#seq) return;
		this.suggestions = [];
		this.#setMatch(null);
	}
	#setMatch(next) {
		if (this.match?.postcode === next?.postcode) return;
		this.match = next;
		this.#onMatch(next);
	}
	/** Cancel any in-flight debounce. Call from an `onDestroy` if the field can unmount. */
	destroy() {
		clearTimeout(this.#timer);
		this.#seq++;
	}
};

export { PostcodeLookup as P };
//# sourceMappingURL=postcode.svelte.js-Dq27M4SR.js.map
