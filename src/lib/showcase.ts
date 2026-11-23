import { academicDetailPath, academicHistory } from '$lib/data/academic';
import { developmentDetailPath, developmentProjects } from '$lib/data/development';
import type { StudyRef } from '$lib/study-click';

export type ShowcaseItem = {
	/** Stable identity used to pick an illustration */
	key: string;
	name: string;
	href: string;
	study: StudyRef;
};

function repoName(url: string): string {
	return url.split('/').filter(Boolean).pop() ?? url;
}

/** A repo already on the showcase must not reappear as an academic card. */
const showcasedRepos = new Set(
	developmentProjects.flatMap((project) => (project.repoUrl ? [project.repoUrl] : []))
);

function developmentItems(): ShowcaseItem[] {
	return developmentProjects.map((project) => ({
		key: project.slug,
		name: project.name,
		href: developmentDetailPath(project.slug),
		study: { kind: 'development', slug: project.slug }
	}));
}

function academicItems(): ShowcaseItem[] {
	return academicHistory.flatMap((record) => {
		const slug = record.slug;
		if (!slug) return [];
		return (record.projects ?? [])
			.filter((project) => !showcasedRepos.has(project.repoUrl))
			.map((project) => ({
				key: repoName(project.repoUrl),
				name: project.name,
				href: academicDetailPath(slug),
				study: { kind: 'academic', slug }
			}));
	});
}

export const showcaseItems: ShowcaseItem[] = [...developmentItems(), ...academicItems()];
