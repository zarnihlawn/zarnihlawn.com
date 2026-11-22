export type BlogPost = {
	slug: string;
	title: string;
	/** ISO date, e.g. 2026-11-14 */
	date: string;
	category: string;
	excerpt: string;
	cover: string;
	minutes: number;
};

export type BlogPostMeta = Omit<BlogPost, 'slug' | 'minutes'>;

const WORDS_PER_MINUTE = 200;

const metadataModules = import.meta.glob<BlogPostMeta>('/src/lib/content/blog/*.md', {
	eager: true,
	import: 'metadata'
});

const bodyModules = import.meta.glob<string>('/src/lib/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function slugFromPath(path: string): string {
	return path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, '');
}

function bodyWords(path: string): number {
	const raw = bodyModules[path] ?? '';
	const body = raw.replace(/^---[\s\S]*?\n---\n?/, '');
	return body.split(/\s+/).filter(Boolean).length;
}

export const blogPosts: BlogPost[] = Object.entries(metadataModules)
	.map(([path, meta]) => ({
		...meta,
		slug: slugFromPath(path),
		minutes: Math.max(1, Math.round(bodyWords(path) / WORDS_PER_MINUTE))
	}))
	.sort((a, b) => b.date.localeCompare(a.date));

export const blogCategories: string[] = [...new Set(blogPosts.map((post) => post.category))].sort(
	(a, b) => a.localeCompare(b)
);

export function blogPostPath(slug: string): string {
	return `/blog/${slug}`;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

/** ISO date to the card format, e.g. "16. March 2022". */
export function formatBlogDate(iso: string): string {
	const [year, month, day] = iso.split('-');
	const name = MONTHS[Number(month) - 1] ?? '';
	return `${Number(day)}. ${name} ${year}`;
}
