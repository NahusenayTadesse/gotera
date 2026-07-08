<script lang="ts">
	import Login from '$lib/forms/Login.svelte';

	import type { ActionData, PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center px-4">
	<Login data={data?.form} action="?/login" callBack="/account" />
</div>

