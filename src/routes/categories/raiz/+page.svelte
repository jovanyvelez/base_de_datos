<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';

    export let data: PageData;
    const {form} = superForm(data.form)
</script>

<p>{JSON.stringify(data.result,null,2)}</p>

<form action="" method="post">

    <label>
        Nombre de categoria
        <input type="text" name="name" bind:value={$form.name}/>
    </label>

    <button>Submit</button>
</form>