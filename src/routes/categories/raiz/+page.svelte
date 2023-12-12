<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

</script>


<h1>Bienvenido</h1>

<p>
	Categoria:
	{#await data.test}
		Loading...
	{:then value}
		{value[0].categoria}
		{#each value as val (val.product_id)}
		<ul>
			<li>{val.name}</li>
			<img src={val.secure_url} alt="">
		</ul>	

			
		{/each}

	{:catch error}
		{error.message}
	{/await}
</p>


<a href="/">Back</a>