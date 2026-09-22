<script>
	import AdminNavCard from '$lib/components/AdminCard.svelte';

	let userManagement = [
		{ name: 'Users', href: '/dashboard/admin-panel/users' },
		{ name: 'Roles', href: '/dashboard/admin-panel/roles' }
	];
</script>

<svelte:head>
	<title>Admin Panel</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl min-w-0 px-0 py-6 text-foreground sm:px-6 sm:py-12">
	<!-- Hero Section -->
	<div class="mb-8 flex flex-col gap-3 sm:mb-16 sm:gap-4">
		<span class="dash-eyebrow">Administration</span>
		<h2
			class="dash-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl"
		>
			Welcome to Admin Dashboard
		</h2>
		<p class="max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
			Manage who can sign in to the dashboard and what each role is allowed to do.
		</p>
	</div>

	<!-- Navigation Cards Grid -->
	<div class="grid gap-4 sm:gap-8 md:grid-cols-2">
		<AdminNavCard
			title="User Management"
			description="Control users and their assigned roles"
			icon="Users"
			items={userManagement}
			accentColor="from-primary/15 to-primary/5"
		/>
	</div>
</div>
