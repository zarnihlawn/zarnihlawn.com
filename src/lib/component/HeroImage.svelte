<script lang="ts">
	import Me from '$lib/asset/image/me.png';
	import { profile } from '$lib/data/profile';

	let {
		variant = 'home',
		class: className = ''
	}: {
		variant?: 'home' | 'detail';
		class?: string;
	} = $props();

	const isDetail = $derived(variant === 'detail');
</script>

<div
	class="image-edge-fade relative w-full overflow-hidden {isDetail
		? 'aspect-[5712/1700]'
		: 'aspect-[5712/2249]'} {className}"
>
	<img
		src={Me}
		alt={profile.imageAlt}
		class="size-full object-cover object-bottom {isDetail ? 'opacity-40' : ''}"
	/>

	{#if isDetail}
		<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
			<div class="text-outline text-5xl font-extrabold text-[#5b6ee1] sm:text-6xl">
				{profile.name}
			</div>

			<div class="playfair-font flex flex-wrap items-center justify-center gap-2 text-2xl italic sm:gap-3 sm:text-3xl">
				<span>{profile.roleLeft}</span>
				<span class="text-[#5b6ee1]">&</span>
				<span>{profile.roleRight}</span>
			</div>
		</div>
	{/if}
</div>
