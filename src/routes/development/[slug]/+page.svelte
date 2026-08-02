<script lang="ts">
	import DetailPage from '$lib/component/DetailPage.svelte';
	import DevelopmentDocument from '$lib/component/DevelopmentDocument.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
</script>

<DetailPage
	title={project.name}
	description={project.summary}
	backHref="/development"
	backLabel="Back to Development"
>
	<div class="mt-4">
		<DevelopmentDocument {project} />
	</div>
</DetailPage>
