import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	// MapLibre ships its tile-decoding logic as a web worker. Vite's dependency
	// pre-bundler rewrites the import so the worker 404s in dev, and the map then renders
	// an empty canvas — the style and sprites load fine, but no vector tile is ever
	// decoded, so there is no error to notice, just a blank box. Excluding it from
	// optimisation leaves the worker import intact.
	optimizeDeps: { exclude: ['maplibre-gl'] },
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
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					// These are integration tests against one shared database — several files
					// operate on the same seeded rows (the first `deliveries` row in
					// particular). Running files in parallel makes them race and fail
					// intermittently, so the server project runs them one file at a time.
					fileParallelism: false,
					// Live Stripe calls make some files slower than the 5s default.
					testTimeout: 20000
				}
			}
		]
	}
});
