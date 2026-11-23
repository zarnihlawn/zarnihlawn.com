<script lang="ts">
	import BlogRail from '$lib/component/BlogRail.svelte';
	import Seo from '$lib/component/Seo.svelte';
	import StudyChrome from '$lib/component/StudyChrome.svelte';
	import { blogPostPath, formatBlogDate } from '$lib/blog';
	import { blogBody } from '$lib/blog-body';
	import { creativeWorkSchema, metaDescription, pageTitle } from '$lib/seo';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const Body = $derived(blogBody(data.post.slug));

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
			<div class="blog-post-main">
				<!-- alt is empty: the h1 directly above already names the post. -->
				<figure class="blog-cover">
					<img
						src={data.post.cover}
						alt=""
						width="640"
						height="640"
						fetchpriority="high"
						decoding="sync"
					/>
				</figure>
				{#if Body}
					<Body />
				{/if}
			</div>
			{#snippet aside()}
				<BlogRail slug={data.post.slug} sections={data.post.sections} />
			{/snippet}
		</StudyChrome>
	</article>
</div>
