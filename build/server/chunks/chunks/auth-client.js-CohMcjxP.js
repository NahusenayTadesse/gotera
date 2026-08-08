import { a5 as capitalizeFirstLetter, U as hasPermission, K as getBaseURL, a6 as parseJSON, a7 as userAc, a8 as adminAc$1 } from './access.js-HgBsL8za.js';
import { j as createFetch, k as defu } from './auth.js-DZBRJAcg.js';

const clean = Symbol('clean');

let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;
// Use globalThis.nanostoresGlobal to store epoch so all module instances share
// the same counter. This fixes issues when Nano Store is bundled separately
// in different parts of an application (e.g., tree-shaking separates core
// from React), causing each bundle to have its own epoch instance.
const nanostoresGlobal = (globalThis.nanostoresGlobal ||= { epoch: 0 });

let drainQueue = () => {
  for (
    lqIndex = 0;
    lqIndex < listenerQueue.length;
    lqIndex += QUEUE_ITEMS_PER_LISTENER
  ) {
    listenerQueue[lqIndex](
      listenerQueue[lqIndex + 1].value,
      listenerQueue[lqIndex + 2],
      listenerQueue[lqIndex + 3]
    );
  }
  listenerQueue.length = 0;
};

/* @__NO_SIDE_EFFECTS__ */
const atom = initialValue => {
  let listeners = [];
  let $atom = {
    get() {
      if (!$atom.lc) {
        $atom.listen(() => {})();
      }
      return $atom.value
    },
    init: initialValue,
    lc: 0,
    listen(listener) {
      $atom.lc = listeners.push(listener);

      return () => {
        for (
          let i = lqIndex + QUEUE_ITEMS_PER_LISTENER;
          i < listenerQueue.length;
        ) {
          if (listenerQueue[i] === listener) {
            listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
          } else {
            i += QUEUE_ITEMS_PER_LISTENER;
          }
        }

        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 1);
          if (!--$atom.lc) $atom.off();
        }
      }
    },
    notify(oldValue, changedKey) {
      nanostoresGlobal.epoch++;
      let runListenerQueue = !listenerQueue.length && true;
      for (let listener of listeners) {
        listenerQueue.push(
          listener,
          $atom,
          oldValue,
          changedKey
        );
      }

      if (runListenerQueue) {
        drainQueue();
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {},
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener) {
      let unbind = $atom.listen(listener);
      listener($atom.value);
      return unbind
    },
    value: initialValue
  };

  if (process.env.NODE_ENV !== 'production') {
    $atom[clean] = () => {
      listeners = [];
      $atom.lc = 0;
      $atom.off();
    };
  }

  return $atom
};

const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;

let on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) {
    object.events[eventKey + REVERT_MUTATION] = mutateStore(eventProps => {
      // eslint-disable-next-line no-sequences
      object.events[eventKey].reduceRight((event, l) => (l(event), event), {
        shared: {},
        ...eventProps
      });
    });
  }
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  }
};

const STORE_UNMOUNT_DELAY = 1000;

let onMount = ($store, initialize) => {
  let listener = payload => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, runListeners => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args)
    };

    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };

    if (process.env.NODE_ENV !== 'production') {
      let originClean = $store[clean];
      $store[clean] = () => {
        for (let destroy of $store.events[UNMOUNT]) destroy();
        $store.events[UNMOUNT] = [];
        $store.active = false;
        originClean();
      };
    }

    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    }
  })
};

//#region node_modules/better-auth/dist/client/fetch-plugins.mjs
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
//#endregion
//#region node_modules/better-auth/dist/client/query.mjs
var isServer = () => typeof window === "undefined";
var useAuthQuery = (initializedAtom, path, $fetch, options) => {
	const value = atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch: (queryParams) => fn(queryParams)
	});
	const fn = async (queryParams) => {
		return new Promise((resolve) => {
			const opts = typeof options === "function" ? options({
				data: value.get().data,
				error: value.get().error,
				isPending: value.get().isPending
			}) : options;
			$fetch(path, {
				...opts,
				query: {
					...opts?.query,
					...queryParams?.query
				},
				async onSuccess(context) {
					value.set({
						data: context.data,
						error: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onSuccess?.(context);
				},
				async onError(context) {
					const { request } = context;
					const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
					const retryAttempt = request.retryAttempt || 0;
					if (retryAttempts && retryAttempt < retryAttempts) return;
					value.set({
						error: context.error,
						data: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onError?.(context);
				},
				async onRequest(context) {
					const currentValue = value.get();
					value.set({
						isPending: currentValue.data === null,
						data: currentValue.data,
						error: null,
						isRefetching: true,
						refetch: value.value.refetch
					});
					await opts?.onRequest?.(context);
				}
			}).catch((error) => {
				value.set({
					error,
					data: null,
					isPending: false,
					isRefetching: false,
					refetch: value.value.refetch
				});
			}).finally(() => {
				resolve(void 0);
			});
		});
	};
	initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [initializedAtom];
	let isMounted = false;
	for (const initAtom of initializedAtom) initAtom.subscribe(async () => {
		if (isServer()) return;
		if (isMounted) await fn();
		else onMount(value, () => {
			const timeoutId = setTimeout(async () => {
				if (!isMounted) {
					await fn();
					isMounted = true;
				}
			}, 0);
			return () => {
				value.off();
				initAtom.off();
				clearTimeout(timeoutId);
			};
		});
	});
	return value;
};
//#endregion
//#region node_modules/better-auth/dist/client/broadcast-channel.mjs
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
//#endregion
//#region node_modules/better-auth/dist/client/focus-manager.mjs
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
//#endregion
//#region node_modules/better-auth/dist/client/online-manager.mjs
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
//#endregion
//#region node_modules/better-auth/dist/client/session-refresh.mjs
var now = () => Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { sessionAtom, sessionSignal, $fetch, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		lastSync: 0,
		lastSessionRequest: 0,
		cachedSession: void 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
			return;
		}
		const currentSession = sessionAtom.get();
		if (event?.event === "poll") {
			state.lastSessionRequest = now();
			$fetch("/get-session").then((res) => {
				if (res.error) sessionAtom.set({
					...currentSession,
					data: null,
					error: res.error
				});
				else sessionAtom.set({
					...currentSession,
					data: res.data,
					error: null
				});
				state.lastSync = now();
				sessionSignal.set(!sessionSignal.get());
			}).catch(() => {});
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now();
		}
		if (currentSession?.data === null || currentSession?.data === void 0 || event?.event === "visibilitychange") {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
		}
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (sessionAtom.get()?.data) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const init = () => {
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		getGlobalBroadcastChannel().setup();
		getGlobalFocusManager().setup();
		getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		state.lastSync = 0;
		state.lastSessionRequest = 0;
		state.cachedSession = void 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
//#endregion
//#region node_modules/better-auth/dist/client/session-atom.mjs
function getSessionAtom($fetch, options) {
	const $signal = atom(false);
	const session = useAuthQuery($signal, "/get-session", $fetch, { method: "GET" });
	onMount(session, () => {
		const refreshManager = createSessionRefreshManager({
			sessionAtom: session,
			sessionSignal: $signal,
			$fetch,
			options
		});
		refreshManager.init();
		return () => {
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal
	};
}
//#endregion
//#region node_modules/better-auth/dist/client/config.mjs
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session } = getSessionAtom($fetch, options);
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/change-email";
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		$fetch,
		$store
	};
};
//#endregion
//#region node_modules/better-auth/dist/utils/is-atom.mjs
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
//#endregion
//#region node_modules/better-auth/dist/client/proxy.mjs
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map((segment) => segment.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
//#endregion
//#region node_modules/better-auth/dist/client/svelte/index.mjs
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, atomListeners, $store } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[`use${capitalizeFirstLetter(key)}`] = () => value;
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
//#endregion
//#region node_modules/better-auth/dist/plugins/admin/client.mjs
var adminClient = (options) => {
	const roles = {
		admin: adminAc$1,
		user: userAc,
		...options?.roles
	};
	return {
		id: "admin-client",
		$InferServerPlugin: {},
		getActions: () => ({ admin: { checkRolePermission: (data) => {
			return hasPermission({
				role: data.role,
				options: {
					ac: options?.ac,
					roles
				},
				permissions: data.permissions ?? data.permission
			});
		} } }),
		pathMethods: {
			"/admin/list-users": "GET",
			"/admin/stop-impersonating": "POST"
		}
	};
};
//#endregion
//#region node_modules/better-auth/dist/plugins/one-tap/client.mjs
var isRequestInProgress = null;
function isFedCMSupported() {
	return typeof window !== "undefined" && "IdentityCredential" in window;
}
/**
* Reasons that should NOT trigger a retry.
* @see https://developers.google.com/identity/gsi/web/reference/js-reference
*/
var noRetryReasons = {
	dismissed: ["credential_returned", "cancel_called"],
	skipped: ["user_cancel", "tap_outside"]
};
var oneTapClient = (options) => {
	return {
		id: "one-tap",
		fetchPlugins: [{
			id: "fedcm-signout-handle",
			name: "FedCM Sign-Out Handler",
			hooks: { async onResponse(ctx) {
				if (!ctx.request.url.toString().includes("/sign-out")) return;
				if (options.promptOptions?.fedCM === false || !isFedCMSupported()) return;
				navigator.credentials.preventSilentAccess();
			} }
		}],
		getActions: ($fetch, _) => {
			return { oneTap: async (opts, fetchOptions) => {
				if (isRequestInProgress && !isRequestInProgress.signal.aborted) {
					console.warn("A Google One Tap request is already in progress. Please wait.");
					return;
				}
				if (typeof window === "undefined" || !window.document) {
					console.warn("Google One Tap is only available in browser environments");
					return;
				}
				if (opts?.button) {
					await loadGoogleScript();
					const container = typeof opts.button.container === "string" ? document.querySelector(opts.button.container) : opts.button.container;
					if (!container) {
						console.error("Google One Tap: Button container not found", opts.button.container);
						return;
					}
					async function callback$1(idToken) {
						await $fetch("/one-tap/callback", {
							method: "POST",
							body: { idToken },
							...opts?.fetchOptions,
							...fetchOptions
						});
						if (!opts?.fetchOptions && !fetchOptions || opts?.callbackURL) window.location.href = opts?.callbackURL ?? "/";
					}
					const { autoSelect: autoSelect$1, cancelOnTapOutside: cancelOnTapOutside$1, context: context$1 } = opts ?? {};
					const contextValue$1 = context$1 ?? options.context ?? "signin";
					window.google?.accounts.id.initialize({
						client_id: options.clientId,
						callback: async (response) => {
							try {
								await callback$1(response.credential);
							} catch (error) {
								console.error("Error during button callback:", error);
							}
						},
						auto_select: autoSelect$1,
						cancel_on_tap_outside: cancelOnTapOutside$1,
						context: contextValue$1,
						ux_mode: opts?.uxMode || "popup",
						nonce: opts?.nonce,
						itp_support: true,
						...options.additionalOptions
					});
					window.google?.accounts.id.renderButton(container, opts.button.config ?? { type: "icon" });
					return;
				}
				async function callback(idToken) {
					await $fetch("/one-tap/callback", {
						method: "POST",
						body: { idToken },
						...opts?.fetchOptions,
						...fetchOptions
					});
					if (!opts?.fetchOptions && !fetchOptions || opts?.callbackURL) window.location.href = opts?.callbackURL ?? "/";
				}
				const { autoSelect, cancelOnTapOutside, context } = opts ?? {};
				const contextValue = context ?? options.context ?? "signin";
				const clients = {
					fedCM: async () => {
						try {
							const identityCredential = await navigator.credentials.get({
								identity: {
									context: contextValue,
									providers: [{
										configURL: "https://accounts.google.com/gsi/fedcm.json",
										clientId: options.clientId,
										nonce: opts?.nonce
									}]
								},
								mediation: autoSelect ? "optional" : "required",
								signal: isRequestInProgress?.signal
							});
							if (!identityCredential?.token) {
								opts?.onPromptNotification?.(void 0);
								return;
							}
							try {
								await callback(identityCredential.token);
								return;
							} catch (error) {
								console.error("Error during FedCM callback:", error);
								throw error;
							}
						} catch (error) {
							if (error?.code && (error.code === 19 || error.code === 20)) {
								opts?.onPromptNotification?.(void 0);
								return;
							}
							throw error;
						}
					},
					oneTap: () => {
						return new Promise((resolve, reject) => {
							let isResolved = false;
							const baseDelay = options.promptOptions?.baseDelay ?? 1e3;
							const maxAttempts = options.promptOptions?.maxAttempts ?? 5;
							window.google?.accounts.id.initialize({
								client_id: options.clientId,
								callback: async (response) => {
									isResolved = true;
									try {
										await callback(response.credential);
										resolve();
									} catch (error) {
										console.error("Error during One Tap callback:", error);
										reject(error);
									}
								},
								auto_select: autoSelect,
								cancel_on_tap_outside: cancelOnTapOutside,
								context: contextValue,
								ux_mode: opts?.uxMode || "popup",
								nonce: opts?.nonce,
								itp_support: true,
								...options.additionalOptions
							});
							const handlePrompt = (attempt) => {
								if (isResolved) return;
								window.google?.accounts.id.prompt((notification) => {
									if (isResolved) return;
									if (notification.isDismissedMoment && notification.isDismissedMoment()) {
										const reason = notification.getDismissedReason?.();
										if (noRetryReasons.dismissed.includes(reason)) {
											opts?.onPromptNotification?.(notification);
											return;
										}
										if (attempt < maxAttempts) {
											const delay = Math.pow(2, attempt) * baseDelay;
											setTimeout(() => handlePrompt(attempt + 1), delay);
										} else opts?.onPromptNotification?.(notification);
									} else if (notification.isSkippedMoment && notification.isSkippedMoment()) {
										const reason = notification.getSkippedReason?.();
										if (noRetryReasons.skipped.includes(reason)) {
											opts?.onPromptNotification?.(notification);
											return;
										}
										if (attempt < maxAttempts) {
											const delay = Math.pow(2, attempt) * baseDelay;
											setTimeout(() => handlePrompt(attempt + 1), delay);
										} else opts?.onPromptNotification?.(notification);
									}
								});
							};
							handlePrompt(0);
						});
					}
				};
				if (isRequestInProgress) isRequestInProgress?.abort();
				isRequestInProgress = new AbortController();
				try {
					const client = options.promptOptions?.fedCM === false || !isFedCMSupported() ? "oneTap" : "fedCM";
					if (client === "oneTap") await loadGoogleScript();
					await clients[client]();
				} catch (error) {
					console.error("Error during Google One Tap flow:", error);
					throw error;
				} finally {
					isRequestInProgress = null;
				}
			} };
		},
		getAtoms($fetch) {
			return {};
		}
	};
};
var loadGoogleScript = () => {
	return new Promise((resolve) => {
		if (window.googleScriptInitialized) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = () => {
			window.googleScriptInitialized = true;
			resolve();
		};
		document.head.appendChild(script);
	});
};
//#endregion
//#region src/lib/auth-client.ts
createAuthClient({ plugins: [adminClient(), oneTapClient({
	clientId: "172962043263-3rfgpqq23nkosobo4hllej0bmrihggvi.apps.googleusercontent.com",
	autoSelect: false,
	cancelOnTapOutside: true,
	context: "use",
	additionalOptions: {
		use_fedcm_for_prompt: true,
		use_fedcm_for_button: true,
		itp_support: true
	},
	promptOptions: {
		baseDelay: 1e3,
		maxAttempts: 5
	}
})] });
//# sourceMappingURL=auth-client.js-CohMcjxP.js.map
