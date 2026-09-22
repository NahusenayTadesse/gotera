<script lang="ts">
	import { columns } from './columns';

	let { data } = $props();

	import DataTable from '$lib/components/Table/data-table.svelte';

	import Loading from '$lib/components/Loading.svelte';
	import { Frown, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Roles List</title>
</svelte:head>

{#await data}
	<Loading name="Customers" />
{:then customerList}
	{#if data.roleList.length === 0}
		<div class="flex h-96 w-full min-w-0 flex-col items-center justify-center gap-4 px-4 lg:w-5xl">
			<p
				class="mt-4 flex flex-col items-center gap-3 text-center text-2xl text-balance sm:flex-row sm:gap-4 sm:text-4xl"
			>
				<Frown class="h-10 w-10 animate-bounce sm:h-12 sm:w-16" />
				Roles List is Empty
			</p>
			<Button href="/dashboard/users/add-users"><Plus />Add New Users</Button>
		</div>
	{:else}
		<h2 class="my-4 text-xl sm:text-2xl">No of Roles: {data.roleList?.length}</h2>

		<div class="mt-2 mb-4 w-full min-w-0 max-w-full p-0 sm:mt-8 sm:pt-4">
			<DataTable data={data.roleList} {columns} fileName="Roles List" />
		</div>
	{/if}
{:catch}
	<div class="flex h-96 w-full flex-col items-center justify-center px-4">
		<h1 class="text-red-500">Unexpected Error: Reload</h1>
	</div>
{/await}
