<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		lede,
		indexLabel,
		mode,
		onClose,
		children
	}: {
		title: string;
		lede: string;
		indexLabel: string;
		mode: 'dialog' | 'page';
		onClose?: () => void;
		children: Snippet;
	} = $props();
</script>

<header class="study-chrome">
	<div class="study-chrome-bar">
		<p class="kicker">{indexLabel}</p>
		{#if mode === 'dialog' && onClose}
			<button type="button" class="hero-jump" onclick={onClose}>Close</button>
		{:else}
			<a class="hero-jump" href="/">Back to index</a>
		{/if}
	</div>
	{#if mode === 'page'}
		<h1 class="study-title">{title}</h1>
	{:else}
		<h2 id="study-title" class="study-title" tabindex="-1">{title}</h2>
	{/if}
	<p class="lede study-lede">{lede}</p>
</header>
<div class="study-chrome-body">
	{@render children()}
</div>
