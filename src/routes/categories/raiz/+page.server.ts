import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { categoriasRaices, crearCategoriaRaiz, productosPorCategoria} from '$lib/server/queryStart.js';
const categorySchema = z.object({
	id: z.string().min(1).optional(),
	name: z.string().min(4)
});

export const load = () => {
	return {
 		
        /*root: categoriasRaices(),*/
        form: superValidate(categorySchema),
        test: productosPorCategoria("f48358e3-6550-4b46-bd9d-5b93fc41adde")
	};
};

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const form = await superValidate(request, categorySchema);
        await crearCategoriaRaiz(form.data.name);
        console.log(form);
    }
};




