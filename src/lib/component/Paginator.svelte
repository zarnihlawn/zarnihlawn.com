<script lang="ts">
	let {
		pages,
		current,
		label,
		onSelect
	}: {
		pages: number;
		current: number;
		label: string;
		onSelect: (page: number) => void;
	} = $props();

	const indexes = $derived(Array.from({ length: pages }, (_, index) => index));
</script>

<nav class="paginator" aria-label={label}>
	{#each indexes as index (index)}
		<button
			type="button"
			class="paginator-page"
			class:is-active={index === current}
			aria-current={index === current ? 'true' : undefined}
			aria-label="Page {index + 1} of {pages}"
			onclick={() => onSelect(index)}
		>
			{index + 1}
		</button>
	{/each}
</nav>
