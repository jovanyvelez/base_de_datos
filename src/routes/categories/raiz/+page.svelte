<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Bienvenido</h1>
<a href="/">Back</a>
<div>
	{#await data.test}
		Loading...
	{:then value}
		<div class="bg">
			{#each value as val (val.product_id)}
				<div>
					<ul>
						<li>{val.name}</li>
						<img src={val.secure_url} alt="" />
					</ul>
					<h6>{val.categoria}</h6>
				</div>
			{/each}
		</div>
	{:catch error}
		{error.message}
	{/await}
</div>

<a href="/">Back</a>

<style>
	
	h6,a,h1 {
		text-align: center;
	}
	.bg {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		margin-right: 5px;
		padding: 5px;
	}

	a{
		display:block;
	}
</style>
