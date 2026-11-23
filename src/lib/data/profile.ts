export const profile = {
	name: 'Zarni Hlawn.',
	nickname: 'ザニ',
	roleLeft: 'Software Engineer',
	roleRight: 'Architect',
	location: 'Yangon, Myanmar',
	imageAlt: 'Portrait of Zarni Hlawn'
} as const;

export const detailRoutes = [
	'/work-experience',
	'/academic',
	'/development',
	'/contribution'
] as const;

export type DetailRoute = (typeof detailRoutes)[number];

export function isDetailRoute(path: string): path is DetailRoute {
	return detailRoutes.includes(path as DetailRoute);
}
