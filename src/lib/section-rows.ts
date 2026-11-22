import { academicDetailPath, academicHistory, type AcademicRecord } from '$lib/data/academic';
import {
	workExperienceDetailPath,
	workExperienceHistory,
	type WorkExperienceRecord
} from '$lib/data/work-experience';
import type { StudyKind } from '$lib/study-click';

export type SectionRow = {
	kind: Extract<StudyKind, 'work' | 'academic'>;
	slug: string;
	href: string;
	title: string;
	place: string;
	period: string;
};

export function workSectionRows(): SectionRow[] {
	return workExperienceHistory.map((record) => workRow(record));
}

export function academicSectionRows(): SectionRow[] {
	return academicHistory.flatMap((record) => (record.slug ? [academicRow(record)] : []));
}

function workRow(record: WorkExperienceRecord): SectionRow {
	return {
		kind: 'work',
		slug: record.slug,
		href: workExperienceDetailPath(record.slug),
		title: record.role,
		place: record.company,
		period: record.period
	};
}

function academicRow(record: AcademicRecord): SectionRow {
	return {
		kind: 'academic',
		slug: record.slug!,
		href: academicDetailPath(record.slug!),
		title: record.program,
		place: record.institution,
		period: record.period
	};
}
