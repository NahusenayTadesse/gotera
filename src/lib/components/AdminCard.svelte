<script lang="ts">
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRightIcon, MapPinIcon, Building2Icon, UsersIcon } from '@lucide/svelte';

	interface NavItem {
		name: string;
		href: string;
	}

	interface Props {
		title: string;
		description: string;
		icon: 'MapPin' | 'Building2' | 'Users';
		items: NavItem[];
		accentColor: string;
	}

	const { title, description, icon, items, accentColor }: Props = $props();

	const iconMap = {
		MapPin: MapPinIcon,
		Building2: Building2Icon,
		Users: UsersIcon
	};

	const IconComponent = iconMap[icon];
</script>

<Card
	class="group relative overflow-hidden border-border shadow-none transition-colors duration-300 hover:border-primary/40"
>
	<!-- Gradient Background -->
	<div
		class={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
	></div>

	<!-- Content -->
	<div class="relative">
		<CardHeader class="pb-4">
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0 flex-1">
					<CardTitle class="mb-2 text-lg sm:text-xl">{title}</CardTitle>
					<CardDescription class="text-sm">{description}</CardDescription>
				</div>
				<div
					class="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:p-3"
				>
					<IconComponent class="size-6" />
				</div>
			</div>
		</CardHeader>

		<CardContent class="flex flex-col gap-2">
			{#each items as item (item.href)}
				<a
					href={item.href}
					class="group/link flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-primary/10 active:bg-primary/15 sm:px-4"
				>
					<span class="font-medium text-foreground/80 group-hover/link:text-foreground"
						>{item.name}</span
					>
					<ArrowRightIcon
						class="size-4 shrink-0 text-muted-foreground opacity-60 transition-all duration-200
					 group-hover/link:translate-x-1 group-hover/link:opacity-100 sm:opacity-0"
					/>
				</a>
			{/each}
		</CardContent>
	</div>

	<!-- Border Gradient on Hover -->
	<div
		class="pointer-events-none absolute inset-0 rounded-lg border border-primary/0 transition-colors duration-300 group-hover:border-primary/20"
	></div>
</Card>
