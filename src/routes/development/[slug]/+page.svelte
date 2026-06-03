<script lang="ts">
	import DetailPage from '$lib/component/DetailPage.svelte';
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
	<div class="flex flex-col gap-8">
		{#each project.documentation as section (section.heading)}
			<section class="flex flex-col gap-3">
				<h2 class="text-lg font-medium">{section.heading}</h2>

				{#if section.body}
					<p class="text-sm leading-relaxed opacity-80">{section.body}</p>
				{/if}

				{#if section.items?.length}
					<ul class="list-inside list-disc space-y-2 text-sm leading-relaxed opacity-80">
						{#each section.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/each}
	</div>
</DetailPage>
