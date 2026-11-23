<script lang="ts">
	import { onMount } from 'svelte';
	import { Square, Volume2 } from '@lucide/svelte';
	import { blogAudioPath, type BlogSection } from '$lib/blog';

	let { slug, sections }: { slug: string; sections: BlogSection[] } = $props();

	const audioSrc = $derived(blogAudioPath(slug));

	let audio = $state<HTMLAudioElement>();
	let playing = $state(false);
	let percent = $state(0);
	let active = $state('');

	onMount(() => {
		const article = document.querySelector('.blog-post');
		if (!article) return;

		const headings = sections
			.map((section) => document.getElementById(section.id))
			.filter((node): node is HTMLElement => node !== null);

		let frame = 0;
		const measure = () => {
			frame = 0;
			const box = article.getBoundingClientRect();
			const top = box.top + window.scrollY;
			const travel = box.height - window.innerHeight;
			const read = travel > 0 ? (window.scrollY - top) / travel : window.scrollY >= top ? 1 : 0;
			percent = Math.round(Math.min(1, Math.max(0, read)) * 100);

			// The reading line sits a third down the viewport; the last heading above it is current.
			const line = window.scrollY + window.innerHeight * 0.35;
			const passed = headings.filter(
				(heading) => heading.getBoundingClientRect().top + window.scrollY <= line
			);
			const atEnd =
				window.scrollY > 0 &&
				window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2;
			active = atEnd ? (sections.at(-1)?.id ?? '') : (passed.at(-1)?.id ?? sections[0]?.id ?? '');
		};
		const schedule = () => {
			if (frame) return;
			frame = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});

	async function toggle() {
		if (!audio) return;
		if (!audio.paused) {
			audio.pause();
			return;
		}
		try {
			await audio.play();
		} catch {
			// Autoplay policy or a missing file: leave the button in its idle state.
			playing = false;
		}
	}
</script>

<audio
	bind:this={audio}
	src={audioSrc}
	preload="none"
	onplay={() => (playing = true)}
	onpause={() => (playing = false)}
	onended={() => (playing = false)}
></audio>

<div class="blog-rail">
	<button
		type="button"
		class="blog-audio"
		aria-pressed={playing}
		aria-label={playing ? 'Pause narration' : 'Listen to this article'}
		onclick={toggle}
	>
		{#if playing}
			<Square size={18} aria-hidden="true" />
		{:else}
			<Volume2 size={18} aria-hidden="true" />
		{/if}
	</button>

	<div class="blog-progress">
		<div class="blog-progress-track" aria-hidden="true">
			<div class="blog-progress-fill" style:width="{percent}%"></div>
		</div>
		<p class="blog-progress-label">{percent}% read</p>
	</div>

	<nav class="blog-toc" aria-label="On this page">
		<p class="kicker">On this page</p>
		<ol>
			{#each sections as section (section.id)}
				<li>
					<a href="#{section.id}" aria-current={active === section.id ? 'true' : undefined}>
						{section.title}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
</div>
