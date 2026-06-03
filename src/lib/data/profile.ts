export const profile = {
	name: 'Zarni Hlawn.',
	nickname: 'ザーニー',
	roleLeft: 'Software Engineer',
	roleRight: 'Architect',
	location: 'Yangon, Myanmar',
	imageAlt: 'Zarni Hlawn at his desk'
} as const;

export const detailRoutes = [
	'/work-experience',
	'/academic',
	'/certification',
	'/development',
	'/languages',
	'/contribution'
] as const;

export type DetailRoute = (typeof detailRoutes)[number];

export function isDetailRoute(path: string): path is DetailRoute {
	return detailRoutes.includes(path as DetailRoute);
}
