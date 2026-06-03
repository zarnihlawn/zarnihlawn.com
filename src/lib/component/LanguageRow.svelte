<script lang="ts">
	import type { LanguageRecord } from '$lib/data/languages';

	let { record }: { record: LanguageRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';

	const meta = $derived(
		[record.institution, record.date].filter(Boolean).join(' · ')
	);
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.name}</div>
			{#if record.detail}
				<p class="text-sm italic opacity-70 leading-snug">{record.detail}</p>
			{/if}
		</div>

		<span class="shrink-0 rounded-full border px-2 py-0.5 text-xs italic opacity-80">
			{record.proficiency}
		</span>
	</div>

	{#if meta}
		<p class="text-sm italic opacity-70">{meta}</p>
	{/if}
</div>
