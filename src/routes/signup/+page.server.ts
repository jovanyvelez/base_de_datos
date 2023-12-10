import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';


export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions = {
	default: async ({ locals }) => {
		// basic check

		try {
				const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: "jvelez23@misena.edu.co", // unique id when using "username" auth method
					password: "123456"
				},
				attributes: {
					email: "jvelez23@misena.edu.co"
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
				return fail(500, {
					message: "Usuario ya existe"
				});
			}else{
				return fail(500, {
					message: "hubo un error"
				});
			}
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/');
	}
};