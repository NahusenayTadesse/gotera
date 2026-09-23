import type { User, Session } from 'better-auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		/** Early `beforeinstallprompt`, caught in app.html before hydration. */
		__installPrompt?: Event;
	}

	namespace App {
		interface Locals {
			user?: User;
			session?: Session;
			role?: string;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
