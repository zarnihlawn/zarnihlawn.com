import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { anchorSlug } from './src/lib/blog-anchor.js';

function textOf(node) {
	if (typeof node.value === 'string') return node.value;
	return (node.children ?? []).map(textOf).join('');
}

/**
 * Post bodies get their table-of-contents anchors at build time, so the rail works
 * without JavaScript and the ids stay crawlable.
 */
const headingIds = () => (tree) => {
	const walk = (node) => {
		if (node.type === 'element' && node.tagName === 'h2') {
			const id = anchorSlug(textOf(node));
			if (id) node.properties = { ...node.properties, id };
		}
		for (const child of node.children ?? []) walk(child);
	};
	walk(tree);
};

/**
 * mdsvex still emits `<script context="module">` for frontmatter, which Svelte 5 warns about.
 * Suppress only that deprecation on markdown files so real warnings keep surfacing.
 */
const warningFilter = (warning) =>
	!(
		warning.code === 'script_context_deprecated' &&
		warning.filename?.endsWith('.md') &&
		warning.start?.line === 1
	);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
		warningFilter
	},
	kit: {
		adapter: adapter()
	},
	preprocess: [mdsvex({ extensions: ['.svx', '.md'], rehypePlugins: [headingIds] })],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
