import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

if (!env.STRIPE_SECRET_KEY) {
	throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
	// Pin to the version shown in your Stripe Dashboard → Developers → API version.
	// Omit to use the version the installed SDK is built against.
	// apiVersion: '2025-xx-xx',
	typescript: true
});