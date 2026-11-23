import { describe, expect, it } from 'vitest';
import { anchorSlug } from './blog-anchor';
import { blogPosts } from './blog';

describe('anchorSlug', () => {
	it('lowercases and hyphenates', () => {
		expect(anchorSlug('Measure the transfer, not the paint')).toBe(
			'measure-the-transfer-not-the-paint'
		);
	});

	it('drops markdown emphasis and inline code markers', () => {
		expect(anchorSlug('The `flag` is *not* optional')).toBe('the-flag-is-not-optional');
	});

	it('trims leading and trailing separators', () => {
		expect(anchorSlug('  --Why it matters--  ')).toBe('why-it-matters');
	});

	it('never collides across one post', () => {
		for (const post of blogPosts) {
			const ids = post.sections.map((section) => anchorSlug(section.title));
			expect(new Set(ids).size).toBe(ids.length);
		}
	});
});
