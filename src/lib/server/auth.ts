import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { magicLink } from 'better-auth/plugins';
import { oneTap } from "better-auth/plugins"; 
import { admin } from "better-auth/plugins"


import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import {
	sendResetPassword,
	sendVerifyEmail,
	sendChangeEmail,
	sendMagicLink
} from '$lib/server/email';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'mysql' }),

	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			await sendResetPassword(user.email, url);
		}
	},

	emailVerification: {
		sendOnSignUp: true, // fire the verification email automatically on signup
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendVerifyEmail(user.email, url);
		}
	},

	// Enables auth.api.changeEmail (your /account/details email edit)
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailVerification: async ({ newEmail, url }) => {
				await sendChangeEmail(newEmail, url);
			}
		}
	},

	socialProviders: {
		google: {
			prompt: 'select_account',
			clientId: env.CLIENTID as string,
			clientSecret: env.CLIENTSECRET as string
		}
	},

	// Runs for EVERY new user (email, Google, magic link) → one consistent
	// pending subscriber. Lets you drop the insert from your signup action.
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					const [existing] = await db
						.select()
						.from(subscribers)
						.where(eq(subscribers.userId, user.id));
					if (!existing) {
						await db.insert(subscribers).values({
							id: crypto.randomUUID(),
							userId: user.id,
							email: user.email,
							fullName: user.name ?? null,
							plan: null,
							status: 'pending',
							marketingOptIn: true
						});
					}
				}
			}
		}
	},

	plugins: [
		admin(),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await sendMagicLink(email, url);
			}
		}),
		 oneTap(), 
		sveltekitCookies(getRequestEvent) // keep last
	]
});