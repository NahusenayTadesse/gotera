import { B as redirect } from './utils.js-BQt5v-8G.js';

//#region node_modules/sveltekit-flash-message/dist/server.js
var cookieName = "flash";
var flashCookieOptions = {
	path: "/",
	maxAge: 120,
	httpOnly: false,
	sameSite: "strict"
};
function redirect$1(status, location, message, event) {
	switch (arguments.length) {
		case 2: if (typeof status === "number") return realRedirect(status, `${location}`);
		else {
			const message = status;
			const event = location;
			const redirectUrl = new URL(event.url);
			for (const [key] of redirectUrl.searchParams) {
				if (key.startsWith("/")) redirectUrl.searchParams.delete(key);
				break;
			}
			return realRedirect(303, redirectUrl, message, event);
		}
		case 3: return realRedirect(303, status, location, message);
		case 4: return realRedirect(status, location, message, event);
		default: throw new Error("Invalid redirect arguments");
	}
}
function realRedirect(status, location, message, event) {
	if (!message) return redirect(status, location.toString());
	if (!event) throw new Error("RequestEvent is required for redirecting with flash message");
	("cookies" in event ? event.cookies : event).set(cookieName, JSON.stringify(message), {
		...flashCookieOptions,
		path: flashCookieOptions.path
	});
	return redirect(status, location.toString());
}
/**
* Set the flash message without redirecting, for example when validation fails in a form action.
* @param {App.PageData['flash']} message The flash message.
* @param {RequestEvent} event The event for the form action or load function.
*/
function setFlash(message, event) {
	("cookies" in event ? event.cookies : event).set(cookieName, JSON.stringify(message), {
		...flashCookieOptions,
		path: flashCookieOptions.path
	});
}

export { redirect$1 as r, setFlash as s };
//# sourceMappingURL=server2.js-BivggJkG.js.map
