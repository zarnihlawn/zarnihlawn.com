<script lang="ts">
	import type { Snippet } from 'svelte';
	import Seo from '$lib/component/Seo.svelte';
	import StudyChrome from '$lib/component/StudyChrome.svelte';
	import { creativeWorkSchema, metaDescription, pageTitle } from '$lib/seo';

	let {
		title,
		lede,
		summary,
		path,
		indexLabel,
		children
	}: {
		title: string;
		lede: string;
		summary: string;
		path: string;
		indexLabel: string;
		children: Snippet;
	} = $props();

	const description = $derived(metaDescription(summary));
</script>

<Seo
	title={pageTitle(title)}
	{description}
	{path}
	ogType="article"
	jsonLd={creativeWorkSchema(title, description)}
/>

<div class="study-page">
	<StudyChrome {title} {lede} {indexLabel} mode="page">{@render children()}</StudyChrome>
</div>
