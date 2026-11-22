import { academicStatusLabel, getAcademicBySlug } from '$lib/data/academic';
import { academicDetailPath } from '$lib/data/academic';
import { getDevelopmentProjectBySlug, developmentDetailPath } from '$lib/data/development';
import { getWorkExperienceBySlug, workExperienceDetailPath } from '$lib/data/work-experience';
import type { AcademicRecord } from '$lib/data/academic';
import type { DevelopmentProject } from '$lib/data/development';
import type { WorkExperienceRecord } from '$lib/data/work-experience';
import type { StudyRef } from '$lib/study-click';

type StudyBase = {
	title: string;
	lede: string;
	summary: string;
	path: string;
};

export type StudyView = StudyBase &
	(
		| { kind: 'development'; project: DevelopmentProject }
		| { kind: 'work'; record: WorkExperienceRecord }
		| { kind: 'academic'; record: AcademicRecord }
	);

export function readStudy(study: StudyRef | undefined): StudyView | undefined {
	if (!study) return undefined;

	if (study.kind === 'development') {
		const project = getDevelopmentProjectBySlug(study.slug);
		if (!project) return undefined;
		return {
			kind: 'development',
			project,
			title: project.name,
			lede: project.summary,
			summary: project.summary,
			path: developmentDetailPath(project.slug)
		};
	}

	if (study.kind === 'work') {
		const record = getWorkExperienceBySlug(study.slug);
		if (!record) return undefined;
		const place = record.location ? `${record.company}, ${record.location}` : record.company;
		return {
			kind: 'work',
			record,
			title: record.role,
			lede: `${record.company} · ${record.period}`,
			summary: `${record.role} at ${place}. ${record.period}.`,
			path: workExperienceDetailPath(record.slug)
		};
	}

	const record = getAcademicBySlug(study.slug);
	if (!record) return undefined;
	return {
		kind: 'academic',
		record,
		title: record.program,
		lede: `${record.institution} · ${record.period}`,
		summary: `${record.program} at ${record.institution}. ${record.period}. ${academicStatusLabel[record.status]}.`,
		path: academicDetailPath(study.slug)
	};
}
