import { categoriasRaices } from '$lib/server/queryStart.js';

export const load = () => {
	return {
		one: Promise.resolve("a"),
		root: categoriasRaices(),
		two: Promise.resolve(2),
		streamed: {
			three: new Promise((fulfil) => {
				setTimeout(() => {
					fulfil(3);
				}, 1000);
			}),
		},
	};
};