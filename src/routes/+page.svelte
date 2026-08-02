<script lang="ts">
	import GitHub from '$lib/component/GitHub.svelte';
	import HeroImage from '$lib/component/HeroImage.svelte';
	import Youtube from '$lib/component/Youtube.svelte';
	import { profile } from '$lib/data/profile';
	import { technologies, useTechLabel } from '$lib/data/tech-stacks';
	import { LucideArrowUpRight, LucideDownload, LucideGlobe, LucideLink, LucideMail } from '@lucide/svelte';

	const birthday = new Date('2006-02-10');

	function calculateAge(date: Date) {
		const today = new Date();

		let age = today.getFullYear() - date.getFullYear();

		const monthDiff = today.getMonth() - date.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < date.getDate())
		) {
			age--;
		}

		return age;
	}

	const age = calculateAge(birthday);

	const socialLink = [
		{
			id: 1,
			name: 'Website',
			link: 'https://zarnihlawn.com',
			icon: LucideGlobe
		},
		{
			id: 2,
			name: 'GitHub',
			link: 'http://github.com/zarnihlawn',
			icon: GitHub
		},
		{
			id: 3,
			name: 'Mail',
			link: 'mailto:zarnihlawn@outlook.com',
			icon: LucideMail
		},
		{
			id: 4,
			name: 'Youtube',
			link: 'https://www.youtube.com/@zarnihlawn',
			icon: Youtube
		}
	];

	const resourceLinks = [
		{
			id: 1,
			name: 'Resume',
			link: '/resume.pdf',
			download: 'Zarni-Hlawn-Resume.pdf'
		}
	];

	const about =
		'Software engineer building web apps, automation, and tools. Based in Yangon. Experienced in full-stack development.';

	const detailLinks = [
		{
			id: 1,
			name: 'Work Experience',
			link: '/work-experience'
		},
		{
			id: 2,
			name: 'Academic',
			link: '/academic'
		},
		{
			id: 3,
			name: 'Certification',
			link: '/certification'
		},
		{
			id: 4,
			name: 'Development',
			link: '/development'
		},
		{
			id: 5,
			name: 'Languages',
			link: '/languages'
		},
		{
			id: 6,
			name: 'Contribution',
			link: '/contribution'
		}
	];
</script>

<div class="page-content flex flex-col items-center mt-10">
	<div class="mb-2">{profile.nickname}</div>
	<div class="playfair-font text-3xl italic flex gap-3 mb-4">
		<div class="left">
			{profile.roleLeft}
		</div>

		<div class="center text-[#5b6ee1]">
			&
		</div>

		<div class="right">
			{profile.roleRight}
		</div>
	</div>

	<div class="name-wrapper mb-4">
		<div class="text-[#5b6ee1] text-7xl font-extrabold text-outline">
			{profile.name}
		</div>

		<div class="flex justify-between opacity-70 italic text-sm ">
			<div>
				{age} yrs / Male
			</div>

			<div>
				{profile.location}
			</div>
		</div>
	</div>

	<HeroImage variant="home" class="mt-7 mb-10" />

	<div class="flex flex-col sm:flex-row gap-6 w-full max-w-3xl mb-10">
		<div class="flex flex-col gap-8 w-full sm:w-44 sm:shrink-0">
			<section class="flex flex-col gap-3 w-full">
				<h2 class="opacity-70 italic text-sm">Socials</h2>
				<div class="flex flex-col gap-3 w-full">
					{#each socialLink as link (link.id)}
						{@const Icon = link.icon}
						<a
							href={link.link}
							target="_blank"
							rel="noreferrer"
							class="link-tag flex w-full items-center justify-between rounded-2xl border px-3 py-1"
						>
							<div class="flex items-center gap-2 min-w-0">
								<Icon class="size-4 shrink-0" />
								<span class="truncate">{link.name}</span>
							</div>
							<LucideArrowUpRight class="link-tag-arrow shrink-0 text-[#5b6ee1]" />
						</a>
					{/each}
				</div>
			</section>

			<section class="flex flex-col gap-3 w-full">
				<h2 class="opacity-70 italic text-sm">Resources</h2>
				<div class="flex flex-col gap-3 w-full">
					{#each resourceLinks as resource (resource.id)}
						<a
							href={resource.link}
							download={resource.download}
							class="link-tag flex w-full items-center justify-between rounded-2xl border px-3 py-1"
						>
							<span class="truncate">{resource.name}</span>
							<LucideDownload class="link-tag-arrow size-5 shrink-0 text-[#5b6ee1]" />
						</a>
					{/each}
				</div>
			</section>
		</div>

		<div class="flex flex-col gap-8 flex-1 min-w-0">
			<section class="flex flex-col gap-3 w-full">
				<h2 class="opacity-70 italic text-sm">About</h2>
				<p class="text-sm leading-relaxed opacity-80">
					{about}
				</p>
			</section>

			<section class="flex flex-col gap-3 w-full">
				<h2 class="opacity-70 italic text-sm">{useTechLabel}</h2>
				<p class="text-sm leading-snug opacity-80">
					{technologies.join(' · ')}
				</p>
			</section>

			<section class="flex flex-col gap-3 w-full">
				<h2 class="opacity-70 italic text-sm">Details</h2>
				<div class="flex flex-wrap gap-2 w-full">
					{#each detailLinks as detail (detail.id)}
						<a
							href={detail.link}
							class="link-tag tag flex w-[calc(50%-0.25rem)] items-center justify-between rounded-2xl border px-3 py-1"
						>
							<span class="truncate">{detail.name}</span>
							<LucideLink class="link-tag-arrow size-5 shrink-0 text-[#5b6ee1]" />
						</a>
					{/each}
				</div>
			</section>
		</div>
	</div>

	
</div>