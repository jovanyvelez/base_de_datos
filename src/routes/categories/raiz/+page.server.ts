
import {z} from 'zod';
import { superValidate }  from 'sveltekit-superforms/server';
import { crearCategoriaRaiz, prueba } from '$lib/server/queryStart.js';
import { obtenerRelacionesCategorias } from '$lib/server/queryStart.js';


const categorySchema = z.object({
    id : z.string().min(1).optional(),
    name: z.string().min(4),
});

export const load = async () => {
    const result = await prueba("0cf7e380-fb4f-4325-a787-213c913f46a6"); //await obtenerRelacionesCategorias("0cf7e380-fb4f-4325-a787-213c913f46a6")
    const form = await superValidate(categorySchema);
    return { form, result }
}

export const actions = {
    default: async ({ request } : {request: Request} ) => {
        const form = await superValidate(request, categorySchema);
        await crearCategoriaRaiz(form.data.name)
        console.log(form);
    }}