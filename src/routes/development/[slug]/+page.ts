import { error } from '@sveltejs/kit';
import { getDevelopmentProjectBySlug } from '$lib/data/development';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getDevelopmentProjectBySlug(params.slug);

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};
