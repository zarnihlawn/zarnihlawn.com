<script lang="ts">
	import type { AcademicRecord } from '$lib/data/academic';
	import { academicDetailPath, academicStatusLabel } from '$lib/data/academic';
	import { LucideArrowUpRight } from '@lucide/svelte';

	let { record }: { record: AcademicRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';

	const detailsHref = $derived(record.slug ? academicDetailPath(record.slug) : null);
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.program}</div>
			<div class="truncate text-sm italic opacity-70">{record.institution}</div>
		</div>

		<span class="shrink-0 whitespace-nowrap text-sm italic opacity-70">{record.period}</span>
	</div>

	<div class="flex flex-wrap items-center gap-2">
		<span class="rounded-2xl border px-3 py-1 text-sm italic opacity-80">
			{academicStatusLabel[record.status]}
		</span>

		{#if detailsHref}
			<a
				href={detailsHref}
				class="link-tag flex w-fit cursor-pointer items-center gap-2 rounded-2xl border px-3 py-1 text-sm text-[#5b6ee1]"
			>
				See details
				<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0" />
			</a>
		{/if}

		{#if record.location}
			<span class="text-sm italic opacity-70">{record.location}</span>
		{/if}
	</div>
</div>
