<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import Favicon from '$lib/asset/favicon.ico';
	import PaperBackground from '$lib/asset/image/paper-background.jpeg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href={Favicon} />
	<title>Zarni Hlawn</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
	<div
		class="absolute inset-0 -z-10 bg-cover bg-center opacity-65"
		style={`background-image: url(${PaperBackground})`}
	></div>

	<div class="relative flex justify-center p-5">
		<main class="w-full max-w-5xl">
			{@render children()}
		</main>
	</div>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>
			{locale}
		</a>
	{/each}
</div>
