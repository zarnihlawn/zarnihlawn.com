<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import CaseDialog from '$lib/component/CaseDialog.svelte';
	import SiteHeader from '$lib/component/SiteHeader.svelte';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import Favicon from '$lib/asset/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href={Favicon} />
</svelte:head>

<div class="scroll-progress" aria-hidden="true"></div>
<SiteHeader />
<main>
	{@render children()}
</main>
<CaseDialog />

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>
			{locale}
		</a>
	{/each}
</div>
