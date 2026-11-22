<script lang="ts">
	import { page } from '$app/state';
	import BlogCard from '$lib/component/BlogCard.svelte';
	import Seo from '$lib/component/Seo.svelte';
	import { blogCategories, blogPosts } from '$lib/blog';
	import { blogItemListSchema, metaDescription } from '$lib/seo';

	const TITLE = 'Blog — Zarni Hlawn';
	const DESCRIPTION = metaDescription(
		'Notes on software engineering, data work, and research. Articles on anomaly detection, front-end performance, design systems, and shipping tools.'
	);

	let activeCategory = $state<string | undefined>(undefined);

	const filters = $derived(['All', ...blogCategories]);
	const visible = $derived(
		activeCategory ? blogPosts.filter((post) => post.category === activeCategory) : blogPosts
	);

	const selected = $derived(activeCategory ?? 'All');
</script>

<Seo
	title={TITLE}
	description={DESCRIPTION}
	path="/blog"
	jsonLd={blogItemListSchema(page.url.origin)}
/>

<div class="page">
	<section class="section" aria-labelledby="blog-title">
		<div class="blog-head">
			<h1 id="blog-title">Blog</h1>
			<nav class="blog-filters" aria-label="Filter posts by category">
				{#each filters as filter (filter)}
					<button
						type="button"
						class="blog-pill"
						aria-pressed={selected === filter}
						onclick={() => (activeCategory = filter === 'All' ? undefined : filter)}
					>
						{filter}
					</button>
				{/each}
			</nav>
		</div>

		<div class="blog-grid">
			{#each visible as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	</section>
</div>
