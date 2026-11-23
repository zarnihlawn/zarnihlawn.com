import { existsSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
	blogAudioPath,
	blogCategories,
	blogPostPath,
	blogPosts,
	formatBlogDate,
	getBlogPostBySlug
} from './blog';

describe('blogPosts', () => {
	it('exposes the blog posts with complete frontmatter', () => {
		expect(blogPosts).toHaveLength(2);

		for (const post of blogPosts) {
			expect(post.slug).toMatch(/^[a-z0-9-]+$/);
			expect(post.title.trim()).not.toBe('');
			expect(post.category.trim()).not.toBe('');
			expect(post.excerpt.trim()).not.toBe('');
			expect(post.cover).toMatch(/^\/blog\/[\w-]+\.(svg|webp)$/);
		}
	});

	it('carries ISO dates that parse back to themselves', () => {
		for (const post of blogPosts) {
			expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(Number.isNaN(Date.parse(post.date))).toBe(false);
		}
	});

	it('is sorted newest first', () => {
		const dates = blogPosts.map((post) => post.date);
		expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
	});

	it('reports a read time of at least one minute', () => {
		for (const post of blogPosts) {
			expect(Number.isInteger(post.minutes)).toBe(true);
			expect(post.minutes).toBeGreaterThanOrEqual(1);
		}
	});

	it('has unique slugs', () => {
		const slugs = blogPosts.map((post) => post.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('exposes table-of-contents sections with unique anchors', () => {
		for (const post of blogPosts) {
			expect(post.sections.length).toBeGreaterThan(0);

			const ids = post.sections.map((section) => section.id);
			expect(new Set(ids).size).toBe(ids.length);
			for (const section of post.sections) {
				expect(section.id).toMatch(/^[a-z0-9-]+$/);
				expect(section.title.trim()).not.toBe('');
			}
		}
	});

	it('ships a narration file for every post', () => {
		for (const post of blogPosts) {
			const path = `static${blogAudioPath(post.slug)}`;
			expect(existsSync(path)).toBe(true);
			expect(statSync(path).size).toBeGreaterThan(0);
		}
	});
});

describe('blogCategories', () => {
	it('is unique, sorted, and covers every post', () => {
		expect(new Set(blogCategories).size).toBe(blogCategories.length);
		expect(blogCategories).toEqual([...blogCategories].sort((a, b) => a.localeCompare(b)));

		for (const post of blogPosts) {
			expect(blogCategories).toContain(post.category);
		}
	});
});

describe('blogPostPath', () => {
	it('builds a root-relative post url', () => {
		expect(blogPostPath('icait-2026-masked-reconstruction-talk')).toBe(
			'/blog/icait-2026-masked-reconstruction-talk'
		);
	});
});

describe('getBlogPostBySlug', () => {
	it('finds a known post and rejects an unknown one', () => {
		expect(getBlogPostBySlug('icait-2026-masked-reconstruction-talk')?.title).toContain('ICAIT');
		expect(getBlogPostBySlug('not-a-post')).toBeUndefined();
	});
});

describe('formatBlogDate', () => {
	it('renders the card format', () => {
		expect(formatBlogDate('2022-03-16')).toBe('16. March 2022');
		expect(formatBlogDate('2026-11-05')).toBe('5. November 2026');
	});

	it('never emits an undefined month', () => {
		for (const post of blogPosts) {
			expect(formatBlogDate(post.date)).not.toContain('undefined');
		}
	});
});
