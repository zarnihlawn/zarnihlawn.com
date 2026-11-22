import { describe, expect, it } from 'vitest';
import { HOME_DESCRIPTION, HOME_TITLE, metaDescription } from './seo';
import { shouldInterceptStudyClick, type StudyClick } from './study-click';

function click(partial: Partial<StudyClick> = {}): StudyClick {
	return {
		button: 0,
		metaKey: false,
		ctrlKey: false,
		shiftKey: false,
		altKey: false,
		...partial
	};
}

describe('shouldInterceptStudyClick', () => {
	it('intercepts a plain primary click', () => {
		expect(shouldInterceptStudyClick(click())).toBe(true);
	});

	it('ignores modified and non-primary clicks', () => {
		expect(shouldInterceptStudyClick(click({ metaKey: true }))).toBe(false);
		expect(shouldInterceptStudyClick(click({ ctrlKey: true }))).toBe(false);
		expect(shouldInterceptStudyClick(click({ shiftKey: true }))).toBe(false);
		expect(shouldInterceptStudyClick(click({ altKey: true }))).toBe(false);
		expect(shouldInterceptStudyClick(click({ button: 1 }))).toBe(false);
	});
});

describe('home metadata', () => {
	it('keeps the title and description inside the search snippet window', () => {
		expect(HOME_TITLE.length).toBeGreaterThanOrEqual(50);
		expect(HOME_TITLE.length).toBeLessThanOrEqual(60);
		expect(HOME_DESCRIPTION.length).toBeGreaterThanOrEqual(150);
		expect(HOME_DESCRIPTION.length).toBeLessThanOrEqual(160);
	});

	it('fits a short and a long summary into that window', () => {
		const short = metaDescription('MSc Computer Science at the University of Wolverhampton.');
		const long = metaDescription(
			'Cross-platform Tauri desktop shell for AI-assisted engineering — project library, multi-session terminals, Cursor agent integration, git wizard, and OS keyring secrets.'
		);
		expect(short.length).toBeGreaterThanOrEqual(150);
		expect(short.length).toBeLessThanOrEqual(160);
		expect(long.length).toBeGreaterThanOrEqual(150);
		expect(long.length).toBeLessThanOrEqual(160);
	});
});
