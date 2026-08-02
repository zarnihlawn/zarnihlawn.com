export type WorkExperienceSection = {
	heading: string;
	body?: string;
	items?: string[];
};

export type WorkExperienceProject = {
	name: string;
	summary: string;
	/** Public or org repository URL when available */
	repoUrl?: string;
	role?: string;
	documentation: WorkExperienceSection[];
};

export type WorkExperienceRecord = {
	id: number;
	slug: string;
	role: string;
	company: string;
	period: string;
	/** ISO date for sorting (newest first) */
	startDate: string;
	/** ISO end date, or null when still in the role */
	endDate: string | null;
	location?: string;
	note?: string;
	/** Intro under Applications on the detail page */
	applicationsIntro?: string;
	overview?: WorkExperienceSection[];
	projects?: WorkExperienceProject[];
	/** Legacy flat sections when no overview/projects model is used */
	documentation?: WorkExperienceSection[];
};

function formatDisplayDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number);
	return new Date(year, month - 1, day).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

function formatPeriod(startDate: string, endDate: string | null): string {
	const start = formatDisplayDate(startDate);
	if (endDate === null) return `${start} – Present`;
	return `${start} – ${formatDisplayDate(endDate)}`;
}

const records: WorkExperienceRecord[] = [
	{
		id: 2,
		slug: 'pun-hlaing-junior-data-software-engineer',
		role: 'Junior Data & Software Engineer',
		company: 'Pun Hlaing Hospitals',
		startDate: '2025-10-01',
		endDate: null,
		period: formatPeriod('2025-10-01', null),
		applicationsIntro:
			'Systems built and operated in role — Dora, the PHH67 employee ecosystem (portal, drive, docs), Heka clinical/inventory platform, and n8n-based queue alerts for the BIM vendor kiosk. Titles open the repository when public.',
		overview: [
			{
				heading: 'Role',
				body: 'Junior Data & Software Engineer at Pun Hlaing Hospitals (October 2025 – Present). Building and integrating hospital software: controlled-browsing SaaS (Dora), the employee portal with shared Drive and Docs, the Heka clinical/inventory platform, and n8n automation for queue-system alerts on the vendor BIM kiosk.'
			},
			{
				heading: 'Focus',
				items: [
					'Full-stack SvelteKit / Tauri products for hospital staff and devices',
					'Shared SSO across employee portal, Drive, and Docs',
					'Clinical and inventory workflows in Heka',
					'n8n workflows for vendor BIM queue / kiosk alerting'
				]
			}
		],
		projects: [
			{
				name: 'Dora',
				summary:
					'Controlled-browsing SaaS — Tauri desktop client plus admin server for allowed sites, device access, and optional proxy.',
				repoUrl: 'https://github.com/punhlaingsoftwareengineering/dora',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'Dora is a browser-embedded, organisation-scoped product: an admin chooses which websites devices may open, with optional proxy settings. The stack splits into dora-desktop (SvelteKit + Tauri) and dora-server (SvelteKit admin for organisations, device requests, allowed sites, and access control), positioned as SaaS for other organisations as well as internal use.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Desktop client with organisation connect and policy-enforced browsing',
							'Admin dashboard for device requests, approve/reject, and allowed-site CRUD',
							'Optional proxy host/port configuration per organisation',
							'Drizzle Postgres schema with Better Auth–style account flows'
						]
					},
					{
						heading: 'Stack',
						items: [
							'SvelteKit + Svelte 5',
							'Tauri desktop client',
							'Postgres + Drizzle ORM',
							'daisyUI, Zod, Lucide / Simple Icons'
						]
					}
				]
			},
			{
				name: 'Employee Portal (PHH67)',
				summary:
					'Hospital employee hub — identity, org structure, service catalogue, and SSO gateway for Drive, Docs, and tooling.',
				repoUrl: 'https://github.com/punhlaingsoftwareengineering/employee-portal',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'Employee Portal is the PHH67 identity and service hub: employees, departments, facilities, access roles, announcements, notifications, and a catalogue of internal tools. It owns shared Better Auth sessions and local reverse-proxy (Caddy) so Drive, Docs, n8n chatbot/monitor, and other apps SSO under one cookie domain.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Org management (employees, departments, facilities, roles)',
							'Service hub and access-role grants for connected apps',
							'Announcements, notifications (including SSE), and portal theming',
							'Shared auth database and trusted redirect origins for Drive, Docs, and n8n tools'
						]
					},
					{
						heading: 'Stack',
						items: [
							'SvelteKit + Svelte 5',
							'Postgres + Drizzle + Better Auth',
							'npm toolchain, Caddy for local SSO'
						]
					}
				]
			},
			{
				name: 'PHH Drive',
				summary:
					'Storage-as-a-Service for hospital staff — personal and team drives, SSO with the employee portal.',
				repoUrl: 'https://github.com/punhlaingsoftwareengineering/drive',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'PHH-DRIVE is the file workspace in the PHH67 ecosystem: personal libraries, team drives, sharing, trash, and uploads, with auth shared against the employee portal. Media categories support portal announcements, facilities, notifications, and other CMS-style assets.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Personal and team file/folder management',
							'Shared Better Auth session with employee portal',
							'API-key uploads for portal and docs media pipelines',
							'Local / object-storage style backends as configured for the hospital deployment'
						]
					},
					{
						heading: 'Stack',
						items: ['SvelteKit + Svelte 5', 'Postgres + Drizzle', 'Better Auth SSO']
					}
				]
			},
			{
				name: 'PHH Docs',
				summary:
					'Documentation CMS for hospital software — published docs with admin editing, tied into portal SSO.',
				repoUrl: 'https://github.com/punhlaingsoftwareengineering/docs',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'Docs is the PHH67 documentation site: public Markdown pages from Postgres, category navigation, search, and an admin CMS. It shares authentication with the employee portal and can pull permission context from the portal database while storing CMS content in its own schema.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Hierarchical published documentation for staff and integrators',
							'Admin document/category management',
							'Shared SSO with employee portal and Drive',
							'Media uploads via Drive API keys where configured'
						]
					},
					{
						heading: 'Stack',
						items: ['SvelteKit + Svelte 5', 'Postgres + Drizzle', 'Better Auth SSO']
					}
				]
			},
			{
				name: 'Heka',
				summary:
					'Hospital clinical and inventory platform — patients, visits, allergies, and multi-level inventory approvals.',
				repoUrl: 'https://github.com/punhlaingsoftwareengineering/heka',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'Heka is a SvelteKit hospital system covering clinical records (patients, visits, diagnoses, allergies, documents) and inventory workflows (purchase requests/orders, goods receipt, stock issues/returns) with configurable multi-level approval assignees per store and module.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Patient demographics, visits, allergies, and attachments',
							'Inventory setup and transactional modules (PR, PO, GRN, SI, SR, and related codes)',
							'Multi-level approval configuration per hospital store and module',
							'Hospital-scoped APIs under the Heka route surface'
						]
					},
					{
						heading: 'Stack',
						items: [
							'SvelteKit + Svelte 5',
							'Postgres + Drizzle (Neon-capable)',
							'daisyUI, Paraglide i18n'
						]
					}
				]
			},
			{
				name: 'n8n Queue Alert (BIM Kiosk)',
				summary:
					'n8n automation for the vendor BIM queue system — kiosk / staff alerts when queue events fire.',
				role: 'Builder',
				documentation: [
					{
						heading: 'Overview',
						body: 'Hospital queue alerting built on n8n workflows against the vendor BIM system. When queue or kiosk events occur, workflows trigger staff-facing alerts so waiting-line and service desks stay in sync without polling the vendor UI by hand. Related PHH tooling includes n8n monitor and chatbot surfaces SSO’d from the employee portal.'
					},
					{
						heading: 'Capabilities',
						items: [
							'n8n workflows wired to the vendor BIM queue / kiosk events',
							'Alert fan-out for staff when queue state changes',
							'Operates alongside hospital n8n UI, monitor, and chatbot deployments'
						]
					},
					{
						heading: 'Stack',
						items: ['n8n', 'Vendor BIM queue / kiosk integration', 'Hospital Docker / nginx hosting']
					}
				]
			}
		]
	},
	{
		id: 1,
		slug: 'pun-hlaing-intern',
		role: 'Software Developer Intern',
		company: 'Pun Hlaing Hospitals',
		startDate: '2024-10-01',
		endDate: '2025-10-01',
		period: formatPeriod('2024-10-01', '2025-10-01'),
		applicationsIntro:
			'Internship delivery for Pun Hlaing Hospitals — PHH charts and dashboards, NestJS API modules, an AKHIL EMR–linked notification system, and the platform file server. Titles open the repository.',
		overview: [
			{
				heading: 'Role',
				body: 'Software Developer Intern at Pun Hlaing Hospitals (October 2024 – October 2025). Contributed modules to the PHH platform and NestJS API — including charts and dashboards — and built the notification system (integrated with the vendor AKHIL EMR) and the platform file server used across PHH services.'
			},
			{
				heading: 'Focus',
				items: [
					'Charts and dashboards on the PHH platform',
					'Backend modules on the PHH NestJS API',
					'AKHIL EMR–connected staff notifications (transfer alerts, sounds, pop-ups, desktop notifications)',
					'Shared file-server service for platform media and documents'
				]
			}
		],
		projects: [
			{
				name: 'PHH',
				summary:
					'Pun Hlaing Hospitals platform application — charts, dashboards, and related feature modules.',
				repoUrl: 'https://github.com/draungminoo/PHH',
				role: 'Module contributor · charts & dashboards',
				documentation: [
					{
						heading: 'Overview',
						body: 'The main PHH platform client used within Pun Hlaing Hospitals. Internship work centred on charts and dashboards so clinical and operational teams could read key metrics in the application, alongside other feature modules that plugged into the shared platform shell.'
					},
					{
						heading: 'Contribution',
						items: [
							'Designed and built charts and dashboard views for platform users',
							'Integrated visualisations with platform data and existing UI patterns',
							'Delivered additional assigned feature modules under team review'
						]
					}
				]
			},
			{
				name: 'PHH NestJS',
				summary:
					'NestJS API for the PHH platform — backend modules supporting client features including dashboard data.',
				repoUrl: 'https://github.com/draungminoo/PHH_NESTJS',
				role: 'Module contributor',
				documentation: [
					{
						heading: 'Overview',
						body: 'Server-side NestJS services powering the PHH platform. Internship work focused on API modules that backed client features — including data needed for charts and dashboards — with controllers, services, and data access consistent with the existing Nest architecture.'
					},
					{
						heading: 'Contribution',
						items: [
							'Implemented assigned NestJS modules and endpoints',
							'Supported dashboard and chart views with matching API contracts',
							'Integrated with existing authentication and domain services'
						]
					}
				]
			},
			{
				name: 'PHH Notification System',
				summary:
					'Staff alert service linked to the vendor AKHIL EMR — patient transfer and event pop-ups, sound, and desktop notifications.',
				repoUrl: 'https://github.com/draungminoo/phh-notification-system',
				role: 'Built end to end',
				documentation: [
					{
						heading: 'Overview',
						body: 'A notification system for Pun Hlaing Hospitals staff computers, connected to the vendor AKHIL EMR. When events occur in the EMR — including patient transfers and other operational happenings — the service alerts the relevant workstations so care teams see and hear the update without watching the EMR continuously.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Integration with the vendor AKHIL EMR for clinical and operational events',
							'Alerts for patient transfer and other in-hospital happenings',
							'On-screen pop-ups brought to the top of the staff desktop',
							'Sound playback on alert so staff notice events away from the window',
							'Native window / desktop notifications on staff computers'
						]
					}
				]
			},
			{
				name: 'PHH Platform File Server',
				summary:
					'Shared file-server service for PHH platform media and documents — built during the internship.',
				repoUrl: 'https://github.com/draungminoo/phhplatform-file-server',
				role: 'Built end to end',
				documentation: [
					{
						heading: 'Overview',
						body: 'A platform file server for storing and serving files used by Pun Hlaing Hospitals applications. Built so other PHH services could upload and retrieve assets through a shared backend instead of each app managing its own file storage.'
					},
					{
						heading: 'Capabilities',
						items: [
							'Upload and retrieval of platform files for consuming apps',
							'Shared service model for media and document storage',
							'Designed and implemented as a standalone repository'
						]
					}
				]
			}
		]
	}
];

/** Newest roles first */
export const workExperienceHistory = [...records].sort((a, b) =>
	b.startDate.localeCompare(a.startDate)
);

export function getWorkExperienceBySlug(slug: string): WorkExperienceRecord | undefined {
	return workExperienceHistory.find((record) => record.slug === slug);
}

export function workExperienceDetailPath(slug: string): string {
	return `/work-experience/${slug}`;
}
