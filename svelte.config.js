import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';

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
	preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
