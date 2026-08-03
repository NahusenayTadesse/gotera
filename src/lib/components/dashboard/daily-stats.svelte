<script lang="ts">
	import StatCard from './stat-card.svelte';
	import { formatGBP } from './format';
	import { TruckIcon, PackageIcon, UserPlusIcon, UsersIcon, CreditCardIcon } from '@lucide/svelte';

	interface DailyStats {
		totalOrders: number;
		totalItemsSold: number;
		totalPaymentsCollected: number;
		newSubscribers: number;
		newUsers: number;
	}

	const { stats = {} as Partial<DailyStats> }: { stats?: Partial<DailyStats> } = $props();

	/** Format number with commas */
	const formatNumber = (value: number): string => {
		return new Intl.NumberFormat('en-US').format(Math.round(value));
	};
</script>

<div class="w-full">
	<div class="mb-8">
		<h2 class="dash-heading text-3xl font-semibold text-foreground">Daily Statistics</h2>
		<p class="mt-2 text-muted-foreground">Today's performance overview</p>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
		<!-- Deliveries Made -->
		<StatCard
			title="Deliveries Made"
			value={formatNumber(stats.totalOrders || 0)}
			description="Delivered today"
			measure="Deliveries"
		>
			{#snippet icon()}
				<TruckIcon class="size-6" />
			{/snippet}
		</StatCard>

		<!-- Items Delivered -->
		<StatCard
			title="Items Delivered"
			value={formatNumber(stats.totalItemsSold || 0)}
			description="Total quantity"
			measure="Items"
		>
			{#snippet icon()}
				<PackageIcon class="size-6" />
			{/snippet}
		</StatCard>

		<!-- New Subscribers -->
		<StatCard
			title="New Subscribers"
			value={formatNumber(stats.newSubscribers || 0)}
			description="Signed up today"
			measure="Subscribers"
		>
			{#snippet icon()}
				<UserPlusIcon class="size-6" />
			{/snippet}
		</StatCard>

		<!-- New Users -->
		<StatCard
			title="New Users"
			value={formatNumber(stats.newUsers || 0)}
			description="Accounts created today"
			measure="Users"
		>
			{#snippet icon()}
				<UsersIcon class="size-6" />
			{/snippet}
		</StatCard>

		<!-- Payments Collected -->
		<StatCard
			title="Payments Collected"
			value={formatGBP(stats.totalPaymentsCollected || 0)}
			description="From today's deliveries"
		>
			{#snippet icon()}
				<CreditCardIcon class="size-6" />
			{/snippet}
		</StatCard>
	</div>
</div>
