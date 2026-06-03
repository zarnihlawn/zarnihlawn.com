<script lang="ts">
	import type { Snippet } from 'svelte';
	import HeroImage from '$lib/component/HeroImage.svelte';
	import { LucideArrowRight } from '@lucide/svelte';

	let {
		title,
		description,
		backHref = '/',
		backLabel = 'Back',
		children
	}: {
		title: string;
		description?: string;
		backHref?: string;
		backLabel?: string;
		children?: Snippet;
	} = $props();
</script>

<div class="detail-page flex flex-col">
	<HeroImage variant="detail" class="mb-2 w-full" />

	<div class="mb-6 mt-8 flex items-center justify-between gap-4">
		<h1 class="text-outline text-4xl font-extrabold text-[#5b6ee1] sm:text-5xl">
			{title}
		</h1>

		<a
			href={backHref}
			class="link-tag link-tag-back flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-1 text-sm italic opacity-70"
		>
			{backLabel}
			<LucideArrowRight class="size-4 shrink-0" />
		</a>
	</div>

	{#if description}
		<p class="mb-6 text-sm italic opacity-70">
			{description}
		</p>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>
