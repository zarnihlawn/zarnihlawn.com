import { error } from '@sveltejs/kit';
import { getBlogPostBySlug } from '$lib/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = getBlogPostBySlug(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
};
