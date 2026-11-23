<script lang="ts">
	import { page } from '$app/state';

	const sections = [
		{ id: 'work', index: '01', label: 'Work' },
		{ id: 'academic', index: '02', label: 'Academic' },
		{ id: 'project-showcase', index: '03', label: 'Projects' },
		{ id: 'conference-papers', index: '04', label: 'Papers' },
		{ id: 'record', index: '05', label: 'Record' },
		{ id: 'contribution', index: '06', label: 'Contribution' }
	] as const;

	let active = $state('');

	const onIndex = $derived(page.url.pathname === '/' || Boolean(page.state.study));

	// The header outlives the index page, so the observer has to rebind to the
	// fresh section nodes every time the index DOM is swapped back in.
	$effect(() => {
		if (!onIndex) {
			active = '';
			return;
		}

		const nodes = sections
			.map((section) => document.getElementById(section.id))
			.filter((node): node is HTMLElement => node instanceof HTMLElement);
		if (nodes.length === 0) {
			active = '';
			return;
		}

		const seen = new Map<string, IntersectionObserverEntry>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) seen.set(entry.target.id, entry);
				const current = [...seen.values()]
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
				if (current) active = current.target.id;
			},
			{ rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.6] }
		);
		for (const node of nodes) observer.observe(node);
		return () => observer.disconnect();
	});
</script>

<header class="site-header">
	<a class="wordmark" href="/">ZARNI_</a>
	<nav class="section-nav" aria-label="Sections">
		{#each sections as section (section.id)}
			<a href="/#{section.id}" aria-current={onIndex && active === section.id ? 'true' : undefined}>
				<!-- <span class="idx">{section.index}</span> -->
				{section.label}
			</a>
		{/each}
	</nav>
	<div class="header-actions">
		<a class="ink-button" href="/blog">Blog</a>
		<a class="ink-button ink-button--signal" href="mailto:zarnihlawn@outlook.com">Mail</a>
	</div>
</header>
