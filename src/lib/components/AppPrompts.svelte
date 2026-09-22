<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { m } from '$lib/paraglide/messages.js';
	import { currentPushSubscription, pushSupported, subscribeToPush } from '$lib/push';

	let { signedIn = false }: { signedIn?: boolean } = $props();

	// Chrome/Edge/Android fire this instead of showing their own install banner once
	// we call preventDefault(); it isn't in the TS DOM lib yet.
	type BeforeInstallPromptEvent = Event & {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	};

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

		function onBeforeInstallPrompt(e: Event) {
			e.preventDefault();
			if (snoozed(INSTALL_KEY)) return;
			const installEvent = e as BeforeInstallPromptEvent;
			timers.push(
				setTimeout(
					() =>
						showInstallToast(async () => {
							await installEvent.prompt();
							const { outcome } = await installEvent.userChoice;
							if (outcome === 'dismissed') snooze(INSTALL_KEY);
						}),
					1500
				)
			);
		}

		function onAppInstalled() {
			if (installToastId !== undefined) toast.dismiss(installToastId);
		}

		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		window.addEventListener('appinstalled', onAppInstalled);

		// iOS Safari never fires beforeinstallprompt, so there all we can do is explain
		// the manual Add to Home Screen step.
		const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
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
