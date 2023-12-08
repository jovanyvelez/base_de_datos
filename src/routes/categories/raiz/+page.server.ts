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
        test: productosPorCategoria("0cf7e380-fb4f-4325-a787-213c913f46a6")
	};
};

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const form = await superValidate(request, categorySchema);
        await crearCategoriaRaiz(form.data.name);
        console.log(form);
    }
};




