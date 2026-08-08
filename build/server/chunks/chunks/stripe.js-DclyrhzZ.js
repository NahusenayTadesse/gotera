import { b as private_env } from './shared-server.js-9-2j12mp.js';
import Stripe from 'stripe';

//#region src/lib/server/stripe.ts
if (!private_env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");
var stripe = new Stripe(private_env.STRIPE_SECRET_KEY, { typescript: true });

export { stripe as s };
//# sourceMappingURL=stripe.js-DclyrhzZ.js.map
