<script>
	import * as Command from '$lib/components/ui/command/index.js';
	import { Disc, Search } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	let isOpen = $state(false);
	let list = [
		{ label: 'Dashboard', path: '/dashboard' },

		// Customers
		{ label: 'Customers', path: '/dashboard/customers' },

		// Plans
		{ label: 'Plans', path: '/dashboard/plans' },

		// Orders
		{ label: 'Orders', path: '/dashboard/orders' },
		{ label: 'Subscription Orders', path: '/dashboard/orders/subscriptions' },
		{ label: 'One-Time & Gift Orders', path: '/dashboard/orders/one-time' },
		{ label: 'Guest Orders', path: '/dashboard/orders/guest' },

		// Deliveries
		{ label: 'Deliveries', path: '/dashboard/deliveries' },

		// Reports
		{ label: 'Reports', path: '/dashboard/reports' },
		{ label: 'Subscriptions Report', path: '/dashboard/reports/subscriptions' },
		{ label: 'Deliveries Report', path: '/dashboard/reports/deliveries' },
		{ label: 'Orders Report', path: '/dashboard/reports/orders' },

		// Admin Panel
		{ label: 'Admin Panel', path: '/dashboard/admin-panel' },
		{ label: 'Users', path: '/dashboard/admin-panel/users' },
		{ label: 'Add User', path: '/dashboard/admin-panel/users/add-users' },
		{ label: 'Roles', path: '/dashboard/admin-panel/roles' },
		{ label: 'Add Role', path: '/dashboard/admin-panel/roles/add-roles' },
		{ label: 'Add-ons', path: '/dashboard/admin-panel/addons' }
	];
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="w-auto px-4" title="Search for Pages"><Search /></Dialog.Trigger>
	<Dialog.Content class="w-full">
		<Dialog.Header>
			<Dialog.Title>Search the whole site</Dialog.Title>
		</Dialog.Header>
		<ScrollArea class="h-auto rounded-md border p-2">
			<h5 class="text-center">Search Anything</h5>
			<Command.Root class="rounded-lg shadow-md">
				<Command.Input placeholder="Type a command or search..." type="search" />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						{#each list as item (item.path)}
							<Command.Item>
								<Disc />
								<a href={item.path} onclick={() => (isOpen = false)}>{item.label}</a>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
