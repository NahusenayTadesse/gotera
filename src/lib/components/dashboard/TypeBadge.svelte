<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';

	interface Props {
		type: string;
	}
	let { type }: Props = $props();

	const labels: Record<string, string> = {
		subscription: 'Subscription',
		guest: 'Guest',
		'one-time': 'One-time'
	};
</script>

<Badge variant="outline">{labels[type] ?? type}</Badge>
