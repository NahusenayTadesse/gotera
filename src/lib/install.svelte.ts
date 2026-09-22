// Chrome/Edge/Android fire `beforeinstallprompt` once per page load, and only one caller
// can use it. Holding it here lets the load toast and the account settings row share it.
export type BeforeInstallPromptEvent = Event & {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export const install = $state({
	/** The deferred browser prompt, when this browser offers one. */
	prompt: null as BeforeInstallPromptEvent | null,
	/** Already running as an installed app. */
	installed: false,
	/** iOS never offers a prompt; the only route is Share → Add to Home Screen. */
	ios: false
});

/** Show the browser's install dialog. Resolves true if the user accepted. */
export async function promptInstall() {
	const event = install.prompt;
	if (!event) return false;
	// A deferred prompt can only be shown once.
	install.prompt = null;
	await event.prompt();
	const { outcome } = await event.userChoice;
	return outcome === 'accepted';
}
