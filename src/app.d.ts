import type { StudyRef } from '$lib/study-click';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			study?: StudyRef;
		}
		// interface Platform {}
	}
}

export {};
