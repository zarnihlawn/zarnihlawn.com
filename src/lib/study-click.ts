export type StudyKind = 'development' | 'work' | 'academic';

export type StudyRef = {
	kind: StudyKind;
	slug: string;
};

export type StudyClick = {
	button: number;
	metaKey: boolean;
	ctrlKey: boolean;
	shiftKey: boolean;
	altKey: boolean;
};

/** Plain primary clicks open the case dialog. Modified clicks keep the browser default. */
export function shouldInterceptStudyClick(event: StudyClick): boolean {
	return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
