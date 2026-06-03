export type CertificationRecord = {
	id: number;
	title: string;
	issuer: string;
	/** ISO date for sorting (newest first) */
	issueDate: string;
	date: string;
};

function formatDisplayDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number);
	return new Date(year, month - 1, day).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

const records: CertificationRecord[] = [
	{
		id: 1,
		title: 'JavaScript Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-27',
		date: formatDisplayDate('2026-03-27')
	},
	{
		id: 2,
		title: 'Legacy Responsive Web Design V8 Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-19',
		date: formatDisplayDate('2026-03-19')
	}
];

export const certifications = [...records].sort((a, b) =>
	b.issueDate.localeCompare(a.issueDate)
);
