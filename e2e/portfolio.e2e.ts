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

test('section illustrations draw a single ground line', async ({ page }) => {
	await page.goto('/');

	for (const id of ['work', 'academic', 'conference-papers']) {
		const horizontalPaths = await page
			.locator(`#${id} svg path`)
			.evaluateAll((paths) =>
				paths.map((path) => path.getAttribute('d') ?? '').filter((d) => /^M\d+\s+\d+h\d+$/.test(d))
			);
		expect(horizontalPaths).toHaveLength(1);
	}

	const heroPaths = await page
		.locator('.hero-schematic path')
		.evaluateAll((paths) =>
			paths.map((path) => path.getAttribute('d') ?? '').filter((d) => /^M\d+\s+\d+h\d+$/.test(d))
		);
	expect(heroPaths).toHaveLength(1);
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

test('project showcase is a 6 column by 3 row grid with a paginator', async ({ page }) => {
	await page.goto('/');

	const grid = page.locator('#project-showcase .work-grid');
	await expect(grid).toBeVisible();
	expect(
		await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' '))
	).toHaveLength(6);
	await expect(grid.locator('.work-card')).toHaveCount(18);

	const active = page.locator('#project-showcase .paginator-dot.is-active');
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

test('the blog section is numbered and shows the latest six posts as a card grid', async ({
	page
}) => {
	await page.goto('/');

	await expect(page.locator('#blog-heading')).toHaveText('07Blog');

	const cards = page.locator('#blog .blog-card');
	await expect(cards).toHaveCount(6);

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

	const cards = page.locator('.blog-grid .blog-card');
	await expect(cards).toHaveCount(6);
	await expect(page.locator('.blog-grid')).toHaveCount(1);
});

test('the blog filters sit beside the title and narrow the grid', async ({ page }) => {
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

	const cards = page.locator('.blog-grid .blog-card');
	const total = await cards.count();
	const target = filters.nth(1);
	const label = (await target.textContent())?.trim() ?? '';

	await target.click();
	await expect(target).toHaveAttribute('aria-pressed', 'true');
	await expect(filters.first()).toHaveAttribute('aria-pressed', 'false');

	const filtered = await cards.count();
	expect(filtered).toBeGreaterThan(0);
	expect(filtered).toBeLessThan(total);

	for (const card of await cards.all()) {
		await expect(card.locator('.blog-pill')).toHaveText(label);
	}
});

test('a post renders its markdown body and its own title', async ({ page }) => {
	await page.goto('/blog/masked-cross-feature-reconstruction');

	await expect(page.locator('h1')).toHaveText(
		'Masked Cross-Feature Reconstruction, in plain terms'
	);
	await expect(page).toHaveTitle(/Masked Cross-Feature Reconstruction/);
	await expect(page.locator('.study-chrome-body')).toContainText('The premise');
	await expect(page.locator('.study-lede')).toContainText('Research');
});

test('an unknown post slug returns a 404', async ({ page }) => {
	const response = await page.goto('/blog/not-a-real-post');
	expect(response?.status()).toBe(404);
});

test('the document scrollbar matches the design palette', async ({ page }) => {
	await page.goto('/');

	const scrollbarColor = await page.evaluate(
		() => getComputedStyle(document.documentElement).scrollbarColor
	);
	expect(scrollbarColor).toBe('rgb(17, 17, 17) rgb(244, 244, 241)');
});
