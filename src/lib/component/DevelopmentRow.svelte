<script lang="ts">
	import GitHub from '$lib/component/GitHub.svelte';
	import type { DevelopmentProject } from '$lib/data/development';
	import { developmentDetailPath } from '$lib/data/development';
	import { LucideArrowUpRight } from '@lucide/svelte';

	let { project }: { project: DevelopmentProject } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';

	const detailsHref = $derived(developmentDetailPath(project.slug));
</script>

<div class={rowClass}>
	<div class="min-w-0 flex-1">
		<div class="truncate font-medium">{project.name}</div>
		<p class="text-sm italic opacity-70 leading-snug">{project.summary}</p>
	</div>

	<div class="mt-1 flex flex-wrap items-center gap-2">
		<a
			href={detailsHref}
			class="link-tag flex w-fit cursor-pointer items-center gap-2 rounded-2xl border px-3 py-1 text-sm text-[#5b6ee1]"
		>
			See details
			<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0" />
		</a>

		<a
			href={project.repoUrl}
			target="_blank"
			rel="noreferrer"
			class="link-tag flex w-fit cursor-pointer items-center gap-2 rounded-2xl border px-3 py-1 text-sm"
		>
			<GitHub class="size-3.5 shrink-0" />
			GitHub
			<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0 text-[#5b6ee1]" />
		</a>
	</div>
</div>
