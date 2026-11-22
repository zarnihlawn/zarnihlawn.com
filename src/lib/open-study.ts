import { pushState } from '$app/navigation';
import { tick } from 'svelte';
import { shouldInterceptStudyClick, type StudyRef } from '$lib/study-click';

export const STUDY_FRAME = 'study-frame';

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function focusStudyTitle(): void {
	document.getElementById('study-title')?.focus();
}

/**
 * Closing a modal hands focus back to the trigger, and Chrome marks that restored
 * focus as :focus-visible, so the accent ring lands on the link that was clicked.
 * The flag kills the ring until the next real pointer or key interaction.
 */
export function suppressRestoredFocusRing(): void {
	const root = document.documentElement;
	root.dataset.restoredFocus = '';
	const clear = () => {
		delete root.dataset.restoredFocus;
		window.removeEventListener('pointerdown', clear, true);
		window.removeEventListener('keydown', clear, true);
	};
	window.addEventListener('pointerdown', clear, true);
	window.addEventListener('keydown', clear, true);
}

export async function openStudy(event: MouseEvent, href: string, study: StudyRef): Promise<void> {
	if (!shouldInterceptStudyClick(event)) return;
	event.preventDefault();

	const card = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
	const nameDialog = () => {
		const dialog = document.querySelector('dialog.study-dialog');
		if (dialog instanceof HTMLElement) dialog.style.viewTransitionName = STUDY_FRAME;
		return dialog instanceof HTMLElement ? dialog : null;
	};
	const apply = async () => {
		if (card) card.style.viewTransitionName = '';
		pushState(href, { study });
		await tick();
		nameDialog();
		focusStudyTitle();
	};

	const canTransition =
		!prefersReducedMotion() && typeof document.startViewTransition === 'function';
	if (!canTransition) {
		await apply();
		return;
	}

	if (card) card.style.viewTransitionName = STUDY_FRAME;
	const transition = document.startViewTransition(apply);
	transition.finished.finally(() => {
		if (card) card.style.viewTransitionName = '';
		const dialog = document.querySelector('dialog.study-dialog');
		if (dialog instanceof HTMLElement) dialog.style.viewTransitionName = '';
	});
}
