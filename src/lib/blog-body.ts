import type { Component } from 'svelte';

// Kept out of the Svelte component: vite-plugin-svelte caches a compiled component's glob
// results, so a post added while the dev server runs stays invisible until a restart there.
const bodies = import.meta.glob<{ default: Component }>('/src/lib/content/blog/*.md', {
	eager: true
});

const bySlug = new Map(
	Object.entries(bodies).map(([path, module]) => [
		path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/, ''),
		module.default
	])
);

export function blogBody(slug: string): Component | undefined {
	return bySlug.get(slug);
}
