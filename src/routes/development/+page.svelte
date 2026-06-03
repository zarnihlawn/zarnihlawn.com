<script lang="ts">
	import DevelopmentRow from '$lib/component/DevelopmentRow.svelte';
	import DetailPage from '$lib/component/DetailPage.svelte';
	import { developmentProjects } from '$lib/data/development';
</script>

<DetailPage
	title="Development"
	description="Applications and systems — personal and professional projects."
>
	<div class="flex flex-col gap-3">
		{#each developmentProjects as project (project.id)}
			<DevelopmentRow {project} />
		{/each}
	</div>
</DetailPage>
