import { PrismaClient } from '@prisma/client';
import * as CodiceFiscaleUtils from '@marketto/codice-fiscale-utils';
import md5 from 'md5';
import emailjs from '@emailjs/browser';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ cookies, request }) => {
		const form_data = await request.formData();

		const email = form_data.get('email');
		const pass = form_data.get('pass');

		try {
			const request = await prisma.recoveryPassword.findFirst({
				where: {
					UUID: form_data.get('uuid'),
					FK_Email: email
				}
			});

			if (request == null) {
				return { success: false, message: 'Richiesta inesistente' };
			}

			if (pass != form_data.get('passcheck')) {
				return { success: false, message: 'Le password non corrispondono' };
			}

			await prisma.utente.update({
				where: {
					PK_Email: email
				},
				data: {
					Password: md5(pass)
				}
			});

			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
