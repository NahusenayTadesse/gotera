import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			typescript: {
				config: (config) => ({
					...config,
					include: [...config.include, '../drizzle.config.ts']
				})
			}
		}),

		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			emitTsDeclarations: true,
			// Bare paths (no locale prefix) never consult the URL — only the
			// cookie, then the base locale. `en` is unprefixed by design, so its
			// "localized pattern" is a catch-all that would otherwise swallow
			// any literal path (including "/en" itself) as opaque data instead
			// of recognizing it as a locale prefix. Keeping "url" out of the
			// default strategy avoids that ambiguity; /en is handled explicitly
			// in hooks.server.ts instead.
			strategy: ['cookie', 'baseLocale'],
			// An explicit /am/... URL always wins over a stale cookie, and
			// switching locale from an /am/... page still updates the cookie.
			routeStrategies: [{ match: '/am/:path(.*)?', strategy: ['url', 'cookie'] }]
		})
	]
});
