export type LanguageRecord = {
	id: number;
	name: string;
	proficiency: string;
	detail?: string;
	institution?: string;
	date?: string;
};

export const languages: LanguageRecord[] = [
	{
		id: 1,
		name: 'Burmese',
		proficiency: 'Native',
		detail: 'Native tongue'
	},
	{
		id: 2,
		name: 'English',
		proficiency: 'Level 4',
		detail: 'General English & English for Academic Purposes',
		institution: 'TEG International College',
		date: 'June 2024'
	},
	{
		id: 3,
		name: 'Japanese',
		proficiency: 'N5',
		detail: 'Passed N5',
		institution: 'Sora Japanese Language School, Myanmar'
	}
];
