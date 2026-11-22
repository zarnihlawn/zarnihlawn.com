<script lang="ts">
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

	function pad(n: number): string {
		return String(n).padStart(2, '0');
	}
</script>

<div class="study-doc">
	{#if project.repoUrl}
		<section class="study-block">
			<p class="kicker">Repository</p>
			<a class="study-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
				{project.name} on GitHub
			</a>
		</section>
	{/if}

	{#each project.documentation as section (section.heading)}
		<div class="draw-rule" aria-hidden="true"></div>
		<section class="study-section">
			<p class="kicker">{section.heading}</p>
			{#if section.body}
				<p class="study-body">{section.body}</p>
			{/if}
			{#if section.items?.length}
				{#if isStackSection(section)}
					<p class="stack-line study-stack">{stackLine(section)}</p>
				{:else if isListHeavy(section)}
					<ol class="study-list">
						{#each section.items as item, i (item)}
							<li class="study-list-item">
								<span class="idx">{pad(i + 1)}</span>
								<span>{item}</span>
							</li>
						{/each}
					</ol>
				{:else}
					<ul class="study-bullets">
						{#each section.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</section>
	{/each}
</div>
