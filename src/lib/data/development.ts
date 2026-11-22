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
	/** Public GitHub repository URL, absent when the repo is private */
	repoUrl?: string;
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
				items: ['PostgreSQL', 'MySQL', 'MariaDB', 'Microsoft SQL Server', 'MongoDB', 'SQLite']
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
	},
	{
		id: 5,
		slug: 'medora',
		name: 'Medora',
		summary:
			'Multi-hospital EMR console: registration, ADT, EMR and eMAR, CPOE, inpatient, emergency and obstetric care, diagnostics LIS, inventory, billing, and master data in one role-scoped workspace.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Medora is a hospital operations console built for more than one hospital at a time. Staff move from registration through visits, clinical work, orders, inventory, and billing without leaving the app, and every screen resolves against the hospital and role the signed-in user belongs to. Print output — bills, prescriptions, discharge paperwork — is produced from a master document template catalog provisioned per hospital.'
			},
			{
				heading: 'Care modules',
				body: 'The console is organised by care setting rather than by table, so each team sees the workflow it actually runs:',
				items: [
					'Registration — patients, staff accounts, and hospital onboarding',
					'ADT and visits — admission, transfer, discharge, and ward/bed assignment',
					'Clinical — EMR notes, clinical forms, observations, triage, and consultation',
					'Medication — CPOE order entry, order sets, medication orders, and eMAR administration',
					'Inpatient, emergency, obstetric, and perioperative settings with their own ward and room masters',
					'Diagnostics — LIS catalog, accession, worklists, results, and critical callbacks',
					'Inventory, billing, and pricing configuration down to visit line items'
				]
			},
			{
				heading: 'Access & safety',
				body: 'Sessions come from Better Auth 1.7 with Argon2 password hashing and TOTP two-factor setup. Server helpers resolve the active hospital before any query runs, permission guards gate each module, and visit-scoped clinical locks stop two people editing the same encounter into a conflict.',
				items: [
					'Role and permission checks enforced in the server layer, not the UI',
					'Patient and staff registration write credential accounts keyed on the user id',
					'Clinical visit locking and blocked-visit rules prevent overlapping edits',
					'Money and date-of-birth helpers normalise input at the boundary'
				]
			},
			{
				heading: 'Documents & diagnostics',
				body: 'Print templates live in code as a catalog that is seeded and provisioned onto each hospital, then resolved at print time by document type. The diagnostics side carries its own accession and worklist model with critical-result callbacks, so a lab result can be traced from order to printout.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit 2 + Svelte 5 (runes), TypeScript',
					'Neon Postgres + Drizzle ORM with 90 checked-in migrations',
					'Better Auth 1.7, Argon2, TOTP two-factor',
					'Menzies Design Wash UI on daisyUI 5 + Tailwind CSS 4',
					'Paraglide i18n (English, Japanese, Burmese)',
					'Netlify adapter; Playwright and Vitest for the gates'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Tenant scope resolved server-side once per request, so no handler can forget the hospital filter',
					'Templates as code, not a catalog table — provision writes the rows a hospital actually prints',
					'Care-setting modules instead of one generic CRUD surface, so ward and emergency staff see their own workflow',
					'Clinical locks over optimistic UI for records where two concurrent edits would be unsafe'
				]
			}
		]
	},
	{
		id: 6,
		slug: 'nextup-web-menzies',
		name: 'NextUp',
		summary:
			'Multi-tenant queue management SaaS: kiosks, TV displays with voice announce, agent desks, and a business console for sites, counters, services, and queues.',
		documentation: [
			{
				heading: 'Overview',
				body: 'NextUp models a real waiting room. A guest takes a number at a kiosk or by scanning a QR code, an agent calls that ticket from a desk, and a TV announces who is next — all inside one multi-tenant SaaS where each business only ever sees its own sites, counters, and staff. A marketing site and a platform admin layer sit above the tenant consoles.'
			},
			{
				heading: 'Floor surfaces',
				items: [
					'Kiosk (/kiosk/{code}) — guest takes a number for a service and queue',
					'Display (/display/{code}) — now-serving board with multi-locale voice announce',
					'Agent desk — call, serve, and complete tickets from a counter',
					'Guest ticket (/t/{token}) — public status link a walk-in can reopen on a phone'
				]
			},
			{
				heading: 'Roles',
				body: 'Membership drives navigation. A platform admin can open any business; owners and managers run setup and operations; counter agents get only Home and the agent desk; guests get a narrow read-only area. Managers and owners share one guard so setup CRUD cannot drift between the two roles.',
				items: [
					'platform_admin — tenants, industry templates, invites, platform config',
					'business_owner and manager — full console for that business',
					'counter_agent — station login scoped to a desk',
					'guest — home and guest area only, usually bypassed entirely via kiosk'
				]
			},
			{
				heading: 'Business console',
				body: 'Setup covers sites, departments, destinations, timelines, counters, services, and queues; operations covers tickets and appointments; devices covers TVs, kiosks, and agent stations. Home renders KPI and volume, status, queue, service, wait, and source charts on top of the same records.'
			},
			{
				heading: 'Messaging & devices',
				body: 'Messaging channels (SMS, Telegram, Viber, Discord, email) and multi-locale voice announce templates are configured per business. Twilio SMS and SMTP invites are optional adapters: when credentials are unset they fall back to console output, so a local floor test runs without any vendor account.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit 3 (next) + Svelte 5 runes, TypeScript',
					'Neon Postgres + Drizzle ORM and drizzle-kit migrations',
					'Better Auth email/password with a schema generated by the auth CLI',
					'Menzies Design Wash UI, daisyUI 5, Tailwind CSS 4, Lucide icons',
					'ApexCharts dashboards via a local WashChart wrapper',
					'Paraglide i18n (English, Burmese, Japanese)',
					'Netlify adapter, Netlify Blobs and S3 for org images'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Membership is the only authorization source — no route infers rights from the tenant id in the URL',
					'Vendor integrations degrade to console adapters instead of breaking a dev environment',
					'App shells are noindex; only the marketing and pricing pages are indexable',
					'Public guest access uses opaque ticket tokens so no session is needed at the kiosk'
				]
			}
		]
	},
	{
		id: 7,
		slug: 'design-lib-menzies',
		name: 'Menzies Design Wash UI',
		summary:
			'Watercolor design system monorepo — a publishable UI package with pigment themes, charts, editors, and email builders, plus a 115-page gallery and a Flutter port.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Menzies Design Wash UI is the design system behind the Menzies products. It ships as a public npm package with a framework-free core (pigment themes, wash atmosphere, ripple, tooltips, recipes), an optional React adapter, CSS utilities, and a private gallery app that doubles as documentation. Medora and NextUp both consume it, so a token change reaches every product at once.'
			},
			{
				heading: 'Entrypoints',
				body: 'The package is split so an app pays only for what it imports:',
				items: [
					'styles.css — tokens, pigments, and utilities (required)',
					'core — themes, ripple, tooltips, recipes, initWash, no framework',
					'react — components, provider, and hooks',
					'theme, icons, icons/brands — theme helpers plus Lucide and brand marks',
					'charts — pigment-aware ApexCharts components with Apex bundled',
					'editors — optional rich text and code editors, kept off the default barrel',
					'email — transactional builders such as OTP verification'
				]
			},
			{
				heading: 'Gallery',
				body: 'The demo app is the specification: 115 component pages sorted A to Z, 31 ApexCharts categories behind an overview hub, and 11 full-page templates across auth, commerce, data, studio, and layout groups. Every page renders a live preview next to HTML, JSX, and Svelte snippets with imports included, so a consumer copies working code rather than reading prose.'
			},
			{
				heading: 'Flutter parity',
				body: 'A second package and gallery app reimplement the same system for Flutter. Dart tooling generates the token, atmosphere, style spec, icon, gallery manifest, docs, and page sources from the shared inputs, so the Flutter surface is regenerated rather than hand-maintained.'
			},
			{
				heading: 'Stack',
				items: [
					'TypeScript library build with Vite, published to npm and mirrored to GitHub Packages',
					'React adapter; framework-free core usable from Svelte or plain DOM',
					'CSS custom properties for pigments and wash atmosphere',
					'ApexCharts, Lucide, and Simple Icons bundled behind entrypoints',
					'Flutter package with generated parity sources',
					'Vitest for the library; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Tokens are the single source of truth across CSS, React, and Flutter, so no surface can drift',
					'Wash styles import inside @layer components, letting host app utilities keep cascade priority',
					'Heavy editors and charts stay off the main barrel to keep the default import small',
					'The gallery is generated documentation, so a component cannot ship without a working example'
				]
			}
		]
	},
	{
		id: 8,
		slug: 'axion',
		name: 'AXION',
		summary:
			'Adaptive cross-feature Interaction Observation Network — anomaly detection on all 57 ADBench tabular datasets, benchmarked against the AnoDDAE paper.',
		repoUrl: 'https://github.com/zarnihlawn/itm-adbench-axion',
		documentation: [
			{
				heading: 'Overview',
				body: 'AXION is the research branch that follows AdaDDAE. Instead of reconstructing whole rows, it learns how features observe each other and scores a row by how badly those cross-feature relationships break. Evaluation runs across all 57 ADBench tabular datasets, against the published AnoDDAE baseline (arXiv 2508.00758). This repository is AXION only — run logs, embeddings, and the older AdaDDAE trees are deliberately excluded.'
			},
			{
				heading: 'Published results',
				body: 'Mean PR / ROC over ADBench-57 at seed 111, averaged across variants:',
				items: [
					'Semi-supervised — 68.16 PR / 89.38 ROC, against the paper’s 61.36 / 83.17 (+6.80 / +6.21)',
					'Unsupervised — 46.68 PR / 84.52 ROC, against the paper’s 32.77 / 74.08 (+13.91 / +10.44)',
					'Claim margins (paper + 3 on all four metrics) pass; unsupervised ROC 88 is still open and stated as aspirational'
				]
			},
			{
				heading: 'Reproducibility',
				body: 'The 57-recipe map is frozen in thesis/recipe_map_57_beat.json and must not be re-selected, so a rerun measures the model rather than a fresh search. A live replay covers seeds 111–555 under the same frozen map, and the seed-111 snapshot is checked in beside it for comparison at 68.05 / 89.37 and 46.79 / 84.54.',
				items: [
					'results/axion_beat_paper_dual_lift/ — canonical claim and status gate',
					'results/axion_beat_paper_dual_lift_gpu/ — live replay, seeds 111–555',
					'configs/gpu_beat_paper.yaml and gpu_beat_paper_3090.yaml — the only allowed configs',
					'Rare-class locks (cover, fraud, backdoor) restricted to the axion_edge_rare path'
				]
			},
			{
				heading: 'Stack',
				items: [
					'Python 3.10+ with PyTorch training code under src/axion',
					'ADBench datasets vendored locally, never committed',
					'CUDA; RTX 3090 profile documented as a self-contained ceiling run',
					'YAML experiment configs with seed scripts and macro comparison tooling'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'A frozen recipe map — a benchmark you can re-search is not a benchmark',
					'Claim gates encoded as JSON, so a regression fails the run rather than being noticed later',
					'Only the current claim ships in the repo; older trees move out instead of accumulating',
					'Honest reporting of the one metric that has not been reached'
				]
			}
		]
	},
	{
		id: 9,
		slug: 'escape-from-kidnappers',
		name: 'Escape from Kidnappers in Abandoned House',
		summary:
			'Unity VR escape room — you wake as a captive in an abandoned building and must find the tools, power, and way out. Lead software developer for Team CoreX.',
		repoUrl: 'https://github.com/zarnihlawn/escape-from-kidnappers-in-abandoned-house',
		documentation: [
			{
				heading: 'Overview',
				body: 'A room-scale VR escape experience built as a university group assignment with Team CoreX. The player starts restrained in a derelict house with no inventory and no map. Progress comes from searching rooms for tools, restoring power to open the way out, and reading the environment for clues rather than following waypoints.'
			},
			{
				heading: 'Role',
				body: 'Lead software developer across the core gameplay systems, coordinating with the UX/UI, project management, and QA members of the team.',
				items: [
					'VR interaction layer — grab, hold, and release props with room-scale tracking',
					'Tool use: flashlight, keypad entry, and fuse/power puzzles that gate progression',
					'Radio and environmental audio cues used as puzzle feedback',
					'Integration of the puzzle props into complete, finishable escape routes'
				]
			},
			{
				heading: 'Design constraints',
				body: 'VR interaction has no reliable keyboard fallback, so every affordance has to be legible from the player’s hands. Props that can be picked up are visually distinct from scenery, puzzle state is fed back through light and sound rather than HUD text, and the route is tested standing with controllers rather than on a desktop build.'
			},
			{
				heading: 'Stack',
				items: [
					'Unity 2022.3 LTS',
					'C# gameplay scripting',
					'VR interaction and scene scripting for room-scale play',
					'Team workflow across UX/UI, project management, and QA'
				]
			}
		]
	},
	{
		id: 10,
		slug: 'ambulance-location-tracker',
		name: 'Ambulance Location Tracker',
		summary:
			'Ambulance fleet tracking on a microservices backend — real-time device location, task dispatch, route options, a SvelteKit dashboard, and a Kotlin Android driver app.',
		repoUrl: 'https://github.com/zarnihlawn/ambulance-location-tracker',
		documentation: [
			{
				heading: 'Overview',
				body: 'A dispatch system for ambulance fleets. Android devices in the vehicles report their position; a web dashboard lets an organisation manage its workspaces and devices, assign text and location tasks to drivers, and watch routes with alternative paths on a map. Access is scoped by organisation and workspace so one fleet never sees another.'
			},
			{
				heading: 'Architecture',
				body: 'The backend is split into an API gateway plus account, organization, workspace, and feature services, with the location-tracker app composed of device, tracking, and notifier features. Splitting device registration from location ingestion from notification keeps the write-heavy tracking path independent of the CRUD services.',
				items: [
					'Gateway — routes requests to the owning service',
					'Account, organization, workspace, feature services — identity and tenancy CRUD',
					'Location tracker device — registration and pairing by secret key',
					'Location tracker tracking — position ingestion and retrieval',
					'Location tracker notifier — text and location tasks to drivers'
				]
			},
			{
				heading: 'Clients',
				body: 'The web dashboard runs on SvelteKit with Tailwind and daisyUI. The driver app is native Android in Kotlin with Jetpack Compose, taking location from Google Play Services and drawing routes with the Google Maps SDK over Retrofit and OkHttp.'
			},
			{
				heading: 'Stack',
				items: [
					'Bun runtime with Hono for the services',
					'PostgreSQL with Drizzle ORM, Zod validation at every boundary',
					'SvelteKit, TypeScript, Tailwind CSS, daisyUI for the dashboard',
					'Kotlin, Jetpack Compose, Retrofit, OkHttp for Android',
					'Google Maps SDK and Play Services Location'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Services split by write profile, so high-frequency location writes do not contend with admin CRUD',
					'Device pairing by rotated secret key instead of storing driver credentials on the handset',
					'One feature catalogue shared by web and Android, so both clients agree on what a device is allowed to do',
					'Separate tracking and notifier features, so an outage in one does not stall the other'
				]
			}
		]
	},
	{
		id: 11,
		slug: 'parkinsons-prediction',
		name: 'Parkinson’s Disease Prediction',
		summary:
			'Notebook study fusing six Parkinson’s datasets — voice, EEG, clinical UPDRS, and audio — to compare tree, kernel, neural, and ensemble classifiers.',
		repoUrl: 'https://github.com/zarnihlawn/parkinson-disease-prediction-model',
		documentation: [
			{
				heading: 'Overview',
				body: 'A single notebook that pulls together every dataset available to it — MDVP voice measurements, 300-plus EEG features, UPDRS clinical progression records, and MFCC/chroma/spectral-contrast audio features extracted with librosa — into one unified table, then trains and compares seven model families on it. Handwritten-image and X-ray archives are described but not used.'
			},
			{
				heading: 'What it actually shows',
				body: 'The project targets an accuracy of 1.0 and reaches it. That is the finding worth reporting rather than a triumph: perfect accuracy on a small, feature-engineered, multi-source table almost certainly means the model has memorised rather than generalised. The README says as much, and this write-up keeps that framing. Reading it as a demonstration of leakage and overfitting is more useful than reading it as a diagnostic result.'
			},
			{
				heading: 'Models compared',
				items: [
					'Random Forest — 1000+ trees, unbounded depth',
					'XGBoost — gradient boosting with aggressive parameters',
					'Support Vector Machine — RBF kernel with a high C value',
					'PyTorch network — 256-128-64-32 layers',
					'TensorFlow/Keras network — multi-layer dense stack',
					'Voting and Stacking ensembles over the above'
				]
			},
			{
				heading: 'Stack',
				items: [
					'Python with Jupyter Notebook',
					'numpy, pandas, scikit-learn',
					'XGBoost, PyTorch, TensorFlow/Keras',
					'librosa for audio feature extraction; openpyxl for Excel sources',
					'matplotlib and seaborn for the comparison plots'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'One merged table across all six sources, so every model sees the same features',
					'Polynomial and interaction terms added deliberately, which is itself part of why the result saturates',
					'Ensembles included to show that the ceiling is the data, not the estimator',
					'Leakage and overfitting stated plainly in the README instead of being left for a reader to notice'
				]
			}
		]
	},
	{
		id: 12,
		slug: 'dora',
		name: 'Dora',
		summary:
			'Controlled-browsing SaaS — an admin allowlists which sites a device may open, with optional proxy, and devices request access until approved.',
		documentation: [
			{
				heading: 'Overview',
				body: 'Dora answers a narrow question: which websites should this device be allowed to open? An administrator runs an organisation on the server, picks the allowed sites and an optional proxy, and each desktop client connects with the organisation name and secret. Anything outside the allowed set never loads. It is internal hospital software, so the repository is private and there is no public link.'
			},
			{
				heading: 'Two halves',
				body: 'The product splits into a desktop client and an admin server. The desktop embeds a browser whose navigation is constrained by whatever the server last granted; the server owns organisations, allowed sites, proxy settings, and the device approval queue.',
				items: [
					'dora-desktop — SvelteKit + Tauri client with the embedded browser',
					'dora-server — SvelteKit admin for organisations, devices, sites, and access control'
				]
			},
			{
				heading: 'Pairing & approval',
				body: 'A device is not trusted because it holds a password — it is trusted because an administrator accepted it. The client submits the organisation name and its current secret over the socket, the request surfaces in the admin dashboard, and an administrator approves or rejects it while naming the device. A rotating secret works like an authenticator code: only the latest value is valid, so a leaked secret expires on its own.'
			},
			{
				heading: 'Once approved',
				body: 'The server hands the device its configuration, and only then does the client enter its home screen. Connection details persist in device key storage, so the next launch reconnects without repeating the handshake. Proxy host and port, when set, are applied to the embedded browser, and the address bar is reduced to the approved sites.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit with Tauri for the desktop client',
					'SvelteKit server for the admin dashboard and API',
					'Zod schemas casting every payload in both directions',
					'daisyUI components with Lucide and Simple Icons',
					'WebSocket plus HTTP for device requests and approval',
					'Drizzle with a table naming scheme split by auth, master, main, and enum groups'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Approval is per device, not per user — the threat is an unmanaged machine, not an unauthenticated person',
					'A rotating organisation secret rather than a static key, so exposure is time-limited',
					'Master tables are seed-only, which keeps the allowed-site catalogue auditable',
					'Deletes require retyping the target name, because removing a site or device is not undoable'
				]
			}
		]
	},
	{
		id: 13,
		slug: 'menzies-gallery',
		name: 'Menzies Gallery',
		summary:
			'Linux-first image gallery — opens Pictures by default, browses subfolders as a grid, and offers a lightbox, local edits, and manual ordering.',
		repoUrl: 'https://github.com/menzies-mariesta-com/gallery-desktop-menzies',
		documentation: [
			{
				heading: 'Overview',
				body: 'A desktop image browser for the Menzies suite. It opens the Pictures folder on launch, treats each subfolder as a browsable collection in a thumbnail grid, and opens any image into a full-screen lightbox. Everything it does to a file happens locally on disk — no cloud library, no upload step.'
			},
			{
				heading: 'Capabilities',
				items: [
					'Grid browse of the Pictures tree, with subfolders as collections',
					'Lightbox viewer for full-size images',
					'Local raster edits applied to the file on disk',
					'Copy, rename, and manual reordering of a collection',
					'Face recognition as an optional local extension, off by default'
				]
			},
			{
				heading: 'Extension policy',
				body: 'Face recognition is deliberately not on by default and not shipped as a dependency. Turning it on is an explicit opt-in that also installs the model package yourself, and the signed extension catalogue hosted with the Menzies site does not list it yet. This keeps a photo browser from quietly becoming a biometrics tool.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit with the static adapter',
					'Tauri 2 for filesystem access and packaging',
					'Wash UI on daisyUI and Tailwind CSS',
					'Paraglide i18n; Zod at the command boundary',
					'Per-product minisign key for the Tauri updater; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Folder structure is the library — no database, no import step, no proprietary catalogue',
					'Edits write through to the original file rather than shadow copies',
					'Sensitive analysis is opt-in and separately installed',
					'Each suite app signs its own updater releases, so one key compromise cannot push code to another app'
				]
			}
		]
	},
	{
		id: 14,
		slug: 'menzies-database-manager',
		name: 'Menzies Database Manager',
		summary:
			'Linux-first desktop database IDE for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, and MongoDB — consoles, explain plans, ER diagrams, and schema compare.',
		repoUrl: 'https://github.com/menzies-mariesta-com/dbms-desktop-menzies',
		documentation: [
			{
				heading: 'Overview',
				body: 'A focused query IDE for six engines, where the job is to write a statement, read the plan, and get out. Connections are grouped with environment colours so production is never mistaken for a sandbox, passwords live in the OS keyring rather than a config file, and connection packs are encrypted. Unlike the Data Helper Application in this showcase, which also manages Docker containers, this product deliberately omits container lifecycle management and any AI assistant.'
			},
			{
				heading: 'Capabilities',
				items: [
					'Multi-engine connections with groups and environment colours',
					'OS keyring password storage and encrypted connection packs',
					'Schema and collection navigator across relational and document engines',
					'Query consoles with explain plans and query history',
					'Editable data grid that stages changes as pending DML for review before commit',
					'ER diagrams and schema compare',
					'Import and export; titlebar menus for File, Connection, Query, Database, View, Tools, and Help'
				]
			},
			{
				heading: 'Why pending DML',
				body: 'A grid that writes on every keystroke makes a destructive change look like a typo fix. Edits accumulate as reviewable statements instead, so an UPDATE against the wrong row is visible in a list before it runs rather than discovered afterwards.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit with the static adapter, Svelte 5',
					'Tauri 2 with native drivers for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, and MongoDB',
					'Wash UI on daisyUI and Tailwind CSS',
					'Paraglide i18n; Zod schemas at the IPC boundary',
					'Rust formatting and check gates plus Vitest for the UI; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Reviewable DML over instant writes, because the grid is the most dangerous surface in the app',
					'Secrets in the OS keyring, never in the project file',
					'Environment colours on connections, since connection mix-ups are the costliest mistake in a multi-engine tool',
					'No Docker and no assistant — features that exist in the sister product are left out on purpose'
				]
			}
		]
	},
	{
		id: 15,
		slug: 'menzies-portal',
		name: 'Menzies Portal',
		summary:
			'Dual-mode VPN client — OpenVPN and GlobalProtect tunnels running at once from bundled binaries, with a kill switch and an always-on tray.',
		repoUrl: 'https://github.com/menzies-mariesta-com/portal-desktop-menzies',
		documentation: [
			{
				heading: 'Overview',
				body: 'Most VPN clients make you pick a protocol. Portal runs OpenVPN and GlobalProtect side by side, which matters when one network wants a corporate gateway and another wants a different vendor’s. Both tunnels can be up simultaneously, each with its own titlebar status, and connections queue serially so two elevation prompts never collide.'
			},
			{
				heading: 'Protocols',
				items: [
					'OpenVPN — import a single .ovpn or a folder of profiles; username/password, key passphrase, and management MFA',
					'GlobalProtect — portal profiles with password, browser or embedded-webview SSO, client certificates, HIP, gateway modes, cookie cache, and advanced OpenConnect flags'
				]
			},
			{
				heading: 'Network safety',
				body: 'A Linux kill switch maintains a shared nftables allowlist for tun interfaces, so traffic is blocked at the firewall rather than by an application-level guess. Credentials are held in the OS keyring or session memory only. The tray is always present: closing the window hides it, while Quit disconnects both tunnels before exiting, so a closed window never means a silently live tunnel.'
			},
			{
				heading: 'Bundled binaries',
				body: 'OpenVPN and the GlobalProtect CLI ship inside the application. Nothing is installed onto the user’s system at runtime, which keeps the app usable on a locked-down machine and makes the shipped version the version that runs. Development builds can point at local binaries through environment overrides.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit static SPA with Svelte 5',
					'Tauri 2 with bundled OpenVPN and gpclient/gpauth',
					'polkit elevation for connecting on Linux',
					'nftables-based kill switch',
					'Wash UI chrome; OS keyring credential storage',
					'Best-effort Windows and macOS elevation paths; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'Protocols are peers, not a mode switch — people need both at once more often than client UIs assume',
					'A firewall kill switch instead of a DNS or route trick, because fail-closed has to hold when the app is not running',
					'Bundled binaries over system packages, so behaviour does not depend on the host',
					'Serial connection queueing to avoid competing privilege prompts',
					'Quit disconnects first, so no exit path leaves a tunnel up'
				]
			}
		]
	},
	{
		id: 16,
		slug: 'menzies-notepad',
		name: 'Menzies Notepad',
		summary:
			'Linux-first plain-text editor — tabs, find and replace, word wrap, autosave after the first save, and drafts that survive a close.',
		repoUrl: 'https://github.com/menzies-mariesta-com/notepad-desktop-menzies',
		documentation: [
			{
				heading: 'Overview',
				body: 'A plain UTF-8 text editor that does not try to become an IDE. Text files open in tabs, find and replace works across the document, and word wrap is a toggle rather than a preference buried in a menu. It reads and writes bytes as UTF-8 and holds no document model beyond the text.'
			},
			{
				heading: 'Capabilities',
				items: [
					'Tabs across multiple open files',
					'Find and replace',
					'Word wrap toggle',
					'Autosave to disk after the first explicit save',
					'Draft persistence for untitled tabs, so an unsaved note survives a close'
				]
			},
			{
				heading: 'Saving behaviour',
				body: 'The first save is a deliberate act — the editor does not invent a path or a filename. Every save after that writes through automatically, which is the useful half of autosave without the intrusive half. Untitled work is kept as a draft rather than silently dropped when the window closes.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit with the static adapter',
					'Tauri 2 for file access and packaging',
					'Wash UI on daisyUI and Tailwind CSS',
					'Paraglide i18n; Zod at the boundary',
					'Notepad-specific minisign key for updater releases; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'No rich text, no project model, no plugins — the file is the document',
					'Autosave only after a path exists, so it can never overwrite something unexpected',
					'Drafts for untitled tabs instead of a discard prompt',
					'A per-app updater key, so signing authority is not shared across the suite'
				]
			}
		]
	},
	{
		id: 17,
		slug: 'menzies-calculator',
		name: 'Menzies Calculator',
		summary:
			'Desktop calculator and unit converter — standard and scientific pads, history, undo, and update checks against GitHub Releases.',
		repoUrl: 'https://github.com/menzies-mariesta-com/calculator-desktop-menzies',
		documentation: [
			{
				heading: 'Overview',
				body: 'A calculator and unit converter in one window, with the mode as tabs at the top rather than two separate apps. The numeric pad has a standard and a scientific layout; history sits in a left column and doubles as input, because a calculation you already ran is usually the operand you want next.'
			},
			{
				heading: 'Capabilities',
				items: [
					'Standard pad, plus scientific with trig, log, ln, sqrt, powers, parentheses, pi, e, and DEG/RAD toggle',
					'Unit conversion mode',
					'History list where clicking an entry loads its result',
					'Undo for the last edit or evaluation',
					'Update check against GitHub Releases from the titlebar, with explicit confirmation before install'
				]
			},
			{
				heading: 'Interface notes',
				body: 'Titles set in the design system display face with results in a monospace face, so digits stay columnar as they change. The default pigment is vermilion. The application identifier is com.mariesta.menzies.calculator-desktop-menzies, and an updater key unique to this app signs its releases.'
			},
			{
				heading: 'Stack',
				items: [
					'SvelteKit static SPA, Svelte 5',
					'Tauri 2 with the updater plugin',
					'Wash UI on daisyUI and Tailwind CSS',
					'Paraglide i18n; Zod validation',
					'Node 22+ and Rust 1.77.2+ for builds; GPL-3.0-or-later'
				]
			},
			{
				heading: 'Design decisions',
				items: [
					'One app with tabs instead of separate calculator and converter programs',
					'History is interactive, not a log — it feeds the next calculation',
					'Undo covers the last evaluation, because a mistyped equals is the common mistake',
					'Updates are confirmed, never silent, even for a calculator'
				]
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
