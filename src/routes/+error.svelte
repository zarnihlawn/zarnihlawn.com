<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="page error-page">
	<p class="kicker">Error</p>
	<h1>{page.status}</h1>
	<p class="lede">{page.error?.message ?? 'Something went wrong.'}</p>
	<a class="text-link" href="/">Back to the portfolio index</a>
</div>
