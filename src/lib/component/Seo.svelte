<script lang="ts">
	import { page } from '$app/state';

	type Schema = Record<string, unknown>;

	let {
		title,
		description,
		path,
		ogType = 'website',
		jsonLd
	}: {
		title: string;
		description: string;
		path: string;
		ogType?: 'website' | 'article';
		jsonLd: Schema | Schema[];
	} = $props();

	const canonical = $derived(new URL(path, page.url.origin).href);
	const blocks = $derived.by(() => {
		const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
		return list.map((block) => ({ ...block, url: canonical }));
	});

	function serialize(block: Schema): string {
		return JSON.stringify(block).replaceAll('<', '\\u003c');
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={ogType} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#each blocks as block, index (index)}
		{@html `<script type="application/ld+json">${serialize(block)}</script>`}
	{/each}
</svelte:head>
