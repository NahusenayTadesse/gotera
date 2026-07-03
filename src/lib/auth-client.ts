import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({});

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};