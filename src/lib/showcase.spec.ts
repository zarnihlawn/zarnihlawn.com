import { describe, expect, it } from 'vitest';
import { academicHistory } from '$lib/data/academic';
import { developmentProjects } from '$lib/data/development';
import { showcaseItems } from './showcase';

describe('showcaseItems', () => {
	it('lists every development project first', () => {
		expect(showcaseItems.slice(0, developmentProjects.length).map((item) => item.name)).toEqual(
			developmentProjects.map((project) => project.name)
		);
	});

	it('adds academic projects that are not already in the showcase', () => {
		const repos = new Set(developmentProjects.map((project) => project.repoUrl));
		const academicNames = academicHistory
			.flatMap((record) => record.projects ?? [])
			.filter((project) => !repos.has(project.repoUrl))
			.map((project) => project.name);

		const appended = showcaseItems.slice(developmentProjects.length).map((item) => item.name);
		expect(appended).toEqual(academicNames);
		expect(appended.length).toBeGreaterThan(0);
	});

	it('opens academic cards on their program, not a project page', () => {
		for (const item of showcaseItems.slice(developmentProjects.length)) {
			expect(item.study.kind).toBe('academic');
			expect(item.href).toBe(`/academic/${item.study.slug}`);
		}
	});

	it('uses unique keys so illustrations and list keys stay stable', () => {
		const keys = showcaseItems.map((item) => item.key);
		expect(new Set(keys).size).toBe(keys.length);
		for (const key of keys) expect(key).toMatch(/^[a-z0-9-]+$/);
	});
});
