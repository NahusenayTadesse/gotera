<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		// We're inside the popup. Notify the opener, then close.
		if (window.opener) {
			window.opener.postMessage({ type: 'oauth-complete' }, window.location.origin);
			window.close();
		}
	});
</script>
<p style="font-family: sans-serif; padding: 24px;">Signing you in… you can close this window.</p>