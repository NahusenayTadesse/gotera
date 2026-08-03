<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import {
		BadgeCheck,
		Loader,
		OctagonMinus,
		PauseCircle,
		Clock,
		Truck,
		SkipForward,
		XCircle,
		CircleDollarSign
	} from '@lucide/svelte';

	/* ---------- public prop ---------- */
	interface Props {
		status: string;
	}
	let { status }: Props = $props();

	/* ---------- lookup tables ---------- */
	const statusMeta = {
		/* confirmed / paid */
		confirmed: { icon: BadgeCheck, colour: 'bg-green-400' },
		paid: { icon: BadgeCheck, colour: 'bg-green-400' },
		fulfilled: { icon: BadgeCheck, colour: 'bg-green-400' },

		complete: { icon: BadgeCheck, colour: 'bg-green-400' },
		incomplete: { icon: OctagonMinus, colour: 'bg-red-500' },

		/* cancelled / unpaid / failed */
		cancelled: { icon: OctagonMinus, colour: 'bg-red-500' },
		unpaid: { icon: OctagonMinus, colour: 'bg-red-500' },
		dead: { icon: OctagonMinus, colour: 'bg-red-500' },
		failed: { icon: XCircle, colour: 'bg-red-500' },

		/* pending / scheduled / paused / skipped */
		pending: { icon: Loader, colour: 'bg-yellow-500' },
		scheduled: { icon: Clock, colour: 'bg-blue-500' },
		dispatched: { icon: Truck, colour: 'bg-blue-500' },
		paused: { icon: PauseCircle, colour: 'bg-orange-500' },
		skipped: { icon: SkipForward, colour: 'bg-gray-400' },

		delivered: { icon: BadgeCheck, colour: 'bg-green-400' },
		read: { icon: BadgeCheck, colour: 'bg-green-400' },

		/* active / referrals */
		active: { icon: BadgeCheck, colour: 'bg-green-400' },
		contracted: { icon: BadgeCheck, colour: 'bg-green-400' },
		inactive: { icon: OctagonMinus, colour: 'bg-red-500' },
		subscribed: { icon: BadgeCheck, colour: 'bg-green-400' },
		credited: { icon: CircleDollarSign, colour: 'bg-teal-500' },

		yes: { icon: BadgeCheck, colour: 'bg-green-400' },
		no: { icon: OctagonMinus, colour: 'bg-red-500' },

		unremovable: { icon: BadgeCheck, colour: 'bg-green-400' },
		removable: { icon: OctagonMinus, colour: 'bg-red-500' },

		/* fallback */
		unknown: { icon: Loader, colour: 'bg-gray-500' }
	} as const;

	/* ---------- derived ---------- */
	const key = String(status).trim().toLowerCase() as keyof typeof statusMeta;
	const { icon: Icon, colour } = statusMeta[key] ?? statusMeta.unknown;
</script>

<Badge variant="secondary" class="{colour} text-white">
	<Icon />
	{String(status)}
</Badge>
