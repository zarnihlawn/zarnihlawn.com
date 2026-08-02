<script lang="ts">
	import AcademicDocument from '$lib/component/AcademicDocument.svelte';
	import DetailPage from '$lib/component/DetailPage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const record = $derived(data.record);
	const subtitle = $derived(`${record.institution} · ${record.period}`);
</script>

<DetailPage
	title={record.program}
	description={subtitle}
	backHref="/academic"
	backLabel="Back to Academic"
>
	<div class="mt-4">
		<AcademicDocument {record} />
	</div>
</DetailPage>
