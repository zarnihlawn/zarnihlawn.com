/**
 * Shared by the build-time rehype plugin in svelte.config.js and the runtime TOC,
 * so anchor hrefs and rendered heading ids cannot drift apart.
 * @param {string} text
 */
export function anchorSlug(text) {
	return text
		.toLowerCase()
		.replace(/[`*_~]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
