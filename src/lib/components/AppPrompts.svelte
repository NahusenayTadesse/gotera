<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages.js';
	import { currentPushSubscription, pushSupported, subscribeToPush } from '$lib/push';
	import { install, promptInstall, type BeforeInstallPromptEvent } from '$lib/install.svelte';

	let { signedIn = false }: { signedIn?: boolean } = $props();

	const INSTALL_KEY = 'gotera:install-dismissed';
	// A dismissed prompt stays quiet for two weeks rather than nagging on every visit.
	const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;

	function snoozed(key: string) {
		try {
			return Date.now() - Number(localStorage.getItem(key) ?? 0) < SNOOZE_MS;
		} catch {
			return false;
		}
	}

	function snooze(key: string) {
		try {
			localStorage.setItem(key, String(Date.now()));
		} catch {
			// Private mode / blocked storage: the prompt just comes back next visit.
		}
	}

	onMount(() => {
		const standalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(navigator as Navigator & { standalone?: boolean }).standalone === true;

		const timers: ReturnType<typeof setTimeout>[] = [];
		let installToastId: string | number | undefined;

		function showInstallToast(onInstall?: () => void) {
			installToastId = toast(m.app_install_title(), {
				description: onInstall ? m.app_install_body() : m.app_install_ios_body(),
				// Fades on its own rather than waiting to be dealt with; either way it then
				// stays away for the snooze period.
				duration: 10000,
				action: onInstall ? { label: m.app_install_action(), onClick: onInstall } : undefined,
				cancel: { label: m.app_later(), onClick: () => snooze(INSTALL_KEY) },
				onAutoClose: () => snooze(INSTALL_KEY),
				onDismiss: () => snooze(INSTALL_KEY)
			});
		}

		// Chrome/Edge/Android fire this instead of showing their own install banner once
		// we call preventDefault(). It's kept for the account settings row even when the
		// toast itself is snoozed.
		function onBeforeInstallPrompt(e: Event) {
			e.preventDefault();
			install.prompt = e as BeforeInstallPromptEvent;
			delete window.__installPrompt;
			if (snoozed(INSTALL_KEY)) return;
			timers.push(
				setTimeout(
					() =>
						showInstallToast(async () => {
							if (!(await promptInstall())) snooze(INSTALL_KEY);
						}),
					1500
				)
			);
		}

		function onAppInstalled() {
			install.installed = true;
			install.prompt = null;
			if (installToastId !== undefined) toast.dismiss(installToastId);
		}

		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		// Fired before hydration and caught by the inline script in app.html.
		if (window.__installPrompt) onBeforeInstallPrompt(window.__installPrompt);
		window.addEventListener('appinstalled', onAppInstalled);

		// iOS Safari never fires beforeinstallprompt, so there all we can do is explain
		// the manual Add to Home Screen step.
		const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
		install.ios = isIos;
		install.installed = standalone;
		if (isIos && !standalone && !snoozed(INSTALL_KEY)) {
			timers.push(setTimeout(() => showInstallToast(), 1500));
		}

		// Notifications are opt-in from the account sidebar only — never prompted. If this
		// browser already allowed them, quietly keep it registered to whoever is signed in
		// now (covers switching accounts and rotated subscriptions).
		if (signedIn && pushSupported() && Notification.permission === 'granted') {
			currentPushSubscription()
				.then((sub) => sub && subscribeToPush())
				.catch(console.error);
		}

		return () => {
			timers.forEach(clearTimeout);
			window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
			window.removeEventListener('appinstalled', onAppInstalled);
		};
	});
</script>
