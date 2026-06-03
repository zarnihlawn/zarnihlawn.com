import { error } from '@sveltejs/kit';
import { getWorkExperienceBySlug } from '$lib/data/work-experience';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const experience = getWorkExperienceBySlug(params.slug);

	if (!experience) {
		error(404, 'Work experience not found');
	}

	return { experience };
};
