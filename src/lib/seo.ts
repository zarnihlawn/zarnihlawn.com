import { developmentDetailPath, developmentProjects } from '$lib/data/development';
import { blogPostPath, blogPosts } from '$lib/blog';

export const HOME_TITLE = 'Zarni Hlawn — Software Engineer in Yangon, Myanmar';

export const HOME_DESCRIPTION =
	'Software engineer building web apps, automation, and tools. Based in Yangon. Experienced in full-stack development across SvelteKit, Tauri, and databases.';

export const ABOUT =
	'Software engineer building web apps, automation, and tools. Based in Yangon. Experienced in full-stack development.';

const DESCRIPTION_PAD = HOME_DESCRIPTION;

export function metaDescription(text: string): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	const combined = clean.length >= 150 ? clean : `${clean.replace(/\.+$/, '')}. ${DESCRIPTION_PAD}`;
	if (combined.length >= 150 && combined.length <= 160) return combined;

	const cut = combined.slice(0, 160);
	const space = cut.lastIndexOf(' ');
	const atWord = (space >= 150 ? cut.slice(0, space) : cut).replace(/[\s.,;:—\-]+$/u, '').trim();
	if (atWord.length >= 150 && atWord.length <= 160) return atWord;
	return cut.trim();
}

export function pageTitle(subject: string): string {
	const branded = `${subject} — Zarni Hlawn`;
	if (branded.length <= 60) return branded;
	if (subject.length <= 60) return subject;
	return `${subject.slice(0, 59).trimEnd()}…`;
}

export function personSchema(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Zarni Hlawn',
		jobTitle: 'Software Engineer',
		url: new URL('/', origin).href,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Yangon',
			addressCountry: 'MM'
		},
		sameAs: ['http://github.com/zarnihlawn', 'https://www.youtube.com/@zarnihlawn']
	};
}

export function projectItemListSchema(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: developmentProjects.map((project, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: project.name,
			url: new URL(developmentDetailPath(project.slug), origin).href
		}))
	};
}

export function blogItemListSchema(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: blogPosts.map((post, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: post.title,
			url: new URL(blogPostPath(post.slug), origin).href
		}))
	};
}

export function creativeWorkSchema(name: string, description: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name,
		description,
		author: {
			'@type': 'Person',
			name: 'Zarni Hlawn'
		}
	};
}
