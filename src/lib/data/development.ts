export type DevelopmentSection = {
	heading: string;
	body?: string;
	items?: string[];
};

export type DevelopmentProject = {
	id: number;
	slug: string;
	name: string;
	summary: string;
	/** Public GitHub repository URL */
	repoUrl: string;
	documentation: DevelopmentSection[];
};

export const developmentProjects: DevelopmentProject[] = [
	{
		id: 1,
		slug: 'data-helper-application',
		name: 'Data Helper Application',
		summary:
			'Cross-platform desktop database workbench — connect six database engines, run queries, explore schemas, and manage Docker-backed instances from one Tauri app.',
		repoUrl: 'https://github.com/zarnihlawn/database-helper-application',
		documentation: [
			{
				heading: 'Overview',
				body: 'Data Helper Application is a SvelteKit + Tauri desktop client for day-to-day database work. Instead of juggling separate GUIs per engine, you keep connections, query files, schema diagrams, and Docker lifecycle controls in one workspace. Local app state lives in SQLite via Drizzle; real database traffic goes through Rust connection modules on the Tauri side.'
			},
			{
				heading: 'Supported databases',
				body: 'Native connection modules cover six engines used across student and professional projects:',
				items: [
					'PostgreSQL',
					'MySQL',
					'MariaDB',
					'Microsoft SQL Server',
					'MongoDB',
					'SQLite'
				]
			},
			{
				heading: 'Workspace',
				body: 'The coding workspace pairs a file tree of saved query collections with Monaco-based query blocks. You can connect or remove datasources, share connection details when collaborating, and open SQL or NoSQL ER diagrams rendered with D3 to inspect relationships visually before changing schemas.'
			},
			{
				heading: 'Docker dashboard',
				body: 'When databases run in containers, the Docker dashboard lists images and containers, supports pull/build flows, start/stop/restart, and opens a system terminal for container shells — useful for spinning up local Postgres or MySQL without leaving the app.'
			},
			{
				heading: 'In-app documentation',
				body: 'Welcome, feature, user manual, maintenance, about, and release-note panels ship inside the app so operators can learn workflows without a separate docs site.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit (static adapter) + Svelte 5 UI',
					'Tauri 2 (Rust) for OS integration and DB drivers',
					'Drizzle ORM + libSQL for local app data',
					'Monaco Editor for query editing',
					'xterm for embedded terminals',
					'daisyUI + Tailwind CSS',
					'Optional LangChain / OpenAI hooks for assisted workflows',
					'Desktop updater endpoints for release builds across supported platforms'
				]
			}
		]
	},
	{
		id: 2,
		slug: 'agent-workbench',
		name: 'Agent Workbench',
		summary:
			'Cross-platform Tauri desktop shell for AI-assisted engineering — project library, multi-session terminals, Cursor agent integration, git wizard, and OS keyring secrets.',
		repoUrl: 'https://github.com/zarnihlawn/agent-workbench',
		documentation: [
			{
				heading: 'Overview',
				body: 'Agent Workbench is a SvelteKit + Tauri desktop app that treats coding agents as first-class workspace tools. You manage a library of local projects, open each in a dedicated window with terminals, filesystem tree, Cursor resources, voice dictation, tmux controls, and a git push wizard that can draft commit messages from the selected agent.'
			},
			{
				heading: 'Project library',
				body: 'The home screen is a filterable, sortable project table (name, tags, running status, created/updated ranges) with create/edit/delete flows and toasts. Open a project in the current window or spawn another — useful when several agent sessions need to stay visible at once.'
			},
			{
				heading: 'Project workspace',
				items: [
					'Resizable left sidebar: project sessions and agent picker (Cursor today; more agents deferred)',
					'Center: xterm sessions via tauri-pty, with per-project session persistence',
					'Right sidebar: filesystem explorer and Cursor resource library (rules, skills, MCP-related paths)',
					'Git wizard: stage/commit/push flow with agent-assisted commit messages',
					'tmux install/status helpers and voice dictation into the active terminal'
				]
			},
			{
				heading: 'Integrations & security',
				body: 'Settings wire GitHub (CLI login or personal access token) and Cursor (browser login / Agent CLI install or API key). Credentials prefer the OS keyring rather than plaintext config files. Auto-updater ships installers for Linux (AppImage/deb), macOS (dmg), and Windows (NSIS/MSI).'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit next + Svelte 5 (SPA / adapter-static for Tauri webview)',
					'Tauri 2 with shell, process, and updater plugins',
					'Paraglide i18n (en, my, ja, ko, ch, es)',
					'daisyUI 5 + Tailwind CSS 4',
					'xterm.js, GSAP, Simple Icons, Lucide'
				]
			}
		]
	},
	{
		id: 3,
		slug: 'drive',
		name: 'Drive',
		summary:
			'Personal Storage-as-a-Service — files and folders, team drives, sharing, trash, public links, and pluggable Local / Tigris backends with a full REST API.',
		repoUrl: 'https://github.com/zarnihlawn/drive.zarnihlawn.com',
		documentation: [
			{
				heading: 'Overview',
				body: 'Drive (ZNL-DRIVE) is a SvelteKit file workspace that feels like a familiar cloud drive while staying under your control. Metadata — hierarchy, labels, pin/star, trash, shares, and storage provider — lives in Postgres via Drizzle. Bytes live on either the server filesystem (Local) or Tigris S3-compatible object storage. The same product exposes a browser UI, cookie sessions, and developer API keys for automation.'
			},
			{
				heading: 'Problem it solves',
				body: 'Most “drive” demos hard-code one bucket and skip team spaces, trash retention, or a public API. Drive treats storage as a product surface: switch providers without rewriting the UI, share with signed-in users or anonymous link tokens, and operate teams with their own storage target. Deployments run on Docker or Fly.io with Neon Postgres.'
			},
			{
				heading: 'Home library',
				body: 'Home is the primary library. Breadcrumbs track folder depth; row actions cover rename, color labels, pin, star, download, share, public link, and move to trash. The NEW menu creates folders, uploads files, and can create a team. There is no global top-bar search — navigation is intentional through Home, Shared, Teams, Recent, Trash, and Dashboard.'
			},
			{
				heading: 'Storage providers',
				body: 'A navbar selector chooses the active target for new uploads and folders. Existing rows keep the provider they were written with. Team drives lock to the team’s configured provider so members do not accidentally split a shared space across backends.',
				items: [
					'Local — server filesystem under a mounted data directory (ideal for LAN / single-node Docker)',
					'Tigris — S3-compatible object storage via the Tigris SDK',
					'Architecture leaves room for other S3-compatible backends (R2, MinIO, B2, etc.)'
				]
			},
			{
				heading: 'Upload & download',
				body: 'Small files upload as binary application/octet-stream; larger files use chunked upload sessions (≈8 MiB chunks) assembled on disk before finalize. MIME is inferred from filenames when the browser sends an empty type. Downloads stream a single file or a ZIP for folders. Upload/create actions are disabled in Shared and Trash with clear UI copy.'
			},
			{
				heading: 'Sharing & collaboration',
				items: [
					'User share — grant another account access; Shared view is read-oriented (browse/download, no upload into someone else’s tree)',
					'Team drives — shared spaces under Teams; create from NEW, invite members, list membership via /api/teams',
					'Public links — revocable random tokens; human share page at /{token} plus direct /api/public/files/{token} for raw bytes or folder ZIP; images preview inline, other types download',
					'Docs under /onboarding/docs never collide with share tokens (fixed path prefix)'
				]
			},
			{
				heading: 'Trash & retention',
				body: 'Items leave Home when trashed and appear in the Trash sidebar view for restore or permanent delete. A cron endpoint (Bearer CRON_SECRET) purges expired trash on a schedule so operators can enforce retention policy without manual cleanup.'
			},
			{
				heading: 'Auth & developer mode',
				body: 'Better Auth powers email/password plus optional GitHub and Google OAuth. Drive JSON/binary APIs accept a session cookie or a developer API key (Authorization / X-API-Key). Key CRUD and developer-mode toggles require a cookie session so keys cannot manage themselves. Settings expose profile, storage preferences, and logout.'
			},
			{
				heading: 'REST surface (highlights)',
				items: [
					'GET/POST /api/drive/files & folders — list, create, patch pin/star/name/color/trash',
					'POST /api/drive/upload (+ /chunk) — binary and chunked uploads',
					'GET …/download, …/public-link; POST/DELETE public-link and share',
					'GET /api/drive/shared, /trash, /stats',
					'GET/POST /api/teams — membership and team creation',
					'GET /api/public/share/{token} and /api/public/files/{token} — anonymous access',
					'Developer mode + API key CRUD under /api/developer/*'
				]
			},
			{
				heading: 'Architecture',
				body: 'Requests enter SvelteKit routes, resolve auth (cookie or API key), then hit small server handlers that query Postgres for metadata and open Local or Tigris blobs for bytes. Public link tokens are a separate table so anonymous traffic never needs a session. Onboarding docs are mdsvex routes with a drawer sidebar — prerender-safe because they do not read private data.'
			},
			{
				heading: 'Stack & ops',
				items: [
					'SvelteKit 2 + Svelte 5, Tailwind CSS 4, daisyUI 5 (prefixed d- classes)',
					'Postgres (Neon) + Drizzle ORM; Better Auth sessions',
					'Deno 2 task runner for install/dev/db scripts; Node for Vite build and production runtime',
					'Docker volume for Local data; BODY_SIZE_LIMIT per chunk; ORIGIN-sensitive CSRF/cookie Secure behavior',
					'Paraglide i18n; Playwright + unit tests; GPLv3'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Metadata in SQL, blobs in pluggable storage — so listing, trash, and shares stay fast regardless of backend',
					'Chunked uploads with on-disk assembly — large media without loading whole files into memory',
					'API keys as first-class auth — scripts and agents can use the same drive APIs as the UI',
					'Team storage affinity — one shared space maps to one provider, avoiding split-brain folders'
				]
			}
		]
	},
	{
		id: 4,
		slug: 'docs',
		name: 'Docs',
		summary:
			'Full-stack documentation CMS — Postgres-backed Markdown, hierarchical chapters, Cmd+K search, and a single-admin GitHub OAuth panel. CS50x final project.',
		repoUrl: 'https://github.com/zarnihlawn/docs.zarnihlawn.com',
		documentation: [
			{
				heading: 'Overview',
				body: 'Docs is a personal documentation platform: public readers get a searchable, categorized site with nested pages, breadcrumbs, previous/next navigation, and a table of contents; the author signs in with GitHub and manages everything from a browser admin. Content is Markdown stored in Neon Postgres — publish, unpublish, and reorder without git commits or redeploys. It was built as the CS50x final project and is the canonical full-stack reference app in the zarnihlawn.com monorepo.'
			},
			{
				heading: 'Why not static files?',
				body: 'Static generators are excellent for versioned engineering docs, but they couple every typo fix to a deploy. Docs keeps the authoring loop in the database: draft preview for the logged-in admin, 404 for anonymous visitors on unpublished pages, SQL ILIKE search across title and body, and drag-and-drop sort order on the dashboard. Hierarchy uses a self-referential parentDocumentId with a hard max depth of three so sidebars and breadcrumbs stay readable.'
			},
			{
				heading: 'Public experience',
				items: [
					'Landing (/) — hero, feature grid, tech stack, code preview, and category entry points; all editable via site_settings without shipping new code',
					'Docs index (/docs) — published list with ?q= server search',
					'Doc pages (/docs/[slug]) — marked + DOMPurify HTML, category sidebar tree, TOC (title + H1/H2), breadcrumbs, prev/next',
					'Search modal — Cmd+K / navbar trigger hitting /api/search with highlighted snippets',
					'Draft preview — admin sees unpublished pages with a banner; everyone else gets a hard 404'
				]
			},
			{
				heading: 'Admin CMS',
				body: 'Routes under /admin require a Better Auth session. The first GitHub sign-up becomes the sole admin; databaseHooks reject later registrations so the site stays single-author.',
				items: [
					'Dashboard — document stats and DocumentOrderPanel drag-and-drop reorder within category/parent groups',
					'Documents — list, create, and edit; CodeMirror Markdown editor with manual save only (no autosave)',
					'Categories — CRUD with sort order (seed defaults: getting-started, guides, reference, examples, changelog)',
					'Tags — many-to-many via document_tag',
					'Settings — branding, landing copy/JSON sections, default publish/theme, favicon upload, sign-out'
				]
			},
			{
				heading: 'Content model',
				body: 'Core tables use UUID primary keys (defaultRandom). Documents require a category, optional parent, excerpt, published flag, and timestamps. site_settings is a singleton row (id = default) holding hero CTAs, tech stack/features JSON, footer social links, and theme defaults (system / winter / night). Slugs auto-generate from titles when left blank and validate as kebab-case.'
			},
			{
				heading: 'Markdown pipeline',
				body: 'Server-side marked parses GFM; isomorphic-dompurify sanitizes before {@html}. Heading extraction feeds the right-rail TOC. Search highlight utilities wrap matching snippets for the modal and index results — unpublished content never leaks into anonymous search.'
			},
			{
				heading: 'Validation & safety',
				body: 'Every form action and API handler runs Zod 4 safeParse before touching the database. Invalid input returns fail(400) with field errors for the UI. Route params (slug, UUID) are validated the same way. Admin multi-field forms use AdminFormTable — a fixed four-column label/field grid — instead of ad-hoc CSS grids so settings and document forms stay aligned.'
			},
			{
				heading: 'Auth model',
				items: [
					'GitHub OAuth only — email/password disabled',
					'disableImplicitSignUp after bootstrap; login UI flips Sign up → Sign in when hasAdmin() is true',
					'hooks.server.ts wires Paraglide locale, Better Auth session, and idempotent DB seed',
					'Admin layout redirects to /login when locals.user is missing'
				]
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit 3 next + Svelte 5 (runes, remoteFunctions experiments in vite config)',
					'Neon Postgres + Drizzle ORM + drizzle-kit migrations',
					'Better Auth + Drizzle adapter + sveltekitCookies',
					'Zod 4, Tailwind CSS 4, daisyUI 5 (winter/night)',
					'CodeMirror 6, marked, isomorphic-dompurify',
					'Paraglide (English, Burmese, Japanese)',
					'Vitest + Playwright; adapter-node for deployment'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Database-backed Markdown — publish without redeploy; enables SQL search and draft preview',
					'Single-admin GitHub OAuth — personal docs do not need multi-tenant identity',
					'Depth-capped hierarchy — keeps navigation honest instead of infinite nesting',
					'Zod at every boundary — form data, query strings, and JSON bodies never reach Drizzle raw',
					'Manual save in the editor — authors choose when content becomes durable'
				]
			},
			{
				heading: 'What I learned',
				body: 'Building Docs forced end-to-end ownership of HTTP, auth, SQL, validation, and UX in one TypeScript codebase. Patterns from this app — AdminFormTable, page-title helpers, closed registration, service-layer tree helpers — became the template for other SvelteKit products in the monorepo.'
			}
		]
	}
];

export function getDevelopmentProjectBySlug(slug: string): DevelopmentProject | undefined {
	return developmentProjects.find((project) => project.slug === slug);
}

export function developmentDetailPath(slug: string): string {
	return `/development/${slug}`;
}
