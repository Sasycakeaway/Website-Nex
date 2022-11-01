import { PrismaClient } from '@prisma/client';
import * as CodiceFiscaleUtils from '@marketto/codice-fiscale-utils';
import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '$lib/crypto/aes';
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
	registrati: async ({ cookies, request }) => {
		const form_data = await request.formData();

		const news_raw: string = form_data.get('news');
		const cf: string = form_data.get('cf');
		const privacy_raw: string = form_data.get('privacy');

		let news = false;
		if (news_raw != undefined) {
			news = true;
		}

		if (privacy_raw == undefined) {
			return {
				status: false,
				message: "è necessario accettare l'informativa sulla privacy per registrare un account"
			};
		}

		if (!CodiceFiscaleUtils.Validator.codiceFiscale(cf).valid) {
			return { status: false, message: 'codice fiscale non valido' };
		}

		const email = form_data.get('email');

		try {
			await prisma.utente.create({
				data: {
					PK_Email: email,
					Password: md5(form_data.get('password')),
					News: news,
					CF: encrypt(cf),
					Nascita: encrypt(form_data.get('nascita')),
					Telefono: encrypt(form_data.get('telefono'))
				}
			});

			let newsremove = '';

			if (news) {
				newsremove = uuidv4();
				await prisma.newsletter.create({
					data: {
						FK_Email: email,
						PK_Token: newsremove
					}
				});
			}
			return { success: true, email: email, newsremove: newsremove };
		} catch (error) {
			console.error(error);
			return { success: false, message: error };
		}
	}
};
