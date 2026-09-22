/**
 * Postcode suggestions + coordinates for the checkout address fields.
 *
 * ── Why this is a behaviour module and not a component ──
 * The address block is repeated across /subscribe (mobile and desktop × me and gift) and
 * /account/details, but each copy is styled by its page's *scoped* CSS (`.sub-field` and
 * `.input` are different design languages). Svelte scoping does not cross component
 * boundaries, so lifting the markup into a shared component would strip its styling and
 * risk visual regressions on the page that takes the money. Lifting only the behaviour
 * gets the reuse with none of that risk: each site keeps its own markup and adds two
 * lines.
 *
 * ── The rule this exists to uphold ──
 * Geocoding must never block an order. Every failure path here — offline, 500, unknown
 * postcode, slow response — ends in "no suggestions, no coordinates" and the customer
 * carries on typing their address exactly as before. Nothing in here sets a form error,
 * disables a control, or gates a submit.
 *
 * Usage:
 *   const pc = new PostcodeLookup((c) => { $form.latitude = c?.latitude ?? undefined; … });
 *   <input bind:value={$form.postcode} oninput={(e) => pc.search(e.currentTarget.value)}
 *          list={pc.listId} />
 *   <datalist id={pc.listId}>{#each pc.suggestions as s}<option value={s}></option>{/each}</datalist>
 */

/** A resolved postcode centroid, as returned by /api/postcode. */
export type PostcodeMatch = {
	postcode: string;
	latitude: number;
	longitude: number;
	district: string | null;
};

/** Keystrokes settle before we call out; ~250ms is below the threshold of feeling laggy. */
const DEBOUNCE_MS = 250;

/**
 * Rough "has the customer finished typing a postcode?" test, used only to decide whether
 * to ask for coordinates alongside suggestions. Deliberately loose — it gates an optional
 * extra lookup, never the customer's ability to submit — so a false negative costs a
 * geocode, not an order.
 */
const LOOKS_COMPLETE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

let nextId = 0;

export class PostcodeLookup {
	/** Suggestions for the `<datalist>`. Empty whenever anything went wrong. */
	suggestions = $state<string[]>([]);
	/** The resolved centroid, or null. Exposed so a page can show a quiet confirmation. */
	match = $state<PostcodeMatch | null>(null);

	/** Unique per instance so several address blocks on one page don't share a datalist. */
	readonly listId = `pc-list-${nextId++}`;

	#timer: ReturnType<typeof setTimeout> | undefined;
	/** Monotonic request id: a slow response that lost the race is dropped, not applied. */
	#seq = 0;
	#onMatch: (match: PostcodeMatch | null) => void;

	/**
	 * @param onMatch Called whenever the resolved centroid changes — including with null
	 *   when the postcode stops resolving, so a corrected postcode can't leave the
	 *   previous address's coordinates attached to the order.
	 */
	constructor(onMatch: (match: PostcodeMatch | null) => void = () => {}) {
		this.#onMatch = onMatch;
	}

	/** Call from the postcode input's `oninput`. */
	search(value: string) {
		clearTimeout(this.#timer);
		const q = value.trim();

		// Clearing the field clears everything, including any coordinates already handed
		// to the form.
		if (q.length < 3) {
			this.suggestions = [];
			this.#setMatch(null);
			return;
		}

		this.#timer = setTimeout(() => void this.#fetch(q), DEBOUNCE_MS);
	}

	async #fetch(q: string) {
		const seq = ++this.#seq;
		const resolve = LOOKS_COMPLETE.test(q) ? '&resolve=1' : '';
		try {
			const res = await fetch(`/api/postcode?q=${encodeURIComponent(q)}${resolve}`);
			if (!res.ok) return this.#clear(seq);
			const body = await res.json();
			// A response that arrived after a newer keystroke is stale — applying it would
			// show suggestions for a postcode the customer has already edited past.
			if (seq !== this.#seq) return;
			this.suggestions = Array.isArray(body?.suggestions) ? body.suggestions : [];
			this.#setMatch(body?.match ?? null);
		} catch {
			// Offline, blocked by an extension, DNS failure — all the same non-event.
			this.#clear(seq);
		}
	}

	#clear(seq: number) {
		if (seq !== this.#seq) return;
		this.suggestions = [];
		this.#setMatch(null);
	}

	#setMatch(next: PostcodeMatch | null) {
		// Only notify on a real change, so the form isn't marked dirty by every keystroke
		// that leaves an unresolvable postcode unresolvable.
		if (this.match?.postcode === next?.postcode) return;
		this.match = next;
		this.#onMatch(next);
	}

	/** Cancel any in-flight debounce. Call from an `onDestroy` if the field can unmount. */
	destroy() {
		clearTimeout(this.#timer);
		this.#seq++;
	}
}
