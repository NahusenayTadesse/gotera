<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { RefreshCw, Gift, UserX, ArrowRight } from '@lucide/svelte';

	const sections = [
		{
			title: 'Subscriptions',
			description: 'Recurring boxes — status, plan, quantity and cancellation.',
			href: '/dashboard/orders/subscriptions',
			icon: RefreshCw
		},
		{
			title: 'One-Time & Gift Orders',
			description: 'Single purchases and gift boxes placed by signed-in customers.',
			href: '/dashboard/orders/one-time',
			icon: Gift
		},
		{
			title: 'Guest Orders',
			description: 'One-off purchases placed without an account.',
			href: '/dashboard/orders/guest',
			icon: UserX
		}
	];
</script>

<svelte:head>
	<title>Orders</title>
</svelte:head>

<h1 class="dash-heading mb-6 text-2xl font-semibold">Orders</h1>

<div class="grid gap-6 md:grid-cols-3">
	{#each sections as section (section.href)}
		<Card.Root class="flex flex-col justify-between">
			<Card.Header>
				<section.icon class="mb-2 size-6 text-primary" />
				<Card.Title>{section.title}</Card.Title>
				<Card.Description>{section.description}</Card.Description>
			</Card.Header>
			<Card.Content>
				<Button href={section.href} variant="outline" class="w-full"
					>View {section.title} <ArrowRight class="size-4" /></Button
				>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
