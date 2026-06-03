<script lang="ts">
	import type { AcademicRecord } from '$lib/data/academic';
	import { academicStatusLabel } from '$lib/data/academic';

	let { record }: { record: AcademicRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.program}</div>
			<div class="truncate text-sm italic opacity-70">{record.institution}</div>
		</div>

		<span class="shrink-0 text-sm italic opacity-70 whitespace-nowrap">{record.period}</span>
	</div>

	<div class="flex flex-wrap items-center justify-between gap-2 text-sm">
		{#if record.location}
			<span class="italic opacity-70">{record.location}</span>
		{/if}
		<span class="rounded-full border px-2 py-0.5 text-xs italic opacity-80">
			{academicStatusLabel[record.status]}
		</span>
	</div>
</div>
