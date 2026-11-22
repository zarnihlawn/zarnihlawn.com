<script lang="ts">
	import { page } from '$app/state';
	import type { ComponentProps } from 'svelte';
	import Schematic from '$lib/component/Schematic.svelte';
	import Seo from '$lib/component/Seo.svelte';
	import ContactGlyph from '$lib/component/ContactGlyph.svelte';
	import BlogCard from '$lib/component/BlogCard.svelte';
	import { blogPosts } from '$lib/blog';
	import { developmentDetailPath, developmentProjects } from '$lib/data/development';
	import { languages } from '$lib/data/languages';
	import { profile } from '$lib/data/profile';
	import { technologies } from '$lib/data/tech-stacks';
	import { certifications } from '$lib/data/certifications';
	import { conferencePapers } from '$lib/data/conference-papers';
	import { contributionHistory } from '$lib/data/contribution';
	import { academicSectionRows, workSectionRows } from '$lib/section-rows';
	import Paginator from '$lib/component/Paginator.svelte';
	import { openStudy } from '$lib/open-study';
	import { HOME_DESCRIPTION, HOME_TITLE, personSchema, projectItemListSchema } from '$lib/seo';

	const PROJECTS_PER_PAGE = 18;

	let projectPage = $state(0);

	const projectPages = $derived(
		Array.from({ length: Math.ceil(developmentProjects.length / PROJECTS_PER_PAGE) }, (_, page) =>
			developmentProjects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE)
		)
	);
	const reservedSlots = $derived(
		PROJECTS_PER_PAGE - (projectPages[projectPage]?.length ?? PROJECTS_PER_PAGE)
	);

	const birthday = new Date('2006-02-10');

	function calculateAge(date: Date) {
		const today = new Date();
		let age = today.getFullYear() - date.getFullYear();
		const monthDiff = today.getMonth() - date.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) age--;
		return age;
	}

	const age = calculateAge(birthday);
	const workRows = workSectionRows();
	const academicRows = academicSectionRows();
	const recordRows = certifications.map((certificate) => ({
		href: certificate.verifyUrl,
		title: certificate.title,
		place: certificate.issuer,
		period: certificate.date
	}));
	const origin = $derived(page.url.origin);

	const marks: Partial<Record<string, ComponentProps<typeof Schematic>['kind']>> = {
		'data-helper-application': 'database',
		'agent-workbench': 'terminal',
		drive: 'folders',
		docs: 'documents',
		medora: 'hospital',
		'nextup-web-menzies': 'queue',
		'design-lib-menzies': 'swatch',
		axion: 'anomaly',
		'escape-from-kidnappers': 'escape',
		'ambulance-location-tracker': 'dispatch',
		'parkinsons-prediction': 'biomarker',
		dora: 'allowlist',
		'menzies-gallery': 'gallery',
		'menzies-database-manager': 'dbide',
		'menzies-portal': 'tunnel',
		'menzies-notepad': 'notepad',
		'menzies-calculator': 'calculator'
	};

	function markFor(slug: string): ComponentProps<typeof Schematic>['kind'] {
		return marks[slug] ?? 'documents';
	}

	function pad(index: number) {
		return String(index + 1).padStart(2, '0');
	}

	const contacts = [
		{
			href: 'http://github.com/zarnihlawn',
			label: 'GitHub',
			glyph: 'github',
			external: true
		},
		{
			href: 'mailto:zarnihlawn@outlook.com',
			label: 'Mail',
			glyph: 'mail',
			external: false
		},
		{
			href: 'https://www.youtube.com/@zarnihlawn',
			label: 'YouTube',
			glyph: 'youtube',
			external: true
		},
		{
			href: '/resume.pdf',
			label: 'Resume',
			glyph: 'resume',
			external: false,
			download: 'Zarni-Hlawn-Resume.pdf'
		}
	] as const;
</script>

{#if !page.state.study}
	<Seo
		title={HOME_TITLE}
		description={HOME_DESCRIPTION}
		path="/"
		jsonLd={[personSchema(origin), projectItemListSchema(origin)]}
	/>
{/if}

<div class="page">
	<header class="hero">
		<div>
			<p class="kicker">{profile.nickname}</p>
			<h1>{profile.name}</h1>
			<p class="role-line">
				<span class="signal-word">{profile.roleLeft} & {profile.roleRight}</span>
			</p>
			<p class="stack-line hero-stack">{technologies.join(' · ')}</p>
			<div class="hero-meta">
				<div class="hero-meta-primary">
					<p class="meta">{age} yrs</p>
					<p class="meta">{profile.location}</p>
					<p class="meta">{languages.join(' · ')}</p>
				</div>
				<ul class="hero-icon-bar hero-icon-bar-labeled" aria-label="Contact">
					{#each contacts as contact (contact.href)}
						<li>
							<a
								class="hero-icon-btn hero-icon-btn-labeled"
								href={contact.href}
								download={'download' in contact ? contact.download : undefined}
								target={contact.external ? '_blank' : undefined}
								rel={contact.external ? 'noopener noreferrer' : undefined}
							>
								<ContactGlyph kind={contact.glyph} />
								<span class="hero-icon-label">{contact.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<Schematic kind="hero" class="hero-schematic" />
	</header>

	<section class="section" id="work" aria-labelledby="work-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="work-heading"><span class="idx">01</span>Work</h2>
		<div class="section-split">
			<Schematic kind="work" class="section-schematic" />
			<ol class="timeline">
				{#each workRows as entry, index (entry.href)}
					<li>
						<a
							class="timeline-row"
							href={entry.href}
							data-study="work:{entry.slug}"
							onclick={(event) =>
								openStudy(event, entry.href, {
									kind: 'work',
									slug: entry.slug
								})}
						>
							<span class="idx">{pad(index)}</span>
							<span class="timeline-copy">
								<strong>{entry.title}</strong>
								<span class="meta">{entry.place} · {entry.period}</span>
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="section" id="academic" aria-labelledby="academic-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="academic-heading"><span class="idx">02</span>Academic</h2>
		<div class="section-split">
			<Schematic kind="academic" class="section-schematic" />
			<ol class="timeline">
				{#each academicRows as entry, index (entry.href)}
					<li>
						<a
							class="timeline-row"
							href={entry.href}
							data-study="academic:{entry.slug}"
							onclick={(event) =>
								openStudy(event, entry.href, {
									kind: 'academic',
									slug: entry.slug
								})}
						>
							<span class="idx">{pad(index)}</span>
							<span class="timeline-copy">
								<strong>{entry.title}</strong>
								<span class="meta">{entry.place} · {entry.period}</span>
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="section" id="project-showcase" aria-labelledby="showcase-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="showcase-heading"><span class="idx">03</span>Project Showcase</h2>
		<div class="work-grid">
			{#each projectPages[projectPage] ?? [] as project, index (project.id)}
				<a
					class="work-card"
					href={developmentDetailPath(project.slug)}
					data-study="development:{project.slug}"
					onclick={(event) =>
						openStudy(event, developmentDetailPath(project.slug), {
							kind: 'development',
							slug: project.slug
						})}
				>
					<span class="idx">{pad(index)}</span>
					<h3>{project.name}</h3>
					<Schematic kind={markFor(project.slug)} class="mark" />
				</a>
			{/each}
			{#each { length: reservedSlots } as _, slot (slot)}
				<div class="work-card work-card-slot" aria-hidden="true"></div>
			{/each}
		</div>
		<Paginator
			pages={projectPages.length}
			current={projectPage}
			label="Project pages"
			onSelect={(page) => (projectPage = page)}
		/>
	</section>

	<section class="section" id="conference-papers" aria-labelledby="conference-papers-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="conference-papers-heading"><span class="idx">04</span>Conference Papers</h2>
		<div class="section-split">
			<Schematic kind="library" class="section-schematic" />
			<ol class="timeline">
				{#each conferencePapers as paper, index (paper.id)}
					<li>
						<span class="timeline-row">
							<span class="idx">{pad(index)}</span>
							<span class="timeline-copy">
								<strong>{paper.title}</strong>
								<span class="meta"
									>{paper.venue} ·
									<a
										class="text-link"
										href={paper.organizerUrl}
										target="_blank"
										rel="noopener noreferrer">uit.edu.mm</a
									></span
								>
							</span>
						</span>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="section" id="record" aria-labelledby="record-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="record-heading"><span class="idx">05</span>Record</h2>
		<div class="section-split">
			<Schematic kind="documents" class="section-schematic" />
			<ol class="timeline">
				{#each recordRows as entry, index (entry.href)}
					<li>
						<a class="timeline-row" href={entry.href} target="_blank" rel="noopener noreferrer">
							<span class="idx">{pad(index)}</span>
							<span class="timeline-copy">
								<strong>{entry.title}</strong>
								<span class="meta">{entry.place} · {entry.period}</span>
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="section" id="contribution" aria-labelledby="contribution-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="contribution-heading"><span class="idx">06</span>Contribution</h2>
		<div class="section-split">
			<Schematic kind="community" class="section-schematic" />
			<ol class="timeline">
				{#each contributionHistory as entry, index (entry.title)}
					<li>
						<span class="timeline-row">
							<span class="idx">{pad(index)}</span>
							<span class="timeline-copy">
								<strong>{entry.title}</strong>
								<span class="meta">{entry.place} · {entry.period}</span>
							</span>
						</span>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<section class="section" id="blog" aria-labelledby="blog-heading">
		<div class="draw-rule" aria-hidden="true"></div>
		<h2 id="blog-heading"><span class="idx">07</span>Blog</h2>
		<div class="blog-grid">
			{#each blogPosts.slice(0, 6) as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
		<p class="blog-more"><a class="hero-jump" href="/blog">All posts</a></p>
	</section>
</div>
