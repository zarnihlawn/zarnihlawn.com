<script lang="ts">
	import '$lib/asset/style/document.style.css';
	import type { WorkExperienceRecord, WorkExperienceSection } from '$lib/data/work-experience';

	let { record }: { record: WorkExperienceRecord } = $props();

	function padIndex(n: number): string {
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

	const hasDocumentModel = $derived(
		Boolean(record.overview?.length || record.projects?.length)
	);
</script>

<div class="portfolio-doc mx-auto w-full max-w-3xl">
	{#if hasDocumentModel}
		{#if roleSection}
			<section class="doc-block">
				<p class="doc-kicker">Role</p>
				{#if roleSection.body}
					<p class="doc-lede">{roleSection.body}</p>
				{/if}
			</section>
		{/if}

		{#if focus?.items?.length}
			<hr class="doc-rule" />

			<section class="doc-block">
				<p class="doc-kicker">Focus</p>
				<ol class="doc-focus">
					{#each focus.items as item, i (item)}
						<li class="doc-focus-item">
							<span class="doc-index" aria-hidden="true">{padIndex(i + 1)}</span>
							<span class="doc-focus-text">{item}</span>
						</li>
					{/each}
				</ol>
			</section>
		{/if}

		{#if record.projects?.length}
			<hr class="doc-rule" />

			<section class="doc-block">
				<p class="doc-kicker">Applications</p>
				<p class="doc-lede">
					{record.applicationsIntro ??
						'Projects from this role. Titles open the repository.'}
				</p>
			</section>

			{#each record.projects as project, i (project.repoUrl ?? project.name)}
				<hr class="doc-rule" />

				<article class="doc-project">
					<div class="doc-project-head">
						<span class="doc-project-no" aria-hidden="true">{padIndex(i + 1)}</span>
						<div class="doc-project-meta">
							{#if project.repoUrl}
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noreferrer"
									class="doc-project-title playfair-font"
								>
									{project.name}
								</a>
							{:else}
								<p class="doc-project-title playfair-font">{project.name}</p>
							{/if}
							{#if project.role}
								<p class="doc-role">{project.role}</p>
							{/if}
							<p class="doc-summary">{project.summary}</p>
						</div>
					</div>

					{#each project.documentation as section (section.heading)}
						<div class="doc-sub">
							<p class="doc-subhead">{section.heading}</p>

							{#if section.body}
								<p class="doc-body">{section.body}</p>
							{/if}

							{#if section.items?.length}
								{#if isStackSection(section)}
									<p class="doc-stack">{stackLine(section)}</p>
								{:else}
									<ul class="doc-list">
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
				<hr class="doc-rule" />
			{/if}

			<section class="doc-section">
				<p class="doc-subhead">{section.heading}</p>

				{#if section.body}
					<p class="doc-body">{section.body}</p>
				{/if}

				{#if section.items?.length}
					{#if isStackSection(section)}
						<p class="doc-stack">{stackLine(section)}</p>
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
	{/if}
</div>
