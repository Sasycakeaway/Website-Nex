import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	const email = cookies.get('email');

	if (session == null && email == null) {
		return;
	}

	const user = await prisma.utente.findFirst({
		where: {
			PK_Email: email,
			Password: session
		}
	});

	if (user == null) {
		throw error(401, 'Non sei autorizzato ad accedere a questa pagina, per favore accedi con il tuo account'); // L'utente non è autorizzato
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ cookies, request }) => {
		cookies.set('email', null, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30
		});
		cookies.set('session', null, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30
		});
		throw redirect(302, '/ecommerce/login');
	}
};
