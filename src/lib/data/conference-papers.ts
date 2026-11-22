export type ConferencePaper = {
	id: number;
	title: string;
	venue: string;
	/** Conference organizer link, shown as uit.edu.mm */
	organizerUrl: string;
};

export const conferencePapers: ConferencePaper[] = [
	{
		id: 1,
		title: 'Masked Cross-Feature Reconstruction for Tabular Anomaly Detection',
		venue: '7th International Conference on Advanced Information Technologies (ICAIT 2026)',
		organizerUrl: 'https://uit.edu.mm'
	}
];
