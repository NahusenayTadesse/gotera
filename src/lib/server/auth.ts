import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { magicLink } from 'better-auth/plugins';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'mysql' }),
	emailAndPassword: { enabled: true },
	socialProviders: {
        google: { 
			prompt: "select_account", 
            clientId: env.CLIENTID as string, 
            clientSecret: env.CLIENTSECRET as string, 
        }, 
		
    },
	plugins: [
		magicLink({
			sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
				
			}
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
