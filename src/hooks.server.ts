import type { Handle } from '@sveltejs/kit';

export const handle:Handle = async ({ event, resolve }) => {
    
    console.time('handle');
    const response = await resolve(event);
    console.timeEnd('handle');
    return response;
}