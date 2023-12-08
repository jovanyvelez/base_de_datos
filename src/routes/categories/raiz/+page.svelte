<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

</script>


<h1>Bienvenido</h1>

<p>
	three:
	{#await data.test}
		Loading...
	{:then value}
		{JSON.stringify(value, null, 2)} 
	{:catch error}
		{error.message}
	{/await}
</p>


