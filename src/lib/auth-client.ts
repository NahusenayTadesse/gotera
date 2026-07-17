import { createAuthClient } from 'better-auth/svelte';
import { oneTapClient } from "better-auth/client/plugins"; 
import { PUBLIC_CLIENTID as CLIENTID } from '$env/static/public';

console.log(CLIENTID)


// export const authClient = createAuthClient({});

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: CLIENTID,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 1000,   // Base delay in ms (default: 1000)
        maxAttempts: 5     // Maximum number of attempts before triggering onPromptNotification (default: 5)
      }
    })
  ]
})



const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};