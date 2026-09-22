<script lang="ts">
	import Logout from '$lib/forms/Logout.svelte';
	import InstallAppRow from './InstallAppRow.svelte';
	import NotificationToggle from './NotificationToggle.svelte';
</script>

<!-- Device settings + sign out. Lives at the foot of the account sidebar on desktop and at
     the bottom of Your Details on mobile, where the sidebar is replaced by the tab bar. -->
<div class="settings">
	<NotificationToggle />
	<InstallAppRow />
</div>
<div class="logout">
	<!-- Explicit action: the component defaults to /dashboard?/logout, which is
	     admin-only and 403s for customers. -->
	<Logout action="/account?/logout" />
</div>

<style>
	.settings {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.logout {
		margin-top: 10px;
	}
</style>
