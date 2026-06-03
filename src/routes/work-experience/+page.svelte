<script lang="ts">
	import DetailPage from '$lib/component/DetailPage.svelte';
	import WorkExperienceRow from '$lib/component/WorkExperienceRow.svelte';
	import { workExperienceHistory } from '$lib/data/work-experience';
</script>

<DetailPage
	title="Work Experience"
	description="Roles, teams, and projects — past and present."
>
	<div class="flex flex-col gap-3">
		{#each workExperienceHistory as record (record.id)}
			<WorkExperienceRow {record} />
		{/each}
	</div>
</DetailPage>
