<script lang="ts">
	import DetailPage from '$lib/component/DetailPage.svelte';
	import WorkExperienceDocument from '$lib/component/WorkExperienceDocument.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const experience = $derived(data.experience);
	const subtitle = $derived(`${experience.company} · ${experience.period}`);
</script>

<DetailPage
	title={experience.role}
	description={subtitle}
	backHref="/work-experience"
	backLabel="Back to Work Experience"
>
	<div class="mt-4">
		<WorkExperienceDocument record={experience} />
	</div>
</DetailPage>
