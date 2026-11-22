<script lang="ts">
	import { blogPostPath, formatBlogDate, type BlogPost } from '$lib/blog';

	let { post }: { post: BlogPost } = $props();
</script>

<a class="blog-card" href={blogPostPath(post.slug)}>
	<span class="blog-card-meta">
		<span class="meta">{formatBlogDate(post.date)}</span>
		<span class="blog-pill">{post.category}</span>
	</span>
	<img src={post.cover} alt="" width="640" height="640" loading="lazy" decoding="async" />
	<h3>{post.title}</h3>
	<p class="blog-excerpt">{post.excerpt}</p>
	<span class="blog-card-foot">
		<span>Text: Zarni Hlawn</span>
		<span>Duration: {post.minutes} Min</span>
	</span>
</a>
