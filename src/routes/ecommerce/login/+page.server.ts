import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
import type { PageServerLoad } from './$types';
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

	if (user != null) {
		throw redirect(302, '/ecommerce/area');
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const form_data = await request.formData();
		const pass = form_data.get('pass');
		const email = form_data.get('email');

		if (pass == null || email == null) {
			return { success: false, message: 'Invalid email or password' };
		}
		const crypt_pass = md5(pass);

		const user = await prisma.utente.findFirst({
			where: {
				PK_Email: email,
				Password: crypt_pass
			}
		});

		if (user == null) {
			return { success: false, message: '' };
		} else {
			cookies.set('email', email, {
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
			cookies.set('session', crypt_pass, {
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
			throw redirect(302, '/ecommerce/area');
		}
	}
};
