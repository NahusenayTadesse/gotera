import { createAuthClient } from 'better-auth/svelte';
import { oneTapClient } from "better-auth/client/plugins"; 
import { PUBLIC_CLIENTID as CLIENTID } from '$env/static/public';



// export const authClient = createAuthClient({});

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: CLIENTID,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        use_fedcm_for_prompt: true,   // One Tap → native widget
        use_fedcm_for_button: true,   // button click → native modal
        itp_support: true
      },
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