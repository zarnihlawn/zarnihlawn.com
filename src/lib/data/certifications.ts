import cs50xCertificate from '$lib/asset/image/certifications/cs50x.png';
import javascriptCertificate from '$lib/asset/image/certifications/javascript.png';
import responsiveWebDesignCertificate from '$lib/asset/image/certifications/responsive-web-design-v8.png';

export type CertificationRecord = {
	id: number;
	title: string;
	issuer: string;
	/** ISO date for sorting (newest first) */
	issueDate: string;
	/** Displayed as year only in the UI */
	date: string;
	image?: string;
	imageAlt?: string;
	verifyUrl?: string;
};

function formatDisplayDate(iso: string): string {
	const [year] = iso.split('-');
	return year;
}

const records: CertificationRecord[] = [
	{
		id: 3,
		title: 'CS50x: Introduction to Computer Science',
		issuer: 'Harvard University',
		issueDate: '2026-07-06',
		date: formatDisplayDate('2026-07-06'),
		image: cs50xCertificate,
		imageAlt: 'CS50x certificate awarded to Zarni Hlawn by Harvard University',
		verifyUrl: 'https://cs50.harvard.edu/certificates/f6fcbdc6-954f-404b-bdbb-109fc73f7d1d'
	},
	{
		id: 1,
		title: 'JavaScript Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-27',
		date: formatDisplayDate('2026-03-27'),
		image: javascriptCertificate,
		imageAlt: 'JavaScript Developer Certification awarded to Zarni Hlawn by freeCodeCamp',
		verifyUrl: 'https://freecodecamp.org/certification/zarnihlawn/javascript-v9'
	},
	{
		id: 2,
		title: 'Legacy Responsive Web Design V8 Certificate',
		issuer: 'freeCodeCamp',
		issueDate: '2026-03-19',
		date: formatDisplayDate('2026-03-19'),
		image: responsiveWebDesignCertificate,
		imageAlt:
			'Legacy Responsive Web Design V8 certification awarded to Zarni Hlawn by freeCodeCamp',
		verifyUrl: 'https://freecodecamp.org/certification/zarnihlawn/responsive-web-design'
	}
];

export const certifications = [...records].sort((a, b) =>
	b.issueDate.localeCompare(a.issueDate)
);
