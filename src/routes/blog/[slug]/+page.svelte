<script lang="ts">
	import type { Component } from 'svelte';
	import Seo from '$lib/component/Seo.svelte';
	import StudyChrome from '$lib/component/StudyChrome.svelte';
	import { blogPostPath, formatBlogDate } from '$lib/blog';
	import { creativeWorkSchema, metaDescription, pageTitle } from '$lib/seo';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const bodies = import.meta.glob<{ default: Component }>('/src/lib/content/blog/*.md', {
		eager: true
	});

	const slugFromPath = (path: string) => path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, '');
	const Body = $derived(
		Object.entries(bodies).find(([path]) => slugFromPath(path) === data.post.slug)?.[1].default
	);

	const description = $derived(metaDescription(data.post.excerpt));
</script>

<Seo
	title={pageTitle(data.post.title)}
	{description}
	path={blogPostPath(data.post.slug)}
	ogType="article"
	jsonLd={creativeWorkSchema(data.post.title, description)}
/>

<div class="page">
	<article class="blog-post">
		<StudyChrome
			title={data.post.title}
			lede="{data.post.category} · {formatBlogDate(data.post.date)} · {data.post.minutes} Min"
			indexLabel="Blog"
			mode="page"
		>
			{#if Body}
				<Body />
			{/if}
		</StudyChrome>
	</article>
</div>
