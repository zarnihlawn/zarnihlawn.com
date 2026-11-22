<script lang="ts">
	import type { WorkExperienceRecord, WorkExperienceSection } from '$lib/data/work-experience';

	let { record }: { record: WorkExperienceRecord } = $props();

	function pad(n: number): string {
		return String(n).padStart(2, '0');
	}

	function isStackSection(section: WorkExperienceSection): boolean {
		return section.heading.toLowerCase() === 'stack';
	}

	function stackLine(section: WorkExperienceSection): string {
		return section.items?.join(' · ') ?? '';
	}

	const roleSection = $derived(
		record.overview?.find((s) => s.heading === 'Role') ??
			record.overview?.find((s) => s.heading === 'Overview')
	);
	const focus = $derived(
		record.overview?.find((s) => s.heading === 'Focus') ??
			record.overview?.find((s) => s.heading === 'Focus areas')
	);

	const hasDocumentModel = $derived(Boolean(record.overview?.length || record.projects?.length));
</script>

<div class="study-doc">
	{#if hasDocumentModel}
		{#if roleSection?.body}
			<section class="study-section">
				<p class="kicker">Role</p>
				<p class="study-body">{roleSection.body}</p>
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
					{record.applicationsIntro ?? 'Projects from this role. Titles open the repository.'}
				</p>
			</section>

			{#each record.projects as project, i (project.repoUrl ?? project.name)}
				<div class="draw-rule" aria-hidden="true"></div>
				<article class="study-block">
					<div class="study-block-head">
						<span class="idx">{pad(i + 1)}</span>
						<div>
							{#if project.repoUrl}
								<a
									class="study-link"
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{project.name}
								</a>
							{:else}
								<p class="study-block-title">{project.name}</p>
							{/if}
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
	{:else if record.documentation?.length}
		{#each record.documentation as section, index (section.heading)}
			{#if index > 0}
				<div class="draw-rule" aria-hidden="true"></div>
			{/if}
			<section class="study-section">
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
			</section>
		{/each}
	{/if}
</div>
