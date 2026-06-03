export type AcademicStatus = 'completed' | 'in-progress';

export type AcademicRecord = {
	id: number;
	institution: string;
	program: string;
	period: string;
	status: AcademicStatus;
	location?: string;
};

export const academicHistory: AcademicRecord[] = [
	{
		id: 1,
		institution: 'University of Wolverhampton',
		program: 'MSc Computer Science',
		period: 'October 2025 – Present',
		status: 'in-progress'
	},
	{
		id: 2,
		institution: 'University of Sunderland',
		program: 'BSc (Hons) Computer Science',
		period: 'July 2025',
		status: 'completed'
	},
	{
		id: 3,
		institution: 'TMC Academy',
		program: 'Higher Diploma in Information Technology',
		period: 'August 2024',
		status: 'completed'
	},
	{
		id: 4,
		institution: 'GUSTO University',
		program: 'Pearson BTEC International Level 3 Foundation Diploma',
		period: 'October 2023',
		status: 'completed'
	}
];

export const academicStatusLabel: Record<AcademicStatus, string> = {
	completed: 'Completed',
	'in-progress': 'In Progress'
};
