<script lang="ts">
	import type { CertificationRecord } from '$lib/data/certifications';

	let { record }: { record: CertificationRecord } = $props();

	const rowClass =
		'link-tag flex w-full flex-col gap-2 rounded-2xl border px-4 py-3';
</script>

<div class={rowClass}>
	<div class="flex items-start justify-between gap-4">
		<div class="min-w-0 flex-1">
			<div class="truncate font-medium">{record.title}</div>
			<div class="truncate text-sm italic opacity-70">{record.issuer}</div>
		</div>

		<span class="shrink-0 text-sm italic opacity-70 whitespace-nowrap">{record.date}</span>
	</div>
</div>
