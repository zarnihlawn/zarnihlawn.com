<script lang="ts">
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

	<a
		href={detailsHref}
		class="link-tag mt-1 flex w-fit items-center gap-2 rounded-2xl border px-3 py-1 text-sm text-[#5b6ee1]"
	>
		See details
		<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0" />
	</a>
</div>
