export type AcademicStatus = 'completed' | 'in-progress';

export type AcademicSection = {
	heading: string;
	body?: string;
	items?: string[];
};

export type AcademicProject = {
	name: string;
	summary: string;
	repoUrl: string;
	role?: string;
	documentation: AcademicSection[];
};

export type AcademicRecord = {
	id: number;
	/** Present when the program has a detail page */
	slug?: string;
	institution: string;
	program: string;
	period: string;
	status: AcademicStatus;
	location?: string;
	/** Intro under the Applications kicker on the detail page */
	applicationsIntro?: string;
	overview?: AcademicSection[];
	projects?: AcademicProject[];
};

export const academicHistory: AcademicRecord[] = [
	{
		id: 1,
		slug: 'msc-computer-science',
		institution: 'University of Wolverhampton',
		program: 'MSc Computer Science',
		period: 'October 2025 – Present',
		status: 'in-progress',
		applicationsIntro:
			'Five systems built for modules and research during the MSc. Titles open the public repository.',
		overview: [
			{
				heading: 'Program',
				body: 'MSc Computer Science at the University of Wolverhampton — a BCS-accredited postgraduate degree that builds specialised, applied expertise for industry and research. The curriculum emphasises practical experience alongside theory taught by active researchers, across full-time (typically 12 months) or part-time routes.'
			},
			{
				heading: 'Focus areas',
				items: [
					'Advanced Artificial Intelligence and Machine Learning',
					'Data Science and Data Mining',
					'Immersive Application Development (VR, AR, and mixed reality)',
					'Mobile Application Development',
					'Web Technologies',
					'Research Methods in Computing',
					'ITM and Computer Science Dissertation'
				]
			}
		],
		projects: [
			{
				name: 'Portfolio Journal',
				summary:
					'Offline-first Flutter journal for the Mobile Application Development portfolio.',
				repoUrl: 'https://github.com/zarnihlawn/portfolio-journal',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'Portfolio Journal is an Android-oriented Flutter client built for the 7CC012 Mobile Application Development brief. It keeps a personal journal fully usable offline: notes live in SQLite on the device, images are copied into app documents, and sharing goes through the system share sheet rather than a custom social backend.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Create, edit, view, and delete notes (optional title, required body)',
							'Home feed of messages with detail screens and search',
							'Swipe-to-delete and long-press multi-select for batch deletion',
							'Attach photos from gallery or camera; persist under app storage',
							'Share text and optional image via Android ACTION_SEND',
							'Connectivity banner when offline — the app remains fully usable'
						]
					},
					{
						heading: 'Stack',
						items: [
							'Flutter (Material 3)',
							'sqflite for local persistence',
							'image_picker, share_plus, connectivity_plus, flutter_slidable, flutter_animate'
						]
					}
				]
			},
			{
				name: 'Drive',
				summary:
					'Personal Storage-as-a-Service — files, teams, sharing, and pluggable storage backends.',
				repoUrl: 'https://github.com/zarnihlawn/drive.zarnihlawn.com',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'Drive (ZNL-DRIVE) is a SvelteKit file workspace with Postgres metadata and bytes on Local filesystem or Tigris object storage. It covers the product surface of a small cloud drive: Home library, Shared, Trash, team drives, public links, chunked uploads, and a REST API usable with session cookies or developer API keys.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Browse folders with breadcrumbs, color labels, pin, and star',
							'Upload (including chunked large files) and download files or folder ZIPs',
							'Share with signed-in users; Shared view is read-oriented',
							'Team drives with a fixed storage provider per team',
							'Revocable public share tokens for anonymous preview/download',
							'Trash with restore / permanent delete and scheduled purge',
							'Better Auth (email/password + optional GitHub/Google OAuth)'
						]
					},
					{
						heading: 'Stack',
						items: [
							'SvelteKit 2 + Svelte 5, Tailwind CSS 4, daisyUI 5',
							'Postgres (Neon) + Drizzle ORM, Better Auth',
							'Local filesystem and Tigris S3-compatible storage',
							'Docker / Fly.io deployment'
						]
					}
				]
			},
			{
				name: 'Escape from Kidnappers in Abandoned House',
				summary:
					'Unity 3D VR escape experience — Team CoreX assignment; lead software developer.',
				repoUrl: 'https://github.com/zarnihlawn/escape-from-kidnappers-in-abandoned-house',
				role: 'Lead software developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'A Unity VR game where the player wakes as a captive in an abandoned building and must gather clues, tools, and power to escape. Built with Team CoreX for a group assignment, using Unity 2022 LTS and room-scale style interaction (grab, flashlight, keypad, fuse/power puzzles).'
					},
					{
						heading: 'Role & delivery',
						items: [
							'Led software development across core gameplay systems',
							'Collaborated with UX/UI, project management, and QA teammates',
							'Interaction design for VR grab, tool use, radio, flashlight, and puzzle props'
						]
					},
					{
						heading: 'Stack',
						items: ['Unity 2022.3 LTS', 'C#', 'VR interaction and scene scripting']
					}
				]
			},
			{
				name: 'AdaDDAE (ADBench)',
				summary:
					'Master’s thesis implementation — adaptive diffusion-scheduled anomaly detection on tabular data.',
				repoUrl: 'https://github.com/zarnihlawn/itm-adaddae-adbench',
				role: 'Research & implementation',
				documentation: [
					{
						heading: 'Overview',
						body: 'AdaDDAE extends diffusion-scheduled denoising autoencoders for tabular anomaly detection, evaluated on ADBench (57 datasets). The repository is organized as a named-component framework — each piece (noise schedule, sampling, scoring, ablations) has a clear role so experiments and contribution waterfalls stay reproducible on CPU and GPU profiles.'
					},
					{
						heading: 'Research themes',
						items: [
							'Leak-safe feature tuning (PCA / scaler pipeline)',
							'Dataset-adaptive and manifold-aligned noise scheduling',
							'SNR-stratified timestep selection and contrastive pair sampling',
							'Variance-uncertainty and diffusion-time posterior scoring views',
							'Ablation ladders and hardware profiles (CPU through 8–16 GB GPUs)'
						]
					},
					{
						heading: 'Stack',
						items: [
							'Python, PyTorch-oriented training scripts',
							'ADBench datasets and YAML experiment configs',
							'CPU and Vast.ai GPU run profiles'
						]
					}
				]
			},
			{
				name: 'Clinical IR App',
				summary:
					'Streamlit dashboard comparing clinical retrieval systems on MIMIC-IV discharge notes.',
				repoUrl: 'https://github.com/zarnihlawn/clinical-ir-app',
				role: 'Developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'A Streamlit evaluation app for clinical information retrieval. On a shared random sample of MIMIC-IV discharge notes it compares three retrieval stacks — sparse lexical, dense semantic, and a hybrid medical pipeline — with live search, note detail, and a graded 10-query evaluation panel (Precision@3, Recall@3, MAP, NDCG@3). For research use only; not for clinical decision-making.'
					},
					{
						heading: 'Systems compared',
						items: [
							'System A — TF-IDF + cosine similarity (lexical baseline)',
							'System B — dense semantic search with all-MiniLM-L6-v2',
							'System C — hybrid BM25 + MedCPT dual encoders fused with Reciprocal Rank Fusion (RRF)'
						]
					},
					{
						heading: 'Stack',
						items: [
							'Python + Streamlit',
							'MIMIC-IV / MIMIC-IV-Note (PhysioNet credentialed access)',
							'Hugging Face embedding / MedCPT models',
							'IEEE-format portfolio report (LaTeX)'
						]
					}
				]
			}
		]
	},
	{
		id: 2,
		slug: 'bsc-hons-computer-science',
		institution: 'University of Sunderland',
		program: 'BSc (Hons) Computer Science',
		period: 'July 2025',
		status: 'completed',
		applicationsIntro:
			'Major desktop application delivered for the BSc (Hons). The title opens the public repository.',
		overview: [
			{
				heading: 'Program',
				body: 'BSc (Hons) Computer Science at the University of Sunderland. The degree combines hands-on development with the theory of how and why computers work, using professional-level tools and specialist labs. Students learn industry-relevant languages such as JavaScript, C#, Python, and SQL across a structured three-year curriculum.'
			},
			{
				heading: 'Focus areas',
				items: [
					'Software development and programming',
					'Database systems',
					'Artificial intelligence',
					'Internet of Things (IoT) and robotics',
					'DevOps and agile development',
					'Cybersecurity',
					'Full-stack, mobile technologies, UX design, and big data / visualisation',
					'Computing project (final year)'
				]
			}
		],
		projects: [
			{
				name: 'Data Helper Application',
				summary:
					'Cross-platform desktop database workbench — six engines, Monaco queries, ER diagrams, and Docker controls.',
				repoUrl: 'https://github.com/zarnihlawn/database-helper-application',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'Data Helper Application is a SvelteKit + Tauri desktop client for day-to-day database work. Connections, query files, schema diagrams, and Docker lifecycle controls live in one workspace. Local app state uses SQLite via Drizzle; live database traffic goes through Rust connection modules on the Tauri side.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Connect to PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, MongoDB, and SQLite',
							'Monaco-based query workspace with saved query file collections',
							'SQL and NoSQL ER diagrams rendered with D3',
							'Docker dashboard for images, containers, pull/build, start/stop, and terminal access',
							'In-app user manual, feature docs, and release notes',
							'Desktop updater for release builds across supported platforms'
						]
					},
					{
						heading: 'Stack',
						items: [
							'SvelteKit (static adapter) + Svelte 5',
							'Tauri 2 (Rust)',
							'Drizzle ORM + libSQL',
							'Monaco Editor, xterm, D3',
							'daisyUI + Tailwind CSS'
						]
					}
				]
			}
		]
	},
	{
		id: 3,
		slug: 'higher-diploma-information-technology',
		institution: 'TMC Academy',
		program: 'Higher Diploma in Information Technology',
		period: 'August 2024',
		status: 'completed',
		applicationsIntro:
			'Four module and final projects from the Higher Diploma. Titles open the public repositories.',
		overview: [
			{
				heading: 'Program',
				body: 'Higher Diploma in Infocomm Technology at TMC Academy (Singapore). The programme provides theoretical knowledge and practical skills for careers in ICT, aiming to produce graduates grounded in the core disciplines of computing and IT and prepared for further undergraduate study.'
			},
			{
				heading: 'Focus areas',
				items: [
					'Database Systems and Applications',
					'Application Programming with Java',
					'Information Systems Analysis and Design',
					'Web Programming and Applications',
					'Network Operating Systems',
					'.Net Programming with C#',
					'Development of Mobile Applications',
					'Object Oriented Programming with C++',
					'Elective study (e.g. Cloud Computing Concepts) and Project or Professional Certification Preparation'
				]
			}
		],
		projects: [
			{
				name: 'LavenderPOS (Point of Sale System)',
				summary:
					'Higher Diploma final project — all-in-one POS with Java Swing operations, React portal, and MySQL.',
				repoUrl: 'https://github.com/zarnihlawn/point-of-sale-system',
				role: 'Sole developer · COS 209 final project',
				documentation: [
					{
						heading: 'Overview',
						body: 'LavenderPOS is a multi-component business management system: a Java Swing desktop app for day-to-day operations, a React web portal for downloads and information, and a MySQL backend for organisations, products, customers, inventory, calendar, tracks, and reports. Supports multiple accounts, organisation membership, and owner vs member roles.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Organisation management with invite links and member roles',
							'Product catalogue with categories, inventory, and images',
							'Customer and contact management',
							'Calendar, tasks, process tracks, and reporting',
							'Desktop operations client plus public React portal'
						]
					},
					{
						heading: 'Stack',
						items: ['Java Swing', 'React', 'MySQL']
					}
				]
			},
			{
				name: 'TV Repair Private Company',
				summary:
					'Java Swing + MySQL management system for a TV repair shop — COS 106 Application Programming.',
				repoUrl: 'https://github.com/zarnihlawn/tv-repair-private-company',
				role: 'Sole developer · COS 106',
				documentation: [
					{
						heading: 'Overview',
						body: 'A TV repair company management desktop app built for COS 106. NetBeans Java Swing UI connects to a MySQL RepairDB for customers, products/services, and user logins, with accompanying SQL dump and design mockups.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Customer records (contact, demographics)',
							'TV product and service management',
							'User login against the MySQL schema',
							'Graphical Swing interface with design assets'
						]
					},
					{
						heading: 'Stack',
						items: ['Java Swing', 'MySQL', 'NetBeans']
					}
				]
			},
			{
				name: 'Health Promotion Board',
				summary:
					'PHP web app for a fictional health board — events, information, enrolments, and admin.',
				repoUrl: 'https://github.com/zarnihlawn/health-promotion-board',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'A PHP web application for a fictional Health Promotion Board. Users register, log in, browse health information and events, enrol, and manage profiles; administrators maintain events, content, and enrolments. Includes MySQL/MariaDB schema and UI/UX design artefacts.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Sign-up, login, and role-based access (admin / user)',
							'User dashboard, notifications, and profile pages',
							'Health events with enrolment',
							'Health information articles',
							'Admin CRUD for events and related content'
						]
					},
					{
						heading: 'Stack',
						items: ['PHP', 'MySQL / MariaDB', 'HTML / CSS']
					}
				]
			},
			{
				name: 'Inventory Management Console App',
				summary:
					'C++ menu-driven console inventory tool with binary file persistence.',
				repoUrl: 'https://github.com/zarnihlawn/inventory-management-console-app',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'A C++ console inventory manager that stores products in a binary PRODUCT.dat file. Menu options cover add, edit/delete by ID, and list-all, with type validation for Electronics, Furniture, and Household. Builds provided for Replit and VS Code / GNU g++.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Add products (ID, name, type, quantity)',
							'Modify or delete a record by ID',
							'Display all stored products',
							'Validate product type against a fixed set'
						]
					},
					{
						heading: 'Stack',
						items: ['C++', 'Binary file I/O (PRODUCT.dat)']
					}
				]
			}
		]
	},
	{
		id: 4,
		slug: 'level-3-foundation-diploma',
		institution: 'GUSTO University',
		program: 'Pearson BTEC International Level 3 Foundation Diploma',
		period: 'October 2023',
		status: 'completed',
		applicationsIntro:
			'Foundation website project from the IT diploma. The title opens the public repository.',
		overview: [
			{
				heading: 'Program',
				body: 'Pearson BTEC International Level 3 Foundation Diploma at GUSTO University, following Pearson’s UK curriculum. The Foundation Diploma is a vocational Level 3 qualification (typically around 540 GLH) that prepares learners for higher education or IT careers through practical, assignment-based study as an alternative pathway to traditional A-levels.'
			},
			{
				heading: 'Focus areas',
				items: [
					'IT Systems — Strategy, Management and Infrastructure',
					'Website Development',
					'Data Modelling',
					'Using Social Media in Business',
					'Programming',
					'Digital Animation and Effects',
					'Business Process Modelling Tools'
				]
			}
		],
		projects: [
			{
				name: 'Vinyl Record Ecommerce',
				summary:
					'IT foundation website project — a multi-page vinyl storefront with catalogues, packages, services, and contact flows.',
				repoUrl: 'https://github.com/zarnihlawn/vinyl-record-ecommerce',
				role: 'Sole developer',
				documentation: [
					{
						heading: 'Overview',
						body: 'A static HTML and CSS ecommerce-style site for a vinyl record brand. The project spans a home page and dedicated sections for sales, packages, merchandise, services, artists, trade-in, and contact — practising structured navigation, product presentation, and form pages without a backend.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Home and section navigation across sales, services, packages, and merchandise',
							'Album and chart-focused catalogue pages with product imagery',
							'Package and limited-edition offering pages',
							'Artist meet-and-greet, hall of fame, and related marketing pages',
							'Trade-in, buy form, contacts, and policy pages',
							'Shared navigation and section styling with dedicated CSS'
						]
					},
					{
						heading: 'Stack',
						items: ['HTML', 'CSS']
					}
				]
			}
		]
	}
];

export const academicStatusLabel: Record<AcademicStatus, string> = {
	completed: 'Completed',
	'in-progress': 'In Progress'
};

export function getAcademicBySlug(slug: string): AcademicRecord | undefined {
	return academicHistory.find((record) => record.slug === slug);
}

export function academicDetailPath(slug: string): string {
	return `/academic/${slug}`;
}
