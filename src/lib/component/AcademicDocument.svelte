<script lang="ts">
	import type { AcademicRecord, AcademicSection } from '$lib/data/academic';

	let { record }: { record: AcademicRecord } = $props();

	function pad(n: number): string {
		return String(n).padStart(2, '0');
	}

	function isStackSection(section: AcademicSection): boolean {
		return section.heading.toLowerCase() === 'stack';
	}

	function stackLine(section: AcademicSection): string {
		return section.items?.join(' · ') ?? '';
	}

	const program = $derived(record.overview?.find((s) => s.heading === 'Program'));
	const focus = $derived(record.overview?.find((s) => s.heading === 'Focus areas'));
</script>

<div class="study-doc">
	{#if program?.body}
		<section class="study-section">
			<p class="kicker">Program</p>
			<p class="study-body">{program.body}</p>
		</section>
	{/if}

	{#if focus?.items?.length}
		<div class="draw-rule" aria-hidden="true"></div>
		<section class="study-section">
			<p class="kicker">Focus</p>
			<ol class="study-list">
				{#each focus.items as item, i (item)}
					<li class="study-list-item">
						<span class="idx">{pad(i + 1)}</span>
						<span>{item}</span>
					</li>
				{/each}
			</ol>
		</section>
	{/if}

	{#if record.projects?.length}
		<div class="draw-rule" aria-hidden="true"></div>
		<section class="study-section">
			<p class="kicker">Applications</p>
			<p class="study-body">
				{record.applicationsIntro ??
					'Projects from this program. Titles open the public repository.'}
			</p>
		</section>

		{#each record.projects as project, i (project.repoUrl)}
			<div class="draw-rule" aria-hidden="true"></div>
			<article class="study-block">
				<div class="study-block-head">
					<span class="idx">{pad(i + 1)}</span>
					<div>
						<a class="study-link" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
							{project.name}
						</a>
						{#if project.role}
							<p class="meta">{project.role}</p>
						{/if}
						<p class="study-body">{project.summary}</p>
					</div>
				</div>
				{#each project.documentation as section (section.heading)}
					<div class="study-sub">
						<p class="kicker">{section.heading}</p>
						{#if section.body}
							<p class="study-body">{section.body}</p>
						{/if}
						{#if section.items?.length}
							{#if isStackSection(section)}
								<p class="stack-line study-stack">{stackLine(section)}</p>
							{:else}
								<ul class="study-bullets">
									{#each section.items as item (item)}
										<li>{item}</li>
									{/each}
								</ul>
							{/if}
						{/if}
					</div>
				{/each}
			</article>
		{/each}
	{/if}
</div>
