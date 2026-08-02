<script lang="ts">
	import '$lib/asset/style/document.style.css';
	import type { DevelopmentProject, DevelopmentSection } from '$lib/data/development';

	let { project }: { project: DevelopmentProject } = $props();

	function isStackSection(section: DevelopmentSection): boolean {
		return section.heading.toLowerCase() === 'stack';
	}

	function stackLine(section: DevelopmentSection): string {
		return section.items?.join(' · ') ?? '';
	}

	function isListHeavy(section: DevelopmentSection): boolean {
		return Boolean(section.items?.length) && !section.body;
	}
</script>

<div class="portfolio-doc mx-auto w-full max-w-3xl">
	<section class="doc-block">
		<p class="doc-kicker">Repository</p>
		<a
			href={project.repoUrl}
			target="_blank"
			rel="noreferrer"
			class="doc-project-title playfair-font"
		>
			{project.name}
		</a>
		<p class="doc-summary">{project.summary}</p>
	</section>

	{#each project.documentation as section (section.heading)}
		<hr class="doc-rule" />

		<section class="doc-section">
			<p class="doc-subhead">{section.heading}</p>

			{#if section.body}
				<p class="doc-body">{section.body}</p>
			{/if}

			{#if section.items?.length}
				{#if isStackSection(section)}
					<p class="doc-stack">{stackLine(section)}</p>
				{:else if isListHeavy(section)}
					<ol class="doc-focus">
						{#each section.items as item, i (item)}
							<li class="doc-focus-item">
								<span class="doc-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
								<span class="doc-focus-text">{item}</span>
							</li>
						{/each}
					</ol>
				{:else}
					<ul class="doc-list">
						{#each section.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</section>
	{/each}
</div>
