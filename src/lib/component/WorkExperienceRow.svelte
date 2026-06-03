<script lang="ts">
	import type { WorkExperienceRecord } from '$lib/data/work-experience';
	import { workExperienceDetailPath } from '$lib/data/work-experience';
	import { LucideArrowUpRight } from '@lucide/svelte';

	let { record }: { record: WorkExperienceRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';

	const detailsHref = $derived(workExperienceDetailPath(record.slug));
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.role}</div>
			<div class="truncate text-sm italic opacity-70">{record.company}</div>
		</div>

		<span class="shrink-0 text-sm italic opacity-70 whitespace-nowrap">{record.period}</span>
	</div>

	{#if record.location}
		<p class="text-sm italic opacity-70">{record.location}</p>
	{/if}

	{#if record.note}
		<p class="text-sm italic opacity-70">{record.note}</p>
	{/if}

	<a
		href={detailsHref}
		class="link-tag mt-1 flex w-fit items-center gap-2 rounded-2xl border px-3 py-1 text-sm text-[#5b6ee1]"
	>
		Read details
		<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0" />
	</a>
</div>
