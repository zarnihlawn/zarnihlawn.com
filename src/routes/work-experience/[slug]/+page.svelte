<script lang="ts">
	import StudyPage from '$lib/component/StudyPage.svelte';
	import WorkExperienceDocument from '$lib/component/WorkExperienceDocument.svelte';
	import { readStudy } from '$lib/read-study';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const view = $derived(readStudy({ kind: 'work', slug: data.experience.slug }));
</script>

{#if view && view.kind === 'work'}
	<StudyPage
		title={view.title}
		lede={view.lede}
		summary={view.summary}
		path={view.path}
		indexLabel="Work"
	>
		<WorkExperienceDocument record={view.record} />
	</StudyPage>
{/if}
