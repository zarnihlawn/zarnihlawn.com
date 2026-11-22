export type CertificationRecord = {
	title: string;
	issuer: string;
	/** ISO date for sorting (newest first) */
	issueDate: string;
	/** Displayed as year only in the UI */
	date: string;
	verifyUrl: string;
};

function formatDisplayDate(iso: string): string {
	const [year] = iso.split('-');
	return year;
}

const records: CertificationRecord[] = [
	{
		title: 'CS50x: Introduction to Computer Science',
		issuer: 'Harvard University',
		issueDate: '2026-07-06',
		date: formatDisplayDate('2026-07-06'),
		verifyUrl: 'https://cs50.harvard.edu/certificates/f6fcbdc6-954f-404b-bdbb-109fc73f7d1d'
	},
	{
		title: 'JavaScript Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-27',
		date: formatDisplayDate('2026-03-27'),
		verifyUrl: 'https://freecodecamp.org/certification/zarnihlawn/javascript-v9'
	},
	{
		title: 'Legacy Responsive Web Design V8 Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-19',
		date: formatDisplayDate('2026-03-19'),
		verifyUrl: 'https://freecodecamp.org/certification/zarnihlawn/responsive-web-design'
	}
];

export const certifications = [...records].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
