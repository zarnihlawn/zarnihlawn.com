export type DevelopmentSection = {
	heading: string;
	body?: string;
	items?: string[];
};

export type DevelopmentProject = {
	id: number;
	slug: string;
	name: string;
	summary: string;
	documentation: DevelopmentSection[];
};

export const developmentProjects: DevelopmentProject[] = [
	{
		id: 1,
		slug: 'vaulty',
		name: 'Vaulty',
		summary: 'Storage provider application — cloud and drive-style file storage.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Documentation for Vaulty will be added here — features, architecture, and what you built.'
			}
		]
	},
	{
		id: 2,
		slug: 'automata',
		name: 'Automata',
		summary: 'Automation system for workflows and repeatable tasks.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Documentation for Automata will be added here — features, architecture, and what you built.'
			}
		]
	},
	{
		id: 3,
		slug: 'shaheru',
		name: 'Shaheru',
		summary: 'All-in-one database management system with support for multiple databases.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Documentation for Shaheru will be added here — features, architecture, and what you built.'
			}
		]
	}
];

export function getDevelopmentProjectBySlug(slug: string): DevelopmentProject | undefined {
	return developmentProjects.find((project) => project.slug === slug);
}

export function developmentDetailPath(slug: string): string {
	return `/development/${slug}`;
}
