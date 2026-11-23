import { describe, expect, it } from 'vitest';
import { blogPosts } from './blog';
import { blogBody } from './blog-body';

describe('blogBody', () => {
	it('resolves a compiled component for every post slug', () => {
		for (const post of blogPosts) {
			expect(blogBody(post.slug)).toBeTypeOf('function');
		}
	});

	it('returns nothing for an unknown slug', () => {
		expect(blogBody('not-a-post')).toBeUndefined();
	});
});
