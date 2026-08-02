import { error } from '@sveltejs/kit';
import { getAcademicBySlug } from '$lib/data/academic';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const record = getAcademicBySlug(params.slug);

	if (!record) {
		error(404, 'Academic program not found');
	}

	return { record };
};
