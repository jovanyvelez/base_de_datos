import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	return {
		one: Promise.resolve("a"),
		two: Promise.resolve(2),
		streamed: {
			three: new Promise((fulfil) => {
				setTimeout(() => {
					fulfil(3);
				}, 1000);
			}),
		},
		userId: session.user.userId,
		username: session.user.email
	};
};