<script lang="ts">
	import { page } from '$app/state';
	import { LucideArrowLeft } from '@lucide/svelte';
</script>

<div class="mt-10 flex flex-col items-center">
	<div class="text-outline mb-4 text-7xl font-extrabold text-[#5b6ee1]">
		{page.status}
	</div>

	<p class="mb-8 text-sm italic opacity-70">
		{page.error?.message ?? 'Something went wrong.'}
	</p>

	<a
		href="/"
		class="flex items-center gap-2 rounded-2xl border px-3 py-1 transition hover:bg-white/10"
	>
		<LucideArrowLeft class="size-4 shrink-0" />
		Back home
	</a>
</div>
