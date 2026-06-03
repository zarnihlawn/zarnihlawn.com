export type WorkExperienceSection = {
	heading: string;
	body?: string;
	items?: string[];
};

export type WorkExperienceRecord = {
	id: number;
	slug: string;
	role: string;
	company: string;
	period: string;
	/** ISO date for sorting (newest first) */
	startDate: string;
	/** ISO end date, or null when still in the role */
	endDate: string | null;
	location?: string;
	note?: string;
	documentation: WorkExperienceSection[];
};

function formatDisplayDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number);
	return new Date(year, month - 1, day).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

function formatPeriod(startDate: string, endDate: string | null): string {
	const start = formatDisplayDate(startDate);
	if (endDate === null) return `${start} – Present`;
	return `${start} – ${formatDisplayDate(endDate)}`;
}

const records: WorkExperienceRecord[] = [
	{
		id: 2,
		slug: 'pun-hlaing-junior-data-software-engineer',
		role: 'Junior Data & Software Engineer',
		company: 'Pun Hlaing Hospitals',
		startDate: '2025-10-01',
		endDate: null,
		period: formatPeriod('2025-10-01', null),
		documentation: [
			{
				heading: 'Overview',
				body: 'Documentation for this role will be added here — projects, responsibilities, and outcomes.'
			}
		]
	},
	{
		id: 1,
		slug: 'pun-hlaing-intern',
		role: 'Software Developer Intern',
		company: 'Pun Hlaing Hospitals',
		startDate: '2024-10-01',
		endDate: '2025-10-01',
		period: formatPeriod('2024-10-01', '2025-10-01'),
		documentation: [
			{
				heading: 'Overview',
				body: 'Documentation for this role will be added here — projects, responsibilities, and outcomes.'
			}
		]
	}
];

/** Newest roles first */
export const workExperienceHistory = [...records].sort((a, b) =>
	b.startDate.localeCompare(a.startDate)
);

export function getWorkExperienceBySlug(slug: string): WorkExperienceRecord | undefined {
	return workExperienceHistory.find((record) => record.slug === slug);
}

export function workExperienceDetailPath(slug: string): string {
	return `/work-experience/${slug}`;
}
