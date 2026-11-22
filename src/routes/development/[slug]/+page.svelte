<script lang="ts">
	import DevelopmentDocument from '$lib/component/DevelopmentDocument.svelte';
	import StudyPage from '$lib/component/StudyPage.svelte';
	import { readStudy } from '$lib/read-study';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const view = $derived(readStudy({ kind: 'development', slug: data.project.slug }));
</script>

{#if view && view.kind === 'development'}
	<StudyPage
		title={view.title}
		lede={view.lede}
		summary={view.summary}
		path={view.path}
		indexLabel="Development"
	>
		<DevelopmentDocument project={view.project} />
	</StudyPage>
{/if}
