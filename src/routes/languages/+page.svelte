<script lang="ts">
	import LanguageRow from '$lib/component/LanguageRow.svelte';
	import DetailPage from '$lib/component/DetailPage.svelte';
	import { languages } from '$lib/data/languages';
</script>

<DetailPage
	title="Languages"
	description="Language proficiency — spoken, written, and certified levels."
>
	<div class="flex flex-col gap-3">
		{#each languages as record (record.id)}
			<LanguageRow {record} />
		{/each}
	</div>
</DetailPage>
