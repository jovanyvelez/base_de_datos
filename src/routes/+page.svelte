<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

</script>


<h1>Bienenido, {data.username}</h1>
<p>Visit <a href="/categories/raiz">kit.svelte.dev</a> to try our service</p>

<p>
	one: {data.one}
</p>
<p>
	two: {data.two}
</p>
<p>
	three:
	{#await data.root}
		Loading...
	{:then value}
		{JSON.stringify(value, null, 2)} 
	{:catch error}
		{error.message}
	{/await}
</p>

<p>
	four:
	{#await data.streamed.three}
		Loading...
	{:then value}
		{value} 
	{:catch error}
		{error.message}
	{/await}
</p>