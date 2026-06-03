<script lang="ts">
	import AcademicRow from '$lib/component/AcademicRow.svelte';
	import DetailPage from '$lib/component/DetailPage.svelte';
	import { academicHistory } from '$lib/data/academic';
</script>

<DetailPage
	title="Academic"
	description="Education and programs — past, current, and planned."
>
	<div class="flex flex-col gap-3">
		{#each academicHistory as record (record.id)}
			<AcademicRow {record} />
		{/each}
	</div>
</DetailPage>
