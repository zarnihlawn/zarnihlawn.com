<script lang="ts">
	import AcademicDocument from '$lib/component/AcademicDocument.svelte';
	import StudyPage from '$lib/component/StudyPage.svelte';
	import { readStudy } from '$lib/read-study';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const view = $derived(
		data.record.slug ? readStudy({ kind: 'academic', slug: data.record.slug }) : undefined
	);
</script>

{#if view && view.kind === 'academic'}
	<StudyPage
		title={view.title}
		lede={view.lede}
		summary={view.summary}
		path={view.path}
		indexLabel="Academic"
	>
		<AcademicDocument record={view.record} />
	</StudyPage>
{/if}
