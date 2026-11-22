<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import AcademicDocument from '$lib/component/AcademicDocument.svelte';
	import DevelopmentDocument from '$lib/component/DevelopmentDocument.svelte';
	import Seo from '$lib/component/Seo.svelte';
	import StudyChrome from '$lib/component/StudyChrome.svelte';
	import WorkExperienceDocument from '$lib/component/WorkExperienceDocument.svelte';
	import { creativeWorkSchema, metaDescription, pageTitle } from '$lib/seo';
	import { readStudy } from '$lib/read-study';
	import { suppressRestoredFocusRing } from '$lib/open-study';

	const kindLabels = {
		development: 'Development',
		work: 'Work',
		academic: 'Academic'
	} as const;

	let dialog = $state<HTMLDialogElement | null>(null);
	let ignoreClose = false;

	const study = $derived(readStudy(page.state.study));
	const description = $derived(study ? metaDescription(study.summary) : '');
	const indexLabel = $derived(study ? kindLabels[study.kind] : '');

	$effect(() => {
		const current = study;
		const el = dialog;
		if (!el) return;
		if (current && !el.open) {
			el.showModal();
		} else if (!current && el.open) {
			ignoreClose = true;
			el.close();
		}
	});

	function onClose() {
		if (ignoreClose) {
			ignoreClose = false;
			return;
		}
		suppressRestoredFocusRing();
		if (page.state.study) history.back();
	}

	onMount(() => {
		const el = dialog;
		if (!el || 'closedBy' in HTMLDialogElement.prototype) return;

		let pressedOutside = false;
		const outside = (event: PointerEvent) => {
			const rect = el.getBoundingClientRect();
			return (
				event.clientX < rect.left ||
				event.clientX > rect.right ||
				event.clientY < rect.top ||
				event.clientY > rect.bottom
			);
		};
		const onPointerDown = (event: PointerEvent) => {
			pressedOutside = outside(event);
		};
		const onPointerUp = (event: PointerEvent) => {
			if (pressedOutside && outside(event)) el.close();
		};
		el.addEventListener('pointerdown', onPointerDown);
		el.addEventListener('pointerup', onPointerUp);
		return () => {
			el.removeEventListener('pointerdown', onPointerDown);
			el.removeEventListener('pointerup', onPointerUp);
		};
	});
</script>

<dialog
	bind:this={dialog}
	class="study-dialog"
	closedby="any"
	aria-labelledby="study-title"
	onclose={onClose}
>
	{#if study}
		<Seo
			title={pageTitle(study.title)}
			{description}
			path={study.path}
			ogType="article"
			jsonLd={creativeWorkSchema(study.title, description)}
		/>
		<div class="study-dialog-body">
			<StudyChrome
				title={study.title}
				lede={study.lede}
				{indexLabel}
				mode="dialog"
				onClose={() => dialog?.close()}
			>
				{#if study.kind === 'development'}
					<DevelopmentDocument project={study.project} />
				{:else if study.kind === 'work'}
					<WorkExperienceDocument record={study.record} />
				{:else}
					<AcademicDocument record={study.record} />
				{/if}
			</StudyChrome>
		</div>
	{/if}
</dialog>
