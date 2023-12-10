import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma'
import { sveltekit } from 'lucia/middleware';
import  cliente  from '$lib/server/prisma';
import {dev} from "$app/environment"


export const auth = lucia({
    adapter: prisma(cliente,{
      user: "user", 
		  session: "user_session",
		  key: "user_key",
    }),
    middleware: sveltekit(),
    env: dev ? 'DEV' : 'PROD',
    getUserAttributes: (data) => {
      return {
        email :  data.email
      };

	}
});

export type Auth = typeof auth;