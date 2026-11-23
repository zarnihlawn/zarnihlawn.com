import { expect, test } from '@playwright/test';

test('home opens a project dialog and escape returns', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toHaveCount(1);
	const card = page.locator('a[href="/development/data-helper-application"]');
	await expect(card).toBeVisible();
	await card.click();
	await expect(page).toHaveURL(/\/development\/data-helper-application$/);
	const dialog = page.locator('dialog');
	await expect(dialog).toBeVisible();
	await expect(dialog.locator('h2')).toHaveText('Data Helper Application');
	await page.keyboard.press('Escape');
	await expect(page).toHaveURL('/');
	await expect(dialog).toBeHidden();
});

test('each section draws exactly one divider rule', async ({ page }) => {
	await page.goto('/');

	const sections = page.locator('.section');
	await expect(sections).toHaveCount(7);

	for (const section of await sections.all()) {
		await expect(section.locator('.draw-rule')).toHaveCount(1);

		const borders = await section.evaluate((element) => {
			const style = getComputedStyle(element);
			return [style.borderTopWidth, style.borderBottomWidth];
		});
		expect(borders).toEqual(['0px', '0px']);
	}

	const heroBottomBorder = await page
		.locator('.hero')
		.evaluate((element) => getComputedStyle(element).borderBottomWidth);
	expect(heroBottomBorder).toBe('0px');
});

test('section illustrations draw a single ground line and the hero shows the portrait', async ({
	page
}) => {
	await page.goto('/');

	for (const id of ['academic', 'conference-papers']) {
		const horizontalPaths = await page
			.locator(`#${id} svg path`)
			.evaluateAll((paths) =>
				paths.map((path) => path.getAttribute('d') ?? '').filter((d) => /^M\d+\s+\d+h\d+$/.test(d))
			);
		expect(horizontalPaths).toHaveLength(1);
	}

	const workPhoto = page.locator('#work img.section-photo');
	await expect(workPhoto).toHaveAttribute('src', '/zarni-work.webp');
	await expect(workPhoto).toHaveAttribute('width', '1000');
	await expect(workPhoto).toHaveAttribute('height', '879');
	await expect(workPhoto).toHaveAttribute('loading', 'lazy');

	const heroPortrait = page.locator('.hero-portrait');
	await expect(heroPortrait).toHaveAttribute('src', '/zarni-hlawn.webp');
	await expect(heroPortrait).toHaveAttribute('width', '420');
	await expect(heroPortrait).toHaveAttribute('height', '420');
	await expect(page.locator('.hero img')).toHaveCount(1);
});

test('sections centre their content between divider rules', async ({ page }) => {
	await page.goto('/');

	const gaps = await page
		.locator('.section')
		.first()
		.evaluate((element) => {
			const rule = element.querySelector('.draw-rule');
			const heading = element.querySelector('h2');
			const content = element.lastElementChild;
			const top = heading.getBoundingClientRect().top;
			return {
				above: top - rule.getBoundingClientRect().bottom,
				below: element.getBoundingClientRect().bottom - content.getBoundingClientRect().bottom
			};
		});
	expect(gaps.above).toBeGreaterThanOrEqual(56);
	expect(Math.abs(gaps.above - gaps.below)).toBeLessThanOrEqual(1);

	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	expect(overflow).toBeLessThanOrEqual(1);
});

test('a direct detail url renders the case title', async ({ page }) => {
	await page.goto('/development/data-helper-application');
	await expect(page.locator('h1')).toHaveText('Data Helper Application');
	await expect(page).toHaveTitle(/Data Helper Application/);
});

test('a project without a public repo shows no Repository link', async ({ page }) => {
	await page.goto('/development/medora');

	await expect(page.locator('h1')).toHaveText('Medora');
	await expect(page.locator('.study-link')).toHaveCount(0);
	await expect(page.locator('.study-doc')).not.toBeEmpty();

	await page.goto('/development/data-helper-application');
	await expect(page.locator('.study-link')).toHaveAttribute(
		'href',
		'https://github.com/zarnihlawn/database-helper-application'
	);
});

test('every showcase project resolves to its own detail page', async ({ page }) => {
	const linked = [
		'axion',
		'escape-from-kidnappers',
		'ambulance-location-tracker',
		'parkinsons-prediction',
		'menzies-gallery',
		'menzies-database-manager',
		'menzies-portal',
		'menzies-notepad',
		'menzies-calculator'
	];

	for (const slug of linked) {
		const response = await page.goto(`/development/${slug}`);
		expect(response?.status()).toBe(200);
		await expect(page.locator('h1')).not.toBeEmpty();
		await expect(page.locator('.study-link')).toHaveAttribute('href', /^https:\/\/github\.com\//);
	}

	const privateResponse = await page.goto('/development/dora');
	expect(privateResponse?.status()).toBe(200);
	await expect(page.locator('h1')).toHaveText('Dora');
	await expect(page.locator('.study-link')).toHaveCount(0);
});

test('academic project cards sit in the showcase and open their program', async ({ page }) => {
	await page.goto('/');

	const grid = page.locator('#project-showcase .work-grid');
	const dots = page.locator('#project-showcase .paginator-page');
	await expect(dots).toHaveCount(2);
	await expect(dots.first()).toHaveText('1');
	await expect(dots.last()).toHaveText('2');

	// The paginator sits clear of the grid frame instead of touching it.
	const gap = await page.locator('#project-showcase .paginator').evaluate((nav) => {
		const above = nav.previousElementSibling!.getBoundingClientRect();
		return nav.getBoundingClientRect().top - above.bottom;
	});
	expect(gap).toBeGreaterThanOrEqual(24);

	// Seventeen development projects lead, then academic work fills the rest of page one.
	const journal = grid.locator('a[href="/academic/msc-computer-science"]', {
		hasText: 'Portfolio Journal'
	});
	await expect(journal.locator('.kind')).toHaveCount(0);
	await expect(journal.locator('svg.mark')).toHaveCount(1);

	await journal.click();
	await expect(page.locator('dialog.study-dialog h2')).toHaveText('MSc Computer Science');
	await expect(page.locator('dialog.study-dialog')).toContainText('Portfolio Journal');
	await page.keyboard.press('Escape');

	await dots.nth(1).click();
	await expect(grid.locator('a[href^="/academic/"]')).toHaveCount(7);
	for (const card of await grid.locator('a').all()) {
		await expect(card).toHaveAttribute('href', /^\/academic\//);
	}
});

test('scroll progress bar uses the signal color', async ({ page }) => {
	await page.goto('/');

	const bar = page.locator('.scroll-progress');
	await expect(bar).toBeAttached();

	const background = await bar.evaluate((element) => getComputedStyle(element).backgroundColor);
	expect(background).toBe('rgb(250, 22, 63)');
});

test('project cards hide the summary but the dialog still shows it', async ({ page }) => {
	await page.goto('/');

	const cards = page.locator('#project-showcase .work-card');
	await expect(cards.first()).toBeVisible();
	for (const card of await cards.all()) {
		await expect(card.locator('p')).toHaveCount(0);
	}

	await cards.first().click();
	const dialog = page.locator('dialog.study-dialog');
	await expect(dialog).toBeVisible();
	await expect(dialog.locator('.study-lede')).not.toHaveText('');
});

test('the dialog trigger keeps no ring after close and rings on hover', async ({ page }) => {
	await page.goto('/');
	const row = page.locator('a[data-study="work:pun-hlaing-data-software-engineer"]');
	const outline = () => row.evaluate((element) => getComputedStyle(element).outlineStyle);

	await row.click();
	await expect(page.locator('dialog.study-dialog')).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.locator('dialog.study-dialog')).toBeHidden();
	await page.mouse.move(0, 0);
	expect(await outline()).toBe('none');

	await row.hover();
	expect(await outline()).toBe('solid');
});

test('project showcase is a 6 column grid that leaves blank paper, not ink, in a short row', async ({
	page
}) => {
	await page.goto('/');

	const grid = page.locator('#project-showcase .work-grid');
	await expect(grid).toBeVisible();
	expect(
		await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' '))
	).toHaveLength(6);
	await expect(grid.locator('.work-card')).toHaveCount(18);

	// The grid must not paint ink behind its cells: that is what showed through as black voids.
	expect(await grid.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(
		'rgba(0, 0, 0, 0)'
	);

	// Page two overflows the first row, so its tail must end in page paper with no filler cells.
	await page.locator('#project-showcase .paginator-page').last().click();
	await expect(grid.locator('.work-card')).toHaveCount(7);
	await expect(grid.locator('.work-card-slot')).toHaveCount(0);

	const active = page.locator('#project-showcase .paginator-page.is-active');
	await expect(active).toHaveCount(1);
	await expect(active).toHaveAttribute('aria-current', 'true');
});

test('conference papers lists each published paper', async ({ page }) => {
	await page.goto('/');

	const rows = page.locator('#conference-papers .timeline-row');
	await expect(rows).toHaveCount(1);
	await expect(rows.first()).toContainText(
		'Masked Cross-Feature Reconstruction for Tabular Anomaly Detection'
	);
	await expect(rows.first()).toContainText('ICAIT 2026');

	const organizer = page.locator('#conference-papers a');
	await expect(organizer).toHaveCount(1);
	await expect(organizer).toHaveText('uit.edu.mm');
	await expect(organizer).toHaveAttribute('href', 'https://uit.edu.mm');
	await expect(organizer).toHaveAttribute('target', '_blank');
	await expect(organizer).toHaveAttribute('rel', 'noopener noreferrer');
});

test('conference papers and contribution rows are not links', async ({ page }) => {
	await page.goto('/');

	for (const id of ['conference-papers', 'contribution']) {
		const row = page.locator(`#${id} .timeline-row`).first();
		await expect(row).toHaveJSProperty('tagName', 'SPAN');
	}
});

test('contribution lists each entry with its place and period', async ({ page }) => {
	await page.goto('/');

	const rows = page.locator('#contribution .timeline-row');
	await expect(rows).toHaveCount(3);
	await expect(rows.first()).toContainText('Class Executive Committee (EC)');
	await expect(rows.first()).toContainText('Strategy First University · 2025-2026');
	await expect(rows.last()).toContainText('Shae Oo Pyu Su Chin (A Chay Khan)');
});

test('the hero shows both languages inline with age and location', async ({ page }) => {
	await page.goto('/');

	const primary = page.locator('.hero-meta-primary');
	await expect(primary).toContainText('Burmese · English');
	await expect(page.locator('#languages, .lang-table')).toHaveCount(0);
});

test('record rows link straight to the issuer verification page', async ({ page }) => {
	await page.goto('/');

	const rows = page.locator('#record .timeline-row');
	await expect(rows).toHaveCount(3);
	await expect(page.locator('#record img')).toHaveCount(0);
	await expect(page.locator('#record .paginator')).toHaveCount(0);

	const first = rows.first();
	await expect(first).toHaveAttribute(
		'href',
		'https://cs50.harvard.edu/certificates/f6fcbdc6-954f-404b-bdbb-109fc73f7d1d'
	);
	await expect(first).toHaveAttribute('target', '_blank');
	await expect(first).toHaveAttribute('rel', 'noopener noreferrer');
});

test('the header shows a black Blog button beside a signal Mail button', async ({ page }) => {
	await page.goto('/');

	const actions = page.locator('.header-actions a');
	await expect(actions).toHaveCount(2);
	await expect(actions.nth(0)).toHaveText('Blog');
	await expect(actions.nth(0)).toHaveAttribute('href', '/blog');
	await expect(actions.nth(1)).toHaveText('Mail');

	const background = (locator: (typeof actions)[number]) =>
		locator.evaluate((element) => getComputedStyle(element).backgroundColor);
	expect(await background(actions.nth(0))).toBe('rgb(17, 17, 17)');
	expect(await background(actions.nth(1))).toBe('rgb(250, 22, 63)');
});

test('the blog section is numbered and shows the latest posts as a card grid', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('#blog-heading')).toHaveText('07Blog');

	const cards = page.locator('#blog .blog-card');
	await expect(cards).toHaveCount(2);

	// Home caps the strip at nine tiles in three columns; a short strip must not add filler cells.
	expect(
		await page
			.locator('#blog .blog-grid')
			.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' '))
	).toHaveLength(3);
	await expect(page.locator('#blog .blog-grid > *')).toHaveCount(2);

	for (const card of await cards.all()) {
		await expect(card).toHaveAttribute('href', /^\/blog\/[a-z0-9-]+$/);
		await expect(card.locator('h3')).not.toHaveText('');
		await expect(card.locator('.blog-pill')).not.toHaveText('');
		await expect(card.locator('.blog-card-foot')).toContainText('Duration:');

		const image = card.locator('img');
		await expect(image).toHaveAttribute('width', '640');
		await expect(image).toHaveAttribute('height', '640');

		await card.scrollIntoViewIfNeeded();
		await expect
			.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
			.toBeGreaterThan(0);
	}
});

test('the blog button opens an index rendered as the same card grid', async ({ page }) => {
	await page.goto('/');
	await page.locator('.header-actions a').first().click();

	await expect(page).toHaveURL('/blog');
	await expect(page.locator('h1')).toHaveText('Blog');
	await expect(page.locator('.timeline')).toHaveCount(0);

	const grid = page.locator('.blog-grid');
	await expect(grid).toHaveCount(1);
	await expect(grid.locator('.blog-card')).toHaveCount(2);

	// The index is three columns wide with as many rows as the posts need, no empty cells.
	expect(
		await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' '))
	).toHaveLength(3);
	await expect(grid.locator('> *')).toHaveCount(2);
});

test('the blog filters sit beside the title', async ({ page }) => {
	await page.goto('/blog');

	const head = page.locator('.blog-head');
	await expect(head.locator('h1')).toHaveText('Blog');
	await expect(head.locator('.blog-filters')).toHaveCount(1);

	// Filters render on the same row, to the right of the title.
	const placement = await head.evaluate((element) => {
		const title = element.querySelector('h1')!.getBoundingClientRect();
		const nav = element.querySelector('.blog-filters')!.getBoundingClientRect();
		return { toTheRight: nav.left >= title.right, sameRow: nav.top < title.bottom };
	});
	expect(placement.toTheRight).toBe(true);
	expect(placement.sameRow).toBe(true);

	const filters = page.locator('.blog-filters button');
	await expect(filters.first()).toHaveText('All');
	await expect(filters.first()).toHaveAttribute('aria-pressed', 'true');

	const target = filters.nth(1);
	const label = (await target.textContent())?.trim() ?? '';

	await target.click();
	await expect(target).toHaveAttribute('aria-pressed', 'true');
	await expect(filters.first()).toHaveAttribute('aria-pressed', 'false');
	await expect(page.locator('.blog-grid .blog-card .blog-pill')).toHaveText(label);
});

test('a post renders its markdown body and its own title', async ({ page }) => {
	await page.goto('/blog/icait-2026-masked-reconstruction-talk');

	await expect(page.locator('h1')).toHaveText('Presenting masked reconstruction at ICAIT 2026');
	await expect(page).toHaveTitle(/Presenting masked reconstruction at ICAIT 2026/);
	await expect(page.locator('.study-chrome-body')).toContainText('The problem, without the jargon');
	await expect(page.locator('.study-lede')).toContainText('Research');
});

test('a cold load on a toc anchor keeps the section body on screen', async ({ page }) => {
	await page.goto(
		'/blog/icait-2026-masked-reconstruction-talk#why-hiding-cells-is-not-just-cheap-noise'
	);

	const heading = page.locator('#why-hiding-cells-is-not-just-cheap-noise');
	await expect(heading).toBeVisible();
	await expect(page.locator('.blog-post-main p').first()).toBeVisible();
	await expect(heading.locator('xpath=following-sibling::p[1]')).toContainText(
		'Each cell in a row can be imagined with a dial'
	);
});

test('an unknown post slug returns a 404', async ({ page }) => {
	const response = await page.goto('/blog/not-a-real-post');
	expect(response?.status()).toBe(404);
});

test('a post paints its title in the signal color and shows its cover', async ({ page }) => {
	await page.goto('/blog/icait-2026-masked-reconstruction-talk');

	const color = await page
		.locator('.blog-post .study-title')
		.evaluate((element) => getComputedStyle(element).color);
	expect(color).toBe('rgb(250, 22, 63)');

	const cover = page.locator('.blog-cover img');
	await expect(cover).toHaveAttribute('width', '640');
	await expect(cover).toHaveAttribute('height', '640');
	await expect(cover).toHaveAttribute('src', '/blog/icait-talk.webp');
	await expect
		.poll(() => cover.evaluate((element: HTMLImageElement) => element.naturalWidth))
		.toBeGreaterThan(0);
});

test('the table of contents links to real headings and tracks reading progress', async ({
	page
}) => {
	await page.goto('/blog/icait-2026-masked-reconstruction-talk');

	const links = page.locator('.blog-toc a');
	await expect(links).toHaveCount(8);

	for (const link of await links.all()) {
		const id = (await link.getAttribute('href'))!.replace(/^#/, '');
		await expect(page.locator(`#${id}`)).toHaveCount(1);
	}

	const label = page.locator('.blog-progress-label');
	await expect(label).toHaveText('0% read');

	await page.locator('.blog-toc a').last().click();
	await expect(page).toHaveURL(/#what-i-would-do-next$/);
	await expect
		.poll(async () => Number((await label.textContent())!.replace(/\D/g, '')))
		.toBeGreaterThan(0);
	await expect(page.locator('.blog-toc a[aria-current="true"]')).toHaveCount(1);
});

test('the listen button targets the prebuilt narration and toggles state', async ({ page }) => {
	await page.goto('/blog/icait-2026-masked-reconstruction-talk');

	const button = page.locator('.blog-audio');
	await expect(button).toHaveAttribute('aria-pressed', 'false');
	await expect(button).toHaveAttribute('aria-label', 'Listen to this article');
	await expect(page.locator('audio')).toHaveAttribute(
		'src',
		'/blog/audio/icait-2026-masked-reconstruction-talk.mp3'
	);
	await expect(page.locator('audio')).toHaveAttribute('preload', 'none');

	const status = await page.locator('audio').evaluate(async (element: HTMLAudioElement) => {
		const response = await fetch(element.src);
		return response.status;
	});
	expect(status).toBe(200);
});

test('the section indicator rebinds to the index after a blog round trip', async ({ page }) => {
	await page.goto('/');
	const nav = page.locator('.section-nav a');
	const current = () =>
		nav.evaluateAll((links) =>
			links
				.filter((a) => a.getAttribute('aria-current') === 'true')
				.map((a) => a.textContent?.trim())
		);

	// Scroll to the bottom so Contribution is latched before leaving.
	const toBottom = () => page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
	await toBottom();
	await expect.poll(async () => (await current())[0]).toBe('Contribution');

	await page.goto('/blog');
	await page.goto('/blog/icait-2026-masked-reconstruction-talk');
	await page.locator('.wordmark').click();
	await expect(page).toHaveURL('/');
	await expect(page.locator('#work')).toBeVisible();

	// The header outlived the index DOM, so the observer must have rebound:
	// at the top of the fresh page no section is current, not a stale Contribution.
	await expect(nav.locator('[aria-current="true"]')).toHaveCount(0);

	// And it is live again: the last section still lights up on scroll.
	await toBottom();
	await expect.poll(async () => (await current())[0]).toBe('Contribution');
});

test('each section header link lands on its own section from a fresh load', async ({ page }) => {
	const targets = [
		['Work', 'work'],
		['Academic', 'academic'],
		['Projects', 'project-showcase'],
		['Papers', 'conference-papers'],
		['Record', 'record'],
		['Contribution', 'contribution']
	] as const;

	for (const [label, id] of targets) {
		// A fresh load is what exposes it: clicking through in one session warms
		// up the offscreen sections' real heights and hides the misplacement.
		await page.goto('/');
		await page.locator('.section-nav a', { hasText: label }).click();
		await expect
			.poll(() => page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top))
			.toBeGreaterThan(-80);
		await expect(page.locator('.section-nav a[aria-current="true"]')).toHaveText(label);
	}
});

test('the document scrollbar matches the design palette', async ({ page }) => {
	await page.goto('/');

	const scrollbarColor = await page.evaluate(
		() => getComputedStyle(document.documentElement).scrollbarColor
	);
	expect(scrollbarColor).toBe('rgb(17, 17, 17) rgb(244, 244, 241)');
});
