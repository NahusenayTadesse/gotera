<script lang="ts">
	import type { PageData } from './$types';
	import PartnersList from '../PartnersList.svelte';

	let { data }: { data: PageData } = $props();
</script>

<PartnersList {data} />
