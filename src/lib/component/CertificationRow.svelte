<script lang="ts">
	import type { CertificationRecord } from '$lib/data/certifications';
	import { LucideArrowUpRight } from '@lucide/svelte';

	let { record }: { record: CertificationRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';

	const actionClass =
		'link-tag mt-1 flex w-fit items-center gap-2 rounded-2xl border px-3 py-1 text-sm text-[#5b6ee1]';
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.title}</div>
			<div class="truncate text-sm italic opacity-70">{record.issuer}</div>
		</div>

		<span class="shrink-0 text-sm italic opacity-70 whitespace-nowrap">{record.date}</span>
	</div>

	{#if record.verifyUrl}
		<a
			href={record.verifyUrl}
			target="_blank"
			rel="noopener noreferrer"
			class={actionClass}
		>
			Verify certificate
			<LucideArrowUpRight class="link-tag-arrow size-3 shrink-0" />
		</a>
	{/if}
</div>
