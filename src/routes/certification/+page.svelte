<script lang="ts">
	import CertificationRow from '$lib/component/CertificationRow.svelte';
	import DetailPage from '$lib/component/DetailPage.svelte';
	import { certifications } from '$lib/data/certifications';
</script>

<DetailPage
	title="Certification"
	description="Course and program certificates — separate from formal education."
>
	<div class="flex flex-col gap-3">
		{#each certifications as record (record.id)}
			<CertificationRow {record} />
		{/each}
	</div>
</DetailPage>
